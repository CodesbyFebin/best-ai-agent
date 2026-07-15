const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const MANIFEST_PATH = path.join(PUBLIC_DIR, 'route-manifest.json');
const OUTPUT_DIR = path.join(PUBLIC_DIR, 'sitemaps');
const SITEMAP_XMLNS = 'http://www.sitemaps.org/schemas/sitemap/0.9';
const SITEMAP_IMAGE_XMLNS = 'http://www.google.com/schemas/sitemap-image/1.1';

if (!fs.existsSync(MANIFEST_PATH)) {
  console.error('Missing public/route-manifest.json. Run scripts/generate-route-manifest.ts first.');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
const routes = manifest.routes || [];
const SITE_URL = (process.env.SITE_URL || 'https://bestaiagent.in').replace(/\/$/, '');

const today = new Date().toISOString().slice(0, 10);

function esc(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function urlset(entries, opts = {}) {
  const ns = opts.image ? ` xmlns:image="${SITEMAP_IMAGE_XMLNS}"` : '';
  const items = entries.map((e) => {
    const lines = ['  <url>', `    <loc>${esc(e.loc)}</loc>`, `    <lastmod>${esc(e.lastmod || today)}</lastmod>`, `    <changefreq>${esc(e.changefreq || 'weekly')}</changefreq>`, `    <priority>${esc(String(e.priority || '0.80'))}</priority>`];
    if (e.image) lines.push(`    <image:image><image:loc>${esc(SITE_URL + e.image)}</image:loc></image:image>`);
    lines.push('  </url>');
    return lines.join('\n');
  });
  return ['<?xml version="1.0" encoding="UTF-8"?>', `<urlset xmlns="${SITEMAP_XMLNS}"${ns}>`, items.join('\n'), '</urlset>'].join('\n');
}

function sitemapIndex(children) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...children.map((c) => ['  <sitemap>', `    <loc>${esc(SITE_URL + c.path)}</loc>`, `    <lastmod>${esc(today)}</lastmod>`, '  </sitemap>'].join('\n')),
    '</sitemapindex>',
  ].join('\n');
}

function write(name, content) {
  const out = path.join(OUTPUT_DIR, name);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, content.endsWith('\n') ? content : `${content}\n`);
  console.log(`  ✅ ${name}`);
}

function site(pathName) {
  return { loc: SITE_URL + pathName, lastmod: today, changefreq: 'weekly', priority: '0.80' };
}

const locations = routes.map((r) => site(r.canonicalPath));
const byType = {};
for (const r of routes) {
  if (r.path !== r.canonicalPath) continue;
  const t = r.type || 'other';
  byType[t] = byType[t] || [];
  byType[t].push(r);
}

const agents = [
  ...byType['tool'] || [],
  ...byType['reviews'] || [],
  ...routes.filter((r) => /^\/tools\//.test(r.canonicalPath)),
];
const mcps = [...(byType['mcp'] || []), ...(byType['mcp-silo'] || [])];
const entities = [...(byType['entity'] || [])];
const research = [...(byType['research'] || []), ...(byType['report'] || [])];
const pillars = [...(byType['pillar'] || [])];
const hubs = [...(byType['hub'] || [])];
const topics = routes.filter((r) => r.path === r.canonicalPath && !['home', 'tool', 'mcp', 'entity', 'research', 'pillar', 'hub', 'comparison', 'author', 'trust', 'india'].includes(r.type));
const comparisons = [...(byType['comparison'] || [])];
const rankings = routes.filter((r) => r.path === r.canonicalPath && (/ranking/.test(r.canonicalPath) || /rankings/.test(r.canonicalPath)));
const india = routes.filter((r) => r.path === r.canonicalPath && (/india/.test(r.canonicalPath) || r.type === 'india' || r.parentHub === 'ai-agents-india'));
const trust = routes.filter((r) => r.path === r.canonicalPath && ['home', 'trust', 'author', 'editorial'].includes(r.type) || /methodology|editorial|affiliate/.test(r.canonicalPath));
const authors = routes.filter((r) => r.path === r.canonicalPath && (/^\/authors\//.test(r.canonicalPath) || r.type === 'author'));

write('sitemap.xml', sitemapIndex([
  { path: '/sitemaps/agents.xml' },
  { path: '/sitemaps/mcp.xml' },
  { path: '/sitemaps/entities.xml' },
  { path: '/sitemaps/research.xml' },
  { path: '/sitemaps/pillars.xml' },
  { path: '/sitemaps/hubs.xml' },
  { path: '/sitemaps/topics.xml' },
  { path: '/sitemaps/comparisons.xml' },
  { path: '/sitemaps/rankings.xml' },
  { path: '/sitemaps/india.xml' },
  { path: '/sitemaps/trust.xml' },
  { path: '/sitemaps/authors.xml' },
  { path: '/sitemaps/images.xml' },
]));

write('agents.xml', urlset([site('/'), ...agents.map((r) => site(r.canonicalPath))]));
write('mcp.xml', urlset(mcps.map((r) => site(r.canonicalPath))));
write('entities.xml', urlset(entities.map((r) => site(r.canonicalPath))));
write('research.xml', urlset(research.map((r) => site(r.canonicalPath))));
write('pillars.xml', urlset(pillars.map((r) => site(r.canonicalPath))));
write('hubs.xml', urlset(hubs.map((r) => site(r.canonicalPath))));
write('topics.xml', urlset(topics.map((r) => site(r.canonicalPath))));
write('comparisons.xml', urlset(comparisons.map((r) => site(r.canonicalPath))));
write('rankings.xml', urlset(rankings.length ? rankings.map((r) => site(r.canonicalPath)) : [site('/ai-agent-rankings'), site('/mcp-rankings')]));
write('india.xml', urlset(india.map((r) => site(r.canonicalPath))));
write('trust.xml', urlset(trust.map((r) => site(r.canonicalPath))));
write('authors.xml', urlset(authors.map((r) => site(r.canonicalPath))));

// Image sitemap from public/assets
function walkAssets(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkAssets(full);
    return /\.(svg|png|webp|avif|jpe?g)$/i.test(entry.name) ? [`/${path.relative(PUBLIC_DIR, full).split(path.sep).join('/')}`] : [];
  });
}
const imagePaths = walkAssets(path.join(PUBLIC_DIR, 'assets')).sort();
if (imagePaths.length) {
  write('images.xml', urlset([site('/')], { image: true }));
}

console.log(`\n✅ Generated sitemaps in ${OUTPUT_DIR}`);
console.log(`agents=${agents.length}, mcp=${mcps.length}, entities=${entities.length}, research=${research.length}, pillars=${pillars.length}, hubs=${hubs.length}, topics=${topics.length}, comparisons=${comparisons.length}, rankings=${rankings.length}, india=${india.length}, trust=${trust.length}, authors=${authors.length}, images=${imagePaths.length}`);
