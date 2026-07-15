import React from 'react';
import { 
  Globe, 
  TrendingUp, 
  Users, 
  Building2, 
  Map, 
  Cpu, 
  ShieldCheck,
  CheckCircle,
  Briefcase,
  Search,
  Code,
  Layers,
  Star,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export default function BuiltInIndia() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 space-y-6 z-10">
          <div className="text-sm font-medium text-slate-400 mb-2">Home {'>'} Built in India</div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Built in <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-white to-green-500">India</span>
          </h1>
          <h2 className="text-2xl font-semibold text-slate-300">
            Powering the World with Indian Innovation 🇮🇳
          </h2>
          
          <p className="text-lg text-slate-400 max-w-xl">
            Discover 1000+ AI agents and tools proudly built in India. From startups to enterprises, explore the best of Bharat's AI ecosystem.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                <CheckCircle size={16} /> 1,000+
              </div>
              <div className="text-xs text-slate-400">AI Agents</div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                <Building2 size={16} /> 250+
              </div>
              <div className="text-xs text-slate-400">Indian Startups</div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                <Layers size={16} /> 28+
              </div>
              <div className="text-xs text-slate-400">Categories</div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                <Globe size={16} /> Global
              </div>
              <div className="text-xs text-slate-400">Impact</div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <button className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors shadow-lg shadow-indigo-500/20">
              Explore Indian Agents
            </button>
            <button className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold transition-colors">
              Submit Your Agent
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800/60 flex items-center gap-4">
             <div className="flex -space-x-2">
                {/* Avatars placeholder */}
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-[#020617]"></div>
                ))}
             </div>
             <div className="text-sm">
                <div className="text-slate-300">Trusted by 50,000+ developers & businesses</div>
                <div className="flex items-center text-amber-400 text-xs">
                   <Star size={12} className="fill-current" />
                   <Star size={12} className="fill-current" />
                   <Star size={12} className="fill-current" />
                   <Star size={12} className="fill-current" />
                   <Star size={12} className="fill-current" />
                   <span className="text-slate-400 ml-1">4.9/5</span>
                </div>
             </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative z-10 w-full aspect-square max-w-lg mx-auto">
          {/* Mockup of the India map graphic */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-green-500/10 rounded-full blur-3xl mix-blend-screen" />
          <div className="relative w-full h-full border border-slate-700/30 rounded-3xl bg-slate-900/50 backdrop-blur-xl flex flex-col items-center justify-center p-8 overflow-hidden">
             <Map className="w-48 h-48 text-indigo-400/30" />
             <div className="absolute top-1/4 left-8 text-xs text-indigo-300 font-semibold bg-slate-900/80 px-2 py-1 rounded">Indian Innovation</div>
             <div className="absolute top-1/3 right-8 text-xs text-blue-300 font-semibold bg-slate-900/80 px-2 py-1 rounded">Global Impact</div>
             <div className="absolute bottom-1/4 left-1/4 text-xs text-emerald-300 font-semibold bg-slate-900/80 px-2 py-1 rounded">Bharat First</div>
             <div className="absolute bottom-1/3 right-1/4 text-xs text-purple-300 font-semibold bg-slate-900/80 px-2 py-1 rounded">AI for All</div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="border-y border-slate-800/60 bg-slate-900/30 backdrop-blur-sm py-10 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 text-center divide-x divide-slate-800">
          <div>
            <div className="text-3xl font-bold text-indigo-400 mb-1">$3.2B+</div>
            <div className="text-sm font-semibold text-white mb-1">Funding Raised</div>
            <div className="text-xs text-slate-400">By Indian AI Startups</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-400 mb-1">65%</div>
            <div className="text-sm font-semibold text-white mb-1">YoY Growth</div>
            <div className="text-xs text-slate-400">In Indian AI Ecosystem</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-400 mb-1">15M+</div>
            <div className="text-sm font-semibold text-white mb-1">Users</div>
            <div className="text-xs text-slate-400">Across Indian AI Products</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-400 mb-1">180+</div>
            <div className="text-sm font-semibold text-white mb-1">Cities</div>
            <div className="text-xs text-slate-400">Building AI Solutions</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-400 mb-1">50+</div>
            <div className="text-sm font-semibold text-white mb-1">Countries</div>
            <div className="text-xs text-slate-400">Using Indian AI Agents</div>
          </div>
        </div>
      </section>

      {/* Explore Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Explore Indian AI Agents</h2>
            <p className="text-slate-400">Handpicked AI agents and tools built by Indian founders, developers & companies.</p>
          </div>
          <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center">
            View all agents <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
           {/* Mockup for the small category pills */}
           {[
             { name: 'Productivity', agents: '152', icon: <Briefcase size={18} className="text-orange-400"/> },
             { name: 'Development', agents: '186', icon: <Code size={18} className="text-blue-400"/> },
             { name: 'Research', agents: '121', icon: <Search size={18} className="text-purple-400"/> },
             { name: 'Business', agents: '178', icon: <Briefcase size={18} className="text-emerald-400"/> },
             { name: 'Marketing', agents: '96', icon: <Layers size={18} className="text-pink-400"/> },
             { name: 'Data & Analytics', agents: '134', icon: <Cpu size={18} className="text-indigo-400"/> },
             { name: 'Education', agents: '87', icon: <Star size={18} className="text-amber-400"/> },
             { name: 'Others', agents: '79', icon: <Layers size={18} className="text-slate-400"/> },
           ].map((cat, i) => (
             <div key={i} className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 transition-colors cursor-pointer">
                <div className="mb-2 p-2 rounded-lg bg-slate-700/50">
                  {cat.icon}
                </div>
                <div className="text-sm font-semibold text-white">{cat.name}</div>
                <div className="text-xs text-slate-400">{cat.agents} Agents</div>
             </div>
           ))}
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Featured Indian AI Agents</h2>
            <p className="text-slate-400">Top performing agents built in India making a global impact.</p>
          </div>
          <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center">
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {/* Mockup for featured cards */}
           {[
             { title: 'Krutrim', by: 'Ola Krutrim', tag: 'Featured', desc: "India's own foundational AI model family for diverse Indian languages and use cases.", users: '12K users', tags: ['LLM', 'Chat', 'API'] },
             { title: 'Sarvam AI', by: 'Sarvam AI', tag: 'Featured', desc: "Building sovereign multilingual LLMs for India and the world.", users: '6.2K users', tags: ['LLM', 'Research', 'API'] },
             { title: 'Bhashini AI', by: 'MeitY (Govt. of India)', tag: 'Top Rated', desc: "AI platform for language translation, speech & language tech.", users: '25K users', tags: ['NLP', 'Translation'] },
             { title: 'KushoAI', by: 'KushoAI', tag: 'Trending', desc: "Generative AI platform for enterprises with Indian language support.", users: '5.4K users', tags: ['Chat', 'Enterprise'] },
           ].map((agent, i) => (
             <div key={i} className="flex flex-col p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 transition-colors relative">
                <div className="absolute top-4 right-4 text-xs font-semibold px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">
                  {agent.tag}
                </div>
                <div className="w-12 h-12 bg-slate-700 rounded-xl mb-4 flex items-center justify-center font-bold text-xl text-white border border-slate-600">
                  {agent.title[0]}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{agent.title}</h3>
                <div className="text-xs text-slate-400 mb-4">by {agent.by}</div>
                <p className="text-sm text-slate-300 mb-6 flex-grow">{agent.desc}</p>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {agent.tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-1 bg-slate-700/50 rounded-md text-slate-300 border border-slate-600/50">{t}</span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 pt-4 border-t border-slate-700/50">
                   <div>Free • Paid</div>
                   <div className="flex items-center gap-1"><Users size={12} /> {agent.users}</div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Why India section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
         <div className="flex flex-col lg:flex-row gap-12 bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
            <div className="lg:w-1/3">
               <h2 className="text-3xl font-bold text-white mb-4">Why Indian AI Matters to the World</h2>
               <p className="text-slate-400">India is not just adopting AI, we are building it. From solving local challenges to creating global solutions, Indian AI is powering the future responsibly and inclusively.</p>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div>
                  <Globe className="text-indigo-400 mb-3" />
                  <h3 className="text-white font-semibold mb-2">Diverse by Design</h3>
                  <p className="text-sm text-slate-400">Built for Bharat's diversity of languages, cultures and needs.</p>
               </div>
               <div>
                  <TrendingUp className="text-indigo-400 mb-3" />
                  <h3 className="text-white font-semibold mb-2">Cost Effective Innovation</h3>
                  <p className="text-sm text-slate-400">Delivering world-class AI solutions at global competitive pricing.</p>
               </div>
               <div>
                  <ShieldCheck className="text-indigo-400 mb-3" />
                  <h3 className="text-white font-semibold mb-2">Privacy First</h3>
                  <p className="text-sm text-slate-400">Built with strong data privacy and cybersecurity principles.</p>
               </div>
               <div>
                  <Building2 className="text-indigo-400 mb-3" />
                  <h3 className="text-white font-semibold mb-2">Government Support</h3>
                  <p className="text-sm text-slate-400">Backed by initiatives like IndiaAI, Bhashini, MeitY, Digital India.</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
