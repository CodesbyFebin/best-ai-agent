import React from 'react';
import { HelpCircle, ArrowRight, Code, Briefcase, Search, Scale, BookOpen } from 'lucide-react';

interface DirectAnswerProps {
  onNavigateToCategory: (category: string) => void;
  onNavigateToCompare: () => void;
  onNavigateToMethodology: () => void;
}

export const DirectAnswer: React.FC<DirectAnswerProps> = ({
  onNavigateToCategory,
  onNavigateToCompare,
  onNavigateToMethodology
}) => {
  return (
    <section className="bg-slate-900/60 border-b border-slate-800 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 p-6 sm:p-8 shadow-xl space-y-4">
        
        <div className="flex items-center gap-2.5 text-violet-400 font-semibold text-xs uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-violet-400" />
          <span>AEO Direct Answer Summary</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          What is the best AI agent?
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          The best AI agent depends on the task. Coding teams may prioritize repository understanding and code execution (e.g. Cursor AI or Claude 3.5 Sonnet), while businesses may need workflow automation, integrations, governance, and predictable pricing (e.g. Yellow AI or Krutrim). BestAIAgent.in compares agents using transparent criteria rather than naming one universal winner.
        </p>

        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-3 text-xs">
          <span className="text-slate-400 font-medium">Explore Rankings & Tools:</span>

          <button
            onClick={() => onNavigateToCategory('Coding Agents')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition cursor-pointer flex items-center gap-1.5"
          >
            <Code className="w-3.5 h-3.5 text-indigo-400" />
            <span>Best Coding Agents</span>
          </button>

          <button
            onClick={() => onNavigateToCategory('Business Automation')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition cursor-pointer flex items-center gap-1.5"
          >
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
            <span>Best Business Agents</span>
          </button>

          <button
            onClick={() => onNavigateToCategory('Research Agents')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition cursor-pointer flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>Best Research Agents</span>
          </button>

          <button
            onClick={onNavigateToCompare}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition cursor-pointer flex items-center gap-1.5"
          >
            <Scale className="w-3.5 h-3.5 text-violet-400" />
            <span>Compare Matrix</span>
          </button>

          <button
            onClick={onNavigateToMethodology}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition cursor-pointer flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Our Methodology</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default DirectAnswer;
