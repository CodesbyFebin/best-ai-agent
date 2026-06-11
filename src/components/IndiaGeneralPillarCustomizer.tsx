import React, { useState, useMemo } from 'react';
import {
  Sliders,
  Code2,
  Terminal,
  Layers,
  Briefcase,
  TrendingUp,
  Cpu,
  BarChart3,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  LineChart,
  HelpCircle,
  Sparkles,
  Zap,
  Percent,
  Play,
  RotateCcw
} from 'lucide-react';
import { SiloPage } from '../data/db';

interface IndiaGeneralPillarCustomizerProps {
  siloId: 'coding-agents' | 'frameworks' | 'business' | 'research';
  activeSiloPages: SiloPage[];
  routeTo: (view: string, article?: any, slug?: string) => void;
}

// ==========================================
// A. CODING SECTORS DATA
// ==========================================
interface CodingTool {
  name: string;
  bestFor: string;
  ideSupport: string;
  indiaFit: number;
  speed: number;
  multiFile: number;
  repoContext: number;
  license: string;
}

const CODING_TOOLS: CodingTool[] = [
  { name: 'Cursor AI', bestFor: 'Direct full-stack AI coding in general IDE', ideSupport: 'VS Code Fork', indiaFit: 9.6, speed: 9.5, multiFile: 9.4, repoContext: 9.6, license: 'Proprietary' },
  { name: 'Claude Code', bestFor: 'Terminal agentic execution & git workflows', ideSupport: 'Any Terminal', indiaFit: 9.5, speed: 9.2, multiFile: 9.7, repoContext: 9.5, license: 'Proprietary' },
  { name: 'Continue.dev', bestFor: 'Sovereign local LLM backend integration', ideSupport: 'VS Code, JetBrains', indiaFit: 9.4, speed: 8.9, multiFile: 8.5, repoContext: 9.0, license: 'Open Source' },
  { name: 'GitHub Copilot Workspace', bestFor: 'Issue-to-PR flow inside GitHub Cloud', ideSupport: 'Web/GitHub Link', indiaFit: 9.0, speed: 9.1, multiFile: 9.3, repoContext: 9.4, license: 'Proprietary' },
  { name: 'Aider', bestFor: 'Power developers managing terminal patches', ideSupport: 'Command Line', indiaFit: 9.3, speed: 9.4, multiFile: 9.2, repoContext: 9.2, license: 'Open Source' }
];

// ==========================================
// B. FRAMEWORK SECTORS DATA
// ==========================================
interface FrameworkTool {
  name: string;
  language: string;
  orchestrationType: string;
  sovereigntyScore: number;
  memoryModel: number;
  performance: number;
  flexibility: number;
  license: string;
}

const FRAMEWORK_TOOLS: FrameworkTool[] = [
  { name: 'LangGraph', language: 'Python, JS', orchestrationType: 'Stateful DAG Loops', sovereigntyScore: 10.0, memoryModel: 9.6, performance: 9.3, flexibility: 9.8, license: 'MIT' },
  { name: 'CrewAI', language: 'Python', orchestrationType: 'Roleplay Agent Crews', sovereigntyScore: 9.8, memoryModel: 8.8, performance: 9.0, flexibility: 9.2, license: 'Apache-2.0' },
  { name: 'AutoGen', language: 'Python, C#', orchestrationType: 'Multi-Agent Chats', sovereigntyScore: 9.5, memoryModel: 9.1, performance: 9.2, flexibility: 9.6, license: 'MIT' },
  { name: 'LlamaIndex Workflows', language: 'Python, TS', orchestrationType: 'Event-driven Agentic RAG', sovereigntyScore: 10.0, memoryModel: 9.3, performance: 9.5, flexibility: 9.4, license: 'MIT' },
  { name: 'Semantic Kernel', language: 'C#, Python, Java', orchestrationType: 'Native Enterprise Plugs', sovereigntyScore: 9.2, memoryModel: 8.9, performance: 9.6, flexibility: 8.8, license: 'MIT' }
];

// ==========================================
// C. BUSINESS SECTORS DATA
// ==========================================
interface BusinessAgent {
  name: string;
  whatsappAPI: boolean;
  upiReady: boolean;
  setupDays: number;
  roiScore: number;
  complianceScore: number;
  pricingINR: string;
  bestUse: string;
}

const BUSINESS_AGENTS: BusinessAgent[] = [
  { name: 'Yellow.ai', whatsappAPI: true, upiReady: true, setupDays: 14, roiScore: 9.6, complianceScore: 9.8, pricingINR: 'Custom quote (Enterprise)', bestUse: 'Automated logistics & customer queries at massive scale' },
  { name: 'LimeChat', whatsappAPI: true, upiReady: true, setupDays: 4, roiScore: 9.4, complianceScore: 9.5, pricingINR: 'Freemium starting ₹8,500/mo', bestUse: 'D2C Shopify store assistant with smart discount triggers' },
  { name: 'Haptik', whatsappAPI: true, upiReady: true, setupDays: 18, roiScore: 9.2, complianceScore: 9.7, pricingINR: 'Custom enterprise contracts', bestUse: 'Banking automation, telecom, UPI bill reminders' },
  { name: 'Gupshup', whatsappAPI: true, upiReady: true, setupDays: 10, roiScore: 9.1, complianceScore: 9.6, pricingINR: 'Per session rates', bestUse: 'Lead acquisition campaigns & structured OTP conversational pipes' },
  { name: 'Verloop.io', whatsappAPI: true, upiReady: false, setupDays: 12, roiScore: 8.9, complianceScore: 9.4, pricingINR: 'Custom flat tier', bestUse: 'E-commerce fulfillment tickets & returns routing' }
];

// ==========================================
// D. RESEARCH SECTORS DATA
// ==========================================
interface ResearchTrend {
  topic: string;
  benchmarkScore: string;
  impactSpeed: 'Immediate' | 'Medium Term' | 'Long Term';
  viabilityPr: number;
  developerAdoption: number;
  strategicNote: string;
}

const RESEARCH_TRENDS: ResearchTrend[] = [
  { topic: 'Agentic RAG / Dynamic Routers', benchmarkScore: '94.2% (Registry)', impactSpeed: 'Immediate', viabilityPr: 9.6, developerAdoption: 9.8, strategicNote: 'Dynamically routes user calls to lightweight vector spaces versus LLMs to decrease token latency.' },
  { topic: 'Federated Execution Loops', benchmarkScore: '88.9% (SWE-bench)', impactSpeed: 'Medium Term', viabilityPr: 9.2, developerAdoption: 8.5, strategicNote: 'Sovereign agent clusters coordinating over encrypted secure tunnels without centralized orchestration.' },
  { topic: 'Large Multimodal Action Models', benchmarkScore: '76.8% (GAIA)', impactSpeed: 'Immediate', viabilityPr: 9.4, developerAdoption: 9.0, strategicNote: 'Examines mouse activity and interface canvas visual triggers instead of scraping raw HTML code.' },
  { topic: 'Offline Small Language Models (SLMs)', benchmarkScore: 'Llama-3-8B-Agent', impactSpeed: 'Medium Term', viabilityPr: 9.5, developerAdoption: 9.3, strategicNote: 'Deploying agents inside browser engines or on isolated hardware without calling public external APIs.' }
];

export default function IndiaGeneralPillarCustomizer({
  siloId,
  activeSiloPages,
  routeTo
}: IndiaGeneralPillarCustomizerProps) {
  // Navigation & Sliders
  const [weights, setWeights] = useState({
    w1: 8,
    w2: 7,
    w3: 9,
    w4: 6
  });

  const [roiVolume, setRoiVolume] = useState(12000); // Business ROI helper
  const [roiConversion, setRoiConversion] = useState(1.5); // Conversational up-selling conversion rate

  const resetWeights = () => {
    setWeights({ w1: 8, w2: 7, w3: 9, w4: 6 });
  };

  const calculateCustomCodingScore = (item: CodingTool) => {
    const totalWeight = weights.w1 + weights.w2 + weights.w3 + weights.w4;
    const value = (item.speed * weights.w1 + item.multiFile * weights.w2 + item.repoContext * weights.w3 + item.indiaFit * weights.w4) / totalWeight;
    return parseFloat(value.toFixed(1));
  };

  const calculateCustomFrameworkScore = (item: FrameworkTool) => {
    const totalWeight = weights.w1 + weights.w2 + weights.w3 + weights.w4;
    const value = (item.sovereigntyScore * weights.w1 + item.memoryModel * weights.w2 + item.performance * weights.w3 + item.flexibility * weights.w4) / totalWeight;
    return parseFloat(value.toFixed(1));
  };

  const calculateCustomBusinessScore = (item: BusinessAgent) => {
    const totalWeight = weights.w1 + weights.w2 + weights.w3;
    const value = (item.roiScore * weights.w1 + item.complianceScore * weights.w2 + (item.whatsappAPI ? 10 : 6) * weights.w3) / totalWeight;
    return parseFloat(value.toFixed(1));
  };

  const calculateCustomResearchScore = (item: ResearchTrend) => {
    const totalWeight = weights.w1 + weights.w2 + weights.w3;
    const value = (item.viabilityPr * weights.w1 + item.developerAdoption * weights.w2 + (item.impactSpeed === 'Immediate' ? 10 : 7) * weights.w3) / totalWeight;
    return parseFloat(value.toFixed(1));
  };

  // Sorted list memo
  const sortedCodingTools = useMemo(() => {
    return [...CODING_TOOLS].sort((a, b) => calculateCustomCodingScore(b) - calculateCustomCodingScore(a));
  }, [weights]);

  const sortedFrameworks = useMemo(() => {
    return [...FRAMEWORK_TOOLS].sort((a, b) => calculateCustomFrameworkScore(b) - calculateCustomFrameworkScore(a));
  }, [weights]);

  const sortedBusinessAgents = useMemo(() => {
    return [...BUSINESS_AGENTS].sort((a, b) => calculateCustomBusinessScore(b) - calculateCustomBusinessScore(a));
  }, [weights, roiVolume, roiConversion]);

  const sortedTrends = useMemo(() => {
    return [...RESEARCH_TRENDS].sort((a, b) => calculateCustomResearchScore(b) - calculateCustomResearchScore(a));
  }, [weights]);

  // Business ROI Calculations
  const calculatedSavingsINR = useMemo(() => {
    // Basic calculation: each monthly pre-sales session costs ₹25 standard human chat. 
    // Conversational agents handle 85% automatically saving times.
    const sessionsHandled = roiVolume * 0.85;
    const supportAgentHoursSaved = sessionsHandled * 0.15; // 9 minutes saved per chat
    const laborSaved = supportAgentHoursSaved * 180; // ₹180 standard average outsourced support hour salary in India
    return Math.round(laborSaved);
  }, [roiVolume]);

  const calculatedRevenueIncrementINR = useMemo(() => {
    // Conversational up-selling increases sales from chat leads
    const conversionLeads = roiVolume * (roiConversion / 100);
    const averageOrderValueINR = 1200; // typical Indian e-commerce order
    return Math.round(conversionLeads * averageOrderValueINR);
  }, [roiVolume, roiConversion]);

  return (
    <div className="space-y-12 animate-fade-in">
      
      {/* SECTION 1: HEADER SECTION DYNAMICALLY CUSTOMIZED BASED ON SILO */}
      {siloId === 'coding-agents' && (
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative space-y-4">
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center w-fit gap-1">
              <Code2 className="w-3.5 h-3.5" /> DEEP DEVELOPER BENCHMARKS
            </span>
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-slate-100">
                AI Coding Agents <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-blue-300 to-teal-300">
                  Engineering Benchmark List
                </span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-lg max-w-3xl leading-relaxed">
                Expert reviews on multi-file workspace tools, repository architects, terminal commands agents, and custom IDE environments optimized for raw workflow throughput.
              </p>
            </div>
          </div>
        </div>
      )}

      {siloId === 'frameworks' && (
        <div className="bg-gradient-to-br from-violet-950 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative space-y-4">
            <span className="text-[10px] bg-violet-500/20 text-violet-300 border border-violet-500/30 px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center w-fit gap-1">
              <Layers className="w-3.5 h-3.5" /> ARCHITECT & SDK RECON
            </span>
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-slate-100">
                AI Agent Frameworks <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-pink-300 to-indigo-300">
                  Orchestration Technology Grid
                </span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-lg max-w-3xl leading-relaxed">
                Deep dive evaluations of DAG state engines, multi-agent crews, persistent memory graphs, and security guardrails helping Python and Node.js teams deploy production-ready agent environments.
              </p>
            </div>
          </div>
        </div>
      )}

      {siloId === 'business' && (
        <div className="bg-gradient-to-br from-amber-950 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative space-y-4">
            <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center w-fit gap-1">
              <Briefcase className="w-3.5 h-3.5" /> ENTERPRISE ROI COMPASS
            </span>
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-slate-100">
                AI Agents for Business <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-300">
                  Commercial Performance Hub
                </span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-lg max-w-3xl leading-relaxed">
                Practical implementation checklists for conversational WhatsApp APIs, automated UPI workflows, data compliance parameters, and SME cost optimizations.
              </p>
            </div>
          </div>
        </div>
      )}

      {siloId === 'research' && (
        <div className="bg-gradient-to-br from-rose-950 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative space-y-4">
            <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center w-fit gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> ACADEMIC & SWE-BENCH INSIGHTS
            </span>
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-slate-100">
                AI Research & Trends <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-red-300 to-pink-300">
                  Frontier Paradigm Index
                </span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-lg max-w-3xl leading-relaxed">
                Tracking next-generation benchmarks (SWE-bench, GAIA), trending architectures, token optimization frameworks, and energy-conserving small model deployments.
              </p>
            </div>
          </div>
        </div>
      )}


      {/* SECTION 2: INTERACTIVE WEIGHT CUSTOMIZER AND REAL-TIME SCORE TABLE */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
        
        {/* Sliders Area */}
        <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-600" />
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">Active Score Weight parameters</h3>
                <p className="text-[11px] text-slate-400">Sliding weights dynamically re-calculates overall scores based on your technical project goals.</p>
              </div>
            </div>
            <button
              onClick={resetWeights}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 bg-white px-2.5 py-1 rounded border hover:border-slate-300 transition"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {siloId === 'coding-agents' && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 flex justify-between">
                    <span>⚡ Processing Speed</span>
                    <span className="text-indigo-600 font-mono font-bold">w={weights.w1}/10</span>
                  </label>
                  <input
                    type="range" min="1" max="10" value={weights.w1}
                    onChange={(e) => setWeights({ ...weights, w1: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-650"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 flex justify-between">
                    <span>📁 Multi-file Code Changes</span>
                    <span className="text-indigo-600 font-mono font-bold">w={weights.w2}/10</span>
                  </label>
                  <input
                    type="range" min="1" max="10" value={weights.w2}
                    onChange={(e) => setWeights({ ...weights, w2: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-650"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 flex justify-between">
                    <span>🧠 Entire Repo Context</span>
                    <span className="text-indigo-600 font-mono font-bold">w={weights.w3}/10</span>
                  </label>
                  <input
                    type="range" min="1" max="10" value={weights.w3}
                    onChange={(e) => setWeights({ ...weights, w3: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-650"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 flex justify-between">
                    <span>🇮🇳 Indian Technical Support</span>
                    <span className="text-indigo-600 font-mono font-bold">w={weights.w4}/10</span>
                  </label>
                  <input
                    type="range" min="1" max="10" value={weights.w4}
                    onChange={(e) => setWeights({ ...weights, w4: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-650"
                  />
                </div>
              </>
            )}

            {siloId === 'frameworks' && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 flex justify-between">
                    <span>🛡️ Data Sovereignty IP</span>
                    <span className="text-violet-600 font-mono font-bold">w={weights.w1}/10</span>
                  </label>
                  <input
                    type="range" min="1" max="10" value={weights.w1}
                    onChange={(e) => setWeights({ ...weights, w1: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 flex justify-between">
                    <span>💾 Persistent Memory Model</span>
                    <span className="text-violet-600 font-mono font-bold">w={weights.w2}/10</span>
                  </label>
                  <input
                    type="range" min="1" max="10" value={weights.w2}
                    onChange={(e) => setWeights({ ...weights, w2: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 flex justify-between">
                    <span>📈 Event-driven Performance</span>
                    <span className="text-violet-600 font-mono font-bold">w={weights.w3}/10</span>
                  </label>
                  <input
                    type="range" min="1" max="10" value={weights.w3}
                    onChange={(e) => setWeights({ ...weights, w3: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 flex justify-between">
                    <span>🎯 Graph / Loop Flexibility</span>
                    <span className="text-violet-600 font-mono font-bold">w={weights.w4}/10</span>
                  </label>
                  <input
                    type="range" min="1" max="10" value={weights.w4}
                    onChange={(e) => setWeights({ ...weights, w4: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                  />
                </div>
              </>
            )}

            {(siloId === 'business' || siloId === 'research') && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 flex justify-between">
                    <span>💰 Financial ROI / Impact</span>
                    <span className="text-amber-600 font-mono font-bold">w={weights.w1}/10</span>
                  </label>
                  <input
                    type="range" min="1" max="10" value={weights.w1}
                    onChange={(e) => setWeights({ ...weights, w1: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 flex justify-between">
                    <span>🔒 Digital Trust Compliance</span>
                    <span className="text-amber-600 font-mono font-bold">w={weights.w2}/10</span>
                  </label>
                  <input
                    type="range" min="1" max="10" value={weights.w2}
                    onChange={(e) => setWeights({ ...weights, w2: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 flex justify-between">
                    <span>🔌 Native API Integrations</span>
                    <span className="text-amber-600 font-mono font-bold">w={weights.w3}/10</span>
                  </label>
                  <input
                    type="range" min="1" max="10" value={weights.w3}
                    onChange={(e) => setWeights({ ...weights, w3: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>
                <div className="p-3 bg-white border border-slate-150 rounded-xl space-y-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Dynamic Metric Engine</p>
                  <p className="text-[11px] text-slate-700 font-medium">Re-weights are computed locally over sandbox registers instantly.</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Dynamic Display Table based on Silo */}
        <div className="space-y-3">
          <h4 className="text-base font-extrabold text-slate-905 flex items-center gap-1.5">
            <BarChart3 className="w-5 h-5 text-indigo-650" /> Dynamic Leaderboard Rankings
          </h4>
          
          <div className="overflow-x-auto rounded-xl border border-slate-150">
            {siloId === 'coding-agents' && (
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-900 text-white text-xs">
                  <tr>
                    <th className="p-3 font-semibold text-center">Rank</th>
                    <th className="p-3 font-semibold">Agent Engine</th>
                    <th className="p-3 font-semibold">Best For</th>
                    <th className="p-3 font-semibold text-center">Speed Score</th>
                    <th className="p-3 font-semibold text-center">Multi-File</th>
                    <th className="p-3 font-semibold text-center">Context</th>
                    <th className="p-3 font-semibold text-center">License</th>
                    <th className="p-3 font-semibold text-right">Weighted SCORE</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-xs sm:text-sm">
                  {sortedCodingTools.map((item, idx) => (
                    <tr key={item.name} className="hover:bg-slate-50/70 transition">
                      <td className="p-3 font-bold text-center">#{idx + 1}</td>
                      <td className="p-3 font-extrabold text-slate-950">{item.name}</td>
                      <td className="p-3 text-slate-500 font-medium text-xs">{item.bestFor}</td>
                      <td className="p-3 text-center font-mono">{item.speed}/10</td>
                      <td className="p-3 text-center font-mono">{item.multiFile}/10</td>
                      <td className="p-3 text-center font-mono">{item.repoContext}/10</td>
                      <td className="p-3 text-center">
                        <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-semibold">{item.license}</span>
                      </td>
                      <td className="p-3 text-right font-black text-indigo-700">{calculateCustomCodingScore(item)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {siloId === 'frameworks' && (
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-900 text-white text-xs">
                  <tr>
                    <th className="p-3 font-semibold text-center">Rank</th>
                    <th className="p-3 font-semibold">Framework Core</th>
                    <th className="p-3 font-semibold">SDK Languages</th>
                    <th className="p-3 font-semibold text-center">Sovereignty</th>
                    <th className="p-3 font-semibold text-center">Memory Retention</th>
                    <th className="p-3 font-semibold text-center">Performance</th>
                    <th className="p-3 font-semibold text-center">License</th>
                    <th className="p-3 font-semibold text-right">Weighted SCORE</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-xs sm:text-sm">
                  {sortedFrameworks.map((item, idx) => (
                    <tr key={item.name} className="hover:bg-slate-50/70 transition">
                      <td className="p-3 font-bold text-center">#{idx + 1}</td>
                      <td className="p-3 font-extrabold text-slate-950">{item.name}</td>
                      <td className="p-3 text-slate-500 font-mono text-xs">{item.language}</td>
                      <td className="p-3 text-center font-mono">{item.sovereigntyScore}/10</td>
                      <td className="p-3 text-center font-mono">{item.memoryModel}/10</td>
                      <td className="p-3 text-center font-mono">{item.performance}/10</td>
                      <td className="p-3 text-center">
                        <span className="bg-violet-50 text-violet-800 text-[10px] px-2 py-0.5 rounded font-black">{item.license}</span>
                      </td>
                      <td className="p-3 text-right font-black text-violet-750">{calculateCustomFrameworkScore(item)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {siloId === 'business' && (
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-900 text-white text-xs">
                  <tr>
                    <th className="p-3 font-semibold text-center">Rank</th>
                    <th className="p-3 font-semibold">Business Platform</th>
                    <th className="p-3 font-semibold text-center">WhatsApp API</th>
                    <th className="p-3 font-semibold text-center">UPI Billing</th>
                    <th className="p-3 font-semibold text-center">Setup Lead-time</th>
                    <th className="p-3 font-semibold text-center">Est. ROI</th>
                    <th className="p-3 font-semibold text-right">Starting Pricing</th>
                    <th className="p-3 font-semibold text-right">SCORE</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-xs sm:text-sm">
                  {sortedBusinessAgents.map((item, idx) => (
                    <tr key={item.name} className="hover:bg-slate-50/70 transition">
                      <td className="p-3 font-bold text-center">#{idx + 1}</td>
                      <td className="p-3 font-extrabold text-slate-950">
                        {item.name}
                        <p className="text-[10px] text-slate-400 font-light max-w-xs">{item.bestUse}</p>
                      </td>
                      <td className="p-3 text-center">
                        {item.whatsappAPI ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                      </td>
                      <td className="p-3 text-center animate-pulse">
                        {item.upiReady ? <Check className="w-4 h-4 text-teal-600 mx-auto" /> : <X className="w-3.5 h-3.5 text-slate-300 mx-auto" />}
                      </td>
                      <td className="p-3 text-center font-mono text-xs">{item.setupDays} Days</td>
                      <td className="p-3 text-center font-mono">{item.roiScore}/10</td>
                      <td className="p-3 text-right text-xs text-slate-500 font-semibold">{item.pricingINR}</td>
                      <td className="p-3 text-right font-black text-amber-700">{calculateCustomBusinessScore(item)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {siloId === 'research' && (
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-900 text-white text-xs">
                  <tr>
                    <th className="p-3 font-semibold text-center">Rank</th>
                    <th className="p-3 font-semibold">Research Paradigm</th>
                    <th className="p-3 font-semibold">Key Benchmark Index</th>
                    <th className="p-3 text-center">Impact Urgency</th>
                    <th className="p-3 text-center">Viability Ratio</th>
                    <th className="p-3 text-center">Adoption Index</th>
                    <th className="p-3 text-right">Relevance SCORE</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-xs sm:text-sm">
                  {sortedTrends.map((item, idx) => (
                    <tr key={item.topic} className="hover:bg-slate-50/70 transition">
                      <td className="p-3 font-bold text-center">#{idx + 1}</td>
                      <td className="p-3 font-extrabold text-slate-950">
                        {item.topic}
                        <p className="text-[10px] text-slate-500 font-normal font-sans max-w-sm mt-0.5">{item.strategicNote}</p>
                      </td>
                      <td className="p-3 text-slate-700 font-semibold font-mono text-xs">{item.benchmarkScore}</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${item.impactSpeed === 'Immediate' ? 'bg-rose-50 text-rose-800' : 'bg-slate-100 text-slate-800'}`}>
                          {item.impactSpeed}
                        </span>
                      </td>
                      <td className="p-3 text-center font-mono">{item.viabilityPr}/10</td>
                      <td className="p-3 text-center font-mono">{item.developerAdoption}/10</td>
                      <td className="p-3 text-right font-black text-rose-700">{calculateCustomResearchScore(item)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 3: BUSINESS ROI ESTIMATOR (Exclusive value-add for the Business silo. Solves simple checklist) */}
      {siloId === 'business' && (
        <div className="bg-gradient-to-br from-slate-950 to-slate-900 text-white border border-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

          <div className="space-y-1">
            <span className="text-[9px] bg-amber-500/25 text-amber-300 font-black border border-amber-500/20 px-2.5 py-0.5 rounded uppercase tracking-wider">ROI Calculator</span>
            <h3 className="text-lg font-extrabold text-slate-100 mt-1">Converse & Save: SME Indian Cost Matrix estimator</h3>
            <p className="text-slate-400 text-xs">
              Slide volume to calculate estimated monthly savings when automating generic user support and lead loops.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-2">
            <div className="space-y-6 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 flex justify-between">
                  <span>💬 Monthly Inbound Pre-sales Conversations</span>
                  <span className="text-amber-400 font-mono font-bold">{roiVolume.toLocaleString()} chats</span>
                </label>
                <input
                  type="range" min="1000" max="50000" step="500" value={roiVolume}
                  onChange={(e) => setRoiVolume(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 flex justify-between">
                  <span>📈 Target Conversion Uplift (Up-selling via bot)</span>
                  <span className="text-amber-400 font-mono font-bold">{roiConversion}% leads</span>
                </label>
                <input
                  type="range" min="0.2" max="6" step="0.1" value={roiConversion}
                  onChange={(e) => setRoiConversion(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/40 p-4 border border-slate-800 rounded-2xl flex flex-col justify-between">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Estimated outsourced support savings</p>
                <div className="my-2">
                  <span className="text-2xl sm:text-3xl font-black text-teal-400">₹{calculatedSavingsINR.toLocaleString()}</span>
                  <span className="text-xs text-slate-400 block mt-0.5">saved in human hours / month</span>
                </div>
              </div>

              <div className="bg-slate-900/40 p-4 border border-slate-800 rounded-2xl flex flex-col justify-between">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Target incremental sales revenue</p>
                <div className="my-2">
                  <span className="text-2xl sm:text-3xl font-black text-amber-300">₹{calculatedRevenueIncrementINR.toLocaleString()}</span>
                  <span className="text-xs text-slate-400 block mt-0.5">extra sales value / month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: EDUCATIONAL VALUE-ADDS AND WHO THIS IS FOR */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900">How to Choose & Safely Deploy (Practical Guidelines)</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-950 text-base">1. Define sovereign boundaries</h4>
            <p className="text-slate-500 leading-relaxed text-xs">Verify whether your system requires on-premises small language models (SLMs) or if external proprietary cloud endpoints are permitted.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-950 text-base">2. Local compliance requirements</h4>
            <p className="text-slate-500 leading-relaxed text-xs">Adhere strictly to Indian DPDP requirements, keeping user transaction parameters securely mapped locally inside Indian AWS regions.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-950 text-base">3. Avoid token overhead creep</h4>
            <p className="text-slate-500 leading-relaxed text-xs">Monitor pay-as-you-go loops periodically. Complex multi-agent conversations can exhaust standard startup budgets in days.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-950 text-base">4. Scrutinize system memory retention</h4>
            <p className="text-slate-500 leading-relaxed text-xs">Test frameworks under high-friction query limits before full commercial launches. Graph-based memories yield higher accuracy vectors.</p>
          </div>
        </div>
      </div>

      {/* SECTION 5: PROGRAMMATIC SEO DIRECTORY LINKS INDEX */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h3 className="text-lg font-bold text-slate-900">Programmatic Sub-Guides inside directory ({activeSiloPages.length})</h3>
          <p className="text-slate-450 text-xs mt-0.5">Structured internal links driving search relevance and organic crawlability index.</p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          {activeSiloPages.map((page, id) => (
            <div key={id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-350 transition flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-950 line-clamp-2 leading-snug">{page.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{page.directAnswer}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs flex justify-between items-center bg-slate-50 p-2.5 rounded-xl">
                <span className="text-slate-400 font-mono text-[9px] uppercase font-bold tracking-wider">{page.primaryKeyword}</span>
                <button
                  onClick={() => routeTo('article', undefined, page.slug)}
                  className="text-indigo-700 hover:text-indigo-850 hover:underline font-extrabold transition flex items-center gap-0.5"
                >
                  Explore <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
