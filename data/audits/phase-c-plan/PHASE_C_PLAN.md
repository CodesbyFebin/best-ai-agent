# Phase C Plan

**Date**: 2026-08-08
**Status**: ACTIVE
**Checkpoint**: Phase B frozen at `authority-phase-b-commercial-intent` (tag committed)
**Branch**: `audit/phase-c-authority-integrity`

---

## Operating Rule

No further architectural changes before starting Batch 1. All governance rules are versioned in this plan and the schema files under `data/schemas/`.

---

## Execution Flow

```text
FROZEN
authority-phase-b-commercial-intent

        ↓

audit/phase-c-authority-integrity

Batch 1 → Protocol + Code
Batch 2 → Deployment + Conceptual
Batch 3 → Knowledge Architecture
Batch 4 → Temporal + Editorial

        ↓

PHASE_C_EXIT_GATE

        ↓

authority-phase-c-integrity

        ↓

Phase D — 971-page rollout
```

---

## Batch 1: Protocol + Code Correctness

### Pages
- `/how-to-build-mcp-server/`
- `/glossary/streamable-http/`

### Batch 1 Gate: Executable Code Labeling

Every code block must carry exactly one state:

```text
TESTED          — actually run against current SDK; version + date documented
SOURCE_VERIFIED — matches vendor/SDK documentation exactly; not independently executed
ILLUSTRATIVE    — conceptual pseudocode; marked non-executable
STALE           — uses pre-2026-07-28 API features (initialize, HTTP+SSE, server-initiated requests)
UNVERIFIED      — not yet checked against current SDK
```

**Blocker rule**: `STALE` and `UNVERIFIED` executable examples block Batch 1 completion until:
- Corrected to `TESTED` or `SOURCE_VERIFIED`
- Converted to `ILLUSTRATIVE` (non-executable pseudocode)
- Removed

### Code Record Schema

Each code example is tracked as:

```json
{
  "example_id": "how-to-build-mcp-001",
  "page": "/how-to-build-mcp-server/",
  "language": "typescript",
  "claim_scope": "SDK",
  "verification_state": "TESTED",
  "sdk_or_package": "@modelcontextprotocol/sdk",
  "version_or_commit": "2.0.0",
  "source": "https://github.com/modelcontextprotocol/docs/blob/main/docs/2026-07-28/develop/build-server.md",
  "verified_at": "2026-08-08",
  "test_command": "npx tsx example.ts",
  "test_result": "PASS"
}
```

### `/glossary/streamable-http/` Batch 1 Gate

Every statement must fall into one of: `PROTOCOL`, `SDK`, `OPERATIONS`, or `EDITORIAL`.

Operational advice must not be silently upgraded into protocol requirements. The page must explicitly distinguish:
- Current Streamable HTTP model (2026-07-28 spec)
- Legacy HTTP+SSE (deprecated, not universally prohibited for existing deployments)

---

## Batch 2: Deployment + Conceptual Boundaries

### Pages
- `/mcp-server-hosting/`
- `/glossary/model-serving/`

### Batch 2 Gate: Semantic Boundary

```text
MCP SPECIFICATION
≠
SDK IMPLEMENTATION DETAIL
≠
DEPLOYMENT BEST PRACTICE
≠
MCPServer.in EDITORIAL RECOMMENDATION
```

Every claim on these pages must carry `claim_scope`: `PROTOCOL` | `SDK` | `OPERATIONS` | `EDITORIAL`.

- Protocol requirements: sourced from `specification/2026-07-28/` documents
- Best practices: labeled "best practice" with evidence
- Cloud/provider claims: labeled "deployment context" with source
- No invented latency, SLA, residency, region, scalability, or provider claims

### `/glossary/model-serving/` Gate

Must explain:
1. Model serving: runs/exposes inference models
2. MCP server: exposes contextual capabilities to MCP clients
3. MCP client/host: may use both an LLM/model service AND MCP servers
4. These roles are related but not interchangeable

---

## Batch 3: Knowledge Architecture

### Pages
- `/glossary/` (all entries)
- Post-Phase-B alignment for `/clients/`, `/servers/`, `/integrations/` content

### Batch 3 Gate: Glossary Anti-Thinness (Six Binary Gates)

Each glossary page must pass all six gates:

```text
DEFINITION             PASS
MCP_RELATIONSHIP       PASS
PRACTICAL_CONTEXT      PASS
LIMITATION_BOUNDARY    PASS
EVIDENCE               PASS
GRAPH_LINKAGE          PASS
```

- **DEFINITION**: Concise direct answer at top (1-2 sentences)
- **MCP_RELATIONSHIP**: How this concept relates to MCP specifically
- **PRACTICAL_CONTEXT**: Example or operational context of usage
- **LIMITATION_BOUNDARY**: What does NOT count / non-equivalence
- **EVIDENCE**: Authoritative source (spec section, vendor docs)
- **GRAPH_LINKAGE**: Inbound/outbound links to related glossary and guide pages

A page failing 2+ gates enters `MERGE_OR_REMOVE_REVIEW` — not auto-enriched.

---

## Batch 4: Temporal + Editorial

### Pages
- `/state-of-mcp/`
- `/blog/`

### Batch 4 Gate: Temporal Evidence

Every time-sensitive claim carries:

```json
{
  "as_of": "2026-08-08",
  "source": "https://registry.modelcontextprotocol.io/v0/openapi.yaml",
  "source_type": "PRIMARY",
  "retrieved_at": "2026-08-08T01:42:00Z",
  "review_interval_days": 30,
  "next_review_due": "2026-09-07",
  "freshness_status": "CURRENT"
}
```

### Temporal State Transition

```text
CURRENT
   ↓ review deadline passes
STALE_REVIEW_REQUIRED
   ↓ hard expiry threshold passes
EXPIRED
   ↓ human/source verification
CURRENT | REVISED | REMOVED
```

**Important**: `EXPIRED` does NOT mean the claim is false. It means the evidence is no longer fresh enough to support continued publication without review. CI flags `EXPIRED` claims for human review — automated remediation must NOT remove claims based solely on `EXPIRED` status.

### Blog Evergreen Guard

If a blog post begins ranking for an evergreen canonical intent:

```text
KEEP_NEWS_INTENT       — post is time-bound news
MERGE_INTO_EVERGREEN   — canonical info should move to permanent guide
301_TO_CANONICAL       — blog post duplicates a permanent guide, redirect
```

### CI Guard: Claim Scope Contradiction

```text
claim_scope     = PROTOCOL
source_type     != PRIMARY
materiality     = HIGH
evidence_status != SUPPORTED

→ FAIL
```

---

## CI Guards (Summary)

| Guard | Applies To | Failure Condition |
|-------|-----------|-------------------|
| `NO_UNLABELED_EXECUTABLE_CODE` | Batch 1 | Any code block with no `verification_state` label |
| `NO_PROTOCOL_REQUIREMENT_AS_DEPLOYMENT_OPINION` | Batch 2 | Statement conflates protocol requirement with deployment recommendation |
| `NO_UNDATED_TEMPORAL_CLAIMS` | Batch 4 | Time-sensitive claim without `temporal_evidence` metadata |
| `CI_CLAIM_SCOPE_CONTRADICTION` | All batches | `PROTOCOL`-scoped HIGH claims with non-PRIMARY evidence |

---

## Phase C Exit Gate

```text
PHASE_C_COMPLETE

CODE_CORRECTNESS
  unlabeled executable code                  0
  stale/unverified executable examples       0
  current SDK alignment                      PASS

PROTOCOL
  current spec alignment                     PASS
  transport reference (Streamable HTTP vs SSE)  PASS

DEPLOYMENT
  protocol-vs-operations boundary            PASS
  model serving boundary                     PASS
  fabricated hosting claims                  0
  fabricated SLA/latency claims              0

KNOWLEDGE_ARCHITECTURE
  glossary intent ownership                  PASS
  glossary thin definitions (>=2 gates)      0

EDITORIAL
  dated temporal claims                      PASS
  evergreen blog cannibalization             0

GLOBAL
  FALSE_CRITICAL_CLAIMS                      0
  UNSUPPORTED_HIGH_CLAIMS                    0
  FABRICATED_COUNTS                          0
  CANONICAL_CONFLICTS                        0
```

---

## Authority Contract (Phase D Interface)

The output of Phase C is a reusable **authority contract** that all 971 pages consume in Phase D:

```json
{
  "intent_owned": true,
  "canonical_valid": true,
  "claim_scopes_valid": true,
  "critical_claims_supported": true,
  "spec_freshness_valid": true,
  "temporal_evidence_valid": true,
  "entity_provenance_valid": true,
  "internal_links_valid": true,
  "schema_valid": true,
  "manual_review_required": true
}
```

**Phase D should consume the standards and schemas proven in A–C; it should not redefine them.** Any new governance rule discovered during Phase D rollout shall be proposed separately, tested on a small cohort, versioned, then applied globally.

Schema: `data/schemas/authority-contract.schema.ts`
