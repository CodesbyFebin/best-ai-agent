# Batch 2 Audit Report: Deployment + Conceptual Boundaries

**Pages audited**: `/mcp-server-hosting/`, `/glossary/model-serving/`
**Spec baseline**: 2026-07-28
**Audit date**: 2026-08-08
**Auditor**: Phase C autonomous
**Batch status**: GREEN — all gates passing

---

## Semantic Boundary Enforcement

### `/mcp-server-hosting/`

All claims carry `claim_scope`. No statement conflates protocol requirement with deployment recommendation.

| Claim Area | Claim Scope | Source Type | Materiality | Evidence Status |
|-----------|-------------|-------------|-------------|-----------------|
| Streamable HTTP single POST endpoint | PROTOCOL | PRIMARY | HIGH | SUPPORTED |
| Required headers (MCP-Protocol-Version, Mcp-Method, Mcp-Name) | PROTOCOL | PRIMARY | HIGH | SUPPORTED |
| Origin header validation | PROTOCOL | PRIMARY | HIGH | SUPPORTED |
| Localhost binding recommendation | OPERATIONS | PRIMARY | MEDIUM | SUPPORTED |
| OAuth 2.1 / Protected Resource Metadata | PROTOCOL | PRIMARY | HIGH | SUPPORTED |
| Bearer token validation | PROTOCOL | PRIMARY | HIGH | SUPPORTED |
| Audience-bound token validation | PROTOCOL | PRIMARY | MEDIUM | SUPPORTED |
| TLS-terminating reverse proxy | OPERATIONS | SECONDARY | MEDIUM | SUPPORTED |
| X-Accel-Buffering: no | OPERATIONS | SECONDARY | MEDIUM | SUPPORTED |
| Keep-alive comment lines | OPERATIONS | SECONDARY | LOW | SUPPORTED |
| Health check endpoints | OPERATIONS | SECONDARY | MEDIUM | SUPPORTED |
| Process managers / orchestration | OPERATIONS | SECONDARY | MEDIUM | SUPPORTED |
| stderr / OpenTelemetry logging | OPERATIONS | SECONDARY | LOW | SUPPORTED |
| stdio transport characteristics | PROTOCOL | PRIMARY | HIGH | SUPPORTED |
| Streamable HTTP transport characteristics | PROTOCOL | PRIMARY | HIGH | SUPPORTED |
| What is NOT an MCP requirement | EDITORIAL | SECONDARY | MEDIUM | SUPPORTED |
| Common deployment mistakes | OPERATIONS | SECONDARY | MEDIUM | SUPPORTED |

**CI claim_scope contradiction check**: No PROTOCOL-scoped HIGH claims with non-PRIMARY evidence. PASS.

**Fabricated claims audit**: No invented latency, SLA, residency, region, scalability, or provider claims. PASS.

### `/glossary/model-serving/`

All claims carry `claim_scope`. Clear distinction between model serving and MCP server functionality.

| Claim Area | Claim Scope | Source Type | Materiality | Evidence Status |
|-----------|-------------|-------------|-------------|-----------------|
| Model serving definition | DEFINITION | SECONDARY | HIGH | SUPPORTED |
| Model serving vs MCP server table | DEFINITION | SECONDARY | HIGH | SUPPORTED |
| MCP relevance (model serving not a primitive) | PROTOCOL | PRIMARY | HIGH | SUPPORTED |
| Role composition (model serving + MCP server + MCP client) | PROTOCOL | PRIMARY | MEDIUM | SUPPORTED |
| Conceptual code example | ILLUSTRATIVE | INFERRED | LOW | SUPPORTED (labeled non-executable) |
| What model serving is NOT | DEFINITION | SECONDARY | MEDIUM | SUPPORTED |
| Primary sources | EDITORIAL | PRIMARY | LOW | SUPPORTED |

**CI claim_scope contradiction check**: No PROTOCOL-scoped HIGH claims with non-PRIMARY evidence. PASS.

---

## Code Example Inventory

### `/mcp-server-hosting/`

No executable code blocks.

| State | Count |
|-------|-------|
| TESTED | 0 |
| SOURCE_VERIFIED | 0 |
| ILLUSTRATIVE | 0 |
| STALE | 0 |
| UNVERIFIED | 0 |
| **Total** | **0** |

### `/glossary/model-serving/`

| # | Example ID | Language | Claim Scope | Verification State | SDK/Package | Version | Source | Verified At |
|---|-----------|----------|-------------|-------------------|-------------|---------|--------|-------------|
| 1 | glossary-model-serving-001 | typescript | ILLUSTRATIVE | ILLUSTRATIVE | — | — | Inferred from spec | 2026-08-08 |

**Summary for `/glossary/model-serving/`:**

| State | Count |
|-------|-------|
| TESTED | 0 |
| SOURCE_VERIFIED | 0 |
| ILLUSTRATIVE | 1 |
| STALE | 0 |
| UNVERIFIED | 0 |
| **Total** | **1** |

---

## Batch 2 Summary

```text
BATCH_2_DEPLOYMENT_CONCEPTUAL

EXECUTABLE_EXAMPLES_TOTAL          1
TESTED                             0
SOURCE_VERIFIED                    0
ILLUSTRATIVE                       1
STALE                              0
UNVERIFIED                         0

PROTOCOL_VS_OPERATIONS_BOUNDARY    PASS
MODEL_SERVING_BOUNDARY             PASS
FABRICATED_HOSTING_CLAIMS          0
FABRICATED_SLA_LATENCY_CLAIMS      0

FALSE_CRITICAL_CLAIMS              0
UNSUPPORTED_HIGH_CLAIMS            0

/mcp-server-hosting/                PASS — all claims scoped, no fabricated hosting claims
/glossary/model-serving/            PASS — model serving clearly distinguished from MCP
```

---

## Semantic Boundary Verification

### `/mcp-server-hosting/`

**Protocol requirements (PROTOCOL scope, PRIMARY source):**
- Streamable HTTP: single POST endpoint
- Required headers: MCP-Protocol-Version, Mcp-Method, Mcp-Name
- Origin header validation
- Localhost binding (SHOULD, local only)
- OAuth 2.1 / Protected Resource Metadata
- Bearer token validation
- Audience-bound token validation

**Operational recommendations (OPERATIONS scope):**
- TLS-terminating reverse proxy
- X-Accel-Buffering: no
- Keep-alive comment lines
- Health check endpoints
- Process managers / orchestration
- stderr / OpenTelemetry logging

**Deployment context (EDITORIAL scope):**
- "What is NOT an MCP requirement" section explicitly lists cloud providers, regions, SLAs, etc.

**No invented claims:** No specific cloud providers, regions, latency targets, availability SLAs, or scalability claims. PASS.

### `/glossary/model-serving/`

**Model serving clearly distinguished from MCP:**
- Model serving: runs/exposes inference models
- MCP server: exposes contextual capabilities to MCP clients
- MCP client/host: may use both an LLM/model service AND MCP servers
- These roles are related but not interchangeable

**No conflation:** The page does NOT imply model serving is an MCP-native protocol primitive. PASS.

---

## CI Guard Results

| Guard | Status | Notes |
|-------|--------|-------|
| `NO_UNLABELED_EXECUTABLE_CODE` | PASS | 1 code block, labeled ILLUSTRATIVE |
| `NO_PROTOCOL_REQUIREMENT_AS_DEPLOYMENT_OPINION` | PASS | All protocol requirements sourced from PRIMARY spec; operational items labeled OPERATIONS |
| `NO_UNDATED_TEMPORAL_CLAIMS` | PASS | No time-sensitive claims |
| `CI_CLAIM_SCOPE_CONTRADICTION` | PASS | No PROTOCOL-scoped HIGH claims with non-PRIMARY evidence |

---

## Remediation Required

None. Batch 2 is GREEN.

All protocol requirements are sourced from the 2026-07-28 spec.
Operational recommendations are clearly labeled and separated from protocol requirements.
No fabricated hosting, SLA, latency, residency, region, or provider claims.
Model serving is clearly distinguished from MCP server functionality.

---

## Files Modified

- `app/mcp-server-hosting/page.tsx` — created with PROTOCOL/OPERATIONS/EDITORIAL claim scopes
- `app/glossary/model-serving/page.tsx` — created with model serving vs MCP distinction
