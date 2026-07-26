# Versioning Policy

**Version:** 1.0.0  
**Status:** Frozen  
**Owner:** Platform Engineering  
**Last Updated:** 2025-07-25

This document defines the semantic versioning policy for all ATLAS P99 contracts, APIs, and public interfaces.

---

## Scope

This policy applies to:

1. **Public HTTP APIs** — All endpoints under `/api/*`
2. **Internal Contracts** — Interfaces in `engine/content/contracts/`, `src/routing/*`, etc.
3. **Data Formats** — JSON schemas, manifest formats, graph data structure
4. **Build Artifacts** — `graph-data.json` schema, manifest repository format
5. **Configuration Files** — `tsconfig.json`, `vite.config.ts` (when published as part of SDK)

**Not covered:** Internal implementation details (private functions, internal types, unexported symbols).

---

## Semantic Versioning (SemVer)

All versioned artifacts follow **Semantic Versioning 2.0.0**:

```
MAJOR.MINOR.PATCH
```

- **MAJOR** — Incompatible API changes
- **MINOR** — Backward-compatible functionality additions
- **PATCH** — Backward-compatible bug fixes

**Examples:**
- `1.0.0` — Initial release
- `1.1.0` — Added new endpoint without breaking existing ones
- `2.0.0` — Removed deprecated endpoint, changed response schema
- `1.0.1` — Fixed typo in error message, no functional changes

---

## Version Lifecycle

```
Pre-release (alpha, beta, rc)
    ↓
Frozen v1.0.0 ←─── All public interfaces frozen
    ↓
v1.0.1 ← Patch release (bug fix only)
v1.1.0 ← Minor release (backward-compatible additions)
v1.2.0 ← Minor release (feature additions)
    ↓
Deprecated (announce v2.0.0 upcoming, still support v1.x)
    ↓
v2.0.0 ← New major version (breaking changes)
    ↓
Support v1.x for 12 months after v2.0.0 release
    ↓
v1.x End-of-Life (removed from codebase)
```

---

## Freezing Policy

A contract is considered **frozen** when:

1. The interface is declared `v1.0.0` (not `0.x.x`)
2. All acceptance criteria for the phase are met
3. Verification suite passes reproducibly
4. Documentation is complete
5. ADR is recorded and approved

Once frozen:

- **No breaking changes** allowed without incrementing MAJOR version
- **Deprecations** must be announced in ADR and remain functional for 12 months
- **Patch releases** allowed for critical fixes (with verification evidence)

**Frozen contracts:**
- Knowledge Graph API v1.0.0 (2026-07-25)
- Graph Specification v1.0.0 (2026-07-25)
- API Contracts v1.0.0 (2026-07-25)
- Versioning Policy v1.0.0 (2025-07-25)

**Contracts approaching freeze:**
- Content Manifest v1.0.0-draft → pending C1 sign-off

---

## Breaking Changes

A change is **breaking** if:

1. Existing consumers must modify their code to continue working
2. Required field is removed or changed type
3. Response schema changes (removed fields, changed types)
4. Error codes change meaning
5. Endpoint URL changes
6. Authentication requirements added
7. Rate limits introduced that cause legitimate traffic to fail

**Examples of non-breaking changes:**
- Adding new optional fields to requests/responses
- Adding new endpoints
- Adding new enum values (if consumers ignore unknown values)
- Improving error messages (code stays same)
- Performance improvements (no functional change)
- Adding new validation rules that don't affect valid inputs

---

## Deprecation Process

1. **Announce** — ADR created, docs updated with `@deprecated` notice
2. **Warn** — Next minor release includes `X-API-Deprecated: true` header and console warning
3. **Remove** — After 12 months, remove in next MAJOR version (e.g., v2.0.0)

**Deprecation notice must include:**
- What is deprecated
- Which version introduced deprecation
- Which version will remove it
- Migration path or replacement

**Example response header during deprecation window:**
```
X-API-Deprecated: true
X-API-Deprecation-Version: 2.0.0
X-API-Deprecation-Notice: This endpoint will be removed in v2.0.0. Use /api/v2/... instead.
```

---

## Backward Compatibility Guarantees

Within the same MAJOR version:

1. **All existing endpoints** will continue to function identically
2. **Response fields** will not be removed or change type
3. **Error codes** will retain their meaning
4. **Authentication** will not be added retroactively
5. **Rate limits** will not be introduced without 12-month notice
6. **Required request fields** will not change (new fields must be optional)

**Exception:** Critical security fixes may override this policy (documented in ADR).

---

## Version Discovery

Endpoints must expose their version via:

**Response header:**
```
X-API-Version: 1.0.0
```

**Root health check:**
```
GET /
Response: { "version": "1.0.0", "status": "healthy", "build": "2026-07-25" }
```

---

## Contract Change Workflow

Any change to a frozen contract must:

1. **Create ADR** — Document context, problem, decision, consequences
2. **Propose version bump** — Determine if MAJOR, MINOR, or PATCH
3. **Implement change** — Following contract-first principle (interfaces first)
4. **Update tests** — Add verification for new behavior
5. **Update docs** — Mark old behavior as deprecated (if applicable)
6. **Release** — Follow deprecation process for breaking changes

---

## Contract-First Principle

> **Every implementation must satisfy a contract. No implementation defines a contract.**

The workflow:

1. Define interface (e.g., `interface ContentManifest { ... }`)
2. Freeze at `v1.0.0` (with ADR and verification)
3. Implement against the frozen contract
4. Never modify the contract without ADR and version bump

This prevents architectural drift and ensures consumers can rely on stable APIs.

---

## Contract Types and Versioning Rules

| Contract Type | Versioning Start | Backward Compat? | Example |
|---------------|------------------|------------------|---------|
| HTTP API | `/api/v1/` prefix | Yes (within v1) | `/api/v1/graph/stats` |
| Internal Interface | Module exports | Yes (within v1) | `export interface GraphNode` |
| Data Format | Embedded in file | Yes (within v1) | `graph-data.json` schema |
| Build Artifact | Filename or header | Yes (within v1) | `manifest-v1.json` |
| Config File | No version | No | `vite.config.ts` |

**Note:** Internal interfaces that are not exported to other packages do not require versioning (considered private implementation).

---

## Migration Guide Template

When releasing a new MAJOR version, provide a migration guide:

```md
# Migration: v1.x → v2.0.0

## Breaking Changes

1. **Removed endpoint** `/api/old-endpoint`
   - **Replacement:** `/api/v2/new-endpoint`
   - **Migration:** Update client calls; see examples

2. **Changed response schema** for `/api/graph/similar`
   - `similarity` field renamed to `score`
   - Update code: `item.score` instead of `item.similarity`

## Deprecated Features (still in v2.0.0, will remove in v3.0.0)

1. **Header** `X-Legacy-Header`
   - Use `X-New-Header` instead

## Timeline

- v1.x supported until: 2027-01-25 (12 months after v2.0.0)
- v2.0.0 release date: 2026-07-25
- v3.0.0 earliest: 2027-07-25
```

---

## Enforcement

- **CI checks:** All contracts must have verification tests (`npm run test:*`)
- **Code review:** Breaking changes must include ADR and version bump justification
- **Release automation:** Version numbers in `package.json` and contract docs must match
- **Documentation:** All changes must be reflected in `docs/ARCHITECTURE/` within same PR

---

## Exceptions

**Hotfixes for critical security vulnerabilities** may skip deprecation and break compatibility, but must:
1. Be documented in post-mortem ADR
2. Include emergency migration guide
3. Be announced to all stakeholders immediately

**Beta/alpha features** are exempt until `v1.0.0` freeze (can change freely before freeze).

---

## Related Documents

- [`docs/ARCHITECTURE/GRAPH_SPECIFICATION.md`](../GRAPH_SPECIFICATION.md) — v1.0.0 frozen
- [`docs/ARCHITECTURE/API_CONTRACTS.md`](API_CONTRACTS.md) — v1.0.0 frozen
- [`docs/ARCHITECTURE/CONTENT_OS.md`](CONTENT_OS.md) — v1.0.0-draft
- [`docs/ARCHITECTURE/README.md`](README.md) — Subsystem index

---

## Change Log

| Date | Change | Version | Author |
|------|--------|---------|--------|
| 2025-07-25 | Initial versioning policy | 1.0.0 | Platform Engineering |
| 2025-07-25 | Add deprecation process details | 1.0.0 | Platform Engineering |

---

*This policy ensures stable, predictable evolution of the ATLAS P99 platform. All teams must comply.*
