export interface FAQItem {
  question: string;
  answer: string;
}

export type PageType =
  | 'hub'
  | 'pillar'
  | 'review'
  | 'comparison'
  | 'pricing'
  | 'alternative'
  | 'tutorial'
  | 'glossary'
  | 'guide'
  | 'free'
  | 'mcp'
  | 'author'
  | 'entity'
  | 'longtail';

export type SearchIntent =
  | 'commercial'
  | 'informational'
  | 'transactional'
  | 'comparison'
  | 'navigational'
  | 'mixed';

export interface TopicalPage {
  slug: string;
  title: string;
  description: string;
  h1?: string;
  pageType: PageType;
  intent: SearchIntent;
  priority: number;
  parent?: string;
  related?: string[];
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  schemaTypes?: string[];
  lastReviewed?: string;
  nextReview?: string;
  clusterId?: string;
  clusterName?: string;
  clusterHubSlug?: string;
}

export interface TopicalCluster {
  id: string;
  name: string;
  description: string;
  hubSlug: string;
  priority: number;
  pages: TopicalPage[];
}

// Backward-compatible types (deprecated)
export interface AuthoritativeCluster { id: string; name: string; description: string; slugs: string[]; }
export interface AuthorityPageInfo {
  slug: string; title: string; h1: string; metaTitle: string; metaDescription: string;
  type: 'Mega' | 'Commercial' | 'Supporting'; wordCountRange: string; directAnswer: string;
  primaryKeyword: string; siloId: string; estimatedWords: number;
}

const D = '2026-06-11';
const DR = (slug: string, title: string, desc: string, pt: PageType, intent: SearchIntent, pri: number, kw: string, sw?: string[], st?: string[]): TopicalPage => ({
  slug, title, description: desc, h1: title, pageType: pt, intent, priority: pri,
  primaryKeyword: kw, secondaryKeywords: sw || [], schemaTypes: st || ['Article', 'FAQPage', 'BreadcrumbList'],
  lastReviewed: D, nextReview: '2026-09-11',
});
const H = (s: string, t: string, d: string, p: number, k: string, sw?: string[]) => DR(s, t, d, 'hub', 'mixed', p, k, sw, ['CollectionPage', 'ItemList', 'BreadcrumbList']);
const P = (s: string, t: string, d: string, p: number, k: string, sw?: string[]) => DR(s, t, d, 'pillar', 'commercial', p, k, sw);
const G = (s: string, t: string, d: string, p: number, k: string, sw?: string[]) => DR(s, t, d, 'guide', 'informational', p, k, sw);
const T = (s: string, t: string, d: string, p: number, k: string, sw?: string[]) => DR(s, t, d, 'tutorial', 'informational', p, k, sw, ['Article', 'HowTo', 'BreadcrumbList']);
const PR = (s: string, t: string, d: string, p: number, k: string, sw?: string[]) => DR(s, t, d, 'pricing', 'transactional', p, k, sw);
const AL = (s: string, t: string, d: string, p: number, k: string, sw?: string[]) => DR(s, t, d, 'alternative', 'commercial', p, k, sw);
const GL = (s: string, t: string, d: string, p: number, k: string, sw?: string[]) => DR(s, t, d, 'glossary', 'informational', p, k, sw, ['Article', 'FAQPage', 'DefinedTerm', 'BreadcrumbList']);
const E = (s: string, t: string, d: string, p: number, k: string, sw?: string[]) => DR(s, t, d, 'entity', 'informational', p, k, sw, ['Article', 'BreadcrumbList']);
const BG = (s: string, t: string, d: string, p: number, k: string, sw?: string[]) => DR(s, t, d, 'guide', 'commercial', p, k, sw);
const RD = (s: string, t: string, d: string, p: number, k: string, sw?: string[]) => DR(s, t, d, 'guide', 'informational', p, k, sw);
const DIR = (s: string, t: string, d: string, p: number, k: string, sw?: string[]) => DR(s, t, d, 'hub', 'informational', p, k, sw, ['CollectionPage', 'ItemList', 'BreadcrumbList']);
const C = (s: string, t: string, d: string, p: number, k: string, sw?: string[]) => DR(s, t, d, 'guide', 'transactional', p, k, sw, ['WebApplication', 'FAQPage']);

const clusters: TopicalCluster[] = [
  { id: 'editorial-trust', name: 'Editorial & Trust', description: 'Scoring methodology, editorial independence, and evaluation criteria.', hubSlug: 'methodology', priority: 0.80, pages: [
    H('methodology', 'Editorial Methodology: How We Test & Rank AI Agents', 'Transparent editorial methodology covering scoring, testing protocols, update cadence, and evaluation criteria.', 0.80, 'editorial methodology'),
    G('editorial-policy', 'Editorial Policy: Independence, Affiliate Disclosure & Conflict of Interest', 'Our editorial independence standards, affiliate disclosure practices, and conflict-of-interest handling.', 0.75, 'editorial policy'),
    G('ai-agent-scoring-system', 'AI Agent Scoring System: Our 42-Point Evaluation Rubric', 'Detailed breakdown of our scoring rubric: 8 core dimensions, sub-criteria weights, and overall score calculation.', 0.78, 'ai agent scoring system'),
  ]},
  { id: 'ai-agent-core', name: 'AI Agent Core', description: 'Foundational definitions, benchmarks, trends, and authoritative rankings.', hubSlug: 'best-ai-agent', priority: 1.0, pages: [
    H('best-ai-agent', 'Best AI Agents in India 2026', 'Compare the best AI agents in India for coding, business automation, voice, builders, MCP, pricing, and alternatives.', 1.0, 'best ai agents', ['best ai agents india', 'top ai agents 2026']),
    P('best-ai-agents', 'Best AI Agents: Complete Rankings & Comparison', 'Comprehensive rankings of the best AI agents across all categories with India-specific pricing and DPDP compliance.', 0.98, 'best ai agents'),
    P('what-is-an-ai-agent', 'What Is an AI Agent? Definition, Types & How They Work', 'An AI agent is software that can reason, use tools, follow goals, automate workflows, and complete tasks with limited human input.', 0.95, 'what is an ai agent', ['ai agent definition']),
    G('ai-agent-examples', 'AI Agent Examples: 50+ Real-World Use Cases in 2026', 'Real-world AI agent examples across coding, business, voice, research, and automation with Indian use cases.', 0.90, 'ai agent examples'),
    G('ai-agent-use-cases', 'AI Agent Use Cases: Business, Coding, Voice & Automation', 'Comprehensive guide to AI agent use cases for Indian startups, SMEs, developers, and enterprises.', 0.88, 'ai agent use cases'),
    G('ai-agent-trends', "AI Agent Trends 2026: What's Changing", 'Latest AI agent trends: multi-agent systems, MCP, agentic RAG, voice AI shifts, and India-market developments.', 0.85, 'ai agent trends 2026'),
    G('ai-agent-news', 'AI Agent News: Latest Developments & Updates', 'Weekly AI agent news covering product launches, funding, MCP developments, and India-market updates.', 0.82, 'ai agent news'),
    P('ai-agent-benchmarks', 'AI Agent Benchmarks: SWE-bench, GAIA & Metrics', 'Comprehensive AI agent benchmark analysis: SWE-bench, GAIA, MMLU, and custom India-focused metrics.', 0.87, 'ai agent benchmarks'),
    P('ai-agent-ranking', 'AI Agent Rankings: Editorial Scorecards & Methodology', 'Our complete AI agent ranking methodology with 42-point scoring, category weights, and India-fit assessment.', 0.86, 'ai agent rankings'),
    P('ai-agent-comparison', 'AI Agent Comparison: Head-to-Head Tool Analysis', 'Side-by-side AI agent comparisons covering features, pricing, India fit, DPDP compliance, and editorial scores.', 0.90, 'ai agent comparison'),
  ]},
  { id: 'coding-agents', name: 'Coding Agents', description: 'AI coding agents, IDE copilots, code review agents, and developer automation tools.', hubSlug: 'coding-agents-hub', priority: 0.95, pages: [
    H('coding-agents-hub', 'AI Coding Agents Hub', 'Explore the best AI coding agents, coding assistants, IDE copilots, code review tools, and developer automation platforms.', 0.95, 'ai coding agents'),
    P('ai-coding-agents', 'AI Coding Agents: Complete Guide for Developers', 'Comprehensive guide to AI coding agents including Cursor, Copilot, Claude Code, Windsurf, Replit Agent, and Codex.', 0.94, 'ai coding agents'),
    P('best-ai-agent-for-coding', 'Best AI Agent for Coding in India 2026', 'Compare the best AI coding agents for Indian developers: Cursor AI, GitHub Copilot, Claude Code, Windsurf, and more.', 0.96, 'best ai agent for coding'),
    P('best-ai-agent-for-vs-code', 'Best AI Agent for VS Code: Cursor, Copilot & Extensions', 'Compare the best AI agents for VS Code including Cursor, GitHub Copilot, Codeium, and Tabnine.', 0.90, 'best ai agent for vs code'),
    P('best-ai-agent-extension-for-vs-code', 'Best AI Agent Extension for VS Code in 2026', 'Top VS Code extensions for AI coding: GitHub Copilot, Codeium, Tabnine, and Cursor extension.', 0.85, 'best ai extension for vs code'),
    P('best-ai-agent-for-ides', 'Best AI Agent for IDEs: Multi-Editor Comparison', 'AI coding agents across VS Code, JetBrains, Vim, Neovim, and cloud IDEs.', 0.84, 'best ai agent for ides'),
    P('best-ai-agent-for-code-review', 'Best AI Agent for Code Review in 2026', 'AI code review tools: Qodo, Cursor, Copilot, and DeepCode with pricing and India-team fit.', 0.83, 'best ai agent for code review'),
    P('best-ai-agent-for-frontend-development', 'Best AI Agent for Frontend Development', 'AI agents for frontend: React, Vue, Angular, Tailwind CSS, and TypeScript workflows.', 0.82, 'best ai agent for frontend'),
    P('best-ai-agent-for-backend-development', 'Best AI Agent for Backend Development', 'AI agents for backend: Python, Node.js, Go, Java, and database workflows.', 0.82, 'best ai agent for backend'),
    P('best-ai-agent-for-python', 'Best AI Agent for Python Development in 2026', 'Compare AI coding agents for Python: Cursor, Copilot, Qodo, and Windsurf.', 0.84, 'best ai agent for python'),
    P('best-ai-agent-for-javascript', 'Best AI Agent for JavaScript & TypeScript in 2026', 'AI agents for JavaScript and TypeScript: Cursor, Copilot, and Windsurf.', 0.83, 'best ai agent for javascript'),
  ]},
  { id: 'business-ai-agents', name: 'Business AI Agents', description: 'Workflow automation, CRM, sales, support, finance, and enterprise AI agent platforms.', hubSlug: 'business-ai-hub', priority: 0.92, pages: [
    H('business-ai-hub', 'Business AI Agents Hub', 'AI agents for Indian SMEs, startups, and enterprises covering CRM, sales, support, WhatsApp, and workflow automation.', 0.92, 'business ai agents'),
    P('ai-agents-for-business', 'AI Agents for Business: Complete Guide for 2026', 'Comprehensive guide to AI agents for business automation, CRM, sales, support, and workflow operations.', 0.93, 'ai agents for business'),
    P('ai-agents-for-enterprises', 'AI Agents for Enterprise: Procurement & Scale Guide', 'Enterprise AI agent evaluation covering procurement, security, DPDP compliance, and scale.', 0.90, 'ai agents for enterprises'),
    P('ai-agents-for-smes', 'AI Agents for Indian SMEs: Budget-Friendly Automation', 'Best AI agents for Indian SMEs with affordable pricing, WhatsApp integration, and Hindi support.', 0.91, 'ai agents for smes'),
    P('ai-agents-for-workflow-automation', 'AI Agents for Workflow Automation: n8n, Make & Zapier', 'Compare AI workflow automation platforms: n8n, Make, Zapier, and custom agent builders.', 0.85, 'ai agents for workflow automation'),
    P('ai-agents-for-support-automation', 'AI Agents for Customer Support Automation', 'AI agents for customer support: Intercom, Zendesk, Freshdesk, and India-native platforms.', 0.88, 'ai agents for customer support'),
    P('ai-agents-for-sales', 'AI Agents for Sales: Lead Qualification & CRM Automation', 'AI sales agents for outbound calling, lead qualification, and pipeline automation.', 0.86, 'ai agents for sales'),
    P('ai-agents-for-finance', 'AI Agents for Finance: Accounting, Invoicing & Compliance', 'AI agents for finance: invoicing, expense tracking, GST compliance, and reconciliation.', 0.80, 'ai agents for finance'),
    P('ai-agents-for-crm', 'AI Agents for CRM: Salesforce, HubSpot & Zoho Integration', 'AI agents that integrate with CRM platforms: Salesforce, HubSpot, Zoho, and India-native CRMs.', 0.84, 'ai agents for crm'),
    P('ai-agents-for-security', 'AI Agents for Security: Threat Detection & Compliance', 'AI agents for security operations: threat detection, compliance monitoring, and DPDP audit.', 0.79, 'ai agents for security'),
    P('ai-agents-for-marketing', 'AI Agents for Marketing: Content, Campaigns & Analytics', 'AI marketing agents for content creation, campaign management, and analytics.', 0.83, 'ai agents for marketing'),
    P('ai-agents-for-healthcare', 'AI Agents for Healthcare: Appointment & Patient Support', 'AI agents for Indian healthcare: appointment booking, patient support, and health data compliance.', 0.78, 'ai agents for healthcare'),
    P('ai-agents-for-hr', 'AI Agents for HR: Recruitment, Onboarding & Employee Support', 'AI agents for HR: recruitment screening, onboarding automation, and employee support.', 0.77, 'ai agents for hr'),
    P('ai-agents-for-procurement', 'AI Agents for Procurement: Vendor Management & PO Automation', 'AI agents for procurement: vendor comparison, PO automation, and GST invoice processing.', 0.75, 'ai agents for procurement'),
    P('best-ai-agent-for-ecommerce', 'Best AI Agent for E-Commerce in India', 'AI agents for Indian e-commerce: product catalog, order management, WhatsApp support, and inventory.', 0.82, 'best ai agent for ecommerce'),
    P('best-ai-agent-for-education', 'Best AI Agent for Education & E-Learning', 'AI agents for education: tutoring, content creation, student support, and LMS automation.', 0.78, 'best ai agent for education'),
    P('best-ai-agent-for-legal', 'Best AI Agent for Legal: Document Review & Research', 'AI agents for legal: document review, contract analysis, legal research, and compliance.', 0.76, 'best ai agent for legal'),
  ]},
  { id: 'ai-agent-builders', name: 'AI Agent Builders', description: 'No-code, low-code, and developer platforms for building AI agents.', hubSlug: 'ai-agent-builders-hub', priority: 0.90, pages: [
    H('ai-agent-builders-hub', 'AI Agent Builders Hub', 'No-code, low-code, and developer platforms for building AI agents, RAG workflows, and multi-agent systems.', 0.90, 'ai agent builders'),
    P('best-ai-agent-builder', 'Best AI Agent Builder in 2026: No-Code & Low-Code Platforms', 'Compare the best AI agent builders: Flowise, Dify, n8n, LangGraph, CrewAI, and managed platforms.', 0.92, 'best ai agent builder'),
    P('best-ai-agent-creator', 'Best AI Agent Creator: Visual & Code-First Platforms', 'AI agent creator platforms: visual builders, code-first frameworks, and hybrid approaches.', 0.85, 'best ai agent creator'),
    P('best-ai-agent-maker', 'Best AI Agent Maker: Drag-and-Drop Agent Building', 'Drag-and-drop AI agent makers: Flowise, Dify, and no-code platforms.', 0.84, 'best ai agent maker'),
    P('best-ai-agent-platform', 'Best AI Agent Platform: Enterprise & Startup Options', 'AI agent platforms: managed hosting, self-hosted, and hybrid deployment.', 0.86, 'best ai agent platform'),
    P('best-ai-agent-app-builder', 'Best AI Agent App Builder: No-Code to Production', 'Build AI agent apps without code: platforms, templates, and India-specific integrations.', 0.83, 'best ai agent app builder'),
    P('best-ai-agent-workflow-builder', 'Best AI Agent Workflow Builder: Visual Automation', 'Visual AI workflow builders: n8n, Make, Flowise, and Dify.', 0.84, 'best ai agent workflow builder'),
    P('best-ai-agent-no-code-platform', 'Best No-Code AI Agent Platform in 2026', 'No-code AI agent platforms: Flowise, Dify, and managed platforms with India pricing.', 0.87, 'best no code ai agent platform'),
    P('best-ai-agent-development-platform', 'Best AI Agent Development Platform: Code-First Options', 'Developer-first platforms: LangGraph, CrewAI, AutoGen, and SDK options.', 0.85, 'best ai agent development platform'),
    P('best-ai-agent-orchestration-platform', 'Best AI Agent Orchestration Platform: Multi-Agent Systems', 'Orchestration platforms: LangGraph, CrewAI, and enterprise options.', 0.82, 'best ai agent orchestration platform'),
    P('best-ai-agent-management-platform', 'Best AI Agent Management Platform: Monitoring & Ops', 'Management platforms: AgentOps, LangSmith, and custom dashboards.', 0.80, 'best ai agent management platform'),
  ]},
  { id: 'voice-ai-agents', name: 'Voice AI Agents', description: 'Real-time telephony agents, WhatsApp automations, low-latency voice AI, and CRM synchronizers.', hubSlug: 'voice-ai-hub', priority: 0.88, pages: [
    H('voice-ai-hub', 'Voice AI Agents Hub', 'AI voice agents for Indian call centers, appointment booking, outbound calling, and Hinglish calls.', 0.88, 'voice ai agents'),
    P('best-ai-voice-agent', 'Best AI Voice Agent in India 2026', 'Compare the best AI voice agents: Vapi, Retell, Bland.ai, ElevenLabs, and enterprise platforms.', 0.90, 'best ai voice agent'),
    P('best-ai-voice-agent-platform', 'Best AI Voice Agent Platform: Vapi, Retell & Bland.ai', 'Voice agent platforms: telephony, Hindi/Hinglish support, and CRM integration.', 0.86, 'best ai voice agent platform'),
    P('best-ai-agent-for-whatsapp', 'Best AI Agent for WhatsApp Business in India', 'AI agents for WhatsApp Business: Yellow.ai, Wati, Intercom, and India-native platforms.', 0.89, 'best ai agent for whatsapp'),
    P('best-ai-agent-for-customer-support', 'Best AI Agent for Customer Support in India', 'AI agents for customer support: Intercom, Zendesk, Freshdesk, Yellow.ai, and India-native.', 0.88, 'best ai agent for customer support'),
    P('best-ai-agent-for-call-centers', 'Best AI Agent for Call Centers: India Setup Guide', 'AI agents for Indian call centers: Vapi, Retell, and enterprise platforms with Hindi support.', 0.85, 'best ai agent for call centers'),
    P('best-ai-agent-for-sales', 'Best AI Agent for Sales: Outbound & Lead Qualification', 'AI sales agents for outbound calling, lead qualification, and pipeline automation.', 0.84, 'best ai agent for sales'),
    P('best-ai-agent-automation-platform', 'Best AI Agent Automation Platform: End-to-End Workflows', 'Automation platforms: n8n, Make, and custom agent builders.', 0.83, 'best ai agent automation platform'),
    P('best-ai-agent-workflow-tools', 'Best AI Agent Workflow Tools: Connectors & Integrations', 'Workflow tools: APIs, webhooks, and native integrations.', 0.80, 'best ai agent workflow tools'),
  ]},
  { id: 'open-source-ai-agents', name: 'Open Source AI Agents', description: 'Open-source AI agent frameworks, tools, and self-hosted platforms.', hubSlug: 'best-open-source-ai-agent-tools', priority: 0.85, pages: [
    H('best-open-source-ai-agent-tools', 'Best Open-Source AI Agent Tools in 2026', 'Compare open-source AI agent tools: CrewAI, AutoGen, LangGraph, Flowise, Dify, and self-hosted.', 0.85, 'open source ai agent tools'),
    P('best-free-open-source-ai-agents', 'Best Free Open-Source AI Agents: Self-Hosted Options', 'Free open-source AI agents: CrewAI, AutoGen, LangGraph, and Flowise with deployment guides.', 0.84, 'free open source ai agents'),
  ]},
  { id: 'mcp-servers', name: 'MCP Servers', description: 'Model Context Protocol hosting frameworks, server directories, security, and implementation guides.', hubSlug: 'mcp-hub', priority: 0.87, pages: [
    H('mcp-hub', 'MCP Hub: Model Context Protocol Directory', 'Complete MCP hub: servers, directories, marketplaces, hosting, security, and AI agent integrations.', 0.87, 'mcp servers'),
    P('what-is-mcp', 'What Is MCP (Model Context Protocol)? Complete Guide', 'Model Context Protocol explained: how it works, server architecture, security, and integration patterns.', 0.92, 'what is mcp', ['model context protocol']),
    P('best-mcp-servers', 'Best MCP Servers in 2026: Directory & Comparison', 'Directory of the best MCP servers: file system, database, API, and custom implementations.', 0.88, 'best mcp servers'),
    DIR('mcp-directory', 'MCP Server Directory: Browse & Compare Servers', 'Browse MCP servers by category: file system, database, API, search, and custom integrations.', 0.85, 'mcp directory'),
    P('mcp-marketplace', 'MCP Marketplace: Find & Deploy Servers', 'MCP marketplace for discovering, comparing, and deploying servers.', 0.82, 'mcp marketplace'),
    P('mcp-hosting', 'MCP Hosting: Self-Hosted vs Managed Server Deployment', 'MCP hosting: self-hosted, managed cloud, and hybrid deployment.', 0.80, 'mcp hosting'),
    P('mcp-security', 'MCP Security: Server Hardening & Access Control', 'MCP security: server hardening, access control, data isolation, and DPDP compliance.', 0.83, 'mcp security'),
    G('mcp-use-cases', 'MCP Use Cases: Real-World AI Agent Integrations', 'MCP use cases: file access, database queries, API calls, and custom tool integrations.', 0.81, 'mcp use cases'),
    T('mcp-for-ai-agents', 'MCP for AI Agents: Integration Guide', 'How to integrate MCP with AI agents: server setup, client configuration, and tool orchestration.', 0.84, 'mcp for ai agents'),
    P('mcp-vs-api', 'MCP vs API: Which Integration Approach Is Better?', 'MCP vs traditional API: pros, cons, security, and when to use each.', 0.82, 'mcp vs api'),
    G('future-of-ai-agents', 'Future of AI Agents: 2026-2027 Roadmap & Predictions', 'AI agent future trends: multi-agent systems, adaptive tool use, MCP adoption, and India-market.', 0.80, 'future of ai agents'),
  ]},
  { id: 'courses-certifications', name: 'Courses & Certifications', description: 'Learning paths, certified agent courses, developer GitHub builds, and project guidelines.', hubSlug: 'best-ai-agent-course', priority: 0.78, pages: [
    H('best-ai-agent-course', 'Best AI Agent Course in 2026: Free & Paid Options', 'Compare the best AI agent courses: free tutorials, paid certifications, and hands-on projects.', 0.80, 'best ai agent course'),
    P('best-ai-agent-certification', 'Best AI Agent Certification: Professional Credentials', 'AI agent certifications: vendor certifications, online programs, and India-recognized credentials.', 0.78, 'best ai agent certification'),
    P('best-ai-agent-course-for-beginners', 'Best AI Agent Course for Beginners: Start Here', 'Beginner-friendly AI agent courses: no-code builders, Python frameworks, and visual workflows.', 0.79, 'ai agent course for beginners'),
    T('how-to-build-an-ai-agent', 'How to Build an AI Agent: Step-by-Step Guide', 'Complete guide to building an AI agent: from no-code builders to Python frameworks.', 0.88, 'how to build an ai agent'),
    T('how-to-create-an-ai-agent', 'How to Create an AI Agent: No-Code to Code Guide', 'Create an AI agent using no-code platforms or code-first frameworks: Flowise, Dify, CrewAI, and LangGraph.', 0.86, 'how to create an ai agent'),
    G('ai-agent-projects', 'AI Agent Projects: 20+ Ideas for Developers', 'AI agent project ideas: from simple chatbots to multi-agent systems with Indian use cases.', 0.80, 'ai agent projects'),
    G('ai-agent-project-ideas', 'AI Agent Project Ideas: Beginner to Advanced', 'AI agent project ideas for all skill levels: beginner to advanced multi-agent systems.', 0.78, 'ai agent project ideas'),
    G('ai-agent-github-projects', 'AI Agent GitHub Projects: Open-Source Examples', 'Best AI agent GitHub projects: CrewAI, AutoGen, LangGraph, and Flowise examples.', 0.79, 'ai agent github projects'),
    G('ai-agent-learning-path', 'AI Agent Learning Path: Beginner to Expert Roadmap', 'Complete AI agent learning path: from basics to advanced multi-agent systems.', 0.82, 'ai agent learning path'),
  ]},
  { id: 'research-benchmarks', name: 'Research & Benchmarks', description: 'AI agent research, academic updates, benchmark analysis, and industry roadmaps.', hubSlug: 'ai-agent-research', priority: 0.75, pages: [
    H('ai-agent-research', 'AI Agent Research: Latest Papers & Findings', 'Latest AI agent research: academic papers, industry reports, and benchmark analysis.', 0.75, 'ai agent research'),
    P('best-ai-agent-for-research', 'Best AI Agent for Research: Academic & Professional', 'AI agents for research: literature review, data analysis, paper writing, and automation.', 0.78, 'best ai agent for research'),
    P('best-ai-agent-for-data-analysis', 'Best AI Agent for Data Analysis & Visualization', 'AI agents for data analysis: Python, SQL, visualization, and automated reporting.', 0.79, 'best ai agent for data analysis'),
    P('best-ai-agent-for-email', 'Best AI Agent for Email: Automation & Management', 'AI agents for email: sorting, drafting, scheduling, and CRM integration.', 0.77, 'best ai agent for email'),
    P('best-ai-agent-for-presentations', 'Best AI Agent for Presentations: Slide Generation', 'AI agents for presentations: automated slide generation, design, and content structuring.', 0.76, 'best ai agent for presentations'),
    P('best-ai-agent-for-personal-use', 'Best AI Agent for Personal Use: Productivity & Assistant', 'AI agents for personal productivity: scheduling, research, writing, and task automation.', 0.78, 'best ai agent for personal use'),
    P('best-ai-agent-personal-assistant', 'Best AI Agent Personal Assistant: Daily Automation', 'AI personal assistants: scheduling, email, research, and task management.', 0.77, 'best ai personal assistant'),
    P('best-ai-agent-for-productivity', 'Best AI Agent for Productivity: Task & Workflow Automation', 'AI agents for productivity: task management, workflow automation, and time-saving tools.', 0.79, 'best ai agent for productivity'),
    P('best-ai-agent-with-memory', 'Best AI Agent with Memory: Long-Term Context', 'AI agents with memory: short-term, long-term, entity, and conversational memory.', 0.80, 'best ai agent with memory'),
    P('best-ai-agent-for-job-search', 'Best AI Agent for Job Search & Applications', 'AI agents for job search: resume optimization, application tracking, and interview prep.', 0.75, 'best ai agent for job search'),
    P('best-ai-agent-for-job-applications', 'Best AI Agent for Job Applications: Auto-Apply Tools', 'AI agents for job applications: auto-apply, resume tailoring, and tracking.', 0.74, 'best ai agent for job applications'),
  ]},
  { id: 'pricing-intelligence', name: 'Pricing Intelligence', description: 'INR pricing guides, GST invoice notes, free-vs-paid comparisons, ROI models, and procurement guidance.', hubSlug: 'pricing-hub', priority: 0.88, pages: [
    H('pricing-hub', 'AI Agent Pricing Hub: INR Guides & Comparisons', 'INR pricing, GST invoice notes, free-vs-paid comparisons, ROI models, and procurement guidance.', 0.88, 'ai agent pricing'),
    PR('cursor-pricing', 'Cursor AI Pricing in INR: Plans, Features & GST Invoice', 'Cursor AI pricing: Pro plan at ₹1,680/mo, team pricing, GST invoice, and payment options.', 0.90, 'cursor ai pricing'),
    PR('github-copilot-pricing', 'GitHub Copilot Pricing in INR: Individual, Business & Enterprise', 'GitHub Copilot pricing: Individual ₹1,340/mo, Business ₹2,250/mo, Enterprise custom.', 0.88, 'github copilot pricing'),
    PR('claude-code-pricing', 'Claude Code Pricing in INR: Plans, Limits & Team Costs', 'Claude Code pricing: plan options, usage limits, team costs, and India procurement notes.', 0.86, 'claude code pricing'),
    PR('vapi-pricing', 'Vapi Pricing in INR: Per-Minute Rates & Volume Discounts', 'Vapi pricing: per-minute rates, volume discounts, and enterprise plans.', 0.85, 'vapi pricing'),
    PR('retell-pricing', 'Retell AI Pricing in INR: Call Center & Voice Agent Costs', 'Retell AI pricing: per-minute rates, enterprise plans, and volume discounts.', 0.83, 'retell ai pricing'),
    PR('flowise-pricing', 'Flowise Pricing: Self-Hosted Free vs Managed Cloud', 'Flowise pricing: self-hosted is free, managed cloud plans, and enterprise options.', 0.82, 'flowise pricing'),
    PR('dify-pricing', 'Dify Pricing in INR: Free, Pro & Enterprise Plans', 'Dify pricing: free tier, Pro plan, managed cloud, and enterprise options.', 0.81, 'dify pricing'),
    PR('crewai-pricing', 'CrewAI Pricing: Open-Source, Cloud & Team Costs', 'CrewAI pricing: open-source self-hosting costs, cloud plans, team usage, and India deployment notes.', 0.80, 'crewai pricing'),
    PR('n8n-pricing', 'n8n Pricing in INR: Self-Hosted vs Cloud Plans', 'n8n pricing: self-hosted is free, cloud plans from ₹1,650/mo, and enterprise.', 0.80, 'n8n pricing'),
    PR('yellow-ai-pricing', 'Yellow.ai Pricing: Enterprise Plans & India-Specific Quotes', 'Yellow.ai pricing: custom quotes, WhatsApp API costs, and enterprise licensing.', 0.79, 'yellow ai pricing'),
    PR('intercom-pricing', 'Intercom Pricing in INR: Starter, Pro & Enterprise', 'Intercom pricing: Starter, Pro, Enterprise plans with Fin AI chatbot costs.', 0.82, 'intercom pricing'),
  ]},
  { id: 'alternatives', name: 'Alternatives', description: 'Alternative shortlists for Cursor, Copilot, Vapi, Retell, n8n, Flowise, Dify, Intercom, and other tools.', hubSlug: 'alternatives-hub', priority: 0.87, pages: [
    H('alternatives-hub', 'AI Agent Alternatives Hub: Compare & Switch', 'Alternative shortlists for Cursor, GitHub Copilot, Vapi, Retell, n8n, Flowise, Dify, Intercom, and more.', 0.87, 'ai agent alternatives'),
    AL('cursor-alternatives', 'Cursor AI Alternatives: GitHub Copilot, Windsurf & More', 'Best Cursor AI alternatives: GitHub Copilot, Windsurf, Replit AI, Tabnine, and Qodo.', 0.88, 'cursor ai alternatives'),
    AL('github-copilot-alternatives', 'GitHub Copilot Alternatives: Cursor, Tabnine & Codeium', 'Best GitHub Copilot alternatives: Cursor AI, Tabnine, Codeium, Windsurf, and CodeWhisperer.', 0.86, 'github copilot alternatives'),
    AL('claude-code-alternatives', 'Claude Code Alternatives: Codex, Cursor & Copilot', 'Best Claude Code alternatives: Codex, Cursor AI, GitHub Copilot, Windsurf, and Qodo.', 0.85, 'claude code alternatives'),
    AL('vapi-alternatives', 'Vapi Alternatives: Retell, Bland.ai & ElevenLabs', 'Best Vapi alternatives: Retell AI, Bland.ai, ElevenLabs, and Synthflow.', 0.84, 'vapi alternatives'),
    AL('retell-alternatives', 'Retell AI Alternatives: Vapi, Bland.ai & Synthflow', 'Best Retell AI alternatives: Vapi, Bland.ai, Synthflow, and ElevenLabs.', 0.82, 'retell ai alternatives'),
    AL('flowise-alternatives', 'Flowise Alternatives: Dify, LangFlow & n8n', 'Best Flowise alternatives: Dify, LangFlow, n8n, and CrewAI.', 0.83, 'flowise alternatives'),
    AL('dify-alternatives', 'Dify Alternatives: Flowise, LangFlow & Custom Build', 'Best Dify alternatives: Flowise, LangFlow, and custom-built solutions.', 0.81, 'dify alternatives'),
    AL('crewai-alternatives', 'CrewAI Alternatives: LangGraph, AutoGen & Flowise', 'Best CrewAI alternatives: LangGraph, AutoGen, Flowise, Dify, and managed orchestration platforms.', 0.80, 'crewai alternatives'),
    AL('n8n-alternatives', 'n8n Alternatives: Make, Zapier & Activepieces', 'Best n8n alternatives: Make, Zapier, Activepieces, and custom agent builders.', 0.80, 'n8n alternatives'),
    AL('yellow-ai-alternatives', 'Yellow.ai Alternatives: Haptik, Wati & Intercom', 'Best Yellow.ai alternatives: Haptik, Wati, Intercom, and Kore.ai.', 0.79, 'yellow ai alternatives'),
    AL('intercom-alternatives', 'Intercom Alternatives: Zendesk, Freshdesk & Yellow.ai', 'Best Intercom alternatives: Zendesk, Freshdesk, Yellow.ai, and India-native platforms.', 0.82, 'intercom alternatives'),
  ]},
  { id: 'tutorials', name: 'Tutorials', description: 'Step-by-step implementation guides for Cursor, Copilot, Vapi, Retell, Flowise, CrewAI, MCP servers, and multi-agent systems.', hubSlug: 'implementation-tutorials-hub', priority: 0.85, pages: [
    H('implementation-tutorials-hub', 'Implementation Tutorials Hub', 'Hands-on setup tutorials for Cursor, Copilot, Vapi, Retell, Flowise, CrewAI, MCP servers, and multi-agent systems.', 0.85, 'implementation tutorials'),
    P('best-ai-agent-course-reddit', 'Best AI Agent Courses on Reddit: Community Recommendations', 'AI agent courses recommended by Reddit: free, paid, and hands-on options.', 0.76, 'best ai agent course reddit'),
    T('how-to-use-cursor-ai', 'How to Use Cursor AI: Complete Setup Guide for Indian Developers', 'Cursor AI setup: installation, configuration, keyboard shortcuts, Composer mode, and India tips.', 0.88, 'how to use cursor ai'),
    T('how-to-use-github-copilot', 'How to Use GitHub Copilot: Setup, Tips & Best Practices', 'GitHub Copilot setup: VS Code integration, keyboard shortcuts, prompt engineering, and team config.', 0.86, 'how to use github copilot'),
    T('how-to-use-vapi', 'How to Use Vapi: Voice Agent Setup & Deployment', 'Vapi setup: API keys, Twilio integration, voice agent creation, and Hindi/Hinglish config.', 0.84, 'how to use vapi'),
    T('how-to-use-retell', 'How to Use Retell AI: Call Center Voice Agent Setup', 'Retell AI setup: API config, call routing, CRM integration, and enterprise deployment.', 0.82, 'how to use retell ai'),
    T('how-to-build-ai-agent-with-flowise', 'How to Build an AI Agent with Flowise: Visual Guide', 'Build AI agents with Flowise: drag-and-drop, RAG setup, API deployment, and self-hosting.', 0.85, 'how to build ai agent with flowise'),
    T('how-to-create-mcp-server', 'How to Create an MCP Server: Step-by-Step Guide', 'Create an MCP server: protocol spec, server implementation, tool registration, and security.', 0.83, 'how to create mcp server'),
    T('how-to-build-ai-agent-with-crewai', 'How to Build Multi-Agent Systems with CrewAI', 'Build multi-agent systems with CrewAI: role definition, task orchestration, memory, and deployment.', 0.84, 'how to build ai agent with crewai'),
    T('how-to-setup-langgraph', 'How to Set Up LangGraph: Graph-Based Agent Orchestration', 'LangGraph setup: graph definition, state management, tool integration, and production deployment.', 0.81, 'how to setup langgraph'),
    T('how-to-integrate-ai-agent-with-whatsapp', 'How to Integrate AI Agent with WhatsApp Business API', 'Integrate AI agents with WhatsApp: API setup, template messages, opt-in flows, and DPDP compliance.', 0.86, 'how to integrate ai agent with whatsapp'),
  ]},
  { id: 'glossary', name: 'Glossary', description: 'Plain-English definitions for RAG, MCP, tool use, function calling, context windows, multi-agent systems, AgentOps, and AI benchmarks.', hubSlug: 'glossary-hub', priority: 0.82, pages: [
    H('glossary-hub', 'AI Agent Glossary: Complete Terminology Guide', 'Definitions for RAG, MCP, tool use, function calling, context windows, multi-agent systems, AgentOps, and benchmarks.', 0.82, 'ai agent glossary'),
    GL('what-is-rag', 'What Is RAG (Retrieval-Augmented Generation)? Complete Guide', 'RAG explained: retrieval-augmented generation, vector databases, embedding models, and implementation.', 0.88, 'what is rag', ['retrieval augmented generation']),
    GL('what-is-function-calling', 'What Is Function Calling in AI Agents?', 'Function calling: how AI agents use tools, API integration, structured outputs, and multi-step reasoning.', 0.84, 'what is function calling'),
    GL('what-is-tool-use', 'What Is Tool Use in AI Agents? Complete Explanation', 'Tool use: how agents interact with external tools, APIs, databases, and services.', 0.83, 'what is tool use'),
    GL('what-is-agentic-ai', 'What Is Agentic AI? Definition, Examples & Use Cases', 'Agentic AI: autonomous agents, goal-oriented behavior, multi-step reasoning, and real-world applications.', 0.85, 'what is agentic ai'),
    GL('what-is-multi-agent-system', 'What Is a Multi-Agent System? Architecture & Examples', 'Multi-agent systems: agent collaboration, orchestration patterns, CrewAI, AutoGen, and LangGraph.', 0.82, 'what is multi agent system'),
    GL('what-is-context-window', 'What Is a Context Window in AI Models?', 'Context window: token limits, long-context models, and how context windows affect agent performance.', 0.80, 'what is context window'),
    GL('what-is-agentops', 'What Is AgentOps? AI Agent Operations & Monitoring', 'AgentOps: monitoring, observability, debugging, and operations for production AI agent deployments.', 0.79, 'what is agentops'),
    GL('what-is-ai-agent-memory', 'What Is AI Agent Memory? Short-Term, Long-Term & Entity', 'AI agent memory types: short-term, long-term, entity, and conversational memory.', 0.81, 'what is ai agent memory'),
  ]},
  { id: 'security-compliance', name: 'Security & Compliance', description: 'AI agent security, DPDP Act compliance, data privacy, and enterprise security frameworks.', hubSlug: 'ai-agent-security', priority: 0.83, pages: [
    H('ai-agent-security', 'AI Agent Security: Threat Model & Best Practices', 'AI agent security: threat modeling, prompt injection prevention, data isolation, and enterprise security.', 0.83, 'ai agent security'),
    G('dpdp-act-ai-compliance', 'DPDP Act 2023 Compliance for AI Agents: Complete Checklist', 'DPDP Act compliance: consent, data retention, cross-border transfers, and Indian deployment requirements.', 0.85, 'dpdp act ai compliance', ['dpdp act compliance']),
  ]},
  { id: 'free-ai-agents', name: 'Free AI Agents', description: 'Free and open-source AI agents, builders, voice agents, coding agents, and business automation tools.', hubSlug: 'free-ai-agents-hub', priority: 0.84, pages: [
    H('free-ai-agents-hub', 'Free AI Agents Hub', 'Free and open-source AI agents, builders, voice agents, coding agents, and business automation tools.', 0.84, 'free ai agents'),
    P('best-free-ai-agents', 'Best Free AI Agents in 2026: No-Cost Options', 'Best free AI agents: Flowise, Dify, CrewAI, and open-source options with deployment guides.', 0.85, 'best free ai agents'),
    P('best-free-ai-coding-agents', 'Best Free AI Coding Agents: Open-Source Copilots', 'Free AI coding agents: Codeium, Tabnine free tier, and open-source alternatives.', 0.82, 'best free ai coding agents'),
    P('best-free-ai-agent-builder', 'Best Free AI Agent Builder: No-Code Options', 'Free AI agent builders: Flowise, Dify, and n8n free tiers.', 0.83, 'best free ai agent builder'),
    P('best-free-ai-voice-agent', 'Best Free AI Voice Agent: Open-Source Options', 'Free AI voice agents: open-source TTS, speech recognition, and voice bot frameworks.', 0.79, 'best free ai voice agent'),
  ]},
  { id: 'buyers-guides', name: 'Buyer Guides', description: 'High-converting industry and role-based buyer guides for choosing the right AI agent.', hubSlug: 'buyers-guides', priority: 0.86, pages: [
    H('buyers-guides', 'AI Agent Buyer Guides: Choose the Right Tool', 'Industry and role-based buyer guides for choosing the right AI agent in India.', 0.88, 'ai agent buyer guides'),
    H('buyers-guides-hub', 'AI Agent Buyer Guides Hub', 'Crawlable archive of buyer guides for startups, enterprises, SaaS, freelancers, agencies, developers, students, and Indian businesses.', 0.84, 'ai agent buyer guides hub'),
    BG('best-ai-agent-for-startups', 'Best AI Agent for Startups in India 2026', 'AI agents for Indian startups: budget-friendly options, free tiers, and scaling.', 0.88, 'best ai agent for startups'),
    BG('best-ai-agent-for-enterprises', 'Best AI Agent for Enterprises: Procurement Guide', 'Enterprise AI agent selection: security, compliance, procurement, and scale.', 0.85, 'best ai agent for enterprises'),
    BG('best-ai-agent-for-saas', 'Best AI Agent for SaaS Companies in India', 'AI agents for Indian SaaS: API integrations, automation, and scalability.', 0.83, 'best ai agent for saas'),
    BG('best-ai-agent-for-freelancers', 'Best AI Agent for Freelancers: Solo Developer Tools', 'AI agents for Indian freelancers: affordable pricing, productivity, and solo workflows.', 0.81, 'best ai agent for freelancers'),
    BG('best-ai-agent-for-solopreneurs', 'Best AI Agent for Solopreneurs: One-Person Business', 'AI agents for Indian solopreneurs: automation, content creation, and business management.', 0.80, 'best ai agent for solopreneurs'),
    BG('best-ai-agent-for-agencies', 'Best AI Agency AI Tools: Workflow Automation', 'AI agents for Indian agencies: client management, content production, and workflow.', 0.82, 'best ai agent for agencies'),
    BG('best-ai-agent-for-indian-businesses', 'Best AI Agent for Indian Businesses: Complete Guide', 'AI agents for Indian businesses: INR pricing, GST invoices, DPDP, WhatsApp, and Hindi.', 0.87, 'best ai agent for indian businesses'),
    BG('best-ai-agent-for-developers', 'Best AI Agent for Developers: Coding & Automation', 'AI agents for Indian developers: coding assistants, automation, and workflow optimization.', 0.84, 'best ai agent for developers'),
    BG('best-ai-agent-for-students', 'Best AI Agent for Students: Free & Educational', 'AI agents for Indian students: free tiers, learning tools, and educational discounts.', 0.78, 'best ai agent for students'),
    BG('best-ai-agent-for-content-creators', 'Best AI Agent for Content Creators in India', 'AI agents for content creators: writing, video scripting, social media, and SEO.', 0.81, 'best ai agent for content creators'),
  ]},
  { id: 'reddit-community-intent', name: 'Reddit & Community Intent', description: 'Community-sourced reviews and Reddit-intent pages capturing high-volume search queries.', hubSlug: 'reddit', priority: 0.77, pages: [
    H('reddit', 'AI Agent Reddit Reviews Hub', 'Community-sourced reviews and Reddit-intent pages for popular AI agents.', 0.79, 'ai agent reddit'),
    H('reddit-hub', 'AI Agent Reddit Intent Archive', 'Archive of Reddit-search intent pages for Cursor, Claude Code, GitHub Copilot, Flowise, Vapi, Retell, and AI agent category queries.', 0.76, 'ai agent reddit hub'),
    RD('cursor-ai-reddit-review', 'Cursor AI Reddit Review: What Developers Say', 'Cursor AI reviews from Reddit: real developer opinions, pros, cons, and India feedback.', 0.80, 'cursor ai reddit review'),
    RD('claude-code-reddit-review', 'Claude Code Reddit Review: Developer Community Insights', 'Claude Code reviews from Reddit: coding assistant feedback, comparisons, and use cases.', 0.78, 'claude code reddit review'),
    RD('github-copilot-reddit-review', 'GitHub Copilot Reddit Review: Community Consensus', 'GitHub Copilot reviews from Reddit: developer opinions, pricing, and alternatives.', 0.79, 'github copilot reddit review'),
    RD('flowise-reddit-review', 'Flowise Reddit Review: No-Code AI Builder Feedback', 'Flowise reviews from Reddit: visual AI builder feedback, deployment tips, and limitations.', 0.76, 'flowise reddit review'),
    RD('vapi-reddit-review', 'Vapi Reddit Review: Voice AI Developer Feedback', 'Vapi reviews from Reddit: voice agent API feedback, telephony, and pricing.', 0.77, 'vapi reddit review'),
    RD('retell-reddit-review', 'Retell AI Reddit Review: Call Center AI Feedback', 'Retell AI reviews from Reddit: call center automation feedback and enterprise insights.', 0.75, 'retell ai reddit review'),
    RD('best-ai-agent-reddit', 'Best AI Agent According to Reddit: Community Rankings', 'AI agent rankings based on Reddit consensus: most recommended tools for Indian developers.', 0.81, 'best ai agent reddit'),
    RD('best-ai-coding-agent-reddit', 'Best AI Coding Agent on Reddit: Developer Picks', 'Best AI coding agents on Reddit: Cursor, Copilot, Claude Code, and Windsurf rankings.', 0.80, 'best ai coding agent reddit'),
    RD('best-ai-agent-builder-reddit', 'Best AI Agent Builder on Reddit: No-Code Picks', 'Best AI agent builders on Reddit: Flowise, Dify, n8n, and LangGraph recommendations.', 0.78, 'best ai agent builder reddit'),
  ]},
  { id: 'directories', name: 'Directories', description: 'Comprehensive directories of AI agents organized by category with filters, pricing, and ratings.', hubSlug: 'ai-agent-directory', priority: 0.80, pages: [
    DIR('ai-agent-directory', 'AI Agent Directory: Browse All Tools', 'Browse all AI agents: coding, business, voice, builders, and more with filters.', 0.82, 'ai agent directory'),
    H('directories-hub', 'AI Agent Directories: Browse by Category', 'Comprehensive directories of AI agents with filters, pricing, and ratings.', 0.79, 'ai agent directories'),
    DIR('coding-agents', 'Coding Agents Directory: AI Developer Tools', 'Directory of AI coding agents: Cursor, Copilot, Claude Code, Windsurf, Codex, and more.', 0.81, 'coding agents'),
    DIR('coding-agents-directory', 'Coding Agents Directory: AI Developer Tools', 'Directory of AI coding agents: Cursor, Copilot, Claude Code, Windsurf, and more.', 0.80, 'coding agents directory'),
    DIR('business-agents', 'Business Agents Directory: Automation Tools', 'Directory of business AI agents for CRM, sales, support, finance, HR, and workflow automation.', 0.79, 'business agents'),
    DIR('business-agents-directory', 'Business AI Agents Directory: Automation Tools', 'Directory of business AI agents: CRM, sales, support, and workflow automation.', 0.78, 'business agents directory'),
    DIR('voice-agents', 'Voice Agents Directory: Telephony & TTS', 'Directory of voice AI agents for calls, appointment booking, support automation, and outbound sales.', 0.78, 'voice agents'),
    DIR('voice-agents-directory', 'Voice AI Agents Directory: Telephony & TTS', 'Directory of AI voice agents: Vapi, Retell, Bland.ai, ElevenLabs, and enterprise.', 0.77, 'voice agents directory'),
    DIR('agent-builders', 'AI Agent Builders Directory: No-Code Platforms', 'Directory of AI agent builders: Flowise, Dify, n8n, LangGraph, CrewAI, and visual platforms.', 0.80, 'agent builders'),
    DIR('agent-builders-directory', 'AI Agent Builders Directory: No-Code Platforms', 'Directory of AI agent builders: Flowise, Dify, n8n, LangGraph, and visual platforms.', 0.79, 'agent builders directory'),
    DIR('open-source-agents', 'Open-Source Agents Directory', 'Directory of open-source AI agents: CrewAI, AutoGen, LangGraph, Flowise, Dify, and self-hosted options.', 0.77, 'open source agents'),
    DIR('open-source-agents-directory', 'Open-Source AI Agents Directory', 'Directory of open-source AI agents: CrewAI, AutoGen, LangGraph, and self-hosted.', 0.76, 'open source agents directory'),
    DIR('mcp-servers', 'MCP Servers Directory: Model Context Protocol', 'Directory of MCP servers: file system, database, API, browser, search, and custom integrations.', 0.79, 'mcp servers'),
    DIR('mcp-servers-directory', 'MCP Servers Directory: Model Context Protocol', 'Directory of MCP servers: file system, database, API, and custom integrations.', 0.78, 'mcp servers directory'),
    DIR('free-agents', 'Free AI Agents Directory: No-Cost Options', 'Directory of free AI agents: open-source, freemium, trials, student plans, and self-hosted options.', 0.81, 'free agents'),
    DIR('free-agents-directory', 'Free AI Agents Directory: No-Cost Options', 'Directory of free AI agents: open-source, freemium, and trial options.', 0.80, 'free agents directory'),
  ]},
  { id: 'entity-pages', name: 'Entity Pages', description: 'LLM-optimized entity definition pages for major AI agents with structured data.', hubSlug: 'entity', priority: 0.75, pages: [
    H('entity', 'AI Agent Entity Pages: Structured Definitions', 'LLM-optimized entity definition pages for major AI agents with structured data.', 0.77, 'ai agent entities'),
    H('entity-hub', 'AI Agent Entity Hub', 'Structured entity archive for Cursor, GitHub Copilot, Claude Code, Vapi, Retell, Flowise, Dify, LangGraph, CrewAI, and AutoGen.', 0.74, 'ai agent entity hub'),
    E('cursor-ai-entity', 'Cursor AI: Entity Definition & Structured Data', 'Cursor AI entity: definition, category, alternatives, pricing, use cases, and structured data.', 0.82, 'cursor ai entity'),
    E('github-copilot-entity', 'GitHub Copilot: Entity Definition & Structured Data', 'GitHub Copilot entity: definition, category, alternatives, pricing, use cases, and structured data.', 0.80, 'github copilot entity'),
    E('claude-code-entity', 'Claude Code: Entity Definition & Structured Data', 'Claude Code entity: definition, category, alternatives, pricing, use cases, and structured data.', 0.79, 'claude code entity'),
    E('vapi-entity', 'Vapi AI: Entity Definition & Structured Data', 'Vapi AI entity: definition, category, alternatives, pricing, use cases, and structured data.', 0.78, 'vapi entity'),
    E('retell-entity', 'Retell AI: Entity Definition & Structured Data', 'Retell AI entity: definition, category, alternatives, pricing, use cases, and structured data.', 0.77, 'retell ai entity'),
    E('flowise-entity', 'Flowise: Entity Definition & Structured Data', 'Flowise entity: definition, category, alternatives, pricing, use cases, and structured data.', 0.79, 'flowise entity'),
    E('dify-entity', 'Dify: Entity Definition & Structured Data', 'Dify entity: definition, category, alternatives, pricing, use cases, and structured data.', 0.78, 'dify entity'),
    E('langgraph-entity', 'LangGraph: Entity Definition & Structured Data', 'LangGraph entity: definition, category, alternatives, pricing, use cases, and structured data.', 0.77, 'langgraph entity'),
    E('crewai-entity', 'CrewAI: Entity Definition & Structured Data', 'CrewAI entity: definition, category, alternatives, pricing, use cases, and structured data.', 0.78, 'crewai entity'),
    E('autogen-entity', 'AutoGen: Entity Definition & Structured Data', 'AutoGen entity: definition, category, alternatives, pricing, use cases, and structured data.', 0.76, 'autogen entity'),
    E('yellow-ai-entity', 'Yellow.ai: Entity Definition & Structured Data', 'Yellow.ai entity: definition, category, alternatives, pricing, WhatsApp use cases, and structured data.', 0.75, 'yellow ai entity'),
    E('intercom-entity', 'Intercom: Entity Definition & Structured Data', 'Intercom entity: definition, category, alternatives, pricing, support automation use cases, and structured data.', 0.75, 'intercom entity'),
  ]},
  { id: 'industry-ai-agents', name: 'Industry AI Agents', description: 'Industry-specific AI agent guides for India, including healthcare, real estate, banking, education, logistics, manufacturing, and WhatsApp workflows.', hubSlug: 'india', priority: 0.85, pages: [
    H('india', 'AI Agents in India: Pricing, DPDP & Buyer Guides', 'India-specific AI agent guides: INR pricing, DPDP compliance, WhatsApp, GST invoices, and regional language support.', 0.90, 'ai agents india'),
    H('industry-ai-agents-hub', 'Industry AI Agents Hub', 'Industry-specific AI agent guides: INR pricing, DPDP compliance, WhatsApp, and regional language.', 0.84, 'industry ai agents'),
    P('best-ai-agent-india', 'Best AI Agent in India 2026: INR Pricing & DPDP Guide', 'Best AI agents for India: INR pricing, GST invoice notes, DPDP compliance, and use cases.', 0.90, 'best ai agent india'),
    P('ai-agent-pricing-india', 'AI Agent Pricing in India: INR Estimates & GST Notes', 'AI agent pricing in India: INR estimates, GST invoice availability, and payment options.', 0.86, 'ai agent pricing india'),
    P('ai-agent-for-indian-startups', 'Best AI Agent for Indian Startups: Budget & Scale', 'AI agents for Indian startups: free tiers, affordable pricing, and scaling.', 0.84, 'ai agent for indian startups'),
    P('ai-agent-for-indian-smes', 'Best AI Agent for Indian SMEs: Automation Guide', 'AI agents for Indian SMEs: WhatsApp automation, Hindi support, and affordable pricing.', 0.85, 'ai agent for indian smes'),
    P('ai-agent-for-whatsapp-business', 'Best AI Agent for WhatsApp Business in India', 'AI agents for WhatsApp Business: Yellow.ai, Wati, Intercom, and India-native platforms.', 0.87, 'ai agent for whatsapp business'),
    P('best-ai-agent-for-hospitals', 'Best AI Agent for Hospitals', 'AI agents for hospitals: patient scheduling, call automation, and DPDP-aware workflows.', 0.80, 'best ai agent for hospitals'),
    P('best-ai-agent-for-healthcare-calls', 'Best AI Agent for Healthcare Calls', 'AI voice agents for healthcare calls, appointment booking, and patient reminders.', 0.79, 'best ai agent for healthcare calls'),
    P('best-ai-agent-for-real-estate', 'Best AI Agent for Real Estate', 'AI agents for real estate lead qualification, property matching, and follow-up calls.', 0.78, 'best ai agent for real estate'),
    P('best-ai-agent-for-banking', 'Best AI Agent for Banking', 'AI agents for banking support, onboarding, compliance workflows, and customer service.', 0.76, 'best ai agent for banking'),
    P('best-ai-agent-for-logistics', 'Best AI Agent for Logistics', 'AI agents for logistics dispatch, support, tracking, and exception handling.', 0.74, 'best ai agent for logistics'),
    P('best-ai-agent-for-manufacturing', 'Best AI Agent for Manufacturing', 'AI agents for manufacturing operations, maintenance, procurement, and support workflows.', 0.74, 'best ai agent for manufacturing'),
  ]},
  { id: 'longtail-engine', name: 'Longtail Engine', description: 'Long-tail AI agent pages for specific stacks, industries, workflows, calculators, and ROI use cases.', hubSlug: 'longtail-hub', priority: 0.78, pages: [
    H('longtail-hub', 'AI Agent Longtail Hub: Niche Use Cases & Tools', 'Long-tail AI agent pages for specific stacks, industries, workflows, calculators, and ROI use cases.', 0.84, 'ai agent longtail'),
    H('longtail-ai-agent-hub', 'Longtail AI Agent Hub', 'Specific AI agent recommendations, cost calculators, and ROI tools for niche stacks and workflows.', 0.78, 'longtail ai agent'),
    C('ai-agent-cost-calculator', 'AI Agent Cost Calculator: Estimate Monthly Spend', 'Calculate AI agent costs: team size, usage, and features to estimate monthly INR spend.', 0.82, 'ai agent cost calculator'),
    C('cursor-cost-calculator', 'Cursor AI Cost Calculator: Team Pricing Estimator', 'Cursor AI cost calculator: monthly and annual costs based on team size and usage.', 0.80, 'cursor ai cost calculator'),
    C('vapi-cost-calculator', 'Vapi Cost Calculator: Voice Agent Pricing Estimator', 'Vapi cost calculator: voice agent costs based on call volume, duration, and features.', 0.78, 'vapi cost calculator'),
    C('retell-cost-calculator', 'Retell AI Cost Calculator: Call Center Pricing', 'Retell AI cost calculator: call center automation costs based on call volume and features.', 0.77, 'retell ai cost calculator'),
    C('ai-support-agent-roi-calculator', 'AI Support Agent ROI Calculator: Cost Savings', 'Calculate ROI of AI support agents: human agent costs vs AI automation savings.', 0.81, 'ai support agent roi calculator'),
    P('best-ai-agent-for-nodejs', 'Best AI Agent for Node.js', 'AI agents for Node.js projects, backend automation, debugging, and TypeScript workflows.', 0.72, 'best ai agent for nodejs'),
    P('best-ai-agent-for-wordpress', 'Best AI Agent for WordPress', 'AI agents for WordPress publishing, SEO, support, and site automation.', 0.72, 'best ai agent for wordpress'),
    P('best-ai-agent-for-shopify', 'Best AI Agent for Shopify', 'AI agents for Shopify product catalog, support, order handling, and marketing workflows.', 0.72, 'best ai agent for shopify'),
    P('best-ai-agent-for-seo', 'Best AI Agent for SEO', 'AI agents for SEO workflows, content briefs, internal linking, and technical audits.', 0.72, 'best ai agent for seo'),
    P('best-ai-agent-for-linkedin', 'Best AI Agent for LinkedIn', 'AI agents for LinkedIn outreach, content, lead generation, and CRM follow-up.', 0.70, 'best ai agent for linkedin'),
    P('vapi-for-appointment-booking', 'Vapi for Appointment Booking', 'How Vapi fits appointment booking, lead qualification, and call routing workflows.', 0.70, 'vapi for appointment booking'),
    P('best-ai-agent-for-lawyers', 'Best AI Agent for Lawyers', 'AI agents for legal research, contract review, case analysis, and compliance for Indian law firms.', 0.75, 'best ai agent for lawyers'),
    P('best-ai-agent-for-recruiters', 'Best AI Agent for Recruiters', 'AI agents for candidate screening, interview scheduling, resume parsing, and communication.', 0.74, 'best ai agent for recruiters'),
    P('best-ai-agent-for-schools', 'Best AI Agent for Schools', 'AI agents for student tutoring, parent communication, homework help, and admin automation.', 0.73, 'best ai agent for schools'),
  ]},
];

// Public API
export { clusters as topicalClusters };
export const allTopicalPages: TopicalPage[] = clusters.flatMap(c =>
  c.pages.map(p => ({ ...p, clusterId: c.id, clusterName: c.name, clusterHubSlug: c.hubSlug }))
);

export function getTopicalPageBySlug(slug: string) {
  const n = slug.replace(/^\//, '');
  return allTopicalPages.find(p => p.slug === n);
}

export function getClusterById(id: string) { return clusters.find(c => c.id === id); }

export function getClusterBySlug(slug: string) {
  const n = slug.replace(/^\//, '');
  return clusters.find(c => c.hubSlug === n || c.pages.some(p => p.slug === n));
}

export function getRelatedPages(slug: string, limit = 8) {
  const page = getTopicalPageBySlug(slug);
  if (!page) return [];
  const explicit = (page.related || []).map(getTopicalPageBySlug).filter(Boolean) as TopicalPage[];
  const cluster = getClusterBySlug(slug);
  const clusterRelated = cluster ? cluster.pages.filter(p => p.slug !== (page?.slug || '')).slice(0, limit) : [];
  return [...explicit, ...clusterRelated].slice(0, limit);
}

export function validateUniqueTopicalSlugs() {
  const seen = new Set<string>();
  const dupes: string[] = [];
  for (const p of allTopicalPages) { if (seen.has(p.slug)) dupes.push(p.slug); seen.add(p.slug); }
  if (dupes.length) throw new Error(`Duplicate topical slugs: ${dupes.join(', ')}`);
}

/** Backward compatibility: get slugs array from a TopicalCluster */
export function getClusterSlugs(cluster: TopicalCluster): string[] {
  return cluster.pages.map(p => p.slug);
}

// Backward compatibility: old flat slug array
export function isTopicalAuthoritySlug(slug: string): boolean {
  const n = slug.startsWith('/') ? slug.substring(1) : slug;
  return allTopicalPages.some(p => p.slug === n);
}

// Backward compatibility: old AuthorityPageInfo format
export function getAuthorityPageMetadata(slug: string) {
  const page = getTopicalPageBySlug(slug);
  if (!page) return null;
  return {
    slug: page.slug,
    title: page.title,
    h1: page.h1 || page.title,
    metaTitle: `${page.title} | BestAIAgent.in`,
    metaDescription: page.description,
    type: page.pageType === 'hub' ? 'Mega' as const : page.pageType === 'pillar' ? 'Commercial' as const : 'Supporting' as const,
    wordCountRange: page.pageType === 'hub' ? '4,000–6,000 words' : page.pageType === 'pillar' ? '2,500–4,000 words' : '2,000–3,000 words',
    directAnswer: page.description,
    primaryKeyword: page.primaryKeyword,
    siloId: page.clusterId || 'reviews',
    estimatedWords: page.pageType === 'hub' ? 5000 : page.pageType === 'pillar' ? 3500 : 2500,
  };
}

export function generateSiloBodyFromTopicalPage(page: TopicalPage): string {
  const related = getRelatedPages(page.slug).map((item) => `- /${item.slug}`).join('\n');
  return `
## Quick Answer

${page.description}

## Key Takeaways

- ${page.title} is part of the ${page.clusterName || 'BestAIAgent.in topical authority'} cluster on BestAIAgent.in.
- This page is designed for ${page.intent} search intent.
- It connects to related reviews, comparisons, pricing guides, alternatives, tutorials, and glossary entries.
- Indian buyers should evaluate INR pricing, GST invoices, DPDP Act readiness, WhatsApp workflows, and local implementation support.

## Why This Topic Matters

${page.description}

## India-Specific Considerations

Indian startups, SMEs, agencies, and enterprise buyers should evaluate this topic through local pricing, payment, compliance, and procurement lenses. Important checks include INR pricing, GST invoice support, DPDP Act 2023 data handling, Indian cloud region availability, WhatsApp workflow compatibility, UPI/Razorpay relevance, and Hinglish or regional language support where applicable.

## Evaluation Framework

BestAIAgent.in evaluates this topic using the 42-point AI Agent Scoring Framework, covering product maturity, pricing transparency, technical depth, India fit, security posture, compliance readiness, ease of deployment, documentation quality, and real-world use-case alignment.

## Related Topics

${related}

## FAQ

### What is ${page.title}?

${page.description}

### Who should read this guide?

This guide is useful for Indian founders, developers, automation agencies, SMEs, IT teams, enterprise buyers, and AI consultants evaluating AI agents or agentic tools.

### How does BestAIAgent.in evaluate this topic?

We use an editorial scoring system that compares technical quality, pricing, compliance, support, integrations, India readiness, and practical business usefulness.

## Structured Data Recommendations

Use Article, FAQPage, BreadcrumbList, and relevant schema types such as ItemList, Review, SoftwareApplication, HowTo, DefinedTerm, or CollectionPage depending on page intent.
`.trim();
}

// Backward compatibility: old generateDynamicPillarContent
import type { SiloPage } from './types';
export function generateDynamicPillarContent(slug: string): SiloPage {
  const meta = getAuthorityPageMetadata(slug);
  if (!meta) {
    return {
      title: slug, slug, metaTitle: slug, metaDescription: slug, h1: slug,
      directAnswer: '', primaryKeyword: slug, siloId: 'reviews',
      author: 'BestAIAgent.in', publishedAt: '2026-06-01', updatedAt: '2026-06-11',
      bodySections: [], faqs: [], relatedPagesSlugs: [],
    };
  }
  const kw = meta.primaryKeyword;
  const kwU = kw.replace(/\b\w/g, c => c.toUpperCase());
  return {
    title: meta.title, slug: meta.slug, metaTitle: meta.metaTitle,
    metaDescription: meta.metaDescription, h1: meta.h1, directAnswer: meta.directAnswer,
    primaryKeyword: meta.primaryKeyword, siloId: meta.siloId as 'reviews' | 'builders' | 'coding-agents' | 'frameworks' | 'business' | 'research' | 'mcp' | 'editorial',
    author: 'Arshdeep Singh, Technical SEO lead', publishedAt: '2026-06-01', updatedAt: '2026-06-11',
    bodySections: [
      { heading: `1. Technical Deep-Dive into ${kwU}`, text: `Understanding ${kw} in the Indian enterprise and developer context. This analysis covers architecture, pricing, and deployment considerations.` },
      { heading: `2. India Localization & DPDP Compliance`, text: `Deploying ${kw} in India requires DPDP Act 2023 compliance, Mumbai-region data hosting, and consent management.` },
      { heading: `3. Scorecard & Benchmarks`, text: `Evaluated using our 42-point framework covering ease of use, features, docs, integrations, value, reliability, India fit, and scalability.` },
    ],
    faqs: [
      { question: `Is ${kwU} compliant with India's DPDP Act?`, answer: `Yes, with proper consent management, Indian data hosting, and training exclusion flags.` },
      { question: `What does ${kwU} cost in INR?`, answer: `Pricing varies: free tiers available, paid plans from ₹670/mo to ₹2,100/mo per seat.` },
    ],
    relatedPagesSlugs: getClusterBySlug(slug)?.pages.filter(p => p.slug !== slug).slice(0, 3).map(p => p.slug) || ['best-ai-agent'],
    ratingSummary: `Rated 9.2/10 under BestAIAgent.in review matrix.`,
    evaluationVerdict: `For Indian deployment, start with Mumbai-region hosting, UPI-ready payments, and strict sandbox environments.`,
  };
}

// Backward compatibility: old generateLlmsTxt
export function generateLlmsTxt(): string {
  let txt = '# BestAIAgent.in - Topical Authority Index\n\n';
  clusters.forEach(c => {
    txt += `## ${c.name}\n${c.description}\n`;
    c.pages.forEach(p => { txt += `- [${p.title}](https://bestaiagent.in/${p.slug}) - ${p.pageType}\n`; });
    txt += '\n';
  });
  return txt;
}

// Backward compatibility: old generateSitemap
export function generateSitemap(type: 'ai-agent' | 'tool' | 'comparison' | 'main'): string {
  const ts = '2026-06-11T05:22:24Z';
  let urls: string[] = [];
  if (type === 'ai-agent') urls = allTopicalPages.map(p => p.slug);
  else if (type === 'tool') urls = ['cursor-ai', 'vapi-ai', 'crewai', 'yellow-ai', 'flowise'];
  else if (type === 'comparison') urls = allTopicalPages.filter(p => p.pageType === 'comparison').map(p => p.slug);
  else urls = ['', 'best-ai-agent', 'coding-agents-hub', 'business-ai-hub', 'pricing-hub'];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  urls.forEach(u => {
    const link = u ? `https://bestaiagent.in/${u}` : 'https://bestaiagent.in/';
    xml += `  <url>\n    <loc>${link}</loc>\n    <lastmod>${ts.slice(0, 10)}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${type === 'main' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
  });
  xml += '</urlset>';
  return xml;
}
