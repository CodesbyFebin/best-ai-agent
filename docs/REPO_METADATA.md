# Repository Metadata & Discoverability (Phase 19/15/26)

> Actions to configure `CodesbyFebin/best-ai-agent` for genuine organic GitHub discoverability. No fabricated metrics, no "trending" claims, no unrelated topics.

These actions require GitHub repository **Settings** access (the repo owner does them; this document provides the exact values). Everything proposed below is derived from the audited product — see [`AUDIT.md`](../AUDIT.md) and [`docs/POSITIONING.md`](./POSITIONING.md).

## 1. Repository Description (Settings → General → About)

```
India-first, evidence-backed AI agent discovery, comparison, pricing, and evaluation platform.
```

Why this one: it states the product's real differentiator (evidence-backed + India-first) and its function (discovery/comparison/pricing/evaluation) in one searchable line. Avoids the generic "AI agent" keyword-stuffing that buries thousands of repos.

## 2. Website URL (Settings → General → About → website)

```
https://bestaiagent.in
```

## 3. Topics (Settings → General → About → gear icon)

Use only topics that describe the actual product. Recommended set (≤20):

```
ai-agents  ai-agent  agent-comparison  mcp  model-context-protocol
india  inr-pricing  dpdp  evidence-based  canonical-routing
ssr  react  express  vite  typescript  tailwind
knowledge-graph  llm-txt  seo  aeo
```

Do NOT add: `trending`, `best-in-class`, `agent-framework` (it isn't one), `llm` (generic), `chatgpt` (an entity, not this product), `gpt`, `claude` (entities in the catalogue, not the catalogue).

## 4. Social preview image (Settings → General → Social preview)

Create a 1280×640 PNG:
- Background: a muted, technical dark canvas (not neon).
- Title: `BEST AI AGENT` (large).
- Subtitle: `Build · Compare · Price AI Agents (India-first, evidence-backed)`.
- A small, restrained visual: the request-flow arrow from [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md) (Request → Resolver → Entity → Evidence).
- No logos of the catalogued agents (trademark clutter); no fake dashboards.

Store the source as `docs/assets/social-preview.svg` (an editable SVG) plus the rendered PNG. Add `docs/assets/` to `.gitignore` if the PNG is large, or commit it if under ~200 KB. Commit the SVG regardless.

## 5. Repository name

`best-ai-agent` is fine. Do not rename — the `package.json` `name`, the README, the docs, the CI badges, and Dependabot URLs all reference it. (Confirmed: `package.json` now says `best-ai-agent`, matching the repo.)

## 6. Pinned issue (create a new issue, then pin it)

Title:
```
Start here — what this project is, what's in scope, and how to contribute
```

Body should link: `README.md`, `CONTRIBUTING.md`, `docs/POSITIONING.md`, `AUDIT.md`, and a list of `good first issue` candidates (add a verified entity; add a one-directional comparison; fix a doc). Pin it so it's the first thing a new visitor sees.

## 7. Pinned discussion (if Discussions is enabled)

Title:
```
Showcase & introductions — tell us what you're building or evaluating
```

## 8. GitHub Discussions enablement

Settings → General → Features → turn **Discussions** ON, then configure categories per [`SUPPORT.md`](../SUPPORT.md): Announcements, Q&A, Ideas, Show and Tell, Agent recipes, Integrations, Troubleshooting, Architecture.

## 9. Security & Insights

- Settings → Security → ensure **Private vulnerability reporting** and **Security advisories** are enabled (matches [`SECURITY.md`](../SECURITY.md)).
- Insights → Community standards should now show CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, SUPPORT, issue templates, PR template, and CHANGELOG as **present** (the files added in Phase 9–14 satisfy the checklist).
- Enable branch protection on `main` with required status checks (`CI / quality`) once you're sure the eslint advisory step does not cause confusion (it has `continue-on-error`, so it won't block).

## 10. What NOT to do

- Do not ask for or trade stars.
- Do not mass-create issues to look active.
- Do not fabricate a Star History chart (the README already says one will be added when genuine stars exist).
- Do not tag `trending` anywhere.
- Do not buy or fake followers/contributors.
- Do not keyword-stuff the description.

## Verification

After these actions, re-check GitHub Insights → Community standards — the checklist should be fully green except "README" (already present; this confirms the files all registered). Re-check Settings → Security — "Security policy" should show `SECURITY.md`.
