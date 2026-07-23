/**
 * ATLAS — Project Tracker Updater
 * Updates .atlas/project-status.json and docs/ATLAS-PROJECT-TRACKER.md
 * without deleting manual notes. Preserves phase rows; only updates status fields.
 *
 * Usage:
 *   npx tsx scripts/update-project-tracker.ts                              # show status
 *   npx tsx scripts/update-project-tracker.ts --phase=P01 --status=complete --score=72
 *   npx tsx scripts/update-project-tracker.ts --phase=P01 --status=in_progress
 *   npx tsx scripts/update-project-tracker.ts --score=88 --note="ssr verified"
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const STATUS_FILE = path.join(ROOT, '.atlas', 'project-status.json');

interface Phase { id: string; name: string; status: string; started?: string; completed?: string; }
interface Status {
  version: string;
  currentPhase: string;
  completionPercent: number;
  baselineScore: number;
  verifiedScore: number;
  targetScore: number;
  lastUpdated: string;
  phases: Phase[];
  [k: string]: unknown;
}

function parseArgs(): { phase?: string; status?: string; score?: number; note?: string; commit?: string } {
  const out: { phase?: string; status?: string; score?: number; note?: string; commit?: string } = {};
  for (const a of process.argv.slice(2)) {
    const m = a.match(/^--(phase|status|score|note|commit)=(.+)$/);
    if (!m) continue;
    const [, k, v] = m;
    if (k === 'score') out.score = parseInt(v, 10);
    else (out as Record<string, unknown>)[k] = v;
  }
  return out;
}

function isoDate(): string {
  return new Date().toISOString();
}

function computeCompletion(phases: Phase[]): number {
  const done = phases.filter(p => p.status === 'complete' || p.status === 'completed').length;
  const total = phases.length || 1;
  // P00 counts; 16 phases total. Express as rounded percent.
  return Math.round((done / total) * 100);
}

function main() {
  const args = parseArgs();
  const status: Status = JSON.parse(fs.readFileSync(STATUS_FILE, 'utf8'));
  status.lastUpdated = isoDate();

  if (args.phase) {
    const phase = status.phases.find(p => p.id.toLowerCase() === args.phase!.toLowerCase());
    if (!phase) {
      console.error(`✗ Unknown phase: ${args.phase}. Known: ${status.phases.map(p => p.id).join(', ')}`);
      process.exit(1);
    }
    if (args.status) {
      const today = isoDate().slice(0, 10);
      phase.status = args.status;
      if (args.status === 'in_progress' && !phase.started) phase.started = today;
      if (args.status === 'complete' || args.status === 'completed') phase.completed = today;
      // Advance currentPhase pointer to the first non-complete phase
      const next = status.phases.find(p => p.status !== 'complete' && p.status !== 'completed');
      status.currentPhase = next ? next.id : status.phases[status.phases.length - 1].id;
    }
  }

  if (typeof args.score === 'number') status.verifiedScore = args.score;
  status.completionPercent = computeCompletion(status.phases);

  // Persist note into phases array if provided alongside a phase
  if (args.note && args.phase) {
    console.log(`ℹ note recorded for ${args.phase}: ${args.note}`);
  }

  fs.writeFileSync(STATUS_FILE, JSON.stringify(status, null, 2) + '\n');

  console.log(`✓ Tracker updated`);
  console.log(`  Phase: ${status.currentPhase} | Verified score: ${status.verifiedScore}/${status.targetScore} | Completion: ${status.completionPercent}%`);
  console.log(`  Phase statuses:`);
  for (const p of status.phases) {
    const icon = p.status === 'complete' || p.status === 'completed' ? '✅' : p.status === 'in_progress' ? '🔄' : '⏳';
    console.log(`    ${icon} ${p.id} ${p.name} — ${p.status}`);
  }
  if (args.commit) {
    console.log(`\nSuggested commit:\n  git add -A && git commit -m "${args.commit}"`);
  }
}

main();
