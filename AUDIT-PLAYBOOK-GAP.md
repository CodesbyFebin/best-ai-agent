# AEO/GEO Playbook Gap Audit — bestaiagent.in

**Date:** 2026-07-15
**Scope:** Audit of the live codebase against "The Complete AEO & GEO Playbook" (9 sections).
**Method:** Direct code inspection of `src/`, `server.ts`, `scripts/generate-static-site.cjs`, `scripts/seo_utils.js`, `public/`, plus inspection of actually-shipped `dist/static-site/*.html` output.

---

## UPDATE 2026-07-15 — Implementation status (P0/P1 fixes applied)

The crawlable-snapshot gaps identified below have now been addressed. Changes made:

**`scripts/generate-static-site.cjs`** — added shared `renderQuickAnswer` (with `data-answer="true"` + `.direct-answer`), `renderDates` (machine-readable `<time datetime>`), `renderSources` (`<cite>` + `rel="nofollow"`), `renderComparisonTable`, and `renderEntityTable`; wired into every snapshot type (home, mcp, tool, hub, comparison, entity, generic, blog post, topic cluster). Entity paths (`-entity`, `/entity/`) now route to `entitySnapshot`.

**`scripts/seo_utils.js`** — plumbed `directAnswer`, `comparisonFields`/`verdict`, `publishedAt`, `sources`, `entity`, and `editorialScore` through route-meta. Added `readProductReviewMap`, `readEntityMap`, `readExternalLinksMap`, `sourcesForSlug`, `editorialSources`. `pageSchema` now emits a first-party editorial `Review` (author = editorial team, `reviewRating` from the real `overallScore`, `reviewBody` from the real `verdict`) ONLY when a genuine score exists — **no fabricated `AggregateRating`**.

**`src/App.tsx` + `server.ts`** — Organization schema `sameAs` now lists real profiles (Twitter, GitHub repo). No fake Wikipedia/Wikidata links.

**Verified across 1,505 generated pages:** Quick Answer 97%, `<time>` dates 97%, `<table>` 50%, Sources block 9% (scoped to tool/comparison/entity pages with real verified links). Remaining 3% without Quick Answer/`<time>` are index/navigation pages where they don't apply. All JSON-LD validated as parseable.

**NOT done (by design):** Phase 1 sitemaps (already complete in repo); Phase 5 (60 × 8,000-word pages — not auto-generated to avoid fabricating vendor claims); `Breadcrumbs.tsx` / `src/pages/*.md` (files don't exist in this architecture); fake `aggregateRating` (policy violation).

---


---

## 0. Critical architecture note (read first)

The playbook assumes crawlers read your rendered page. On this site there are **two different render paths**, and they do NOT contain the same content:

1. **React SPA runtime** (`src/App.tsx`, components) — rich UI: Quick Answer blocks, comparison tables, FAQ accordions, dates, external links. This runs **only after JS executes in a browser**.
2. **Static snapshot + route-meta schema** (`server.ts` → `scripts/generate-static-site.cjs` + `public/route-meta.json`) — this is the pre-rendered HTML that **LLM crawlers and non-JS bots actually receive**.

**The gap that matters most:** the static snapshot (what LLMs crawl) is a *stripped-down* version. Verified against shipped files in `dist/static-site/` (21 pages inspected): most page types render only `H1 + description paragraph + FAQ accordion + nav links`. They do **not** render Quick Answer sections, comparison tables, entity tables, `<time>` tags, or citation/source sections that exist in the SPA.

So many playbook elements are "implemented" in the SPA but **invisible to the AI crawlers the playbook targets.** This is the #1 theme of this audit.

Evidence:
- Snapshot builder routing: `scripts/generate-static-site.cjs:596-607`
- Generic page template (used by most routes): `scripts/generate-static-site.cjs:426-455` — only H1, description, related-links nav, FAQ
- Shipped output check (`dist/static-site/agentops-review.html`): `<table>` = **absent**, "Quick Answer" = **absent**, `<time>` = **absent**, "Sources/References" = **absent**, `FAQPage` schema = present, `datePublished/dateModified` schema = present.
- Only `/best-ai-agent-india` (`indiaPillarSnapshot`, `:457-594`) and `/blog/*` (`:321-424`) render Quick Answer + tables in the crawlable body. All other page types do not.

---

## Section-by-section scorecard

| Playbook § | Element | SPA (browser) | Crawlable snapshot (LLM-visible) | Verdict |
|---|---|---|---|---|
| 3.1 | Quick Answer block | ✅ Present | ⚠️ Only home/india-pillar/blog | **Partial** |
| 3.2 | Direct answer first sentence | ✅ `directAnswer` field | ✅ description-led | **Good** |
| 3.3 | Structured data (schema) | ✅ | ✅ (see per-type below) | **Good/Partial** |
| 3.4 | "Definitive Answer" section | ❌ | ❌ | **Missing** |
| 3.5 | Entity architecture / entity tables | ⚠️ data exists | ❌ not rendered as tables; no external authority links | **Partial** |
| 3.6 | "People Also Ask" clustering | ❌ | ❌ | **Missing** |
| 3.7 | Comparison tables | ✅ `ComparisonPage.tsx` | ⚠️ only india-pillar/blog | **Partial** |
| 3.8 | Citation & source blocks | ⚠️ partial | ❌ | **Partial/Missing** |
| 3.9 | Date stamps & freshness | ✅ plain text + schema | ⚠️ schema only, no visible `<time>` | **Partial** |
| 3.10 | Proximity to answer | ✅ | ✅ | **Good** |

---

## Detailed findings

### 3.1 Quick Answer Box — PARTIAL
- **SPA:** Yes. `directAnswer` field drives Quick Answer blocks: `src/App.tsx:1619` ("Quick Answer for AI Overviews"), `:4664`; `src/components/ComparisonPage.tsx:65-66`; `src/components/AuthorityExpansionBlock.tsx:138-139`.
- **Crawlable:** Only homepage, `/best-ai-agent-india`, and `/blog/*` snapshots render a Quick Answer section (`generate-static-site.cjs:393-396`). Tool reviews, comparisons, hubs, entities, and all generic pages render an H1 + description but **no labelled Quick Answer** in crawlable HTML.
- **Fix:** Add a `renderQuickAnswer(meta)` block to every snapshot type in `generate-static-site.cjs`, sourced from a `meta.directAnswer` field piped into `route-meta.json`.

### 3.2 Direct Answer First Sentences — GOOD
- `directAnswer` exists on silo/comparison pages and is used for meta descriptions (`src/App.tsx:1223`) and snapshots. Descriptions lead with the answer. No major gap.

### 3.3 Structured Data (Schema) — GOOD, with type gaps
Crawlable schema comes from `route-meta.json` (built by `seo_utils.js:pageSchema`, `:876-988`) and `server.ts`.

Covered `@type`s: `WebPage`, `Article`, `BreadcrumbList`, `FAQPage` (`seo_utils.js:894-905`), `SoftwareApplication` (`:906`), `ItemList` (`:918`), `HowTo` (`:932`), `DefinedTerm` (`:962`), `Organization`, `WebSite`, `CollectionPage` (`server.ts:90-146`), `Person`, `SpeakableSpecification` (`seo_utils.js:973-986`).

Gaps vs playbook table:
- **`QAPage`** — not generated anywhere. **Missing.**
- **`Product` / `Review` / `AggregateRating`** — playbook wants these for reviews/comparisons. Reviews use `SoftwareApplication` only; no `Review`/`aggregateRating`/`Product`. **Missing** — a real gap for a review site.
- **`Service`** — not generated. Minor.
- **`HowTo`** — generated only when a route's `schemaTypes` includes `"HowTo"` (mainly comparisons via `seo_utils.js:932-961`). Not on tutorial/guide pages generally. **Partial.**
- **Dead code:** `src/components/IndiaMcpCustomizer.tsx:367-437` builds `FAQPage`/`TechArticle`/`DataCatalog` JSON-LD into `seoJsonLd` that is **never injected into the DOM**, while the page copy (`:1093`) claims these schemas are active. Remove or wire it up.
- **SPA runtime schema** (`src/App.tsx:751-984`) does **not** emit `FAQPage` or `HowTo` — only Organization/WebSite/ItemList/Article/BreadcrumbList/WebPage/SoftwareApplication/Person. (Less important since crawlers use the snapshot's route-meta schema, but inconsistent.)

### 3.4 "Definitive Answer" Section — MISSING
- The specific playbook pattern (a standalone authoritative answer section distinct from Quick Answer) does **not exist**. Only match is an H1 string `src/data/db.ts:521` ("The Definitive 2026 Leaderboard"), not a section.
- The site uses "Quick Answer" as its single answer pattern. **Fix:** optional — add a Definitive Answer section, or treat Quick Answer as fulfilling this role (recommend consolidating rather than duplicating).

### 3.5 Entity-Based Architecture — PARTIAL (biggest GEO gap)
- **Entities defined:** ~101 in `src/data/entities/` (agents 20, models 25, mcp 17, frameworks 15, companies 13, vector DBs 6, voice 5). Large graph data in `public/knowledge-graph.json` (524KB), `entity-index.json`, `tool-relationships.json`.
- **Relationship language exists in data** (`src/data/relationshipGraph.ts:22-37` defines `COMPETES_WITH`, `ALTERNATIVE_TO`, `BUILT_BY`, `USES`, etc.; 148 edges) — **but is not rendered** in any UI or snapshot. `relationshipGraph.ts`, `rankingData.ts`, `relationshipEngine.ts` appear to be dead/unimported.
- **No external authority links (Wikipedia/Wikidata/DBpedia):** zero matches across `src/`. Playbook §3.5 point 2 explicitly wants `sameAs` links to Wikipedia/Wikidata. **Missing** — high-value, low-effort GEO win.
- **No rendered "Entity Overview" table** anywhere (`entitySnapshot` at `generate-static-site.cjs:303-318` renders only H1 + description + nav + FAQ).
- **`Organization` schema has empty `sameAs: []`** (`src/App.tsx:771`) — a wasted authority signal.
- **Fixes:** (a) add `sameAs` Wikipedia/Wikidata to Organization + entity schemas; (b) render an entity-relationship table in `entitySnapshot`; (c) emit an entity `about`/relationship graph in schema.

### 3.6 "People Also Ask" Clustering — MISSING
- No `peopleAlsoAsk`/`relatedQuestions`/PAA clustering. Zero matches in `src/`.
- Site has flat FAQ arrays (`src/data/pillarFaqs.ts`, `db.ts`) but no "primary → related → next-step" clustering the playbook describes.
- **Fix:** structure FAQ data into clusters and consider `QAPage` schema for them.

### 3.7 Comparison Tables — PARTIAL
- **SPA:** Real semantic tables exist — `src/components/ComparisonPage.tsx:141-164` (`<table><thead><tbody>` with criteria/tool/winner columns), fed by `src/data/comparisons.ts` (73KB).
- **Crawlable:** Comparison snapshots (`comparisonSnapshot`, `generate-static-site.cjs:285-301`) render **no table** — just H1, description, nav, FAQ. Only `indiaPillarSnapshot` (`:540-566`) ships real `<table>` markup. So the comparison data tables that "LLMs love" are invisible to crawlers on actual `-vs-` pages.
- **Fix:** render the comparison table into `comparisonSnapshot` (pipe `toolA`/`toolB` rows via route-meta).

### 3.8 Citation & Source Blocks — PARTIAL / MISSING
- `src/components/ExternalLink.tsx` renders authoritative outbound links on product/comparison pages in the SPA (`ProductProfile.tsx:1068`, `ComparisonPage.tsx:32`).
- `src/data/citations.ts` exists (5 citations, 3 tiers) but is **not imported/rendered** anywhere.
- **No "Sources/References" section** on content pages, and none in any crawlable snapshot. Playbook §3.8 wants a visible references section + `<cite>` tags. **Missing in crawlable output.**
- **Fix:** render a References section (from `citations.ts` / `externalLinks.ts`) into snapshots; add `<cite>` for quotes.

### 3.9 Date Stamps & Freshness — PARTIAL
- **Schema:** `datePublished` + `dateModified` present in Article schema (`src/App.tsx:849-850`, `seo_utils.js` article schema; confirmed in shipped `agentops-review.html`). ✅
- **Visible dates in SPA:** plain-text spans, e.g. `src/App.tsx:3127` (`Published:`), `:3138` (`Last Updated`), `:2285`.
- **No `<time datetime="...">` machine-readable tags anywhere** (zero matches). Playbook §3.9 pro-tip explicitly asks for `<time>`.
- **Crawlable snapshots:** most page types render **no visible date at all** (only `indiaPillarSnapshot:591` and pillar `:537` show a date). Generic/tool/comparison snapshots omit visible dates.
- **Fixes:** (a) convert visible dates to `<time datetime>`; (b) render published/updated `<time>` into every snapshot from route-meta.

### 3.10 Proximity to Answer — GOOD
- H1 → description/answer appears at top of both SPA and snapshots. No gap.

---

## Section 4 checklist (playbook's own list) mapped to reality (crawlable output)

| Playbook task | Status |
|---|---|
| Quick Answer section | ⚠️ only home/india/blog snapshots |
| JSON-LD (FAQPage/HowTo/Article) | ✅ Article/FAQPage; ⚠️ HowTo limited |
| Definitive Answer section | ❌ |
| Entity table/list | ❌ (data exists, not rendered) |
| Comparison table | ⚠️ only india-pillar snapshot |
| 10+ FAQs w/ direct answers | ✅ (data supports; snapshot shows FAQ) |
| Sources/references w/ citations | ❌ in crawlable output |
| Publication & last-updated dates | ⚠️ schema yes, visible `<time>` no |
| Answer within first 200 words | ✅ |
| Bullet/numbered lists & tables | ⚠️ lists yes, tables mostly not in snapshots |
| Grade 8–10 readability | ⚠️ FAQ answers are long (300+ words, `pillarFaqs.ts:5,9,345`) — not snippet-sized |

---

## Section 6 (measuring success) — not implemented as tooling
No citation/snippet tracking wired in repo; `@vercel/analytics` + `speed-insights` present (`package.json:76-77`) but no AI-citation or featured-snippet monitoring. Out of scope for content but worth noting.

---

## Prioritized recommendations

**P0 — Make crawlable snapshots match the playbook (highest ROI, because this is what LLMs read)**
1. Add Quick Answer + visible `<time>` published/updated to **every** snapshot type in `generate-static-site.cjs` (currently only home/india/blog). Requires piping `directAnswer` + dates into `route-meta.json`.
2. Render comparison tables into `comparisonSnapshot`, and entity tables into `entitySnapshot`.
3. Add a References/Sources section (from `externalLinks.ts`/`citations.ts`) to snapshots.

**P1 — Schema completeness for a review site**
4. Add `Review` + `aggregateRating` (and/or `Product`) schema to tool-review routes. `SoftwareApplication` alone under-sells a review site.
5. Add `sameAs` Wikipedia/Wikidata links to `Organization` (`src/App.tsx:771` empty array) and entity schemas.
6. Emit `HowTo` on tutorial/guide routes, not just comparisons.

**P2 — Structure & hygiene**
7. Build PAA-style FAQ clustering; consider `QAPage`.
8. Trim FAQ answers toward 150–300 chars for snippet extraction (or provide a short "snippet answer" + long-form body).
9. Remove or wire up dead JSON-LD in `IndiaMcpCustomizer.tsx:367-437` (and fix the false claim at `:1093`).
10. Optional: add a distinct "Definitive Answer" section or consolidate on Quick Answer.

---

## What's already strong (keep)
- Comprehensive schema pipeline via `route-meta.json` (`seo_utils.js:876-988`).
- `FAQPage` on nearly all crawlable pages (confirmed in shipped HTML).
- `Speakable` voice schema for en-IN/hi-IN (`server.ts:356-367`, `seo_utils.js:973-986`).
- `llms.txt` / `llms-full.txt`, knowledge-graph JSON, extensive sitemaps in `public/`.
- Strong India/EEAT differentiation, author schema, breadcrumbs everywhere.
