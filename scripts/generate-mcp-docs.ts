#!/usr/bin/env npx tsx

/**
 * Generate MCP Server Documentation
 * Expands MCP server documentation with India-specific content
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, '..', 'dist', 'content');

interface MCPServerDoc {
  slug: string;
  name: string;
  category: string;
  description: string;
  useCases: string[];
  indiaSpecific: string[];
  setupSteps: string[];
  compatibility: string[];
}

const mcpServers: MCPServerDoc[] = [
  {
    slug: 'mcp/servers/github',
    name: 'GitHub MCP Server',
    category: 'Development',
    description: 'Connect AI agents to GitHub repositories for code analysis, PR review, and repository management.',
    useCases: [
      'Automated code review and PR analysis',
      'Repository search and documentation generation',
      'Issue triage and assignment',
      'Release note generation',
      'Codebase context retrieval'
    ],
    indiaSpecific: [
      'India-based development teams collaboration',
      'Compliance with DPDP data protection',
      'Integration with Indian SaaS tools',
      'Support for regional code repositories',
      'GST compliance for enterprise'
    ],
    setupSteps: [
      'Create GitHub Personal Access Token',
      'Configure MCP server in Claude Desktop settings',
      'Set repository access permissions',
      'Test connection with sample repository',
      'Configure authentication for team access'
    ],
    compatibility: ['Claude Desktop', 'Cursor', 'VS Code', 'Custom clients']
  },
  {
    slug: 'mcp/servers/postgres',
    name: 'PostgreSQL MCP Server',
    category: 'Database',
    description: 'Enable AI agents to query and analyze PostgreSQL databases safely with read-only access.',
    useCases: [
      'Database schema exploration',
      'Query generation and optimization',
      'Data analysis and reporting',
      'Database documentation',
      'Performance troubleshooting'
    ],
    indiaSpecific: [
      'Support for regional database hosting',
      'Compliance with data residency requirements',
      'Integration with Indian fintech databases',
      'Multi-language text search',
      'Backup and disaster recovery'
    ],
    setupSteps: [
      'Install PostgreSQL MCP server package',
      'Configure database connection string',
      'Set read-only permissions',
      'Test query execution',
      'Configure connection pooling'
    ],
    compatibility: ['Claude Desktop', 'Cursor', 'Python clients', 'Node.js']
  },
  {
    slug: 'mcp/servers/notion',
    name: 'Notion MCP Server',
    category: 'Productivity',
    description: 'Connect AI agents to Notion workspaces for knowledge management and content retrieval.',
    useCases: [
      'Knowledge base search and retrieval',
      'Meeting notes summarization',
      'Documentation generation',
      'Project status tracking',
      'Content organization'
    ],
    indiaSpecific: [
      'Regional workspace management',
      'Multi-team collaboration',
      'Compliance with data localization',
      'Integration with Indian tools',
      'Support for multiple languages'
    ],
    setupSteps: [
      'Create Notion Integration token',
      'Share pages with the integration',
      'Configure MCP server settings',
      'Test workspace access',
      'Set up page permissions'
    ],
    compatibility: ['Claude Desktop', 'Cursor', 'Custom clients']
  },
  {
    slug: 'mcp/servers/slack',
    name: 'Slack MCP Server',
    category: 'Communication',
    description: 'Enable AI agents to interact with Slack channels, messages, and workspaces.',
    useCases: [
      'Channel message analysis',
      'Team communication insights',
      'Automated meeting summaries',
      'Knowledge retrieval from discussions',
      'Integration with workflows'
    ],
    indiaSpecific: [
      'Multi-timezone team coordination',
      'Regional team communication',
      'Compliance with communication laws',
      'Integration with Indian tools',
      'Support for regional channels'
    ],
    setupSteps: [
      'Create Slack app with bot permissions',
      'Install app to workspace',
      'Configure MCP server settings',
      'Test channel access',
      'Set up message handling'
    ],
    compatibility: ['Claude Desktop', 'Cursor', 'Custom clients']
  }
];

function generateMCPDoc(server: MCPServerDoc): string {
  const canonical = `https://bestaiagent.in/${server.slug}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": server.name,
    "applicationCategory": "MCP Server",
    "description": server.description,
    "operatingSystem": "Multi-platform"
  };

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${server.name} - MCP Server Guide | BestAIAgent.in</title>
  <meta name="description" content="${server.description} Setup guide, use cases, India-specific features.">
  <link rel="canonical" href="${canonical}">
  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 900px; margin: 2rem auto; padding: 0 1rem; line-height: 1.7; color: #333; }
    h1, h2 { color: #1a1a2e; }
    .badge { background: #0066cc; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.85em; }
    .section { margin: 2rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 8px; }
    ul { margin: 1rem 0; padding-left: 2rem; }
    li { margin: 0.5rem 0; }
    .steps { counter-reset: step-counter; }
    .steps li { counter-increment: step-counter; list-style: none; padding-left: 2rem; position: relative; }
    .steps li:before { content: counter(step-counter); position: absolute; left: 0; background: #0066cc; color: white; width: 1.5rem; height: 1.5rem; border-radius: 50%; text-align: center; line-height: 1.5rem; font-size: 0.85em; }
  </style>
</head>
<body>
  <article>
    <h1>${server.name} <span class="badge">${server.category}</span></h1>
    <p style="font-size: 1.1em;">${server.description}</p>
    
    <section class="section">
      <h2>Use Cases</h2>
      <ul>`;
  server.useCases.forEach(useCase => {
    html += `\n        <li>${useCase}</li>`;
  });
  html += `
      </ul>
    </section>
    
    <section class="section">
      <h2>India-Specific Features</h2>
      <ul>`;
  server.indiaSpecific.forEach(feature => {
    html += `\n        <li>${feature}</li>`;
  });
  html += `
      </ul>
    </section>
    
    <section class="section">
      <h2>Setup Guide</h2>
      <ol class="steps">`;
  server.setupSteps.forEach(step => {
    html += `\n        <li>${step}</li>`;
  });
  html += `
      </ol>
    </section>
    
    <section class="section">
      <h2>Compatibility</h2>
      <p>Works with: ${server.compatibility.join(', ')}</p>
    </section>
  </article>
</body>
</html>`;

  return html;
}

async function main() {
  console.log('=== MCP Server Documentation Generation ===\n');
  
  let generated = 0;
  
  for (const server of mcpServers) {
    const dir = path.join(outputDir, server.slug);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const html = generateMCPDoc(server);
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    
    console.log(`Generated: ${server.name}`);
    console.log(`  → ${server.slug}/index.html`);
    generated++;
  }
  
  console.log(`\n=== Complete ===`);
  console.log(`Generated ${generated} MCP server documentation pages`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
