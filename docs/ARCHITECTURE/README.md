# ATLAS P99 Architecture Index

**Last Updated:** 2026-07-25  
**Status:** Active  
**Owner:** Platform Engineering

This directory contains the authoritative architecture documentation for the ATLAS P99 platform (BestAIAgent.in). All subsystems, contracts, and decision records are versioned and frozen according to the disciplined development process.

---

## Subsystem Overview

| Subsystem | Version | Status | Owner | Entry Point |
|-----------|---------|--------|-------|-------------|
| **Knowledge Graph** | 1.0.0 | Frozen | Platform | [`GRAPH_SPECIFICATION.md`](GRAPH_SPECIFICATION.md) |
| **Content OS** | 1.0.0 | Frozen | Content | [`CONTENT_OS.md`](CONTENT_OS.md) |
| **Editorial OS** | — | Planned | Content | [`../EDITORIAL_OS.md`](../EDITORIAL_OS.md) |
| **API Contracts** | 1.0.0 | Frozen | Platform | [`API_CONTRACTS.md`](API_CONTRACTS.md) |
| **Blueprint Engine** | — | Designing | Content | [`BLUEPRINT_SPEC.md`](BLUEPRINT_SPEC.md) |
| **Validation** | — | Designing | Quality | [`VALIDATION_MODEL.md`](VALIDATION_MODEL.md) |
| **Versioning Policy** | 1.0.0 | Frozen | Platform | [`VERSIONING.md`](VERSIONING.md) |

---

## Quick Navigation

### For Contributors
- Start here: Understand the [Subsystems](SUBSYSTEMS.md)
- Learn the design decisions: [ADR Index](ADR_INDEX.md)
- Understand the versioning policy: [Versioning](VERSIONING.md)

### For Content Team
- Content OS specification: [Content OS](CONTENT_OS.md)
- Blueprint engine design: [Blueprint Spec](BLUEPRINT_SPEC.md)
- Validation rules: [Validation Model](VALIDATION_MODEL.md)

### For Platform Team
- Knowledge Graph contract: [Graph Specification](GRAPH_SPECIFICATION.md)
- API contracts: [API Contracts](API_CONTRACTS.md)
- Technical decisions: [ADR Index](ADR_INDEX.md)

---

## Architecture Principles

1. **Contracts First**: Every public interface is defined before implementation and frozen at version 1.0.0.
2. **Deterministic**: Identical inputs produce identical outputs; no randomness in production generation.
3. **Single Source of Truth**: Each domain has exactly one authoritative data source.
4. **Invariant Enforcement**: Critical rules are validated at build time, not runtime.
5. **Testable by Design**: All subsystems expose validation hooks before sign-off.

---

## Current Phase Status

| Phase | Name | Status | Deliverables |
|-------|------|--------|--------------|
| **Phase B** | Knowledge Graph Foundation | ✅ Complete | `docs/GRAPH_SPECIFICATION.md` v1.0.0 |
| **Phase C** | Content OS | 🟡 In Progress | Contracts in progress |
| **Phase D** | Editorial OS | ⚪ Planned | Not started |
| **Phase E+** | Scale & Intelligence | ⚪ Planned | Not started |

**Phase B Sign-off:** 2026-07-25  
**Next Milestone:** Content Manifest v1.0.0 frozen

---

## Version Lifecycle

```
Draft → Frozen (v1.0.0) → Patch Releases → Major Version (breaking changes)
```

Frozen contracts require ADR approval for any modification. See [Versioning Policy](VERSIONING.md).

---

## Navigation

- **Subsystems:** [SUBSYSTEMS.md](SUBSYSTEMS.md)
- **API Contracts:** [API_CONTRACTS.md](API_CONTRACTS.md)
- **Content OS Spec:** [CONTENT_OS.md](CONTENT_OS.md)
- **Blueprint Spec:** [BLUEPRINT_SPEC.md](BLUEPRINT_SPEC.md)
- **Validation Model:** [VALIDATION_MODEL.md](VALIDATION_MODEL.md)
- **Versioning:** [VERSIONING.md](VERSIONING.md)
- **ADR Index:** [ADR_INDEX.md](ADR_INDEX.md)
- **Knowledge Graph:** [GRAPH_SPECIFICATION.md](GRAPH_SPECIFICATION.md)

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-07-25 | Initial architecture index created | Platform Engineering |
