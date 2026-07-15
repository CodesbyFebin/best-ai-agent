import React from 'react';
import { 
  Cloud, 
  DollarSign, 
  BarChart, 
  Globe, 
  CreditCard,
  ShieldCheck,
  Server,
  Zap,
  Lock,
  ArrowRight,
  CheckCircle,
  Star,
  MessageSquare,
  Mail,
  FileText,
  Table,
  Code
} from 'lucide-react';

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-24 pt-32">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 mb-20">
        <div className="lg:w-1/2 space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/40 border border-indigo-500/30 text-sm font-medium text-indigo-300">
            <span>🇮🇳</span> India's #1 AI Agent Marketplace
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Claim. Host. Sell.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              The Future is Agentic.
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-xl">
            Provide readymade AI agents. We host them. You earn. 
            Users discover, try and buy the best agents made in India.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors shadow-lg shadow-indigo-500/20">
              Claim Your Agent
            </button>
            <button className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold transition-colors">
              Explore Marketplace
            </button>
          </div>

          <div className="flex gap-8 text-sm pt-4 border-t border-slate-800/60">
             <div>
                <div className="font-bold text-white text-xl">10,000+</div>
                <div className="text-slate-400">AI Agents</div>
             </div>
             <div>
                <div className="font-bold text-white text-xl">2,500+</div>
                <div className="text-slate-400">Creators</div>
             </div>
             <div>
                <div className="font-bold text-white text-xl">100%</div>
                <div className="text-slate-400">Made in India</div>
             </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative z-10 w-full aspect-square max-w-lg mx-auto">
          {/* Abstract marketplace diagram */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl mix-blend-screen" />
          <div className="relative w-full h-full flex items-center justify-center">
             <div className="absolute top-10 left-10 p-4 bg-slate-900/80 border border-slate-700 rounded-2xl max-w-[160px] text-xs">
                <div className="text-indigo-400 font-bold mb-1">Provide Agent</div>
                <div className="text-slate-400">You build amazing AI agents</div>
             </div>
             <div className="absolute top-20 right-10 p-4 bg-slate-900/80 border border-slate-700 rounded-2xl max-w-[160px] text-xs">
                <div className="text-blue-400 font-bold mb-1">We Host It</div>
                <div className="text-slate-400">We handle infra, security & scaling</div>
             </div>
             <div className="absolute bottom-20 left-1/4 p-4 bg-slate-900/80 border border-slate-700 rounded-2xl max-w-[180px] text-xs">
                <div className="text-emerald-400 font-bold mb-1">Users Buy & Use</div>
                <div className="text-slate-400">You earn, users get powerful agents</div>
             </div>
             
             {/* Central Hub */}
             <div className="w-48 h-48 rounded-full border border-indigo-500/30 bg-slate-900/50 backdrop-blur-md flex items-center justify-center relative">
                <div className="w-32 h-32 rounded-full border border-indigo-500/50 flex items-center justify-center">
                   <Server className="w-12 h-12 text-indigo-400" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Feature Ribbon */}
      <section className="border-y border-slate-800/60 bg-slate-900/30 backdrop-blur-sm py-8 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 text-center divide-x divide-slate-800">
          <div className="flex flex-col items-center">
            <CheckCircle className="text-indigo-400 mb-2" />
            <div className="text-sm font-semibold text-white">Submit for Free</div>
            <div className="text-xs text-slate-400 mt-1">List your agent for free and reach millions</div>
          </div>
          <div className="flex flex-col items-center">
            <Cloud className="text-indigo-400 mb-2" />
            <div className="text-sm font-semibold text-white">We Host & Manage</div>
            <div className="text-xs text-slate-400 mt-1">Enterprise grade hosting, monitoring & security</div>
          </div>
          <div className="flex flex-col items-center">
            <DollarSign className="text-indigo-400 mb-2" />
            <div className="text-sm font-semibold text-white">Earn Revenue</div>
            <div className="text-xs text-slate-400 mt-1">Get paid when users buy your agent</div>
          </div>
          <div className="flex flex-col items-center">
            <BarChart className="text-indigo-400 mb-2" />
            <div className="text-sm font-semibold text-white">Grow Your Brand</div>
            <div className="text-xs text-slate-400 mt-1">Build your reputation in the AI ecosystem</div>
          </div>
          <div className="flex flex-col items-center">
            <Globe className="text-indigo-400 mb-2" />
            <div className="text-sm font-semibold text-white">100% Made in India</div>
            <div className="text-xs text-slate-400 mt-1">Proudly supporting Indian builders & innovation</div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-4 max-w-5xl mx-auto text-center mb-20">
        <h2 className="text-3xl font-bold text-white mb-2">How It Works</h2>
        <p className="text-slate-400 mb-12">Three simple steps to publish and earn</p>
        
        <div className="flex flex-col md:flex-row justify-between relative">
           <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0 z-0"></div>
           
           <div className="flex flex-col items-center relative z-10 bg-[#020617] px-4 mb-8 md:mb-0 w-full md:w-1/3">
              <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xl font-bold text-indigo-400 mb-4 shadow-lg shadow-indigo-900/20">
                1
              </div>
              <h3 className="text-white font-semibold mb-2">Claim Your Agent</h3>
              <p className="text-sm text-slate-400 max-w-[200px]">Submit your agent details, uploads, pricing and screenshots.</p>
           </div>
           
           <div className="flex flex-col items-center relative z-10 bg-[#020617] px-4 mb-8 md:mb-0 w-full md:w-1/3">
              <div className="w-20 h-20 rounded-full bg-indigo-900/50 border border-indigo-500 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
                <Cloud className="text-white w-8 h-8" />
              </div>
              <h3 className="text-white font-semibold mb-2">We Host & Verify</h3>
              <p className="text-sm text-slate-400 max-w-[200px]">We review, host and make your agent secure, fast and reliable.</p>
           </div>
           
           <div className="flex flex-col items-center relative z-10 bg-[#020617] px-4 w-full md:w-1/3">
              <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xl font-bold text-emerald-400 mb-4 shadow-lg shadow-emerald-900/20">
                3
              </div>
              <h3 className="text-white font-semibold mb-2">Users Buy & You Earn</h3>
              <p className="text-sm text-slate-400 max-w-[200px]">Users discover, buy and use your agent. You earn recurring revenue.</p>
           </div>
        </div>
      </section>

      {/* Agents Carousel / Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
         <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">AI Agent Marketplace</h2>
            <p className="text-slate-400">Explore top performing agents built in India</p>
         </div>
         
         <div className="flex gap-4 overflow-x-auto pb-4 mb-6 scrollbar-hide text-sm">
            {['Featured', 'Productivity', 'Development', 'Business', 'Marketing', 'Data & Analytics', 'Education', 'More'].map((tab, i) => (
              <button key={tab} className={`px-4 py-2 rounded-full whitespace-nowrap ${i === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                {tab}
              </button>
            ))}
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* WhatsApp AI */}
            <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 relative">
               <div className="absolute top-0 right-4 -translate-y-1/2 px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">Bestseller</div>
               <div className="w-12 h-12 bg-green-500/20 rounded-xl mb-4 flex items-center justify-center text-green-400 border border-green-500/30">
                 <MessageSquare />
               </div>
               <h3 className="font-bold text-white mb-1">WhatsApp AI Assistant</h3>
               <p className="text-xs text-slate-400 mb-3">By BotCraft India</p>
               <p className="text-sm text-slate-300 mb-4 line-clamp-2">Automate WhatsApp replies, lead capturing, and CRM sync effortlessly.</p>
               <div className="flex gap-2 mb-4">
                  <span className="text-[10px] px-2 py-1 bg-slate-700/50 rounded-md">Support</span>
                  <span className="text-[10px] px-2 py-1 bg-slate-700/50 rounded-md">Automation</span>
               </div>
               <div className="flex justify-between items-center text-sm pt-4 border-t border-slate-700/50">
                 <div>
                    <span className="text-white font-bold">Free</span> <span className="text-slate-400 text-xs">(Basic)</span>
                 </div>
                 <div className="text-white font-bold">₹499/mo <span className="text-slate-400 text-xs font-normal">Pro</span></div>
               </div>
            </div>
            
            {/* Gmail AI */}
            <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 relative">
               <div className="absolute top-0 right-4 -translate-y-1/2 px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">Popular</div>
               <div className="w-12 h-12 bg-red-500/20 rounded-xl mb-4 flex items-center justify-center text-red-400 border border-red-500/30">
                 <Mail />
               </div>
               <h3 className="font-bold text-white mb-1">Gmail AI Agent</h3>
               <p className="text-xs text-slate-400 mb-3">By MailGenius</p>
               <p className="text-sm text-slate-300 mb-4 line-clamp-2">Smart email management, auto replies, and summarization right in your inbox.</p>
               <div className="flex gap-2 mb-4">
                  <span className="text-[10px] px-2 py-1 bg-slate-700/50 rounded-md">Productivity</span>
                  <span className="text-[10px] px-2 py-1 bg-slate-700/50 rounded-md">Email</span>
               </div>
               <div className="flex justify-between items-center text-sm pt-4 border-t border-slate-700/50">
                 <div>
                    <span className="text-white font-bold">Free</span> <span className="text-slate-400 text-xs">(Basic)</span>
                 </div>
                 <div className="text-white font-bold">₹399/mo <span className="text-slate-400 text-xs font-normal">Pro</span></div>
               </div>
            </div>
            
            {/* Notion AI */}
            <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 relative">
               <div className="absolute top-0 right-4 -translate-y-1/2 px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">Trending</div>
               <div className="w-12 h-12 bg-slate-700 rounded-xl mb-4 flex items-center justify-center text-white border border-slate-600">
                 <FileText />
               </div>
               <h3 className="font-bold text-white mb-1">Notion Workspace AI</h3>
               <p className="text-xs text-slate-400 mb-3">By NetGen Apps</p>
               <p className="text-sm text-slate-300 mb-4 line-clamp-2">Search, summarize and manage Notion pages using natural language.</p>
               <div className="flex gap-2 mb-4">
                  <span className="text-[10px] px-2 py-1 bg-slate-700/50 rounded-md">Productivity</span>
                  <span className="text-[10px] px-2 py-1 bg-slate-700/50 rounded-md">Knowledge</span>
               </div>
               <div className="flex justify-between items-center text-sm pt-4 border-t border-slate-700/50">
                 <div>
                    <span className="text-white font-bold">Free</span> <span className="text-slate-400 text-xs">(Basic)</span>
                 </div>
                 <div className="text-white font-bold">₹599/mo <span className="text-slate-400 text-xs font-normal">Pro</span></div>
               </div>
            </div>
            
            {/* Excel AI */}
            <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 relative">
               <div className="absolute top-0 right-4 -translate-y-1/2 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">New</div>
               <div className="w-12 h-12 bg-emerald-500/20 rounded-xl mb-4 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                 <Table />
               </div>
               <h3 className="font-bold text-white mb-1">Excel AI Analyst</h3>
               <p className="text-xs text-slate-400 mb-3">By SheetMaster</p>
               <p className="text-sm text-slate-300 mb-4 line-clamp-2">Analyze, visualize and generate insights from your data instantly.</p>
               <div className="flex gap-2 mb-4">
                  <span className="text-[10px] px-2 py-1 bg-slate-700/50 rounded-md">Data</span>
                  <span className="text-[10px] px-2 py-1 bg-slate-700/50 rounded-md">Analysis</span>
               </div>
               <div className="flex justify-between items-center text-sm pt-4 border-t border-slate-700/50">
                 <div>
                    <span className="text-white font-bold">Free</span> <span className="text-slate-400 text-xs">(Basic)</span>
                 </div>
                 <div className="text-white font-bold">₹599/mo <span className="text-slate-400 text-xs font-normal">Pro</span></div>
               </div>
            </div>
         </div>
      </section>

      {/* Pricing & Benefits */}
      <section className="py-16 px-4 max-w-7xl mx-auto mb-20">
         <h2 className="text-2xl font-bold text-white mb-8">Top Benefits for Creators</h2>
         
         <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
               <Server className="text-indigo-400 mb-2" size={24}/>
               <h4 className="font-semibold text-white text-sm">Zero Hosting Cost</h4>
               <p className="text-xs text-slate-400">We host, scale and secure your agent</p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
               <DollarSign className="text-indigo-400 mb-2" size={24}/>
               <h4 className="font-semibold text-white text-sm">Recurring Revenue</h4>
               <p className="text-xs text-slate-400">Earn monthly from subscriptions</p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
               <BarChart className="text-indigo-400 mb-2" size={24}/>
               <h4 className="font-semibold text-white text-sm">Analytics Dashboard</h4>
               <p className="text-xs text-slate-400">Track users, revenue and performance</p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
               <Globe className="text-indigo-400 mb-2" size={24}/>
               <h4 className="font-semibold text-white text-sm">Global Reach</h4>
               <p className="text-xs text-slate-400">Reach thousands of users globally</p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
               <CreditCard className="text-indigo-400 mb-2" size={24}/>
               <h4 className="font-semibold text-white text-sm">Easy Payouts</h4>
               <p className="text-xs text-slate-400">Withdraw earnings directly to bank</p>
            </div>
         </div>

         {/* Pricing Cards */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col">
               <h3 className="text-xl font-semibold text-white mb-2">Basic</h3>
               <div className="text-3xl font-bold text-white mb-1">Free</div>
               <p className="text-sm text-slate-400 mb-6">Perfect for trying out agents</p>
               <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center text-sm text-slate-300"><CheckCircle size={16} className="text-indigo-400 mr-2" /> Limited Usage</li>
                  <li className="flex items-center text-sm text-slate-300"><CheckCircle size={16} className="text-indigo-400 mr-2" /> Access to Free Agents</li>
                  <li className="flex items-center text-sm text-slate-300"><CheckCircle size={16} className="text-indigo-400 mr-2" /> Basic Features</li>
                  <li className="flex items-center text-sm text-slate-300"><CheckCircle size={16} className="text-indigo-400 mr-2" /> Community Support</li>
               </ul>
               <button className="w-full py-3 rounded-xl border border-slate-600 hover:bg-slate-800 text-white font-semibold transition-colors">Get Started Free</button>
            </div>
            
            <div className="p-8 rounded-2xl bg-indigo-900/20 border-2 border-indigo-500 relative flex flex-col transform md:-translate-y-4">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full">Most Popular</div>
               <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
               <div className="text-3xl font-bold text-white mb-1">₹499 <span className="text-sm text-slate-400 font-normal">/month</span></div>
               <p className="text-sm text-slate-400 mb-6">Unlimited access, premium features</p>
               <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center text-sm text-white"><CheckCircle size={16} className="text-indigo-400 mr-2" /> Unlimited Usage</li>
                  <li className="flex items-center text-sm text-white"><CheckCircle size={16} className="text-indigo-400 mr-2" /> Access to Premium Agents</li>
                  <li className="flex items-center text-sm text-white"><CheckCircle size={16} className="text-indigo-400 mr-2" /> Advanced Features</li>
                  <li className="flex items-center text-sm text-white"><CheckCircle size={16} className="text-indigo-400 mr-2" /> Priority Support</li>
                  <li className="flex items-center text-sm text-white"><CheckCircle size={16} className="text-indigo-400 mr-2" /> Early Access to New Agents</li>
               </ul>
               <button className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors shadow-lg shadow-indigo-500/20">Go Pro</button>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col">
               <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
               <div className="text-3xl font-bold text-white mb-1">Custom</div>
               <p className="text-sm text-slate-400 mb-6">For teams and organizations</p>
               <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center text-sm text-slate-300"><CheckCircle size={16} className="text-indigo-400 mr-2" /> Everything in Pro</li>
                  <li className="flex items-center text-sm text-slate-300"><CheckCircle size={16} className="text-indigo-400 mr-2" /> Team Collaboration</li>
                  <li className="flex items-center text-sm text-slate-300"><CheckCircle size={16} className="text-indigo-400 mr-2" /> SSO & Advanced Security</li>
                  <li className="flex items-center text-sm text-slate-300"><CheckCircle size={16} className="text-indigo-400 mr-2" /> Custom Integrations</li>
                  <li className="flex items-center text-sm text-slate-300"><CheckCircle size={16} className="text-indigo-400 mr-2" /> Dedicated Support</li>
               </ul>
               <button className="w-full py-3 rounded-xl border border-slate-600 hover:bg-slate-800 text-white font-semibold transition-colors">Contact Sales</button>
            </div>
         </div>
      </section>

      {/* Infrastructure */}
      <section className="py-16 px-4 max-w-7xl mx-auto mb-10">
         <div className="flex flex-col md:flex-row gap-12 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 lg:p-12">
            <div className="md:w-1/3">
               <h2 className="text-3xl font-bold text-white mb-4">Hosted & Secure by BestAIAgent</h2>
               <p className="text-slate-400">We take care of everything so you can focus on building amazing agents.</p>
            </div>
            <div className="md:w-2/3 grid grid-cols-2 gap-8">
               <div>
                  <Zap className="text-indigo-400 mb-2" />
                  <h4 className="font-semibold text-white mb-1">99.9% Uptime</h4>
                  <p className="text-sm text-slate-400">Reliable & always online</p>
               </div>
               <div>
                  <ShieldCheck className="text-indigo-400 mb-2" />
                  <h4 className="font-semibold text-white mb-1">Enterprise Security</h4>
                  <p className="text-sm text-slate-400">Data encrypted & protected</p>
               </div>
               <div>
                  <Server className="text-indigo-400 mb-2" />
                  <h4 className="font-semibold text-white mb-1">Auto Scaling</h4>
                  <p className="text-sm text-slate-400">Handles millions of requests</p>
               </div>
               <div>
                  <Globe className="text-indigo-400 mb-2" />
                  <h4 className="font-semibold text-white mb-1">Global CDN</h4>
                  <p className="text-sm text-slate-400">Super fast worldwide</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
