# BestAIAgent.in Authority & Backlink Acquisition Engine

Purpose: acquire high-authority backlinks, brand mentions, referral traffic, and AI crawler visibility without paid link schemes, spam, or inflated claims.

## Phase 1: Backlink Readiness Audit

Do not run outreach until these assets remain live, crawlable, and linked from the footer or `llms.txt`.

| Asset | URL | Status | Fix Before Outreach |
|---|---:|---|---|
| Editorial Policy | `/editorial-policy` | Ready | Keep conflict-of-interest language visible. |
| Methodology Page | `/methodology` | Ready | Add new benchmark updates quarterly. |
| Review Policy | `/review-policy` | Ready | Keep no-fake-review policy explicit. |
| Corrections Policy | `/corrections-policy` | Ready | Add response SLA when team capacity is clear. |
| Affiliate Disclosure | `/affiliate-disclosure` | Ready | Keep commercial links labeled when sponsored. |
| About Editorial Team | `/about-editorial-team` | Ready | Add real bios only; no invented credentials. |
| Contact Page | `/contact` | Ready | Add a corrections-specific subject option. |
| Author Profile | `/authors/arshdeep-singh` | Ready | Add externally verifiable profiles when available. |
| Structured Data | Generated route metadata | Ready | Continue `npm run seo:audit` before launches. |
| Sitemap | `/sitemap.xml` | Ready | Submit after every major content batch. |
| robots.txt | `/robots.txt` | Ready | Keep AI crawler policy explicit. |
| llms.txt | `/llms.txt` | Ready | Add reports as they ship. |
| Benchmark Methodology | `/benchmark-methodology` | Ready | Expand with reproducible test data. |

Readiness actions:
1. Run `npm run seo:audit`.
2. Confirm no unresolved internal links.
3. Confirm all outreach destination pages have no fake ratings, no unsupported superlatives, and clear methodology/corrections links.
4. Use only official-source citations through `src/data/externalLinks.ts`.

## Phase 2: Linkable Assets

| Asset | Audience | Linkability | Outreach Targets | Effort | Risk | SEO Value | Referral | AI Visibility | Time to Impact |
|---|---|---:|---|---:|---:|---:|---:|---:|---|
| AI Agent Landscape 2026 | AI newsletters, VC blogs, founders | 9 | TLDR AI, Ben's Bites, VC blogs, Indian SaaS newsletters | 7 | 2 | 9 | 7 | 9 | 4-8 weeks |
| Top 500 AI Agents Database | Developers, directories, analysts | 10 | GitHub awesome lists, AI directories, data journalists | 8 | 2 | 10 | 8 | 10 | 3-6 weeks |
| AI Agent Market Map | Founders, investors, product marketers | 8 | VC firms, product newsletters, LinkedIn creators | 6 | 2 | 8 | 7 | 7 | 3-5 weeks |
| AI Agent Benchmark Report | Developers, CTOs, researchers | 10 | Hacker News, Dev.to, GitHub, research blogs | 9 | 3 | 10 | 8 | 10 | 4-10 weeks |
| MCP Ecosystem Report | Developers, protocol communities | 9 | MCP Discord, LangChain, Cursor/Cline communities | 7 | 2 | 9 | 7 | 10 | 2-6 weeks |
| India AI Agent Adoption Report | India startups, media, enterprise buyers | 8 | YourStory, Inc42, SaaSBoomi, Nasscom groups | 7 | 2 | 8 | 8 | 8 | 4-8 weeks |
| Best AI Coding Agents Benchmark | Developers, engineering managers | 9 | Dev.to, Hashnode, HN, GitHub lists | 7 | 2 | 9 | 8 | 9 | 2-5 weeks |
| AI Agent Cost Comparison | Buyers, finance teams, founders | 8 | SaaS blogs, procurement communities, Indie Hackers | 5 | 1 | 8 | 7 | 8 | 2-4 weeks |
| Open Source Agent Rankings | OSS maintainers, developers | 8 | GitHub, Reddit programming, open-source newsletters | 6 | 2 | 8 | 6 | 8 | 3-6 weeks |
| Voice Agent Comparison Report | CX teams, call centers, SMBs | 7 | CX newsletters, call-center communities, Vapi/Retell users | 6 | 2 | 7 | 7 | 7 | 4-8 weeks |
| AI Agent Finder | Buyers, founders | 8 | Product Hunt, SaaSHub, AlternativeTo | 6 | 1 | 8 | 9 | 8 | 2-4 weeks |
| AI Agent Comparison Tool | Developers, buyers | 9 | Product Hunt, Dev.to, GitHub README links | 7 | 1 | 9 | 8 | 9 | 2-5 weeks |
| AI Agent Directory | Directories, bloggers, LLM crawlers | 10 | Awesome lists, directory roundups, AI newsletters | 8 | 2 | 10 | 8 | 10 | 3-8 weeks |
| MCP Directory | Developers, protocol users | 9 | MCP communities, GitHub lists, HN | 7 | 2 | 9 | 7 | 10 | 2-6 weeks |
| AI Agent Benchmark Explorer | Engineers, journalists | 10 | HN, GitHub, AI research bloggers | 9 | 3 | 10 | 8 | 10 | 6-12 weeks |

Implementation order:
1. Publish benchmark methodology and raw scoring fields before pitching benchmark assets.
2. Make each report include charts, CSV/JSON export, definitions, methodology, update date, and citation-ready summary.
3. Add each asset to `llms.txt`, sitemap, footer/internal links, and relevant hub pages.
4. Pitch one unique data angle per outreach target.

## Phase 3: Directory Submission Profiles

Use neutral descriptions. Avoid "best", "leading", "number one", or unsupported traffic/page claims.

| Platform | Title | Categories | Tags | Short Pitch | Effort | Risk | SEO | Referral | AI Visibility | Impact |
|---|---|---|---|---|---:|---:|---:|---:|---:|---|
| Product Hunt | BestAIAgent.in | AI, Developer Tools, SaaS | AI agents, MCP, India, directory | India-focused AI agent directory with comparisons, INR pricing notes, and methodology-backed reviews. | 6 | 2 | 8 | 9 | 8 | 2-4 weeks |
| BetaList | BestAIAgent.in | AI, SaaS, Developer Tools | agents, startups, automation | A research-backed platform for comparing AI agents, builders, MCP tools, and automation software. | 4 | 1 | 5 | 5 | 5 | 2-6 weeks |
| Crunchbase | BestAIAgent.in | Information Services, AI, SaaS | AI agents, software reviews | Independent AI agent review and comparison platform focused on India-market buying criteria. | 3 | 1 | 6 | 3 | 5 | 2-4 weeks |
| AngelList | BestAIAgent.in | AI, SaaS, Developer Tools | AI, India, agents | A bootstrapped AI agent research platform for developers and business buyers. | 3 | 1 | 5 | 3 | 4 | 2-4 weeks |
| AlternativeTo | BestAIAgent.in | AI Tools, Software Reviews | comparison, directory, AI agents | Compare AI agent tools by use case, pricing model, deployment needs, and alternatives. | 4 | 1 | 6 | 4 | 5 | 2-5 weeks |
| SaaSHub | BestAIAgent.in | AI Tools, Directories | agent directory, reviews | AI agent directory and comparison hub for coding, voice, business, and MCP workflows. | 3 | 1 | 6 | 3 | 4 | 3-6 weeks |
| SourceForge | BestAIAgent | AI, TypeScript, Web App | open source, directory | Open-source TypeScript site for AI agent reviews, directories, and SEO-safe research pages. | 4 | 1 | 5 | 3 | 4 | 3-6 weeks |
| G2 | BestAIAgent.in | Software Reviews | AI tools, comparison | AI agent comparison and research platform. Submit only if category fit is accepted. | 6 | 2 | 7 | 5 | 5 | 1-3 months |
| Capterra | BestAIAgent.in | Software Advice, AI | AI platform, directory | Research and comparison platform for AI agent software selection. | 6 | 2 | 7 | 5 | 5 | 1-3 months |
| Slant | BestAIAgent.in | AI Tools, Developer Tools | comparisons, India | Resource for evaluating AI agents with transparent methodology and regional buying notes. | 3 | 1 | 5 | 3 | 4 | 3-6 weeks |
| Indie Hackers | BestAIAgent.in | Product, AI, SEO | build in public, directory | Building an AI agent database with transparent reviews, directories, and benchmark assets. | 4 | 1 | 5 | 6 | 5 | 1-3 weeks |

Founder bio:
`Arshdeep Singh leads BestAIAgent.in editorial methodology and India-market AI agent research. The project focuses on transparent comparisons, official-source verification, and practical buyer guidance for developers, startups, and business teams.`

Long pitch:
`BestAIAgent.in is an independent AI agent research and comparison platform. It organizes AI coding agents, voice agents, business automation tools, open-source frameworks, MCP resources, alternatives, pricing guides, tutorials, and entity pages. The site emphasizes official-source citations, clear methodology, INR-aware buying notes, and correction-friendly editorial standards.`

Launch checklist:
1. Confirm homepage, methodology, review policy, affiliate disclosure, contact, and author pages are live.
2. Prepare 5 screenshots: homepage, directory, comparison page, product profile, MCP hub.
3. Prepare 60-second demo GIF/video.
4. Submit neutral profile copy.
5. Track listing URL, approval status, link type, and referral traffic.

## Phase 4: GitHub Authority PR Templates

### awesome-ai-agents
Title: `Add BestAIAgent.in AI agent comparison resource`

Description:
`This PR adds BestAIAgent.in as a resource for comparing AI agents, frameworks, builders, and MCP-related tools. The site includes methodology pages, official-source citations, and comparison/directories useful for developers evaluating tools.`

Justification:
`The resource is useful for readers who want structured AI agent comparisons, India-market pricing notes, and links to official documentation.`

Value added:
`Adds a maintained, methodology-backed directory rather than a single vendor page.`

Maintainer wording:
`Happy to move this to a different section or adjust the description to match the list style.`

### awesome-chatgpt
Title: `Add AI agent comparison and MCP resource`

Description:
`BestAIAgent.in includes guides and comparisons for AI agents, MCP servers, agent builders, and ChatGPT-adjacent workflows.`

Justification:
`Useful as a neutral resource for users comparing tools that extend or complement ChatGPT workflows.`

### awesome-indian-startups
Title: `Add BestAIAgent.in to AI/ML resources`

Description:
`BestAIAgent.in is an India-focused AI agent research and comparison platform covering agent tools, builders, pricing notes, and compliance-aware selection criteria.`

Justification:
`Relevant to the Indian startup ecosystem because it focuses on India-specific procurement, pricing, and deployment considerations.`

### ai-startups
Title: `Add BestAIAgent.in AI agent research platform`

Description:
`Adding BestAIAgent.in as an AI agent comparison and research platform with directories, alternatives, pricing pages, and benchmark-oriented content.`

Rule: never imply endorsement by maintainers. Submit only to lists where resource links are accepted.

## Phase 5: Developer Community Content

| Channel | Article | Canonical URL | Links To Include | CTA | Effort | Risk | SEO | Referral | AI Visibility | Impact |
|---|---|---|---|---|---:|---:|---:|---:|---:|---|
| Dev.to | Best AI Coding Agents in 2026 | `/best-ai-agent-for-coding` | Cursor, Copilot, Claude Code, methodology | "See the full comparison table" | 5 | 1 | 7 | 7 | 7 | 2-4 weeks |
| Dev.to | MCP Explained for Developers | `/what-is-mcp` | MCP hub, MCP directory, security guide | "Browse MCP server resources" | 5 | 1 | 8 | 7 | 9 | 2-4 weeks |
| Dev.to | LangGraph vs CrewAI | `/crewai-vs-langgraph` | CrewAI docs, LangGraph docs, comparison | "Review the full criteria" | 4 | 1 | 7 | 6 | 7 | 2-4 weeks |
| Dev.to | Open Source AI Agents Compared | `/best-open-source-ai-agent-tools` | Flowise, Dify, CrewAI, AutoGen | "Compare self-hosting options" | 5 | 1 | 7 | 6 | 7 | 3-5 weeks |
| Hashnode | AI Agent Cost Comparison | `/ai-agent-cost-calculator` | pricing hub, calculator, methodology | "Use the calculator" | 5 | 1 | 6 | 6 | 7 | 3-5 weeks |
| Hashnode | Agentic AI vs AI Agents | `/what-is-agentic-ai` | glossary hub, entity pages | "Read definitions" | 4 | 1 | 6 | 5 | 8 | 3-6 weeks |
| Medium | India AI Agent Adoption Report | `/ai-agent-landscape-2026-india` | report, methodology, contact | "Cite the report" | 6 | 1 | 6 | 6 | 8 | 4-8 weeks |
| Medium | MCP Ecosystem Report | `/mcp-ecosystem-report-2026` | MCP hub, benchmark methodology | "Use the directory" | 6 | 1 | 7 | 6 | 9 | 4-8 weeks |

Publishing rules:
1. Use canonical URL when the platform supports it.
2. Include 2-4 internal links, not 12.
3. Cite official docs for vendor-specific feature/pricing claims.
4. Use a soft CTA: "full table", "methodology", or "download data".

## Phase 6: Digital PR

Press release angles:
1. Launch announcement: independent AI agent comparison platform for India.
2. Benchmark release: reproducible AI coding-agent benchmark with methodology.
3. Directory launch: browsable AI agent and MCP directory.
4. MCP marketplace launch: MCP servers, hosting, examples, and security resources.

Founder story:
`The founder built BestAIAgent.in after seeing Indian teams compare AI tools using US-centric pricing, vague rankings, and little clarity on DPDP, WhatsApp, GST, local deployment, or Hindi/Hinglish support. The site is designed as an evidence-first AI agent database, not a generic tools blog.`

Media kit checklist:
1. Logo and favicon.
2. 5 screenshots.
3. 100-word platform description.
4. Founder bio.
5. Methodology link.
6. Correction/contact link.
7. Current page/tool/report counts.

Outreach targets and templates:

| Target | Subject | Ask | Effort | Risk | SEO | Referral | AI Visibility | Impact |
|---|---|---|---:|---:|---:|---:|---:|---|
| AI newsletters | `Data resource: AI agent benchmark/report for your readers` | Include one report or chart | 4 | 1 | 8 | 7 | 8 | 2-6 weeks |
| AI blogs | `Guest data post on AI agents in India` | Publish original analysis | 6 | 2 | 8 | 6 | 8 | 4-8 weeks |
| Podcasts | `India AI agent adoption angle for a future episode` | Founder interview | 7 | 2 | 6 | 7 | 6 | 1-3 months |
| YouTubers | `Comparison data for AI agent tooling video` | Cite charts/tool table | 5 | 2 | 7 | 8 | 7 | 2-8 weeks |
| Developer communities | `MCP/server benchmark data to share` | Share data, no direct pitch | 4 | 1 | 6 | 6 | 8 | 2-6 weeks |

Email template:
`Hi [Name], I saw your recent coverage of [topic]. We maintain BestAIAgent.in, an independent AI agent comparison resource with methodology, official-source citations, and India-specific pricing/deployment notes. We recently published [asset]. The most useful data point for your audience is [one specific finding]. If helpful, I can send a short chart/table or answer methodology questions.`

## Phase 7: Community Authority

Rules:
1. Answer first, link last.
2. Share the chart/table directly in the comment when possible.
3. Link only when the page contains the full methodology or data.
4. Disclose affiliation.
5. Do not repost the same link across multiple communities.

| Community | Contribution | Link Policy | Effort | Risk | SEO | Referral | AI Visibility | Impact |
|---|---|---|---:|---:|---:|---:|---:|---|
| Reddit | Answer tool-selection questions with checklists | Link only when directly requested/relevant | 3 | 3 | 4 | 5 | 5 | ongoing |
| Hacker News | Submit only original benchmark/report launches | No marketing title | 5 | 4 | 7 | 9 | 8 | 1-7 days |
| Indie Hackers | Build-in-public updates with metrics/lessons | Link in profile/post context | 3 | 1 | 4 | 6 | 4 | 1-4 weeks |
| Discord | Share methodology and answer implementation questions | Prefer snippets over links | 3 | 2 | 3 | 4 | 5 | ongoing |
| AI Slack groups | Offer benchmark data and templates | Ask mod before posting resource | 4 | 2 | 3 | 4 | 5 | ongoing |

## Phase 8: Wikipedia-Safe Strategy

Never add BestAIAgent.in links to Wikipedia yourself as promotion.

Citation readiness checklist:
1. Report is authored, dated, and versioned.
2. Methodology is clear and reproducible.
3. Claims are factual, not promotional.
4. Data tables can be cited independently.
5. Corrections policy and contact are visible.
6. No affiliate CTA near the report section.

Source quality checklist:
1. Independent editorial control.
2. Primary-source citations for vendor facts.
3. Transparent scoring methodology.
4. Stable canonical URL.
5. No hidden paid placement.
6. Archived snapshots for major reports.

Neutral language examples:
| Promotional | Neutral |
|---|---|
| "BestAIAgent.in is the best AI agent site" | "BestAIAgent.in publishes AI agent comparison data with India-specific pricing notes." |
| "Our definitive benchmark proves Cursor wins" | "The report ranks Cursor highest under its stated coding-workflow criteria." |
| "Use our directory" | "The directory lists agent tools by category, pricing model, and use case." |

## Phase 9: AI Citation Optimization

LLM citation checklist:
1. Put a 40-60 word definition near the top of each entity/guide page.
2. Add fact blocks: category, vendor, pricing model, open-source status, official docs, last verified.
3. Use comparison tables with stable labels.
4. Include methodology and correction links.
5. Add official resource links via `ExternalLink`.
6. Add `dateModified` and author schema through route metadata.
7. Add report URLs to `llms.txt`.
8. Avoid unsupported "best" claims without criteria.

GEO checklist:
1. Answer the query directly in the first screen.
2. Use entity-consistent names: Cursor AI, GitHub Copilot, Claude Code, CrewAI, LangGraph, MCP.
3. Add "According to our methodology..." phrasing near scores.
4. Include primary-source official links.
5. Include India context only where relevant: INR, GST, DPDP, WhatsApp, Hindi/Hinglish.
6. Make tables parseable, not image-only.
7. Keep benchmark data in HTML and JSON artifacts when possible.

## Phase 10: Tracking Dashboard

Track weekly in `scripts/tracking-dashboard.md` or a spreadsheet.

| KPI | Tool/Source | Baseline | 30-Day Target | 90-Day Target |
|---|---|---:|---:|---:|
| Referring domains | Ahrefs/GSC/Bing WMT | 0 | 10 | 40 |
| Backlinks | Ahrefs/GSC | 0 | 25 | 120 |
| Brand mentions | Google Alerts/Brand24 | 0 | 10 | 50 |
| Organic clicks | GSC | current | +20% | +100% |
| Directory listings | Manual tracker | 0 | 8 | 15 |
| AI citations | Perplexity/ChatGPT/Gemini tests | 0 | 5 | 25 |
| Newsletter growth | ESP | 0 | 100 | 500 |
| Product Hunt followers | Product Hunt | 0 | 100 | 500 |
| GitHub stars | GitHub | current | +25 | +150 |
| Social mentions | X/LinkedIn/Reddit | 0 | 15 | 75 |

Priority order:
1. Publish/cite benchmark methodology.
2. Submit GitHub awesome-list PRs.
3. Submit Product Hunt and top directories.
4. Publish Dev.to/Hashnode technical posts.
5. Pitch AI newsletters with original data.
6. Share MCP report with protocol communities.
7. Build Wikipedia-citable reports without adding links yourself.

30-day implementation steps:
1. Week 1: complete Product Hunt, Crunchbase, AlternativeTo, SaaSHub profiles; submit 2 GitHub PRs.
2. Week 2: publish 2 Dev.to posts and 1 Hashnode post with canonical URLs.
3. Week 3: pitch MCP ecosystem report to 20 targeted newsletters/blogs/communities.
4. Week 4: publish benchmark/cost comparison update and send 20 follow-up pitches.

