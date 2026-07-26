/**
 * Phase C — Entity Resolver (C2)
 * 
 * Bridges Content OS to Knowledge Graph.
 * Maps page requests to canonical graph entities.
 * v1.0.0 - Frozen
 */

import { manifestRegistry, type ContentManifest } from '../manifest/ContentManifest.js';

export interface EntityResolver {
  /**
   * Resolve an entity by its identifier (slug, ID, or path)
   */
  resolve(identifier: string): ContentManifest | null;

  /**
   * Batch resolve multiple entities
   */
  resolveBatch(identifiers: string[]): Map<string, ContentManifest | null>;

  /**
   * Check if an entity can be resolved
   */
  canResolve(identifier: string): boolean;

  /**
   * Get the entity count for a given type
   */
  getEntityCount(type: ContentManifest['type']): number;

  /**
   * List all entity slugs of a given type
   */
  listSlugs(type: ContentManifest['type']): string[];

  /**
   * Validate entity data integrity
   */
  validateIntegrity(): ValidationResult;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  unresolvedEntities: string[];
}

/**
 * GraphEntityResolver - Implements EntityResolver using Knowledge Graph
 */
export class GraphEntityResolver implements EntityResolver {
  private graphData: { nodes: any[]; edges: any[] } | null = null;

  constructor() {
    // Load graph data if available
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const fs = require('node:fs');
      const graphPath = require('node:path').resolve('./graph-data.json');
      const graphJson = fs.readFileSync(graphPath, 'utf-8');
      this.graphData = JSON.parse(graphJson);
    } catch (e) {
      console.warn('Graph data not available for EntityResolver');
    }
  }

  resolve(identifier: string): ContentManifest | null {
    // Try to find by manifest slug first
    const bySlug = manifestRegistry.findBySlug(identifier);
    if (bySlug) return bySlug;

    // Try by path
    const byPath = manifestRegistry.findByPath(`/${identifier}`);
    if (byPath) return byPath;

    // Try to find in graph data
    if (this.graphData) {
      const validTypes = ['agent', 'category', 'comparison', 'research'];

      for (const type of validTypes) {
        const node = this.graphData.nodes.find(
          (n: any) => n.type === type && n.id === `${type}/${identifier}`
        );
        if (node) {
          // Create manifest from graph node
          return this.nodeToManifest(node);
        }
      }
    }

    return null;
  }

  resolveBatch(identifiers: string[]): Map<string, ContentManifest | null> {
    const results = new Map<string, ContentManifest | null>();
    for (const id of identifiers) {
      results.set(id, this.resolve(id));
    }
    return results;
  }

  canResolve(identifier: string): boolean {
    return this.resolve(identifier) !== null;
  }

  getEntityCount(type: ContentManifest['type']): number {
    return manifestRegistry.getEntityCount(type);
  }

  listSlugs(type: ContentManifest['type']): string[] {
    return manifestRegistry.getAll()
      .filter(m => m.type === type)
      .map(m => m.slug);
  }

  validateIntegrity(): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const unresolvedEntities: string[] = [];

    // Check manifest registry consistency
    const manifests = manifestRegistry.getAll();
    const seenSlugs = new Set<string>();
    const seenPaths = new Set<string>();

    for (const manifest of manifests) {
      // Check for duplicate slugs
      if (seenSlugs.has(manifest.slug)) {
        errors.push(`Duplicate slug: ${manifest.slug}`);
      }
      seenSlugs.add(manifest.slug);

      // Check for duplicate paths
      if (seenPaths.has(manifest.path)) {
        errors.push(`Duplicate path: ${manifest.path}`);
      }
      seenPaths.add(manifest.path);

      // Check for unresolvable entity references
      if (manifest.entityId && !manifest.entityType) {
        warnings.push(`Manifest ${manifest.id} has entityId but no entityType`);
      }
    }

    // Check graph edges reference valid nodes
    if (this.graphData) {
      const nodeIds = new Set(this.graphData.nodes.map((n: any) => n.id));
      for (const edge of this.graphData.edges) {
        if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) {
          unresolvedEntities.push(`Invalid edge: ${edge.from} → ${edge.to}`);
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      unresolvedEntities
    };
  }

  private nodeToManifest(node: any): ContentManifest {
    return {
      id: node.id,
      slug: node.id.split('/')[1],
      type: node.type,
      path: `/${node.id.split('/')[0]}/${node.id.split('/')[1]}`,
      canonicalPath: `/${node.id.split('/')[0]}/${node.id.split('/')[1]}`,
      title: node.data?.name || node.id,
      description: node.data?.summary || '',
      summary: node.data?.summary,
      entityType: node.type,
      entityId: node.id,
      createdAt: node.data?.createdAt || new Date().toISOString(),
      updatedAt: node.data?.updatedAt || new Date().toISOString(),
      status: 'published',
      priority: 1,
      contentState: 'published',
      version: '1.0.0'
    } as ContentManifest;
  }
}