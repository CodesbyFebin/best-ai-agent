# Phase C — Scope Freeze

**Status:** Draft → Pending Approval  
**Date:** 2026-07-26  
**Owner:** Platform Engineering  
**Next:** Contract Freeze → Implementation Phase C

---

## Purpose

This document defines the **exact scope** of Phase C (Content OS) work. It answers:

- What deliverables are included?
- What is explicitly excluded (to prevent scope creep)?
- What assumptions and dependencies exist?
- What are the success criteria?
- What work is deferred to later phases?

**Audience:** Engineering, Product, Content leadership — all stakeholders in Phase C.

---

## Objectives

Phase C builds the **Content OS** — a deterministic, contract-bound system that transforms canonical entities (from Knowledge Graph) into validated, reproducible page content.

### Primary Goals

1. **Manifest registry** — Single source of truth for all pages
2. **Entity resolution** — Map page requests → canonical graph entities
3. **Immutable generation context** — Snapshot of entity + graph + build metadata
4. **Blueprint engine** — Extensible page rendering with versioned templates
5. **Validation pipeline** — Automated quality gates (schema, SEO, a11y, evidence, linking)
6. **Evidence layer** — Factual grounding with source traceability
7. **Quality scoring** — Weighted model for publish thresholds
8. **Internal linking** — Graph-driven automatic link injection

### Non-Goals

- Content generation at scale (Phase D)
- Editorial workflow UI (Phase D)
- AI-assisted content creation (Phase E)
- Multi-language content (Phase E)
- Real-time personalization (Phase F)
- Third-party API integrations beyond evidence validation

---

## Included Deliverables

### C1 — Content Manifest

| Item | Description | Format | Status |
|------|-------------|--------|--------|
| Manifest contract | `ContentManifest` interface (v1.0.0) | TypeScript | Draft |
| JSON Schema | Validates manifest structure | JSON Schema draft-07 | Draft |
| Repository | In-memory registry with validation | TypeScript | Not started |
| Verification tests | `npm run test:manifest` | TypeScript | Draft |
| ADR 0002 | Design decision record | Markdown | Draft |

---

### C2 — Entity Resolver

| Item | Description | Format | Status |
|------|-------------|--------|--------|
| Resolver contract | `EntityResolver` interface (v1.0.0) | TypeScript | Draft |
| Implementation | Graph adapter + batch lookup | TypeScript | Not started |
| Verification tests | `npm run test:resolver` | TypeScript | Not started |
| ADR 0003 | Design decision record | Markdown | Draft |

---

### C3 — Generation Context

| Item | Description | Format | Status |
|------|-------------|--------|--------|
| Context contract | `GenerationContext` interface (v1.0.0) | TypeScript | Draft |
| Snapshot builder | Subgraph extraction (depth-bounded) | TypeScript | Not started |
| Context factory | Builds context from manifest + resolver | TypeScript | Not started |
| Verification tests | `npm run test:context` | TypeScript | Not started |
| ADR 0004 | Design decision record | Markdown | Draft |

---

### C4 — Blueprint Engine

| Item | Description | Format | Status |
|------|-------------|--------|--------|
| Blueprint contract | `Blueprint` interface (v1.0.0) | TypeScript | Draft |
| Registry | Blueprint catalog + selection logic | TypeScript | Not started |
| ProductDetailV1 | First blueprint implementation | TSX/HTML | Not started |
| CategoryOverviewV1 | Second blueprint | TSX/HTML | Not started |
| Verification tests | `npm run test:blueprints` | TypeScript | Not started |
| ADR 0005 | Design decision record | Markdown | Draft |

---

### C5 — Validation Pipeline

| Item | Description | Format | Status |
|------|-------------|--------|--------|
| Validation contract | `ValidationRule`, `ValidationPipeline` (v1.0.0) | TypeScript | Draft |
| Rule engine | Sequential/parallel rule execution | TypeScript | Not started |
| Built-in rules (10) | schema-html5, seo-meta, a11y-alt, evidence, linking, quality | TypeScript | Not started |
| Validation CLI | `npm run validate` | TypeScript | Not started |
| Verification tests | `npm run test:validation` | TypeScript | Not started |
| ADR 0006 | Design decision record | Markdown | Draft |

---

### C6 — Evidence Layer

| Item | Description | Format | Status |
|------|-------------|--------|--------|
| Evidence contract | `EvidenceReference`, `EvidenceValidator` (v1.0.0) | TypeScript | Draft |
| Validator | Extract, validate, attach | TypeScript | Not started |
| Blueprint integration | EvidenceAttachment in BlueprintOutput | TypeScript | Not started |
| Validation rules | evidence-coverage, evidence-valid | TypeScript | Not started |
| Verification tests | `npm run test:evidence` | TypeScript | Not started |
| ADR 0007 | Design decision record | Markdown | Draft |

---

### C7 — Quality Scoring

| Item | Description | Format | Status |
|------|-------------|--------|--------|
| Quality contract | `QualityScorer`, `QualityWeights` (v1.0.0) | TypeScript | Draft |
| Scorer implementation | Weighted dimension aggregation | TypeScript | Not started |
| Readability integration | Flesch–Kincaid or similar | Library | Not started |
| Quality CLI | `npm run quality:score` | TypeScript | Not started |
| Verification tests | `npm run test:quality` | TypeScript | Not started |
| ADR 0008 | Design decision record | Markdown | Draft |

---

### C8 — Internal Linking

| Item | Description | Format | Status |
|------|-------------|--------|--------|
| Linker contract | `Linker`, `LinkRule` (v1.0.0) | TypeScript | Draft |
| Link rules (4) | BELONGS_TO, TOP_AGENT, SIMILAR_TO, COMPARED_WITH | TypeScript | Not started |
| Linker engine | generateLinks + validateLinks | TypeScript | Not started |
| Validation rule | linking-internal | TypeScript | Not started |
| Quality dimension | linking score | TypeScript | Not started |
| Verification tests | `npm run test:linking` | TypeScript | Not started |
| ADR 0009 | Design decision record | Markdown | Draft |

---

### C9 — Integration & System Tests

| Item | Description | Format | Status |
|------|-------------|--------|--------|
| End-to-end test | Manifest → published page (full pipeline) | TypeScript | Not started |
| Contract compliance | All interfaces exercised | TypeScript | Not started |
| Performance benchmarks | Build time, memory, bundle size | Markdown | Not started |
| CI integration | GitHub Actions workflow | YAML | Not started |
| Integration documentation | How to run pipeline locally | Markdown | Not started |

---

## Explicit Exclusions

These items are **out of scope** for Phase C. They belong to later phases or are separate initiatives:

| Item | Reason for Exclusion | Future Phase |
|------|----------------------|--------------|
| Editorial workflow UI (draft → review → publish) | Content OS is backend pipeline; editorial UI is Phase D | D |
| AI-assisted content generation (LLM prompts) | Use graph data only; AI augmentation is Phase E | E |
| Multi-language content (i18n) | Single language (en-US) only; translation is Phase E | E |
| Real-time personalization | Static generation only; dynamic personalization is Phase F | F |
| Third-party evidence validation (URL health, DOI resolve) | Basic validation only; advanced monitoring is Phase E | E |
| A/B testing framework | Not needed for deterministic baseline; experimentation later | F |
| User-facing quality dashboard | Internal metrics only; public dashboard is Phase F | F |
| Cache warming/CDN config | Infrastructure task, not Content OS core | E |
| Migration from existing pages | One-time effort; will be separate task |
| Blueprint for landing pages | Landing pages covered by generic blueprint; marketing to provide designs later | D |

**Important:** Exclusions are not "blocked" — they are intentionally **deferred** to later phases with clear owners.

---

## Assumptions

| # | Assumption | Impact if False |
|---|------------|-----------------|
| 1 | Knowledge Graph v1.0.0 is frozen and stable | Graph schema changes would require contract updates |
| 2 | Entity data is complete enough for initial blueprints | Gaps cause manifest creation delays (not pipeline delays) |
| 3 | Build infrastructure (Node, TypeScript) remains consistent | Toolchain changes could affect verification tests |
| 4 | Content team will provide manifest data once pipeline is ready | No manifests → no pages to generate (pipeline complete but unused) |
| 5 | Quality threshold of 75 is achievable for initial pages | If not, thresholds need adjustment (configuration, not code) |

---

## Dependencies

### Internal Dependencies

| Dependency | Phase | Status | Notes |
|------------|-------|--------|-------|
| Knowledge Graph (P00–P12) | Complete | ✅ Frozen | Provides entity data, graph relationships |
| Graph API endpoints (/api/graph/*) | Complete | ✅ Frozen | Exposes graph for RelatedAgents; also used by Content OS |
| Server infrastructure (Express) | Complete | ✅ Frozen | Will host new Content OS endpoints |
| LRU cache library (optional) | External | ⚪ Not chosen | May add for resolver performance |

### External Dependencies

| Dependency | Provider | Status | Notes |
|------------|----------|--------|-------|
| Flesch–Kincaid readability library | npm | ⚪ To select | Will pick `readability` or `slug` package |
| W3C HTML validator (optional) | W3C | ⚪ Subprocess | May call `vnu.jar` or use `parse5` |

---

## Success Criteria

Phase C is complete when **all** of the following are true:

1. ✅ All 9 work packages (C1–C9) have passing verification tests
2. ✅ All public contracts are frozen at v1.0.0 (no `-draft` markers)
3. ✅ ADRs 0002–0009 are approved and signed off
4. ✅ End-to-end pipeline executes: manifest → entity → context → blueprint → validation → quality → linker → published page
5. ✅ Verification suite is reproducible: `npm run test:*` all pass
6. ✅ Documentation is complete (architecture index, spec, ADRs, work breakdown)
7. ✅ No open blockers classified in Scope Freeze
8. ✅ Baseline metrics captured (before implementation changes them)

**Exit condition:** Scope Freeze document approved by Platform + Content leads. Implementation may commence.

---

## Deferred Work

Work explicitly postponed to later phases:

| Item | Phase | Rationale |
|------|-------|-----------|
| Editorial OS (workflow UI, editorial state management) | D | Separate subsystem; Content OS only generates, does not edit |
| AI-assisted evidence scoring (LLM confidence) | E | Requires GenAI integration; out of scope for deterministic baseline |
| Multi-language manifest support (i18n) | E | Adds complexity; single language first |
| Dynamic linking (user behavior-driven) | F | Static graph linking only for now |
| Performance optimization (caching, parallelization) | E | Optimize after functional completeness |
| External evidence health checks (URL monitoring) | E | Ops concern, not core pipeline |

Deferred work is **planned** and budgeted in the roadmap; it is not "cut" or "canceled."

---

## Work Classification

| Item | Category | Justification |
|------|----------|---------------|
| Graph API compatibility with Content OS | Blocker | Must ensure entity resolution works with current `/api/graph/*` endpoints |
| Contract freeze (v1.0.0) | Blocker | Must freeze before implementation to prevent drift |
| Manifest repository persistence format | Blocker | Decision needed: in-memory vs file vs DB (ADR) |
| Quality threshold default (75) | Blocker | Must be set before pipeline can pass/fail |
| Readability library selection | Planned | Can be swapped later; interface stable |
| Evidence attachment format (data-attribute schema) | Blocker | Must standardize before blueprints implement |
| Link rule priorities (when conflicts) | Planned | Can start with simple ordering; refine later |
| Manifest archival policy | Deferred | Phase D editorial concerns |

All items classified. No unclassified unknowns remain.

---

## Change Process

During implementation (Phase C), changes to **frozen contracts** require:

1. ADR creation documenting the change
2. Semantic MAJOR version bump (e.g., v1.0.0 → v2.0.0)
3. Team review and approval
4. Update of all dependent implementations (breaking change)

Changes to **implementation** (non-contract code) do **not** require ADR but should be documented in code comments or design notes.

---

## Entry Checklist

Before any implementation code is written, verify:

- [x] Scope document drafted and reviewed
- [x] All deliverables listed above (C1–C9)
- [x] Explicit exclusions documented
- [x] Dependencies identified and verified available
- [x] Success criteria agreed upon
- [x] Work classified (blockers, planned, deferred)
- [x] Baseline metrics capture plan defined (see BASELINE_METRICS.md)
- [ ] All ADRs (0002–0009) approved by stakeholders
- [ ] Public contracts (in `docs/ARCHITECTURE/`) updated to `v1.0.0` frozen
- [ ] Architecture index updated with frozen status
- [ ] Team sign-off on this document

---

## Next Steps

1. **Approve this scope** — Stakeholder review and sign-off
2. **Contract Freeze** — Bump all contract versions from `1.0.0-draft` to `1.0.0` in:
   - `engine/content/contracts/*.ts` (comment header)
   - `docs/ARCHITECTURE/CONTENT_OS.md` (version field)
   - Individual contract specs (CONTENT_MANIFEST.md, etc.)
3. **Baseline Metrics** — Run current verification suite, record counts (BASELINE_METRICS.md)
4. **Work Packages** — Convert this document into `docs/WORK_BREAKDOWN.md` with detailed tasks
5. **Implementation begins** — Start with **C1 Content Manifest** (manifest.repository.ts, validation, tests)

---

## Sign-off

| Role | Name | Approval | Date |
|------|------|----------|------|
| Platform Engineering Lead | — | Pending | — |
| Content Platform Lead | — | Pending | — |
| Quality Engineering Lead | — | Pending | — |

---

*Document version: 1.0.0-draft*  
*Will be updated to 1.0.0 upon approval*
