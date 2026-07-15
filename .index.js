#!/usr/bin/env node

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const DIST_DIR = path.join(ROOT, 'dist');
const REPORTS_DIR = path.join(ROOT, 'reports');

const COMMANDS = [
  { label: 'Build static site', cmd: 'npm run build', check: () => false, nonBlocking: true },
  { label: 'Generate route manifest', cmd: 'npx tsx scripts/generate-route-manifest.ts', check: () => fs.existsSync(path.join(PUBLIC_DIR, 'route-manifest.json')) },
  { label: 'Generate SEO sitemaps', cmd: 'node scripts/generate_sitemaps.js', check: () => fs.existsSync(path.join(PUBLIC_DIR, 'sitemap.xml')) },
  { label: 'Generate authority sitemaps', cmd: 'node scripts/generate-authority-sitemaps.cjs', check: () => fs.existsSync(path.join(PUBLIC_DIR, 'sitemaps', 'pillars.xml')) },
  { label: 'Generate schema-ld', cmd: 'node scripts/generate-schema-ld.js', check: () => fs.existsSync(path.join(PUBLIC_DIR, 'schema-ld.json')) },
  { label: 'Validate crawl readiness', cmd: 'node scripts/validate-crawl-readiness.cjs', check: () => fs.existsSync(path.join(REPORTS_DIR, 'ai-crawl-readiness-report.md')) },
];

function runCommand(label, cmd, nonBlocking = false) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`▶ ${label}`);
  console.log(`  ${cmd}`);
  console.log('='.repeat(60));
  try {
    execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: 'inherit' });
    console.log(`✅ ${label} complete`);
    return true;
  } catch (error) {
    console.error(`❌ ${label} failed:`, error.message);
    if (nonBlocking) {
      console.warn(`⚠️  ${label} failed but continuing...`);
      return true;
    }
    return false;
  }
}

function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');

  console.log('🚀 Starting auto-indexing pipeline...\n');

  const results = [];
  for (const step of COMMANDS) {
    const shouldRun = force || !step.check();
    if (!shouldRun) {
      console.log(`⏭  Skipping ${step.label} (already up-to-date)`);
      results.push({ label: step.label, skipped: true });
      continue;
    }
    const success = runCommand(step.label, step.cmd, step.nonBlocking);
    results.push({ label: step.label, success });
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log('📊 Pipeline Summary');
  console.log('='.repeat(60));
  for (const result of results) {
    const status = result.skipped ? '⏭  SKIPPED' : result.success ? '✅ PASS' : '❌ FAIL';
    console.log(`${status}  ${result.label}`);
  }

  const failed = results.filter((r) => !r.skipped && !r.success);
  if (failed.length > 0) {
    console.log(`\n❌ ${failed.length} step(s) failed. Review errors above.`);
    process.exit(1);
  }
  console.log('\n🎉 Auto-indexing complete!');
}

main();
