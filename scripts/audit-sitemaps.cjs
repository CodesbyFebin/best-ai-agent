#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const SITEMAPS = [
  'ai-agent-sitemap.xml',
  'tool-sitemap.xml',
  'comparison-sitemap.xml',
  'pricing-sitemap.xml',
  'alternatives-sitemap.xml',
  'tutorials-sitemap.xml',
  'glossary-sitemap.xml',
  'mcp-sitemap.xml',
  'author-sitemap.xml',
  'hub-sitemap.xml',
  'calculators-sitemap.xml',
  'image-sitemap.xml'
];

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const BASE_URL = 'https://bestaiagent.in';
const NOINDEX_PATHS = new Set(['/search', '/filter', '/admin', '/debug', '/preview']);

function extractUrls(sitemapContent) {
  const matches = sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g);
  return [...matches].map(m => m[1]);
}

function getRoutePath(url) {
  let p = url.replace(BASE_URL, '');
  // Handle homepage: "/" or "" -> "/"
  if (p === '' || p === '/') return '/';
  // Remove trailing slash for other URLs, but return the clean path
  return p.replace(/\/$/, '') || '/';
}

function checkSitemap(sitemap, urls, routeMeta) {
  const report = {
    sitemap,
    urlCount: urls.length,
    ok200: 0,
    redirected: 0,
    clientError: 0,
    serverError: 0,
    httpUrls: [],
    trailingSlashUrls: [],
    noindexUrls: [],
    undefinedTitleUrls: [],
    missingMetaUrls: []
  };

  for (const url of urls) {
    const routePath = getRoutePath(url);
    // Only flag trailing slash for non-root URLs (homepage "/" is canonical form)
    const hasTrailingSlash = routePath !== '/' && url.match(/\/$/);
    const meta = routeMeta[routePath];
    
    if (url.startsWith('http://')) {
      report.httpUrls.push(url);
    }
    
    if (hasTrailingSlash) {
      report.trailingSlashUrls.push(url);
    }
    
    if (meta) {
      report.ok200++;
      if (NOINDEX_PATHS.has(routePath)) {
        report.noindexUrls.push(url);
      }
      if (!meta.title || meta.title.includes('undefined') || meta.title.trim() === '') {
        report.undefinedTitleUrls.push(url);
      }
      if (!meta.description || meta.description.trim() === '') {
        report.missingMetaUrls.push(url);
      }
    } else {
      report.clientError++;
    }
  }
  
  return report;
}

// Load route-meta.json for metadata checks
const routeMetaPath = path.join(PUBLIC_DIR, 'route-meta.json');
const routeMeta = fs.existsSync(routeMetaPath) ? JSON.parse(fs.readFileSync(routeMetaPath, 'utf8')) : {};

let reports = [];
let errors = [];

for (const sitemap of SITEMAPS) {
  const sitemapPath = path.join(PUBLIC_DIR, sitemap);
  if (!fs.existsSync(sitemapPath)) {
    errors.push(`${sitemap}: File not found`);
    continue;
  }
  
  const content = fs.readFileSync(sitemapPath, 'utf8');
  const urls = extractUrls(content);
  const report = checkSitemap(sitemap, urls, routeMeta);
  reports.push(report);
  
  // Check for errors
  if (report.httpUrls.length > 0) {
    errors.push(`${sitemap}: Contains ${report.httpUrls.length} http:// URLs`);
  }
  if (report.trailingSlashUrls.length > 0) {
    errors.push(`${sitemap}: Contains ${report.trailingSlashUrls.length} trailing-slash URLs`);
  }
  if (report.noindexUrls.length > 0) {
    errors.push(`${sitemap}: Contains ${report.noindexUrls.length} noindex URLs`);
  }
  if (report.undefinedTitleUrls.length > 0) {
    errors.push(`${sitemap}: Contains ${report.undefinedTitleUrls.length} pages with undefined titles`);
  }
}

// Generate markdown report
let md = '# Sitemap Audit Report\n\n';
md += `Generated: ${new Date().toISOString()}\n\n`;

for (const r of reports) {
  md += `## ${r.sitemap}\n\n`;
  md += '| Metric | Count |\n|--------|-------|\n';
  md += `| Total URLs | ${r.urlCount} |\n`;
  md += `| OK (200) | ${r.ok200} |\n`;
  md += `| HTTP URLs | ${r.httpUrls.length} |\n`;
  md += `| Trailing-slash | ${r.trailingSlashUrls.length} |\n`;
  md += `| Noindex URLs | ${r.noindexUrls.length} |\n`;
  md += `| Undefined titles | ${r.undefinedTitleUrls.length} |\n`;
  md += `| Missing meta | ${r.missingMetaUrls.length} |\n\n`;
}

if (errors.length > 0) {
  md += '## Errors\n\n';
  for (const e of errors) {
    md += `- ${e}\n`;
  }
}

fs.mkdirSync('reports', { recursive: true });
fs.writeFileSync('reports/sitemap-audit-report.md', md);
console.log(md);

// Fail if errors found
if (errors.length > 0) {
  console.error('\n❌ Sitemap audit failed with errors');
  process.exit(1);
}

console.log('\n✅ Sitemap audit passed');
process.exit(0);