/**
 * Phase C — Blueprint Engine (C4)
 * 
 * Defines page templates for rendering content from manifests.
 * v1.0.0 - Frozen
 */

import type { ContentManifest } from '../manifest/ContentManifest.js';

export interface Blueprint {
  id: string;
  version: string;
  contentType: ContentManifest['type'];
  description: string;
  template: string;
  requiredFields: string[];
  optionalFields: string[];
  render(manifest: ContentManifest, context?: GenerationContext): Promise<string>;
}

export interface GenerationContext {
  graphData?: {
    nodes: any[];
    edges: any[];
  };
  relationships?: any[];
  qualityScore?: number;
  evidence?: any[];
  metadata?: {
    generatedAt: string;
    modelVersion?: string;
    [key: string]: any;
  };
}

/**
 * Base blueprint class with common utilities
 */
export abstract class BaseBlueprint implements Blueprint {
  abstract id: string;
  abstract version: string;
  abstract contentType: ContentManifest['type'];
  abstract description: string;

  readonly requiredFields: string[] = ['title', 'description', 'path'];
  readonly optionalFields: string[] = [
    'summary', 'content', 'categories', 'price',
    'relatedEntities', 'qualityScore'
  ];

  async render(manifest: ContentManifest, context?: GenerationContext): Promise<string> {
    // Validate required fields
    for (const field of this.requiredFields) {
      if (manifest[field as keyof ContentManifest] === undefined) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    return this.renderTemplate(manifest, context || {});
  }

  protected abstract renderTemplate(manifest: ContentManifest, context: GenerationContext): string;

  protected escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  protected generateJsonLd(manifest: ContentManifest): string {
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': this.getSchemaType(manifest.type),
      'name': manifest.title,
      'description': manifest.description,
      'url': `https://bestaiagent.in${manifest.canonicalPath}`,
      'dateModified': manifest.updatedAt
    }, null, 2);
  }

  protected getSchemaType(type: ContentManifest['type']): string {
    const schemaMap: Record<ContentManifest['type'], string> = {
      agent: 'SoftwareApplication',
      category: 'CollectionPage',
      comparison: 'ItemList',
      research: 'Report',
      mcp_server: 'SoftwareApplication',
      pillar: 'WebPage',
      governance: 'WebPage',
      pricing: 'Offer'
    };
    return schemaMap[type] || 'WebPage';
  }
}

/**
 * Agent Detail Blueprint (Product Detail V1)
 */
export class AgentDetailBlueprint extends BaseBlueprint {
  id = 'agent-detail-v1';
  version = '1.0.0';
  contentType: ContentManifest['type'] = 'agent';
  description = 'Product detail page for AI agents';

  protected renderTemplate(manifest: ContentManifest, context: GenerationContext): string {
    const entity = manifest.entityId ? context.graphData?.nodes.find(n => n.id === manifest.entityId) : null;

    const agentData = entity?.data || {};
    const categories = agentData.categories || manifest.relatedEntities || [];

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.escapeHtml(manifest.title)}</title>
  <meta name="description" content="${this.escapeHtml(manifest.description)}">
  <link rel="canonical" href="https://bestaiagent.in${manifest.canonicalPath}">
  <script type="application/ld+json">${this.generateJsonLd(manifest)}</script>
</head>
<body>
  <h1>${this.escapeHtml(manifest.title)}</h1>
  <p class="summary">${this.escapeHtml(manifest.summary || manifest.description)}</p>
  
  <section id="overview">
    <h2>Overview</h2>
    <p>${this.escapeHtml(agentData.summary || 'No summary available')}</p>
  </section>

  <section id="categories">
    <h2>Categories</h2>
    <ul>
      ${categories.map((cat: string) => `<li>${this.escapeHtml(cat)}</li>`).join('')}
    </ul>
  </section>

  <section id="pricing">
    <h2>Pricing</h2>
    <p>${this.escapeHtml(agentData.pricing?.details || 'Pricing information not available')}</p>
  </section>

  ${manifest.content ? `<section id="content">${manifest.content}</section>` : ''}
  
  <footer>
    <p>Last updated: ${manifest.updatedAt}</p>
    ${manifest.qualityScore ? `<p>Quality Score: ${manifest.qualityScore}%</p>` : ''}
  </footer>
</body>
</html>`;
  }
}

/**
 * Category Overview Blueprint
 */
export class CategoryBlueprint extends BaseBlueprint {
  id = 'category-overview-v1';
  version = '1.0.0';
  contentType: ContentManifest['type'] = 'category';
  description = 'Category overview page for AI agent categories';

  protected renderTemplate(manifest: ContentManifest, context: GenerationContext): string {
    const entity = manifest.entityId ? context.graphData?.nodes.find(n => n.id === manifest.entityId) : null;
    const agentData = entity?.data || {};
    const relatedAgents = agentData.agents || manifest.relatedEntities || [];

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.escapeHtml(manifest.title)}</title>
  <meta name="description" content="${this.escapeHtml(manifest.description)}">
  <link rel="canonical" href="https://bestaiagent.in${manifest.canonicalPath}">
  <script type="application/ld+json">${this.generateJsonLd(manifest)}</script>
</head>
<body>
  <h1>${this.escapeHtml(manifest.title)}</h1>
  <p class="description">${this.escapeHtml(manifest.description)}</p>
  
  <section id="agents">
    <h2>Agents in Category</h2>
    <ul>
      ${relatedAgents.map((agent: string) => `
        <li>
          <a href="/agents/${agent}">${agent.replace('-', ' ').toUpperCase()}</a>
        </li>
      `).join('')}
    </ul>
  </section>

  ${manifest.summary ? `<section id="summary"><p>${this.escapeHtml(manifest.summary)}</p></section>` : ''}
</body>
</html>`;
  }
}

/**
 * Blueprint Registry - Manages and selects blueprints
 */
export class BlueprintRegistry {
  private blueprints: Map<string, Blueprint> = new Map();
  private typeToBlueprint: Map<ContentManifest['type'], Blueprint[]> = new Map();

  register(blueprint: Blueprint): void {
    this.blueprints.set(blueprint.id, blueprint);

    const existing = this.typeToBlueprint.get(blueprint.contentType) || [];
    existing.push(blueprint);
    this.typeToBlueprint.set(blueprint.contentType, existing);
  }

  select(manifest: ContentManifest): Blueprint | null {
    const blueprints = this.typeToBlueprint.get(manifest.type);
    if (!blueprints || blueprints.length === 0) {
      return null;
    }

    // Return first matching blueprint
    return blueprints[0];
  }

  getById(id: string): Blueprint | null {
    return this.blueprints.get(id) || null;
  }

  getByType(type: ContentManifest['type']): Blueprint[] {
    return this.typeToBlueprint.get(type) || [];
  }

  getAll(): Blueprint[] {
    return Array.from(this.blueprints.values());
  }
}

// Singleton registry
export const blueprintRegistry = new BlueprintRegistry();

// Register default blueprints
blueprintRegistry.register(new AgentDetailBlueprint());
blueprintRegistry.register(new CategoryBlueprint());