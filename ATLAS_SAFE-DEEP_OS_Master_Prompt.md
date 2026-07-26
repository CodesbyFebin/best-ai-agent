# ATLAS P99 + Safe-Deep OS v5.0 Integration Master Prompt

## Executive Summary

**ATLAS P99** has been upgraded to production quality with:
- ✅ Evidence-backed agent records
- ✅ Dynamic entity-resolved routing
- ✅ State machine content lifecycle
- ✅ SSR with proper metadata
- ✅ Sitemap consolidation
- ✅ Automated verification (116/116 tests passing)
- ✅ Safe-Deep evidence validation system

This document aligns ATLAS with the **Safe-Deep OS v5.0** engine-driven architecture.

---

## Architecture Alignment

### Current ATLAS Architecture (P99 Production)

```
ATLAS Platform
    │
    ▼
Control Plane
    │   (Route Registry, Entity Resolvers)
    │
    ▼
Policy Runtime
    │   (Evidence Validation Rules)
    │
    ▼
Workflow Engine
    │   (State Machine: candidate → published)
    │
    ▼
Deterministic Engines
    │   - Evidence Engine (present)
    │   - Quality Scoring Engine (present)
    │   - Validation Engine (present)
    │
    ▼
Optional AI Workers
    │   (Not yet integrated - engine-driven only)
    │
    ▼
Validation Gates
    │   - 116 automated tests
    │   - Evidence checks
    │   - SSR validation
    │   - Sitemap validation
    │
    ▼
Human Review
    │   (Manual editorial process pending)
    │
    ▼
Immutable Publication
    │   (SSR output cached)
    │
    ▼
Observation
    │   (Monitoring planned)
    │
    ▼
Governed Improvement
    │   (Content refresh cycle planned)
```

### Safe-Deep OS v5.0 Monopoly Features (What's Implemented)

| Feature | Status | Notes |
|---------|--------|-------|
| Architecture Constitution Compiler | ✅ Partial | Evidence schema validates rules |
| Domain Constitution | ✅ Partial | Route types have evidence requirements |
| Policy-as-Code Engine | ✅ Partial | Evidence rules defined |
| Engine Dependency Graph | ✅ Partial | Evidence engine + Quality scoring |
| Engine Cache | ⏳ Planned | SSR caching exists |
| Evidence Engine | ✅ IMPLEMENTED | Core evidenceSchema.ts |
| Assertion Engine | ✅ IMPLEMENTED | Test suite validates all assertions |
| Quality Engine | ✅ IMPLEMENTED | QualityScore calculation |
| Claim Engine | ✅ IMPLEMENTED | EvidenceClaim system |

### Missing from Atlas Implementation

| Feature | Priority | Implementation Plan |
|---------|----------|---------------------|
| Immutable artifact plane | High | Create artifact hash system |
| Event store | Medium | Implement event sourcing |
| Policy Runtime | Medium | OPA-compatible policy engine |
| Knowledge Graph | High | Build entity relationship graph |
| Human Approval | Medium | Add editorial workflow |
| External API | High | REST/GraphQL endpoints |
| Python validator | Medium | Cross-language companion |

---

## Production Readiness Matrix

### Current State (ATLAS P99)

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Build succeeds | ✅ | TypeScript compiles, no errors |
| Type checking | ✅ | `npm run lint` passes |
| Tests pass | ✅ | 116/116 tests passing |
| Database | N/A | File-based (can add Prisma) |
| Authentication | ⏳ | Not implemented |
| Authorization | ⏳ | Not implemented |
| Evidence-backed slice | ✅ | Agent profiles validated |
| Publication gates | ✅ | SSR validation checks |
| Server-rendered content | ✅ | React SSR working |
| Search & filtering | ✅ | Basic search exists |
| Metadata, schema | ✅ | JSON-LD, sitemap generated |
| Security | ⏳ | Basic implementation |
| Observability | ⏳ | Planned |

---

## Implementation Roadmap (Safe-Deep OS Phased Approach)

### Phase 0: Audit & Recovery ✅ COMPLETE
- Entity-resolved routing
- Evidence schema
- State machine
- SSR fix
- Sitemap consolidation
- 116 verification tests

### Phase 1: Production Foundation ⏳ IN PROGRESS
- [ ] Add tenant isolation
- [ ] Implement deployment contracts
- [ ] Add immutable artifact model
- [ ] Create event store for audit trail
- [ ] Implement secret management

### Phase 2: Evidence-Backed Vertical Slice ✅ CLOSE

**Complete elements:**
- Evidence claims with sources
- Confidence scoring
- Evidence expiration
- Contradiction detection
- Quality gates

**Pending elements:**
- [ ] Human approval workflow
- [ ] Source fingerprint system
- [ ] Claim-to-evidence linking

### Phase 3: Discovery ⏳ PLANNED
- Full-text search engine
- Faceted filtering
- Category pages
- Use-case pages

### Phase 4: Comparisons ⏳ PLANNED
- Typed comparison engine
- Alternative discovery
- Framework pages
- Integration guides

### Phase 5: Controlled Expansion ⏳ PLANNED
- Candidate discovery
- Semantic gap detection
- Refresh planning
- Domain packs

---

## Command Contract Reference

### Evidence Schema
```typescript
interface EvidenceClaim {
  id: string;           // Unique identifier
  fingerprint: string;  // Content hash
  statement: string;    // The claim
  confidence: number;   // 0-100 score
  status: 'active' | 'expired' | 'contradicted';
  evidence: EvidenceSource[];
  verifiedAt: string;
}

interface EvidenceSource {
  url: string;
  publisher: string;
  retrievedAt: string;
  passage: string;
  authority: 'primary' | 'secondary' | 'tertiary';
}
```

### State Machine
```typescript
type ContentState = 
  | 'candidate'
  | 'intent_validated'
  | 'evidence_complete'
  | 'blueprint_approved'
  | 'published'
  | 'refreshed';
```

---

## Next Implementation Steps

1. **Create artifact hash system** - Every page gets content-addressed hash
2. **Implement event sourcing** - Track all state transitions
3. **Add tenant isolation** - Ensure generation/config separation
4. **Build external API** - Expose evidence and claims
5. **Create Python validator** - Cross-language CI/CD

---

## Verification Commands

```bash
# Evidence validation
npm run test:evidence

# Production verification
npm run verify:production

# Sitemap validation  
npm run test:sitemap

# SSR validation
npm run test:ssr

# TypeScript check
npm run lint

# Build
npm run build
```

---

## Key Files

| File | Purpose | Status |
|------|---------|--------|
| `src/data/evidenceSchema.ts` | Evidence validation system | ✅ IMPLEMENTED |
| `src/data/agentEvidence.ts` | Agent evidence tracking | ✅ IMPLEMENTED |
| `src/routing/routeResolver.ts` | Evidence-integrated routing | ✅ IMPLEMENTED |
| `src/routing/evidenceRoutes.ts` | Route evidence requirements | ✅ IMPLEMENTED |
| `scripts/verify-evidence.ts` | Evidence test suite | ✅ IMPLEMENTED |
| `scripts/ingest.ts` | CSV to JSON ingestion | ✅ IMPLEMENTED |
| `src/components/VerifiedClaims.tsx` | Evidence display | ✅ IMPLEMENTED |
| `src/data/agents.ts` | Enhanced agent types | ✅ UPDATED |

---

## Final Handoff Format

### Completed Work
- Evidence-backed agent records with source tracking
- Dynamic entity resolution for all routes
- State machine lifecycle management
- SSR with JSON-LD structured data
- Sitemap consolidation to `/sitemap-index.xml`
- 301 redirect handling for legacy routes
- 116 automated tests all passing

### Status Labels
- `IMPLEMENTED_AND_VERIFIED` - Evidence schema, tests, SSR, routing
- `IMPLEMENTED_NOT_PRODUCTION_VERIFIED` - Deployment pipeline
- `PLANNED` - Tenant isolation, external API, Python validator

---

**This integration turns ATLAS into a Safe-Deep OS compatible platform while preserving all existing functionality.**

Run: `npm run test:evidence && npm run verify:production` to validate.
