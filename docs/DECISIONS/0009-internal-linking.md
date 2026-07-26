# ADR 0009: Graph-Driven Internal Link Engine

**Status:** Draft  
**Date:** 2026-07-25  
**Authors:** Content Platform  
**Reviewers:** TBD  
**Phase:** C8 — Internal Linking

---

## Context

Internal links are crucial for SEO and user navigation. Manually adding `<a>` tags to every page is:

- Error-prone (broken links, outdated URLs)
- Inconsistent (some pages over-link, others under-link)
- Hard to maintain (when URL changes, must update all manual links)

We need an **automated link injection system** that:

- Uses the Knowledge Graph to find relevant pages
- Injects links at appropriate points in content
- Validates that linked pages are published
- Respects caps (max links per page) to avoid spam
- Is deterministic (same content → same links)

---

## Problem

How do we design an internal link engine that:

1. **Graph-aware** — Uses BELONGS_TO, SIMILAR_TO, COMPARED_WITH relationships
2. **Contextual** — Links inserted near relevant keywords (not just footer)
3. **Configurable** — Different page types may have different linking strategies
4. **Non-breaking** — Never links to unpublished or deleted pages
5. **Deterministic** — Same page → same links (unless graph changes)
6. **Testable** — Can verify link generation without full pipeline

---

## Decision

Implement a **Linker** service with:

- **Link rules** — Strategies for finding link opportunities (one per relationship type)
- **Opportunity detection** — Find locations in content where a link would be relevant
- **Candidate scoring** — Rank opportunities by relevance
- **Validation** — Ensure all target pages are PUBLISHED before emitting links
- **Injection** — Replace anchor text with `<a>` tags

### Linker Interface

```ts
interface Linker {
  readonly rules: LinkRule[]; // ordered by priority

  generateLinks(ctx: GenerationContext, maxLinks?: number): GeneratedLink[];
  validateLinks(links: Array<{ targetNodeId: string }>): ValidationReport;
}
```

### Link Rule Contract

```ts
interface LinkRule {
  id: string;
  name: string;
  priority: number;          // higher = applied first in conflict resolution
  maxLinksPerPage: number;  // rule-specific cap
  nodeTypes: string[];      // allowed target node types (["agent","category"])
  minRelevance: number;     // threshold 0.0–1.0

  findOpportunities(ctx: GenerationContext): LinkOpportunity[];
}
```

### Execution Flow

```text
GenerationContext (includes entity, graphSnapshot, content)
    ↓
For each rule (priority descending):
    opportunities = rule.findOpportunities(ctx)
    filter: relevance ≥ rule.minRelevance
    sort by relevance descending
    take up to rule.maxLinksPerPage
    deduplicate targets
    ↓
All opportunities merged (dedup by targetNodeId)
Sort all by relevance (or rule priority)
Take top maxLinks (overall cap)
Validate each targetNodeId resolves to PUBLISHED manifest
Return GeneratedLink[] (with html ready to inject)
```

### Injection Strategy

Blueprint receives `GeneratedLink[]` from Linker and injects into HTML:

```ts
// Blueprint generates raw HTML with placeholder markers or token replacement
let html = "<p>Consider using <TOKEN:CursorAI /> for coding tasks.</p>";

// Linker provides replacements
html = html.replace(/<TOKEN:(\w+) \/>/g, (match, token) => {
  const link = generatedLinks.find(l => l.opportunity.targetSlug === token.toLowerCase());
  return link ? link.html : match;
});
```

Alternatively, blueprint can call Linker API directly with text and get back linked HTML (more complex).

---

## Alternatives Considered

### Alternative 1: Static sitemap-based linking

Every page includes a static list of internal links (hardcoded or from config).

**Pros:**
- Simple
- Full editorial control

**Cons:**
- Manual maintenance (broken links when URLs change)
- No contextual relevance (links generic, not near keywords)
- Not scalable beyond a few links per page
- **Rejected** — we need automated, context-aware linking

---

### Alternative 2: Keyword matching without graph

Scan content for agent names (from a list) and link to their pages.

**Pros:**
- Easy to implement
- Doesn't require graph

**Cons:**
- Links only to exact name matches (misses synonyms)
- No relationship awareness (cannot link categories, comparisons)
- No relevance scoring (links wherever name appears, even if not meaningful)
- Hard to handle duplicates (multiple agents with similar names)
- **Rejected** — graph is single source of truth for relationships

---

### Alternative 3: Client-side link injection (JavaScript)

Page loads, JS scans text and adds links dynamically.

**Pros:**
- No build-time complexity
- Can update links without rebuild

**Cons:**
- SEO: crawlers may not execute JS (link not discovered)
- Accessibility: SR may not announce dynamic links properly
- Flash of unlinked content (FOUC)
- Breaks SSR model (links should be present in initial HTML)
- **Rejected** — linking must be SSR for SEO and accessibility

---

### Alternative 4: Separate link service (microservice)

HTTP service that takes content HTML and returns HTML with injected links.

**Pros:**
- Language-agnostic (could serve non-TS consumers)
- Independent scaling

**Cons:**
- Network latency adds to build time
- Complex to deploy and monitor
- Overkill for current scale (linking is CPU-light)
- **Rejected** — can be extracted later if needed; keep it in-process for now

---

## Consequences

### Positive

- **SEO-friendly**: Internal links help crawlers discover pages
- **Graph-consistent**: Links reflect actual graph relationships (BELONGS_TO, SIMILAR_TO)
- **Deterministic**: Same content → same links (given same graph and rules)
- **Configurable**: Rules can be adjusted (change priorities, minRelevance) without blueprint changes
- **Validated**: `validateLinks()` ensures no broken links before publication
- **Quality boost**: Linking dimension contributes to quality score

### Negative (Trade-offs)

- **Contextual relevance hard**: Rule must detect appropriate anchor text location; might miss or misplace links
- **Over-linking risk**: Without caps, could produce many links (spam penalty risk)
- **Graph dependency**: Link quality depends on graph completeness (missing relationships → fewer links)
- **Blueprint coupling**: Blueprint must provide content in parseable form (plain text with tokens or slice markers)

---

## Deferred Work

- **Link position optimization**: Place links not just anywhere but near relevant concepts (NLP topic detection)
- **No-follow handling**: Allow some links to have `rel="nofollow"` (e.g., lower-confidence)
- **Link diversity**: Avoid linking to same target repeatedly on page (once per page rule)
- **Link decay**: Old links may become stale; re-run linker periodically (weekly)
- **A/B testing**: Try different link strategies and measure engagement
- **Link analytics**: Track click-through rates to improve relevance scoring (ML future)

---

## Implementation Checklist

- [x] Interface defined in `engine/content/contracts/Linker.ts`
- [ ] LinkRule implementations:
  - [ ] `BelongsToRule`: links from entity to its category
  - [ ] `TopAgentRule`: links from category to top agents in that category
  - [ ] `SimilarToRule`: links to similar agents (from graph SIMILAR_TO edges)
  - [ ] `ComparedWithRule`: links to agents frequently compared with this one
- [ ] Linker engine: `generateLinks()` merges rule results, dedups, validates
- [ ] Validation rule: `linking-internal` calls `linker.validateLinks()`
- [ ] Quality dimension: linking score = `(validLinks / totalLinks) × (diversityBonus)`
- [ ] Integration: Linker called in generation pipeline after blueprint produces HTML (or blueprint calls Linker)
- [ ] Unit tests: each rule with mock context produces expected opportunities
- [ ] Integration test: full pipeline generates page with links, validation passes
- [ ] Documentation: how to add new link rule
- [ ] ADR approved and contract frozen at v1.0.0

---

## Related ADRs

- **0004** — GenerationContext (provides graphSnapshot for rules)
- **0006** — Validation Pipeline (linking validation rule)
- **0008** — Quality Scoring (linking dimension)

---

## Success Criteria

- Every product detail page includes at least 3 internal links (category + similar agents + top agents)
- All internal links point to published manifests (validation passes)
- Linker produces deterministic output for identical input (same graph snapshot)
- Adding a new LinkRule does not modify existing rule behavior (no side effects)
- Quality score for linking dimension ≥80 for all pages (link density and validity)

---

*This ADR must be approved before Internal Linking Engine implementation is considered complete. The contract will be frozen at v1.0.0 upon sign-off.*
