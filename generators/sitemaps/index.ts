import { SITE_CONFIG } from '../../packages/config';
import { featuredAgents } from '../../src/data/agents';
import { featuredCategories } from '../../src/data/categories';
import { featuredComparisons } from '../../src/data/comparisons';

export function buildMasterSitemapXml(): string {
  const lastmod = "2026-07-23";
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_CONFIG.domain}/sitemap-core.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_CONFIG.domain}/sitemap-agents.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_CONFIG.domain}/sitemap-categories.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_CONFIG.domain}/sitemap-comparisons.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_CONFIG.domain}/sitemap-frameworks.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_CONFIG.domain}/sitemap-mcp-servers.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_CONFIG.domain}/sitemap-research.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>`;
}

export function buildCoreSitemapXml(): string {
  const routes = [
    '/',
    '/agents/',
    '/categories/',
    '/rankings/',
    '/compare/',
    '/frameworks/',
    '/models/',
    '/companies/',
    '/mcp-servers/',
    '/pricing/',
    '/alternatives/',
    '/benchmarks/',
    '/research/',
    '/guides/',
    '/tutorials/',
    '/glossary/',
    '/news/',
    '/tools/',
    '/methodology/',
    '/authors/',
    '/about/',
    '/contact/',
    '/submit-a-tool/',
    '/search/',
    '/sitemap/',
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  routes.forEach(r => {
    xml += `  <url>\n    <loc>${SITE_CONFIG.domain}${r}</loc>\n    <lastmod>2026-07-23</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>${r === '/' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
  });
  xml += `</urlset>`;
  return xml;
}

export function buildAgentsSitemapXml(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  featuredAgents.forEach(a => {
    xml += `  <url>\n    <loc>${SITE_CONFIG.domain}/agents/${a.slug}/</loc>\n    <lastmod>2026-07-23</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
  });
  xml += `</urlset>`;
  return xml;
}

export function buildCategoriesSitemapXml(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  featuredCategories.forEach(c => {
    xml += `  <url>\n    <loc>${SITE_CONFIG.domain}/categories/${c.slug}/</loc>\n    <lastmod>2026-07-23</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
  });
  xml += `</urlset>`;
  return xml;
}

export function buildComparisonsSitemapXml(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  featuredComparisons.forEach(cmp => {
    xml += `  <url>\n    <loc>${SITE_CONFIG.domain}/compare/${cmp.itemA.slug}-vs-${cmp.itemB.slug}/</loc>\n    <lastmod>2026-07-23</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
  });
  xml += `</urlset>`;
  return xml;
}
