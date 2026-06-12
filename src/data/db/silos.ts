import { allTopicalPages, type PageType } from '../topicalAuthority';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SiloPage {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  directAnswer: string;
  primaryKeyword: string;
  siloId: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  bodySections: { heading: string; text: string }[];
  faqs: FAQItem[];
  relatedPagesSlugs: string[];
  ratingSummary?: string;
  evaluationVerdict?: string;
  clusterId?: string;
  authors?: { name: string; role: string; profileSlug?: string }[];
  category?: string;
  intent?: string;
  pageType?: string;
  priority?: number;
  secondaryKeywords?: string[];
  schemaTypes?: string[];
  lastReviewed?: string;
  nextReview?: string;
  excerpt?: string;
  body?: string;
  clusterName?: string;
  clusterHubSlug?: string;
}

export interface Silo {
  id: string;
  name: string;
  purpose: string;
  pillarTitle: string;
  pillarSlug: string;
  description: string;
  color: string;
  icon: string;
}

export const silos: Silo[] = [
  { id: 'reviews', name: 'AI Agent Reviews', purpose: 'Commercial reviews, alternatives list, and strategic recommendations.', pillarTitle: 'Best AI Agent', pillarSlug: 'best-ai-agent', description: 'Deep analytical reviews, scoring cards, comparative benchmarks, and unbiased recommendations.', color: 'emerald', icon: 'Star' },
  { id: 'builders', name: 'AI Agent Builders', purpose: 'No-code and low-code workflow platforms and visual agent design suites.', pillarTitle: 'Best AI Agent Builder', pillarSlug: 'best-ai-agent-builder', description: 'Reviews and resources on visual workflow designers, no-code interfaces, and low-code developer tools.', color: 'blue', icon: 'Cpu' },
  { id: 'coding-agents', name: 'AI Coding Agents', purpose: 'Developer-centric setups, prompt engines, and terminal/IDE co-pilots.', pillarTitle: 'Best AI Agent for Coding', pillarSlug: 'best-ai-agent-for-coding', description: 'Expert reviews on deep coding automation tools, repository architects, VS Code extensions, and IDE integrations.', color: 'indigo', icon: 'Code' },
  { id: 'frameworks', name: 'AI Frameworks & Tools', purpose: 'Technical orchestration SDKs, prompt helpers, memory systems, and open-source packages.', pillarTitle: 'Best AI Agent Frameworks', pillarSlug: 'best-ai-agent-frameworks', description: 'Developer insights into LangChain, CrewAI, Autogen, LlamaIndex, and orchestration tools.', color: 'violet', icon: 'Layers' },
  { id: 'business', name: 'AI Agents for Business', purpose: 'SME automation, WhatsApp automation, enterprise procurement, finance, operations.', pillarTitle: 'AI Agents for Business', pillarSlug: 'ai-agents-for-business', description: 'Practical guides focused on Indian SMEs, startups, and enterprises scaling operations.', color: 'amber', icon: 'Briefcase' },
  { id: 'research', name: 'AI Research & Trends', purpose: 'Future roadmap, academic updates, news announcements, and baseline benchmarks.', pillarTitle: 'AI Agent Research', pillarSlug: 'ai-agent-research', description: 'Tracking state-of-the-art benchmarks, trending paradigms, monthly news, and industry roadmaps.', color: 'rose', icon: 'LineChart' },
  { id: 'mcp', name: 'MCP Hub', purpose: 'Complete Model Context Protocol servers, directories, host clients, and tutorials.', pillarTitle: 'MCP Hub', pillarSlug: 'mcp-hub', description: 'A complete MCP hub covering servers, directories, marketplaces, hosting, security, and integrations.', color: 'teal', icon: 'Share2' },
];
