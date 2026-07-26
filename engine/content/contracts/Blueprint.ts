// ============================================
// Content OS Contracts — Phase C
// File: engine/content/contracts/Blueprint.ts
// Status: Frozen (v1.0.0)
// Contract Only — No Implementation
// ============================================

import type { ContentManifest, ContentType } from './ContentManifest';
import type { GenerationContext } from './GenerationContext';

/**
 * BlueprintOutput — result of blueprint generation.
 */
export interface BlueprintOutput {
  /** Full HTML document (complete <!DOCTYPE html>...) */
  html: string;

  /** Page metadata (title, description, Open Graph, etc.) */
  metadata: {
    title: string;
    description: string;
    ogImage?: string;
    canonical?: string;
  };

  /** Optional evidence attachments for claims in the HTML */
  evidence?: EvidenceAttachment[];

  /** Linked resources (scripts, stylesheets, images) with integrity hashes */
  linkedResources: Array<{
    type: 'script' | 'stylesheet' | 'image';
    url: string;
    integrity?: string;           // Subresource Integrity hash
  }>;
}

/**
 * BlueprintValidation — result of validating a manifest against a blueprint.
 */
export interface BlueprintValidation {
  valid: boolean;
  errors: string[];              // Fatal issues (must fix)
  warnings: string[];            // Non-blocking issues
  requiredManifestFields?: string[]; // Fields this blueprint needs
}

/**
 * Blueprint — page-type-specific rendering logic.
 *
 * Invariants:
 * 1. generate() is deterministic: same ctx → identical BlueprintOutput (byte-for-byte)
 * 2. BlueprintOutput.html must be valid HTML5 (validated separately)
 * 3. Blueprint reads no external state beyond ctx (no file system, network, globals)
 * 4. validate() lists required manifest fields that must be present
 */
export interface Blueprint {
  /** Unique identifier (used in manifest.blueprintId) */
  readonly id: string;

  /** Content types this blueprint supports (usually one) */
  readonly contentType: ContentType[];

  /**
   * Generate page HTML and metadata from immutable context.
   * @param ctx — Generation context (never null/undefined)
   * @returns BlueprintOutput containing html, metadata, evidence
   */
  generate(ctx: GenerationContext): BlueprintOutput;

  /**
   * Validate that a manifest is suitable for this blueprint.
   * @param manifest — ContentManifest to validate
   * @returns BlueprintValidation with errors/warnings (valid===true if no errors)
   */
  validate(manifest: ContentManifest): BlueprintValidation;

  /**
   * Optional: canGenerate returns false if prerequisites are missing.
   * Default: true (always can generate)
   */
  canGenerate?(ctx: GenerationContext): boolean;
}

/**
 * EvidenceAttachment — full evidence content for a reference.
 */
export interface EvidenceAttachment {
  reference: EvidenceReference;
  content: string;               // Extracted snippet or citation
  sourceUrl?: string;            // For external sources
  accessedAt: string;            // ISO 8601
}

/**
 * EvidenceReference — inline marker in HTML pointing to evidence source.
 * (Also defined in Evidence.ts; duplicated here for blueprint convenience)
 */
export interface EvidenceReference {
  id: string;
  type: 'graph_node' | 'external_source' | 'research_paper';
  sourceId: string;
  claimSegment: string;
  confidence: number;            // 0.0 to 1.0
  justification?: string;
}
