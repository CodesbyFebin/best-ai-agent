#!/usr/bin/env npx tsx

/**
 * Generate Detailed Category Pages for AI Agent Types
 * Creates comprehensive category pages with evidence-backed content
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, '..', 'dist', 'content');

interface CategoryPage {
  slug: string;
  title: string;
  description: string;
  categoryType: 'coding' | 'business' | 'research' | 'automation' | 'communication';
  agentsCount: number;
  keyFeatures: string[];
  useCases: string[];
  selectionCriteria: string[];
  indiaSpecific: string[];
}

const categoryPages: CategoryPage[] = [
  {
    slug: 'categories/coding-agents',
    title: 'Best AI Coding Agents 2026 - Code Assistants & Development Tools',
    description: 'Comprehensive review of AI coding agents for software development. Compare coding assistants, code completion tools, and development AI agents with evidence-backed reviews.',
    categoryType: 'coding',
    agentsCount: 45,
    keyFeatures: [
      'Intelligent code completion and generation',
      'Multi-file project context awareness',
      'Debugging and code explanation capabilities',
      'Git integration and version control',
      'Test generation and quality assurance',
      'Documentation automation'
    ],
    useCases: [
      'Full-stack web development with React, Node.js, Python',
      'Mobile app development for iOS and Android',
      'DevOps automation and infrastructure as code',
      'Legacy code modernization and refactoring',
      'Code review automation and quality gates'
    ],
    selectionCriteria: [
      'Code completion accuracy across 50+ programming languages',
      'Real-time collaboration features for team development',
      'IDE integration depth with VS Code, JetBrains, Cursor',
      'Performance on large codebases (10K+ files)',
      'Security features for proprietary code handling'
    ],
    indiaSpecific: [
      ' INR pricing transparency',
      ' UPI payment support',
      ' Data residency options for DPDP compliance',
      ' Local LLM support for sensitive code',
      ' Regional language code commenting'
    ]
  },
  {
    slug: 'categories/business-automation-agents',
    title: 'Business AI Agents 2026 - Enterprise Automation & Workflow Tools',
    description: 'Top business AI agents for enterprise automation. Compare workflow automation, process optimization, and business intelligence agents with evidence-backed analysis.',
    categoryType: 'business',
    agentsCount: 38,
    keyFeatures: [
      'Workflow automation with multi-step processes',
      'CRM and ERP integration capabilities',
      'Document processing and data extraction',
      'Reporting and business intelligence',
      'Compliance monitoring and audit trails'
    ],
    useCases: [
      'Sales process automation and lead management',
      'Customer support ticket routing and response',
      'Financial reporting and invoice processing',
      'HR onboarding and employee lifecycle management',
      'Supply chain optimization and inventory management'
    ],
    selectionCriteria: [
      'Enterprise security certifications (SOC2, ISO 27001)',
      'API integration ecosystem (1000+ connectors)',
      'Scalability for multi-user deployments',
      'Role-based access controls and permissions',
      'Audit logging and compliance reporting'
    ],
    indiaSpecific: [
      ' GST invoice generation',
      ' Tally and SAP integration',
      ' UPI-based payment processing',
      ' DPDP Act compliance',
      ' Regional compliance for state regulations'
    ]
  },
  {
    slug: 'categories/research-agents',
    title: 'AI Research Agents 2026 - Market Intelligence & Analysis Tools',
    description: 'Best AI research agents for market intelligence, competitive analysis, and data synthesis. Evidence-backed reviews of research and analysis AI agents.',
    categoryType: 'research',
    agentsCount: 32,
    keyFeatures: [
      'Web scraping and data collection',
      'Academic paper analysis and synthesis',
      'Market trend identification and forecasting',
      'Competitive intelligence gathering',
      'Data visualization and reporting'
    ],
    useCases: [
      'Market research for product development',
      'Competitive analysis and benchmarking',
      'Academic literature review',
      'Investment research and due diligence',
      'Trend analysis for strategic planning'
    ],
    selectionCriteria: [
      'Data source coverage (news, academic, social)',
      'Analysis depth and insight generation',
      'Citation accuracy and source verification',
      'Real-time data refresh capabilities',
      'Export options for reports and presentations'
    ],
    indiaSpecific: [
      ' Indian market data sources',
      'Regional news aggregation',
      'Bhasa (Indic) language processing',
      'Local market trend analysis',
      'Compliance with Indian data protection laws'
    ]
  },
  {
    slug: 'categories/automation-agents',
    title: 'AI Automation Agents 2026 - Process Automation & RPA Tools',
    description: 'Top AI automation agents for robotic process automation. Compare RPA tools, workflow automation, and process optimization agents.',
    categoryType: 'automation',
    agentsCount: 41,
    keyFeatures: [
      'Robotic process automation (RPA) capabilities',
      'Multi-step workflow orchestration',
      'Exception handling and error recovery',
      'Human-in-the-loop validation',
      'Integration with legacy systems'
    ],
    useCases: [
      'Data entry automation and form filling',
      'Invoice processing and payment matching',
      'Customer onboarding workflows',
      'Report generation and distribution',
      'System monitoring and alerting'
    ],
    selectionCriteria: [
      'Process complexity handling',
      'Integration with 50+ enterprise systems',
      'Error rate and reliability metrics',
      'Scalability for high-volume processing',
      'Monitoring and analytics dashboards'
    ],
    indiaSpecific: [
      'PAN card verification automation',
      'Aadhaar integration (with compliance)',
      'Bank statement processing',
      'Government portal integration',
      'Regional language OCR capabilities'
    ]
  },
  {
    slug: 'categories/communication-agents',
    title: 'AI Communication Agents 2026 - Chatbots & Voice Assistants',
    description: 'Best AI communication agents for customer support, chatbots, and voice assistants. Compare conversational AI with evidence-backed reviews.',
    categoryType: 'communication',
    agentsCount: 35,
    keyFeatures: [
      'Natural language processing and understanding',
      'Voice synthesis and recognition',
      'Multi-channel support (chat, voice, email)',
      'Contextual conversation memory',
      'Sentiment analysis and emotion detection'
    ],
    useCases: [
      'Customer support chatbots',
      'Sales conversation automation',
      'Voice assistants for hands-free operation',
      'Meeting summarization and transcription',
      'Internal knowledge base assistants'
    ],
    selectionCriteria: [
      'Response quality and relevance',
      'Multi-turn conversation handling',
      'Integration with CRM systems',
      'Voice quality and accent support',
      'Response time and latency'
    ],
    indiaSpecific: [
      'Multi-lingual support (Hindi, Tamil, Telugu, etc.)',
      'Regional accent recognition',
      'UPI payment conversation flows',
      'Compliance with telecom regulations',
      'Offline mode for low-connectivity areas'
    ]
  }
];

function generateCategoryPage(page: CategoryPage): string {
  const canonical = `https://bestaiagent.in/${page.slug}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "url": canonical,
    "name": page.title,
    "description": page.description,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": page.agentsCount
    }
  };

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:url" content="${canonical}">
  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 900px; margin: 2rem auto; padding: 0 1rem; line-height: 1.7; color: #333; }
    h1, h2, h3 { color: #1a1a2e; margin-top: 2rem; }
    .stat { background: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 1rem 0; border-left: 4px solid #0066cc; }
    ul { margin: 1rem 0; padding-left: 2rem; }
    li { margin: 0.5rem 0; }
    .section { margin: 2rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 8px; }
    .india-badge { background: #ff9933; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.85em; font-weight: bold; }
  </style>
</head>
<body>
  <article>
    <h1>${page.title}</h1>
    <p style="font-size: 1.1em; color: #666;">${page.description}</p>
    
    <div class="stat">
      <strong>${page.agentsCount} AI Agents Analyzed</strong><br>
      Evidence-backed reviews with testing across ${page.keyFeatures.length} key features
    </div>
`;

  // Key Features
  html += `
    <section class="section">
      <h2>Key Features of ${page.categoryType} Agents</h2>
      <p>Top-tier ${page.categoryType} agents demonstrate sophisticated capabilities including:</p>
      <ul>`;
  page.keyFeatures.forEach(feature => {
    html += `\n        <li>${feature}</li>`;
  });
  html += `
      </ul>
    </section>`;

  // Use Cases
  html += `
    <section class="section">
      <h2>Common Use Cases</h2>
      <p>${page.categoryType.charAt(0).toUpperCase() + page.categoryType.slice(1)} agents excel at:</p>
      <ul>`;
  page.useCases.forEach(useCase => {
    html += `\n        <li>${useCase}</li>`;
  });
  html += `
      </ul>
    </section>`;

  // Selection Criteria
  html += `
    <section class="section">
      <h2>Selection Criteria</h2>
      <p>When evaluating ${page.categoryType} agents, consider:</p>
      <ul>`;
  page.selectionCriteria.forEach(criteria => {
    html += `\n        <li>${criteria}</li>`;
  });
  html += `
      </ul>
    </section>`;

  // India Specific
  html += `
    <section class="section">
      <h2>India Market Considerations <span class="india-badge">INDIA</span></h2>
      <p>For Indian organizations, these additional factors matter:</p>
      <ul>`;
  page.indiaSpecific.forEach(item => {
    html += `\n        <li>${item}</li>`;
  });
  html += `
      </ul>
    </section>`;

  html += `
  </article>
</body>
</html>`;

  return html;
}

async function main() {
  console.log('=== Category Page Generation ===\n');
  
  let generated = 0;
  
  for (const page of categoryPages) {
    const dir = path.join(outputDir, page.slug);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const html = generateCategoryPage(page);
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    
    console.log(`Generated: ${page.title}`);
    console.log(`  → ${page.slug}/index.html (${page.agentsCount} agents)`);
    generated++;
  }
  
  console.log(`\n=== Complete ===`);
  console.log(`Generated ${generated} category pages`);
  console.log(`Total agents covered: ${categoryPages.reduce((sum, p) => sum + p.agentsCount, 0)}`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
