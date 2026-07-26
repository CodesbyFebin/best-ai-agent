# Architecture Decision Records (ADRs) Index

**Last Updated:** 2026-07-25  
**Status:** Active

This index catalogs all Architecture Decision Records (ADRs) for the ATLAS P99 platform. ADRs document significant architectural choices, trade-offs, and consequences.

---

## Format

Each ADR follows the [Michael Nygard ADR pattern](https://cognitect.com/blog/2011/11/22/documenting-architecture-decisions):

1. **Context** — Problem space, forces, constraints
2. **Problem** — Specific decision needed
3. **Decision** — Chosen solution with rationale
4. **Alternatives Considered** — Other options evaluated
5. **Consequences** — Outcomes, risks, trade-offs
6. **Deferred Work** — Items postponed for later

---

## ADR Catalog

### Phase B — Knowledge Graph Foundation (P00–P12)

| ADR | Title | Status | Date | Author |
|-----|-------|--------|------|--------|
| [0001](DECISIONS/0001-knowledge-graph.md) | Knowledge Graph Implementation Strategy | Accepted | 2026-07-25 | Platform Engineering |

**Summary:** Adopted in-memory JSON graph built from canonical entities, with separate product page generation leveraging the graph for relationships. Rejected third-party graph databases due to complexity and overkill for initial scale.

---

### Phase C — Content OS (P13–P16)

| ADR | Title | Status | Date | Author |
|-----|-------|--------|------|--------|
| [0002](DECISIONS/0002-content-manifest.md) | Content Manifest as Single Source of Truth | Approved | 2026-07-26 | Platform Engineering |
| [0003](DECISIONS/0003-entity-resolver.md) | Entity Resolver as Single Resolution Point | Approved | 2026-07-26 | Platform Engineering |
| [0004](DECISIONS/0004-generation-context.md) | Immutable Generation Context | Approved | 2026-07-26 | Content Platform |
| [0005](DECISIONS/0005-blueprint-engine.md) | Blueprint Engine Architecture | Approved | 2026-07-26 | Content Platform |
| [0006](DECISIONS/0006-validation-pipeline.md) | Validation Pipeline Design | Approved | 2026-07-26 | Quality Engineering |
| [0007](DECISIONS/0007-evidence-layer.md) | Evidence Layer for Factual Grounding | Approved | 2026-07-26 | Content Platform |
| [0008](DECISIONS/0008-quality-scoring.md) | Weighted Quality Scoring Model | Approved | 2026-07-26 | Quality Engineering |
| [0009](DECISIONS/0009-internal-link-engine.md) | Graph-Driven Internal Link Engine | Approved | 2026-07-26 | Content Platform |

**Summary:** Phase C ADRs will document the design of the Content OS subsystems. Each contract gets its own ADR explaining why it exists, alternatives considered, and implementation constraints.

---

### Phase D — Editorial OS (P17–P19)

| ADR | Title | Status | Date | Author |
|-----|-------|--------|------|--------|
| — | Editorial workflow system | Planned | — | — |

**Summary:** To be created during Phase D.

---

### Phase E — Scale & Intelligence (P20+)

| ADR | Title | Status | Date | Author |
|-----|-------|--------|------|--------|
| — | Scale-out architecture | Planned | — | — |
| — | Cache strategy | Planned | — | — |
| — | CDN configuration | Planned | — | — |
| — | Performance optimization | Planned | — | — |

---

## How to Create a New ADR

1. Copy the ADR template from `docs/ADR_TEMPLATE.md` (to be created)
2. Name file `NNNN-short-description.md` where `NNNN` is sequential number
3. Fill in all sections (Context, Problem, Decision, Alternatives, Consequences, Deferred)
4. Submit PR with:
   - ADR file in `docs/DECISIONS/`
   - Any accompanying code changes (if implementation included)
   - Updated `ADR_INDEX.md` with new entry
5. Review by Architecture Board (Platform + Content leads)
6. Merge with `Status: Draft` initially; update to `Accepted` after review

---

## ADR Status Lifecycle

- **Draft** — Proposed, not yet reviewed
- **Accepted** — Reviewed and approved
- **Superseded** — Replaced by newer ADR (reference the replacing ADR)
- **Rejected** — Considered but not adopted (keep for historical context)

---

## Decision Rationale Template

When proposing an ADR, answer:

1. **What problem are we solving?** (clear, concise)
2. **What are the constraints?** (time, technical, team skills)
3. **What alternatives did we consider?** (at least 2-3)
4. **Why did we choose this approach?** (pros/cons analysis)
5. **What are the risks?** (technical debt, complexity, scalability limits)
6. **What might we need to change later?** (future-proofing)
7. **How will we verify it works?** (acceptance criteria)

---

## ADR Review Criteria

Each ADR is evaluated on:

- **Clarity:** Can a new team member understand the decision?
- **Alternatives:** Are trade-offs honestly presented?
- **Consequences:** Are risks and downsides acknowledged?
- **Deferrals:** Is postponed work explicitly recorded?
- **Testability:** Is there a way to verify the decision was correct?

---

## Related Resources

- [ADR 0001 — Knowledge Graph](DECISIONS/0001-knowledge-graph.md)
- [ADR Template](ADR_TEMPLATE.md) (to be created)
- [Michael Nygard's ADR patterns](https://cognitect.com/blog/2011/11/22/documenting-architecture-decisions)
- [Architecture Decision Records](https://adr.github.io/) community site

---

## Change Log

| Date | Change | ADR | Author |
|------|--------|-----|--------|
| 2026-07-25 | Initial ADR index created | — | Platform Engineering |
| 2026-07-25 | Add ADR 0001 (Knowledge Graph) | 0001 | Platform Engineering |
