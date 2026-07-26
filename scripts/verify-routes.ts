/**
 * ATLAS P01 — Route verification.
 * Proves the #1 P0 fix: dynamic slugs now require real entities.
 *
 *   valid slug   → resolveRoute → { kind: 'valid' }
 *   fake slug    → resolveRoute → { kind: 'not-found' }
 *   alias slug   → resolveRoute → { kind: 'redirect' } to canonical
 *
 * Fails (exit 1) if any assertion is wrong.
 *
 * Usage: npx tsx scripts/verify-routes.ts
 */
import { resolveRoute } from '../src/routing/routeResolver.js';

let pass = 0;
let fail = 0;

function check(label: string, condition: boolean, detail = '') {
  if (condition) {
    pass++;
  } else {
    fail++;
    console.error(`  ✗ FAIL: ${label}${detail ? ` — ${detail}` : ''}`);
  }
}

function expectValid(path: string) {
  const r = resolveRoute(path);
  check(`VALID   ${path}`, r.kind === 'valid', `got ${r.kind}`);
}

function expectNotFound(path: string) {
  const r = resolveRoute(path);
  check(`404     ${path}`, r.kind === 'not-found', `got ${r.kind}`);
}

function expectRedirect(path: string, dest: string) {
  const r = resolveRoute(path);
  check(
    `301     ${path} → ${dest}`,
    r.kind === 'redirect' && (r as { destination: string }).destination === dest,
    `got ${r.kind}${r.kind === 'redirect' ? ' → ' + (r as { destination: string }).destination : ''}`,
  );
}

console.log('ATLAS verify:routes — validating dynamic slug resolution\n');

// --- Valid dynamic routes (real entities) -----------------------------------
console.log('Real entities must resolve valid:');
expectValid('/agents/cursor');
expectValid('/agents/chatgpt');
expectValid('/agents/claude-code');
expectValid('/agents/vapi');
expectValid('/agents/crewai');
expectValid('/agents/langgraph');
expectValid('/categories/coding-agents');
expectValid('/categories/crm');
expectValid('/categories/voice-bots');
expectValid('/compare/cursor-vs-copilot');
expectValid('/compare/chatgpt-vs-claude');
expectValid('/compare/crewai-vs-autogen');
expectValid('/mcp/servers/github');
expectValid('/mcp/servers/postgres');
expectValid('/research/state-of-ai-agents-india-2026');
expectValid('/authors/editorial-team');

// --- Fake slugs MUST 404 (the critical P0 fix) ------------------------------
console.log('\nFake slugs must 404 (previously returned 200 — the P0 bug):');
expectNotFound('/agents/this-agent-does-not-exist');
expectNotFound('/agents/definitely-fake-agent-xyz');
expectNotFound('/categories/nonexistent-category');
expectNotFound('/categories/fake-category-123');
expectNotFound('/compare/fake-vs-invented');
expectNotFound('/compare/totally-made-up-vs-pair');
expectNotFound('/mcp/servers/unknown');
expectNotFound('/mcp/servers/fake-server-xyz');
expectNotFound('/research/fabricated-report');
expectNotFound('/research/fake-research-report-123');
expectNotFound('/authors/fake-person');
expectNotFound('/authors/does-not-exist-author');

// --- Alias redirects to canonical -------------------------------------------
console.log('\nAliases redirect to canonical slug:');
expectRedirect('/agents/cursor-ai', '/agents/cursor');
expectRedirect('/agents/vapi-ai', '/agents/vapi');
expectRedirect('/agents/flowise', '/agents/flowise-ai');

// --- Static canonical routes ------------------------------------------------
console.log('\nStatic canonical routes resolve valid:');
expectValid('/');
expectValid('/best-ai-agent');
expectValid('/best-ai-agent-for-coding');
expectValid('/compare');
expectValid('/mcp-directory');
expectValid('/methodology');

// --- Path normalization -----------------------------------------------------
console.log('\nPath normalization (case, trailing slash, dup slashes):');
expectValid('/Agents/Cursor');        // uppercase
expectValid('/agents/cursor/');        // trailing slash
expectValid('//agents//cursor');      // dup slashes
expectNotFound('/agents//fake-slug'); // dup slashes + fake still 404

// --- Summary ----------------------------------------------------------------
console.log(`\n────────────────────────────────────────`);
console.log(`  ${pass} passed, ${fail} failed`);
console.log(`────────────────────────────────────────`);
if (fail > 0) {
  console.error('\n✗ verify:routes FAILED — dynamic slug validation has regressions.');
  process.exit(1);
}
console.log('✓ verify:routes PASSED — all dynamic slugs validated against real entities.');
process.exit(0);