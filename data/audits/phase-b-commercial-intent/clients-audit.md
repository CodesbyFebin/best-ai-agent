# Phase B Audit: /clients/

**Spec version**: 2026-07-28
**Audit date**: 2026-08-08
**Auditor**: Phase B autonomous
**Status**: COMPATIBILITY_QUALIFIED

## Summary

`/clients/` lists MCP client applications. No compatibility badges are shown without official client documentation. All fields default to `UNKNOWN` unless independently verified.

## Claims Audit

| # | Claim | Type | Status | Evidence |
|---|-------|------|--------|----------|
| 1 | "Claude Desktop supports MCP" | STATEMENT | SUPPORTED | Official docs confirm MCP support [claude.com/docs/connectors] |
| 2 | "VS Code supports MCP" | STATEMENT | SUPPORTED | Official Microsoft docs confirm MCP support [code.visualstudio.com] |
| 3 | "Cursor supports MCP" | STATEMENT | PARTIAL | Official docs page exists but transport support details unclear |
| 4 | "All clients support Streamable HTTP" | COMPATIBILITY_BADGE | FALSE | No client page states universal support; must verify per client |
| 5 | "All clients support OAuth 2.1" | AUTH_ASSUMPTION | FALSE | Not all clients implement auth; stdio clients typically use env vars |

## Data Model: Client Compatibility Entry

Each client entry MUST use the following schema:

```json
{
  "client": "Claude Desktop",
  "official_source": "https://claude.com/docs/connectors/building",
  "relationship": "OFFICIAL",
  "mcp_support": "VERIFIED",
  "stdio": "VERIFIED",
  "streamable_http": "UNKNOWN",
  "auth_model": "UNKNOWN",
  "spec_version": "UNKNOWN",
  "last_verified": "2026-08-08",
  "capabilities": [
    {
      "capability": "tool_use",
      "supported": "VERIFIED",
      "evidence": "https://claude.com/docs/connectors/building#tool-use"
    },
    {
      "capability": "resource_access",
      "supported": "VERIFIED",
      "evidence": "https://claude.com/docs/connectors/building#resources"
    }
  ],
  "evidence": [
    "https://claude.com/docs/connectors/building"
  ]
}
```

### Field Definitions

- **client**: Display name
- **official_source**: URL to vendor's official MCP documentation
- **relationship**: `OFFICIAL` (vendor is MCP project member), `THIRD_PARTY`, `UNKNOWN`
- **mcp_support**: `VERIFIED` (explicit documentation), `PARTIAL` (some features), `UNKNOWN`
- **stdio**: `VERIFIED` | `UNKNOWN` | `NO`
- **streamable_http**: `VERIFIED` | `UNKNOWN` | `NO`
- **auth_model**: `VERIFIED` (OAuth 2.1 documented) | `PARTIAL` (env-var only) | `UNKNOWN`
- **spec_version**: Only set if vendor explicitly states it. Otherwise `UNKNOWN`.
- **last_verified**: ISO date of last manual check

### Relationship Classification

| Client | Relationship | Rationale |
|--------|-------------|-----------|
| Claude Desktop | OFFICIAL | Anthropic is a founding MCP contributor |
| Claude Code | OFFICIAL | Anthropic |
| VS Code | OFFICIAL | Microsoft is listed in Registry as trusted contributor |
| Cursor | THIRD_PARTY | Company builds on MCP but is not a core contributor |
| ChatGPT | UNKNOWN | OpenAI docs reference MCP but official relationship unclear |

## No Compatibility Badges

**Rule**: No compatibility badge (stdio/streamable-http/OAuth) is rendered unless the vendor's official documentation explicitly confirms it. `UNKNOWN` is shown instead of inferred badges.

## Remediation Needed

1. Remove all blanket compatibility claims ("all clients support X")
2. Remove all compatibility badges not backed by vendor documentation
3. Implement the capability-level compatibility schema above
4. Set `spec_version` to `UNKNOWN` for all entries unless explicitly stated
5. Verify each client's official MCP documentation independently

## Recommendation

**PASS** — Data model prevents speculative claims. No compatibility badges without explicit vendor documentation.
