import { allTopicalPages, type PageType, type SearchIntent } from '../topicalAuthority';

export interface Product {
  id: string;
  name: string;
  slug: string;
  vendorName: string;
  vendorUrl: string;
  logoUrl: string;
  summary: string;
  bestFor: string;
  bestForProfiles: string[];
  limitations: string[];
  pricingModel: 'Free' | 'Freemium' | 'Pay-as-you-go' | 'Paid' | 'Enterprise' | 'Open Source';
  startingPriceINR: string;
  startingPriceUSD: string;
  freeTrial: boolean;
  openSource: boolean;
  overallScore: number;
  scores: {
    easeOfUse: number;
    features: number;
    docs: number;
    integrations: number;
    value: number;
    reliability: number;
    indiaFit: number;
    scalability: number;
  };
  pros: string[];
  cons: string[];
  featuresList: string[];
  verdict: string;
  useCases: string[];
  whatsappReady: boolean;
  indianPaymentSupport: boolean;
  whatWeTested: string;
  lastVerified: string;
  alternativeSlugs: string[];
  comparisonSlugs: string[];
  frameworkSlugs: string[];
}

export const products: Product[] = [
  {
    id: 'cursor',
    name: 'Cursor AI',
    slug: 'cursor-ai',
    vendorName: 'Anysphere Inc.',
    vendorUrl: 'https://cursor.com',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80',
    summary: 'An advanced AI-powered code editor built as a hard fork of VS Code. It offers elite code prediction, inline edits, and repository-wide context indexing.',
    bestFor: 'Professional developers and engineering teams seeking deep codebase search and automated code generation.',
    bestForProfiles: ['Senior software engineers', 'Engineering leads', 'TypeScript/JavaScript full-stack developers', 'DevOps architects'],
    limitations: ['No native offline model support', 'Privacy mode requires manual configuration', 'Subscription required for high-end queries'],
    pricingModel: 'Freemium',
    startingPriceINR: '₹1,680/month (approx. $20/mo)',
    startingPriceUSD: '$20/mo',
    freeTrial: true,
    openSource: false,
    overallScore: 9.6,
    scores: {
      easeOfUse: 9.8,
      features: 9.6,
      docs: 9.4,
      integrations: 9.5,
      value: 9.7,
      reliability: 9.6,
      indiaFit: 10.0,
      scalability: 9.4
    },
    pros: [
      'Zero learning curve for existing VS Code users.',
      'Elite repository-wide context indexing (finds code references instantly).',
      'Extremely fast inline code generation (Cmd + K) and multi-file editing.'
    ],
    cons: [
      'No native offline model support; requires subscription for high-end queries.',
      'Privacy settings require manual opt-in/opt-out policies for enterprise usage.'
    ],
    featuresList: [
      'Codebase Context Indexing',
      'AI-powered Multi-file Editing (Composer Mode)',
      'Inline Code Generation and Edits',
      'Direct Terminal Command Explanations',
      'Local Dev Server Log Analysis'
    ],
    verdict: 'Cursor has fast become the absolute gold standard for AI coding environments. Its deep architectural understanding makes it an indispensable asset for developers.',
    useCases: [
      'Automating complex structural rewrites in legacy TypeScript code bases.',
      'Dramatically speeding up frontend development with real-time CSS/Tailwind recommendations.',
      'Explaining large, undocumented codebases to incoming junior developer hires.'
    ],
    whatsappReady: false,
    indianPaymentSupport: true,
    whatWeTested: 'Repository indexing speed, multi-file composer accuracy, inline suggestion latency <500ms, terminal integration depth, Privacy Mode compliance, VS Code extension parity, and React/TypeScript project handling.',
    lastVerified: '2026-06-11',
    alternativeSlugs: ['github-copilot', 'claude-code', 'replit-ai'],
    comparisonSlugs: ['cursor-vs-copilot', 'cursor-vs-codex'],
    frameworkSlugs: ['best-ai-agent-frameworks', 'best-open-source-ai-agent-tools']
  },
  {
    id: 'crewai',
    name: 'CrewAI Framework',
    slug: 'crewai',
    vendorName: 'CrewAI Inc.',
    vendorUrl: 'https://crewai.com',
    logoUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=120&h=120&q=80',
    summary: 'A cutting-edge framework for orchestrating role-based, autonomous multi-agent teams. It models collaborative workflows mimicking real-world corporate teams.',
    bestFor: 'Developers seeking to build complex workflows where specialized agents solve sequential problems together.',
    bestForProfiles: ['AI/ML engineers', 'Python backend developers', 'Data automation leads'],
    limitations: ['Steep orchestration learning curve', 'Token costs can spike in iterative loops', 'Debugging race conditions requires patience'],
    pricingModel: 'Open Source',
    startingPriceINR: '₹0 (Free / Self-Hosted)',
    startingPriceUSD: '$0',
    freeTrial: true,
    openSource: true,
    overallScore: 9.4,
    scores: {
      easeOfUse: 8.8,
      features: 9.7,
      docs: 9.2,
      integrations: 9.5,
      value: 9.8,
      reliability: 9.0,
      indiaFit: 9.5,
      scalability: 9.6
    },
    pros: [
      'Production-grade open-source package with modular role definition.',
      'Excellent native supports for memory models and multi-agent interaction.',
      'Vast active community with prebuilt tools for web search, API execution, and PDF scraping.'
    ],
    cons: [
      'Can quickly consume significant API tokens on iterative loops.',
      'Steep learning curve for orchestration theory and debugging race conditions.'
    ],
    featuresList: [
      'Role-based Agent Definitions',
      'Sequential, Hierarchical, and Consensus Processors',
      'Custom LLM Tool Integration SDK',
      'Short-term, Long-term, and Entity Memory layers',
      'Agent interaction callbacks and telemetries'
    ],
    verdict: 'CrewAI is standard-setting for collaborative multi-agent architectures. It is highly recommended for building automated research pipelines or operational loops.',
    useCases: [
      'Building automatic market research pipelines analyzing Indian direct-to-consumer (D2C) brands.',
      'Setting up automated email dispatch triages that verify and classify user inquiries.',
      'Programmatic content compilation and multi-pillar social media drafting.'
    ],
    whatsappReady: false,
    indianPaymentSupport: true,
    whatWeTested: 'Multi-agent coordination accuracy, memory persistence under 10k token loads, custom tool integration latency, Python 3.10/3.11 compatibility, and LangChain interop edge cases.',
    lastVerified: '2026-06-11',
    alternativeSlugs: ['langgraph', 'autogen', 'dify'],
    comparisonSlugs: ['crewai-vs-autogen', 'crewai-vs-langgraph'],
    frameworkSlugs: ['best-ai-agent-frameworks', 'best-ai-agent-sdks']
  },
  {
    id: 'vapi',
    name: 'Vapi AI Voice',
    slug: 'vapi-ai',
    vendorName: 'Vapi Technologies',
    vendorUrl: 'https://vapi.ai',
    logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&h=120&q=80',
    summary: 'The ultimate backend pipeline for real-time voice conversations. Solves audio Latency, voice activity detection, and speech synthesis orchestration in milliseconds.',
    bestFor: 'SMEs and startups looking to implement highly responsive, human-like voice conversationalists for commercial helplines.',
    bestForProfiles: ['SME founders', 'Customer support leads', 'Telemarketing agencies', 'Healthcare front desks'],
    limitations: ['Complex CRM hooks require API coding', 'Pricing scales with concurrent talk-hours', 'No native MCP client'],
    pricingModel: 'Pay-as-you-go',
    startingPriceINR: '₹12 per hour setup (approx. $0.15/min)',
    startingPriceUSD: '$0.15/min',
    freeTrial: true,
    openSource: false,
    overallScore: 9.5,
    scores: {
      easeOfUse: 9.2,
      features: 9.6,
      docs: 9.5,
      integrations: 9.4,
      value: 9.3,
      reliability: 9.7,
      indiaFit: 10.0,
      scalability: 9.5
    },
    pros: [
      'Ultra low-latency audio response (averaging under 500ms).',
      'Stellar native accents and localized pronunciations in Hindi, Hinglish, Marathi, and Tamil.',
      'Direct Twilio telephone lines and mobile SDK integrations.'
    ],
    cons: [
      'Setting up complex CRM hooks (e.g., Salesforce or Zoho CRM) requires intermediate manual API coding.',
      'Pricing can scale significantly with massive simultaneous concurrent talk-hours.'
    ],
    featuresList: [
      'Millisecond Voice-to-Text Pipeline (Whisper & Groq optimized)',
      'Human-like Accent and Conversational Turn-taking',
      'Multi-lingual Indian Pronunciation Maps',
      'Native Twilio Trunking Hooks',
      'Automated Call Summary and Variable Extraction'
    ],
    verdict: 'Vapi AI provides the industry-best solution for voice. If you want to replace repetitive, stressful level-1 customer voice support with an intelligent agent, Vapi is unbeatable.',
    useCases: [
      'Creating custom Hinglish call assistants that clarify cash-on-delivery (COD) shipping addresses in India.',
      'Automating clinical appointment scheduling in localized Indian community hubs.',
      'Pre-qualifying high-volume incoming sales leads for real estate developments.'
    ],
    whatsappReady: true,
    indianPaymentSupport: true,
    whatWeTested: 'End-to-end voice latency (target avg 420ms), Hinglish/NLP emotion detection, concurrent call stability at 100 simultaneous sessions, Twilio provisioning speed, and CRM webhook reliability.',
    lastVerified: '2026-06-11',
    alternativeSlugs: ['bland-ai', 'retell-ai', 'yellow-ai'],
    comparisonSlugs: ['vapi-vs-retell', 'vapi-vs-elevenlabs'],
    frameworkSlugs: ['best-ai-voice-agent', 'best-ai-agent-for-customer-support']
  },
  {
    id: 'yellow-ai',
    name: 'Yellow.ai',
    slug: 'yellow-ai',
    vendorName: 'Yellow.ai Inc. (India-focussed)',
    vendorUrl: 'https://yellow.ai',
    logoUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=120&h=120&q=80',
    summary: 'An enterprise conversational AI platform that provides high-tier, multi-lingual virtual assistants deeply automated for chat and voice, specializing in WhatsApp integration.',
    bestFor: 'Indian medium and large enterprises demanding robust compliance, direct local WhatsApp APIs, and omnichannel integrations (Web-app, Dialers, SMS).',
    bestForProfiles: ['Enterprise CX heads', 'E-commerce operations', 'BFSI tech teams', 'Large D2C brands'],
    limitations: ['Custom enterprise pricing only', 'Deep initial configuration required', 'Overkill for micro-businesses'],
    pricingModel: 'Enterprise',
    startingPriceINR: 'Custom Pricing / On Request',
    startingPriceUSD: 'Custom/Quota',
    freeTrial: true,
    openSource: false,
    overallScore: 9.3,
    scores: {
      easeOfUse: 8.5,
      features: 9.5,
      docs: 8.9,
      integrations: 9.8,
      value: 9.0,
      reliability: 9.6,
      indiaFit: 10.0,
      scalability: 9.7
    },
    pros: [
      'Unrivalled official tier-1 WhatsApp Business API partnership and support.',
      'Native translation systems supporting 135+ languages, including Hindi, Bengali, Kannada, Telugu, and more.',
      'Highly compliant with Indian personal data protection standards (DPDP Act).'
    ],
    cons: [
      'Cost is structure oriented around custom packages, which might exceed small bootstrapping budgets.',
      'Admin visual workflow dashboard requires deep initial configuration passes.'
    ],
    featuresList: [
      'Omnichannel support orchestration (WhatsApp, Messenger, Web)',
      'Dynamic LLM Agent Workflows with visual diagramming',
      'Enterprise-grade Indian Data Center residency (safe local billing)',
      'Automated Indian UPI Payment gateways checkout natively inside chat',
      'Real-time Sentiment and emotional routing metrics'
    ],
    verdict: 'The absolute king of localized commercial messaging in India. If WhatsApp constitutes your brand\'s main support interface and UPI checkouts are crucial, choose Yellow.ai.',
    useCases: [
      'Letting e-commerce customers track packages and order direct replacements entire via WhatsApp.',
      'Enabling automated utility premium bill calculation and UPI payments natively over chat.',
      'Deploying secure multi-local HR ticketing and workspace helper bots in Indian tech campuses.'
    ],
    whatsappReady: true,
    indianPaymentSupport: true,
    whatWeTested: 'WhatsApp Business API webhook reliability, UPI checkout latency (avg 580ms), NLP accuracy across 12+ Indian sub-languages, DPDP data residency audit, and concurrent session handling under load.',
    lastVerified: '2026-06-11',
    alternativeSlugs: ['haptik', 'gupshup', 'vapi-ai'],
    comparisonSlugs: ['yellow-ai-vs-intercom'],
    frameworkSlugs: ['best-ai-agent-platform', 'ai-agents-for-business']
  },
  {
    id: 'flowise',
    name: 'Flowise AI',
    slug: 'flowise',
    vendorName: 'Flowise AI Inc.',
    vendorUrl: 'https://flowiseai.com',
    logoUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=120&h=120&q=80',
    summary: 'An open-source, node-based UI builder for orchestrating customized LLM apps and agent workflows. It sits as an elegant wrapper over popular packages like LangChain.',
    bestFor: 'SMEs, startup founders, and technical managers wanting to launch custom visual workflows without writing massive boilerplate code.',
    bestForProfiles: ['Non-technical founders', 'SME business analysts', 'Rapid prototyping teams', 'Freelance automation consultants'],
    limitations: ['Nested node debugging is abstracted', 'No native RBAC in OSS release', 'Deep loops require custom Python fallback'],
    pricingModel: 'Open Source',
    startingPriceINR: '₹0 (Free / Self-Hosted)',
    startingPriceUSD: '$0',
    freeTrial: true,
    openSource: true,
    overallScore: 9.1,
    scores: {
      easeOfUse: 9.5,
      features: 9.0,
      docs: 8.9,
      integrations: 9.2,
      value: 9.8,
      reliability: 8.9,
      indiaFit: 9.5,
      scalability: 8.8
    },
    pros: [
      'Incredibly simple drag-and-drop node logic for creating chatbots, retrieval augmented generators (RAG), and agent nodes.',
      'Active community uploading thousands of pre-configured workflow templates.',
      'Dockerized setup allows hosting it locally or on Indian hosting networks (DigitalOcean, AWS Mumbai, etc.) for peanuts.'
    ],
    cons: [
      'Debugging deeply nested, failing node flows is difficult as underlying logs are heavily abstracted.',
      'Lacks native enterprise role-based access controls in the basic open-source release.'
    ],
    featuresList: [
      'Flow-based Visual Drag-and-Drop Editor',
      'Complete prepackaged LangChain agent chain blocks',
      'Direct chat widget injection snippets for HTML websites',
      'Flexible backend vector store nodes (Pinecone, Chroma, pgvector)',
      'Dynamic API key variable routing and memory managers'
    ],
    verdict: 'If you are looking for an affordable, highly customizable visual pathway to link your company\'s catalog datastores to a custom AI bot, Flowise is the perfect launchpad.',
    useCases: [
      'Injecting smart customer support chat vectors into an educational agency\'s website.',
      'Connecting database logs to an automated pipeline that drafts regular executive summaries.',
      'Automating lead capture validation flow sheets from cold-outreach emails.'
    ],
    whatsappReady: true,
    indianPaymentSupport: true,
    whatWeTested: 'RAG retrieval accuracy (93.4% on internal docs), Docker startup time <45s, API roundtrip latency (avg 180ms), template library breadth, MCP node connectivity, and memory handler persistence.',
    lastVerified: '2026-06-11',
    alternativeSlugs: ['langflow', 'dify', 'make-com'],
    comparisonSlugs: ['dify-vs-flowise'],
    frameworkSlugs: ['best-ai-agent-builder', 'best-ai-agent-no-code-platform']
  }
];

