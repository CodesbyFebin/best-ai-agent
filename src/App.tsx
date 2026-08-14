import React, { useMemo } from 'react';
import Homepage from './components/home/Homepage';
import Footer from './components/layout/Footer';
import PricingPage from './components/pages/PricingPage';
import ComparePage from './components/pages/ComparePage';
import ProductProfile from './components/ProductProfile';
import PriorityPillarPage, { type PriorityPillarSlug } from './components/pillars/PriorityPillarPages';
import { MethodologyPage } from './components/EditorialPages';
import { products } from './data/db';
import type { RouteRecord } from './routing/routeRegistry.js';

const PRIORITY_PILLARS = new Set<PriorityPillarSlug>([
  'best-ai-agent',
  'best-ai-agent-for-business',
  'best-ai-agent-for-coding',
  'best-ai-agent-alternatives',
  'best-ai-agents-for-automation'
]);

function getPriorityPillar(path?: string): PriorityPillarSlug | null {
  const clean = (path || '').replace(/\/$/, '').replace(/^\/?/, '');
  return PRIORITY_PILLARS.has(clean as PriorityPillarSlug) ? clean as PriorityPillarSlug : null;
}

function ProductProfileView({ slug, navigate }: { slug: string; navigate: (path: string) => void }) {
  const product = useMemo(() => {
    const aliases: Record<string, string> = {
      cursor: 'cursor-ai',
      'cursor-ai': 'cursor-ai',
      claude: 'claude-ai',
      'claude-ai': 'claude-ai'
    };
    const resolved = aliases[slug] || slug;
    return products.find((item) => item.slug === resolved || item.id === resolved);
  }, [slug]);

  if (!product) return <NotFound title="Agent not found" detail={`No canonical agent entity exists for “${slug}”.`} />;

  return <ProductProfile product={product} onBack={() => navigate('/agents')} onCompare={() => navigate('/compare')} isInCompareList={false} agentSlug={product.slug} />;
}

function NotFound({ title, detail }: { title: string; detail: string }) {
  return (
    <main className="min-h-[70vh] bg-slate-950 px-6 py-20 text-slate-100">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">404</p>
        <h1 className="mt-3 text-4xl font-black">{title}</h1>
        <p className="mt-4 text-slate-400">{detail}</p>
      </div>
    </main>
  );
}

export default function App({ route, navigate }: { route: RouteRecord | null; navigate: (path: string) => void }) {
  const path = route?.path || '/';
  const pillar = getPriorityPillar(path);

  if (pillar) return <><PriorityPillarPage slug={pillar} onNavigate={navigate} /><Footer /></>;

  if (path === '/') {
    return <><Homepage currentView="home" onNavigate={(view, siloId, _articleSlug, productSlug) => {
      if (view === 'silo-pillar' && siloId) {
        const map: Record<string, string> = {
          business: '/best-ai-agent-for-business',
          'coding-agents': '/best-ai-agent-for-coding',
          alternatives: '/best-ai-agent-alternatives',
          automation: '/best-ai-agents-for-automation',
          frameworks: '/best-ai-agent-frameworks',
          mcp: '/mcp-directory'
        };
        navigate(map[siloId] || '/categories');
        return;
      }
      if (view === 'product' && productSlug) return navigate(`/agents/${productSlug}`);
      if (view === 'compare') return navigate('/compare');
      if (view === 'methodology') return navigate('/methodology');
      navigate('/');
    }} onOpenSearch={() => undefined} onOpenRss={() => navigate('/rss.xml')} onOpenPseoRepo={() => navigate('/sitemap')} /><Footer /></>;
  }

  if (route?.type === 'pricing') return <><PricingPage onNavigate={navigate} /><Footer /></>;

  if (route?.type === 'agent') {
    const slug = path.split('/').filter(Boolean).pop() || '';
    return <><ProductProfileView slug={slug} navigate={navigate} /><Footer /></>;
  }

  if (path === '/compare' || path.startsWith('/compare/')) {
    const pairSlug = path.split('/').filter(Boolean)[1];
    return <><ComparePage pairSlug={pairSlug} onNavigate={navigate} /><Footer /></>;
  }

  if (path === '/methodology') {
    return <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6"><MethodologyPage onRoute={(view, _silo, article, product) => { if (view === 'author' && product) navigate(`/authors/${product}`); else if (article) navigate(`/${article}`); else navigate('/'); }} /></main>;
  }

  return <><NotFound title="Page not found" detail="This route is not a published canonical page. Use the directory or return to the homepage." /><Footer /></>;
}
