import React from 'react';
import { featuredCategories } from '../../data/categories';
import { featuredAgents } from '../../data/agents';
import { Layers, Star, ArrowUpRight, CheckCircle, ArrowLeft } from 'lucide-react';

interface Props {
  slug: string;
  onNavigate: (path: string) => void;
}

export default function CategoryHubPage({ slug, onNavigate }: Props) {
  const category = featuredCategories.find(c => c.slug === slug) || featuredCategories[0];
  const agents = featuredAgents.filter(a => a.categories.includes(category.name));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <button
          onClick={() => onNavigate('/categories/')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Categories Directory
        </button>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold uppercase">
            <Layers className="w-3.5 h-3.5" /> Category Authority Hub
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">{category.name}</h1>
          <p className="text-slate-300 text-base md:text-lg max-w-3xl leading-relaxed">{category.description}</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Top Evaluated Agents in {category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map(agent => (
              <div
                key={agent.id}
                onClick={() => onNavigate(`/agents/${agent.slug}/`)}
                className="group bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-200 cursor-pointer space-y-4 hover:shadow-xl hover:shadow-indigo-500/10"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={agent.logo} alt={agent.name} className="w-12 h-12 rounded-xl object-cover bg-slate-800 border border-slate-700" />
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                        {agent.name}
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      </h3>
                      <div className="text-xs text-slate-400">{agent.company}</div>
                    </div>
                  </div>
                  <div className="bg-indigo-950 border border-indigo-800 text-indigo-300 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    {agent.score.overall.toFixed(1)}
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{agent.summary}</p>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Starting: <strong className="text-slate-200">{agent.pricing.startingPriceUSD}</strong></span>
                  <span className="text-indigo-400 font-semibold flex items-center gap-1">
                    Full Evaluation <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
