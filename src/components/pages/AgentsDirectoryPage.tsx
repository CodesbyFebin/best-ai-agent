import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, ArrowUpRight, Star, ShieldCheck, Zap, Cpu, CheckCircle } from 'lucide-react';
import { featuredAgents, Agent } from '../../data/agents';
import { featuredCategories } from '../../data/categories';

interface Props {
  onNavigate: (path: string) => void;
}

export default function AgentsDirectoryPage({ onNavigate }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPricing, setSelectedPricing] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);

  const filteredAgents = useMemo(() => {
    return featuredAgents.filter(agent => {
      const matchesSearch =
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.bestFor.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || agent.categories.includes(selectedCategory);

      const isFree = agent.pricing.type === 'free' || agent.pricing.type === 'freemium';
      const matchesPricing =
        selectedPricing === 'All' ||
        (selectedPricing === 'Free / Open Source' && (isFree || agent.openSource)) ||
        (selectedPricing === 'Paid' && !isFree);

      const matchesRating = agent.score.overall >= minRating;

      return matchesSearch && matchesCategory && matchesPricing && matchesRating;
    });
  }, [searchQuery, selectedCategory, selectedPricing, minRating]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" /> 5,000+ Verified AI Agents Index
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            AI Agent Directory & Evaluation Registry
          </h1>
          <p className="text-slate-400 text-base md:text-lg">
            Search, filter, and compare top-performing AI agents across coding, voice, customer support, multi-agent orchestration, and enterprise workflows.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search agents by name, skill, framework, or use case..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="All">All Categories</option>
                {featuredCategories.map(cat => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedPricing}
                onChange={e => setSelectedPricing(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="All">All Pricing Models</option>
                <option value="Free / Open Source">Free / Open Source</option>
                <option value="Paid">Commercial / Paid</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
            <div>
              Showing <span className="font-bold text-white">{filteredAgents.length}</span> verified AI agents
            </div>
            <div className="flex items-center gap-2">
              <span>Minimum Rating:</span>
              {[0, 8.0, 9.0, 9.5].map(r => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    minRating === r ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {r === 0 ? 'Any' : `${r}+`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map(agent => (
            <div
              key={agent.id}
              onClick={() => onNavigate(`/agents/${agent.slug}/`)}
              className="group bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-500/10"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={agent.logo} alt={agent.name} className="w-12 h-12 rounded-xl object-cover bg-slate-800 border border-slate-700" />
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                        {agent.name}
                        {agent.featured && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                      </h3>
                      <div className="text-xs text-slate-400">{agent.company}</div>
                    </div>
                  </div>
                  <div className="bg-indigo-950 border border-indigo-800 text-indigo-300 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    {agent.score.overall.toFixed(1)}
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{agent.summary}</p>

                <div className="flex flex-wrap gap-1.5">
                  {agent.categories.slice(0, 3).map((cat, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div>
                  Pricing: <span className="text-slate-200 font-semibold">{agent.pricing.startingPriceUSD}</span> ({agent.pricing.startingPriceINR})
                </div>
                <span className="text-indigo-400 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Full Audit <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
