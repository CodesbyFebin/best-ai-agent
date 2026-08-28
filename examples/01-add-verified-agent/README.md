# Example 01 — Add a verified agent

Add an agent entity to `src/data/agents.ts` with a real `EvidenceClaim` whose `EvidenceSource` quotes the exact supporting passage from a primary source. The claim must pass the `EVIDENCE_RULES` confidence gate before it is publishable.

## What this demonstrates

- The `Agent` interface fields that the resolver, sitemap, and evidence suite depend on.
- How `evidenceIds` links an entity to its `EvidenceClaim`(s).
- The passage-citation discipline: `EvidenceSource.passage` is the *exact* text read at `url` on `retrievedAt`, not a paraphrase.
- Confidence gating: `STANDARD` claims need ≥80 confidence with 1+ primary source.

## Prerequisites

- `npm ci` (from repo root).
- A real primary source URL to cite (vendor docs, official pricing page, or upstream OSS repo).

## Configuration

Save the snippets below to a scratch file for reference, then apply them to the real data files:
- Agent entry → `src/data/agents.ts` (the `featuredAgents` array or a new array).
- Evidence claim → `src/data/agentEvidence.ts` (or wherever claims are registered — see `getOrCreateAgentEvidence`).

## Snippet — the entity

```ts
// src/data/agents.ts — add to the appropriate array
{
  id: "httpx-ai",
  slug: "httpx-ai",
  name: "HTTPX AI",
  company: "HTTPX",
  logo: "https://example.com/logo.png",     // replace with a real logo URL
  summary: "Example agent for the catalogue demo.",   // write your own real summary
  bestFor: ["HTTP testing"],
  categories: ["automation"],
  pricing: { type: "free" },
  score: { overall: 8, reasoning: 8, toolUse: 8, value: 9, privacy: 8, easeOfUse: 8, indiaFit: 7 },
  deployment: ["CLI"],
  integrations: [],
  openSource: true,
  testingDate: "2026-08-20",
  updatedAt: "2026-08-20",
  knownLimitation: "Demo entry — replace with a real limitation.",
  reviewUrl: "/review/httpx-ai",
  officialUrl: "https://example.com/httpx-ai",   // replace with the real official URL
  evidenceIds: ["claim-httpx-identity-1"],      // link to the EvidenceClaim below
}
```

## Snippet — the evidence claim

```ts
// src/data/agentEvidence.ts (or the claims registry your setup uses)
// See src/data/evidenceSchema.ts for the authoritative EvidenceClaim / EvidenceSource shape.
{
  id: "claim-httpx-identity-1",
  statement: "HTTPX AI is an open-source CLI agent for HTTP testing automation.",
  evidence: [
    {
      url: "https://example.com/httpx-ai/docs",          // the REAL primary source
      publisher: "HTTPX",
      retrievedAt: "2026-08-20T14:00:00Z",
      passage: "HTTPX AI is an open-source command-line agent for HTTP test automation.",  // EXACT quote
      locator: "features section",
      authority: "primary",
    },
  ],
  confidence: 85,             // STANDARD gate needs >=80 with 1+ primary source
  status: "active",
  verifiedAt: "2026-08-20T14:00:00Z",
}
```

## Run command

```bash
# After applying both snippets:
npm run test:evidence          # evidence suite must pass (9/9)
npx tsx scripts/verify-routes.ts
```

## Expected behavior

1. `npm run test:evidence` prints `9 passed, 0 failed` — your claim either passes or fails the `EVIDENCE_RULES` gate cleanly.
2. `npx tsx scripts/verify-routes.ts` confirms the new agent's route (`/agents/httpx-ai`) resolves as a canonical page (or identifies it as missing if you did not register the route).
3. If confidence < 80 or `authority` is not `primary`, the claim will be flagged — fix the source or the score; do **not** inflate the number.

## What NOT to do

- Do **not** set `confidence: 95` with a blog (secondary/tertiary) source — that violates the `STANDARD` gate.
- Do **not** paraphrase `passage` — it must be the verbatim text you read at `url` on `retrievedAt`.
- Do **not** invent a score without a claim backing it.
