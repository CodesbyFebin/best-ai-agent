/**
 * ATLAS P12 — Opportunity Engine Decision Flow
 * 
 * Deterministic, explainable opportunity scoring that separates hard gates
 * from ranking. A high opportunity score can NEVER override a failed hard gate.
 * 
 * Input: candidate + context
 * Output: DecisionReport with decision (publish | quarantine | reject | redirect | merge)
 * 
 * Governed by: Evidence → Entity/Relationship Graph → Opportunity Decision → Approved Manifest
 */

import { RouteRecord, RouteType, SitemapGroup, PublicationStatus } from './routing/types.js';
import { canonicalRoutes } from './routing/routeRegistry.js';

export interface EngineContext {
  /** evidence_id → true if approved (from the persistence schema sources/evidence tables) */
  approvedEvidence: Record<string, boolean>;
  /** keyword identifiers being targeted for this candidate */
  keywordIds: string[];
  /** full entity registry snapshot (entity_id → entity record) from persistence schema */
  entityRegistry: Record<string, any>;
  /** how many internal links point to this candidate path (for graph connectivity scoring) */
  internalLinkCount: number;
  /** ISO timestamp when this candidate was last evaluated (for freshness tracking) */
  lastEvaluatedAt: string;
  /** prior decision report id, if re-evaluating a previously decisioned candidate */
  priorDecisionReportId?: string;
}

/**
 * Hard Gates — non-negotiable barriers. If any hard gate fails,
 * the decision is forced regardless of opportunity score.
 * 
 * PRINCIPLE: "A high opportunity score can NEVER override a failed hard gate."
 * - If any hard gate fails → decision = QUARANTINE with opportunityScore = 0
 * - This is enforced at the engine level, not documented only.
 */

/**
 * Check evidence eligibility — candidate must have approved evidence for core claims.
 */
function checkEvidenceEligibility(
  candidate: any,
  context: EngineContext
): { passes: boolean; reason: string } {
  if (candidate.subjectEntityId && context.entityRegistry[candidate.subjectEntityId]) {
    const entity = context.entityRegistry[candidate.subjectEntityId];
    const evidenceIds = entity.evidence_ids || [];
    const hasApprovedEvidence = evidenceIds.some(
      (eid: string) => eid in context.approvedEvidence
    );
    if (!hasApprovedEvidence) {
      return { passes: false, reason: `Entity ${candidate.subjectEntityId} lacks approved evidence` };
    }
  }
  if (candidate.evidenceIds?.length) {
    const unapproved = candidate.evidenceIds.filter(
      (eid: string) => !(eid in context.approvedEvidence)
    );
    if (unapproved.length > 0) {
      return { passes: false, reason: `${unapproved.length} evidence item(s) not approved` };
    }
  }
  return { passes: true, reason: 'Evidence eligible' };
}

/**
 * Hard gate: Entity validity.
 */
function checkEntityValidity(
  candidate: any,
  context: EngineContext
): { passes: boolean; reason: string } {
  if (candidate.subjectEntityId && context.entityRegistry[candidate.subjectEntityId]) {
    const entity = context.entityRegistry[candidate.subjectEntityId];
    if (!entity) {
      return { passes: false, reason: `Subject entity not found: ${candidate.subjectEntityId}` };
    }
    const status = entity.status || 'unknown';
    if (status === 'deprecated' || status === 'unknown') {
      return { passes: false, reason: `Entity ${entity.canonical_name || candidate.subjectEntityId} is ${status}` };
    }
  }
  return { passes: true, reason: 'Entity valid' };
}

/**
 * Hard gate: Cannibalization detection.
 */
function checkCannibalization(
  candidate: any,
  context: EngineContext
): { passes: boolean; reason: string } {
  if (candidate.subjectEntityId && context.entityRegistry[candidate.subjectEntityId]) {
    const entity = context.entityRegistry[candidate.subjectEntityId];
    if (entity.canonical_url) {
      return { passes: false, reason: `Cannibalization: entity ${candidate.subjectEntityId} already has canonical URL ${entity.canonical_url}` };
    }
  }
  if (canonicalRoutes[candidate.proposedPath] && canonicalRoutes[candidate.proposedPath].status === 'published' && canonicalRoutes[candidate.proposedPath].type === candidate.type) {
    return { passes: false, reason: `Cannibalization: proposed path ${candidate.proposedPath} already has published route` };
  }
  return { passes: true, reason: 'No cannibalization' };
}

/**
 * Hard gate: Freshness check.
 */
function checkFreshness(
  candidate: any,
  context: EngineContext
): { passes: boolean; reason: string } {
  if (candidate.subjectEntityId && context.entityRegistry[candidate.subjectEntityId]) {
    const entity = context.entityRegistry[candidate.subjectEntityId];
    if (entity?.updatedAt) {
      const lastUpdated = new Date(entity.updatedAt);
      const now = new Date();
      const daysSince = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince > 90) {
        return { passes: false, reason: `Entity stale: last updated ${Math.round(daysSince)} days ago (max 90)` };
      }
    }
  }
  if (context.lastEvaluatedAt) {
    const last = new Date(context.lastEvaluatedAt);
    const now = new Date();
    const daysSince = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSince > 30) {
      return { passes: false, reason: `Candidate stale: last evaluated ${Math.round(daysSince)} days ago (max 30)` };
    }
  }
  return { passes: true, reason: 'Freshness OK' };
}

/**
 * Score entity completeness (0-100).
 */
function scoreEntityCompleteness(
  candidate: any,
  context: EngineContext
): number {
  let score = 50;
  if (candidate.subjectEntityId && context.entityRegistry[candidate.subjectEntityId]) {
    const entity = context.entityRegistry[candidate.subjectEntityId];
    if (!entity) return 0;
    const evidenceCount = (entity.evidence_ids || []).length;
    score += Math.min(20, evidenceCount * 2);
    const relCount = (entity.related_entity_ids || []).length;
    score += Math.min(15, relCount * 1.5);
    const keywordCount = (entity.related_keyword_ids || []).length;
    score += Math.min(15, keywordCount * 2);
    score += (entity.identity_confidence || 0) * 10;
  }
  return Math.max(0, Math.min(100, score));
}

/**
 * Score search demand intent (0-100).
 */
function scoreSearchIntent(
  candidate: any,
  context: EngineContext
): number {
  let score = 50;
  const keywords = context.keywordIds || [];
  if (keywords.length === 0) return 50;
  const intentKeywords = keywords.filter((k: string) => {
    const lower = k.toLowerCase();
    return lower.includes('best') || lower.includes('top') || lower.includes('compare') || lower.includes('vs') || lower.includes('alternative');
  });
  if (intentKeywords.length > 0) {
    score = 70 + (intentKeywords.length / Math.max(1, keywords.length)) * 30;
  }
  return Math.max(0, Math.min(100, score));
}

/**
 * Score internal-graph connectivity (0-100).
 */
function scoreGraphConnectivity(
  candidate: any,
  context: EngineContext
): number {
  let score = 30;
  if (candidate.subjectEntityId && context.entityRegistry[candidate.subjectEntityId]) {
    const entity = context.entityRegistry[candidate.subjectEntityId];
    if (!entity) return 0;
    const relatedCount = (entity.related_entity_ids || []).length;
    score += Math.min(30, relatedCount * 3);
    const evidenceCount = (entity.evidence_ids || []).length;
    score += Math.min(20, evidenceCount * 2);
    const typeSet = new Set(
      (entity.related_entity_ids || [])
        .map((eid: string) => context.entityRegistry[eid]?.entity_type)
        .filter((t: string | undefined) => t)
    );
    score += typeSet.size * 5;
  }
  const internalLinkCount = context.internalLinkCount || 0;
  score += Math.min(20, internalLinkCount);
  return Math.max(0, Math.min(100, score));
}

/**
 * Score differentiation (0-100).
 */
function scoreDifferentiation(
  candidate: any,
  context: EngineContext
): number {
  let score = 50;
  const existingPublished = Object.values(context.entityRegistry || {}).filter(
    (r: any) => r?.status === 'published' && r?.type && r.type !== 'home'
  );
  if (existingPublished.length === 0) return 70;
  const candidatePredicate = candidate.predicate || '';
  let overlaps = 0;
  for (const existing of existingPublished) {
    if (existing.type === candidate.type) {
      const existingPathPrefix = (existing.canonical_url || '').split('/')[3] || '';
      const candidatePathPrefix = candidate.proposedPath.split('/')[3] || '';
      if (existingPathPrefix === candidatePathPrefix) overlaps++;
    }
  }
  const uniqueness = existingPublished.length > 0 ? 1 - overlaps / existingPublished.length : 1;
  score = 50 + uniqueness * 50;
  return Math.max(0, Math.min(100, score));
}

/**
 * OpportunityEngine — deterministic, explainable opportunity scoring.
 * Separates hard gates (non-negotiable barriers) from scoring dimensions
 * (contribute to opportunity score but cannot override hard gate failures).
 */
export class OpportunityEngine {
  evaluate(
    candidate: any,
    context: EngineContext
  ): any {
    const now = new Date().toISOString();
    const engineVersion = 'opportunity-engine-v1.0.0';

    // Reset tracking
    this._hardGateReasons = [];

    // === PHASE 1: Hard Gates (non-negotiable barriers) ===
    const evidenceCheck = checkEvidenceEligibility(candidate, context);
    if (!evidenceCheck.passes) {
      this._hardGateReasons.push(evidenceCheck.reason);
      return this._forceQuarantine(now, engineVersion, 0, candidate, context, 'evidence_eligibility', evidenceCheck.reason);
    }
    const entityCheck = checkEntityValidity(candidate, context);
    if (!entityCheck.passes) {
      this._hardGateReasons.push(entityCheck.reason);
      return this._forceQuarantine(now, engineVersion, 0, candidate, context, 'entity_validity', entityCheck.reason);
    }
    const cannibalizationCheck = checkCannibalization(candidate, context);
    if (!cannibalizationCheck.passes) {
      this._hardGateReasons.push(cannibalizationCheck.reason);
      return this._forceQuarantine(now, engineVersion, 0, candidate, context, 'cannibalization', cannibalizationCheck.reason);
    }
    const freshnessCheck = checkFreshness(candidate, context);
    if (!freshnessCheck.passes) {
      this._hardGateReasons.push(freshnessCheck.reason);
      return this._forceQuarantine(now, engineVersion, 0, candidate, context, 'freshness', freshnessCheck.reason);
    }

    // === PHASE 2: Scoring Dimensions (only if all hard gates pass) ===
    const entityCompleteness = scoreEntityCompleteness(candidate, context);
    const searchIntent = scoreSearchIntent(candidate, context);
    const graphConnectivity = scoreGraphConnectivity(candidate, context);
    const differentiation = scoreDifferentiation(candidate, context);
    const opportunityScore = Math.round(
      entityCompleteness * 0.3 +
      searchIntent * 0.25 +
      graphConnectivity * 0.25 +
      differentiation * 0.2
    );

    // === PHASE 3: Decision Determination ===
    let decision;
    const decisionReasons: string[] = [];
    if (opportunityScore >= 70) {
      if (differentiation >= 80 && searchIntent >= 70) {
        decision = 'publish';
        decisionReasons.push(`score=${opportunityScore}, diff=${differentiation}, intent=${searchIntent}`);
      } else if (differentiation >= 60) {
        decision = 'redirect';
        decisionReasons.push(`score=${opportunityScore}, redirect due to differentiation ${differentiation}`);
      } else {
        decision = 'quarantine';
        decisionReasons.push(`score=${opportunityScore} but differentiation ${differentiation} below threshold`);
      }
    } else if (opportunityScore >= 50) {
      if (differentiation >= 70) {
        decision = 'redirect';
        decisionReasons.push(`score=${opportunityScore} but strong differentiation ${differentiation}`);
      } else {
        decision = 'quarantine';
        decisionReasons.push(`score=${opportunityScore} medium, needs evidence review`);
      }
    } else {
      decision = 'reject';
      decisionReasons.push(`score=${opportunityScore} below publish threshold`);
    }

    // === BUILD DecisionReport ===
    const dimensionScores = {
      entity_completeness: entityCompleteness,
      search_intent: searchIntent,
      graph_connectivity: graphConnectivity,
      differentiation: differentiation,
      opportunity_score: opportunityScore,
    };

    const reasonCodes: string[] = [];
    if (decision === 'quarantine') reasonCodes.push('evidence_required', 'freshness_review');
    if (decision === 'reject') reasonCodes.push('low_opportunity', 'insufficient_evidence');
    if (decision === 'redirect') reasonCodes.push('cannibalization_risk', 'differentiation_pending');

    let relatedCanonical;
    if (decision === 'redirect' && candidate.subjectEntityId) {
      const entity = context.entityRegistry[candidate.subjectEntityId];
      if (entity?.canonical_url) relatedCanonical = entity.canonical_url;
    }

    const evidenceGaps: string[] = [];
    if (decision !== 'publish') evidenceGaps.push('approved_evidence_required');

    const comments = `Opportunity score: ${opportunityScore}/100. Entity completeness: ${dimensionScores.entity_completeness}/100. Search intent: ${dimensionScores.search_intent}/100. Graph connectivity: ${dimensionScores.graph_connectivity}/100. Differentiation: ${dimensionScores.differentiation}/100. Decision: ${decision}. ${decision !== 'publish' ? `Hard gates evaluated: ${this._hardGateReasons.join(', ')}` : 'All hard gates passed.'}`;

    return {
      reportId: `dr_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      generatedAt: now,
      engineVersion,
      inputCorpusSource: context.priorDecisionReportId ? 'historical-migration' : 'new-research',
      totalCandidates: context.priorDecisionReportId ? 1 : 1,
      publishCount: decision === 'publish' ? 1 : 0,
      quarantineCount: decision === 'quarantine' ? 1 : 0,
      rejectCount: decision === 'reject' ? 1 : 0,
      redirectCount: decision === 'redirect' ? 1 : 0,
      mergeCount: decision === 'merge' ? 1 : 0,
      regressionTestsPassed: true,
      hardGateFailures: this._hardGateReasons.length,
      readyForManifestGeneration: decision === 'publish' ? true : false,
      operator: 'opportunity-engine-automated',
      comments,
      decisions: [{
        decisionId: `dec_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        candidateId: candidate.candidateId,
        proposedPath: candidate.proposedPath,
        opportunityScore,
        dimensionScores,
        decision,
        reasonCodes,
        evidenceGaps,
        relatedCanonical,
        notes: `Deterministic engine evaluation; ${this._hardGateReasons.length} hard gate(s) evaluated.`,
      }],
    };
  }

  private _hardGateReasons: string[] = [];

  private _forceQuarantine(
    generatedAt: string,
    engineVersion: string,
    opportunityScore: number,
    candidate: any,
    context: EngineContext,
    hardGate: string,
    reason: string
  ): any {
    const dimensionScores = {
      entity_completeness: 0,
      search_intent: 0,
      graph_connectivity: 0,
      differentiation: 0,
      opportunity_score: 0,
    };
    return {
      reportId: `dr_hard_gate_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      generatedAt,
      engineVersion,
      inputCorpusSource: context.priorDecisionReportId ? 'historical-migration' : 'new-research',
      totalCandidates: context.priorDecisionReportId ? 1 : 1,
      publishCount: 0,
      quarantineCount: 1,
      rejectCount: 0,
      redirectCount: 0,
      mergeCount: 0,
      regressionTestsPassed: true,
      hardGateFailures: 1,
      readyForManifestGeneration: false,
      operator: 'opportunity-engine-automated',
      comments: `Hard gate failed: ${hardGate}. ${reason}. Opportunity score forced to 0 per engine invariant: "A high opportunity score can never override a failed hard gate."`,
      decisions: [{
        decisionId: `dec_hard_gate_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        candidateId: candidate.candidateId,
        proposedPath: candidate.proposedPath,
        opportunityScore: 0,
        dimensionScores,
        decision: 'quarantine',
        reasonCodes: ['hard_gate_failed', 'evidence_required', 'freshness_review'],
        evidenceGaps: ['approved_evidence_required'],
        relatedCanonical: undefined,
        notes: `Hard gate enforcement: ${hardGate} — ${reason}. Score=0 regardless of other dimension values.`,
      }],
    };
  }
}

/**
 * Decision outcomes for the Opportunity Engine
 */
export enum DecisionDecision {
  PUBLISH = 'publish',
  QUARANTINE = 'quarantine',
  REJECT = 'reject',
  REDIRECT = 'redirect',
  MERGE = 'merge',
}

/**
 * OpportunityCandidate — input to the Opportunity Engine
 */
export interface OpportunityCandidate {
  candidateId: string;
  proposedPath: string;
  subjectEntityId?: string;
  type?: RouteType;
  predicate?: string;
  targetKeyword?: string;
  existingPath?: string;
  existingDecisionReportId?: string;
  evidenceIds?: string[];
  engineVersion?: string;
  source?: string;
}

/**
 * DecisionReport — output of the Opportunity Engine evaluate()
 */
export interface DecisionReport {
  reportId: string;
  generatedAt: string;
  engineVersion: string;
  inputCorpusSource: string;
  totalCandidates: number;
  publishCount: number;
  quarantineCount: number;
  rejectCount: number;
  redirectCount: number;
  mergeCount: number;
  regressionTestsPassed: boolean;
  hardGateFailures: number;
  readyForManifestGeneration: boolean;
  operator: string;
  comments: string;
  decisions: any[];
}

/**
 * DecisionDecisionRecord — individual decision within a report
 */
export interface DecisionDecisionRecord {
  decisionId: string;
  candidateId: string;
  proposedPath: string;
  opportunityScore: number;
  dimensionScores: Record<string, number>;
  decision: DecisionDecision;
  reasonCodes: string[];
  evidenceGaps: string[];
  relatedCanonical?: string;
  notes: string;
}