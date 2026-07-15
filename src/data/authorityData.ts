export const SITE_URL = 'https://bestaiagent.in';

export const siteMeta = {
  name: 'BestAIAgent.in',
  tagline: "India's independent platform for AI agent discovery, comparison and research.",
  description: "Discover, compare and integrate the best AI agents, MCP servers, frameworks and AI infrastructure — with INR pricing, DPDP notes and honest, hands-on rankings.",
};

export const authors = [
  { name: 'Arshdeep Singh', role: 'Research Lead', slug: 'arshdeep-singh' },
  { name: 'Priya Iyer', role: 'AI Engineer & Fact-checker', slug: 'priya-iyer' },
  { name: 'Karan Mehra', role: 'MCP & Infrastructure Analyst', slug: 'karan-mehra' },
];

export const catLabel = {
  coding: 'Coding',
  assistant: 'Assistant',
  research: 'Research',
  framework: 'Framework',
  builder: 'Builder',
  business: 'Business',
  voice: 'Voice',
  opensource: 'Open Source',
};

export const agents = [
  {
    slug: 'claude-code', name: 'Claude Code', by: 'Anthropic', icon: '◈', cat: 'coding', rating: 4.8, score: 9.6,
    desc: 'Agentic coding tool that plans, edits and ships code from the terminal, IDE or desktop. Deep MCP support and strong multi-file reasoning.',
    mcp: true, openSource: false, freeTier: false, priceUSD: '$20/mo (via Claude Pro)', priceINR: '≈ ₹1,999/mo + 18% GST',
    india: { upi: false, languages: ['English', 'Hindi (responses)'], dpdp: 'Global policy; review for DPDP', residency: 'US/global', madeInIndia: false },
    bestFor: 'Serious agentic coding, refactors, multi-file changes', pros: ['Best-in-class multi-file reasoning', 'Native MCP client', 'Terminal + IDE + desktop'], cons: ['No permanent free tier', 'Costs add up at heavy usage'],
    features: { 'Multi-agent': 'partial', 'MCP support': 'yes', 'Local models': 'no', 'Self-host': 'no', 'IDE integration': 'yes', 'Voice': 'no' }
  },
  {
    slug: 'cursor', name: 'Cursor', by: 'Anysphere', icon: '▮', cat: 'coding', rating: 4.7, score: 9.3,
    desc: 'AI-first code editor built on VS Code with agent mode, codebase-wide chat and background agents.',
    mcp: true, openSource: false, freeTier: true, priceUSD: 'Free / $20/mo Pro', priceINR: '≈ ₹1,999/mo + GST',
    india: { upi: false, languages: ['English'], dpdp: 'Global policy; review for DPDP', residency: 'US', madeInIndia: false },
    bestFor: 'Developers who live in the editor and want an AI-native IDE', pros: ['Fast tab-completion', 'Agent mode for tasks', 'Familiar VS Code base'], cons: ['Pro needed for heavy use', 'Privacy mode must be enabled manually'],
    features: { 'Multi-agent': 'no', 'MCP support': 'yes', 'Local models': 'no', 'Self-host': 'no', 'IDE integration': 'yes', 'Voice': 'no' }
  },
  {
    slug: 'github-copilot', name: 'GitHub Copilot', by: 'Microsoft / GitHub', icon: '◉', cat: 'coding', rating: 4.5, score: 9.0,
    desc: 'The most widely deployed AI pair programmer, now with agent mode, code review and enterprise policy controls.',
    mcp: true, openSource: false, freeTier: true, priceUSD: 'Free tier / $10/mo', priceINR: '≈ ₹999/mo + GST',
    india: { upi: false, languages: ['English'], dpdp: 'Enterprise DPA available', residency: 'Global (Azure)', madeInIndia: false },
    bestFor: 'Teams already on GitHub; enterprise governance', pros: ['Deep GitHub integration', 'Enterprise controls', 'Free tier for students'], cons: ['Agent mode younger than rivals', 'Best value needs GitHub ecosystem'],
    features: { 'Multi-agent': 'no', 'MCP support': 'yes', 'Local models': 'no', 'Self-host': 'no', 'IDE integration': 'yes', 'Voice': 'no' }
  },
  {
    slug: 'chatgpt-agent', name: 'ChatGPT Agent', by: 'OpenAI', icon: '✦', cat: 'assistant', rating: 4.6, score: 9.2,
    desc: 'General-purpose agent mode inside ChatGPT: browses, runs code, uses connectors and completes multi-step tasks.',
    mcp: true, openSource: false, freeTier: true, priceUSD: 'Free / $20/mo Plus', priceINR: '≈ ₹1,999/mo + GST',
    india: { upi: true, languages: ['English', 'Hindi', 'Tamil', 'Telugu', 'Hinglish'], dpdp: 'Global policy; India entity billing', residency: 'Global', madeInIndia: false },
    bestFor: 'General research, browsing tasks, everyday automation', pros: ['Huge ecosystem', 'Strong browsing agent', 'Wide language support'], cons: ['Agent runs can be slow', 'Rate limits on Plus'],
    features: { 'Multi-agent': 'no', 'MCP support': 'yes', 'Local models': 'no', 'Self-host': 'no', 'IDE integration': 'no', 'Voice': 'yes' }
  },
  {
    slug: 'gemini-agent', name: 'Gemini', by: 'Google', icon: '✧', cat: 'assistant', rating: 4.5, score: 9.0,
    desc: "Google's assistant with Deep Research, Workspace integration and agentic actions across Google products.",
    mcp: true, openSource: false, freeTier: true, priceUSD: 'Free / $19.99/mo Advanced', priceINR: '≈ ₹1,950/mo + GST (India pricing available)',
    india: { upi: true, languages: ['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi'], dpdp: 'India-specific terms', residency: 'Global; some India processing', madeInIndia: false },
    bestFor: 'Google Workspace users; multilingual Indian users', pros: ['Best Indian language coverage', 'Workspace-native', 'Strong free tier'], cons: ['Agentic actions still uneven', 'Feature naming churn'],
    features: { 'Multi-agent': 'no', 'MCP support': 'yes', 'Local models': 'no', 'Self-host': 'no', 'IDE integration': 'partial', 'Voice': 'yes' }
  },
  {
    slug: 'n8n', name: 'n8n', by: 'n8n GmbH', icon: '⬡', cat: 'builder', rating: 4.6, score: 9.1,
    desc: 'Source-available workflow automation with native AI agent nodes — the go-to for self-hosted agent workflows.',
    mcp: true, openSource: true, freeTier: true, priceUSD: 'Self-host free / Cloud from $24/mo', priceINR: 'Self-host ₹0; cloud ≈ ₹2,400/mo + GST',
    india: { upi: false, languages: ['English UI'], dpdp: 'Self-host in India = easy DPDP story', residency: 'Self-host on Indian VPS', madeInIndia: false },
    bestFor: 'WhatsApp automations, SME workflows, self-hosters', pros: ['Self-host for ₹0 licence', 'Huge node library', 'AI agent nodes'], cons: ['Fair-code, not pure OSS', 'Cloud costs at scale'],
    features: { 'Multi-agent': 'partial', 'MCP support': 'yes', 'Local models': 'yes', 'Self-host': 'yes', 'IDE integration': 'no', 'Voice': 'no' }
  },
  {
    slug: 'sarvam', name: 'Sarvam AI', by: 'Sarvam (Bengaluru)', icon: '卐', cat: 'voice', rating: 4.3, score: 8.5,
    desc: 'Indian foundation-model company with voice agents and APIs tuned for Indic languages and Bharat use cases.',
    mcp: false, openSource: true, freeTier: true, priceUSD: 'API usage-based', priceINR: 'INR billing; startup credits available',
    india: { upi: true, languages: ['Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Bengali', 'Marathi', '+ more'], dpdp: 'India-first compliance posture', residency: 'India data centres', madeInIndia: true },
    bestFor: 'Indic-language voice bots and Bharat-scale apps', pros: ['Best Indic language support', 'India data residency', 'INR billing'], cons: ['Smaller ecosystem', 'Fewer integrations than global rivals'],
    features: { 'Multi-agent': 'no', 'MCP support': 'partial', 'Local models': 'yes', 'Self-host': 'partial', 'IDE integration': 'no', 'Voice': 'yes' }
  },
  {
    slug: 'krutrim', name: 'Krutrim', by: 'Ola Krutrim (Bengaluru)', icon: 'ॐ', cat: 'assistant', rating: 3.8, score: 7.6,
    desc: 'Indian AI cloud and assistant with Indic language models, GPU cloud and India data residency.',
    mcp: false, openSource: false, freeTier: true, priceUSD: 'Free assistant / cloud usage-based', priceINR: 'INR billing; India GPU cloud',
    india: { upi: true, languages: ['Hindi', 'English', '10+ Indic languages'], dpdp: 'India-first posture', residency: 'India data centres', madeInIndia: true },
    bestFor: 'India residency requirements; Indic chat', pros: ['Full India residency', 'INR + UPI billing', 'Indic focus'], cons: ['Model quality behind frontier', 'Agent features early'],
    features: { 'Multi-agent': 'no', 'MCP support': 'no', 'Local models': 'partial', 'Self-host': 'no', 'IDE integration': 'no', 'Voice': 'partial' }
  }
];

export const mcps = [
  { slug: 'filesystem-mcp', name: 'Filesystem MCP', cat: 'Developer Tools', official: true, rating: 4.9, installs: '12.3K', desc: 'Secure file system access and management for agents — read, write, search with allowlisted roots.', transport: 'stdio', security: 'Path allowlists, read-only mode' },
  { slug: 'github-mcp', name: 'GitHub MCP', cat: 'Developer Tools', official: true, rating: 4.8, installs: '8.7K', desc: 'Access repositories, manage issues and PRs, and automate GitHub workflows from any MCP client.', transport: 'stdio / remote', security: 'Fine-grained PAT scopes' },
  { slug: 'postgres-mcp', name: 'Postgres MCP', cat: 'Database', official: true, rating: 4.9, installs: '5.1K', desc: 'Query databases, inspect schemas and analyse data with parameterised, read-safe defaults.', transport: 'stdio', security: 'Read-only role recommended' },
  { slug: 'slack-mcp', name: 'Slack MCP', cat: 'Communication', official: true, rating: 4.7, installs: '6.2K', desc: 'Send messages, manage channels and automate team workflows.', transport: 'remote (OAuth)', security: 'Workspace-scoped OAuth' },
  { slug: 'gdrive-mcp', name: 'Google Drive MCP', cat: 'Productivity', official: true, rating: 4.6, installs: '4.8K', desc: 'Access files, manage sharing and collaborate on Drive documents.', transport: 'remote (OAuth)', security: 'Per-file OAuth scopes' },
  { slug: 'notion-mcp', name: 'Notion MCP', cat: 'Productivity', official: true, rating: 4.8, installs: '4.2K', desc: 'Create pages, query databases and manage your Notion workspace.', transport: 'remote (OAuth)', security: 'Integration token scoping' },
  { slug: 'pinecone-mcp', name: 'Pinecone MCP', cat: 'AI & ML', official: true, rating: 4.7, installs: '3.8K', desc: 'Vector database operations and similarity search for RAG-powered agents.', transport: 'remote', security: 'API key per index' },
  { slug: 'websearch-mcp', name: 'Web Search MCP', cat: 'Search', official: false, rating: 4.6, installs: '3.2K', desc: 'Real-time web search and content extraction for grounded answers.', transport: 'remote', security: 'Rate-limited API keys' },
  { slug: 'aws-mcp', name: 'AWS MCP', cat: 'Cloud & DevOps', official: true, rating: 4.5, installs: '2.9K', desc: 'Manage AWS services and infrastructure with guarded IAM roles.', transport: 'stdio', security: 'IAM least-privilege' },
  { slug: 'stripe-mcp', name: 'Stripe MCP', cat: 'Payments', official: true, rating: 4.4, installs: '2.5K', desc: 'Payment processing and subscription management (test-mode first!).', transport: 'remote', security: 'Restricted keys, test mode' },
  { slug: 'upi-setu-mcp', name: 'UPI / Setu MCP', cat: 'Payments (India)', official: false, rating: 4.3, installs: '1.1K', desc: 'Community MCP wrapping Indian payment APIs (UPI deeplinks, Setu, account-aggregator flows) for Bharat fintech agents.', transport: 'remote', security: 'Sandbox keys; RBI-regulated flows via licensed partners', india: true }
];

export const hubs = [
  { slug: 'coding-agents-hub', name: 'AI Coding Agents', icon: '⌨', pillar: 'AI Coding Agents', desc: 'Reviews, rankings and comparisons of AI agents that write, review and ship code.', topics: ['best-ai-coding-agent', 'claude-code-vs-cursor', 'cursor-vs-github-copilot'] },
  { slug: 'mcp-hub', name: 'MCP & Protocols', icon: '⛁', pillar: 'AI Agent Development', desc: 'Everything about the Model Context Protocol — servers, security, tutorials.', topics: ['what-is-mcp', 'mcp-vs-api', 'best-mcp-servers'] },
  { slug: 'agentic-future-hub', name: 'The Agentic Future', icon: '◈', pillar: 'AI Agent Resources', desc: 'The next wave: A2A, agent economies, observability, memory.', topics: ['what-is-a2a', 'agent-economy', 'agent-observability'] },
  { slug: 'business-ai-hub', name: 'AI Agents for Business', icon: '◫', pillar: 'AI Agents for Business', desc: 'AI agents for CRM, support, sales and workflow automation.', topics: ['best-ai-agent-for-business', 'ai-agents-for-customer-support', 'ai-agents-for-sales'] },
  { slug: 'voice-ai-hub', name: 'Voice AI Agents', icon: '◎', pillar: 'AI Agent Productivity', desc: 'Voice agents that answer calls, book appointments and speak Indic languages.', topics: ['best-voice-ai-platform', 'vapi-vs-retell', 'best-indic-voice-agent'] },
  { slug: 'builders-hub', name: 'Agent Builders & No-Code', icon: '⬒', pillar: 'AI Agent Builders', desc: 'No-code and low-code platforms for building AI agents.', topics: ['best-ai-agent-builder', 'n8n-vs-flowise', 'best-self-hosted-agent-stack'] },
  { slug: 'opensource-hub', name: 'Open Source Agents', icon: '⌬', pillar: 'AI Agent Development', desc: 'Self-hostable frameworks and agents: LangGraph, CrewAI, AutoGen, OpenHands, Aider.', topics: ['best-open-source-ai-agent', 'langgraph-vs-crewai', 'best-local-ai-agent'] },
  { slug: 'india-hub', name: 'AI Agents in India', icon: '🇮🇳', pillar: 'AI Agent Resources', desc: 'India-first coverage: INR pricing, UPI support, DPDP compliance, Indic languages.', topics: ['best-ai-agent-india', 'ai-agent-pricing-india', 'dpdp-compliance-ai-agents'] }
];

export const topics = {
  'best-ai-agent-india': {
    t: 'Best AI Agent in India 2026', hub: 'india-hub', picks: ['gemini-agent', 'chatgpt-agent', 'sarvam', 'n8n', 'krutrim'],
    qa: 'For most Indian users, Gemini is the best overall AI agent (Indic languages, India pricing, strong free tier); ChatGPT leads for agentic browsing tasks; Sarvam AI is the best Made-in-India platform when data residency and Indic voice matter; and self-hosted n8n is the best value for SMEs.',
    kt: ['Gemini leads on Indic language breadth and India pricing.', 'ChatGPT wins for agentic browsing and connector depth.', 'Sarvam AI is the specialist for Indic voice and India residency.', 'n8n is the best self-hosted value for Indian SMEs.', 'Krutrim is the strategic hedge for strict data-residency requirements.']
  },
  'what-is-mcp': {
    t: 'What is MCP? Model Context Protocol Explained', hub: 'mcp-hub', picks: ['claude-code', 'cursor', 'github-copilot'],
    qa: 'MCP (Model Context Protocol) is an open standard, introduced by Anthropic in November 2024, that lets AI models connect to external tools, data and services through a common client-server interface.',
    kt: ['One protocol replaces N custom integrations per app.', 'Servers expose tools, resources and prompts.', 'Adopted across the industry in 2025.', 'Transports: stdio for local, HTTP/SSE for remote.', 'Security is your job: scope tokens, prefer read-only.']
  },
  'best-voice-ai-platform': {
    t: 'Best Voice AI Platform (2026)', hub: 'voice-ai-hub', picks: ['vapi', 'retell', 'sarvam'],
    qa: 'Vapi is the best voice AI platform for developers; Retell is the best for support teams replacing IVRs; Sarvam AI is the best choice when Indic languages and India data residency are non-negotiable.',
    kt: ['Latency under ~800ms end-to-end is where calls stop feeling robotic.', 'Per-minute pricing (₹4–8/min all-in) makes volume math essential.', 'Indian telephony needs a local partner.', 'Test with real accents — demos use easy audio.', 'Consent scripts for recording are a DPDP requirement.']
  }
};

export const entities = [
  { slug: 'openai', name: 'OpenAI', type: 'Company', icon: '✦', founded: '2015', hq: 'San Francisco, USA', desc: 'AI research and deployment company behind GPT models and ChatGPT.', products: ['chatgpt-agent'], relEntities: ['anthropic', 'google-deepmind'] },
  { slug: 'anthropic', name: 'Anthropic', type: 'Company', icon: '◈', founded: '2021', hq: 'San Francisco, USA', desc: 'AI safety company behind Claude. Created and open-sourced MCP in November 2024.', products: ['claude-code'], relEntities: ['openai', 'mcp-protocol'] },
  { slug: 'google-deepmind', name: 'Google (DeepMind)', type: 'Company', icon: '✧', founded: '2010', hq: 'Mountain View / London', desc: "Google's AI unit behind Gemini. Announced A2A protocol in April 2025.", products: ['gemini-agent'], relEntities: ['a2a-protocol', 'openai'] },
  { slug: 'sarvam-ai', name: 'Sarvam AI', type: 'Company', icon: '卐', founded: '2023', hq: 'Bengaluru, India', india: true, desc: "India's leading foundation-model company: Indic-language models, voice agents, India data residency.", products: ['sarvam'], relEntities: ['ola-krutrim'] },
  { slug: 'mcp-protocol', name: 'Model Context Protocol (MCP)', type: 'Protocol', icon: '⛁', desc: 'The open standard connecting AI models to tools, data and services. Created by Anthropic in November 2024.', products: [], relEntities: ['anthropic', 'a2a-protocol'] },
  { slug: 'a2a-protocol', name: 'Agent2Agent Protocol (A2A)', type: 'Protocol', icon: '⇄', desc: 'Open protocol for agent-to-agent discovery, task exchange and collaboration. Announced by Google in April 2025.', products: [], relEntities: ['google-deepmind', 'mcp-protocol'] },
  { slug: 'langgraph', name: 'LangGraph', type: 'Framework', icon: '◬', desc: 'LangChain graph-based agent orchestration framework: explicit state machines, checkpointing, HITL.', products: ['langgraph'], relEntities: ['crewai', 'autogen-fw'] },
  { slug: 'crewai', name: 'CrewAI', type: 'Framework', icon: '⛓', desc: 'Role-based multi-agent framework in Python: define crews of agents with tasks, tools and processes.', products: ['crewai'], relEntities: ['langgraph', 'autogen-fw'] },
  { slug: 'n8n-gmbh', name: 'n8n', type: 'Builder', icon: '⬡', desc: 'Source-available workflow automation with native AI agent nodes and 400+ integrations.', products: ['n8n'], relEntities: ['flowise', 'dify'] },
  { slug: 'dify', name: 'Dify', type: 'Builder', icon: '◍', desc: 'Open-source LLM app platform: agents, RAG pipelines, workflows and observability.', products: ['dify'], relEntities: ['flowise', 'n8n-gmbh'] },
  { slug: 'flowise', name: 'Flowise', type: 'Builder', icon: '❖', desc: 'Open-source visual builder for LLM flows and agents — drag-and-drop LangChain.', products: ['flowise'], relEntities: ['dify', 'n8n-gmbh'] },
  { slug: 'pinecone', name: 'Pinecone', type: 'Vector DB', icon: '⧫', desc: 'Managed vector database powering similarity search and long-term memory for RAG-grounded agents.', products: [], mcps: ['pinecone-mcp'], relEntities: ['mcp-protocol'] },
  { slug: 'ola-krutrim', name: 'Ola Krutrim', type: 'Company', icon: 'ॐ', founded: '2023', hq: 'Bengaluru, India', india: true, desc: "Ola's AI venture: Indic assistant plus an India-resident GPU cloud.", products: ['krutrim'], relEntities: ['sarvam-ai'] },
  { slug: 'autogen-fw', name: 'AutoGen (AG2)', type: 'Framework', icon: '⟠', desc: 'Conversation-driven multi-agent framework with Microsoft research pedigree.', products: ['autogen'], relEntities: ['microsoft', 'langgraph', 'crewai'] },
  { slug: 'microsoft', name: 'Microsoft / GitHub', type: 'Company', icon: '◉', founded: '1975', hq: 'Redmond, USA', desc: 'Owner of GitHub and the most widely deployed AI pair programmer, GitHub Copilot.', products: ['github-copilot', 'autogen'], relEntities: ['openai', 'mcp-protocol'] },
  { slug: 'cognition', name: 'Cognition', type: 'Company', icon: '⬢', founded: '2023', hq: 'San Francisco, USA', desc: 'The startup behind Devin and Windsurf.', products: ['devin', 'windsurf'], relEntities: ['anthropic', 'openai'] }
];

export const researchAssets = [
  { slug: 'ai-agent-market-map', name: 'AI Agent Market Map', icon: '🗺', tag: 'Visual landscape', blurb: 'Every tracked agent plotted by category — the one-glance picture of the 2026 agent ecosystem.' },
  { slug: 'ai-agent-benchmark-report', name: 'AI Agent Benchmark Report — Q3 2026', icon: '📊', tag: 'Quarterly data', blurb: 'Category winners, overall top-10 and score detail from our 42-point framework.' },
  { slug: 'ai-agent-awards', name: 'AI Agent Awards 2026', icon: '🏆', tag: 'Annual awards', blurb: '8 trophies decided entirely by benchmark scores: Best Overall, Free, OSS, Value, Made-in-India, Voice, Framework, Builder.' },
  { slug: 'ai-agent-statistics', name: 'AI Agent Statistics', icon: '📈', tag: 'Live stats', blurb: 'Citable numbers computed live from our dataset: MCP adoption %, OSS share, UPI %, price medians.' },
  { slug: 'ai-agent-cost-report', name: 'AI Agent Cost Report — India Edition', icon: '₹', tag: 'INR + GST', blurb: 'Real monthly budgets for solo devs, SMEs and enterprises with hidden-cost breakdown.' },
  { slug: 'ai-agent-landscape-report', name: 'AI Agent Landscape Report 2026', icon: '🧭', tag: 'State of the ecosystem', blurb: 'Protocols, the entity graph, India homegrown layer and where the category goes next.' }
];

export const pillars = [
  { slug: 'ai-coding-agents', name: 'AI Coding Agents', icon: '⌨', desc: 'The full silo on AI agents that write, review and ship code.', hubs: ['coding-agents-hub'] },
  { slug: 'ai-agent-development', name: 'AI Agent Development', icon: '◬', desc: 'Frameworks, protocols and open-source stacks for building agents.', hubs: ['mcp-hub', 'opensource-hub'] },
  { slug: 'ai-agents-for-business', name: 'AI Agents for Business', icon: '◫', desc: 'Agents that do business work — CRM, support, sales, WhatsApp.', hubs: ['business-ai-hub'] },
  { slug: 'ai-agent-builders', name: 'AI Agent Builders', icon: '⬒', desc: 'No-code and low-code platforms for assembling agents visually.', hubs: ['builders-hub'] },
  { slug: 'ai-agent-productivity', name: 'AI Agent Productivity', icon: '◎', desc: 'Agents in daily workflows — voice, assistants, briefings.', hubs: ['voice-ai-hub'] },
  { slug: 'ai-agent-resources', name: 'AI Agent Resources', icon: '◈', desc: 'Knowledge layer: agentic future, India-first coverage, glossary.', hubs: ['agentic-future-hub', 'india-hub'] }
];

export const authorProfiles = {
  'arshdeep-singh': { name: 'Arshdeep Singh', role: 'Research Lead', icon: '👨‍💻', bio: 'Leads the testing program. Ten years across backend engineering and developer tooling.', expertise: ['Coding agents', 'Agent frameworks', 'Benchmark design'], reviews: 31 },
  'priya-iyer': { name: 'Priya Iyer', role: 'AI Engineer & Fact-checker', icon: '👩‍🔬', bio: 'Second-reviews every published claim. ML engineer with production RAG and voice-agent deployments.', expertise: ['Voice agents', 'Indic language testing', 'DPDP compliance'], reviews: 28 },
  'karan-mehra': { name: 'Karan Mehra', role: 'MCP & Infrastructure Analyst', icon: '🧑‍🔧', bio: 'Covers the protocol layer: MCP servers, A2A, self-hosted stacks.', expertise: ['MCP servers', 'Self-hosted stacks', 'Agent infrastructure'], reviews: 24 }
};

export const featuredComparisons = [
  ['claude-code', 'cursor'], ['cursor', 'github-copilot'], ['vapi', 'retell'],
  ['langgraph', 'crewai'], ['n8n', 'flowise'], ['flowise', 'dify'], ['autogen', 'crewai'], ['gemini-agent', 'chatgpt-agent']
];
