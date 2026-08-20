#!/usr/bin/env npx tsx

/**
 * Verify that all redirect destinations resolve to valid routes
 */

import { legacyRedirects } from '../src/routing/routeRegistry.js';
import { resolveRoute } from '../src/routing/routeResolver.js';

console.log('=== Verifying all redirect destinations ===\n');

let valid = 0;
let broken = 0;
const brokenRedirects: Array<{ from: string; to: string }> = [];

for (const [from, to] of Object.entries(legacyRedirects)) {
  // Skip sitemap file routes (handled by Express)
  if (to.endsWith('.xml')) continue;
  
  const resolution = resolveRoute(to);
  if (resolution.kind === 'valid') {
    valid++;
  } else if (resolution.kind === 'redirect') {
    // The destination is itself a redirect - chain detected (bad)
    broken++;
    brokenRedirects.push({ from, to });
    console.log(`❌ CHAIN: ${from} → ${to} → ${resolution.destination}`);
  } else {
    broken++;
    brokenRedirects.push({ from, to });
    console.log(`❌ BROKEN: ${from} → ${to} (404)`);
  }
}

console.log(`\n=== Summary ===`);
console.log(`Valid redirects: ${valid}`);
console.log(`Broken redirects: ${broken}`);

if (broken > 0) {
  console.log(`\nBroken destinations (need fixing):`);
  const uniqueBrokenDestinations = [...new Set(brokenRedirects.map(r => r.to))];
  uniqueBrokenDestinations.forEach(dest => {
    console.log(`  ${dest}`);
  });
}
