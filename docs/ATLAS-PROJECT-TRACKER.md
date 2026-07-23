# BestAIAgent.in — ATLAS GODMODE Project Tracker

> Codename: **ATLAS GODMODE** · Target: verifiable **100/100** SEO, AEO, GEO & Page Quality
> Rule: 100/100 may only be reported when **every** automated, build, HTTP, content and production acceptance check passes. No exceptions.

---

## Overall Status

| Field | Value |
|---|---|
| Current phase | **P00** (Baseline audit & project tracker) |
| Completion percentage | 6% (tracker + baseline scaffolding in place) |
| Baseline score | **52 / 100** |
| Current verified score | **52 / 100** |
| Target score | **100 / 100** |
| Last verification date | 2026-07-23 |
| Current branch | `main` (fresh git init) |
| Latest commit | _initial baseline commit pending_ |

---

## Baseline Verifications (captured 2026-07-23, before any code changes)

| Command | Result | Notes |
|---|---|---|
| `npx tsc --noEmit` | ✅ PASS | Typecheck clean |
| `npm run build` | ✅ PASS | 1 warning: `import.meta` unavailable in CJS output (real bug, fixed in P03) |
| Bundle | ⚠️ LARGE | `index-*.js` = **1,167 kB** (gzip 287 kB). Needs code-splitting (P14). |
| `npm test` | ❌ MISSING | No test runner installed; no `test` script (added in P15) |
| Git | ✅ INIT | Repo initialized for per-phase commits |

---

## Scorecard

| Area | Baseline | Current | Target | Evidence |
|---|---:|---:|---:|---|
| Routing | 58 | 58 | 100 | `routeResolver.ts` synthesizes published routes from any slug |
| SSR | 40 | 40 | 100 | `renderSsrBody()` returns handcrafted HTML, not React `renderToString` |
| Hydration | 10 | 10 | 100 | `main.tsx` uses `createRoot()` not `hydrateRoot()` |
| Canonicals | 60 | 60 | 100 | 404 self-canonicalizes invalid URLs (`server.ts:42`) |
| Redirects | 38 | 38 | 100 | `/notion-server → /mcp/servers/slack` etc. (wrong semantics) |
| 404 handling | 15 | 15 | 100 | Unknown dynamic slugs return 200 |
| XML sitemaps | 57 | 57 | 100 | `/sitemap.xml` returns 200 instead of 301; missing segments; fake priority/changefreq |
| Structured data | 44 | 44 | 100 | Generic Org/WebSite/WebPage only; no route-specific schema |
| Internal linking | 42 | 42 | 100 | 57 `/a/` refs + 27 `/tools/` refs remain in source |
| Content depth | 40 | 40 | 100 | Placeholder/synthetic copy in SSR body |
| Semantic clustering | 50 | 50 | 100 | `topicalAuthority.ts` exists but not wired into routing/linking |
| AEO | 66 | 66 | 100 | Some quick-answer patterns; not systematic |
| GEO | 60 | 60 | 100 | `llms.txt` + `llms-full.txt` exist but static & possibly stale |
| Accessibility | 60 | 60 | 100 | Semantic HTML partial; no a11y CI |
| Security | 35 | 35 | 100 | Public `/admin`; fake-success APIs; raw path interpolation (XSS) |
| Performance | 45 | 45 | 100 | 1.1 MB single bundle |
| Build reliability | 80 | 80 | 100 | Build passes; verification scripts missing |

---

## Phase Tracker

| ID | Phase | Status | Started | Completed | Verification |
|---|---|---|---|---|---|
| P00 | Baseline audit & project tracker | 🔄 In Progress | 2026-07-23 | | |
| P01 | Canonical route registry + entity validation | ⏳ Pending | | | |
| P02 | Legacy redirect migration + verify-redirects | ⏳ Pending | | | |
| P03 | True React SSR | ⏳ Pending | | | |
| P04 | Hydration + remove hash routing | ⏳ Pending | | | |
| P05 | Real HTTP 404 architecture | ⏳ Pending | | | |
| P06 | Sitemap architecture | ⏳ Pending | | | |
| P07 | Metadata + route-specific JSON-LD | ⏳ Pending | | | |
| P08 | Semantic entity graph + topic clusters | ⏳ Pending | | | |
| P09 | Automated internal linking engine | ⏳ Pending | | | |
| P10 | Safe deep-content generation engine | ⏳ Pending | | | |
| P11 | Pre-populated page templates | ⏳ Pending | | | |
| P12 | AEO + GEO optimization | ⏳ Pending | | | |
| P13 | Security upgrade | ⏳ Pending | | | |
| P14 | Performance + accessibility | ⏳ Pending | | | |
| P15 | CI quality gate + production verification | ⏳ Pending | | | |

Legend: ⏳ Pending · 🔄 In Progress · ✅ Verified Complete · ⚠️ Complete w/ Caveats · ❌ Blocked

---

## Current Blockers

| ID | Severity | Phase | Blocker | Resolution |
|---|---|---|---|---|
| B01 | P0 | P01 | Undefined slugs return 200 (infinite soft-404s) | Validate every dynamic slug against real entity registries; return 404 otherwise |
| B02 | P0 | P03 | No real SSR — crawler HTML differs from client | `renderToString(<StaticRouter><RouterApp/></StaticRouter>)` |
| B03 | P0 | P04 | `createRoot` instead of `hydrateRoot` | Switch to `hydrateRoot` after real SSR lands |
| B04 | P0 | P04 | Hash routing still active (`App.tsx`, 3740 lines) | Remove all `location.hash`/`hashchange`/`#view=` usage |
| B05 | P0 | P04 | Conditional `useEffect` violates hooks rules | Move redirect handling out of conditional; server 301 preferred |
| B06 | P0 | P02 | Semantically wrong MCP redirects | `/notion-server → /mcp/servers/notion` or 404 if entity absent |
| B07 | P0 | P02 | 57 `/a/` references remain across `src/` | Repo-wide migration; fail build if `/a/` in user-facing data |
| B08 | P0 | P13 | Admin dashboard publicly accessible | Server-side auth gate returning 401/redirect |
| B09 | P0 | P13 | Fake-success API endpoints | Implement persistence/validation or return `501 Not Implemented` |
| B10 | P0 | P07 | Raw path interpolation in 404 (XSS risk) | `escapeHtml()` / `escapeAttribute()` on all request-derived data |

---

## Changed Files

_Log: append one row per file modified per phase. Auto-managed by `scripts/update-project-tracker.ts`._

| File | Phase | Reason | Tests |
|---|---|---|---|
| `docs/ATLAS-PROJECT-TRACKER.md` | P00 | Created tracker | — |
| `.atlas/project-status.json` | P00 | Created machine-readable tracker | — |
| `scripts/update-project-tracker.ts` | P00 | Created tracker updater | — |
| `reports/baseline/*` | P00 | Baseline audit artifacts | — |

---

## Open Editorial Issues

_Unsupported claims discovered during audit. Must be resolved or marked `[SOURCE REQUIRED]` before the affected page publishes or enters a sitemap._

| URL / File | Issue | Marker | Required action |
|---|---|---|---|
| `src/data/pillarFaqs.ts` | "reduced standard support overhead by 72%" — no source | `[SOURCE REQUIRED]` | Cite study or rewrite conservatively |
| `routeRegistry.ts` (`/`, `/reviews`) | "over 5,000 evaluated AI agents" — unsupported | `[SOURCE REQUIRED]` | Substantiate or soften to verifiable count |
| `routeRegistry.ts` (`/about`, `/`) | "India's premier independent authority" — superlative | `[EDITORIAL REVIEW REQUIRED]` | Remove or evidence |
| `renderSsrBody.ts` (agent type) | Hardcoded scores "9.6/10", "9.4/10", "₹1,680/mo" for all agents | `[RESEARCH REQUIRED]` | Per-entity data, not template constants |

---

## Slug Reconciliation Notes (critical for P01)

The data layer and route registry currently use **different slugs**. The entity resolver must reconcile:

| Route registry slug | Data-layer slug (`agents.ts`) | Action |
|---|---|---|
| `/agents/cursor` | `cursor-ai` | Canonicalize; redirect the non-canonical form |
| `/agents/vapi` | `vapi-ai` | Canonicalize; redirect the non-canonical form |
| `/agents/claude-code` | _(no entry; only `claude`)_ | Either add entity or 404 |
| `/categories/coding-agents` (registry) | `coding-agents` (categories.ts) ✅ | OK |
| `/compare/cursor-vs-copilot` (registry) | `cursor-ai` / `copilot` (comparisons.ts) | Reconcile slug pairs |
| `/research/state-of-ai-agents-india-2026` (registry) | `ai-agent-benchmark-index` etc. (research.ts) | Reconcile |

---

## Production Evidence

_Accumulated command output proving each phase. Populated as phases complete._

### P00 — Baseline
- `npx tsc --noEmit` → **PASS** (clean)
- `npm run build` → **PASS** (1 warning: `import.meta` in CJS, fixed P03)
- Bundle: `index-SM4oV-Fm.js` 1,167.26 kB (gzip 287.03 kB)
- No `test` script present yet

_(Subsequent phases append here.)_
