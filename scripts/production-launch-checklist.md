# BestAIAgent.in Production Launch Checklist

Use this once the Vercel production deployment points to `https://bestaiagent.in`.

## 1. Production Domain

1. In Vercel, set `bestaiagent.in` as the primary production domain.
2. Keep `www.bestaiagent.in` attached as an alias. The server redirects it to `https://bestaiagent.in`.
3. Do not submit Vercel preview URLs to search engines. Preview hosts receive `X-Robots-Tag: noindex, nofollow, noarchive` and forced noindex meta.
4. Confirm the production homepage returns:
   - Canonical: `https://bestaiagent.in/`
   - Robots: `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`
   - HTTP 200

DNS required at the registrar:

- `A bestaiagent.in 76.76.21.21`
- `A www.bestaiagent.in 76.76.21.21`

Current launch note: Vercel deployment protection may keep `.vercel.app` URLs behind SSO while custom domains remain public. This is acceptable because preview/Vercel URLs should not be indexed.

## 2. Environment Variables

Set these in Vercel Production only:

- `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
- `GOOGLE_SITE_VERIFICATION=<Google Search Console meta verification code>` if using meta verification
- `BING_SITE_VERIFICATION=<Bing Webmaster Tools meta verification code>` if using meta verification
- `INDEXNOW_KEY=<stable IndexNow key>` if replacing the default generated key

Vercel Analytics and Vercel Speed Insights are enabled in the React app with `@vercel/analytics` and `@vercel/speed-insights`.

## 3. Google Search Console

Add the domain property for `bestaiagent.in` with DNS verification when possible.

Submit:

- `https://bestaiagent.in/sitemap.xml`

Use URL Inspection for:

- `https://bestaiagent.in/`
- `https://bestaiagent.in/llms.txt`
- `https://bestaiagent.in/entity-index.json`
- `https://bestaiagent.in/content-index.json`
- `https://bestaiagent.in/contentIndex.json`

## 4. Bing Webmaster Tools

1. Import the verified Google Search Console property or verify directly.
2. Submit:
   - `https://bestaiagent.in/sitemap.xml`
3. Confirm IndexNow key file is live:
   - `https://bestaiagent.in/indexnow-key.txt`

## 5. Post-Deploy Smoke Tests

Run:

```bash
npm run seo:audit
npm run build
NODE_ENV=production npm run start
```

Then verify:

```bash
curl -I https://bestaiagent.in/
curl -I https://bestaiagent.in/sitemap.xml
curl -I https://bestaiagent.in/llms.txt
curl -I https://bestaiagent.in/entity-index.json
curl -I https://bestaiagent.in/content-index.json
```

Important pages to manually inspect:

- `https://bestaiagent.in/`
- `https://bestaiagent.in/best-ai-agent-for-coding`
- `https://bestaiagent.in/ai-agent-directory`
- `https://bestaiagent.in/mcp-hub`
- `https://bestaiagent.in/tools/cursor-ai`
- `https://bestaiagent.in/cursor-vs-copilot`

## 6. SEO Warning Policy

Fix warnings only when they affect important pages, indexability, canonical consolidation, structured data validity, or conversion-critical templates.

Do not block launch for:

- Short editorial/report pages that are intentionally concise
- Duplicate official external URLs shared by multiple related entities
- Verified-false external resources waiting on editorial confirmation

## 7. Authority Growth Queue

Launch assets in this order:

1. Product Hunt
   - Positioning: independent India-focused AI agent directory, comparisons, benchmarks, pricing, and MCP resources.
   - Link to: homepage, AI agent directory, benchmark hub, MCP hub.
2. GitHub Awesome Lists
   - Submit maintainer-friendly PRs from `scripts/github-pr-templates.md`.
   - Use neutral wording and cite utility, not promotion.
3. AlternativeTo
   - Submit BestAIAgent.in as a software discovery/comparison resource.
   - Categories: AI tools, software comparison, developer tools, business automation.
4. SaaSHub
   - Submit as an AI agent directory and comparison platform.
   - Emphasize directory, pricing, alternatives, and benchmarks.
5. Dev.to Launch Post
   - Article: `The AI Agent Database We Wanted for India: BestAIAgent.in`
   - Canonical URL: production launch article on BestAIAgent.in if published.
6. Hashnode Launch Post
   - Article: `How We Built an AI Agent Directory with llms.txt, Entity Indexes, and SEO-Ready Benchmarks`
   - Include links to `llms.txt`, `entity-index.json`, and benchmark pages.

## 8. KPI Dashboard Seed Metrics

Track weekly:

- Referring domains
- High-authority backlinks
- Brand mentions
- Google Search Console clicks/impressions
- Bing clicks/impressions
- Directory approvals
- Product Hunt followers/upvotes
- GitHub Awesome list approvals
- Dev.to and Hashnode reads
- AI citations from Perplexity, ChatGPT, Gemini, Claude, and Copilot
- Newsletter subscribers
