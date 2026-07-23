import React from 'react';
import { AlertTriangle, ArrowLeft, Search, Compass, Layers } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
  currentPath?: string;
}

export function NotFoundPage({ onNavigate, currentPath }: NotFoundPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 text-red-400 mb-6 border border-red-500/20">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <span className="inline-block px-3 py-1 bg-red-500/10 text-red-400 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
        404 - Route Not Found
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
        Page Not Found
      </h1>

      <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
        The requested path <code className="bg-slate-900 px-2 py-0.5 rounded text-indigo-300 font-mono text-sm">{currentPath || 'unknown'}</code> does not exist in the BestAIAgent.in authority registry.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition shadow-lg shadow-indigo-600/20"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Directory
        </button>
        <button
          onClick={() => onNavigate('/agents')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition border border-slate-700"
        >
          <Search className="w-4 h-4" /> Browse Verified Agents
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left border-t border-slate-800/80 pt-8">
        <button
          onClick={() => onNavigate('/categories')}
          className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition group"
        >
          <Compass className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-white text-sm mb-1">Taxonomy Categories</h3>
          <p className="text-xs text-slate-400">Explore coding, voice, and orchestration hubs.</p>
        </button>

        <button
          onClick={() => onNavigate('/compare')}
          className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition group"
        >
          <Layers className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-white text-sm mb-1">Head-to-Head Compare</h3>
          <p className="text-xs text-slate-400">Compare top agents side-by-side with benchmarks.</p>
        </button>

        <button
          onClick={() => onNavigate('/sitemap')}
          className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition group"
        >
          <Search className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-white text-sm mb-1">HTML Sitemap Index</h3>
          <p className="text-xs text-slate-400">Full index of published entity reviews.</p>
        </button>
      </div>
    </div>
  );
}
