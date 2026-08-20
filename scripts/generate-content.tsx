#!/usr/bin/env tsx
/**
 * Content Generation Script (Phase C Runtime)
 *
 * Usage:
 *   npx tsx scripts/generate-content.tsx [manifestId]
 *
 * Reads the quarantined legacy manifest only when explicitly enabled, resolves
 * entities, applies a blueprint, and writes HTML.
 *
 * Output: dist/content/<slug>/index.html
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { generateDeepContentForComparison, generateDeepContentForResearch, generateDeepContentForAgent, generateDeepContentForCategory, generateVariationContent, generateScaledAgentContent } from './deep-content-generators';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----------------------------
// Types (from contracts)
// ----------------------------
interface ContentManifest {
  id: string;
  slug: string;
  canonicalUrl: string;
  entityId: string;
  entityType: 'agent' | 'category' | 'comparison' | 'research';
  blueprintId: string;
  contentType: 'page' | 'article' | 'profile' | 'comparison' | 'research';
  status: 'draft' | 'published' | 'archived';
  language: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  title?: string;
  description?: string;
  metadata: {
    title: string;
    description: string;
    sitemapGroup: 'agents' | 'categories' | 'comparisons' | 'research' | 'pages' | 'mcp';
    indexable: boolean;
    minWordCount?: number;
    [key: string]: any;
  };
}

interface GraphNode {
  id: string;
  type: string;
  data: Record<string, unknown>;
}

interface GraphData {
  nodes: GraphNode[];
  edges: Array<{ from: string; to: string; type: string; properties?: Record<string, unknown> }>;
  metadata: { generatedAt: string; nodeCount: number; edgeCount: number };
}

interface GenerationContext {
  manifest: ContentManifest;
  entity: GraphNode;
  graphSnapshot: GraphData;
  locale: string;
  mode: 'build' | 'preview';
  buildId: string;
  buildTimestamp: string;
  features: Record<string, boolean>;
}

interface BlueprintOutput {
  html: string;
  assets: string[];
  metadata: { title: string; description: string; canonical: string };
  sections?: Array<{ level: number; title: string }>;
}

// ----------------------------
// Helpers
// ----------------------------
function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function resolveEntity(entityId: string, graph: GraphData): GraphNode | null {
  return graph.nodes.find(n => n.id === entityId) || null;
}

// ----------------------------
// Deep Content Generator (imported from deep-content-generators.ts)
// ----------------------------

// ----------------------------
// Blueprint Implementation
// ----------------------------
class DefaultPageBlueprint {
  async generate(ctx: GenerationContext): Promise<BlueprintOutput> {
    const { manifest, entity } = ctx;
    const meta = manifest.metadata as any;

    // Check if deep content is required
    const isDeepContent = meta.minWordCount && meta.minWordCount >= 2000;

    // Get base SEO data
    const title = manifest.title || manifest.id;
    const description = manifest.description || 'Comprehensive AI agent analysis and review.';
    const canonical = manifest.canonicalUrl;

    let content = '';
    let wordCount = 0;

    // Check for scaled variation content
    const hasVariationType = !!meta.variationType;
    
    if (hasVariationType && manifest.entityType === 'agent') {
      // Generate scaled content for agents with variations
      content = generateScaledAgentContent(manifest.slug, manifest);
      wordCount = content.split(/\s+/).length;
    } else if (isDeepContent && manifest.entityType === 'agent') {
      // Generate deep content for agents
      content = generateDeepContentForAgent(manifest.slug, manifest);
      wordCount = content.split(/\s+/).length;
    } else if (isDeepContent && manifest.entityType === 'comparison') {
      // Generate deep content for comparisons
      content = generateDeepContentForComparison(entity, manifest);
      wordCount = content.split(/\s+/).length;
    } else if (isDeepContent && manifest.entityType === 'research') {
      // Generate deep content for research
      content = generateDeepContentForResearch(entity, manifest);
      wordCount = content.split(/\s+/).length;
    } else if (isDeepContent && manifest.entityType === 'category') {
      // Generate deep content for categories
      content = generateDeepContentForCategory(entity, manifest);
      wordCount = content.split(/\s+/).length;
    } else if (hasVariationType && manifest.entityType === 'comparison') {
      // Generate scaled content for comparisons with variations
      content = generateVariationContent(entity, manifest);
      wordCount = content.split(/\s+/).length;
    } else if (hasVariationType && manifest.entityType === 'category') {
      // Generate scaled content for categories with variations
      content = generateVariationContent(entity, manifest);
      wordCount = content.split(/\s+/).length;
    } else if (hasVariationType && manifest.entityType === 'research') {
      // Generate scaled content for research with variations
      content = generateVariationContent(entity, manifest);
      wordCount = content.split(/\s+/).length;
    } else if (manifest.entityType === 'agent') {
      // Simple agent content
      const data = entity.data as any;
      content = `
        <h1>${data.name}</h1>
        <p>${data.summary}</p>
        <h2>Details</h2>
        <p>Company: ${data.company}</p>
        <p>Best For: ${data.bestFor.join(', ')}</p>
        <p>Pricing: ${data.pricing.details || data.pricing.type}</p>
      `;
      wordCount = content.split(/\s+/).length;
    } else if (manifest.entityType === 'category') {
      const data = entity.data as any;
      content = `
        <h1>${data.name}</h1>
        <p>${data.description}</p>
        <p>Tool Count: ${data.toolCount}</p>
        <p>Top Agent: ${data.topAgentSlug}</p>
      `;
      wordCount = content.split(/\s+/).length;
    } else if (manifest.entityType === 'comparison') {
      const data = entity.data as any;
      content = `
        <h1>${data.title}</h1>
        <h2>${data.itemA.name} vs ${data.itemB.name}</h2>
        <p>${data.verdict}</p>
      `;
      wordCount = content.split(/\s+/).length;
    } else if (manifest.entityType === 'research') {
      const data = entity.data as any;
      content = `
        <h1>${data.title}</h1>
        <p><em>${data.reportType}</em></p>
        <p>${data.summary}</p>
        <h2>Key Takeaways</h2>
        <ul>${data.keyTakeaways.map((kt: string) => `<li>${kt}</li>`).join('')}</ul>
      `;
      wordCount = content.split(/\s+/).length;
    } else {
      content = `<h1>${title}</h1><p>${description}</p>`;
      wordCount = 100;
    }

    const html = `<!DOCTYPE html>
<html lang="${manifest.language}">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:type" content="website">
  <script type="application/ld+json">
${JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": canonical,
        "url": canonical,
        "name": title,
        "description": description
      },
      {
        "@type": "Article",
        "headline": title,
        "wordCount": wordCount,
        "author": { "@type": "Organization", "name": "BestAIAgent.in" }
      }
    ]
  }, null, 2)}
  </script>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 900px; margin: 2rem auto; padding: 0 1rem; line-height: 1.7; color: #333; }
    h1, h2, h3 { color: #1a1a2e; }
    section { margin: 2rem 0; }
    .deep-content { max-width: 800px; }
  </style>
</head>
<body>
  ${content}
  <footer style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #eee; font-size: 0.9em; color: #666;">
    Generated by BestAIAgent.in - AI Agent Analysis Platform
  </footer>
</body>
</html>`;

    return {
      html,
      assets: [],
      metadata: { title, description, canonical }
    };
  }
}

// ----------------------------
// Main
// ----------------------------
async function main() {
  const arg = process.argv[2];
  if (!arg || arg === '--help' || arg === '-h') {
    console.log(`
Content Generation Script (Phase C Runtime)

Usage: npx tsx scripts/generate-content.tsx <manifestId|manifestFile.json>

Or: node dist/server.cjs for full server-side generation

Reads manifest-data.json, resolves entities, applies blueprint, writes HTML.
Output: dist/content/<slug>/index.html
`);
    process.exit(0);
  }

  if (process.env.ENABLE_LEGACY_MANIFEST !== 'true') {
    console.log('Quarantined manifest skipped. Set ENABLE_LEGACY_MANIFEST=true only for an approved audit or recovery run.');
    return;
  }

  // Load data
  const manifestDataPath = path.join(__dirname, '..', 'quarantine', '21k-manifest-data.json');
  const graphDataPath = path.join(__dirname, '..', 'graph-data.json');

  let manifest: ContentManifest;
  if (arg.endsWith('.json')) {
    // Treat as file path
    const manifestContent = fs.readFileSync(path.resolve(arg), 'utf-8');
    manifest = JSON.parse(manifestContent) as ContentManifest;
  } else {
    // Treat as manifest ID, lookup in manifest-data.json
    if (!fs.existsSync(manifestDataPath)) {
      console.error('ERROR: quarantined legacy manifest not found');
      process.exit(1);
    }
    const allManifests: ContentManifest[] = JSON.parse(fs.readFileSync(manifestDataPath, 'utf-8'));
    // Try by slug first, then by ID
    const found = allManifests.find(m => m.slug === arg || m.id === arg);
    if (!found) {
      console.error(`Manifest not found with slug or ID: ${arg}`);
      console.error(`Available manifests: ${allManifests.map(m => m.slug).join(', ')}`);
      process.exit(1);
    }
    manifest = found;
  }

  if (!fs.existsSync(graphDataPath)) {
    console.error('ERROR: graph-data.json not found');
    console.error('Run: node scripts/build-graph.ts first');
    process.exit(1);
  }

  const graph: GraphData = JSON.parse(fs.readFileSync(graphDataPath, 'utf-8'));

  // Resolve entity
  const entity = resolveEntity(manifest.entityId, graph);
  if (!entity) {
    console.error(`Entity not found: ${manifest.entityId}`);
    process.exit(1);
  }

  // Build context
  const ctx: GenerationContext = {
    manifest,
    entity,
    graphSnapshot: graph,
    locale: manifest.language,
    mode: 'build',
    buildId: `build-${Date.now()}`,
    buildTimestamp: new Date().toISOString(),
    features: {}
  };

  // Check if deep content is required (2000+ words)
  const isDeepContent = manifest.metadata?.minWordCount && manifest.metadata.minWordCount >= 2000;
  
  // Generate
  let blueprint: DefaultPageBlueprint;
  blueprint = new DefaultPageBlueprint();
  
  const output = await blueprint.generate(ctx);

  // Write to dist/content/<slug>/index.html
  const outDir = path.join(__dirname, '..', 'dist', 'content', manifest.slug);
  ensureDir(outDir);
  fs.writeFileSync(path.join(outDir, 'index.html'), output.html);

  // Also create a JSON representation for programmatic access
  const jsonOutput = {
    ...manifest,
    generatedContent: {
      wordCount: output.html.split(/\s+/).length,
      sectionCount: output.sections?.length || 0,
      file: `dist/content/${manifest.slug}/index.html`,
      deepContent: isDeepContent
    }
  };
  fs.writeFileSync(path.join(outDir, 'data.json'), JSON.stringify(jsonOutput, null, 2));

  console.log(`✅ Generated: ${manifest.slug}/index.html`);
  console.log(`   Title: ${output.metadata.title}`);
  console.log(`   Canonical: ${output.metadata.canonical}`);
  console.log(`   Size: ${output.html.length} bytes`);
  console.log(`   Word Count: ${output.html.split(/\s+/).length}`);
  if (isDeepContent) {
    console.log(`   🚀 DEEP CONTENT: ${output.html.split(/\s+/).length}+ words generated`);
  }
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
