/**
 * ATLAS P08 — Safe-Deep Evidence Schema
 * 
 * Evidence-backed validation system for AI agent content.
 * Each factual claim must be linked to verified evidence.
 */

export interface EvidenceSource {
  /** URL of the source document */
  url: string;
  /** Publisher/website name */
  publisher: string;
  /** Retrieval timestamp (ISO 8601) */
  retrievedAt: string;
  /** Exact supporting passage from the source */
  passage: string;
  /** How to locate the passage in the source (selector, page number, etc.) */
  locator?: string;
  /** Authority classification: primary, secondary, tertiary */
  authority: 'primary' | 'secondary' | 'tertiary';
  /** Freshness date if available */
  freshness?: string;
}

export interface EvidenceClaim {
  /** UUID for this claim */
  id: string;
  /** The exact statement being claimed */
  statement: string;
  /** Associated evidence sources */
  evidence: EvidenceSource[];
  /** Confidence score (0-100) based on evidence strength */
  confidence: number;
  /** Status of this claim */
  status: 'active' | 'expired' | 'contradicted' | 'superseded';
  /** When this claim was last verified */
  verifiedAt: string;
}

export interface EvidenceValidation {
  /** Whether the claim passes evidence gates */
  isValid: boolean;
  /** Minimum confidence threshold requirement */
  minConfidence: number;
  /** Minimum active evidence count */
  minEvidenceCount: number;
  /** Required evidence types */
  requiredEvidenceTypes: readonly ('primary' | 'secondary' | 'tertiary')[];
  /** Any contradictions found */
  contradictions: EvidenceClaim[];
}

/**
 * Evidence rules for Safe-Deep validation
 */
export const EVIDENCE_RULES = {
  // For critical claims (price, capabilities)
  CRITICAL: {
    minConfidence: 90,
    minEvidenceCount: 2,
    requiredEvidenceTypes: ['primary', 'secondary'] as const,
  },
  // For standard claims (features, best use cases)
  STANDARD: {
    minConfidence: 80,
    minEvidenceCount: 1,
    requiredEvidenceTypes: ['primary'] as const,
  },
  // For comparative claims
  COMPARISON: {
    minConfidence: 85,
    minEvidenceCount: 2,
    requiredEvidenceTypes: ['primary'] as const,
  },
} as const;

export type EvidenceRuleLevel = keyof typeof EVIDENCE_RULES;

/**
 * Validate claims against evidence requirements
 */
export function validateEvidence(
  claims: EvidenceClaim[],
  ruleLevel: EvidenceRuleLevel = 'STANDARD'
): EvidenceValidation {
  const rule = EVIDENCE_RULES[ruleLevel];
  
  let isValid = true;
  const contradictions: EvidenceClaim[] = [];
  
  for (const claim of claims) {
    if (claim.status === 'contradicted' || claim.status === 'superseded') {
      contradictions.push(claim);
      isValid = false;
      continue;
    }
    
    if (claim.confidence < rule.minConfidence) {
      isValid = false;
    }
    
    const hasRequiredEvidence = claim.evidence.some(e => {
      const types = rule.requiredEvidenceTypes as unknown as ('primary' | 'secondary' | 'tertiary')[];
      return types.includes(e.authority);
    });
    
    if (!hasRequiredEvidence || claim.evidence.length < rule.minEvidenceCount) {
      isValid = false;
    }
  }
  
  return {
    isValid,
    minConfidence: rule.minConfidence,
    minEvidenceCount: rule.minEvidenceCount,
    requiredEvidenceTypes: rule.requiredEvidenceTypes,
    contradictions,
  };
}

/**
 * State machine for content lifecycle
 */
export type ContentState = 
  | 'candidate'
  | 'intent_validated'
  | 'evidence_complete'
  | 'blueprint_approved'
  | 'draft'
  | 'automated_validation'
  | 'human_review'
  | 'publish_approved'
  | 'published'
  | 'monitored'
  | 'refresh_required';

export interface ContentLifecycleEvent {
  /** The state being transitioned to */
  to: ContentState;
  /** Who triggered the transition */
  actor: 'author' | 'system' | 'reviewer';
  /** Optional reason for the transition */
  reason?: string;
  /** Timestamp of the event */
  timestamp: string;
  /** Any inputs/outputs for audit trail */
  metadata?: Record<string, unknown>;
  /** Policy version at time of transition */
  policyVersion: string;
}

/**
 * Content state machine validator
 */
export const CONTENT_STATE_MACHINE: Record<ContentState, ContentState[]> = {
  candidate: ['intent_validated'],
  intent_validated: ['evidence_complete', 'candidate'],
  evidence_complete: ['blueprint_approved', 'evidence_complete'],
  blueprint_approved: ['draft', 'blueprint_approved'],
  draft: ['automated_validation'],
  automated_validation: ['human_review', 'draft'],
  human_review: ['publish_approved', 'human_review', 'draft'],
  publish_approved: ['published'],
  published: ['monitored', 'published'],
  monitored: ['refresh_required', 'monitored'],
  refresh_required: ['draft', 'refresh_required'],
};

/**
 * Validate state machine transition
 */
export function isValidTransition(
  fromState: ContentState,
  toState: ContentState
): boolean {
  const allowedTransitions = CONTENT_STATE_MACHINE[fromState];
  return allowedTransitions.includes(toState);
}

/**
 * Quality scoring system based on Safe-Deep principles
 */
export interface QualityScore {
  /** Evidence coverage score (0-100) */
  evidence: number;
  /** Source authority score (0-100) */
  authority: number;
  /** Source freshness score (0-100) */
  freshness: number;
  /** Contradiction risk score (0-100, lower is better) */
  contradictionRisk: number;
  /** Intent satisfaction score (0-100) */
  intentSatisfaction: number;
  /** Entity/topic coverage score (0-100) */
  entityCoverage: number;
  /** Overall quality score */
  overall: number;
}

/**
 * Calculate quality score for content
 */
export function calculateQualityScore(
  claims: EvidenceClaim[],
  resources: string[],
  intentMatch: number // 0-100 match to search intent
): QualityScore {
  // Calculate evidence coverage - handle empty claims array
  const claimsWithEvidence = claims.filter(c => c.evidence.length > 0);
  const evidenceCoverage = claims.length > 0 
    ? Math.min(100, (claimsWithEvidence.length / claims.length) * 100)
    : 0;
  
  // Calculate authority score
  const authorityScores: number[] = [];
  
  for (const claim of claims) {
    for (const source of claim.evidence) {
      authorityScores.push(source.authority === 'primary' ? 100 : 
                          source.authority === 'secondary' ? 75 : 50);
    }
  }
  
  const authority = authorityScores.length > 0 
    ? Math.round(authorityScores.reduce((a, b) => a + b, 0) / authorityScores.length)
    : 0;
  
  // Calculate freshness (claims with freshness dates in last 30 days get full points)
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const freshClaims = claims.filter(c => 
    c.evidence.some(e => !e.freshness || new Date(e.freshness) > thirtyDaysAgo)
  );
  const freshness = claims.length > 0 
    ? Math.round((freshClaims.length / claims.length) * 100)
    : 0;
  
  // Calculate contradiction risk (inverse of contradictions)
  const contradictions = claims.filter(c => c.status === 'contradicted').length;
  const contradictionRisk = Math.max(0, 100 - (contradictions * 10));
  
  // Entity coverage
  const entityCoverage = Math.min(100, (resources.length / 50) * 100); // Assume good coverage for 50+ resources
  
  // Overall weighted score
  const overall = Math.round(
    evidenceCoverage * 0.25 +
    authority * 0.2 +
    freshness * 0.15 +
    contradictionRisk * 0.15 +
    intentMatch * 0.1 +
    entityCoverage * 0.15
  );
  
  return {
    evidence: evidenceCoverage,
    authority,
    freshness,
    contradictionRisk,
    intentSatisfaction: intentMatch,
    entityCoverage,
    overall,
  };
}

/**
 * Check if content passes Safe-Deep quality gate
 */
export function passesQualityGate(
  score: QualityScore,
  thresholds: {
    evidence: number;
    authority: number;
    overall: number;
  } = { evidence: 90, authority: 85, overall: 80 }
): boolean {
  return (
    score.evidence >= thresholds.evidence &&
    score.authority >= thresholds.authority &&
    score.overall >= thresholds.overall
  );
}