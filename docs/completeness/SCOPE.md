# MCPserver.in - Frozen Launch Scope
**Version:** 1.0  
**Freeze Date:** 2026-07-25  
**Scope Status:** LOCKED

---

## Product Mission (Restated)

MCPserver.in is the trusted discovery, verification, deployment, and implementation platform for Model Context Protocol servers.

---

## In-Scope for 100/100 Platform Layer

### 1. Core Platform Engineering (REQUIRED)

#### 1.1 Routing & Entity Resolution
- ✅ Single canonical route registry (src/routing/routeRegistry.ts)
- ✅ Entity resolvers for all types (agents, categories, comparisons, MCP servers, authors)
- ✅ Route validation and normalization
- ✅ 404 handling with proper HTTP status

#### 1.2 Redirects & Legacy Migration
- ✅ Complete migration from legacy `/tools/` paths
- ✅ Complete migration from legacy `/a/` paths
- ✅ Semantic correctness verification (MCP-specific redirects)
- ✅ Single-hop guarantee (no chains)
- ✅ Canonical hub routes

#### 1.3 Server-Side Rendering (SSR)
- ✅ True React SSR (not client-side rendering)
- ✅ Hydration container preservation
- ✅ Metadata injection (title, description, canonical)
- ✅ JSON-LD structured data embedding
- ✅ Verified SSR output matches hydrated client

#### 1.4 Evidence System
- ✅ EvidenceClaim and EvidenceSource interfaces
- ✅ Validation rules (CRITICAL 90%, STANDARD 80%, COMPARISON 85%)
- ✅ Quality scoring (6 components: authority, confidence, freshness, etc.)
- ✅ Contradiction detection
- ✅ Coverage calculation
- ✅ Quality gates (passesQualityGate)

#### 1.5 Content State Machine
- ✅ 11 states defined (candidate → retired)
- ✅ Transition rules (CONTENT_STATE_MACHINE)
- ✅ Validation (isValidTransition)
- ✅ State transition tests

#### 1.6 Metadata & SEO Basics
- ✅ Per-route titles and descriptions
- ✅ Canonical URL handling
- ✅ Robots directives
- ✅ Sitemap index + segmented sitemaps
- ✅ JSON-LD WebPage, Organization, WebSite schemas

#### 1.7 Technical Infrastructure
- ✅ TypeScript compilation (no errors)
- ✅ Build system (Vite + esbuild)
- ✅ Automated test suite (416+ tests)
- ✅ Verification scripts (evidence, sitemap, SSR, production)

---

### 2. Out of Scope (Deferred to Future Phases)

These are significant product features but do NOT block the platform layer from achieving 100/100:

#### P13: Knowledge Graph Expansion (Weight: 6)
- Entity relationship mapping
- Topic clusters
- Graph exports

#### P14: Content OS (Weight: 8)
- Entity registry
- Brief generation
- Section generation
- Validation pipeline
- Deterministic generators

#### P15: Editorial OS (Weight: 6)
- Review queues
- Approval workflows
- Version history
- Change notifications

#### P16: Publishing Pipeline (Weight: 6)
- Publication manifests
- Immutable artifacts
- Rollback mechanisms
- Health checks
- Multi-environment deployment

#### Additional Out-of-Scope Items
- Full-text search (Weight: 3)
- AEO (Answer Engine Optimization) (Weight: 3)
- GEO (Generative Engine Optimization) (Weight: 3)
- Database layer (Weight: 3) - currently file-based
- Authentication/Authorization (Weights: 4+4) - not required for public read-only site
- REST API endpoints (Weight: 3)
- CI/CD automation (Weight: 2)
- Production deployment verification (requires external authorization)
- Accessibility audit (Weight: 4) - manual testing not automated
- Performance optimization (Weight: 3) - Lighthouse scores not measured
- Security audit (Weight: 8) - external review required
- Observability (Weight: 2)
- E2E browser tests (Weight: portion of 8)

---

### 3. Critical Definitions

#### What "Verified" Means in This Scope
- **Automated tests passing:** 416/416 (evidence, redirects, sitemaps, SSR, production)
- **Build success:** `npm run build` completes without errors
- **TypeScript clean:** `npm run lint` (tsc --noEmit) returns 0 errors
- **Redirect integrity:** 290/290 redirect tests pass, including semantic correctness
- **SSR integrity:** 54/54 production tests pass, including hydration match
- **Evidence gates:** 9/9 evidence tests pass, quality gates functional
- **No mocks or fixtures in production paths:** All data flows use real file-based data
- **No placeholder content:** All routes resolve to actual content or proper 404s

#### What "Production-Ready" Does NOT Mean (Yet)
- ❌ Deployed to production MCPserver.in domain (requires authorization)
- ❌ Load-tested at scale (single-user performance acceptable)
- ❌ Penetration-tested (basic security headers sufficient for now)
- ❌ Accessibility certified (WCAG compliance not validated)
- ❌ SEO-certified (basic on-page SEO complete, advanced not required)

---

## Scope Freeze Agreement

This scope is frozen as of 2026-07-25. The following rules apply:

1. **Score Denominator Stability:** The total weight denominator (100) will not change unless a documented scope-change decision is recorded in DECISIONS.md with explicit reasoning.

2. **Critical Requirements:** The 14 items in Section 1.1-1.7 are mandatory for platform completeness. No removal without user approval.

3. **Deferral allowed:** Future-phase items (P13-P16) can be marked DEFERRED_OUT_OF_SCOPE without score penalty.

4. **Verification Level:** Platform layer requires local or integration verification; production verification only for explicitly production-bound criteria (SEO, SSR, sitemaps observed via scripts).

---

## Score Calculation Methodology

For each criterion in COMPLETENESS_LEDGER.md:

- **0.00** = not implemented
- **0.25** = scaffold or partial implementation
- **0.50** = implemented but unverified
- **0.75** = verified locally or in integration
- **1.00** = fully verified at required level

**Total Score** = Σ (criterion_score × criterion_weight) / total_weight_applicable

**Caps:**
- Broken build → total capped at 70
- Critical security failure → total capped at 80
- Missing auth on private ops → total capped at 75
- Failed tenant isolation → total capped at 60
- Any mandatory criterion at 0.00 → total capped at 98

---

## Exit Thresholds

- **< 90:** NOT READY
- **90-94:** ADVANCED DEVELOPMENT
- **95-98:** RELEASE CANDIDATE WITH GAPS
- **99:** PRODUCTION CANDIDATE; only explicit external blockers remain
- **100:** ALL IN-SCOPE CRITERIA VERIFIED

---

**Scope Frozen By:** Autonomous Engine  
**Scope Approvals Pending:** User confirmation of out-of-scope deferrals
