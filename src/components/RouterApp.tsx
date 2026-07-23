import React, { useState, useEffect } from 'react';
import App from '../App';
import AdminDashboard from '../../apps/admin/AdminDashboard';
import AgentsDirectoryPage from './pages/AgentsDirectoryPage';
import AgentEntityPage from './pages/AgentEntityPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryHubPage from './pages/CategoryHubPage';
import RankingsPage from './pages/RankingsPage';
import ComparePage from './pages/ComparePage';
import FrameworksPage from './pages/FrameworksPage';
import McpServersPage from './pages/McpServersPage';
import PricingPage from './pages/PricingPage';
import ResearchPage from './pages/ResearchPage';
import AuthorsPage from './pages/AuthorsPage';
import SitemapHtmlPage from './pages/SitemapHtmlPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { MethodologyPage, EditorialPolicyPage, ScoringSystemPage } from './EditorialPages';
import ProgrammaticFooter from './layout/ProgrammaticFooter';
import { resolveRoute } from '../routing/routeResolver';
import { Menu, X, Search, ShieldCheck } from 'lucide-react';

export default function RouterApp() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Resolve Route via Central Routing Engine
  const resolution = resolveRoute(currentPath);

  // Client-side auto-redirection for legacy URLs
  if (resolution.kind === 'redirect') {
    useEffect(() => {
      navigate(resolution.destination);
    }, [resolution.destination]);
    return null;
  }

  const normalized = currentPath.toLowerCase().replace(/\/+$/, '') || '/';

  // Admin route (Protected & Isolated)
  if (normalized === '/admin' || normalized.startsWith('/admin/')) {
    return <AdminDashboard />;
  }

  // Home Route
  if (normalized === '/') {
    return <App />;
  }

  // Master Authority Hub Routes
  if (normalized === '/best-ai-agent') {
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <CategoryHubPage slug="reviews" onNavigate={navigate} />
      </LayoutWrapper>
    );
  }

  if (normalized === '/best-ai-agent-for-business') {
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <CategoryHubPage slug="business" onNavigate={navigate} />
      </LayoutWrapper>
    );
  }

  if (normalized === '/best-ai-agent-for-coding') {
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <CategoryHubPage slug="coding-agents" onNavigate={navigate} />
      </LayoutWrapper>
    );
  }

  if (normalized === '/best-ai-agent-alternatives' || normalized === '/alternatives') {
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <CategoryHubPage slug="alternatives" onNavigate={navigate} />
      </LayoutWrapper>
    );
  }

  if (normalized === '/best-ai-agents-for-automation') {
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <CategoryHubPage slug="automation" onNavigate={navigate} />
      </LayoutWrapper>
    );
  }

  if (normalized === '/best-ai-agent-frameworks' || normalized === '/mcp-directory' || normalized === '/mcp-servers') {
    if (normalized.includes('mcp')) {
      return (
        <LayoutWrapper navigate={navigate} currentPath={normalized}>
          <McpServersPage onNavigate={navigate} />
        </LayoutWrapper>
      );
    }
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <FrameworksPage onNavigate={navigate} />
      </LayoutWrapper>
    );
  }

  if (normalized === '/reviews') {
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <AgentsDirectoryPage onNavigate={navigate} />
      </LayoutWrapper>
    );
  }

  // Clean Agents Directory & Entity routes (/agents & /agents/[slug])
  if (normalized === '/agents') {
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <AgentsDirectoryPage onNavigate={navigate} />
      </LayoutWrapper>
    );
  }

  if (normalized.startsWith('/agents/')) {
    const slug = normalized.replace('/agents/', '');
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <AgentEntityPage slug={slug} onNavigate={navigate} />
      </LayoutWrapper>
    );
  }

  // Clean Categories routes (/categories & /categories/[slug])
  if (normalized === '/categories') {
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <CategoriesPage onNavigate={navigate} />
      </LayoutWrapper>
    );
  }

  if (normalized.startsWith('/categories/')) {
    const slug = normalized.replace('/categories/', '');
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <CategoryHubPage slug={slug} onNavigate={navigate} />
      </LayoutWrapper>
    );
  }

  // Clean Rankings routes
  if (normalized === '/rankings' || normalized.startsWith('/rankings/')) {
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <RankingsPage onNavigate={navigate} />
      </LayoutWrapper>
    );
  }

  // Clean Compare routes (/compare & /compare/[slug])
  if (normalized === '/compare') {
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <ComparePage onNavigate={navigate} />
      </LayoutWrapper>
    );
  }

  if (normalized.startsWith('/compare/')) {
    const pairSlug = normalized.replace('/compare/', '');
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <ComparePage pairSlug={pairSlug} onNavigate={navigate} />
      </LayoutWrapper>
    );
  }

  // Frameworks route
  if (normalized === '/frameworks' || normalized.startsWith('/frameworks/')) {
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <FrameworksPage onNavigate={navigate} />
      </LayoutWrapper>
    );
  }

  // MCP Servers route (/mcp/servers/[slug])
  if (normalized.startsWith('/mcp/servers/')) {
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <McpServersPage onNavigate={navigate} />
      </LayoutWrapper>
    );
  }

  // Pricing route
  if (normalized === '/pricing' || normalized.startsWith('/pricing/')) {
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <PricingPage onNavigate={navigate} />
      </LayoutWrapper>
    );
  }

  // Research route (/research & /research/[slug])
  if (normalized === '/research' || normalized.startsWith('/research/')) {
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <ResearchPage onNavigate={navigate} />
      </LayoutWrapper>
    );
  }

  // Authors route (/authors & /authors/[slug])
  if (normalized === '/authors' || normalized.startsWith('/authors/') || normalized.startsWith('/author/')) {
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <AuthorsPage onNavigate={navigate} />
      </LayoutWrapper>
    );
  }

  // Governance & Methodology routes
  if (normalized === '/methodology' || normalized === '/review-process') {
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <div className="max-w-5xl mx-auto px-4 py-12">
          <MethodologyPage />
        </div>
      </LayoutWrapper>
    );
  }

  if (normalized === '/editorial-policy' || normalized === '/corrections') {
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <div className="max-w-5xl mx-auto px-4 py-12">
          <EditorialPolicyPage />
        </div>
      </LayoutWrapper>
    );
  }

  if (normalized === '/scoring-system' || normalized === '/ai-agent-scoring-system') {
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <div className="max-w-5xl mx-auto px-4 py-12">
          <ScoringSystemPage />
        </div>
      </LayoutWrapper>
    );
  }

  // HTML Sitemap route
  if (normalized === '/sitemap' || normalized === '/sitemap.html') {
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <SitemapHtmlPage onNavigate={navigate} />
      </LayoutWrapper>
    );
  }

  // If resolution returned not-found, display NotFoundPage (HTTP 404 UI)
  if (resolution.kind === 'not-found') {
    return (
      <LayoutWrapper navigate={navigate} currentPath={normalized}>
        <NotFoundPage onNavigate={navigate} currentPath={normalized} />
      </LayoutWrapper>
    );
  }

  // Default Fallback
  return <App />;
}

function LayoutWrapper({ children, navigate, currentPath }: { children: React.ReactNode; navigate: (path: string) => void; currentPath: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { name: 'AI Agents', path: '/agents' },
    { name: 'Categories', path: '/categories' },
    { name: 'Rankings', path: '/rankings' },
    { name: 'Compare', path: '/compare' },
    { name: 'Frameworks', path: '/frameworks' },
    { name: 'MCP Servers', path: '/mcp-servers' },
    { name: 'Pricing (₹)', path: '/pricing' },
    { name: 'Research', path: '/research' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-slate-300 text-[11px] py-1.5 px-4 text-center border-b border-indigo-900/50 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 font-semibold text-indigo-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> BestAIAgent.in 2026 Authority Registry
        </span>
        <span className="hidden sm:inline text-slate-500">•</span>
        <span className="hidden sm:inline text-slate-400">Independent Benchmark & India Pricing Index</span>
      </div>

      {/* Global Header */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="flex items-center gap-2.5 text-left focus:outline-none group">
              <span className="flex items-center justify-center w-9 h-9 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 text-white rounded-xl shadow-lg font-black text-base group-hover:scale-105 transition-transform">AI</span>
              <div>
                <h1 className="text-xl font-extrabold text-white tracking-tight leading-none">Best<span className="text-indigo-400">AIAgent</span>.in</h1>
                <p className="text-[9px] text-slate-400 font-bold tracking-widest uppercase mt-0.5">Discover • Compare • Deploy</p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
            {navItems.map(item => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    active
                      ? 'bg-indigo-950/80 text-indigo-300 font-bold border border-indigo-800/60'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => navigate('/agents')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md hover:shadow-indigo-500/20 inline-flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" /> Find My Agent
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
            {navItems.map(item => (
              <button
                key={item.path}
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate(item.path);
                }}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-900 hover:text-indigo-400 transition"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/agents');
                }}
                className="w-full text-center px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm"
              >
                Find My Agent
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content View */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Global Footer */}
      <ProgrammaticFooter onNavigate={navigate} />
    </div>
  );
}
