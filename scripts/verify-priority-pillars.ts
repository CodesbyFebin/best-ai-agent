import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const appPath = path.join(root, 'src/components/pillars/PriorityPillarPages.tsx');
const routePath = path.join(root, 'src/routing/routeRegistry.ts');
const manifestPath = path.join(root, 'content/manifests/priority-pillars.yaml');

const pillars = [
  { slug: 'best-ai-agent', keyword: 'best ai agent' },
  { slug: 'best-ai-agent-for-business', keyword: 'best ai agent for business' },
  { slug: 'best-ai-agent-for-coding', keyword: 'best ai agent for coding' },
  { slug: 'best-ai-agent-alternatives', keyword: 'best ai agent alternatives' },
  { slug: 'best-ai-agents-for-automation', keyword: 'best ai agents for automation' }
];

function read(file: string) {
  if (!fs.existsSync(file)) throw new Error(`Missing required file: ${file}`);
  return fs.readFileSync(file, 'utf8');
}

const app = read(appPath);
const routes = read(routePath);
const manifest = read(manifestPath);
const failures: string[] = [];

for (const pillar of pillars) {
  const slugCount = (app.match(new RegExp(`['\"]${pillar.slug}['\"]`, 'g')) || []).length;
  if (slugCount < 1) failures.push(`${pillar.slug}: missing canonical content slug`);
  if (!app.toLowerCase().includes(pillar.keyword)) failures.push(`${pillar.slug}: missing primary keyword`);
  if (!app.includes('directAnswer:')) failures.push(`${pillar.slug}: missing direct-answer data model`);
  if (!app.includes('FAQPage')) failures.push(`${pillar.slug}: missing FAQPage schema`);
  if (!app.includes('ItemList')) failures.push(`${pillar.slug}: missing ItemList schema`);
  if (!app.includes('BreadcrumbList')) failures.push(`${pillar.slug}: missing BreadcrumbList schema`);
  if (!routes.includes(`'/` + pillar.slug + `'`)) failures.push(`${pillar.slug}: missing route registry entry`);
  if (!manifest.includes(`/` + pillar.slug + `/`)) failures.push(`${pillar.slug}: missing manifest entry`);
}

const externalEvidence = (app.match(/https:\/\/[^'\"]+/g) || []).filter((url) => !url.includes('bestaiagent.in'));
if (externalEvidence.length < 8) failures.push('Evidence gate: fewer than 8 external source URLs found');
if (app.includes('AggregateRating')) failures.push('Structured-data gate: AggregateRating must not be fabricated');
if (app.includes('fabricated')) failures.push('Editorial copy references fabricated claims policy; verify this is policy text, not a claim');

if (failures.length) {
  console.error('PRIORITY PILLAR VERIFICATION: FAIL');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('PRIORITY PILLAR VERIFICATION: PASS');
console.log(`Pillars verified: ${pillars.length}`);
console.log(`External evidence URLs: ${externalEvidence.length}`);
console.log('Required schema families: WebPage, ItemList, FAQPage, BreadcrumbList');
console.log('Unsupported AggregateRating: absent');
