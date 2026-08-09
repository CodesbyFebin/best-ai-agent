# External Blockers — P2 Production Gate

Generated: 2026-08-09
Branch: release/p2-production
Commit: c39b194

---

## Status

**BLOCKED_EXTERNAL**

All code-level fixes are complete and committed. Deployment and remote verification require external credentials/access.

---

## Exact Actions Required

### 1. Push release branch to GitHub

```bash
cd C:\best-ai-agent-main
git push -u origin release/p2-production
```

Branch: `release/p2-production`
Commit: `c39b194`

### 2. Open Pull Request

Create PR: `release/p2-production` → `main`

Title: `release(p2): integrate verified production fixes`

### 3. Configure Vercel production environment variables

In the Vercel project `projects555/best-ai-agent`, set:

| Variable | Value | Required |
|----------|-------|----------|
| `NODE_ENV` | `production` | Yes |
| `ADMIN_API_TOKEN` | `<strong random secret>` | Yes |
| `SITEMAP_DOMAIN` | `https://bestaiagent.in` | Yes |

Do not commit `ADMIN_API_TOKEN` to Git. Configure it in the Vercel dashboard.

### 4. Deploy to production

After PR is merged, trigger production deployment in Vercel.

### 5. Run remote production verification

Execute against `https://www.bestaiagent.in`:

```bash
node scripts/verify-production.mjs
```

Also verify:

- `/robots.txt` returns 200 with correct crawler policy
- `/sitemap.xml` returns 200 with valid XML
- `/agents/chatgpt/` returns 200 with SSR content
- `/categories/coding-agents/` returns 200 with SSR content
- `/compare/chatgpt-vs-claude/` returns 200 with SSR content
- `/api/admin/verify` without token returns 401
- `/api/admin/verify` with wrong token returns 401
- `/api/submit-lead` with empty body returns 400
- `/api/submit-tool` with empty body returns 400
- `/api/subscribe` with empty body returns 400

### 6. Record baseline

After all gates pass, update `docs/PRODUCTION_TRUTH.md` with:

```
Release SHA: c39b194
Production branch: main
Vercel deployment ID: <to be filled>
Production URL: https://www.bestaiagent.in
Deployment timestamp: <to be filled>

Runtime verification: <PASS/FAIL>
robots.txt: <PASS/FAIL>
sitemap.xml: <PASS/FAIL>
SSR routes: <PASS/FAIL>
Admin authentication: <PASS/FAIL>
Mutation validation: <PASS/FAIL>
Security headers: <PASS/FAIL>

P2 Day 1: <timestamp after all PASS>
```

---

## Code-Level Fixes Included

| Fix | File | Description |
|-----|------|-------------|
| API truthfulness | `server.tsx` | `/api/subscribe`, `/api/submit-lead`, `/api/submit-tool` now validate input and return proper status codes |
| Admin authentication | `server.tsx` | Added `authenticateAdmin` middleware with timing-safe token comparison |
| Metadata duplication | `server.tsx` | Fixed duplicate `<title>` injection in SSR HTML |
| robots.txt | `public/robots.txt` | GPTBot and Google-Extended now DISALLOWED; removed dead sitemap-core.xml reference |
| Security headers | `server.tsx` | Added X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy |

---

## P2 Day 1 Status

🔴 **BLOCKED** — awaiting external deployment and verification.

Do not start measurement until all gates pass.
