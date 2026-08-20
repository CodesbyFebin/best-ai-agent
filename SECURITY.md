# Security Policy

## Reporting a vulnerability

**Do not open a public GitHub issue for security reports.** Report vulnerabilities **privately** via GitHub Security Advisories:

> https://github.com/CodesbyFebin/best-ai-agent/security/advisories/new

This project's private advisory channel is enabled. Please include:

1. A description of the issue and its impact.
2. The affected route, file, or endpoint (with the commit you tested on).
3. Reproduction steps, a minimal proof-of-concept, and expected vs. actual behavior.
4. Whether you have a proposed fix.

You should receive an acknowledgment within a reasonable window. Please give us time to triage and patch before any public disclosure — coordinated disclosure is appreciated.

## Supported versions

Only the latest `main` branch is actively supported, alongside tagged releases as they are cut. (No release tags exist today — `AUDIT.md` §N flags release engineering as a gap. Until tags/shipping is formal, treat `main` HEAD `a54d4fa` as the supported line.)

| Version | Supported |
|---------|-----------|
| `main` (HEAD) | ✅ |
| Untagged snapshots | ⚠️ Best-effort |

## Threat surface (what this application exposes)

Based on the audited code on `a54d4fa`:

| Surface | Notes |
|---|---|
| Express SSR server (`server.tsx`) | Serves SSR HTML for canonical routes; `/admin*` is **SSR-blocked** (returns 404 before routing — see `server.tsx` lines 52–61). |
| `/api/admin/verify`, `/api/admin/info` | Bearer-token compare gate. Not a hardened identity system — see `AUDIT.md` §F.5. No rate-limit specifics verified here. |
| Public POST APIs | `/api/analyze-doc`, `/api/recommend`, `/api/submit-lead`, `/api/submit-tool`, `/api/subscribe`. Lead/tool/subscription inputs should be treated as untrusted. |
| Knowledge-graph API | `GET /api/graph/{stats,related,similar,path}` — read-only entity traversal of `graph-data.json`. |
| Discovery outputs | `/sitemap*.xml`, `/rss*.xml`, `/feed.xml`, `/llms*.txt`, `/robots.txt`, `/security.txt`, `/humans.txt`. Read-only. |
| Bundled AI SDKs | `@google/genai`, `openai`, `firebase` are dependencies; their invocation by served routes is not fully characterized in the audit. Treat any new call site as a review gate. |

Known hardening gaps (from `AUDIT.md`):

- 🔴 **HIGH** — a stray untracked `account` file exists at repo root; its contents are unexamined. Never `git add .` without checking it isn't staged. (Recommended: delete or `.gitignore` it.)
- 🟡 **MEDIUM** — admin authentication is a bearer-token compare, not a proven identity layer.
- 🟡 **MEDIUM** — no CodeQL / secret-scanning / dependency-vulnerability scanning in CI (`ci.yml`).
- 🟡 **MEDIUM** — no private `security.txt` policy contact is documented beyond GitHub Security Advisories.

## Hardening recommendations (commitment, not claim)

These are **planned** (not yet implemented unless a release note says otherwise):

- [ ] Configure `/security.txt` (`public/security.txt`) to point here (it currently exists but its content is a 5-line placeholder).
- [ ] Add dependency-vulnerability scanning to CI (`npm audit` / Dependabot is configured via `.github/dependabot.yml`; CodeQL is a follow-up).
- [ ] Confirm the admin bearer-token gate has rate-limiting and constant-time compare.
- [ ] Remove / `.gitignore` the stray `account` file.

## A note on the operating model

This is a content platform. The trusted surface is small (admin endpoints + public form-submission APIs). The product does not execute user-supplied agent code, host models, or run LLM loops — so prompt-injection / tool-abuse / sandboxing concerns specific to *agent runtimes* largely do not apply here. The relevant classes are **SSRF / input validation / auth-token handling / dependency CVEs**.
