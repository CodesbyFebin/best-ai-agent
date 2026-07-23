import React from 'react';
import { Star, CheckCircle2, ArrowRight, ExternalLink, ShieldCheck, Cpu, Terminal, DollarSign, Flag } from 'lucide-react';
import { featuredAgents, Agent } from '../../data/agents';

interface FeaturedAgentsProps {
  onNavigateToAgent: (slug: string) => void;
  onNavigateToCompare: (pairSlug?: string) => void;
  onNavigateToMethodology: () => void;
}

export const FeaturedAgents: React.FC<FeaturedAgentsProps> = ({
  onNavigateToAgent,
  onNavigateToCompare,
  onNavigateToMethodology
}) => {
  return (
    <section className="py-16 bg-slate-900/50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Independent Evaluation Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured AI Agents & Benchmarks
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Top-performing platforms evaluated using our transparent 7-dimension scoring framework.
            </p>
          </div>

          <button
            onClick={onNavigateToMethodology}
            className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition cursor-pointer flex items-center gap-1"
          >
            <span>How scores are calculated</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredAgents.slice(0, 8).map((agent) => (
            <div
              key={agent.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-violet-500/50 p-5 shadow-xl transition-all duration-200 flex flex-col justify-between space-y-4 group"
            >
              {/* Card Header: Logo, Name, Score */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={agent.logo} 
                      alt={agent.name} 
                      className="w-11 h-11 rounded-xl object-cover border border-slate-700 shadow-md"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <h3 
                          onClick={() => onNavigateToAgent(agent.slug)}
                          className="font-bold text-base text-white group-hover:text-violet-300 transition cursor-pointer line-clamp-1"
                        >
                          {agent.name}
                        </h3>
                        {agent.builtInIndia && (
                          <span className="text-xs" title="Built in India 🇮🇳">🇮🇳</span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400">{agent.company}</div>
                    </div>
                  </div>

                  {/* BestAI Score Badge */}
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 font-extrabold text-sm px-2.5 py-1 rounded-lg border border-emerald-500/20 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                      <span>{agent.score.overall.toFixed(1)}</span>
                      <span className="text-slate-500 text-[10px] font-normal">/10</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {agent.summary}
                </p>

                {/* Best For Badges */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {agent.bestFor.slice(0, 2).map((item, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-medium text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Pricing & Deployment Metadata */}
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-[11px] space-y-1.5 text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Pricing:</span>
                    <span className="font-semibold text-white">{agent.pricing.startingPriceUSD} {agent.pricing.startingPriceINR && `(${agent.pricing.startingPriceINR})`}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Deployment:</span>
                    <span className="text-slate-200 truncate max-w-[150px]">{agent.deployment.slice(0, 2).join(', ')}</span>
                  </div>
                </div>

                {/* Known Limitation Warning */}
                {agent.knownLimitation && (
                  <div className="text-[10px] text-amber-400/90 bg-amber-500/5 border border-amber-500/20 p-2 rounded-lg line-clamp-2">
                    <strong>Note:</strong> {agent.knownLimitation}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-3 border-t border-slate-800/80">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onNavigateToAgent(agent.slug)}
                    className="w-full py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs transition cursor-pointer text-center"
                  >
                    View Review
                  </button>

                  <button
                    onClick={() => onNavigateToCompare(`${agent.slug}-vs-chatgpt`)}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition cursor-pointer text-center"
                  >
                    Compare
                  </button>
                </div>

                {agent.officialUrl && (
                  <a
                    href={agent.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.5 flex items-center justify-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition"
                  >
                    <span>Visit Official Site</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedAgents;
