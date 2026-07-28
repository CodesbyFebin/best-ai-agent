#!/usr/bin/env npx tsx

/**
 * Advanced Content Generator for 100,000+ Pages
 * Implements the knowledge graph architecture with:
 * - Mega footer with 12-16 topical groups
 * - 50-80 pillar pages
 * - Cluster pages for categories
 * - Glossary, tutorials, MCP ecosystem
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mega Footer Structure (from architecture suggestion)
const FOOTER_SECTIONS = [
  {
    title: "Search",
    links: [
      { label: "Search AI Agents", href: "/search/" },
      { label: "Browse Categories", href: "/categories/" },
      { label: "Rankings", href: "/rankings/" },
      { label: "Compare", href: "/compare/" },
      { label: "Pricing", href: "/pricing/" },
      { label: "AI Companies", href: "/companies/" },
      { label: "Open Source", href: "/open-source/" },
      { label: "Enterprise", href: "/enterprise/" },
      { label: "Newest Agents", href: "/newest/" },
      { label: "Trending", href: "/trending/" }
    ]
  },
  {
    title: "Best AI Agents",
    links: [
      { label: "Best AI Agent", href: "/best-ai-agent/" },
      { label: "Best AI Agent for Business", href: "/best-ai-agent-for-business/" },
      { label: "Best AI Agent for Coding", href: "/best-ai-agent-for-coding/" },
      { label: "Best AI Agent for Marketing", href: "/best-ai-agent-for-marketing/" },
      { label: "Best AI Agent for Sales", href: "/best-ai-agent-for-sales/" },
      { label: "Best AI Agent for Research", href: "/best-ai-agent-for-research/" },
      { label: "Best AI Agent for Automation", href: "/best-ai-agent-for-automation/" },
      { label: "Best AI Agent for Productivity", href: "/best-ai-agent-for-productivity/" },
      { label: "Best AI Agent for Writing", href: "/best-ai-agent-for-writing/" },
      { label: "Free AI Agents", href: "/free-ai-agents/" },
      { label: "AI Agent Alternatives", href: "/best-ai-agent-alternatives/" }
    ]
  },
  {
    title: "Business Functions",
    links: [
      { label: "AI Agents for CRM", href: "/agents/crm/" },
      { label: "AI Agents for Sales", href: "/agents/sales/" },
      { label: "AI Agents for Support", href: "/agents/support/" },
      { label: "AI Agents for Marketing", href: "/agents/marketing/" },
      { label: "AI Agents for HR", href: "/agents/hr/" },
      { label: "AI Agents for Finance", href: "/agents/finance/" },
      { label: "AI Agents for Accounting", href: "/agents/accounting/" },
      { label: "AI Agents for Legal", href: "/agents/legal/" },
      { label: "AI Agents for Compliance", href: "/agents/compliance/" },
      { label: "AI Agents for Procurement", href: "/agents/procurement/" },
      { label: "AI Agents for Operations", href: "/agents/operations/" },
      { label: "AI Agents for Analytics", href: "/agents/analytics/" }
    ]
  },
  {
    title: "Coding Agents",
    links: [
      { label: "AI Coding Agents", href: "/coding-agents/" },
      { label: "AI Code Review", href: "/code-review/" },
      { label: "AI Debugging", href: "/debugging/" },
      { label: "AI Refactoring", href: "/refactoring/" },
      { label: "AI Documentation", href: "/documentation/" },
      { label: "AI Test Generation", href: "/test-generation/" },
      { label: "AI Pair Programming", href: "/pair-programming/" },
      { label: "AI CLI Agents", href: "/cli-agents/" },
      { label: "AI Terminal Agents", href: "/terminal-agents/" },
      { label: "VS Code AI", href: "/vs-code-ai/" },
      { label: "Cursor AI", href: "/cursor-ai/" },
      { label: "Windsurf AI", href: "/windsurf-ai/" }
    ]
  },
  {
    title: "AI Builders",
    links: [
      { label: "AI Agent Builder", href: "/agent-builder/" },
      { label: "AI Agent Creator", href: "/agent-creator/" },
      { label: "AI Agent Maker", href: "/agent-maker/" },
      { label: "No-Code AI Agents", href: "/no-code-agents/" },
      { label: "Low-Code AI Builders", href: "/low-code-builders/" },
      { label: "AI Workflow Builders", href: "/workflow-builders/" },
      { label: "Visual AI Builders", href: "/visual-builders/" },
      { label: "AI Agent Platforms", href: "/agent-platforms/" },
      { label: "Agent Deployment Platforms", href: "/deployment-platforms/" }
    ]
  },
  {
    title: "Frameworks",
    links: [
      { label: "AI Agent Frameworks", href: "/frameworks/" },
      { label: "LangGraph", href: "/langgraph/" },
      { label: "CrewAI", href: "/crewai/" },
      { label: "AutoGen", href: "/autogen/" },
      { label: "Mastra", href: "/mastra/" },
      { label: "OpenAI Agents SDK", href: "/openai-agents/" },
      { label: "Semantic Kernel", href: "/semantic-kernel/" },
      { label: "Agent SDKs", href: "/sdks/" },
      { label: "Agent Libraries", href: "/libraries/" }
    ]
  },
  {
    title: "MCP Ecosystem",
    links: [
      { label: "What is MCP?", href: "/mcp/" },
      { label: "MCP Directory", href: "/mcp-directory/" },
      { label: "Best MCP Servers", href: "/mcp-servers/" },
      { label: "MCP Tutorials", href: "/mcp-tutorials/" },
      { label: "MCP Security", href: "/mcp-security/" },
      { label: "MCP Hosting", href: "/mcp-hosting/" },
      { label: "MCP Tools", href: "/mcp-tools/" },
      { label: "MCP Servers", href: "/mcp-servers/" },
      { label: "MCP Clients", href: "/mcp-clients/" },
      { label: "MCP SDKs", href: "/mcp-sdks/" }
    ]
  },
  {
    title: "Enterprise",
    links: [
      { label: "Enterprise AI Agents", href: "/enterprise-agents/" },
      { label: "Private AI", href: "/private-ai/" },
      { label: "On-Prem AI", href: "/on-prem-ai/" },
      { label: "SSO", href: "/sso/" },
      { label: "RBAC", href: "/rbac/" },
      { label: "Audit Logs", href: "/audit-logs/" },
      { label: "Compliance", href: "/compliance/" },
      { label: "SOC 2", href: "/soc2/" },
      { label: "ISO 27001", href: "/iso-27001/" },
      { label: "GDPR", href: "/gdpr/" },
      { label: "DPDP", href: "/dpdp/" },
      { label: "Security Reviews", href: "/security-reviews/" }
    ]
  },
  {
    title: "Research",
    links: [
      { label: "AI Agent Research", href: "/research/" },
      { label: "AI Agent News", href: "/news/" },
      { label: "AI Trends", href: "/trends/" },
      { label: "Benchmarks", href: "/benchmarks/" },
      { label: "GAIA Benchmarks", href: "/gaia/" },
      { label: "Leaderboards", href: "/leaderboards/" },
      { label: "AI Releases", href: "/releases/" },
      { label: "Market Reports", href: "/market-reports/" },
      { label: "Industry Reports", href: "/industry-reports/" }
    ]
  },
  {
    title: "Learn",
    links: [
      { label: "Tutorials", href: "/tutorials/" },
      { label: "Glossary", href: "/glossary/" },
      { label: "How AI Agents Work", href: "/how-it-works/" },
      { label: "How to Build AI Agents", href: "/build-agents/" },
      { label: "Prompt Engineering", href: "/prompt-engineering/" },
      { label: "MCP Tutorials", href: "/mcp-tutorials/" },
      { label: "Examples", href: "/examples/" },
      { label: "Videos", href: "/videos/" },
      { label: "Courses", href: "/courses/" }
    ]
  },
  {
    title: "Trust",
    links: [
      { label: "Methodology", href: "/methodology/" },
      { label: "Editorial Policy", href: "/editorial-policy/" },
      { label: "Scoring", href: "/scoring/" },
      { label: "Review Process", href: "/review-process/" },
      { label: "Evidence Policy", href: "/evidence-policy/" },
      { label: "Correction Policy", href: "/correction-policy/" },
      { label: "Affiliate Policy", href: "/affiliate-policy/" },
      { label: "Authors", href: "/authors/" },
      { label: "Contact", href: "/contact/" },
      { label: "About", href: "/about/" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "RSS", href: "/rss.xml" },
      { label: "HTML Sitemap", href: "/sitemap/" },
      { label: "XML Sitemap", href: "/sitemap.xml" },
      { label: "llms.txt", href: "/llms.txt" },
      { label: "robots.txt", href: "/robots.txt" },
      { label: "API", href: "/api/" },
      { label: "Developer Docs", href: "/docs/" }
    ]
  }
];

// Pillar Pages (50-80 authority hubs)
const PILLAR_PAGES = [
  "Best AI Agents",
  "Best AI Coding Agents",
  "Best AI Business Agents",
  "Best AI Marketing Agents",
  "Best AI Sales Agents",
  "Best AI Research Agents",
  "Best AI Voice Agents",
  "Best AI Automation Agents",
  "Best AI Customer Support Agents",
  "Best AI Productivity Agents",
  "Best AI Writing Agents",
  "Best AI Developer Agents",
  "AI Agent Frameworks",
  "AI Agent Builders",
  "AI Agent Tools",
  "MCP Servers",
  "AI Architectures",
  "AI Security",
  "AI Compliance",
  "AI Enterprise Solutions"
];

// Extension topics for additional pillars
const EXTENSION_TOPICS = [
  // Coding clusters
  "Code Review Agents",
  "Debugging Agents",
  "Refactoring Agents",
  "Documentation Agents",
  "Test Generation Agents",
  "Pair Programming Agents",
  "CLI Agents",
  "Terminal Agents",
  "VS Code Extensions",
  
  // Business clusters
  "CRM Agents",
  "Sales Agents",
  "Support Agents",
  "HR Agents",
  "Finance Agents",
  "Accounting Agents",
  "Legal Agents",
  "Compliance Agents",
  "Procurement Agents",
  "Analytics Agents",
  
  // MCP cluster
  "MCP Basics",
  "MCP Security",
  "MCP Registry",
  "MCP Hosting",
  "MCP Marketplace",
  "MCP Tools",
  "MCP Clients",
  "MCP SDKs",
  
  // Tutorial topics
  "Beginner Tutorials",
  "Advanced Tutorials",
  "Use Case Tutorials",
  "Integration Tutorials"
];

interface Manifest {
  id: string;
  slug: string;
  canonicalUrl: string;
  entityId: string;
  entityType: string;
  contentType: string;
  status: string;
  language: string;
  metadata: any;
}

function generatePillarContent(pillar: string, index: number): Manifest {
  const slug = (pillar + '-' + index).toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return {
    id: 'manifest:pillar:' + slug,
    slug: slug,
    canonicalUrl: 'https://bestaiagent.in/pillars/' + slug + '/',
    entityId: 'pillar/' + slug,
    entityType: 'pillar',
    contentType: 'article',
    status: 'published',
    language: 'en-US',
    metadata: {
      title: pillar + ' - Comprehensive Guide',
      description: 'Complete guide to ' + pillar + ' for AI professionals.',
      keywords: [slug, 'ai', 'agent', pillar.toLowerCase()],
      minWordCount: 4000,
      blueprintId: 'pillar-v1'
    }
  };
}

function generateClusterContent(cluster: string, index: number): Manifest {
  const slug = (cluster.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + index);
  return {
    id: 'manifest:cluster:' + slug,
    slug: slug,
    canonicalUrl: 'https://bestaiagent.in/clusters/' + slug + '/',
    entityId: 'cluster/' + slug,
    entityType: 'cluster',
    contentType: 'article',
    status: 'published',
    language: 'en-US',
    metadata: {
      title: cluster + ' - Detailed Analysis',
      description: 'Detailed analysis of ' + cluster + ' in the AI agent ecosystem.',
      keywords: [slug, 'ai', cluster.toLowerCase()],
      minWordCount: 2500,
      blueprintId: 'cluster-v1'
    }
  };
}

function generateLearningContent(topic: string, type: string, index: number): Manifest {
  const slug = (topic.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + index);
  return {
    id: 'manifest:' + type + ':' + slug,
    slug: slug,
    canonicalUrl: 'https://bestaiagent.in/' + type + '/' + slug + '/',
    entityId: type + '/' + slug,
    entityType: type,
    contentType: type === 'tutorial' ? 'tutorial' : 'article',
    status: 'published',
    language: 'en-US',
    metadata: {
      title: topic + (type === 'tutorial' ? ' - Tutorial' : ' - Definition'),
      description: type === 'tutorial' ? 'Tutorial for ' + topic : 'Definition of ' + topic,
      keywords: [slug, 'ai', 'agent', topic.toLowerCase()],
      minWordCount: type === 'tutorial' ? 1500 : 1000,
      blueprintId: type === 'tutorial' ? 'tutorial-v1' : 'glossary-v1'
    }
  };
}

async function main() {
  console.log('=== Advanced Content Generation for 100K+ Pages ===\n');

  const startTime = Date.now();
  const allManifests: Manifest[] = [];
  let globalIndex = 0;

  // 1. Pillar pages (80 pages)
  console.log('Generating pillar pages...');
  PILLAR_PAGES.forEach((pillar, i) => {
    allManifests.push(generatePillarContent(pillar, globalIndex++));
  });
  for (let i = 0; i < 50; i++) {
    allManifests.push(generatePillarContent('Advanced ' + (i % 50) + ' Topic', globalIndex++));
  }

  // 2. Cluster pages (500 pages)
  console.log('Generating cluster pages...');
  [...PILLAR_PAGES, ...EXTENSION_TOPICS].forEach((topic, i) => {
    allManifests.push(generateClusterContent(topic, globalIndex++));
  });
  for (let i = 0; i < 500; i++) {
    allManifests.push(generateClusterContent('Cluster ' + (i + 1), globalIndex++));
  }

  // 3. Tutorial pages (5,000 pages)
  console.log('Generating tutorial pages...');
  const tutorialTopics = [
    'Getting Started',
    'Advanced Usage',
    'API Integration',
    'MCP Setup',
    'Agent Building',
    'Prompt Engineering',
    'Tool Integration',
    'Workflow Automation',
    'Enterprise Deployment',
    'Best Practices'
  ];
  
  for (let i = 0; i < 5000; i++) {
    const theme = tutorialTopics[i % tutorialTopics.length];
    allManifests.push(generateLearningContent(theme + ' ' + Math.floor(i / 10), 'tutorial', globalIndex++));
  }

  // 4. Glossary pages (500 pages)
  console.log('Generating glossary pages...');
  for (let i = 0; i < 500; i++) {
    allManifests.push(generateLearningContent('AI Agent Term ' + (i + 1), 'glossary', globalIndex++));
  }

  // 5. MCP ecosystem pages (500 pages)
  console.log('Generating MCP pages...');
  const mcpTopics = [
    'MCP Protocol',
    'MCP Servers',
    'MCP Clients',
    'MCP Security',
    'MCP Architecture',
    'MCP Best Practices',
    'MCP Registry',
    'MCP Hosting'
  ];
  
  for (let i = 0; i < 500; i++) {
    const topic = mcpTopics[i % mcpTopics.length];
    allManifests.push(generateLearningContent(topic + ' Guide', 'mcp', globalIndex++));
  }

  // 6. Original agent profiles with variations (15,000 pages)
  console.log('Generating agent profiles...');
  const graphData = JSON.parse(fs.readFileSync('./graph-data.json', 'utf-8'));
  const agents = graphData.nodes.filter((n: any) => n.type === 'agent');
  const variations = ['comparison', 'use-case', 'pricing', 'feature', 'review', 'tutorial', 'architecture', 'security', 'enterprise', 'startup'];
  
  for (const agent of agents) {
    const slug = (agent.id as string).split('/')[1];
    const name = agent.data?.name || slug;
    
    for (let i = 0; i < 220; i++) {
      const varType = variations[i % variations.length];
      allManifests.push({
        id: 'manifest:page:agent:' + slug + '-v' + i,
        slug: slug + '-var' + i + '-' + varType,
        canonicalUrl: 'https://bestaiagent.in/agents/' + slug + '/' + varType + '/' + i + '/',
        entityId: 'agent/' + slug,
        entityType: 'agent',
        contentType: 'article',
        status: 'published',
        language: 'en-US',
        metadata: {
          title: name + ' - ' + varType,
          description: 'Generated content for ' + name + ' focusing on ' + varType + '.',
          keywords: [slug, varType, 'ai', 'agent'],
          minWordCount: 2000,
          variationType: varType,
          contentAngle: varType
        }
      });
    }
  }

  // Write manifests
  const outputPath = path.join(__dirname, '..', 'manifest-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(allManifests, null, 2));

  const duration = (Date.now() - startTime) / 1000;
  console.log('\n=== Generation Complete ===');
  console.log('Total Manifests: ' + allManifests.length);
  console.log('Time: ' + duration.toFixed(1) + ' seconds');
  console.log('Rate: ' + Math.round(allManifests.length / duration) + ' manifests/second');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});