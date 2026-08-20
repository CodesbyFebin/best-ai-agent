# Example 02 — Add a one-directional comparison

Add a `FeaturedComparison` to `src/data/comparisons.ts` using a single canonical `pairSlug`. The reverse pairing (`B-vs-A`) must **redirect** to this one — both must never be indexable. This is the load-bearing canonical-direction rule.

## What this demonstrates

- The `FeaturedComparison` interface shape (verified in `src/data/comparisons.ts`).
- The one-directional canonical rule: pick one slug; redirect the reverse in `src/routing/routeRegistry.ts` under `legacyRedirects`.
- How `verify-routes` / `verify-redirects` confirm the resolution.

## Prerequisites

- `npm ci` (from repo root).
- Two real agent slugs that already exist in `src/data/agents.ts` (so the comparison is between real catalogue entries).

## Configuration

Apply the snippet to `src/data/comparisons.ts` (`featuredComparisons` array). If a reverse `A-vs-B` entry already exists, **remove or redirect it** — do not keep both.

## Snippet — the comparison

```ts
// src/data/comparisons.ts — add to featuredComparisons (shape from the FeaturedComparison interface)
{
  pairSlug: "cursor-ai-vs-copilot",            // canonical direction, alphabetical-ish A-vs-B
  title: "Cursor AI vs GitHub Copilot",
  itemA: {
    name: "Cursor AI",
    slug: "cursor-ai",                          // must exist in src/data/agents.ts
    logo: "https://example.com/cursor.png",
    score: 8,                                   // back this with an EvidenceClaim, do not invent
  },
  itemB: {
    name: "GitHub Copilot",
    slug: "copilot",                             // must exist in src/data/agents.ts
    logo: "https://example.com/copilot.png",
    score: 8,
  },
  winnerByUseCase: {
    useCase: "Deep codebase refactoring",
    winnerName: "Cursor AI",
    reason: "Cursor's inline composer indexes the whole repo.",  // cite an EvidenceClaim
  },
  pricingDifference: "Cursor starts at $20/mo; Copilot Free tier $0, Pro $10/mo.",  // cite per-agent claims
  verdict: "Depends on workflow.",              // honest editorial verdict
  lastUpdated: "2026-08-20",
  urlPath: "/compare/cursor-ai-vs-copilot",
}
```

## Snippet — the redirect for the reverse pairing

```ts
// src/routing/routeRegistry.ts — in legacyRedirects, redirect the reverse B-vs-A to the canonical A-vs-B
"/compare/copilot-vs-cursor-ai": "/compare/cursor-ai-vs-copilot",
```

## Run command

```bash
# After applying both snippets:
npx tsx scripts/verify-routes.ts
npx tsx scripts/verify-redirects.ts
npm run test:sitemap      # the canonical comparison should appear in the comparisons segment
```

## Expected behavior

1. `npx tsx scripts/verify-routes.ts` confirms `/compare/cursor-ai-vs-copilot` resolves as canonical.
2. `npx tsx scripts/verify-redirects.ts` confirms `/compare/copilot-vs-cursor-ai` returns 301 → `/compare/cursor-ai-vs-copilot` (no 404, no chain).
3. `npm run test:sitemap` includes the canonical slug in `sitemap-comparisons.xml` and **excludes** the reverse slug.

## What NOT to do

- Do **not** add both `cursor-ai-vs-copilot` **and** `copilot-vs-cursor-ai` to `featuredComparisons` — only the canonical one is indexable.
- Do **not** invent a `score` for `itemA`/`itemB` without an `EvidenceClaim` backing it.
- Do **not** leave a reverse eyelet dangling — either redirect it or it becomes a 404 that stays a 404 (which is also fine for URLs nobody links to).
