import React, { useState } from 'react';
import { featuredAgents } from '../../data/agents';
import { DollarSign, Star, CheckCircle, ArrowUpRight, Calculator } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export default function PricingPage({ onNavigate }: Props) {
  const [exchangeRate] = useState<number>(84.0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold uppercase">
            <DollarSign className="w-3.5 h-3.5" /> India AI Agent Pricing Index & Converter
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            AI Agent Pricing Matrix in INR (₹)
          </h1>
          <p className="text-slate-400 text-base md:text-lg">
            Compare monthly subscription fees, token API costs, free tiers, and estimated monthly budgets in Indian Rupees.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-indigo-400" />
            <span>Standard USD to INR Conversion Rate applied: <strong>$1 USD = ₹{exchangeRate} INR</strong></span>
          </div>
          <span className="text-slate-500">Updated Daily</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4">Agent Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">USD Price</th>
                <th className="p-4">INR Estimate</th>
                <th className="p-4">Free Tier</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
              {featuredAgents.map(agent => (
                <tr key={agent.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-white flex items-center gap-2">
                    <img src={agent.logo} alt={agent.name} className="w-8 h-8 rounded-lg object-cover bg-slate-800" />
                    {agent.name}
                  </td>
                  <td className="p-4 text-slate-400">{agent.categories[0]}</td>
                  <td className="p-4 font-semibold">{agent.pricing.startingPriceUSD}</td>
                  <td className="p-4 text-emerald-400 font-extrabold">{agent.pricing.startingPriceINR}</td>
                  <td className="p-4">
                    {(agent.pricing.type === 'free' || agent.pricing.type === 'freemium') ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-[11px] font-bold">
                        Yes (Free Tier)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-500 text-[11px]">
                        Paid Only
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => onNavigate(`/agents/${agent.slug}/`)}
                      className="text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1"
                    >
                      Audit <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
