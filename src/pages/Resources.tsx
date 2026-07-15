import React from 'react';
import { 
  Search, 
  Book, 
  FileText, 
  Code, 
  Copy, 
  GraduationCap, 
  FileCode2, 
  Video, 
  PenTool,
  Bookmark,
  ChevronRight,
  ExternalLink,
  Users,
  PlayCircle,
  Clock,
  ArrowRight,
  Layers,
  Cpu
} from 'lucide-react';

export default function Resources() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-24 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-sm font-medium text-slate-300">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span> Your All-in-One AI Agent Resource Hub
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Everything You Need to<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Build, Deploy & Scale AI Agents
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-xl">
              Guides, docs, tools, tutorials, templates and everything to help you win with AI Agents. Curated, verified and made for builders.
            </p>
            
            <div className="flex flex-wrap gap-6 py-2">
              <div>
                <div className="font-bold text-white text-xl flex items-center gap-2"><Book size={18} className="text-indigo-400"/> 10,000+</div>
                <div className="text-xs text-slate-400">Resources</div>
              </div>
              <div>
                <div className="font-bold text-white text-xl flex items-center gap-2"><GraduationCap size={18} className="text-emerald-400"/> 500+</div>
                <div className="text-xs text-slate-400">Guides & Tutorials</div>
              </div>
              <div>
                <div className="font-bold text-white text-xl flex items-center gap-2"><Code size={18} className="text-blue-400"/> 100+</div>
                <div className="text-xs text-slate-400">Tools & SDKs</div>
              </div>
              <div>
                <div className="font-bold text-white text-xl flex items-center gap-2"><span>🇮🇳</span> Made in India</div>
                <div className="text-xs text-slate-400">For the World</div>
              </div>
            </div>
            
            <div className="relative mt-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-full pl-12 pr-32 py-4 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors">
                Search
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs mt-2">
              <span className="text-slate-500">Popular Searches:</span>
              {['MCP', 'LangChain', 'RAG', 'AI Agent Tutorial', 'Prompt Engineering', 'Open Source'].map(tag => (
                <span key={tag} className="px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 cursor-pointer hover:bg-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative w-full h-[400px] flex items-center justify-center">
            {/* Abstract Graphic representing the isometric nodes */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl mix-blend-screen" />
            <div className="relative w-full h-full max-w-md mx-auto">
               <div className="absolute top-10 left-0 p-3 bg-slate-800/80 backdrop-blur border border-slate-700 rounded-xl flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg"><Book size={16} /></div>
                  <div>
                    <div className="text-sm font-bold text-white">Guides & Tutorials</div>
                    <div className="text-[10px] text-slate-400">Step by step learning</div>
                  </div>
               </div>
               
               <div className="absolute top-0 right-10 p-3 bg-slate-800/80 backdrop-blur border border-slate-700 rounded-xl flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"><FileText size={16} /></div>
                  <div>
                    <div className="text-sm font-bold text-white">Documentation</div>
                    <div className="text-[10px] text-slate-400">Official docs & references</div>
                  </div>
               </div>
               
               <div className="absolute bottom-32 left-10 p-3 bg-slate-800/80 backdrop-blur border border-slate-700 rounded-xl flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg"><Code size={16} /></div>
                  <div>
                    <div className="text-sm font-bold text-white">Tools & SDKs</div>
                    <div className="text-[10px] text-slate-400">Everything you need</div>
                  </div>
               </div>
               
               <div className="absolute bottom-10 right-0 p-3 bg-slate-800/80 backdrop-blur border border-slate-700 rounded-xl flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg"><Copy size={16} /></div>
                  <div>
                    <div className="text-sm font-bold text-white">Templates</div>
                    <div className="text-[10px] text-slate-400">Ready to use projects</div>
                  </div>
               </div>
               
               {/* Center glowing element */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-slate-800/50 border border-indigo-500/30 rounded-2xl flex items-center justify-center rotate-45 transform">
                  <div className="w-24 h-24 border border-indigo-400/50 rounded-xl flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-[0_0_30px_rgba(99,102,241,0.5)] -rotate-45 flex items-center justify-center">
                       <Layers className="text-white w-8 h-8" />
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Browse by Type */}
        <section className="mb-16">
           <h2 className="text-2xl font-bold text-white mb-6">Browse Resources by Type</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {[
                { icon: <Book size={20} className="text-blue-400"/>, title: 'Guides & Tutorials', count: '1,250+', desc: 'Step by step guides' },
                { icon: <FileText size={20} className="text-indigo-400"/>, title: 'Documentation', count: '1,800+', desc: 'Official docs & references' },
                { icon: <Code size={20} className="text-emerald-400"/>, title: 'Tools & SDKs', count: '950+', desc: 'Libraries, SDKs & APIs' },
                { icon: <Copy size={20} className="text-purple-400"/>, title: 'Templates', count: '750+', desc: 'Boilerplates & starters' },
                { icon: <GraduationCap size={20} className="text-orange-400"/>, title: 'Courses', count: '420+', desc: 'Free & premium courses' },
                { icon: <FileCode2 size={20} className="text-pink-400"/>, title: 'Cheat Sheets', count: '300+', desc: 'Quick reference guides' },
                { icon: <Video size={20} className="text-red-400"/>, title: 'Videos', count: '1,100+', desc: 'Video tutorials & talks' },
                { icon: <PenTool size={20} className="text-amber-400"/>, title: 'Blogs', count: '1,430+', desc: 'Articles & insights' },
              ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 transition-colors cursor-pointer group">
                    <div className="mb-3 p-3 rounded-xl bg-slate-800 border border-slate-700 group-hover:bg-slate-700 transition-colors">
                      {item.icon}
                    </div>
                    <div className="text-sm font-bold text-white mb-1">{item.title}</div>
                    <div className="text-xs text-indigo-400 font-semibold mb-1">{item.count}</div>
                    <div className="text-[10px] text-slate-400 leading-tight">{item.desc}</div>
                 </div>
              ))}
           </div>
        </section>

        {/* Trending & Featured */}
        <section className="flex flex-col lg:flex-row gap-8 mb-16">
           <div className="lg:w-1/3">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold text-white flex items-center gap-2">
                   <span className="text-orange-500">🔥</span> Trending Resources
                 </h2>
              </div>
              <div className="flex flex-col gap-3">
                 {[
                   { id: 1, title: 'Build Your First MCP Server', type: 'Guide', level: 'Beginner' },
                   { id: 2, title: 'RAG with Open Source LLMs', type: 'Tutorial', level: 'Intermediate' },
                   { id: 3, title: 'AI Agent Memory Best Practices', type: 'Guide', level: 'Advanced' },
                   { id: 4, title: 'LangChain v0.3 Migration Guide', type: 'Guide', level: 'Intermediate' },
                   { id: 5, title: 'Top 50 AI Tools for Developers', type: 'Blog', level: 'All Levels' },
                   { id: 6, title: 'Prompt Engineering Handbook', type: 'Guide', level: 'Beginner' },
                 ].map(item => (
                   <div key={item.id} className="flex gap-4 p-3 rounded-xl hover:bg-slate-800/50 transition-colors cursor-pointer group">
                      <div className="text-slate-500 font-mono font-bold mt-1 group-hover:text-indigo-400">{item.id}</div>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors">{item.title}</h4>
                        <div className="flex gap-2 text-[10px]">
                          <span className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">{item.type}</span>
                          <span className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-400">{item.level}</span>
                        </div>
                      </div>
                   </div>
                 ))}
                 <button className="text-sm text-indigo-400 font-medium text-left mt-2 flex items-center hover:text-indigo-300">
                    View all trending <ArrowRight size={14} className="ml-1" />
                 </button>
              </div>
           </div>
           
           <div className="lg:w-2/3">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold text-white">Featured Resources</h2>
                 <button className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center">
                    View all <ArrowRight size={14} className="ml-1" />
                 </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {/* Card 1 */}
                 <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors group cursor-pointer flex flex-col">
                    <div className="h-40 bg-slate-800 relative overflow-hidden">
                       {/* Placeholder image */}
                       <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 flex items-center justify-center">
                          <Cpu className="w-16 h-16 text-indigo-500/30" />
                       </div>
                       <span className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-semibold text-white border border-white/10">Guide</span>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                       <h3 className="font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">AI Agents 101: The Complete Beginner's Guide</h3>
                       <p className="text-xs text-slate-400 mb-4 line-clamp-2">Everything you need to know about AI agents, architectures, components and real world use cases.</p>
                       <div className="mt-auto flex justify-between items-center text-xs text-slate-400">
                          <div className="flex items-center gap-2">
                             <div className="w-5 h-5 rounded-full bg-slate-700"></div>
                             <span>BestAI Agent Team</span>
                          </div>
                          <Bookmark size={14} className="hover:text-white" />
                       </div>
                    </div>
                 </div>
                 
                 {/* Card 2 */}
                 <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors group cursor-pointer flex flex-col">
                    <div className="h-40 bg-slate-800 relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
                          <Code className="w-16 h-16 text-purple-500/30" />
                       </div>
                       <span className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-semibold text-white border border-white/10">Template</span>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                       <h3 className="font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">AI Agent Starter Kit: Production ready boilerplate</h3>
                       <p className="text-xs text-slate-400 mb-4 line-clamp-2">Kickstart your project with our production ready AI agent starter kit with auth, database and tools.</p>
                       <div className="mt-auto flex justify-between items-center text-xs text-slate-400">
                          <div className="flex items-center gap-2">
                             <div className="w-5 h-5 rounded-full bg-slate-700"></div>
                             <span>BestAI Agent Team</span>
                          </div>
                          <Bookmark size={14} className="hover:text-white" />
                       </div>
                    </div>
                 </div>
                 
                 {/* Card 3 */}
                 <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors group cursor-pointer flex flex-col hidden md:flex">
                    <div className="h-40 bg-slate-800 relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 to-teal-900/50 flex items-center justify-center">
                          <PlayCircle className="w-16 h-16 text-emerald-500/30" />
                       </div>
                       <span className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-semibold text-white border border-white/10">Course</span>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                       <h3 className="font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">Build & Deploy AI Agents Full Course (Free)</h3>
                       <p className="text-xs text-slate-400 mb-4 line-clamp-2">Learn to build, test and deploy AI agents with hands-on projects and expert guidance.</p>
                       <div className="mt-auto flex justify-between items-center text-xs text-slate-400">
                          <div className="flex items-center gap-2">
                             <div className="w-5 h-5 rounded-full bg-slate-700"></div>
                             <span>BestAI Agent Team</span>
                          </div>
                          <Bookmark size={14} className="hover:text-white" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Popular Topics */}
        <section className="mb-16">
           <h2 className="text-xl font-bold text-white mb-6">Popular Topics</h2>
           <div className="flex flex-wrap gap-3">
              {[
                { name: 'MCP', count: '1,250' },
                { name: 'LangChain', count: '980' },
                { name: 'LlamaIndex', count: '720' },
                { name: 'RAG', count: '1,450' },
                { name: 'Vector DB', count: '880' },
                { name: 'OpenAI', count: '1,100' },
                { name: 'Prompt Engineering', count: '930' },
              ].map(topic => (
                 <div key={topic.name} className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full hover:border-slate-600 hover:bg-slate-800 cursor-pointer transition-colors">
                    <span className="text-sm font-semibold text-white">{topic.name}</span>
                    <span className="text-[10px] text-slate-400">{topic.count}</span>
                 </div>
              ))}
              <button className="px-4 py-2 border border-slate-700 rounded-full text-sm text-slate-300 hover:bg-slate-800">
                 More Topics
              </button>
           </div>
        </section>

      </div>
    </div>
  );
}
