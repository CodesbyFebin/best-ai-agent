#!/usr/bin/env npx tsx

/**
 * Generate Navigation/Collection Pages for Footer Links
 * Creates SEO-optimized collection pages for navigation
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Footer Navigation Structure
const FOOTER_SECTIONS = [
  {
    title: "Best AI Agents",
    slug: "best-ai-agent",
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
    slug: "agent-builders",
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
    slug: "coding-agents",
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
    slug: "frameworks",
    links: [
      { label: "AI Agent Frameworks", href: "/best-ai-agent-frameworks/", description: "Multi-agent frameworks" },
      { label: "AI Agent SDKs", href: "/best-ai-agent-sdks/", description: "SDKs and libraries" },
      { label: "Open-Source Agent Tools", href: "/best-open-source-ai-agent-tools/", description: "Open source solutions" },
      { label: "AI Agent Libraries", href: "/best-ai-agent-libraries/", description: "Code libraries" },
      { label: "AI Agent Prompt Tools", href: "/best-ai-agent-prompt-tools/", description: "Prompt engineering" },
      { label: "AI Agent Development Tools", href: "/best-ai-agent-development-tools/", "description": "Developer tools" },
    ],
  },
  {
    title: "Agents by Organization",
    slug: "agents-by-organization",
    links: [
      { label: "AI Agents for Business", href: "/ai-agents-for-business/", description: "Corporate agents" },
      { label: "AI Agents for Enterprises", href: "/ai-agents-for-enterprises/", description: "Enterprise solutions" },
      { label: "AI Agents for SMEs", href: "/ai-agents-for-smes/", description: "Small business agents" },
    ],
  },
  {
    title: "Workflow Automation Agents",
    slug: "workflow-automation-agents",
    links: [
      { label: "Workflow Automation Agents", href: "/ai-agents-for-workflow-automation/", description: "Process automation" },
      { label: "Support Automation Agents", href: "/ai-agents-for-support-automation/", description: "Customer support bots" },
    ],
  },
  {
    title: "Agents by Industry",
    slug: "agents-by-industry",
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
    slug: "research-intelligence",
    links: [
      { label: "AI Agent Research", href: "/ai-agent-research/", description: "Research reports" },
      { label: "AI Agent News", href: "/ai-agent-news/", description: "Latest updates" },
      { label: "AI Agent Trends", href: "/ai-agent-trends/", description: "Market trends" },
      { label: "AI Agent Benchmarks", href: "/ai-agent-benchmarks/", description: "Benchmark scores" },
      { label: "AI Agent Roadmap", href: "/ai-agent-roadmap/", description: "Future plans" },
      { label: "AI Agent Cases and Examples", href: "/ai-agent-cases-and-examples/", "description": "Use cases" },
    ],
  },
  {
    title: "MCP Ecosystem",
    slug: "mcp-ecosystem",
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
    slug: "company-feeds",
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
  },
];

function generateNavigationPage(section: any): string {
  const title = section.title + " - BestAIAgent.in";
  const description = "Browse " + section.title + " - Best AI Agent directory and reviews.";
  const canonical = "https://bestaiagent.in/" + section.slug + "/";
  
  let content = '<article class="navigation-content">\n';
  content += '  <h1>' + section.title + '</h1>\n';
  content += '  <p>' + description + '</p>\n';
  content += '  <section>\n';
  content += '    <h2>Available Resources</h2>\n';
  content += '    <ul>\n';
  
  for (const link of section.links) {
    content += '      <li><a href="' + link.href + '">' + link.label + '</a></li>\n';
  }
  
  content += '    </ul>\n';
  content += '  </section>\n';
  content += '</article>';
  
  return `<!DOCTYPE html>
<html lang="en">
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
  <script type="application/ld+json">
${JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": canonical,
  "url": canonical,
  "name": section.title,
  "description": description,
  "inLanguage": "en-US",
  "mainEntityOfPage": true,
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bestaiagent.in/" },
      { "@type": "ListItem", "position": 2, "name": section.title, "item": canonical }
    ]
  }
}, null, 2)}
  </script>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 900px; margin: 2rem auto; padding: 0 1rem; line-height: 1.7; color: #333; }
    h1, h2, h3 { color: #1a1a2e; }
    section { margin: 2rem 0; }
    .navigation-content { max-width: 800px; }
    ul { list-style-type: none; padding: 0; }
    li { margin: 0.5rem 0; }
    a { color: #1a1a2e; text-decoration: none; }
  </style>
</head>
<body>
${content}

  <footer style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #eee; font-size: 0.9em; color: #666;">
    <div style="max-width: 900px; margin: 0 auto; padding: 1rem;">
      <p style="font-size: 1.2em; font-weight: bold; margin-bottom: 1rem;">BestAIAgent.in</p>
      <p style="color: #666; font-size: 0.9em;">AI Agent directory and bestseller rankings.</p>
    </div>
  </footer>
</body>
</html>`;
}

async function main() {
  console.log('=== Navigation Page Generation ===\n');
  
  const outputDir = path.join(__dirname, '..', 'dist', 'content');
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  let generated = 0;
  
  for (const section of FOOTER_SECTIONS) {
    const slug = section.slug;
    const sectionDir = path.join(outputDir, slug);
    
    if (!fs.existsSync(sectionDir)) {
      fs.mkdirSync(sectionDir, { recursive: true });
    }
    
    const html = generateNavigationPage(section);
    fs.writeFileSync(path.join(sectionDir, 'index.html'), html);
    
    console.log('Generated: ' + section.title + ' -> ' + slug + '/index.html');
    generated++;
  }
  
  console.log('\n=== Complete ===');
  console.log('Generated ' + generated + ' navigation pages');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
