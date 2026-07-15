import React from 'react';
import { Search, ChevronRight, Star, Code, Briefcase, Layers, Cpu, MessageSquare, Plus, ArrowRight, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-sm font-medium text-slate-300">
            <span className="text-orange-400">🇮🇳</span> India's #1 AI Agent Discovery Platform
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Discover. Compare. Deploy.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              The Best AI Agents.
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-xl">
            Find the perfect AI agents for your tasks. Compare features, pricing, and performance. Built for developers, businesses, and innovators.
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm font-medium">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <span className="text-emerald-400">●</span> 5000+ AI Agents
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <span className="text-blue-400">⊞</span> 100+ Categories
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <span>🇮🇳</span> Built in India
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <span className="text-amber-400">★</span> Trust & Verified
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors shadow-lg shadow-indigo-500/20">
              Explore AI Agents
            </button>
            <button className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold transition-colors">
              Compare Agents
            </button>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative z-10 w-full aspect-square max-w-lg mx-auto">
          {/* Mockup of the glowing brain/nodes graphic */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl mix-blend-screen" />
          <div className="relative w-full h-full border border-slate-700/30 rounded-3xl bg-slate-900/50 backdrop-blur-xl flex items-center justify-center overflow-hidden">
             <Cpu className="w-32 h-32 text-indigo-400/50" />
             {/* Replace with actual image asset if available */}
             <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-slate-800/80 rounded-xl border border-slate-700 flex flex-col items-center justify-center text-xs gap-2">
                <Code className="w-6 h-6 text-blue-400" />
                Code Agent
             </div>
             <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-slate-800/80 rounded-xl border border-slate-700 flex flex-col items-center justify-center text-xs gap-2">
                <MessageSquare className="w-6 h-6 text-purple-400" />
                Support Agent
             </div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="border-y border-slate-800/60 bg-slate-900/30 backdrop-blur-sm py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 text-center divide-x divide-slate-800">
          <div>
            <div className="text-3xl font-bold text-white mb-1">10,000+</div>
            <div className="text-sm text-slate-400">AI Agents</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">50,000+</div>
            <div className="text-sm text-slate-400">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">1M+</div>
            <div className="text-sm text-slate-400">Monthly Searches</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">99.9%</div>
            <div className="text-sm text-slate-400">Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">25+</div>
            <div className="text-sm text-slate-400">Countries</div>
          </div>
        </div>
      </section>

      {/* Main Search Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-3xl font-bold text-white">Find the Perfect AI Agent</h2>
        <p className="text-slate-400">Search from thousands of AI agents across 100+ categories</p>
        
        <div className="relative flex items-center w-full max-w-3xl mx-auto">
          <Search className="absolute left-4 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search AI agents, e.g. 'Markdown to HTML', 'Code Reviewer'..." 
            className="w-full pl-12 pr-32 py-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="absolute right-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors">
            Search
          </button>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-3 text-sm">
          <span className="text-slate-500">Popular Searches:</span>
          {['ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Midjourney', 'GitHub Copilot'].map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 cursor-pointer hover:bg-slate-700">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Explore AI Agents by Categories</h2>
          </div>
          <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center">
            View all categories <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[
            { icon: <Code size={20} />, name: 'Coding', count: '1,245' },
            { icon: <Briefcase size={20} />, name: 'Productivity', count: '892' },
            { icon: <Search size={20} />, name: 'Research', count: '785' },
            { icon: <Layers size={20} />, name: 'Marketing', count: '654' },
            { icon: <Plus size={20} />, name: 'Design', count: '543' },
            { icon: <Layers size={20} />, name: 'Data & Analytics', count: '687' },
            { icon: <Briefcase size={20} />, name: 'Business', count: '925' },
            { icon: <Cpu size={20} />, name: 'Automation', count: '1,096' },
            { icon: <BookOpen size={20} />, name: 'Education', count: '456' },
            { icon: <Star size={20} />, name: 'Finance', count: '409' },
          ].map((cat, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 transition-colors cursor-pointer group">
              <div className="p-2 rounded-lg bg-slate-700/50 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
                {cat.icon}
              </div>
              <div>
                <div className="font-semibold text-white">{cat.name}</div>
                <div className="text-xs text-slate-400">{cat.count} Agents</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
