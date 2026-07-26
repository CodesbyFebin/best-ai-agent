/**
 * ATLAS P08 — Evidence-Validated Routes
 * 
 * Extends the canonical route registry with Safe-Deep evidence validation.
 * Each route maps to verified claims about AI agents, categories, and entities.
 */

import type { RouteRecord, RouteType } from './types.js';
import type { EvidenceClaim, EvidenceValidation, QualityScore } from '../data/evidenceSchema.js';

/**
 * Evidence-validated route extension
 */
export interface EvidenceRoute extends RouteRecord {
  /** Evidence claims backing this route's content */
  evidenceClaims: EvidenceClaim[];
  /** Evidence validation status */
  evidenceValid: EvidenceValidation;
  /** Content quality score */
  qualityScore: QualityScore;
  /** Last evidence audit timestamp */
  lastEvidenceAudit: string;
  /** Required evidence types for this route */
  requiredEvidence: ('primary' | 'secondary' | 'tertiary')[];
}

/**
 * Route evidence requirements by type
 */
export const ROUTE_EVIDENCE_REQUIREMENTS: Record<RouteType, {
  minConfidence: number;
  minEvidenceCount: number;
  requiredEvidenceTypes: ('primary' | 'secondary' | 'tertiary')[];
}> = {
  'home': {
    minConfidence: 95,
    minEvidenceCount: 3,
    requiredEvidenceTypes: ['primary', 'secondary'],
  },
  pillar: {
    minConfidence: 95,
    minEvidenceCount: 3,
    requiredEvidenceTypes: ['primary', 'secondary'],
  },
  cluster: {
    minConfidence: 90,
    minEvidenceCount: 2,
    requiredEvidenceTypes: ['primary'],
  },
  category: {
    minConfidence: 80,
    minEvidenceCount: 2,
    requiredEvidenceTypes: ['primary'],
  },
  directory: {
    minConfidence: 85,
    minEvidenceCount: 2,
    requiredEvidenceTypes: ['primary'],
  },
  agent: {
    minConfidence: 90,
    minEvidenceCount: 4,
    requiredEvidenceTypes: ['primary', 'secondary'],
  },
  comparison: {
    minConfidence: 92,
    minEvidenceCount: 5,
    requiredEvidenceTypes: ['primary'],
  },
  pricing: {
    minConfidence: 95,
    minEvidenceCount: 5,
    requiredEvidenceTypes: ['primary'],
  },
  alternative: {
    minConfidence: 85,
    minEvidenceCount: 2,
    requiredEvidenceTypes: ['primary'],
  },
  research: {
    minConfidence: 94,
    minEvidenceCount: 4,
    requiredEvidenceTypes: ['primary', 'secondary'],
  },
  benchmark: {
    minConfidence: 90,
    minEvidenceCount: 3,
    requiredEvidenceTypes: ['primary'],
  },
  guide: {
    minConfidence: 85,
    minEvidenceCount: 2,
    requiredEvidenceTypes: ['primary'],
  },
  tutorial: {
    minConfidence: 85,
    minEvidenceCount: 2,
    requiredEvidenceTypes: ['primary'],
  },
  glossary: {
    minConfidence: 80,
    minEvidenceCount: 2,
    requiredEvidenceTypes: ['primary'],
  },
  author: {
    minConfidence: 90,
    minEvidenceCount: 2,
    requiredEvidenceTypes: ['primary'],
  },
  'mcp-server': {
    minConfidence: 88,
    minEvidenceCount: 3,
    requiredEvidenceTypes: ['primary'],
  },
  'mcp-category': {
    minConfidence: 85,
    minEvidenceCount: 2,
    requiredEvidenceTypes: ['primary'],
  },
  governance: {
    minConfidence: 90,
    minEvidenceCount: 2,
    requiredEvidenceTypes: ['primary'],
  },
  calculator: {
    minConfidence: 85,
    minEvidenceCount: 2,
    requiredEvidenceTypes: ['primary'],
  },
} as const;