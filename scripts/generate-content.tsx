#!/usr/bin/env tsx
/**
 * Content Generation Script (Phase C Runtime)
 *
 * Usage:
 *   npx tsx scripts/generate-content.tsx [manifestId]
 *
 * Reads manifest-data.json, resolves entities, applies blueprint, writes HTML.
 *
 * Output: dist/content/<slug>/index.html
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

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
  metadata: {
    title: string;
    description: string;
    sitemapGroup: 'agents' | 'categories' | 'comparisons' | 'research' | 'pages' | 'mcp';
    indexable: boolean;
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
// Default Blueprint Implementation
// ----------------------------
class DefaultPageBlueprint {
  async generate(ctx: GenerationContext): Promise<BlueprintOutput> {
    const { manifest, entity } = ctx;
    const meta = manifest.metadata as any;

    // Simple HTML template using entity data
    const title = meta.title || meta.seo?.title || manifest.id;
    const description = meta.description || meta.seo?.description || '';
    const canonical = manifest.canonicalUrl;

    // Render some details based on entity type
    let content = '';
    if (entity.type === 'agent') {
      const data = entity.data as any;
      content = `
        <h1>${data.name}</h1>
        <p><strong>Company:</strong> ${data.company}</p>
        <p>${data.summary}</p>
        <h2>Best For</h2>
        <ul>${data.bestFor.map((bf: string) => `<li>${bf}</li>`).join('')}</ul>
        <h2>Pricing</h2>
        <p>${data.pricing.details}</p>
      `;
    } else if (entity.type === 'category') {
      const data = entity.data as any;
      content = `
        <h1>${data.name}</h1>
        <p>${data.description}</p>
        <p>Tool Count: ${data.toolCount}</p>
        <p>Top Agent: ${data.topAgentSlug}</p>
      `;
    } else if (entity.type === 'comparison') {
      const data = entity.data as any;
      content = `
        <h1>${data.title}</h1>
        <h2>${data.itemA.name} vs ${data.itemB.name}</h2>
        <p>${data.verdict}</p>
      `;
    } else if (entity.type === 'research') {
      const data = entity.data as any;
      content = `
        <h1>${data.title}</h1>
        <p><em>${data.reportType}</em></p>
        <p>${data.summary}</p>
        <h2>Key Takeaways</h2>
        <ul>${data.keyTakeaways.map((kt: string) => `<li>${kt}</li>`).join('')}</ul>
      `;
    } else {
      content = `<h1>${title}</h1><p>${description}</p>`;
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
        { "@type": "WebPage", "@id": canonical, "url": canonical, "name": title, "description": description }
      ]
    }, null, 2)}
  </script>
  <style>body{font-family:sans-serif;max-width:800px;margin:2rem auto;padding:0 1rem;}</style>
</head>
<body>
  <header><a href="/">← Home</a></header>
  <main>${content}</main>
  <footer>© 2026 BestAIAgent.in</footer>
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
  if (!arg) {
    console.error('Usage: npx tsx scripts/generate-content.tsx <manifestId|manifestFile.json>');
    process.exit(1);
  }

  // Load data
  const manifestDataPath = path.join(__dirname, '..', 'manifest-data.json');
  const graphDataPath = path.join(__dirname, '..', 'graph-data.json');

  let manifest: ContentManifest;
  if (arg.endsWith('.json')) {
    // Treat as file path
    manifest = JSON.parse(fs.readFileSync(path.resolve(arg), 'utf-8')) as ContentManifest;
  } else {
    // Treat as manifest ID, lookup in manifest-data.json
    const allManifests: ContentManifest[] = JSON.parse(fs.readFileSync(manifestDataPath, 'utf-8'));
    const found = allManifests.find(m => m.id === arg);
    if (!found) {
      console.error(`Manifest ID not found: ${arg}`);
      process.exit(1);
    }
    manifest = found;
  }

  const graph: GraphData = JSON.parse(fs.readFileSync(graphDataPath, 'utf-8'));
  // ... rest unchanged

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

  // Generate
  const blueprint = new DefaultPageBlueprint();
  const output = await blueprint.generate(ctx);

  // Write to dist/content/<slug>/index.html
  const outDir = path.join(__dirname, '..', 'dist', 'content', manifest.slug);
  ensureDir(outDir);
  fs.writeFileSync(path.join(outDir, 'index.html'), output.html);

  console.log(`✅ Generated: ${manifest.slug}/index.html`);
  console.log(`   Title: ${output.metadata.title}`);
  console.log(`   Canonical: ${output.metadata.canonical}`);
  console.log(`   Size: ${output.html.length} bytes`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
