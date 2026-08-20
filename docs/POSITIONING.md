# Product Positioning — Best AI Agent

> Evidence-first positioning derived from the audited source code (see `AUDIT.md`).
> Every descriptor below is grounded in a VERIFIED capability. Where the product is *not* something, that is stated explicitly to prevent misrepresentation.

---

## One-line description
India-first, evidence-backed directory for discovering, comparing, and pricing AI agents.

## 50-word description
BestAIAgent.in is an India-first, evidence-backed platform that catalogues, compares, and prices AI agents. Every entity carries source-linked identity, a verification status, and passage-quoted evidence receipts. Head-to-head comparisons, MCP-server setup guides, and INR pricing with India-Fit, GST, and DPDP context help Indian developers and buyers evaluate agents without marketing noise.

## 150-word description
BestAIAgent.in is an India-first, evidence-backed discovery and evaluation platform for AI agents — not an agent runtime. It publishes curated profiles of coding, research, voice, business, and automation agents, each with source-linked identity, a verification status, and dated passage-quoted evidence receipts. Users get head-to-head comparisons, category hubs, MCP-server setup guides, India-INR pricing tables with GST/DPDP signals, an India-Fit score, and a reproducible editorial scoring method.

The platform is a server-side-rendered React 19 + Express site with canonical routing, segmented XML sitemaps, JSON-LD, and an `llms.txt` index for AI crawlers. A verified release pipeline (`ci.yml`) runs 16 verification scripts covering redirects, routing, sitemaps, SSR, evidence, manifests, and scope-freeze. It solves a real gap: independent, evidence-first evaluation with India-specific context that international directories do not provide. It does not execute LLM agent loops, host models, or orchestrate tools.

## Technical description
A canonical-routing SSR content platform: Express 4.21 serves `server.tsx` (Vite dev middleware in development; `esbuild`→CJS bundle in production). A `RouteRecord` registry of 110 canonical routes + 171 legacy redirects drives `routeResolver.ts`, which validates dynamic slugs against real entity registries and returns 404 for unknown slugs instead of synthesizing pages. The domain layer (`src/data/`) defines agents, comparisons, categories, MCP servers, research, and authors, each carrying `evidenceIds` that resolve to `EvidenceClaim` receipts (statement + `EvidenceSource[]` quoting the exact supporting passage, with `retrievedAt`, `authority`, and a `confidence` score gated by `EVIDENCE_RULES`). Segmented sitemap generation, RSS, and an `llms.txt` topical index feed discovery. A CI gate runs `tsc`, quarantine checks, the production build, and the `verify-*` scripts.

## Beginner description
BestAIAgent.in is a website that helps you choose an AI agent (like a coding assistant or a voice bot) if you are in India. It lists the agents, shows what each one costs in rupees, compares them side by side, and tells you where every fact came from — with a link and a verified date — so you know nothing is made up.

## Developer description
A TypeScript SSR content site (React 19 + Express + Vite) built around a strict canonical-routing and evidence-schema core. Add an agent in `src/data/agents.ts`, attach evidence in `evidence/`, and the resolver, sitemap generator, and 16 verify scripts pick it up automatically. The same codebase deploys to Vercel via `api/index.ts`. Extend, don't rewrite: the routing and evidence layers are the load-bearing contracts.

## Contributor description
The repository is a content platform with strong automated invariants: routing, redirects, sitemaps, SSR, evidence, manifests, and scope-freeze are all checked in CI. A good first contribution adds a verified entity (with a real source URL and an evidence receipt) or fixes a single broken/redirected URL. See `CONTRIBUTING.md`, then run `npm run verify-*` locally before opening a PR — CI will run them anyway.

## What it is / is not
- **IS:** a discovery, comparison, pricing, and editorial-evaluation catalogue for AI agents, with India-first context.
- **IS NOT:** an agent framework, an LLM runtime, a tool-orchestration engine, or a model host. It does not "build" or "run" agents; it catalogues and evaluates agents that other people built.

## WHAT / WHO / WHAT PROBLEM / WHY / HOW / RUN / EXTEND
- **WHAT:** evidence-backed AI-agent discovery/comparison/pricing/evaluation platform.
- **WHO:** Indian developers, startups, SMEs, and enterprise buyers evaluating AI agents.
- **WHAT PROBLEM:** AI-agent marketing noise + no India-specific (INR/GST/DPDP/India-Fit) evaluation layer.
- **WHY IT EXISTS:** to provide independent, source-linked, evidence-first evaluation instead of vendor claims.
- **HOW IT WORKS:** curated entity registry → canonical routing → SSR + hydration → per-entity `evidenceIds` → `EvidenceClaim` receipts (passage-quoted) → editorial + India-Fit scoring → segmented sitemaps + `llms.txt`.
- **HOW TO RUN:** `npm ci` → `cp .env.example .env` → `npm run dev` → http://localhost:3000.
- **HOW TO EXTEND:** add an entity + an evidence record; routing/sitemap/verify scripts pick it up automatically.

## Repository tagline (GitHub search / discovery)
> India-first, evidence-backed AI agent directory — discover, compare, and price AI agents with source-linked, verified evidence and INR pricing context.

(Avoids keyword stuffing; uses the product's real, audited identity.)
