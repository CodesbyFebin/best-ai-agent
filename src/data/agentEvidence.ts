/**
 * ATLAS P08 — Agent Evidence Integration
 * 
 * Extends the base Agent interface with Safe-Deep evidence validation,
 * claim tracking, and quality scoring.
 */

import type { Agent } from './agents';
import type { EvidenceClaim, QualityScore, ContentState } from './evidenceSchema';

/**
 * Evidence metadata for agent pricing claims
 */
export interface PricingEvidence {
  /** Claim ID for pricing verification */
  claimId: string;
  /** Evidence-backed pricing statement */
  statement: string;
  /** Evidence sources for this pricing */
  evidence: EvidenceClaim['evidence'];
  /** Last verified date */
  verifiedAt: string;
}

/**
 * Evidence metadata for agent capabilities
 */
export interface CapabilityEvidence {
  /** Claim ID */
  claimId: string;
  /** The capability being claimed */
  capability: string;
  /** Supporting evidence sources */
  evidence: EvidenceClaim['evidence'];
  /** Confidence score */
  confidence: number;
  /** Verification timestamp */
  verifiedAt: string;
}

/**
 * Evidence tracking for agent data with Safe-Deep validation
 */
export interface AgentEvidence {
  /** Agent ID this evidence belongs to */
  agentId: string;
  /** Content lifecycle state */
  state: ContentState;
  /** Pricing claims with evidence */
  pricingClaims: EvidenceClaim[];
  /** Capability claims with evidence */
  capabilityClaims: EvidenceClaim[];
  /** Integration claims with evidence */
  integrationClaims: EvidenceClaim[];
  /** Known limitation claims */
  limitationClaims: EvidenceClaim[];
  /** Latest quality score */
  qualityScore: QualityScore;
  /** Evidence maturity level (0-100) */
  evidenceMaturity: number;
  /** Last evidence update */
  lastEvidenceUpdate: string;
}

/**
 * Extended Agent type with evidence support
 */
export interface AgentWithEvidence extends Agent {
  /** Evidence metadata */
  evidence?: AgentEvidence;
  /** Source citations for all claims */
  citations?: EvidenceClaim[];
  /** Verification status */
  verificationStatus?: 'pending' | 'validated' | 'rejected';
}

/**
 * Evidence tracking for category pages
 */
export interface CategoryEvidence {
  /** Category slug */
  category: string;
  /** Claims about category members */
  agentClaims: EvidenceClaim[];
  /** Claims about category features */
  featureClaims: EvidenceClaim[];
  /** Quality score */
  qualityScore: QualityScore;
  /** Last verification */
  lastVerified: string;
}

/**
 * Evidence tracking for comparison pages
 */
export interface ComparisonEvidence {
  /** Comparison ID */
  comparisonId: string;
  /** Claims made in comparison */
  comparisonClaims: EvidenceClaim[];
  /** Quality score */
  qualityScore: QualityScore;
  /** Source references for all claims */
  references: EvidenceClaim[];
}

/**
 * Evidence tracking for MCP server pages
 */
export interface McpEvidence {
  /** MCP server name/identifier */
  serverId: string;
  /** Claims about MCP capabilities */
  capabilityClaims: EvidenceClaim[];
  /** Integration claims */
  integrationClaims: EvidenceClaim[];
  /** Quality score */
  qualityScore: QualityScore;
  /** Last verified */
  lastVerified: string;
}

/**
 * Evidence tracking for research papers/articles
 */
export interface ResearchEvidence {
  /** Research/paper identifier */
  researchId: string;
  /** Claims made in the research */
  findingsClaims: EvidenceClaim[];
  /** Data source claims */
  dataSourceClaims: EvidenceClaim[];
  /** Methodology claims */
  methodologyClaims: EvidenceClaim[];
  /** Quality score */
  qualityScore: QualityScore;
  /** Publication date */
  publishedAt: string;
}

/**
 * Evidence tracking for author pages
 */
export interface AuthorEvidence {
  /** Author name/slug */
  authorName: string;
  /** Bio claims */
  bioClaims: EvidenceClaim[];
  /** Achievement claims */
  achievementClaims: EvidenceClaim[];
  /** Quality score */
  qualityScore: QualityScore;
  /** Last verified */
  lastVerified: string;
}

/**
 * Get or create evidence metadata for an agent
 */
export function getOrCreateAgentEvidence(
  agent: Agent
): AgentEvidence {
  return {
    agentId: agent.id,
    state: 'candidate',
    pricingClaims: [],
    capabilityClaims: [],
    integrationClaims: [],
    limitationClaims: [],
    qualityScore: {
      evidence: 0,
      authority: 0,
      freshness: 0,
      contradictionRisk: 100,
      intentSatisfaction: 0,
      entityCoverage: 0,
      overall: 0,
    },
    evidenceMaturity: 0,
    lastEvidenceUpdate: agent.updatedAt || new Date().toISOString(),
  };
}

/**
 * Create an evidence claim for agent pricing
 */
export function createPricingEvidence(
  agentId: string,
  statement: string,
  sources: EvidenceClaim['evidence'],
  confidence: number = 90
): EvidenceClaim {
  return {
    id: `pricing-${agentId}-${Date.now()}`,
    statement,
    evidence: sources,
    confidence,
    status: 'active',
    verifiedAt: new Date().toISOString(),
  };
}

/**
 * Create an evidence claim for agent capabilities
 */
export function createCapabilityEvidence(
  agentId: string,
  capability: string,
  sources: EvidenceClaim['evidence'],
  confidence: number = 85
): EvidenceClaim {
  return {
    id: `capability-${agentId}-${Date.now()}`,
    statement: `This agent is known for: ${capability}`,
    evidence: sources,
    confidence,
    status: 'active',
    verifiedAt: new Date().toISOString(),
  };
}

/**
 * Create an evidence claim for integrations
 */
export function createIntegrationEvidence(
  agentId: string,
  integration: string,
  sources: EvidenceClaim['evidence'],
  confidence: number = 80
): EvidenceClaim {
  return {
    id: `integration-${agentId}-${Date.now()}`,
    statement: `Supports integration with: ${integration}`,
    evidence: sources,
    confidence,
    status: 'active',
    verifiedAt: new Date().toISOString(),
  };
}

/**
 * Update an agent's evidence with new claims
 */
export function updateAgentEvidence(
  current: AgentEvidence | undefined,
  agent: Agent,
  additionalClaims?: Partial<AgentEvidence>
): AgentEvidence {
  const base = current || getOrCreateAgentEvidence(agent);
  
  return {
    ...base,
    ...additionalClaims,
    lastEvidenceUpdate: new Date().toISOString(),
    state: (additionalClaims?.state as ContentState) || base.state,
  };
}

/**
 * Find contradictory claims in evidence
 */
export function findContradictions(
  claims: EvidenceClaim[]
): EvidenceClaim[] {
  return claims.filter(c => c.status === 'contradicted');
}

/**
 * Calculate evidence coverage for an agent
 */
export function calculateEvidenceCoverage(
  evidence: AgentEvidence
): number {
  const totalClaims = 
    evidence.pricingClaims.length +
    evidence.capabilityClaims.length +
    evidence.integrationClaims.length +
    evidence.limitationClaims.length;
  
  const verifiedClaims = evidence.pricingClaims.filter(c => c.evidence.length > 0).length +
    evidence.capabilityClaims.filter(c => c.evidence.length > 0).length +
    evidence.integrationClaims.filter(c => c.evidence.length > 0).length +
    evidence.limitationClaims.filter(c => c.evidence.length > 0).length;
  
  return totalClaims > 0 ? (verifiedClaims / totalClaims) * 100 : 0;
}

/**
 * Generate evidence JSON-LD for SSR pages
 */
export function generateEvidenceJsonLd(
  agent: AgentWithEvidence
): string {
  const evidenceData: AgentEvidence = agent.evidence || {
    agentId: agent.id,
    state: 'candidate',
    pricingClaims: [],
    capabilityClaims: [],
    integrationClaims: [],
    limitationClaims: [],
    qualityScore: {
      evidence: 0,
      authority: 0,
      freshness: 0,
      contradictionRisk: 100,
      intentSatisfaction: 0,
      entityCoverage: 0,
      overall: 0,
    },
    evidenceMaturity: 0,
    lastEvidenceUpdate: new Date().toISOString(),
  };
  
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': agent.name,
    'description': agent.summary,
    'author': {
      '@type': 'Organization',
      'name': agent.company
    },
    'applicationCategory': 'AI Agent',
    'evidenceValidated': evidenceData.state === 'publish_approved' || evidenceData.state === 'published',
    'evidenceMaturity': evidenceData.evidenceMaturity,
    'claimsVerified': evidenceData.pricingClaims?.every(c => c.status === 'active') ?? false,
  }, null, 2);
}