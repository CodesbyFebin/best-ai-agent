# Documentation Index

> Cleaned (2026-08-20) to remove fabricated aggregate scores ("100/100", "419/419", "Platform Score 100", "Production Ready"). Counts here reflect the real tracked `docs/` tree (57 files) and root-level docs. For an evidence-first audit of the whole repository, start at [`../AUDIT.md`](../AUDIT.md).

## Start here

| Doc | What's in it |
|-----|--------------|
| [`../README.md`](../README.md) | Product overview, quick start, features |
| [`../AUDIT.md`](../AUDIT.md) | Phase 0 evidence-first repository audit (gaps + severity) |
| [`./POSITIONING.md`](./POSITIONING.md) | One-line / 50 / 150 / technical / beginner / developer / contributor positioning |
| [`./ARCHITECTURE.md`](./ARCHITECTURE.md) | Code-sourced architecture + request/evidence/build Mermaid diagrams |

## For developers (getting started)

1. [`../README.md#quick-start`](../README.md#quick-start) — `npm ci` → `npm run dev`
2. [`./ARCHITECTURE.md`](./ARCHITECTURE.md) — system design + request flow
3. [`./SAFE_DEEP.md`](./SAFE_DEEP.md) — evidence validation spec
4. [`../DEVELOPMENT.md`](../DEVELOPMENT.md) — local setup, dev workflow, coding standards
5. [`../TESTING.md`](../TESTING.md) — how to run and interpret the verify suite
6. [`../CI_INVARIANTS.md`](../CI_INVARIANTS.md) — the contracts CI enforces

## For operators (deployment)

1. [`../DEPLOYMENT.md`](../DEPLOYMENT.md) — production deployment guide
2. [`./RELEASE_REPORT.md`](./RELEASE_REPORT.md) — release notes
3. [`./CURRENT_IMPLEMENTATION.md`](./CURRENT_IMPLEMENTATION.md) — verified platform status
4. [`../PROJECT_TRACKER.md`](../PROJECT_TRACKER.md) — task-level tracking

## Architecture & design

- [`./ARCHITECTURE.md`](./ARCHITECTURE.md) — system design (canonical)
- [`./ARCHITECTURE/`](./ARCHITECTURE/) — `ADR_INDEX.md`, `API_CONTRACTS.md`, `CONTENT_OS.md`, `SUBSYSTEMS.md`, `VERSIONING.md`, `README.md`
- [`./DECISIONS/`](./DECISIONS/) — ADRs `0002`–`0009` (content-manifest, entity-resolver, generation-context, blueprint-engine, validation-pipeline, evidence-layer, quality-scoring, internal-linking)
- [`./KNOWLEDGE_GRAPH.md`](./KNOWLEDGE_GRAPH.md), [`./PHASE_B_KNOWLEDGE_GRAPH.md`](./PHASE_B_KNOWLEDGE_GRAPH.md)

## Evidence & quality

- [`./SAFE_DEEP.md`](./SAFE_DEEP.md) — evidence validation spec
- [`./PHASE_C1_EVIDENCE.md`](./PHASE_C1_EVIDENCE.md) — Phase C1 evidence
- [`./SCOPE.md`](./SCOPE.md), [`./SCOPE_FREEZE_SIGNOFF.md`](./SCOPE_FREEZE_SIGNOFF.md)
- [`./TEST_REPORT.md`](./TEST_REPORT.md)
- On-disk evidence receipts: `../evidence/{p0-*,phase-*}/`
- Quarantine: `../quarantine/` (+ `../scripts/check-quarantine.ts`, a CI gate)

## Roadmaps & planning

- [`./MASTER_ROADMAP.md`](./MASTER_ROADMAP.md) — full timeline
- [`./PLATFORM_GAP_ANALYSIS.md`](./PLATFORM_GAP_ANALYSIS.md) — what's done, what's next
- [`./WORK_BREAKDOWN.md`](./WORK_BREAKDOWN.md)
- [`./PHASE_C_PLAN.md`](./PHASE_C_PLAN.md), [`./PHASE_C1_CONTENT_MANIFEST.md`](./PHASE_C1_CONTENT_MANIFEST.md)

## Process history (archive candidates)

> The root contains ~22 process `.md` files (`FINAL_REPORT.md`, `IMPLEMENTATION_REPORT.md`, `CONSOLIDATION_SUMMARY.md`, `CONTENT_EXPANSION_V2_REPORT.md`, `FINAL_SIGNOFF.md`, `VERIFICATION_COMPLETE.md`, `ACHIEVEMENTS.md`, `ATLAS_SAFE-DEEP_OS_Master_Prompt.md`, …). `AUDIT.md` §H.2 recommends consolidating these into `docs/archive/` to unclutter the root. They are retained until that cleanup is run.

- [`../FINAL_REPORT.md`](../FINAL_REPORT.md), [`../FINAL_SIGNOFF.md`](../FINAL_SIGNOFF.md), [`../VERIFICATION_COMPLETE.md`](../VERIFICATION_COMPLETE.md)
- [`../PROJECT_COMPLETENESS.md`](../PROJECT_COMPLETENESS.md), [`../CONSOLIDATION_SUMMARY.md`](../CONSOLIDATION_SUMMARY.md)
- [`../CHANGES_AUDIT.md`](../CHANGES_AUDIT.md)
- [`./audits/`](./audits/) — `ADMIN_SECURITY_AUDIT.md`, `AUDIT_RECONCILIATION.md`, `ENTITY_INTEGRITY_AUDIT.md`, `PRODUCTION_GAP_ANALYSIS.md`, `SSR_RUNTIME_AUDIT.md`, `SUMMARY.md`
- [`./completeness/`](./completeness/) — `COMPLETENESS_LEDGER.md`, `CURRENT_STATE.md`, `REQUIREMENTS_TRACEABILITY.md`, `TEST_EVIDENCE.md`, `PRODUCTION_VERIFICATION.md`, `PLATFORM_VERIFICATION.md`, `PHASE_A_CONSOLIDATION.md`, `PHASE_B_KNOWLEDGE_GRAPH.md`, `BLOCKERS.md`, `RISKS.md`, `DECISIONS.md`, `SCOPE.md`, `IMPLEMENTATION_PLAN.md`, `FINAL_HANDOFF.md`

## Verification scripts

Run any of these locally before opening a PR (CI runs a sub-sequence automatically):

```
npm run lint            # tsc --noEmit (typecheck — a real ESLint config is a planned fix, see AUDIT.md G.2)
npm run check:quarantine
npm run build
npm run test:evidence
npm run test:sitemap
npm run test:ssr
npm run test:graph
npm run test:manifest
npm run test:production
npm run test:scope-freeze
```

## Verification status (dated, no aggregate scores)

As of commit `a54d4fa` on the **committed tree** (untracked scratch scripts set aside):

- `npm run lint` → exit 0
- `npm run build` → produces `dist/server.cjs` + Vite client assets
- Route registry: ~110 canonical routes + ~171 legacy redirects (regenerate count from `src/routing/routeRegistry.ts`)

> To reproduce: `npm ci && npm run lint && npm run build` then the relevant `npm run test:*`. No "100/100" or "X/X passing" aggregate is asserted here — those figures are not part of any reproducible harness in the repo.
