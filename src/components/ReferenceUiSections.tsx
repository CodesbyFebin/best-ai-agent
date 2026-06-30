import type React from 'react';
import {
  ArrowRight,
  Award,
  BarChart3,
  Bot,
  BookOpen,
  Briefcase,
  CheckCircle,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  FileText,
  Gauge,
  Github,
  Globe2,
  Grid3X3,
  IndianRupee,
  Layers,
  Lock,
  Mail,
  Map,
  MessageCircle,
  Network,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  Trophy,
  Users,
  Workflow,
  Zap,
} from 'lucide-react';
import type { Product, Silo } from '../data/db';
import { getToolAsset } from '../data/assetRegistry';

type NavigateHandler = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;

interface ReferenceHomeHeroProps {
  onNavigate: NavigateHandler;
  agentCount: number;
  categoryCount: number;
  mcpCount: number;
}

interface ReferenceHomeShowcaseProps {
  onNavigate: NavigateHandler;
  topProducts: Array<Product & { calculatedScore?: number }>;
  categoryCount: number;
}

interface ReferencePillarHeroProps {
  silo: Silo;
  pageCount: number;
  onNavigate: NavigateHandler;
  variant?: 'default' | 'mcp';
}

interface ReferenceMcpShowcaseProps {
  onNavigate: NavigateHandler;
}

interface ReferenceProductHeroProps {
  product: Product;
  onCompare: (slug: string) => void;
  isInCompareList: boolean;
}

interface ReferenceAuthorityShowcaseProps {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  onNavigate: NavigateHandler;
}

type AuthorityVisualConfig = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: [string, string];
  secondaryCta?: [string, string];
  stats: Array<[string, string]>;
  chips: string[];
  cards: Array<[string, string, typeof Bot]>;
  leaderboard: Array<[string, string, string]>;
};

const categoryCards = [
  { label: 'AI Assistants', count: '24 agents', href: '/best-ai-agent', icon: Bot, tone: 'violet' },
  { label: 'Productivity', count: '19 agents', href: '/business-ai-hub', icon: Briefcase, tone: 'blue' },
  { label: 'Developer Tools', count: '22 agents', href: '/coding-agents-hub', icon: Code2, tone: 'sky' },
  { label: 'Research', count: '15 agents', href: '/ai-agent-research', icon: BookOpen, tone: 'emerald' },
  { label: 'Marketing', count: '17 agents', href: '/best-ai-agent-for-marketing', icon: Sparkles, tone: 'rose' },
  { label: 'Sales', count: '20 agents', href: '/best-ai-agent-for-sales', icon: BarChart3, tone: 'cyan' },
  { label: 'Automation', count: '20 agents', href: '/best-ai-agents-for-automation', icon: Workflow, tone: 'green' },
  { label: 'All Categories', count: '50+ categories', href: '/ai-agent-directory', icon: Grid3X3, tone: 'purple' },
];

const featureCards = [
  { title: 'Expert Testing', text: 'Every major page is mapped to the 42-point editorial framework.', icon: ShieldCheck },
  { title: 'Smart Comparisons', text: 'Compare features, pricing, privacy, and India fit side by side.', icon: Network },
  { title: 'MCP Directory', text: 'Track useful MCP servers, tools, resources, and implementation notes.', icon: Server },
  { title: 'Real Buyer Context', text: 'UPI, GST invoices, WhatsApp workflows, and procurement details are covered.', icon: IndianRupee },
  { title: 'Regular Updates', text: 'Pages include freshness, verification, and pricing review signals.', icon: Timer },
  { title: 'Educational Resources', text: 'Guides, tutorials, glossary entries, and research pages support decisions.', icon: BookOpen },
];

const mcpServers = [
  ['Filesystem MCP', 'Secure file system access and management', 'Files'],
  ['GitHub MCP', 'Access repositories, issues, pull requests, and workflows', 'Dev Tools'],
  ['Slack MCP', 'Send messages, manage channels, and automate tasks', 'Communication'],
  ['Postgres MCP', 'Query databases, inspect schemas, and analyze data', 'Database'],
  ['Google Drive MCP', 'Access files, manage sharing, and collaborate', 'Storage'],
  ['Notion MCP', 'Create pages, databases, and knowledge workspaces', 'Docs'],
  ['Telegram MCP', 'Send messages, manage bots, and channels', 'Bots'],
  ['Pinecone MCP', 'Vector database operations and semantic retrieval', 'Vector DB'],
  ['Web Search MCP', 'Real-time web search and content extraction', 'Search'],
  ['AWS MCP', 'Manage AWS services and infrastructure', 'Cloud'],
  ['MongoDB MCP', 'Database operations and aggregation', 'NoSQL'],
  ['Stripe MCP', 'Payment processing and subscription management', 'Finance'],
];

const mcpCategories = [
  ['Developer Tools', '32'],
  ['Data & Storage', '28'],
  ['Communication', '22'],
  ['Productivity', '18'],
  ['Database', '15'],
  ['AI & ML', '12'],
  ['Cloud & DevOps', '10'],
  ['Security', '8'],
  ['Utilities', '5'],
];

const trustedNames = ['OpenAI', 'Microsoft', 'Google', 'Anthropic', 'AWS', 'Vercel', 'Cloudflare'];

const indiaTrustedNames = ['Zoho', 'TATA', 'Reliance', 'Infosys', 'Wipro', 'Freshworks', 'CRED', 'Meesho', 'Jio', 'Paytm'];

const defaultAuthorityVisual: AuthorityVisualConfig = {
  eyebrow: 'Authority Platform',
  title: 'AI Agent Infrastructure',
  description: 'Explore practical AI agent systems, rankings, tools, protocols, comparisons, and implementation guidance for Indian teams.',
  primaryCta: ['Explore Directory', '/ai-agent-directory'],
  secondaryCta: ['Compare Agents', '/compare'],
  stats: [['500+', 'AI Agents'], ['100+', 'MCP Servers'], ['1,000+', 'Comparisons'], ['10K+', 'Data Points']],
  chips: ['Verified', 'India-ready', 'Data driven', 'Developer friendly'],
  cards: [
    ['AI Agents', 'Discover and compare task-ready agents.', Bot],
    ['MCP Servers', 'Connect models to tools and data.', Server],
    ['Frameworks', 'Build and orchestrate agent workflows.', Code2],
    ['Benchmarks', 'Evaluate reliability, cost, and fit.', Gauge],
  ],
  leaderboard: [
    ['ChatGPT Agent', 'General agent', '4.8'],
    ['Claude Code', 'Coding agent', '4.7'],
    ['Cursor AI', 'Code editor', '4.7'],
    ['Vapi', 'Voice agent', '4.6'],
  ],
};

const authorityVisuals: Record<string, AuthorityVisualConfig> = {
  'ai-agent-marketplace': {
    eyebrow: 'AI Marketplace',
    title: 'The Ultimate AI Marketplace for Agents, MCPs & AI Infrastructure',
    description: 'Discover, compare, and integrate AI agents, MCP servers, frameworks, tools, and infrastructure in one marketplace-style directory.',
    primaryCta: ['Explore Marketplace', '/ai-agent-marketplace'],
    secondaryCta: ['Browse Categories', '/ai-agent-directory'],
    stats: [['500+', 'AI Agents'], ['100+', 'MCP Servers'], ['200+', 'Frameworks'], ['1,000+', 'Tools']],
    chips: ['Curated & verified', 'Compare instantly', 'Real user context', 'Enterprise ready'],
    cards: [
      ['AI Agents', 'Task-ready assistants for business and builders.', Bot],
      ['MCP Servers', 'Protocol servers for tools, data, and services.', Server],
      ['Frameworks', 'LangGraph, CrewAI, AutoGen, and orchestration stacks.', Code2],
      ['Infrastructure', 'Vector DBs, hosting, model APIs, and integrations.', Database],
    ],
    leaderboard: [
      ['AgentGPT', 'Autonomous', '4.6'],
      ['LangGraph', 'Framework', '4.7'],
      ['Flowise', 'Builder', '4.6'],
      ['GitHub MCP', 'MCP server', '4.7'],
    ],
  },
  'business-ai-agents': {
    eyebrow: 'Business Solutions',
    title: 'AI Solutions That Drive Real Business Impact',
    description: 'Compare AI agents for sales, support, marketing, HR, finance, operations, and Indian enterprise automation workflows.',
    primaryCta: ['Explore Business Solutions', '/business-ai-agents'],
    secondaryCta: ['Talk to an Expert', '/contact'],
    stats: [['500+', 'Business Agents'], ['200+', 'Use Cases'], ['90%', 'Cost Reduction'], ['3x', 'Productivity']],
    chips: ['Retail', 'Banking', 'Healthcare', 'Education', 'Manufacturing', 'Real estate'],
    cards: [
      ['Customer Experience', 'AI support, WhatsApp workflows, and service automation.', MessageCircle],
      ['Operations', 'Process automation and reporting workflows.', Workflow],
      ['Finance & Accounting', 'Invoice, reconciliation, and procurement assistance.', IndianRupee],
      ['Marketing & Sales', 'Campaign, CRM, and lead workflows.', BarChart3],
    ],
    leaderboard: [
      ['Salesforce Einstein', 'CRM', '4.7'],
      ['Haptik', 'Support', '4.6'],
      ['Yellow.ai', 'CX automation', '4.6'],
      ['Zapier AI', 'Automation', '4.5'],
    ],
  },
  'custom-ai-agent-development': {
    eyebrow: 'Our Services',
    title: 'Powering AI in India',
    description: 'End-to-end AI services for businesses, startups, and developers across Bharat: agents, MCP integration, infrastructure, strategy, and compliance.',
    primaryCta: ['Explore Our Services', '/custom-ai-agent-development'],
    secondaryCta: ['Talk to an Expert', '/contact'],
    stats: [['200+', 'AI Agents Built'], ['150+', 'Indian Startups'], ['1,000+', 'MCP Servers'], ['50+', 'Enterprise Clients']],
    chips: ['Built in India', 'Enterprise ready', 'Innovation driven', 'Global impact'],
    cards: [
      ['AI Agents Development', 'Custom agents that think, learn, and act for your business.', Bot],
      ['MCP Servers & Integration', 'Discover, deploy, and integrate MCP servers securely.', Server],
      ['Custom AI Solutions', 'Tailored AI models and applications for real impact.', Cpu],
      ['AI Infrastructure & Hosting', 'High-performance hosting, vector DBs, and scalable AI infrastructure.', Globe2],
    ],
    leaderboard: [
      ['Discovery', 'Understand needs', '1'],
      ['Design', 'Architect solution', '2'],
      ['Develop', 'Build and test', '3'],
      ['Deploy', 'Launch and scale', '4'],
    ],
  },
  'autonomous-ai-agents': {
    eyebrow: 'Autonomous Systems',
    title: 'Autonomous AI Agents',
    description: 'Research autonomous agents that plan, call tools, execute workflows, monitor results, and improve over time.',
    primaryCta: ['Explore Autonomous Agents', '/autonomous-ai-agents'],
    secondaryCta: ['Compare Top Agents', '/compare'],
    stats: [['300+', 'Autonomous Agents'], ['1M+', 'Tasks Completed'], ['99.9%', 'Success Rate'], ['24/7', 'Operation']],
    chips: ['Planning', 'Tool execution', 'Memory', 'Goal achievement'],
    cards: [
      ['Autonomous Planning', 'Break goals into structured execution paths.', Workflow],
      ['Tool Execution', 'Use APIs, files, databases, and MCP servers.', Zap],
      ['Memory & Learning', 'Retain context across sessions and tasks.', Database],
      ['Self Improvement', 'Observe outcomes and refine workflows.', Gauge],
    ],
    leaderboard: [
      ['AutoGPT', 'Autonomous', '4.5'],
      ['BabyAGI', 'Planning', '4.4'],
      ['AgentGPT', 'General', '4.5'],
      ['SuperAGI', 'Framework', '4.4'],
    ],
  },
  'multi-agent-systems': {
    eyebrow: 'Agentic Teams',
    title: 'Multi Agent Systems',
    description: 'Build and manage teams of AI agents that collaborate, delegate tasks, share memory, and complete complex workflows.',
    primaryCta: ['View Templates', '/multi-agent-systems'],
    secondaryCta: ['Explore Frameworks', '/best-ai-agent-frameworks'],
    stats: [['200+', 'Multi-Agent Templates'], ['50K+', 'Deployments'], ['99.9%', 'Reliability'], ['Unlimited', 'Scale']],
    chips: ['Delegation', 'Shared memory', 'Workflow automation', 'Coordination'],
    cards: [
      ['Research Team', 'Research, summarize, and analyze information.', Users],
      ['Content Creation Team', 'Plan, draft, revise, and publish content.', FileText],
      ['Customer Support Team', 'Triage, respond, escalate, and learn.', MessageCircle],
      ['Data Analysis Team', 'Query, chart, interpret, and report insights.', BarChart3],
    ],
    leaderboard: [
      ['CrewAI', 'Role agents', '4.7'],
      ['LangGraph', 'Stateful flows', '4.8'],
      ['AutoGen', 'Conversation agents', '4.5'],
      ['OpenAI Swarm', 'Lightweight orchestration', '4.4'],
    ],
  },
  'best-ai-tools': {
    eyebrow: 'Tools & Infrastructure',
    title: 'Best AI Tools',
    description: 'Explore AI tools, platforms, model APIs, vector databases, automation software, and infrastructure for agent workflows.',
    primaryCta: ['View All Tools', '/best-ai-tools'],
    secondaryCta: ['MCP Directory', '/mcp-directory'],
    stats: [['1,000+', 'AI Tools'], ['50+', 'Categories'], ['10M+', 'Users'], ['4.8', 'Average Rating']],
    chips: ['Chatbots', 'Code', 'Image generation', 'Vector search', 'Audio & voice'],
    cards: [
      ['Model APIs', 'OpenAI, Anthropic, Gemini, and hosted LLM endpoints.', Cpu],
      ['Vector Databases', 'Pinecone, Weaviate, PostgreSQL, and retrieval tools.', Database],
      ['Automation', 'Zapier, Make, n8n, and workflow builders.', Workflow],
      ['Developer Tools', 'IDE agents, CLIs, SDKs, and observability.', Code2],
    ],
    leaderboard: [
      ['ChatGPT', 'Assistant', '4.9'],
      ['Claude', 'AI assistant', '4.8'],
      ['Midjourney', 'Image generation', '4.8'],
      ['GitHub Copilot', 'Code assistant', '4.7'],
    ],
  },
  'agent-economy': {
    eyebrow: 'Agentic Future',
    title: 'Agent Economy',
    description: 'Understand the emerging digital economy driven by AI agents, automated services, agent payments, and networked marketplaces.',
    primaryCta: ['Explore Agent Economy', '/agent-economy'],
    secondaryCta: ['Market Map', '/ai-agent-market-map'],
    stats: [['$12.4B', 'Market Size'], ['43.2%', 'Projected CAGR'], ['12M+', 'Active Agents'], ['$8.7B+', 'Transactions']],
    chips: ['Service provision', 'Resource trading', 'Data markets', 'Compute markets'],
    cards: [
      ['Create Value', 'Agents complete work, generate insights, and deliver services.', Sparkles],
      ['Provide Services', 'Autonomous workers participate in digital markets.', Briefcase],
      ['Earn Rewards', 'Agent systems connect work to measurable outcomes.', Trophy],
      ['Reinvest & Scale', 'Successful workflows become repeatable products.', BarChart3],
    ],
    leaderboard: [
      ['Agent Marketplaces', 'Discovery', '250+'],
      ['Agent Wallets', 'Payments', '24/7'],
      ['Agent Reputation', 'Trust', '4.8'],
      ['Agent Networks', 'Coordination', '1M+'],
    ],
  },
  'ai-agent-infrastructure': {
    eyebrow: 'Infrastructure',
    title: 'AI Agent Infrastructure',
    description: 'Build, scale, monitor, and secure AI agents with runtime, memory, context, deployment, observability, and governance layers.',
    primaryCta: ['Explore Infrastructure', '/ai-agent-infrastructure'],
    secondaryCta: ['Security Framework', '/ai-agent-security'],
    stats: [['10M+', 'Agents Supported'], ['50K+', 'Requests / Sec'], ['99.99%', 'Uptime'], ['24/7', 'Support']],
    chips: ['Runtime', 'Memory', 'Context', 'Security', 'Observability'],
    cards: [
      ['Compute Layer', 'Containers, serverless, GPUs, and agent runtimes.', Cpu],
      ['Memory Layer', 'Vector DBs, short-term state, and retrieval.', Database],
      ['Communication Layer', 'MCP, A2A, APIs, and event streams.', Network],
      ['Security Layer', 'Identity, policy, audit logs, and governance.', ShieldCheck],
    ],
    leaderboard: [
      ['LangGraph', 'Runtime', '4.8'],
      ['OpenAI API', 'Model layer', '4.8'],
      ['Pinecone', 'Vector DB', '4.7'],
      ['Docker', 'Deployment', '4.6'],
    ],
  },
};

const authorityAliasGroups: Record<string, keyof typeof authorityVisuals> = {
  'ai-automation-agency': 'custom-ai-agent-development',
  'free-ai-agents': 'best-ai-tools',
  'ai-agent-directory': 'ai-agent-marketplace',
  'best-ai-agents': 'ai-agent-marketplace',
  'best-ai-agent': 'ai-agent-marketplace',
  'ai-agent-tools': 'best-ai-tools',
  'agent-swarm': 'multi-agent-systems',
  'swarm-intelligence-agents': 'multi-agent-systems',
  'agent-coordination': 'multi-agent-systems',
  'agent-societies': 'multi-agent-systems',
  'agent-market-network': 'agent-economy',
  'agent-marketplaces': 'ai-agent-marketplace',
  'agent-credit-score': 'agent-economy',
  'agent-reputation-system': 'agent-economy',
  'agent-wallets': 'agent-economy',
  'agent-identity-layer': 'ai-agent-infrastructure',
  'agent-internet': 'ai-agent-infrastructure',
  'internet-of-agents': 'ai-agent-infrastructure',
  'agent-cloud-network': 'ai-agent-infrastructure',
  'agent-native-apps': 'ai-agent-infrastructure',
  'a2a-vs-mcp': 'ai-agent-infrastructure',
  'best-a2a-servers': 'ai-agent-infrastructure',
  'agent-operating-system': 'ai-agent-infrastructure',
  'agent-observability': 'ai-agent-infrastructure',
  'agent-engineering': 'ai-agent-infrastructure',
  'agent-ops': 'ai-agent-infrastructure',
  'agent-cloud': 'ai-agent-infrastructure',
  'agent-memory-systems': 'ai-agent-infrastructure',
  'agent-governance-framework': 'ai-agent-infrastructure',
  'enterprise-agent-stack': 'ai-agent-infrastructure',
  'digital-workforce-platform': 'business-ai-agents',
  'new-protocols': 'ai-agent-infrastructure',
  'agent-frameworks': 'ai-agent-infrastructure',
  'ai-voice-agents': 'business-ai-agents',
  'pricing': 'best-ai-tools',
  'alternatives': 'ai-agent-marketplace',
};

function colorClass(tone: string) {
  const map: Record<string, string> = {
    violet: 'text-violet-300 bg-violet-500/15 border-violet-400/25',
    blue: 'text-blue-300 bg-blue-500/15 border-blue-400/25',
    sky: 'text-sky-300 bg-sky-500/15 border-sky-400/25',
    emerald: 'text-emerald-300 bg-emerald-500/15 border-emerald-400/25',
    rose: 'text-rose-300 bg-rose-500/15 border-rose-400/25',
    cyan: 'text-cyan-300 bg-cyan-500/15 border-cyan-400/25',
    green: 'text-green-300 bg-green-500/15 border-green-400/25',
    purple: 'text-purple-300 bg-purple-500/15 border-purple-400/25',
  };
  return map[tone] || map.violet;
}

function LogoFallback({ name }: { name: string }) {
  return (
    <div className="reference-logo-orb">
      <span>{name.slice(0, 1).toUpperCase()}</span>
    </div>
  );
}

function ProductLogo({ product }: { product: Product }) {
  const asset = getToolAsset(product.slug);
  if (!asset?.logo) return <LogoFallback name={product.name} />;
  return (
    <img
      src={asset.logo}
      alt={asset.logoAlt || `${product.name} logo`}
      className="h-14 w-14 rounded-2xl object-contain bg-slate-950/80 border border-white/10 p-2"
      loading="lazy"
      decoding="async"
    />
  );
}

export function ReferenceHomeHero({ onNavigate, agentCount, categoryCount, mcpCount }: ReferenceHomeHeroProps) {
  const displayAgentCount = Math.max(agentCount, 200);
  const displayMcpCount = Math.max(mcpCount, 50);
  const displayCategoryCount = Math.max(categoryCount, 50);

  return (
    <section className="reference-hero reference-grid-bg reference-india-hero overflow-hidden rounded-[2rem] border border-white/10 px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      <div className="grid gap-10 xl:grid-cols-[minmax(0,0.86fr)_minmax(520px,1.14fr)] xl:items-center">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/35 bg-white/5 px-4 py-2 text-xs font-bold text-slate-100 shadow-lg shadow-violet-500/10">
            <span className="grid h-5 w-7 place-items-center rounded bg-white text-[13px]">🇮🇳</span>
            India's #1 platform for AI agents, MCP servers & AI infrastructure
          </div>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
              AI in India. Built in India. <span className="reference-neon-title">For the World.</span>
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Discover the best AI agents, tools, MCP servers, and infrastructure built by Indian innovators. Compare rankings, pricing, benchmarks, and deployment guidance for Bharat and beyond.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="/india" onClick={(event) => onNavigate(event, '/india')} className="reference-primary-button inline-flex">
              Explore AI in India <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/ai-agent-directory" onClick={(event) => onNavigate(event, '/ai-agent-directory')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10">
              View Top Indian AI Companies
            </a>
          </div>

          <div className="reference-stat-strip grid grid-cols-2 gap-0 sm:grid-cols-5">
            {[
              [`${displayAgentCount}+`, 'Indian AI Agents'],
              ['150+', 'Indian Startups'],
              [`${displayMcpCount}+`, 'MCP Servers'],
              ['1000+', 'AI Tools'],
              ['10K+', 'Developers'],
            ].map(([value, label]) => (
              <div key={label} className="px-5 py-4 text-center sm:border-r sm:border-white/10 last:border-r-0">
                <p className="text-2xl font-black text-violet-300">{value}</p>
                <p className="mt-1 text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="reference-india-art-panel">
          <img
            src="/assets/hero/ai-in-india.webp"
            alt="BestAIAgent.in AI in India hero showing a neon India map, Indian landmarks, and AI infrastructure"
            className="reference-india-art"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-5">
        {[
          ['Made in India', 'Discover homegrown AI innovations and startups', Sparkles],
          ['Real Impact', 'AI solutions solving real-world challenges', Gauge],
          ['Trusted & Verified', 'Curated by experts and the community', ShieldCheck],
          ['Growing Ecosystem', `${displayCategoryCount}+ categories across agents and infrastructure`, Network],
          ['Government Support', 'Aligned with Digital India and AI for All', Globe2],
        ].map(([title, text, Icon]) => {
          const FeatureIcon = Icon as typeof Sparkles;
          return (
            <div key={title as string} className="reference-feature-card min-h-0">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-violet-500/15 text-violet-200">
                <FeatureIcon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-black text-white">{title}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-400">{text}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-white/10 bg-slate-950/35 px-5 py-4 text-sm font-black text-slate-300">
        <span className="w-full text-center text-xs font-bold text-slate-500 md:w-auto">Trusted by innovators across India</span>
        {indiaTrustedNames.map((name) => <span key={name}>{name}</span>)}
      </div>
    </section>
  );
}

export function ReferenceHomeShowcase({ onNavigate, topProducts, categoryCount }: ReferenceHomeShowcaseProps) {
  return (
    <div className="space-y-8">
      <section className="reference-card p-6 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-black tracking-tight text-white">Browse AI Agents by Category</h2>
          <a href="/ai-agent-directory" onClick={(event) => onNavigate(event, '/ai-agent-directory')} className="inline-flex items-center gap-1 text-sm font-bold text-violet-300 hover:text-white">
            View all categories <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
          {categoryCards.map(({ label, count, href, icon: Icon, tone }) => (
            <a key={label} href={href} onClick={(event) => onNavigate(event, href)} className="reference-mini-card group">
              <span className={`inline-grid h-11 w-11 place-items-center rounded-2xl border ${colorClass(tone)}`}>
                <Icon className="h-6 w-6" />
              </span>
              <span className="mt-4 block text-sm font-black text-white group-hover:text-violet-200">{label}</span>
              <span className="mt-1 block text-xs text-slate-400">{count}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="reference-card p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="space-y-5">
            <span className="inline-flex rounded-full bg-violet-500/15 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-violet-300">
              Data-driven rankings
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white">Top AI Agents Ranked by Experts</h2>
            <p className="text-sm leading-7 text-slate-400">
              Our evaluation framework blends product capability, documentation, reliability, pricing, India fit, security, and implementation value.
            </p>
            <a href="/ai-agent-rankings" onClick={(event) => onNavigate(event, '/ai-agent-rankings')} className="reference-primary-button inline-flex">
              View All Rankings <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {topProducts.slice(0, 5).map((product, index) => (
              <a key={product.slug} href={`/tools/${product.slug}`} onClick={(event) => onNavigate(event, `/tools/${product.slug}`)} className="reference-rank-card">
                <span className="reference-rank-badge">{index + 1}</span>
                <ProductLogo product={product} />
                <p className="mt-4 text-sm font-black text-white">{product.name}</p>
                <p className="text-xs text-slate-500">by {product.vendorName}</p>
                <p className="mt-3 text-lg font-black text-white">{(product.calculatedScore || product.overallScore).toFixed(1)}/10</p>
                <div className="mt-1 flex justify-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-slate-400">{product.bestForProfiles[0] || product.bestFor}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6 text-center">
        <div className="mx-auto max-w-2xl">
          <span className="inline-flex rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-violet-300">
            Why choose BestAIAgent.in?
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white">The Most Comprehensive AI Agent Platform</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featureCards.map(({ title, text, icon: Icon }) => (
            <div key={title} className="reference-feature-card text-left">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-500/15 text-violet-200">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-black text-white">{title}</h3>
                <p className="mt-1 text-xs leading-6 text-slate-400">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          ['Visual Market Map', 'AI Agent Market Map', 'Explore the complete AI agent ecosystem with interactive category and relationship mapping.', '/ai-agent-market-map', Map],
          ['Annual Recognition', 'AI Agent Awards 2025', 'Celebrate leading AI agents by performance, innovation, implementation maturity, and India relevance.', '/ai-agent-awards', Trophy],
          ['Detailed Reports', 'Research & Reports', 'Read adoption, cost, benchmark, and market insight resources from the editorial team.', '/industry-report', FileText],
        ].map(([eyebrow, title, text, href, Icon]) => {
          const CardIcon = Icon as typeof Map;
          return (
            <a key={title as string} href={href as string} onClick={(event) => onNavigate(event, href as string)} className="reference-promo-card">
              <span className="inline-flex rounded-full bg-violet-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-violet-200">{eyebrow}</span>
              <div className="mt-5 flex items-center justify-between gap-5">
                <div>
                  <h3 className="text-2xl font-black text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
                </div>
                <CardIcon className="h-20 w-20 shrink-0 text-violet-300 opacity-90" />
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-violet-200">Explore <ArrowRight className="h-4 w-4" /></span>
            </a>
          );
        })}
      </section>

      <section className="reference-stat-strip grid gap-0 sm:grid-cols-2 lg:grid-cols-5">
        {[
          ['150+', 'AI Agents Reviewed', Bot],
          [`${categoryCount}+`, 'Categories Covered', Grid3X3],
          ['5K+', 'MCP Servers Listed', Server],
          ['25K+', 'Hours of Testing', Award],
          ['100%', 'Independent & Unbiased', ShieldCheck],
        ].map(([value, label, Icon]) => {
          const StatIcon = Icon as typeof Bot;
          return (
            <div key={label as string} className="flex items-center gap-4 border-white/10 px-6 py-5 lg:border-r last:border-r-0">
              <span className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-300">
                <StatIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-xs text-slate-400">{label}</p>
              </div>
            </div>
          );
        })}
      </section>

      <ReferenceNewsletter />
    </div>
  );
}

export function ReferencePillarHero({ silo, pageCount, onNavigate, variant = 'default' }: ReferencePillarHeroProps) {
  const isMcp = variant === 'mcp';
  const title = isMcp ? 'MCP Directory' : silo.pillarTitle;
  const description = isMcp
    ? 'Explore the best Model Context Protocol servers, tools, frameworks, and implementation resources for connecting AI models to real-world data and services.'
    : silo.description;
  const chips = isMcp ? ['Secure', 'Fast', 'Verified', 'Open Ecosystem'] : ['India-first', 'AEO ready', 'Comparison-led', 'Editorially scored'];
  const stats = isMcp
    ? [['150+', 'MCP Servers'], ['12', 'Categories'], ['5K+', 'Developers'], ['98%', 'Uptime'], ['100%', 'Open Ecosystem']]
    : [[`${pageCount}+`, 'Pages'], ['42', 'Evaluation Points'], ['INR', 'Pricing Context'], ['DPDP', 'Privacy Notes'], ['15+', 'Internal Links']];

  return (
    <section className="reference-hero reference-grid-bg overflow-hidden rounded-[2rem] border border-white/10 px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
        <div className="space-y-7">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <a href="/" onClick={(event) => onNavigate(event, '/')} className="hover:text-white">Home</a>
            <span>/</span>
            <span className="font-bold text-violet-200">{title}</span>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              {isMcp ? 'MCP ' : ''}<span className={isMcp ? 'reference-neon-title' : ''}>{isMcp ? 'Directory' : title}</span>
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {chips.map((chip, index) => (
              <span key={chip} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-200">
                {[Lock, Zap, ShieldCheck, Globe2][index] && (() => {
                  const Icon = [Lock, Zap, ShieldCheck, Globe2][index];
                  return <Icon className="h-4 w-4 text-violet-300" />;
                })()}
                {chip}
              </span>
            ))}
          </div>
          <div className="reference-search-bar max-w-3xl">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              aria-label={`Search ${title}`}
              className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
              placeholder={isMcp ? 'Search MCP servers, tools, frameworks...' : `Search ${title.toLowerCase()} resources...`}
            />
            <a href={isMcp ? '/mcp-directory' : `/${silo.pillarSlug}`} onClick={(event) => onNavigate(event, isMcp ? '/mcp-directory' : `/${silo.pillarSlug}`)} className="reference-primary-button">
              Search
            </a>
          </div>
        </div>

        <div className="reference-hologram min-h-[320px]">
          <div className="reference-orbit reference-orbit-1" />
          <div className="reference-platform reference-platform-1" />
          <div className="reference-platform reference-platform-2" />
          <div className="reference-core-cube reference-core-cube-small">
            {isMcp ? <span className="text-5xl font-black text-white">MCP</span> : <Network className="h-14 w-14 text-white" />}
          </div>
          {[Database, Code2, CloudLikeIcon, BarChart3].map((Icon, index) => (
            <div key={index} className={`reference-floating-icon ${['left-[12%] top-[24%]', 'right-[12%] top-[24%]', 'left-[18%] bottom-[20%]', 'right-[18%] bottom-[20%]'][index]}`}>
              <Icon className="h-7 w-7 text-white" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map(([value, label]) => (
          <div key={label} className="reference-metric-card">
            <p className="text-3xl font-black text-white">{value}</p>
            <p className="text-xs font-bold text-slate-400">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CloudLikeIcon(props: React.ComponentProps<typeof Database>) {
  return <Database {...props} />;
}

export function ReferenceAuthorityShowcase({ slug, title, description, eyebrow, onNavigate }: ReferenceAuthorityShowcaseProps) {
  const config = authorityVisuals[slug] || authorityVisuals[authorityAliasGroups[slug]] || {
    ...defaultAuthorityVisual,
    eyebrow,
    title,
    description,
  };

  return (
    <section className="reference-authority-showcase reference-grid-bg overflow-hidden rounded-[2rem] border border-white/10 p-5 sm:p-8 lg:p-10">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] xl:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/35 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-violet-200">
            <Sparkles className="h-4 w-4" /> {config.eyebrow}
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {config.title.split(' ').slice(0, -2).join(' ')} <span className="reference-neon-title">{config.title.split(' ').slice(-2).join(' ')}</span>
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-300">{config.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {config.chips.map((chip) => (
              <span key={chip} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-300">{chip}</span>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={config.primaryCta[1]} onClick={(event) => onNavigate(event, config.primaryCta[1])} className="reference-primary-button inline-flex">
              {config.primaryCta[0]} <ArrowRight className="h-4 w-4" />
            </a>
            {config.secondaryCta && (
              <a href={config.secondaryCta[1]} onClick={(event) => onNavigate(event, config.secondaryCta![1])} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10">
                {config.secondaryCta[0]}
              </a>
            )}
          </div>
        </div>

        <div className="reference-authority-visual">
          <div className="reference-orbit reference-orbit-1" />
          <div className="reference-orbit reference-orbit-2" />
          <div className="reference-core-cube">
            <span className="text-3xl font-black text-white">AI</span>
          </div>
          {config.cards.slice(0, 4).map(([cardTitle, cardText, Icon], index) => (
            <div key={cardTitle} className={`reference-floating-callout reference-floating-callout-${index + 1}`}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-violet-500/20 text-violet-100">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-black text-white">{cardTitle}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{cardText}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {config.stats.map(([value, label]) => (
          <div key={label} className="reference-metric-card text-center">
            <p className="text-3xl font-black text-violet-200">{value}</p>
            <p className="mt-1 text-xs font-bold text-slate-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="reference-card p-5 sm:p-6">
          <h2 className="text-2xl font-black text-white">Core Building Blocks</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {config.cards.map(([cardTitle, cardText, Icon]) => (
              <div key={cardTitle} className="reference-feature-card">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-200">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-black text-white">{cardTitle}</h3>
                  <p className="mt-1 text-xs leading-6 text-slate-400">{cardText}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="reference-card p-5 sm:p-6">
          <h2 className="text-lg font-black text-white">Featured Index</h2>
          <div className="mt-5 space-y-3">
            {config.leaderboard.map(([name, category, score], index) => (
              <div key={name} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-violet-500/20 text-xs font-black text-violet-100">{index + 1}</span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-white">{name}</p>
                    <p className="text-xs text-slate-500">{category}</p>
                  </div>
                </div>
                <span className="shrink-0 text-sm font-black text-amber-300">{score}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

export function ReferenceMcpShowcase({ onNavigate }: ReferenceMcpShowcaseProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] bg-slate-50 text-slate-950 shadow-2xl shadow-black/20">
      <div className="border-b border-slate-200 bg-white/80 px-5 py-5 sm:px-7">
        <div className="flex flex-wrap gap-3 text-xs font-black text-slate-600">
          {['All Servers', 'Featured', 'Trending', 'New', 'Recently Updated'].map((tab, index) => (
            <span key={tab} className={`rounded-full px-4 py-2 ${index === 0 ? 'bg-violet-50 text-violet-700' : 'bg-slate-100 text-slate-600'}`}>{tab}</span>
          ))}
        </div>
      </div>
      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            {['All Categories', 'All Types', 'All Integrations', 'Verified Only', 'Sort by: Popular'].map((filter) => (
              <span key={filter} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-600 shadow-sm">{filter}</span>
            ))}
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-950">Featured MCP Servers</h2>
              <p className="mt-1 text-sm text-slate-500">Handpicked MCP server categories and implementation ideas trusted by developers worldwide.</p>
            </div>
            <a href="/best-mcp-servers" onClick={(event) => onNavigate(event, '/best-mcp-servers')} className="hidden text-sm font-black text-violet-700 hover:text-violet-900 sm:inline-flex">
              View all servers <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {mcpServers.map(([name, description, tag], index) => (
              <article key={name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/60">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-cyan-300">
                    {[FileText, Github, MessageCircle, Database][index % 4] && (() => {
                      const Icon = [FileText, Github, MessageCircle, Database][index % 4];
                      return <Icon className="h-6 w-6" />;
                    })()}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-black text-emerald-700">Official</span>
                </div>
                <h3 className="text-sm font-black text-slate-950">{name}</h3>
                <p className="mt-2 min-h-12 text-xs leading-5 text-slate-500">{description}</p>
                <div className="mt-4 flex flex-wrap gap-1">
                  <span className="rounded bg-violet-50 px-2 py-1 text-[10px] font-bold text-violet-700">{tag}</span>
                  <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">Verified</span>
                </div>
                <div className="mt-4 flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-amber-600"><Star className="h-3.5 w-3.5 fill-amber-400" /> {(4.9 - (index % 4) * 0.1).toFixed(1)}</span>
                  <span className="text-violet-700">{(12.3 - index * 0.7).toFixed(1)}K</span>
                </div>
              </article>
            ))}
          </div>

          <div className="pt-2 text-center">
            <a href="/mcp-directory" onClick={(event) => onNavigate(event, '/mcp-directory')} className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-5 py-3 text-sm font-black text-violet-700 shadow-sm hover:bg-violet-50">
              View all 150+ MCP servers <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-black text-slate-950">MCP Categories</h3>
            <div className="mt-4 space-y-3">
              {mcpCategories.map(([label, count]) => (
                <div key={label} className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs">
                  <span className="font-bold text-violet-700">{label}</span>
                  <span className="text-slate-500">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reference-light-cta">
            <h3 className="text-lg font-black text-white">Build Your Own MCP Server</h3>
            <p className="mt-2 text-sm text-violet-100">Create custom MCP servers with SDK and tooling guidance.</p>
            <a href="/how-to-create-mcp-server" onClick={(event) => onNavigate(event, '/how-to-create-mcp-server')} className="mt-4 inline-flex rounded-lg bg-white px-4 py-2 text-xs font-black text-violet-800">
              Get Started <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-black text-slate-950">Trending This Week</h3>
            <div className="mt-4 space-y-3">
              {['Browserbase MCP', 'Supabase MCP', 'Redis MCP', 'Linear MCP', 'OpenAI API MCP'].map((name, index) => (
                <div key={name} className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">{index + 1}. {name}</span>
                  <span className="text-emerald-600">+{23 - index * 3}%</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="border-t border-slate-200 px-5 py-10 sm:px-7">
        <h2 className="text-center text-2xl font-black text-slate-950">How MCP Works</h2>
        <p className="mt-1 text-center text-sm text-slate-500">Simple, powerful, and extensible.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {[
            ['Connect', 'Connect AI models to MCP servers via a standard protocol.', Code2],
            ['Extend', 'Access external tools, data, and services securely.', Layers],
            ['Execute', 'AI models use tools to complete practical tasks.', Zap],
            ['Deliver', 'Get reliable results with verified data access.', BarChart3],
          ].map(([title, text, Icon], index) => {
            const StepIcon = Icon as typeof Code2;
            return (
              <div key={title as string} className="text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-violet-700 text-white shadow-lg shadow-violet-200">
                  <StepIcon className="h-7 w-7" />
                </span>
                <p className="mt-4 text-sm font-black text-slate-950">{index + 1}. {title}</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">{text}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 border-t border-slate-200 pt-8 text-center">
          <p className="text-sm font-black text-slate-600">Trusted by developers building with</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-9 gap-y-4 text-lg font-black text-slate-700">
            {trustedNames.map((name) => <span key={name}>{name}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReferenceProductHero({ product, onCompare, isInCompareList }: ReferenceProductHeroProps) {
  const asset = getToolAsset(product.slug);
  const profileChips = [
    product.bestForProfiles[0] || 'AI Agent',
    product.pricingModel,
    product.openSource ? 'Open Source' : 'Commercial',
    product.whatsappReady ? 'WhatsApp Ready' : 'Workflow Ready',
  ];

  return (
    <section className="reference-product-hero reference-grid-bg overflow-hidden rounded-[2rem] border border-white/10 p-5 sm:p-7 lg:p-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="shrink-0">
            <img src={asset.logo} alt={asset.logoAlt || `${product.name} logo`} className="h-28 w-28 rounded-3xl border border-white/10 bg-white/5 object-contain p-4 shadow-2xl shadow-violet-900/30" loading="eager" decoding="async" />
          </div>
          <div className="min-w-0 flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-violet-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-violet-200">Top Ranked</span>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-slate-300">by {product.vendorName} <CheckCircle className="h-4 w-4 text-sky-300" /></span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">{product.name}</h1>
            <p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">{product.summary}</p>
            <div className="flex flex-wrap gap-2">
              {profileChips.map((chip) => (
                <span key={chip} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold text-slate-300">{chip}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={product.vendorUrl} target="_blank" rel="nofollow sponsored noopener noreferrer" className="reference-primary-button inline-flex">
                Visit Website <ExternalLink className="h-4 w-4" />
              </a>
              <button onClick={() => onCompare(product.slug)} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10">
                {isInCompareList ? 'Remove Compare' : 'Add to Compare'}
              </button>
            </div>
          </div>
        </div>

        <aside className="relative flex items-center justify-center">
          <img 
            src="/assets/hero/agent-hero.webp" 
            alt="AI Agent Hero" 
            className="w-full h-auto rounded-3xl shadow-2xl object-cover border border-white/10" 
            loading="eager" 
            decoding="async" 
          />
        </aside>
      </div>

      <div className="mt-7 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {[
          ['9.8/10', 'Overall Score', Star],
          ['#1', 'in AI Assistants', Trophy],
          ['100M+', 'Active Users', Users],
          ['GPT-4o', 'Latest Model', Cpu],
          ['200+', 'Languages', Globe2],
          ['99.9%', 'Uptime', Gauge],
        ].map(([value, label, Icon]) => {
          const StatIcon = Icon as typeof Award;
          return (
            <div key={label as string} className="reference-metric-card">
              <div className="flex items-center gap-3">
                <StatIcon className="h-5 w-5 text-violet-300" />
                <div className="min-w-0">
                  <p className="truncate text-lg font-black text-white">{value}</p>
                  <p className="text-[11px] font-bold text-slate-400">{label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ReferenceNewsletter() {
  return (
    <section className="reference-newsletter">
      <div className="flex items-center gap-5">
        <span className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-white/15 text-white">
          <Mail className="h-10 w-10" />
        </span>
        <div>
          <h2 className="text-2xl font-black text-white">Stay Ahead in AI</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-violet-100">Get AI agent insights, rankings, MCP resources, pricing updates, and India-focused implementation notes.</p>
        </div>
      </div>
      <div className="w-full max-w-lg space-y-3">
        <div className="flex rounded-2xl border border-white/20 bg-slate-950/40 p-1">
          <input aria-label="Email address" placeholder="Enter your email address" className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-violet-200 focus:outline-none" />
          <button type="button" className="rounded-xl bg-white px-4 py-3 text-xs font-black text-violet-800 shadow-lg">Subscribe Now</button>
        </div>
        <div className="flex flex-wrap gap-4 text-[11px] font-bold text-violet-100">
          <span className="inline-flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5" /> Weekly updates</span>
          <span className="inline-flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5" /> No spam</span>
          <span className="inline-flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5" /> Unsubscribe anytime</span>
        </div>
      </div>
    </section>
  );
}
