const http = require('node:http');
const https = require('node:https');

const DEFAULT_BASE = 'https://bestaiagent.in';
const CRAWLED = {};

function request(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.request(url, {
      method: 'GET',
      headers: { 'User-Agent': 'BestAIAgent-Routing-Audit/1.0' },
      timeout: 15000,
      followRedirect: false,
    }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        resolve({ status: res.statusCode || 0, location: res.headers.location });
      });
    });
    req.on('error', (err) => reject(new Error(`Request failed for ${url}: ${err.message}`)));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Request timeout for ${url}`));
    });
    req.end();
  });
}

function getBody(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'BestAIAgent-Routing-Audit/1.0' } }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    }).on('error', reject);
  });
}

function extractLocs(xml) {
  const matches = xml.match(/<loc>(.*?)<\/loc>/g) || [];
  return matches.map((m) => m.replace(/<loc>/g, '').replace(/<\/loc>/g, '').trim()).filter(Boolean);
}

async function fetchAllSitemapUrls(baseUrl) {
  const trimmedBase = baseUrl.replace(/\/$/, '');
  console.log(`\n=== Fetching sitemap index ===`);

  const indexUrl = `${trimmedBase}/sitemap.xml`;
  let indexXml;
  try {
    indexXml = await getBody(indexUrl);
  } catch (err) {
    console.error(`Failed to fetch sitemap index: ${err.message}`);
    return [];
  }

  const sitemapRefs = extractLocs(indexXml);
  console.log(`Found ${sitemapRefs.length} sub-sitemaps`);

  const allLocs = [];
  for (const ref of sitemapRefs) {
    try {
      const xml = await getBody(ref);
      const locs = extractLocs(xml);
      console.log(`  ${ref}: ${locs.length} URLs`);
      allLocs.push(...locs);
    } catch (err) {
      console.log(`  ${ref}: FAILED (${err.message})`);
    }
  }

  const unique = [...new Set(allLocs)];
  console.log(`Total unique page URLs across all sitemaps: ${unique.length}`);
  return unique;
}

async function crawlUrls(baseUrl, locs) {
  const trimmedBase = baseUrl.replace(/\/$/, '');
  console.log(`\n=== Crawling all ${locs.length} sitemap URLs ===`);

  let passCount = 0;
  let failCount = 0;
  const failures = [];

  for (const loc of locs) {
    const url = loc.startsWith('http') ? loc : `${trimmedBase}${loc.startsWith('/') ? '' : '/'}${loc}`;
    const route = new URL(url).pathname;
    CRAWLED[route] = (CRAWLED[route] || 0) + 1;

    try {
      const { status, location } = await request(url);
      if (status >= 200 && status < 400) {
        passCount++;
        if (passCount % 50 === 0) console.log(`  ... ${passCount} passed so far`);
      } else {
        failCount++;
        failures.push({ url: route, status, route });
        console.log(`  ✗ ${route} (${status})`);
      }
    } catch (err) {
      failCount++;
      failures.push({ url: route, status: 0, route });
      console.log(`  ✗ ${route} (ERROR: ${err.message})`);
    }
  }

  console.log(`\nFull crawl summary: ${passCount} passed, ${failCount} failed out of ${locs.length} total`);

  if (failures.length > 0) {
    console.log('\nFailed routes:');
    for (const f of failures) {
      console.log(`  ${f.url} -> HTTP ${f.status}`);
    }
    process.exitCode = 1;
  }
}

async function testCriticalRoutes(baseUrl) {
  const trimmedBase = baseUrl.replace(/\/$/, '');
  console.log(`\n=== Testing critical routes ===`);

  const critical = [
    '/sitemap.xml',
    '/robots.txt',
    '/llms.txt',
    '/ai-agent-sitemap.xml',
    '/cursor-vs-github-copilot',
    '/ai-agent-examples',
    '/best-ai-agent-for-coding',
    '/best-ai-voice-agent',
    '/route-meta.json',
    '/',
    '/what-is-an-ai-agent',
    '/mcp-directory',
  ];

  let allPass = true;
  for (const route of critical) {
    const url = `${trimmedBase}${route}`;
    try {
      const { status } = await request(url);
      const ok = status >= 200 && status < 400;
      console.log(`  ${ok ? '✓' : '✗'} ${route} (${status})`);
      if (!ok) allPass = false;
    } catch (err) {
      console.log(`  ✗ ${route} (ERROR)`);
      allPass = false;
    }
  }

  if (!allPass) process.exitCode = 1;
}

async function testExcludedPaths(baseUrl) {
  const trimmedBase = baseUrl.replace(/\/$/, '');
  console.log(`\n=== Verifying excluded paths are NOT indexed ===`);

  const excluded = [
    '/search',
    '/filter',
    '/admin',
    '/debug',
    '/preview',
  ];

  let allCorrect = true;
  for (const route of excluded) {
    const url = `${trimmedBase}${route}`;
    try {
      const { status } = await request(url);
      const is404 = status === 404;
      console.log(`  ${is404 ? '✓' : '✗'} ${route} (${status}) ${is404 ? '— correctly excluded' : '— should be 404'}`);
      if (!is404) allCorrect = false;
    } catch (err) {
      console.log(`  ✗ ${route} (ERROR)`);
      allCorrect = false;
    }
  }

  if (!allCorrect) process.exitCode = 1;
}

async function main() {
  const baseUrl = process.argv[2] || DEFAULT_BASE;
  console.log(`Base URL: ${baseUrl}`);

  await testCriticalRoutes(baseUrl);
  await testExcludedPaths(baseUrl);
  const locs = await fetchAllSitemapUrls(baseUrl);
  if (locs.length > 0) {
    await crawlUrls(baseUrl, locs);
  }

  console.log('\n=== Done ===');
}

main().catch((err) => {
  console.error('Crawl failed:', err);
  process.exit(1);
});
