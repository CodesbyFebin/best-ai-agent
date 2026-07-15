import fs from 'node:fs';
import path from 'node:path';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const REPORTS_DIR = path.resolve(process.cwd(), 'reports');
const ROUTE_META_PATH = path.join(PUBLIC_DIR, 'route-meta.json');
const CLUSTER_DATA_PATH = path.join(PUBLIC_DIR, 'cluster-data.json');
const OUTPUT_MANIFEST = path.join(PUBLIC_DIR, 'route-manifest.json');
const OUTPUT_SITEMAPS_DIR = path.join(PUBLIC_DIR, 'sitemaps');

if (!fs.existsSync(ROUTE_META_PATH)) {
  console.error('Missing public/route-meta.json. Run the build or sitemap generator first.');
  process.exit(1);
}

const routeMeta = JSON.parse(fs.readFileSync(ROUTE_META_PATH, 'utf8'));

function normalizePath(inputPath: string): string {
  const p = String(inputPath).split('?')[0].replace(/\/index\.html$/, '');
  const clean = p.length > 1 ? p.replace(/\/+$/, '') : p;
  return clean || '/';
}

function escapeHtml(str: string): string {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function titleCase(str: string): string {
  if (!str) return '';
  return String(str)
    .split(/[-/\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

const SITE_URL = (process.env.SITE_URL || 'https://bestaiagent.in').replace(/\/$/, '');

function publicUrl(pathName = '/'): string {
  if (/^https?:\/\//i.test(pathName)) return pathName;
  const normalizedPath = pathName.startsWith('/') ? pathName : `/${pathName}`;
  return `${SITE_URL}${normalizedPath === '/' ? '/' : normalizedPath}`;
}

// Determine parent pillar and hub from route metadata
function inferMeta(routePath: string, meta: any): any {
  const normalized = normalizePath(routePath);
  const slug = meta.slug || normalized.replace(/^\//, '') || 'home';
  const category = meta.category || meta.categoryLabel || 'other';
  const title = meta.title || `${titleCase(slug)} | BestAIAgent.in`;
  const description = meta.description || `BestAIAgent.in provides India-focused AI agent research for ${titleCase(slug)}.`;
  const h1 = meta.h1 || titleCase(slug);

  let parentPillar = 'general';
  let parentHub = '';
  let type = 'page';

  if (normalized === '/') {
    type = 'home';
    parentPillar = 'home';
    parentHub = '';
  } else if (normalized.startsWith('/tools/')) {
    type = 'tool';
    parentPillar = 'tools';
    parentHub = 'coding-agents-hub';
  } else if (normalized.startsWith('/entity') || normalized.startsWith('/companies') || normalized.startsWith('/protocols') || normalized.startsWith('/frameworks') || normalized.startsWith('/agents') || normalized.startsWith('/models') || normalized.startsWith('/vector-dbs')) {
    type = 'entity';
    parentPillar = 'entities';
    parentHub = 'entity-hub';
  } else if (normalized.startsWith('/mcp') || category === 'mcp' || category === 'MCP' || category === 'MCP Servers') {
    type = 'mcp';
    parentPillar = 'mcp';
    parentHub = 'mcp-hub';
  } else if (normalized.endsWith('-hub')) {
    type = 'hub';
    parentPillar = 'hubs';
    parentHub = normalized;
  } else if (normalized.includes('-vs-') || category === 'comparisons' || category === 'Comparisons') {
    type = 'comparison';
    parentPillar = 'comparisons';
    parentHub = 'coding-agents-hub';
  } else if (category === 'pillars' || category === 'AI Agent Pillars') {
    type = 'pillar';
    parentPillar = 'pillars';
    parentHub = '';
  } else if (category === 'authors' || category === 'Authors') {
    type = 'author';
    parentPillar = 'authors';
    parentHub = '';
  } else if (category === 'editorial' || category === 'Editorial') {
    type = 'trust';
    parentPillar = 'trust';
    parentHub = '';
  } else if (category === 'research' || category === 'reports' || category === 'research-benchmarks' || category === 'Research & Benchmarks') {
    type = 'research';
    parentPillar = 'research';
    parentHub = 'research-hub';
  } else if (normalized.includes('india') || category === 'industry-ai-agents' || category === 'india-geo') {
    type = 'india';
    parentPillar = 'india';
    parentHub = 'ai-agents-india';
  } else if (category === 'reviews' || category === 'tools') {
    type = 'tool';
    parentPillar = 'tools';
    parentHub = 'coding-agents-hub';
  } else if (category === 'pricing') {
    type = 'pricing';
    parentPillar = 'pricing';
    parentHub = 'pricing-hub';
  } else if (category === 'tutorials' || category === 'Tutorials') {
    type = 'tutorial';
    parentPillar = 'tutorials';
    parentHub = 'tutorials-hub';
  } else if (category === 'glossary') {
    type = 'glossary';
    parentPillar = 'glossary';
    parentHub = 'glossary-hub';
  } else if (category === 'alternatives' || category === 'Alternatives') {
    type = 'alternative';
    parentPillar = 'alternatives';
    parentHub = 'alternatives-hub';
  }

  const related = Array.isArray(meta.related) ? meta.related : [];
  const internalLinkCount = related.length + (type === 'home' ? 15 : type === 'hub' ? 8 : 5);

  return {
    slug,
    canonicalPath: meta.canonicalPath || meta.path || normalized,
    title,
    description,
    type,
    parentPillar,
    parentHub,
    lastModified: meta.lastmod || meta.lastUpdated || new Date().toISOString().slice(0, 10),
    priority: meta.priority || (type === 'home' ? '1.00' : type === 'tool' || type === 'comparison' ? '0.80' : '0.60'),
    changefreq: meta.changefreq || (type === 'home' ? 'daily' : type === 'hub' || type === 'pillar' ? 'weekly' : 'monthly'),
    schemaTypes: Array.isArray(meta.schemaTypes) ? meta.schemaTypes : ['WebPage', 'BreadcrumbList'],
    internalLinkCount,
    sourceDataKey: meta.source || category,
    faqCount: Array.isArray(meta.faqs) ? meta.faqs.length : 0,
    entityName: meta.entityName || title,
  };
}

console.log('Building route manifest from route-meta.json...');
const routes = Object.entries(routeMeta).map(([routePath, meta]) => ({
  path: normalizePath(routePath),
  ...inferMeta(routePath, meta),
}));

let clusterRoutes: any[] = [];
if (fs.existsSync(CLUSTER_DATA_PATH)) {
  console.log('Loading cluster data...');
  const clusterData = JSON.parse(fs.readFileSync(CLUSTER_DATA_PATH, 'utf8'));
  const clusters = clusterData.clusters || [];
  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  for (const cluster of clusters) {
    const clusterSlug = slugify(cluster.name);
    clusterRoutes.push({
      path: `/topic/${clusterSlug}`,
      slug: clusterSlug,
      canonicalPath: `/topic/${clusterSlug}`,
      title: `${cluster.name} — AI Agent Cluster | BestAIAgent.in`,
      description: `${cluster.name} cluster: ${cluster.topics.length} ranked topic pages covering best AI agents, tools, use cases, and India-specific guidance.`,
      type: 'cluster',
      parentPillar: 'clusters',
      parentHub: 'topic-hub',
      lastModified: new Date().toISOString().slice(0, 10),
      priority: '0.70',
      changefreq: 'weekly',
      schemaTypes: ['CollectionPage', 'BreadcrumbList'],
      internalLinkCount: cluster.topics.length + 5,
      sourceDataKey: `cluster:${clusterSlug}`,
      faqCount: 0,
      entityName: cluster.name,
    });

    for (const topicTitle of cluster.topics) {
      const topicSlug = slugify(topicTitle);
      clusterRoutes.push({
        path: `/topic/${clusterSlug}/${topicSlug}`,
        slug: topicSlug,
        canonicalPath: `/topic/${clusterSlug}/${topicSlug}`,
        title: `${topicTitle} | BestAIAgent.in`,
        description: `${topicTitle}: independent ranking and India-specific buyer guidance with INR pricing, DPDP checklist, integration notes, and tool comparisons.`,
        type: 'topic',
        parentPillar: clusterSlug,
        parentHub: `/topic/${clusterSlug}`,
        lastModified: new Date().toISOString().slice(0, 10),
        priority: '0.65',
        changefreq: 'weekly',
        schemaTypes: ['FAQPage', 'BreadcrumbList'],
        internalLinkCount: 6 + cluster.topics.filter((t: string) => t !== topicTitle).slice(0, 6).length,
        sourceDataKey: `topic:${clusterSlug}:${topicSlug}`,
        faqCount: 4,
        entityName: topicTitle,
      });
    }
  }
}

const manifest = {
  generatedAt: new Date().toISOString(),
  baseUrl: SITE_URL,
  totalRoutes: routes.length + clusterRoutes.length,
  categories: [...new Set([...routes.map((r) => r.type), ...clusterRoutes.map((r) => r.type)])],
  routes: [...routes, ...clusterRoutes],
};

fs.mkdirSync(PUBLIC_DIR, { recursive: true });
fs.writeFileSync(OUTPUT_MANIFEST, JSON.stringify(manifest, null, 2));
console.log(`✅ Route manifest written: ${OUTPUT_MANIFEST}`);

// Coverage report
const typeCounts: Record<string, number> = {};
const orphanRoutes: string[] = [];
const missingDescription: string[] = [];
const missingTitle: string[] = [];
const missingSchema: string[] = [];

for (const r of routes) {
  typeCounts[r.type] = (typeCounts[r.type] || 0) + 1;
  if (!r.parentPillar && r.type !== 'home') orphanRoutes.push(r.path);
  if (!r.description || r.description.includes('undefined')) missingDescription.push(r.path);
  if (!r.title || r.title.includes('undefined')) missingTitle.push(r.path);
  if (!r.schemaTypes || r.schemaTypes.length === 0) missingSchema.push(r.path);
}

const reportPath = path.join(REPORTS_DIR, 'route-coverage-report.md');
fs.mkdirSync(REPORTS_DIR, { recursive: true });

const report = `# Route Coverage Report

Generated: ${new Date().toISOString()}
Total routes: ${routes.length}

## Route Type Distribution

${Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).map(([type, count]) => `- ${type}: ${count}`).join('\n')}

## Orphan Routes (no parent pillar/hub)

${orphanRoutes.length === 0 ? 'None' : orphanRoutes.map((p) => `- ${p}`).join('\n')}

## Missing Description

${missingDescription.length === 0 ? 'None' : missingDescription.slice(0, 50).map((p) => `- ${p}`).join('\n')}

## Missing Title

${missingTitle.length === 0 ? 'None' : missingTitle.slice(0, 50).map((p) => `- ${p}`).join('\n')}

## Missing Schema Types

${missingSchema.length === 0 ? 'None' : missingSchema.slice(0, 50).map((p) => `- ${p}`).join('\n')}
`;

fs.writeFileSync(reportPath, report);
console.log(`✅ Route coverage report written: ${reportPath}`);
console.log(`\nSummary: ${routes.length + clusterRoutes.length} routes, ${typeCounts['tool'] || 0} tools, ${typeCounts['mcp'] || 0} mcp, ${typeCounts['entity'] || 0} entities, ${typeCounts['hub'] || 0} hubs, ${typeCounts['pillar'] || 0} pillars, ${clusterRoutes.length} cluster/topic routes, ${orphanRoutes.length} orphans, ${missingSchema.length} missing schema`);
