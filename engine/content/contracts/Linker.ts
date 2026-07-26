// ============================================
// Content OS Contracts — Phase C
// File: engine/content/contracts/Linker.ts
// Status: Frozen (v1.0.0)
// Contract Only — No Implementation
// ============================================

import type { GenerationContext } from './GenerationContext';

/**
 * LinkOpportunity — a candidate internal link identified by a rule.
 */
export interface LinkOpportunity {
  /** Target graph node ID (must resolve to published manifest) */
  targetNodeId: string;

  /** URL slug for the target page */
  targetSlug: string;

  /** Suggested anchor text for the link */
  anchorText: string;

  /** Surrounding context snippet (for debugging/rules) */
  context: string;

  /** Relevance score 0.0–1.0 (higher = more relevant) */
  relevance: number;
}

/**
 * LinkRule — strategy for finding internal linking opportunities.
 *
 * Each rule scans the GenerationContext and proposes links based on
 * graph relationships, content keywords, or other heuristics.
 *
 * Invariants:
 * 1. findOpportunities() returns links with relevance ≥ minRelevance
 * 2. All returned opportunities reference targetNodeId that exists in graph
 * 3. Rule priority determines conflict resolution (higher wins)
 */
export interface LinkRule {
  /** Unique rule identifier */
  id: string;

  /** Human-readable name */
  name: string;

  /** Priority (higher numbers applied first, conflict resolution) */
  priority: number;

  /** Maximum links this rule alone can produce */
  maxLinksPerPage: number;

  /** Target node types this rule is allowed to link to (e.g., ["agent", "category"]) */
  nodeTypes: string[];

  /** Minimum relevance threshold (opportunities below this are filtered) */
  minRelevance: number;

  /**
   * Find linking opportunities in the generation context.
   * @param ctx — Current page context (entity, graph snapshot)
   * @returns Array of LinkOpportunity (may be empty)
   */
  findOpportunities(ctx: GenerationContext): LinkOpportunity[];
}

/**
 * GeneratedLink — final link HTML after opportunity selection.
 */
export interface GeneratedLink {
  opportunity: LinkOpportunity;
  html: string;                    // e.g., '<a href="/agents/cursor-ai">Cursor AI</a>'
}

/**
 * Linker — orchestrates multiple link rules to inject internal links.
 *
 * Invariants:
 * 1. generateLinks() returns at most maxLinks total across all rules
 * 2. All returned links have relevance ≥ their rule's minRelevance
 * 3. validateLinks() ensures every targetNodeId resolves to PUBLISHED manifest
 * 4. Link generation does not modify the GenerationContext
 */
export interface Linker {
  /** All registered link rules (ordered by priority descending) */
  readonly rules: LinkRule[];

  /**
   * Generate internal links for a page.
   * @param ctx — Generation context for current page
   * @param maxLinks — Overall maximum links to inject (default from config)
   * @returns Array of GeneratedLink objects (ready to inject into HTML)
   *          Sorted by relevance descending
   */
  generateLinks(ctx: GenerationContext, maxLinks?: number): GeneratedLink[];

  /**
   * Validate that all generated links point to valid published pages.
   * @param links — Links to validate (from generateLinks)
   * @returns ValidationReport (errors for broken targets)
   */
  validateLinks(links: Array<{ targetNodeId: string }>): ValidationReport;
}
