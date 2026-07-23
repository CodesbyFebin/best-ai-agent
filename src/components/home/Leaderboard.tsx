import React, { useState } from 'react';
import { Star, ShieldCheck, ArrowUpDown, ChevronRight, CheckCircle2, AlertTriangle, Scale } from 'lucide-react';
import { featuredAgents, Agent } from '../../data/agents';

interface LeaderboardProps {
  onNavigateToAgent: (slug: string) => void;
  onNavigateToCompare: (pairSlug?: string) => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  onNavigateToAgent,
  onNavigateToCompare
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('Overall');

  const filterTabs = [
    "Overall", "Coding", "Business", "Research", "Voice", "Open Source", "India Fit"
  ];

  const getFilteredAgents = (): Agent[] => {
    let list = [...featuredAgents];

    if (activeFilter === 'Coding') {
      list = list.filter(a => a.categories.includes('Coding Agents'));
    } else if (activeFilter === 'Business') {
      list = list.filter(a => a.categories.includes('Business Automation') || a.categories.includes('Customer Support'));
    } else if (activeFilter === 'Research') {
      list = list.filter(a => a.categories.includes('Research Agents'));
    } else if (activeFilter === 'Voice') {
      list = list.filter(a => a.categories.includes('Voice Agents'));
    } else if (activeFilter === 'Open Source') {
      list = list.filter(a => a.openSource);
    } else if (activeFilter === 'India Fit') {
      list = list.filter(a => a.builtInIndia || a.score.indiaFit >= 9.0);
    }

    return list.sort((a, b) => b.score.overall - a.score.overall);
  };

  const agents = getFilteredAgents();

  return (
    <section className="py-16 bg-slate-900/40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Transparent Evaluation Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Top-Rated AI Agents Leaderboard
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Ranked using our published 7-dimension evaluation methodology across 50 benchmark tasks.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeFilter === tab
                    ? 'bg-violet-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Responsive Table */}
        <div className="hidden lg:block overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th scope="col" className="py-4 px-4 text-center">Rank</th>
                <th scope="col" className="py-4 px-4">Agent Platform</th>
                <th scope="col" className="py-4 px-4">Best For</th>
                <th scope="col" className="py-4 px-4 text-center">BestAI Score</th>
                <th scope="col" className="py-4 px-4 text-center">Reasoning</th>
                <th scope="col" className="py-4 px-4 text-center">Tool Use</th>
                <th scope="col" className="py-4 px-4 text-center">India Fit</th>
                <th scope="col" className="py-4 px-4">Pricing</th>
                <th scope="col" className="py-4 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {agents.map((agent, index) => (
                <tr 
                  key={agent.id}
                  className="hover:bg-slate-800/50 transition group cursor-pointer"
                  onClick={() => onNavigateToAgent(agent.slug)}
                >
                  {/* Rank */}
                  <td className="py-4 px-4 text-center font-extrabold text-sm text-slate-400 group-hover:text-violet-300">
                    #{index + 1}
                  </td>

                  {/* Agent */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img src={agent.logo} alt={agent.name} className="w-9 h-9 rounded-lg object-cover border border-slate-700" />
                      <div>
                        <div className="font-bold text-white text-sm group-hover:text-violet-300 transition flex items-center gap-1">
                          <span>{agent.name}</span>
                          {agent.builtInIndia && <span className="text-xs" title="Built in India">🇮🇳</span>}
                        </div>
                        <div className="text-[11px] text-slate-400">{agent.company}</div>
                      </div>
                    </div>
                  </td>

                  {/* Best For */}
                  <td className="py-4 px-4 max-w-xs">
                    <div className="text-xs text-slate-300 line-clamp-1">{agent.bestFor.slice(0, 2).join(', ')}</div>
                  </td>

                  {/* Overall Score */}
                  <td className="py-4 px-4 text-center">
                    <div className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 font-extrabold text-sm px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                      <span>{agent.score.overall.toFixed(1)}</span>
                    </div>
                  </td>

                  {/* Reasoning */}
                  <td className="py-4 px-4 text-center font-semibold text-slate-200">
                    {agent.score.reasoning.toFixed(1)}
                  </td>

                  {/* Tool Use */}
                  <td className="py-4 px-4 text-center font-semibold text-slate-200">
                    {agent.score.toolUse.toFixed(1)}
                  </td>

                  {/* India Fit */}
                  <td className="py-4 px-4 text-center font-semibold text-slate-200">
                    {agent.score.indiaFit.toFixed(1)}
                  </td>

                  {/* Pricing */}
                  <td className="py-4 px-4 text-slate-300">
                    <div className="font-medium">{agent.pricing.startingPriceUSD}</div>
                    <div className="text-[10px] text-slate-400">{agent.pricing.startingPriceINR}</div>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onNavigateToAgent(agent.slug)}
                      className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs transition cursor-pointer"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Leaderboard Cards */}
        <div className="lg:hidden space-y-3">
          {agents.map((agent, index) => (
            <div
              key={agent.id}
              onClick={() => onNavigateToAgent(agent.slug)}
              className="rounded-xl bg-slate-900 border border-slate-800 p-4 space-y-3 cursor-pointer hover:border-violet-500/40 transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="font-extrabold text-xs text-slate-400">#{index + 1}</span>
                  <img src={agent.logo} alt={agent.name} className="w-8 h-8 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-bold text-sm text-white">{agent.name}</h3>
                    <div className="text-[10px] text-slate-400">{agent.company}</div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 font-bold text-xs px-2 py-0.5 rounded border border-emerald-500/20">
                  <Star className="w-3 h-3 fill-emerald-400" />
                  <span>{agent.score.overall.toFixed(1)}</span>
                </div>
              </div>

              <div className="text-xs text-slate-300">
                <strong>Best for:</strong> {agent.bestFor.slice(0, 2).join(', ')}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="text-slate-400">Starting Price: {agent.pricing.startingPriceUSD}</span>
                <span className="text-violet-400 font-semibold flex items-center gap-0.5">
                  Read Review →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Leaderboard;
