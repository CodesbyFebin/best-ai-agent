#!/usr/bin/env npx tsx

/**
 * Generate Content for All Manifests (100K+ Pages)
 * Enhanced with variation support and proper SEO
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Footer Navigation Links (from src/data/footer-navigation.ts)
const FOOTER_SECTIONS = [
  {
    title: "Best AI Agents",
    href: "/best-ai-agent/",
    links: [
      { label: "Best AI Agent", href: "/best-ai-agent/", description: "Top AI agents directory" },
      { label: "Best AI Agent for Business", href: "/best-ai-agent-for-business/", description: "Business-focused agents" },
      { label: "Best AI Agent for Coding", href: "/best-ai-agent-for-coding/", description: "Coding assistants" },
      { label: "Best AI Agent Alternatives", href: "/best-ai-agent-alternatives/", description: "Alternative tools" },
      { label: "Best AI Agents for Automation", href: "/best-ai-agents-for-automation/", description: "Automation tools" },
    ],
  },
  {
    title: "Agent Builders",
    links: [
      { label: "AI Agent Builder", href: "/best-ai-agent-builder/", description: "Build custom AI agents" },
      { label: "AI Agent Creator", href: "/best-ai-agent-creator/", description: "Create agents quickly" },
      { label: "AI Agent Maker", href: "/best-ai-agent-maker/", description: "Make agents visually" },
      { label: "AI Agent App Builder", href: "/best-ai-agent-app-builder/", description: "App-building agents" },
      { label: "AI Agent Platforms", href: "/best-ai-agent-platform/", description: "All-in-one platforms" },
      { label: "Agent Orchestration Tools", href: "/best-ai-agent-orchestration-tools/", description: "Multi-agent orchestration" },
    ],
  },
  {
    title: "Coding Agents",
    links: [
      { label: "AI Agents for Code Review", href: "/best-ai-agent-for-code-review/", description: "Code review assistants" },
      { label: "AI Agents for Frontend Development", href: "/best-ai-agent-for-frontend-development/", description: "Frontend coding" },
      { label: "AI Agents for Backend Development", href: "/best-ai-agent-for-backend-development/", description: "Backend development" },
      { label: "AI Agents for VS Code", href: "/best-ai-agent-for-vs-code/", description: "VS Code extensions" },
      { label: "AI Agent Extensions for VS Code", href: "/best-ai-agent-extension-for-vs-code/", description: "VS Code marketplace" },
      { label: "AI Agents for IDEs", href: "/best-ai-agent-for-ides/", description: "All IDE tools" },
      { label: "AI Agents for Terminal", href: "/best-ai-agent-for-terminal/", description: "CLI and terminal" },
      { label: "AI Coding Frameworks", href: "/best-ai-agent-frameworks/", description: "Development frameworks" },
    ],
  },
  {
    title: "Frameworks",
    links: [
      { label: "AI Agent Frameworks", href: "/best-ai-agent-frameworks/", description: "Multi-agent frameworks" },
      { label: "AI Agent SDKs", href: "/best-ai-agent-sdks/", description: "SDKs and libraries" },
      { label: "Open-Source Agent Tools", href: "/best-open-source-ai-agent-tools/", description: "Open source solutions" },
      { label: "AI Agent Libraries", href: "/best-ai-agent-libraries/", description: "Code libraries" },
      { label: "AI Agent Prompt Tools", href: "/best-ai-agent-prompt-tools/", description: "Prompt engineering" },
      { label: "AI Agent Development Tools", href: "/best-ai-agent-development-tools/", description: "Developer tools" },
    ],
  },
  {
    title: "Agents by Organization",
    links: [
      { label: "AI Agents for Business", href: "/ai-agents-for-business/", description: "Corporate agents" },
      { label: "AI Agents for Enterprises", href: "/ai-agents-for-enterprises/", description: "Enterprise solutions" },
      { label: "AI Agents for SMEs", href: "/ai-agents-for-smes/", description: "Small business agents" },
    ],
  },
  {
    title: "Workflow Automation Agents",
    links: [
      { label: "Workflow Automation Agents", href: "/ai-agents-for-workflow-automation/", description: "Process automation" },
      { label: "Support Automation Agents", href: "/ai-agents-for-support-automation/", description: "Customer support bots" },
    ],
  },
  {
    title: "Agents by Industry",
    links: [
      { label: "AI Agents for Finance", href: "/ai-agents-for-finance/", description: "Financial services" },
      { label: "AI Agents for Security", href: "/ai-agents-for-security/", description: "Security tools" },
      { label: "AI Agents for Healthcare", href: "/ai-agents-for-healthcare/", description: "Medical AI" },
      { label: "AI Agents for HR", href: "/ai-agents-for-hr/", description: "Human resources" },
      { label: "AI Agents for Procurement", href: "/ai-agents-for-procurement/", description: "Procurement tools" },
    ],
  },
  {
    title: "Research & Intelligence",
    links: [
      { label: "AI Agent Research", href: "/ai-agent-research/", description: "Research reports" },
      { label: "AI Agent News", href: "/ai-agent-news/", description: "Latest updates" },
      { label: "AI Agent Trends", href: "/ai-agent-trends/", description: "Market trends" },
      { label: "AI Agent Benchmarks", href: "/ai-agent-benchmarks/", description: "Benchmark scores" },
      { label: "AI Agent Roadmap", href: "/ai-agent-roadmap/", description: "Future plans" },
      { label: "AI Agent Cases and Examples", href: "/ai-agent-cases-and-examples/", description: "Use cases" },
    ],
  },
  {
    title: "MCP Ecosystem",
    href: "/mcp-directory/",
    links: [
      { label: "What Is MCP?", href: "/what-is-mcp/", description: "MCP protocol explained" },
      { label: "Best MCP Servers", href: "/best-mcp-servers/", description: "Server directory" },
      { label: "MCP Directory", href: "/mcp-directory/", description: "Full MCP directory" },
      { label: "Database MCP Servers", href: "/mcp-servers/databases/", description: "Database integrations" },
      { label: "File System MCP Servers", href: "/mcp-servers/files/", description: "File integrations" },
    ],
  },
  {
    title: "Company & Feeds",
    links: [
      { label: "About Us", href: "/about/", description: "Company info" },
      { label: "Contact", href: "/contact/", description: "Get in touch" },
      { label: "Privacy Policy", href: "/privacy-policy/", description: "Privacy terms" },
      { label: "Terms of Service", href: "/terms/", description: "Terms of use" },
      { label: "Editorial Policy", href: "/editorial-policy/", description: "Editorial standards" },
      { label: "Methodology", href: "/methodology/", description: "How we test" },
      { label: "Blog", href: "/blog/", description: "Latest articles" },
      { label: "Newsletter", href: "/newsletter/", description: "Weekly updates" },
    ],
  }
];

// Generate footer HTML from navigation data
function generateFooterHtml(): string {
  let footer = '<footer style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #eee; font-size: 0.9em; color: #666;">\n';
  footer += '  <div style="max-width: 900px; margin: 0 auto; padding: 1rem;">\n';
  footer += '    <p style="font-size: 1.2em; font-weight: bold; margin-bottom: 1rem;">BestAIAgent.in</p>\n';
  footer += '    <p style="color: #666; font-size: 0.9em;">Independent AI agent evaluations, benchmarks and implementation guides for India.</p>\n';
  footer += '    <div style="margin-top: 1.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">\n';
  
  for (const section of FOOTER_SECTIONS) {
    footer += '      <div>\n';
    footer += '        <p style="font-weight: bold; margin-bottom: 0.5rem;">' + section.title + '</p>\n';
    for (const link of section.links.slice(0, 5)) {
      footer += '        <p style="margin: 0.25rem 0;"><a href="' + link.href + '" style="color: #1a1a2e; text-decoration: none;">' + link.label + '</a></p>\n';
    }
    footer += '      </div>\n';
  }
  
  footer += '    </div>\n';
  footer += '  </div>\n';
  footer += '</footer>\n</html>';
  
  return footer;
}

const FOOTER_HTML = generateFooterHtml();

interface Manifest {
  id: string;
  slug: string;
  entityId: string;
  entityType: string;
  language: string;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  metadata: any;
  [key: string]: any;
}

function generateVariationContent(
  entity: any | null,
  manifest: Manifest,
  variationType: string
): string {
  const data = entity?.data || {};
  const name = data.name || 'AI Agent';
  
  const variations: Record<string, { title: string; keywords: string[] }[]> = {
    COMPARISONS: [
      { title: 'Head-to-Head Comparison Analysis', keywords: ['comparison', 'analysis', 'vs', 'versus'] },
      { title: 'Feature-by-Feature Comparison', keywords: ['features', 'comparison', 'details'] },
      { title: 'Pricing Comparison Deep Dive', keywords: ['pricing', 'comparison', 'cost'] },
      { title: 'Performance Benchmark Comparison', keywords: ['benchmark', 'performance', 'speed'] },
      { title: 'Use Case Comparison', keywords: ['use case', 'application', 'scenario'] }
    ],
    USE_CASES: [
      { title: 'Customer Support Use Case', keywords: ['customer', 'support', 'helpdesk'] },
      { title: 'Code Generation Use Case', keywords: ['coding', 'development', 'programming'] },
      { title: 'Research Assistant Use Case', keywords: ['research', 'analysis', 'study'] },
      { title: 'Content Creation Use Case', keywords: ['content', 'writing', 'creative'] },
      { title: 'Data Analysis Use Case', keywords: ['data', 'analysis', 'statistics'] }
    ],
    GEOGRAPHIC: [
      { title: 'Global Market Analysis', keywords: ['global', 'market', 'international'] },
      { title: 'United States Focus', keywords: ['US', 'united states', 'american'] },
      { title: 'European Union Analysis', keywords: ['EU', 'european union', 'germany'] },
      { title: 'India Market Study', keywords: ['India', 'Indian', 'Asia'] },
      { title: 'Asia Pacific Review', keywords: ['Asia Pacific', 'APAC', 'regional'] }
    ],
    TIME_PERIODS: [
      { title: 'Current State Analysis', keywords: ['current', 'now', 'today'] },
      { title: 'Q3 2026 Projections', keywords: ['Q3', '2026', 'projections', 'future'] },
      { title: '2027 Outlook', keywords: ['2027', 'outlook', 'future', 'trends'] },
      { title: 'Historical 2024 Review', keywords: ['2024', 'historical', 'review', 'past'] },
      { title: 'Recent Updates Analysis', keywords: ['recent', 'updates', 'latest', 'new'] }
    ],
    CONTENT_TYPES: [
      { title: 'Detailed Review', keywords: ['review', 'evalutation', 'assessment'] },
      { title: 'Comprehensive Tutorial', keywords: ['tutorial', 'guide', 'how-to'] },
      { title: 'Technical Analysis', keywords: ['analysis', 'technical', 'deep-dive'] },
      { title: 'Interview Feature', keywords: ['interview', 'conversation', 'expert'] },
      { title: 'Case Study', keywords: ['case-study', 'example', 'implementation'] }
    ]
  };

  // Normalize variationType to uppercase key format
  const normalizedVariationType = variationType.toUpperCase() + 'S';
  const variationSet = variations[normalizedVariationType as keyof typeof variations];
  const variationIndex = (parseInt(manifest.slug.split('-').pop()) || 0) % (variationSet?.length || 1);
  const variation = variationSet?.[variationIndex] || { title: variationType, keywords: [] };

  let html = '<article class="deep-content">\n';
  html += '  <h1>' + (manifest.title || name) + '</h1>\n';
  
  // Generate content based on variation type with multiple sections
  if (variationType === 'comparison' || normalizedVariationType === 'COMPARISONS') {
    html += '  <section>\n';
    html += '    <h2>Executive Summary</h2>\n';
    html += '    <p>This comprehensive analysis examines ' + name + ' through the lens of comparative evaluation.</p>\n';
    html += '    <p>Focusing on key metrics, capabilities, and competitive positioning, this page provides actionable insights for decision-makers evaluating AI agent solutions.</p>\n';
    html += '  </section>\n';
    
    html += '  <section>\n';
    html += '    <h2>Comparison Overview</h2>\n';
    html += '    <p>Detailed comparison analysis for ' + name + ' against industry benchmarks and key competitors.</p>\n';
    html += '    <p>This analysis considers performance metrics, pricing models, feature sets, and real-world applicability.</p>\n';
    html += '  </section>\n';
    
    html += '  <section>\n';
    html += '    <h2>Key Evaluation Metrics</h2>\n';
    html += '    <p>Assessment based on core capabilities including reasoning depth, tool integration, response quality, and workflow optimization.</p>\n';
    html += '  </section>\n';
    
    html += '  <section>\n';
    html += '    <h2>Technical Specifications</h2>\n';
    html += '    <p>Technical analysis of architecture, model versions, latency profiles, and integration capabilities.</p>\n';
    html += '  </section>\n';
    
  } else if (variationType === 'use-case' || normalizedVariationType === 'USE_CASES') {
    html += '  <section>\n';
    html += '    <h2>Introduction</h2>\n';
    html += '    <p>' + name + ' excels in ' + variation.title.toLowerCase() + ' scenarios.</p>\n';
    html += '    <p>This detailed use case analysis explores specific applications, implementation strategies, and expected outcomes.</p>\n';
    html += '  </section>\n';
    
    html += '  <section>\n';
    html += '    <h2>Application Scenarios</h2>\n';
    html += '    <p>Real-world examples demonstrate practical applications of ' + name + ' in business contexts.</p>\n';
    html += '  </section>\n';
    
    html += '  <section>\n';
    html += '    <h2>Implementation Guide</h2>\n';
    html += '    <p>Step-by-step guidance for integrating ' + name + ' into existing workflows.</p>\n';
    html += '  </section>\n';
    
  } else if (variationType === 'geographic' || normalizedVariationType === 'GEOGRAPHIC') {
    html += '  <section>\n';
    html += '    <h2>Global Market Analysis</h2>\n';
    html += '    <p>' + name + ' performance and adoption patterns across different geographic markets.</p>\n';
    html += '    <p>Cultural, regulatory, and infrastructure considerations impact deployment strategies in various regions.</p>\n';
    html += '  </section>\n';
    
    html += '  <section>\n';
    html += '    <h2>Regional Comparisons</h2>\n';
    html += '    <p>Market-specific analysis for key regions including North America, Europe, Asia Pacific, and emerging markets.</p>\n';
    html += '  </section>\n';
    
  } else if (variationType === 'time-period' || normalizedVariationType === 'TIME_PERIODS') {
    html += '  <section>\n';
    html += '    <h2>' + variation.title + '</h2>\n';
    html += '    <p>' + name + ' evolution and trends over time.</p>\n';
    html += '    <p>Analysis of feature rollouts, performance improvements, and market changes over recent periods.</p>\n';
    html += '  </section>\n';
    
    html += '  <section>\n';
    html += '    <h2>Performance Trajectory</h2>\n';
    html += '    <p>Historical performance data and projected trends for ' + name + '.</p>\n';
    html += '  </section>\n';
    
  } else if (variationType === 'architecture' || normalizedVariationType === 'CONTENT_TYPES') {
    html += '  <section>\n';
    html += '    <h2>Architecture Overview</h2>\n';
    html += '    <p>' + name + ' employs a sophisticated architecture designed for scalability and flexibility.</p>\n';
    html += '    <p>Understanding the underlying architecture is critical for deployment decisions.</p>\n';
    html += '  </section>\n';
    
    html += '  <section>\n';
    html += '    <h2>Component Breakdown</h2>\n';
    html += '    <p>Detailed analysis of key components, integrations, and extensibility options.</p>\n';
    html += '  </section>\n';
    
    html += '  <section>\n';
    html += '    <h2>Deployment Considerations</h2>\n';
    html += '    <p>Best practices and recommendations for production deployment of ' + name + '.</p>\n';
    html += '  </section>\n';
    
  } else {
    html += '  <section>\n';
    html += '    <h2>Introduction</h2>\n';
    html += '    <p>Generated content for ' + name + ' focusing on ' + variationType.toLowerCase() + ' with relevant analysis.</p>\n';
    html += '  </section>\n';
    
    html += '  <section>\n';
    html += '    <h2>Detailed Analysis</h2>\n';
    html += '    <p>Comprehensive evaluation of ' + name + ' capabilities and characteristics.</p>\n';
    html += '  </section>\n';
    
    html += '  <section>\n';
    html += '    <h2>Key Considerations</h2>\n';
    html += '    <p>Important factors to consider when evaluating or deploying ' + name + '.</p>\n';
    html += '  </section>\n';
  }
  
  html += '</article>\n';
  
  return html;
}

function generateContent(manifest: Manifest, entity: any | null): string {
  const metadata = manifest.metadata || {};
  const title = metadata.title || manifest.id;
  const description = metadata.description || 'Generated content for AI agent.';
  const canonical = manifest.canonicalUrl || ('https://bestaiagent.in/' + manifest.slug + '/');
  
  // Use variation content generator if variation type is present
  let content = '';
  let wordCount = 0;
  
  const hasVariationType = !!metadata.variationType;
  
  if (hasVariationType && manifest.entityType === 'agent') {
    content = generateVariationContent(entity, manifest, metadata.variationType);
    wordCount = content.split(/\s+/).length;
  } else if (manifest.entityType === 'agent' && metadata.minWordCount) {
    // Generate content for regular agents without variation
    const entityName = entity?.data?.name || manifest.slug;
    content = '<article class="deep-content">\n';
    content += '  <h1>' + title + '</h1>\n';
    content += '  <section>\n';
    content += '    <h2>Overview</h2>\n';
    content += '    <p>' + entityName + ' is a leading AI agent with comprehensive capabilities.</p>\n';
    content += '    <p>This detailed analysis covers features, performance, and use cases.</p>\n';
    content += '  </section>\n';
    content += '</article>';
    wordCount = content.split(/\s+/).length;
  } else {
    // Default content for other entity types
    // Try to get entity name from various sources - priority: title > entity data > entityId > slug
    let entityName = '';
    
    // First try to extract from title (for non-entity pages like pillars, clusters, tutorials)
    if (metadata.title) {
      entityName = metadata.title.split(' - ')[0];
    }
    
    // Then try entity data if available
    if (!entityName && entity?.data?.name) {
      entityName = entity.data.name as string;
    }
    
    // Then try entityId
    if (!entityName && manifest.entityId) {
      entityName = manifest.entityId.split('/')[1];
    }
    
    // Fallback to slug
    if (!entityName) {
      entityName = manifest.slug || 'AI Agent';
    }
    
    const entityTypeDesc: Record<string, string> = {
      'pillar': 'A comprehensive pillar guide covering key concepts in the AI agent ecosystem.',
      'cluster': 'This cluster page provides detailed analysis of related AI agent topics.',
      'tutorial': 'A step-by-step tutorial for learning about AI agent technologies and practices.',
      'glossary': 'Definition and explanation of AI agent terminology and concepts.',
      'mcp': 'Detailed information about MCP protocols, servers, and implementation.',
      'comparison': 'Side-by-side comparison of AI agents and related technologies.',
      'research': 'Research report analyzing AI agent trends and market developments.',
      'category': 'Category overview of AI agents organized by use case and functionality.',
      'agent': 'Detailed profile and analysis of an AI agent product.',
    };
    
    const entityDesc = entityTypeDesc[manifest.entityType] || 'Comprehensive AI agent analysis.';
    
    content = '<article class="deep-content">\n';
    content += '  <h1>' + title + '</h1>\n';
    content += '  <section>\n';
    content += '    <h2>Introduction</h2>\n';
    content += '    <p>' + entityName + ' - ' + entityDesc + '</p>\n';
    content += '  </section>\n';
    content += '</article>';
    wordCount = content.split(/\s+/).length;
  }

  return `<!DOCTYPE html>
<html lang="${manifest.language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">
${JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": canonical,
  "url": canonical,
  "name": title,
  "description": description,
  "inLanguage": manifest.language,
  "mainEntityOfPage": true,
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bestaiagent.in/" },
      { "@type": "ListItem", "position": 2, "name": manifest.entityType, "item": "https://bestaiagent.in/" + manifest.entityType + "s/" },
      { "@type": "ListItem", "position": 3, "name": title, "item": canonical }
    ]
  },
  "@graph": {
    "@type": "Article",
    "headline": title,
    "wordCount": wordCount,
    "author": { "@type": "Organization", "name": "BestAIAgent.in" }
  }
}, null, 2)}
  </script>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 900px; margin: 2rem auto; padding: 0 1rem; line-height: 1.7; color: #333; }
    h1, h2, h3 { color: #1a1a2e; }
    section { margin: 2rem 0; }
    .deep-content { max-width: 800px; }
  </style>
</head>
<body>
${content}
${FOOTER_HTML}`;
}

async function main() {
  console.log('=== Content Generation for All Manifests ===\n');
  
  const manifestPath = path.join(__dirname, '..', 'manifest-data.json');
  const graphPath = path.join(__dirname, '..', 'graph-data.json');
  
  const manifests: Manifest[] = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  const graphData = JSON.parse(fs.readFileSync(graphPath, 'utf-8'));
  
  // Build entity map
  const entityMap: Record<string, any> = {};
  for (const node of graphData.nodes) {
    if (node.id) entityMap[node.id] = node;
  }
  
  console.log('Loaded', manifests.length, 'manifests');
  
  let generated = 0;
  let errors = 0;
  
  for (let i = 0; i < manifests.length; i++) {
    const manifest = manifests[i];
    
    try {
      const entity = entityMap[manifest.entityId] || null;
      const html = generateContent(manifest, entity);
      
      const outputDir = path.join(__dirname, '..', 'dist', 'content', manifest.slug);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      fs.writeFileSync(path.join(outputDir, 'index.html'), html);
      generated++;
      
      if (generated % 1000 === 0) {
        console.log('  Generated', generated, '/', manifests.length, 'pages...');
      }
    } catch (err) {
      errors++;
    }
  }
  
  console.log('\n=== Complete ===');
  console.log('Generated:', generated, 'pages');
  console.log('Errors:', errors);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});