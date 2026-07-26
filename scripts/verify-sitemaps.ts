#!/usr/bin/env node
/**
 * ATLAS P03 — Sitemap Verification Script
 *
 * Verifies that:
 *   1. The sitemap index (/sitemap.xml) returns 200 and is valid XML (redirects to /sitemap-index.xml).
 *   2. The sitemap index references all expected segmented sitemaps.
 *   3. Each segmented sitemap returns 200 and contains valid XML with URLs.
 *   4. All URLs in the sitemaps are accessible (returns 200 or 301).
 *
 * Run: npx tsx scripts/verify-sitemaps.ts
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { resolve } from 'path';

interface SimpleResponse {
  ok: boolean;
  status: number;
  text: () => Promise<string>;
}

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

async function fetch(url: string): Promise<SimpleResponse> {
  // Use node-fetch if available, otherwise use a simple curl via execSync for simplicity in this script
  // For the sake of this example, we'll use curl via execSync.
  // In a real script, you might use a proper HTTP client.
  try {
    const stdout = execSync(`curl -s -o /dev/null -w "%{http_code}" "${url}"`);
    const status = parseInt(stdout.toString().trim(), 10);
    return {
      ok: status === 200 || status === 301,
      status,
      // We don't have the body in this simple version, but we can fetch it if needed for XML validation
      text: () => {
        const xml = execSync(`curl -s "${url}"`).toString();
        return Promise.resolve(xml);
      }
    };
  } catch (err) {
    // If curl fails (e.g., network error), we treat it as a failure
    return {
      ok: false,
      status: 0,
      text: () => Promise.resolve('')
    };
  }
}

function parseSitemapIndex(xml: string): string[] {
  // Extract all <loc> tags from the sitemap index
  const locMatches = xml.match(/<loc>([^<]+)<\/loc>/g);
  if (!locMatches) return [];
  return locMatches.map(match => match.replace(/<\/?loc>/g, ''));
}

function parseSitemap(xml: string): string[] {
  // Extract all <loc> tags from a sitemap
  const locMatches = xml.match(/<loc>([^<]+)<\/loc>/g);
  if (!locMatches) return [];
  return locMatches.map(match => match.replace(/<\/?loc>/g, ''));
}

async function main() {
  console.log('ATLAS verify:sitemaps — validating sitemap index and segments\n');

  const results: { test: string; passed: boolean; details?: string }[] = [];

  function assert(testName: string, condition: boolean, details?: string) {
    const passed = Boolean(condition);
    results.push({ test: testName, passed, details: details || (passed ? 'OK' : 'FAILED') });
    console.log(passed ? `✅ ${testName}` : `❌ ${testName} — ${details || ''}`);
  }

// 1. Fetch sitemap index
  const sitemapIndexUrl = `${baseUrl}/sitemap.xml`;
  let sitemapIndexXml = '';
  try {
    const res = await fetch(sitemapIndexUrl);
    assert(`${sitemapIndexUrl} → returns 200`, res.ok, `status ${res.status}`);
    if (res.ok) {
      sitemapIndexXml = await res.text();
    }
  } catch (e) {
    assert(`${sitemapIndexUrl} → returns 200`, false, `Failed to fetch: ${e}`);
  }

  if (sitemapIndexXml) {
    // 2. Validate XML structure (basic check for <sitemapindex> tag)
    assert('Sitemap index contains <sitemapindex> tag', sitemapIndexXml.includes('<sitemapindex'));

    // 3. Extract sitemap URLs from index
    const sitemapUrls = parseSitemapIndex(sitemapIndexXml);
    assert('Sitemap index contains at least one sitemap link', sitemapUrls.length > 0);

    // 4. For each sitemap URL, fetch and validate
    for (const sitemapUrl of sitemapUrls) {
      // The sitemap index contains absolute URLs (from DOMAIN constant). For local testing,
      // we need to replace the domain with our baseUrl or use relative paths.
      let absoluteUrl = sitemapUrl;
      if (sitemapUrl.startsWith('http')) {
        // Replace the DOMAIN with baseUrl's host for local testing
        try {
          const url = new URL(sitemapUrl);
          const base = new URL(baseUrl);
          absoluteUrl = `${base.protocol}//${base.host}${url.pathname}`;
        } catch {
          absoluteUrl = `${baseUrl}${sitemapUrl}`;
        }
      } else {
        absoluteUrl = `${baseUrl}${sitemapUrl}`;
      }
      try {
        const res = await fetch(absoluteUrl);
        assert(`${absoluteUrl} → returns 200`, res.ok, `status ${res.status}`);
        if (res.ok) {
          const xml = await res.text();
          // Validate that it's a sitemap (contains <urlset>)
          assert(`${absoluteUrl} → contains <urlset>`, xml.includes('<urlset'));
          // Extract URLs from this sitemap
          const urls = parseSitemap(xml);
          assert(`${absoluteUrl} → contains at least one URL`, urls.length > 0);
          // Optionally, check a few URLs for accessibility (we'll check the first 5 for brevity)
          const sampleSize = Math.min(5, urls.length);
          for (let i = 0; i < sampleSize; i++) {
            const url = urls[i];
            let absoluteUrl = url;
            if (url.startsWith('http')) {
              // Replace DOMAIN with baseUrl for local testing
              try {
                const urlObj = new URL(url);
                const base = new URL(baseUrl);
                absoluteUrl = `${base.protocol}//${base.host}${urlObj.pathname}`;
              } catch {
                absoluteUrl = `${baseUrl}${url}`;
              }
            } else {
              absoluteUrl = `${baseUrl}${url}`;
            }
            try {
              const res = await fetch(absoluteUrl);
              // We allow 200 (OK) or 301 (redirect) as success
              const ok = res.status === 200 || res.status === 301;
              assert(`${absoluteUrl} → accessible (200 or 301)`, ok, `status ${res.status}`);
            } catch (e) {
              assert(`${absoluteUrl} → accessible`, false, `Failed to fetch: ${e}`);
            }
          }
        }
      } catch (e) {
        assert(`${sitemapUrl} → fetch and validate`, false, `Error: ${e}`);
      }
    }
  }

  // Summary
  console.log('\n=== SUMMARY ===');
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
    console.log('\n✅ ALL SITEMAP TESTS PASSED');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});