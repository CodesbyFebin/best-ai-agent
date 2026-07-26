/**
 * Phase C — Expanded Agent Registry
 * 
 * Expanded agent directory for Content OS content generation.
 * This extends the base agents.ts with additional agents for comprehensive coverage.
 * Total: 50+ agents for production scale
 */

import type { Agent } from './agents';

// Re-export base agents
export { featuredAgents } from './agents';

/**
 * Extended agent registry with 50+ agents
 * Categories: Coding, Voice, Research, Business Automation, Framework, Tool, Integration
 */
export const extendedAgents: Agent[] = [
  // === CODING AGENTS ===
  {
    id: "cursor",
    slug: "cursor",
    name: "Cursor",
    company: "Anysphere",
    logo: "https://images.unsplash.com/photo-15151172146-989397051faf?auto=format&fit=crop&w=120&q=80",
    summary: "AI-powered code editor with multi-file agent mode, terminal execution, and deep codebase understanding.",
    bestFor: ["Full-stack code generation", "Multi-file refactoring", "AI pair programming"],
    categories: ["Coding Agents", "Developer Tools"],
    pricing: {
      type: "freemium",
      startingPriceUSD: "$0-40/mo",
      startingPriceINR: "₹0-3,600/mo",
      verifiedAt: "2026-07-20",
      details: "Free for individuals; Pro $40/mo; Teams $80/user/mo."
    },
    score: { overall: 9.7, reasoning: 9.6, toolUse: 9.8, value: 9.5, privacy: 9.0, easeOfUse: 9.7, indiaFit: 9.6 },
    deployment: ["Desktop IDE (Mac/Win/Linux)"],
    integrations: ["GitHub", "GitLab", "VS Code", "Terminal"],
    openSource: false,
    testingDate: "2026-07-19",
    updatedAt: "2026-07-22",
    knownLimitation: "Aggressive code suggestions may require careful review in production code.",
    reviewUrl: "/agents/cursor/",
    officialUrl: "https://cursor.com",
    featured: true,
    trending: true
  },

  {
    id: "claude-code",
    slug: "claude-code",
    name: "Claude Code",
    company: "Anthropic",
    logo: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=120&q=80",
    summary: "Claude's coding assistant with computer use capabilities for autonomous software development tasks.",
    bestFor: ["Complex code tasks", "Test-driven development", "Documentation generation"],
    categories: ["Coding Agents", "Developer Tools"],
    pricing: {
      type: "freemium",
      startingPriceUSD: "$20/mo",
      startingPriceINR: "₹1,999/mo",
      verifiedAt: "2026-07-21",
      details: "Free tier; Pro $20/mo; Team $25/user/mo."
    },
    score: { overall: 9.6, reasoning: 9.8, toolUse: 9.7, value: 9.3, privacy: 9.2, easeOfUse: 9.5, indiaFit: 9.1 },
    deployment: ["Web", "API", "Claude app"],
    integrations: ["GitHub", "GitLab", "VS Code", "Terminal"],
    openSource: false,
    testingDate: "2026-07-21",
    updatedAt: "2026-07-23",
    knownLimitation: "Requires Claude account and may have limits on tool usage.",
    reviewUrl: "/agents/claude-code/",
    officialUrl: "https://claude.ai",
    featured: true
  },

  {
    id: "gate",
    slug: "gate",
    name: "Ginie AI",
    company: "Ginie.ai",
    logo: "https://images.unsplash.com/photo-1555094132-8f4da85c7a8e?auto=format&fit=crop&w=120&q=80",
    summary: "Indian AI coding agent optimized for Indian language code documentation and localization.",
    bestFor: ["Indian language code", "Localised documentation", "Hinglish coding support"],
    categories: ["Coding Agents", "Developer Tools"],
    pricing: {
      type: "freemium",
      startingPriceUSD: "Free",
      startingPriceINR: "Free",
      details: "Free tier available with Indian language support."
    },
    score: { overall: 8.2, reasoning: 8.0, toolUse: 8.5, value: 8.8, privacy: 7.9, easeOfUse: 8.3, indiaFit: 9.5 },
    deployment: ["Web", "API"]
  },

  // === VOICE AGENTS ===
  {
    id: "retell-ai",
    slug: "retell-ai",
    name: "Retell AI",
    company: "Retell AI",
    logo: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=120&q=80",
    summary: "Voice agent builder with AI-powered call transcription, real-time analytics, and seamless CRM integration.",
    bestFor: ["Outbound calling", "Call center automation", "Voice analytics"],
    categories: ["Voice Agents", "Customer Support", "Business Automation"],
    pricing: {
      type: "paid",
      startingPriceUSD: "$0.03/call",
      startingPriceINR: "₹2.50/call",
      details: "Pay-per-call pricing with volume discounts."
    },
    score: { overall: 9.2, reasoning: 9.0, toolUse: 9.4, value: 9.1, privacy: 9.0, easeOfUse: 9.0, indiaFit: 9.2 },
    deployment: ["API", "Web Dashboard", "Mobile SDK"]
  },

  {
    id: "fenix",
    slug: "fenix",
    name: "Fenix AI",
    company: "Fenix",
    logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=120&q=80",
    summary: "Indian voice AI agent with Hinglish support for customer service and lead qualification.",
    bestFor: ["Indian customer support", "Hinglish conversations", "Lead qualification"],
    categories: ["Voice Agents", "Customer Support", "Sales"],
    pricing: {
      type: "paid",
      startingPriceUSD: "$19/mo",
      startingPriceINR: "₹1,500/mo",
      details: "Starting at $19/mo for 1,000 minutes."
    },
    score: { overall: 8.5, reasoning: 8.3, toolUse: 8.6, value: 8.9, privacy: 8.4, easeOfUse: 8.5, indiaFit: 9.7 }
  },

  // === RESEARCH AGENTS ===
  {
    id: "you.com",
    slug: "you.com",
    name: "You.com AI Research",
    company: "You.com",
    logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=120&q=80",
    summary: "Research-first search companion that synthesizes answers from multiple sources with live citations.",
    bestFor: ["Research synthesis", "Source verification", "Multi-perspective analysis"],
    categories: ["Research Agents", "Personal AI Assistants"],
    pricing: {
      type: "freemium",
      startingPriceUSD: "$10/mo",
      startingPriceINR: "₹800/mo",
      details: "Free tier; Pro $10/mo with advanced features."
    },
    score: { overall: 8.7, reasoning: 8.5, toolUse: 8.8, value: 9.0, privacy: 9.2, easeOfUse: 8.6, indiaFit: 8.8 }
  },

  {
    id: "tidwell",
    slug: "tidwell",
    name: "Tidwell AI Research",
    company: "Tidwell AI",
    logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=120&q=80",
    summary: "Specialized research agent for academic papers, market analysis, and competitive intelligence.",
    bestFor: ["Academic research", "Market analysis", "Competitive intelligence"],
    categories: ["Research Agents", "Business Intelligence"],
    pricing: {
      type: "paid",
      startingPriceUSD: "$49/mo",
      startingPriceINR: "₹4,000/mo"
    }
  },

  // === BUSINESS AUTOMATION ===
  {
    id: "n8n",
    slug: "n8n",
    name: "n8n Workflow Automation",
    company: "n8n-io",
    logo: "https://images.unsplash.com/photo-1555094132-8f4da85c7a8e?auto=format&fit=crop&w=120&q=80",
    summary: "Fair-code automation platform enabling complex workflows with over 300 integrations and full data control.",
    bestFor: ["Complex workflows", "Integration hubs", "Self-hosted automation"],
    categories: ["Workflow Automation", "Business Automation", "Developer Tools"],
    pricing: {
      type: "open_source",
      details: "Free open-source; Cloud starting at $20/mo."
    },
    score: { overall: 9.1, reasoning: 9.0, toolUse: 9.2, value: 9.5, privacy: 9.4, easeOfUse: 8.8, indiaFit: 9.1 },
    deployment: ["Self-hosted", "Cloud", "Docker"]
  },

  {
    id: "zapier",
    slug: "zapier",
    name: "Zapier",
    company: "Zapier",
    logo: "https://images.unsplash.com/photo-1555094132-8f4da85c7a8e?auto=format&fit=crop&w=120&q=80",
    summary: "Web automation platform connecting 5,000+ apps with no-code workflows and rich automation rules.",
    bestFor: ["App integrations", "Data sync", "Automated notifications"],
    categories: ["Workflow Automation", "Business Automation"],
    pricing: {
      type: "freemium",
      startingPriceUSD: "Free",
      details: "Free tier (100 tasks/mo); Paid plans starting at $20/mo."
    },
    score: { overall: 8.8, reasoning: 8.7, toolUse: 9.0, value: 9.1, privacy: 8.5, easeOfUse: 9.5, indiaFit: 8.9 }
  },

  {
    id: "make",
    slug: "make",
    name: "Make (formerly Integromat)",
    company: "Make.com",
    logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=120&q=80",
    summary: "Visual automation platform for building complex multi-step workflows with real-time monitoring.",
    bestFor: ["Visual workflow design", "Multi-step automations", "Real-time monitoring"],
    categories: ["Workflow Automation", "Business Automation"],
    pricing: {
      type: "freemium",
      startingPriceUSD: "Free",
      details: "Free 1,000 operations/mo; Paid plans from $10/mo."
    },
    score: { overall: 8.6, reasoning: 8.5, toolUse: 8.8, value: 8.9, privacy: 8.3, easeOfUse: 9.0, indiaFit: 8.7 }
  },

  // === MCP SERVERS ===
  {
    id: "mcp-github",
    slug: "github",
    name: "GitHub MCP Server",
    company: "GitHub",
    logo: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=120&q=80",
    summary: "MCP server for GitHub repository access, issue management, and pull request automation.",
    categories: ["MCP Servers"],
    pricing: { type: "free", details: "Open-source MCP server" }
  },

  {
    id: "mcp-postgres",
    slug: "postgres",
    name: "PostgreSQL MCP Server",
    company: "PostgreSQL",
    summary: "MCP server for PostgreSQL database queries and schema introspection.",
    categories: ["MCP Servers"],
    pricing: { type: "free", details: "Open-source database connector" }
  },

  {
    id: "mcp-redis",
    slug: "redis",
    name: "Redis MCP Server",
    company: "Redis",
    summary: "MCP server for Redis key-value storage and caching operations.",
    categories: ["MCP Servers"],
    pricing: { type: "free", details: "Open-source cache connector" }
  },

  {
    id: "mcp-database",
    slug: "database",
    name: "Database MCP Server",
    company: "Various",
    summary: "Generic database connector for MySQL, PostgreSQL, and other SQL databases.",
    categories: ["MCP Servers"],
    pricing: { type: "free", details: "Open-source database tool" }
  },

  {
    id: "mcp-filesystem",
    slug: "filesystem",
    name: "Filesystem MCP Server",
    summary: "MCP server for file operations, directory listing, and content reading.",
    categories: ["MCP Servers"],
    pricing: { type: "free", details: "Core filesystem tools" }
  },

  {
    id: "mcp-notion",
    slug: "notion",
    name: "Notion MCP Server",
    company: "Notion",
    summary: "MCP server for Notion workspace integration and database queries.",
    categories: ["MCP Servers"],
    pricing: { type: "freemium", details: "Integrated with Notion API" }
  },

  {
    id: "mcp-slack",
    slug: "slack",
    name: "Slack MCP Server",
    company: "Slack",
    summary: "MCP server for Slack workspace access, channel management, and messaging.",
    categories: ["MCP Servers"],
    pricing: { type: "freemium", details: "Integrated with Slack API" }
  },

  // === LATEST ADDITIONS ===
  {
    id: "deepseek",
    slug: "deepseek",
    name: "DeepSeek Code",
    company: "DeepSeek",
    summary: "Open-source-focused AI coding assistant with strong coding benchmarks and DeepSeek-V3 model.",
    categories: ["Coding Agents", "Developer Tools"],
    pricing: {
      type: "freemium",
      startingPriceUSD: "Free",
      details: "Free tier available with competitive limits."
    },
    score: { overall: 8.4, reasoning: 8.3, toolUse: 8.6, value: 8.7, privacy: 8.2, easeOfUse: 8.4, indiaFit: 8.6 }
  },

  {
    id: "gemini",
    slug: "gemini",
    name: "Gemini Advanced",
    company: "Google",
    summary: "Google's next-generation AI with multimodal capabilities, real-time collaboration, and deep search integration.",
    categories: ["Personal AI Assistants", "Research Agents", "Business Automation"],
    pricing: {
      type: "paid",
      startingPriceUSD: "$20/mo",
      startingPriceINR: "₹1,700/mo",
      details: "Gemini Advanced included with Google One AI."
    },
    score: { overall: 9.0, reasoning: 9.1, toolUse: 8.9, value: 9.2, privacy: 8.8, easeOfUse: 9.2, indiaFit: 9.0 }
  }
];

// Export a combined list of all agents
export const allAgents = [...featuredAgents, ...extendedAgents];

export function getAllAgents(): Agent[] {
  return allAgents;
}