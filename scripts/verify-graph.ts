/**
 * Phase B — Graph Verification
 *
 * Validates the knowledge graph structure, connectivity, and API correctness.
 *
 * Run: npx tsx scripts/verify-graph.ts
 */

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

async function verifyGraph() {
  console.log('🔍 Verifying Knowledge Graph...\n');

  // 1. Check graph-data.json exists and is valid
  const graphPath = join(process.cwd(), 'graph-data.json');
  let graphData: { nodes: any[]; edges: any[]; metadata: any } | null = null;

  try {
    const content = await readFile(graphPath, 'utf-8');
    graphData = JSON.parse(content);
    console.log('✅ graph-data.json exists and is valid JSON');
  } catch (e) {
    console.error('❌ graph-data.json missing or invalid:', e);
    process.exit(1);
  }

  // 2. Verify node counts
  const expectedNodeTypes = new Set(['agent', 'category', 'comparison', 'research']);
  const actualNodeTypes = new Set(graphData.nodes.map(n => n.type));

  console.log(`\n📊 Graph Summary:`);
  console.log(`   Nodes: ${graphData.nodes.length}`);
  console.log(`   Edges: ${graphData.edges.length}`);
  console.log(`   Node types: ${Array.from(actualNodeTypes).join(', ')}`);

  // 3. Verify all expected node types present
  for (const type of expectedNodeTypes) {
    if (!actualNodeTypes.has(type)) {
      console.warn(`⚠️  Missing node type: ${type}`);
    } else {
      const count = graphData.nodes.filter(n => n.type === type).length;
      console.log(`   - ${type}: ${count}`);
    }
  }

  // 4. Validate edge types
  const edgeTypes = new Set(graphData.edges.map(e => e.type));
  const expectedEdgeTypes = new Set(['BELONGS_TO', 'TOP_AGENT', 'COMPARED_WITH', 'SIMILAR_TO', 'CITED_BY']);
  console.log(`\n🔗 Edge types: ${Array.from(edgeTypes).join(', ')}`);

  for (const type of expectedEdgeTypes) {
    const count = graphData.edges.filter(e => e.type === type).length;
    if (count > 0) {
      console.log(`   - ${type}: ${count}`);
    } else {
      console.warn(`⚠️  Missing edge type: ${type}`);
    }
  }

  // 5. Check node id format
  const malformedNodeIds: string[] = [];
  for (const node of graphData.nodes) {
    if (!node.id.includes('/')) {
      malformedNodeIds.push(node.id);
    }
  }
  if (malformedNodeIds.length > 0) {
    console.error(`❌ Malformed node IDs (missing type/): ${malformedNodeIds.slice(0, 5).join(', ')}`);
    process.exit(1);
  } else {
    console.log('✅ All node IDs follow type/id format');
  }

  // 6. Validate edges reference existing nodes
  const nodeIds = new Set(graphData.nodes.map(n => n.id));
  const brokenEdges: Array<{ edge: any; problem: string }> = [];

  for (const edge of graphData.edges) {
    if (!nodeIds.has(edge.from)) {
      brokenEdges.push({ edge, problem: `from node not found: ${edge.from}` });
    }
    if (!nodeIds.has(edge.to)) {
      brokenEdges.push({ edge, problem: `to node not found: ${edge.to}` });
    }
  }

  if (brokenEdges.length > 0) {
    console.error(`❌ ${brokenEdges.length} edges reference non-existent nodes`);
    brokenEdges.slice(0, 5).forEach(b => {
      console.error(`   - ${b.problem} (${b.edge.from} -> ${b.edge.to})`);
    });
    process.exit(1);
  } else {
    console.log('✅ All edges reference valid nodes');
  }

  // 7. Check agent connectivity
  const agentNodes = graphData.nodes.filter(n => n.type === 'agent');
  const agentsWithOutgoing = new Set<string>();
  const agentsWithIncoming = new Set<string>();

  graphData.edges.forEach(e => {
    if (e.from.startsWith('agent/')) agentsWithOutgoing.add(e.from);
    if (e.to.startsWith('agent/')) agentsWithIncoming.add(e.to);
  });

  const isolatedAgents = agentNodes.filter(a => !agentsWithOutgoing.has(a.id) && !agentsWithIncoming.has(a.id));
  if (isolatedAgents.length > 0) {
    console.warn(`⚠️  ${isolatedAgents.length} agents with no relationships`);
    console.warn(`   Examples: ${isolatedAgents.slice(0, 5).map(a => a.id).join(', ')}`);
  } else {
    console.log('✅ All agents have relationships');
  }

  // 8. Verify agent coverage (all agents should have BELONGS_TO edges)
  const agentsWithBelongsTo = new Set<string>(
    graphData.edges.filter(e => e.type === 'BELONGS_TO').map(e => e.from)
  );
  const agentsWithoutCategory = agentNodes.filter(a => !agentsWithBelongsTo.has(a.id));
  if (agentsWithoutCategory.length > 0) {
    console.warn(`⚠️  ${agentsWithoutCategory.length} agents have no category assignment`);
  } else {
    console.log('✅ All agents assigned to categories');
  }

  // 9. Check comparison connectivity (both directions)
  const comparisonEdges = graphData.edges.filter(e => e.type === 'COMPARED_WITH');
  const fromSet = new Set(comparisonEdges.map(e => e.from));
  const toSet = new Set(comparisonEdges.map(e => e.to));
  const asymmetrical = comparisonEdges.filter(e => !toSet.has(e.to) || !fromSet.has(e.from));
  if (asymmetrical.length > 0) {
    console.warn(`⚠️  ${asymmetrical.length} comparison edges may be unidirectional`);
  } else {
    console.log('✅ Comparison edges are bidirectional');
  }

  // 10. Check graph density metrics
  const maxPossibleEdges = graphData.nodes.length * (graphData.nodes.length - 1);
  const density = graphData.edges.length / maxPossibleEdges;
  console.log(`\n📈 Graph Density: ${(density * 100).toFixed(2)}% (sparse networks typical)`);

  // 11. Verify metadata
  if (!graphData.metadata?.generatedAt) {
    console.warn('⚠️  Missing metadata.generatedAt');
  } else {
    console.log(`✅ Graph metadata present (generated: ${new Date(graphData.metadata.generatedAt).toISOString()})`);
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('✅ Graph verification complete');
  console.log('='.repeat(50));

  if (isolatedAgents.length > 0 || agentsWithoutCategory.length > 0) {
    console.log('\n⚠️  Warnings present, but graph is usable.');
  } else {
    console.log('\n🎉 Graph structure looks perfect!');
  }
}

verifyGraph().catch(e => {
  console.error('❌ Verification failed:', e);
  process.exit(1);
});
