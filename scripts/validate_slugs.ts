import { allTopicalPages, topicalClusters, validateUniqueTopicalSlugs } from '../src/data/topicalAuthority.ts';

const errors: string[] = [];
const requiredClusters = [
  'editorial-trust',
  'ai-agent-core',
  'coding-agents',
  'business-ai-agents',
  'ai-agent-builders',
  'voice-ai-agents',
  'open-source-ai-agents',
  'mcp-servers',
  'industry-ai-agents',
  'courses-certifications',
  'research-benchmarks',
  'pricing-intelligence',
  'alternatives',
  'tutorials',
  'glossary',
  'security-compliance',
  'free-ai-agents',
  'buyers-guides',
  'reddit-community-intent',
  'directories',
  'entity-pages',
  'longtail-engine',
];

try {
  validateUniqueTopicalSlugs();
} catch (error) {
  errors.push(error instanceof Error ? error.message : String(error));
}

for (const id of requiredClusters) {
  if (!topicalClusters.some((cluster) => cluster.id === id)) {
    errors.push(`Missing required topical cluster: ${id}`);
  }
}

for (const cluster of topicalClusters) {
  if (!cluster.pages.some((page) => page.slug === cluster.hubSlug)) {
    errors.push(`Cluster ${cluster.id} hubSlug does not exist as a page: ${cluster.hubSlug}`);
  }
  for (const page of cluster.pages) {
    for (const key of ['slug', 'title', 'description', 'pageType', 'intent'] as const) {
      if (!page[key]) errors.push(`Topical page ${page.slug || '(missing slug)'} missing ${key}`);
    }
    if (typeof page.priority !== 'number') errors.push(`Topical page ${page.slug} missing numeric priority`);
    if (page.slug.includes('#')) errors.push(`Topical page ${page.slug} contains hash URL fragment`);
  }
}

const clusterless = allTopicalPages.filter((page) => !page.clusterId || !page.clusterName || !page.clusterHubSlug);
for (const page of clusterless) {
  errors.push(`Generated topical page missing cluster metadata: ${page.slug}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Slug validation passed: ${topicalClusters.length} clusters, ${allTopicalPages.length} unique topical pages.`);
