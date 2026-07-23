import React from 'react';
import { ShieldCheck, Award, FileText, CheckCircle2, User, Calendar, BookOpen, ArrowRight, Star, Sliders, ExternalLink, Globe, Check } from 'lucide-react';

export interface AuthorInfo {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  experience: string;
  credentials: string[];
  articlesCount: number;
  lastUpdated: string;
}

export const authorsList: AuthorInfo[] = [
  {
    id: 'arshdeep-singh',
    name: 'Arshdeep Singh',
    role: 'Chief AI Research Analyst & Founder',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Former AI infrastructure architect with 10+ years evaluating LLMs, agentic workflows, and voice AI pipelines for Indian enterprise scale.',
    experience: '10+ years in AI Engineering & Technical Evaluation',
    credentials: ['M.Tech AI & Robotics (IIT Delhi)', 'Ex-LLM Research Lead', 'Published Author in AI Agent Architecture'],
    articlesCount: 42,
    lastUpdated: 'June 11, 2026'
  },
  {
    id: 'priya-iyer',
    name: 'Priya Iyer',
    role: 'Lead Voice & Conversational AI Analyst',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    bio: 'Specialist in low-latency voice streams, Hinglish/vernacular STT engines, and omnichannel WhatsApp automation for D2C & healthcare.',
    experience: '8+ years in Speech Recognition & NLP',
    credentials: ['Ph.D. Computational Linguistics', 'Benchmarked 50+ Voice AI Agents in India'],
    articlesCount: 29,
    lastUpdated: 'June 10, 2026'
  },
  {
    id: 'karan-mehra',
    name: 'Karan Mehra',
    role: 'Open-Source AI & Developer Tool Reviewer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Full-stack agent developer and maintainer of open-source MCP servers. Evaluates SWE-bench, multi-agent frameworks, and self-hosted models.',
    experience: '7+ years in Developer Tooling & DevOps',
    credentials: ['Core Contributor to Open-Source MCP Tools', 'B.Tech CS (BITS Pilani)'],
    articlesCount: 35,
    lastUpdated: 'June 11, 2026'
  }
];

interface EditorialProps {
  onRoute?: (view: string, siloId?: string, articleSlug?: string, productSlug?: string) => void;
  onNavigate?: (view: string, slug?: string) => void;
  authorId?: string;
}

export function MethodologyPage({ onRoute }: EditorialProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold">
          <Award className="w-3.5 h-3.5" />
          <span>Trust & Editorial Entity</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Research Methodology & Evaluation Criteria
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          How BestAIAgent.in tests, scores, verifies, and updates every AI agent, coding assistant, and framework listed across our knowledge graph.
        </p>
        <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
          <span>Last Verified: <strong className="text-slate-200">June 11, 2026</strong></span>
          <span>•</span>
          <span>Audited by: <button onClick={() => onRoute('author', undefined, undefined, 'arshdeep-singh')} className="text-violet-400 underline hover:text-violet-300">Arshdeep Singh</button></span>
        </div>
      </div>

      {/* 4 Pillars of Testing */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-sm">01</div>
          <h3 className="font-bold text-white text-base">Hands-On Sandbox Testing</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We run real multi-file code execution, voice stream latency benchmarks (STT/TTS loop delays), and live API stress tests in isolated sandbox environments.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">02</div>
          <h3 className="font-bold text-white text-base">India Localization Audit</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every tool is scored on Vernacular language understanding (Hinglish/Tamil/Telugu), INR billing support, UPI payment flow integration, and DPDP Act 2023 compliance.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">03</div>
          <h3 className="font-bold text-white text-base">Monthly Review Queue</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            AI technologies evolve rapidly. We run monthly automated pricing checks and quarterly hands-on score updates to prevent stale recommendations.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">04</div>
          <h3 className="font-bold text-white text-base">SWE-bench & Benchmark Verification</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We cross-reference public benchmarks (SWE-bench Verified, GAIA, AgentBench) with our internal task accuracy metrics.
          </p>
        </div>
      </div>

      {/* Navigation shortcuts */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800 text-xs">
        <button onClick={() => onRoute('scoring-system')} className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold flex items-center gap-1.5 transition">
          <Sliders className="w-4 h-4" /> View 8-Metric Scoring Rubric
        </button>
        <button onClick={() => onRoute('editorial-policy')} className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1.5 transition">
          <ShieldCheck className="w-4 h-4" /> Editorial Policy & Independence
        </button>
      </div>
    </div>
  );
}

export function EditorialPolicyPage({ onRoute }: EditorialProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-slate-100">
      <div className="border-b border-slate-800 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Ethics & Independence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Editorial Policy & Independence Disclosure
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Our commitment to objective evaluation, conflict-of-interest prevention, and transparent affiliate funding.
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            1. Complete Editorial Independence
          </h2>
          <p>
            No vendor can buy a higher score, paid rank placement, or favorable review on BestAIAgent.in. All benchmark scores and rankings are calculated algorithmically based on our standardized 8-metric rubric.
          </p>
        </section>

        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            2. Transparent Affiliate Disclosures
          </h2>
          <p>
            Some links on BestAIAgent.in are referral or affiliate links. If you click through and purchase a subscription, we may earn a small referral commission at zero extra cost to you. This funds our testing sandbox servers and independent research team.
          </p>
        </section>

        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            3. Error Correction & Reader Feedback
          </h2>
          <p>
            We welcome corrections from developers, vendors, and readers. If pricing or features change, submit a revision request or open an issue, and our team verifies updates within 24 hours.
          </p>
        </section>
      </div>
    </div>
  );
}

export function ScoringSystemPage({ onRoute }: EditorialProps) {
  const metrics = [
    { name: 'Ease of Use (12.5%)', desc: 'Setup speed, UI clarity, documentation onboarding quality, CLI setup ergonomics.' },
    { name: 'Features Depth (12.5%)', desc: 'Multi-file edits, sub-agent spawning, tool calling capabilities, context window handling.' },
    { name: 'Documentation & SDKs (12.5%)', desc: 'Completeness of API docs, code snippets, Python/TypeScript SDK quality.' },
    { name: 'Integrations & Ecosystem (12.5%)', desc: 'MCP server support, database adapters, CRM connectors, webhook support.' },
    { name: 'Value for Money (12.5%)', desc: 'Generous free tier, transparent token pricing, cost per active agent hour.' },
    { name: 'System Reliability & Latency (12.5%)', desc: 'Uptime percentage, response streaming latency, fallback error handling.' },
    { name: 'India Localization Fit (15.0%)', desc: 'Hinglish vernacular support, INR pricing, UPI payment options, local DPDP compliance.' },
    { name: 'Enterprise Scalability (10.0%)', desc: 'SSO/SAML, SOC2 Type II compliance, rate limits, dedicated instance options.' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-slate-100">
      <div className="border-b border-slate-800 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold">
          <Sliders className="w-3.5 h-3.5" />
          <span>Evaluation Rubric</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AI Agent 8-Metric Scoring System
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          The exact mathematical rubric used to evaluate and rank every AI agent on BestAIAgent.in out of 10.0 points.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-violet-400 font-bold uppercase tracking-wider">
              <span>Metric #{idx + 1}</span>
            </div>
            <h3 className="font-bold text-white text-base">{m.name}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AuthorProfilePage({ authorId, onRoute }: EditorialProps) {
  const author = authorsList.find(a => a.id === authorId) || authorsList[0];

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-slate-100">
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <img src={author.avatar} alt={author.name} className="w-24 h-24 rounded-2xl object-cover border-2 border-violet-500/30 shrink-0" />
        <div className="space-y-3 text-center sm:text-left flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-semibold">
            <User className="w-3.5 h-3.5" /> Verified Research Analyst
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{author.name}</h1>
          <p className="text-violet-400 text-sm font-semibold">{author.role}</p>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{author.bio}</p>
          
          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            {author.credentials.map((cred, i) => (
              <span key={i} className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700/50 flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-400" /> {cred}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-6">
        <h2 className="text-xl font-bold text-white mb-4">Articles & Reviews Authored by {author.name}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div onClick={() => onRoute('product', undefined, undefined, 'cursor-ai')} className="cursor-pointer bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-2xl p-4 transition space-y-2">
            <span className="text-[10px] uppercase font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded">Coding Review</span>
            <h3 className="font-bold text-white text-sm">Cursor AI Deep-Dive Benchmark Review</h3>
            <p className="text-xs text-slate-400 line-clamp-2">Comprehensive multi-file edit evaluation, SWE-bench verified testing, and India pricing analysis.</p>
          </div>

          <div onClick={() => onRoute('product', undefined, undefined, 'vapi-ai')} className="cursor-pointer bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-2xl p-4 transition space-y-2">
            <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Voice AI Review</span>
            <h3 className="font-bold text-white text-sm">Vapi AI Low-Latency Speech Stream Evaluation</h3>
            <p className="text-xs text-slate-400 line-clamp-2">420ms loop latency testing with Hinglish vernacular accents for India enterprise sales.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
