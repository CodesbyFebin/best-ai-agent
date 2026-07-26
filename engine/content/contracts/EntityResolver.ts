// ============================================
// Content OS Contracts — Phase C
// File: engine/content/contracts/EntityResolver.ts
// Status: Frozen (v1.0.0)
// Contract Only — No Implementation
// ============================================

import type { EntityType } from './ContentManifest';

/**
 * ResolvedEntity — canonical entity data from Knowledge Graph.
 *
 * Invariants:
 * 1. All data comes from Knowledge Graph only
 * 2. Relationships only include edges where target nodes exist
 * 3. sourceGraphVersion identifies the graph version used
 * 4. resolvedAt is ISO 8601 timestamp
 */
export interface ResolvedEntity {
  // Graph node data
  id: string;                    // Graph node ID (e.g., "agent/cursor-ai")
  type: EntityType;
  data: Record<string, unknown>; // Full entity data from graph node

  // Related graph context (direct edges only)
  relationships: Array<{
    type: string;                // Edge type: BELONGS_TO, TOP_AGENT, COMPARED_WITH, etc.
    targetId: string;            // Target node ID
    targetType: EntityType;
    properties: Record<string, unknown>; // Edge properties (e.g., confidence)
  }>;

  // Provenance
  sourceGraphVersion: string;
  resolvedAt: string;            // ISO 8601
}

/**
 * EntityResolver — maps manifest references to canonical entities.
 *
 * The Resolver is the single point of contact between Content OS and Knowledge Graph.
 * It ensures entityId → graph node mapping is consistent and valid.
 *
 * Invariants:
 * 1. resolve() returns null only if entity does not exist in graph
 * 2. resolve() is idempotent (same input → same output)
 * 3. resolveBatch() returns results in same order as requests
 * 4. canResolve() and resolve() are consistent (if canResolve true, resolve returns non-null)
 * 5. All ResolvedEntity.data originates from Knowledge Graph exclusively
 * 6. relationships include only edges where target nodes exist
 */
export interface EntityResolver {
  /**
   * Resolve a single entity by type and ID from manifest.
   * @param entityType — Entity type from manifest.entityType
   * @param entityId — Graph node ID from manifest.entityId (format: "type/slug")
   * @returns ResolvedEntity or null if not found
   */
  resolve(entityType: EntityType, entityId: string): ResolvedEntity | null;

  /**
   * Batch resolve multiple entity references.
   * @param requests — Array of { entityType, entityId } pairs
   * @returns Map keyed by `${entityType}/${entityId}` to ResolvedEntity
   *          (entries may be missing if entity not found)
   */
  resolveBatch(requests: Array<{ entityType: EntityType; entityId: string }>): Map<string, ResolvedEntity>;

  /**
   * Check if an entity reference can be resolved.
   * @param entityType — Entity type
   * @param entityId — Graph node ID
   * @returns true if entity exists in graph; false otherwise
   */
  canResolve(entityType: EntityType, entityId: string): boolean;
}
