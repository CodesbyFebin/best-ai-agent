/**
 * Phase B — Knowledge Graph Builder
 *
 * Builds a relationship graph from existing entity data.
 * Output: graph-data.json (loaded by server at startup)
 *
 * Run: npx tsx scripts/build-graph.ts
 */

import { featuredAgents, codingAgents, voiceAgents, businessAgents, additionalAgents } from '../src/data/agents.js';
import { popularCategories } from '../src/data/categories.js';
import { featuredComparisons } from '../src/data/comparisons.js';
import { researchReports } from '../src/data/research.js';

// =====================
// Graph Data Structures
// =====================

interface GraphNode {
  id: string;          // e.g., "agent/cursor", "category/coding-agents"
  type: 'agent' | 'category' | 'comparison' | 'research';
  data: Record<string, unknown>;
}

interface GraphEdge {
  from: string;        // node id
  to: string;          // node id
  type: string;        // BELONGS_TO, SIMILAR_TO, etc.
  properties: Record<string, unknown>;
}

interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  metadata: {
    generatedAt: string;
    nodeCount: number;
    edgeCount: number;
  };
}

// =====================
// Build Graph
// =====================

const nodes: GraphNode[] = [];
const edges: GraphEdge[] = [];

// === AGENT NODES ===
const agentSlugSet = new Set<string>();
const allAgentsList = [
  ...featuredAgents,
  ...codingAgents,
  ...voiceAgents,
  ...businessAgents,
  ...additionalAgents
];

for (const agent of allAgentsList) {
  nodes.push({
    id: `agent/${agent.slug}`,
    type: 'agent',
    data: {
      slug: agent.slug,
      name: agent.name,
      company: agent.company,
      logo: agent.logo,
      summary: agent.summary,
      bestFor: agent.bestFor,
      categories: agent.categories,
      pricing: agent.pricing,
      score: agent.score,
      deployment: agent.deployment,
      integrations: agent.integrations,
      openSource: agent.openSource,
      officialUrl: agent.officialUrl,
      featured: agent.featured,
      trending: agent.trending,
      builtInIndia: agent.builtInIndia,
      contentState: agent.contentState,
      lastVerified: agent.lastVerified
    }
  });
  agentSlugSet.add(agent.slug);
}

// === CATEGORY NODES ===
for (const category of popularCategories) {
  nodes.push({
    id: `category/${category.slug}`,
    type: 'category',
    data: {
      slug: category.slug,
      name: category.name,
      description: category.description,
      toolCount: category.toolCount,
      topAgentSlug: category.topAgentSlug,
      urlPath: category.urlPath,
      popularKeywords: category.popularKeywords
    }
  });
}

// Build maps for category lookup
const categoryBySlug = new Map<string, typeof popularCategories[0]>();
const categorySlugByName = new Map<string, string>(); // normalized name -> slug

popularCategories.forEach(cat => {
  categoryBySlug.set(cat.slug, cat);
  // Map both slug and normalized name to slug
  categorySlugByName.set(cat.name.toLowerCase(), cat.slug);
  // Also map the slug itself (in case agents use slug directly)
  categorySlugByName.set(cat.slug, cat.slug);
});

// === COMPARISON NODES (optional, for graph context) ===
for (const comparison of featuredComparisons) {
  nodes.push({
    id: `comparison/${comparison.pairSlug}`,
    type: 'comparison',
    data: {
      pairSlug: comparison.pairSlug,
      title: comparison.title,
      itemA: comparison.itemA,
      itemB: comparison.itemB,
      verdict: comparison.verdict,
      urlPath: comparison.urlPath,
      lastUpdated: comparison.lastUpdated
    }
  });
}

// === RESEARCH NODES ===
for (const research of researchReports) {
  nodes.push({
    id: `research/${research.slug}`,
    type: 'research',
    data: {
      slug: research.slug,
      title: research.title,
      reportType: research.reportType,
      summary: research.summary,
      citationReadySummary: research.citationReadySummary,
      keyTakeaways: research.keyTakeaways,
      urlPath: research.urlPath,
      datasetAvailable: research.datasetAvailable
    }
  });
}

// =====================
// Build Edges
// =====================

// === BELONGS_TO: Agent → Category ===
for (const agent of featuredAgents) {
  if (agent.categories) {
    for (const agentCategory of agent.categories) {
      // Try to resolve the agent category string to a valid category slug
      let catSlug: string | undefined;

      // If it looks like a slug already (no spaces, lowercase), try direct
      if (!agentCategory.includes(' ') && agentCategory === agentCategory.toLowerCase()) {
        if (categoryBySlug.has(agentCategory)) {
          catSlug = agentCategory;
        }
      }

      // Try normalized name lookup
      if (!catSlug) {
        catSlug = categorySlugByName.get(agentCategory.toLowerCase());
      }

      // Fallback: normalize spaces to hyphens
      if (!catSlug) {
        const normalized = agentCategory.toLowerCase().replace(/ /g, '-');
        if (categoryBySlug.has(normalized)) {
          catSlug = normalized;
        }
      }

      if (catSlug) {
        edges.push({
          from: `agent/${agent.slug}`,
          to: `category/${catSlug}`,
          type: 'BELONGS_TO',
          properties: { confidence: 1.0 }
        });
      } else {
        console.warn(`Skipping unknown category '${agentCategory}' for agent ${agent.slug}`);
      }
    }
  }
}

// === TOP_AGENT: Category → Agent ===
for (const category of popularCategories) {
  if (category.topAgentSlug && agentSlugSet.has(category.topAgentSlug)) {
    edges.push({
      from: `category/${category.slug}`,
      to: `agent/${category.topAgentSlug}`,
      type: 'TOP_AGENT',
      properties: { confidence: 1.0 }
    });
  } else if (category.topAgentSlug) {
    console.warn(`Skipping TOP_AGENT edge: ${category.topAgentSlug} not in agent set for category ${category.slug}`);
  }
}

// === COMPARED_WITH: Agent ↔ Agent (bidirectional) ===
for (const comparison of featuredComparisons) {
  const slugA = comparison.itemA.slug;
  const slugB = comparison.itemB.slug;
  if (!agentSlugSet.has(slugA) || !agentSlugSet.has(slugB)) {
    console.warn(`Skipping comparison ${comparison.pairSlug}: missing agents (${slugA}, ${slugB})`);
    continue;
  }
  const agentA = `agent/${slugA}`;
  const agentB = `agent/${slugB}`;

  edges.push({
    from: agentA,
    to: agentB,
    type: 'COMPARED_WITH',
    properties: {
      comparisonUrl: comparison.urlPath,
      verdict: comparison.verdict,
      winnerByUseCase: comparison.winnerByUseCase
    }
  });

  edges.push({
    from: agentB,
    to: agentA,
    type: 'COMPARED_WITH',
    properties: {
      comparisonUrl: comparison.urlPath,
      verdict: comparison.verdict,
      winnerByUseCase: comparison.winnerByUseCase
    }
  });
}

// === SIMILAR_TO (inferred from shared categories + comparisons) ===
// Get category → agents mapping
const categoryToAgents = new Map<string, string[]>();
for (const agent of allAgentsList) {
  if (agent.categories) {
    for (const cat of agent.categories) {
      const existing = categoryToAgents.get(cat) || [];
      existing.push(agent.slug);
      categoryToAgents.set(cat, existing);
    }
  }
}

// For each category, connect agents as similar (same category)
for (const [categorySlug, agentSlugs] of categoryToAgents.entries()) {
  for (let i = 0; i < agentSlugs.length; i++) {
    for (let j = i + 1; j < agentSlugs.length; j++) {
      const agentA = `agent/${agentSlugs[i]}`;
      const agentB = `agent/${agentSlugs[j]}`;

      edges.push({
        from: agentA,
        to: agentB,
        type: 'SIMILAR_TO',
        properties: {
          reason: 'same-category',
          category: categorySlug,
          score: 0.8  // Base similarity for shared category
        }
      });

      edges.push({
        from: agentB,
        to: agentA,
        type: 'SIMILAR_TO',
        properties: {
          reason: 'same-category',
          category: categorySlug,
          score: 0.8
        }
      });
    }
  }
}

// === CITED_BY: Research → Agent ===
// Simple heuristic: if research summary/agent name appears in research text, link it
for (const research of researchReports) {
  const researchText = `${research.summary} ${research.citationReadySummary} ${research.keyTakeaways.join(' ')}`.toLowerCase();

  for (const agent of allAgentsList) {
    const agentNameVariations = [
      agent.name.toLowerCase(),
      agent.company.toLowerCase(),
      agent.slug.toLowerCase().replace(/-/g, ' ')
    ];

    for (const variation of agentNameVariations) {
      if (researchText.includes(variation) && variation.length > 3) {
        edges.push({
          from: `research/${research.slug}`,
          to: `agent/${agent.slug}`,
          type: 'CITED_BY',
          properties: {
            context: 'auto-detected mention',
            confidence: 0.7
          }
        });
        break; // Only add one edge per agent
      }
    }
  }
}

// =====================
// Output Graph
// =====================

const graphData: GraphData = {
  nodes,
  edges,
  metadata: {
    generatedAt: new Date().toISOString(),
    nodeCount: nodes.length,
    edgeCount: edges.length
  }
};

// Write to file
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const outputPath = join(process.cwd(), 'graph-data.json');
await writeFile(outputPath, JSON.stringify(graphData, null, 2));

console.log(`✅ Graph built:`);
console.log(`   Nodes: ${nodes.length}`);
console.log(`   Edges: ${edges.length}`);
console.log(`   Output: ${outputPath}`);

// Print summary
const nodeTypes = new Set(nodes.map(n => n.type));
	console.log(`   Node types: ${Array.from(nodeTypes).join(', ')}`);

	const edgeTypes = new Set(edges.map(e => e.type));
	console.log(`   Edge types: ${Array.from(edgeTypes).join(', ')}`);

// Validation warnings
const orphanedNodes = nodes.filter(node =>
  !edges.some(e => e.from === node.id || e.to === node.id)
);
if (orphanedNodes.length > 0) {
  console.warn(`⚠️  Orphaned nodes: ${orphanedNodes.length} (no edges)`);
  console.warn(`   Examples: ${orphanedNodes.slice(0, 5).map(n => n.id).join(', ')}`);
}

// Check connectivity
const agentNodes = nodes.filter(n => n.type === 'agent');
const agentsWithEdges = new Set<string>();
edges.filter(e => e.from.startsWith('agent/')).forEach(e => {
  agentsWithEdges.add(e.from);
});
console.log(`   Agents with relationships: ${agentsWithEdges.size}/${agentNodes.length}`);
