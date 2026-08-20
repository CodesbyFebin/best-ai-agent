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
  {
    title: "MCP Directory",
    slug: "mcp-directory",
    links: [
      { label: "What Is MCP?", href: "/what-is-mcp/", description: "MCP protocol explained" },
      { label: "Best MCP Servers", href: "/best-mcp-servers/", description: "Server directory" },
      { label: "Database MCP Servers", href: "/mcp-servers/databases/", description: "Database integrations" },
      { label: "File System MCP Servers", href: "/mcp-servers/files/", description: "File integrations" },
      { label: "Slack MCP Server", href: "/mcp/servers/slack/", description: "Slack integration" },
      { label: "GitHub MCP Server", href: "/mcp/servers/github/", description: "GitHub integration" },
      { label: "Notion MCP Server", href: "/mcp/servers/notion/", description: "Notion integration" },
    ],
  },
  {
    title: "AI Agent Silos",
    slug: "silos",
    links: [
      { label: "AI Agent Builders", href: "/best-ai-agent-builder/", description: "No-code builder platforms" },
      { label: "AI Coding Agents", href: "/best-ai-agent-for-coding/", description: "Code development agents" },
      { label: "AI Frameworks", href: "/best-ai-agent-frameworks/", description: "Development frameworks" },
      { label: "Business AI Agents", href: "/ai-agents-for-business/", description: "Enterprise automation" },
      { label: "Research AI Agents", href: "/ai-agent-research/", description: "Research tools" },
      { label: "MCP Servers", href: "/best-mcp-servers/", description: "Model Context Protocol servers" },
    ],
  },
];

function generateNavigationPage(section: any): string {
  const title = section.title + " - BestAIAgent.in";
  const description = "Browse " + section.title + " - Best AI Agent directory and reviews.";
  const canonical = "https://bestaiagent.in/" + section.slug + "/";
  
  // Generate rich content for each navigation section
  type SectionContent = { intro: string; features: string };
  
  const sectionContent: Record<string, SectionContent> = {
    "frameworks": {
      intro: "AI Agent Frameworks are the foundational building blocks for creating sophisticated, production-ready AI systems. These frameworks and libraries provide the architectural patterns, orchestration tools, and infrastructure needed to develop agents that can reason, plan, and execute complex workflows. Modern frameworks extend beyond simple prompt chaining to support multi-agent coordination, memory management, tool integration, and state persistence. From basic task execution to autonomous agent systems with reasoning capabilities, frameworks abstract away the complexity of LLM orchestration while enabling developers to focus on business-critical logic and user experience.",
      features: "When evaluating AI Agent Frameworks, consider these critical factors: 1) Multi-agent orchestration capabilities that enable complex workflows and team collaboration among specialized agents; 2) State management solutions for maintaining conversation context and episodic memory across sessions; 3) Tool integration depth covering APIs, databases, file systems, and third-party services; 4) Deployment flexibility supporting cloud, on-premise, and hybrid environments with containerization support; 5) Security features including data encryption, access controls, and compliance certifications for enterprise use; 6) Active community support, documentation quality, and regular updates for long-term viability; 7) Evaluation metrics and testing frameworks for quality assurance in production environments. The right framework accelerates development from months to weeks while ensuring scalability for enterprise workloads."
    },
    "mcp-ecosystem": {
      intro: "The Model Context Protocol (MCP) ecosystem provides a standardized way for AI applications to connect with data sources and tools. MCP servers expose functionality through a unified interface, enabling AI agents to browse the web, access databases, calculate results, and interact with external systems. This openness creates a rich ecosystem of interconnected tools that can be composed into powerful AI workflows. With over 100 community-built servers and growing adoption by leading AI platforms, MCP represents the future of extensible AI applications.",
      features: "The MCP ecosystem includes servers for file storage, databases, calendars, email, and more. Servers handle authentication, data synchronization, and real-time updates, while clients process responses and integrate results seamlessly into broader workflows. Key server categories include database servers (SQL & NoSQL), file system servers, API connectors, collaboration tools (Slack, Teams), development tools (GitHub, GitLab), knowledge bases (Notion, Confluence), and commerce platforms (Shopify, payment gateways)."
    },
    "best-ai-agent": {
      intro: "The landscape of best AI agents spans multiple categories and use cases, from autonomous coding assistants to enterprise-grade customer support solutions. Each agent represents a carefully evaluated combination of language models, reasoning capabilities, tool integration, and specialized features. We've conducted extensive independent testing across dimensions including accuracy, speed, pricing transparency, security features, and real-world performance to help you navigate this complex ecosystem and choose the right solution for your specific requirements.",
      features: "Top-tier AI agents demonstrate sophisticated reasoning chains with multi-step planning capabilities, real-time web browsing for dynamic information retrieval, secure code execution environments for development tasks, extensive API integrations covering cloud services and business tools, and comprehensive analytics for performance monitoring. Enterprise-grade agents include role-based access controls, comprehensive audit logging, compliance certifications (SOC 2, ISO 27001, DPDP), and dedicated support channels. Understanding the trade-offs between specialized agents (optimized for coding, voice, etc.) and general-purpose agents helps match solutions to specific workflows and organizational requirements."
    },
    "coding-agents": {
      intro: "AI Coding Agents have fundamentally transformed software development by extending beyond simple code completion to provide full-stack assistance, debugging capabilities, and architectural guidance. These agents understand codebases deeply, can navigate complex project structures, execute code in secure sandboxes, and provide real-time assistance throughout the development lifecycle. They excel at tasks ranging from simple code completion and refactoring to complex system design and multi-file project generation. Modern coding agents are essential tools for developers, engineering teams, and organizations seeking to accelerate development velocity and maintain code quality.",
      features: "Leading coding agents offer deep codebase context awareness with multi-file indexing capabilities, integrated debugging tools for issue detection and resolution, real-time collaboration features for team development, seamless integration with IDEs like VS Code, Cursor, and Windsurf, code generation across 50+ programming languages with style guide adherence, automated test generation for quality assurance, documentation automation with API reference generation, native git operations including commit message generation and pull request management, and terminal execution with command suggestions and explanations."
    },
    "agent-builders": {
      intro: "AI Agent Builders constitute a critical layer of the AI ecosystem that empowers developers and organizations to create custom AI agents without requiring deep expertise in machine learning or large language model engineering. These platforms provide visual interfaces, low-code/no-code solutions, and comprehensive SDKs that abstract away the complexity of LLM orchestration while offering powerful customization capabilities. From simple workflow automation to complex multi-agent systems with reasoning and memory, builder platforms enable rapid prototyping, iterative development, and production deployment of sophisticated AI solutions.",
      features: "Key capabilities include intuitive drag-and-drop workflow builders for visual agent design, extensive libraries of pre-built templates and components for accelerated development, integration with over 100 third-party services through native connectors, versioning and deployment management for collaborative environments, real-time monitoring and analytics dashboards for observability, collaborative features supporting team-based development with role-based access controls, exportable configurations for portability, and extensibility through plugins and custom code for specialized requirements. The right builder platform reduces the learning curve while ensuring performance and reliability at scale."
    },
    "agents-by-organization": {
      intro: "AI agents are purpose-built for different organizational sizes, structures, and maturity levels. Small startups benefit from no-code solutions with minimal setup overhead, while mid-market companies require collaborative features with role-based access and existing tool integrations. Large enterprises demand robust security, compliance certifications, dedicated support, and advanced analytics for governance and oversight. Understanding how agents scale with organizational growth helps teams choose solutions that provide immediate value while supporting long-term strategic objectives.",
      features: "Small business agents focus on affordability, ease of use, and quick deployment with pre-configured workflows. SMB-focused solutions typically offer freemium tiers, community support, and integrations with popular business tools like Google Workspace, Microsoft 365, and Zapier. Mid-market agents provide team collaboration features, moderate customization options, scalable pricing, and integration with enterprise systems like Salesforce, HubSpot, and Oracle. Enterprise-grade agents offer advanced security features including SOC 2 compliance, data encryption, audit logging, dedicated support, custom branding, and sophisticated governance controls for managing large user bases and mission-critical workflows."
    },
    "workflow-automation-agents": {
      intro: "Workflow automation agents serve as the bridge between human decision-making and automated execution, orchestrating complex business processes across multiple systems and data sources. These agents understand business context, handle edge cases and exceptions, and continuously optimize workflows based on performance data and changing business requirements. They are indispensable for digital transformation initiatives, operational excellence, and competitive advantage in today's fast-paced business environment.",
      features: "Advanced automation agents include robotic process automation (RPA) for scripted repetitive tasks, business process management (BPM) for orchestrating multi-step workflows, decision automation with rule engines and machine learning, document processing with OCR and NLP for unstructured data, integration with 50+ enterprise systems including ERP, CRM, and collaboration platforms, conditional logic and branching for dynamic workflow paths, error handling and retry mechanisms with escalation paths, human-in-the-loop validation for critical decisions, real-time monitoring and alerting for process visibility, and analytics dashboards for continuous improvement through data-driven insights."
    },
    "agents-by-industry": {
      intro: "Industry-specific AI agents recognize that generic solutions fall short when dealing with domain-specific regulations, terminology, and workflows. These specialized agents combine cutting-edge AI capabilities with deep domain knowledge, ensuring accuracy, compliance, and contextual understanding. From financial risk modeling and healthcare diagnostics to legal document analysis and manufacturing quality control, industry agents deliver superior results by understanding the unique challenges and requirements of their respective sectors.",
      features: "Financial services agents specialize in risk analysis, fraud detection, compliance monitoring, algorithmic trading, portfolio optimization, and regulatory reporting with features like real-time market data integration, scenario modeling, and stress testing. Healthcare agents assist with clinical decision support, medical imaging analysis, patient communication, appointment scheduling, and medical literature synthesis with HIPAA compliance. Legal agents handle document review, contract analysis, case law research, compliance checking, and e-discovery with advanced NLP for legal terminology. Manufacturing agents optimize supply chains, predict equipment failures, optimize production schedules, and manage quality assurance with sensors integration. Each industry agent includes domain-specific data models, regulatory templates, and specialized integrations relevant to operational workflows."
    },
    "research-intelligence": {
      intro: "Research and intelligence agents amplify human analytical capabilities by processing vast amounts of information, identifying patterns that escape human notice, synthesizing findings from disparate sources, and generating actionable insights. They are essential for market research, competitive intelligence, scientific discovery, investment analysis, and strategic planning. These agents enable organizations to stay ahead of market trends, discover new opportunities, and make data-driven decisions with confidence.",
      features: "Research agents include web scraping and crawling capabilities for current information collection, academic paper analysis with citation extraction and summary generation, trend identification through pattern recognition across time series and market data, sentiment analysis of customer feedback, social media, and news sources, data visualization tools for complex relationship mapping, automated report generation with executive summaries and detailed findings, citation management and bibliography generation for academic and professional use, knowledge graph construction for entity relationship mapping, competitive analysis tools for market positioning assessment, and integration with research databases including PubMed, arXiv, and industry publications."
    },
    "company-feeds": {
      intro: "Comprehensive information about AI agent providers is essential for evaluating solution viability, support quality, and strategic alignment. Company feeds aggregate data on funding, leadership, partnerships, product roadmaps, and community engagement. This transparency enables informed investment decisions, partnership evaluations, and technology adoption strategies. Understanding a company's trajectory, financial health, and market position provides critical context for agent selection and deployment planning.",
      features: "Corporate intelligence includes company founding history and key milestones, funding rounds with amounts and investors, leadership bios and advisory board composition, strategic partnerships and technology integrations, product roadmap transparency and development priorities, customer reference programs and case studies, geographic presence with regional expansion plans, community engagement through events, forums, and open source contributions, developer ecosystem with tooling, plugins, and APIs, and compliance certifications and security audits that validate enterprise readiness."
    }
  };
  
  let content = '<article class="navigation-content">\n';
  content += '  <h1>' + section.title + '</h1>\n';
  
  // Add rich intro content
  const richContent = sectionContent[section.slug] || {
    intro: section.title + ' is a critical category in the AI agent ecosystem, encompassing tools and platforms designed for specific workflows and use cases. Organizations leverage these specialized agents to enhance productivity, automate complex tasks, and achieve measurable business outcomes.',
    features: 'This category includes solutions evaluated across dimensions of capability, integration, performance, pricing, and real-world applicability. The right agent can significantly impact productivity, accuracy, and operational efficiency.'
  };
  
  content += '  <p>' + richContent.intro + '</p>\n';
  content += '  <section>\n';
  content += '    <h2>Key Considerations</h2>\n';
  content += '    <p>' + richContent.features + '</p>\n';
  content += '    <h3>Available Resources</h3>\n';
  content += '    <ul>\n';
  
  for (const link of section.links) {
    content += '      <li><a href="' + link.href + '">' + link.label + '</a>' + (link.description ? ' - ' + link.description : '') + '</li>\n';
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
