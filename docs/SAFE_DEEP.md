# Safe-Deep OS v5.0 - Technical Reference

**Integrations:** BestAIAgent.in P99 Platform  
**Version:** 5.0  
**Implemented:** 2026-07-24

---

## 1. Overview

Safe-Deep OS is an evidence-driven content governance framework that ensures all published claims are verifiable, high-quality, and maintain strict confidence thresholds. It operates as a deterministic engine within the ATLAS architecture.

---

## 2. Core Concepts

### 2.1 EvidenceClaim

A claim that can be backed by evidence sources.

**Properties:**
- `id` - Unique identifier
- `statement` - The claim text
- `evidence` - Array of EvidenceSource
- `confidence` - 0 to 1 score
- `status` - pending|verified|refuted|expired
- `verifiedAt` - ISO timestamp

### 2.2 EvidenceSource

A source that supports a claim.

**Properties:**
- `url` - Source URL (must be reachable)
- `publisher` - Who published it
- `passage` - Relevant excerpt
- `authority` - primary|secondary|tertiary
- `retrievedAt` - ISO timestamp
- `freshness` - 0 to 1 score (age-based)

### 2.3 Authority Levels

| Level | Definition | Examples |
|-------|------------|----------|
| **primary** | Direct source | Official docs, peer-reviewed papers, vendor specs |
| **secondary** | Reputable analysis | Tech blogs, industry reports, expert reviews |
| **tertiary** | Community content | Forum posts, social media, user reviews |

---

## 3. Validation Rules

```typescript
const EVIDENCE_RULES = {
  CRITICAL: {
    minConfidence: 0.90,
    minEvidenceCount: 2,
    requiredTypes: ['primary'],
    logic: '2+ primary OR 1 primary + 2 secondary'
  },
  STANDARD: {
    minConfidence: 0.80,
    minEvidenceCount: 1,
    requiredTypes: ['primary'],
    logic: '1+ primary'
  },
  COMPARISON: {
    minConfidence: 0.85,
    minEvidenceCount: 2,
    requiredTypes: ['primary'],
    logic: '2+ primary'
  }
};
```

---

## 4. Quality Scoring

### 4.1 Six Dimensions

| Dimension | Weight | Description |
|-----------|--------|-------------|
| Evidence Sufficiency | 25% | Enough sources, variety, passage quality |
| Authority Strength | 25% | Ratio of primary vs secondary sources |
| Freshness Proximity | 20% | How recent the evidence is |
| Contradiction Risk | 10% | Penalty for conflicting sources |
| Intent Satisfaction | 10% | Claim matches query intent |
| Entity Coverage | 10% | All entities mentioned are covered |

### 4.2 Scoring Algorithm

```typescript
function calculateQualityScore(
  claim: EvidenceClaim,
  intent: string,
  entities: string[]
): QualityScore {
  return {
    evidence: scoreEvidenceSufficiency(claim.evidence), // 0-25
    authority: scoreAuthority(claim.evidence), // 0-25
    freshness: scoreFreshness(claim.evidence), // 0-20
    contradiction: scoreContradictionRisk(claim.evidence), // 0-10 penalty
    intent: scoreIntentSatisfaction(claim.statement, intent), // 0-10
    coverage: scoreEntityCoverage(claim.statement, entities), // 0-10
    total: sum // 0-100
  };
}
```

---

## 5. Content State Machine

### 5.1 States

1. **candidate** - Initial draft, no validation
2. **intent_validated** - Query intent confirmed
3. **evidence_complete** - All claims have evidence
4. **blueprint_approved** - Outline approved by editor
5. **draft** - Full content written
6. **automated_validation** - Running through quality gates
7. **human_review** - Awaiting editorial review
8. **publish_approved** - Cleared for publication
9. **published** - Live on site
10. **monitored** - Under performance tracking
11. **refresh_required** - Needs evidence update

### 5.2 Transition Rules

Only defined transitions are allowed. Example:

```
candidate → intent_validated (requires: intentMatch >= 0.7)
intent_validated → evidence_complete (requires: all claims evidenceValidated)
evidence_complete → blueprint_approved (requires: editor approval)
blueprint_approved → draft (requires: outlineComplete)
draft → automated_validation (requires: contentLength >= 2000)
automated_validation → human_review (requires: qualityScore >= 80)
human_review → publish_approved (requires: editor approval)
publish_approved → published (requires: scheduledTime reached)
published → monitored (automatic after 24h)
monitored → refresh_required (requires: freshnessScore < 0.5)
```

---

## 6. Integration Points

### 6.1 Route Resolution

Every route can have evidence requirements:

```typescript
const ROUTE_EVIDENCE_REQUIREMENTS = {
  agent: { minConfidence: 0.9, minEvidenceCount: 3, requiredTypes: ['CRITICAL', 'STANDARD'] },
  category: { minConfidence: 0.8, minEvidenceCount: 2, requiredTypes: ['STANDARD'] },
  comparison: { minConfidence: 0.85, minEvidenceCount: 4, requiredTypes: ['COMPARISON'] }
};
```

### 6.2 Agent Profile Extension

```typescript
interface AgentWithEvidence {
  evidenceIds: string[];        // Links to evidence claims
  contentState: ContentState;   // Current state in lifecycle
  lastVerified: string;         // ISO timestamp
  evidenceQuality: number;      // 0-100 quality score
}
```

### 6.3 SSR Rendering

Evidence metadata can be embedded in JSON-LD:

```json
{
  "@type": "SoftwareApplication",
  "name": "Cursor AI",
  "evidence": [
    {
      "claim": "Cursor AI achieves 95% code acceptance rate",
      "confidence": 0.92,
      "sources": ["https://docs.cursor.sh/..."]
    }
  ]
}
```

---

## 7. API

### 7.1 validateEvidence(claim: EvidenceClaim): ValidationResult

Validates a claim against the appropriate rule tier.

**Returns:**
```typescript
{
  isValid: boolean;
  confidence: number;
  requiredConfidence: number;
  rule: 'CRITICAL' | 'STANDARD' | 'COMPARISON';
  gaps: string[]; // Missing evidence or low scores
}
```

### 7.2 calculateQualityScore(...): QualityScore

Calculates multi-dimensional quality score.

**Parameters:**
- `claim` - EvidenceClaim
- `intent` - Query intent string
- `entities` - Relevant entity names

**Returns:** QualityScore object with six component scores.

### 7.3 passesQualityGate(score: number, tier: RuleTier): boolean

Checks if a quality score meets the threshold for a given rule tier.

### 7.4 isValidTransition(from: ContentState, to: ContentState): boolean

Validates state machine transitions.

---

## 8. Evidence Collection Workflow

1. **Identify Claims** - Extract factual statements from content
2. **Find Sources** - Locate primary/secondary evidence
3. **Create EvidenceSources** - Record URL, publisher, passage, authority
4. **Build EvidenceClaim** - Assemble claim with evidence array
5. **Calculate Confidence** - Aggregate source weights
6. **Assign Rule Tier** - Based on claim criticality
7. **Validate** - Check against rule thresholds
8. **Score Quality** - Run 6-dimensional scoring
9. **State Transition** - Move content through lifecycle

---

## 9. Implementation Examples

### 9.1 Agent Pricing Evidence

```typescript
const pricingClaim = createPricingEvidence(agent, {
  monthly: '$20',
  yearly: '$200',
  currency: 'USD',
  sources: [
    {
      url: 'https://agent.ai/pricing',
      publisher: 'Agent.ai Official',
      passage: 'Monthly subscription: $20',
      authority: 'primary',
      retrievedAt: '2026-01-15',
      freshness: 0.95
    }
  ]
});
```

### 9.2 Capability Evidence

```typescript
const capabilityClaim = createCapabilityEvidence(agent, {
  capability: 'voice-synthesis',
  claim: 'Agent supports real-time voice synthesis with <100ms latency',
  sources: [...]
});
```

### 9.3 Integration Evidence

```typescript
const integrationClaim = createIntegrationEvidence(agent, {
  platform: 'Slack',
  claim: 'Agent integrates with Slack via OAuth 2.0',
  sources: [...]
});
```

---

## 10. Evidence Store

All evidence claims are stored in the data layer:

```typescript
interface EvidenceStore {
  [claimId: string]: EvidenceClaim;
}
```

Agent profiles reference evidence via `evidenceIds` array.

---

## 11. Monitoring & Freshness

- Evidence sources are timestamped on retrieval
- Freshness score decays over time (exponential decay)
- `monitored` state triggers automatic freshness checks
- When `freshness < 0.5`, state transitions to `refresh_required`
- Editorial team is alerted to update stale evidence

---

## 12. Security Considerations

- All evidence URLs are validated as HTTPS
- No user-provided content is rendered without escaping
- Evidence sources are read-only; no external modifications
- Confidence calculations are deterministic (no external API calls during validation)

---

## 13. Limitations

- Evidence validation is only as good as the sources provided
- Authority level assignment is manual (could be ML-assisted in future)
- Freshness decay model is linear; real-world relevance may vary
- No automated source verification (URL reachability not checked in current version)

---

**Document maintained by:** ATLAS Development Team  
**Last Updated:** 2026-07-24  
**Implements:** Safe-Deep OS v5.0 Specification
