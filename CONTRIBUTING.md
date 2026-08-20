# Contributing to Best AI Agent

Thanks for contributing. This is an **India-first, evidence-backed AI-agent catalogue** — a content/evaluation platform, not an agent runtime (see [`docs/POSITIONING.md`](docs/POSITIONING.md) for what it is and is not). The load-bearing contracts of this repo are **canonical routing** and **evidence-backed claims**, so most contributions touch one or both.

> **Licensing:** the project's license is pending owner confirmation. Until a `LICENSE` file lands, contributions are accepted on a per-commit basis per the maintainer's guidance in the PR. Do not assume a license. (See `AUDIT.md` §O.2.)

---

## What we welcome

| Contribution type | Example | Effort |
|---|---|---|
| New verified entity | Add an agent to `src/data/agents.ts` with a real `officialUrl` + an `EvidenceClaim` | First-issue friendly |
| New head-to-head comparison | One canonical `A-vs-B` slug; no reverse pairings both indexable | First-issue friendly |
| Evidence dispute / correction | Replace an outdated `EvidenceClaim` with a fresh primary `EvidenceSource` (new `retrievedAt`, updated `passage`) | First-issue friendly |
| Redirect / canonical fixes | Fix a broken `legacyRedirects` destination or a non-canonical slug | First-issue friendly |
| India pricing freshness | Update `pricingItems` for an agent with the vendor's current INR tier | First-issue friendly |
| Routing/routing-layer work | Touch `src/routing/routeRegistry.ts` / `routeResolver.ts` | Maintainer review required (see `CODEOWNERS`) |
| Docs | Fix `docs/ARCHITECTURE.md`, `README.md`, or `llms.txt` accuracy | Open |
| CI / tooling | Add a real ESLint config, split `lint`/`typecheck` (see `AUDIT.md` §G.2) | Open |

Look for issues labelled `good first issue`. If none exist, the simplest valuable contribution is **one verified entity + one evidence receipt**.

---

## The evidence contract (load-bearing)

A factual claim is only publishable if it traces to an `EvidenceClaim` backed by `EvidenceSource` entries. Sourced from `src/data/evidenceSchema.ts`:

```ts
// Authoritative in src/data/evidenceSchema.ts (paraphrased; that file governs)
interface EvidenceSource {
  url: string;          // the real primary source URL
  publisher: string;    // e.g. "Cursor docs", "Anthropic", "GitHub"
  retrievedAt: string;  // ISO 8601 — when you fetched the source
  passage: string;      // the EXACT supporting text you quote from the source
  locator?: string;     // optional selector / page / section
  authority: 'primary' | 'secondary' | 'tertiary';
  freshness?: string;
}

interface EvidenceClaim {
  id: string;                       // e.g. "claim-pricing-1"
  statement: string;                // the exact claim being made
  evidence: EvidenceSource[];       // one or more sources
  confidence: number;               // 0-100, per EVIDENCE_RULES
  status: 'active' | 'expired' | 'contradicted' | 'superseded';
  verifiedAt: string;              // ISO 8601
}
```

Each agent references its claims via `evidenceIds?: string[]` on the `Agent` interface in `src/data/agents.ts`.

### Confidence gates (EVIDENCE_RULES, from `evidenceSchema.ts`)

| Rule | Min confidence | Sources required |
|------|----------------|------------------|
| `CRITICAL` | ≥ 90 | 2+ primary **or** 1 primary + 2 secondary |
| `STANDARD` | ≥ 80 | 1+ primary |
| `COMPARISON` | ≥ 85 | 2+ primary |

Rules:

1. **Primary source first.** Vendor docs, official pricing pages, upstream OSS repos. Blog posts and AI summaries are not primary.
2. **Quote the exact passage.** `EvidenceSource.passage` must be the supporting text you actually read at `url` on `retrievedAt` — not a paraphrase or what a guide said the source contains. (A misread passage is exactly the failure mode that produced the original "Cursor Pro Plus $39" error in upstream analysis, where the real value was $60; the passage-citation discipline catches this.) Note: this donor repo does **not** hash source content — the receipt's integrity is the quoted passage + retrievable URL + retrievedAt, not a `contentHash`. (A companion project uses a `contentHash` model; this one does not.)
3. **Authority must match reality.** A `tertiary` source is fine if labeled; presenting a secondary blog as `primary` is a bug.
4. **Dispute, don't silently overwrite.** If you replace a claim, mark the old one `superseded` (or `contradicted`), link the old and new `id`s in your PR, and explain the delta.
5. **Unsupported claims get quarantined**, not published. `quarantine/` + `npm run check:quarantine` (a CI gate) enforce this.
6. **Content state machine** guards the lifecycle: `candidate → intent_validated → evidence_complete → blueprint_approved → draft → automated_validation → human_review → publish_approved → published → monitored → refresh_required`. Don't short-circuit it.

---

## The routing contract (load-bearing)

Resolution order in `src/routing/routeResolver.ts`: home → legacy 301 → exact canonical (published or redirect) → dynamic entity (validated against the real registry; non-canonical slug → 301 to canonical; unknown slug → 404).

Rules:

1. **One canonical per entity.** Add to `canonicalRoutes` in `routeRegistry.ts`.
2. **Redirect targets must resolve.** A `legacyRedirects` entry pointing to a 404 or chaining is a bug (run `npx tsx scripts/verify-redirect-destinations.ts`).
3. **Comparison canonical direction is one-way.** Pick one `A-vs-B` slug; redirect the reverse. Never make both `A-vs-B` **and** `B-vs-A` indexable.
4. **No self-referential trailing-slash redirects** (they never fire under `pathNormalization.ts`).
5. **Don't synthesize 404s into pages.** Unknown slugs return 404 with `noindex, follow` — that's intended.

---

## Setup

Requirements: **Node.js 20+** (CI runs on 24; `engines` field declares `>=20`). `npm` is the canonical package manager — CI runs `npm ci` from `package-lock.json`. (The redundant `bun.lock` was removed from version control on 2026-08-20; see `AUDIT.md` §G.4 / `CHANGELOG.md`.)

```bash
git clone https://github.com/CodesbyFebin/best-ai-agent.git
cd best-ai-agent
npm ci
cp .env.example .env        # add your own GEMINI_API_KEY / APP_URL
npm run dev                 # → http://localhost:3000
```

---

## Your first contribution (add a verified agent)

```bash
# 1. Create a branch
git switch -c add-agent-<slug>

# 2. Add the entity to src/data/agents.ts with a real officialUrl + an evidenceIds array

# 3. Add the evidence claim (src/data/agentEvidence.ts or evidence/ on disk)
#    - record a real fetched source URL
#    - quote the EXACT supporting passage from that source into EvidenceSource.passage
#    - set retrievedAt (today's ISO date) and authority='primary' (or 'secondary'/'tertiary')
#    - set the claim's confidence per EVIDENCE_RULES (CRITICAL>=90, STANDARD>=80, COMPARISON>=85)
#    - reference the claim's id in the entity's evidenceIds array

# 4. Verify locally (this is what CI will run a subset of)
npm run lint
npm run check:quarantine
npm run build
npm run test:evidence
npx tsx scripts/verify-routes.ts

# 5. Open a PR using .github/PULL_REQUEST_TEMPLATE.md
```

---

## Development commands (verified working set)

| Command | What it does |
|---|---|
| `npm run dev` | `tsx server.tsx` with Vite HMR |
| `npm run build` | `vite build && esbuild … → dist/server.cjs` |
| `npm start` | `node dist/server.cjs` |
| `npm run lint` | `tsc --noEmit` (typecheck — see note below) |
| `npm run check:quarantine` | Quarantine integrity |
| `npm run test:evidence` | Evidence receipts valid + hash-shaped |
| `npm run test:sitemap` | Sitemap index + segments |
| `npm run test:ssr` | SSR hydration |
| `npm run test:graph` | Knowledge-graph integrity |
| `npm run test:manifest` | Content manifests |
| `npm run test:production` | Full production-readiness suite |
| `npm run test:scope-freeze` | Scope-freeze invariants |

> **Known gap (see `AUDIT.md` §G.2):** `npm run lint` is `tsc --noEmit` — it typechecks, it does not lint. ESLint deps are installed but unconfigured. Adding a real ESLint config + splitting `lint`/`typecheck` is an open contribution. Don't add new "lint" scripts that shadow this without coordinating — CI depends on the current name.

---

## Commit & PR conventions

- Commit subject prefix: `feat(...)`, `fix(...)`, `docs(...)`, `chore(...)`, `refactor(...)`, matching existing history (`a54d4fa fix(routing): …`).
- One concern per PR where possible.
- Fill in `.github/PULL_REQUEST_TEMPLATE.md` — especially the evidence-discipline and local verification sections.
- Don't commit secrets. `.gitignore` already excludes `.env`; double-check a stray `account`-style file isn't staged if you `git add .`.

---

## Style

- TypeScript, `target: ES2022`, `module: ESNext`, `jsx: react-jsx`, `moduleResolution: bundler`.
- Match the surrounding file's style. The routing and data layers prefer terse typed registries; components prefer small focused files under `src/components/{home,layout,pages}/`.
- Don't add comments that restate what the code says — reserve them for constraints the code can't show (e.g. why a redirect target was chosen).

---

## Out of scope

To keep evidence first and the project truthful, the following are **not** accepted without maintainer sign-off:

- Invented metrics, "verified" badges without receipts, fabricated benchmarks or adoption numbers.
- Bulk-generated thin PSEO pages (the project explicitly avoids regenerating thousands of pages).
- Changes that make `robots.txt` / sitemaps indexable-blocking tricks, or that flip canonical hostname away from the chosen direction.
- "Run-the-agent" runtime features — this is a catalogue, not a framework.

---

## Reporting problems with the contribution process

Open an issue with the `triage` label, or see [`SUPPORT.md`](SUPPORT.md) for channel routing. Code of conduct: [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md). Security reports: [`SECURITY.md`](SECURITY.md) — **not** a public issue.
