export interface ToolEntityPage {
  slug: string;
  productSlug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  directAnswer: string;
  primaryKeyword: string;
  siloId: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  entityDefinition: string;
  categories: string[];
  relatedProductSlugs: string[];
  relatedComparisonSlugs: string[];
  faqSlugs: string[];
  schemaType: 'SoftwareApplication' | 'SoftwareSourceCode';
}

export const toolEntityPages: ToolEntityPage[] = [
  {
    slug: 'tools/cursor-ai',
    productSlug: 'cursor-ai',
    title: 'Cursor AI - Developer Tool Profile & Review 2026',
    metaTitle: 'Cursor AI Review: Best AI Coding Agent [2026]',
    metaDescription: 'Full Cursor AI profile: performance benchmarks, repository indexing, pricing in INR, India fit score, and expert verdict.',
    h1: 'Cursor AI - Tool Profile',
    directAnswer: 'Cursor AI is a VS Code-based AI editor with deep repository-wide context indexing, scoring 9.6/10 for development workflows.',
    primaryKeyword: 'cursor ai',
    siloId: 'reviews',
    author: 'Arshdeep Singh, Chief AI Analyst',
    publishedAt: '2026-04-10',
    updatedAt: '2026-06-11',
    entityDefinition: '"Cursor is an AI-powered code editor built on VS Code that specializes in repository-aware coding assistance and multi-file edits."',
    categories: ['Developer Tools', 'AI Coding', 'IDE', 'VS Code Extension'],
    relatedProductSlugs: ['github-copilot', 'claude-code', 'replit-ai'],
    relatedComparisonSlugs: ['cursor-vs-copilot', 'cursor-vs-codex'],
    faqSlugs: ['faq-code-flag-1'],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'tools/vapi-ai',
    productSlug: 'vapi-ai',
    title: 'Vapi AI - Developer Tool Profile & Review 2026',
    metaTitle: 'Vapi AI Review: Best Voice AI Platform [2026]',
    metaDescription: 'Full Vapi AI profile: latency benchmarks, Hinglish support, Twilio integration, pricing in INR, and expert verdict.',
    h1: 'Vapi AI - Tool Profile',
    directAnswer: 'Vapi AI is a real-time voice automation platform with sub-500ms latency and native Indian language support, scoring 9.5/10.',
    primaryKeyword: 'vapi ai',
    siloId: 'reviews',
    author: 'Karan Mehra, Enterprise Lead',
    publishedAt: '2026-04-15',
    updatedAt: '2026-06-11',
    entityDefinition: '"Vapi AI is a backend pipeline for real-time voice conversations that solves audio latency, voice activity detection, and speech synthesis orchestration in milliseconds."',
    categories: ['Voice AI', 'Telephony', 'Automation', 'Customer Support'],
    relatedProductSlugs: ['bland-ai', 'retell-ai', 'yellow-ai'],
    relatedComparisonSlugs: ['vapi-vs-retell', 'vapi-vs-elevenlabs'],
    faqSlugs: [],
    schemaType: 'SoftwareApplication'
  },
  {
    slug: 'tools/crewai',
    productSlug: 'crewai',
    title: 'CrewAI Framework - Developer Tool Profile & Review 2026',
    metaTitle: 'CrewAI Review: Best Multi-Agent Framework [2026]',
    metaDescription: 'Full CrewAI profile: agent orchestration, memory systems, Python SDK, pricing, and expert verdict.',
    h1: 'CrewAI Framework - Tool Profile',
    directAnswer: 'CrewAI is a role-based multi-agent orchestration framework with built-in memory and tool integration, scoring 9.4/10.',
    primaryKeyword: 'crewai',
    siloId: 'frameworks',
    author: 'Priya Iyer, Core Engineer',
    publishedAt: '2026-05-05',
    updatedAt: '2026-06-11',
    entityDefinition: '"CrewAI is a Python framework for orchestrating role-based, autonomous multi-agent teams that model collaborative workflows mimicking real-world corporate teams."',
    categories: ['AI Framework', 'Multi-Agent', 'Python SDK', 'Open Source'],
    relatedProductSlugs: ['langgraph', 'autogen', 'dify'],
    relatedComparisonSlugs: ['crewai-vs-autogen', 'crewai-vs-langgraph'],
    faqSlugs: [],
    schemaType: 'SoftwareSourceCode'
  }
];

export function getToolEntityBySlug(slug: string): ToolEntityPage | undefined {
  return toolEntityPages.find(t => t.slug === slug);
}

export function getToolEntityByProductSlug(productSlug: string): ToolEntityPage | undefined {
  return toolEntityPages.find(t => t.productSlug === productSlug);
}

export function getRelatedToolEntities(slug: string): ToolEntityPage[] {
  const page = toolEntityPages.find(t => t.slug === slug);
  if (!page) return [];
  return toolEntityPages.filter(t => t.slug !== slug && t.relatedProductSlugs.some(s => page.relatedProductSlugs.includes(s))).slice(0, 3);
}
