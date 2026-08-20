<!--
PR template — Best AI Agent
Before opening a PR, run the local release gates. CI runs a sub-set automatically;
running them locally first saves everyone a review round.
-->

## Summary

<!-- One or two sentences: what does this PR change and why? -->

## Type of change

- [ ] Bug fix (non-breaking)
- [ ] New / enriched entity (agent, comparison, MCP server, category)
- [ ] New evidence receipt / source link
- [ ] Routing / redirect / canonical change
- [ ] Documentation
- [ ] Tooling / CI / build
- [ ] Breaking change (describe below)

## Evidence discipline

Every factual claim must trace to a receipt. Check what applies:

- [ ] Any new factual claim has an `EvidenceClaim` (`src/data/evidenceSchema.ts`) backed by an `EvidenceSource[]` — real `url`, `publisher`, `retrievedAt`, and the EXACT `passage` quoted from the source (this repo does not hash source content).
- [ ] The authority label (`primary` / `secondary` / `tertiary`) matches the source. Only `primary` (or explicitly-flagged) claims are presented as fact.
- [ ] No fabricated metrics, stars, downloads, benchmarks, or "verified" badges without a receipt.
- [ ] Unsupported claims were quarantined under `quarantine/` (and `npm run check:quarantine` still passes).

> For content corrections, dispute an existing evidence receipt rather than silently overwriting it — link the old and new receipts in the PR description.

## Routing discipline (if touching routing/redirects)

- [ ] Route added/changed in `src/routing/routeRegistry.ts`.
- [ ] Redirect targets resolve to a real canonical page (no chains, no 404 destinations).
- [ ] Comparison canonical direction is one-way (no `A-vs-B` **and** `B-vs-A` indexable).
- [ ] No self-referential trailing-slash redirects.

## Local verification run

<!-- Paste the actual command output, not just the expected result. -->

```bash
npm ci
npm run lint                # tsc --noEmit — exit 0
npm run check:quarantine     # quarantine integrity
npm run build               # produces dist/server.cjs + Vite client assets
# Relevant subset:
npm run test:evidence       # if evidence changed
npm run test:sitemap        # if routes changed
npm run test:ssr            # if SSR changed
npm run test:redirects      # npx tsx scripts/verify-redirects.ts  (if redirects changed)
```

## Change scope

<!-- List the files changed and a one-line reason each. Paths only — no code dumps. -->

## Related issues / PRs

<!-- Closes #... · Refs #... -->
