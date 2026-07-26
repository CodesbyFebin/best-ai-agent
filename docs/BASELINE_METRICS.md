# Phase C — Baseline Metrics

**Purpose:** Capture the current state **before** implementation begins. These are measured facts, not targets. They serve as a reference point to quantify progress.

**When:** Immediately after Scope Freeze approval, before any C2–C9 code changes.

---

## How to Capture

Run these commands **on the main branch** with no uncommitted changes.

```bash
cd "/Users/cyberteck/Downloads/final best ai agent"

# 1. Graph build
npx tsx scripts/build-graph.ts

# 2. Graph verification
npm run test:graph > metrics/graph-verify.txt 2>&1

# 3. Manifest verification (if manifest-data.json exists)
npm run test:manifest > metrics/manifest-verify.txt 2>&1

# 4. Bundle analysis (if build works)
npm run build 2>&1 | tee metrics/build.txt

# 5. Route count
grep -E "app\.(get|post|put|delete)\(" server.tsx | wc -l > metrics/route-count.txt

# 6. Graph stats
cat graph-data.json | jq '.nodes | length' > metrics/graph-nodes.txt
cat graph-data.json | jq '.edges | length' > metrics/graph-edges.txt

# 7. Contract file count
find engine/content/contracts -name "*.ts" 2>/dev/null | wc -l > metrics/contract-count.txt

# 8. Test suite count
ls -1 scripts/verify-*.ts 2>/dev/null | wc -l > metrics/test-suite-count.txt
```

**Note:** Some metrics will be zero initially (e.g., contract count if not yet created). That's okay — this is the baseline.

---

## Metric Categories

### 1. Graph Health

| Metric | Command | Baseline Value | Source |
|--------|---------|----------------|--------|
| Graph nodes | `jq '.nodes | length' graph-data.json` | TBD | graph-data.json |
| Graph edges | `jq '.edges | length' graph-data.json` | TBD | graph-data.json |
| Node types present | `jq '.nodes | map(.type) | unique | length' graph-data.json` | TBD | graph-data.json |
| Edge types present | `jq '.edges | map(.type) | unique | length' graph-data.json` | TBD | graph-data.json |
| Orphaned nodes (warn) | `verify-graph.ts` output | TBD | test:graph |
| Graph build time | `time npx tsx scripts/build-graph.ts` | TBD | timing |

---

### 2. API Surface

| Metric | Command | Baseline Value | Source |
|--------|---------|----------------|--------|
| Total routes | `grep -c "app\.(get|post)" server.tsx` | TBD | server.tsx |
| Graph API endpoints | Count `/api/graph/` routes | TBD | server.tsx |
| API verification script exists | `ls scripts/verify-production.mjs` | TBD | filesystem |

---

### 3. Content OS Contracts

| Metric | Command | Baseline Value | Source |
|--------|---------|----------------|--------|
| Contract files (directory) | `ls engine/content/contracts/*.ts \| wc -l` | TBD | filesystem |
| Contract files (actual) | Count of interface files | TBD | engine/content/contracts/ |
| JSON schemas | `ls schemas/*.json \| wc -l` | TBD | schemas/ |
| Manifest example file exists | `test -f manifest-data.json && echo yes` | TBD | filesystem |
| Verification scripts | `ls scripts/verify-*.ts \| wc -l` | TBD | scripts/ |

---

### 4. Verification Coverage

| Metric | Command | Baseline Value | Source |
|--------|---------|----------------|--------|
| Graph verification status | `npm run test:graph` exit code | TBD | test:graph |
| Manifest verification status | `npm run test:manifest` exit code | TBD | test:manifest |
| SSR verification status | `npm run test:ssr` exit code | TBD | test:ssr |
| Sitemap verification status | `npm run test:sitemap` exit code | TBD | test:sitemap |
| Overall test pass rate | Count of passing vs total | TBD | aggregated |

---

### 5. Build & Performance

| Metric | Command | Baseline Value | Source |
|--------|---------|----------------|--------|
| Dev server start time | `time npm run dev` (cold start) | TBD | timing |
| Production build time | `time npm run build` | TBD | timing |
| Bundle size (server.cjs) | `ls -lh dist/server.cjs \| awk '{print $5}'` | TBD | dist/ |
| Vite bundle size | `ls -lh dist/assets/*.js \| awk '{sum+=$5} END {print sum}'` | TBD | dist/assets/ |

---

### 6. Documentation

| Metric | Count | Baseline Value | Source |
|--------|-------|----------------|--------|
| ADRs in DECISIONS/ | `ls docs/DECISIONS/*.md \| wc -l` | TBD | filesystem |
| Architecture index files | `ls docs/ARCHITECTURE/*.md \| wc -l` | TBD | filesystem |
| Completion reports | `ls docs/PHASE_*.md \| wc -l` | TBD | filesystem |

---

### 7. Code Quality

| Metric | Command | Baseline Value | Source |
|--------|---------|----------------|--------|
| TypeScript errors | `npm run lint` exit code | TBD | lint |
| Unused imports (eslint) | `npx eslint --cache` (if configured) | TBD | eslint |

---

## Baseline Report (Template)

After capturing raw numbers, populate this table:

### Snapshot — 2026-07-26 (Pre-Implementation)

```
┌─────────────────────────────┬──────────┬─────────────────────────┐
│ Metric                      │ Value    │ Source                  │
├─────────────────────────────┼──────────┼─────────────────────────┤
│ Graph nodes                 │ TBD      │ graph-data.json         │
│ Graph edges                 │ TBD      │ graph-data.json         │
│ Graph API routes            │ TBD      │ server.tsx              │
│ Contract files created      │ TBD      │ engine/content/contracts│
│ Verification scripts        │ TBD      │ scripts/verify-*.ts     │
│ Build time (production)     │ TBD      │ npm run build           │
│ Bundle size (server)        │ TBD      │ dist/server.cjs         │
│ ADRs documented             │ TBD      │ docs/DECISIONS/         │
│ TypeScript lint errors      │ TBD      │ npm run lint            │
└─────────────────────────────┴──────────┴─────────────────────────┘
```

---

## How to Use Baseline

1. **Progress tracking:** At end of each work package (C1, C2, ...), re-run metrics and compare
2. **Regression detection:** If bundle size grows unexpectedly, baseline shows when it happened
3. **Scope verification:** Added contract files should show count increasing (expected)
4. **Quality gates:** Lint errors should not increase; test pass rate should reach 100%

Example:

| Metric | Baseline (C1 start) | C1 complete | Δ |
|--------|---------------------|-------------|---|
| Contract files | 8 | 9 | +1 (manifest.repository.ts implementation) |
| Verification scripts | 7 | 8 | +1 (test:resolver) |
| Graph build time | 120ms | 120ms | unchanged |

---

## Storage

Store baseline metrics in this file. Do not update after implementation begins.

Also store raw output files in `metrics/` directory (gitignored) for audit trail.

---

## Next Steps After Baseline Capture

1. Create `docs/BASELINE_METRICS.md` with populated table
2. Create `docs/WORK_BREAKDOWN.md` with detailed task list
3. Freeze all contracts to `v1.0.0` (update version strings)
4. Obtain final sign-off on Scope Freeze
5. Begin implementation with **C1 — Content Manifest** (manifest.repository.ts)

---

## Exit Criteria

Baseline Metrics are considered captured when:

- [ ] All metrics commands have been executed
- [ ] Raw outputs saved (optional but recommended)
- [ ] `docs/BASELINE_METRICS.md` contains actual measured values (no "TBD")
- [ ] Document signed off by Platform Engineering lead

---

*This document is a snapshot of the starting point. Do not modify after implementation begins.*
