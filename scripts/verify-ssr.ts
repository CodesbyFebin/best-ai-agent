#!/usr/bin/env node
/**
 * ATLAS P04 — SSR Verification Script
 *
 * Verifies that server-side rendering is working correctly for:
 *   - Home page
 *   - A sample agent page
 *   - A sample category page
 *   - A 404 page (should return 404 and not self-canonicalize)
 *
 * Run: npx tsx scripts/verify-ssr.ts
 */

import { execSync } from 'child_process';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

async function fetch(url: string): Promise<{ status: number; headers: Record<string, string>; body: string }> {
  try {
    // Use curl to get headers and body
    const headerOutput = execSync(`curl -s -D - -H "Accept: text/html" "${url}" -o /dev/null`).toString();
    const body = execSync(`curl -s -H "Accept: text/html" "${url}"`).toString();

    // Parse headers
    const headers: Record<string, string> = {};
    headerOutput.split('\n').forEach(line => {
      const parts = line.split(': ');
      if (parts.length === 2) {
        headers[parts[0]] = parts[1];
      }
    });

    // Extract status code from the first line (HTTP/1.1 200 OK)
    const statusLine = headerOutput.split('\n')[0];
    const statusMatch = statusLine.match(/\s(\d{3})\s/);
    const status = statusMatch ? parseInt(statusMatch[1], 10) : 0;

    return { status, headers, body };
  } catch (err) {
    // If curl fails, return a failed response
    return { status: 0, headers: {}, body: '' };
  }
}

async function main() {
  console.log('ATLAS verify:ssr — validating server-side rendering\n');

  const results: { test: string; passed: boolean; details?: string }[] = [];

  function assert(testName: string, condition: boolean, details?: string) {
    const passed = Boolean(condition);
    results.push({ test: testName, passed, details: details || (passed ? 'OK' : 'FAILED') });
    console.log(passed ? `✅ ${testName}` : `❌ ${testName} — ${details || ''}`);
  }

  // 1. Home page
  {
    const res = await fetch(`${baseUrl}/`);
    assert('Home page → returns 200', res.status === 200, `status ${res.status}`);
    if (res.status === 200) {
      assert('Home page → contains expected title', res.body.includes('<title>BestAIAgent.in'));
      assert('Home page → contains meta description', res.body.includes('<meta name="description" content="'));
    }
  }

  // 2. Sample agent page
  {
    const res = await fetch(`${baseUrl}/agents/cursor`);
    assert('Agent page → returns 200', res.status === 200, `status ${res.status}`);
    if (res.status === 200) {
      assert('Agent page → contains expected title', res.body.includes('Cursor AI Review') || res.body.includes('cursor'));
      // Check for canonical link - may use production domain or local domain
      const hasCanonical = res.body.includes('<link rel="canonical" href="https://bestaiagent.in/agents/cursor/"') ||
                            res.body.includes('<link rel="canonical" href="http://localhost:3000/agents/cursor/"');
      assert('Agent page → contains canonical link', hasCanonical);
      // Check for JSON-LD
      assert('Agent page → contains application/ld+json', res.body.includes('application/ld+json'));
    }
  }

  // 3. Sample category page
  {
    const res = await fetch(`${baseUrl}/categories/coding-agents`);
    assert('Category page → returns 200', res.status === 200, `status ${res.status}`);
    if (res.status === 200) {
      assert('Category page → contains expected title', res.body.includes('Best AI Coding Agents Directory'));
      // Check for canonical link - may use production domain or local domain
      const hasCanonical = res.body.includes('<link rel="canonical" href="https://bestaiagent.in/categories/coding-agents/"') ||
                            res.body.includes('<link rel="canonical" href="http://localhost:3000/categories/coding-agents/"');
      assert('Category page → contains canonical link', hasCanonical);
    }
  }

  // 4. 404 page
  {
    const res = await fetch(`${baseUrl}/this-page-does-not-exist`);
    assert('Non-existent page → returns 404', res.status === 404, `status ${res.status}`);
    if (res.status === 404) {
      assert('404 page → contains error message', res.body.includes('Page Not Found'));
      // Ensure no canonical tag (should not self-canonicalize)
      assert('404 page → does NOT contain a canonical tag pointing to itself', !res.body.includes(`<link rel="canonical" href="${baseUrl}/this-page-does-not-exist"`));
      // Also check that there is no canonical tag at all, or if there is, it's not self-referential
      // We'll check for any canonical tag and ensure it's not the current URL
      const canonicalMatch = res.body.match(/<link rel="canonical" href="([^"]+)"/);
      if (canonicalMatch && canonicalMatch[1]) {
        const canonUrl = new URL(canonicalMatch[1], baseUrl);
        const currentUrl = new URL(`${baseUrl}/this-page-does-not-exist`);
        assert('404 page → canonical URL is not the current URL', canonUrl.href !== currentUrl.href);
      }
    }
  }

  // 5. Check that the homepage does not have a self-canonical tag that is incorrect (it should be correct)
  {
    const res = await fetch(`${baseUrl}/`);
    if (res.status === 200) {
      const canonicalMatch = res.body.match(/<link rel="canonical" href="([^"]+)"/);
      if (canonicalMatch && canonicalMatch[1]) {
        const canonicalHref = canonicalMatch[1];
        // Accept both production domain and localhost for local testing
        const isValidCanonical = canonicalHref === 'https://bestaiagent.in/' || 
                                  canonicalHref === 'http://localhost:3000/' ||
                                  canonicalHref === `${baseUrl}/`;
        assert('Homepage → contains valid canonical tag', isValidCanonical, `canonical href: ${canonicalHref}`);
      } else {
        assert('Homepage → contains a canonical tag', false, 'No canonical tag found');
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
    console.log('\n✅ ALL SSR TESTS PASSED');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});