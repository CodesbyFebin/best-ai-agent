# ADR 0002: Content Manifest as Single Source of Truth

**Status:** Approved  
**Date:** 2026-07-25  
**Authors:** Platform Engineering, Content Platform  
**Reviewers:** TBD  
**Phase:** C1 — Content Manifest

---

## Context

The ATLAS P99 platform needs to generate many pages (product details, categories, comparisons, research) in a deterministic, reproducible way. Historically, page structures emerged organically from component composition, leading to:

- Inconsistent URL patterns
- Duplicate page definitions
- Unclear ownership of page identity
- Difficulties in reproducibility (re-building same page twice)

We need a single source of truth for every page that defines:

- What page exists (catalog)
- Where it lives (URL)
- What entity it represents (graph node)
- How to render it (blueprint)
- Its lifecycle state (draft, published, archived)

---

## Problem

How do we represent **every page** in the system without:

1. Scattering page definitions across multiple files?
2. Hardcoding URLs in components?
3. Losing reproducibility (same inputs → different outputs)?
4. Making it difficult to audit what pages exist?
5. Creating duplicate representations (component state vs URL vs manifest)?

---

## Decision

Adopt a **Content Manifest** — a single, canonical registry where each page has exactly one entry.

### Manifest Structure

```ts
interface ContentManifest {
  id: string;              // "manifest:page:product:cursor-ai"
  slug: string;            // "cursor-ai"
  canonicalUrl: string;    // "https://bestaiagent.in/agents/cursor-ai/"
  entityId: string;        // "agent/cursor-ai"
  entityType: EntityType;  // AGENT
  blueprintId: string;     // "product-detail-v1"
  graphNodeId: string;     // same as entityId
  contentType: ContentType;
  status: ContentStatus;
  language: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  metadata: ManifestMetadata; // SEO, build, quality, editorial
}
```

### Key Properties

1. **One manifest per page** — No page can exist without a manifest entry
2. **Global uniqueness** — `id` and `canonicalUrl` are globally unique
3. **Entity binding** — Every manifest references exactly one canonical graph node
4. **Blueprint selection** — Decoupled rendering logic (swap blueprints without changing manifest)
5. **Immutable after publish** — Manifest fields cannot change once `status = PUBLISHED`; updates create new version
6. **Metadata bundle** — Build provenance, quality scores, editorial state all persisted alongside

### Implementation

Manifests live in a **Manifest Repository** (single source of truth):

- **Source of truth:** `engine/content/manifest.repository.ts` (in-memory registry, later persistent storage)
- **Build-time:** All manifests loaded into memory, validated against invariants
- **Runtime:** Read-only access via `EntityResolver` (after manifest lookup)

### Contract Freeze

The `ContentManifest` interface is declared at **v1.0.0-draft** and will be frozen before any implementation ships. Breaking changes require new MAJOR version and ADR approval.

---

## Alternatives Considered

### Alternative 1: Inline Manifest (component-based)

Each page component defines its own manifest inline (as static data).

**Pros:**
- Co-located with rendering code
- No central registry needed

**Cons:**
- Duplicate entity references (components need entity data separately)
- Hard to audit all pages (must scan entire codebase)
- Difficult to enforce invariants (each component responsible)
- No single source of truth → fragmentation
- **Rejected** — violates single source of truth principle

---

### Alternative 2: Database-Backed Manifest Registry

Store manifests in a database (PostgreSQL) with full CRUD operations.

**Pros:**
- Persistent, queryable
- Easy to update without code deploy

**Cons:**
- Adds database dependency before it's needed
- Over-engineered for initial ~50 pages
- Harder to achieve deterministic builds (DB state can vary)
- Migrations complicate reproducibility
- **Rejected** — premature optimization; file-based registry is simpler initially

---

### Alternative 3: File-Per-Page Manifest

One manifest JSON file per page in `content/manifests/`.

**Pros:**
- Human-editable
- Version-control friendly

**Cons:**
- Many files to manage (scaling to hundreds → filesystem clutter)
- Hard to validate cross-page constraints (unique URLs, IDs)
- Loading overhead (many fs operations)
- **Rejected** — too granular; manifests are small enough to batch in one file

---

### Alternative 4: Embed Manifest in Blueprint

Blueprint returns manifest as part of its output (instead of separate registry).

**Pros:**
- Blueprint owns its page structure completely

**Cons:**
- Blueprint can drift from it's declared manifest
- No way to enumerate all pages without executing every blueprint
- Harder to preview/sitemap generation (need to run blueprints)
- **Rejected** — blueprint should render based on manifest, not define it

---

## Consequences

### Positive

- **Single source of truth**: All pages enumerated in one place
- **Deterministic builds**: Same manifest → same output (given same graph)
- **Auditable**: Easy to list all canonical URLs, check for duplicates
- **Immutable after publish**: Once published, manifest cannot change (creates new version)
- **Decoupled rendering**: Blueprint can be swapped without touching manifest
- **Sitemap generation**: Can iterate manifest registry to produce sitemap.xml
- **URL consistency**: canonicalUrl is authoritative; components generate links from manifest

### Negative (Trade-offs)

- **Central registry risk**: All pages go through one module (potential bottleneck)
- **Additional layer**: Manifest must be written *before* page exists (extra step)
- **Manual curation**: Someone must create and maintain manifest entries (not automatic)
- **Version fragmentation**: When updating a page, old manifest stays PUBLISHED; new manifest is new version (archiving responsibility)

---

## Deferred Work

- **Schema registry**: Store ContentManifest JSON Schema in a versioned location (later)
- **Manifest diff tool**: Visualize changes between versions (PR preview)
- **Bulk import/export**: For migrating from existing page definitions to manifests (one-time)
- **Manifest validation UI**: Web interface to validate manifest file before commit (optional)
- **Archival policy**: Automated archiving of old versions after 90 days (Phase D)

---

## Implementation Checklist

- [x] Interface defined in `engine/content/contracts/ContentManifest.ts`
- [ ] JSON Schema created in `schemas/content-manifest.json`
- [x] Manifest repository interface designed
- [ ] In-memory implementation with validation
- [ ] Invariant checks (unique IDs, URLs, entity references)
- [ ] CLI tool to list all manifests (`npm run manifests:list`)
- [ ] Pre-commit hook to validate manifest changes
- [ ] ADR approved and version frozen at v1.0.0
- [ ] Verification tests (`npm run test:manifest`)

---

## Related ADRs

- **0001** — Knowledge Graph (provides entityId reference)
- **0003** — EntityResolver (uses manifest.entityId → ResolvedEntity)
- **0005** — Validation Pipeline (validates manifest before generation)

---

## Success Criteria

- Every published URL has exactly one manifest entry
- No duplicate canonical URLs accepted
- Manifest registry can enumerate all pages without executing code
- Invariant violations block `npm run build`
- JSON Schema validates all manifests (CI check)

---

*This ADR must be approved before any manifest implementation ships. The ContentManifest contract will be frozen at v1.0.0 upon sign-off.*
