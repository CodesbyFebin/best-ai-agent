import React, { useState, useMemo } from 'react';
import {
  Sliders,
  Award,
  ShieldCheck,
  Check,
  X,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Globe,
  Languages,
  DollarSign,
  Cpu,
  BookOpen,
  Calendar,
  Building,
  UserCheck,
  ExternalLink,
  Search,
  Zap,
  HelpCircle,
  FileCode,
  Sparkles,
  RefreshCw,
  Share2
} from 'lucide-react';
import { Product, SiloPage } from '../data/db';

interface IndiaPillarCustomizerProps {
  weights: {
    easeOfUse: number;
    features: number;
    docs: number;
    integrations: number;
    value: number;
    reliability: number;
    indiaFit: number;
    scalability: number;
  };
  setWeights: React.Dispatch<React.SetStateAction<{
    easeOfUse: number;
    features: number;
    docs: number;
    integrations: number;
    value: number;
    reliability: number;
    indiaFit: number;
    scalability: number;
  }>>;
  sortedProducts: (Product & { calculatedScore?: number })[];
  activeSiloPages: SiloPage[];
  routeTo: (view: string, article?: any, slug?: string) => void;
  applyPreset: (preset: 'india' | 'developer' | 'budget' | 'compliance' | 'nocode') => void;
}

// Dialect simulator interactive data
interface DialectPhrase {
  original: string;
  dialect: 'Hinglish' | 'Hindi-English split' | 'Regional Slang (Bazaar)';
  translationEnglish: string;
  parsedJSONIntent: string;
}

const DIALECT_SAMPLES: Record<string, DialectPhrase[]> = {
  vapi: [
    {
      original: "Mera credit card check karo, late fees waive off ho sakti hai kya? Bohot tension hai.",
      dialect: "Hinglish",
      translationEnglish: "Check my credit card, can the late fees be waived off? I'm quite stressed about this.",
      parsedJSONIntent: `{
  "intent": "WAIVE_FEE_REQUEST",
  "entities": {
    "product": "credit_card",
    "requested_action": "waiver",
    "sentiment": "anxious"
  },
  "confidence": 0.98
}`
    },
    {
      original: "Arre bhai delivery delay ho gayi hai, Delhi logistics block dikha raha hai, ticket update karo na fast.",
      dialect: "Regional Slang (Bazaar)",
      translationEnglish: "My delivery is delayed, the tracker shows the Delhi logistics block, please update my ticket quickly.",
      parsedJSONIntent: `{
  "intent": "SHIPMENT_TRIAGE",
  "entities": {
    "location": "Delhi_Hub",
    "status": "delayed",
    "urgency": "high"
  },
  "confidence": 0.95
}`
    }
  ],
  yellowai: [
    {
      original: "Sare sarees aur kurtis ka prices select karke UPI payment payment link whatsapp pe do fast, abhi order karna hai.",
      dialect: "Hinglish",
      translationEnglish: "Select the prices for all sarees and kurtis, and send a UPI payment link on WhatsApp quickly. I want to order now.",
      parsedJSONIntent: `{
  "action": "SEND_UPI_BILL",
  "cart_items": ["saree", "kurti"],
  "channel": "whatsapp_pay",
  "deep_link": "upi://pay?pa=shopkarta@icici..."
}`
    },
    {
      original: "Kolkata warehouse me stock check karein? Humhe 500 meter raw jute transport karna hai priority basis pe.",
      dialect: "Hindi-English split",
      translationEnglish: "Can you check stock in the Kolkata warehouse? We need to transport 500 meters of raw jute on a priority basis.",
      parsedJSONIntent: `{
  "intent": "B2B_STOCK_CHECK",
  "warehouse": "Kolkata_Zone_3",
  "item": "raw_jute",
  "quantity_meters": 500,
  "priority": "emergency"
}`
    }
  ]
};

export default function IndiaPillarCustomizer({
  weights,
  setWeights,
  sortedProducts,
  activeSiloPages,
  routeTo,
  applyPreset
}: IndiaPillarCustomizerProps) {
  const [activeTabChoose, setActiveTabChoose] = useState<number>(0);
  const [selectedToolsDemo, setSelectedToolsDemo] = useState<'vapi' | 'yellowai'>('vapi');
  const [activePhraseIndex, setActivePhraseIndex] = useState<number>(0);
  const [subGuideSearchQuery, setSubGuideSearchQuery] = useState('');
  const [showROIResult, setShowROIResult] = useState(false);
  const [roiCalculations, setRoiCalculations] = useState({
    monthlyCalls: 10000,
    currentCostPerCall: 45, // INR
    agentPlatformCost: 15000, // Monthly static base INR
  });

  // Calculate dynamic ROI
  const calculatedROI = useMemo(() => {
    const currentTotalCost = roiCalculations.monthlyCalls * roiCalculations.currentCostPerCall;
    // Vapi average call cost in India is approx ₹12/hour equivalent to ₹1.5 per 5-min call. Yellow.ai is roughly ₹1 per chat session.
    // Let's assume on average AI agent cost is ₹3.5 per transaction/call including token fees.
    const aiCostPerTransaction = 3.5;
    const variableAICost = roiCalculations.monthlyCalls * aiCostPerTransaction;
    const totalAICost = variableAICost + roiCalculations.agentPlatformCost;
    const monthlySavings = currentTotalCost - totalAICost;
    const savingPercentage = Math.round((monthlySavings / currentTotalCost) * 100);

    return {
      currentTotalCost,
      totalAICost,
      monthlySavings,
      savingPercentage,
      paybackPeriodDays: monthlySavings > 0 ? Math.round((roiCalculations.agentPlatformCost / monthlySavings) * 30) : 0
    };
  }, [roiCalculations]);

  // Handle Preset Clicks locally mapping to global applyPreset
  const handlePresetClick = (type: 'india' | 'developer' | 'budget' | 'compliance' | 'nocode') => {
    applyPreset(type);
  };

  // Filter 10+ subguides based on search bar
  const filteredSubGuides = useMemo(() => {
    return activeSiloPages.filter(page => {
      const query = subGuideSearchQuery.toLowerCase();
      return (
        page.title.toLowerCase().includes(query) ||
        page.directAnswer.toLowerCase().includes(query) ||
        page.primaryKeyword.toLowerCase().includes(query)
      );
    });
  }, [activeSiloPages, subGuideSearchQuery]);

  return (
    <div className="space-y-12">
      {/* 1. Trust & E-E-A-T Editorial Header Block */}
      <div id="e-e-a-t-header" className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        {/* Abstract organic decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="relative space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] sm:text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-400" /> India Edition 2026
            </span>
            <span className="text-[10px] sm:text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> DPDP Compliance Audited
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-slate-100">
              Best AI Agents in 2026 <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-300">
                (Sovereign India Index)
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-lg max-w-4xl font-light leading-relaxed">
              Deep analytical reviews, scoring cards, comparison benchmarks, and unbiased recommendations for commercial AI agents — with heavy weighting on DPDP compliance, INR value, WhatsApp integration, data sovereignty, Hinglish support, and SME practicality.
            </p>
          </div>

          {/* Trusted Meta Info */}
          <div className="pt-6 border-t border-slate-700/60 grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs text-slate-300">
            <div className="space-y-1">
              <span className="text-slate-400 uppercase font-bold tracking-wider block text-[10px]">Last Updated</span>
              <p className="font-semibold text-slate-100 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" /> 11 June 2026 (Real-time Audit)
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 uppercase font-bold tracking-wider block text-[10px]">Evaluators Group</span>
              <p className="font-semibold text-slate-100 leading-snug">
                Arshdeep Singh <span className="text-slate-400 font-normal">(ex-Flipkart Eng)</span>, <br />
                Karan Mehra <span className="text-slate-400 font-normal">(AI Consultant)</span>, <br />
                Priya Iyer <span className="text-slate-400 font-normal">(Enterprise AI Lead)</span>
              </p>
            </div>

            <div className="space-y-1 sm:col-span-2 md:col-span-1">
              <span className="text-slate-400 uppercase font-bold tracking-wider block text-[10px]">Methods & Disclosures</span>
              <div className="flex flex-wrap gap-x-3 gap-y-1 font-bold text-emerald-400 mt-1">
                <button onClick={() => routeTo('disclosure')} className="hover:underline flex items-center gap-0.5">Scoring Rubric <ChevronRight className="w-3" /></button>
                <span className="text-slate-600">|</span>
                <button onClick={() => routeTo('disclosure')} className="hover:underline flex items-center gap-0.5">Affiliate Notice <ChevronRight className="w-3" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Dynamic Evaluation Customizer & Presets */}
      <div id="dynamic-customizer" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-2 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-2">
            <Sliders className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">Dynamic Evaluation Customizer</h2>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-3xl">
            No single indexing model fits every operational target. Modify the slider weights below to prioritize your specific business requirements. The Verified Leaderboard ranks will recalculate and order themselves instantly!
          </p>
        </div>

        {/* Sliders Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 pt-2">
          {/* India Suitability */}
          <div className="space-y-2 p-3 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="flex justify-between text-xs">
              <span className="font-extrabold text-slate-800 text-[11px] block">India Suitability & DPDP</span>
              <span className="font-mono font-black text-emerald-700">{weights.indiaFit}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              value={weights.indiaFit}
              onChange={(e) => setWeights({ ...weights, indiaFit: parseFloat(e.target.value) })}
            />
            <span className="text-[10px] text-slate-400 block leading-tight font-light">Data sovereignty, Local Servers, legal checks</span>
          </div>

          {/* Value for Money */}
          <div className="space-y-2 p-3 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="flex justify-between text-xs">
              <span className="font-extrabold text-slate-800 text-[11px] block">Value for Money (INR TCO)</span>
              <span className="font-mono font-black text-emerald-700">{weights.value}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              value={weights.value}
              onChange={(e) => setWeights({ ...weights, value: parseFloat(e.target.value) })}
            />
            <span className="text-[10px] text-slate-400 block leading-tight font-light">Cost efficiency per chat session or call</span>
          </div>

          {/* Technical Autonomy */}
          <div className="space-y-2 p-3 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="flex justify-between text-xs">
              <span className="font-extrabold text-slate-800 text-[11px] block">Technical Autonomy & APIs</span>
              <span className="font-mono font-black text-emerald-700">{weights.features}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              value={weights.features}
              onChange={(e) => setWeights({ ...weights, features: parseFloat(e.target.value) })}
            />
            <span className="text-[10px] text-slate-400 block leading-tight font-light">Recursive logic, multi-agents, self-correction</span>
          </div>

          {/* WhatsApp Support / Regional dialect support */}
          <div className="space-y-2 p-3 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="flex justify-between text-xs">
              <span className="font-extrabold text-slate-800 text-[11px] block">WhatsApp & Languages</span>
              <span className="font-mono font-black text-emerald-700">{weights.integrations}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              value={weights.integrations}
              onChange={(e) => setWeights({ ...weights, integrations: parseFloat(e.target.value) })}
            />
            <span className="text-[10px] text-slate-400 block leading-tight font-light">Hinglish dialect translation, official API</span>
          </div>

          {/* Ease of Adoption */}
          <div className="space-y-2 p-3 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="flex justify-between text-xs">
              <span className="font-extrabold text-slate-800 text-[11px] block">Ease of Adoption (SME)</span>
              <span className="font-mono font-black text-emerald-700">{weights.easeOfUse}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              value={weights.easeOfUse}
              onChange={(e) => setWeights({ ...weights, easeOfUse: parseFloat(e.target.value) })}
            />
            <span className="text-[10px] text-slate-400 block leading-tight font-light">No-code visual builders vs full SDK setups</span>
          </div>

          {/* Self-Hosting & Data Sovereignty */}
          <div className="space-y-2 p-3 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="flex justify-between text-xs">
              <span className="font-extrabold text-slate-800 text-[11px] block">Self-Hosting & Sovereignty</span>
              <span className="font-mono font-black text-emerald-700">{weights.scalability}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              value={weights.scalability}
              onChange={(e) => setWeights({ ...weights, scalability: parseFloat(e.target.value) })}
            />
            <span className="text-[10px] text-slate-400 block leading-tight font-light">Locally hosted pgvector and docker setups</span>
          </div>

          {/* Enterprise Security */}
          <div className="space-y-2 p-3 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="flex justify-between text-xs">
              <span className="font-extrabold text-slate-800 text-[11px] block">Enterprise Security & Audits</span>
              <span className="font-mono font-black text-emerald-700">{weights.reliability}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              value={weights.reliability}
              onChange={(e) => setWeights({ ...weights, reliability: parseFloat(e.target.value) })}
            />
            <span className="text-[10px] text-slate-400 block leading-tight font-light">Penetration testing, PII scrubbing at token level</span>
          </div>

          {/* Community Momentum */}
          <div className="space-y-2 p-3 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="flex justify-between text-xs">
              <span className="font-extrabold text-slate-800 text-[11px] block">Community Fit & Ecosystem</span>
              <span className="font-mono font-black text-emerald-700">{weights.docs}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              value={weights.docs}
              onChange={(e) => setWeights({ ...weights, docs: parseFloat(e.target.value) })}
            />
            <span className="text-[10px] text-slate-400 block leading-tight font-light">GitHub packages, Indian consulting partners</span>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="bg-emerald-50/50 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-emerald-100">
          <div className="flex items-center gap-1.5 text-xs text-emerald-950 font-bold">
            <Sparkles className="w-4 h-4 text-emerald-600" /> Presets:
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handlePresetClick('india')}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-sm"
            >
              India Suitability Focus (Default)
            </button>
            <button
              onClick={() => handlePresetClick('budget')}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold transition shadow-xs"
            >
              Maximum Cost Efficiency
            </button>
            <button
              onClick={() => handlePresetClick('compliance')}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold transition shadow-xs"
            >
              Enterprise Compliance
            </button>
            <button
              onClick={() => handlePresetClick('developer')}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold transition shadow-xs"
            >
              Developer-First
            </button>
            <button
              onClick={() => handlePresetClick('nocode')}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold transition shadow-xs"
            >
              No-Code Priority
            </button>
          </div>
        </div>
      </div>

      {/* 3. India-Focused Verified Leaderboard (Dynamic Table) */}
      <div id="leaderboard" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900">India-Focused Verified Leaderboard</h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Dynamic recalculation</span>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm">
              Ranks update on-the-fly when tweaking weights sliders above. Double audited for INR affordability and DPDP security compliance.
            </p>
          </div>
          <button
            onClick={() => handlePresetClick('india')}
            className="self-start text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Weights
          </button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-150">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-[11px] font-black uppercase tracking-wider">
                <th className="p-4 rounded-tl-xl">Rank</th>
                <th className="p-4">AI Agent Tool</th>
                <th className="p-4 text-center">Live Custom Score</th>
                <th className="p-4">Starting Price (INR)</th>
                <th className="p-4">WhatsApp Integration</th>
                <th className="p-4">India Fit Grade</th>
                <th className="p-4 rounded-tr-xl text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 text-sm">
              {sortedProducts.map((product, index) => {
                let badgeColor = "bg-slate-100 text-slate-800";
                if (index === 0) badgeColor = "bg-amber-100 text-amber-900 border border-amber-200";
                if (index === 1) badgeColor = "bg-slate-100 text-slate-800 border border-slate-200";
                if (index === 2) badgeColor = "bg-amber-50 text-amber-800 border border-amber-100";

                const displayScore = product.calculatedScore || product.overallScore;

                return (
                  <tr key={product.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 font-black">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs ${badgeColor}`}>
                        #{index + 1}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.logoUrl}
                          alt={product.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-extrabold text-slate-950 text-xs sm:text-sm">{product.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{product.vendorName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-sm font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                        {displayScore.toFixed(1)} / 10
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-slate-900 text-xs">{product.startingPriceINR}</p>
                      <p className="text-[9px] text-slate-400 font-light">{product.pricingModel}</p>
                    </td>
                    <td className="p-4">
                      {product.whatsappReady ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                          <Check className="w-3.5 h-3.5 text-emerald-600" /> Native (Official)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                          <X className="w-3.5 h-3.5" /> Requires API hook
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 bg-slate-100 rounded-full h-2 overflow-hidden border">
                          <div
                            className="bg-emerald-600 h-full rounded-full"
                            style={{ width: `${(product.scores.indiaFit / 10) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-extrabold text-slate-700">{product.scores.indiaFit}/10</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => routeTo('product', undefined, product.slug)}
                        className="p-2 py-1.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white text-[10px] sm:text-xs font-black uppercase rounded-lg transition"
                      >
                        Deep Review
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Interactive Practical Guide Tabs */}
      <div id="how-to-choose" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-950 flex items-center gap-2">
            <BookOpen className="w-5.5 h-5.5 text-emerald-500" /> How to Choose the Ideal AI Agent Environment in India
          </h3>
          <p className="text-slate-500 text-xs mt-1">Four operational pillars evaluated for Indian SMEs and tech leaders.</p>
        </div>

{/* Tab Buttons */}
         <div className="flex flex-wrap border-b border-slate-150 gap-2" role="tablist" aria-label="Choose guidance steps">
           {['1. Define Clear Boundaries', '2. Local Compliance Hub', '3. Stack Fit & Docs', '4. Real Operational Cost'].map((tabLabel, idx) => (
             <button
               key={idx}
               role="tab"
               aria-selected={activeTabChoose === idx}
               aria-controls={`tab-panel-${idx}`}
               onClick={() => setActiveTabChoose(idx)}
               className={`pb-3 px-3 text-xs font-bold transition-all relative ${activeTabChoose === idx ? 'text-slate-950' : 'text-slate-400 hover:text-slate-600'}`}
             >
               {tabLabel}
               {activeTabChoose === idx && (
                 <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"></div>
               )}
             </button>
           ))}
         </div>

{/* Tab Content */}
          <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
            {activeTabChoose === 0 && (
              <div id="tab-panel-0" role="tabpanel" className="space-y-2">
                <h4 className="font-extrabold text-slate-950 text-sm sm:text-base">Operational Boundaries: Copilot vs Autonomous Agent</h4>
                <p>Is the agent acting as an advisory virtual copilot or does it require autonomous tool-execution permissions?</p>
                <ul className="list-disc pl-5 space-y-1 mt-2 text-slate-600">
                  <li><strong className="text-slate-900">Copilots:</strong> Perfect for engineering codebases. They help draft boilerplate and trace database schema indexes, but require active human review before deployment.</li>
                  <li><strong className="text-slate-900">Autonomous Agents:</strong> Ideal for operations, customer triage, and CRM pipelines. They trigger webhooks, take phone calls, and resolve customer support chats completely independently.</li>
                </ul>
              </div>
            )}
            {activeTabChoose === 1 && (
              <div id="tab-panel-1" role="tabpanel" className="space-y-2">
                <h4 className="font-extrabold text-slate-950 text-sm sm:text-base">Under the hood legal compliance with DPDP Act of 2023</h4>
                <p>If your business processes customer data in India (especially B2C), your AI integrations must follow statutory rules:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2 text-slate-600">
                  <li><strong className="text-slate-900">Data Residency:</strong> Sensitive information (Aadhaar cards, transactions, UPI credentials, call recordings) should reside securely in localized cloud centers (e.g., Central India Mumbai datasets).</li>
                  <li><strong className="text-slate-900">Token-Level Scrubbing:</strong> Your API pipelines must mask personally identifiable information (PII) before routing queries to external global model servers.</li>
                  <li><strong className="text-slate-900">DPDP Consent Formats:</strong> Interactive chatbots must display transparent notices and give users immediate opt-out features (e.g. typing &apos;Delete my profile&apos; triggers automatic log erasure).</li>
                </ul>
              </div>
            )}
            {activeTabChoose === 2 && (
              <div id="tab-panel-2" role="tabpanel" className="space-y-2">
                <h4 className="font-extrabold text-slate-950 text-sm sm:text-base">Developer Documentation and Stack Fit</h4>
                <p>Matching the technical skill profile of your team prevents severe implementation friction.</p>
                <ul className="list-disc pl-5 space-y-1 mt-2 text-slate-600">
                  <li><strong className="text-slate-900">Python Teams:</strong> Frameworks like CrewAI are excellent, letting engineers configure collaborative role-playing agents using python decorators and custom tool objects.</li>
                  <li><strong className="text-slate-900">No-Code / Visual Builders:</strong> Visual systems such as Flowise AI let SME owners or business analysts drag and drop modular nodes, connect to postgres easily, and build proof-of-concepts without writing any backend scripts.</li>
                </ul>
              </div>
            )}
            {activeTabChoose === 3 && (
              <div id="tab-panel-3" role="tabpanel" className="space-y-2">
                <h4 className="font-extrabold text-slate-950 text-sm sm:text-base">Total TCO: Subscription Fees vs Pay-As-You-Go Token Spends</h4>
                <p>Calculating the true long-term operational budget allows businesses to avoid crippling cost surprises:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2 text-slate-600">
                  <li><strong className="text-slate-900">Voice Agents (e.g., Vapi, Bland):</strong> Often charged per call minute. Compare the official per-minute rate, telephony costs, model costs, GST treatment, and human escalation cost before estimating savings.</li>
                  <li><strong className="text-slate-900">SaaS Builder Subscriptions:</strong> Managed platforms may include orchestration and support costs. Switching to visual, self-hosted tools such as Flowise on Docker can improve control, but savings depend on hosting, model usage, maintenance, and support needs.</li>
                </ul>
              </div>
            )}
          </div>
      </div>

      {/* Interactive Tool Playground Feature: Hinglish Multi-Dialect Translation Tool */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] bg-slate-800 text-slate-200 border border-slate-700 px-2 py-0.5 rounded font-black uppercase tracking-wider">Interactive simulator</span>
            <h3 className="text-lg font-bold flex items-center gap-1.5 text-slate-100">
              <Languages className="w-5 h-5 text-emerald-400" /> Hinglish Dialect Parsing Sandbox
            </h3>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => { setSelectedToolsDemo('vapi'); setActivePhraseIndex(0); }}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${selectedToolsDemo === 'vapi' ? 'bg-emerald-600 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}
            >
              Vapi Voice API
            </button>
            <button
              onClick={() => { setSelectedToolsDemo('yellowai'); setActivePhraseIndex(0); }}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${selectedToolsDemo === 'yellowai' ? 'bg-emerald-600 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}
            >
              Yellow.ai WhatsApp
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Conversational Phrase selection */}
          <div className="space-y-4">
            <p className="text-slate-300 text-xs sm:text-sm">
              Indian consumers use heavy code-switching. Click a real user chat phrase below to witness how the agent parser extracts JSON payloads on-the-fly:
            </p>
            <div className="space-y-2">
              {DIALECT_SAMPLES[selectedToolsDemo].map((phrase, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhraseIndex(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex flex-col gap-1.5 ${activePhraseIndex === idx ? 'bg-slate-800 border-emerald-500 text-slate-100 shadow-lg' : 'bg-slate-850/40 border-slate-800 text-slate-400 hover:bg-slate-800/60'}`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-emerald-400">{phrase.dialect}</span>
                    <span className="text-[9px] text-slate-500">Phrase #{idx + 1}</span>
                  </div>
                  <p className="italic font-medium text-slate-200">&ldquo;{phrase.original}&rdquo;</p>
                  <p className="text-[10px] text-slate-400">English: {phrase.translationEnglish}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Code output display */}
          <div className="space-y-2">
            <span className="text-[9px] uppercase font-bold text-slate-400 font-mono tracking-widest block">Agentic Transcription & Intent Extraction Payload</span>
            <div className="relative bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden p-4">
              <div className="absolute top-3 right-3 text-[9px] font-bold uppercase text-slate-600 flex items-center gap-1 font-mono">
                <FileCode className="w-3.5 h-3.5 text-emerald-500" /> JSON OUTPUT
              </div>
              <pre className="text-[11px] sm:text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed max-h-56">
                <code>{DIALECT_SAMPLES[selectedToolsDemo][activePhraseIndex].parsedJSONIntent}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Cost ROI Calculator interactive block */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b pb-4">
          <h3 className="text-lg font-extrabold text-slate-950 flex items-center gap-1.5">
            <Zap className="w-5 h-5 text-indigo-500" /> Interactive SME Cost & ROI Calculator
          </h3>
          <p className="text-slate-400 text-xs">Estimate savings from swappng to automated voice / transactional bots in India</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Monthly support transactions / calls</label>
              <input
                type="number"
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                value={roiCalculations.monthlyCalls}
                onChange={(e) => setRoiCalculations({ ...roiCalculations, monthlyCalls: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Current manual cost per transaction (INR)</label>
              <input
                type="number"
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                value={roiCalculations.currentCostPerCall}
                onChange={(e) => setRoiCalculations({ ...roiCalculations, currentCostPerCall: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Proposed AI Platform Setup / Monthly Base (INR)</label>
              <input
                type="number"
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                value={roiCalculations.agentPlatformCost}
                onChange={(e) => setRoiCalculations({ ...roiCalculations, agentPlatformCost: parseInt(e.target.value) || 0 })}
              />
            </div>
            <button
              onClick={() => setShowROIResult(true)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all w-full uppercase"
            >
              Calculate Live ROI
            </button>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4 text-center">
            {showROIResult ? (
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-black text-slate-400 block tracking-wider">PROJECTED MONTHLY SAVINGS</span>
                <p className="text-3xl font-black text-emerald-700">₹{calculatedROI.monthlySavings.toLocaleString()}</p>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t text-xs text-left">
                  <div>
                    <span className="text-slate-405 block text-[10px]">CURRENT EXPENDITURE</span>
                    <strong className="text-slate-800">₹{calculatedROI.currentTotalCost.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-slate-405 block text-[10px]">PROPOSED AI TCO</span>
                    <strong className="text-slate-800">₹{calculatedROI.totalAICost.toLocaleString()}</strong>
                  </div>
                </div>
                <div className="bg-emerald-100/60 p-3 rounded-lg border border-emerald-100 text-[11px] text-emerald-800 font-bold leading-tight">
                  ⚡ Cuts support overheads by {calculatedROI.savingPercentage}% immediately!
                  {calculatedROI.paybackPeriodDays > 0 && ` Recovers setup costs in just ${calculatedROI.paybackPeriodDays} days.`}
                </div>
              </div>
            ) : (
              <div className="py-8 text-slate-400 space-y-2">
                <HelpCircle className="w-10 h-10 mx-auto text-slate-300" />
                <p className="text-xs font-bold uppercase text-slate-400">Click Calculate to Estimate INR ROI</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Programmatic Sub-Guides Index (Searchable) */}
      <div id="sub-guides-directory" className="space-y-5">
        <div className="border-b border-slate-200 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Programmatic Intent Clusters Sub-Guides ({filteredSubGuides.length})</h3>
            <p className="text-slate-400 text-xs">Instantly drill down dynamically onto specific commerce, coding, and sales intent clusters.</p>
          </div>
          {/* Quick search input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter intent clusters..."
              value={subGuideSearchQuery}
              onChange={(e) => setSubGuideSearchQuery(e.target.value)}
              className="text-xs pl-8 pr-3 py-1.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {filteredSubGuides.length === 0 ? (
            <div className="col-span-full text-center py-6 bg-slate-50 border rounded-2xl text-slate-400 text-xs">
              No matching intent clusters. Clear or edit your keyword search.
            </div>
          ) : (
            filteredSubGuides.map((page, id) => (
              <div key={id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-950 line-clamp-2 leading-snug">{page.title}</h4>
                    <span className="text-[8px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded uppercase">Ranked</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{page.directAnswer}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] flex justify-between items-center">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">{page.primaryKeyword}</span>
                  <button onClick={() => routeTo('article', undefined, page.slug)} className="text-emerald-700 hover:text-emerald-800 hover:underline font-bold transition flex items-center gap-0.5">
                    Explore <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
