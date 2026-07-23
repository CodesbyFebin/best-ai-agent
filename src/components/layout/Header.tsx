import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  Code2, 
  Cpu, 
  Building2, 
  DollarSign, 
  BookOpen, 
  Users, 
  PlusCircle, 
  Rss,
  Network
} from 'lucide-react';
import { siteConfig } from '../../data/site';

interface HeaderProps {
  currentView?: string;
  onNavigate: (view: string, siloId?: string, slug?: string) => void;
  onOpenSearch?: () => void;
  onOpenRss?: () => void;
  onOpenPseoRepo?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenRss,
  onOpenPseoRepo
}) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMoreOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-lg p-1"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-violet-900/30 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-lg text-white tracking-tight">BestAIAgent</span>
                  <span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded border border-violet-500/20">.in</span>
                </div>
                <span className="text-[10px] text-slate-400 hidden sm:inline-block font-medium -mt-1">Independent Discovery & Benchmarks</span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-lg transition cursor-pointer ${
                currentView === 'home'
                  ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              AI Agents
            </button>

            <button
              onClick={() => onNavigate('silo-pillar', 'reviews')}
              className={`px-3 py-2 rounded-lg transition cursor-pointer ${
                currentView === 'silo-pillar'
                  ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              Categories
            </button>

            <button
              onClick={() => onNavigate('compare')}
              className={`px-3 py-2 rounded-lg transition cursor-pointer ${
                currentView === 'compare'
                  ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              Compare
            </button>

            <button
              onClick={() => onNavigate('knowledge-graph')}
              className={`px-3 py-2 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                currentView === 'knowledge-graph'
                  ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-cyan-400" />
              <span>Benchmarks & Graph</span>
            </button>

            <button
              onClick={() => onNavigate('silo-pillar', 'research')}
              className={`px-3 py-2 rounded-lg transition cursor-pointer ${
                currentView === 'research'
                  ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              Research
            </button>

            {/* More Dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition flex items-center gap-1 cursor-pointer"
                aria-expanded={isMoreOpen}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMoreOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 text-xs">
                  <button
                    onClick={() => { onNavigate('silo-pillar', 'frameworks'); setIsMoreOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-left transition cursor-pointer"
                  >
                    <Code2 className="w-4 h-4 text-indigo-400" />
                    <div>
                      <div className="font-semibold text-slate-200">Frameworks</div>
                      <div className="text-[10px] text-slate-400">CrewAI, AutoGen, LangGraph</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { onNavigate('silo-pillar', 'mcp'); setIsMoreOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-left transition cursor-pointer"
                  >
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="font-semibold text-slate-200">MCP Servers</div>
                      <div className="text-[10px] text-slate-400">Model Context Protocol tools</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { onNavigate('silo-pillar', 'builders'); setIsMoreOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-left transition cursor-pointer"
                  >
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-semibold text-slate-200">AI Companies</div>
                      <div className="text-[10px] text-slate-400">OpenAI, Anthropic, Ola Krutrim</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { onNavigate('methodology'); setIsMoreOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-left transition cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-violet-400" />
                    <div>
                      <div className="font-semibold text-slate-200">Methodology</div>
                      <div className="text-[10px] text-slate-400">Transparent 7-dimension scoring</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { onNavigate('authors'); setIsMoreOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-left transition cursor-pointer"
                  >
                    <Users className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="font-semibold text-slate-200">Review Team</div>
                      <div className="text-[10px] text-slate-400">Engineers & AI researchers</div>
                    </div>
                  </button>

                  <div className="my-1 border-t border-slate-800" />

                  {onOpenPseoRepo && (
                    <button
                      onClick={() => { onOpenPseoRepo(); setIsMoreOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-cyan-400 hover:bg-cyan-500/10 text-left transition cursor-pointer font-semibold"
                    >
                      <Network className="w-4 h-4 text-cyan-400" />
                      <span>PSEO Repository Architecture</span>
                    </button>
                  )}

                  {onOpenRss && (
                    <button
                      onClick={() => { onOpenRss(); setIsMoreOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-amber-400 hover:bg-amber-500/10 text-left transition cursor-pointer font-semibold"
                    >
                      <Rss className="w-4 h-4 text-amber-400" />
                      <span>RSS & Data Feeds</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition cursor-pointer flex items-center gap-2 text-xs border border-slate-800/60"
              title="Search AI agents..."
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden md:inline text-slate-400">Search agents...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-slate-900 border border-slate-800 rounded text-slate-500">⌘K</kbd>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-violet-900/20 transition cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Find My Agent</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-900 transition"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-4 space-y-2 text-sm">
          <button
            onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-900 font-medium"
          >
            AI Agents Directory
          </button>
          <button
            onClick={() => { onNavigate('silo-pillar', 'reviews'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-900 font-medium"
          >
            Categories Hub
          </button>
          <button
            onClick={() => { onNavigate('compare'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-900 font-medium"
          >
            Comparison Matrix
          </button>
          <button
            onClick={() => { onNavigate('knowledge-graph'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-cyan-300 hover:bg-slate-900 font-medium flex items-center gap-2"
          >
            <Network className="w-4 h-4 text-cyan-400" />
            <span>Semantic Knowledge Graph</span>
          </button>
          <button
            onClick={() => { onNavigate('methodology'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-900 font-medium"
          >
            Testing Methodology
          </button>
          <button
            onClick={() => { onNavigate('authors'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-900 font-medium"
          >
            Editorial Team
          </button>
          
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            {onOpenPseoRepo && (
              <button
                onClick={() => { onOpenPseoRepo(); setIsMobileMenuOpen(false); }}
                className="w-full text-center py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold text-xs"
              >
                PSEO Repo Architecture
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
