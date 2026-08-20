/**
 * Static verification of sitemap generator output — no running server required.
 * Confirms sitemap index XML structure and that all segments return valid urlsets.
 */
import { generateMasterSitemapXml, generateSegmentedSitemapXml } from '../src/data/sitemapGenerator.js';
import { canonicalRoutes } from '../src/routing/routeRegistry.js';

const results: { test: string; passed: boolean; details?: string }[] = [];
function assert(name: string, cond: boolean, details?: string) {
  results.push({ test: name, passed: cond, details: details || (cond ? 'OK' : 'FAILED') });
  console.log(cond ? `✅ ${name}` : `❌ ${name} — ${details}`);
}

// 1. Master sitemap index
const indexXml = generateMasterSitemapXml();
assert('Master sitemap returns non-empty string', typeof indexXml === 'string' && indexXml.length > 0);
assert('Master sitemap contains <sitemapindex> tag', indexXml.includes('<sitemapindex'));
assert('Master sitemap is well-formed XML (declaration)', indexXml.startsWith('<?xml'));
assert('Master sitemap closes </sitemapindex>', indexXml.includes('</sitemapindex>'));
const locMatches = indexXml.match(/<loc>([^<]+)<\/loc>/g) || [];
assert('Master sitemap references >= 6 segmented sitemaps', locMatches.length >= 6, `found ${locMatches.length}`);
console.log(`\nMaster sitemap references ${locMatches.length} child sitemaps:`);
locMatches.forEach(m => console.log(`  ${m.replace(/<\/?loc>/g, '')}`));

// 2. Each segment
const groups = ['agents', 'categories', 'comparisons', 'mcp', 'research', 'pages'] as const;
console.log('\n--- Segmented sitemaps ---');
for (const g of groups) {
  const xml = generateSegmentedSitemapXml(g);
  const routeCount = Object.values(canonicalRoutes).filter(r => r.status === 'published' && r.indexable && r.sitemapGroup === g).length;
  assert(`${g} sitemap contains <urlset>`, xml.includes('<urlset'), `no <urlset>`);
  const urls = (xml.match(/<loc>([^<]+)<\/loc>/g) || []);
  assert(`${g} sitemap URLs == registry count (${routeCount})`, urls.length === routeCount, `got ${urls.length}, expected ${routeCount}`);
}

console.log('\n=== SUMMARY ===');
const passed = results.filter(r => r.passed).length;
const failed = results.filter(r => !r.passed).length;
console.log(`Total: ${results.length} | Passed: ${passed} | Failed: ${failed}`);
if (failed > 0) {
  for (const r of results.filter(r => !r.passed)) console.log(`  ❌ ${r.test}: ${r.details}`);
  process.exit(1);
}
console.log('\n✅ ALL STATIC SITEMAP TESTS PASSED');
