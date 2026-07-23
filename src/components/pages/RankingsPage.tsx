import React from 'react';
import { featuredAgents } from '../../data/agents';
import { Trophy, Star, CheckCircle, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export default function RankingsPage({ onNavigate }: Props) {
  const rankedAgents = [...featuredAgents].sort((a, b) => b.score.overall - a.score.overall);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold uppercase">
            <Trophy className="w-3.5 h-3.5 text-amber-400" /> Official AI Agent Rankings (2026 Edition)
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            Top Evaluated & Benchmarked AI Agents
          </h1>
          <p className="text-slate-400 text-base md:text-lg">
            Independent benchmark leaderboards based on reasoning accuracy, execution speed, tool use, value for money, and enterprise compliance.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="divide-y divide-slate-800">
            {rankedAgents.map((agent, index) => (
              <div
                key={agent.id}
                onClick={() => onNavigate(`/agents/${agent.slug}/`)}
                className="p-6 hover:bg-slate-800/50 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base ${
                    index === 0 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                    index === 1 ? 'bg-slate-300/20 text-slate-300 border border-slate-400/40' :
                    index === 2 ? 'bg-amber-700/20 text-amber-500 border border-amber-700/40' :
                    'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}>
                    #{index + 1}
                  </div>
                  <img src={agent.logo} alt={agent.name} className="w-12 h-12 rounded-xl object-cover bg-slate-800 border border-slate-700" />
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      {agent.name}
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    </h3>
                    <p className="text-xs text-slate-400">{agent.company} • {agent.categories.join(', ')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 justify-between md:justify-end border-t md:border-0 pt-4 md:pt-0 border-slate-800">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Benchmark Score</div>
                    <div className="text-xl font-extrabold text-amber-400 flex items-center gap-1 justify-end">
                      <Star className="w-4 h-4 fill-amber-400" /> {agent.score.overall.toFixed(1)} / 10
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-slate-400">Starting Price</div>
                    <div className="text-sm font-semibold text-slate-200">{agent.pricing.startingPriceUSD}</div>
                  </div>

                  <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors">
                    Audit <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
