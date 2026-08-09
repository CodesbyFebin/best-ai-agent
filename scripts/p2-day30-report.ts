/**
 * ATLAS P2 — Day-30 Analysis Report
 *
 * Reads weekly snapshots and flagship pages from reports/p2/ and produces
 * a Day-30 analysis answering the four required questions.
 *
 * Usage:
 *   npx tsx scripts/p2-day30-report.ts
 *
 * Output:
 *   reports/p2/day-30-report.json
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  P2WeeklySnapshot,
  P2FlagshipPageMetric,
  P2CohortComparison,
  P2Day30Report,
} from '../src/data/p2Measurement.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const REPORTS_DIR = path.join(ROOT, 'reports', 'p2');

function readJson<T>(name: string): T {
  const full = path.join(REPORTS_DIR, name);
  if (!fs.existsSync(full)) {
    throw new Error(`Missing P2 report file: ${full}`);
  }
  return JSON.parse(fs.readFileSync(full, 'utf-8'));
}

function exists(name: string): boolean {
  return fs.existsSync(path.join(REPORTS_DIR, name));
}

function aggregateCohort(pages: P2FlagshipPageMetric[]): P2CohortComparison['aggregate'] {
  const totalImpressions = pages.reduce((s, p) => s + p.impressions, 0);
  const totalClicks = pages.reduce((s, p) => s + p.clicks, 0);
  const avgCtr = pages.length > 0 ? pages.reduce((s, p) => s + p.ctr, 0) / pages.length : 0;
  const avgPosition = pages.length > 0 ? pages.reduce((s, p) => s + p.averagePosition, 0) / pages.length : 0;
  const indexedCount = pages.filter(p => p.indexed).length;
  const aiCitedCount = pages.filter(p => p.aiCited).length;

  return { totalImpressions, totalClicks, avgCtr, avgPosition, indexedCount, aiCitedCount };
}

function main() {
  if (!fs.existsSync(REPORTS_DIR)) {
    console.error(`P2 reports directory not found: ${REPORTS_DIR}`);
    process.exit(1);
  }

  const snapshotFiles = fs
    .readdirSync(REPORTS_DIR)
    .filter(f => f.startsWith('week-') && f.endsWith('-snapshot.json'))
    .sort();

  const weeklySnapshots: P2WeeklySnapshot[] = snapshotFiles.map(f => readJson<P2WeeklySnapshot>(f));

  const flagshipPages: P2FlagshipPageMetric[] = exists('flagship-pages.json')
    ? readJson<P2FlagshipPageMetric[]>('flagship-pages.json')
    : [];

  const aeoPages = flagshipPages.filter(p => p.aeoEnabled);
  const controlPages = flagshipPages.filter(p => !p.aeoEnabled);

  const aeoAggregate = aggregateCohort(aeoPages);
  const controlAggregate = aggregateCohort(controlPages);

  const aeoOutperformedControl =
    aeoAggregate.avgCtr > controlAggregate.avgCtr ||
    aeoAggregate.avgPosition < controlAggregate.avgPosition ||
    aeoAggregate.totalClicks > controlAggregate.totalClicks;

  const totalAiCitations = weeklySnapshots.reduce(
    (s, w) => s + w.geo.aiCitationObservations.filter(c => c.cited).length,
    0
  );

  const totalOrganicSessions = weeklySnapshots.reduce(
    (s, w) => s + w.business.organicSessions,
    0
  );

  const positiveSignal =
    aeoOutperformedControl &&
    totalAiCitations > 0 &&
    totalOrganicSessions > 0;

  const report: P2Day30Report = {
    generatedAt: new Date().toISOString(),
    measurementStart: weeklySnapshots.length > 0 ? weeklySnapshots[0].dateRange.start : '',
    measurementEnd: weeklySnapshots.length > 0 ? weeklySnapshots[weeklySnapshots.length - 1].dateRange.end : '',
    weeklySnapshots,
    flagshipPages,
    cohortComparison: {
      aeo: { cohort: 'aeo', pages: aeoPages, aggregate: aeoAggregate },
      control: { cohort: 'control', pages: controlPages, aggregate: controlAggregate },
    },
    conclusions: {
      visibilityImproved: aeoAggregate.totalImpressions > 0 || aeoAggregate.totalClicks > 0,
      aeoOutperformedControl,
      aiCitationsObserved: totalAiCitations > 0,
      usefulBusinessOutcomes: totalOrganicSessions > 0,
      recommendation: positiveSignal ? 'scale' : 'diagnose',
      notes: `AEO cohort: ${aeoPages.length} pages | Control cohort: ${controlPages.length} pages | Total AI citations: ${totalAiCitations} | Organic sessions: ${totalOrganicSessions}`,
    },
  };

  const reportPath = path.join(REPORTS_DIR, 'day-30-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log('═══════════════════════════════════════════════════');
  console.log('  ATLAS P2 — Day-30 Analysis');
  console.log('═══════════════════════════════════════════════════\n');
  console.log(`Measurement period: ${report.measurementStart} → ${report.measurementEnd}`);
  console.log(`Weekly snapshots: ${weeklySnapshots.length}`);
  console.log(`Flagship pages: ${flagshipPages.length}`);
  console.log(`  AEO cohort: ${aeoPages.length}`);
  console.log(`  Control cohort: ${controlPages.length}`);
  console.log(`\nAEO cohort aggregate:`);
  console.log(`  Impressions: ${aeoAggregate.totalImpressions}`);
  console.log(`  Clicks: ${aeoAggregate.totalClicks}`);
  console.log(`  Avg CTR: ${(aeoAggregate.avgCtr * 100).toFixed(2)}%`);
  console.log(`  Avg position: ${aeoAggregate.avgPosition.toFixed(1)}`);
  console.log(`  Indexed: ${aeoAggregate.indexedCount}/${aeoPages.length}`);
  console.log(`  AI cited: ${aeoAggregate.aiCitedCount}/${aeoPages.length}`);
  console.log(`\nControl cohort aggregate:`);
  console.log(`  Impressions: ${controlAggregate.totalImpressions}`);
  console.log(`  Clicks: ${controlAggregate.totalClicks}`);
  console.log(`  Avg CTR: ${(controlAggregate.avgCtr * 100).toFixed(2)}%`);
  console.log(`  Avg position: ${controlAggregate.avgPosition.toFixed(1)}`);
  console.log(`  Indexed: ${controlAggregate.indexedCount}/${controlPages.length}`);
  console.log(`  AI cited: ${controlAggregate.aiCitedCount}/${controlPages.length}`);
  console.log(`\nAI citations observed: ${totalAiCitations}`);
  console.log(`Organic sessions: ${totalOrganicSessions}`);
  console.log(`\nConclusions:`);
  console.log(`  1. Visibility improved: ${report.conclusions.visibilityImproved ? 'YES' : 'NO'}`);
  console.log(`  2. AEO outperformed control: ${report.conclusions.aeoOutperformedControl ? 'YES' : 'NO'}`);
  console.log(`  3. AI citations observed: ${report.conclusions.aiCitationsObserved ? 'YES' : 'NO'}`);
  console.log(`  4. Useful business outcomes: ${report.conclusions.usefulBusinessOutcomes ? 'YES' : 'NO'}`);
  console.log(`\nRecommendation: ${report.conclusions.recommendation.toUpperCase()}`);
  console.log(`Notes: ${report.conclusions.notes}`);
  console.log(`\nReport written: ${reportPath}`);
}

main();
