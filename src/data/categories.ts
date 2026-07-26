export interface Category {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  description: string;
  toolCount: number;
  topAgent: string;
  topAgentSlug: string;
  urlPath: string;
  popularKeywords: string[];
}

export const popularCategories: Category[] = [
  {
    id: "coding-agents",
    slug: "coding-agents",
    name: "Coding Agents",
    iconName: "Code",
    description: "Autonomous IDE editors, terminal debugging co-pilots, and repository refactoring tools.",
    toolCount: 1245,
    topAgent: "Cursor AI",
    topAgentSlug: "cursor-ai",
    urlPath: "/categories/coding-agents/",
    popularKeywords: ["Cursor vs Windsurf", "Autonomous Code Fixer", "Terminal AI Agent"]
  },
  {
    id: "business-automation",
    slug: "business-automation",
    name: "Business Automation",
    iconName: "Workflow",
    description: "Enterprise workflow orchestrators, document processing bots, and SLA monitors.",
    toolCount: 1096,
    topAgent: "Yellow AI",
    topAgentSlug: "yellow-ai",
    urlPath: "/categories/business-automation/",
    popularKeywords: ["ERP Automation", "Invoice OCR Agent", "WhatsApp Business AI"]
  },
  {
    id: "customer-support",
    slug: "customer-support",
    name: "Customer Support",
    iconName: "Headphones",
    description: "24/7 omni-channel customer service agents with ticket resolution and SLA guarantees.",
    toolCount: 890,
    topAgent: "Krutrim AI",
    topAgentSlug: "krutrim",
    urlPath: "/categories/customer-support/",
    popularKeywords: ["Voice Call Support", "WhatsApp Helpdesk", "Refund Processing Agent"]
  },
  {
    id: "research-agents",
    slug: "research-agents",
    name: "Research Agents",
    iconName: "Search",
    description: "Deep research synthesis engines with multi-source citation verification and web scraping.",
    toolCount: 785,
    topAgent: "Perplexity Pro",
    topAgentSlug: "perplexity",
    urlPath: "/categories/research-agents/",
    popularKeywords: ["Deep Research Bot", "Academic Citation AI", "Market Intelligence Agent"]
  },
  {
    id: "sales-marketing",
    slug: "sales-marketing",
    name: "Sales & Marketing",
    iconName: "TrendingUp",
    description: "Automated outbound prospecting, cold email personalization, and content creation suites.",
    toolCount: 654,
    topAgent: "Regie.ai",
    topAgentSlug: "regie-ai",
    urlPath: "/categories/sales-marketing/",
    popularKeywords: ["Lead Prospecting Agent", "LinkedIn Outreach Bot", "Ad Copy Synthesizer"]
  },
  {
    id: "voice-agents",
    slug: "voice-agents",
    name: "Voice Agents",
    iconName: "Mic",
    description: "Low-latency conversational phone agents for inbound inquiries and outbound scheduling.",
    toolCount: 420,
    topAgent: "Vapi AI",
    topAgentSlug: "vapi-ai",
    urlPath: "/categories/voice-agents/",
    popularKeywords: ["SIP Telephony Bot", "Inbound Call Agent", "Multilingual Indian Voice"]
  },
  {
    id: "open-source-agents",
    slug: "open-source-agents",
    name: "Open-Source Agents",
    iconName: "Github",
    description: "Self-hostable, transparent agent codebases with local model weights and private data privacy.",
    toolCount: 543,
    topAgent: "CrewAI",
    topAgentSlug: "crewai",
    urlPath: "/categories/open-source-agents/",
    popularKeywords: ["Self-hosted Agent", "Local LLM Agent", "Ollama Agentic Loop"]
  },
  {
    id: "agent-frameworks",
    slug: "agent-frameworks",
    name: "Agent Frameworks",
    iconName: "Cpu",
    description: "Developer SDKs and libraries for constructing multi-agent systems and graph workflows.",
    toolCount: 312,
    topAgent: "LangGraph",
    topAgentSlug: "langgraph",
    urlPath: "/frameworks/langgraph/",
    popularKeywords: ["LangGraph Tutorial", "CrewAI vs AutoGen", "OpenAI Agent SDK"]
  },
  {
    id: "mcp-servers",
    slug: "mcp-servers",
    name: "MCP Servers",
    iconName: "Network",
    description: "Model Context Protocol servers providing structured data tool access to AI assistants.",
    toolCount: 1024,
    topAgent: "GitHub MCP Server",
    topAgentSlug: "mcp-github",
    urlPath: "/categories/mcp-servers/",
    popularKeywords: ["Postgres MCP", "Google Drive MCP", "Brave Search MCP"]
  },
  {
    id: "personal-ai-assistants",
    slug: "personal-ai-assistants",
    name: "Personal AI Assistants",
    iconName: "Sparkles",
    description: "Everyday productivity companions for task management, calendar coordination, and drafting.",
    toolCount: 1120,
    topAgent: "ChatGPT",
    topAgentSlug: "chatgpt",
    urlPath: "/categories/personal-ai-assistants/",
    popularKeywords: ["Daily Task Bot", "Email Synthesizer", "Voice Assistant"]
  }
];

export const featuredCategories = popularCategories;
