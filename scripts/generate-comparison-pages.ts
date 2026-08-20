#!/usr/bin/env npx tsx

/**
 * Generate Comparison Pages for AI Agents
 * Creates comprehensive comparison pages with feature matrices
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, '..', 'dist', 'content');

interface Comparison {
  slug: string;
  agent1: string;
  agent2: string;
  category: string;
  keyDifferences: string[];
  winner?: string;
  useCase1: string;
  useCase2: string;
}

const comparisons: Comparison[] = [
  {
    slug: 'compare/chatgpt-vs-claude',
    agent1: 'ChatGPT',
    agent2: 'Claude',
    category: 'general',
    keyDifferences: [
      'ChatGPT excels at real-time web browsing and integrated canvas',
      'Claude offers superior code understanding and large context windows',
      'ChatGPT has stronger multi-modal capabilities',
      'Claude provides better writing quality and tone consistency',
      'ChatGPT integrates with more third-party tools via GPTs',
      'Claude has better MCP server support for data integration'
    ],
    winner: 'Tie - depends on use case',
    useCase1: 'Best for: Quick answers, web research, creative writing, multi-modal tasks',
    useCase2: 'Best for: Code review, large document analysis, structured writing'
  },
  {
    slug: 'compare/cursor-vs-windsurf',
    agent1: 'Cursor',
    agent2: 'Windsurf',
    category: 'coding',
    keyDifferences: [
      'Cursor offers deeper codebase understanding with embeddings',
      'Windsurf provides faster code generation and editing',
      'Cursor has better multi-file refactoring capabilities',
      'Windsurf excels at quick prototyping and UI generation',
      'Cursor integrates natively with VS Code extensions',
      'Windsurf has superior terminal and command-line support'
    ],
    winner: 'Cursor for enterprise, Windsurf for speed',
    useCase1: 'Best for: Large codebases, team collaboration, deep refactoring',
    useCase2: 'Best for: Rapid prototyping, UI development, solo developers'
  },
  {
    slug: 'compare/autogen-vs-crewai',
    agent1: 'AutoGen',
    agent2: 'CrewAI',
    category: 'framework',
    keyDifferences: [
      'AutoGen provides more flexible agent orchestration',
      'CrewAI offers simpler setup for role-based agents',
      'AutoGen has better memory management for long conversations',
      'CrewAI provides pre-built templates for common workflows',
      'AutoGen supports more LLM providers natively',
      'CrewAI has better documentation and community support'
    ],
    winner: 'CrewAI for beginners, AutoGen for advanced users',
    useCase1: 'Best for: Complex multi-agent systems, research workflows',
    useCase2: 'Best for: Business automation, customer support, content creation'
  },
  {
    slug: 'compare/mcp-servers/postgres-vs-mysql',
    agent1: 'Postgres MCP Server',
    agent2: 'MySQL MCP Server',
    category: 'mcp',
    keyDifferences: [
      'Postgres supports complex data types and advanced queries',
      'MySQL offers better performance for read-heavy workloads',
      'Postgres has better JSON and full-text search capabilities',
      'MySQL integrates more easily with existing web stacks',
      'Postgres supports advanced constraints and triggers',
      'MySQL has larger ecosystem of hosting providers'
    ],
    winner: 'Postgres for complex queries, MySQL for web apps',
    useCase1: 'Best for: Analytics, complex data modeling, full-text search',
    useCase2: 'Best for: Web applications, content management, e-commerce'
  },
  {
    slug: 'compare/vapi-vs-retell-ai',
    agent1: 'Vapi',
    agent2: 'Retell AI',
    category: 'voice',
    keyDifferences: [
      'Vapi offers better pricing for high-volume calls',
      'Retell AI provides superior voice cloning quality',
      'Vapi has faster setup with more integrations',
      'Retell AI excels at conversational naturalness',
      'Vapi supports more languages out of the box',
      'Retell AI has better analytics and call insights'
    ],
    winner: 'Vapi for cost, Retell for quality',
    useCase1: 'Best for: Customer support at scale, IVR replacement',
    useCase2: 'Best for: Premium voice experiences, sales calls'
  }
];

function generateComparisonPage(comp: Comparison): string {
  const canonical = `https://bestaiagent.in/${comp.slug}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "url": canonical,
    "headline": `${comp.agent1} vs ${comp.agent2} - Complete Comparison 2026`,
    "description": `Compare ${comp.agent1} and ${comp.agent2} across key features with evidence-backed analysis.`,
    "mainEntity": {
      "@type": "ComparisonTable"
    }
  };

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${comp.agent1} vs ${comp.agent2} - Complete Comparison 2026</title>
  <meta name="description" content="Compare ${comp.agent1} and ${comp.agent2} across key features with evidence-backed analysis.">
  <link rel="canonical" href="${canonical}">
  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 900px; margin: 2rem auto; padding: 0 1rem; line-height: 1.7; color: #333; }
    h1, h2 { color: #1a1a2e; }
    .comparison-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin: 2rem 0; }
    .agent-col { background: #f8f9fa; padding: 1.5rem; border-radius: 8px; }
    .vs-col { display: flex; align-items: center; justify-content: center; font-weight: bold; color: #666; }
    .winner { background: #e8f5e9; border: 2px solid #4caf50; }
    ul { margin: 1rem 0; padding-left: 2rem; }
    li { margin: 0.5rem 0; }
    .section { margin: 2rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 8px; }
  </style>
</head>
<body>
  <article>
    <h1>${comp.agent1} vs ${comp.agent2}</h1>
    <p style="font-size: 1.1em; color: #666;">Head-to-head comparison with evidence-backed analysis. ${comp.category.toUpperCase()} category.</p>
    
    <div class="comparison-grid">
      <div class="agent-col">
        <h2>${comp.agent1}</h2>
        <p><strong>Best for:</strong><br>${comp.useCase1}</p>
      </div>
      <div class="vs-col">VS</div>
      <div class="agent-col">
        <h2>${comp.agent2}</h2>
        <p><strong>Best for:</strong><br>${comp.useCase2}</p>
      </div>
    </div>
`;

  // Key Differences
  html += `
    <section class="section">
      <h2>Key Differences</h2>
      <ul>`;
  comp.keyDifferences.forEach(diff => {
    html += `\n        <li>${diff}</li>`;
  });
  html += `
      </ul>
    </section>`;

  // Winner
  if (comp.winner) {
    html += `
    <section class="section winner">
      <h2>Verdict</h2>
      <p><strong>${comp.winner}</strong></p>
      <p>Both ${comp.agent1} and ${comp.agent2} are excellent choices. The right choice depends on your specific requirements, budget, and use case.</p>
    </section>`;
  }

  html += `
  </article>
</body>
</html>`;

  return html;
}

async function main() {
  console.log('=== Comparison Page Generation ===\n');
  
  let generated = 0;
  
  for (const comp of comparisons) {
    const dir = path.join(outputDir, comp.slug);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const html = generateComparisonPage(comp);
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    
    console.log(`Generated: ${comp.agent1} vs ${comp.agent2}`);
    console.log(`  → ${comp.slug}/index.html`);
    generated++;
  }
  
  console.log(`\n=== Complete ===`);
  console.log(`Generated ${generated} comparison pages`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
