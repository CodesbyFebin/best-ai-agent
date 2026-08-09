/**
 * ATLAS P2 — Measurement Snapshot
 *
 * Collects a weekly measurement snapshot for the P2 baseline.
 * This script is a measurement-only tool; it does not modify production code.
 *
 * Usage:
 *   npx tsx scripts/p2-measure.ts [--week N] [--date-range START:END]
 *
 * Output:
 *   reports/p2/week-<N>-snapshot.json
 *   reports/p2/flagship-pages.json
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  P2WeeklySnapshot,
  P2FlagshipPageMetric,
  P2_FLAGSHIP_PAGES,
} from '../src/data/p2Measurement.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const REPORTS_DIR = path.join(ROOT, 'reports', 'p2');

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(name: string, data: unknown) {
  fs.writeFileSync(path.join(REPORTS_DIR, name), JSON.stringify(data, null, 2));
}

function parseArgs(): { week: number; dateRange: { start: string; end: string } } {
  const args = process.argv.slice(2);
  let week = 1;
  let dateRange = { start: new Date().toISOString().split('T')[0], end: new Date().toISOString().split('T')[0] };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--week' && args[i + 1]) {
      week = parseInt(args[++i], 10);
    } else if (args[i] === '--date-range' && args[i + 1]) {
      const [start, end] = args[++i].split(':');
      dateRange = { start, end };
    }
  }

  return { week, dateRange };
}

function buildSnapshot(week: number, dateRange: { start: string; end: string }): P2WeeklySnapshot {
  return {
    week,
    dateRange,
    indexing: {
      indexedPages: 0,
      submittedUrls: 0,
      excludedUrls: 0,
      indexingErrors: 0,
    },
    search: {
      impressions: 0,
      clicks: 0,
      ctr: 0,
      averagePosition: 0,
    },
    queries: {
      uniqueQueries: 0,
      longTailQueries: 0,
      topQueries: [],
    },
    performance: {
      lcp: 0,
      inp: 0,
      cls: 0,
      cwvPassRate: 0,
    },
    aeo: {
      richResultObservations: 0,
      answerVisibilityObservations: 0,
    },
    geo: {
      aiCitationObservations: [],
    },
    business: {
      organicSessions: 0,
      conversions: 0,
      revenue: 0,
      conversionRate: 0,
    },
    reliability: {
      buildStatus: 'pass',
      productionErrors: 0,
      securityIncidents: 0,
    },
  };
}

function main() {
  ensureDir(REPORTS_DIR);
  const { week, dateRange } = parseArgs();

  const snapshot = buildSnapshot(week, dateRange);
  writeJson(`week-${week}-snapshot.json`, snapshot);

  const existingFlagship = fs.existsSync(path.join(REPORTS_DIR, 'flagship-pages.json'))
    ? JSON.parse(fs.readFileSync(path.join(REPORTS_DIR, 'flagship-pages.json'), 'utf-8'))
    : P2_FLAGSHIP_PAGES;

  writeJson('flagship-pages.json', existingFlagship);

  console.log(`P2 Week ${week} snapshot written to reports/p2/week-${week}-snapshot.json`);
  console.log(`Flagship pages manifest written to reports/p2/flagship-pages.json`);
  console.log('\nNext steps:');
  console.log('  1. Populate snapshot with real Search Console data');
  console.log('  2. Populate flagship-pages.json with real per-page metrics');
  console.log('  3. Run p2-day30-report.ts at day 30 for analysis');
}

main();
