# ADR 0007: Evidence Layer for Factual Grounding

**Status:** Draft  
**Date:** 2026-07-25  
**Authors:** Content Platform  
**Reviewers:** TBD  
**Phase:** C6 — Evidence Layer

---

## Context

Content on BestAIAgent.in makes factual claims about AI agents:

- "Cursor AI supports real-time collaboration"
- "Pricing starts at $20/month"
- "Rated 4.7/5 stars by users"

These claims need to be **grounded in sources** to maintain credibility and enable fact-checking. Currently, there is no systematic way to track which claim comes from where, nor a mechanism to verify that sources are valid.

We need an evidence layer that:

- Associates each factual claim with a source (graph node or external URL)
- Scores confidence in each claim
- Validates that sources exist and are accessible
- Allows downstream consumers (search engines, users) to inspect provenance

---

## Problem

How do we implement evidence tracking without:

1. **Modifying HTML output** with complex annotations that break rendering?
2. **Adding excessive overhead** to blueprint generation?
3. **Making evidence extraction brittle** (fragile parsing)?
4. **Requiring manual annotation** for every claim (impractical at scale)?
5. **Forcing a single source type** (graph nodes only excludes external reviews)?

---

## Decision

Implement an **Evidence Layer** with three components:

1. **EvidenceValidator** — Extract evidence references from HTML
2. **EvidenceAttachment** — Full content of sources (citations, snippets)
3. **EvidenceReference** — Inline markers in HTML (via data attributes or title attributes)

### Evidence Reference Format

Blueprints embed references in HTML using standard mechanisms:

```html
<!-- Data attribute (preferred for machine reading) -->
<span data-evidence='{"id":"ev:agent:cite:pricing","type":"graph_node","sourceId":"agent/cursor-ai","confidence":1.0}'>
  $20/month
</span>

<!-- Title attribute (visible on hover, also machine readable) -->
<abbr title="Evidence: ev:agent:cite:rating:graph_node:agent/claude-ai:0.9">
  4.7/5 stars
</abbr>
```

These are **non-breaking** to normal rendering; CSS/JS can hide or style them if desired.

### EvidenceValidator

```ts
interface EvidenceValidator {
  extract(html: string): EvidenceReference[];
  validate(references: EvidenceReference[]): EvidenceValidationReport;
  attach(reference: EvidenceReference): EvidenceAttachment | null;
}
```

- `extract()` scans HTML for `data-evidence` JSON or `title="Evidence: ..."` patterns
- `validate()` checks each reference resolves (graph node exists, URL reachable, DOI valid)
- `attach()` fetches full evidence content (graph node data, external article snippet)

### Integration Points

- **Blueprint**: Returns `evidence?: EvidenceAttachment[]` in `BlueprintOutput`
- **Validation Pipeline**: `evidence-coverage` and `evidence-valid` rules
- **Quality Model**: Evidence dimension contributes to overall score

### Invariants

1. Every `EvidenceReference.id` is globally unique (across all published pages)
2. `confidence` ∈ [0.0, 1.0] (enforced by blueprint)
3. `extract()` finds all references that blueprint says it attached (count match)
4. `validate()` does not modify references (pure function)
5. `attach()` may return `null` if source unavailable (not an error, just missing evidence)

---

## Alternatives Considered

### Alternative 1: Comment-based evidence (`<!-- evidence: ... -->`)

<!-- evidence: {"claim":"$20/month","source":"cursor-ai-pricing","confidence":1.0} -->

**Pros:**
- No visual impact
- Easy to strip in production

**Cons:**
- Not visible to end-users (transparency suffers)
- Can break HTML if comment syntax malformed
- Harder to extract (need HTML parser, not regex)
- **Rejected** — data attributes are more robust and accessible

---

### Alternative 2: Client-side only evidence overlay

No inline markers; evidence loaded separately via JavaScript and overlaid on page.

**Pros:**
- Clean HTML
- Dynamic toggling (user turns evidence on/off)

**Cons:**
- Not available to crawlers (SEO impact)
- Requires JavaScript (accessibility issue)
- Breaks SSR model (evidence should be present in initial HTML)
- **Rejected** — evidence must be in initial HTML for SEO and accessibility

---

### Alternative 3: External evidence registry

Manifest includes `evidence: EvidenceReference[]` field; validator cross-references with HTML.

**Pros:**
- Separation of concerns (HTML vs evidence list)
- Easier to update evidence without changing HTML

**Cons:**
- Two sources of truth (must keep HTML and manifest in sync)
- Validation complexity (did HTML actually include these references?)
- **Rejected** — evidence must be attached to the claim in HTML to be verifiable

---

### Alternative 4: Automated claim detection + external lookup

NLP model identifies claims and auto-attaches evidence from graph.

**Pros:**
- Minimal human effort (automated)
- Could improve over time with ML

**Cons:**
- Unreliable (might miss claims or attach wrong evidence)
- Black box (hard to debug)
- Not deterministic (ML introduces randomness)
- Violates contract-first (blueprint should decide what claims to make)
- **Rejected** — evidence attachment is blueprint responsibility; we provide tooling but not automation

---

## Consequences

### Positive

- **Transparent**: Evidence visible to users (via title or tooltip)
- **Machine-readable**: Data attributes easy for validators and crawlers
- **Blueprint-controlled**: Blueprint decides which claims need evidence (not forced on everything)
- **Confidence scoring**: Blueprint assigns confidence per claim (domain knowledge)
- **Validation integration**: EvidenceValidator plugs into validation pipeline
- **Quality contribution**: Evidence coverage affects quality score

### Negative (Trade-offs)

- **HTML bloat**: Additional attributes increase page size (minimal; can be stripped in production build if desired)
- **Blueprint burden**: Blueprint authors must remember to add evidence to claims (could forget)
- **Complexity**: Need to define standard JSON format for data-evidence values (schema needed)

---

## Deferred Work

- **Evidence stylesheet**: CSS to show evidence icons/tooltips (`.has-evidence:hover::after { content: attr(data-evidence-summary); }`)
- **Evidence confidence thresholds**: Configurable per page type (e.g., product pages require ≥0.7, blog posts ≥0.4)
- **Evidence dashboard**: UI to browse all evidence references across site (for audits)
- **External source health checks**: Periodic URL health monitoring (detect dead links)
- **Evidence bundling**: Optional minification/compression of evidence JSON (performance)

---

## Implementation Checklist

- [x] Interface defined in `engine/content/contracts/Evidence.ts`
- [ ] EvidenceReference JSON schema (for data-evidence attribute)
- [ ] EvidenceValidator implementation:
  - [ ] extract(): regex/HTML parser for `data-evidence` and `title="Evidence: ..."`
  - [ ] validate(): graph node existence check, URL fetch HEAD, DOI resolve
  - [ ] attach(): fetch graph node data, fetch external snippet
- [ ] Blueprint integration: blueprint returns `evidence: EvidenceAttachment[]` if generated
- [ ] Validation rules: `evidence-coverage` (calculate % of claims with evidence), `evidence-valid` (call validator.validate)
- [ ] Quality model: evidence dimension weight (20%)
- [ ] Unit tests for validator (extract from sample HTML, validate known references)
- [ ] Integration test: blueprint generates page with evidence, validator passes
- [ ] Documentation: How to add evidence in blueprints (examples)
- [ ] ADR approved and contract frozen at v1.0.0

---

## Related ADRs

- **0005** — Blueprint Engine (evidence in BlueprintOutput)
- **0006** — Validation Pipeline (evidence rules)
- **0008** — Quality Scoring (evidence dimension weight)

---

## Success Criteria

- All factual claims about agents (pricing, ratings, features) in product detail pages have evidence references with confidence ≥0.7
- EvidenceValidator correctly extracts all references from sample HTML (100% extraction rate in tests)
- Validation fails if evidence references exist but validator reports unresolvable sources
- Evidence attachments included in BlueprintOutput are accessible to frontend for display
- Quality score penalizes content with low evidence coverage (<50% of claims)

---

*This ADR must be approved before Evidence Layer implementation is considered complete. The contract will be frozen at v1.0.0 upon sign-off.*
