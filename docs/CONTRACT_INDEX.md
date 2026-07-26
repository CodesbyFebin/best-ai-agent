# Contract Index

**Purpose:** Central registry of all frozen public contracts in the ATLAS P99 platform.

**Versioning:** All contracts follow Semantic Versioning. `v1.0.0` is frozen.

---

## How to Use This Document

- **Implementation:** Reference the contract file to see the interface you must satisfy.
- **Consumers:** Use this index to find the stable API for a subsystem.
- **Maintainers:** When changing a contract, update version and ADR.

---

## Knowledge Graph Contracts

| Contract | File | Version | Status | Description |
|----------|------|---------|--------|-------------|
| `GraphNode` | [`docs/ARCHITECTURE/GRAPH_SPECIFICATION.md`](../GRAPH_SPECIFICATION.md) | 1.0.0 | Frozen | Node in knowledge graph |
| `GraphEdge` | [`docs/ARCHITECTURE/GRAPH_SPECIFICATION.md`](../GRAPH_SPECIFICATION.md) | 1.0.0 | Frozen | Edge between nodes |
| `GraphData` | [`docs/ARCHITECTURE/GRAPH_SPECIFICATION.md`](../GRAPH_SPECIFICATION.md) | 1.0.0 | Frozen | Complete graph structure |

**Public APIs:**
- `GET /api/graph/stats` — Graph statistics
- `GET /api/graph/related/:type/:id` — Connected entities
- `GET /api/graph/similar/:type/:id` — Similar entities
- `GET /api/graph/path/:fromType/:fromId/:toType/:toId` — Shortest path

---

## Content OS Contracts (v1.0.0)

| Contract | File | Version | Status | Description |
|----------|------|---------|--------|-------------|
| `ContentManifest` | [`engine/content/contracts/ContentManifest.ts`](../../engine/content/contracts/ContentManifest.ts) | 1.0.0 | Frozen | Single source of truth for every page |
| `EntityResolver` | [`engine/content/contracts/EntityResolver.ts`](../../engine/content/contracts/EntityResolver.ts) | 1.0.0 | Frozen | Maps manifest → canonical entity |
| `GenerationContext` | [`engine/content/contracts/GenerationContext.ts`](../../engine/content/contracts/GenerationContext.ts) | 1.0.0 | Frozen | Immutable snapshot for blueprint |
| `Blueprint` | [`engine/content/contracts/Blueprint.ts`](../../engine/content/contracts/Blueprint.ts) | 1.0.0 | Frozen | Page rendering interface |
| `ValidationRule` | [`engine/content/contracts/Validation.ts`](../../engine/content/contracts/Validation.ts) | 1.0.0 | Frozen | Individual validation unit |
| `ValidationPipeline` | [`engine/content/contracts/Validation.ts`](../../engine/content/contracts/Validation.ts) | 1.0.0 | Frozen | Rule orchestration |
| `EvidenceReference` | [`engine/content/contracts/Evidence.ts`](../../engine/content/contracts/Evidence.ts) | 1.0.0 | Frozen | Source citation marker |
| `EvidenceValidator` | [`engine/content/contracts/Evidence.ts`](../../engine/content/contracts/Evidence.ts) | 1.0.0 | Frozen | Extract/validate evidence |
| `QualityScorer` | [`engine/content/contracts/Quality.ts`](../../engine/content/contracts/Quality.ts) | 1.0.0 | Frozen | Weighted scoring model |
| `Linker` | [`engine/content/contracts/Linker.ts`](../../engine/content/contracts/Linker.ts) | 1.0.0 | Frozen | Internal link injection |

---

## Supporting Specifications

| Document | Path | Version | Contents |
|----------|------|---------|----------|
| Content OS Specification | [`docs/ARCHITECTURE/CONTENT_OS.md`](../CONTENT_OS.md) | 1.0.0 | Full subsystem spec, lifecycle, invariants |
| Graph Specification | [`docs/ARCHITECTURE/GRAPH_SPECIFICATION.md`](../GRAPH_SPECIFICATION.md) | 1.0.0 | Knowledge Graph v1.0.0 |
| API Contracts | [`docs/ARCHITECTURE/API_CONTRACTS.md`](../API_CONTRACTS.md) | 1.0.0 | All HTTP endpoints |
| Versioning Policy | [`docs/ARCHITECTURE/VERSIONING.md`](../VERSIONING.md) | 1.0.0 | SemVer, freeze, deprecation |
| Blueprint Spec | [`docs/ARCHITECTURE/BLUEPRINT_SPEC.md`](../BLUEPRINT_SPEC.md) | 1.0.0 | Blueprint interface details |
| Validation Model | [`docs/ARCHITECTURE/VALIDATION_MODEL.md`](../VALIDATION_MODEL.md) | 1.0.0 | Validation rules & scoring |

---

## Version Status

| Contract | Current Version | Freeze Date | ADR |
|----------|-----------------|-------------|-----|
| Graph API | 1.0.0 | 2026-07-25 | 0001 |
| ContentManifest | 1.0.0-draft → **1.0.0** (pending) | Pending | 0002 |
| EntityResolver | 1.0.0-draft → **1.0.0** (pending) | Pending | 0003 |
| GenerationContext | 1.0.0-draft → **1.0.0** (pending) | Pending | 0004 |
| Blueprint | 1.0.0-draft → **1.0.0** (pending) | Pending | 0005 |
| Validation | 1.0.0-draft → **1.0.0** (pending) | Pending | 0006 |
| Evidence | 1.0.0-draft → **1.0.0** (pending) | Pending | 0007 |
| Quality | 1.0.0-draft → **1.0.0** (pending) | Pending | 0008 |
| Linker | 1.0.0-draft → **1.0.0** (pending) | Pending | 0009 |

**Action:** Upon Scope Freeze approval, bump all `-draft` versions to `1.0.0` and update this index.

---

## Schema Registry

| Schema | Location | Version | Validator |
|--------|----------|---------|-----------|
| ContentManifest | `schemas/content-manifest.json` | 1.0.0 | JSON Schema draft-07 |
| GraphData | `schemas/graph-data.json` (implicit) | 1.0.0 | custom verify-graph.ts |

---

## Verification Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `scripts/verify-graph.ts` | `npm run test:graph` | Validate graph structure, edges, nodes |
| `scripts/verify-manifest.ts` | `npm run test:manifest` | Validate manifest invariants |
| `scripts/verify-ssr.ts` | `npm run test:ssr` | Check SSR hydration |
| `scripts/verify-sitemaps.ts` | `npm run test:sitemap` | Verify sitemap completeness |
| `scripts/verify-production.mjs` | `npm run test:production` | Verify deployed endpoints |

---

## Change Log

| Date | Change | Version | Author |
|------|--------|---------|--------|
| 2026-07-25 | Initial contract index created | 1.0.0-draft | Platform Engineering |
| 2026-07-26 | Add work packages (C1–C9) and baseline metrics | 1.0.0-draft | Platform Engineering |

---

*This index is the authoritative map of all public interfaces. All implementations must comply with the frozen contracts listed above.*
