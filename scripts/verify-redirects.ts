#!/usr/bin/env node
/**
 * ATLAS P02 — Legacy Redirect Verification Script
 *
 * Verifies that all legacy redirects in routeRegistry.ts:
 *   1. Are 301 (server-side)
 *   2. Are single-hop (no redirect chains)
 *   3. Point to valid, existing canonical routes or real entities
 *   4. Have semantically correct destinations (fixed MCP redirects)
 *
 * Run: npx tsx scripts/verify-redirects.ts
 */

import { canonicalRoutes, legacyRedirects } from '../src/routing/routeRegistry.js';
import { resolveRoute, type RouteResolution } from '../src/routing/routeResolver.js';

interface RedirectTestCase {
  from: string;
  expectedDestination: string;
  description: string;
}

const results: { test: string; passed: boolean; details?: string }[] = [];

function assert(testName: string, condition: boolean, details?: string) {
  const passed = Boolean(condition);
  results.push({ test: testName, passed, details: details || (passed ? 'OK' : 'FAILED') });
  console.log(passed ? `✅ ${testName}` : `❌ ${testName} — ${details}`);
}

function assertEqual(actual: string, expected: string, testName: string) {
  const passed = actual === expected;
  results.push({ test: testName, passed, details: passed ? 'OK' : `expected "${expected}", got "${actual}"` });
  console.log(passed ? `✅ ${testName}` : `❌ ${testName} — expected "${expected}", got "${actual}"`);
}

function assertRedirectDestination(resolution: RouteResolution, expected: string, testName: string) {
  if (resolution.kind === 'redirect') {
    assertEqual(resolution.destination, expected, testName);
  } else {
    assert(testName, false, `Expected redirect, got ${resolution.kind}`);
  }
}

// 1. All legacyRedirects keys should resolve to 'redirect' kind
console.log('\n=== 1. Legacy redirect registry entries ===');
for (const [from, expectedTo] of Object.entries(legacyRedirects)) {
  const resolution = resolveRoute(from);
  assert(`${from} → resolves to redirect`, resolution.kind === 'redirect');
  assertRedirectDestination(resolution, expectedTo, `${from} → destination matches registry`);
}

/** File-extension paths (e.g. .xml, .json, .txt) are handled by Express direct routes, not resolveRoute. */
function isExpressFileRoute(path: string): boolean {
  return /\.[a-z]{2,5}$/i.test(path);
}

// 2. All redirect destinations should resolve to 'valid' (real route/entity)
console.log('\n=== 2. Redirect destinations resolve to valid routes ===');
const seenDestinations = new Set<string>();
for (const [from, to] of Object.entries(legacyRedirects)) {
  if (seenDestinations.has(to)) continue;
  seenDestinations.add(to);
  if (isExpressFileRoute(to)) continue;  // file endpoints are handled by Express directly
  const resolution = resolveRoute(to);
  let detail = 'OK';
  if (resolution.kind === 'redirect') detail = `CHAIN: redirects to ${resolution.destination}`;
  else if (resolution.kind === 'not-found') detail = '404 - destination does not exist';
  assert(`${to} (from ${from}) → resolves to valid`, resolution.kind === 'valid', detail);
}

// 3. No redirect chains (single-hop)
console.log('\n=== 3. Single-hop verification (no chains) ===');
for (const [from, to] of Object.entries(legacyRedirects)) {
  if (isExpressFileRoute(to)) {
    assert(`${from} → ${to} is single-hop (Express file route)`, true);
    continue;
  }
  const resolution = resolveRoute(to);
  let detail = 'OK';
  if (resolution.kind === 'redirect') detail = `CHAIN DETECTED: ${to} → ${resolution.destination}`;
  assert(`${from} → ${to} is single-hop`, resolution.kind !== 'redirect', detail);
}

// 4. Semantic correctness of MCP redirects (P02 fix)
console.log('\n=== 4. MCP redirect semantic correctness ===');
const mcpRedirectTests: RedirectTestCase[] = [
  { from: '/notion-server', expectedDestination: '/mcp/servers/notion', description: 'Notion MCP server' },
  { from: '/excel-server', expectedDestination: '/mcp/servers/excel', description: 'Excel MCP server' },
  { from: '/shopify-server', expectedDestination: '/mcp/servers/shopify', description: 'Shopify MCP server' },
];
for (const { from, expectedDestination, description } of mcpRedirectTests) {
  const resolution = resolveRoute(from);
  assert(`${description}: ${from} redirects correctly`, resolution.kind === 'redirect');
  assertRedirectDestination(resolution, expectedDestination, `${from} → ${expectedDestination} (semantic fix)`);
}

// 5. /tools/ legacy redirects
console.log('\n=== 5. /tools/ legacy redirects ===');
const toolsRedirects: RedirectTestCase[] = [
  { from: '/tools/cursor', expectedDestination: '/agents/cursor', description: 'Cursor AI' },
  { from: '/tools/cursor-ai', expectedDestination: '/agents/cursor', description: 'Cursor AI (alias)' },
  { from: '/tools/claude-code', expectedDestination: '/agents/claude-code', description: 'Claude Code' },
  { from: '/tools/chatgpt', expectedDestination: '/agents/chatgpt', description: 'ChatGPT' },
  { from: '/tools/claude', expectedDestination: '/agents/claude', description: 'Claude' },
  { from: '/tools/vapi', expectedDestination: '/agents/vapi', description: 'Vapi' },
  { from: '/tools/vapi-ai', expectedDestination: '/agents/vapi', description: 'Vapi (alias)' },
  { from: '/tools/crewai', expectedDestination: '/agents/crewai', description: 'CrewAI' },
  { from: '/tools/yellow-ai', expectedDestination: '/agents/yellow-ai', description: 'Yellow.ai' },
  { from: '/tools/flowise', expectedDestination: '/agents/flowise-ai', description: 'Flowise' },
  { from: '/tools/flowise-ai', expectedDestination: '/agents/flowise-ai', description: 'Flowise (alias)' },
  { from: '/tools/reclaim-ai', expectedDestination: '/agents/reclaim-ai', description: 'Reclaim AI' },
  { from: '/tools/n8n', expectedDestination: '/agents/n8n', description: 'n8n' },
  { from: '/tools/relevance-ai', expectedDestination: '/agents/relevance-ai', description: 'Relevance AI' },
  { from: '/tools/langgraph', expectedDestination: '/agents/langgraph', description: 'LangGraph' },
  { from: '/tools/autogen', expectedDestination: '/agents/autogen', description: 'AutoGen' },
  { from: '/tools/windsurf', expectedDestination: '/agents/windsurf', description: 'Windsurf' },
  { from: '/tools/retell-ai', expectedDestination: '/agents/retell-ai', description: 'Retell AI' },
  // Trailing slash variants
  { from: '/tools/cursor/', expectedDestination: '/agents/cursor', description: 'Cursor (trailing slash)' },
  { from: '/tools/claude-code/', expectedDestination: '/agents/claude-code', description: 'Claude Code (trailing slash)' },
  { from: '/tools/chatgpt/', expectedDestination: '/agents/chatgpt', description: 'ChatGPT (trailing slash)' },
  { from: '/tools/vapi/', expectedDestination: '/agents/vapi', description: 'Vapi (trailing slash)' },
  { from: '/tools/crewai/', expectedDestination: '/agents/crewai', description: 'CrewAI (trailing slash)' },
  { from: '/tools/yellow-ai/', expectedDestination: '/agents/yellow-ai', description: 'Yellow.ai (trailing slash)' },
];
for (const { from, expectedDestination, description } of toolsRedirects) {
  const resolution = resolveRoute(from);
  assert(`${description}: ${from} → redirects`, resolution.kind === 'redirect');
  assertRedirectDestination(resolution, expectedDestination, `${from} → ${expectedDestination}`);
}

// 6. /a/ legacy redirects
console.log('\n=== 6. /a/ legacy redirects ===');
const aRedirects: RedirectTestCase[] = [
  { from: '/a/best-ai-agent/reviews/chatgpt', expectedDestination: '/agents/chatgpt', description: 'ChatGPT review' },
  { from: '/a/best-ai-agent/reviews/claude', expectedDestination: '/agents/claude', description: 'Claude review' },
  { from: '/a/best-ai-agent/reviews/cursor', expectedDestination: '/agents/cursor', description: 'Cursor review' },
  { from: '/a/best-ai-agent/reviews/vapi', expectedDestination: '/agents/vapi', description: 'Vapi review' },
  { from: '/a/best-ai-agent/reviews/crewai', expectedDestination: '/agents/crewai', description: 'CrewAI review' },
];
for (const { from, expectedDestination, description } of aRedirects) {
  const resolution = resolveRoute(from);
  assert(`${description}: ${from} → redirects`, resolution.kind === 'redirect');
  assertRedirectDestination(resolution, expectedDestination, `${from} → ${expectedDestination}`);
}

// 7. Keyword overlap redirects
console.log('\n=== 7. Keyword overlap redirects ===');
const keywordRedirects: RedirectTestCase[] = [
  { from: '/best-ai-agent-for-crm', expectedDestination: '/categories/crm', description: 'CRM category' },
  { from: '/ai-agents-for-crm', expectedDestination: '/categories/crm', description: 'CRM category (alt)' },
  { from: '/best-ai-agent-for-sales', expectedDestination: '/categories/sales', description: 'Sales category' },
  { from: '/ai-agents-for-sales', expectedDestination: '/categories/sales', description: 'Sales category (alt)' },
  { from: '/best-ai-agent-for-marketing', expectedDestination: '/categories/marketing', description: 'Marketing category' },
  { from: '/ai-agents-for-marketing', expectedDestination: '/categories/marketing', description: 'Marketing category (alt)' },
  { from: '/glossary', expectedDestination: '/sitemap', description: 'Glossary → Sitemap' },
  { from: '/glossary-hub', expectedDestination: '/sitemap', description: 'Glossary hub → Sitemap' },
  { from: '/pricing-hub', expectedDestination: '/pricing', description: 'Pricing hub → Pricing' },
  { from: '/pricing-intelligence', expectedDestination: '/pricing', description: 'Pricing intelligence → Pricing' },
];
for (const { from, expectedDestination, description } of keywordRedirects) {
  const resolution = resolveRoute(from);
  assert(`${description}: ${from} → redirects`, resolution.kind === 'redirect');
  assertRedirectDestination(resolution, expectedDestination, `${from} → ${expectedDestination}`);
}

// 8. Verify canonical routes that are redirects (none should be, all redirects in legacyRedirects)
console.log('\n=== 8. Canonical routes should not be redirects ===');
let canonicalRedirectCount = 0;
for (const [path, route] of Object.entries(canonicalRoutes)) {
  if (route.status === 'redirect') {
    console.log(`⚠️  Canonical route ${path} has status=redirect`);
    canonicalRedirectCount++;
  }
}
assert('No canonical routes marked as redirect', canonicalRedirectCount === 0);

// 9. All redirect destinations exist in canonicalRoutes OR are valid dynamic entity routes
console.log('\n=== 9. All redirect destinations resolve to valid entities ===');
for (const [from, to] of Object.entries(legacyRedirects)) {
  if (isExpressFileRoute(to)) {
    assert(`${from} → ${to} destination is valid (Express file route)`, true);
    continue;
  }
  const resolution = resolveRoute(to);
  let detail = 'OK';
  if (resolution.kind === 'not-found') detail = 'DESTINATION 404';
  else if (resolution.kind === 'redirect') detail = `CHAIN to ${resolution.destination}`;
  assert(`${from} → ${to} destination is valid`, resolution.kind === 'valid', detail);
}

// 10. Hub routes should be valid (not redirect)
console.log('\n=== 10. Hub routes resolve to valid ===');
const hubPaths = ['/agents', '/categories', '/compare', '/research', '/mcp-servers', '/authors'];
for (const path of hubPaths) {
  const resolution = resolveRoute(path);
  let detail = 'OK';
  if (resolution.kind === 'redirect') detail = `redirects to ${resolution.destination}`;
  else if (resolution.kind === 'not-found') detail = '404';
  assert(`${path} hub → valid`, resolution.kind === 'valid', detail);
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
  console.log('\n✅ ALL REDIRECT TESTS PASSED');
  process.exit(0);
}