#!/usr/bin/env tsx
/**
 * Deep Content Generation Orchestrator
 *
 * Usage:
 *   tsx scripts/content/generate-deep-page.ts --entity agent/chatgpt --manifest agent-review
 *   tsx scripts/content/generate-deep-page.ts --entity category/coding-agents --manifest category-landing
 *
 * Reads manifest from content/manifests/, resolves entity from graph-data.json,
 * enriches entity, generates AI content section-by-section, validates quality,
 * and renders HTML to dist/content/<slug>/index.html.
 */

import { loadManifest, listAvailableManifests } from './load-manifest';
import { enrichEntity } from './enrich-entity';
import { generateAllSections } from './generate-section';
import { evaluateQuality } from './quality-gate';
import { renderHtml } from './publisher';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function printUsage(): never {
  console.log(`
Usage: tsx scripts/content/generate-deep-page.ts [options]

Options:
  --entity <id>       Entity ID (e.g., agent/chatgpt, category/coding-agents)
  --manifest <name>   Manifest name (without .yaml) from content/manifests/
  --output <dir>      Output directory (default: dist/content/<slug>)
  --force             Force regeneration even if output exists
  --skip-quality      Skip quality gate (for development)
  --list-manifests    List available manifests and exit

Examples:
  tsx scripts/content/generate-deep-page.ts --entity agent/chatgpt --manifest agent-review
  tsx scripts/content/generate-deep-page.ts --entity category/coding-agents --manifest category-landing --skip-quality
`);
  process.exit(1);
}

async function main() {
  const args = process.argv.slice(2);
  let entityId: string | null = null;
  let manifestName: string | null = null;
  let outputDir: string | null = null;
  let force = false;
  let skipQuality = false;
  let listManifests = false;
  let mock = false;

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--entity':
        entityId = args[++i];
        break;
      case '--manifest':
        manifestName = args[++i];
        break;
      case '--output':
        outputDir = args[++i];
        break;
      case '--force':
        force = true;
        break;
      case '--skip-quality':
        skipQuality = true;
        break;
      case '--list-manifests':
        listManifests = true;
        break;
      case '--mock':
        mock = true;
        break;
      default:
        console.error(`Unknown option: ${args[i]}`);
        printUsage();
    }
  }

  if (listManifests) {
    console.log('Available manifests:');
    for (const m of listAvailableManifests()) {
      console.log(`  - ${m}`);
    }
    process.exit(0);
  }

  if (!entityId || !manifestName) {
    console.error('Error: --entity and --manifest are required');
    printUsage();
  }

  try {
    console.log(`\n🚀 Deep Content Generation`);
    console.log(`Entity: ${entityId}`);
    console.log(`Manifest: ${manifestName}\n`);

    // Load manifest
    console.log('  ↳ Loading manifest...');
    const manifest = loadManifest(manifestName);

    // Load entity from graph
    console.log('  ↳ Loading entity from graph-data.json...');
    const graphPath = path.join(__dirname, '..', '..', 'graph-data.json');
    const graph = JSON.parse(fs.readFileSync(graphPath, 'utf-8'));
    const entityNode = graph.nodes.find(n => n.id === entityId);
    if (!entityNode) {
      throw new Error(`Entity not found: ${entityId}`);
    }

    // Enrich entity
    console.log('  ↳ Enriching entity...');
    const enriched = await enrichEntity(entityNode, force);

    // Generate sections
    console.log('  ↳ Generating content sections (AI)...');
    const contentBySection = await generateAllSections(manifest, entityNode, enriched, { mock });

    // Quality check
    if (!skipQuality) {
      console.log('  ↳ Running quality gate...');
      const quality = evaluateQuality(
        Object.values(contentBySection).join('\n\n'),
        manifest.sections,
        entityNode.data?.name || entityId,
        manifest.internal_links.min
      );
      console.log(`  Quality: ${quality.passed ? '✅ PASSED' : '❌ FAILED'}`);
      if (!quality.passed) {
        for (const issue of quality.issues) {
          console.log(`    - ${issue}`);
        }
      }
      console.log(`  Word count: ${quality.word_count} (target: ${manifest.word_target})`);
      console.log(`  Internal links: ${quality.internal_links} (min: ${manifest.internal_links.min})`);
    }

    // Render HTML
    console.log('  ↳ Rendering HTML...');
    const html = renderHtml(manifest, contentBySection, entityNode);

    // Write output
    const slug = entityId.split('/')[1];
    const outDir = outputDir || path.join(__dirname, '..', '..', 'dist', 'content', slug);
    const outPath = path.join(outDir, 'index.html');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
    console.log(`  ✅ Generated: ${outPath}\n`);

  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
