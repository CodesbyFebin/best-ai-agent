import { canonicalRoutes, RouteRecord } from '../routing/routeRegistry.js';
import { getSitemapRoutes } from '../routing/routeResolver.js';

const DOMAIN = 'https://bestaiagent.in';

/**
 * Generates XML Sitemap Index (/sitemap-index.xml or /sitemap.xml)
 */
export function generateMasterSitemapXml(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  const segments = [
    { loc: `${DOMAIN}/sitemap-agents.xml`, lastmod: '2026-07-23' },
    { loc: `${DOMAIN}/sitemap-categories.xml`, lastmod: '2026-07-23' },
    { loc: `${DOMAIN}/sitemap-comparisons.xml`, lastmod: '2026-07-23' },
    { loc: `${DOMAIN}/sitemap-mcp.xml`, lastmod: '2026-07-23' },
    { loc: `${DOMAIN}/sitemap-research.xml`, lastmod: '2026-07-23' },
    { loc: `${DOMAIN}/sitemap-pages.xml`, lastmod: '2026-07-23' },
  ];

  segments.forEach(s => {
    xml += `  <sitemap>\n`;
    xml += `    <loc>${s.loc}</loc>\n`;
    xml += `    <lastmod>${s.lastmod}</lastmod>\n`;
    xml += `  </sitemap>\n`;
  });

  xml += `</sitemapindex>`;
  return xml;
}

/**
 * Generates Segmented URLset for a specific route group
 */
export function generateSegmentedSitemapXml(group: 'agents' | 'categories' | 'comparisons' | 'mcp' | 'research' | 'pages'): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  const routes: RouteRecord[] = getSitemapRoutes(group);

  routes.forEach(r => {
    // Strict validation filter
    if (r.status !== 'published' || !r.indexable) return;
    if (r.canonicalPath.includes('#') || r.canonicalPath.includes('/a/')) return;

    const loc = `${DOMAIN}${r.canonicalPath === '/' ? '/' : r.canonicalPath + '/'}`;
    const priority = r.canonicalPath === '/' ? '1.00' : r.type === 'pillar' ? '0.90' : '0.80';

    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${r.updatedAt || '2026-07-23'}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
}

/**
 * Backward-compatible full sitemap generator
 */
export function generateIndexedSitemapXml(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  Object.values(canonicalRoutes).forEach(r => {
    if (r.status !== 'published' || !r.indexable) return;
    const loc = `${DOMAIN}${r.canonicalPath === '/' ? '/' : r.canonicalPath + '/'}`;
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${r.updatedAt || '2026-07-23'}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>0.85</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
}
