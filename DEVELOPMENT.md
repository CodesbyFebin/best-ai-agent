# ATLAS GODMODE - Development Guide

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run verification tests
npm run test:evidence
npm run verify:redirects
npm run verify:sitemaps
```

## Repository Structure

```
src/
├── data/              # Data layer (agents, categories, evidence)
│   ├── agents.ts      # Agent definitions
│   ├── evidenceSchema.ts  # Evidence system core
│   └── agentEvidence.ts   # Agent evidence integration
├── routing/           # Routing engine
│   ├── routeRegistry.ts    # Canonical routes (single source of truth)
│   ├── routeResolver.ts    # Entity-validated resolution
│   ├── entityResolvers.ts  # Slug validation functions
│   └── evidenceRoutes.ts   # Evidence requirements
├── components/        # React components
└── App.tsx           # Main application

scripts/              # Verification and utilities
├── verify-evidence.ts    # Evidence validation tests
├── verify-redirects.ts   # Route/redirect tests (290 tests)
├── verify-production.mjs # Production smoke tests
├── verify-sitemaps.ts    # Sitemap validation
└── ingest.ts             # CSV data ingestion
```

## Key Concepts

### Evidence System (Safe-Deep OS)

Every factual claim must be backed by evidence:

```typescript
interface EvidenceClaim {
  id: string;
  statement: string;
  evidence: EvidenceSource[];
  confidence: number;  // 0-100
  status: 'active' | 'expired' | 'contradicted';
  verifiedAt: string;
}

interface EvidenceSource {
  url: string;
  publisher: string;
  passage: string;      // Exact supporting text
  authority: 'primary' | 'secondary' | 'tertiary';
  retrievedAt: string;
}
```

Validation rules:
- **CRITICAL** (pricing, capabilities): 90% confidence, 2+ sources (primary+secondary)
- **STANDARD** (features, use cases): 80% confidence, 1+ primary source
- **COMPARISON** (vs statements): 85% confidence, 2+ primary sources

### Content Lifecycle State Machine

```
candidate
  → intent_validated
  → evidence_complete
  → blueprint_approved
  → draft
  → automated_validation
  → human_review
  → publish_approved
  → published
  → monitored
  → refresh_required
```

Illegal transitions are blocked by `isValidTransition()`.

### Route Resolution Order

1. Legacy redirects (301)
2. Exact canonical routes (200)
3. Dynamic entity routes (200 only if slug resolves)
4. Everything else → 404

## Testing Strategy

Run all verification:

```bash
# Evidence unit tests
npm run test:evidence

# Redirect validation (290 tests)
npm run verify:redirects

# Production verification (requires running server)
npm run verify:production

# Sitemap validation
npm run verify:sitemaps
```

## Adding New Routes

1. Add to `src/routing/routeRegistry.ts` (canonicalRoutes)
2. Add entity resolver if dynamic (in `entityResolvers.ts`)
3. Add evidence requirements in `evidenceRoutes.ts` (optional)
4. Add verification tests in `scripts/verify-redirects.ts`

## Debugging

- Route resolution: Check `src/routing/routeResolver.ts` logs
- Evidence validation: `validateEvidence()` returns `isValid` + `contradictions`
- State transitions: `isValidTransition(from, to)` returns boolean

## Deployment

See DEPLOYMENT.md for production deployment instructions.

## Architecture Reference

See ATLAS_SAFE-DEEP_OS_Master_Prompt.md for complete Safe-Deep OS v5.0 architecture.
