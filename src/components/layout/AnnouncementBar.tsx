import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface AnnouncementBarProps {
  onNavigateToMethodology?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onNavigateToMethodology }) => {
  return (
    <div className="bg-slate-950 border-b border-slate-800/80 text-slate-300 text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 font-medium">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20 text-[10px] font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3 h-3 text-violet-400" /> Independent
          </span>
          <span className="truncate">
            Transparent scoring • India-specific pricing and deployment guidance
          </span>
        </div>

        <button
          onClick={onNavigateToMethodology}
          className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 font-semibold transition group cursor-pointer"
        >
          <span>How we test</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
