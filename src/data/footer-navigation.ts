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
  {
    title: "Best AI Agents",
    href: "/best-ai-agent/",
    links: [
      {
        label: "Best AI Agent",
        href: "/best-ai-agent/",
      },
      {
        label: "Best AI Agent for Business",
        href: "/best-ai-agent-for-business/",
      },
      {
        label: "Best AI Agent for Coding",
        href: "/best-ai-agent-for-coding/",
      },
      {
        label: "Best AI Agent Alternatives",
        href: "/best-ai-agent-alternatives/",
      },
      {
        label: "Best AI Agents for Automation",
        href: "/best-ai-agents-for-automation/",
      },
    ],
  },

  {
    title: "Business Functions",
    links: [
      {
        label: "AI Agents for CRM",
        href: "/best-ai-agent-for-crm/",
      },
      {
        label: "AI Agents for Customer Support",
        href: "/best-ai-agent-for-customer-support/",
      },
      {
        label: "AI Agents for Sales",
        href: "/best-ai-agent-for-sales/",
      },
      {
        label: "AI Agents for HR",
        href: "/best-ai-agent-for-hr/",
      },
      {
        label: "AI Agents for Marketing",
        href: "/best-ai-agent-for-marketing/",
      },
    ],
  },

  {
    title: "Agent Builders",
    links: [
      {
        label: "AI Agent Builder",
        href: "/best-ai-agent-builder/",
      },
      {
        label: "AI Agent Creator",
        href: "/best-ai-agent-creator/",
      },
      {
        label: "AI Agent Maker",
        href: "/best-ai-agent-maker/",
      },
      {
        label: "AI Agent App Builder",
        href: "/best-ai-agent-app-builder/",
      },
      {
        label: "No-Code AI Agent Platforms",
        href: "/best-ai-agent-no-code-platform/",
      },
      {
        label: "AI Workflow Builders",
        href: "/best-ai-agent-workflow-builder/",
      },
      {
        label: "AI Agent Platforms",
        href: "/best-ai-agent-platform/",
      },
    ],
  },

  {
    title: "Coding Agents",
    links: [
      {
        label: "AI Agents for Code Review",
        href: "/best-ai-agent-for-code-review/",
      },
      {
        label: "AI Agents for Frontend Development",
        href: "/best-ai-agent-for-frontend-development/",
      },
      {
        label: "AI Agents for Backend Development",
        href: "/best-ai-agent-for-backend-development/",
      },
      {
        label: "AI Agents for VS Code",
        href: "/best-ai-agent-for-vs-code/",
      },
      {
        label: "AI Agent Extensions for VS Code",
        href: "/best-ai-agent-extension-for-vs-code/",
      },
      {
        label: "AI Agents for IDEs",
        href: "/best-ai-agent-for-ides/",
      },
    ],
  },

  {
    title: "Frameworks & Developer Tools",
    links: [
      {
        label: "AI Agent Frameworks",
        href: "/best-ai-agent-frameworks/",
      },
      {
        label: "Agent Orchestration Tools",
        href: "/best-ai-agent-orchestration-tools/",
      },
      {
        label: "AI Agent SDKs",
        href: "/best-ai-agent-sdks/",
      },
      {
        label: "Open-Source Agent Tools",
        href: "/best-open-source-ai-agent-tools/",
      },
      {
        label: "AI Agent Libraries",
        href: "/best-ai-agent-libraries/",
      },
      {
        label: "AI Agent Prompt Tools",
        href: "/best-ai-agent-prompt-tools/",
      },
      {
        label: "AI Agent Development Tools",
        href: "/best-ai-agent-development-tools/",
      },
    ],
  },

  {
    title: "Agents by Organization",
    links: [
      {
        label: "AI Agents for Business",
        href: "/ai-agents-for-business/",
      },
      {
        label: "AI Agents for Enterprises",
        href: "/ai-agents-for-enterprises/",
      },
      {
        label: "AI Agents for SMEs",
        href: "/ai-agents-for-smes/",
      },
      {
        label: "Workflow Automation Agents",
        href: "/ai-agents-for-workflow-automation/",
      },
      {
        label: "Support Automation Agents",
        href: "/ai-agents-for-support-automation/",
      },
    ],
  },

  {
    title: "Agents by Industry",
    links: [
      {
        label: "AI Agents for Finance",
        href: "/ai-agents-for-finance/",
      },
      {
        label: "AI Agents for Security",
        href: "/ai-agents-for-security/",
      },
      {
        label: "AI Agents for Healthcare",
        href: "/ai-agents-for-healthcare/",
      },
      {
        label: "AI Agents for HR",
        href: "/ai-agents-for-hr/",
      },
      {
        label: "AI Agents for Procurement",
        href: "/ai-agents-for-procurement/",
      },
    ],
  },

  {
    title: "Research & Intelligence",
    links: [
      {
        label: "AI Agent Research",
        href: "/ai-agent-research/",
      },
      {
        label: "AI Agent News",
        href: "/ai-agent-news/",
      },
      {
        label: "AI Agent Trends",
        href: "/ai-agent-trends/",
      },
      {
        label: "AI Agent Benchmarks",
        href: "/ai-agent-benchmarks/",
      },
      {
        label: "AI Agent Roadmap",
        href: "/ai-agent-roadmap/",
      },
      {
        label: "AI Agent Updates",
        href: "/ai-agent-updates/",
      },
      {
        label: "AI Agent Cases and Examples",
        href: "/ai-agent-cases-and-examples/",
      },
    ],
  },

  {
    title: "MCP Ecosystem",
    href: "/mcp-directory/",
    links: [
      {
        label: "What Is MCP?",
        href: "/what-is-mcp/",
      },
      {
        label: "Best MCP Servers",
        href: "/best-mcp-servers/",
      },
      {
        label: "MCP Directory",
        href: "/mcp-directory/",
      },
    ],
  },
];
