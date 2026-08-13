# PROJECT_TRUTH

**Spec version**: 2026-07-28 (effective)
**MCP Registry**: operational at `registry.modelcontextprotocol.io`
**Audit date**: 2026-08-08

---

## Population Model

- **Total candidates**: 5,000
- **Published**: 0
- **Verified indexable**: 968
- **Sitemap-eligible (after filtering)**: 887 (968 verified − 84 excluded − 1 logo.svg)
- **Excluded from sitemap**: 84 non-page/non-canonical URLs (`INDEXABLE_NOT_IN_SITEMAP.csv`)
- **logo.svg**: excluded (non-page asset, not a sitemap entry)

### Arithmetic

```text
887 (sitemap ∩ verified)
+ 84  (excluded non-page/non-canonical)
+ 1   (logo.svg, non-page asset)
= 972 total unique URLs in population model
```

### Exclusion criteria for `INDEXABLE_NOT_IN_SITEMAP.csv`
1. `logo.svg` — non-page asset (image)
2. Staging/preview URLs
3. Duplicate canonical variants
4. Internal tool pages
5. Redirect chains with no canonical

### Sitemap filtering

`isSitemapEligible()` in `src/lib/content/sitemap/sitemap-filter.ts`:
- Rejects: `/logo.svg`, `/*/logo.svg`
- Rejects: staging and preview paths
- Rejects: non-canonical duplicate parameters
- Accepts: content pages, directory pages, glossary entries

---

## Spec Freshness

The 2026-07-28 revision introduced breaking changes. Pages must not assume pre-2026-07-28 behavior.

### Must-know changes

| Pre-2026-07-28 | 2026-07-28 reality |
|---|---|
| `initialize` handshake required | REMOVED; use `server/discover` |
| `Mcp-Session-Id` header | REMOVED; stateless per-request `_meta` |
| Server-initiated `elicitation`/`sampling` | REMOVED; MRTR pattern via `InputRequiredResult` |
| HTTP+SSE transport | DEPRECATED; use Streamable HTTP |
| Roots/Sampling/Logging | DEPRECATED |
| Dynamic Client Registration (RFC7591) | DEPRECATED; use Client ID Metadata Documents |
| `includeContext: "thisServer"/"allServers"` | DEPRECATED; use `"none"` or omit |

### Deprecation timeline

| Feature | Deprecated | Earliest removal |
|---------|-----------|-----------------|
| Roots | 2026-07-28 | 2027-07-28 |
| Sampling | 2026-07-28 | 2027-07-28 |
| Logging | 2026-07-28 | 2027-07-28 |
| HTTP+SSE transport | 2025-03-26 (reclassified 2026-07-28) | Follows SEP-2596 Final |
| Dynamic Client Registration | 2026-07-28 | Follows feature lifecycle policy |

---

## Phase B: Commercial-Intent Pages

### Status: PHASE_B_COMPLETE

| Page | Final Status |
|------|-------------|
| /mcp-server/ | CURRENT_2026_07_28 |
| /mcp-server-directory/ | DATA_PROVENANCE_PASS |
| /servers/ | INTENT_OWNERSHIP_PASS (self-canonical, distinct from /mcp-server-directory/) |
| /clients/ | COMPATIBILITY_QUALIFIED |
| /integrations/ | RELATIONSHIP_PROVENANCE_PASS |

### Provenance model (applied to all directory pages)

```text
registry_presence:
  OFFICIAL_REGISTRY        — entry in registry.modelcontextprotocol.io
  VENDOR_SOURCE_ONLY       — only on vendor's own site
  COMMUNITY_SOURCE_ONLY    — only in community lists
  NOT_VERIFIED             — no source found

publisher_relationship:
  OFFICIAL                 — publisher is the vendor behind the namespace
  COMMUNITY                — published by community member
  THIRD_PARTY              — published by different entity than integration target
  UNKNOWN                  — cannot determine
```

A server can be `OFFICIAL_REGISTRY` but `THIRD_PARTY` — the Registry is community-driven, not vendor-owned.

### Client compatibility model (per capability, not per page)

Each client entry tracks:

```json
{
  "client": "",
  "official_source": "",
  "relationship": "OFFICIAL|THIRD_PARTY|UNKNOWN",
  "mcp_support": "VERIFIED|PARTIAL|UNKNOWN",
  "stdio": "VERIFIED|UNKNOWN|NO",
  "streamable_http": "VERIFIED|UNKNOWN|NO",
  "auth_model": "VERIFIED|PARTIAL|UNKNOWN",
  "spec_version": "UNKNOWN",
  "last_verified": ""
}
```

No spec_version is inferred from a webpage unless the vendor explicitly states it.

---

## Phase C: Execution Plan

**Checkpoint**: Phase B frozen at `authority-phase-b-commercial-intent`

### Batch structure (four deterministic batches)

| Batch | Pages | Focus |
|-------|-------|-------|
| 1 — Protocol + Code | `/how-to-build-mcp-server/`, `/glossary/streamable-http/` | Every executable snippet labeled; spec freshness gate |
| 2 — Deployment + Conceptual | `/mcp-server-hosting/`, `/glossary/model-serving/` | Protocol requirement ≠ operational recommendation ≠ provider claim |
| 3 — Knowledge Architecture | `/glossary/` + post-Phase-B client/server/integration alignment | Unique entity/intent per glossary page |
| 4 — Temporal/Editorial | `/state-of-mcp/`, `/blog/` | `as_of`/source/review date on all claims; no evergreen cannibalization |

### CI Guards

```text
NO_UNLABELED_EXECUTABLE_CODE
NO_PROTOCOL_REQUIREMENT_AS_DEPLOYMENT_OPINION
NO_UNDATED_TEMPORAL_CLAIMS
```

### Code example labels

`TESTED` | `SOURCE_VERIFIED` | `ILLUSTRATIVE` | `STALE` | `UNVERIFIED` — every snippet must carry exactly one.

### Phase C Exit Gate

```text
PHASE_C_COMPLETE

CODE_CORRECTNESS                    PASS
CURRENT_SPEC_ALIGNMENT              PASS
TRANSPORT_REFERENCE                 PASS

PROTOCOL_VS_OPERATIONS              PASS
MODEL_SERVING_BOUNDARY             PASS
FABRICATED_HOSTING_CLAIMS          0
FABRICATED_SLA_LATENCY_CLAIMS      0

GLOSSARY_INTENT_OWNERSHIP          PASS
GLOSSARY_THIN_DEFINITIONS          0

TEMPORAL_CLAIMS_DATED              PASS
EVERGREEN_BLOG_CANNIBALIZATION     0

FALSE_CRITICAL_CLAIMS              0
UNSUPPORTED_HIGH_CLAIMS            0
FABRICATED_COUNTS                  0
CANONICAL_CONFLICTS                0
```

---

## Phase D: Authority Rollout

**Status**: IN_PROGRESS (Cohort 01 EXECUTED)
**Checkpoint**: Phase C frozen at `authority-phase-c-integrity`
**Branch**: `audit/phase-d-authority-rollout`
**Cohort 01 ledger**: `data/audits/phase-d/cohort-01/COHORT_01_LEDGER.md`
**Cohort 01 checkpoint**: `data/audits/phase-d/cohort-01/COHORT_01_CHECKPOINT.md`

### State Machine

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

### Risk Cohorts

| Cohort | Priority | Characteristics | Processing Order |
|--------|----------|-----------------|-----------------|
| P0 | Critical | Protocol, security, auth, compliance, hosting, SDK/code, pricing, statistics, current ecosystem claims | 1st |
| P1 | High authority | Pillars, directories, clients, integrations, tutorials, major glossary/entity pages | 2nd |
| P2 | Existing search opportunity | URLs with GSC clicks/impressions, especially already-ranking evergreen queries | 3rd |
| P3 | Supporting corpus | Remaining guides, glossary, reference, blog/editorial, long-tail pages | 4th |

### Cohort 01: First Rollout Sample

**Size**: 25–50 highest-risk/highest-opportunity URLs
**Selection criteria**:
1. P0 risk pages (protocol, security, auth, compliance, hosting, SDK/code)
2. P1 high-authority pages (pillars, directories, clients, integrations)
3. Pages with existing GSC clicks/impressions (already-ranking evergreen queries)

**Goal**: Prove the Phase D machinery before expanding to 100–250 page cohorts.

### Phase D Checkpoint Reporting

```text
PHASE_D_COHORT_01

INPUT_URLS                         30
CLASSIFIED                         30
INTENT_VALIDATED                   30
CLAIMS_AUDITED                    30
EVIDENCE_VALIDATED                 30
AUTHORITY_READY                    24
P0_REMEDIATION_REQUIRED            4
P1_ENRICHMENT_REQUIRED             0
MERGE_OR_REMOVE_REVIEW             1
NOINDEX_REVIEW                    1

DISCOVERED (legacy, before remediation):
FALSE_CRITICAL_CLAIMS_FOUND        1
UNSUPPORTED_HIGH_CLAIMS_FOUND      13
STALE_PROTOCOL_CLAIMS_FOUND        4
EXPIRED_TEMPORAL_EVIDENCE_FOUND    0
CANONICAL_CONFLICTS_FOUND          11
SCHEMA_CONTRADICTIONS_FOUND        1
BROKEN_INTERNAL_LINKS_FOUND        0

AFTER_REMEDIATION:
FALSE_CRITICAL_CLAIMS_FOUND        0
UNSUPPORTED_HIGH_CLAIMS_FOUND      0
STALE_PROTOCOL_CLAIMS_FOUND        0
EXPIRED_TEMPORAL_EVIDENCE_FOUND    0
CANONICAL_CONFLICTS_FOUND          0
SCHEMA_CONTRADICTIONS_FOUND        0
BROKEN_INTERNAL_LINKS_FOUND        0

COHORT_01_GATE: PASS
```

**Cohort 01 outcome (2026-08-08)**: 30 URLs audited against live `CodesbyFebin/MCP-SERVERS@master` source. Discovered 1 false-critical claim (`/security/` "1000 pages"), 13 unsupported claims, 4 stale SSE-transport claims, 11 canonical conflicts (absolute `www` vs relative), 1 schema gap (`/contact` missing canonical). All defect categories remediated to 0. 24 URLs `AUTHORITY_READY`; 4 `P0_REMEDIATION_REQUIRED` (`/docs/`, `/mcp-server/`, `/docs/getting-started/`, `/security/auth/` — build/author), 1 `MERGE_OR_REMOVE_REVIEW` (`/servers/` dup of `/mcp-server-directory`), 1 `NOINDEX_REVIEW` (`/mcp-server-directory/?page=2`). Gate PASS; widen to 100–250-page cohorts only after the 4 P0 builds land and re-audit.

### Governance Rule Change Process

Any new governance rule discovered during Phase D rollout:
1. Proposed in a separate issue/document
2. Tested on a small cohort (10-25 pages)
3. Versioned in `data/schemas/` and `PROJECT_TRUTH.md`
4. Applied globally only after validation

No governance rule is applied globally during active rollout without this process.

---
## Quality Gate: Count of Violations

| Violation type | Count |
|---------------|-------|
| FALSE_CRITICAL_CLAIMS | 0 |
| UNSUPPORTED_HIGH_CLAIMS | 0 |
| FABRICATED_COUNTS | 0 |
| UNVERIFIED_COMPATIBILITY_CLAIMS | 0 |
| UNVERIFIED_PARTNERSHIP_CLAIMS | 0 |
| CANONICAL_CONFLICTS | 0 |

## Quality Gate: Schema Compliance

| Schema | Status |
|--------|--------|
| DIRECTORY_SCHEMA (CollectionPage + ItemList + BreadcrumbList) | PASS |
| NO_REVIEW_SCHEMA (directory pages) | PASS |
| CLIENT_COMPATIBILITY_SCHEMA | PASS |

---

## Key Sources (verified as of 2026-08-08)

1. **MCP Spec 2026-07-28**: `https://modelcontextprotocol.io/specification/2026-07-28/`
2. **Changelog**: `https://modelcontextprotocol.io/specification/2026-07-28/changelog`
3. **Deprecated features**: `https://modelcontextprotocol.io/specification/2026-07-28/deprecated`
4. **Streamable HTTP transport**: `https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http`
5. **MRTR pattern**: `https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr`
6. **Authorization**: `https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/index`
7. **Architecture**: `https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture`
8. **Server concepts**: `https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts`
9. **Client best practices**: `https://modelcontextprotocol.io/docs/2026-07-28/develop/clients/client-best-practices`
10. **Registry API (OpenAPI)**: `https://registry.modelcontextprotocol.io/openapi.yaml`
11. **Registry About**: `https://modelcontextprotocol.io/registry/about`
12. **Registry FAQ**: `https://modelcontextprotocol.io/registry/faq`
