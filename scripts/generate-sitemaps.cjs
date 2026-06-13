const fs = require('fs');
const path = require('path');

const BASE_URL = (process.env.SITE_URL || 'https://bestaiagent.in').replace(/\/$/, '');
const CONTENT_DIRS = [
  'content/editorial',
  'content/pillars',
  'content/comparisons',
  'content/tools',
  'content/research',
  'content/mcp/servers',
  'content/mcp/tools',
  'content/mcp/frameworks',
  'content/mcp/tutorials',
  'content/mcp/comparisons',
  'content/mcp/marketplace',
  'content/mcp/rankings'
];

function getAllMarkdownFiles(dir, base = '') {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllMarkdownFiles(fullPath, path.join(base, file)));
    } else if (file.endsWith('.md')) {
      const route = path.join(base, file).replace(/\.md$/, '').replace(/\\/g, '/');
      results.push(route);
    }
  }
  return results;
}

function generateSitemap() {
  const urls = [];
  const today = new Date().toISOString().split('T')[0];

  for (const dir of CONTENT_DIRS) {
    const routes = getAllMarkdownFiles(dir);
    for (const route of routes) {
      urls.push({
        loc: BASE_URL + '/' + route,
        lastmod: today,
        changefreq: 'weekly',
        priority: route.includes('mcp-directory') ? 0.8 : 0.6
      });
    }
  }

  const fixedRoutes = [
    { route: '/', priority: 1.0, changefreq: 'daily' },
    { route: '/rankings', priority: 0.9, changefreq: 'daily' },
    { route: '/mcp-directory', priority: 0.8, changefreq: 'daily' },
    { route: '/methodology', priority: 0.8, changefreq: 'weekly' }
  ];

  for (const item of fixedRoutes) {
    urls.push({ loc: BASE_URL + item.route, lastmod: today, changefreq: item.changefreq, priority: item.priority });
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const u of urls) {
    xml += '  <url>\n    <loc>' + u.loc + '</loc>\n    <lastmod>' + u.lastmod + '</lastmod>\n    <changefreq>' + u.changefreq + '</changefreq>\n    <priority>' + u.priority + '</priority>\n  </url>\n';
  }
  xml += '</urlset>';
  fs.writeFileSync('public/sitemap.xml', xml);
  console.log('✅ Sitemap generated with ' + urls.length + ' URLs');
}

generateSitemap();
