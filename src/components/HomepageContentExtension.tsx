import React from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Globe2,
  IndianRupee,
  Search,
  Server,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  Zap,
  Briefcase,
  Code2,
  Sparkles,
  BarChart3,
  Workflow,
  Layers,
} from 'lucide-react';

type NavigateHandler = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;

interface HomepageContentExtensionProps {
  onNavigate: NavigateHandler;
}

const categoryCards = [
  { label: 'AI Assistants', count: '24 agents', href: '/best-ai-agent', icon: Users, tone: 'violet' },
  { label: 'Productivity', count: '15 agents', href: '/business-ai-hub', icon: Briefcase, tone: 'blue' },
  { label: 'Developer Tools', count: '22 agents', href: '/coding-agents-hub', icon: Code2, tone: 'sky' },
  { label: 'Research', count: '5 agents', href: '/ai-agent-research', icon: BookOpen, tone: 'emerald' },
  { label: 'Marketing', count: '7 agents', href: '/best-ai-agent-for-marketing', icon: Sparkles, tone: 'rose' },
  { label: 'Sales', count: '10 agents', href: '/best-ai-agent-for-sales', icon: BarChart3, tone: 'cyan' },
  { label: 'Automation', count: '20 agents', href: '/best-ai-agents-for-automation', icon: Workflow, tone: 'green' },
  { label: 'All Categories', count: '52+ categories', href: '/ai-agent-directory', icon: Layers, tone: 'purple' },
];

const topRankings = [
  { rank: '1', name: 'Cursor AI', vendor: 'By Anysphere · Coding agent', score: '9.6/10', href: '/tools/cursor-ai' },
  { rank: '2', name: 'Vapi AI Voice', vendor: 'By Vapi Global · Voice agents', score: '9.5/10', href: '/tools/vapi-ai' },
  { rank: '3', name: 'CrewAI Framework', vendor: 'By CrewAI Inc · Multi-agent orchestration', score: '9.4/10', href: '/tools/crewai' },
  { rank: '4', name: 'Yellow.ai', vendor: 'By Yellow.ai India · Conversational support', score: '9.4/10', href: '/tools/yellow-ai' },
  { rank: '5', name: 'Flowise AI', vendor: 'By FlowiseAI · No-code workflows', score: '9.2/10', href: '/tools/flowise' },
];

const methodologySteps = [
  { step: '01', title: 'Expert Testing', text: 'Every page is reviewed by the AI editorial team before publishing — not auto-generated listings.' },
  { step: '02', title: 'Smart Comparisons', text: 'Compare features, pricing, privacy, and India-specific support side by side.' },
  { step: '03', title: 'MCP Directory', text: "India's largest MCP server catalogue: tools, resources, and prompts indexed." },
  { step: '04', title: 'Real Buyer Context', text: 'GST, INR pricing, WhatsApp, and government-cloud workflows are details that get vetted.' },
];

export default function HomepageContentExtension({ onNavigate }: HomepageContentExtensionProps) {
  return (
    <div className="space-y-12">
      {/* INDIA #1 PLATFORM HERO */}
      <section className="bg-slate-950 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-800 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-emerald-300 text-xs font-semibold">
            <Globe2 className="w-3.5 h-3.5" /> India's #1 platform for AI agents, MCP servers & AI infrastructure
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            AI in India.<br />
            <span className="text-emerald-300">Built in India.</span><br />
            For the World.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            We catalogue, test, and rank every AI agent, MCP server, and automation tool built for or used by Indian businesses — with INR pricing, DPDP compliance checks, and real implementation notes.
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search all 366 verified Indian-focused AI / MCP pages…"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-4">
            {[
              ['200+', 'Active AI Agents'],
              ['150+', 'Indian Startups'],
              ['78+', 'MCP Servers'],
              ['1000+', 'AI Tools'],
              ['10K+', 'Test Datapoints'],
              ['🇮🇳', 'Made in India'],
            ].map(([value, label]) => (
              <div key={label} className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                <p className="text-xl font-black text-white">{value}</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* TRUST BADGES */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
            {[
              ['Coverage skewed toward AI tools, frameworks, and innovations built by Indian teams.', '🇮🇳 Made in India'],
              ['AI solutions solving real-world challenges for Indian businesses, not vapourware.', '⚡ Real Impact'],
              ['Curated by experts and the community, with re-verification every quarter.', '✓ Trusted & Verified'],
              ['50+ categories across agents and infrastructure, updated weekly.', '🌱 Growing Ecosystem'],
              ['Aligned with Digital India and AI for All initiatives.', '🏛️ Government Support'],
            ].map(([text, badge]) => (
              <div key={badge} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
                <p className="text-lg mb-1">{badge.split(' ')[0]}</p>
                <p className="text-[10px] text-slate-400 leading-tight">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECTORY BY CATEGORY */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Directory</h2>
            <p className="text-slate-500 text-sm mt-1">Browse AI Agents by Category</p>
          </div>
          <a href="/ai-agent-directory" onClick={(e) => onNavigate(e, '/ai-agent-directory')} className="text-xs font-black text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 uppercase tracking-wider">
            View all categories <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoryCards.map(({ label, count, href, icon: Icon, tone }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => onNavigate(e, href)}
              className="group border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 rounded-xl p-4 transition flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</span>
                <Icon className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition" />
              </div>
              <span className="text-2xl font-black text-slate-900">{count}</span>
            </a>
          ))}
        </div>
      </section>

      {/* DATA-DRIVEN RANKINGS */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Data-Driven Rankings</h2>
            <p className="text-slate-500 text-sm mt-1">Top AI Agents Ranked by Experts</p>
          </div>
          <a href="/best-ai-agent" onClick={(e) => onNavigate(e, '/best-ai-agent')} className="text-xs font-black text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 uppercase tracking-wider">
            View all rankings <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="space-y-3">
          {topRankings.map((item) => (
            <a
              key={item.rank}
              href={item.href}
              onClick={(e) => onNavigate(e, item.href)}
              className="flex items-center gap-4 border border-slate-200 hover:border-emerald-300 rounded-xl p-4 transition"
            >
              <span className="text-2xl font-black text-slate-900 w-8">{item.rank}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-900 truncate">{item.name}</p>
                <p className="text-xs text-slate-500 truncate">{item.vendor}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-black text-slate-900">{item.score}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Methodology</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {methodologySteps.map(({ step, title, text }) => (
            <div key={step} className="border border-slate-200 rounded-xl p-5 space-y-3">
              <span className="text-3xl font-black text-emerald-600">{step}</span>
              <h3 className="text-sm font-black text-slate-900">{title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE COMPLETE GUIDE */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-emerald-700">
          <BookOpen className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-wider">The Complete Guide</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          AI Agents in India: A Complete 2026 Buyer's Guide
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed max-w-4xl">
          Everything an Indian business, founder, or developer needs to know before adopting an AI agent — from definitions to DPDP compliance to category-by-category recommendations.
        </p>
        <p className="text-slate-500 text-xs leading-relaxed max-w-4xl">
          India's AI agent market has moved past the experimentation phase. What started two or three years ago as a handful of pilot chatbots bolted onto a website has become, for a fast-growing share of Indian businesses, a genuine operating layer — handling customer conversations on WhatsApp, qualifying sales leads before a human ever joins the call, reconciling invoices against purchase orders, and increasingly making real-time decisions that used to require a dedicated team. This guide exists to make that landscape navigable: clear definitions, an honest testing methodology, category-by-category buying advice, and the specific compliance and language-handling questions that matter for an Indian deployment.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            'What Is an AI Agent, Really?',
            'Why India Is Building AI Agents Differently',
            'AI Agent Categories, Explained',
            'What Are MCP Servers and Why They Matter',
            'DPDP Act 2023 and What It Means for AI Agents',
            'How We Test and Rank Every Agent',
            'Choosing the Right AI Agent for Your Business',
            'AI Agents by Industry in India',
            'Security and Data Residency, Explained',
            'Common Mistakes When Deploying AI Agents',
            'Indian vs. Global AI Agent Platforms',
            'Three Real-World Deployment Patterns',
            'Pre-Launch Implementation Checklist',
            'Where India\'s AI Agent Ecosystem Is Concentrated',
            'Open-Source vs. Proprietary Agent Frameworks',
            'Glossary of AI Agent Terms',
            'Understanding AI Agent Pricing in India',
            'Where AI Agents in India Are Headed Next',
            'Frequently Asked Questions',
          ].map((item) => (
            <a
              key={item}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-xs font-semibold text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 rounded-lg px-3 py-2 transition"
            >
              {item}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
