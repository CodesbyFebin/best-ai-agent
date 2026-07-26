// ============================================
// Content OS Contracts — Phase C
// File: engine/content/contracts/Quality.ts
// Status: Frozen (v1.0.0)
// Contract Only — No Implementation
// ============================================

import type { ValidationReport } from './Validation';

/**
 * Quality dimension weights — collectively sum to 1.0.
 *
 * These weights determine the overall quality score calculation:
 * overall = Σ(componentScore × weight) × 100
 */
export interface QualityWeights {
  schema: number;           // HTML validity (0–1)
  seo: number;              // SEO best practices (0–1)
  accessibility: number;    // Accessibility compliance (0–1)
  evidence: number;         // Evidence coverage (0–1)
  readability: number;      // Readability score (0–1)
  linking: number;          // Internal linking density/relevance (0–1)
}

/**
 * QualityScore — computed quality metrics for validated content.
 *
 * Invariants:
 * 1. overall = Σ(components × weights) normalized to 0–100
 * 2. Σ(weights) = 1.0
 * 3. passed === (overall ≥ threshold)
 * 4. All component scores ∈ [0, 100]
 * 5. score() is deterministic: same ValidationReport → identical QualityScore
 */
export interface QualityScore {
  /** Weighted overall score (0–100) */
  overall: number;

  /** Per-dimension scores (0–100) */
  components: {
    schema: number;
    seo: number;
    accessibility: number;
    evidence: number;
    readability: number;
    linking: number;
  };

  /** Did content meet the minimum threshold? (overall ≥ threshold) */
  passed: boolean;

  /** Required minimum score for publication (default 75) */
  threshold: number;

  /** ISO 8601 timestamp when score was computed */
  timestamp: string;

  /** Version of quality model used (for reproducibility) */
  validatorVersion: string;
}

/**
 * QualityScorer — computes weighted quality scores from validation results.
 *
 * Invariants:
 * 1. score() is deterministic: same ValidationReport → identical QualityScore
 * 2. Σ(weights) = 1.0 (normalized on construction if not already)
 * 3. All component scores are normalized to 0–100
 * 4. passed === (overall ≥ threshold)
 */
export interface QualityScorer {
  /** Immutable weight configuration */
  readonly weights: QualityWeights;

  /**
   * Compute quality score from validation report.
   * @param report — ValidationReport (contains results that map to dimensions)
   * @returns QualityScore with overall and component scores
   */
  score(report: ValidationReport): QualityScore;

  /**
   * Quick check if content is acceptable without full score computation.
   * @param report — Content to evaluate
   * @param threshold — Override default threshold (optional)
   * @returns true if passes minimum quality threshold
   */
  isAcceptable(report: ValidationReport, threshold?: number): boolean;
}
