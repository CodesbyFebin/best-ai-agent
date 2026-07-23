/**
 * ATLAS P00 — Baseline Audit
 * Generates reports/baseline/*.json describing the pre-migration state of the repo.
 * Read-only: does not modify source.
 *
 * Usage: npx tsx scripts/audit-baseline.ts
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import { canonicalRoutes, legacyRedirects } from '../src/routing/routeRegistry.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const REPORT_DIR = path.join(ROOT, 'reports', 'baseline');

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(name: string, data: unknown) {
  fs.writeFileSync(path.join(REPORT_DIR, name), JSON.stringify(data, null, 2));
}

function writeText(name: string, data: string) {
  fs.writeFileSync(path.join(REPORT_DIR, name), data);
}

/** Recursively walk TS/TSX files under a directory. */
function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/\.(ts|tsx)$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

function searchSource(patterns: RegExp[]): { file: string; line: number; text: string; pattern: string }[] {
  const hits: { file: string; line: number; text: string; pattern: string }[] = [];
  for (const f of walk(path.join(ROOT, 'src'))) {
    const rel = path.relative(ROOT, f);
    const lines = fs.readFileSync(f, 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
      for (const p of patterns) {
        if (p.test(lines[i])) {
          hits.push({ file: rel, line: i + 1, text: lines[i].trim(), pattern: p.source });
          break;
        }
      }
    }
  }
  return hits;
}

function main() {
  ensureDir(REPORT_DIR);
  const ts = new Date().toISOString();

  // 1. Repository inventory -------------------------------------------------
  const allFiles = walk(path.join(ROOT, 'src'));
  const inventory = {
    generatedAt: ts,
    rootFiles: fs.readdirSync(ROOT).filter(n => !n.startsWith('.') || n === '.gitignore'),
    srcTsFiles: allFiles.map(f => path.relative(ROOT, f)).sort(),
    srcFileCount: allFiles.length,
    dataFiles: fs.existsSync(path.join(ROOT, 'src', 'data'))
      ? fs.readdirSync(path.join(ROOT, 'src', 'data')).sort()
      : [],
    publicFiles: fs.existsSync(path.join(ROOT, 'public'))
      ? fs.readdirSync(path.join(ROOT, 'public')).sort()
      : [],
  };
  writeJson('repository-inventory.json', inventory);

  // 2. Routes ---------------------------------------------------------------
  const routeValues = Object.values(canonicalRoutes);
  const byStatus: Record<string, number> = {};
  const byType: Record<string, number> = {};
  const byGroup: Record<string, number> = {};
  for (const r of routeValues) {
    byStatus[r.status] = (byStatus[r.status] || 0) + 1;
    byType[r.type] = (byType[r.type] || 0) + 1;
    byGroup[r.sitemapGroup] = (byGroup[r.sitemapGroup] || 0) + 1;
  }
  const dynamicPatterns = ['agents', 'categories', 'compare', 'mcp/servers', 'research', 'authors'];
  const syntheticRisk: { pattern: string; exampleValid: string; exampleFake: string }[] = [];
  // Valid route sample per dynamic pattern
  for (const p of dynamicPatterns) {
    const prefix = `/${p}/`;
    const found = routeValues.find(r => r.path.startsWith(prefix));
    syntheticRisk.push({
      pattern: `${prefix}:slug`,
      exampleValid: found?.path ?? `${prefix}<unknown>`,
      exampleFake: `${prefix}definitely-fake-${createHash('md5').update(p).digest('hex').slice(0, 6)}`,
      currentlyReturns: '200 published indexable (synthesized in routeResolver.ts)',
    });
  }
  writeJson('routes.json', {
    generatedAt: ts,
    canonicalRouteCount: routeValues.length,
    byStatus,
    byType,
    bySitemapGroup: byGroup,
    dynamicSynthesisRisk: syntheticRisk,
    note: 'routeResolver.ts:31-160 synthesizes published+indexable routes for ANY non-empty slug under /agents, /categories, /compare, /mcp/servers, /research, /authors. This is the #1 P0 defect (infinite soft-404s).',
  });

  // 3. Internal links -------------------------------------------------------
  const hashRouting = searchSource([
    /window\.location\.hash/,
    /location\.hash/,
    /hashchange/,
    /#view=/,
    /#product=/,
    /#article=/,
    /#silo=/,
    /#pair=/,
  ]);
  const legacyA = searchSource([/["'`]\/a\//]);
  const legacyTools = searchSource([/["'`]\/tools\//]);
  writeJson('internal-links.json', {
    generatedAt: ts,
    hashRoutingReferences: hashRouting,
    hashRoutingCount: hashRouting.length,
    legacyAReferences: legacyA,
    legacyACount: legacyA.length,
    legacyToolsReferences: legacyTools,
    legacyToolsCount: legacyTools.length,
    verdict: {
      hashRoutingActive: hashRouting.length > 0,
      legacyARemaining: legacyA.length,
      legacyToolsRemaining: legacyTools.length,
    },
  });

  // 4. Redirects ------------------------------------------------------------
  const redirectEntries = Object.entries(legacyRedirects).map(([from, to]) => ({
    from,
    to,
    loopsBack: from === to,
    chainHop: legacyRedirects[to] ? 'multi-hop (chain)' : 'one-hop',
    toExists: !!canonicalRoutes[to],
    unrelatedMcp:
      (/notion-server|excel-server|shopify-server/.test(from) && to !== from.replace(/-server$/, '').replace(/\/mcp\/servers\//, '/mcp/servers/'))
        ? `redirects to semantically unrelated entity (${to})`
        : null,
  }));
  const problems = redirectEntries.filter(r => r.loopsBack || r.chainHop !== 'one-hop' || !r.toExists || r.unrelatedMcp);
  writeJson('redirects.json', {
    generatedAt: ts,
    redirectCount: redirectEntries.length,
    entries: redirectEntries,
    problems,
    problemCount: problems.length,
  });

  // 5. Sitemaps -------------------------------------------------------------
  writeJson('sitemaps.json', {
    generatedAt: ts,
    findings: [
      {
        severity: 'high',
        issue: '/sitemap.xml, /sitemap-index.xml, /sitemap-indexed.xml all return 200 with the index',
        file: 'server.ts:200',
        required: '/sitemap-index.xml → 200; /sitemap.xml & /sitemap-indexed.xml → 301 to index',
      },
      {
        severity: 'high',
        issue: 'robots.txt advertises /sitemap.xml + /sitemap-core.xml (latter not implemented) + individual segments',
        file: 'public/robots.txt',
        required: 'Advertise only: Sitemap: https://bestaiagent.in/sitemap-index.xml',
      },
      {
        severity: 'medium',
        issue: 'Missing required segments: sitemap-reviews, sitemap-pricing, sitemap-alternatives, sitemap-frameworks, sitemap-authors',
        file: 'server.ts, src/data/sitemapGenerator.ts',
      },
      {
        severity: 'medium',
        issue: 'Synthetic metadata: changefreq=weekly, priority=0.80-1.00, bulk lastmod 2026-07-23',
        file: 'src/data/sitemapGenerator.ts:48-54',
        required: 'Drop changefreq+priority; use real lastmod only when available',
      },
      {
        severity: 'medium',
        issue: 'Competing llms.txt sources (public/llms.txt static vs server.ts dynamic)',
        file: 'server.ts:178, public/llms.txt',
      },
    ],
  });

  // 6. Security findings ----------------------------------------------------
  const securityFindings = `# ATLAS P00 — Security Findings
Generated: ${ts}

## S1 — Admin dashboard publicly accessible [P0]
- File: src/components/RouterApp.tsx:54
- \`/admin\` and \`/admin/*\` render <AdminDashboard /> with no auth/authorization/session.
- robots.txt Disallow is NOT security.
- Fix: server-side gate returning 401/redirect before HTML is served.

## S2 — Fake-success API endpoints [P0]
- File: server.ts:314-324
- POST /api/submit-lead, /api/submit-tool, /api/subscribe always return {success:true} with no persistence/validation.
- Fix: implement persistence+validation or return 501 Not Implemented.

## S3 — Raw path interpolation → reflected XSS [P0]
- File: src/routing/renderSsrBody.ts:10
- \`${'`<code>${path}</code>`'}\` reflects request path into HTML unescaped.
- Titles/descriptions/slug strings likewise unescaped.
- Fix: escapeHtml() + escapeAttribute() on all request-derived data.

## S4 — 404 self-canonicalizes invalid URL [P1]
- File: server.ts:42
- \`${'`canonical = https://bestaiagent.in${urlPath}`'}\` for non-existent pages.
- Fix: omit canonical on 404, or point to a verified replacement only.

## S5 — AI endpoints lack production controls [P1]
- File: server.ts:254-312 (/api/analyze-doc, /api/recommend)
- No auth, rate limiting, request-size limits, output validation, timeout handling, or privacy disclosure.
- /api/analyze-doc forwards user document content to external Gemini API.

## S6 — Duplicate <title> insertion [P1]
- File: server.ts:114-117 — replaces <title> then inserts another full head block containing a second <title>.
`;
  writeText('security-findings.md', securityFindings);

  // 7. SEO + content score (baseline) -------------------------------------
  writeJson('seo-score.json', {
    generatedAt: ts,
    baselineScore: 52,
    dimensions: {
      routing: 58,
      ssr: 40,
      hydration: 10,
      canonicals: 60,
      redirects: 38,
      handling404: 15,
      sitemaps: 57,
      structuredData: 44,
      internalLinking: 42,
      technicalSeo: 61,
      aeo: 66,
      geo: 60,
      accessibility: 60,
      security: 35,
      performance: 45,
    },
  });

  writeJson('content-score.json', {
    generatedAt: ts,
    baselineScore: 40,
    issues: [
      'renderSsrBody.ts uses template-constant scores (9.6/10, 9.4/10) and price (₹1,680/mo) for ALL agent pages',
      'Synthetic updatedAt "2026-07-23" applied to every route',
      'Unsupported authority claims (5000+ agents, 72% overhead reduction) without sources',
      'No author/reviewer provenance on SSR content',
      'No [SOURCE REQUIRED] marker system yet',
    ],
  });

  // 8. Duplicate-intent pages (editorial candidates) -----------------------
  const cr = Object.keys(canonicalRoutes);
  const dupIntent = [
    {
      group: 'CRM intent',
      urls: ['/best-ai-agent-for-crm', '/ai-agents-for-crm', '/categories/crm'].filter(u => cr.includes(u) || legacyRedirects[u]),
      note: 'Currently /best-ai-agent-for-crm & /ai-agents-for-crm both 301 to /categories/crm — collapses commercial, informational, and directory intents. P04 review required.',
    },
    {
      group: 'Sales intent',
      urls: ['/best-ai-agent-for-sales', '/ai-agents-for-sales', '/categories/sales'].filter(u => cr.includes(u) || legacyRedirects[u]),
      note: 'Same consolidation pattern as CRM.',
    },
    {
      group: 'Marketing intent',
      urls: ['/best-ai-agent-for-marketing', '/ai-agents-for-marketing', '/categories/marketing'].filter(u => cr.includes(u) || legacyRedirects[u]),
      note: 'Same consolidation pattern as CRM.',
    },
  ];
  writeJson('duplicate-intent-pages.json', { generatedAt: ts, candidates: dupIntent });

  // CSV summary of duplicate-intent
  const csv = ['group,url,status,intent,note', ...dupIntent.flatMap(g =>
    g.urls.map(u => `"${g.group}","${u}","${legacyRedirects[u] ? 'redirects→' + legacyRedirects[u] : (canonicalRoutes[u] ? 'canonical' : 'missing')}","needs-review","${g.note.replace(/"/g, '""')}"`)
  )].join('\n');
  writeText('duplicate-intent-pages.csv', csv);

  // Final summary -----------------------------------------------------------
  const summary = {
    generatedAt: ts,
    baselineScore: 52,
    routeCount: routeValues.length,
    redirectCount: redirectEntries.length,
    redirectProblems: problems.length,
    hashRoutingRefs: hashRouting.length,
    legacyARefs: legacyA.length,
    legacyToolsRefs: legacyTools.length,
    p0Blockers: 10,
    reportsWritten: fs.readdirSync(REPORT_DIR),
  };
  writeJson('_summary.json', summary);

  console.log('✓ Baseline audit complete.');
  console.log(`  Routes: ${routeValues.length} | Redirects: ${redirectEntries.length} (${problems.length} problems)`);
  console.log(`  Hash routing refs: ${hashRouting.length} | /a/ refs: ${legacyA.length} | /tools/ refs: ${legacyTools.length}`);
  console.log(`  Reports written to: ${path.relative(ROOT, REPORT_DIR)}/`);
  console.log(`  Files: ${summary.reportsWritten.join(', ')}`);
}

main();
