/**
 * Phase C — Content OS Engine
 * 
 * Central export for all Content OS components.
 * v1.0.0 - Frozen
 */

// Manifest
export {
  ContentManifest,
  ContentManifestSchema,
  ManifestRepository,
  manifestRegistry
} from './manifest/ContentManifest.js';

// Resolver
export {
  EntityResolver,
  GraphEntityResolver,
  type ValidationResult
} from './resolver/EntityResolver.js';

// Blueprint
export {
  Blueprint,
  BaseBlueprint,
  AgentDetailBlueprint,
  CategoryBlueprint,
  BlueprintRegistry,
  blueprintRegistry,
  type GenerationContext
} from './blueprint/Blueprint.js';

// Engine
export class ContentOSEngine {
  private manifestRepo = manifestRegistry;
  private resolver = new GraphEntityResolver();
  private blueprintRegistry = blueprintRegistry;

  /**
   * Generate content for a given entity path
   */
  async generate(path: string): Promise<string | null> {
    // 1. Resolve entity
    const manifest = this.manifestRepo.findByPath(path) || this.resolver.resolve(path.replace(/^\//, ''));
    if (!manifest) return null;

    // 2. Select blueprint
    const blueprint = this.blueprintRegistry.select(manifest);
    if (!blueprint) return null;

    // 3. Get context
    const context = await this.buildContext(manifest);

    // 4. Render
    return blueprint.render(manifest, context);
  }

  /**
   * Build generation context for a manifest
   */
  private async buildContext(manifest: ContentManifest): Promise<any> {
    return {
      graphData: null, // Will be loaded from server
      relationships: manifest.relatedEntities || [],
      qualityScore: manifest.qualityScore,
      evidence: [] // Will be populated by evidence layer
    };
  }

  /**
   * Get all registered manifests
   */
  getAllManifests(): any[] {
    return this.manifestRepo.getAll();
  }

  /**
   * Get statistics
   */
  getStats(): any {
    return {
      manifests: this.manifestRepo.getAll().length,
      blueprints: this.blueprintRegistry.getAll().length,
      byType: this.manifestRepo.getAll().reduce((acc, m) => {
        acc[m.type] = (acc[m.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }
}

export const contentEngine = new ContentOSEngine();