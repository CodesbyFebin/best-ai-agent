import React from 'react';
import { ArrowLeftRight, Check, X, ShieldCheck, Star, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { products, Product } from '../data/db';

export interface ComparisonPair {
  slug: string;
  title: string;
  tool1Slug: string;
  tool2Slug: string;
  useCase: string;
  verdict: string;
  summary: string;
}

export const comparisonPairsList: ComparisonPair[] = [
  {
    slug: 'cursor-vs-copilot',
    title: 'Cursor AI vs GitHub Copilot (2026)',
    tool1Slug: 'cursor-ai',
    tool2Slug: 'github-copilot',
    useCase: 'Developer Buyer Intent & Repository-Wide Edits',
    verdict: 'Cursor AI wins for multi-file repo refactoring and custom rules (.cursorrules). GitHub Copilot is better for native VS Code background tab completion.',
    summary: 'Cursor AI features multi-file Composer mode and MCP integration. GitHub Copilot integrates deeply with GitHub Enterprise workflows.'
  },
  {
    slug: 'chatgpt-vs-claude',
    title: 'ChatGPT vs Claude 3.5 Sonnet',
    tool1Slug: 'chatgpt',
    tool2Slug: 'claude-code',
    useCase: 'General AI & Coding Intent',
    verdict: 'Claude 3.5 Sonnet leads for complex coding, deep reasoning, and artifact previews. ChatGPT (GPT-4o) wins for multimodal search and voice chat.',
    summary: 'Both are top-tier foundation LLMs. Claude leads in developer preference while ChatGPT offers versatile web search integration.'
  },
  {
    slug: 'crewai-vs-autogen',
    title: 'CrewAI vs Microsoft AutoGen',
    tool1Slug: 'crewai',
    tool2Slug: 'autogen',
    useCase: 'Multi-Agent Framework Evaluators',
    verdict: 'CrewAI is easier to set up for role-based sequential teams. AutoGen provides deeper low-level Python event loops for complex conversational agents.',
    summary: 'CrewAI excels in rapid team role definition. AutoGen excels in multi-party dynamic chat loops and code execution sandboxes.'
  },
  {
    slug: 'flowise-vs-dify',
    title: 'Flowise vs Dify.ai',
    tool1Slug: 'flowise',
    tool2Slug: 'dify',
    useCase: 'No-Code & Low-Code Agent Builders',
    verdict: 'Flowise is superior for drag-and-drop visual RAG canvas pipelines. Dify.ai is better for all-in-one AI app management and team workspaces.',
    summary: 'Flowise provides node-based chain canvas. Dify provides web interface orchestration, LLMOps, and prompt playground.'
  },
  {
    slug: 'vapi-vs-yellow-ai',
    title: 'Vapi AI vs Yellow.ai',
    tool1Slug: 'vapi-ai',
    tool2Slug: 'yellow-ai',
    useCase: 'Voice Automation & Omnichannel Support',
    verdict: 'Vapi AI leads for sub-500ms voice call latency and Hinglish telephone calls. Yellow.ai leads for enterprise omnichannel WhatsApp & UPI payment bots.',
    summary: 'Vapi is a developer-first voice AI API. Yellow.ai is an enterprise customer service and automation platform.'
  },
  {
    slug: 'vapi-vs-retell',
    title: 'Vapi AI vs Retell AI',
    tool1Slug: 'vapi-ai',
    tool2Slug: 'retell-ai',
    useCase: 'Voice AI Developer Latency Benchmark',
    verdict: 'Vapi AI offers superior custom pipeline routing (Groq + Deepgram + ElevenLabs). Retell AI has simpler out-of-the-box caller dashboard templates.',
    summary: 'Both deliver sub-second speech-to-speech loops. Vapi allows deeper custom LLM model routing.'
  },
  {
    slug: 'yellow-ai-vs-intercom',
    title: 'Yellow.ai vs Intercom Fin AI',
    tool1Slug: 'yellow-ai',
    tool2Slug: 'intercom-ai',
    useCase: 'Customer Support & WhatsApp Business',
    verdict: 'Yellow.ai offers native India UPI payments and multi-lingual Indian regional support. Intercom Fin AI excels in SaaS web widget resolution.',
    summary: 'Yellow.ai is tailored for Asian/Indian omnichannel markets; Intercom Fin AI targets global SaaS helpdesk teams.'
  }
];

interface ComparisonMatrixPageProps {
  pairSlug?: string;
  onRoute?: (view: string, siloId?: string, articleSlug?: string, productSlug?: string) => void;
  onNavigate?: (view: string, slug?: string) => void;
  onCompare?: (slug: string) => void;
}

export default function ComparisonMatrixPage({ pairSlug = 'cursor-vs-copilot', onRoute, onNavigate, onCompare }: ComparisonMatrixPageProps) {
  const handleNav = (view: string, siloId?: string, articleSlug?: string, productSlug?: string) => {
    if (onRoute) onRoute(view, siloId, articleSlug, productSlug);
    else if (onNavigate) onNavigate(view, productSlug || articleSlug || siloId);
  };
  const pair = comparisonPairsList.find(p => p.slug === pairSlug) || comparisonPairsList[0];
  
  const tool1: Product = products.find(p => p.slug === pair.tool1Slug) || products[0];
  const tool2: Product = products.find(p => p.slug === pair.tool2Slug) || products[1];

  // Schema ItemList for comparison
  const jsonLdComparison = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": pair.title,
    "description": pair.summary,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": tool1.name,
          "ratingValue": tool1.overallScore
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "SoftwareApplication",
          "name": tool2.name,
          "ratingValue": tool2.overallScore
        }
      }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-slate-100">
      <script type="application/ld+json">
        {JSON.stringify(jsonLdComparison)}
      </script>

      {/* Breadcrumb / Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <button onClick={() => handleNav('home')} className="hover:underline">Home</button>
          <span>/</span>
          <button onClick={() => handleNav('compare')} className="hover:underline">Comparisons</button>
          <span>/</span>
          <span className="text-white font-bold">{pair.title}</span>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Programmatic Head-to-Head Comparison</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {pair.title}
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          {pair.summary}
        </p>
      </div>

      {/* Direct Answer / Verdict Box for AI Overviews */}
      <div className="bg-gradient-to-r from-violet-950/60 via-slate-900 to-slate-900 border border-violet-500/30 rounded-2xl p-6 space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span>Quick Answer & Executive Verdict</span>
        </div>
        <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
          {pair.verdict}
        </p>
        <div className="text-xs text-slate-400 pt-1">
          Target Use Case: <strong className="text-slate-200">{pair.useCase}</strong>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Canonical Feature Matrix</h2>
          <span className="text-xs text-slate-400 font-mono">Last Verified: June 11, 2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4 w-1/4">Comparison Field</th>
                <th className="p-4 w-3/8 text-violet-400 font-extrabold text-sm">{tool1.name}</th>
                <th className="p-4 w-3/8 text-emerald-400 font-extrabold text-sm">{tool2.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              <tr>
                <td className="p-4 font-bold text-slate-200">Overall Score</td>
                <td className="p-4 text-violet-300 font-bold text-base">{tool1.overallScore} / 10</td>
                <td className="p-4 text-emerald-300 font-bold text-base">{tool2.overallScore} / 10</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-200">Pricing (INR / USD)</td>
                <td className="p-4">{tool1.startingPriceUSD} ({tool1.startingPriceINR})</td>
                <td className="p-4">{tool2.startingPriceUSD} ({tool2.startingPriceINR})</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-200">Deployment Type</td>
                <td className="p-4">{tool1.openSource ? 'Cloud & Self-Hosted' : 'Cloud Managed'}</td>
                <td className="p-4">{tool2.openSource ? 'Cloud & Self-Hosted' : 'Cloud Managed'}</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-200">Open Source</td>
                <td className="p-4">{tool1.openSource ? <span className="text-emerald-400 font-bold flex items-center gap-1"><Check className="w-4 h-4"/> Yes</span> : <span className="text-slate-500">No (Proprietary)</span>}</td>
                <td className="p-4">{tool2.openSource ? <span className="text-emerald-400 font-bold flex items-center gap-1"><Check className="w-4 h-4"/> Yes</span> : <span className="text-slate-500">No (Proprietary)</span>}</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-200">India Localization Fit</td>
                <td className="p-4"><span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 font-bold text-xs">{tool1.scores.indiaFit >= 8.5 ? 'High Fit' : 'Medium Fit'} ({tool1.scores.indiaFit}/10)</span></td>
                <td className="p-4"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-xs">{tool2.scores.indiaFit >= 8.5 ? 'High Fit' : 'Medium Fit'} ({tool2.scores.indiaFit}/10)</span></td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-200">WhatsApp Native Support</td>
                <td className="p-4">{tool1.whatsappReady ? <span className="text-emerald-400 font-bold">Native Support</span> : <span className="text-slate-400">Via API / Webhooks</span>}</td>
                <td className="p-4">{tool2.whatsappReady ? <span className="text-emerald-400 font-bold">Native Support</span> : <span className="text-slate-400">Via API / Webhooks</span>}</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-200">Best For Target Profile</td>
                <td className="p-4 text-xs leading-relaxed text-slate-300">{tool1.bestFor}</td>
                <td className="p-4 text-xs leading-relaxed text-slate-300">{tool2.bestFor}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Action CTA */}
      <div className="flex flex-wrap gap-4 pt-4">
        <button
          onClick={() => handleNav('product', undefined, undefined, tool1.slug)}
          className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm flex items-center gap-2 transition"
        >
          Read Full {tool1.name} Review <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleNav('product', undefined, undefined, tool2.slug)}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 transition"
        >
          Read Full {tool2.name} Review <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
