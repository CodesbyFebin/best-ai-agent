const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const MANIFEST_PATH = path.join(PUBLIC_DIR, 'route-manifest.json');
const META_PATH = path.join(PUBLIC_DIR, 'route-meta.json');
const OUTPUT_DIR = path.resolve(process.cwd(), 'reports');

if (!fs.existsSync(MANIFEST_PATH)) {
  console.error('Missing public/route-manifest.json. Run scripts/generate-route-manifest.ts first.');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
const meta = JSON.parse(fs.readFileSync(META_PATH, 'utf8'));
const routes = manifest.routes || [];

const issues = [];
const warnings = [];

function addIssue(route, msg) {
  issues.push({ route, msg });
}
function addWarn(route, msg) {
  warnings.push({ route, msg });
}

// 1. No hash URLs
const hashRoutes = routes.filter((r) => r.canonicalPath.includes('#'));
if (hashRoutes.length) {
  hashRoutes.forEach((r) => addIssue(r.path, 'Hash-based URL in canonical path'));
}

// 2. Duplicate canonicals
const seen = {};
const dupes = [];
for (const r of routes) {
  const c = r.canonicalPath;
  seen[c] = seen[c] || [];
  seen[c].push(r.path);
}
for (const [canonical, paths] of Object.entries(seen)) {
  if (paths.length > 1) {
    dupes.push({ canonical, paths });
    paths.forEach((p) => addIssue(p, 'Duplicate canonical path'));
  }
}

// 3. Missing title/description
for (const r of routes) {
  if (!r.title || r.title.includes('undefined')) addIssue(r.path, 'Missing or invalid title');
  if (!r.description || r.description.includes('undefined')) addIssue(r.path, 'Missing or invalid description');
}

// 4. Orphan routes (no parent)
const orphans = routes.filter((r) => !r.parentPillar && r.type !== 'home' && r.type !== 'hub');
orphans.forEach((r) => addWarn(r.path, 'Orphan route without parent pillar/hub'));

// 5. Entity pages not linked anywhere
const entityPaths = routes.filter((r) => r.type === 'entity').map((r) => r.path);
const entitySlugs = entityPaths.map((p) => p.replace(/^\//, '').replace(/\/$/, ''));
const unlinkedEntities = [];
for (const entitySlug of entitySlugs) {
  const matches = Object.values(meta).filter((m) => {
    const related = Array.isArray(m.related) ? m.related : [];
    const entityBase = entitySlug.split('/').pop();
    return related.some((sl) => {
      const slBase = sl.split('/').pop();
      return sl === entitySlug || slBase === entityBase || entityBase === sl.replace(/^\//, '').split('/').pop();
    });
  });
  if (matches.length === 0) unlinkedEntities.push('/' + entitySlug);
}
unlinkedEntities.forEach((p) => addWarn(p, 'Entity page not linked from any related routes'));

// 6. Schema completeness
const missingSchema = routes.filter((r) => !r.schemaTypes || r.schemaTypes.length === 0);
missingSchema.forEach((r) => addWarn(r.path, 'Missing schema types'));

// 7. Internal link density
const lowLinks = routes.filter((r) => typeof r.internalLinkCount === 'number' && r.internalLinkCount < 3);
lowLinks.forEach((r) => addWarn(r.path, `Low internal link count: ${r.internalLinkCount}`));

// 8. Verify SITE urls
const badUrls = routes.filter((r) => r.canonicalPath.includes('undefined') || r.canonicalPath.includes('null') || r.canonicalPath.includes('http://bestaiagent.in'));
badUrls.forEach((r) => addIssue(r.path, 'Malformed canonical URL'));

// 9. Rankings check
const rankingsCount = routes.filter((r) => /ranking/.test(r.canonicalPath)).length;
if (rankingsCount === 0) {
  addWarn('/', 'No ranking pages found in manifest');
}

// 10. Home page must exist and be correct
const home = routes.find((r) => r.path === '/');
if (!home) addIssue('/', 'Missing home page route');
else {
  if (home.priority !== '1.00') addWarn('/', 'Home page priority should be 1.00');
}

const reportPath = path.join(OUTPUT_DIR, 'ai-crawl-readiness-report.md');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const report = `# AI Crawl Readiness Report

Generated: ${new Date().toISOString()}

## Summary

- Total routes: ${routes.length}
- Issues: ${issues.length}
- Warnings: ${warnings.length}

## Issues

${issues.length === 0 ? 'None' : issues.map((i) => `- [${i.route}] ${i.msg}`).join('\n')}

## Warnings

${warnings.length === 0 ? 'None' : warnings.map((w) => `- [${w.route}] ${w.msg}`).join('\n')}

## Duplicate Canonical Paths

${dupes.length === 0 ? 'None' : dupes.map((d) => `- ${d.canonical}: ${d.paths.join(', ')}`).join('\n')}

## Unlinked Entity Pages

${unlinkedEntities.length === 0 ? 'None' : unlinkedEntities.map((e) => `- ${e}`).join('\n')}

## Missing Schema Types

${missingSchema.length === 0 ? 'None' : missingSchema.map((s) => `- ${s.path}`).join('\n')}

## Low Internal Link Routes

${lowLinks.length === 0 ? 'None' : lowLinks.map((l) => `- ${l.path} (${l.internalLinkCount} links)`).join('\n')}
`;

fs.writeFileSync(reportPath, report);
console.log(`✅ Crawl readiness report: ${reportPath}`);
console.log(`Routes: ${routes.length}, Issues: ${issues.length}, Warnings: ${warnings.length}`);
if (issues.length > 0) {
  console.log('FAIL: Issues found');
  process.exit(1);
}
console.log('PASS: No blocking issues');
