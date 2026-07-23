import React from 'react';
import { Scale, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { featuredComparisons } from '../../data/comparisons';

interface ComparisonGridProps {
  onNavigateToPair: (pairSlug: string) => void;
  onNavigateToMatrix: () => void;
}

export const ComparisonGrid: React.FC<ComparisonGridProps> = ({
  onNavigateToPair,
  onNavigateToMatrix
}) => {
  return (
    <section className="py-16 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-violet-400" />
              <span>Head-to-Head Analysis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Popular AI Agent Comparisons
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Side-by-side benchmark evaluations across reasoning, API pricing, tool accuracy, and deployment models.
            </p>
          </div>

          <button
            onClick={onNavigateToMatrix}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>Build Custom Comparison</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredComparisons.map((comp) => (
            <div
              key={comp.pairSlug}
              onClick={() => onNavigateToPair(comp.pairSlug)}
              className="group cursor-pointer rounded-2xl bg-slate-900 border border-slate-800 hover:border-violet-500/50 p-6 shadow-xl transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              {/* Header: Logos & Versus */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <img src={comp.itemA.logo} alt={comp.itemA.name} className="w-9 h-9 rounded-lg object-cover border border-slate-700" />
                    <span className="text-xs font-black text-slate-500">VS</span>
                    <img src={comp.itemB.logo} alt={comp.itemB.name} className="w-9 h-9 rounded-lg object-cover border border-slate-700" />
                  </div>
                  <span className="text-[10px] text-slate-400">Updated {comp.lastUpdated}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition">
                  {comp.title}
                </h3>

                {/* Winner By Use Case */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-[10px] text-violet-400 font-bold uppercase tracking-wider">
                    Winner for {comp.winnerByUseCase.useCase}
                  </div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>{comp.winnerByUseCase.winnerName}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 leading-normal">
                    {comp.winnerByUseCase.reason}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Verdict:</strong> {comp.verdict}
                </p>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-violet-400 group-hover:text-violet-300">
                <span>Explore Full Head-to-Head Report</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ComparisonGrid;
