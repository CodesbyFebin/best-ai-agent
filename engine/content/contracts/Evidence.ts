// ============================================
// Content OS Contracts — Phase C
// File: engine/content/contracts/Evidence.ts
// Status: Frozen (v1.0.0)
// Contract Only — No Implementation
// ============================================

/**
 * EvidenceReference — inline marker pointing to a source for a claim.
 *
 * Used within generated HTML to indicate that a factual claim is backed by
 * evidence. The EvidenceValidator extracts these references and validates
 * that the sources exist and meet confidence thresholds.
 *
 * Invariants:
 * 1. Every EvidenceReference.id is globally unique (across all published pages)
 * 2. confidence ∈ [0.0, 1.0]
 * 3. EvidenceValidator.extract(html) returns all references present in HTML
 * 4. attach() returns null only if source genuinely unavailable (not an error)
 * 5. Evidence references are immutable after publication
 */
export interface EvidenceReference {
  /** Unique reference ID (e.g., "ev:agent:cite:pricing") */
  id: string;

  /** Source type determines how to resolve the reference */
  type: 'graph_node' | 'external_source' | 'research_paper';

  /** Source identifier:
   *  - graph_node: graph node ID (e.g., "agent/cursor-ai")
   *  - external_source: HTTPS URL
   *  - research_paper: DOI or arXiv ID */
  sourceId: string;

  /** The exact text segment this evidence supports (for extraction validation) */
  claimSegment: string;

  /** Confidence level that this source supports the claim:
   *  1.0 = Direct graph node with verified data
   *  0.7–0.9 = High-credibility external source
   *  0.4–0.6 = Inferred from context, not explicitly stated
   *  0.0 = No evidence (should fail if threshold requires evidence) */
  confidence: number;

  /** Optional justification explaining why this evidence is relevant */
  justification?: string;
}

/**
 * EvidenceAttachment — full evidence content for a reference.
 */
export interface EvidenceAttachment {
  /** The reference this attachment satisfies */
  reference: EvidenceReference;

  /** Extracted content (snippet, citation, abstract) */
  content: string;

  /** For external sources, the full URL */
  sourceUrl?: string;

  /** When this evidence was accessed/retrieved */
  accessedAt: string;            // ISO 8601
}

/**
 * EvidenceValidationReport — result of validating evidence references.
 */
export interface EvidenceValidationReport {
  /** Overall validity (true if no unresolvable references) */
  valid: boolean;

  /** References whose source cannot be found */
  unresolvable: Array<{
    ref: EvidenceReference;
    reason: string;              // e.g., "Graph node missing", "URL unreachable"
  }>;

  /** References with low confidence (below configured threshold) */
  lowConfidence: EvidenceReference[];

  /** References found in validation that are not present in HTML */
  orphaned: EvidenceReference[];
}

/**
 * EvidenceValidator — extracts and validates evidence references.
 *
 * Invariants:
 * 1. extract(html) returns all EvidenceReference IDs present in the HTML
 * 2. validate(references) checks each source exists and is accessible
 * 3. attach(reference) returns full content or null if unavailable
 * 4. All operations are pure (no side effects on input references)
 */
export interface EvidenceValidator {
  /**
   * Extract evidence references from generated HTML.
   * Looks for data attributes, abbr titles, or other markers.
   * @param html — Generated HTML to scan
   * @returns Array of EvidenceReference objects found in the HTML
   */
  extract(html: string): EvidenceReference[];

  /**
   * Validate that all references point to valid, accessible sources.
   * @param references — References to validate
   * @returns EvidenceValidationReport with unresolvable, low confidence, orphaned lists
   */
  validate(references: EvidenceReference[]): EvidenceValidationReport;

  /**
   * Attach full evidence content for a reference (useful for previews).
   * @param reference — Reference to fetch content for
   * @returns EvidenceAttachment if content available; null if not found
   */
  attach(reference: EvidenceReference): EvidenceAttachment | null;
}
