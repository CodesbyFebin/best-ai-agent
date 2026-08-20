# Governance

> Honest description of how this project is actually run today. This project has **not** adopted a heavyweight steering-committee model; the goal is to keep the docs truthful, so this file describes reality rather than an aspirational committee that doesn't exist.

## Maintainership

- The repository is owned by [**@CodesbyFebin**](https://github.com/CodesbyFebin). The original development work was produced under the "ATLAS Development Team" name visible in older docs ([`PROJECT_TRACKER.md`](PROJECT_TRACKER.md), `docs/ARCHITECTURE.md`).
- Maintainership is currently held by the repository owner, who has final authority on merge decisions, release cuts, and licensing.
- There are no currently-defined additional maintainers, LTS stewards, or formal sub-team roles. When (and only when) additional maintainers are appointed, they will be listed here with their responsible areas.

If you are contributing regularly and want a review area, open a discussion or an issue describing your track record and the area you'd like to own. Review-area ownership is granted based on demonstrated judgment and evidence discipline — not on volume of merged PRs.

## Decision making

| Decision type | Authority |
|---|---|
| Any change to load-bearing contracts (`src/routing/routeRegistry.ts`, `routeResolver.ts`, `server.tsx` API surface, `evidenceSchema.ts`, `quarantine/`) | Maintainer review required (auto-requested by `CODEOWNERS`). |
| New entities, comparisons, evidence receipts, docs | Standard PR review; maintainer merges. |
| Breaking changes | Maintainer approval + a note in the PR. |
| Licensing changes | Owner decision. The license is currently pending confirmation (see `AUDIT.md` §O.2). No contributor other than the owner may assert a license. |
| Architectural direction | Discussed in issues / discussions; recorded as an ADR under `docs/DECISIONS/` (ADRs `0002`–`0009` exist as the provenance for current architecture). |
| Code of Conduct enforcement | Maintainer; see [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) §Enforcement. |

## How contributions become releases

This repo does **not yet** practice formal release engineering: there is no `CHANGELOG.md`, no git-tag discipline, and `package.json` version is `0.0.0` (see `AUDIT.md` §N). The plan (documented, not executed) is:

1. PR merges into `main` (gated by `.github/workflows/ci.yml` running the `verify-*` suite).
2. Periodic release cuts with a `CHANGELOG.md` entry and a semantic-version tag.
3. Release notes explaining Added / Changed / Fixed / Security / Breaking.

Until that lands, **`main` HEAD is the supported line** (see [`SECURITY.md`](SECURITY.md) §Supported versions).

## Scope

This is an **India-first, evidence-backed AI-agent catalogue** — a content/evaluation platform. It is not an agent runtime and will not become one. Scope decisions are guided by the KEEP/REDIRECT/REBUILD/RETIRE rule set out for the production site work, the master prompt's evidence classification (VERIFIED / INFERRED / PLANNED), and the README's "What this is / is not" section. See [`docs/POSITIONING.md`](docs/POSITIONING.md) for the canonical scope statement.

## Succession / abandonment

The project has no formal succession plan. If the maintainer becomes unresponsive for an extended period, contributors with the strongest sustained review history may fork per the project's license terms (once a license is confirmed) — but a maintainer-OK'd handoff is preferred and will be documented here if it happens.

## Reporting governance concerns

For conflicts of interest, maintainer conduct, or governance disputes, use the private GitHub Security Advisory channel with the concern labeled clearly, or file a `conduct` issue if Discussions/issues is appropriate.
