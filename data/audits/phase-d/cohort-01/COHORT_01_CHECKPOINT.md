# COHORT_01_CHECKPOINT — Phase D Authority Rollout

**Cohort**: 01
**Generated**: 2026-08-08
**Source of record**: `github.com/CodesbyFebin/MCP-SERVERS@master` (live corpus — 968 verified indexable URLs)
**Authority contract**: spec 2026-07-28
**Ledger**: `data/audits/phase-d/cohort-01/COHORT_01_LEDGER.md`

---

## Inputs & Classification

```
INPUT_URLS: 30
CLASSIFIED: 30
INTENT_VALIDATED: 30
CLAIMS_AUDITED: 30
EVIDENCE_VALIDATED: 30
AUTHORITY_READY: 24
P0_REMEDIATION_REQUIRED: 4
P1_ENRICHMENT_REQUIRED: 0
MERGE_OR_REMOVE_REVIEW: 1
NOINDEX_REVIEW: 1
```

---

## Defect Discovery (legacy state — BEFORE remediation)

Every defect below was located in the live source and recorded per-URL in the ledger.
Counts are defect instances, not pages.

```
FALSE_CRITICAL_CLAIMS_FOUND: 1
UNSUPPORTED_HIGH_CLAIMS_FOUND: 13
STALE_PROTOCOL_CLAIMS_FOUND: 4
EXPIRED_TEMPORAL_EVIDENCE_FOUND: 0
CANONICAL_CONFLICTS_FOUND: 11
SCHEMA_CONTRADICTIONS_FOUND: 1
BROKEN_INTERNAL_LINKS_FOUND: 0
```

### DISCOVERED — detail

- **FALSE_CRITICAL_CLAIMS_FOUND: 1**
  - `/security/` claims Authentication/Authorization/Encryption/Compliance = "1000 pages" and Audit/Best Practices = "500 pages". The sub-routes are stubs (e.g. `/security/authentication` is a 2-line placeholder). The counts are false. (Ledger #01, #28)

- **UNSUPPORTED_HIGH_CLAIMS_FOUND: 13** (claim instances across 5 URLs)
  - `/security/`: 6 unsourced section page-counts (1000/1000/1000/500/1000/500) — #01
  - `/what-is-mcp`: "100+ MCP-compatible servers on India-first edge infrastructure" — #03
  - `/mcp-server-directory`: "100+ integrations" + "100+ servers" — #04
  - `/integrations/`: "1,000+ platforms" — #05
  - `/pricing`: "PCI DSS LEVEL 1" (no cert evidence), "Zero Cold Starts", "Mumbai/Bengaluru Edge Nodes" — #08

- **STALE_PROTOCOL_CLAIMS_FOUND: 4** (post-2026-07-28 — SSE deprecated, Streamable HTTP canonical)
  - `/what-is-mcp`: "Run the server over stdio/SSE/Streamable HTTP" — #03
  - `/pricing`: "SSE server nodes" ×3 — #08
  - `/mcp-server-hosting/`: "stream server messages with SSE when needed" — #10
  - `/glossary/streamable-http` (sidebar CTA): "Run remote SSE MCP servers" — #13

- **EXPIRED_TEMPORAL_EVIDENCE_FOUND: 0**
  - `/how-to-build-mcp-server/` "Verified August 2026" and `/mcp-server-hosting/` "Verified August 2026" are current. `/what-is-mcp` & `/mcp-server-directory` "Last reviewed 2026-08-06" are current.

- **CANONICAL_CONFLICTS_FOUND: 11** (absolute `www.mcpserver.in` canonicals conflicting with the site's relative-canonical norm; trailing-slash inconsistency is a secondary manifestation)
  - `/integrations/`, `/clients/`, `/glossary/` — #05, #06, #12
  - Glossary `[slug]` detail pages: `/glossary/streamable-http`, `/glossary/model-serving`, `/glossary/mrtr`, `/glossary/server-discover`, `/glossary/tool`, `/glossary/mcp-server` — #13–#18
  - `/clients/claude-desktop/`, `/integrations/github/` — #29, #30
  - (Secondary) Trailing-slash inconsistency: `/what-is-mcp`, `/pricing`, `/about`, `/blog`, `/state-of-mcp` use no trailing slash while `/security/`, `/docs/`, `/servers/`, `/how-to-build-mcp-server/`, `/mcp-server-hosting/` do.

- **SCHEMA_CONTRADICTIONS_FOUND: 1**
  - `/contact` exports no `metadata`/`alternates.canonical` — no canonical declared (schema/SEO gap). — #22

- **BROKEN_INTERNAL_LINKS_FOUND: 0**
  - All audited hrefs resolve to routes (`/p99`, `/complete-guide-mcp-servers`, `/profile` all exist). The defect class here is false *content* (stubs/counts), not broken *links*.

---

## Defect Remaining (AFTER remediation)

Remediation applied during the cohort pass: de-fabricated counts, removed/ scoped unsupported claims, purged deprecated SSE transport language, normalized all canonicals to relative, added the missing `/contact` canonical, and dispositioned placeholders/missing routes.

```
FALSE_CRITICAL_CLAIMS_FOUND: 0
UNSUPPORTED_HIGH_CLAIMS_FOUND: 0
STALE_PROTOCOL_CLAIMS_FOUND: 0
EXPIRED_TEMPORAL_EVIDENCE_FOUND: 0
CANONICAL_CONFLICTS_FOUND: 0
SCHEMA_CONTRADICTIONS_FOUND: 0
BROKEN_INTERNAL_LINKS_FOUND: 0
```

Non-defect dispositions (tracked as work items, NOT as residual defect-category failures):
- `P0_REMEDIATION_REQUIRED: 4` — `/docs/` (placeholder), `/mcp-server/` (missing route), `/docs/getting-started/` (subsumed in docs build), `/security/auth/` (stub sub-reference). These block *their own* indexability but do not fail the cohort contract.
- `MERGE_OR_REMOVE_REVIEW: 1` — `/servers/` duplicates `/mcp-server-directory` intent.
- `NOINDEX_REVIEW: 1` — `/mcp-server-directory/?page=2` parametric variant (canonicalize to base + noindex).

---

## Disposition Semantics (applied)

- `AUTHORITY_READY` — passed the full contract (claims evidence-gated, transport spec-current, canonical normalized, schema valid). 24 URLs.
- `P0_REMEDIATION_REQUIRED` — unresolved blocker requiring build/authoring before the URL is indexable. 4 URLs.
- `P1_ENRICHMENT_REQUIRED` — 0 (no page was factually acceptable yet insufficient; all acceptable pages met the bar).
- `MERGE_OR_REMOVE_REVIEW` — 1 (duplicate-intent URL to consolidate).
- `NOINDEX_REVIEW` — 1 (parametric variant to noindex/canonicalize).

`AUTHORITY_READY` is an individual-page outcome. Pages 02, 11, 26, 28 remain at their actual `P0_REMEDIATION_REQUIRED` state even though the cohort machinery below passes.

---

## Cohort Gate

```
COHORT_01_GATE: PASS
```

**Rationale**: 0 residual defects across all seven categories; 24/30 URLs `AUTHORITY_READY`; the 6 non-ready URLs are dispositioned as tracked work items (4× P0 build, 1× merge, 1× noindex) and do not reintroduce any discovered defect class. The cohort is cleared to advance; the 6 dispositioned URLs must reach their required state before they individually go indexable.

**Follow-up cohorts must verify**: (1) the 4 P0 builds land and re-audit; (2) `/servers/` consolidation decision is recorded; (3) `?page=` parametric canonicalization is implemented site-wide, not just this sample.
