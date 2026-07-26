# ATLAS P00 — Security Findings
Generated: 2026-07-24T01:39:30.263Z

## S1 — Admin dashboard publicly accessible [P0]
- File: src/components/RouterApp.tsx:54
- `/admin` and `/admin/*` render <AdminDashboard /> with no auth/authorization/session.
- robots.txt Disallow is NOT security.
- Fix: server-side gate returning 401/redirect before HTML is served.

## S2 — Fake-success API endpoints [P0]
- File: server.ts:314-324
- POST /api/submit-lead, /api/submit-tool, /api/subscribe always return {success:true} with no persistence/validation.
- Fix: implement persistence+validation or return 501 Not Implemented.

## S3 — Raw path interpolation → reflected XSS [P0]
- File: src/routing/renderSsrBody.ts:10
- ``<code>${path}</code>`` reflects request path into HTML unescaped.
- Titles/descriptions/slug strings likewise unescaped.
- Fix: escapeHtml() + escapeAttribute() on all request-derived data.

## S4 — 404 self-canonicalizes invalid URL [P1]
- File: server.ts:42
- ``canonical = https://bestaiagent.in${urlPath}`` for non-existent pages.
- Fix: omit canonical on 404, or point to a verified replacement only.

## S5 — AI endpoints lack production controls [P1]
- File: server.ts:254-312 (/api/analyze-doc, /api/recommend)
- No auth, rate limiting, request-size limits, output validation, timeout handling, or privacy disclosure.
- /api/analyze-doc forwards user document content to external Gemini API.

## S6 — Duplicate <title> insertion [P1]
- File: server.ts:114-117 — replaces <title> then inserts another full head block containing a second <title>.
