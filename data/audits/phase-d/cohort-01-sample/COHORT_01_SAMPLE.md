# Cohort 01 Sample: Highest-Risk / Highest-Opportunity URLs

**Cohort size**: 30 (target 25–50)
**Selection**: P0 critical + P1 high-authority + existing search opportunity
**Date**: 2026-08-08
**Status**: SAMPLED (not yet processed)

---

## Cohort Composition

### P0 — Critical (10 URLs)

Protocol, security, auth, compliance, hosting, SDK/code, pricing, statistics, current ecosystem claims.

| # | URL | Rationale |
|---|-----|-----------|
| 1 | `/how-to-build-mcp-server/` | SDK/code — highest executable density, already audited in Phase C |
| 2 | `/glossary/streamable-http/` | Protocol — transport reference, already audited in Phase C |
| 3 | `/mcp-server-hosting/` | Hosting — deployment boundaries, already audited in Phase C |
| 4 | `/security/` | Security/auth/compliance — high-risk claims about OAuth, mTLS, enterprise readiness |
| 5 | `/docs/` | Protocol documentation — pillar page, high traffic, must be current-spec aligned |
| 6 | `/what-is-mcp/` | Protocol overview — high traffic, likely contains stale protocol assumptions |
| 7 | `/mcp-server/` | Server role — may contain stale session/handshake/SLA assumptions |
| 8 | `/mcp-server-directory/` | Directory — data provenance, Registry alignment |
| 9 | `/integrations/` | Integrations — partnership claims, vendor relationship provenance |
| 10 | `/clients/` | Client compatibility — capability-level claims, vendor documentation links |

### P1 — High Authority (12 URLs)

Pillars, directories, clients, integrations, tutorials, major glossary/entity pages.

| # | URL | Rationale |
|---|-----|-----------|
| 11 | `/servers/` | Server category hub — distinct intent from directory, self-canonical |
| 12 | `/glossary/` | Glossary hub — entity ownership, cross-entity links |
| 13 | `/glossary/model-serving/` | Model serving — conceptual boundary, already audited in Phase C |
| 14 | `/glossary/mrtr/` | MRTR — protocol term, already audited in Phase C |
| 15 | `/glossary/server-discover/` | server/discover — protocol term, already audited in Phase C |
| 16 | `/glossary/tool/` | Tool — protocol primitive, already audited in Phase C |
| 17 | `/glossary/mcp-server/` | MCP Server — protocol term, already audited in Phase C |
| 18 | `/blog/` | Blog — editorial surface, evergreen cannibalization risk |
| 19 | `/state-of-mcp/` | State of MCP — temporal claims, already audited in Phase C |
| 20 | `/pricing/` | Pricing — statistics, claims about costs/plans |
| 21 | `/about/` | About — entity provenance, company claims |
| 22 | `/contact/` | Contact — entity ownership |

### P2 — Existing Search Opportunity (8 URLs)

URLs with GSC clicks/impressions, already-ranking evergreen queries. (Placeholder — actual GSC data required.)

| # | URL | Rationale |
|---|-----|-----------|
| 23 | `/mcp-server-directory/` (paginated variants) | Already-ranking directory queries |
| 24 | `/what-is-mcp/` (FAQ section) | Already-ranking "what is MCP" query |
| 25 | `/how-to-build-mcp-server/` (step variants) | Already-ranking tutorial queries |
| 26 | `/docs/` (specific doc pages) | Already-ranking documentation queries |
| 27 | `/glossary/streamable-http/` | Already-ranking transport queries |
| 28 | `/security/` (auth guide section) | Already-ranking security queries |
| 29 | `/clients/` (specific client pages) | Already-ranking client compatibility queries |
| 30 | `/integrations/` (specific integration pages) | Already-ranking integration queries |

---

## Cohort 01 Entry Format

Each URL in Cohort 01 is processed as:

```json
{
  "url": "/how-to-build-mcp-server/",
  "risk_cohort": "P0",
  "state": "LEGACY_LIVE",
  "authority_contract": {
    "intent_owned": false,
    "canonical_valid": false,
    "claim_scopes_valid": false,
    "critical_claims_supported": false,
    "spec_freshness_valid": false,
    "temporal_evidence_valid": false,
    "entity_provenance_valid": false,
    "internal_links_valid": false,
    "schema_valid": false,
    "manual_review_required": true
  },
  "false_critical_claims": 0,
  "unsupported_high_claims": 0,
  "fabricated_counts": 0,
  "canonical_conflicts": 0,
  "schema_contradictions": 0,
  "broken_internal_links": 0,
  "stale_protocol_claims": 0,
  "expired_temporal_evidence": 0,
  "remediation_required": false,
  "reviewed_at": "",
  "reviewed_by": ""
}
```

---

## Cohort 01 Checkpoint Target

```text
PHASE_D_COHORT_01

INPUT_URLS                         30
AUTHORITY_READY                    N (target: all 30)
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

Cohort 01 passes only when all 30 URLs reach `AUTHORITY_READY` and all zero-count gates are met.
