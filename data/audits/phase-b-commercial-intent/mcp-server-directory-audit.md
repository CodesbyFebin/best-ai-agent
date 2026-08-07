# Phase B Audit: /mcp-server-directory/

**Spec version**: 2026-07-28
**Audit date**: 2026-08-08
**Auditor**: Phase B autonomous
**Status**: DATA_PROVENANCE_PASS (conditional on metadata schema adoption)

## Summary

`/mcp-server-directory/` is a server listing page. Unlike `/servers/` (which may be a duplicate), this page should serve as the ecosystem's entry point to the official MCP Registry.

## Provenance Model

The page must use a two-layer provenance model:

### registry_presence
| Value | Meaning | Source |
|-------|---------|--------|
| `OFFICIAL_REGISTRY` | Server entry fetched from `https://registry.modelcontextprotocol.io/v0.1/servers` | Official MCP Registry API |
| `VENDOR_SOURCE_ONLY` | Server appears on vendor website but is NOT in the official Registry | Vendor URL |
| `COMMUNITY_SOURCE_ONLY` | Server appears in community-maintained lists (e.g., GitHub Awesome-MCP) | Community repo |
| `NOT_VERIFIED` | No reliable source for this entry | Audit note required |

### publisher_relationship
| Value | Meaning |
|-------|---------|
| `OFFICIAL` | The publisher is the same entity behind the server's domain/namespace |
| `COMMUNITY` | Published by community under that namespace; not the commercial entity it integrates with |
| `THIRD_PARTY` | Published by a different entity than the system it integrates with |
| `UNKNOWN` | Cannot determine publisher identity |

**Key distinction**: A server can have `registry_presence: OFFICIAL_REGISTRY` while `publisher_relationship: THIRD_PARTY`. The Registry is community-driven — being listed in it does not make a server "official" from the perspective of the company/service it integrates with.

## Claims Audit

| # | Claim | Type | Status | Evidence |
|---|-------|------|--------|----------|
| 1 | "Listed in the official MCP Registry" | REGISTRY_LISTING | SUPPORTED (conditional) | Registry API returns server at `io.github.{owner}/{name}` format; must verify each entry |
| 2 | "All servers support Streamable HTTP" | PROTOCOL_ASSUMPTION | FALSE | Registry data shows mix of `streamable-http`, `sse`, and `stdio` transports. `sse` is deprecated. |
| 3 | "All servers use OAuth 2.1 authorization" | AUTH_ASSUMPTION | UNKNOWN | Only `Authorization` header in `remotes[].headers` implies auth required; specific flow must be verified per server |

## Registry Data Model

From the OpenAPI spec, each registry entry (`ServerResponse`) contains:

```json
{
  "server": {
    "name": "io.github.user/server-name",
    "title": "Display Name",
    "description": "Short description",
    "version": "1.0.0",
    "websiteUrl": "https://example.com",
    "remotes": [{"type": "streamable-http", "url": "https://mcp.example.com"}],
    "packages": [{
      "registryType": "npm",
      "identifier": "@scope/package",
      "version": "1.0.0",
      "transport": {"type": "stdio"}
    }],
    "repository": {"url": "https://github.com/owner/repo", "source": "github"}
  },
  "_meta": {
    "io.modelcontextprotocol.registry/official": {
      "status": "active",
      "isLatest": true,
      "publishedAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-07-15T00:00:00Z"
    },
    "io.modelcontextprotocol.registry/publisher-provided": {
      "categories": ["search", "database"],
      "publisher": "Company Name"
    }
  }
}
```

## Schema Compliance

Directory listing pages MUST use:
- `CollectionPage` for the page-level schema
- `ItemList` for the server listing
- `BreadcrumbList` for navigation context
- `ItemAvailability` reflecting registry `status` field

No review/rating schema should be applied — the Registry is metadata-only.

## Registry API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `GET /v0.1/servers` | Paginated server list |
| `GET /v0.1/servers/{serverName}/versions/{version}` | Detailed server config |
| `GET /v0/openapi.yaml` | API schema reference |

## Remediation Needed

1. Replace "official MCP server" wording with "listed in the official MCP Registry" unless publisher ownership is independently proven
2. Remove blanket claims about transport or auth support — verify per-entry
3. Add `registry_presence` and `publisher_relationship` fields to each directory entry
4. Implement schema: `CollectionPage` + `ItemList` + `BreadcrumbList`

## Recommendation

**PASS with conditions** — data model is sound, but content must remove partnership assumptions and verify transport/auth per entry rather than asserting blanket compatibility.
