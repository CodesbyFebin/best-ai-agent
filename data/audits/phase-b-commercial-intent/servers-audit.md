# Phase B Audit: /servers/

**Spec version**: 2026-07-28
**Audit date**: 2026-08-08
**Auditor**: Phase B autonomous
**Status**: INTENT_OWNERSHIP_PASS (intent decision made)

## Summary

`/servers/` is a server listing page. It overlaps significantly with `/mcp-server-directory/`. The Phase B exit gate requires a forced intent decision for this page.

## Intent Decision

**Decision**: Retained as an ecosystem/category hub, NOT a duplicate search UI.

`/servers/` will serve as a curated, categorical view of the MCP server ecosystem:
- Categories: Database, Search, Filesystem, Communication, Development, etc.
- Each category links to the official Registry with pre-filtered queries
- No server entries are maintained locally — all data is pulled from `registry.modelcontextprotocol.io`
- The page is a navigational hub, not a competing directory

Rationale: `/mcp-server-directory/` is the primary Registry-powered listing. `/servers/` provides category-based browsing for users who think in terms of "what kind of server do I need?"

## Claims Audit

| # | Claim | Type | Status | Evidence |
|---|-------|------|--------|----------|
| 1 | "Find MCP servers by category" | STATEMENT | SUPPORTED (future) | Category-based navigation aligns with Registry's `publisher-provided.categories` field |
| 2 | "Download and install any server" | STATEMENT | PARTIAL | Installation method varies: npm, pip, Docker, remote-only. Must specify per-entry. |
| 3 | "All servers are open-source" | STATEMENT | FALSE | Registry explicitly supports both open-source and closed-source servers |

## Data Flow

1. Client loads `/servers/` page
2. Page queries `registry.modelcontextprotocol.io/v0.1/servers?limit=100`
3. Servers are grouped by `publisher-provided.categories`
4. Each category displays: server title, description, transport type, package type
5. Links point to the official Registry entry for detailed info/install instructions

## Content Structure

```
Category: Database
  - PostgreSQL MCP Server → link to registry entry
  - MySQL MCP Server → link to registry entry

Category: Filesystem
  - Local File System → link to registry entry
  - S3 Bucket → link to registry entry
```

## Remediation Needed

1. Remove any locally-maintained server entries
2. Remove claims about all servers being open-source
3. Remove claims about universal installation methods
4. Implement Registry API integration for real-time data
5. Use provenance model from `/mcp-server-directory-audit.md`

## Canonical Decision

**Option A — KEEP DISTINCT.** Both pages provide real information gain with different intents.

```text
/servers/
  Intent: understand/explore MCP server categories
  Canonical: /servers/ (self-canonical)
  Content type: curated category hub with ecosystem context, historical notes,
    and learning-oriented explanations of server roles

/mcp-server-directory/
  Intent: find/filter individual MCP server implementations
  Canonical: /mcp-server-directory/ (self-canonical)
  Content type: searchable/listing interface powered by Registry API
```

### Why not canonicalize?

If `/servers/` canonicalizes to `/mcp-server-directory/`, search engines treat `/servers/` as a duplicate/alternate representation. That defeats the category-hub intent and creates a canonical conflict under the Phase B exit gate. Since both pages serve distinct user intents, both must be self-canonical.

### Cross-linking strategy

- `/servers/` links into `/mcp-server-directory/` category views (passes search context)
- `/mcp-server-directory/` links back to `/servers/` category overview (provides ecosystem context)
- No canonical tags between the two — rel=canonical stays self-referential

## Recommendation

**PASS** — Intent is clear and distinct: `/servers/` is a self-canonical ecosystem/category hub, `/mcp-server-directory/` is a self-canonical searchable Registry listing.
