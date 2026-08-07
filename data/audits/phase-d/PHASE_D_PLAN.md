# Phase D Plan: Authority Rollout

**Date**: 2026-08-08
**Status**: PLANNED
**Phase C checkpoint**: `authority-phase-c-integrity`
**Branch**: `audit/phase-d-authority-rollout`

---

## Strategic Direction

Phase D applies the governance system proven in Phases A–C to the 971 legacy indexable URLs. It is NOT a content-generation phase. It consumes the standards and schemas proven in A–C; it does not redefine them.

## Operating Rule

No new schema fields or editorial rules during Phase D. Any governance rule discovered during rollout is proposed separately, tested on a small cohort, versioned, then applied globally.

---

## State Machine

Every page enters Phase D as `LEGACY_LIVE` and progresses through:

```text
LEGACY_LIVE
  → CLASSIFIED (risk cohort assigned: P0/P1/P2/P3)
  → INTENT_VALIDATED (intent ownership confirmed, canonical set)
  → CLAIMS_AUDITED (all claims inventoried, scoped, and assessed)
  → EVIDENCE_VALIDATED (evidence linked, temporal evidence added where needed)
  → REMEDIATED (P0 remediation applied)
  → LINKS_VALIDATED (internal link graph checked)
  → SCHEMA_VALIDATED (structured data validated)
  → EDITORIAL_REVIEWED (human editorial sign-off)
  → AUTHORITY_READY
```

**Important**: A page does not become `AUTHORITY_READY` because its template, parent hub, or sibling page passed. Each page is evaluated independently.

## Risk Cohorts

Pages are processed in risk order, not URL order:

| Cohort | Priority | Characteristics | Processing Order |
|--------|----------|-----------------|-----------------|
| P0 | Critical | Protocol, security, auth, compliance, hosting, SDK/code, pricing, statistics, current ecosystem claims | 1st |
| P1 | High authority | Pillars, directories, clients, integrations, tutorials, major glossary/entity pages | 2nd |
| P2 | Existing search opportunity | URLs with GSC clicks/impressions, especially already-ranking evergreen queries | 3rd |
| P3 | Supporting corpus | Remaining guides, glossary, reference, blog/editorial, long-tail pages | 4th |

## Cohort 01: First Rollout Sample

**Size**: 25–50 highest-risk/highest-opportunity URLs
**Selection criteria**:
1. P0 risk pages (protocol, security, auth, compliance, hosting, SDK/code)
2. P1 high-authority pages (pillars, directories, clients, integrations)
3. Pages with existing GSC clicks/impressions (already-ranking evergreen queries)

**Goal**: Prove the Phase D machinery before expanding to 100–250 page cohorts.

## Phase D Checkpoint Reporting

Each cohort checkpoint reports:

```text
PHASE_D_COHORT_01

INPUT_URLS                         50
AUTHORITY_READY                    N
P0_REMEDIATION_REQUIRED            N
P1_ENRICHMENT_REQUIRED             N
MERGE_OR_REMOVE_REVIEW             N
NOINDEX_REVIEW                     N

FALSE_CRITICAL_CLAIMS              0 after remediation
UNSUPPORTED_HIGH_CLAIMS            0 after remediation
CANONICAL_CONFLICTS                0
SCHEMA_CONTRADICTIONS              0
BROKEN_INTERNAL_LINKS              0
STALE_PROTOCOL_CLAIMS              0
EXPIRED_TEMPORAL_EVIDENCE          0
```

Only after Cohort 01 passes does the rollout widen to 100–250-page cohorts.

## Phase D Artifacts

| Artifact | Location |
|----------|----------|
| Phase D Plan | `data/audits/phase-d/PHASE_D_PLAN.md` |
| State Machine Schema | `data/schemas/phase-d-state-machine.ts` |
| Cohort 01 Sample | `data/audits/phase-d/cohort-01-sample/COHORT_01_SAMPLE.md` |
| Cohort Checkpoint Reports | `data/audits/phase-d/cohort-NN-checkpoint/` |

## Governance Rule Change Process

Any new governance rule discovered during Phase D rollout:

1. Proposed in a separate issue/document
2. Tested on a small cohort (10-25 pages)
3. Versioned in `data/schemas/` and `PROJECT_TRUTH.md`
4. Applied globally only after validation

No governance rule is applied globally during active rollout without this process.
