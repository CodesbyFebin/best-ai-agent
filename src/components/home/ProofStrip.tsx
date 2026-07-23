import React from 'react';
import { ShieldCheck, RefreshCw, Database, FileText, BarChart3, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../../data/site';

interface ProofStripProps {
  onNavigateToDirectory: () => void;
  onNavigateToMethodology: () => void;
  onNavigateToResearch: () => void;
}

export const ProofStrip: React.FC<ProofStripProps> = ({
  onNavigateToDirectory,
  onNavigateToMethodology,
  onNavigateToResearch
}) => {
  return (
    <div className="bg-slate-900 border-b border-slate-800 text-slate-300 py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
        
        <div className="flex flex-wrap items-center gap-6">
          <button 
            onClick={onNavigateToDirectory}
            className="flex items-center gap-2 hover:text-white transition cursor-pointer"
          >
            <Database className="w-4 h-4 text-violet-400" />
            <span><strong className="text-white">{siteConfig.stats.agentsCount}</strong> Agents Indexed</span>
          </button>

          <button 
            onClick={onNavigateToMethodology}
            className="flex items-center gap-2 hover:text-white transition cursor-pointer"
          >
            <FileText className="w-4 h-4 text-indigo-400" />
            <span><strong className="text-white">{siteConfig.stats.reviewsCount}</strong> Independent Reviews</span>
          </button>

          <button 
            onClick={onNavigateToResearch}
            className="flex items-center gap-2 hover:text-white transition cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span><strong className="text-white">{siteConfig.stats.benchmarksCount}</strong> Published Benchmarks</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
          <span>Database Last Updated: <strong className="text-slate-200">{siteConfig.lastDatabaseUpdate}</strong></span>
        </div>

      </div>
    </div>
  );
};

export default ProofStrip;
