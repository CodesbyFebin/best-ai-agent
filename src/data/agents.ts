export interface AgentPricing {
  type: 'free' | 'freemium' | 'paid' | 'enterprise' | 'open_source';
  startingPriceINR?: string;
  startingPriceUSD?: string;
  verifiedAt?: string;
  details?: string;
}

export interface AgentScore {
  overall: number;
  reasoning: number;
  toolUse: number;
  value: number;
  privacy: number;
  easeOfUse: number;
  indiaFit: number;
}

export interface Agent {
  id: string;
  slug: string;
  name: string;
  company: string;
  logo: string;
  summary: string;
  bestFor: string[];
  categories: string[];
  pricing: AgentPricing;
  score: AgentScore;
  deployment: string[];
  integrations: string[];
  openSource: boolean;
  testingDate: string;
  updatedAt: string;
  knownLimitation: string;
  reviewUrl: string;
  officialUrl: string;
  featured?: boolean;
  trending?: boolean;
  builtInIndia?: boolean;
}

export const featuredAgents: Agent[] = [
  {
    id: "chatgpt",
    slug: "chatgpt",
    name: "ChatGPT (Agent Mode)",
    company: "OpenAI",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    summary: "OpenAI's flagship assistant featuring web canvas, agentic code execution, memory, and multi-modal tool use.",
    bestFor: ["General Reasoning", "Multi-modal Analysis", "Custom GPT Workflows", "Interactive Canvas Drafting"],
    categories: ["Personal AI Assistants", "Coding Agents", "Research Agents"],
    pricing: {
      type: "freemium",
      startingPriceUSD: "$20/mo",
      startingPriceINR: "₹1,999/mo",
      verifiedAt: "2026-07-20",
      details: "Free Tier with GPT-4o mini; Plus at $20/mo; Enterprise customized."
    },
    score: {
      overall: 9.5,
      reasoning: 9.7,
      toolUse: 9.4,
      value: 9.2,
      privacy: 8.8,
      easeOfUse: 9.8,
      indiaFit: 9.3
    },
    deployment: ["Web", "Desktop (Mac/Win)", "API", "Mobile (iOS/Android)"],
    integrations: ["Google Workspace", "Microsoft 365", "GitHub", "Zapier"],
    openSource: false,
    testingDate: "2026-07-15",
    updatedAt: "2026-07-22",
    knownLimitation: "Complex multi-step browser tool loops can occasionally hit rate limits during peak usage hours.",
    reviewUrl: "/a/best-ai-agent/reviews/chatgpt/",
    officialUrl: "https://chatgpt.com",
    featured: true,
    trending: true
  },
  {
    id: "claude",
    slug: "claude",
    name: "Claude 3.5 Sonnet & Computer Use",
    company: "Anthropic",
    logo: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=120&q=80",
    summary: "Industry-leading agent for complex code generation, autonomous OS control (Computer Use), and deep document analysis.",
    bestFor: ["Complex Code Refactoring", "Autonomous Computer Control", "Long Document Analysis", "Artifact Generation"],
    categories: ["Coding Agents", "Research Agents", "Personal AI Assistants"],
    pricing: {
      type: "freemium",
      startingPriceUSD: "$20/mo",
      startingPriceINR: "₹1,999/mo",
      verifiedAt: "2026-07-21",
      details: "Free Tier; Pro at $20/mo; Team at $25/user/mo; Pay-as-you-go API."
    },
    score: {
      overall: 9.6,
      reasoning: 9.8,
      toolUse: 9.7,
      value: 9.3,
      privacy: 9.2,
      easeOfUse: 9.5,
      indiaFit: 9.1
    },
    deployment: ["Web", "Desktop", "API", "CLI"],
    integrations: ["GitHub", "VS Code", "Slack", "Google Drive"],
    openSource: false,
    testingDate: "2026-07-18",
    updatedAt: "2026-07-23",
    knownLimitation: "Computer Use feature requires controlled sandbox environments to prevent unintended system actions.",
    reviewUrl: "/a/best-ai-agent/reviews/claude/",
    officialUrl: "https://claude.ai",
    featured: true,
    trending: true
  },
  {
    id: "cursor-ai",
    slug: "cursor-ai",
    name: "Cursor AI Editor",
    company: "Anysphere",
    logo: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=120&q=80",
    summary: "AI-first fork of VS Code with multi-file Agent Mode, terminal execution, and deep codebase indexing.",
    bestFor: ["Full-stack Codebase Refactoring", "Autonomous Terminal Debugging", "Multi-file Changes"],
    categories: ["Coding Agents", "Developer Tools"],
    pricing: {
      type: "freemium",
      startingPriceUSD: "$20/mo",
      startingPriceINR: "₹1,800/mo",
      verifiedAt: "2026-07-19",
      details: "Free trial (2,000 completions); Pro at $20/mo; Business at $40/user/mo."
    },
    score: {
      overall: 9.7,
      reasoning: 9.6,
      toolUse: 9.8,
      value: 9.5,
      privacy: 9.0,
      easeOfUse: 9.7,
      indiaFit: 9.6
    },
    deployment: ["Desktop IDE (Mac/Win/Linux)"],
    integrations: ["Git", "GitHub", "Terminal", "VS Code Extensions"],
    openSource: false,
    testingDate: "2026-07-19",
    updatedAt: "2026-07-22",
    knownLimitation: "Indexed codebase embeddings can take up to 10 minutes on repos with >100,000 files.",
    reviewUrl: "/a/best-ai-agent/reviews/cursor-ai/",
    officialUrl: "https://cursor.com",
    featured: true,
    trending: true
  },
  {
    id: "vapi-ai",
    slug: "vapi-ai",
    name: "Vapi Voice AI Platform",
    company: "Vapi Labs",
    logo: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=120&q=80",
    summary: "Enterprise voice AI orchestration platform powering low-latency phone agents and conversational voice workflows.",
    bestFor: ["Inbound Customer Phone Support", "Outbound Appointment Scheduling", "Low-latency Voice Bots"],
    categories: ["Voice Agents", "Customer Support", "Business Automation"],
    pricing: {
      type: "paid",
      startingPriceUSD: "$0.05/min",
      startingPriceINR: "₹4.50/min",
      verifiedAt: "2026-07-15",
      details: "Pay-as-you-go per audio minute + telephony costs."
    },
    score: {
      overall: 9.3,
      reasoning: 9.0,
      toolUse: 9.5,
      value: 9.2,
      privacy: 9.4,
      easeOfUse: 9.2,
      indiaFit: 9.5
    },
    deployment: ["API", "Telephony (SIP/Twilio)", "Web SDK", "Mobile SDK"],
    integrations: ["Twilio", "Exotel", "Salesforce", "Zapier", "HubSpot"],
    openSource: false,
    testingDate: "2026-07-12",
    updatedAt: "2026-07-20",
    knownLimitation: "Indian accent recognition accuracy drops slightly on noisy regional cellular networks.",
    reviewUrl: "/a/best-ai-agent/reviews/vapi-ai/",
    officialUrl: "https://vapi.ai",
    featured: true,
    trending: true
  },
  {
    id: "grok",
    slug: "grok",
    name: "Grok 2 & Grok Heavy",
    company: "xAI",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    summary: "Uncensored conversational AI agent with real-time X telemetry access, FLUX image synthesis, and vision logic.",
    bestFor: ["Real-time News Analysis", "Social Media Trend Intelligence", "Filter-free Debates"],
    categories: ["Personal AI Assistants", "Research Agents"],
    pricing: {
      type: "paid",
      startingPriceUSD: "$8/mo",
      startingPriceINR: "₹650/mo",
      verifiedAt: "2026-07-10",
      details: "Included with X Premium ($8/mo) or X Premium+ ($16/mo)."
    },
    score: {
      overall: 8.9,
      reasoning: 9.0,
      toolUse: 8.6,
      value: 9.1,
      privacy: 8.3,
      easeOfUse: 9.0,
      indiaFit: 8.8
    },
    deployment: ["Web", "X iOS/Android App", "API"],
    integrations: ["X Telemetry", "FLUX Image Gen"],
    openSource: false,
    testingDate: "2026-07-10",
    updatedAt: "2026-07-21",
    knownLimitation: "Live web search results are heavily weighted toward X posts rather than traditional index databases.",
    reviewUrl: "/a/best-ai-agent/reviews/grok/",
    officialUrl: "https://x.ai",
    featured: true
  },
  {
    id: "crewai",
    slug: "crewai",
    name: "CrewAI Orchestration",
    company: "CrewAI Inc",
    logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=120&q=80",
    summary: "Leading Python multi-agent framework enabling role-based agent coordination, tool delegation, and sequential execution.",
    bestFor: ["Multi-agent Task Pipelines", "Autonomous Content Production", "Hierarchical Agent Teams"],
    categories: ["Agent Frameworks", "Open-Source Agents"],
    pricing: {
      type: "open_source",
      startingPriceUSD: "Free",
      startingPriceINR: "Free",
      verifiedAt: "2026-07-15",
      details: "100% Open-Source Python library; Enterprise Cloud starting at $250/mo."
    },
    score: {
      overall: 9.4,
      reasoning: 9.3,
      toolUse: 9.6,
      value: 9.8,
      privacy: 9.6,
      easeOfUse: 9.1,
      indiaFit: 9.5
    },
    deployment: ["Python Package (PyPI)", "Docker", "Self-hosted Server", "Cloud Run"],
    integrations: ["LangChain Tools", "LlamaIndex", "OpenAI API", "Anthropic API"],
    openSource: true,
    testingDate: "2026-07-14",
    updatedAt: "2026-07-22",
    knownLimitation: "High token consumption if agent loops do not specify strict iteration max limits.",
    reviewUrl: "/a/best-ai-agent/reviews/crewai/",
    officialUrl: "https://crewai.com",
    featured: true
  },
  {
    id: "krutrim",
    slug: "krutrim",
    name: "Krutrim AI Agent",
    company: "Ola Krutrim",
    logo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    summary: "India's pioneer sovereign AI agent suite trained on 22 Indic languages with native Indian context and payments support.",
    bestFor: ["Indic Language Customer Service", "Indian Regulatory Workflows", "UPI Payment Integration"],
    categories: ["Business Automation", "Personal AI Assistants"],
    pricing: {
      type: "freemium",
      startingPriceUSD: "Free",
      startingPriceINR: "Free",
      verifiedAt: "2026-07-18",
      details: "Free Consumer Tier; Cloud API starting at ₹0.09 per 1,000 tokens."
    },
    score: {
      overall: 8.8,
      reasoning: 8.4,
      toolUse: 8.7,
      value: 9.5,
      privacy: 9.0,
      easeOfUse: 8.9,
      indiaFit: 9.9
    },
    deployment: ["Web", "Mobile App", "REST API", "Krutrim Cloud"],
    integrations: ["UPI Payments", "WhatsApp Business", "ONDC Protocol"],
    openSource: false,
    testingDate: "2026-07-11",
    updatedAt: "2026-07-20",
    knownLimitation: "Advanced multi-file code editing lags behind specialized coding agents like Cursor or Claude.",
    reviewUrl: "/a/best-ai-agent/reviews/krutrim/",
    officialUrl: "https://krutrim.com",
    featured: true,
    builtInIndia: true
  },
  {
    id: "perplexity",
    slug: "perplexity",
    name: "Perplexity Pro Agent",
    company: "Perplexity AI",
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    summary: "Conversational answer engine combining live web synthesis, citation verification, and Deep Research agent workflows.",
    bestFor: ["Academic & Market Research", "Fact-checked Syntheses", "Real-time Citation Verification"],
    categories: ["Research Agents", "Personal AI Assistants"],
    pricing: {
      type: "freemium",
      startingPriceUSD: "$20/mo",
      startingPriceINR: "₹1,999/mo",
      verifiedAt: "2026-07-20",
      details: "Free Tier (5 Pro searches/day); Pro at $20/mo with unlimited Opus/GPT-4o queries."
    },
    score: {
      overall: 9.5,
      reasoning: 9.5,
      toolUse: 9.6,
      value: 9.4,
      privacy: 8.9,
      easeOfUse: 9.8,
      indiaFit: 9.2
    },
    deployment: ["Web", "iOS/Android", "Chrome Extension", "API"],
    integrations: ["Google Search", "Wolfram Alpha", "Academic Papers"],
    openSource: false,
    testingDate: "2026-07-16",
    updatedAt: "2026-07-22",
    knownLimitation: "Deep Research mode takes 2-4 minutes per query to aggregate 50+ source citations.",
    reviewUrl: "/a/best-ai-agent/reviews/perplexity/",
    officialUrl: "https://perplexity.ai",
    featured: true
  }
];

export function getAgentBySlug(slug: string): Agent | undefined {
  return featuredAgents.find(a => a.slug === slug || a.id === slug);
}
