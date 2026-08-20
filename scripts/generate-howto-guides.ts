#!/usr/bin/env npx tsx

/**
 * Generate How-To Guides and Tutorials
 * Creates step-by-step guides for AI agent implementation
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, '..', 'dist', 'content');

interface HowToGuide {
  slug: string;
  title: string;
  description: string;
  audience: string;
  timeRequired: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  steps: string[];
  tips: string[];
  relatedContent: string[];
}

const guides: HowToGuide[] = [
  {
    slug: 'guides/setup-ai-agent-workflow',
    title: 'How to Set Up AI Agent Workflow - Complete Guide',
    description: 'Step-by-step guide to setting up AI agent workflows for business automation with tools, integration, and best practices.',
    audience: 'Business users, developers',
    timeRequired: '2-3 hours',
    difficulty: 'intermediate',
    prerequisites: ['Basic AI knowledge', 'Access to AI platform', 'Understanding of your workflow'],
    steps: [
      'Identify the workflow you want to automate',
      'Map out current process steps and pain points',
      'Choose appropriate AI agent platform',
      'Set up authentication and integrations',
      'Configure agent prompts and parameters',
      'Test workflow with sample data',
      'Monitor performance and iterate',
      'Deploy to production'
    ],
    tips: [
      'Start with simple workflows before complex ones',
      'Document your process thoroughly',
      'Set up monitoring from day one',
      'Test with edge cases',
      'Plan for human review checkpoints'
    ],
    relatedContent: [
      '/best-ai-agent-platform/',
      '/ai-agent-builder/',
      '/ai-agents-for-business/'
    ]
  },
  {
    slug: 'guides/integrate-mcp-servers',
    title: 'How to Integrate MCP Servers with AI Agents',
    description: 'Complete guide to setting up Model Context Protocol servers for enhanced AI agent capabilities.',
    audience: 'Developers',
    timeRequired: '1-2 hours',
    difficulty: 'intermediate',
    prerequisites: ['Basic programming knowledge', 'AI agent platform access', 'Server credentials'],
    steps: [
      'Choose appropriate MCP server for your use case',
      'Install MCP server package',
      'Configure authentication credentials',
      'Set up server configuration file',
      'Connect to AI agent platform',
      'Test connection with sample queries',
      'Secure server communications',
      'Monitor server performance'
    ],
    tips: [
      'Use read-only access for data servers',
      'Set up connection pooling for performance',
      'Monitor token usage carefully',
      'Test with production-like data',
      'Document server configurations'
    ],
    relatedContent: [
      '/mcp-directory/',
      '/what-is-mcp/',
      '/best-mcp-servers/'
    ]
  },
  {
    slug: 'guides/evaluate-ai-agents',
    title: 'How to Evaluate AI Agents - Selection Criteria',
    description: 'Comprehensive guide to evaluating and selecting the right AI agent for your use case with scoring methodology.',
    audience: 'Decision makers, technical evaluators',
    timeRequired: '4-6 hours',
    difficulty: 'beginner',
    prerequisites: ['Understanding of AI basics', 'Clear requirements', 'Budget constraints'],
    steps: [
      'Define your use case and requirements',
      'Identify must-have features',
      'Create evaluation scorecard',
      'Test with real-world scenarios',
      'Evaluate pricing and scalability',
      'Check security and compliance',
      'Review documentation and support',
      'Make data-driven decision'
    ],
    tips: [
      'Test with your actual data',
      'Involve end users in evaluation',
      'Consider total cost of ownership',
      'Check vendor financial stability',
      'Plan for migration path'
    ],
    relatedContent: [
      '/ai-agent-methodology/',
      '/ai-agent-benchmarks/',
      '/best-ai-agent/'
    ]
  },
  {
    slug: 'guides/deploy-ai-agents-india',
    title: 'How to Deploy AI Agents in India - Compliance Guide',
    description: 'Step-by-step guide to deploying AI agents in India with DPDP compliance, data residency, and local requirements.',
    audience: 'Enterprise IT, Compliance officers',
    timeRequired: '1-2 weeks',
    difficulty: 'advanced',
    prerequisites: ['DPDP Act knowledge', 'Data privacy expertise', 'Infrastructure access'],
    steps: [
      'Understand DPDP Act requirements',
      'Assess data residency needs',
      'Choose compliant AI agent vendors',
      'Set up data encryption and access controls',
      'Configure audit logging',
      'Implement consent management',
      'Conduct privacy impact assessment',
      'Establish data deletion procedures'
    ],
    tips: [
      'Work with legal counsel early',
      'Document all data flows',
      'Implement privacy by design',
      'Regular compliance audits',
      'Stay updated on regulations'
    ],
    relatedContent: [
      '/ai-agents-for-enterprises/',
      '/dpdp-compliance/',
      '/ai-agent-security/'
    ]
  }
];

function generateHowToGuide(guide: HowToGuide): string {
  const canonical = `https://bestaiagent.in/${guide.slug}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": guide.title,
    "description": guide.description,
    "totalTime": guide.timeRequired,
    "audience": {
      "@type": "Audience",
      "audienceType": guide.audience
    },
    "step": guide.steps.map((step, i) => ({
      "@type": "HowToStep",
      "name": `Step ${i + 1}`,
      "text": step
    }))
  };

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${guide.title}</title>
  <meta name="description" content="${guide.description}">
  <link rel="canonical" href="${canonical}">
  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 900px; margin: 2rem auto; padding: 0 1rem; line-height: 1.7; color: #333; }
    h1, h2 { color: #1a1a2e; }
    .meta { background: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 2rem 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
    .meta-item { text-align: center; }
    .badge { background: #0066cc; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.85em; }
    .section { margin: 2rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 8px; }
    ol { margin: 1rem 0; padding-left: 2rem; }
    li { margin: 0.75rem 0; }
    .tip { background: #fff3cd; border-left: 4px solid #ffc107; padding: 1rem; margin: 1rem 0; }
  </style>
</head>
<body>
  <article>
    <h1>${guide.title}</h1>
    <p style="font-size: 1.1em;">${guide.description}</p>
    
    <div class="meta">
      <div class="meta-item">
        <strong>Time Required</strong><br>
        ${guide.timeRequired}
      </div>
      <div class="meta-item">
        <strong>Difficulty</strong><br>
        <span class="badge">${guide.difficulty}</span>
      </div>
      <div class="meta-item">
        <strong>Audience</strong><br>
        ${guide.audience}
      </div>
    </div>
    
    <section class="section">
      <h2>Prerequisites</h2>
      <ul>`;
  guide.prerequisites.forEach(prereq => {
    html += `\n        <li>${prereq}</li>`;
  });
  html += `
      </ul>
    </section>
    
    <section class="section">
      <h2>Steps</h2>
      <ol>`;
  guide.steps.forEach(step => {
    html += `\n        <li>${step}</li>`;
  });
  html += `
      </ol>
    </section>
    
    <section class="section">
      <h2>Tips</h2>`;
  guide.tips.forEach(tip => {
    html += `\n      <div class="tip">💡 ${tip}</div>`;
  });
  html += `
    </section>
`;

  if (guide.relatedContent.length > 0) {
    html += `
    <section class="section">
      <h2>Related Content</h2>
      <ul>`;
    guide.relatedContent.forEach(link => {
      html += `\n        <li><a href="${link}">${link.replace(/^\//, '').replace(/-/g, ' ')}</a></li>`;
    });
    html += `
      </ul>
    </section>`;
  }

  html += `
  </article>
</body>
</html>`;

  return html;
}

async function main() {
  console.log('=== How-To Guide Generation ===\n');
  
  let generated = 0;
  
  for (const guide of guides) {
    const dir = path.join(outputDir, guide.slug);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const html = generateHowToGuide(guide);
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    
    console.log(`Generated: ${guide.title}`);
    console.log(`  → ${guide.slug}/index.html`);
    generated++;
  }
  
  console.log(`\n=== Complete ===`);
  console.log(`Generated ${generated} how-to guides`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
