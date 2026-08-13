<img width="1672" height="941" alt="BestAIAgent.in — independent India-first AI agent discovery and evaluation platform" src="https://github.com/user-attachments/assets/caac3a9d-5145-4c51-a687-53f5e4d3619d" />

# BestAIAgent.in

**India-first, evidence-backed AI agent discovery, comparison, pricing, and evaluation platform.**

[BestAIAgent.in](https://bestaiagent.in/) helps Indian developers, startups, SMEs, and enterprise buyers compare AI agents using transparent evidence, INR pricing context, India Fit signals, DPDP considerations, and reproducible editorial scoring.

---

## Features

- **Evidence-Backed Content**: Every factual claim is linked to verified evidence with confidence scoring.
- **Canonical Routing**: Single source of truth for all URLs; dynamic slugs validated against real entities.
- **True SSR**: Server-side rendering with hydration for fast first paint and SEO.
- **Automated Verification**: 450+ automated tests covering redirects, routing, sitemaps, SSR, and evidence.
- **India-first evaluation**: INR pricing context, GST billing signals, DPDP considerations, and India Fit scoring.
- **SEO/AEO/GEO foundation**: Unique metadata, canonicals, JSON-LD, segmented XML sitemaps, and LLM crawler indexes.
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

**Status:** Production platform under evidence-gated expansion. See [Project Tracker](PROJECT_TRACKER.md) for verified scope and current work.
