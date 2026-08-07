# Phase C Plan

**Date**: 2026-08-08
**Status**: PLANNED
**Checkpoint**: Phase B frozen at `authority-phase-b-commercial-intent`

---

## Strategic Direction

Phase C applies the Phase B provenance + protocol-freshness + intent-ownership system to 10 remaining pages in the top-tier audit set. Execution is organized into four deterministic batches, not page-by-page.

## Execution Order (Four Batches)

### Batch 1: Protocol + Code Correctness
| Page | Rationale |
|------|-----------|
| `/how-to-build-mcp-server/` | Highest density of executable code; every snippet must carry a status label |
| `/glossary/streamable-http/` | Transport reference must match 2026-07-28 spec model |

### Batch 2: Deployment + Conceptual Boundaries
| Page | Rationale |
|------|-----------|
| `/mcp-server-hosting/` | Must distinguish protocol requirements from operational recommendations |
| `/glossary/model-serving/` | Must distinguish model serving from MCP server functionality |

### Batch 3: Knowledge Architecture
| Page | Rationale |
|------|-----------|
| `/glossary/` + remaining client/server/integration content | Post-Phase-B alignment; each glossary page must have unique entity/intent |

### Batch 4: Temporal / Editorial
| Page | Rationale |
|------|-----------|
| `/state-of-mcp/` | Every time-sensitive claim must carry `as_of`, source, review date |
| `/blog/` | Evergreen search intent must remain owned by permanent guides |

---

## CI Guards (Phase C)

Three deterministic CI guards run on every page during Phase C:

```text
NO_UNLABELED_EXECUTABLE_CODE
  → Every code snippet must carry one of: TESTED | SOURCE_VERIFIED | ILLUSTRATIVE | STALE | UNVERIFIED
  → FAIL if any code block has no label

NO_PROTOCOL_REQUIREMENT_AS_DEPLOYMENT_OPINION
  → MCP protocol requirements sourced from specification/2026-07-28/
  → Operational recommendations must be labeled "best practice" with evidence
  → Cloud/provider claims must be labeled "deployment context" with source
  → FAIL if any statement conflates protocol requirement with deployment recommendation

NO_UNDATED_TEMPORAL_CLAIMS
  → Every time-sensitive claim must carry: as_of, source, source_type, retrieved_at, expires_review_at
  → FAIL if any claim references a date, count, or metric without provenance metadata
```

---

## Code Example Labels

Every executable code snippet in Phase C pages must carry exactly one label:

```text
TESTED          — actually run against current SDK; version + date documented
SOURCE_VERIFIED — matches vendor/SDK documentation exactly; not independently executed
ILLUSTRATIVE    — conceptual example; not production-tested
STALE           — uses pre-2026-07-28 API features
UNVERIFIED      — not yet checked against current SDK
```

**Rule**: `ILLUSTRATIVE` examples must be presented with explicit caveats. `STALE` examples are rewritten or removed. `UNVERIFIED` examples are flagged for follow-up.

---

## Temporal Evidence Model

For `/state-of-mcp/` and any time-sensitive claims in `/blog/`:

```json
{
  "claim": "The official MCP Registry lists 150,000+ servers",
  "as_of": "2026-08-08",
  "source": "https://registry.modelcontextprotocol.io/v0.1/servers?limit=1",
  "source_type": "PRIMARY",
  "retrieved_at": "2026-08-08T01:42:00Z",
  "expires_review_at": "2026-09-08",
  "status": "CURRENT"
}
```

Source types:
- `PRIMARY` — MCP spec or Registry API
- `SECONDARY` — vendor documentation
- `REPORTED` — community or industry report
- `INFERRED` — requires independent verification

---

## Glossary Entry Requirements

Each glossary page must include:

1. **Entity/intent**: What entity does this page represent, and what is the user's intent?
2. **Direct answer**: Concise definition at the top (1-2 sentences)
3. **MCP relevance**: How this concept relates to MCP specifically
4. **Example**: Concrete example of usage in or relation to MCP
5. **Limitations**: If applicable, what does NOT count
6. **Primary source**: Link to spec section or vendor docs
7. **Contextual links**: Cross-references to related glossary pages and guide pages

---

## Phase C Exit Gate

```text
PHASE_C_COMPLETE

CODE_CORRECTNESS
  unlabeled executable code                  0
  tested examples properly labeled           PASS
  current SDK alignment                      PASS

PROTOCOL
  current spec alignment                     PASS
  transport reference                        PASS

DEPLOYMENT
  protocol-vs-operations boundary            PASS
  model serving boundary                     PASS
  fabricated hosting claims                  0
  fabricated SLA/latency claims              0

KNOWLEDGE_ARCHITECTURE
  glossary intent ownership                  PASS
  thin definitions (no entity/relevance/example)  0

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

## Phase D: Authority Rollout (Planned)

After Phase C, the program transitions to Phase D — systematic rollout across 971 legacy indexable URLs:

```text
971 legacy pages
      ↓
entity + intent classification
      ↓
risk scoring (P0/P1/P2)
      ↓
spec freshness check (2026-07-28 alignment)
      ↓
claim/evidence audit
      ↓
P0 factual remediation
      ↓
P1 authority enrichment
      ↓
internal-link graph
      ↓
schema validation
      ↓
editorial approval
      ↓
AUTHORITY_READY
```

Phase C produces reusable templates for Phase D:
- Code example labels → apply to all tutorial/documentation pages
- Temporal evidence model → apply to all state-of/evergreen pages
- Deployment boundary pattern → apply to all hosting/operations pages
- Glossary entry requirements → apply to all remaining /glossary/ pages
