# MCPserver.in - Key Architecture Decisions
**Version:** 1.0  
**Period:** 2026-07-23 to 2026-07-25

---

## Decision Log

### ADR-001: Single Canonical Route Registry
**Problem:** Routes were scattered, leading to duplicate definitions and inconsistencies.
**Decision:** Centralize all routes in `src/routing/routeRegistry.ts`. This is the single source of truth.
**Consequences:** 
- Dynamic routes validated against entity resolvers.
- Redirects defined separately but aligned.
- Easier to generate sitemaps and breadcrumbs.

---

### ADR-002: Entity Resolution over Slug Synthesis
**Problem:** Previously, any non-empty slug would generate a synthetic page (soft-404).
**Decision:** Dynamic routes (`/agents/:slug`, etc.) only resolve if the slug maps to a real published entity via `entityResolvers.ts`. Unknown slugs return 404.
**Consequences:** 
- Eliminated infinite soft-404s.
- Clear entity ownership.
- SEO improvement.

---

### ADR-003: True Server-Side Rendering with Hydration
**Problem:** Initial page loads were client-side only, hurting SEO and perceived performance.
**Decision:** Implement SSR in `server.ts` + `renderSsrBody.ts` that renders the initial page content into `#root` div. Client hydrates from there.
**Consequences:** 
- Search engines see full content.
- Fast first paint.
- Hydration must match (verified).

---

### ADR-004: Evidence-Backed Content Lifecycle
**Problem:** Need to ensure factual claims are trustworthy.
**Decision:** Implement Safe-Deep evidence engine with `EvidenceClaim`, validation rules, quality scoring, and state machine (`CONTENT_STATE_MACHINE`).
**Consequences:** 
- Content cannot be published unless it passes quality gates.
- Evidence maturity tracked.
- Contradictions flagged.

---

### ADR-005: Redirect Single-Hop Guarantee
**Problem:** Legacy redirects could chain, causing latency and SEO dilution.
**Decision:** All redirects defined in `legacyRedirects` must resolve to a final destination in one hop. Verified by 290 tests.
**Consequences:** 
- No redirect chains.
- Clear migration path from old URLs.

---

### ADR-006: File-Based Data Layer for MVP
**Problem:** Full database would add complexity not needed for initial launch.
**Decision:** Use TypeScript files (`src/data/*.ts`) as the data store. Simple and fast for moderate scale.
**Consequences:** 
- No migrations needed.
- Deploy as static build.
- Scale limit: data changes require code deploy.

---

### ADR-007: Automated Verification Suite
**Problem:** Manual testing is error-prone and not repeatable.
**Decision:** Create `scripts/verify-*.ts` for evidence, redirects, routes, sitemaps, SSR, production. All must pass before release.
**Consequences:** 
- 457 passing tests provide high confidence.
- CI can run them automatically (future).
- Regression prevention.

---

### ADR-008: SEO by Default
**Problem:** Directory must rank well in search engines and AI Overviews.
**Decision:** Implement canonical URLs, unique titles/descriptions, JSON-LD structured data (WebPage, Organization, WebSite, BreadcrumbList), sitemap index + segments, and 404 handling without self-canonical.
**Consequences:** 
- Search engines can index properly.
- Rich snippets possible.

---

### ADR-009: Health and Rate Limiting for Ops
**Problem:** Need basic observability and abuse resistance even in MVP.
**Decision:** Add `/health` endpoint returning JSON status. Add in-memory rate limiter for API endpoints (60 req/min).
**Consequences:** 
- Orchestration can check health.
- Basic DDoS protection at application layer.

---

### ADR-010: Documentation as Code
**Problem:** Knowledge must be captured and maintained.
**Decision:** Keep architecture decisions, developer guides, and handoff documents in `docs/completeness/` and root README. Version-controlled.
**Consequences:** 
- Onboarding easier.
- Compliance with production handoff requirements.

---
