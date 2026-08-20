#!/usr/bin/env npx tsx

/**
 * Generate Expanded Pillar Pages for Content Expansion
 * Creates comprehensive pillar pages with full SEO optimization
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, '..', 'dist', 'content');

interface PillarContent {
  slug: string;
  title: string;
  description: string;
  sections: Array<{
    title: string;
    content: string;
    links?: Array<{ label: string; href: string }>;
  }>;
}

const pillarPages: PillarContent[] = [
  {
    slug: 'best-ai-agent-builder',
    title: 'Best AI Agent Builder - Build Custom AI Agents Without Code',
    description: 'Complete guide to AI Agent Builders. Compare no-code platforms, visual builders, and custom AI agent creation tools. India pricing, DPDP compliance, and deployment options.',
    sections: [
      {
        title: 'What Is An AI Agent Builder?',
        content: 'AI Agent Builders are platforms that enable developers and non-technical users to create custom AI agents without writing extensive code. These builders provide visual interfaces, workflow designers, and pre-built components that accelerate agent development from months to days. The right builder reduces implementation complexity while maintaining flexibility for customization and integration with existing systems.',
        links: [
          { label: 'AI Agent Builder Platforms', href: '/best-ai-agent-builder/' },
          { label: 'No-Code AI Tools', href: '/best-ai-agent-maker/' },
          { label: 'Agent Creation Guide', href: '/ai-agent-builder-guide/' }
        ]
      },
      {
        title: 'Types of AI Agent Builders',
        content: 'AI Agent Builders fall into several categories based on technical requirements and use cases: No-code builders offer visual workflow design with drag-and-drop interfaces suitable for business users. Low-code platforms provide more flexibility for developers needing custom logic. Visual builders specialize in user interface design and conversation flows. Enterprise builders include advanced security, compliance, and scalability features for organizational deployment.',
        links: [
          { label: 'No-Code Agent Builder', href: '/ai-agent-maker/' },
          { label: 'Visual Agent Builder', href: '/best-ai-agent-app-builder/' },
          { label: 'Enterprise Builder', href: '/best-ai-agent-platform/' }
        ]
      },
      {
        title: 'Key Features to Evaluate',
        content: 'When evaluating AI Agent Builders, consider these critical factors: Integration capabilities with existing tools and APIs; Workflow automation features including multi-step processes; Customization options for branding and user experience; Security features including data encryption and compliance; Scalability for growing user bases; Pricing transparency and India-specific payment options; Support for Indian languages and regional deployment.',
        links: [
          { label: 'Builder Comparison', href: '/best-ai-agent-builder/' },
          { label: 'Security Features', href: '/ai-agent-builder-security/' },
          { label: 'Pricing Guide', href: '/ai-agent-builder-pricing/' }
        ]
      }
    ]
  },
  {
    slug: 'silos',
    title: 'AI Agent Silos - Complete Category Directory',
    description: 'Browse AI agents by category. From coding assistants to business automation, find specialized agents for every use case. Evidence-backed reviews with India market focus.',
    sections: [
      {
        title: 'What Are AI Agent Silos?',
        content: 'AI Agent Silos organize the diverse ecosystem of AI agents into logical categories based on function, industry, and use case. This categorization helps users navigate the complex landscape of AI solutions and find tools specifically optimized for their requirements. Each silo represents a distinct set of capabilities, integrations, and best practices tailored to particular workflows.',
        links: [
          { label: 'All AI Agent Silos', href: '/silos/' },
          { label: 'AI Builders Silo', href: '/silos/builders/' },
          { label: 'Coding Agents Silo', href: '/silos/coding-agents/' }
        ]
      },
      {
        title: 'Major Silo Categories',
        content: 'The AI agent ecosystem includes multiple major silos: Builder platforms for creating custom agents; Coding assistants for software development; Business automation agents for operational workflows; Research agents for data analysis; Customer support agents for conversational interfaces; Marketing agents for content creation; Financial agents for trading and analysis; Healthcare agents for medical applications.',
        links: [
          { label: 'Business AI Agents', href: '/ai-agents-for-business/' },
          { label: 'Coding AI Agents', href: '/best-ai-agent-for-coding/' },
          { label: 'Research AI Agents', href: '/ai-agent-research/' }
        ]
      },
      {
        title: 'Navigation and Discovery',
        content: 'Effective navigation through AI agent silos requires understanding your specific use case, technical requirements, and integration needs. Start with broad categories then narrow based on features, pricing, and industry-specific requirements. Our directory provides cross-linking between related silos to support comprehensive solution discovery.',
        links: [
          { label: 'Silos Hub', href: '/silos/' },
          { label: 'Browse by Industry', href: '/agents-by-industry/' },
          { label: 'Compare Categories', href: '/compare/' }
        ]
      }
    ]
  },
  {
    slug: 'mcp-directory',
    title: 'Model Context Protocol (MCP) Server Directory - Complete Guide',
    description: 'Complete directory of Model Context Protocol servers. Connect AI agents to databases, file systems, APIs, and cloud services. India-focused with DPDP compliance.',
    sections: [
      {
        title: 'What Is Model Context Protocol?',
        content: 'Model Context Protocol (MCP) is an open standard that enables AI applications to connect with external tools and data sources through a unified interface. MCP servers expose functionality through standardized protocols, allowing AI agents to browse the web, access databases, calculate results, and interact with external systems without custom integrations for each service.',
        links: [
          { label: 'What Is MCP?', href: '/what-is-mcp/' },
          { label: 'MCP Architecture Guide', href: '/mcp-architecture/' },
          { label: 'MCP Clients', href: '/mcp-clients/' }
        ]
      },
      {
        title: 'MCP Server Categories',
        content: 'The MCP ecosystem includes servers for diverse use cases: Database servers for SQL and NoSQL access; File system servers for document management; API connectors for web services; Collaboration tools like Slack and Teams; Development tools including GitHub and GitLab; Knowledge bases with Notion and Confluence; Commerce platforms like Shopify; FinTech tools including Tally and GSTN for India market.',
        links: [
          { label: 'Best MCP Servers', href: '/best-mcp-servers/' },
          { label: 'Database Servers', href: '/mcp-servers/databases/' },
          { label: 'India FinTech Servers', href: '/mcp-servers/india-fintech/' }
        ]
      },
      {
        title: 'India Market Focus',
        content: 'Indian developers and enterprises require specific MCP server considerations: DPDP Act compliance for data protection; UPI payment integrations; Tally and GSTN connectivity for accounting; Tier-2 edge deployment support; Indic language processing; GST invoice generation; Regional compliance for data residency requirements.',
        links: [
          { label: 'DPDP Compliance', href: '/mcp-dpdp-compliance/' },
          { label: 'Tally Integration', href: '/mcp-tally-integration/' },
          { label: 'India Deployments', href: '/mcp-india-deployment/' }
        ]
      }
    ]
  }
];

function generatePillarPage(page: PillarContent): string {
  const canonical = `https://bestaiagent.in/${page.slug}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": canonical,
    "url": canonical,
    "name": page.title,
    "description": page.description,
    "inLanguage": "en-US",
    "mainEntityOfPage": true,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bestaiagent.in/" },
        { "@type": "ListItem", "position": 2, "name": page.title.split(' - ')[0], "item": canonical }
      ]
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
    .section { margin: 2rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 8px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .links { margin-top: 1rem; }
    .links a { display: inline-block; margin-right: 1rem; margin-bottom: 0.5rem; padding: 0.25rem 0.75rem; background: white; border: 1px solid #ddd; border-radius: 4px; }
  </style>
</head>
<body>
  <article>
    <h1>${page.title}</h1>
    <p style="font-size: 1.1em; color: #666;">${page.description}</p>
`;

  page.sections.forEach(section => {
    html += `
    <section class="section">
      <h2>${section.title}</h2>
      <p>${section.content}</p>`;
    
    if (section.links && section.links.length > 0) {
      html += '\n      <div class="links">\n';
      section.links.forEach(link => {
        html += `        <a href="${link.href}">${link.label}</a>\n`;
      });
      html += '      </div>\n';
    }
    
    html += '    </section>\n';
  });

  html += `
  </article>
</body>
</html>`;

  return html;
}

async function main() {
  console.log('=== Expanded Pillar Page Generation ===\n');
  
  let generated = 0;
  
  for (const page of pillarPages) {
    const dir = path.join(outputDir, page.slug);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const html = generatePillarPage(page);
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    
    console.log(`Generated: ${page.title}`);
    console.log(`  → ${page.slug}/index.html`);
    generated++;
  }
  
  console.log(`\n=== Complete ===`);
  console.log(`Generated ${generated} expanded pillar pages with full SEO optimization`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
