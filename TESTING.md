# MCPserver.in - Testing Guide
**Version:** 1.0  
**Last Updated:** 2026-07-25

---

## Overview

The project includes automated verification scripts that must pass before any release. Tests cover evidence, routing, redirects, sitemaps, SSR, and production readiness.

---

## Running Tests

All tests are run against a locally running server on `http://localhost:3000`. Start the dev server first:

```bash
npm run dev
```

In another terminal, run the desired test suite:

| Script | What it tests |
|--------|---------------|
| `npm run test:evidence` | Evidence schema, validation rules, quality scoring, state machine |
| `npx tsx scripts/verify-redirects.ts` | All redirect mappings (290 tests) |
| `npx tsx scripts/verify-routes.ts` | Dynamic route resolution (41 tests) |
| `npm run test:sitemap` | Sitemap index, segments, URL accessibility (49 tests) |
| `npm run test:ssr` | SSR rendering, metadata, canonical, JSON-LD (14 tests) |
| `npm run test:production` | Full production verification (54 tests) |

---

## Evidence Tests (`test:evidence`)

- Verifies interfaces are importable.
- Checks factory functions.
- Validates evidence rules (CRITICAL 90%, STANDARD 80%, COMPARISON 85%).
- Tests quality score calculation, contradiction detection, expiration, coverage calculation, state machine transitions, quality gate.

**Exit 0** on success.

---

## Redirect Tests (`verify-redirects.ts`)

Ensures:
- All legacy `/tools/` paths 301 → correct new agent paths.
- All `/a/` references 301 → canonical.
- MCP-specific redirects are semantically correct.
- No redirect chains exist.
- Hub routes (`/agents`, `/categories`, etc.) are canonical.

**290 tests must pass.**

---

## Route Resolution Tests (`verify-routes.ts`)

- Home route resolves.
- Real entity slugs resolve to valid routes.
- Fake slugs return 404.
- Slug aliases redirect to canonical.
- Path normalization (case, trailing slash, duplicate slashes) works.
- All entity resolvers (agents, categories, comparisons, MCP servers, research, authors) return correct metadata.

**41 tests must pass.**

---

## Sitemap Tests (`test:sitemap`)

- `/sitemap.xml` returns 200 and is a valid sitemap index.
- Index references 6 segmented sitemaps.
- Each segmented sitemap (`/sitemap-agents.xml`, etc.) returns 200 and contains `<urlset>`.
- Sample URLs from each sitemap are accessible (200 or 301).
- XML structure is valid; no duplicate locations.

**49 tests must pass.**

---

## SSR Tests (`test:ssr`)

For home, agent, category, and 404 pages:
- Returns correct HTTP status (200 or 404).
- Contains `<title>`, meta description, canonical link.
- Contains JSON-LD structured data.
- Root div (`#root`) exists and has non-empty content (for 200 responses).
- 404 page does not self-canonicalize.

**14 tests must pass.**

---

## Production Verification (`test:production`)

Comprehensive suite combining:
- SSR checks (home, agent, category, author, comparison, MCP, research)
- H1 content verification
- Sitemap index validation
- Redirect verification (one example)
- 404 behavior
- Evidence page load
- JSON-LD presence

**54 tests must pass.**

---

## Continuous Integration (Future)

Integrate these scripts into a GitHub Actions workflow that:

1. Installs dependencies (`npm ci`).
2. Runs `npm run lint`.
3. Builds (`npm run build`).
4. Starts server in background.
5. Waits for readiness (`/health`).
6. Runs all test suites in sequence.
7. Reports pass/fail.
8. Kills server.

---

## Test Coverage Goals

- **Unit tests** for utilities (future).
- **Integration tests** cover routing, redirects, sitemaps (current).
- **E2E tests** with Playwright (future) for full user flows.
- **Security tests** (future) including rate limiting, input validation, XSS.

Current automated coverage: ~70% of codebase (estimated). Focus is on critical paths.

---

## Troubleshooting

### Tests time out or fail to connect

Ensure the dev server is running on localhost:3000 and that `BASE_URL` is not set to something else.

### Sitemap tests fail with 404

Make sure the server is the latest version with segmented sitemap endpoints (`/sitemap-agents.xml`, etc.).

### SSR tests fail with "root container"

Verify you are sending `Accept: text/html`. Some test scripts do this automatically; manual `curl` should include `-H "Accept: text/html"`.

---

## Verification Checklist Before Release

- [ ] `npm run lint` exits 0
- [ ] `npm run build` exits 0 (warnings OK)
- [ ] All redirect tests pass (290/290)
- [ ] All route tests pass (41/41)
- [ ] All sitemap tests pass (49/49)
- [ ] All SSR tests pass (14/14)
- [ ] All production tests pass (54/54)
- [ ] `/health` returns 200
- [ ] Rate limiting returns 429 after threshold
- [ ] No backup files in repository
- [ ] Documentation complete (DEVELOPMENT.md, DEPLOYMENT.md, TESTING.md, README.md)

---

## Evidence Retention

All test logs and machine-readable state are stored in:
- `.safe-deep/` (JSON/JSONL)
- `docs/completeness/` (markdown reports)

These artifacts constitute the verification evidence for the completion score.
