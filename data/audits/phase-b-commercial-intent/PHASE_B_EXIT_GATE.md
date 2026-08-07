# Phase B Exit Gate

**Spec version**: 2026-07-28
**Date**: 2026-08-08
**Status**: PHASE_B_COMPLETE

---

## Exit Criteria

```
PHASE_B_COMPLETE

/mcp-server/              CURRENT_2026_07_28
/mcp-server-directory/    DATA_PROVENANCE_PASS
/servers/                 INTENT_OWNERSHIP_PASS
/clients/                 COMPATIBILITY_QUALIFIED
/integrations/            RELATIONSHIP_PROVENANCE_PASS

FALSE_CRITICAL_CLAIMS              0
UNSUPPORTED_HIGH_CLAIMS            0
FABRICATED_COUNTS                  0
UNVERIFIED_COMPATIBILITY_CLAIMS    0
UNVERIFIED_PARTNERSHIP_CLAIMS      0
CANONICAL_CONFLICTS                0
DIRECTORY_SCHEMA                   PASS
```

---

## Page-by-Page Status

### /mcp-server/
- **Status**: CURRENT_2026_07_28
- **Spec alignment**: Stateless core (no `initialize` handshake), `server/discover` mandatory, per-request `_meta`
- **Deprecated features removed from recommendations**: HTTP+SSE transport, Roots, Sampling, Logging
- **Stale references removed**: `Mcp-Session-Id` header, GET SSE stream endpoint
- **Audit**: `data/audits/phase-b-commercial-intent/mcp-server-audit.md`

### /mcp-server-directory/
- **Status**: DATA_PROVENANCE_PASS
- **Provenance model**: `registry_presence` + `publisher_relationship` fields on every entry
- **Data source**: Official MCP Registry API (`registry.modelcontextprotocol.io/v0.1/servers`)
- **Wording**: "Listed in the official MCP Registry" (not "official MCP server") unless publisher ownership proven
- **Schema**: `CollectionPage` + `ItemList` + `BreadcrumbList`
- **Audit**: `data/audits/phase-b-commercial-intent/mcp-server-directory-audit.md`

### /servers/
- **Status**: INTENT_OWNERSHIP_PASS
- **Intent**: Curated ecosystem/category hub (distinct from /mcp-server-directory/)
- **Canonical**: Self-canonical — `/servers/` → `/servers/` (NOT canonicalized to `/mcp-server-directory/`)
- **Rationale**: Different user intent (category understanding vs. implementation search) warrants self-canonical
- **Cross-linking**: `/servers/` links into `/mcp-server-directory/` category views; `/mcp-server-directory/` links back for ecosystem context
- **Audit**: `data/audits/phase-b-commercial-intent/servers-audit.md`

### /clients/
- **Status**: COMPATIBILITY_QUALIFIED
- **No badges without vendor docs**: Compatibility claims require explicit vendor documentation
- **Capability-level tracking**: `stdio`, `streamable_http`, `auth_model`, capabilities array
- **`spec_version`**: `UNKNOWN` unless vendor explicitly states it
- **Audit**: `data/audits/phase-b-commercial-intent/clients-audit.md`

### /integrations/
- **Status**: RELATIONSHIP_PROVENANCE_PASS
- **Explicit classification**: Every entry has `publisher_relationship` (OFFICIAL/COMMUNITY/THIRD_PARTY/UNKNOWN)
- **Explicit registry presence**: Every entry has `registry_presence` (OFFICIAL_REGISTRY/VENDOR_SOURCE_ONLY/COMUNITY_SOURCE_ONLY/NOT_VERIFIED)
- **Audit**: `data/audits/phase-b-commercial-intent/integrations-audit.md`

---

## Spec Key Facts (Verified as of 2026-08-08)

### 2026-07-28 Protocol Changes
1. **Stateless core**: `initialize`/`notifications/initialized` handshake REMOVED (SEP-2575)
2. **`server/discover`**: New mandatory discovery RPC method
3. **No protocol-level sessions**: `Mcp-Session-Id` header REMOVED
4. **MRTR pattern**: Server-to-client requests via `InputRequiredResult` (SEP-2322)
5. **Header-based routing**: `Mcp-Method`, `Mcp-Name` headers required on Streamable HTTP
6. **Cache hints**: `ttlMs` and `cacheScope` on list/read results (SEP-2549)
7. **Removed SSE resumability**: No `Last-Event-ID` support
8. **`resultType`** required on all results: `"complete"` or `"input_required"`

### Deprecated Features (2026-07-28)
- **Roots** (client/roots): Migrate to tool parameters, resource URIs, or server config
- **Sampling** (client/sampling): Migrate to direct LLM provider API integration
- **Logging** (server/utilities/logging): Migrate to stderr or OpenTelemetry
- **HTTP+SSE transport** (from 2024-11-05): Migrate to Streamable HTTP
- **`includeContext` "thisServer"/"allServers"** (from 2025-11-25): Omit or use `"none"`
- **OAuth 2.0 Dynamic Client Registration** (RFC7591): Migrate to Client ID Metadata Documents

### Spec-Deprecation Timeline
- Roots, Sampling, Logging deprecated: 2026-07-28, earliest removal 2027-07-28
- HTTP+SSE deprecated: 2025-03-26 (reclassified under lifecycle policy in 2026-07-28), removal follows SEP-2596 Final
- `includeContext` values deprecated: 2025-11-25, removal follows Sampling

### Authorization (OAuth 2.1)
- **RFC 9207** `iss` parameter: Servers SHOULD include; clients MUST validate
- **Resource parameter** (RFC 8707): Required in authorization and token requests
- **Protected Resource Metadata** (RFC 9728): Servers MUST implement; clients MUST use for discovery
- **Client ID Metadata Documents**: Preferred over Dynamic Client Registration
- **Scope challenge handling**: `403 Forbidden` with `insufficient_scope`

### Extensions
- **Tasks**: Moved from core protocol to official extension (`io.modelcontextprotocol/tasks`)
- **Extensions system**: Optional, additive, composable (SEP-2133)

### Transport Support
- **stdio** (local): JSON-RPC over stdin/stdout, no auth (credentials from environment)
- **Streamable HTTP** (remote): POST-based, SSE streaming, OAuth 2.1, header-based routing
- **HTTP+SSE** (deprecated): Replaced by Streamable HTTP

---

## Data Model Files

| File | Purpose |
|------|---------|
| `data/schemas/directory-entry.schema.ts` | Directory listing entry with `registry_presence` and `publisher_relationship` |
| `data/schemas/client-compatibility.schema.ts` | Client compatibility at capability level |
| `data/schemas/claim.schema.ts` | Substantive claim tracking with spec_compatibility |
| `data/audits/phase-b-commercial-intent/*.md` | Five audit reports |

---

## Logo.svg Exclusion

`logo.svg` has been removed from the sitemap population model. Non-page assets (images, icons, favicon) are excluded from HTML sitemap entries. Only content pages and canonical document URLs are included.

---

## Quality Gate Checklist

| Check | Status |
|-------|--------|
| No false critical claims on commercial-intent pages | PASS |
| No unsupported high claims on commercial-intent pages | PASS |
| No fabricated counts on commercial-intent pages | PASS |
| No unverified compatibility claims on /clients/ | PASS |
| No unverified partnership claims on /integrations/ | PASS |
| Canonical conflicts resolved (/servers/ self-canonical, /mcp-server-directory/ self-canonical) | PASS |
| Directory schema: CollectionPage + ItemList + BreadcrumbList | PASS |
| `registry_presence` field on all directory entries | PASS |
| `publisher_relationship` field on all integration entries | PASS |
| `logo.svg` excluded from sitemap population | PASS |
