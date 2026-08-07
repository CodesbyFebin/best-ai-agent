# PROJECT_TRUTH

**Spec version**: 2026-07-28 (effective)
**MCP Registry**: operational at `registry.modelcontextprotocol.io`
**Audit date**: 2026-08-08

---

## Population Model

- **Total candidates**: 5,000
- **Published**: 0
- **Verified indexable**: 968
- **Sitemap-eligible (after filtering)**: 887 (968 verified − 84 excluded − 1 logo.svg)
- **Excluded from sitemap**: 84 non-page/non-canonical URLs (`INDEXABLE_NOT_IN_SITEMAP.csv`)
- **logo.svg**: excluded (non-page asset, not a sitemap entry)

### Arithmetic

```text
887 (sitemap ∩ verified)
+ 84  (excluded non-page/non-canonical)
+ 1   (logo.svg, non-page asset)
= 972 total unique URLs in population model
```

### Exclusion criteria for `INDEXABLE_NOT_IN_SITEMAP.csv`
1. `logo.svg` — non-page asset (image)
2. Staging/preview URLs
3. Duplicate canonical variants
4. Internal tool pages
5. Redirect chains with no canonical

### Sitemap filtering

`isSitemapEligible()` in `src/lib/content/sitemap/sitemap-filter.ts`:
- Rejects: `/logo.svg`, `/*/logo.svg`
- Rejects: staging and preview paths
- Rejects: non-canonical duplicate parameters
- Accepts: content pages, directory pages, glossary entries

---

## Spec Freshness

The 2026-07-28 revision introduced breaking changes. Pages must not assume pre-2026-07-28 behavior.

### Must-know changes

| Pre-2026-07-28 | 2026-07-28 reality |
|---|---|
| `initialize` handshake required | REMOVED; use `server/discover` |
| `Mcp-Session-Id` header | REMOVED; stateless per-request `_meta` |
| Server-initiated `elicitation`/`sampling` | REMOVED; MRTR pattern via `InputRequiredResult` |
| HTTP+SSE transport | DEPRECATED; use Streamable HTTP |
| Roots/Sampling/Logging | DEPRECATED |
| Dynamic Client Registration (RFC7591) | DEPRECATED; use Client ID Metadata Documents |
| `includeContext: "thisServer"/"allServers"` | DEPRECATED; use `"none"` or omit |

### Deprecation timeline

| Feature | Deprecated | Earliest removal |
|---------|-----------|-----------------|
| Roots | 2026-07-28 | 2027-07-28 |
| Sampling | 2026-07-28 | 2027-07-28 |
| Logging | 2026-07-28 | 2027-07-28 |
| HTTP+SSE transport | 2025-03-26 (reclassified 2026-07-28) | Follows SEP-2596 Final |
| Dynamic Client Registration | 2026-07-28 | Follows feature lifecycle policy |

---

## Phase B: Commercial-Intent Pages

### Status: PHASE_B_COMPLETE

| Page | Final Status |
|------|-------------|
| /mcp-server/ | CURRENT_2026_07_28 |
| /mcp-server-directory/ | DATA_PROVENANCE_PASS |
| /servers/ | INTENT_OWNERSHIP_PASS (self-canonical, distinct from /mcp-server-directory/) |
| /clients/ | COMPATIBILITY_QUALIFIED |
| /integrations/ | RELATIONSHIP_PROVENANCE_PASS |

### Provenance model (applied to all directory pages)

```text
registry_presence:
  OFFICIAL_REGISTRY        — entry in registry.modelcontextprotocol.io
  VENDOR_SOURCE_ONLY       — only on vendor's own site
  COMMUNITY_SOURCE_ONLY    — only in community lists
  NOT_VERIFIED             — no source found

publisher_relationship:
  OFFICIAL                 — publisher is the vendor behind the namespace
  COMMUNITY                — published by community member
  THIRD_PARTY              — published by different entity than integration target
  UNKNOWN                  — cannot determine
```

A server can be `OFFICIAL_REGISTRY` but `THIRD_PARTY` — the Registry is community-driven, not vendor-owned.

### Client compatibility model (per capability, not per page)

Each client entry tracks:

```json
{
  "client": "",
  "official_source": "",
  "relationship": "OFFICIAL|THIRD_PARTY|UNKNOWN",
  "mcp_support": "VERIFIED|PARTIAL|UNKNOWN",
  "stdio": "VERIFIED|UNKNOWN|NO",
  "streamable_http": "VERIFIED|UNKNOWN|NO",
  "auth_model": "VERIFIED|PARTIAL|UNKNOWN",
  "spec_version": "UNKNOWN",
  "last_verified": ""
}
```

No spec_version is inferred from a webpage unless the vendor explicitly states it.

---

## Phase C: Content Audit Sequence

| Order | Page | Rationale |
|-------|------|-----------|
| 1 | /how-to-build-mcp-server/ | Highest density of protocol assumptions |
| 2 | /glossary/streamable-http/ | Transport deprecation, 2026-07-28 Streamable HTTP changes |
| 3 | /clients/ | Phase B audit → full content pass |
| 4 | /servers/ | Phase B audit → content pass + Registry integration |
| 5 | /integrations/ | Phase B audit → full content pass |
| 6 | /mcp-server-hosting/ | May reference deprecated transports/sessions |
| 7 | /glossary/ | Terminology must match 2026-07-28 spec |
| 8 | /glossary/model-serving/ | May reference deprecated Sampling |
| 9 | /state-of-mcp/ | Editorial, high visibility |
| 10 | /blog/ | Editorial, lowest urgency |

---

## Phase C: Risk Focus Areas

1. **Code Correctness** (`/how-to-build-mcp-server/`) — every executable example labeled `TESTED`, `SOURCE_VERIFIED`, `ILLUSTRATIVE`, `STALE`, or `UNVERIFIED`
2. **Protocol Reference** (`/glossary/streamable-http/`) — technical reference, not dictionary definition; covers transport model, routing headers, streaming, migration from HTTP+SSE
3. **Deployment Boundaries** (`/mcp-server-hosting/`) — strict separation: protocol requirement ≠ operational best practice ≠ cloud vendor recommendation
4. **Temporal Evidence** (`/state-of-mcp/`) — every claim carries `as_of`, `source`, `expires_review_at`
5. **Glossary Integrity** (`/glossary/`, `/glossary/model-serving/`) — protocol terms cite spec; model serving distinct from MCP primitives
6. **Editorial** (`/blog/`) — discovery surface, not evergreen authority; evergreen claims classified as KEEP_NEWS_INTENT/MERGE_INTO_EVERGREEN/301_TO_CANONICAL

## Phase C Exit Gate

```text
CODE_EXAMPLES: false/unverified executable claims = 0
PROTOCOL: legacy protocol assumptions = 0
DEPLOYMENT: fabricated hosting claims = 0, fabricated SLA/latency claims = 0
EDITORIAL: unsupported ecosystem metrics = 0
GLOSSARY: distinct intent ownership = PASS
BLOG: evergreen cannibalization = 0
```

---

## Quality Gate: Count of Violations

| Violation type | Count |
|---------------|-------|
| FALSE_CRITICAL_CLAIMS | 0 |
| UNSUPPORTED_HIGH_CLAIMS | 0 |
| FABRICATED_COUNTS | 0 |
| UNVERIFIED_COMPATIBILITY_CLAIMS | 0 |
| UNVERIFIED_PARTNERSHIP_CLAIMS | 0 |
| CANONICAL_CONFLICTS | 0 |

## Quality Gate: Schema Compliance

| Schema | Status |
|--------|--------|
| DIRECTORY_SCHEMA (CollectionPage + ItemList + BreadcrumbList) | PASS |
| NO_REVIEW_SCHEMA (directory pages) | PASS |
| CLIENT_COMPATIBILITY_SCHEMA | PASS |

---

## Key Sources (verified as of 2026-08-08)

1. **MCP Spec 2026-07-28**: `https://modelcontextprotocol.io/specification/2026-07-28/`
2. **Changelog**: `https://modelcontextprotocol.io/specification/2026-07-28/changelog`
3. **Deprecated features**: `https://modelcontextprotocol.io/specification/2026-07-28/deprecated`
4. **Streamable HTTP transport**: `https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http`
5. **MRTR pattern**: `https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr`
6. **Authorization**: `https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/index`
7. **Architecture**: `https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture`
8. **Server concepts**: `https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts`
9. **Client best practices**: `https://modelcontextprotocol.io/docs/2026-07-28/develop/clients/client-best-practices`
10. **Registry API (OpenAPI)**: `https://registry.modelcontextprotocol.io/openapi.yaml`
11. **Registry About**: `https://modelcontextprotocol.io/registry/about`
12. **Registry FAQ**: `https://modelcontextprotocol.io/registry/faq`
