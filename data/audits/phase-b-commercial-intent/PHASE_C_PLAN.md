# Phase C Plan

**Date**: 2026-08-08
**Status**: PLANNED (Phase B complete — checkpoint `authority-phase-b-commercial-intent`, Phase C not yet started)

---

## Strategic Direction

Phase B established a provenance + protocol-freshness + intent-ownership system for five commercial-intent pages. Phase C applies this system to the remaining 11 pages in the top-tier audit set, with four distinct content-risk focus areas.

## Execution Order

Prioritized by **staleness density** — pages with the highest likelihood of stale protocol assumptions or risk go first.

```text
1.  /how-to-build-mcp-server/    — CODE CORRECTNESS (executable examples)
2.  /glossary/streamable-http/   — PROTOCOL (transport model reference)
3.  /clients/                    — COMPATIBILITY (Phase B foundation → content pass)
4.  /servers/                    — CATEGORY HUB (Phase B foundation → content pass)
5.  /integrations/               — PROVENANCE (Phase B foundation → content pass)
6.  /mcp-server-hosting/         — DEPLOYMENT (protocol vs. recommendation boundary)
7.  /glossary/                   — GLOSSARY (terminology alignment)
8.  /glossary/model-serving/     — GLOSSARY (distinct from MCP primitives)
9.  /state-of-mcp/               — EDITORIAL (temporal evidence model)
10. /blog/                       — EDITORIAL (discovery surface, no evergreen cannibalization)
```

---

## Risk Focus Area 1: Code Correctness (`/how-to-build-mcp-server/`)

**Gate**: Every executable example must declare its test state.

```text
TESTED              — example is actually run against current SDK
SOURCE_VERIFIED     — code matches vendor/SDK documentation exactly
ILLUSTRATIVE        — conceptual; not production-tested
STALE               — uses pre-2026-07-28 API (initialize, HTTP+SSE, server-initiated)
UNVERIFIED          — not yet checked against current SDK
```

**Rules**:
- `TESTED` examples must specify SDK version and run date
- `ILLUSTRATIVE` examples must be labeled as such — never presented as production-ready
- `STALE` examples are removed or rewritten
- `spec_version` in any code example must come from vendor documentation, not inferred

**Spec alignment checkpoints for code examples**:
1. No `initialize` handshake — use `server/discover` for version negotiation
2. No `Mcp-Session-Id` header — stateless per-request `_meta`
3. No server-initiated requests — use MRTR `InputRequiredResult` pattern
4. Transport: `stdio` or `Streamable HTTP` only (HTTP+SSE is deprecated)

---

## Risk Focus Area 2: Protocol Documentation (`/glossary/streamable-http/`)

**Gate**: Technical reference, not dictionary definition.

The page must cover:

1. **Current transport model** — POST-based, single endpoint, SSE for streaming
2. **Request/response behavior** — `application/json` or `text/event-stream` per request
3. **Routing/version headers** — `MCP-Protocol-Version`, `Mcp-Method`, `Mcp-Name` required
4. **Streaming nuances** — SSE scoped to request; `subscriptions/listen` for long-lived notifications
5. **What changed from legacy HTTP+SSE** — no GET endpoint, no protocol-level sessions, no `Last-Event-ID`, MRTR replaces server-initiated requests
6. **Security considerations** — `Origin` header validation, localhost binding, auth requirements
7. **Common implementation mistakes** — sending server-initiated requests on SSE streams, relying on session state, missing `Accept` header
8. **Migration section** — `initialize` → `server/discover`, `Mcp-Session-Id` → per-request `_meta`, HTTP+SSE GET → POST

---

## Risk Focus Area 3: Deployment Boundaries (`/mcp-server-hosting/`)

**Gate**: Strong boundary between MCP protocol requirements and operational best practices.

```text
Protocol requirement
   ≠
Operational best practice
   ≠
Regional/cloud vendor recommendation
```

**Rules**:
- Protocol requirements: from `specification/2026-07-28/` documents only
- Best practices: labeled as recommendations, not requirements
- Regional/cloud vendor claims: must cite specific source; must not be presented as MCP requirements
- Statements about Kubernetes, Docker, autoscaling, load balancing, regions, latency, availability, residency, or cloud vendors must be clearly marked as "deployment recommendation" with evidence
- Remove any claims about specific edge locations (Mumbai/Bengaluru) or AWS regions unless independently verified

**Separation pattern**:

```markdown
### MCP Protocol Requirements
- Streamable HTTP transport: POST to single MCP endpoint
- `MCP-Protocol-Version` header required
- OAuth 2.1 bearer token in `Authorization` header

### Operational Best Practices (recommendations)
- Deploy behind TLS-terminating reverse proxy
- Set `X-Accel-Buffering: no` for SSE responses
- Implement keep-alive comment lines on subscriptions/listen streams

### Regional Deployment Notes (context-dependent)
- These notes describe how some providers deploy; not MCP requirements
```

---

## Risk Focus Area 4: Temporal Evidence Model (`/state-of-mcp/`)

**Gate**: Every claim carries provenance metadata. Claims without evidence are removed.

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

**Rules**:
- No ecosystem counts unless sourced from a defined dataset on the stated date
- `as_of` field required on every quantitative claim
- `expires_review_at` set to 30 days from `retrieved_at`
- Claims past `expires_review_at` are flagged as STALE
- Source types: `PRIMARY` (MCP spec/registry), `SECONDARY` (vendor docs), `REPORTED` (community), `INFERRED` (requires verification)

---

## Risk Focus Area 5: Glossary Integrity (`/glossary/`, `/glossary/model-serving/`)

### `/glossary/`
- **Intent**: Define protocol-specific terms; cross-reference to spec sections
- Every term definition must cite the 2026-07-28 spec section
- Deprecated terms (Roots, Sampling, Logging, HTTP+SSE) must carry deprecation notice + migration path

### `/glossary/model-serving/`
- **Intent**: Explain model serving and how it relates to (but differs from) MCP infrastructure
- **Key distinction**:
  ```text
  Model serving  → runs/exposes inference models
  MCP server     → exposes contextual capabilities to MCP clients
  MCP client/host → may use both an LLM/model service AND MCP servers
  ```
- Must NOT imply model serving is an MCP-native protocol primitive
- Must NOT conflate inference endpoints with MCP tool resources

---

## Risk Focus Area 6: Editorial Integrity (`/blog/`)

**Gate**: Discovery surface, not evergreen authority.

**Rules**:
- Blog posts must carry publication date and last-updated date
- Evergreen technical claims in blog posts must be verified with sources
- If a blog post begins ranking for an evergreen canonical intent, apply:
  ```text
  KEEP_NEWS_INTENT    — post is time-bound news, keep as-is
  MERGE_INTO_EVERGREEN — canonical info should live in permanent guides
  301_TO_CANONICAL    — blog post duplicates a permanent guide, redirect
  ```
- No blog post should cannibalize permanent guide, glossary, or directory authority

---

## Phase C Exit Gate

```text
PHASE_C_COMPLETE

CODE_EXAMPLES
false/unverified executable claims        0
tested examples properly labeled          PASS
current SDK alignment                     PASS

PROTOCOL
legacy protocol assumptions               0
transport terminology                     PASS
spec freshness                            PASS

DEPLOYMENT
protocol-vs-best-practice separation      PASS
fabricated hosting claims                 0
fabricated SLA/latency claims             0

EDITORIAL
dated claims carry as_of/source           PASS
unsupported ecosystem metrics             0

GLOSSARY
distinct intent ownership                 PASS
definition + context + example            PASS
cross-entity relationships                PASS

BLOG
evergreen cannibalization                 0
unsupported news claims                   0

GLOBAL
FALSE_CRITICAL_CLAIMS                     0
UNSUPPORTED_HIGH_CLAIMS                   0
FABRICATED_COUNTS                         0
CANONICAL_CONFLICTS                       0
```

---

## Phase D Planning (Pre-read)

After Phase C, the program moves to **Phase D: Authority Rollout** — applying the proven standards across 971 legacy indexable URLs:

```text
971 legacy pages
      ↓
entity + intent classification
      ↓
risk scoring (P0/P1/P2)
      ↓
spec freshness check
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

Phase C will produce reusable templates (code example labels, temporal evidence model, deployment separation pattern) that Phase D applies at scale.
