import { writeFileSync } from 'fs';
import { join } from 'path';
import { getCitationReportData } from '../src/data/citations';
import { benchmarkSuites, benchmarkResults, benchmarkLeaderboards } from '../src/data/benchmarkData';
import { rankings, awards, getRankingStatistics } from '../src/data/rankingData';
import { buildEntityGraph, entityRelationships } from '../src/data/relationshipGraph';
import { agentEntities } from '../src/data/agentEntities';
import { modelEntities } from '../src/data/modelEntities';
import { frameworkEntities } from '../src/data/frameworkEntities';
import { mcpEntities } from '../src/data/mcpEntities';
import { companyEntities } from '../src/data/companyEntities';

const REPORTS_DIR = join(process.cwd(), 'reports');

function toCsvRow(values: (string | number | boolean)[]): string {
  return values.map(v => {
    const s = String(v);
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  }).join(',');
}

function writeCsv(filename: string, headers: string[], rows: (string | number | boolean)[][]): void {
  const content = [toCsvRow(headers), ...rows.map(toCsvRow)].join('\n');
  writeFileSync(join(REPORTS_DIR, filename), content);
  console.log(`Generated: ${filename}`);
}

function writeJson(filename: string, data: unknown): void {
  writeFileSync(join(REPORTS_DIR, filename), JSON.stringify(data, null, 2));
  console.log(`Generated: ${filename}`);
}

console.log('Generating reports...\n');

// Citation Report
const citationData = getCitationReportData();
writeCsv('citation-report.csv', [
  'ID', 'Source', 'Type', 'Title', 'Entities', 'Confidence Level', 'Verification Status', 'Tags'
], citationData.map(c => [c.id, c.source, c.type, c.title, c.entities, c.confidenceLevel, c.verificationStatus, c.tags]));

// Benchmark Report
writeCsv('benchmark-report.csv', [
  'Suite', 'Category', 'Entity', 'Entity Type', 'Score', 'Unit', 'Rank', 'Total Participants', 'Test Date', 'Source'
], benchmarkResults.map(r => {
  const suite = benchmarkSuites.find(s => s.id === r.suiteId);
  return [suite?.name || r.suiteId, suite?.category || '', r.entityId, r.entityType, r.score, r.unit, r.rank || '', r.totalParticipants || '', r.testDate, r.source];
}));

// Ranking Report
const rankingRows: (string | number | boolean)[][] = [];
rankings.forEach(r => {
  r.entries.forEach(e => {
    rankingRows.push([r.title, e.rank, e.entityName, e.entityType, e.score, e.maxScore, e.change, e.highlights.join('; ')]);
  });
});
writeCsv('ranking-report.csv', [
  'Ranking', 'Rank', 'Entity', 'Type', 'Score', 'Max Score', 'Change', 'Highlights'
], rankingRows);

// Award Report
writeCsv('award-report.csv', [
  'Year', 'Category', 'Winner', 'Winner Entity ID', 'Runners Up', 'Runners Up Entity IDs', 'Description'
], awards.map(a => [a.year, a.category, a.winner, a.winnerEntityId, a.runnersUp.join('; '), a.runnersUpEntityIds.join('; '), a.description]));

// Entity Gap Report
const allEntityIds = new Set([
  ...agentEntities.map(e => e.id),
  ...modelEntities.map(e => e.id),
  ...frameworkEntities.map(e => e.id),
  ...mcpEntities.map(e => e.id),
  ...companyEntities.map(e => e.id),
]);
const rankedEntityIds = new Set<string>();
rankings.forEach(r => r.entries.forEach(e => rankedEntityIds.add(e.entityId)));
const awardedEntityIds = new Set<string>();
awards.forEach(a => {
  awardedEntityIds.add(a.winnerEntityId);
  a.runnersUpEntityIds.forEach(id => awardedEntityIds.add(id));
});
const benchmarkedEntityIds = new Set(benchmarkResults.map(r => r.entityId));

const gapRows: (string | number | boolean)[][] = [];
allEntityIds.forEach(id => {
  const hasRanking = rankedEntityIds.has(id);
  const hasAward = awardedEntityIds.has(id);
  const hasBenchmark = benchmarkedEntityIds.has(id);
  if (!hasRanking || !hasAward || !hasBenchmark) {
    const entity = [...agentEntities, ...modelEntities, ...frameworkEntities, ...mcpEntities, ...companyEntities].find(e => e.id === id);
    gapRows.push([
      id, entity?.name || '', entity?.type || '',
      hasRanking ? 'Yes' : 'No',
      hasAward ? 'Yes' : 'No',
      hasBenchmark ? 'Yes' : 'No',
      (!hasRanking ? 'Missing ranking; ' : '') + (!hasAward ? 'Missing award; ' : '') + (!hasBenchmark ? 'Missing benchmark' : '')
    ]);
  }
});
writeCsv('entity-gap-report.csv', [
  'Entity ID', 'Name', 'Type', 'Has Ranking', 'Has Award', 'Has Benchmark', 'Gaps'
], gapRows);

// Internal Link Report
const linkRows: (string | number | boolean)[][] = [];
const allEntities = [...agentEntities, ...modelEntities, ...frameworkEntities, ...mcpEntities, ...companyEntities];
allEntities.forEach(entity => {
  const relationships = entityRelationships.filter(r => r.from === entity.id || r.to === entity.id);
  const linkCount = relationships.length;
  if (linkCount < 10) {
    linkRows.push([
      entity.id, entity.name, entity.type, linkCount, 10 - linkCount,
      relationships.map(r => `${r.type} -> ${r.to}`).join('; ')
    ]);
  }
});
writeCsv('internal-link-report.csv', [
  'Entity ID', 'Name', 'Type', 'Current Links', 'Links Needed', 'Existing Links'
], linkRows);

// GEO Report (Generative Engine Optimization)
const geoRows: (string | number | boolean)[][] = [];
allEntities.forEach(entity => {
  const citations = citationData.filter(c => c.entities.includes(entity.id));
  const benchmarks = benchmarkResults.filter(r => r.entityId === entity.id);
  const rankingEntries = rankingRows.filter(r => String(r[2]) === entity.name);
  geoRows.push([
    entity.id, entity.name, entity.type,
    citations.length, benchmarks.length, rankingEntries.length,
    citations.length > 0 ? 'Yes' : 'No',
    benchmarks.length > 0 ? 'Yes' : 'No',
    rankingEntries.length > 0 ? 'Yes' : 'No',
    `Citations: ${citations.length}, Benchmarks: ${benchmarks.length}, Rankings: ${rankingEntries.length}`
  ]);
});
writeCsv('geo-report.csv', [
  'Entity ID', 'Name', 'Type', 'Citation Count', 'Benchmark Count', 'Ranking Count',
  'Has Citations', 'Has Benchmarks', 'Has Rankings', 'GEO Score'
], geoRows);

// Entity Graph JSON
const graph = buildEntityGraph();
writeJson('entity-graph-export.json', graph);

// Statistics Summary
const stats = getRankingStatistics();
writeJson('statistics-summary.json', {
  ...stats,
  totalRelationships: entityRelationships.length,
  totalBenchmarks: benchmarkResults.length,
  totalSuites: benchmarkSuites.length,
  totalCitations: citationData.length,
  entitiesWithGaps: gapRows.length,
  entitiesNeedingLinks: linkRows.length,
  generatedAt: new Date().toISOString(),
});

console.log('\nAll reports generated successfully.');
console.log(`Reports directory: ${REPORTS_DIR}`);
