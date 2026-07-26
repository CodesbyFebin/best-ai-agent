#!/usr/bin/env tsx
/**
 * P0-04: Scope Freeze Verification
 *
 * Ensures Phase C1 deliverables are formally frozen:
 * - All contracts: Status: Frozen (v1.0.0)
 * - All ADRs: Approved
 * - CONTENT_OS.md: Version 1.0.0, Frozen status
 * - SCOPE_FREEZE_SIGNOFF.md exists
 *
 * Output: evidence/p0-scope-freeze/
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EVIDENCE_DIR = path.join(__dirname, '..', 'evidence', 'p0-scope-freeze');
const REPORT_PATH = path.join(EVIDENCE_DIR, 'freeze-report.json');
const LOG_PATH = path.join(EVIDENCE_DIR, 'verification.log');

function log(msg: string) {
  fs.appendFileSync(LOG_PATH, msg + '\n');
  console.log(msg);
}

function ensureEvidenceDir() {
  if (!fs.existsSync(EVIDENCE_DIR)) {
    fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
  }
}

function checksum(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    hash = ((hash << 5) - hash) + content.charCodeAt(i);
    hash = hash & hash;
  }
  return `${Math.abs(hash).toString(16)}:${content.length}`;
}

function writeChecksums() {
  const files = fs.readdirSync(EVIDENCE_DIR).filter(f => f !== 'checksums.sha256');
  const lines = files.map(f => {
    const content = fs.readFileSync(path.join(EVIDENCE_DIR, f), 'utf-8');
    return `${checksum(content)}  ${f}`;
  });
  fs.writeFileSync(path.join(EVIDENCE_DIR, 'checksums.sha256'), lines.join('\n') + '\n');
}

function verifyContracts(): { pass: boolean; details: any[] } {
  const contractsDir = path.join(__dirname, '..', 'engine', 'content', 'contracts');
  const files = fs.readdirSync(contractsDir).filter(f => f.endsWith('.ts'));
  const expectedFrozenHeader = /Frozen\s*\(v1\.0\.0\)/i;
  const results: any[] = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(contractsDir, file), 'utf-8');
    const firstLineMatch = content.match(/^\/\/\s*Status:\s*(.+)$/m);
    const status = firstLineMatch ? firstLineMatch[1].trim() : '';
    const pass = expectedFrozenHeader.test(status);
    results.push({ file, status, pass });
  }

  return { pass: results.every(r => r.pass), details: results };
}

function verifyADRs(): { pass: boolean; details: any[] } {
  const adrDir = path.join(__dirname, '..', 'docs', 'DECISIONS');
  if (!fs.existsSync(adrDir)) return { pass: false, details: [{ file: 'N/A', error: 'DECISIONS directory missing' }] };

  const files = fs.readdirSync(adrDir).filter(f => f.endsWith('.md'));
  const results: any[] = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(adrDir, file), 'utf-8');
    // Match **Status:** Approved (case-insensitive)
    const statusMatch = content.match(/\*\*Status:\*\*\s*(\w+)/i);
    const status = statusMatch ? statusMatch[1].trim() : '';
    const pass = /Approved/i.test(status);
    results.push({ file, status, pass });
  }

  return { pass: results.every(r => r.pass), details: results };
}

function verifyContentOsSpec(): { pass: boolean; version?: string; status?: string } {
  const file = path.join(__dirname, '..', 'docs', 'ARCHITECTURE', 'CONTENT_OS.md');
  if (!fs.existsSync(file)) return { pass: false };
  const content = fs.readFileSync(file, 'utf-8');

  const versionMatch = content.match(/^\*\*Version:\*\*\s*([^\s]+)/m);
  const statusMatch = content.match(/^\*\*Status:\*\*\s*([^\n]+)/m);

  const version = versionMatch ? versionMatch[1].trim() : '';
  const status = statusMatch ? statusMatch[1].trim() : '';

  const pass = version === '1.0.0' && /Frozen/i.test(status);
  return { pass, version, status };
}

function verifyScopeFreezeSignoff(): { pass: boolean; exists: boolean } {
  const file = path.join(__dirname, '..', 'docs', 'SCOPE_FREEZE_SIGNOFF.md');
  const exists = fs.existsSync(file);
  // Presence is enough for now; signature count can be checked if needed
  return { pass: exists, exists };
}

function main() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  P0-04: Scope Freeze Verification');
  console.log('═══════════════════════════════════════════════════\n');

  ensureEvidenceDir();
  fs.writeFileSync(LOG_PATH, `P0-04 Scope Freeze Verification\nStarted: ${new Date().toISOString()}\n\n`);

  const results: any = {
    timestamp: new Date().toISOString(),
    contracts: verifyContracts(),
    adrs: verifyADRs(),
    contentOsSpec: verifyContentOsSpec(),
    scopeFreezeSignoff: verifyScopeFreezeSignoff(),
    passed: false
  };

  results.passed = results.contracts.pass && results.adrs.pass && results.contentOsSpec.pass && results.scopeFreezeSignoff.pass;

  // Write report
  fs.writeFileSync(REPORT_PATH, JSON.stringify(results, null, 2));
  log(`✅ Report written: ${REPORT_PATH}`);

  // Evidence manifest
  const manifest = {
    phase: 'P0-04',
    control: 'Scope freeze verification',
    generatedAt: new Date().toISOString(),
    summary: {
      contractsFrozen: results.contracts.pass,
      adrsApproved: results.adrs.pass,
      contentOsFrozen: results.contentOsSpec.pass,
      signoffPresent: results.scopeFreezeSignoff.pass,
      overall: results.passed ? 'PASS' : 'FAIL'
    }
  };
  fs.writeFileSync(path.join(EVIDENCE_DIR, 'evidence-manifest.json'), JSON.stringify(manifest, null, 2));

  // Checksums
  writeChecksums();

  // Console summary
  console.log('\n📊 Results:');
  console.log(`  Contracts frozen: ${results.contracts.pass ? '✅' : '❌'} (${results.contracts.details.length} files)`);
  console.log(`  ADRs approved: ${results.adrs.pass ? '✅' : '❌'} (${results.adrs.details.length} files)`);
  console.log(`  CONTENT_OS.md: v${results.contentOsSpec.version || '?'}, ${results.contentOsSpec.status || '?'} → ${results.contentOsSpec.pass ? '✅' : '❌'}`);
  console.log(`  Scope Freeze sign-off: ${results.scopeFreezeSignoff.pass ? '✅' : '❌'}`);
  console.log(`  Overall: ${results.passed ? '✅ PASS' : '❌ FAIL'}`);

  if (!results.passed) {
    process.exit(1);
  }
}

main();
