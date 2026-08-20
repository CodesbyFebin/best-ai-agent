#!/usr/bin/env npx tsx

/**
 * Extract all Search Console URLs and cross-reference with route registry
 * Identifies missing routes that need redirects or content
 */

import { canonicalRoutes, legacyRedirects } from '../src/routing/routeRegistry.js';
import { resolveRoute } from '../src/routing/routeResolver.js';

// All URLs from Search Console (300 URLs)
const searchConsoleUrls = [
  '/cursor-pricing', '/github-copilot-pricing', '/tools/crewai', '/tools/flowise',
  '/claude-code-pricing', '/', '/tools/cursor-ai', '/tools/yellow-ai', '/tools/vapi-ai',
  '/what-is-mcp', '/best-free-ai-agents', '/best-ai-agent-frameworks', '/ai-agent-benchmarks',
  '/coding-agents-hub/', '/best-ai-voice-agent/', '/what-is-mcp/', '/ai-agents-for-finance',
  '/best-ai-agents-for-automation', '/cursor-alternatives', '/ai-agent-market-map',
  '/ai-agents-for-security', '/best-ai-agent-for-coding', '/cursor-vs-codex',
  '/ai-agents-for-business', '/best-mcp-servers', '/glossary-hub',
  '/best-ai-agent-no-code-platform', '/claude-code-alternatives', '/best-ai-agent-for-sales',
  '/vapi-pricing', '/best-ai-agent-for-business', '/best-ai-agent-libraries',
  '/how-to-use-cursor-ai', '/ai-agents-for-healthcare', '/ai-agent-tools/',
  '/best-ai-agent-alternatives', '/chatgpt-vs-perplexity', '/best-free-ai-coding-agents',
  '/flowise-alternatives', '/ai-agents-for-procurement', '/mcp-directory/',
  '/best-ai-agent-prompt-tools', '/ai-agent-awards', '/codex-alternatives',
  '/best-ai-agent-for-customer-support', '/how-to-use-vapi', '/ai-agents-for-hr',
  '/authors/karan-mehra', '/ai-agent-cases-and-examples', '/crewai-vs-langgraph',
  '/hindi-ai-agent', '/ai-agent-roadmap', '/www.bestaiagent.in/', '/vapi-alternatives',
  '/ai-agent-rankings', '/ai-agent-updates', '/n8n-pricing',
  '/best-ai-agent-orchestration-tools', '/how-to-use-github-copilot',
  '/best-free-open-source-ai-agents', '/vapi-vs-retell', '/best-ai-code-editor',
  '/copilot-vs-codex', '/ai-agent-tools', '/coding-agents-hub',
  '/tally-prime-desktop-local-stdio-mcp', '/how-to-build-ai-agent-with-flowise',
  '/ai-agent-security', '/best-ai-agents/', '/best-ai-agent-for-vs-code',
  '/best-open-source-ai-agent-tools', '/mcp-hub',
  '/tools/retell-ai', '/intercom-alternatives', '/best-ai-coding-assistant',
  '/ai-agent-news', '/best-ai-agent-for-outbound-calling',
  '/best-ai-agent-for-real-estate-calls', '/best-ai-agent-maker', '/entity',
  '/best-ai-agent-for-codex', '/alternatives', '/mcp-directory',
  '/best-ai-agent-for-education', '/cursor-ai', '/how-to-create-mcp-server',
  '/best-ai-agent-for-crm', '/best-ai-agent-course-for-beginners',
  '/best-ai-agent-for-coding/', '/replit-alternatives', '/privacy-policy',
  '/yellow-ai-pricing', '/best-ai-agent-builder-reddit',
  '/best-ai-agent-for-angular', '/best-ai-agent-course-reddit',
  '/best-ai-agent-creator', '/best-ai-agent-builder', '/dify-vs-flowise',
  '/business-ai-hub', '/best-ai-agent-for-real-estate-agencies',
  '/best-ai-agent-platform', '/mcp-security', '/best-ai-agent-for-data-analysis',
  '/best-ai-agent-for-small-business', '/best-ai-agent-for-call-centers',
  '/xero-accounting-ledger-integrator-mcp', '/about', '/ai-agent-pricing-india',
  '/india', '/best-free-ai-voice-agent', '/pricing',
  '/best-ai-agent-for-nodejs', '/free-ai-agents-hub',
  '/ai-agent-benchmark', '/how-to-use-yellow-ai', '/free-ai-agent-for-coding',
  '/databricks-delta-lake-pipeline-mcp', '/ai-agents-for-support-automation',
  '/ai-code-completion-tools', '/contact', '/best-ai-agent-india',
  '/best-ai-agent', '/compare', '/ai-agent-trends',
  '/google-drive-ai-agent-workspace', '/pdf-server',
  '/best-ai-agent-for-personal-use', '/business', '/industry-report',
  '/snyk-open-source-dependency-shield-mcp', '/best-ai-agent-for-ides',
  '/team', '/ai-agent-research', '/ai-agent-scoring-system',
  '/tutorials-hub', '/best-ai-agent-sdks', '/cursor-ai-entity',
  '/vapi-reddit-review', '/best-ai-agent-for-n8n-workflows',
  '/dpdp-act-ai-compliance', '/longtail-hub', '/ai-coding-agents',
  '/ai-agent-glossary', '/ai-agents-for-workflow-automation',
  '/crewai-vs-autogen', '/yellow-ai-alternatives',
  '/ai-agent-for-indian-startups', '/ai-agent-statistics',
  '/cursor-vs-github-copilot', '/vapi-cost-calculator', '/what-is-agentops',
  '/best-ai-coding-agent-reddit', '/tools/github-copilot',
  '/aadhaar-ekyc-regulatory-sandbox-mcp', '/what-is-tool-use',
  '/best-ai-agent-for-replit', '/ecourts-india-njdg-document-scraper-mcp',
  '/fedex-ups-dhl-global-logistics-mcp', '/best-ai-agent-for-debugging',
  '/best-ai-agent-for-unit-testing', '/retell-vs-elevenlabs',
  '/claude-code-reddit-review', '/n8n-alternatives', '/pricing-hub',
  '/best-ai-agent-for-hospitals', '/best-ai-agent-for-marketing',
  '/vapi-vs-synthflow', '/github-copilot-vs-cursor',
  '/best-ai-agent-development-tools', '/flexport-global-freight-forwarding-mcp',
  '/intercom-pricing', '/vector-dbs', '/best-ai-agent-for-testing',
  '/intercom-vs-freshdesk', '/pricing-intelligence',
  '/supabase-firebase-schema-sync-mcp', '/ai-agent-awards-2026',
  '/claude-code-vs-codex', '/editorial-policy', '/best-ai-agent-with-memory',
  '/voice-ai-case-studies', '/best-ai-agent-course',
  '/best-ai-agent-for-content-creators', '/buyers-guides',
  '/corelogic-property-data-aggregator-mcp', '/langgraph-pricing',
  '/authors/arshdeep-singh', '/best-ai-agent-orchestration-platform',
  '/methodology', '/retell-cost-calculator', '/ai-agent-examples',
  '/best-ai-agent-for-seo', '/best-ai-agent-for-startups',
  '/reviews', '/voice-ai-hub', '/how-to-build-an-ai-agent',
  '/best-ai-voice-agent', '/best-ai-agent-for-legal',
  '/voice-ai-for-education', '/industry-ai-agents-hub',
  '/mcp-vscode-extension', '/best-ai-agent-for-frontend-development',
  '/retell-pricing', '/voice-ai-faq',
  '/reddit-hub', '/retell-reddit-review', '/voice-ai-for-real-estate',
  '/github-copilot-alternatives', '/best-ai-agent-for-shopify-stores',
  '/flowise-pricing', '/best-ai-agent-workflow-builder',
  '/best-ai-agent-for-wordpress', '/intercom-for-ai-support',
  '/what-is-rag', '/mcp-open-source-projects',
  '/github-copilot-vs-amazon-codewhisperer', '/tools/intercom-ai',
  '/mcp-monitoring', '/mcp-testing', '/voice-ai-for-banking',
  '/ai-agent-adoption-report', '/building-custom-mcp-server',
  '/github-copilot-vs-tabnine', '/mcp-use-case-education',
  '/ai-agent-builders-hub', '/authors/priya-iyer',
  '/best-ai-agent-for-students', '/best-ai-agent-for-backend-development',
  '/best-ai-agent-for-solopreneurs', '/ai-agents-for-enterprises',
  '/best-open-source-ai-agent-tools', '/best-ai-agent-for-sales',
];

// Categorize resolution results
const results = {
  valid: [] as Array<{ url: string; route: string }>,
  hasRedirect: [] as Array<{ url: string; destination: string }>,
  notFound: [] as string[],
  needsRedirect: [] as string[],
};

console.log('=== Search Console URL Inventory Audit ===\n');

for (const rawUrl of searchConsoleUrls) {
  // Normalize: strip query/fragment, lowercase, remove trailing slash
  let url = rawUrl.split('?')[0].split('#')[0];
  // Remove trailing slash (except root)
  if (url.length > 1 && url.endsWith('/')) {
    // Check both with and without trailing slash
    const withoutSlash = url.replace(/\/$/, '');
    // Use withoutSlash for resolution since normalizePath handles it
    url = withoutSlash;
  }

  const resolution = resolveRoute(url);

  if (resolution.kind === 'valid') {
    results.valid.push({ url, route: resolution.route?.canonicalPath ?? url });
  } else if (resolution.kind === 'redirect') {
    results.hasRedirect.push({ url, destination: resolution.destination });
  } else {
    results.notFound.push(url);
    results.needsRedirect.push(url);
  }
}

console.log(`Total URLs analyzed: ${searchConsoleUrls.length}`);
console.log(`Valid routes: ${results.valid.length}`);
console.log(`Have redirects: ${results.hasRedirect.length}`);
console.log(`NOT FOUND (need redirect/content): ${results.notFound.length}`);

console.log('\n=== VALID ROUTES ===');
results.valid.forEach(({ url, route }) => {
  console.log(`  ✅ ${url} → ${route}`);
});

console.log('\n=== HAVE REDIRECTS ===');
results.hasRedirect.forEach(({ url, destination }) => {
  console.log(`  🔀 ${url} → ${destination}`);
});

console.log('\n=== NOT FOUND (NEEDS REDIRECT OR CONTENT) ===');
results.notFound.forEach((url) => {
  console.log(`  ❌ ${url}`);
});

// Output JSON for redirect generation
console.log('\n=== JSON for redirect generation ===');
const redirectMap: Record<string, string> = {};

for (const url of results.notFound) {
  // Suggest redirect targets based on patterns
  if (url.endsWith('-pricing')) {
    const agent = url.replace(/-pricing$/, '');
    redirectMap[url] = `/agents/${agent.startsWith('/') ? agent.slice(1) : agent}`;
  } else if (url.endsWith('-alternatives')) {
    const agent = url.replace(/-alternatives$/, '');
    redirectMap[url] = `/agents/${agent.startsWith('/') ? agent.slice(1) : agent}`;
  } else if (url.startsWith('/how-to-use-')) {
    const agent = url.replace(/^\/how-to-use-/, '');
    redirectMap[url] = `/agents/${agent}`;
  } else if (url.endsWith('-mcp')) {
    const serverName = url.replace(/^\//, '').replace(/-mcp$/, '');
    redirectMap[url] = `/mcp/servers/${serverName}`;
  } else if (url.endsWith('-hub')) {
    redirectMap[url] = '/sitemap';
  } else if (url.endsWith('-reddit')) {
    const agent = url.replace(/-reddit$/, '').replace(/^\//, '');
    redirectMap[url] = `/agents/${agent}`;
  } else if (url.endsWith('-reddit-review')) {
    const agent = url.replace(/-reddit-review$/, '').replace(/^\//, '');
    redirectMap[url] = `/agents/${agent}`;
  } else if (url.endsWith('-entity')) {
    const agent = url.replace(/-entity$/, '').replace(/^\//, '');
    redirectMap[url] = `/agents/${agent}`;
  } else if (url.endsWith('-cost-calculator')) {
    const agent = url.replace(/-cost-calculator$/, '').replace(/^\//, '');
    redirectMap[url] = `/agents/${agent}`;
  }
}

console.log(JSON.stringify(redirectMap, null, 2));
