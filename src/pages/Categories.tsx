import React, { useState } from 'react';
import { 
  Search, 
  Grid, 
  List, 
  ArrowRight,
  Briefcase,
  Code,
  LineChart,
  Search as SearchIcon,
  Megaphone,
  Building2,
  Cpu,
  BookOpen,
  Palette,
  DollarSign,
  ShoppingCart,
  Headset,
  Users,
  Scale,
  HeartPulse,
  ShieldCheck,
  Gamepad2,
  PenTool,
  Home,
  MoreHorizontal,
  Star
} from 'lucide-react';

export default function Categories() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { icon: <Briefcase size={20} />, title: 'Productivity', count: '1,234', desc: 'Boost efficiency and automate your daily tasks.' },
    { icon: <Code size={20} />, title: 'Development', count: '1,345', desc: 'Coding assistants, IDE tools, debuggers & more.' },
    { icon: <LineChart size={20} />, title: 'Data & Analytics', count: '1,023', desc: 'Analyze, visualize and extract insights from data.' },
    { icon: <SearchIcon size={20} />, title: 'Research', count: '987', desc: 'AI research tools, search, summarizers & more.' },
    { icon: <Megaphone size={20} />, title: 'Marketing', count: '876', desc: 'Create content, run campaigns and grow your brand.' },
    { icon: <Building2 size={20} />, title: 'Business', count: '1,102', desc: 'Business operations, strategy, and management tools.' },
    { icon: <Cpu size={20} />, title: 'Automation', count: '765', desc: 'Automate workflows and integrate your tools.' },
    { icon: <BookOpen size={20} />, title: 'Education', count: '654', desc: 'Learning, teaching, and education assistants.' },
    { icon: <Palette size={20} />, title: 'Design', count: '543', desc: 'Design, UI/UX, graphics and creative tools.' },
    { icon: <DollarSign size={20} />, title: 'Finance', count: '432', desc: 'Financial analysis, accounting, and investment tools.' },
    { icon: <ShoppingCart size={20} />, title: 'Sales', count: '321', desc: 'Sales automation, CRM and lead generation.' },
    { icon: <Headset size={20} />, title: 'Customer Support', count: '298', desc: 'AI agents for support, ticketing and helpdesk.' },
    { icon: <Users size={20} />, title: 'HR & Recruiting', count: '210', desc: 'Hire, manage and empower your workforce.' },
    { icon: <Scale size={20} />, title: 'Legal', count: '165', desc: 'Legal research, contract analysis and compliance.' },
    { icon: <HeartPulse size={20} />, title: 'Healthcare', count: '154', desc: 'Healthcare, medical research and patient care tools.' },
    { icon: <ShieldCheck size={20} />, title: 'Security', count: '143', desc: 'Cybersecurity, threat detection and privacy tools.' },
    { icon: <Gamepad2 size={20} />, title: 'Entertainment', count: '132', desc: 'AI for gaming, movies, music and fun.' },
    { icon: <PenTool size={20} />, title: 'Content Creation', count: '1,208', desc: 'Write, edit, generate and optimize content.' },
    { icon: <Home size={20} />, title: 'Real Estate', count: '98', desc: 'Property search, analysis and investment tools.' },
    { icon: <MoreHorizontal size={20} />, title: 'Others', count: '799', desc: 'Explore other amazing AI agents and tools.' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-24 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <div className="text-sm font-medium text-slate-400 mb-2">Home {'>'} Categories</div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              AI Agent <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Categories</span>
            </h1>
            <p className="text-slate-400 mt-3 max-w-2xl">
              Explore 100+ categories and discover 10,000+ AI agents and tools for every use case. Find, compare and deploy the perfect agent for your needs.
            </p>
          </div>
          
          <div className="flex gap-4">
             <div className="text-center px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl">
               <div className="text-xl font-bold text-white">100+</div>
               <div className="text-xs text-slate-400">Categories</div>
             </div>
             <div className="text-center px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl">
               <div className="text-xl font-bold text-white">10,000+</div>
               <div className="text-xs text-slate-400">AI Agents</div>
             </div>
             <div className="text-center px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl hidden sm:block">
               <div className="text-xl font-bold text-white">100%</div>
               <div className="text-xs text-slate-400">Verified</div>
             </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-12 max-w-3xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search categories, e.g. 'Productivity', 'Data Analysis', 'Customer Support'..." 
            className="w-full pl-12 pr-32 py-4 rounded-xl bg-slate-800/60 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors">
            Search
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-white">Filter By</h3>
                <button className="text-xs text-indigo-400 hover:text-indigo-300">Clear All</button>
              </div>
              
              {/* Pricing Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-slate-400 mb-3">Pricing</h4>
                <div className="space-y-2">
                  {['Free', 'Freemium', 'Paid', 'Subscription', 'One-time Payment'].map(f => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 rounded bg-slate-800 border border-slate-600 group-hover:border-indigo-400 flex items-center justify-center"></div>
                      <span className="text-sm text-slate-300 group-hover:text-white">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Built In Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-slate-400 mb-3">Built In</h4>
                <div className="space-y-2">
                  {['India', 'USA', 'Europe', 'Others'].map(f => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 rounded bg-slate-800 border border-slate-600 group-hover:border-indigo-400 flex items-center justify-center"></div>
                      <span className="text-sm text-slate-300 group-hover:text-white">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Verified Filter */}
              <div>
                <h4 className="text-sm font-medium text-slate-400 mb-3">Verified</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-4 h-4 rounded bg-indigo-600 border border-indigo-500 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-sm"></div>
                    </div>
                    <span className="text-sm text-white">Verified & Trusted</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Request Category CTA */}
            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-xl p-5 text-center">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Cpu className="text-indigo-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Can't find the right category?</h4>
              <p className="text-xs text-slate-400 mb-4">Request a new category and help us grow.</p>
              <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-sm text-white transition-colors">
                Request Category
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">All Categories</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-400">View as:</span>
                <div className="flex bg-slate-800 p-1 rounded-lg">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    <Grid size={16} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {categories.map((cat, i) => (
                <div key={i} className="flex flex-col p-5 bg-slate-900/40 border border-slate-800 rounded-xl hover:border-slate-600 hover:bg-slate-800/40 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      i % 3 === 0 ? 'bg-blue-500/10 text-blue-400' : 
                      i % 3 === 1 ? 'bg-purple-500/10 text-purple-400' : 
                      'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {cat.icon}
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-slate-800 rounded-md text-slate-300">{cat.count} Agents</span>
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">{cat.title}</h3>
                  <p className="text-sm text-slate-400 mb-6 flex-grow">{cat.desc}</p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-slate-800/60 mt-auto">
                    <div className="flex -space-x-2">
                       {/* Mock avatars for popular tools in this category */}
                       {[1,2,3].map(j => (
                         <div key={j} className="w-6 h-6 rounded-full bg-slate-700 border border-slate-800"></div>
                       ))}
                    </div>
                    <span className="text-xs font-medium text-indigo-400 flex items-center group-hover:text-indigo-300">
                      View Agents <ArrowRight size={14} className="ml-1" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 to-indigo-900/30 border border-indigo-500/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl mix-blend-screen" />
           
           <div className="relative z-10 md:w-1/2">
             <h3 className="text-2xl font-bold text-white mb-2">Can't decide which category?</h3>
             <p className="text-slate-300 mb-6">Answer a few questions and we'll recommend the perfect AI agents for you.</p>
             <button className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-slate-100 transition-colors">
               Get Recommendations
             </button>
           </div>
           
           <div className="relative z-10 md:w-1/2 flex justify-end gap-4 text-center">
             <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-2">
                   <Star className="text-indigo-400" />
                </div>
                <div className="text-sm font-semibold text-white">Personalized</div>
             </div>
             <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-2">
                   <Cpu className="text-indigo-400" />
                </div>
                <div className="text-sm font-semibold text-white">Smart Matching</div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
