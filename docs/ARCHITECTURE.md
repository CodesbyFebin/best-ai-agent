# BestAIAgent.in — Platform Architecture

> **Evidence-first rewrite (2026-08-20).** This document was rewritten to remove fabricated metrics (the prior version claimed "53 canonical routes", "100/100", "417/417", "Production Ready", and referenced `renderSsrBody.ts` / `head-manager.tsx` files that do not exist in the tree). Every figure below is traced to a verified source on commit `a54d4fa`. Counts are dated; if the code drifts, this doc must be regenerated from `scripts/audit-baseline.ts` + `src/routing/routeRegistry.ts`.
> **Product type:** this is a content/evaluation catalogue, not an agent runtime — see [`POSITIONING.md`](./POSITIONING.md). The diagrams describe request, resolution, evidence, and rendering lifecycles that actually exist here (adapted from the master prompt's "agent / tool / memory / model" flow language to the real product type).

---

## 1. System overview

```mermaid
flowchart TB
    subgraph Runtime["Runtime (process)"]
        Express["Express app\n(server.tsx → createApp, line 160)"]
        Resolver["routeResolver.ts\nresolveRoute(path)"]
        Registry["routeRegistry.ts\n110 canonical routes / 171 redirects\n(as of 2026-08-20)"]
        Entities["entityResolvers.ts\nvalidate slugs against real registry"]
        Data["src/data/*\nagents • categories • comparisons\nresearch • directory • evidence"]
        Sitemap["sitemapGenerator.ts\ngenerateMasterSitemapXml + generateSegmentedSitemapXml"]
        Rss["utils/rss-feed-generator.ts\ngenerateRssFeedXml"]
        Graph["/api/graph/*\nrelated • similar • path"]
    end
    subgraph Deploy["Deploy targets"]
        Vercel["api/index.ts\n→ require dist/server.cjs → createApp()"]
        Local["npm run dev\ntsx server.tsx + Vite HMR"]
        Prod["npm start\nnode dist/server.cjs"]
    end
    subgraph StaticOut["Static outputs (public/)"]
        Robots["robots.txt (27 lines)"]
        Llms["llms.txt (37 lines) + llms-full.txt (21 lines)"]
        Security["security.txt + humans.txt"]
    end
    Local --> Express
    Prod --> Express
    Vercel --> Express
    Express --> Resolver
    Resolver --> Registry
    Resolver --> Entities
    Entities --> Data
    Express --> Sitemap
    Express --> Rss
    Express --> Graph
    Express -.served at root via vercel.json.-> Robots
    Express -.served at root.-> Llms
    Express -.served at root.-> Security
```

**VERIFIED:** `createApp()` is an `async export` in `server.tsx` (line 160). `api/index.ts` does `require('../dist/server.cjs').createApp()` and caches an `appPromise`. Route counts are from `routeRegistry.ts` on commit `a54d4fa`. `sitemapGenerator.ts` exports the two XML generators. The five root text files live in `public/` and are routed by `vercel.json`'s `/(robots|llms|llms-full|security|humans)\.txt` rule.

---

## 2. Request lifecycle (the "agent lifecycle" analog adapted to a catalogue)

```mermaid
flowchart TD
    Req["HTTP request\nGET /agents/cursor"] --> Handler["createApp() → Express handler"]
    Handler --> RenderFn["renderHtmlWithSeo(urlPath, templateHtml)\nserver.tsx"]
    RenderFn --> AdminGuard{"/admin* ?\n(server.tsx SSR-block, lines 52-61)"}
    AdminGuard -->|yes| Admin404["404 — admin never SSR-rendered"]
    AdminGuard -->|no| Resolve["resolveRoute(urlPath)\nrouteResolver.ts"]
    Resolve -->|"normalizePath(path)\npathNormalization.ts"| Norm["normalized path"]
    Norm --> LegacyCheck{"legacyRedirects[path]?\nrouteRegistry.ts (~171)"}
    LegacyCheck -->|hit| R301["301 → destination"]
    Norm --> ExactCheck{"canonicalRoutes[path]?\n(~110)"}
    ExactCheck -->|hit + status:redirect| R301
    ExactCheck -->|hit + published| Valid["valid RouteRecord"]
    Norm --> DynCheck{"/agents/ /categories/ /compare/\n/mcp/servers/ /research/ /authors/ ?"}
    DynCheck -->|yes, valid entity slug| Valid
    DynCheck -->|unknown slug| NF404["404 — not synthesized into a page"]
    DynCheck -->|non-canonical slug form| CanonicalR["301 → canonical slug"]
    Valid --> SSR["renderToString(<AppRouter route=route />)\nrenderToString(... route=null ...) for 404"]
    SSR --> Inject["inject <head> meta + <title> + JSON-LD\ninto template HTML"]
    Inject --> Response["HTTP 200 + SSR HTML"]
    R301 --> RedirectResp["HTTP 301"]
    NF404 --> Response404["HTTP 404 + noindex,follow"]
    Admin404 --> Response404
```

**VERIFIED:**
- `/admin*` is SSR-blocked before routing (`server.tsx` lines 52–61): returns a 404 title, never calls `resolveRoute`. Admin dashboard is never streamed to unauthenticated clients.
- 404 pages include `<meta name="robots" content="noindex, follow">` and omit a canonical tag (per the inline comment, "prevents indexing of invalid URLs").
- Resolution order (`routeResolver.ts`): home → legacy 301 → exact canonical (published or redirect) → dynamic entity (validated against the real registry; non-canonical slug → 301 to canonical; unknown slug → 404).
- `AppRouter` accepts a `route` prop and falls back to internal re-resolution for browser hydration (hybrid SSR + client resolution).

> **Note on the prior doc:** the previous version of this file claimed the SSR renderer lived in `src/routing/renderSsrBody.ts` and mentioned `src/routing/head-manager.tsx`. Neither file exists in `src/routing/` (verified: only `canonicalUrl.ts`, `entityResolvers.ts`, `evidenceRoutes.ts`, `pathNormalization.ts`, `routeRegistry.ts`, `routeResolver.ts`, `types.ts`). SSR is performed inline in `server.tsx` via `renderHtmlWithSeo` + `react-dom/server`'s `renderToString`. Do not re-add references to the non-existent files.

---

## 3. Evidence lifecycle (the "memory" analog — claims trace to receipts)

```mermaid
flowchart LR
    Vendor["Vendor / docs page\n(primary source)"] -->|fetched + quoted| Source["EvidenceSource\n{ url, publisher, retrievedAt,\npassage (exact quote),\nlocator?, authority: primary|secondary|tertiary,\nfreshness? }"]
    RepoSource["Upstream OSS repo\n(framework identity)"] -->|officialUrl| EntityField["entity.officialUrl\n(stored on the Agent row)"]
    EditorialFlag["Editorial claim"] -->|authority: tertiary| Source
    Source -->|aggregated into claim.evidence| Claim["EvidenceClaim\n{ id, statement,\nevidence: EvidenceSource[],\nconfidence 0-100,\nstatus: active|expired|contradicted|superseded,\nverifiedAt }"]
    Claim -->|"referenced via entity.evidenceIds: string[]"| Entity["Entity\n(src/data/agents.ts, etc.)"]
    Entity --> View["ProductProfile /\nComparePage / CategoryHubPage"]
    View --> ClaimRender["renders claim + verified status +\nlink to source + retrievedAt"]
    Gating{{"EVIDENCE_RULES gates\nCRITICAL>=90 (2+ primary OR 1p+2s)\nSTANDARD>=80 (1+ primary)\nCOMPARISON>=85 (2+ primary)\n(validateEvidence in evidenceSchema.ts)"}}
    Claim -.gated by.-> Gating
    Claim -.written to disk.-> EvDir["evidence/\n(p0-* and phase-* receipts)\n+ checksums.sha256 (build-artifact integrity, NOT evidence)"]
    Quarantine{{"Unsupported claim?\nquarantine/ + check:quarantine.ts (CI gate)"}}
```

**VERIFIED (against `src/data/evidenceSchema.ts` + `agentEvidence.ts` + `verify-evidence.ts` on `a54d4fa`):**
- The evidence model in this donor repo is **`EvidenceClaim` + `EvidenceSource`**, not `EvidenceRecord` with a `contentHash`. A claim has `id`, `statement`, `evidence: EvidenceSource[]`, `confidence` (0-100), `status` (`active`/`expired`/`contradicted`/`superseded`), `verifiedAt`. A source has `url`, `publisher`, `retrievedAt`, `passage` (the EXACT supporting quote), `locator?`, `authority` (`primary`/`secondary`/`tertiary`), `freshness?`. (**Correction:** an earlier draft of this doc conflated the companion production repo's `EvidenceRecord{contentHash}` model with this one; the production repo hashes source content, this donor repo does not.)
- Confidence gates (`EVIDENCE_RULES`): `CRITICAL` ≥ 90 (2+ primary OR 1 primary + 2 secondary), `STANDARD` ≥ 80 (1+ primary), `COMPARISON` ≥ 85 (2+ primary). Asserted in `verify-evidence.ts` (`rules.CRITICAL.minConfidence !== 90` etc.).
- Per-entity claims are referenced via `evidenceIds?: string[]` on the `Agent` interface in `src/data/agents.ts`; `agentEvidence.ts` holds agent-specific evidence extensions (`PricingEvidence`, `CapabilityEvidence`); the on-disk `evidence/` tree carries build-time receipts (`p0-*`, `phase-*`) plus a `checksums.sha256` file that protects **build artifacts**, not evidence content.
- Content lifecycle is an 11-state machine (candidate → intent_validated → evidence_complete → blueprint_approved → draft → automated_validation → human_review → publish_approved → published → monitored → refresh_required); `verify-evidence.ts` asserts the default state is `candidate`.
- Unsupported claims are quarantined under `quarantine/` (includes `21k-manifest-data.json` + `README.md`) and gated by `npm run check:quarantine`, which CI runs before `npm run build`.
- `authority` labeling (`primary` / `secondary` / `tertiary`) correlates with the master prompt's VERIFIED / INFERRED / PLANNED classification — only `primary`-sourced claims are presented as fact.

---

## 4. Build & deploy lifecycle (the "model flow" analog — outputs that ship)

```mermaid
flowchart TD
    Src["Source: src/ + server.tsx + api/index.ts + public/"] --> NpmCi["npm ci\n(package-lock.json canonical — bun.lock is redundant, see AUDIT.md G.4)"]
    NpmCi --> Build["npm run build"]
    Build --> Vite["vite build\n(client assets → dist/)"]
    Build --> Esbuild["esbuild server.tsx\n--bundle --platform=node --format=cjs\n--packages=external --sourcemap\n→ dist/server.cjs"]
    Dist["dist/ (Vite client + server.cjs)"] -.served.-> Local["npm start"]
    Dist -.served.-> Vercel["api/index.ts → createApp()"]
    CI[".github/workflows/ci.yml\nci: lint → quarantine → build → verify-invariants → verify-evidence → verify-sitemaps → verify-ssr → verify-routes → verify-redirects → verify-manifest → verify-scope-freeze"]
    CI -.gates merge.-> Merge["PR to main"]
```

**VERIFIED:** build script from `package.json`: `vite build && esbuild server.tsx --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs`. Vercel function (`api/index.ts`) requires `../dist/server.cjs`; `vercel.json` routes `/assets`, `.txt` files, and the catch-all `/.*` to `/api/index`. CI sequence confirmed in `.github/workflows/ci.yml`.

---

## 5. Discovery & SEO outputs (served routes)

```mermaid
flowchart LR
    SitemapIndex["/sitemap.xml + /sitemap-index.xml + /sitemap-indexed.xml"] --> SegAgents["/sitemap-agents.xml"]
    SitemapIndex --> SegCategories["/sitemap-categories.xml"]
    SitemapIndex --> SegComparisons["/sitemap-comparisons.xml"]
    SitemapIndex --> SegMcp["/sitemap-mcp.xml"]
    SitemapIndex --> SegResearch["/sitemap-research.xml"]
    SitemapIndex --> SegPages["/sitemap-pages.xml"]
    RssFeed["/rss.xml + /feed.xml + /rss"] --> RssGen["generateRssFeedXml"]
    LlmsTxt["/llms.txt + /llms-full.txt"] --> PublicLlms["public/llms.txt\npublic/llms-full.txt"]
    Robots["/robots.txt"] --> PublicRobots["public/robots.txt"]
```

**VERIFIED:** all six segment endpoints are wired in `server.tsx` and served by Vercel's text-file route. The sitemap index references the six segments.

---

## 6. Error flow

| Trigger | Result | Notes |
|---------|--------|-------|
| `/admin*` SSR request | 404 | SSR-blocked before routing (`server.tsx` lines 52–61). |
| Unknown dynamic slug (`/agents/does-not-exist`) | 404 + `noindex, follow` | Validated against the real registry; never synthesized. |
| Unknown canonical path | 404 + `noindex, follow` | Same 404 path; no canonical tag. |
| Non-canonical slug form (`/agents/cursor-ai`) | 301 → `/agents/cursor` | Server redirects to the canonical slug. |
| Legacy URL in `legacyRedirects` | 301 → destination | Consolidation layer (~171 entries). |
| Quarantine drift | CI fails (`npm run check:quarantine`) | Prevents unsupported claims from shipping. |

---

## 7. API surface (verified)

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/analyze-doc` | POST | Document analysis |
| `/api/recommend` | POST | Agent recommendations |
| `/api/submit-lead` | POST | Lead capture |
| `/api/submit-tool` | POST | Tool submission |
| `/api/subscribe` | POST | Newsletter subscription |
| `/api/graph/stats` | GET | Knowledge-graph statistics |
| `/api/graph/related/:type/:id` | GET | Related entities |
| `/api/graph/similar/:type/:id` | GET | Similar entities |
| `/api/graph/path/:ft/:fi/:tt/:ti` | GET | Entity path |
| `/api/admin/verify` | GET | Bearer-token check (admin) |
| `/api/admin/info` | GET | Admin info (auth required) |
| `/health` | GET | Health check |
| `/sitemap*.xml`, `/rss*.xml`, `/feed.xml`, `/llms*.txt`, `/robots.txt`, `/security.txt`, `/humans.txt` | GET | Discovery + SEO outputs |

> Security note: the `/api/admin/*` endpoints use a bearer-token compare, not a hardened identity system. See `SECURITY.md` once created (`AUDIT.md` §F.5) and `scripts/verify-admin-security.ts`.

---

## 8. What is **not** here (and why)

The master prompt's "agent lifecycle / tool execution / memory / model flow" sections describe an agent *runtime*. This repo is a **catalogue/evaluation platform** — it does not run LLM loops, call tools, hold agent memory, or serve model inference. The analogs above (request lifecycle, evidence lifecycle, build lifecycle) map those concepts onto what actually exists, so the diagrams remain truthful. Any "tool" / "memory" / "model" documentation belongs on the agent *entities' profile pages*, not in this repo's architecture.

---

## 9. Verification (dated; no fabricated aggregate scores)

As of commit `a54d4fa` (2026-08-20) on the **committed tree** (untracked scratch scripts set aside):

- `npm run lint` (`tsc --noEmit`) → exit 0 (commit `a54d4fa`)
- `npm run build` → produces `dist/server.cjs` + Vite client assets
- 16 `verify-*` scripts available; CI runs 9 of them in `ci.yml`

> The prior version of this file listed per-subsystem scores of "100" and a "Platform Score: 100/100" with "417/417" / "419/419" tests. Those figures were asserted without a reproducible harness and are **not** restated. For an evidence-first claims audit, see [`../AUDIT.md`](../AUDIT.md); for the current test reality run, `npm run lint && npm run build && npm run test:*`.
