import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, RotateCcw, Scale, Star, Shield, Code, Mic, Headphones } from 'lucide-react';
import { featuredAgents, Agent } from '../../data/agents';

interface AgentFinderProps {
  onNavigateToAgent: (slug: string) => void;
  onNavigateToCompare: () => void;
}

export const AgentFinder: React.FC<AgentFinderProps> = ({
  onNavigateToAgent,
  onNavigateToCompare
}) => {
  const [step, setStep] = useState<number>(1);
  const [useCase, setUseCase] = useState<string>('Coding');
  const [priority, setPriority] = useState<string>('Best performance');
  const [environment, setEnvironment] = useState<string>('Desktop');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const useCaseOptions = [
    "Coding", "Research", "Customer Support", "Sales & Marketing", "Voice Agents", "Workflow Automation"
  ];

  const priorityOptions = [
    "Best performance", "Lowest cost", "Privacy & Security", "Open source", "India pricing & UPI", "Self-hosting"
  ];

  const envOptions = [
    "Desktop IDE", "Web Portal", "REST API", "Mobile App", "WhatsApp / Telephony", "Self-hosted Server"
  ];

  const handleCalculate = () => {
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setStep(1);
    setIsSubmitted(false);
  };

  // Dynamic matching logic based on selections
  const getMatchedAgents = (): { agent: Agent; reason: string }[] => {
    let matched = [...featuredAgents];

    if (useCase === 'Coding') {
      matched = matched.filter(a => a.categories.includes('Coding Agents') || a.bestFor.some(b => b.toLowerCase().includes('code')));
    } else if (useCase === 'Voice Agents') {
      matched = matched.filter(a => a.categories.includes('Voice Agents'));
    } else if (useCase === 'Research') {
      matched = matched.filter(a => a.categories.includes('Research Agents'));
    }

    if (priority === 'Open source') {
      matched = matched.filter(a => a.openSource);
    } else if (priority === 'India pricing & UPI') {
      matched = matched.filter(a => a.builtInIndia || a.score.indiaFit >= 9.0);
    }

    if (matched.length < 3) {
      matched = featuredAgents.slice(0, 3);
    }

    return matched.slice(0, 3).map((agent, index) => ({
      agent,
      reason: index === 0 
        ? `Ranked #1 match for ${useCase} with strong ${priority} scores.`
        : `Strong secondary choice for ${environment} deployments with proven reliability.`
    }));
  };

  const matches = getMatchedAgents();

  return (
    <section className="py-16 bg-slate-950 border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Interactive Recommendation Engine</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Find the Best AI Agent for Your Workflow
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Answer 3 quick questions to receive independent, data-backed recommendations based on our benchmark scores.
          </p>
        </div>

        {/* Wizard Form */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
          
          {!isSubmitted ? (
            <div className="space-y-6">
              
              {/* Step Indicators */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs font-semibold">
                <span className={step === 1 ? 'text-violet-400' : 'text-slate-500'}>1. Task / Workflow</span>
                <span className={step === 2 ? 'text-violet-400' : 'text-slate-500'}>2. Primary Priority</span>
                <span className={step === 3 ? 'text-violet-400' : 'text-slate-500'}>3. Deployment Target</span>
              </div>

              {/* Step 1: Task */}
              {step === 1 && (
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-white">
                    Step 1: What do you need help with?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {useCaseOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setUseCase(opt)}
                        className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                          useCase === opt
                            ? 'bg-violet-600/20 border-violet-500 text-violet-300'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Next Step</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Priority */}
              {step === 2 && (
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-white">
                    Step 2: What matters most to your team?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {priorityOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setPriority(opt)}
                        className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                          priority === opt
                            ? 'bg-violet-600/20 border-violet-500 text-violet-300'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setStep(1)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Next Step</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Deployment */}
              {step === 3 && (
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-white">
                    Step 3: Where will you deploy or use it?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {envOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setEnvironment(opt)}
                        className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                          environment === opt
                            ? 'bg-violet-600/20 border-violet-500 text-violet-300'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setStep(2)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleCalculate}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg transition cursor-pointer flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-cyan-300" />
                      <span>Generate Matching Recommendations</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* Results View */
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="text-xs text-violet-400 font-semibold">Based on your selected preferences</div>
                  <h3 className="text-lg font-bold text-white">Top 3 Agent Matches</h3>
                </div>

                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start Over</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {matches.map(({ agent, reason }, idx) => (
                  <div 
                    key={agent.id}
                    className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">
                          #{idx + 1} Recommendation
                        </span>
                        <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                          <span>{agent.score.overall.toFixed(1)}/10</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 pt-1">
                        <img src={agent.logo} alt={agent.name} className="w-9 h-9 rounded-lg object-cover" />
                        <div>
                          <h4 className="font-bold text-sm text-white">{agent.name}</h4>
                          <div className="text-[11px] text-slate-400">{agent.company}</div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 bg-slate-900 p-2 rounded-lg border border-slate-800">
                        {reason}
                      </p>

                      <div className="text-[11px] text-slate-400">
                        <strong>Starting Price:</strong> {agent.pricing.startingPriceUSD}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                      <button
                        onClick={() => onNavigateToAgent(agent.slug)}
                        className="w-full py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs text-center"
                      >
                        Read Review
                      </button>
                      <button
                        onClick={onNavigateToCompare}
                        className="w-full py-1.5 rounded-lg bg-slate-800 text-slate-200 font-semibold text-xs text-center"
                      >
                        Compare
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default AgentFinder;
