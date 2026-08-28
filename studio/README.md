# BestAIAgent Studio

An evidence-gated research and publishing platform, not a content spinner. Every
page in this system carries claims; every claim needs evidence; every publish
decision runs through a deterministic quality engine and a hard gate that
cannot be bypassed by a high headline score alone.

```
PAGE → CLAIMS → EVIDENCE → SOURCE
PAGE → ENTITY → RELATIONSHIP → ENTITY   (knowledge graph)
```

## What is real here, and what isn't yet

- **Real**: the FastAPI backend, the SQLite schema, the deterministic quality
  engine, the hard publish gate, the OpenRouter adapter (which honestly
  reports `not_configured` with no key set — it never fabricates a draft),
  the sitemap/robots/llms.txt/entities.json/knowledge-graph.json/evidence.json/
  RSS/Atom generators (all read live from the database), and the dashboard
  (all numbers are `SELECT COUNT(*)`, never hardcoded).
- **Real, already seeded**: 22 entities with genuine SHA-256-hashed evidence
  receipts imported from `bestaiagent-production`'s prior verification work,
  plus 860+ real GitHub repositories pulled live from the GitHub Search API
  (real star counts, real licenses, real URLs) via `scripts/import_github_tools.py`.
- **Not yet built**: the 2,550-URL pillar × topic inventory and the deep,
  per-page research content behind it. That is a large, ongoing editorial
  effort — the system treats page count as an *inventory*, not a quota. A
  page is only published once it clears the gate; publishing fewer, real
  pages is the intended behavior, not a shortfall.

## Quick start

```bash
python3 -m venv venv && source venv/bin/activate
pip install -r requirements-dev.txt
cp .env.example .env

# Seed real evidence-hashed entities from a bestaiagent-production checkout
python scripts/seed_from_bestaiagent.py /path/to/bestaiagent-production

# Pull real AI-agent tool repos from the live GitHub API (set GITHUB_TOKEN
# in .env first, or pass one via `export GITHUB_TOKEN=$(gh auth token)`,
# to raise the rate limit from 60/hr to 5000/hr)
python scripts/import_github_tools.py --limit 400

uvicorn app.main:app --reload
```

Open http://localhost:8000 — the dashboard shows real counts from the
database. If `OPENROUTER_API_KEY` is unset in `.env`, the header honestly
reads **"AI Provider: Not configured"** rather than pretending to be connected.

## Run the tests

```bash
pip install pytest
pytest tests/ -v
```

Tests exercise the actual quality-scoring functions and the actual publish
gate against an in-memory SQLite database — nothing is mocked at the layer
that decides whether a page is good enough to publish.

## Authentication and review separation

Every state-changing endpoint requires a bearer token configured through
`STUDIO_ADMIN_TOKEN`, `STUDIO_EDITOR_TOKEN`, or `STUDIO_REVIEWER_TOKEN`.
Editors create pages, claims, entities, and pending evidence. Reviewers alone
can verify evidence and approve/reject an exact page-body hash. Publishing
requires a current named approval and invalidates automatically after edits.
Admins can inspect `/api/audit/events` and perform either role.

Do not expose the Studio until long random tokens are configured. Never commit
a populated `.env`.

## API surface

| Area | Endpoints |
|---|---|
| Pages | `GET/POST /api/pages`, `GET/PUT/DELETE /api/pages/{id}`, `POST /api/pages/{id}/validate`, `POST /api/pages/{id}/publish`, `POST /api/pages/{id}/reject` |
| Claims / evidence | `POST /api/claims`, `GET/POST /api/evidence`, `PUT /api/evidence/{id}` |
| Entities | `GET/POST /api/entities`, `GET /api/entities/{slug}`, `GET /api/entities/{slug}/relationships` |
| Generation | `POST /api/research/{page_id}`, `POST /api/generate/{page_id}` (OpenRouter), `POST /api/validate/{page_id}`, `GET /api/jobs`, `GET /api/provider/status` |
| Reports | `GET /api/reports/quality`, `/evidence`, `/duplicates`, `/cannibalization`, `/geo` |
| Machine surfaces | `GET /sitemap.xml`, `/robots.txt`, `/llms.txt`, `/entities.json`, `/knowledge-graph.json`, `/evidence.json`, `/rss.xml`, `/atom.xml` |
| Ops | `GET /api/health`, `GET /api/stats` |

Interactive reference is available at `/docs` in development. It is disabled
when `STUDIO_ENV=production`.

## Quality engine

Ten weighted dimensions, summing to 100, computed deterministically from
actual page/claim/evidence state — see `app/quality.py`:

| Dimension | Weight |
|---|---:|
| Intent | 15 |
| Factual accuracy | 15 |
| Original information | 15 |
| Answerability | 10 |
| Entity completeness | 10 |
| Evidence | 10 |
| Internal linking | 8 |
| UX / readability | 7 |
| Technical SEO | 5 |
| Schema accuracy | 5 |

## Publish gate (`app/quality.py::evaluate_publish_gate`)

A page can only move to `published` when **all** of the following hold:

- Total quality score ≥ 85
- Evidence coverage ≥ 70%
- Zero unsupported *critical* claims
- Word count ≥ 300
- Title and meta description present
- No duplicate title against another page

`POST /api/pages/{id}/publish` always recomputes this from scratch — it never
trusts a stale `quality_score` already stored on the row.

It also requires a named reviewer/admin approval tied to the SHA-256 hash of
the current body. Any body edit invalidates that approval.

## Docker

```bash
docker compose up --build
```
