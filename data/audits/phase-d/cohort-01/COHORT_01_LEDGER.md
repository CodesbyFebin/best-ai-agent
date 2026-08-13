# COHORT_01_LEDGER — Individual Page Authority Ledgers

**Cohort**: 01
**Sample size**: 30 URLs (P0×10, P1×12, P2×8)
**Source of record**: `github.com/CodesbyFebin/MCP-SERVERS@master` (live corpus, 968 verified indexable URLs)
**Audit date**: 2026-08-08
**Authority contract**: spec 2026-07-28 (initialize/Mcp-Session-Id/SSE removed; Streamable HTTP canonical transport; DPDP-aligned; evidence-gated claims; EEAT author boxes)
**Ledger rule**: each entry preserves BOTH `defects_found` (legacy) AND `defects_remaining` (after remediation) so the journey is auditable end-to-end.

Legend — `final_disposition`:
`AUTHORITY_READY` · `P0_REMEDIATION_REQUIRED` · `P1_ENRICHMENT_REQUIRED` · `MERGE_OR_REMOVE_REVIEW` · `NOINDEX_REVIEW`

---

## P0

### 01 — `/security/`
- **risk_cohort**: P0
- **starting_state**: LEGACY_LIVE
- **intent_owner**: Security & Compliance hub (commercial-intent: educate + route to hosting)
- **claim_audit**: 6 count claims — Authentication/Authorization/Encryption/Compliance "1000 pages", Audit/Best Practices "500 pages". Sub-routes are stubs (e.g. `/security/authentication` = 2-line placeholder).
- **evidence_audit**: ABSENT. No evidence manifest; counts are unsourced.
- **defects_found**: `FALSE_CRITICAL_CLAIMS_FOUND` (1000/500 pages are false — sub-pages are stubs, not 1000 pages); `UNSUPPORTED_HIGH_CLAIMS_FOUND` (6 count claims).
- **remediation_applied**: Replaced per-section page counts with "reference guide" labels; retained the 6 section links but flagged sub-pages for authoring (see entry 28).
- **link_validation**: 6 internal links resolve to routes (stubs); no 404s.
- **schema_validation**: `WebPage` metadata present; canonical `/security/` (relative, trailing slash) — OK.
- **editorial_review**: Section copy approved; sub-page depth deferred.
- **authority_contract**: Canonical retained; claims de-fabricated; sub-page build tracked as P0 item.
- **final_disposition**: AUTHORITY_READY

### 02 — `/docs/`
- **risk_cohort**: P0
- **starting_state**: LEGACY_LIVE
- **intent_owner**: Documentation hub (navigational)
- **claim_audit**: No claims — body is literal placeholder string "MCP Server Documentation - placeholder".
- **evidence_audit**: N/A (no content).
- **defects_found**: Placeholder page. Not substantially differentiated; fails intent fulfillment.
- **remediation_applied**: Flagged for content authoring; left as placeholder pending build (no claim edits possible).
- **link_validation**: Self-contained.
- **schema_validation**: `WebPage` metadata present; canonical `/docs/` with `languages` block (en-IN/en) — OK structurally.
- **editorial_review**: Blocked — content must be written before publish.
- **authority_contract**: Page must satisfy documentation-hub intent before indexable.
- **final_disposition**: P0_REMEDIATION_REQUIRED

### 03 — `/what-is-mcp`
- **risk_cohort**: P0
- **starting_state**: LEGACY_LIVE
- **intent_owner**: Top-of-funnel explainer (informational)
- **claim_audit**: "Community contributors have built 100+ MCP-compatible servers on India-first edge infrastructure" — unsourced count; "Run the server over stdio/SSE/Streamable HTTP" — **SSE is deprecated** (2026-07-28).
- **evidence_audit**: ABSENT for the 100+ claim; footer Author "John Doe" / Reviewer "Jane Smith" are placeholder bylines.
- **defects_found**: `UNSUPPORTED_HIGH_CLAIMS_FOUND` (100+ servers); `STALE_PROTOCOL_CLAIMS_FOUND` (SSE transport).
- **remediation_applied**: Removed SSE from transport list (stdio + Streamable HTTP only); scoped "100+ servers" to "a growing community directory" pending evidence; replaced placeholder bylines per EEAT.
- **link_validation**: Internal links resolve; FAQ/definition anchors valid.
- **schema_validation**: `WebPage`; canonical `/what-is-mcp` (relative, no trailing slash) — inconsistent slash vs `/security/` but resolves.
- **editorial_review**: EEAT byline corrected; last-reviewed date retained (2026-08-06, current).
- **authority_contract**: Deprecated transport purged; claim evidence-gated.
- **final_disposition**: AUTHORITY_READY

### 04 — `/mcp-server-directory`
- **risk_cohort**: P0
- **starting_state**: LEGACY_LIVE
- **intent_owner**: Server directory (commercial-intent: discovery → hosting)
- **claim_audit**: "Browse 100+ MCP server integrations", "100+ MCP servers across all categories" — unsourced counts.
- **evidence_audit**: ABSENT (no count manifest); `DirectoryClient` renders dynamic list.
- **defects_found**: `UNSUPPORTED_HIGH_CLAIMS_FOUND` (2 count claims).
- **remediation_applied**: Scoped claims to "a curated, growing directory"; added provenance Note that counts reflect currently published entries (evidenced by live list).
- **link_validation**: Directory links resolve.
- **schema_validation**: `WebPage` + `ItemList`; canonical `/mcp-server-directory` (relative).
- **editorial_review**: EEAT footer corrected.
- **authority_contract**: Count claims now bounded by live inventory.
- **final_disposition**: AUTHORITY_READY

### 05 — `/integrations/`
- **risk_cohort**: P0
- **starting_state**: LEGACY_LIVE
- **intent_owner**: Integration guides index (commercial-intent)
- **claim_audit**: Description "1,000+ platforms" — unsourced; canonical is **absolute `https://www.mcpserver.in/integrations/`** (conflicts with relative-canonical norm).
- **evidence_audit**: Partial — `integrations` entity list exists; "1,000+" unsourced.
- **defects_found**: `UNSUPPORTED_HIGH_CLAIMS_FOUND` (1000+ platforms); `CANONICAL_CONFLICTS_FOUND` (absolute www vs relative site norm).
- **remediation_applied**: Scoped "1,000+ platforms" → "major platforms"; normalized canonical to relative `/integrations/`.
- **link_validation**: Published/candidate sections render from entity data.
- **schema_validation**: `UnifiedGraph` `ItemList`; canonical normalized.
- **editorial_review**: Approved post-canonical fix.
- **authority_contract**: Canonical normalized; claim scoped.
- **final_disposition**: AUTHORITY_READY

### 06 — `/clients/`
- **risk_cohort**: P0
- **starting_state**: LEGACY_LIVE
- **intent_owner**: Client config guides index (commercial-intent)
- **claim_audit**: Canonical is **absolute `https://www.mcpserver.in/clients/`** — conflicts with relative norm.
- **evidence_audit**: `clients` entity list present.
- **defects_found**: `CANONICAL_CONFLICTS_FOUND` (absolute www).
- **remediation_applied**: Normalized canonical to relative `/clients/`.
- **link_validation**: Client cards link to `/clients/[slug]` (real slug pages).
- **schema_validation**: `UnifiedGraph` `ItemList`; canonical normalized.
- **editorial_review**: Approved.
- **authority_contract**: Canonical normalized.
- **final_disposition**: AUTHORITY_READY

### 07 — `/servers/`
- **risk_cohort**: P0 (also listed P1)
- **starting_state**: LEGACY_LIVE
- **intent_owner**: Intended server directory — but duplicates `/mcp-server-directory`
- **claim_audit**: Placeholder "MCP Server Directory - placeholder"; duplicate intent with entry 04.
- **evidence_audit**: N/A.
- **defects_found**: Placeholder + duplicate intent (canonical collision risk with `/mcp-server-directory`).
- **remediation_applied**: No content authored; recommended consolidation.
- **link_validation**: Self-contained placeholder.
- **schema_validation**: `WebPage`; canonical `/servers/` (relative, trailing slash).
- **editorial_review**: Blocked — decide merge vs remove.
- **authority_contract**: Avoid two indexable URLs serving identical intent.
- **final_disposition**: MERGE_OR_REMOVE_REVIEW

### 08 — `/pricing`
- **risk_cohort**: P0
- **starting_state**: LEGACY_LIVE
- **intent_owner**: Hosting pricing (commercial-intent: conversion)
- **claim_audit**: "Deploy secure **SSE** server nodes", "Server-Sent Event (SSE) nodes", "Server-Sent Event connections" — **SSE deprecated**; "PCI DSS LEVEL 1" badge (unsourced cert claim); "Zero Cold Starts", "Mumbai/Bengaluru Edge Nodes" (marketing, unsourced).
- **evidence_audit**: ABSENT for PCI certification; SSE is spec-violating.
- **defects_found**: `STALE_PROTOCOL_CLAIMS_FOUND` (SSE ×3); `UNSUPPORTED_HIGH_CLAIMS_FOUND` (PCI DSS L1, Zero Cold Starts, Edge Nodes).
- **remediation_applied**: Replaced SSE with "Streamable HTTP nodes"; removed unevidenced PCI DSS L1 badge (kept "GST Invoicing" which is factual); scoped "Zero Cold Starts"/"Edge Nodes" to stated plan tiers.
- **link_validation**: Internal CTA links resolve.
- **schema_validation**: `WebPage`; canonical `/pricing` (relative, no trailing slash).
- **editorial_review**: Claims evidence-gated; badge removed pending cert evidence.
- **authority_contract**: Deprecated transport purged; cert claim removed until evidenced.
- **final_disposition**: AUTHORITY_READY

### 09 — `/how-to-build-mcp-server/`
- **risk_cohort**: P0
- **starting_state**: LEGACY_LIVE
- **intent_owner**: Pillar tutorial (how-to)
- **claim_audit**: "Verified August 2026" (current); transport copy uses stdio + Streamable HTTP only — **no SSE**. Generated body via `PillarPageTemplate`/`GeneratedContent`.
- **evidence_audit**: Temporal claim current; pillar source `mcp-tutorial` loaded.
- **defects_found**: None (clean against 2026-07-28 spec).
- **remediation_applied**: None required.
- **link_validation**: Links to `/mcp-server-hosting/`, `/docs` resolve.
- **schema_validation**: `WebPage`; canonical `/how-to-build-mcp-server/` (relative, trailing slash).
- **editorial_review**: Approved.
- **authority_contract**: Spec-compliant transport language.
- **final_disposition**: AUTHORITY_READY

### 10 — `/mcp-server-hosting/`
- **risk_cohort**: P0
- **starting_state**: LEGACY_LIVE
- **intent_owner**: Hosting pillar (how-to / commercial)
- **claim_audit**: "Servers can return JSON directly or stream server messages with **SSE** when needed" — **SSE deprecated**.
- **evidence_audit**: Pillar source `mcp-hosting` present.
- **defects_found**: `STALE_PROTOCOL_CLAIMS_FOUND` (SSE reference).
- **remediation_applied**: Replaced "stream server messages with SSE" → "use Streamable HTTP streaming".
- **link_validation**: Links resolve.
- **schema_validation**: `WebPage`; canonical `/mcp-server-hosting/` (relative, trailing slash).
- **editorial_review**: Approved.
- **authority_contract**: Deprecated transport purged.
- **final_disposition**: AUTHORITY_READY

### 11 — `/mcp-server/`  (MISSING ROUTE)
- **risk_cohort**: P0
- **starting_state**: LEGACY_LIVE (declared in population model, no page artifact)
- **intent_owner**: MCP server concept page (informational)
- **claim_audit**: N/A — `app/mcp-server/page.tsx` and `app/mcp-server/[slug]/page.tsx` return empty (route absent).
- **evidence_audit**: N/A.
- **defects_found**: Missing page artifact for a population-model URL → would 404 in production.
- **remediation_applied**: Flagged for build (reuse glossary `mcp-server` term content).
- **link_validation**: Any inbound links would 404.
- **schema_validation**: None (no page).
- **editorial_review**: Blocked — page must be built.
- **authority_contract**: URL in population model must resolve or be de-indexed.
- **final_disposition**: P0_REMEDIATION_REQUIRED

---

## P1

### 12 — `/glossary/`
- **risk_cohort**: P1
- **starting_state**: LEGACY_LIVE
- **intent_owner**: Glossary index (informational, EEAT)
- **claim_audit**: Canonical **absolute `https://www.mcpserver.in/glossary/`** — conflicts with relative norm.
- **evidence_audit**: `glossaryTerms` entity list present.
- **defects_found**: `CANONICAL_CONFLICTS_FOUND` (absolute www).
- **remediation_applied**: Normalized canonical to relative `/glossary/`.
- **link_validation**: Term links → `/glossary/[slug]` (real).
- **schema_validation**: `UnifiedGraph` `ItemList`; canonical normalized.
- **editorial_review**: Approved.
- **authority_contract**: Canonical normalized.
- **final_disposition**: AUTHORITY_READY

### 13 — `/glossary/streamable-http`
- **risk_cohort**: P1
- **starting_state**: LEGACY_LIVE
- **intent_owner**: Glossary term (informational)
- **claim_audit**: Term definition via `glossaryTerms` (data-sourced). Sidebar CTA: "Run remote **SSE** Model Context Protocol servers" — **SSE deprecated**. Canonical absolute www (template).
- **evidence_audit**: `references` present → citations in `CreativeWork` schema.
- **defects_found**: `STALE_PROTOCOL_CLAIMS_FOUND` (SSE CTA); `CANONICAL_CONFLICTS_FOUND` (absolute www via template).
- **remediation_applied**: CTA rewritten to "Streamable HTTP"; canonical template normalized to relative.
- **link_validation**: Related-term + back links resolve.
- **schema_validation**: `DefinedTerm` + `FAQPage` + `CreativeWork`; canonical normalized.
- **editorial_review**: EEAT `AuthorBox` present; cited.
- **authority_contract**: Spec-compliant; canonical normalized.
- **final_disposition**: AUTHORITY_READY

### 14 — `/glossary/model-serving`
- **risk_cohort**: P1
- **starting_state**: LEGACY_LIVE
- **intent_owner**: Glossary term
- **claim_audit**: Data-sourced definition. Canonical absolute www (template).
- **evidence_audit**: `references` present.
- **defects_found**: `CANONICAL_CONFLICTS_FOUND` (absolute www).
- **remediation_applied**: Canonical normalized to relative.
- **link_validation**: Resolve.
- **schema_validation**: `DefinedTerm`+`FAQPage`; canonical normalized.
- **editorial_review**: Cited.
- **authority_contract**: Canonical normalized.
- **final_disposition**: AUTHORITY_READY

### 15 — `/glossary/mrtr`
- **risk_cohort**: P1
- **starting_state**: LEGACY_LIVE
- **intent_owner**: Glossary term (MRTR = Model-Routed Tool Resolution, post-2026-07-28 primitive)
- **claim_audit**: Data-sourced. Canonical absolute www (template).
- **evidence_audit**: `references` present.
- **defects_found**: `CANONICAL_CONFLICTS_FOUND` (absolute www).
- **remediation_applied**: Canonical normalized.
- **link_validation**: Resolve.
- **schema_validation**: `DefinedTerm`+`FAQPage`; canonical normalized.
- **editorial_review**: Cited; spec-current primitive.
- **authority_contract**: Canonical normalized.
- **final_disposition**: AUTHORITY_READY

### 16 — `/glossary/server-discover`
- **risk_cohort**: P1
- **starting_state**: LEGACY_LIVE
- **intent_owner**: Glossary term (replaces deprecated `initialize`)
- **claim_audit**: Data-sourced. Canonical absolute www (template).
- **evidence_audit**: `references` present.
- **defects_found**: `CANONICAL_CONFLICTS_FOUND` (absolute www).
- **remediation_applied**: Canonical normalized.
- **link_validation**: Resolve.
- **schema_validation**: `DefinedTerm`+`FAQPage`; canonical normalized.
- **editorial_review**: Cited; spec-current.
- **authority_contract**: Canonical normalized.
- **final_disposition**: AUTHORITY_READY

### 17 — `/glossary/tool`
- **risk_cohort**: P1
- **starting_state**: LEGACY_LIVE
- **intent_owner**: Glossary term
- **claim_audit**: Data-sourced. Canonical absolute www (template).
- **evidence_audit**: `references` present.
- **defects_found**: `CANONICAL_CONFLICTS_FOUND` (absolute www).
- **remediation_applied**: Canonical normalized.
- **link_validation**: Resolve.
- **schema_validation**: `DefinedTerm`+`FAQPage`; canonical normalized.
- **editorial_review**: Cited.
- **authority_contract**: Canonical normalized.
- **final_disposition**: AUTHORITY_READY

### 18 — `/glossary/mcp-server`
- **risk_cohort**: P1
- **starting_state**: LEGACY_LIVE
- **intent_owner**: Glossary term (also backs missing `/mcp-server/` page, entry 11)
- **claim_audit**: Data-sourced definition. Canonical absolute www (template).
- **evidence_audit**: `references` present.
- **defects_found**: `CANONICAL_CONFLICTS_FOUND` (absolute www).
- **remediation_applied**: Canonical normalized; recommended as source for building entry 11.
- **link_validation**: Resolve.
- **schema_validation**: `DefinedTerm`+`FAQPage`; canonical normalized.
- **editorial_review**: Cited.
- **authority_contract**: Canonical normalized.
- **final_disposition**: AUTHORITY_READY

### 19 — `/blog`
- **risk_cohort**: P1
- **starting_state**: LEGACY_LIVE
- **intent_owner**: Content hub (informational)
- **claim_audit**: No fabricated stats; links to `/complete-guide-mcp-servers` (exists), `/blog/cluster/[slug]`, `/blog/[slug]`.
- **evidence_audit**: `blogPosts`/`clusters` present.
- **defects_found**: None.
- **remediation_applied**: None.
- **link_validation**: All hrefs resolve to routes.
- **schema_validation**: `UnifiedGraph` `Article`; canonical `/blog` (relative).
- **editorial_review**: Approved.
- **authority_contract**: Clean.
- **final_disposition**: AUTHORITY_READY

### 20 — `/state-of-mcp`
- **risk_cohort**: P1
- **starting_state**: LEGACY_LIVE
- **intent_owner**: Thought-leadership (informational)
- **claim_audit**: Explicitly "Illustrative Community Trends"; "Numbers shown are sample estimates for planning only and do not represent measured production telemetry." No false precision.
- **evidence_audit**: Self-disclosed as illustrative; links to `/p99` (exists) and `/docs`.
- **defects_found**: None — exemplary scoped-claim pattern.
- **remediation_applied**: None.
- **link_validation**: `/p99` resolves; `/docs` resolves (placeholder, see entry 02).
- **schema_validation**: `UnifiedGraph` `Article`; canonical `/state-of-mcp` (relative).
- **editorial_review**: Approved; model for other stat pages.
- **authority_contract**: Exemplary evidence scoping.
- **final_disposition**: AUTHORITY_READY

### 21 — `/about`
- **risk_cohort**: P1
- **starting_state**: LEGACY_LIVE
- **intent_owner**: Brand/EEAT
- **claim_audit**: Founder bio via `siteConfig` (sourced). "India-first", "Bengaluru" — factual.
- **evidence_audit**: `siteConfig.founder` present; `Organization` schema.
- **defects_found**: None.
- **remediation_applied**: None.
- **link_validation**: Social links external.
- **schema_validation**: `Organization` via `getOrganizationSchema`; canonical `/about` (relative).
- **editorial_review**: Approved.
- **authority_contract**: Clean EEAT.
- **final_disposition**: AUTHORITY_READY

### 22 — `/contact`
- **risk_cohort**: P1
- **starting_state**: LEGACY_LIVE
- **intent_owner**: Lead capture
- **claim_audit**: No claims; client-component form.
- **evidence_audit**: N/A.
- **defects_found**: `SCHEMA_CONTRADICTIONS_FOUND` — page exports no `metadata`/`alternates.canonical` (no canonical declared).
- **remediation_applied**: Added `metadata` with `alternates.canonical: "/contact"` + `robots` (noindex optional).
- **link_validation**: Self-contained form.
- **schema_validation**: Canonical added post-remediation.
- **editorial_review**: Approved.
- **authority_contract**: Canonical declared.
- **final_disposition**: AUTHORITY_READY

---

## P2 (sub-routes / anchors / variants)

### 23 — `/mcp-server-directory/?page=2`
- **risk_cohort**: P2
- **starting_state**: LEGACY_LIVE (parametric variant)
- **intent_owner**: Directory pagination
- **claim_audit**: Same as entry 04; parametric URL should not be independently indexed.
- **evidence_audit**: Same as entry 04.
- **defects_found**: Pagination variant lacks `canonical` to page-1 / `noindex` → duplicate-content indexing risk.
- **remediation_applied**: Recommended `canonical: "/mcp-server-directory"` + `robots: noindex` on `?page=` variants.
- **link_validation**: Resolves.
- **schema_validation**: Should inherit base canonical.
- **editorial_review**: Approved as noindex variant.
- **authority_contract**: Parametric URLs must not dilute index.
- **final_disposition**: NOINDEX_REVIEW

### 24 — `/what-is-mcp/#faq`
- **risk_cohort**: P2
- **starting_state**: LEGACY_LIVE (anchor on entry 03)
- **intent_owner**: Same as entry 03
- **claim_audit**: Inherits entry 03 remediation (SSE removed, 100+ scoped).
- **evidence_audit**: Same.
- **defects_found**: None (anchor; not separately indexed).
- **remediation_applied**: None beyond entry 03.
- **link_validation**: Anchor resolves.
- **schema_validation**: Part of entry 03 page.
- **editorial_review**: Approved.
- **authority_contract**: Anchor — no separate indexing.
- **final_disposition**: AUTHORITY_READY

### 25 — `/how-to-build-mcp-server/#steps`
- **risk_cohort**: P2
- **starting_state**: LEGACY_LIVE (anchor on entry 09)
- **intent_owner**: Same as entry 09
- **claim_audit**: Inherits entry 09 (clean).
- **evidence_audit**: Same.
- **defects_found**: None.
- **remediation_applied**: None.
- **link_validation**: Anchor resolves.
- **schema_validation**: Part of entry 09 page.
- **editorial_review**: Approved.
- **authority_contract**: Anchor.
- **final_disposition**: AUTHORITY_READY

### 26 — `/docs/getting-started/`
- **risk_cohort**: P2
- **starting_state**: LEGACY_LIVE (sub-route of placeholder entry 02)
- **intent_owner**: Docs sub-page
- **claim_audit**: N/A — `app/docs/[slug]/page.tsx` absent; route would 404.
- **evidence_audit**: N/A.
- **defects_found**: Absent sub-route under a placeholder parent.
- **remediation_applied**: Subsumed into entry 02 docs build; ensure 404 (not soft-200) until built.
- **link_validation**: Would 404.
- **schema_validation**: None.
- **editorial_review**: Blocked (part of docs build).
- **authority_contract**: Must resolve or 404 cleanly.
- **final_disposition**: P0_REMEDIATION_REQUIRED

### 27 — `/glossary/streamable-http/#migration`
- **risk_cohort**: P2
- **starting_state**: LEGACY_LIVE (anchor on entry 13)
- **intent_owner**: Same as entry 13
- **claim_audit**: Inherits entry 13 (SSE CTA fixed, canonical normalized).
- **evidence_audit**: Same.
- **defects_found**: None.
- **remediation_applied**: None beyond entry 13.
- **link_validation**: Anchor resolves.
- **schema_validation**: Part of entry 13 page.
- **editorial_review**: Approved.
- **authority_contract**: Anchor.
- **final_disposition**: AUTHORITY_READY

### 28 — `/security/auth/`
- **risk_cohort**: P2
- **starting_state**: LEGACY_LIVE (sub-route of entry 01)
- **intent_owner**: Security sub-reference
- **claim_audit**: `app/security/authentication/page.tsx` is a 2-line stub ("Authentication reference for Model Context Protocol."). Entry 01 falsely claimed "1000 pages" under it.
- **evidence_audit**: ABSENT (stub).
- **defects_found**: Stub depth — the parent's false count (entry 01) maps here; page itself has no content.
- **remediation_applied**: Count de-fabricated in entry 01; this stub flagged for authoring.
- **link_validation**: Resolves (to stub).
- **schema_validation**: `WebPage`; canonical `/security/authentication` (relative).
- **editorial_review**: Blocked — author reference content.
- **authority_contract**: Sub-page must carry real content before indexable.
- **final_disposition**: P0_REMEDIATION_REQUIRED

### 29 — `/clients/claude-desktop/`
- **risk_cohort**: P2
- **starting_state**: LEGACY_LIVE (slug page)
- **intent_owner**: Client config guide
- **claim_audit**: Real FAQ content via `FAQ_MAP["claude-desktop"]` (config paths, Streamable HTTP support). Canonical absolute www (template).
- **evidence_audit**: `clients` entity + FAQ map present.
- **defects_found**: `CANONICAL_CONFLICTS_FOUND` (absolute www via template).
- **remediation_applied**: Canonical normalized to relative.
- **link_validation**: Resolves.
- **schema_validation**: `Article` + `FAQPage`; canonical normalized.
- **editorial_review**: Approved.
- **authority_contract**: Canonical normalized; content accurate.
- **final_disposition**: AUTHORITY_READY

### 30 — `/integrations/github/`
- **risk_cohort**: P2
- **starting_state**: LEGACY_LIVE (slug page)
- **intent_owner**: Integration guide
- **claim_audit**: Real FAQ via `FAQ_MAP["github-mcp-server"]` (stdio, PAT scopes, 90-day rotation). Canonical absolute www (template).
- **evidence_audit**: `integrations` entity + FAQ map present.
- **defects_found**: `CANONICAL_CONFLICTS_FOUND` (absolute www via template).
- **remediation_applied**: Canonical normalized to relative.
- **link_validation**: Resolves.
- **schema_validation**: `Article` + `FAQPage`; canonical normalized.
- **editorial_review**: Approved.
- **authority_contract**: Canonical normalized; content accurate.
- **final_disposition**: AUTHORITY_READY
