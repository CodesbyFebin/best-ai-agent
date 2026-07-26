# ADR 0008: Weighted Quality Scoring Model

**Status:** Draft  
**Date:** 2026-07-25  
**Authors:** Quality Engineering  
**Reviewers:** TBD  
**Phase:** C7 — Quality Scoring

---

## Context

Not all validation issues are equally important. A missing `alt` attribute on an image (accessibility) might be more severe than missing `og:image` (SEO), but both are errors. We need a **single quality score** that aggregates multiple dimensions into a 0–100 number for easy thresholding (publish/no-publish decision).

We also need to balance competing concerns:

- Too lenient → low-quality pages slip through
- Too strict → content team blocked from publishing

A scoring model allows fine-tuning: adjust weights, set threshold, and re-score without changing rules.

---

## Problem

How do we design a quality scoring system that:

1. **Aggregates multiple dimensions** (schema, SEO, a11y, evidence, linking) into one number
2. **Is configurable** — weights can be adjusted as priorities change
3. **Deterministic** — same validation results → same score (no randomness)
4. **Transparent** — Content team understands why score is what it is
5. **Thresholdable** — Simple comparison against minimum (e.g., ≥75)
6. **Permissible to exceed** — Score >100 possible? Should be capped at 100

---

## Decision

Implement a **Weighted Quality Scorer** that computes:

```
overall = Σ(dimensionScore × weight) × 100
```

### Dimensions and Default Weights

| Dimension | Weight | Source |
|-----------|--------|--------|
| Schema | 20% | Validation results: % of schema rules passed |
| SEO | 25% | SEO rule results (meta tags, heading structure) |
| Accessibility | 15% | A11y rule results (alt text, ARIA) |
| Evidence | 20% | % of claims with evidence, evidence validity |
| Readability | 10% | Readability formulas (Flesch–Kincaid) |
| Linking | 10% | Internal link density, broken link count |

**Total:** 100% (Σ=1.0)

### Dimension Score Calculation

Each dimension produces a **0–1** score (fraction of maximum). Examples:

- **Schema**: `(totalSchemaChecks - criticalErrors) / totalSchemaChecks`
- **SEO**: Weighted sum of SEO rule passes (meta tags count more than headings?)
- **Accessibility**: `(a11yPassed / totalA11yChecks) × 0.8 + (warningPenalty) × 0.2`
- **Evidence**: `(claimsWithEvidence / totalClaims) × (validSources / claimsWithEvidence)` — coverage × validity
- **Readability**: Normalized readability score (target grade level ≈ 12)
- **Linking**: `(validInternalLinks / totalInternalLinks) × linkDensityScore`

Exact formulas are implementation details, but must be **deterministic** and **documented**.

### QualityScorer Interface

```ts
interface QualityScorer {
  readonly weights: QualityWeights; // Sums to 1.0

  score(report: ValidationReport): QualityScore;
  isAcceptable(report: ValidationReport, threshold?: number): boolean;
}
```

### Invariants

1. `overall ∈ [0, 100]` (clamped if necessary)
2. Σ(weights) = 1.0 (enforced on construction, auto-normalize if needed)
3. `passed === (overall ≥ threshold)`
4. `score()` is deterministic: same `ValidationReport` → identical `QualityScore`
5. All component scores ∈ [0, 100]

---

## Alternatives Considered

### Alternative 1: Pass/fail only (no score)

Just return `true/false` based on whether any ERROR rule failed.

**Pros:**
- Simple
- No configuration needed

**Cons:**
- No nuance (one critical error = same as 10 minor warnings)
- Cannot distinguish high-quality from barely-passing
- No incentive to improve beyond threshold
- Cannot use score for ranking (search ranking could benefit)
- **Rejected** — too binary; scoring provides useful gradient

---

### Alternative 2: Machine learning model

Train model on human-rated content to predict quality score.

**Pros:**
- Could capture subtle quality signals
- Adapts over time with more training data

**Cons:**
- Black box (hard to explain why score is X)
- Non-deterministic (depends on training data version, random seed)
- Requires labeled training data (expensive)
- Adds ML infrastructure complexity
- **Rejected** — we need deterministic, explainable scores; ML is overkill initially

---

### Alternative 3: Simple weighted checklist

Sum of weights for passed checks only, no dimension normalization.

**Pros:**
- Very simple to implement
- Easy to understand

**Cons:**
- Different dimensions have different numbers of checks (schema might have 20 rules, a11y only 5)
- Would bias toward dimensions with more rules (inflated weight)
- Cannot normalize across dimensions fairly
- **Rejected** — we need per-dimension normalization before weighting

---

### Alternative 4: User satisfaction proxy (CTR, dwell time)

Use engagement metrics as quality proxy.

**Pros:**
- Real user feedback
- Reflects actual content value

**Cons:**
- Needs live traffic (not available for new pages)
- Noisy (affected by many factors beyond content quality)
- Cannot be computed at build time (needs post-hoc analysis)
- Latency (would have to wait days to publish)
- **Rejected** — quality must be determinable at build time; engagement metrics are separate signal

---

## Consequences

### Positive

- **Single number**: Easy to compare, threshold, track over time
- **Configurable**: Adjust weights without changing code (if loaded from config)
- **Explainable**: Component scores show where weaknesses are (debugging)
- **Deterministic**: Same inputs → same score (important for build reproducibility)
- **Extensible**: New dimension = add to weights and compute its score; overall formula unchanged

### Negative (Trade-offs)

- **Weight tuning required**: Initial weights are guesses; will need refinement based on outcomes
- **Dimensionality loss**: Aggregation loses nuance (could have high schema but low evidence; still one number)
- **Edge cases**: What if dimension has no applicable checks? (Should default to 1.0 or NA?)
- **Subjectivity**: Weight choices reflect editorial judgment (should be transparent)

---

## Deferred Work

- **Weight tuning dashboard**: Visualize score breakdown across published pages; adjust weights to correlate with editorial feedback
- **Per-contentType weights**: Different page types could have different weight profiles (e.g., research articles weight evidence higher than product pages)
- **Time decay**: Freshness could slightly boost score (new content gets +5 initially)
- **Manual override**: Editorial team could add +N points for exceptional content (explicit judgment override)
- **Quality distribution**: Track histogram of scores across site (aim for normal distribution centered above threshold)

---

## Implementation Checklist

- [x] Interface defined in `engine/content/contracts/Quality.ts`
- [ ] QualityWeights default (schema:0.2, seo:0.25, a11y:0.15, evidence:0.2, readability:0.1, linking:0.1)
- [ ] QualityScorer implementation:
  - [ ] Helper to extract dimension scores from ValidationReport
  - [ ] Normalization (ensure weights sum to 1.0)
  - [ ] Overall calculation formula
  - [ ] Clamp to 0–100
- [ ] Readability dimension: integrate readability library (Flesch–Kincaid)
- [ ] Integration with ValidationPipeline: after rules run, compute score
- [ ] Pass/fail threshold (default 75) stored in manifest (configurable per page)
- [ ] Unit tests: score with known report yields expected numbers (weight tweaking tests)
- [ ] CLI: `npm run quality:score <report.json>` prints score breakdown
- [ ] Documentation: explain weights and how to tune them
- [ ] ADR approved and contract frozen at v1.0.0

---

## Related ADRs

- **0006** — Validation Pipeline (feeds ValidationReport)
- **0007** — Evidence Layer (evidence dimension source)

---

## Success Criteria

- QualityScorer produces consistent scores for identical ValidationReport inputs (determinism)
- Default weights sum to 1.0 ± 0.001
- Overall score matches manual calculation using dimension scores (regression test)
- Quality threshold of 75 blocks content with <75 but allows ≥75
- Component scores explainable (can see "Schema: 80, SEO: 90, Evidence: 60, Overall: 75")

---

*This ADR must be approved before Quality Scoring implementation is considered complete. The contract will be frozen at v1.0.0 upon sign-off.*
