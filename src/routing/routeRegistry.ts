// ATLAS P01: types live in types.ts; re-exported here so all existing
// `import { RouteRecord } from './routeRegistry.js'` imports keep working.
export type {
  RouteType,
  PublicationStatus,
  SitemapGroup,
  RouteRecord,
} from './types.js';
import type { RouteRecord } from './types.js';

// 1. Central Canonical Route Registry
// ATLAS P01: This is the single source of truth. Dynamic routes in
// routeResolver.ts validate slugs against entityResolvers — arbitrary slugs
// are no longer synthesized as published.
export const canonicalRoutes: Record<string, RouteRecord> = {
  // ATLAS P02 complete — /a/ and /tools/ migrated, MCP redirects fixed.
  // --- Master Pillars & Hubs ---
  '/': {
    id: 'home',
    path: '/',
    type: 'pillar',
    status: 'published',
    indexable: true,
    canonicalPath: '/',
    title: 'BestAIAgent.in - #1 AI Agent Directory, Rankings & India Pricing Index (2026)',
    description: 'India\'s premier independent AI agent evaluation registry. Benchmark latency, compare prices in INR (₹), and deploy top AI coding, voice, and workflow agents.',
    sitemapGroup: 'pages',
    view: 'home',
    updatedAt: '2026-07-23'
  },
  // ATLAS P01: directory hub pages (rendered client-side, must be canonical too)
  '/agents': {
    id: 'hub:agents',
    path: '/agents',
    type: 'directory',
    status: 'published',
    indexable: true,
    canonicalPath: '/agents',
    title: 'AI Agents Directory & Index - BestAIAgent.in',
    description: 'Browse the complete directory of evaluated AI agents. Filter by category, compare benchmarks, and review India pricing.',
    sitemapGroup: 'pages',
    view: 'home', // Treat agents directory as home for now
    updatedAt: '2026-07-23'
  },
  '/categories': {
    id: 'hub:categories',
    path: '/categories',
    type: 'directory',
    status: 'published',
    indexable: true,
    canonicalPath: '/categories',
    title: 'AI Agent Categories Directory - BestAIAgent.in',
    description: 'Explore all AI agent categories: coding, voice, customer support, sales, automation, frameworks, and MCP servers.',
    sitemapGroup: 'pages',
    view: 'home', // Treat categories directory as home for now
    updatedAt: '2026-07-23'
  },
  '/best-ai-agent': {
    id: 'pillar:best-ai-agent',
    path: '/best-ai-agent',
    type: 'pillar',
    status: 'published',
    indexable: true,
    canonicalPath: '/best-ai-agent',
    title: 'Best AI Agent 2026: Master Evaluation & Buying Guide - BestAIAgent.in',
    description: 'Definitive evaluation guide for top AI agents. Empirical latency benchmarks, tool use accuracy, security audits, and INR pricing models.',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },
  '/best-ai-agent-for-business': {
    id: 'pillar:business',
    path: '/best-ai-agent-for-business',
    type: 'pillar',
    status: 'published',
    indexable: true,
    canonicalPath: '/best-ai-agent-for-business',
    title: 'Best AI Agents for Business & SME Workflows (2026) - BestAIAgent.in',
    description: 'Top business AI agents for CRM, sales outreach, customer support, and administrative workflow automation in India.',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },
  '/best-ai-agent-for-coding': {
    id: 'pillar:coding',
    path: '/best-ai-agent-for-coding',
    type: 'pillar',
    status: 'published',
    indexable: true,
    canonicalPath: '/best-ai-agent-for-coding',
    title: 'Best AI Coding Agents (2026) - Cursor, Claude Code, Copilot & Windsurf',
    description: 'Comprehensive evaluation of top autonomous coding agents. Benchmark code quality, IDE context indexing, terminal execution, and pricing.',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },
  '/best-ai-agent-alternatives': {
    id: 'pillar:alternatives',
    path: '/best-ai-agent-alternatives',
    type: 'pillar',
    status: 'published',
    indexable: true,
    canonicalPath: '/best-ai-agent-alternatives',
    title: 'Best AI Agent Alternatives & Competitor Comparison Directory (2026)',
    description: 'Compare top alternatives to Cursor, ChatGPT, Claude, CrewAI, AutoGen, and LangGraph. Migration guides and pricing trade-offs.',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },
  '/best-ai-agents-for-automation': {
    id: 'pillar:automation',
    path: '/best-ai-agents-for-automation',
    type: 'pillar',
    status: 'published',
    indexable: true,
    canonicalPath: '/best-ai-agents-for-automation',
    title: 'Best AI Agents for Workflow Automation (2026) - BestAIAgent.in',
    description: 'Top workflow automation agents and visual orchestration builders including n8n, Flowise, Reclaim AI, and Dify.',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },
  '/best-ai-agent-frameworks': {
    id: 'pillar:frameworks',
    path: '/best-ai-agent-frameworks',
    type: 'pillar',
    status: 'published',
    indexable: true,
    canonicalPath: '/best-ai-agent-frameworks',
    title: 'Best AI Agent Frameworks (2026) - LangGraph, CrewAI, AutoGen & Pydantic AI',
    description: 'In-depth benchmark guide to multi-agent frameworks, open-source SDKs, state graph engines, and developer toolkits.',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },
  '/mcp-directory': {
    id: 'pillar:mcp-directory',
    path: '/mcp-directory',
    type: 'pillar',
    status: 'published',
    indexable: true,
    canonicalPath: '/mcp-directory',
    title: 'Model Context Protocol (MCP) Server Directory & Hub - BestAIAgent.in',
    description: 'The definitive directory of Model Context Protocol (MCP) servers. Connect Claude, Cursor, and custom agents to GitHub, Postgres, Slack, and Drive.',
    sitemapGroup: 'mcp',
    updatedAt: '2026-07-23'
  },
  '/mcp-servers': {
    id: 'pillar:mcp-servers',
    path: '/mcp-servers',
    type: 'pillar',
    status: 'published',
    indexable: true,
    canonicalPath: '/mcp-servers',
    title: 'Verified MCP Servers Hub (2026) - BestAIAgent.in',
    description: 'Explore verified open-source and enterprise MCP servers for database indexing, API integration, and file system automation.',
    sitemapGroup: 'mcp',
    updatedAt: '2026-07-23'
  },
  '/frameworks': {
    id: 'pillar:frameworks-list',
    path: '/frameworks',
    type: 'pillar',
    status: 'published',
    indexable: true,
    canonicalPath: '/frameworks',
    title: 'Open Source AI Agent Frameworks & SDKs Directory - BestAIAgent.in',
    description: 'Compare open source multi-agent frameworks: LangGraph, CrewAI, AutoGen, Flowise, Dify, and LlamaIndex.',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },
  '/rankings': {
    id: 'pillar:rankings',
    path: '/rankings',
    type: 'pillar',
    status: 'published',
    indexable: true,
    canonicalPath: '/rankings',
    title: 'Best AI Agent Leaderboards & Benchmark Rankings (2026) - BestAIAgent.in',
    description: 'Empirical rankings for AI coding agents, voice bots, and multi-agent frameworks based on latency, accuracy, and India fit.',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },
  '/pricing': {
    id: 'hub:pricing',
    path: '/pricing',
    type: 'pricing',
    status: 'published',
    indexable: true,
    canonicalPath: '/pricing',
    title: 'India AI Agent Pricing Index in INR (₹) - BestAIAgent.in',
    description: 'Compare monthly subscription fees, token API costs, free tiers, and estimated monthly budgets in Indian Rupees (₹).',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },
  '/reviews': {
    id: 'pillar:reviews',
    path: '/reviews',
    type: 'pillar',
    status: 'published',
    indexable: true,
    canonicalPath: '/reviews',
    title: 'AI Agent Reviews & Technical Audits Directory (2026) - BestAIAgent.in',
    description: 'Independent reviews and empirical test scores for evaluated AI agents, developer tools, and enterprise automation bots.',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },
  '/compare': {
    id: 'hub:compare',
    path: '/compare',
    type: 'pillar',
    status: 'published',
    indexable: true,
    canonicalPath: '/compare',
    title: 'AI Agent Head-to-Head Comparison Matrix (2026) - BestAIAgent.in',
    description: 'Compare top AI agents side-by-side. Benchmark reasoning speed, tool execution accuracy, security compliance, and pricing.',
    sitemapGroup: 'comparisons',
    updatedAt: '2026-07-23'
  },
  '/research': {
    id: 'hub:research',
    path: '/research',
    type: 'research',
    status: 'published',
    indexable: true,
    canonicalPath: '/research',
    title: 'AI Agent Market Intelligence & Benchmark Research Reports - BestAIAgent.in',
    description: 'In-depth empirical research, latency benchmarks, and enterprise AI adoption statistics across India and global markets.',
    sitemapGroup: 'research',
    updatedAt: '2026-07-23'
  },
  '/sitemap': {
    id: 'hub:sitemap',
    path: '/sitemap',
    type: 'governance',
    status: 'published',
    indexable: true,
    canonicalPath: '/sitemap',
    title: 'HTML Site Directory & Programmatic Knowledge Map - BestAIAgent.in',
    description: 'Complete HTML sitemap and knowledge index for BestAIAgent.in directory, category pillars, research reports, and comparison matrices.',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },

  // --- Governance & Editorial Pages ---
  '/about': {
    id: 'gov:about',
    path: '/about',
    type: 'governance',
    status: 'published',
    indexable: true,
    canonicalPath: '/about',
    title: 'About BestAIAgent.in - Independent AI Agent Evaluation Registry',
    description: 'Learn about India\'s premier independent AI agent research authority, evaluation methodology, and editorial mission.',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },
  '/authors': {
    id: 'hub:authors',
    path: '/authors',
    type: 'governance',
    status: 'published',
    indexable: true,
    canonicalPath: '/authors',
    title: 'Editorial Board & Technical Review Team - BestAIAgent.in',
    description: 'Meet our team of AI systems architects, software engineers, and security auditors who independently test and benchmark AI agents.',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },
  '/methodology': {
    id: 'gov:methodology',
    path: '/methodology',
    type: 'governance',
    status: 'published',
    indexable: true,
    canonicalPath: '/methodology',
    title: 'Empirical Testing Methodology & Scoring Framework - BestAIAgent.in',
    description: 'Discover how we test AI agents: latency measuring protocols, tool execution accuracy benchmarks, security audits, and INR pricing calculation.',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },
  '/editorial-policy': {
    id: 'gov:editorial-policy',
    path: '/editorial-policy',
    type: 'governance',
    status: 'published',
    indexable: true,
    canonicalPath: '/editorial-policy',
    title: 'Editorial Policy & Verification Standards - BestAIAgent.in',
    description: 'Our commitment to objective research, independence from vendor bias, AI-assisted content verification rules, and editorial integrity.',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },
  '/review-process': {
    id: 'gov:review-process',
    path: '/review-process',
    type: 'governance',
    status: 'published',
    indexable: true,
    canonicalPath: '/review-process',
    title: 'AI Agent Review Process & Benchmark Guidelines - BestAIAgent.in',
    description: 'Step-by-step walkthrough of how our engineering team evaluates agent reasoning, workspace context memory, and production reliability.',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },
  '/corrections': {
    id: 'gov:corrections',
    path: '/corrections',
    type: 'governance',
    status: 'published',
    indexable: true,
    canonicalPath: '/corrections',
    title: 'Corrections Policy & Fact-Checking Protocol - BestAIAgent.in',
    description: 'How we handle error reports, software update re-testing, price verification updates, and reader feedback.',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },
  '/privacy-policy': {
    id: 'gov:privacy-policy',
    path: '/privacy-policy',
    type: 'governance',
    status: 'published',
    indexable: true,
    canonicalPath: '/privacy-policy',
    title: 'Privacy Policy & DPDP Act 2023 Compliance - BestAIAgent.in',
    description: 'Our privacy standards, cookie policies, and compliance with the Digital Personal Data Protection (DPDP) Act of India.',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },
  '/terms': {
    id: 'gov:terms',
    path: '/terms',
    type: 'governance',
    status: 'published',
    indexable: true,
    canonicalPath: '/terms',
    title: 'Terms of Service - BestAIAgent.in',
    description: 'Terms and conditions for using BestAIAgent.in research directory, benchmarks, and interactive comparison engines.',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },
  '/affiliate-disclosure': {
    id: 'gov:affiliate-disclosure',
    path: '/affiliate-disclosure',
    type: 'governance',
    status: 'published',
    indexable: true,
    canonicalPath: '/affiliate-disclosure',
    title: 'Affiliate & Financial Transparency Disclosure - BestAIAgent.in',
    description: 'Complete transparency regarding our business model, affiliate partnerships, and strict firewall between commercial relationships and benchmark ratings.',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },
  '/contact': {
    id: 'gov:contact',
    path: '/contact',
    type: 'governance',
    status: 'published',
    indexable: true,
    canonicalPath: '/contact',
    title: 'Contact Editorial Office - BestAIAgent.in',
    description: 'Get in touch with our AI evaluation lab in Mumbai and Bangalore for tool submission, correction reports, or research inquiries.',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },
  '/knowledge-graph': {
    id: 'gov:knowledge-graph',
    path: '/knowledge-graph',
    type: 'governance',
    status: 'published',
    indexable: true,
    canonicalPath: '/knowledge-graph',
    title: 'Semantic AI Knowledge Graph & Entity Index - BestAIAgent.in',
    description: 'Interactive semantic entity graph mapping relationships between AI agents, frameworks, models, vector stores, and MCP tools.',
    sitemapGroup: 'pages',
    updatedAt: '2026-07-23'
  },

  // --- Category Hubs (/categories/[slug]) ---
  '/categories/coding-agents': {
    id: 'cat:coding-agents',
    path: '/categories/coding-agents',
    type: 'category',
    status: 'published',
    indexable: true,
    canonicalPath: '/categories/coding-agents',
    title: 'Best AI Coding Agents Directory & Benchmarks (2026) - BestAIAgent.in',
    description: 'Explore top autonomous coding agents for IDEs, terminal workflows, and full-stack software development.',
    sitemapGroup: 'categories',
    updatedAt: '2026-07-23'
  },
  '/categories/voice-bots': {
    id: 'cat:voice-bots',
    path: '/categories/voice-bots',
    type: 'category',
    status: 'published',
    indexable: true,
    canonicalPath: '/categories/voice-bots',
    title: 'Best Voice AI Agents & Telephony Bots (2026) - BestAIAgent.in',
    description: 'Sub-second latency voice bots supporting Hindi, Hinglish, Tamil, and English for customer support and inbound calls.',
    sitemapGroup: 'categories',
    updatedAt: '2026-07-23'
  },
  '/categories/orchestration': {
    id: 'cat:orchestration',
    path: '/categories/orchestration',
    type: 'category',
    status: 'published',
    indexable: true,
    canonicalPath: '/categories/orchestration',
    title: 'Best Multi-Agent Orchestration Frameworks (2026) - BestAIAgent.in',
    description: 'Frameworks and state machines for assembling collaborative multi-agent teams: LangGraph, CrewAI, AutoGen.',
    sitemapGroup: 'categories',
    updatedAt: '2026-07-23'
  },
  '/categories/business': {
    id: 'cat:business',
    path: '/categories/business',
    type: 'category',
    status: 'published',
    indexable: true,
    canonicalPath: '/categories/business',
    title: 'Business AI Agents Directory - BestAIAgent.in',
    description: 'AI agents for administrative tasks, sales pipelines, HR onboarding, and operational SME workflows.',
    sitemapGroup: 'categories',
    updatedAt: '2026-07-23'
  },
  '/categories/crm': {
    id: 'cat:crm',
    path: '/categories/crm',
    type: 'category',
    status: 'published',
    indexable: true,
    canonicalPath: '/categories/crm',
    title: 'Best CRM AI Agents (2026) - BestAIAgent.in',
    description: 'Automate lead qualification, sales activity logging, and client relationship pipelines in Salesforce, Zoho, and HubSpot.',
    sitemapGroup: 'categories',
    updatedAt: '2026-07-23'
  },
  '/categories/customer-support': {
    id: 'cat:customer-support',
    path: '/categories/customer-support',
    type: 'category',
    status: 'published',
    indexable: true,
    canonicalPath: '/categories/customer-support',
    title: 'Best Customer Support AI Agents (2026) - BestAIAgent.in',
    description: '24/7 customer support agents for WhatsApp, live chat, and voice helplines with DPDP compliance.',
    sitemapGroup: 'categories',
    updatedAt: '2026-07-23'
  },
  '/categories/sales': {
    id: 'cat:sales',
    path: '/categories/sales',
    type: 'category',
    status: 'published',
    indexable: true,
    canonicalPath: '/categories/sales',
    title: 'Best Sales & Outreach AI Agents (2026) - BestAIAgent.in',
    description: 'Automate prospect research, email sequencing, and meeting booking with autonomous sales agents.',
    sitemapGroup: 'categories',
    updatedAt: '2026-07-23'
  },
  '/categories/marketing': {
    id: 'cat:marketing',
    path: '/categories/marketing',
    type: 'category',
    status: 'published',
    indexable: true,
    canonicalPath: '/categories/marketing',
    title: 'Best Marketing AI Agents (2026) - BestAIAgent.in',
    description: 'Content generation, SEO research, social campaign automation, and ad creative optimization agents.',
    sitemapGroup: 'categories',
    updatedAt: '2026-07-23'
  },
  '/categories/research': {
    id: 'cat:research',
    path: '/categories/research',
    type: 'category',
    status: 'published',
    indexable: true,
    canonicalPath: '/categories/research',
    title: 'Best AI Agents for Deep Research & Analysis (2026) - BestAIAgent.in',
    description: 'Deep web research, document synthesis, competitive analysis, and academic literature review agents.',
    sitemapGroup: 'categories',
    updatedAt: '2026-07-23'
  },
  '/categories/automation': {
    id: 'cat:automation',
    path: '/categories/automation',
    type: 'category',
    status: 'published',
    indexable: true,
    canonicalPath: '/categories/automation',
    title: 'Workflow Automation & No-Code AI Builders - BestAIAgent.in',
    description: 'Visual flow engines, API trigger tools, and RPA bots for enterprise process automation.',
    sitemapGroup: 'categories',
    updatedAt: '2026-07-23'
  },

  // --- Agent Entity Pages (/agents/[slug]) ---
  '/agents/cursor': {
    id: 'agent:cursor',
    path: '/agents/cursor',
    type: 'agent',
    status: 'published',
    indexable: true,
    canonicalPath: '/agents/cursor',
    title: 'Cursor AI Review, Benchmarks & India Pricing (2026) - BestAIAgent.in',
    description: 'Technical audit of Cursor AI. Workspace context indexing, Composer multi-file editing, latency, and INR pricing (₹1,680/mo).',
    sitemapGroup: 'agents',
    updatedAt: '2026-07-23'
  },
  '/agents/claude-code': {
    id: 'agent:claude-code',
    path: '/agents/claude-code',
    type: 'agent',
    status: 'published',
    indexable: true,
    canonicalPath: '/agents/claude-code',
    title: 'Claude Code Agent Review, Terminal Execution & Benchmarks - BestAIAgent.in',
    description: 'In-depth review of Anthropic\'s Claude Code CLI agent. Multi-file refactoring, subshell execution, and cost analysis.',
    sitemapGroup: 'agents',
    updatedAt: '2026-07-23'
  },
  '/agents/chatgpt': {
    id: 'agent:chatgpt',
    path: '/agents/chatgpt',
    type: 'agent',
    status: 'published',
    indexable: true,
    canonicalPath: '/agents/chatgpt',
    title: 'ChatGPT Agent Mode Review & India Pricing (2026) - BestAIAgent.in',
    description: 'Evaluation of OpenAI\'s agentic capabilities, web canvas, memory, custom GPT workflows, and INR pricing.',
    sitemapGroup: 'agents',
    updatedAt: '2026-07-23'
  },
  '/agents/claude': {
    id: 'agent:claude',
    path: '/agents/claude',
    type: 'agent',
    status: 'published',
    indexable: true,
    canonicalPath: '/agents/claude',
    title: 'Claude 3.7 Sonnet & Artifacts Review - BestAIAgent.in',
    description: 'Full audit of Anthropic Claude. Hybrid reasoning, Computer Use API, system prompts, and benchmark scores.',
    sitemapGroup: 'agents',
    updatedAt: '2026-07-23'
  },
  '/agents/vapi': {
    id: 'agent:vapi',
    path: '/agents/vapi',
    type: 'agent',
    status: 'published',
    indexable: true,
    canonicalPath: '/agents/vapi',
    title: 'Vapi AI Review: Voice Bot Latency & Hinglish Test (2026) - BestAIAgent.in',
    description: 'Technical review of Vapi.ai voice infrastructure. Sub-second audio latency, telephony integration, and INR costs.',
    sitemapGroup: 'agents',
    updatedAt: '2026-07-23'
  },
  '/agents/crewai': {
    id: 'agent:crewai',
    path: '/agents/crewai',
    type: 'agent',
    status: 'published',
    indexable: true,
    canonicalPath: '/agents/crewai',
    title: 'CrewAI Framework Review & Multi-Agent Benchmarks - BestAIAgent.in',
    description: 'Audit of CrewAI open-source framework. Role-based orchestration, memory delegation, and production deployment.',
    sitemapGroup: 'agents',
    updatedAt: '2026-07-23'
  },
  '/agents/yellow-ai': {
    id: 'agent:yellow-ai',
    path: '/agents/yellow-ai',
    type: 'agent',
    status: 'published',
    indexable: true,
    canonicalPath: '/agents/yellow-ai',
    title: 'Yellow.ai Enterprise WhatsApp Bot Review & Pricing - BestAIAgent.in',
    description: 'Review of Yellow.ai conversational bot platform. Indian enterprise WhatsApp API support, UPI payments, and DPDP compliance.',
    sitemapGroup: 'agents',
    updatedAt: '2026-07-23'
  },
  '/agents/flowise-ai': {
    id: 'agent:flowise-ai',
    path: '/agents/flowise-ai',
    type: 'agent',
    status: 'published',
    indexable: true,
    canonicalPath: '/agents/flowise-ai',
    title: 'Flowise AI Review: No-Code Visual RAG & Flow Engine - BestAIAgent.in',
    description: 'Technical evaluation of Flowise. Open-source drag-and-drop orchestration, vector store connectors, and self-hosting.',
    sitemapGroup: 'agents',
    updatedAt: '2026-07-23'
  },
  '/agents/reclaim-ai': {
    id: 'agent:reclaim-ai',
    path: '/agents/reclaim-ai',
    type: 'agent',
    status: 'published',
    indexable: true,
    canonicalPath: '/agents/reclaim-ai',
    title: 'Reclaim AI Review: Autonomous Calendar & Time Protection - BestAIAgent.in',
    description: 'Audit of Reclaim AI scheduling agent. Habit protection, meeting buffer management, and Google Calendar sync.',
    sitemapGroup: 'agents',
    updatedAt: '2026-07-23'
  },
  '/agents/n8n': {
    id: 'agent:n8n',
    path: '/agents/n8n',
    type: 'agent',
    status: 'published',
    indexable: true,
    canonicalPath: '/agents/n8n',
    title: 'n8n AI Workflows Review: Open Source Automation Hub - BestAIAgent.in',
    description: 'Review of n8n AI agent nodes, self-hosted automation workflows, webhook triggers, and enterprise integration.',
    sitemapGroup: 'agents',
    updatedAt: '2026-07-23'
  },
  '/agents/relevance-ai': {
    id: 'agent:relevance-ai',
    path: '/agents/relevance-ai',
    type: 'agent',
    status: 'published',
    indexable: true,
    canonicalPath: '/agents/relevance-ai',
    title: 'Relevance AI Review: No-Code B2B Agent Workforce - BestAIAgent.in',
    description: 'Evaluation of Relevance AI platform for building B2B research, sales, and content workforce pipelines.',
    sitemapGroup: 'agents',
    updatedAt: '2026-07-23'
  },
  '/agents/langgraph': {
    id: 'agent:langgraph',
    path: '/agents/langgraph',
    type: 'agent',
    status: 'published',
    indexable: true,
    canonicalPath: '/agents/langgraph',
    title: 'LangGraph Review: Statechart Multi-Agent Engine - BestAIAgent.in',
    description: 'Technical deep dive into LangGraph state machines, cyclical agent workflows, human-in-the-loop controls, and LangSmith.',
    sitemapGroup: 'agents',
    updatedAt: '2026-07-23'
  },
  '/agents/autogen': {
    id: 'agent:autogen',
    path: '/agents/autogen',
    type: 'agent',
    status: 'published',
    indexable: true,
    canonicalPath: '/agents/autogen',
    title: 'Microsoft AutoGen Review & Multi-Agent Benchmarks - BestAIAgent.in',
    description: 'Audit of Microsoft AutoGen. Conversational multi-agent framework, code execution sandboxes, and enterprise fit.',
    sitemapGroup: 'agents',
    updatedAt: '2026-07-23'
  },
  '/agents/windsurf': {
    id: 'agent:windsurf',
    path: '/agents/windsurf',
    type: 'agent',
    status: 'published',
    indexable: true,
    canonicalPath: '/agents/windsurf',
    title: 'Windsurf IDE (Codeium) Review & Benchmarks - BestAIAgent.in',
    description: 'Review of Windsurf IDE agent cascade system, real-time code context indexing, and developer productivity scores.',
    sitemapGroup: 'agents',
    updatedAt: '2026-07-23'
  },
  '/agents/retell-ai': {
    id: 'agent:retell-ai',
    path: '/agents/retell-ai',
    type: 'agent',
    status: 'published',
    indexable: true,
    canonicalPath: '/agents/retell-ai',
    title: 'Retell AI Voice Bot Review & Telephony Infrastructure - BestAIAgent.in',
    description: 'Audit of Retell AI voice engine. Conversation latency benchmarks, websockets API, and regional accent performance.',
    sitemapGroup: 'agents',
    updatedAt: '2026-07-23'
  },

  // --- Comparison Pages (/compare/[slug]) ---
  '/compare/cursor-vs-copilot': {
    id: 'cmp:cursor-vs-copilot',
    path: '/compare/cursor-vs-copilot',
    type: 'comparison',
    status: 'published',
    indexable: true,
    canonicalPath: '/compare/cursor-vs-copilot',
    title: 'Cursor AI vs GitHub Copilot: Head-to-Head Benchmark (2026) - BestAIAgent.in',
    description: 'Empirical comparison between Cursor AI and GitHub Copilot. Multi-file edits, indexing speed, IDE integration, and pricing.',
    sitemapGroup: 'comparisons',
    updatedAt: '2026-07-23'
  },
  '/compare/chatgpt-vs-claude': {
    id: 'cmp:chatgpt-vs-claude',
    path: '/compare/chatgpt-vs-claude',
    type: 'comparison',
    status: 'published',
    indexable: true,
    canonicalPath: '/compare/chatgpt-vs-claude',
    title: 'ChatGPT vs Claude 3.7 Sonnet: Agent Benchmark Test (2026) - BestAIAgent.in',
    description: 'Compare OpenAI ChatGPT (GPT-4o) vs Anthropic Claude 3.7 Sonnet. Reasoning tests, code generation, pricing, and API speeds.',
    sitemapGroup: 'comparisons',
    updatedAt: '2026-07-23'
  },
  '/compare/crewai-vs-autogen': {
    id: 'cmp:crewai-vs-autogen',
    path: '/compare/crewai-vs-autogen',
    type: 'comparison',
    status: 'published',
    indexable: true,
    canonicalPath: '/compare/crewai-vs-autogen',
    title: 'CrewAI vs AutoGen: Multi-Agent Framework Battle - BestAIAgent.in',
    description: 'Compare CrewAI vs Microsoft AutoGen. Developer experience, Python architecture, memory delegation, and production readiness.',
    sitemapGroup: 'comparisons',
    updatedAt: '2026-07-23'
  },
  '/compare/langgraph-vs-crewai': {
    id: 'cmp:langgraph-vs-crewai',
    path: '/compare/langgraph-vs-crewai',
    type: 'comparison',
    status: 'published',
    indexable: true,
    canonicalPath: '/compare/langgraph-vs-crewai',
    title: 'LangGraph vs CrewAI: Which Framework Should You Choose? - BestAIAgent.in',
    description: 'State graph control vs role-based agent crews. Benchmarks, memory persistence, and enterprise scalability analysis.',
    sitemapGroup: 'comparisons',
    updatedAt: '2026-07-23'
  },
  '/compare/vapi-vs-retell': {
    id: 'cmp:vapi-vs-retell',
    path: '/compare/vapi-vs-retell',
    type: 'comparison',
    status: 'published',
    indexable: true,
    canonicalPath: '/compare/vapi-vs-retell',
    title: 'Vapi AI vs Retell AI: Voice Bot Sub-Second Latency Test - BestAIAgent.in',
    description: 'Head-to-head voice AI test. Audio response latency, Hinglish dialect accuracy, phone trunking, and per-minute costs.',
    sitemapGroup: 'comparisons',
    updatedAt: '2026-07-23'
  },
  '/compare/flowise-vs-dify': {
    id: 'cmp:flowise-vs-dify',
    path: '/compare/flowise-vs-dify',
    type: 'comparison',
    status: 'published',
    indexable: true,
    canonicalPath: '/compare/flowise-vs-dify',
    title: 'Flowise AI vs Dify: Open Source Visual Agent Builders - BestAIAgent.in',
    description: 'Compare drag-and-drop orchestration tools Flowise AI and Dify. RAG pipelines, model support, and self-hosting options.',
    sitemapGroup: 'comparisons',
    updatedAt: '2026-07-23'
  },

  // --- MCP Servers (/mcp/servers/[slug]) ---
  '/mcp/servers/github': {
    id: 'mcp:github',
    path: '/mcp/servers/github',
    type: 'mcp-server',
    status: 'published',
    indexable: true,
    canonicalPath: '/mcp/servers/github',
    title: 'GitHub MCP Server: Configuration & Setup Guide - BestAIAgent.in',
    description: 'Connect Claude and Cursor to GitHub using official MCP server. Manage pull requests, issues, and repo search.',
    sitemapGroup: 'mcp',
    updatedAt: '2026-07-23'
  },
  '/mcp/servers/postgres': {
    id: 'mcp:postgres',
    path: '/mcp/servers/postgres',
    type: 'mcp-server',
    status: 'published',
    indexable: true,
    canonicalPath: '/mcp/servers/postgres',
    title: 'PostgreSQL MCP Server: Read/Write Database Integration - BestAIAgent.in',
    description: 'Query Postgres databases safely via MCP protocol. Schema inspection, read-only guards, and sample configurations.',
    sitemapGroup: 'mcp',
    updatedAt: '2026-07-23'
  },
  '/mcp/servers/slack': {
    id: 'mcp:slack',
    path: '/mcp/servers/slack',
    type: 'mcp-server',
    status: 'published',
    indexable: true,
    canonicalPath: '/mcp/servers/slack',
    title: 'Slack MCP Server: Workspace Integration & Channel Reader - BestAIAgent.in',
    description: 'Integrate Claude and local agents into Slack channels via MCP protocol. Post updates, read threads, and search messages.',
    sitemapGroup: 'mcp',
    updatedAt: '2026-07-23'
  },
  '/mcp/servers/filesystem': {
    id: 'mcp:filesystem',
    path: '/mcp/servers/filesystem',
    type: 'mcp-server',
    status: 'published',
    indexable: true,
    canonicalPath: '/mcp/servers/filesystem',
    title: 'Local Filesystem MCP Server Setup & Security Controls - BestAIAgent.in',
    description: 'Secure local filesystem access for AI desktop assistants. Allowed directory boundaries and file permission guards.',
    sitemapGroup: 'mcp',
    updatedAt: '2026-07-23'
  },
  '/mcp/servers/notion': {
    id: 'mcp:notion',
    path: '/mcp/servers/notion',
    type: 'mcp-server',
    status: 'published',
    indexable: true,
    canonicalPath: '/mcp/servers/notion',
    title: 'Notion MCP Server Setup & Integration Guide - BestAIAgent.in',
    description: 'Connect Claude and AI agents to Notion workspaces via MCP protocol. Read/write pages, databases, and search workspace content.',
    sitemapGroup: 'mcp',
    updatedAt: '2026-07-23'
  },
  '/mcp/servers/excel': {
    id: 'mcp:excel',
    path: '/mcp/servers/excel',
    type: 'mcp-server',
    status: 'published',
    indexable: true,
    canonicalPath: '/mcp/servers/excel',
    title: 'Excel MCP Server Setup & Spreadsheet Automation - BestAIAgent.in',
    description: 'Programmatic Excel and spreadsheet operations via MCP server. Read, write, and analyze spreadsheet data with AI agents.',
    sitemapGroup: 'mcp',
    updatedAt: '2026-07-23'
  },
  '/mcp/servers/shopify': {
    id: 'mcp:shopify',
    path: '/mcp/servers/shopify',
    type: 'mcp-server',
    status: 'published',
    indexable: true,
    canonicalPath: '/mcp/servers/shopify',
    title: 'Shopify MCP Server Setup & E-Commerce Integration - BestAIAgent.in',
    description: 'Connect AI agents to Shopify stores via MCP protocol. Manage products, orders, customers, and inventory programmatically.',
    sitemapGroup: 'mcp',
    updatedAt: '2026-07-23'
  },

  // --- Research Reports (/research/[slug]) ---
  '/research/state-of-ai-agents-india-2026': {
    id: 'research:india-2026',
    path: '/research/state-of-ai-agents-india-2026',
    type: 'research',
    status: 'published',
    indexable: true,
    canonicalPath: '/research/state-of-ai-agents-india-2026',
    title: 'State of AI Agents in India (2026) Market Research Report - BestAIAgent.in',
    description: 'Empirical industry report analyzing enterprise AI agent adoption, DPDP Act compliance, local cloud nodes, and ROI across Indian tech centers.',
    sitemapGroup: 'research',
    updatedAt: '2026-07-23'
  },
  '/research/voice-latency-report': {
    id: 'research:voice-latency',
    path: '/research/voice-latency-report',
    type: 'research',
    status: 'published',
    indexable: true,
    canonicalPath: '/research/voice-latency-report',
    title: 'Sub-Second Voice Bot Latency Benchmark Report - BestAIAgent.in',
    description: 'Benchmark measuring real audio response delay across Vapi, Retell, Bland AI, and regional voice engines under various network conditions.',
    sitemapGroup: 'research',
    updatedAt: '2026-07-23'
  }
};

// 2. Legacy Server-Side 301 Redirect Registry
// ATLAS P02 will migrate /a/ and /tools/ references and fix the wrong MCP
// redirects (notion→slack, excel→filesystem, shopify→github).
export const legacyRedirects: Record<string, string> = {
  // Legacy /tools/ to /agents/ entity mapping
  '/tools/cursor': '/agents/cursor',
  '/tools/cursor-ai': '/agents/cursor',
  '/tools/claude-code': '/agents/claude-code',
  '/tools/chatgpt': '/agents/chatgpt',
  '/tools/claude': '/agents/claude',
  '/tools/vapi': '/agents/vapi',
  '/tools/vapi-ai': '/agents/vapi',
  '/tools/crewai': '/agents/crewai',
  '/tools/yellow-ai': '/agents/yellow-ai',
  '/tools/flowise': '/agents/flowise-ai',
  '/tools/flowise-ai': '/agents/flowise-ai',
  '/tools/reclaim-ai': '/agents/reclaim-ai',
  '/tools/n8n': '/agents/n8n',
  '/tools/relevance-ai': '/agents/relevance-ai',
  '/tools/langgraph': '/agents/langgraph',
  '/tools/autogen': '/agents/autogen',
  '/tools/windsurf': '/agents/windsurf',
  '/tools/retell-ai': '/agents/retell-ai',

  // Trailing slash legacy /tools/
  '/tools/cursor/': '/agents/cursor',
  '/tools/claude-code/': '/agents/claude-code',
  '/tools/chatgpt/': '/agents/chatgpt',
  '/tools/vapi/': '/agents/vapi',
  '/tools/crewai/': '/agents/crewai',
  '/tools/yellow-ai/': '/agents/yellow-ai',

  // Legacy /a/ routes
  '/a/best-ai-agent/reviews/chatgpt': '/agents/chatgpt',
  '/a/best-ai-agent/reviews/claude': '/agents/claude',
  '/a/best-ai-agent/reviews/cursor': '/agents/cursor',
  '/a/best-ai-agent/reviews/vapi': '/agents/vapi',
  '/a/best-ai-agent/reviews/crewai': '/agents/crewai',

  // Root MCP server legacy consolidation
  // ATLAS P02: fix these — redirects now point to semantically correct entities
  '/notion-server': '/mcp/servers/notion',
  '/excel-server': '/mcp/servers/excel',
  '/shopify-server': '/mcp/servers/shopify',

  // Keyword overlap consolidation
  '/best-ai-agent-for-crm': '/categories/crm',
  '/ai-agents-for-crm': '/categories/crm',
  '/best-ai-agent-for-sales': '/categories/sales',
  '/ai-agents-for-sales': '/categories/sales',
  '/best-ai-agent-for-marketing': '/categories/marketing',
  '/ai-agents-for-marketing': '/categories/marketing',
  '/glossary': '/sitemap',
  '/glossary-hub': '/sitemap',
  '/pricing-hub': '/pricing',
  '/pricing-intelligence': '/pricing',
  // Sitemap aliases
  '/sitemap.xml': '/sitemap-index.xml',
  '/sitemap-indexed.xml': '/sitemap-index.xml',
};
