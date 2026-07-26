/**
 * Phase C — Expanded Agent Registry
 * 
 * Extended agent directory for Content OS content generation.
 * Total: 50+ agents for production scale
 */

import type { Agent } from './agents';

// Re-export base agents
export { featuredAgents } from './agents';

/**
 * Extended agent registry with comprehensive coverage
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
      details: "Free for individuals; Pro $40/mo; Teams $80/user/mo."
    },
    score: { overall: 9.7, reasoning: 9.6, toolUse: 9.8, value: 9.5, privacy: 9.0, easeOfUse: 9.7, indiaFit: 9.6, evidenceQuality: 96 },
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
      details: "Free tier; Pro $20/mo; Team $25/user/mo."
    },
    score: { overall: 9.6, reasoning: 9.8, toolUse: 9.7, value: 9.3, privacy: 9.2, easeOfUse: 9.5, indiaFit: 9.1, evidenceQuality: 95 },
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
    score: { overall: 9.2, reasoning: 9.0, toolUse: 9.4, value: 9.1, privacy: 9.0, easeOfUse: 9.0, indiaFit: 9.2, evidenceQuality: 92 },
    deployment: ["API", "Web Dashboard", "Mobile SDK"],
    integrations: ["Twilio", "Exotel", "Salesforce", "Zapier"],
    openSource: false,
    testingDate: "2026-07-15",
    updatedAt: "2026-07-20",
    knownLimitation: "Quality depends on telephony provider integration.",
    reviewUrl: "/agents/retell-ai/",
    officialUrl: "https://retell.ai",
    featured: true,
    trending: true
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
    score: { overall: 8.5, reasoning: 8.3, toolUse: 8.6, value: 8.9, privacy: 8.4, easeOfUse: 8.5, indiaFit: 9.7, evidenceQuality: 88 },
    deployment: ["Web", "Mobile App", "API"],
    integrations: ["WhatsApp Business", "CRM integrations"],
    openSource: false,
    testingDate: "2026-07-11",
    updatedAt: "2026-07-20",
    knownLimitation: "Regional network quality affects call reliability.",
    reviewUrl: "/agents/fenix/",
    officialUrl: "https://fenix.ai"
  },

  // === RESEARCH AGENTS ===
  {
    id: "you.com",
    slug: "you.com",
    name: "You.com AI Research",
    company: "You.com",
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    summary: "Research-first search companion that synthesizes answers from multiple sources with live citations.",
    bestFor: ["Research synthesis", "Source verification", "Multi-perspective analysis"],
    categories: ["Research Agents", "Personal AI Assistants"],
    pricing: {
      type: "freemium",
      startingPriceUSD: "$10/mo",
      startingPriceINR: "₹800/mo",
      details: "Free tier; Pro $10/mo with advanced features."
    },
    score: { overall: 8.7, reasoning: 8.5, toolUse: 8.8, value: 9.0, privacy: 9.2, easeOfUse: 8.6, indiaFit: 8.8, evidenceQuality: 90 },
    deployment: ["Web", "iOS/Android", "Browser Extension"],
    integrations: ["Google Search", "Wikipedia", "Academic Papers"],
    openSource: false,
    testingDate: "2026-07-16",
    updatedAt: "2026-07-22",
    knownLimitation: "May surface paywalled content behind subscriptions.",
    reviewUrl: "/agents/you-com/",
    officialUrl: "https://you.com"
  },

  // === WORKFLOW AUTOMATION ===
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
    score: { overall: 9.1, reasoning: 9.0, toolUse: 9.2, value: 9.5, privacy: 9.4, easeOfUse: 8.8, indiaFit: 9.1, evidenceQuality: 91 },
    deployment: ["Self-hosted", "Cloud", "Docker"],
    integrations: ["Slack", "Discord", "GitHub", "Google Drive", "Airtable"],
    openSource: true,
    testingDate: "2026-07-14",
    updatedAt: "2026-07-22",
    knownLimitation: "Large workflows may require significant server resources.",
    reviewUrl: "/agents/n8n/",
    officialUrl: "https://n8n.io"
  },

  // === MCP SERVERS ===
  {
    id: "mcp-postgres",
    slug: "postgres",
    name: "PostgreSQL MCP Server",
    company: "PostgreSQL",
    logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=120&q=80",
    summary: "MCP server for PostgreSQL database queries and schema introspection.",
    bestFor: ["Database queries", "Schema exploration", "Data analysis"],
    categories: ["MCP Servers"],
    pricing: { type: "free", details: "Open-source MCP server" },
    score: { overall: 9.4, reasoning: 9.3, toolUse: 9.5, value: 9.6, privacy: 9.7, easeOfUse: 9.0, indiaFit: 9.4, evidenceQuality: 92 },
    deployment: ["Self-hosted", "Docker"],
    integrations: ["Python", "Node.js", "SQL"],
    openSource: true,
    testingDate: "2026-07-20",
    updatedAt: "2026-07-21",
    knownLimitation: "Requires PostgreSQL installation.",
    reviewUrl: "/mcp/postgres",
    officialUrl: "https://www.postgresql.org"
  },

  {
    id: "mcp-redis",
    slug: "redis",
    name: "Redis MCP Server",
    company: "Redis",
    summary: "MCP server for Redis key-value storage and caching operations.",
    bestFor: ["Cache operations", "Session storage", "Key-value lookups"],
    categories: ["MCP Servers"],
    pricing: { type: "open_source", details: "Open-source cache connector" },
    score: { overall: 9.0, reasoning: 8.8, toolUse: 9.2, value: 9.3, privacy: 9.1, easeOfUse: 8.9, indiaFit: 8.7, evidenceQuality: 85 },
    deployment: ["Self-hosted", "Cloud"],
    integrations: ["Node.js", "Python", "Go"],
    openSource: true,
    testingDate: "2026-07-20",
    updatedAt: "2026-07-21",
    knownLimitation: "Memory constraints on large datasets.",
    reviewUrl: "/mcp/redis/",
    officialUrl: "https://redis.io"
  },

  {
    id: "mcp-notion",
    slug: "notion",
    name: "Notion MCP Server",
    company: "Notion",
    summary: "MCP server for Notion workspace integration and database queries.",
    bestFor: ["Workspace management", "Database queries", "Content retrieval"],
    categories: ["MCP Servers"],
    pricing: { type: "freemium", details: "Integrated with Notion API" },
    score: { overall: 8.8, reasoning: 8.6, toolUse: 9.0, value: 8.9, privacy: 8.5, easeOfUse: 9.2, indiaFit: 8.8, evidenceQuality: 84 },
    deployment: ["API", "Web"],
    integrations: ["Notion API", "Webhooks"],
    openSource: false,
    testingDate: "2026-07-20",
    updatedAt: "2026-07-21",
    knownLimitation: "Rate limited on free tier.",
    reviewUrl: "/mcp/notion/",
    officialUrl: "https://notion.so"
  }
];

// Export a combined list of all agents (base + expanded)
// Combine base and extended agents
import { featuredAgents } from './agents';

export const expandedAgentList: Agent[] = [
  ...featuredAgents,
  ...extendedAgents
];

export function getExpandedAgents(): Agent[] {
  return expandedAgentList;
}