import React from 'react';
import ProductProfile from '../ProductProfile';
import { products } from '../../data/db';
import { featuredAgents } from '../../data/agents';
import { buildAgentSoftwareSchema, buildBreadcrumbSchema } from '../../../packages/structured-data';

interface Props {
  slug: string;
  onNavigate: (path: string) => void;
  onCompare?: (slug: string) => void;
  isInCompareList?: boolean;
}

export default function AgentEntityPage({ slug, onNavigate, onCompare, isInCompareList = false }: Props) {
  // Find product matching slug
  const product = products.find(p => p.slug === slug || p.id === slug) || products[0];

  const agentEntity = featuredAgents.find(a => a.slug === slug) || {
    id: product.id,
    slug: product.slug,
    name: product.name,
    summary: product.summary,
    primaryCategory: product.category,
    pricing: {
      startingPriceUSD: '$20/mo',
      startingPriceINR: '₹1,680/mo',
      hasFreeTier: true,
      billingModel: 'monthly' as const,
    },
    score: {
      overall: product.overallScore,
      reasoning: 9.5,
      toolUse: 9.4,
      speed: 9.2,
      value: 9.0,
      reliability: 9.5,
      indiaFit: 9.3,
    },
    updatedDate: '2026-07-23',
    publishedDate: '2026-01-15',
    authorId: 'arshdeep-singh',
    reviewerId: 'vikramaditya-roy',
    indexingStatus: 'index' as const,
    dataSourceStatus: 'verified' as const,
    type: 'agent' as const,
    companySlug: 'anthropic',
    frameworkSlugs: ['langgraph'],
    categories: [product.category],
    bestFor: ['Developers', 'SMEs'],
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    websiteUrl: 'https://cursor.com',
    capabilities: ['Code generation', 'Refactoring', 'Workspace indexing'],
    integrations: ['VS Code', 'GitHub', 'Terminal'],
    deploymentOptions: ['Cloud', 'Desktop'],
    mcpServerSupported: true,
    openSource: false,
    builtInIndia: false,
    knownLimitations: ['Requires high memory for full workspace indexing'],
    pros: ['Ultra-fast inline edits', 'Multi-file composer context'],
    cons: ['Pro plan requires subscription'],
  };

  const softwareSchema = buildAgentSoftwareSchema(agentEntity as any);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Agents', url: '/agents/' },
    { name: product.name, url: `/agents/${product.slug}/` },
  ]);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Inject JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([softwareSchema, breadcrumbSchema]) }}
      />

      <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-slate-400 border-b border-slate-800 flex items-center gap-2">
        <button onClick={() => onNavigate('/')} className="hover:text-white">Home</button>
        <span>/</span>
        <button onClick={() => onNavigate('/agents/')} className="hover:text-white">Agents</button>
        <span>/</span>
        <span className="text-slate-200 font-semibold">{product.name}</span>
      </div>

      <ProductProfile
        product={product}
        onBack={() => onNavigate('/agents/')}
        onCompare={onCompare || (() => {})}
        isInCompareList={isInCompareList}
      />
    </div>
  );
}
