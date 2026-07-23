import React from 'react';
import { featuredCategories } from '../../data/categories';
import { ArrowRight, Layers, Cpu, ShieldCheck, Zap } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export default function CategoriesPage({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" /> 300+ Category Taxonomy Hubs
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            AI Agent Category Taxonomy & Ecosystem Maps
          </h1>
          <p className="text-slate-400 text-base md:text-lg">
            Explore dedicated hubs categorized by functional domain, tech stack, deployment framework, and business sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCategories.map(cat => (
            <div
              key={cat.id}
              onClick={() => onNavigate(`/categories/${cat.slug}/`)}
              className="group bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-500/10"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-400">
                    <Layers className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                    {cat.toolCount} Tools
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Top Evaluated Agent:</div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-xs text-indigo-300 font-semibold">
                      {cat.topAgent}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform">
                <span>Explore Category Hub</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
