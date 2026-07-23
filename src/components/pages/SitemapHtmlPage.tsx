import React from 'react';
import { featuredAgents } from '../../data/agents';
import { featuredCategories } from '../../data/categories';
import { featuredComparisons } from '../../data/comparisons';
import { Network, ArrowUpRight, Globe, Layers, Trophy } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export default function SitemapHtmlPage({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold uppercase">
            <Globe className="w-3.5 h-3.5" /> Human & Crawler HTML Architecture Directory
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            BestAIAgent.in Master Site Directory
          </h1>
          <p className="text-slate-400 text-base md:text-lg">
            Human-readable, fully indexed HTML map of all core pillars, verified agent entity pages, head-to-head comparison matrices, frameworks, and research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Core Navigation */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
              <Globe className="w-5 h-5" /> Core Platform Pages
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><button onClick={() => onNavigate('/')} className="hover:text-indigo-400 transition-colors">Home Page</button></li>
              <li><button onClick={() => onNavigate('/agents/')} className="hover:text-indigo-400 transition-colors">AI Agents Directory (5,000+)</button></li>
              <li><button onClick={() => onNavigate('/categories/')} className="hover:text-indigo-400 transition-colors">Categories Taxonomy Hub (300+)</button></li>
              <li><button onClick={() => onNavigate('/rankings/')} className="hover:text-indigo-400 transition-colors">Rankings Leaderboards</button></li>
              <li><button onClick={() => onNavigate('/compare/')} className="hover:text-indigo-400 transition-colors">Compare Engine (10,000+ pairs)</button></li>
              <li><button onClick={() => onNavigate('/frameworks/')} className="hover:text-indigo-400 transition-colors">Agent Frameworks Directory</button></li>
              <li><button onClick={() => onNavigate('/mcp-servers/')} className="hover:text-indigo-400 transition-colors">MCP Servers Directory</button></li>
              <li><button onClick={() => onNavigate('/pricing/')} className="hover:text-indigo-400 transition-colors">India Pricing Matrix (INR)</button></li>
              <li><button onClick={() => onNavigate('/research/')} className="hover:text-indigo-400 transition-colors">Market Intelligence & Research</button></li>
              <li><button onClick={() => onNavigate('/methodology/')} className="hover:text-indigo-400 transition-colors">Testing Methodology</button></li>
              <li><button onClick={() => onNavigate('/authors/')} className="hover:text-indigo-400 transition-colors">Editorial & Author Team</button></li>
            </ul>
          </div>

          {/* Key Agent Entities */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
              <Trophy className="w-5 h-5" /> Featured Agent Entities
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {featuredAgents.map(a => (
                <li key={a.id}>
                  <button onClick={() => onNavigate(`/agents/${a.slug}/`)} className="hover:text-indigo-400 transition-colors">
                    {a.name} Review ({a.score.overall}/10)
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories & Head to Head */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
              <Layers className="w-5 h-5" /> Categories & Comparisons
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {featuredCategories.map(c => (
                <li key={c.id}>
                  <button onClick={() => onNavigate(`/categories/${c.slug}/`)} className="hover:text-indigo-400 transition-colors">
                    {c.name} Hub
                  </button>
                </li>
              ))}
              {featuredComparisons.map(cmp => (
                <li key={cmp.pairSlug}>
                  <button onClick={() => onNavigate(`/compare/${cmp.itemA.slug}-vs-${cmp.itemB.slug}/`)} className="hover:text-indigo-400 transition-colors">
                    {cmp.itemA.name} vs {cmp.itemB.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
