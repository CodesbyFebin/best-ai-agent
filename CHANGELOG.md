# Changelog

All notable changes to **Best AI Agent** are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> Dates use the project's working timezone context (UTC dates shown). Entries
> are sourced from the verified git history, not from aspirational notes.

---

## [Unreleased]

### Added
- **Community-health files:** `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `SUPPORT.md`, `GOVERNANCE.md`, `.github/CODEOWNERS`, `.github/dependabot.yml`, `.github/PULL_REQUEST_TEMPLATE.md`, and three `.github/ISSUE_TEMPLATE/*.yml` forms (bug, feature, documentation/evidence dispute).
- **Real ESLint flat config** (`eslint.config.js`) with an evidence-measured baseline and a ratchet adoption policy. New `npm run typecheck` and `npm run lint:eslint` scripts; `npm run lint` retains its `tsc --noEmit` meaning for CI compatibility. `@eslint/js`, `globals`, `typescript-eslint` added as devDependencies to make the previously-dead eslint deps functional.
- **Release engineering:** `.github/workflows/release.yml` (runs the same verify gates as CI on the tagged commit before cutting a GitHub Release) and this `CHANGELOG.md`.
- **Product positioning:** `docs/POSITIONING.md` (one-line / 50 / 150 / technical / beginner / developer / contributor descriptions, grounded in audited capabilities).
- **Evidence-first audit:** `AUDIT.md` (Phase 0), classifying every finding by severity and traceable to a file or command output.

### Changed
- **`package.json` metadata:** `name` `react-example` → `best-ai-agent`; `version` `0.0.0` → `0.1.0`; added `description`, `keywords`, `homepage`, `repository`, `bugs`, `engines` (`node >=20`), and `license: "SEE LICENSE IN LICENSE"` (pending owner confirmation — see `LICENSE` placeholder and `AUDIT.md` §O.2).
- **`README.md`:** redesigned as a premium product landing with verified badges (CI workflow status, TypeScript/React/Vite/Express versions), aligned Quick Start, a code-sourced Mermaid architecture diagram, and an honest "What this is / is not" scope statement. License section honestly states the decision is pending.
- **`docs/ARCHITECTURE.md`:** rewritten to remove fabricated metrics ("53 canonical routes", "100/100", "417/417", "Production Ready") and references to non-existent files (`renderSsrBody.ts`, `head-manager.tsx`). Now states the verified route counts (≈110 canonical / ≈171 redirects on `a54d4fa`) and ships Mermaid diagrams traced to real file paths.
- **`docs/INDEX.md`:** cleaned of fabricated aggregate scores; reflects the real 57-file tracked `docs/` tree.
- **`.github/workflows/ci.yml`:** typecheck step named explicitly; ESLint added as an advisory step (`continue-on-error: true`) per the ratchet policy.

### Removed
- (Planned, not yet executed — tracked in `AUDIT.md` §O.3/§A.9/§A.10/§G.4): committed binary blob `Safe-Deep-BestAIAgent-MVP.zip`, the `kernel/` directory (unrelated GPU project), and the redundant `bun.lock`.

### Security
- `SECURITY.md` published; vulnerability disclosure routed to private GitHub Security Advisories. Known hardening gaps (admin bearer-token gate, no CodeQL/secret-scan, stray untracked `account` file) documented honestly as planned, not claimed as fixed.

---

## [0.1.0] — 2026-08-20 (metadata baseline)

> Marker release for the GitHub-presentation overhaul. No application code
> semantics changed in this cycle; the underlying application (canonical routing,
> evidence engine, SSR, segmented sitemaps, India pricing) was already in place
> at the start of this work (last application commit below).

### Underlying application state (prior to this changelog, for context)
- `a54d4fa` — `fix(routing): resolve all broken redirects, sitemap access, and canonical issues` — fixed 49 broken redirect destinations, restored sitemap access, resolved `/cursor-ai` canonical, removed self-referential trailing-slash redirects that never fire under path normalization. Verification: `npx tsx scripts/verify-redirect-destinations.ts` → 172 valid, 0 broken; `verify-sitemaps-static.ts` → 17/17; `verify-ssr.ts` → 14/14; `verify-sitemaps.ts` → 49/49.
- `b2de510` — `feat: add keyword-targeted content for SERP optimization`.
- `735115e` — `docs: final content expansion report`.
- Earlier commits expanded entity content, MCP docs, comparisons, navigation pages, pillar content, scope freeze, and the evidence-first architecture. Full history: `git log`.

---

## Versioning policy

- `MAJOR`: breaking changes to the load-bearing contracts (routing resolver semantics, evidence schema, API surface).
- `MINOR`: new entities, comparisons, MCP-server pages, or non-breaking feature additions.
- `PATCH`: bug fixes, redirect corrections, doc/evidence updates, dependency bumps.

While `package.json` shows `0.x`, expect possible breaking changes between minors (pre-1.0 convention). Once the maintainer confirms licensing and the planned release-engineering flip is complete, this policy remains in force.
