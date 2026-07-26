# ADR 0006: Validation Pipeline Design

**Status:** Draft  
**Date:** 2026-07-25  
**Authors:** Quality Engineering  
**Reviewers:** TBD  
**Phase:** C5 — Validation Pipeline

---

## Context

Content must meet quality standards before publication. We have multiple quality dimensions:

- Schema validity (HTML5)
- SEO compliance (meta tags, headings)
- Accessibility (alt text, ARIA)
- Evidence coverage (claim-source matching)
- Internal linking (no broken links)
- Overall quality scoring

We need a **pipeline** that runs all validation rules on generated content, aggregates results, and produces a pass/fail decision with detailed diagnostics.

---

## Problem

How do we design a validation system that:

1. **Pluggable rules** — New rule types can be added without modifying core engine
2. **Configurable severity** — Some issues are errors (block publication), others warnings
3. **Independent rules** — Each rule runs in isolation; no side effects
4. **Aggregated reporting** — Single report with summary (errors, warnings, score)
5. **Performance** — Parallel rule execution possible (future)
6. **Testability** — Each rule can be tested independently

---

## Decision

Implement a **Validation Pipeline** with these characteristics:

- **Rule registry** — All `ValidationRule` objects registered once at startup
- **Pipeline execution** — `validate(input)` runs all enabled rules sequentially (or parallel in future)
- **Result aggregation** — Collects all `ValidationResult` objects into `ValidationReport`
- **Summary computation** — Counts errors/warnings/infos; computes overall score (delegated to QualityScorer)
- **Short-circuit option** — `isAcceptable(input, minScore)` stops early if fatal errors found

### Rule Contract

```ts
interface ValidationRule {
  readonly id: string;
  readonly type: ValidationRuleType;
  readonly severity: 'error' | 'warning' | 'info';
  description: string;
  run(input: ValidationInput): ValidationResult;
}
```

### Pipeline Contract

```ts
interface ValidationPipeline {
  readonly rules: ValidationRule[];

  validate(input: ValidationInput): ValidationReport;
  isAcceptable(input: ValidationInput, minScore?: number): boolean;
}
```

### Execution Flow

```text
ValidationInput (html, manifest, context, resources)
    ↓
For each rule in rules (enabled):
    result = rule.run(input)
    accumulate result
    if severity==='error' && !passed → track fatal
    ↓
ValidationReport {
  passed = (no fatal errors && score ≥ threshold)
  score = await qualityScorer.score(report)
  summary = { errors, warnings, infos }
}
```

### Built-in Rules

| Rule ID | Type | Severity | Description |
|---------|------|----------|-------------|
| `schema-html5` | SCHEMA | error | HTML valid per W3C validator |
| `schema-manifest` | SCHEMA | error | Required manifest fields present |
| `seo-meta` | SEO | error | title, description, og tags present |
| `seo-headings` | SEO | warning | Single H1, proper hierarchy |
| `a11y-alt-text` | ACCESSIBILITY | error | Images have alt attributes |
| `a11y-arias` | ACCESSIBILITY | warning | No ARIA misuse |
| `evidence-coverage` | EVIDENCE | error | % claims with evidence meets threshold |
| `evidence-valid` | EVIDENCE | error | All evidence sources resolvable |
| `linking-internal` | LINKING | error | Internal links point to published pages |
| `quality-score` | QUALITY | error | Overall score ≥ publish threshold |

---

## Alternatives Considered

### Alternative 1: Monolithic validator function

One giant function that checks everything.

**Pros:**
- Simple to write initially
- No interface overhead

**Cons:**
- Impossible to test individual rules
- Adding new rule requires modifying giant function (violates OCP)
- No severity granularity (all-or-nothing)
- Cannot run subset of rules (e.g., quick SEO check only)
- **Rejected** — not maintainable at scale

---

### Alternative 2: External validation services

Call out to external validators (W3C HTML validator, Lighthouse API).

**Pros:**
- Leverages battle-tested tools
- Offloads computation (parallel)

**Cons:**
- Network calls (latency, reliability)
- Hard to get deterministic results (validator updates)
- Cost (Lighthouse API usage limits)
- No custom rules (evidence, linking require internal logic)
- **Rejected** — we need internal, deterministic validation; can integrate external tools via subprocess but still orchestrate internally

---

### Alternative 3: Decorator pattern on blueprints

Blueprint returns `ValidatedOutput` after self-validating.

**Pros:**
- Blueprint knows best what validation applies
- Could skip irrelevant rules

**Cons:**
- Blueprint becomes responsible for validation (mixes concerns)
- Hard to enforce standard rules (each blueprint might implement differently)
- No centralized reporting (metrics fragmented)
- **Rejected** — validation must be independent from generation

---

### Alternative 4: Pipeline with stages and branching

Complex DAG where outcomes of one rule affect whether others run.

**Pros:**
- Efficient (skip rules if earlier failure makes later moot)
- Can handle conditional logic

**Cons:**
- Implementation complexity high
- Hard to reason about overall behavior
- Determinism at risk (order matters)
- **Rejected** — over-engineered for our needs; sequential linear pipeline is sufficient

---

## Consequences

### Positive

- **Pluggable**: New rule = implement interface + register; no engine changes
- **Independent**: Rules do not modify input; testable in isolation
- **Configurable**: Can enable/disable rules per environment (e.g., warnings only in preview)
- **Comprehensive**: All validation dimensions covered
- **Quality integrated**: Score computed from same results (single source of truth)

### Negative (Trade-offs)

- **Sequential execution**: All rules run even if early fatal error (could short-circuit but need to collect all errors for report)
- **Rule ordering**: Does not affect outcome but affects performance (schema first to catch obvious errors early)
- **No parallelism**: Currently serial (could parallelize in future but requires careful shared-nothing design)

---

## Deferred Work

- **Parallel execution**: Run independent rules in worker threads (CPU-bound rules like HTML parsing)
- **Rule dependencies**: Allow rules to specify "requires" other rule results (avoid redundant work)
- **Performance profiling**: Rule execution times (identify slow rules)
- **Rule configuration**: Per-environment enabled/disabled list (config file)
- **Custom rule registry**: Allow projects to register custom rules without forking

---

## Implementation Checklist

- [x] Interface defined in `engine/content/contracts/Validation.ts`
- [ ] ValidationPipeline implementation
- [ ] Built-in rules: schema-html5, schema-manifest, seo-meta, seo-headings, a11y-alt-text, a11y-arias, evidence-coverage, evidence-valid, linking-internal, quality-score
- [ ] Rule base class with helper methods (optional)
- [ ] HTML parser integration (for schema, headings, alt text)
- [ ] EvidenceValidator integration (for evidence rules)
- [ ] Linker integration (for linking validation)
- [ ] QualityScorer integration (for final score)
- [ ] Unit tests for each built-in rule
- [ ] Pipeline integration tests
- [ ] CLI: `npm run validate` to run full suite on generated HTML
- [ ] ADR approved and contract frozen at v1.0.0

---

## Related ADRs

- **0004** — GenerationContext (input to validation)
- **0007** — Evidence Layer (evidence rules)
- **0008** — Quality Scoring (score calculation)
- **0009** — Internal Linking (linking rules)

---

## Success Criteria

- ValidationPipeline runs all 10 built-in rules without error
- `ValidationReport` includes results from every rule (even after fatal error)
- `isAcceptable()` returns false if any ERROR rule fails OR score < threshold
- Each built-in rule has unit tests with sample HTML
- CLI `npm run validate` produces machine-readable JSON report
- Custom rule can be added in <50 lines of code

---

*This ADR must be approved before Validation Pipeline implementation is considered complete. The contract will be frozen at v1.0.0 upon sign-off.*
