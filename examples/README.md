# Examples

Real, working examples for extending and querying the Best AI Agent catalogue.

> This is a **content/evaluation catalogue**, not an agent framework — so "examples" here means *how to extend the catalogue* and *how to query the graph API*, not "build your first agent". Only real, verified workflows are included.

| # | Example | What it shows | Run |
|---|---------|---------------|-----|
| 01 | [`01-add-verified-agent`](01-add-verified-agent) | Add an agent entity with a real `EvidenceClaim` (passage-quoted, gated by `EVIDENCE_RULES`) | Apply snippet → `npm run test:evidence` |
| 02 | [`02-add-comparison`](02-add-comparison) | Add a one-directional `A-vs-B` comparison (canonical direction rule — no reverse pairings indexable) | Apply snippet → `npx tsx scripts/verify-routes.ts` |
| 03 | [`03-query-knowledge-graph-api`](03-query-knowledge-graph-api) | Consume the `/api/graph/{stats,related,similar,path}` endpoints against a running server | `./run.sh` |

Each example contains a `README.md` (what/why/expected), the snippet or script, and the run command. No fabricated entities, scores, or adoption numbers — every shape matches the codebase.

## Prerequisites (all examples)

```bash
npm ci
cp .env.example .env        # add your own GEMINI_API_KEY / APP_URL (optional for these examples)
```

Node.js >=20 (CI runs 24). See [`../CONTRIBUTING.md`](../CONTRIBUTING.md) for the full evidence and routing contracts these examples teach.
