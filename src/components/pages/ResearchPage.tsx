import React from 'react';
import { researchReports } from '../../data/research';
import { FileText, Download, ArrowUpRight, BarChart3 } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export default function ResearchPage({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold uppercase">
            <BarChart3 className="w-3.5 h-3.5" /> BestAIAgent.in Annual Market Intelligence
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            Original Industry Research & Benchmark Reports
          </h1>
          <p className="text-slate-400 text-base md:text-lg">
            In-depth empirical research, latency benchmarks, and enterprise AI adoption statistics across India and global markets.
          </p>
        </div>

        <div className="space-y-6">
          {researchReports.map(report => (
            <div key={report.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4 hover:border-indigo-500/50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{report.reportType} • {report.updatedDate}</span>
                  <h2 className="text-2xl font-bold text-white mt-1">{report.title}</h2>
                  <p className="text-xs text-slate-400 mt-1">Sample Size: {report.sampleSize}</p>
                </div>
                <div className="bg-indigo-950/80 border border-indigo-800 text-indigo-300 px-3 py-1.5 rounded-lg text-xs font-bold">
                  Citation-Ready
                </div>
              </div>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{report.summary}</p>

              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase">Key Finding / LLM Citation Excerpt:</div>
                <p className="text-xs text-slate-200 italic font-mono">"{report.keyTakeaways[0]}"</p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs">
                <div className="flex flex-wrap gap-2">
                  {report.keyTakeaways.slice(1).map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      • {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => alert(`Downloading full PDF report: "${report.title}"`)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download Full Data PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
