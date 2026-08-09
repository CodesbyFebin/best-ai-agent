# Production Truth — BestAIAgent.in

Generated: 2026-08-09
Status: P2 MEASUREMENT PHASE — DO NOT DEPLOY UNVERIFIED CHANGES

---

## 1. Canonical Repository

| Field | Value | Classification |
|-------|-------|----------------|
| GitHub repo | `https://github.com/CodesbyFebin/best-ai-agent` | VERIFIED |
| Default branch | `main` | VERIFIED |
| Commit count | 32 | VERIFIED |
| Local workspace | `C:\best-ai-agent-main` | VERIFIED |
| Local git status | **Not a git repository** | VERIFIED |

**Critical discrepancy:** The local workspace is NOT a git repository. There is no way to diff local changes against the GitHub `main` branch, and no way to verify which commit is deployed.

---

## 2. Canonical Production Application

| Field | Value | Classification |
|-------|-------|----------------|
| Framework | Vite + React 19 + Express SSR | VERIFIED |
| Build command | `vite build && esbuild server.tsx --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs` | VERIFIED |
| Start command | `node dist/server.cjs` | VERIFIED |
| Runtime | Node.js | VERIFIED |
| Port | 3000 (default) | VERIFIED |
| Output directory | `dist/` | VERIFIED |

---

## 3. Deployment Provider

| Field | Value | Classification |
|-------|-------|----------------|
| Provider | Vercel | VERIFIED |
| Project URL | `https://vercel.com/projects555/best-ai-agent` | VERIFIED |
| Production deployment | **NONE FOUND** | VERIFIED |
| Preview deployment | `https://best-ai-agent-neon.vercel.app` | VERIFIED |

**Critical finding:** The Vercel project page explicitly shows "No Production Deployment." The only active deployment is a preview/deployment at `best-ai-agent-neon.vercel.app`.

---

## 4. Live Production URLs

| URL | Status | Content | Classification |
|-----|--------|---------|----------------|
| `https://best-ai-agent-neon.vercel.app/` | 200 (partial) | Title only: "Best AI Agents in India 2026: Compare AI Tools, Builders, Coding Agents & Business Automation" | VERIFIED |
| `https://best-ai-agent-neon.vercel.app/agents/chatgpt/` | 404 | Not found | VERIFIED |
| `https://best-ai-agent-neon.vercel.app/compare/chatgpt-vs-claude/` | 404 | Not found | VERIFIED |
| `https://best-ai-agent-neon.vercel.app/categories/coding-agents/` | 404 | Not found | VERIFIED |
| `https://best-ai-agent-neon.vercel.app/sitemap.xml` | 404 | Not found | VERIFIED |
| `https://best-ai-agent-neon.vercel.app/robots.txt` | 200 | Present | VERIFIED |
| `https://best-ai-agent-neon.vercel.app/llms.txt` | Unknown | Not tested | UNKNOWN |

**Critical finding:** The live Vercel deployment is returning 404 for all key pages. Only the homepage returns a partial response (title only, no body). This indicates a broken deployment or misconfiguration.

---

## 5. robots.txt (Live)

```
# BestAIAgent.in - Robots Control Protocol
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/private/

# AI Search & Crawler Permissions (Expressly Allowed for AI Citation & Grounding)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Cohere-ai
Allow: /

# Master Sitemap Index
Sitemap: https://bestaiagent.in/sitemap.xml
Sitemap: https://bestaiagent.in/sitemap-core.xml
Sitemap: https://bestaiagent.in/sitemap-agents.xml
Sitemap: https://bestaiagent.in/sitemap-categories.xml
Sitemap: https://bestaiagent.in/sitemap-comparisons.xml
```

**Issues identified:**
- Sitemap URLs reference `https://bestaiagent.in/` domain, but the site is deployed at `https://best-ai-agent-neon.vercel.app/`
- `/sitemap-core.xml` is referenced but not implemented in the codebase
- `Google-Extended` is allowed (training crawler) — governance says this should be DISALLOWED
- `GPTBot` is allowed (training crawler) — governance says this should be DISALLOWED

---

## 6. Sitemap (Live)

| URL | Status | Classification |
|-----|--------|----------------|
| `https://best-ai-agent-neon.vercel.app/sitemap.xml` | 404 | VERIFIED |
| `https://bestaiagent.in/sitemap.xml` | Unknown | UNKNOWN |

**Critical finding:** The live deployment does not serve a sitemap. The robots.txt references sitemap URLs that return 404.

---

## 7. Repository Drift: GitHub vs Local Workspace

**GitHub `main` branch does NOT contain:**
1. `kilo.json` (404 on raw GitHub)
2. P2 measurement infrastructure (`src/data/p2Measurement.ts`, `scripts/p2-measure.ts`, `scripts/p2-day30-report.ts`, `reports/p2/`)
3. Security fixes to `server.tsx`:
   - `crypto` import for `timingSafeEqual`
   - `authenticateAdmin` middleware
   - `/api/admin/verify`, `/api/admin/info`, `/api/errors` now use `authenticateAdmin`
   - `/api/submit-lead`, `/api/submit-tool`, `/api/subscribe` now validate input and return proper status codes
4. Fixed `.kilo/command/*.md` frontmatter (removed invalid `name` and `category` fields)
5. Fixed `.kilo/agent/seo-director.md` frontmatter (removed invalid `name` field)
6. AEO component integration in page components
7. TypeScript fixes in `src/App.tsx`, `src/components/ComparisonMatrixPage.tsx`, `src/components/home/FeaturedAgents.tsx`, `src/packages/jobs/workers.ts`

**GitHub `main` branch DOES contain:**
- Old `server.tsx` with fake-success APIs
- Old `server.tsx` with admin auth bypass
- No rate limiting on mutation endpoints
- No security headers middleware
- No P2 measurement system

**Local workspace does NOT contain:**
- `.git` directory (not a repository)
- `vercel.json` deployment configuration

---

## 8. Environment Variables

| Variable | Local `.env.example` | GitHub | Production | Classification |
|----------|---------------------|--------|------------|----------------|
| `NODE_ENV` | ✅ | Unknown | Unknown | UNKNOWN |
| `PORT` | ✅ | Unknown | Unknown | UNKNOWN |
| `SITEMAP_DOMAIN` | ✅ | Unknown | Unknown | UNKNOWN |
| `DATABASE_URL` | ✅ | Unknown | Unknown | UNKNOWN |
| `REDIS_URL` | ✅ | Unknown | Unknown | UNKNOWN |
| `OPENAI_API_KEY` | ✅ | Unknown | Unknown | UNKNOWN |
| `GEMINI_API_KEY` | ✅ | Unknown | Unknown | UNKNOWN |
| `FIREBASE_API_KEY` | ✅ | Unknown | Unknown | UNKNOWN |
| `RESEND_API_KEY` | ✅ | Unknown | Unknown | UNKNOWN |
| `ADMIN_API_TOKEN` | ❌ Not present | ❌ Not present | ❌ Unknown | UNKNOWN |

**Critical finding:** `ADMIN_API_TOKEN` is not defined in `.env.example` and not present in the codebase. The production deployment cannot enforce admin authentication without this variable.

---

## 9. Known Discrepancies

1. **GitHub vs Local drift**: Local workspace has security fixes and P2 infrastructure not present in GitHub `main`
2. **Production broken**: Live Vercel deployment returns 404 for all key pages
3. **No production deployment**: Vercel project shows "No Production Deployment"
4. **Domain mismatch**: robots.txt references `bestaiagent.in` but site is at `best-ai-agent-neon.vercel.app`
5. **Sitemap missing**: Live site returns 404 for sitemap
6. **Admin auth broken**: No `ADMIN_API_TOKEN` configured, production cannot enforce auth
7. **Fake APIs in production**: GitHub `main` has fake-success APIs
8. **No git tracking**: Local workspace is not a git repository
9. **No deployment config**: No `vercel.json` or equivalent deployment configuration found

---

## 10. Classification Summary

| Category | Count |
|----------|-------|
| VERIFIED | 23 |
| INFERRED | 0 |
| UNKNOWN | 12 |

**Never convert INFERRED into VERIFIED.**

---

## 11. Required Actions Before P2 Measurement Can Proceed

1. **Deploy a working production build** — current Vercel deployment is broken
2. **Push local security fixes to GitHub** — or document why they should not be deployed
3. **Configure `ADMIN_API_TOKEN`** — required for admin endpoint security
4. **Fix robots.txt sitemap URLs** — must match actual deployment domain
5. **Fix sitemap serving** — must return 200 with valid XML
6. **Establish git tracking** — required for deployment verification and rollback
7. **Create `vercel.json`** if Vercel-specific configuration is needed

---

*This document is frozen during P2 measurement. Do not update with inferred data.*
