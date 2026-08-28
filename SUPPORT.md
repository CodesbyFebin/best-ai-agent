# Support

How to get help with Best AI Agent. Pick the channel that matches your need — there is no fabricated "support team" or SLA here; this is a maintained open-source project and these are the channels that actually exist.

## Where to go

| You need | Use | Why |
|---|---|---|
| Report a bug | [Issue tracker → Bug report template](https://github.com/CodesbyFebin/best-ai-agent/issues/new?template=bug_report.yml) | Structured reproduction (steps, expected, actual, commit, Node version) keeps triage fast. |
| Suggest a feature / new entity | [Issue tracker → Feature request template](https://github.com/CodesbyFebin/best-ai-agent/issues/new?template=feature_request.yml) | Asks for evidence readiness + category, so we don't get under-sourced ideas. |
| Dispute a claim / fix stale docs | [Issue tracker → Documentation template](https://github.com/CodesbyFebin/best-ai-agent/issues/new?template=documentation.yml) | Evidence disputes are welcome — that's the project's whole value. |
| General question / show & tell | Discussions (enable in repo settings) | Use GitHub Discussions for Q&A and "what I built" once it's enabled. |
| **Security vulnerability** | [**Private GitHub Security Advisory**](https://github.com/CodesbyFebin/best-ai-agent/security/advisories/new) — see [`SECURITY.md`](SECURITY.md) | **Never** a public issue for security. |
| Conduct violation | See [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md#enforcement) | Private report; enforcement contact is being formalized. |

> If **Discussions isn't enabled yet**, that's a known gap; opening a well-scoped issue works in the meantime.

## Before opening an issue

Please confirm you're on a recent commit and have run the local gates:

```bash
git rev-parse --short HEAD     # put this in the issue
npm ci
npm run lint                   # tsc --noEmit
npm run build
```

If your report is about routing, redirects, sitemaps, or SSR, mention which `npm run test:*` or `npx tsx scripts/verify-*.ts` suite is failing and paste the output (fenced code block).

## What is *not* support

- The deployed site's customer support — `bestaiagent.in` is a separate production deployment; this repo's issues are for the **codebase**, not for the live site's product questions.
- An email support address (none is published; do not invent one).

---

## Commercial / hosted support

None offered or claimed at this time. If a commercial support arrangement is established, it will be documented here with real terms — not invented SLAs.
