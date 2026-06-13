import React, { useState } from 'react';
import { topicalClusters, getAuthorityPageMetadata, isTopicalAuthoritySlug } from '../data/topicalAuthority';
import {
  Network,
  Map,
  Layers,
  Award,
  Scale,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Check,
  ShieldCheck,
  Table,
  Search,
  ExternalLink
} from 'lucide-react';

interface TopicalAuthorityMapProps {
  onSelectArticle: (slug: string) => void;
  onBack?: () => void;
}

export default function TopicalAuthorityMap({ onSelectArticle, onBack }: TopicalAuthorityMapProps) {
  const [activeClusterId, setActiveClusterId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'Mega' | 'Commercial' | 'Supporting'>('all');

  // Top 10 Pages Most Likely to Rank Fastest
  const rapidRankFastest = [
    { slug: "best-ai-agent-course", reason: "High curriculum demand with very low specialized competition in India" },
    { slug: "best-ai-voice-agent", reason: "Exploding telephony interest after sub-second latency updates" },
    { slug: "best-ai-agent-for-research", reason: "Deep scientific/citation tools are searched daily by academics" },
    { slug: "best-ai-agent-for-customer-support", reason: "Extreme commercial search intent for cost reductions" },
    { slug: "best-ai-agent-for-crm", reason: "Sales directors searching to link WhatsApp with HubSpot/Zoho" },
    { slug: "best-ai-agent-workflow-builder", reason: "SMEs replacing manual chains with autonomous tools" },
    { slug: "best-open-source-ai-agent-tools", reason: "Developers trying to bypass proprietary subscription caps" },
    { slug: "best-ai-agent-for-vs-code", reason: "Massive active developer base seeking VS Code alternatives" },
    { slug: "best-ai-agent-builder", reason: "No-code business founders looking for drag-and-drop systems" },
    { slug: "best-ai-agent-platform", reason: "Enterprise architects planning regional integrations" }
  ];

  // Filter listings
  const filteredClusters = activeClusterId === 'all'
    ? topicalClusters
    : topicalClusters.filter(c => c.id === activeClusterId);

  // Stats calculation
  const totalArticlesCount = 100;
  const megaCount = 14;
  const commercialCount = 21;
  const supportingCount = 65;

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6">

      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative border border-slate-800">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl space-y-4 relative">
          {onBack && (
            <button
              onClick={onBack}
              className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 focus:outline-none cursor-pointer"
            >
              ← Return Home
            </button>
          )}

          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Map className="w-3.5 h-3.5" /> Topical Authority SEO Protocol
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none font-sans">
            100-Pillar Topical Authority Map
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
            By building a unified entity graph instead of random keywords, BestAIAgent.in establishes verified baseline authority for Google, ChatGPT, Gemini, Claude, and Perplexity crawlers. Our system maps <strong>10 thematic clusters</strong> optimized with GEO/LLM-compliant structures.
          </p>

          {/* CLAW CRAWLER BUTTONS */}
          <div className="flex flex-wrap gap-3 pt-2 text-[11px] font-mono font-bold">
            <a
              href="/llms.txt"
              target="_blank"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition"
            >
              <BookOpen className="w-3.5 h-3.5" /> View /llms.txt (Crawler Index)
            </a>
            <a
              href="/ai-agent-sitemap.xml"
              target="_blank"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition"
            >
              <Layers className="w-3.5 h-3.5 text-blue-400" /> AI-Agent XML Sitemap
            </a>
            <a
              href="/comparison-sitemap.xml"
              target="_blank"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition"
            >
              <Scale className="w-3.5 h-3.5 text-amber-400" /> Comparison XML Sitemap
            </a>
          </div>
        </div>
      </div>

      {/* METRIC GRAPH BOARD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-1">
          <p className="text-slate-400 text-[10px] font-bold uppercase font-mono tracking-wider">Total Cluster Entities</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">100</span>
            <span className="text-xs text-emerald-600 font-bold">100% Covered</span>
          </div>
          <p className="text-slate-500 text-[11px] font-light">Categorized into 10 key domain silos.</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-1 border-l-4 border-l-rose-500">
          <p className="text-slate-400 text-[10px] font-bold uppercase font-mono tracking-wider">1. Mega Pillars</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-rose-600">14</span>
            <span className="text-slate-500 text-xs font-medium">Pages</span>
          </div>
          <p className="text-slate-500 text-[11px] font-light">Deep architecture guides (8k–15k words).</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-1 border-l-4 border-l-blue-500">
          <p className="text-slate-400 text-[10px] font-bold uppercase font-mono tracking-wider">2. Commercial Pillars</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-blue-600">21</span>
            <span className="text-slate-500 text-xs font-medium">Pages</span>
          </div>
          <p className="text-slate-500 text-[11px] font-light">Reviews &amp; listicles (3k–8k words).</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-1 border-l-4 border-l-emerald-500">
          <p className="text-slate-400 text-[10px] font-bold uppercase font-mono tracking-wider">3. Supporting Pages</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600">65</span>
            <span className="text-slate-500 text-xs font-medium">Pages</span>
          </div>
          <p className="text-slate-500 text-[11px] font-light">Targeted tutorials &amp; FAQs (2k–5k words).</p>
        </div>
      </div>

      {/* FASTEST BINGO MATRIX RANKING CARDS */}
      <div className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-500/10 text-emerald-700 rounded-lg">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Top 10 Rapid Rank Candidates</h3>
            <p className="text-slate-500 text-xs font-light">These 10 keyword segments possess the absolute strongest ratio of monthly inquiry volume vs low competitive resistance.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {rapidRankFastest.map((item, index) => {
            const meta = getAuthorityPageMetadata(item.slug);
            if (!meta) return null;
            return (
              <button
                key={item.slug}
                onClick={() => onSelectArticle(item.slug)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectArticle(item.slug);
                  }
                }}
                className="bg-white border border-slate-200/80 hover:border-emerald-400 p-4 rounded-xl hover:shadow-xs transition duration-200 cursor-pointer group flex flex-col justify-between space-y-3 text-left"
                type="button"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
                    <span>CANDIDATE #{index + 1}</span>
                    <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded uppercase">Rank Fast</span>
                  </div>
                  <h4 className="font-extrabold text-xs text-slate-900 group-hover:text-emerald-700 tracking-tight leading-snug truncate capitalize">
                    {meta.primaryKeyword}
                  </h4>
                  <p className="text-slate-500 text-[11px] font-light leading-normal line-clamp-3">
                    {item.reason}
                  </p>
                </div>

                <div className="text-[10px] font-mono font-bold text-emerald-600 flex items-center gap-1 uppercase tracking-wider pt-2 border-t border-slate-50 group-hover:gap-1.5 transition-all">
                  Inspect Pillar <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* FILTER SEARCH WORKSPACE */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-xs">

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-4 border-b border-slate-100">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topical slugs & keywords..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto shrink-0 justify-end overflow-x-auto text-xs font-semibold">
            {/* Type selector */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl py-1.5 px-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer text-slate-700"
            >
              <option value="all">Silo Tiers (All)</option>
              <option value="Mega">Mega Pillars (8k+ words)</option>
              <option value="Commercial">Commercial Pillars (3k+ words)</option>
              <option value="Supporting">Supporting Pages (2k+ words)</option>
            </select>

            <button
              onClick={() => setActiveClusterId('all')}
              className={`px-3 py-1.5 rounded-lg transition ${activeClusterId === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-650 hover:bg-slate-200'}`}
            >
              All Clusters
            </button>
            {topicalClusters.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveClusterId(c.id)}
                className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${activeClusterId === c.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-650 hover:bg-slate-200'}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* CLUSTERS DIVERGENT CONTAINER */}
        <div className="space-y-10 pt-4">
          {filteredClusters.map(cluster => {
            // Find pages inside this cluster matching query
            const matchedPages = cluster.pages.filter(page => {
              const meta = getAuthorityPageMetadata(page.slug);

              const matchesSearch = page.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
                meta?.primaryKeyword?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                meta?.title?.toLowerCase().includes(searchQuery.toLowerCase());

              const matchesType = filterType === 'all' ? true : meta?.type === filterType;

              return matchesSearch && matchesType;
            });

            if (matchedPages.length === 0) return null;

            return (
              <div key={cluster.id} className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-2">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <Network className="w-5 h-5 text-emerald-600 shrink-0" />
                      {cluster.name} Cluster
                    </h3>
                    <p className="text-xs text-slate-500 font-light max-w-2xl">{cluster.description}</p>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded font-mono font-bold uppercase tracking-wider self-start sm:self-center">
                    {matchedPages.length} Entity Slugs Listed
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchedPages.map(pageData => {
                    const page = getAuthorityPageMetadata(pageData.slug);
                    if (!page) return null;

                    let pillColor = "bg-rose-50 text-rose-700 border-rose-100";
                    if (page.type === "Commercial") pillColor = "bg-blue-50 text-blue-700 border-blue-100";
                    if (page.type === "Supporting") pillColor = "bg-emerald-50 text-emerald-700 border-emerald-100";

                    return (
                      <button
                        key={page.slug}
                        onClick={() => onSelectArticle(page.slug)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onSelectArticle(page.slug);
                          }
                        }}
                        className="bg-white border border-slate-150 hover:border-emerald-500 hover:bg-slate-50/50 p-5 rounded-2xl transition duration-150 group cursor-pointer flex flex-col justify-between space-y-4 relative overflow-hidden text-left"
                        type="button"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${pillColor}`}>
                              {page.type} Pillar
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {page.wordCountRange.replace(' words', '')}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <h4 className="font-extrabold text-sm text-slate-950 group-hover:text-emerald-700 tracking-tight leading-snug line-clamp-2">
                              {page.title.split(':')[0]}
                            </h4>
                            <p className="text-slate-400 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                              Slug: <span className="text-slate-650 shrink-0 font-extrabold">/{page.slug}</span>
                            </p>
                          </div>

                          <p className="text-slate-600 text-xs font-light leading-relaxed line-clamp-3">
                            {page.metaDescription}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-bold text-emerald-600 pt-3 border-t border-slate-100 uppercase tracking-widest font-mono">
                          <span>Read Live Authority Pillar</span>
                          <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* INTERACTIVE SEO PROTOCOLS SCHEMA ACCORDION */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">Active GEO &amp; LLM Scraper Specifications</h3>
        </div>
        <p className="text-slate-600 text-xs font-light leading-relaxed">
          Search engine algorithms and LLM crawlers look for rigorous formatting cues. Below are the precise structured entity graphs natively baked into the DOM header nodes of every dynamic pillar page you explore:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
            <p className="font-bold text-slate-800">1. Core Entity Schema</p>
            <p className="text-slate-500 font-light leading-normal text-[11px]">
              Deploying **Organization**, **WebPage**, **Breadcrumb**, and **Review** JSON-LD structures to declare authorship trust.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
            <p className="font-bold text-slate-800">2. Software &amp; Pricing Schema</p>
            <p className="text-slate-500 font-light leading-normal text-[11px]">
              Deploying **SoftwareApplication** and **ItemList** definitions referencing benchmarks, costs in INR, and trial metrics.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
            <p className="font-bold text-slate-800">3. Instruction &amp; FAQ Schema</p>
            <p className="text-slate-500 font-light leading-normal text-[11px]">
              Deploying **HowTo** and **FAQPage** nodes to answer multi-hop conversational prompts instantly inside Google Search Overviews.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
