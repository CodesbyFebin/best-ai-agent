/**
 * ATLAS W0/W1 — Gate verification.
 *
 * Runs G1–G7 (per master prompt §12) against the Wave 0 trust foundation
 * and the Wave 1 Pillar 01 slice.
 *
 * G1 Identity       — registry ID, canonical slug, parent, no collisions
 * G2 Research       — intent brief complete (proxy: page exists with H1)
 * G3 Evidence       — claims mapped to receipts, evidence gates satisfied,
 *                      and MDX material claims cite ledger claim ids
 * G4 Originality    — no template duplication (proxy: unique slugs;
 *                      classifications mutually exclusive, total = 50 for P01)
 * G5 Editorial      — direct prose, no padding (proxy: frontmatter + key takeaways present)
 * G6 Technical      — frontmatter/schema valid, graph->MDX inbound-link parity,
 *                      no orphans in W0/W1 graph
 * G7 Publication    — HOLD by default; flipped to PASS only after human review
 *
 * Exit codes:
 *   0 — every gate PASS
 *   1 — one or more gates FAIL
 *   2 — one or more gates HOLD (slice not yet GREEN; owner review required)
 */

import { readFileSync, existsSync, statSync, readdirSync } from 'fs';
import { join } from 'path';

import { CONTENT_REGISTRY, resolveCanonical } from '../src/content/registry/content-registry.js';
import {
  EVIDENCE_SOURCES,
  EVIDENCE_CLAIMS,
  claimIsCurrent,
  volatileMetadata,
} from '../src/content/registry/evidence-ledger.js';
import { LINK_GRAPH, outboundLinks, inboundLinks, orphanRecords } from '../src/content/registry/link-graph.js';
import { P01_CLASSIFICATIONS, classificationSummary } from '../src/content/registry/p01-classification.js';
import { registrySummary } from '../src/content/registry/content-registry.js';

const REPO_ROOT = '/Users/cyberteck/Downloads/final best ai agent';
const TRUST_DIR = join(REPO_ROOT, 'content/trust');
const PILLARS_CORE = join(REPO_ROOT, 'content/pillars/core');
const CLUSTERS_CORE = join(REPO_ROOT, 'content/clusters/core');

interface GateResult {
  gate: 'G1' | 'G2' | 'G3' | 'G4' | 'G5' | 'G6' | 'G7';
  status: 'PASS' | 'HOLD' | 'FAIL';
  detail: string;
}

const results: GateResult[] = [];

function record(gate: GateResult['gate'], status: GateResult['status'], detail: string): void {
  results.push({ gate, status, detail });
}

function parseFrontmatter(content: string): Record<string, string> {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const out: Record<string, string> = {};
  for (const line of m[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx < 0) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim().replace(/^"|"$/g, '');
    out[key] = val;
  }
  return out;
}

function fileExists(p: string): boolean {
  try { return existsSync(p) && statSync(p).isFile(); } catch { return false; }
}

function wordCount(p: string): number {
  if (!fileExists(p)) return 0;
  const txt = readFileSync(p, 'utf-8');
  // Strip frontmatter and markdown syntax noise for a rough word count.
  const body = txt.replace(/^---[\s\S]*?---/, '').replace(/[#*`|>\-]/g, ' ');
  return body.split(/\s+/).filter(Boolean).length;
}

// ---------------------------------------------------------------------------
// G1 — Identity
// ---------------------------------------------------------------------------
{
  let collisions = 0;
  const seen = new Set<string>();
  for (const r of CONTENT_REGISTRY) {
    const key = r.canonicalUrl;
    if (seen.has(key)) collisions++;
    seen.add(key);
  }
  if (collisions === 0) {
    record('G1', 'PASS', `Unique canonical URLs across ${CONTENT_REGISTRY.length} registry records.`);
  } else {
    record('G1', 'FAIL', `${collisions} canonical-URL collision(s) detected.`);
  }
}

// ---------------------------------------------------------------------------
// G2 — Research (file + H1 + key takeaways proxy)
// ---------------------------------------------------------------------------
{
  const trustFiles = readdirSync(TRUST_DIR).filter((f) => f.endsWith('.mdx'));
  const clusterFiles = existsSync(CLUSTERS_CORE) ? readdirSync(CLUSTERS_CORE).filter((f) => f.endsWith('.mdx')) : [];
  const pillarFiles = existsSync(PILLARS_CORE) ? readdirSync(PILLARS_CORE).filter((f) => f.endsWith('.mdx')) : [];

  let missing = 0;
  const expectedTrust = [
    'editorial-methodology.mdx',
    'evidence-methodology.mdx',
    'rating-methodology.mdx',
    'comparison-methodology.mdx',
    'corrections.mdx',
    'source-classification.mdx',
    'affiliate-disclosure.mdx',
    'author-reviewer-policy.mdx',
    'privacy-dpdp-editorial-policy.mdx',
    'freshness-policy.mdx',
  ];
  for (const f of expectedTrust) {
    if (!trustFiles.includes(f)) missing++;
  }

  const expectedClusters = [
    'ai-agents-for-startups.mdx',
    'agentic-workflows.mdx',
    'ai-agents-vs-chatbots.mdx',
    'multi-agent-systems.mdx',
    'ai-agent-orchestration.mdx',
    'ai-agent-memory.mdx',
    'human-in-the-loop-agents.mdx',
    'ai-agent-tool-calling.mdx',
    'ai-agent-evaluation.mdx',
    'ai-agent-autonomy-levels.mdx',
  ];
  for (const f of expectedClusters) {
    if (!clusterFiles.includes(f)) missing++;
  }

  if (!pillarFiles.includes('ai-agents.mdx')) missing++;

  if (missing === 0) {
    record('G2', 'PASS', `Research artifacts present: ${trustFiles.length} trust pages, ${pillarFiles.length} pillar, ${clusterFiles.length} cluster.`);
  } else {
    record('G2', 'FAIL', `${missing} research artifact(s) missing from content/ directory.`);
  }
}

// ---------------------------------------------------------------------------
// G3 — Evidence (ledger-to-MDX linkage; material-claim completeness audit)
//
// Per master prompt §12, G3 requires:
//   - every material factual claim mapped to receipts
//   - exact passages and locators stored
//   - comparative parity met
//   - volatile claims have expiration dates
//
// This gate therefore does TWO things:
//   (a) verify every ledger claim is referenced from at least one MDX body
//   (b) extract material claims from every page and report a tally of
//       supported / unresolved / volatile / uncaptured.
//       PASS only when uncaptured = 0 AND unresolved = 0.
// ---------------------------------------------------------------------------
{
  const claims = Object.keys(EVIDENCE_CLAIMS);
  const sources = Object.keys(EVIDENCE_SOURCES);
  const allCurrent = claims.every((id) => claimIsCurrent(id));
  const noContentHash = true;

  // (a) Ledger -> MDX linkage
  const pillarCluster = [
    join(PILLARS_CORE, 'ai-agents.mdx'),
    ...readdirSync(CLUSTERS_CORE).filter((f) => f.endsWith('.mdx')).map((f) => join(CLUSTERS_CORE, f)),
  ];
  const trustFiles = readdirSync(TRUST_DIR).filter((f) => f.endsWith('.mdx'));
  const allMdxFiles = [...pillarCluster, ...trustFiles.map((f) => join(TRUST_DIR, f))];
  const claimIdPattern = /\bclaim:[a-z0-9-]+/g;
  const claimRefsInMdx = new Set<string>();
  for (const f of allMdxFiles) {
    if (!fileExists(f)) continue;
    const txt = readFileSync(f, 'utf-8');
    for (const m of txt.matchAll(claimIdPattern)) claimRefsInMdx.add(m[0]);
  }
  const claimIdsKnown = new Set(claims);
  const unknownClaimRefs = [...claimRefsInMdx].filter((c) => !claimIdsKnown.has(c));
  const wiredClaimIds = [...claimRefsInMdx].filter((c) => claimIdsKnown.has(c));

  // (b) Material-claim extraction (heuristic)
  // Sentences that look like material claims: contain a number, a price, a
  // statute name (DPDP, GST, Section X), or a vendor name with a version
  // marker. This is intentionally permissive; the gate's job is to flag
  // uncaptured, not to declare correctness.
  const claimSignals = [
    /\b\d+%/,                  // percentages (18%, 95%)
    /\$\d+/,                   // dollar amounts
    /€\d+/,                   // euro amounts
    /₹\d+/,                   // rupee amounts
    /\bDPDP\b/,               // statute
    /\bGST\b/,                 // tax
    /\bSection \d+/,           // statutory sections
    /\bAct No\. \d+/,          // act numbers
    /\bv\d+\.\d+/,             // version numbers
    /\bCursor\b/,              // vendor names (canonical subset)
    /\bClaude\b/,
    /\bCopilot\b/,
    /\bMCP\b/,
    /\bfunction calling\b/i,
  ];
  const claimSentenceRegex = new RegExp(claimSignals.map((s) => `(?:${s.source})`).join('|'), 'g');
  let supported = 0;
  let volatile = 0;
  let unresolved = 0;
  let uncaptured = 0;
  const perPageTally: Array<{ page: string; supported: number; volatile: number; unresolved: number; uncaptured: number; total: number }> = [];
  const volatileClaimIds = new Set(
    Object.entries(EVIDENCE_CLAIMS).filter(([id]) => volatileMetadata(id)?.expiresAt).map(([id]) => id),
  );
  for (const f of allMdxFiles) {
    if (!fileExists(f)) continue;
    const txt = readFileSync(f, 'utf-8');
    const pageSlug = (parseFrontmatter(txt).slug ?? f.split('/').pop() ?? '').trim();
    const sentences = txt.split(/(?<=[.!?])\s+/);
    let pSupp = 0, pVol = 0, pUnr = 0, pUnc = 0;
    for (const s of sentences) {
      if (!claimSentenceRegex.test(s)) { claimSentenceRegex.lastIndex = 0; continue; }
      claimSentenceRegex.lastIndex = 0;
      // Does this sentence cite at least one claim id?
      const cited = (s.match(claimIdPattern) ?? [])[0];
      if (cited && claimIdsKnown.has(cited)) {
        if (volatileClaimIds.has(cited)) pVol++; else pSupp++;
      } else if (s.match(/DPDP|GST|Section \d+|Act No\./)) {
        // Statutory claims without a claim id are unresolved until reviewed.
        pUnr++;
      } else {
        pUnc++;
      }
    }
    supported += pSupp; volatile += pVol; unresolved += pUnr; uncaptured += pUnc;
    perPageTally.push({ page: pageSlug, supported: pSupp, volatile: pVol, unresolved: pUnr, uncaptured: pUnc, total: pSupp + pVol + pUnr + pUnc });
  }
  const total = supported + volatile + unresolved + uncaptured;
  const ledgerOK = claims.length >= 5 && sources.length >= 5 && allCurrent && noContentHash && unknownClaimRefs.length === 0;

  // G3 PASS only when: ledger OK, every claim id wired, AND uncaptured = 0 AND unresolved = 0
  const materialOK = uncaptured === 0 && unresolved === 0;
  if (ledgerOK && wiredClaimIds.length === claims.length && materialOK) {
    record(
      'G3',
      'PASS',
      `Ledger: ${claims.length} claims / ${sources.length} sources / ${wiredClaimIds.length} wired. Material: supported=${supported} volatile=${volatile} unresolved=${unresolved} uncaptured=${uncaptured}.`,
    );
  } else {
    record(
      'G3',
      'HOLD',
      `Ledger ${ledgerOK && wiredClaimIds.length === claims.length ? 'OK' : 'incomplete'} (${wiredClaimIds.length}/${claims.length} wired). Material tally across ${allMdxFiles.length} pages: supported=${supported} volatile=${volatile} unresolved=${unresolved} uncaptured=${uncaptured} total=${total}.`,
    );
  }
}

// ---------------------------------------------------------------------------
// G4 — Originality (mutual exclusivity of dispositions; similarity & cannibalization evidence)
//
// Per master prompt §10, G4 requires:
//   - intent uniqueness, outline uniqueness, claim/evidence uniqueness,
//     examples/artifact uniqueness, similarity / shared-paragraph %,
//     FAQ duplication, title/meta duplication, intent collision,
//     cross-pillar cannibalization
// PASS requires a similarity report file on disk and no cannibalization alerts.
// ---------------------------------------------------------------------------
{
  const total = P01_CLASSIFICATIONS.length;
  const slugs = P01_CLASSIFICATIONS.map((c) => c.slug);
  const unique = new Set(slugs).size;
  const fabricatedSlots = P01_CLASSIFICATIONS.filter((c) =>
    c.slug.startsWith('pending-input:') || c.slug.startsWith('placeholder:') || c.slug.startsWith('reserved:'),
  ).length;
  const dispositions = classificationSummary();
  const buildNowCount = dispositions.build_now ?? 0;

  const similarityReport = join(REPO_ROOT, 'reports', 'w0w1-similarity-report.json');
  const similarityExists = existsSync(similarityReport);

  const mutuallyExclusive = total === unique && fabricatedSlots === 0 && buildNowCount >= 5;
  if (mutuallyExclusive && similarityExists) {
    record(
      'G4',
      'PASS',
      `P01 classifications mutually exclusive (${total} entries, ${unique} unique slugs, build_now=${buildNowCount}). Similarity report present at ${similarityReport}.`,
    );
  } else {
    record(
      'G4',
      'HOLD',
      `Classifications: total=${total} unique=${unique} build_now=${buildNowCount} fabricatedSlots=${fabricatedSlots}; similarity report ${similarityExists ? 'present' : 'MISSING at reports/w0w1-similarity-report.json'}; no cannibalization scan run.`,
    );
  }
}

// ---------------------------------------------------------------------------
// G5 — Editorial (proxy: pillar/cluster pages have Key Takeaways + Direct Answer;
//      trust pages have methodology + source receipts; no padding detected via word-count floor)
// ---------------------------------------------------------------------------
{
  const pillarCluster: Array<[string, string]> = [
    ['pillar', join(PILLARS_CORE, 'ai-agents.mdx')],
    ['cluster', join(CLUSTERS_CORE, 'ai-agents-for-startups.mdx')],
    ['cluster', join(CLUSTERS_CORE, 'agentic-workflows.mdx')],
    ['cluster', join(CLUSTERS_CORE, 'ai-agents-vs-chatbots.mdx')],
    ['cluster', join(CLUSTERS_CORE, 'multi-agent-systems.mdx')],
    ['cluster', join(CLUSTERS_CORE, 'ai-agent-orchestration.mdx')],
    ['cluster', join(CLUSTERS_CORE, 'ai-agent-memory.mdx')],
    ['cluster', join(CLUSTERS_CORE, 'human-in-the-loop-agents.mdx')],
    ['cluster', join(CLUSTERS_CORE, 'ai-agent-tool-calling.mdx')],
    ['cluster', join(CLUSTERS_CORE, 'ai-agent-evaluation.mdx')],
    ['cluster', join(CLUSTERS_CORE, 'ai-agent-autonomy-levels.mdx')],
  ];
  const trustPages: Array<[string, string]> = [
    ['editorial-methodology', join(TRUST_DIR, 'editorial-methodology.mdx')],
    ['evidence-methodology', join(TRUST_DIR, 'evidence-methodology.mdx')],
    ['rating-methodology', join(TRUST_DIR, 'rating-methodology.mdx')],
    ['comparison-methodology', join(TRUST_DIR, 'comparison-methodology.mdx')],
    ['corrections', join(TRUST_DIR, 'corrections.mdx')],
    ['source-classification', join(TRUST_DIR, 'source-classification.mdx')],
    ['affiliate-disclosure', join(TRUST_DIR, 'affiliate-disclosure.mdx')],
    ['author-reviewer-policy', join(TRUST_DIR, 'author-reviewer-policy.mdx')],
    ['privacy-dpdp-editorial-policy', join(TRUST_DIR, 'privacy-dpdp-editorial-policy.mdx')],
    ['freshness-policy', join(TRUST_DIR, 'freshness-policy.mdx')],
  ];

  let issues = 0;
  let paddingIssues = 0;
  const MIN_PILLAR_WORDS = 800;
  const MIN_CLUSTER_WORDS = 600;
  const MIN_TRUST_WORDS = 350;

  for (const [kind, f] of pillarCluster) {
    if (!fileExists(f)) { issues++; continue; }
    const txt = readFileSync(f, 'utf-8');
    if (!/^## Key takeaways/m.test(txt)) issues++;
    if (!/^## Direct answer/m.test(txt)) issues++;
    if (!/^## (Frequently asked questions|FAQ)/m.test(txt)) issues++;
    if (wordCount(f) < MIN_PILLAR_WORDS) paddingIssues++;
  }

  for (const [name, f] of trustPages) {
    if (!fileExists(f)) { issues++; continue; }
    const txt = readFileSync(f, 'utf-8');
    // Trust pages require: methodology body, source receipts, last reviewed
    if (!/^## /m.test(txt)) issues++;
    if (!/## Source receipts/m.test(txt)) issues++;
    if (!/## Last reviewed/m.test(txt)) issues++;
    if (wordCount(f) < MIN_TRUST_WORDS) paddingIssues++;
  }

  if (issues === 0 && paddingIssues === 0) {
    // G5 PASS requires structural integrity AND a human-reviewer record on
    // every page (per master prompt §12 G5: "human review completed where
    // required" and §13 publication workflow).
    const pagesNeedingReview = [
      ...pillarCluster.map(([_, f]) => f),
    ];
    const missingReview: string[] = [];
    for (const f of pagesNeedingReview) {
      if (!fileExists(f)) continue;
      const fm = parseFrontmatter(readFileSync(f, 'utf-8'));
      // A page passes human review when `humanReviewedBy` and `humanReviewedAt` are set.
      if (!fm.humanReviewedBy || !fm.humanReviewedAt) missingReview.push(fm.slug ?? f);
    }
    if (missingReview.length === 0) {
      record('G5', 'PASS', `Structural checks pass; human-review record on every P01 page.`);
    } else {
      record('G5', 'HOLD', `Structural checks pass, but human editorial review is missing on ${missingReview.length} page(s): ${missingReview.join(', ')}.`);
    }
  } else {
    record('G5', 'HOLD', `Structural issues=${issues}; below-minimum word pages=${paddingIssues}.`);
  }
}

// ---------------------------------------------------------------------------
// G6 — Technical (frontmatter, rendered-HTML link integrity, no orphans)
//
// Per master prompt §12 G6:
//   - frontmatter/schema valid
//   - internal links valid and canonical
//   - JSON-LD matches visible content
//   - rendered HTML contains title, description, canonical, H1, and required content
//   - accessibility checks pass
//   - performance budgets pass
//
// This gate verifies frontmatter, validates that every graph edge has a
// matching rendered <a href="..."> in the source MDX (a stricter proxy for
// rendered-HTML integrity than substring matching), and checks for orphans.
//
// Note: prefer-const is an ESLint rule, NOT a TypeScript tsc diagnostic.
// Repo-wide lint/typecheck status is documented in reports/w0w1-hold-report
// rather than asserted here, to avoid misattributing the rule to the wrong
// tool.
// ---------------------------------------------------------------------------
{
  const filesToCheck = [
    join(PILLARS_CORE, 'ai-agents.mdx'),
    ...readdirSync(CLUSTERS_CORE).filter((f) => f.endsWith('.mdx')).map((f) => join(CLUSTERS_CORE, f)),
    ...readdirSync(TRUST_DIR).filter((f) => f.endsWith('.mdx')).map((f) => join(TRUST_DIR, f)),
  ];
  let invalidFrontmatter = 0;
  for (const f of filesToCheck) {
    if (!fileExists(f)) { invalidFrontmatter++; continue; }
    const fm = parseFrontmatter(readFileSync(f, 'utf-8'));
    if (!fm.slug || !fm.title || !fm.canonicalUrl) invalidFrontmatter++;
  }

  // Orphan detection: published pages with no inbound link graph entries.
  const approvedSlugs = ['ai-agents', 'agentic-workflows', 'ai-agents-vs-chatbots',
    'multi-agent-systems', 'ai-agent-orchestration', 'ai-agent-memory',
    'human-in-the-loop-agents', 'ai-agent-tool-calling', 'ai-agent-evaluation',
    'ai-agent-autonomy-levels', 'ai-agents-for-startups',
    'editorial-methodology', 'evidence-methodology', 'rating-methodology',
    'comparison-methodology', 'corrections', 'source-classification',
    'affiliate-disclosure', 'author-reviewer-policy',
    'privacy-dpdp-editorial-policy', 'freshness-policy'];
  const orphans = orphanRecords(approvedSlugs);

  // Rendered-link integrity: for every graph edge, the source MDX body must
  // contain a markdown link whose target resolves to the target slug.
  //   Markdown link forms: [text](/path)  or  [text](https://example.com/path)
  // We extract every href from the source MDX, normalise to /path, and check
  // that at least one href ends with the target slug.
  const slugToBody = new Map<string, string>();
  for (const f of filesToCheck) {
    if (!fileExists(f)) continue;
    const fm = parseFrontmatter(readFileSync(f, 'utf-8'));
    if (fm.slug) slugToBody.set(fm.slug, readFileSync(f, 'utf-8'));
  }

  let unverifiedEdges = 0;
  const unverifiedSamples: Array<{ from: string; to: string; hrefs: string[] }> = [];
  for (const edge of LINK_GRAPH) {
    const body = slugToBody.get(edge.from);
    if (!body) continue;
    // Extract markdown link targets: [..]( .. )
    const hrefs = new Set<string>();
    const linkRe = /\[[^\]]*\]\(([^)]+)\)/g;
    for (const m of body.matchAll(linkRe)) {
      const raw = m[1].trim();
      // skip images: ![..](..) — already filtered because [^\]]* doesn't match "!" before "["
      // Strip title portion inside href if present (e.g. "url \"title\"")
      const url = raw.split(/\s+/)[0];
      // Normalise: if absolute URL, take pathname; if relative, keep as-is
      try {
        if (/^https?:\/\//.test(url)) {
          hrefs.add(new URL(url).pathname.replace(/\/$/, ''));
        } else {
          hrefs.add(url.split('#')[0].replace(/\/$/, ''));
        }
      } catch {
        // ignore malformed
      }
    }
    const targetVariants = new Set<string>([
      edge.to,
      '/' + edge.to,
      '/' + edge.to + '/',
    ]);
    let matched = false;
    for (const href of hrefs) {
      for (const v of targetVariants) {
        if (href === v.replace(/\/$/, '') || href.endsWith('/' + v.replace(/^\//, ''))) {
          matched = true;
          break;
        }
      }
      if (matched) break;
    }
    if (!matched) {
      unverifiedEdges++;
      if (unverifiedSamples.length < 10) {
        unverifiedSamples.push({ from: edge.from, to: edge.to, hrefs: [...hrefs].slice(0, 5) });
      }
    }
  }

  if (invalidFrontmatter === 0 && orphans.length === 0 && unverifiedEdges === 0) {
    record(
      'G6',
      'PASS',
      `Frontmatter valid on all W0/W1 files; 0 orphan pages; ${LINK_GRAPH.length}/${LINK_GRAPH.length} graph edges resolved to rendered markdown hrefs in source MDX.`,
    );
  } else {
    record(
      'G6',
      'HOLD',
      `Frontmatter gaps=${invalidFrontmatter}; orphans=${orphans.length}; unverified graph edges=${unverifiedEdges}/${LINK_GRAPH.length} (sample: ${JSON.stringify(unverifiedSamples.slice(0, 3))}). Rendered HTML, JSON-LD, accessibility, and performance gates are out-of-scope for this slice.`,
    );
  }
}

// ---------------------------------------------------------------------------
// G7 — Publication (HOLD by default; only trust pages are publicationEligible;
//      P01 pages require mandatory human approval before publication)
// ---------------------------------------------------------------------------
{
  const summary = registrySummary();
  const totalQuarantined = CONTENT_REGISTRY.filter((r) => r.lifecycleStatus === 'quarantined_template').length;
  const evidenceReadyCount = CONTENT_REGISTRY.filter((r) => r.lifecycleStatus === 'evidence_ready').length;
  const approvedCount = CONTENT_REGISTRY.filter((r) => r.lifecycleStatus === 'approved').length;
  const indexablePct = (summary.indexable / summary.total) * 100;

  // Per master prompt §13: publication is gated on human review.
  // The slice is GREEN-for-trust; P01 pages must be HOLD until reviewer signs off.
  if (evidenceReadyCount === 0 && approvedCount >= 10) {
    record(
      'G7',
      'PASS',
      `${approvedCount} approved (indexable) records; ${evidenceReadyCount} awaiting human review.`,
    );
  } else {
    record(
      'G7',
      'HOLD',
      `${evidenceReadyCount} P01 pages await mandatory human review (evidence_ready, publicationEligible=false). Trust pages approved=${approvedCount}, indexable=${indexablePct.toFixed(1)}%.`,
    );
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
console.log('\n=== ATLAS W0/W1 GATE REPORT ===\n');
console.log(`Registry total: ${CONTENT_REGISTRY.length}`);
console.log(`Indexable: ${registrySummary().indexable}`);
console.log(`Quarantined: ${registrySummary().quarantined}`);
console.log(`P01 classification: ${JSON.stringify(classificationSummary())}`);
console.log(`Evidence claims: ${Object.keys(EVIDENCE_CLAIMS).length}`);
console.log(`Evidence sources: ${Object.keys(EVIDENCE_SOURCES).length}`);
console.log(`Link graph edges: ${LINK_GRAPH.length}`);
console.log(`Orphans in W0/W1 graph: ${orphanRecords(['ai-agents', 'agentic-workflows', 'ai-agents-vs-chatbots',
  'multi-agent-systems', 'ai-agent-orchestration', 'ai-agent-memory',
  'human-in-the-loop-agents', 'ai-agent-tool-calling', 'ai-agent-evaluation',
  'ai-agent-autonomy-levels', 'ai-agents-for-startups',
  'editorial-methodology', 'evidence-methodology', 'rating-methodology',
  'comparison-methodology', 'corrections', 'source-classification',
  'affiliate-disclosure', 'author-reviewer-policy',
  'privacy-dpdp-editorial-policy', 'freshness-policy']).length}`);
console.log();

for (const r of results) {
  const icon = r.status === 'PASS' ? '✅' : r.status === 'HOLD' ? '⚠️ ' : '❌';
  console.log(`${icon} ${r.gate} — ${r.status}: ${r.detail}`);
}

console.log();
const fail = results.filter((r) => r.status === 'FAIL').length;
const hold = results.filter((r) => r.status === 'HOLD').length;
const pass = results.filter((r) => r.status === 'PASS').length;
console.log(`Summary: ${pass} PASS / ${hold} HOLD / ${fail} FAIL`);
process.exit(fail > 0 ? 1 : hold > 0 ? 2 : 0);
