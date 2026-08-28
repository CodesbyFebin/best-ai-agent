# Handoff: Donor → Production (`bestaiagent.in`)

## Status snapshot

| Item | Donor repo (`CodesbyFebin/best-ai-agent`, Express/Vite monolith) | Production repo (`CodesbyFebin/bestaiagent.in`, Next.js App Router) |
|---|---|---|
| Routing fixes | Committed locally as `a54d4fa` (not pushed) | Already in progress — `b7b5228` (2026-08-20): "recover GSC sitemap, redirect and canonical coverage" |
| `/cursor-ai` canonical | `/cursor-ai → /agents/cursor` ✓ | `/cursor-ai → /agents/cursor` ✓ (already in `next.config.ts`) |
| `/best-ai-agent/` | Redirected ✓ | Already removed from page sitemap (`bb98e36`) |
| Sitemap access (19 aliases) | All return valid XML ✓ | All 19 mapped via `async rewrites()` in `next.config.ts` ✓ |

**The push is intentionally held.** Production is a separate Next.js repo, actively maintained (commits today), with a different stack and at least one conflicting canonical direction. Force-pushing the donor monolith over it would replace a working deployment.

## 🔴 Reconciliation required before any merge

The `/rankings` canonical direction is **opposite** between the two repos:

- Donor (my fix): `/ai-agent-rankings → /rankings` (treats `/rankings` as canonical)
- Production: `/rankings → /ai-agent-rankings` (treats `/ai-agent-rankings` as canonical)

Google honors one canonical per entity. Pick **one** direction and apply it to both. Production's existing choice (`/ai-agent-rankings` canonical) is the safer pick because:
- It's already deployed and indexed under that URL.
- Search Console captured `/ai-agent-rankings/` as a redirect-error URL — making it canonical resolves the error cleanly.

→ Pattern after porting: donor's redirect must be flipped to `/rankings → /ai-agent-rankings`.

## Net-new canonical routes production likely doesn't have yet

Production's `lib/recovery-entities.ts` currently contains only the `cursor` entity. Donor commit `a54d4fa` adds 35 canonical routes that production's GSC recovery work hasn't yet enumerated. These are candidates to add to `lib/recovery-entities.ts` (and corresponding `app/` page routes) in production.

### 5 new agent entities (35 → 5)

| Slug | Title (verifiable from product pages) |
|---|---|
| `github-copilot` | GitHub Copilot Review, Agent Mode & India Pricing (2026) |
| `intercom-ai` | Intercom Fin AI Agent Review & Pricing (2026) |
| `codex` | OpenAI Codex CLI Agent Review & Benchmarks (2026) |
| `replit` | Replit AI Agent Review: Autonomous App Builder (2026) |
| `agentops` | AgentOps Review: AI Agent Observability & Eval Platform (2026) |

### 12 new MCP server entities

`tally-prime-desktop-local-stdio`, `xero-accounting-ledger-integrator`, `databricks-delta-lake-pipeline`, `snyk-open-source-dependency-shield`, `aadhaar-ekyc-regulatory-sandbox`, `ecourts-india-njdg-document-scraper`, `fedex-ups-dhl-global-logistics`, `flexport-global-freight-forwarding`, `supabase-firebase-schema-sync`, `corelogic-property-data-aggregator`, `pdf`, `google-drive`

### 9 new comparison entities

`cursor-vs-codex`, `copilot-vs-codex`, `claude-code-vs-codex`, `chatgpt-vs-perplexity`, `github-copilot-vs-tabnine`, `github-copilot-vs-amazon-codewhisperer`, `intercom-vs-freshdesk`, `retell-ai-vs-elevenlabs`, `vapi-vs-synthflow`

### 9 new pillar pages

`best-free-ai-agents`, `best-ai-voice-agent`, `ai-agents-for-security`, `india`, `compliance/dpdp-act-ai-agents`, `best-ai-agent-for-call-centers`, `best-ai-agent-for-education`, `best-ai-agent-for-real-estate-calls`, `best-ai-agent-course`

## `next.config.ts` — copy-paste additions

Append to the existing `async redirects()` array. Reconciled to production's canonical direction (e.g. `/ai-agent-rankings` is canonical, not a source).

```ts
{ source: "/business-ai-hub", destination: "/categories/business", permanent: true },
{ source: "/free-ai-agents-hub", destination: "/best-free-ai-agents", permanent: true },
{ source: "/voice-ai-hub", destination: "/best-ai-voice-agent", permanent: true },
{ source: "/voice-ai-case-studies", destination: "/best-ai-voice-agent", permanent: true },
{ source: "/voice-ai-faq", destination: "/best-ai-voice-agent", permanent: true },
{ source: "/voice-ai-for-banking", destination: "/best-ai-agent-for-call-centers", permanent: true },
{ source: "/voice-ai-for-education", destination: "/best-ai-agent-for-education", permanent: true },
{ source: "/voice-ai-for-real-estate", destination: "/best-ai-agent-for-real-estate-calls", permanent: true },
{ source: "/ai-agent-security", destination: "/ai-agents-for-security", permanent: true },
{ source: "/hindi-ai-agent", destination: "/india", permanent: true },
{ source: "/dpdp-act-ai-compliance", destination: "/compliance/dpdp-act-ai-agents", permanent: true },
{ source: "/best-ai-agent-course-reddit", destination: "/best-ai-agent-course", permanent: true },
{ source: "/what-is-agentops", destination: "/agents/agentops", permanent: true },
{ source: "/intercom-pricing", destination: "/agents/intercom-ai", permanent: true },
{ source: "/intercom-alternatives", destination: "/agents/intercom-ai", permanent: true },
{ source: "/replit-alternatives", destination: "/agents/replit", permanent: true },
{ source: "/codex-alternatives", destination: "/agents/codex", permanent: true },
{ source: "/github-copilot-alternatives", destination: "/agents/github-copilot", permanent: true },
{ source: "/how-to-use-github-copilot", destination: "/agents/github-copilot", permanent: true },
{ source: "/cursor-vs-codex", destination: "/compare/cursor-vs-codex", permanent: true },
{ source: "/copilot-vs-codex", destination: "/compare/copilot-vs-codex", permanent: true },
{ source: "/claude-code-vs-codex", destination: "/compare/claude-code-vs-codex", permanent: true },
{ source: "/chatgpt-vs-perplexity", destination: "/compare/chatgpt-vs-perplexity", permanent: true },
{ source: "/github-copilot-vs-tabnine", destination: "/compare/github-copilot-vs-tabnine", permanent: true },
{ source: "/github-copilot-vs-amazon-codewhisperer", destination: "/compare/github-copilot-vs-amazon-codewhisperer", permanent: true },
{ source: "/intercom-vs-freshdesk", destination: "/compare/intercom-vs-freshdesk", permanent: true },
{ source: "/retell-vs-elevenlabs", destination: "/compare/retell-ai-vs-elevenlabs", permanent: true },
{ source: "/vapi-vs-synthflow", destination: "/compare/vapi-vs-synthflow", permanent: true },
{ source: "/vapi-vs-retell", destination: "/compare/vapi-vs-retell", permanent: true },
{ source: "/dify-vs-flowise", destination: "/compare/flowise-vs-dify", permanent: true },
{ source: "/crewai-vs-langgraph", destination: "/compare/langgraph-vs-crewai", permanent: true },
{ source: "/ai-agent-tools", destination: "/frameworks", permanent: true },
{ source: "/business", destination: "/categories/business", permanent: true },
```

## Verification approach for production

Production already has `scripts/verify-catalog.mjs`. After porting the 35 entities + the redirects above, run:
- `npm run build && npm run verify:catalog` (or production's test equivalent).
- Cross-check the donor's `verify-redirect-destinations.ts` and `verify-sitemaps-static.ts` logic against production's catalog to ensure no destination 404s and each sitemap group's count matches the catalog.

## Donor-repo evidence artifact

The donor's commit `a54d4fa` and these verifier scripts (already committed in donor) are the source of truth for the net-new 35 entities:
- `scripts/verify-redirect-destinations.ts` — flags every redirect destination that 404s or chains.
- `scripts/verify-sitemaps-static.ts` — verifies sitemap XML structure without a server (17/17 pass on donor).

Donor verification at commit `a54d4fa`: invariants 7/7, evidence 9/9, routes 41/41, redirects 852/852, redirect-destinations 172 valid / **0 broken**, sitemaps-static 17/17, sitemaps-HTTP 49/49, manifest 86, SSR 14/14, scope-freeze PASS, build PASS.
