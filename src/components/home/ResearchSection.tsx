import React from 'react';
import { BarChart3, Download, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { researchReports } from '../../data/research';

interface ResearchSectionProps {
  onNavigateToResearch: () => void;
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({ onNavigateToResearch }) => {
  return (
    <section className="py-16 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>Original Industry Research</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Agent Benchmarks & Market Reports
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Data-backed research datasets, pricing indices, and technical whitepapers produced by our evaluation team.
            </p>
          </div>

          <button
            onClick={onNavigateToResearch}
            className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition cursor-pointer flex items-center gap-1"
          >
            <span>Browse All Research Reports</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {researchReports.map((report) => (
            <div
              key={report.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    {report.reportType}
                  </span>
                  <span className="text-slate-400">{report.sampleSize}</span>
                </div>

                <h3 className="text-lg font-bold text-white">{report.title}</h3>
                
                <p className="text-xs text-slate-300 leading-relaxed">
                  {report.summary}
                </p>

                {/* Citation Ready Block */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-[11px] text-slate-300 italic space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider not-italic">
                    Citation-Ready Key Finding:
                  </div>
                  <p>"{report.citationReadySummary}"</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Updated {report.updatedDate}</span>
                {report.datasetAvailable && (
                  <span className="inline-flex items-center gap-1 text-cyan-400 font-semibold text-[11px]">
                    <Download className="w-3 h-3" /> Dataset Available
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ResearchSection;
