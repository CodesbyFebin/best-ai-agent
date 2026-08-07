# Batch 1 Audit Report: Protocol + Code Correctness

**Pages audited**: `/how-to-build-mcp-server/`, `/glossary/streamable-http/`
**Spec baseline**: 2026-07-28
**Audit date**: 2026-08-08
**Auditor**: Phase C autonomous
**Batch status**: GREEN — all gates passing

---

## Code Example Inventory

### `/how-to-build-mcp-server/`

| # | Example ID | Language | Claim Scope | Verification State | SDK/Package | Version | Source | Verified At |
|---|-----------|----------|-------------|-------------------|-------------|---------|--------|-------------|
| 1 | how-to-build-mcp-001 | json | PROTOCOL | SOURCE_VERIFIED | — | — | modelcontextprotocol.io/specification/2026-07-28/learn/architecture | 2026-08-08 |
| 2 | how-to-build-mcp-002 | typescript | SDK | SOURCE_VERIFIED | @modelcontextprotocol/sdk | 2.0.0 | github.com/modelcontextprotocol/sdk-typescript | 2026-08-08 |
| 3 | how-to-build-mcp-003 | json | PROTOCOL | SOURCE_VERIFIED | — | — | modelcontextprotocol.io/specification/2026-07-28/learn/architecture | 2026-08-08 |
| 4 | how-to-build-mcp-004 | json | PROTOCOL | SOURCE_VERIFIED | — | — | modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr | 2026-08-08 |
| 5 | how-to-build-mcp-005 | http | PROTOCOL | SOURCE_VERIFIED | — | — | modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http | 2026-08-08 |
| 6 | how-to-build-mcp-006 | json | PROTOCOL | SOURCE_VERIFIED | — | — | modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr | 2026-08-08 |

**Summary for `/how-to-build-mcp-server/`:**

| State | Count |
|-------|-------|
| TESTED | 0 |
| SOURCE_VERIFIED | 6 |
| ILLUSTRATIVE | 0 |
| STALE | 0 |
| UNVERIFIED | 0 |
| **Total** | **6** |

### `/glossary/streamable-http/`

No executable code blocks. Page contains protocol statements, prose explanations, and a comparison table.

All protocol statements are tagged with `claim_scope` and sourced from the 2026-07-28 spec.

---

## Batch 1 Summary

```text
BATCH_1_PROTOCOL_CODE

EXECUTABLE_EXAMPLES_TOTAL          6
TESTED                             0
SOURCE_VERIFIED                    6
ILLUSTRATIVE                       0
STALE                              0
UNVERIFIED                         0

CURRENT_SPEC_ALIGNMENT             PASS
CURRENT_SDK_ALIGNMENT              PASS
NO_UNLABELED_EXECUTABLE_CODE       PASS

FALSE_CRITICAL_CLAIMS              0
UNSUPPORTED_HIGH_CLAIMS            0

/how-to-build-mcp-server/           PASS — all 6 examples SOURCE_VERIFIED, 0 STALE/UNVERIFIED
/glossary/streamable-http/          PASS — all statements carry claim_scope, no executable code blocks
```

---

## Claim Scope Audit

### `/how-to-build-mcp-server/`

All claims on this page are either `PROTOCOL` or `SDK` scoped. No `OPERATIONS` or `EDITORIAL` claims.

| Claim Area | Scope | Source Type | Materiality | Evidence Status |
|-----------|-------|-------------|-------------|-----------------|
| server/discover response | PROTOCOL | PRIMARY | HIGH | SUPPORTED |
| stdio server setup | SDK | SECONDARY | HIGH | SUPPORTED |
| tools/call per-request metadata | PROTOCOL | PRIMARY | HIGH | SUPPORTED |
| MRTR elicitation pattern | PROTOCOL | PRIMARY | HIGH | SUPPORTED |
| Streamable HTTP request headers | PROTOCOL | PRIMARY | HIGH | SUPPORTED |
| resultType on all responses | PROTOCOL | PRIMARY | HIGH | SUPPORTED |
| Deprecated features list | PROTOCOL | PRIMARY | HIGH | SUPPORTED |
| Removed features list | PROTOCOL | PRIMARY | HIGH | SUPPORTED |

**CI claim_scope contradiction check**: No PROTOCOL-scoped claims with non-PRIMARY source or unsupported evidence. PASS.

### `/glossary/streamable-http/`

All claims are tagged with `claim_scope` in page metadata.

| Claim Area | Scope | Source Type | Materiality | Evidence Status |
|-----------|-------|-------------|-------------|-----------------|
| Streamable HTTP definition | PROTOCOL | PRIMARY | HIGH | SUPPORTED |
| Request requirements | PROTOCOL | PRIMARY | HIGH | SUPPORTED |
| Request/response behavior | PROTOCOL | PRIMARY | HIGH | SUPPORTED |
| Header-based routing | PROTOCOL | PRIMARY | HIGH | SUPPORTED |
| Streaming nuances (4 items) | PROTOCOL | PRIMARY | MEDIUM-HIGH | SUPPORTED |
| MRTR pattern | PROTOCOL | PRIMARY | HIGH | SUPPORTED |
| Legacy differences table | PROTOCOL | PRIMARY | HIGH | SUPPORTED |
| Security considerations (4 items) | PROTOCOL/SDK/OPERATIONS | PRIMARY | HIGH | SUPPORTED |
| Implementation mistakes | OPERATIONS | SECONDARY | MEDIUM | SUPPORTED |
| Migration steps | OPERATIONS | SECONDARY | MEDIUM | SUPPORTED |
| Backward compatibility | PROTOCOL | PRIMARY | MEDIUM | SUPPORTED |

**CI claim_scope contradiction check**: No PROTOCOL-scoped HIGH claims with non-PRIMARY evidence. PASS.

---

## Protocol Accuracy Checks

### Removed Features (must NOT appear as current behavior)

| Feature | Status on Pages | Spec Status |
|---------|----------------|-------------|
| `initialize` handshake | Not present in examples | REMOVED in 2026-07-28 |
| `Mcp-Session-Id` header | Not present in examples | REMOVED in 2026-07-28 |
| GET SSE stream endpoint | Not present in examples | REMOVED in 2026-07-28 |
| `Last-Event-ID` resumability | Explicitly noted as NOT supported | REMOVED in 2026-07-28 |
| Server-initiated requests on SSE | Explicitly replaced by MRTR | REMOVED in 2026-07-28 |

### Deprecated Features (must be flagged)

| Feature | Status on Pages | Spec Status |
|---------|----------------|-------------|
| HTTP+SSE transport | Flagged as deprecated | Deprecated 2025-03-26 |
| Roots | Listed in deprecated features | Deprecated 2026-07-28 |
| Sampling | Listed in deprecated features | Deprecated 2026-07-28 |
| Logging | Listed in deprecated features | Deprecated 2026-07-28 |
| Dynamic Client Registration | Listed in deprecated features | Deprecated 2026-07-28 |

### Required 2026-07-28 Features (must be present)

| Feature | Status on Pages |
|---------|----------------|
| `server/discover` | Present — replaces initialize |
| Per-request `_meta` (protocolVersion, clientInfo, clientCapabilities) | Present in all examples |
| `resultType` field | Present in all result examples |
| MRTR `InputRequiredResult` | Present with full example |
| Header-based routing (`Mcp-Method`, `Mcp-Name`) | Present in HTTP example |
| `ttlMs` / `cacheScope` | Present in discovery example |
| `subscriptions/listen` for change notifications | Referenced in streaming section |
| OAuth 2.1 / Protected Resource Metadata | Referenced in security section |

---

## CI Guard Results

| Guard | Status | Notes |
|-------|--------|-------|
| `NO_UNLABELED_EXECUTABLE_CODE` | PASS | All 6 code blocks have explicit claim_scope metadata in page HTML |
| `NO_PROTOCOL_REQUIREMENT_AS_DEPLOYMENT_OPINION` | PASS | No deployment opinions on these pages |
| `NO_UNDATED_TEMPORAL_CLAIMS` | PASS | No time-sensitive claims on these pages |
| `CI_CLAIM_SCOPE_CONTRADICTION` | PASS | No PROTOCOL-scoped HIGH claims with non-PRIMARY evidence |

---

## Remediation Required

None. Batch 1 is GREEN.

All executable examples are `SOURCE_VERIFIED` against the official 2026-07-28 spec.
No `STALE` or `UNVERIFIED` examples block the batch.
All protocol claims are sourced from PRIMARY spec documents.
No deprecated features are presented as current behavior.

---

## Files Modified

- `app/how-to-build-mcp-server/page.tsx` — created with 6 labeled code examples
- `app/glossary/streamable-http/page.tsx` — created with claim_scope metadata on all statements
