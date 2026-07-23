import React from 'react';
import { RefreshCw, Star, CheckCircle2, ArrowRight } from 'lucide-react';
import { featuredAgents } from '../../data/agents';

interface RecentReviewsProps {
  onNavigateToAgent: (slug: string) => void;
}

export const RecentReviews: React.FC<RecentReviewsProps> = ({ onNavigateToAgent }) => {
  const recentUpdates = [
    {
      agentSlug: "claude",
      agentName: "Claude 3.5 Sonnet",
      updateType: "Benchmark Updated",
      date: "July 23, 2026",
      keyFinding: "Added native Computer Use benchmark scores; 96.4% code resolution rate.",
      score: 9.6
    },
    {
      agentSlug: "cursor-ai",
      agentName: "Cursor AI Editor",
      updateType: "Major Product Release",
      date: "July 22, 2026",
      keyFinding: "Multi-file Agent Mode expanded with autonomous terminal execution sandbox.",
      score: 9.7
    },
    {
      agentSlug: "vapi-ai",
      agentName: "Vapi Voice AI",
      updateType: "Pricing Updated",
      date: "July 20, 2026",
      keyFinding: "Telephony audio rates re-verified at $0.05/min with Rupee billing.",
      score: 9.3
    },
    {
      agentSlug: "chatgpt",
      agentName: "ChatGPT Agent Mode",
      updateType: "Feature Added",
      date: "July 19, 2026",
      keyFinding: "Canvas multi-document drafting integrated with custom GPT store.",
      score: 9.5
    },
    {
      agentSlug: "krutrim",
      agentName: "Ola Krutrim AI",
      updateType: "New Review",
      date: "July 18, 2026",
      keyFinding: "22 Indic language models benchmarked for UPI payment bot support.",
      score: 8.8
    },
    {
      agentSlug: "crewai",
      agentName: "CrewAI Framework",
      updateType: "Methodology Updated",
      date: "July 15, 2026",
      keyFinding: "Multi-agent token overhead evaluated across PyPI v0.80 releases.",
      score: 9.4
    }
  ];

  return (
    <section className="py-16 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div>
          <div className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <RefreshCw className="w-4 h-4 text-violet-400" />
            <span>Continuous Quality Assurance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Recently Tested & Updated
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Live changelog showing our latest re-tests, pricing verifications, and benchmark updates.
          </p>
        </div>

        {/* Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentUpdates.map((item) => (
            <div
              key={item.agentSlug}
              onClick={() => onNavigateToAgent(item.agentSlug)}
              className="group cursor-pointer rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-violet-500/50 p-5 transition space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 font-semibold border border-violet-500/20">
                  {item.updateType}
                </span>
                <span className="text-slate-400">{item.date}</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <h3 className="font-bold text-base text-white group-hover:text-violet-300 transition">
                  {item.agentName}
                </h3>
                <div className="inline-flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <Star className="w-3 h-3 fill-emerald-400" />
                  <span>{item.score.toFixed(1)}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.keyFinding}
              </p>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-end text-xs font-semibold text-violet-400 group-hover:underline">
                <span>View Full Review →</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RecentReviews;
