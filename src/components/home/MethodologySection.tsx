import React from 'react';
import { BookOpen, CheckCircle2, ShieldCheck, Users, FileCheck, ArrowRight } from 'lucide-react';
import { siteConfig } from '../../data/site';

interface MethodologySectionProps {
  onNavigateToMethodology: () => void;
  onNavigateToAuthors: () => void;
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({
  onNavigateToMethodology,
  onNavigateToAuthors
}) => {
  return (
    <section className="py-16 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-violet-400" />
              <span>Editorial Integrity & Transparency</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How We Evaluate AI Agents
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Every score on BestAIAgent.in is calculated using 7 weighted criteria verified by our engineering team.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToMethodology}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs transition cursor-pointer"
            >
              Read Full Methodology
            </button>
            <button
              onClick={onNavigateToAuthors}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition cursor-pointer"
            >
              Meet Review Team
            </button>
          </div>
        </div>

        {/* 7 Weighted Dimensions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {siteConfig.testingDimensions.map((dim) => (
            <div 
              key={dim.name}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">{dim.name}</span>
                <span className="text-xs font-black text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">
                  {dim.weight}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {dim.description}
              </p>
            </div>
          ))}
        </div>

        {/* Reviewer Credentials Block */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-300 font-bold text-lg">
              AS
            </div>
            <div>
              <div className="font-bold text-base text-white">Arshdeep Singh</div>
              <div className="text-xs text-slate-400">Technical Lead & AI Systems Engineer • Lead Evaluator</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                <FileCheck className="w-3.5 h-3.5" /> Evaluated 120+ LLM & Agent Architectures
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <button onClick={onNavigateToMethodology} className="hover:text-white underline">Editorial Policy</button>
            <span>•</span>
            <button onClick={onNavigateToMethodology} className="hover:text-white underline">Correction Policy</button>
            <span>•</span>
            <button onClick={onNavigateToMethodology} className="hover:text-white underline">Affiliate Disclosure</button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MethodologySection;
