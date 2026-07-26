# Phase C Work Breakdown

**Scope:** Implementation of Content OS (C1–C9) after Scope Freeze sign-off.

**Work package structure:**

- **Objective** — What this package achieves
- **Dependencies** — Prerequisites (earlier packages)
- **Deliverables** — Concrete artifacts (code, docs, tests)
- **Verification** — How to confirm completion
- **Exit Criteria** — Conditions to mark package done

---

## C1 — Content Manifest

**Objective:** Implement the `ContentManifest` contract as a functional repository with validation.

**Dependencies:** None (first implementation package)

**Deliverables:**

1. `engine/content/manifest.repository.ts` — In-memory registry with CRUD operations
2. `engine/content/manifest.validator.ts` — Invariant validation (unique IDs, URLs, entity references)
3. `engine/content/manifest.loader.ts` — Load manifests from `manifest-data.json` at startup
4. `types/manifest-data.ts` — JSON schema type definitions (if needed)
5. `npm run test:manifest` — Comprehensive test suite (unit + integration)
6. `docs/CONTENT_MANIFEST_IMPLEMENTATION.md` — Implementation notes (not contract)

**Verification:**

```bash
# Unit tests
npm run test:manifest

# Load test: ensure repository loads manifest-data.json without errors
node -e "import('./engine/content/manifest.repository.ts').then(m => new m.ManifestRepository().load('manifest-data.json'))"

# Invariant check: all required fields present, no duplicates
npm run test:manifest -- --strict
```

**Exit Criteria:**

- ManifestRepository instantiates and loads `manifest-data.json` successfully
- All invariants enforced (throws on invalid manifest)
- Test coverage ≥ 90% for repository and validator
- `npm run test:manifest` exits 0 with all tests passing

---

## C2 — Entity Resolver

**Objective:** Implement `EntityResolver` that bridges Content OS to Knowledge Graph.

**Dependencies:** C1 (ManifestRepository) — resolver will be used by context factory

**Deliverables:**

1. `engine/content/resolver.impl.ts` — Graph adapter implementing `EntityResolver`
2. `engine/content/resolver.cache.ts` — Optional LRU cache layer
3. `scripts/verify-resolver.ts` — Batch resolution verification
4. Unit tests: resolve(), resolveBatch(), canResolve()
5. Integration tests: resolver works with actual graph-data.json

**Verification:**

```bash
# Unit tests
npm run test:resolver

# Batch resolution test: feed 10 entity IDs, verify O(1) lookup
npm run test:resolver -- --batch

# Cache hit rate test (if cache enabled)
npm run test:resolver -- --cache-stats
```

**Exit Criteria:**

- `resolve()` returns correct entity data or null
- `resolveBatch()` completes in O(n) where n = batch size (not graph size)
- `canResolve()` consistent with `resolve()`
- Cache hit rate ≥ 80% for repeated lookups (if cache enabled)
- All tests passing, coverage ≥ 90%

---

## C3 — Generation Context

**Objective:** Implement `GenerationContext` factory and graph snapshot builder.

**Dependencies:** C1 (Manifest), C2 (EntityResolver)

**Deliverables:**

1. `engine/content/context.factory.ts` — Builds immutable context from manifest + resolver
2. `engine/content/graph-snapshot.builder.ts` — Extracts subgraph within `internalLinkingDepth` hops
3. `engine/content/immutable.ts` — Utility for deep readonly enforcement
4. Unit tests: context construction, snapshot completeness, immutability
5. Performance test: snapshot building time for typical entity

**Verification:**

```bash
npm run test:context

# Snapshot depth test: verify snapshot includes all nodes within depth
npm run test:context -- --snapshot-depth

# Immutability test: attempt to modify context at runtime (should fail TypeScript compile)
npm run lint -- context.factory.ts
```

**Exit Criteria:**

- `GraphSnapshotBuilder.build(entity, depth=2)` returns ≤ 100 nodes for 95% of agents
- Context is deeply readonly (TypeScript enforces)
- `buildTimestamp` set once and consistent across all context fields
- All tests passing, coverage ≥ 90%

---

## C4 — Blueprint Engine

**Objective:** Implement blueprint registry, selector, and first two blueprints (ProductDetailV1, CategoryOverviewV1).

**Dependencies:** C1 (Manifest), C3 (Context)

**Deliverables:**

1. `engine/content/blueprint/registry.ts` — BlueprintRegistry class
2. `engine/content/blueprint/selector.ts` — Blueprint selection logic
3. `engine/content/blueprint/product-detail.v1.tsx` — Product detail blueprint (TSX/HTML)
4. `engine/content/blueprint/category-overview.v1.tsx` — Category overview blueprint
5. `engine/content/blueprint/base.ts` — Abstract base class (optional)
6. Unit tests: registry, selection, blueprint validation
7. Integration tests: blueprint generates valid HTML for sample manifests

**Verification:**

```bash
npm run test:blueprints

# Render test: generate HTML for ChatGPT manifest, check output length > 1000
npm run test:blueprints -- --render product-detail cursor-ai

# Validate generated HTML against schema (if HTML validator available)
npm run validate:html -- dist/preview/cursor-ai.html
```

**Exit Criteria:**

- BlueprintRegistry correctly selects blueprint by `blueprintId` or by `contentType`
- Both blueprints produce valid HTML5 (passes W3C validator or `parse5` check)
- Generated HTML includes required fields (title, description, h1, canonical)
- All tests passing, coverage ≥ 85%

---

## C5 — Validation Pipeline

**Objective:** Implement validation rule engine and 10 built-in rules.

**Dependencies:** C1 (Manifest), C4 (BlueprintOutput)

**Deliverables:**

1. `engine/content/validation/pipeline.ts` — ValidationPipeline implementation
2. `engine/content/validation/rules/` — 10 rule files:
   - `schema-html5.ts`
   - `schema-manifest.ts`
   - `seo-meta.ts`
   - `seo-headings.ts`
   - `a11y-alt-text.ts`
   - `a11y-arias.ts`
   - `evidence-coverage.ts`
   - `evidence-valid.ts`
   - `linking-internal.ts`
   - `quality-score.ts`
3. `scripts/validate.ts` — CLI to validate generated HTML against manifest
4. Unit tests: each rule independently, pipeline orchestration
5. Integration tests: full validation on sample pages

**Verification:**

```bash
npm run test:validation

# Rule-by-rule breakdown
npm run test:validation -- --verbose

# Validate a specific generated page
npm run validate -- --manifest manifest-data.json --html dist/preview/cursor-ai.html
```

**Exit Criteria:**

- All 10 rules execute without errors
- Pipeline aggregates results correctly (errors, warnings, infos)
- `ValidationReport.score` matches `QualityScorer` (C7 later, but score calculation can be tested independently)
- Validation does not modify input HTML (pure function guarantee)
- All tests passing, coverage ≥ 90%

---

## C6 — Evidence Layer

**Objective:** Implement evidence extraction, validation, and attachment.

**Dependencies:** C1 (Manifest), C4 (BlueprintOutput evidence field), C5 (validation rules)

**Deliverables:**

1. `engine/content/evidence/validator.ts` — `EvidenceValidator` implementation
2. `engine/content/evidence/extractor.ts` — HTML scanning for `data-evidence` and `title="Evidence:"`
3. `engine/content/evidence/attach.ts` — Attachment fetching (graph node data, external snippets)
4. `schemas/evidence-reference.json` — Schema for `data-evidence` JSON format
5. Integration: Blueprint returns `evidence?: EvidenceAttachment[]` in `BlueprintOutput`
6. Unit tests: extractor accuracy, validator correctness, attach retries
7. Validation rules: `evidence-coverage` and `evidence-valid` integration

**Verification:**

```bash
npm run test:evidence

# Extraction test: given HTML with 3 evidence refs, extractor finds exactly 3
npm run test:evidence -- --case extraction

# Validation test: all references resolve (graph nodes exist, URLs reachable)
npm run test:evidence -- --case validation
```

**Exit Criteria:**

- `extract(html)` finds ≥ 99% of evidence markers in test HTML
- `validate(refs)` correctly identifies unresolvable vs valid
- `attach(ref)` returns content for graph_node type (external sources may return null)
- Blueprint integration: evidence attached to BlueprintOutput appears in rendered HTML
- All tests passing, coverage ≥ 85%

---

## C7 — Quality Scoring

**Objective:** Implement weighted quality scorer and integrate with validation pipeline.

**Dependencies:** C5 (ValidationReport), C6 (Evidence dimension)

**Deliverables:**

1. `engine/content/quality/scorer.ts` — `QualityScorer` implementation with default weights
2. `engine/content/quality/readability.ts` — Readability score calculation (Flesch–Kincaid)
3. `config/quality-weights.json` — Default weights (schema:0.2, seo:0.25, a11y:0.15, evidence:0.2, readability:0.1, linking:0.1)
4. `scripts/quality:score.ts` — CLI to compute score from ValidationReport JSON
5. Unit tests: scorer determinism, weight normalization, threshold logic
6. Integration: Pipeline computes score at end of validation

**Verification:**

```bash
npm run test:quality

# Manual score: given a ValidationReport JSON, compute score
npm run quality:score -- report.json

# Determinism test: same report → same score (within floating point tolerance)
npm run test:quality -- --determinism
```

**Exit Criteria:**

- `score(report)` returns overall 0–100 and component scores 0–100
- Default weights sum to 1.0 (enforced on construction)
- `passed === (overall ≥ threshold)` invariant holds
- Score computation deterministic (same input → identical output)
- All tests passing, coverage ≥ 90%

---

## C8 — Internal Linking

**Objective:** Implement linker engine with 4 link rules (BELONGS_TO, TOP_AGENT, SIMILAR_TO, COMPARED_WITH).

**Dependencies:** C2 (EntityResolver for target validation), C3 (GenerationContext with graph snapshot), C5 (linking validation rule)

**Deliverables:**

1. `engine/content/linking/linker.ts` — `Linker` implementation
2. `engine/content/linking/rules/` — 4 rule files:
   - `belongs-to.rule.ts` (agent → category)
   - `top-agent.rule.ts` (category → top agents)
   - `similar-to.rule.ts` (agent → similar agents)
   - `compared-with.rule.ts` (agent → compared agents)
3. `engine/content/linking/validator.ts` — `validateLinks()` implementation (reuse EntityResolver)
4. Validation rule: `linking-internal` already covered in C5 (just needs linker integration)
5. Quality dimension: linking score calculation (C7 integration)
6. Unit tests: each rule's `findOpportunities()`, linker deduplication, validation
7. Integration test: full pipeline produces page with injected links, no broken targets

**Verification:**

```bash
npm run test:linking

# Rule-specific: belongs-to should find category link for agent
npm run test:linking -- --rule belongs-to --entity cursor-ai

# Validation: all generated links point to published manifests
npm run test:linking -- --validate-all
```

**Exit Criteria:**

- `generateLinks()` returns at most `maxLinks` total with no duplicates
- All returned `targetNodeId` resolve to PUBLISHED manifests (validation passes)
- Link opportunities have `relevance ≥ rule.minRelevance`
- At least 3 internal links appear on typical product detail page
- All tests passing, coverage ≥ 85%

---

## C9 — Integration & System Tests

**Objective:** Verify end-to-end pipeline: manifest → published page with all subsystems.

**Dependencies:** C1–C8 all complete

**Deliverables:**

1. `engine/content/pipeline.ts` — Orchestrates full pipeline: manifest → resolver → context → blueprint → validation → quality → linker
2. `scripts/generate.ts` — CLI to generate a page given a manifest slug
3. `tests/e2e/` — End-to-end test suite:
   - `manifest-to-page.test.ts` — Full pipeline exercise
   - `contract-compliance.test.ts` — Verify all contracts satisfied
   - `performance.test.ts` — Build time, memory footprint benchmarks
4. `.github/workflows/ci.yml` — GitHub Actions CI running all `npm run test:*`
5. `docs/INTEGRATION.md` — How to run pipeline locally, debug failures, extend
6. `docs/PERFORMANCE.md` — Baseline metrics, performance expectations

**Verification:**

```bash
# E2E test: generate all pages in manifest-data.json
npm run generate -- --all

# Check all generated pages pass quality threshold
npm run quality:score -- dist/pages/**/manifest.json

# CI dry run
act -j test  # (if using act for local GitHub Actions)

# Performance: build time < 5s for 50 pages (target)
npm run benchmark:generate
```

**Exit Criteria:**

- End-to-end test generates page from manifest without errors
- All generated pages have quality score ≥ 75
- CI workflow passes all test suites (test:manifest, test:resolver, ..., test:linking)
- Performance benchmark meets targets (build time linear in page count)
- Documentation complete (INTEGRATION.md, PERFORMANCE.md)
- All tests passing, coverage ≥ 85% overall

---

## Work Package Summary Table

| Package | Name | Dependencies | Status | Exit Command |
|---------|------|--------------|--------|--------------|
| C1 | Content Manifest | None | Not started | `npm run test:manifest` |
| C2 | Entity Resolver | C1 | Not started | `npm run test:resolver` |
| C3 | Generation Context | C1, C2 | Not started | `npm run test:context` |
| C4 | Blueprint Engine | C1, C3 | Not started | `npm run test:blueprints` |
| C5 | Validation Pipeline | C1, C4 | Not started | `npm run test:validation` |
| C6 | Evidence Layer | C1, C4, C5 | Not started | `npm run test:evidence` |
| C7 | Quality Scoring | C5, C6 | Not started | `npm run test:quality` |
| C8 | Internal Linking | C2, C3, C5 | Not started | `npm run test:linking` |
| C9 | Integration | C1–C8 | Not started | `npm run test:e2e` |

---

## Parallelization Opportunities

- **C1** is standalone; can start immediately
- **C2** and **C3** are coupled; may be developed together
- **C4** depends on C3; can begin as soon as C3 provides basic context
- **C5** depends on C4 (BlueprintOutput); but rule engine can be developed in parallel with blueprints using mock output
- **C6** depends on C4 (evidence field) and C5 (rules); can be developed alongside C5
- **C7** depends on C5; can start once first validation rules run
- **C8** depends on C2/C3; linker can be built independently from blueprints
- **C9** waits for all others

**Suggested initial cadence:**
1. Complete C1
2. Start C2 and C3 in parallel
3. Start C4 when C3 has prototype
4. Start C5 and C6 together once C4 basic output available
5. Start C7 after C5 first draft
6. Start C8 after C2/C3 stable
7. C9 last

---

## Definition of Done (Phase C)

Phase C is complete when:

- All 9 work packages (C1–C9) meet their exit criteria
- All contracts are frozen at v1.0.0 (no `-draft` markings)
- All ADRs (0002–0009) are approved and signed off
- End-to-end pipeline runs successfully on at least 5 distinct manifests
- CI pipeline passes 100% of tests reproducibly
- Documentation is complete and published in `docs/`
- No open blockers classified in Scope Freeze

**Result:** Content OS platform capability ready for Phase D (Editorial OS) without architectural changes.

---

*This work breakdown is the implementation roadmap for Phase C. No work begins until Scope Freeze sign-off.*
