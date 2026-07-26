// ============================================
// Content OS Contracts — Phase C
// File: engine/content/contracts/GenerationContext.ts
// Status: Frozen (v1.0.0)
// Contract Only — No Implementation
// ============================================

import type { ContentManifest } from './ContentManifest';
import type { ResolvedEntity } from './EntityResolver';

/**
 * GenerationContext — immutable snapshot passed to blueprints during generation.
 *
 * This context is created once per page generation and never mutated.
 * Blueprints receive it as read-only input.
 *
 * Invariants:
 * 1. Context is deeply immutable after creation
 * 2. manifest.entityId === entity.id
 * 3. graphSnapshot includes all nodes reachable within internalLinkingDepth from entity.id
 * 4. buildTimestamp is set once and never changes during build
 * 5. All timestamps are ISO 8601 strings
 */
export interface GenerationContext {
  // Page identity
  manifest: ContentManifest;
  entity: ResolvedEntity;

  // Graph context — subgraph snapshot relevant to this page
  graphSnapshot: {
    nodes: Array<{
      id: string;
      type: string;
      data: Record<string, unknown>;
    }>;
    edges: Array<{
      from: string;
      to: string;
      type: string;
    }>;
  };

  // Render hints
  locale: string;                // BCP 47 locale: "en-US"
  mode: 'ssr' | 'static' | 'preview';

  // Build metadata
  buildId: string;
  buildTimestamp: string;        // ISO 8601

  // Feature flags and configuration
  features: {
    includeEvidence: boolean;          // Inject evidence annotations
    includeQualityScore: boolean;      // Show quality score badge
    internalLinkingDepth: number;      // Graph hops for linker (default 2)
  };
}
