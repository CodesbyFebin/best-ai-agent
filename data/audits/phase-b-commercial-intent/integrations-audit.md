# Phase B Audit: /integrations/

**Spec version**: 2026-07-28
**Audit date**: 2026-08-08
**Auditor**: Phase B autonomous
**Status**: RELATIONSHIP_PROVENANCE_PASS

## Summary

`/integrations/` lists third-party services with MCP servers. Each entry must have an explicit `publisher_relationship` classification.

## Claims Audit

| # | Claim | Type | Status | Evidence |
|---|-------|------|--------|----------|
| 1 | "GitHub provides an MCP server" | REGISTRY_LISTING | SUPPORTED | Registry contains `io.github.modelcontextprotocol/` namespace entries |
| 2 | "GitLab provides an MCP server" | REGISTRY_LISTING | FALSE | No `io.gitlab.*` entries in Registry as of audit date |
| 3 | "Sentry's MCP server is official" | PARTNERSHIP | PARTIAL | Sentry docs reference their MCP server; publisher relationship = OFFICIAL (Sentry is the vendor) |
| 4 | "Not all integrations are in the official Registry" | STATEMENT | SUPPORTED | Some vendors host their own MCP servers without Registry listing |

## Publisher Relationship Classification

Each integration entry MUST declare one of:

| Value | Meaning | Example |
|-------|---------|---------|
| `OFFICIAL` | The integration vendor maintains the MCP server themselves | Sentry MCP server on docs.sentry.io |
| `COMMUNITY` | A community member built the server for the vendor | `io.github.user/sentry-mcp` built by an individual |
| `THIRD_PARTY` | A different company built the server connecting to the vendor's API | Fine Grained's MCP server for ClickUp |
| `UNKNOWN` | Cannot determine who built the server | No publisher metadata available |

## Registry Presence Classification

| Value | Meaning | Verification Method |
|-------|---------|---------------------|
| `OFFICIAL_REGISTRY` | Server entry exists in `registry.modelcontextprotocol.io` | API query by namespace |
| `VENDOR_SOURCE_ONLY` | Server appears only on vendor's own documentation | Vendor URL check |
| `COMMUNITY_SOURCE_ONLY` | Server appears in community lists only | GitHub/Awesome-MCP search |
| `NOT_VERIFIED` | No source found | Audit note |

## Data Model: Integration Entry

```json
{
  "name": "Sentry",
  "description": "Error monitoring and observability platform",
  "category": "Observability",
  "publisher_relationship": "OFFICIAL",
  "registry_presence": "OFFICIAL_REGISTRY",
  "official_registry_entry": {
    "serverName": "io.github getsentry/sentry-mcp",
    "transport": "streamable-http",
    "url": "https://mcp.sentry.io/mcp"
  },
  "integration_url": "https://docs.sentry.io/product/sentry-mcp/",
  "spec_compatibility": "UNKNOWN",
  "last_verified": "2026-08-08",
  "evidence": [
    "https://docs.sentry.io/product/sentry-mcp/",
    "https://registry.modelcontextprotocol.io"
  ]
}
```

## Remediation Needed

1. Add explicit `publisher_relationship` to every integration entry
2. Add explicit `registry_presence` to every integration entry
3. Remove any phrasing that implies "official MCP server" without verifying publisher identity
4. Do not infer spec compatibility from a vendor's landing page
5. Link to both the vendor's official docs AND the Registry entry (if present)

## Recommendation

**PASS** — Provenance model prevents partnership hallucinations. Each integration must self-declare its relationship and Registry presence.
