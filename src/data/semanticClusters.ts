export interface SemanticCluster {
  id: string;
  parentTopic: string;
  childKeywords: string[];
  description: string;
  searchVolume: string;
  intent: 'Informational' | 'Transactional' | 'Commercial' | 'Comparison';
}

export interface SemanticEntity {
  name: string;
  type: 'AI Company' | 'AI Product' | 'Concept' | 'Framework' | 'Protocol';
  description: string;
  slug: string;
  marketShare?: string;
}

export const primarySeedKeyword = "best ai agent";

export const alsoAskedClusters: SemanticCluster[] = [
  {
    id: "cluster-1",
    parentTopic: "Which is the best AI agent now?",
    description: "Evaluates top-performing overall AI agents, comparing intelligence, speed, and real-world capabilities.",
    searchVolume: "45,000/mo",
    intent: "Comparison",
    childKeywords: [
      "What AI is better than ChatGPT?",
      "What are the 7 types of AI agents?",
      "What is the #1 AI right now?",
      "Who are the Big 4 of AI?",
      "Is ChatGPT still the best AI?",
      "Which AI is the most powerful AI?",
      "Which AI is 100% free?",
      "What is the best top 10 AI?"
    ]
  },
  {
    id: "cluster-2",
    parentTopic: "Who are the Big 4 AI agents?",
    description: "Industry breakdown of market leaders (OpenAI, Anthropic, Google DeepMind, Microsoft, xAI) and enterprise pricing.",
    searchVolume: "28,000/mo",
    intent: "Commercial",
    childKeywords: [
      "Which AI is the most powerful AI?",
      "How much do AI agents cost?",
      "Which jobs will survive AI?",
      "What are the 7 types of AI agents?",
      "What are the most common AI agents?",
      "Who is the #1 AI company?",
      "What are the risks of using AI agents?",
      "How many AI agents currently exist?"
    ]
  },
  {
    id: "cluster-3",
    parentTopic: "Is ChatGPT an agent or LLM?",
    description: "Technical distinction between pure Large Language Models and autonomous agentic workflows.",
    searchVolume: "32,000/mo",
    intent: "Informational",
    childKeywords: [
      "Why are people leaving ChatGPT?",
      "What are the 7 types of AI agents?",
      "Is there a better LLM than ChatGPT?",
      "What are the 5 agents of AI?",
      "What are the 4 pillars of AI agents?",
      "Are Claude and ChatGPT LLM?",
      "Can ChatGPT be an agent?",
      "Is ChatGPT and Copilot the same LLM?"
    ]
  },
  {
    id: "cluster-4",
    parentTopic: "Which AI does Elon Musk use?",
    description: "In-depth analysis of Grok AI, xAI infrastructure, real-time X data access, and benchmark performance.",
    searchVolume: "19,500/mo",
    intent: "Informational",
    childKeywords: [
      "How much does Grok cost per month?",
      "Who runs Grok?",
      "What is the spicy mode in Grok AI?",
      "Is xAI the same thing as Grok?",
      "What is Grok Heavy?",
      "Is xAI like ChatGPT?",
      "What does Elon Musk fear about AI?",
      "How does Grok AI compare to ChatGPT?"
    ]
  }
];

export const semanticEntitiesList: SemanticEntity[] = [
  { name: "OpenAI", type: "AI Company", description: "Creator of ChatGPT, GPT-4o, Codex, and Operator agents.", slug: "openai" },
  { name: "Anthropic", type: "AI Company", description: "Creator of Claude 3.5 Sonnet, Computer Use Agent, and Opus.", slug: "anthropic" },
  { name: "Google DeepMind", type: "AI Company", description: "Creator of Gemini 1.5 Pro, Project Astra, and Vertex AI Agents.", slug: "google-deepmind" },
  { name: "Microsoft", type: "AI Company", description: "Creator of Copilot, AutoGen, and Dynamics 365 AI Agents.", slug: "microsoft" },
  { name: "xAI", type: "AI Company", description: "Elon Musk's AI research company behind Grok 2 and Grok Heavy.", slug: "xai" },
  { name: "ChatGPT", type: "AI Product", description: "World's most popular conversational AI with Agent Mode and Web Canvas.", slug: "chatgpt" },
  { name: "Claude", type: "AI Product", description: "Leading agentic AI for complex coding, computer use, and artifact generation.", slug: "claude" },
  { name: "Grok", type: "AI Product", description: "Real-time AI assistant integrated with X telemetry and unaligned reasoning.", slug: "grok" },
  { name: "Copilot", type: "AI Product", description: "Microsoft & GitHub AI assistant embedded into Windows, Office, and IDEs.", slug: "copilot" },
  { name: "Cursor AI", type: "AI Product", description: "Hyper-popular AI-first code editor with agentic auto-refactoring.", slug: "cursor-ai" },
  { name: "Windsurf", type: "AI Product", description: "Codeium's agentic IDE with Cascade flow for multi-file editing.", slug: "windsurf" },
  { name: "Vapi AI", type: "AI Product", description: "Enterprise voice AI agent platform for low-latency phone calls.", slug: "vapi-ai" },
  { name: "Retell AI", type: "AI Product", description: "Conversational voice engine for inbound and outbound voice agents.", slug: "retell-ai" },
  { name: "CrewAI", type: "Framework", description: "Multi-agent orchestration framework in Python for role-based execution.", slug: "crewai" },
  { name: "LangGraph", type: "Framework", description: "Cyclic graph framework for stateful multi-agent workflows by LangChain.", slug: "langgraph" },
  { name: "AutoGen", type: "Framework", description: "Microsoft framework for multi-agent conversational interaction.", slug: "autogen" },
  { name: "MCP Protocol", type: "Protocol", description: "Model Context Protocol for connecting AI models to external data and tools.", slug: "mcp-protocol" },
  { name: "Autonomous Agent", type: "Concept", description: "Self-directing AI that formulates goals, breaks down sub-tasks, and executes tool calls.", slug: "autonomous-agent" },
  { name: "LLM vs Agent", type: "Concept", description: "Understanding the shift from reactive language generation to proactive goal completion.", slug: "llm-vs-agent" }
];

export const highIntentClusters = [
  {
    category: "1. Rankings",
    topics: ["Best AI Agents", "Top AI Assistants", "Best AI Chatbots", "Top AI Tools", "Best AI Platforms", "Best AI Agent 2026"]
  },
  {
    category: "2. Reviews",
    topics: ["ChatGPT Review", "Claude Review", "Grok Review", "Gemini Review", "Copilot Review", "Perplexity Review", "Cursor Review"]
  },
  {
    category: "3. Comparisons",
    topics: ["ChatGPT vs Claude", "Claude vs Gemini", "Grok vs ChatGPT", "Gemini vs ChatGPT", "Perplexity vs ChatGPT", "Cursor vs Windsurf", "Vapi vs Retell"]
  },
  {
    category: "4. Pricing",
    topics: ["ChatGPT Pricing", "Claude Pricing", "Grok Pricing", "Gemini Pricing", "Copilot Pricing", "Cursor Pricing"]
  },
  {
    category: "5. Alternatives",
    topics: ["ChatGPT Alternatives", "Claude Alternatives", "Grok Alternatives", "Gemini Alternatives", "Cursor Alternatives"]
  },
  {
    category: "6. Enterprise",
    topics: ["Enterprise AI Agents", "AI Agent Platforms", "AI Automation", "AI Workflow", "AI Orchestration", "Multi-Agent Systems"]
  },
  {
    category: "7. Development",
    topics: ["AI Agent Frameworks", "MCP Servers", "Agent SDKs", "LangGraph", "CrewAI", "AutoGen", "OpenAI Agents SDK"]
  },
  {
    category: "8. Industry Use Cases",
    topics: ["AI Agents for Healthcare", "AI Agents for Finance", "AI Agents for Marketing", "AI Agents for Sales", "AI Agents for Education", "AI Agents for Customer Support"]
  }
];

export interface RecommendedPseoUrl {
  path: string;
  type: string;
  entity: string;
  description: string;
}

export const recommendedPseoUrls: RecommendedPseoUrl[] = [
  { path: "/agents/chatgpt/", type: "Review", entity: "ChatGPT", description: "In-depth review of OpenAI ChatGPT Agent Mode, benchmarks, pricing, and India fit." },
  { path: "/agents/claude/", type: "Review", entity: "Claude", description: "Comprehensive analysis of Anthropic Claude 3.5 Sonnet, Computer Use agent, and code benchmark scores." },
  { path: "/agents/grok/", type: "Review", entity: "Grok", description: "xAI Grok 2 & Grok Heavy review, real-time X data telemetry, spicy mode, and API cost." },
  { path: "/compare/chatgpt-vs-claude/", type: "Comparison", entity: "ChatGPT vs Claude", description: "Head-to-head comparison between ChatGPT-4o and Claude 3.5 Sonnet for coding and reasoning." },
  { path: "/compare/claude-vs-gemini/", type: "Comparison", entity: "Claude vs Gemini", description: "Anthropic Claude vs Google Gemini 1.5 Pro benchmark showdown across multi-modal reasoning." },
  { path: "/pricing/chatgpt/", type: "Pricing", entity: "ChatGPT Pricing", description: "ChatGPT Free vs Plus ($20/mo) vs Team ($25/mo) vs Enterprise API pricing breakdown." },
  { path: "/pricing/claude/", type: "Pricing", entity: "Claude Pricing", description: "Claude Free vs Pro ($20/mo) vs API token pricing per 1M tokens." },
  { path: "/alternatives/chatgpt/", type: "Alternatives", entity: "ChatGPT Alternatives", description: "Top 10 alternative AI agents to ChatGPT including Claude, Perplexity, and DeepSeek." },
  { path: "/frameworks/langgraph/", type: "Framework", entity: "LangGraph", description: "LangGraph production guide for building stateful cyclic multi-agent graphs." },
  { path: "/categories/customer-support/", type: "Use Case", entity: "Customer Support", description: "Best AI agents for 24/7 customer support automation, voice call handling, and SLA tracking." },
  { path: "/categories/healthcare/", type: "Industry", entity: "Healthcare", description: "HIPAA-compliant AI agents for patient scheduling, medical record parsing, and clinical workflow." }
];
