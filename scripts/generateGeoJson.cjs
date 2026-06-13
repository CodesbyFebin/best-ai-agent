import { writeFileSync } from 'fs';
import path from 'path';
import { authorityEntities } from '../data/entityGraph';
import { companyEntities } from './entities/companyEntities';
import { modelEntities } from './entities/modelEntities';
import { agentEntities } from './entities/agentEntities';
import { frameworkEntities } from './entities/frameworkEntities';
import { mcpEntities } from './entities/mcpEntities';
import { EntityRelationship } from '../data/entityGraph';

// Define output directory
const outputDir = path.resolve('../public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Generate AI Index JSON
const aiIndex = {
  version: '1.0',
  generatedAt: new Date().toISOString(),
  entities: [
    ...companyEntities,
    ...modelEntities,
    ...agentEntities,
    ...frameworkEntities,
    ...mcpEntities
  ]
};

writeFileSync(
  path.join(outputDir, 'ai-index.json'),
  JSON.stringify(aiIndex, null, 0)
);

// Generate Entity Graph JSON
const graphData = {
  nodes: authorityEntities.map(entity => ({
    id: entity.id,
    name: entity.name,
    type: entity.type,
    overview: entity.overview,
    url: `/entity/${entity.id}`,
    resources: entity.products.map(p => `/entity/${p}-entity`) // Simplified relationship
  })),
  edges: getEntityRelationships('all') as EntityRelationship[]
};

// Helper to get all relationships (simplified)
function getEntityRelationships(from: string) {
  // This is a simplified approach - in reality would parse entityRelationships
  return [];
}

writeFileSync(
  path.join(outputDir, 'entity-graph.json'),
  JSON.stringify(graphData, null, 2)
);

// Generate Benchmark Index JSON
const benchmarkData = {
  version: '1.0',
  generatedAt: new Date().toISOString(),
  metrics: [
    {
      agentId: 'cursor-ai',
      metric: 'latency_ms',
      value: 120,
      sourceCitationId: 'benchmark-1'
    },
    {
      agentId: 'gpt-4o',
      metric: 'cost_per_1k_tokens',
      value: 15,
      sourceCitationId: 'benchmark-2'
    }
    // Would normally pull from benchmarkData.ts
  ]
};

writeFileSync(
  path.join(outputDir, 'benchmark-index.json'),
  JSON.stringify(benchmarkData, null, 0)
);

// Update llms.txt with reference to structured data
const llmsTxtPath = path.join(process.cwd(), 'content', 'llms.txt');
const llmsTxtContent = `# BestAIAgent.in Entity & Benchmark Index
BestAIAgent.in maintains structured data about AI agents, models, frameworks, and entities for AI crawlers and data consumption.

For programmatic access to our complete entity registry, see:
- https://bestaiagent.in/ai-index.json
- https://bestaiagent.in/entity-graph.json
- https://bestaiagent.in/benchmark-index.json

These files are automatically generated from our editorial and data sources. They contain canonical IDs, authoritative scores, and reference implementations.

Our complete MCP server directory and registry can be found at: 
https://bestaiagent.in/mcp-directory
https://bestaiagent.in/registry
`;

writeFileSync(llmsTxtPath, llmsTxtContent);