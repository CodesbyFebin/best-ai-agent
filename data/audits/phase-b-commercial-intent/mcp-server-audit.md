# Phase B Audit: /mcp-server/

**Spec version**: 2026-07-28
**Audit date**: 2026-08-08
**Auditor**: Phase B autonomous
**Status**: CURRENT_2026_07_28

## Summary

`/mcp-server/` is the protocol-role page for developers who want to understand how to build or run an MCP server. It is distinct from `/what-is-mcp/` (protocol overview) and `/mcp-server-directory/` (server listing).

## Claims Audit

| # | Claim | Type | Status | Evidence |
|---|-------|------|--------|----------|
| 1 | "MCP servers use a JSON-RPC 2.0 based protocol" | STATEMENT | SUPPORTED | Spec: data layer implements JSON-RPC 2.0 [architecture.md] |
| 2 | "Servers expose tools, resources, and prompts" | STATEMENT | SUPPORTED | Spec: three core server primitives [server-concepts.md] |
| 3 | "Streamable HTTP is the recommended transport for remote servers" | STATEMENT | SUPPORTED | Spec: Streamable HTTP introduced as replacement for HTTP+SSE [streamable-http.md] |
| 4 | "HTTP+SSE transport is deprecated" | STATEMENT | SUPPORTED | Spec: Deprecated since 2025-03-26, classified under lifecycle policy [deprecated.md] |
| 5 | "Servers must implement server/discover" | STATEMENT | SUPPORTED | Spec: discovery is mandatory [architecture.md] |
| 6 | "MCP is stateless — no initialize handshake" | STATEMENT | SUPPORTED | Spec: stateless since 2026-07-28; initialize removed via SEP-2575 [changelog.md] |

## Spec Drift Findings

### Stale concepts removed in 2026-07-28
- **Protocol-level sessions** (`Mcp-Session-Id` header): REMOVED. The spec changelog explicitly removes this in 2026-07-28.
- **GET stream endpoint** for SSE: REMOVED.
- **Root-level `initialize`/`notifications/initialized` handshake**: REMOVED. Replaced by `server/discover` and per-request `_meta`.

### Correct terminology
- **Elicitation**: delivered via MRTR pattern, not server-initiated requests
- **Sampling**: DEPRECATED. New implementations should integrate directly with LLM provider APIs
- **Logging**: DEPRECATED. Log to stderr for stdio; use OpenTelemetry for observability
- **Roots**: DEPRECATED. Pass directories/files via tool parameters, resource URIs, or server config

## Remediation Needed

Any page content referencing:
1. `Mcp-Session-Id` header — must be removed
2. `initialize` handshake as required — must be removed
3. Server-initiated `sampling/createMessage` — must be reworded to MRTR pattern
4. Root-based file discovery as recommended — must reference tool parameters or resource URIs
5. HTTP+SSE as current (not deprecated) — must note deprecation status

## Data Model

No directory data model applies — this is a conceptual/protocol page, not a listing.

## Recommendation

**PASS** — if content aligns with the six SUPPORTED claims above. Update any stale session/handshake/legacy-transport references before promotion to CURRENT.
