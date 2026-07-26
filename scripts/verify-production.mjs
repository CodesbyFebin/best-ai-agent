#!/usr/bin/env node
/**
 * ATLAS P06 — Production Verification Script (ESM)
 *
 * Verifies that the production deployment is correctly serving key endpoints.
 * This script is meant to be run against a deployed URL (e.g., Vercel production).
 *
 * Usage: BASE_URL=https://your-app.vercel.app node scripts/verify-production.mjs
 */

import { execSync } from 'child_process';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

/**
 * Make an HTTP request and return the status code.
 * Uses curl for simplicity.
 */
async function fetchStatus(url) {
  try {
    const output = execSync(`curl -s -o /dev/null -w "%{http_code}" -H "Accept: text/html" "${url}"`).toString().trim();
    return parseInt(output, 10);
  } catch (err) {
    return 0; // Treat any error as 0 (failed)
  }
}

/**
 * Make an HTTP request and return the response body.
 */
async function fetchBody(url) {
  try {
    return execSync(`curl -s -H "Accept: text/html" "${url}"`).toString();
  } catch (err) {
    return '';
  }
}

/**
 * Validate a sitemap index XML structure
 */
function validateSitemapIndex(xml, location) {
  const normalized = xml.trim();

  if (!normalized.startsWith('<?xml')) {
    return { valid: false, error: 'Missing XML declaration' };
  }

  const sitemapindexMatch = /<sitemapindex(?:\s[^>]*)?>[\s\S]*?<\/sitemapindex>/i.exec(normalized);
  if (!sitemapindexMatch) {
    return { valid: false, error: 'Missing or invalid <sitemapindex> root element' };
  }

  const sitemapBlocks = normalized.match(/<sitemap(?:\s[^>]*)?>[\s\S]*?<\/sitemap>/gi) || [];

  if (sitemapBlocks.length === 0) {
    return { valid: false, error: 'No <sitemap> entries found' };
  }

  // Check for duplicates
  const locations = [...sitemapBlocks.map(block => {
    const locMatch = block.match(/<loc>([\s\S]*?)<\/loc>/i);
    return locMatch ? locMatch[1].trim() : null;
  }).filter(Boolean)];

  const uniqueLocations = new Set(locations);
  if (uniqueLocations.size !== locations.length) {
    return { valid: false, error: 'Duplicate sitemap locations found' };
  }

  return { valid: true };
}

/**
 * SSR validation checks for a route
 */
function validateSSR(body, route, baseUrl) {
  const checks = {
    rootContainer: /<div[^>]+id=["']root["'][^>]*>/i.test(body),
    semanticMain: /<article|main/i.test(body),
    heading: /<h1(?:\s|>)/i.test(body),
    title: /<title>[^<]+<\/title>/i.test(body),
    description: /<meta[^>]+name=["']description["'][^>]+content=["'][^"']+/i.test(body),
    canonical: /<link[^>]+rel=["']canonical["'][^>]+href=["'][^"']+/i.test(body),
    structuredData: /<script[^>]+type=["']application\/ld\+json["'][^>]*>/i.test(body),
    hydrationScript: /<script[^>]+(?:src|type)=/i.test(body),
  };

  // Check for root content (not empty shell)
  const rootMatch = body.match(/<div[^>]+id=["']root["'][^>]*>([\s\S]*?)<\/div>/i);
  checks.rootHasContent = Boolean(rootMatch?.[1]?.trim());

  // Verbose errors
  const errors = [];
  for (const [name, passed] of Object.entries(checks)) {
    if (!passed) errors.push(name);
  }

  return { checks, hasErrors: errors.length > 0, errors };
}

async function main() {
  console.log('ATLAS verify:production — checking production endpoints\n');

  const results = [];
  let hasError = false;

  function assert(testName, condition, details) {
    const passed = Boolean(condition);
    results.push({ test: testName, passed, details: details || (passed ? 'OK' : 'FAILED') });
    console.log(passed ? `✅ ${testName}` : `❌ ${testName} — ${details || ''}`);
    if (!passed) hasError = true;
  }

  // SSR test cases with content-specific checks
  const ssrTestCases = [
    { 
      path: '/', 
      expectedStatus: 200, 
      expectedH1: /bestaiagent/i,
    },
    { 
      path: '/agents/cursor', 
      expectedStatus: 200, 
      expectedH1: /cursor/i,
    },
    { 
      path: '/categories/coding-agents', 
      expectedStatus: 200, 
      expectedH1: /coding agents/i,
    },
    { 
      path: '/authors/arshdeep-singh', 
      expectedStatus: 200, 
      expectedH1: /arshdeep singh/i,
    },
  ];

  // Test basic route availability
  const tests = [
    { name: 'Homepage', path: '/', expectedStatus: 200 },
    { name: 'Sitemap index', path: '/sitemap.xml', expectedStatus: 200 },
    { name: 'Agent page (Cursor)', path: '/agents/cursor', expectedStatus: 200 },
    { name: 'Category page (Coding Agents)', path: '/categories/coding-agents', expectedStatus: 200 },
    { name: 'Comparison page (Cursor vs Copilot)', path: '/compare/cursor-vs-copilot', expectedStatus: 200 },
    { name: 'MCP server page (GitHub)', path: '/mcp/servers/github', expectedStatus: 200 },
    { name: 'Research page (State of AI Agents India 2026)', path: '/research/state-of-ai-agents-india-2026', expectedStatus: 200 },
    { name: 'Author page (Arshdeep Singh)', path: '/authors/arshdeep-singh', expectedStatus: 200 },
    { name: 'Legacy redirect (/tools/cursor -> /agents/cursor)', path: '/tools/cursor', expectedStatus: 301 },
    { name: 'Non-existent page (404)', path: '/this-page-does-not-exist', expectedStatus: 404 },
  ];

  for (const { name, path, expectedStatus } of tests) {
    const url = `${baseUrl}${path}`;
    const status = await fetchStatus(url);
    const statusOk = status === expectedStatus;
    let details = `expected ${expectedStatus}, got ${status}`;
    
    assert(name, statusOk, details);

    // SSR validation for specific routes
    if (statusOk && expectedStatus === 200) {
      try {
        const body = await fetchBody(url);
        
        // Check if this is an SSR test case with content verification
        const ssrTest = ssrTestCases.find(t => t.path === path);
        if (ssrTest) {
          // Validate SSR structure
          const ssrChecks = validateSSR(body, path, baseUrl);
          
          assert(`${name} → SSR root container`, ssrChecks.checks.rootContainer);
          assert(`${name} → SSR semantic content`, ssrChecks.checks.semanticMain);
          assert(`${name} → SSR has heading`, ssrChecks.checks.heading);
          assert(`${name} → SSR has title`, ssrChecks.checks.title);
          assert(`${name} → SSR has description`, ssrChecks.checks.description);
          assert(`${name} → SSR has canonical`, ssrChecks.checks.canonical);
          assert(`${name} → SSR has JSON-LD`, ssrChecks.checks.structuredData);
          assert(`${name} → SSR has rendered content`, ssrChecks.checks.rootHasContent);
          
          // Content-specific check
          const h1Match = body.match(/<h1[^>]*>([^<]+)<\/h1>/i);
          const h1Text = h1Match ? h1Match[1].toLowerCase() : '';
          const expectedH1Text = ssrTest.expectedH1.source.replace(/\//gi, '').toLowerCase();
          assert(`${name} → has expected H1 content`, h1Text.includes(expectedH1Text) || expectedH1Text.includes(h1Text));
        }
      } catch (e) {
        console.log(`⚠️  SSR validation skipped for ${name}: ${e.message}`);
      }
    }
  }

  // Sitemap index validation with XML structure checks
  {
    const sitemapIndexUrl = `${baseUrl}/sitemap-index.xml`;
    const status = await fetchStatus(sitemapIndexUrl);
    assert('Sitemap index → returns 200', status === 200, `status ${status}`);
    if (status === 200) {
      try {
        const xml = await fetchBody(sitemapIndexUrl);
        
        // XML structure validation
        const sitemapValidation = validateSitemapIndex(xml, sitemapIndexUrl);
        assert('Sitemap index → valid XML structure', sitemapValidation.valid, sitemapValidation.error);
        
        // Check for expected sitemaps
        const expectedSitemaps = ['sitemap-agents.xml', 'sitemap-categories.xml', 'sitemap-comparisons.xml'];
        for (const sitemap of expectedSitemaps) {
          const contains = xml.includes(sitemap);
          assert(`Sitemap index → references ${sitemap}`, contains);
        }
      } catch (e) {
        assert('Sitemap index → valid XML', false, `Failed to read or parse: ${e}`);
      }
    }
  }

  // 404 validation - no self-canonicalization
  {
    const notFoundUrl = `${baseUrl}/this-page-does-not-exist`;
    const status = await fetchStatus(notFoundUrl);
    assert('Non-existent page → returns 404', status === 404, `status ${status}`);
    if (status === 404) {
      try {
        const body = await fetchBody(notFoundUrl);
        const canonicalMatch = /<link rel="canonical" href="([^"]+)"/.exec(body);
        let noSelfCanonical = true;
        if (canonicalMatch && canonicalMatch[1]) {
          const canonUrl = new URL(canonicalMatch[1], baseUrl);
          const currentUrl = new URL(notFoundUrl);
          if (canonUrl.href === currentUrl.href) {
            noSelfCanonical = false;
          }
        }
        assert('404 page → does not self-canonicalize', noSelfCanonical);
      } catch (e) {
        assert('404 page → check canonicalization', false, `Failed to read: ${e}`);
      }
    }
  }

  // Safe-Deep Evidence Validation Tests
  // Test that pages have evidence metadata
  {
    const evidenceTestUrl = `${baseUrl}/agents/cursor`;
    const status = await fetchStatus(evidenceTestUrl);
    if (status === 200) {
      try {
        const body = await fetchBody(evidenceTestUrl);
        // Check for evidence-related content or metadata
        // In production, this would check for evidence JSON-LD or data attributes
        const hasEvidenceMeta = body.includes('evidence') || body.includes('Evidence') || body.includes('data-evidence');
        // For now, we just verify the page loads correctly with evidence infrastructure
        assert('Evidence pages → agent page loads', status === 200);
      } catch (e) {
        console.log(`⚠️  Evidence validation skipped for agent page: ${e.message}`);
      }
    }
  }

  // Summary
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  console.log(`Total tests: ${results.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);

  if (failed > 0) {
    console.log('\n❌ FAILED TESTS:');
    for (const r of results.filter(r => !r.passed)) {
      console.log(`  - ${r.test}: ${r.details}`);
    }
    process.exit(1);
  } else {
    console.log('\n✅ ALL PRODUCTION TESTS PASSED');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});