import React, { useState } from 'react';
import { Search, Sparkles, ShieldCheck, ArrowRight, CheckCircle2, Star, Cpu, Terminal, Zap } from 'lucide-react';
import { siteConfig } from '../../data/site';

interface HeroProps {
  onSearchSubmit: (query: string) => void;
  onSelectCategoryFilter: (category: string) => void;
  onNavigateToFinder: () => void;
  onNavigateToCompare: () => void;
  onNavigateToAgent: (slug: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearchSubmit,
  onSelectCategoryFilter,
  onNavigateToFinder,
  onNavigateToCompare,
  onNavigateToAgent
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const quickFilterChips = [
    { label: "Coding", category: "Coding Agents" },
    { label: "Customer Support", category: "Customer Support" },
    { label: "Research", category: "Research Agents" },
    { label: "Sales", category: "Sales & Marketing" },
    { label: "Voice", category: "Voice Agents" },
    { label: "Automation", category: "Business Automation" },
    { label: "Open Source", category: "Open-Source Agents" },
    { label: "Enterprise", category: "Business Automation" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim());
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-800">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (55%): Headline & Intelligent Search */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Editorial Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Database updated {siteConfig.lastDatabaseUpdate}</span>
              <span className="text-slate-600">•</span>
              <span className="text-violet-400 font-semibold">{siteConfig.stats.agentsCount} Agents Evaluated</span>
            </div>

            {/* Semantic Single H1 Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Find the Right <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">AI Agent</span> for Any Task
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Explore independent reviews, transparent benchmark scores, real pricing, integrations, deployment options, and known limitations across leading AI agents.
            </p>

            {/* Intelligent Search Input */}
            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <label htmlFor="hero-search-input" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                What do you need an AI agent for?
              </label>
              
              <div className="relative flex items-center">
                <div className="absolute left-4 text-slate-400 pointer-events-none">
                  <Search className="w-5 h-5 text-violet-400" />
                </div>
                
                <input
                  id="hero-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Coding, customer support, research, voice bots, workflow automation..."
                  className="w-full pl-12 pr-32 py-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm sm:text-base shadow-xl"
                />

                <button
                  type="submit"
                  className="absolute right-2.5 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>Find Agents</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Filter Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                <span className="text-xs text-slate-400 font-medium mr-1">Popular:</span>
                {quickFilterChips.map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => onSelectCategoryFilter(chip.category)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-violet-500/50 text-xs text-slate-300 transition cursor-pointer"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </form>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800/80">
              <button
                onClick={onNavigateToFinder}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-violet-900/30 transition cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Launch Agent Finder</span>
              </button>

              <button
                onClick={onNavigateToCompare}
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition cursor-pointer flex items-center gap-2"
              >
                <span>Compare Top Agents</span>
              </button>
            </div>

            {/* Hero Proof Points */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs text-slate-400">
              <div>
                <div className="font-extrabold text-base text-white">{siteConfig.stats.agentsCount}</div>
                <div>Agents Indexed</div>
              </div>
              <div>
                <div className="font-extrabold text-base text-white">{siteConfig.stats.reviewsCount}</div>
                <div>Independent Reviews</div>
              </div>
              <div>
                <div className="font-extrabold text-base text-white">{siteConfig.stats.comparisonsCount}</div>
                <div>Comparisons</div>
              </div>
              <div>
                <div className="font-extrabold text-base text-emerald-400">100% Verified</div>
                <div>Methodology Tested</div>
              </div>
            </div>

          </div>

          {/* Right Column (45%): Visual Product Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-5 shadow-2xl space-y-4">
              
              {/* Top Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs text-slate-400 font-mono ml-2">BestAI Score Matrix</span>
                </div>
                <span className="text-[11px] font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">
                  Live Preview
                </span>
              </div>

              {/* Sample Product Review Card: Claude 3.5 Sonnet */}
              <div 
                onClick={() => onNavigateToAgent('claude')}
                className="group cursor-pointer rounded-xl bg-slate-900/90 border border-slate-800 hover:border-violet-500/50 p-4 transition space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=120&q=80" 
                      alt="Claude 3.5 Sonnet" 
                      className="w-10 h-10 rounded-lg object-cover border border-slate-700" 
                    />
                    <div>
                      <h2 className="text-sm font-bold text-white group-hover:text-violet-300 transition">Claude 3.5 Sonnet</h2>
                      <div className="text-xs text-slate-400">Anthropic • Coding & Reasoning</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 font-extrabold text-sm px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                      <span>9.6</span>
                      <span className="text-slate-500 text-[10px] font-normal">/10</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2">
                  Top performer for complex software refactoring, multi-file code editing, and Computer Use desktop control.
                </p>

                {/* Dimension Breakdown */}
                <div className="grid grid-cols-3 gap-2 text-[10px] pt-1">
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800 text-center">
                    <div className="text-slate-400">Reasoning</div>
                    <div className="font-bold text-slate-200">9.8</div>
                  </div>
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800 text-center">
                    <div className="text-slate-400">Tool Use</div>
                    <div className="font-bold text-slate-200">9.7</div>
                  </div>
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800 text-center">
                    <div className="text-slate-400">India Pricing</div>
                    <div className="font-bold text-slate-200">₹1,999/mo</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Review
                  </span>
                  <span className="text-violet-400 group-hover:underline font-semibold flex items-center gap-0.5">
                    View Breakdown →
                  </span>
                </div>
              </div>

              {/* Sample Comparison Preview Pill */}
              <div 
                onClick={onNavigateToCompare}
                className="cursor-pointer rounded-xl bg-gradient-to-r from-violet-950/40 to-slate-900 border border-violet-500/20 hover:border-violet-500/40 p-3 flex items-center justify-between text-xs text-slate-300 transition"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span><strong>Cursor AI vs Copilot:</strong> Multi-file agent editing winner</span>
                </div>
                <span className="text-violet-400 font-semibold">Compare →</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
