# Content OS Specification

**Version:** 1.0.0  
**Status:** Frozen  
**Owner:** Content Platform  
**Last Updated:** 2026-07-25

> The Content OS is the deterministic system that transforms canonical entities into validated, reproducible content through stable contracts.

---

## Table of Contents

1. [Overview](#overview)
2. [Core Responsibilities](#core-responsibilities)
3. [System Architecture](#system-architecture)
4. [Contract Definitions](#contract-definitions)
5. [Content Lifecycle](#content-lifecycle)
6. [Invariants](#invariants)
7. [Quality Model](#quality-model)
8. [Validation Pipeline](#validation-pipeline)
9. [Evidence Layer](#evidence-layer)
10. [Internal Linking](#internal-linking)
11. [Versioning Policy](#versioning-policy)
12. [Implementation Roadmap](#implementation-roadmap)

---

## Overview

The Content OS provides a **single deterministic pipeline** for generating all pages on BestAIAgent.in. No page may be created outside this pipeline.

### Key Guarantees

- **Deterministic:** Same inputs → same outputs (no randomness)
- **Reproducible:** Any generated page can be rebuilt identically
- **Contract-bound:** Every implementation satisfies a frozen interface
- **Validated:** All content passes quality gates before publication
- **Evidence-backed:** Claims are traceable to sources with confidence scores

---

## Core Responsibilities

The Content OS owns:

| Responsibility | Description | Contract |
|----------------|-------------|---------|
| **Manifest** | Single source of truth for every page | [`ContentManifest`](#contentmanifest) |
| **Resolution** | Map page requests → canonical entity | [`EntityResolver`](#entityresolver) |
| **Context** | Immutable generation context per page | [`GenerationContext`](#generationcontext) |
| **Blueprint** | Page-type-specific rendering logic | [`Blueprint`](#blueprint) |
| **Validation** | Quality and correctness rules | [`ValidationResult`](#validation) |
| **Evidence** | Source tracking and citations | [`Evidence`](#evidence) |
| **Quality** | Scoring and thresholds | [`QualityScore`](#quality) |
| **Linking** | Graph-derived internal links | [`Linker`](#linker) |

---

## System Architecture

```

┌─────────────────────────────────────────────────────────────┐
│                     Content Pipeline                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Request → Route Resolution → Manifest Lookup              │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Entity Resolver                                     │    │
│  │ Input: manifest.entityId, manifest.entityType      │    │
│  │ Output: canonical entity from Knowledge Graph      │    │
│  └────────────────────────────────────────────────────┘    │
│                                 ↓                            │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Generation Context                                 │    │
│  │ Immutable: entity, manifest, graph relations      │    │
│  └────────────────────────────────────────────────────┘    │
│                                 ↓                            │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Blueprint Engine                                   │    │
│  │ Selected by manifest.blueprintId                   │    │
│  │ Output: HTML + metadata + evidence attachments    │    │
│  └────────────────────────────────────────────────────┘    │
│                                 ↓                            │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Validation Pipeline                               │    │
│  │ Schema, SEO, Accessibility, Evidence, Quality    │    │
│  └────────────────────────────────────────────────────┘    │
│                                 ↓                            │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Quality Scoring                                   │    │
│  │ Deterministic score from validated content        │    │
│  └────────────────────────────────────────────────────┘    │
│                                 ↓                            │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Linker                                             │    │
│  │ Inject internal links from Knowledge Graph        │    │
│  └────────────────────────────────────────────────────┘    │
│                                 ↓                            │
│  Published Page (SSR + Hydration)                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

```

---

## Contract Definitions

All contracts reside in `engine/content/contracts/` and contain **interfaces only**.

### ContentManifest

The manifest is the single source of truth for every page.

```ts
enum EntityType {
  AGENT = 'agent',
  CATEGORY = 'category',
  COMPARISON = 'comparison',
  RESEARCH = 'research'
}

enum ContentType {
  PRODUCT_DETAIL = 'product_detail',
  CATEGORY_OVERVIEW = 'category_overview',
  COMPARISON_PAGE = 'comparison_page',
  RESEARCH_ARTICLE = 'research_article',
  LANDING_PAGE = 'landing_page'
}

enum ContentStatus {
  DRAFT = 'draft',
  IN_REVIEW = 'in_review',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

enum EditorialState {
  DRAFTING = 'drafting',
  READY_FOR_REVIEW = 'ready_for_review',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PUBLISHED = 'published'
}

interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

interface BuildMetadata {
  buildId: string;
  generatedAt: string;
  blueprintVersion: string;
  contentVersion: string;
}

interface QualityMetadata {
  score: number;
  passed: boolean;
  lastValidated: string;
  validatorVersion: string;
}

interface EditorialMetadata {
  state: EditorialState;
  reviewer?: string;
  reviewedAt?: string;
  revisionNotes?: string;
}

interface ManifestMetadata {
  seo: SeoMetadata;
  build: BuildMetadata;
  quality: QualityMetadata;
  editorial: EditorialMetadata;
}

interface ContentManifest {
  // Identity
  id: string;                    // Globally unique: "manifest:page:product:slug"
  slug: string;                  // URL-safe identifier: "cursor-ai"
  canonicalUrl: string;          // Full URL: "https://bestaiagent.in/agents/cursor-ai/"

  // Entity association
  entityId: string;              // Graph node ID: "agent/cursor-ai"
  entityType: EntityType;        // Canonical entity type
  blueprintId: string;           // Blueprint to use: "product-detail-v1"

  // Graph integration
  graphNodeId: string;           // Same as entityId (canonical)

  // Lifecycle
  contentType: ContentType;
  status: ContentStatus;
  language: string;              // BCP 47: "en-US"
  version: string;               // Semantic: "1.0.0"

  // Timestamps
  createdAt: string;             // ISO 8601
  updatedAt: string;             // ISO 8601

  // Metadata bundle
  metadata: ManifestMetadata;
}
```

**Invariants:**
1. `id` is globally unique across all manifests
2. `canonicalUrl` matches pattern `https://bestaiagent.in/*` and is unique
3. `entityId` format is `{type}/{slug}` and references an existing graph node
4. `blueprintId` exists in the blueprint registry
5. `manifest.metadata.quality.passed === true` for published pages
6. `metadata.build.generatedAt` is immutable after publication
7. `slug` is URL-safe (alphanumeric, hyphens only)
8. Manifest contents are immutable after `PUBLISHED` status

---

### EntityResolver

Maps manifest references to canonical entities.

```ts
interface EntityResolver {
  // Resolve entity by type and ID from manifest
  resolve(entityType: EntityType, entityId: string): ResolvedEntity | null;

  // Batch resolve for multiple references
  resolveBatch(requests: Array<{ entityType: EntityType; entityId: string }>): Map<string, ResolvedEntity>;

  // Validate that an entity reference is resolvable
  canResolve(entityType: EntityType, entityId: string): boolean;
}

interface ResolvedEntity {
  // Graph node data
  id: string;                    // Graph node ID
  type: EntityType;
  data: Record<string, unknown>; // Full entity data from graph

  // Related graph context
  relationships: Array<{
    type: string;                // Edge type: BELONGS_TO, TOP_AGENT, etc.
    targetId: string;            // Target node ID
    targetType: EntityType;
    properties: Record<string, unknown>;
  }>;

  // Provenance
  sourceGraphVersion: string;
  resolvedAt: string;
}
```

**Invariants:**
1. `resolve()` returns `null` only if entity does not exist in graph
2. `resolve()` is idempotent (same input → same output)
3. `resolveBatch()` returns results in same order as requests
4. `canResolve()` and `resolve()` are consistent
5. All `ResolvedEntity.data` comes from the Knowledge Graph only
6. `relationships` only include edges where target nodes exist

---

### GenerationContext

Immutable context passed to blueprints during generation.

```ts
interface GenerationContext {
  // Page identity
  manifest: ContentManifest;
  entity: ResolvedEntity;

  // Graph context
  graphSnapshot: {
    nodes: Array<{ id: string; type: string; data: Record<string, unknown> }>;
    edges: Array<{ from: string; to: string; type: string }>;
  };

  // Render hints
  locale: string;
  mode: 'ssr' | 'static' | 'preview';

  // Build metadata
  buildId: string;
  buildTimestamp: string;

  // Features
  features: {
    includeEvidence: boolean;
    includeQualityScore: boolean;
    internalLinkingDepth: number;
  };
}
```

**Invariants:**
1. Context is deeply immutable after creation
2. `manifest.entityId === entity.id`
3. `graphSnapshot` includes all nodes reachable within `internalLinkingDepth` from `entity.id`
4. `buildTimestamp` is set once and never changes during build
5. All timestamps are ISO 8601 strings

---

### Blueprint

Blueprint interface for page rendering.

```ts
interface Blueprint {
  // Unique identifier from manifest
  readonly id: string;

  // Supported content types
  readonly contentType: ContentType[];

  // Generate page HTML and metadata
  generate(ctx: GenerationContext): BlueprintOutput;

  // Validate that the manifest is suitable for this blueprint
  validate(manifest: ContentManifest): BlueprintValidation;

  // Optional: canGenerate returns false if prerequisites missing
  canGenerate?(ctx: GenerationContext): boolean;
}

interface BlueprintOutput {
  html: string;
  metadata: {
    title: string;
    description: string;
    ogImage?: string;
    canonical?: string;
  };
  evidence?: EvidenceAttachment[];
  linkedResources: Array<{
    type: 'script' | 'stylesheet' | 'image';
    url: string;
    integrity?: string;
  }>;
}

interface BlueprintValidation {
  valid: boolean;
  errors: string[];
  warnings: string[];
  requiredManifestFields?: string[];
}
```

**Invariants:**
1. `generate()` is deterministic: same `ctx` → identical `BlueprintOutput`
2. `BlueprintOutput.html` is valid HTML5 (validated separately)
3. `BlueprintValidation.requiredManifestFields` subset of manifest keys
4. Blueprint reads no external state beyond `ctx`

---

### Validation

Validation pipeline interfaces.

```ts
enum ValidationRuleType {
  SCHEMA = 'schema',
  SEO = 'seo',
  ACCESSIBILITY = 'accessibility',
  EVIDENCE = 'evidence',
  QUALITY = 'quality',
  LINKING = 'linking'
}

interface ValidationRule {
  readonly id: string;
  readonly type: ValidationRuleType;
  readonly severity: 'error' | 'warning' | 'info';
  description: string;

  // Execute validation
  run(input: ValidationInput): ValidationResult;
}

interface ValidationInput {
  html: string;
  manifest: ContentManifest;
  context?: GenerationContext;
  resources?: BlueprintOutput['linkedResources'];
}

interface ValidationResult {
  ruleId: string;
  passed: boolean;
  message: string;
  location?: string; // CSS selector or line number
  suggestions?: string[];
  evidence?: EvidenceReference[];
}

interface ValidationPipeline {
  // All registered rules
  readonly rules: ValidationRule[];

  // Run full validation suite
  validate(input: ValidationInput): ValidationReport;

  // Quick check: does this input pass minimum quality threshold?
  isAcceptable(input: ValidationInput, minScore: number): boolean;
}

interface ValidationReport {
  passed: boolean;
  score: number; // 0-100 weighted score
  timestamp: string;
  results: ValidationResult[];
  summary: {
    errors: number;
    warnings: number;
    infos: number;
  };
}
```

**Invariants:**
1. Validation does not modify input content
2. `ValidationReport.passed === (score >= threshold)`
3. All `ValidationResult.ruleId` maps to registered `ValidationRule.id`
4. `validate()` includes results from all rules with `enabled: true`

---

### Evidence

Evidence tracking for claims in generated content.

```ts
interface EvidenceReference {
  id: string;                    // Unique ref: "ev:agent:cite:123"
  type: 'graph_node' | 'external_source' | 'research_paper';
  sourceId: string;              // Graph node ID or external URL
  claimSegment: string;          // Text segment this evidence supports
  confidence: number;            // 0.0 to 1.0
  justification?: string;        // Why this evidence is relevant
}

interface EvidenceAttachment {
  reference: EvidenceReference;
  content: string;               // Extracted snippet or citation
  sourceUrl?: string;            // For external sources
  accessedAt: string;             // ISO 8601
}

interface EvidenceValidator {
  // Extract evidence references from HTML
  extract(html: string): EvidenceReference[];

  // Validate all references point to valid sources
  validate(references: EvidenceReference[]): EvidenceValidationReport;

  // Attach full evidence content for a reference
  attach(reference: EvidenceReference): EvidenceAttachment | null;
}

interface EvidenceValidationReport {
  valid: boolean;
  unresolvable: Array<{ ref: EvidenceReference; reason: string }>;
  lowConfidence: EvidenceReference[];
  orphaned: EvidenceReference[]; // No claim found
}
```

**Invariants:**
1. Every `EvidenceReference.id` is globally unique
2. `confidence` ∈ [0.0, 1.0]
3. `EvidenceValidator.extract()` returns all references present in HTML
4. `attach()` returns `null` only if source unavailable (not error)
5. Evidence references are immutable after publication

---

### Quality

Quality scoring model.

```ts
interface QualityWeights {
  schema: number;           // HTML validity (0-1)
  seo: number;              // SEO best practices (0-1)
  accessibility: number;    // Accessibility compliance (0-1)
  evidence: number;         // Evidence coverage (0-1)
  readability: number;      // Readability score (0-1)
  linking: number;          // Internal linking density (0-1)
}

interface QualityScore {
  overall: number;          // Weighted sum (0-100)
  components: {
    schema: number;
    seo: number;
    accessibility: number;
    evidence: number;
    readability: number;
    linking: number;
  };
  passed: boolean;          // overall ≥ threshold
  threshold: number;        // Required minimum (default 75)
  timestamp: string;
  validatorVersion: string;
}

interface QualityScorer {
  readonly weights: QualityWeights;

  // Compute quality score from validation results
  score(report: ValidationReport): QualityScore;

  // Check if content meets minimum quality threshold
  isAcceptable(report: ValidationReport, threshold?: number): boolean;
}
```

**Invariants:**
1. `overall = Σ(dimensionScore × weight)` normalized to 0-100
2. Σ(weights) = 1.0 (normalized)
3. `passed === (overall ≥ threshold)`
4. `score()` is deterministic: same report → same score
5. All component scores ∈ [0, 100]

---

### Linker

Internal link injection engine.

```ts
interface LinkOpportunity {
  targetNodeId: string;
  targetSlug: string;
  anchorText: string;
  context: string;           // Surrounding text snippet
  relevance: number;         // 0.0 to 1.0
}

interface LinkRule {
  id: string;
  name: string;
  priority: number;          // Higher = applied first
  maxLinksPerPage: number;
  nodeTypes: string[];       // Target node types to link to
  minRelevance: number;      // 0.0 to 1.0

  findOpportunities(ctx: GenerationContext): LinkOpportunity[];
}

interface Linker {
  // All link rules
  readonly rules: LinkRule[];

  // Generate internal links for a page
  generateLinks(ctx: GenerationContext, maxLinks?: number): Array<{
    opportunity: LinkOpportunity;
    html: string;            // <a href="/path">text</a>
  }>;

  // Validate that all generated links point to existing published pages
  validateLinks(links: Array<{ targetNodeId: string }>): ValidationReport;
}
```

**Invariants:**
1. `generateLinks()` returns at most `maxLinks` total across all rules
2. All returned links have `relevance ≥` their rule's `minRelevance`
3. `validateLinks()` ensures every `targetNodeId` corresponds to a `PUBLISHED` manifest
4. Link generation does not modify `ctx`

---

## Content Lifecycle

```

┌─────────────┐
│ Manifest    │ Created: Content strategist defines page structure
│ Created     │ in manifest registry
└──────┬──────┘
       ↓
┌─────────────┐
│ Entity      │ Resolver fetches canonical entity from Knowledge
│ Resolved    │ Graph and validates entityId → graphNodeId mapping
└──────┬──────┘
       ↓
┌─────────────┐
│ Context     │ GenerationContext assembled with entity data,
│ Generated   │ graph snapshot, and build metadata
└──────┬──────┘
       ↓
┌─────────────┐
│ Blueprint   │ Selected by manifest.blueprintId, called with
│ Executed    │ immutable context, produces HTML + metadata
└──────┬──────┘
       ↓
┌─────────────┐
│ Draft       │ Raw output before validation
│ Generated   │
└──────┬──────┘
       ↓
┌─────────────┐
│ Validated   │ ValidationPipeline runs all rules; if any
│             │ ERROR → fail back to Draft
└──────┬──────┘
       ↓
┌─────────────┐
│ Quality     │ QualityScorer computes overall score; if
│ Scored      │ < threshold → back to Draft
└──────┬──────┘
       ↓
┌─────────────┐
│ Reviewed    │ Human editorial review (optional but required
│             │ for high-value pages)
└──────┬──────┘
       ↓
┌─────────────┐
│ Published   │ Final SSR render with hydration; sitemap
│             │ entry created; cache warmed
└─────────────┘

```

### Lifecycle Invariants

Each stage defines:

- **Inputs:** What must exist before stage begins
- **Outputs:** What is produced (immutable artifact)
- **Preconditions:** Checks before entering stage
- **Postconditions:** Guarantees after stage completes
- **Failure Modes:** How stage can fail and recovery path

The **manifest** persists through all stages, accumulating metadata at each transition.

---

## Invariants

The Content OS enforces these **immutable rules**:

### System Invariants

1. **One Manifest Per Page**: Every published URL has exactly one manifest entry; no page exists outside the manifest registry.
2. **Contract Compliance**: Every implementation satisfies its declared interface; no implementation defines the contract.
3. **Deterministic Generation**: Given identical `GenerationContext`, every blueprint produces byte-identical output.
4. **Immutability After Publish**: Once `status = PUBLISHED`, manifest fields (except `build` metadata) cannot be altered; content changes require new version.
5. **Single Source of Truth**: Entity data comes only from Knowledge Graph; editorial overrides are stored as metadata, not duplicate data.
6. **Validation Independence**: Validation rules do not modify content; they only produce pass/fail/suggestions.
7. **Evidence Traceability**: Every factual claim in generated content must have an `EvidenceReference` attached (may be confidence=0.0 if unsupported).
8. **Graph Consistency**: All internal links point to published manifests; linker validates targets exist before injection.

### Manifest Invariants

1. **Unique IDs**: `manifest.id` is globally unique using format `manifest:page:{contentType}:{slug}`.
2. **Canonical URL Uniqueness**: No two manifests share the same `canonicalUrl`.
3. **Entity Reference Validity**: `entityId` must resolve to an existing graph node; validation fails otherwise.
4. **Blueprint Existence**: `blueprintId` must be registered in blueprint catalog; validation fails otherwise.
5. **Version Immutability**: `manifest.version` cannot change after `PUBLISHED`; updates increment version and create new manifest.
6. **Timestamp Authority**: `createdAt` is set at creation; `updatedAt` reflects last transition; build-only fields (`generatedAt`) set by CI.
7. **Status Transitions Only**: Status moves forward: `DRAFT → IN_REVIEW → PUBLISHED` or `DRAFT → ARCHIVED`; no backward transitions.

### Quality Invariants

1. **Score Determinism**: `QualityScorer.score()` produces identical output for identical `ValidationReport`.
2. **Threshold Enforcement**: `manifest.status = PUBLISHED` implies `manifest.metadata.quality.passed === true`.
3. **Schema Validity**: All published HTML passes W3C validator (no errors).
4. **Evidence Completeness**: Configuration may require % of claims with `confidence ≥ 0.7`; validation enforces.

---

## Quality Model

Content quality is measured across six weighted dimensions:

| Dimension | Weight | Description | Validation Rule |
|-----------|--------|-------------|-----------------|
| **Schema** | 20% | HTML5 validity | `schema-validation` |
| **SEO** | 25% | Meta tags, headings, structure | `seo-compliance` |
| **Accessibility** | 15% | WCAG 2.1 AA compliance | `a11y-validation` |
| **Evidence** | 20% | Claim-source traceability | `evidence-coverage` |
| **Readability** | 10% | Sentence length, jargon | `readability-score` |
| **Linking** | 10% | Internal link density and relevance | `linking-quality` |

**Overall Score:** `Σ(dimensionScore × weight)` → 0-100

**Acceptance Threshold:** 75 (configurable per manifest via `metadata.quality.threshold`)

---

## Validation Pipeline

Validation runs as a sequence of independent rules. Rules may depend on earlier rule results but must not modify content.

### Built-in Rules

| Rule ID | Type | Description | Error? |
|---------|------|-------------|--------|
| `schema-html5` | SCHEMA | Valid HTML5 structure | Yes |
| `schema-manifest` | SCHEMA | Manifest fields present and typed | Yes |
| `seo-meta` | SEO | Title, description, OG tags present | Yes |
| `seo-headings` | SEO | Single H1, proper hierarchy | Warning |
| `a11y-alt-text` | ACCESSIBILITY | Images have alt attributes | Yes |
| `a11y-arias` | ACCESSIBILITY | No ARIA misuse | Warning |
| `evidence-coverage` | EVIDENCE | % claims with evidence refs | Yes |
| `evidence-valid` | EVIDENCE | All evidence sources resolvable | Yes |
| `linking-internal` | LINKING | Internal links point to published pages | Yes |
| `quality-score` | QUALITY | Overall ≥ threshold | Yes |

### Custom Rules

Projects may register additional rules via `ValidationPipeline.rules.push(customRule)`. Custom rules must implement the `ValidationRule` interface.

**Rule execution order:** Schema → SEO/A11y → Evidence → Linking → Quality (final aggregator).

---

## Evidence Layer

Evidence is the mechanism for **factual grounding**. Every claim about an agent (capabilities, pricing, ratings) must link to a source.

### Evidence Types

1. **Graph Node**: Internal knowledge graph entity (e.g., `agent/cursor-ai` for Cursor's pricing)
2. **External Source**: Third-party article, review, or documentation (URL)
3. **Research Paper**: Academic citation (DOI or arXiv)

### Evidence Attachment

When blueprints generate HTML, they should annotate claims:

```html
<p>
  Cursor AI supports <abbr title="Evidence: ev:agent:cite:pricing">real-time
  collaboration</abbr> starting at $20/month.
</p>
```

Or via data attributes:

```html
<span data-evidence="ev:agent:cite:rating">
  4.7/5 stars
</span>
```

The `EvidenceValidator.extract()` scans HTML for these markers and builds `EvidenceReference[]` for the validation report.

### Confidence Scoring

- `1.0`: Direct graph node with verified data
- `0.7–0.9`: External source with high credibility
- `0.4–0.6`: Inferred from context, not explicitly stated
- `0.0`: No evidence (validation fails if threshold requires evidence)

---

## Internal Linking

Internal links are injected by the `Linker` based on graph relationships, not manual anchor text.

### Link Sources

- BELONGS_TO: Agent → Category pages
- TOP_AGENT: Category → Top agents in category
- COMPARED_WITH: Agent → Compared agents (bidirectional)
- CITED_BY: Research → Agents cited
- SIMILAR_TO: Agent → Similar agents (from RelatedAgents widget)

### Linking Rules

Each rule can define:

- **Target node types**: Only link to `agent` or `category` as appropriate
- **Minimum relevance**: Graph proximity or similarity score threshold
- **Maximum per page**: Prevent over-linking
- **Priority**: Resolve conflicts (same target from multiple rules)

### Validation

The linker validates that every `targetNodeId` resolves to a `PUBLISHED` manifest before emitting the link. This prevents broken internal links.

---

## Versioning Policy

See [VERSIONING.md](VERSIONING.md) for complete policy.

**Summary:**

- **Contracts** follow Semantic Versioning (MAJOR.MINOR.PATCH)
- **v1.0.0** is the frozen API for all Phase C subsystems
- **Breaking changes** require new MAJOR version and ADR approval
- **Backward compatibility** is guaranteed within same MAJOR version
- **Deprecations** are announced in ADRs and remain functional for one MAJOR version cycle

---

## Implementation Roadmap

### C1 — Content Manifest (Current)
- [x] Contract defined (this document)
- [ ] JSON schema created
- [ ] Repository implementation (`manifest.repository.ts`)
- [ ] Invariants documented
- [ ] ADR 0002 created
- [ ] Verification suite (`npm run test:manifest`)
- [ ] Documentation complete

### C2 — Entity Resolver
- [ ] Contract defined
- [ ] Implementation (`resolver.ts`)
- [ ] Graph integration
- [ ] Batch resolution API
- [ ] Verification suite
- [ ] ADR 0003

### C3 — Generation Context
- [ ] Contract defined
- [ ] Context builder (`context.factory.ts`)
- [ ] Graph snapshot extraction
- [ ] Immutability enforcement
- [ ] Verification suite
- [ ] ADR 0004

### C4 — Blueprint Engine
- [ ] Contract defined
- [ ] Blueprint registry
- [ ] Product detail blueprint v1
- [ ] Category overview blueprint v1
- [ ] Selection logic
- [ ] Verification suite
- [ ] ADR 0005

### C5 — Validation Pipeline
- [ ] Contract defined
- [ ] Rule engine implementation
- [ ] Built-in rules (schema, SEO, a11y, evidence, linking)
- [ ] Validator CLI
- [ ] Verification suite
- [ ] ADR 0006

### C6 — Evidence Layer
- [ ] Contract defined
- [ ] Evidence extractor
- [ ] Evidence validator
- [ ] Attachment service
- [ ] Verification suite
- [ ] ADR 0007

### C7 — Quality Scoring
- [ ] Contract defined
- [ ] Weighted scoring engine
- [ ] Threshold enforcement
- [ ] Quality dashboard
- [ ] Verification suite
- [ ] ADR 0008

### C8 — Internal Linking
- [ ] Contract defined
- [ ] Link rule engine
- [ ] Graph-based link generation
- [ ] Broken link prevention
- [ ] Verification suite
- [ ] ADR 0009

### C9 — Integration & System Tests
- [ ] End-to-end pipeline test (manifest → published page)
- [ ] Contract compliance tests
- [ ] Performance benchmarks
- [ ] CI integration
- [ ] Integration documentation

---

## Next Steps

1. Freeze this specification at **v1.0.0** after team review
2. Implement JSON schema for `ContentManifest`
3. Build `manifest.repository.ts` as single source of truth
4. Write verification tests enforcing invariants
5. Create ADR 0002 documenting Content Manifest design decisions

---

*This document is the authoritative specification for the Content OS subsystem. All implementations must comply with the contracts defined herein.*
