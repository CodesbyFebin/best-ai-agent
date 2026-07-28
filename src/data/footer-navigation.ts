export interface FooterLink {
  label: string;
  href: string;
  description?: string;
}

export interface FooterSection {
  title: string;
  href?: string;
  links: FooterLink[];
}

export const programmaticFooterSections: FooterSection[] = [
  // Main Navigation
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

  // Agent Builders (6 items in user's navigation)
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

  // Coding Agents (8 items in user's navigation)
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

  // Frameworks & Developer Tools (6 items in user's navigation)
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

  // Agents by Organization (3 items in user's navigation)
  {
    title: "Agents by Organization",
    links: [
      { label: "AI Agents for Business", href: "/ai-agents-for-business/", description: "Corporate agents" },
      { label: "AI Agents for Enterprises", href: "/ai-agents-for-enterprises/", description: "Enterprise solutions" },
      { label: "AI Agents for SMEs", href: "/ai-agents-for-smes/", description: "Small business agents" },
    ],
  },

  // Workflow Automation Agents (2 items in user's navigation)
  {
    title: "Workflow Automation Agents",
    links: [
      { label: "Workflow Automation Agents", href: "/ai-agents-for-workflow-automation/", description: "Process automation" },
      { label: "Support Automation Agents", href: "/ai-agents-for-support-automation/", description: "Customer support bots" },
    ],
  },

  // Agents by Industry (5 items in user's navigation)
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

  // Research & Intelligence (6 items in user's navigation)
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

  // MCP Ecosystem (5 items in user's navigation)
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

  // Company & Feeds (8 items in user's navigation)
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
  },
];