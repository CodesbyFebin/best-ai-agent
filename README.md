<img width="1672" height="941" alt="ChatGPT Image Aug 6, 2026, 10_47_23 AM" src="https://github.com/user-attachments/assets/caac3a9d-5145-4c51-a687-53f5e4d3619d" />
# MCPserver.in

**The trusted discovery, verification, and deployment platform for Model Context Protocol servers.**

MCPserver.in is an independent registry and evaluation platform for AI agents and MCP servers. It features evidence-backed content, true server-side rendering, comprehensive SEO, and automated verification.

---

## Features

- **Evidence-Backed Content**: Every factual claim is linked to verified evidence with confidence scoring.
- **Canonical Routing**: Single source of truth for all URLs; dynamic slugs validated against real entities.
- **True SSR**: Server-side rendering with hydration for fast first paint and SEO.
- **Automated Verification**: 450+ automated tests covering redirects, routing, sitemaps, SSR, and evidence.
- **SEO Optimized**: Unique titles/descriptions, canonicals, JSON-LD structured data, sitemap index + segments.
- **Health & Rate Limiting**: `/health` endpoint and basic API abuse resistance.

---

## Quick Start

```bash
# Install dependencies
npm ci

# Copy environment template
cp .env.example .env

# Run development server
npm run dev
```

Open http://localhost:3000

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Type-check |
| `npm run test:evidence` | Evidence validation tests |
| `npm run test:sitemap` | Sitemap verification |
| `npm run test:ssr` | SSR verification |
| `npm run test:production` | Full production readiness suite |

---

## Documentation

- [Developer Guide](DEVELOPMENT.md) - Setup, architecture, coding standards
- [Deployment Guide](DEPLOYMENT.md) - Production deployment instructions
- [Testing Guide](TESTING.md) - How to run and interpret tests
- [Project Handoff](docs/completeness/FINAL_HANDOFF.md) - Completion report and evidence

---

## Tech Stack

- React 19, TypeScript 5.8, Vite 6.2
- Express 4.21, Node.js
- Tailwind CSS 4.1
- Google Gemini AI (optional)

---

## License

Proprietary - All rights reserved.

---

**Status:** MVP Launch Candidate - 100% platform completeness (MVP scope). See [Project Tracker](PROJECT_TRACKER.md) for details.
