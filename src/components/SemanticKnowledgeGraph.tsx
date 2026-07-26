import React, { useState } from 'react';
import { 
  Network, 
  Search, 
  Layers, 
  ExternalLink, 
  Copy, 
  Check, 
  Globe, 
  Cpu, 
  Sparkles, 
  BarChart2, 
  ShieldCheck, 
  FileText, 
  ArrowRight,
  Database,
  Terminal,
  Share2
} from 'lucide-react';
import { 
  alsoAskedClusters, 
  semanticEntitiesList, 
  highIntentClusters, 
  recommendedPseoUrls,
  primarySeedKeyword 
} from '../data/semanticClusters';

interface SemanticKnowledgeGraphProps {
  onNavigateToUrl?: (path: string) => void;
  onOpenPseoRepo?: () => void;
}

export default function SemanticKnowledgeGraph({ onNavigateToUrl, onOpenPseoRepo }: SemanticKnowledgeGraphProps) {
  const [activeTab, setActiveTab] = useState<'clusters' | 'entities' | 'highintent' | 'urls'>('clusters');
  const [selectedClusterId, setSelectedClusterId] = useState<string>('cluster-1');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const selectedCluster = alsoAskedClusters.find(c => c.id === selectedClusterId) || alsoAskedClusters[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const filteredEntities = semanticEntitiesList.filter(e => 
    e.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    e.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
    e.type.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100 my-8">
      {/* Top Banner / Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2 border border-cyan-500/20">
            <Network className="w-3.5 h-3.5" />
            AlsoAsked & GEO Semantic Knowledge Graph
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            AI Agent Entity & Keyword Matrix
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Mapped from live search intent, entity relationships, and Answer Engine (AEO/GEO) citation models for <span className="text-cyan-400 font-mono font-semibold">"{primarySeedKeyword}"</span>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPseoRepo}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-cyan-950/50"
          >
            <Terminal className="w-4 h-4" />
            Inspect PSEO Repo Blueprint
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 mt-6 pb-2 border-b border-slate-800/80">
        <button
          onClick={() => setActiveTab('clusters')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
            activeTab === 'clusters'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Search className="w-4 h-4" />
          AlsoAsked Intent Clusters ({alsoAskedClusters.length})
        </button>

        <button
          onClick={() => setActiveTab('entities')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
            activeTab === 'entities'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Database className="w-4 h-4" />
          Semantic Entity Graph ({semanticEntitiesList.length})
        </button>

        <button
          onClick={() => setActiveTab('highintent')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
            activeTab === 'highintent'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          High-Intent Topic Matrix ({highIntentClusters.length})
        </button>

        <button
          onClick={() => setActiveTab('urls')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
            activeTab === 'urls'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Globe className="w-4 h-4" />
          PSEO URL Architecture ({recommendedPseoUrls.length})
        </button>
      </div>

      {/* TAB 1: ALSOASKED CLUSTERS */}
      {activeTab === 'clusters' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Cluster List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Primary Parent Clusters
            </h3>
            {alsoAskedClusters.map((cluster) => (
              <div
                key={cluster.id}
                onClick={() => setSelectedClusterId(cluster.id)}
                className={`p-4 rounded-xl cursor-pointer border transition ${
                  selectedClusterId === cluster.id
                    ? 'bg-cyan-950/40 border-cyan-500/50 text-white shadow-md'
                    : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
                    {cluster.intent}
                  </span>
                  <span className="text-[11px] text-slate-400">{cluster.searchVolume}</span>
                </div>
                <h4 className="text-sm font-bold mt-2 text-white">{cluster.parentTopic}</h4>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">{cluster.description}</p>
                <div className="text-[11px] text-cyan-400 mt-2 font-medium flex items-center gap-1">
                  {cluster.childKeywords.length} Child Questions <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>

          {/* Detailed MindMap View */}
          <div className="lg:col-span-7 bg-slate-950/60 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs text-cyan-400 font-mono font-medium">PARENT TOPIC</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{selectedCluster.parentTopic}</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {selectedCluster.searchVolume}
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-3">{selectedCluster.description}</p>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-6 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Expanded AlsoAsked Child Keywords (AEO Citation Targets)
            </h4>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-2">
              {selectedCluster.childKeywords.map((kw, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 p-3 rounded-lg text-xs transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 text-[10px] flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    <span className="text-slate-200 font-medium">{kw}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(kw)}
                    className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300"
                    title="Copy keyword"
                  >
                    {copiedUrl === kw ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SEMANTIC ENTITIES */}
      {activeTab === 'entities' && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter entities (e.g., OpenAI, Claude, Framework)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <span className="text-xs text-slate-400">
              Showing {filteredEntities.length} of {semanticEntitiesList.length} entities
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEntities.map((entity, idx) => (
              <div
                key={idx}
                className="bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 p-4 rounded-xl transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
                    {entity.type}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">/entity/{entity.slug}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{entity.name}</h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{entity.description}</p>
                {onNavigateToUrl && (
                  <button
                    onClick={() => onNavigateToUrl(`/agents/${entity.slug}/`)}
                    className="mt-3 text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                  >
                    View PSEO Review Entity <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: HIGH INTENT TOPIC MATRIX */}
      {activeTab === 'highintent' && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {highIntentClusters.map((cluster, i) => (
            <div key={i} className="bg-slate-950/60 border border-slate-800 p-5 rounded-xl">
              <h3 className="text-sm font-bold text-cyan-300 pb-2 border-b border-slate-800 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                {cluster.category}
              </h3>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {cluster.topics.map((topic, j) => (
                  <div
                    key={j}
                    className="bg-slate-900 border border-slate-800/80 p-2.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:border-cyan-500/40 transition flex items-center justify-between"
                  >
                    <span>{topic}</span>
                    <button
                      onClick={() => handleCopy(topic)}
                      className="text-slate-500 hover:text-cyan-300"
                    >
                      {copiedUrl === topic ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: RECOMMENDED PSEO URLS */}
      {activeTab === 'urls' && (
        <div className="mt-6 space-y-3">
          <div className="p-3 bg-cyan-950/30 border border-cyan-500/20 rounded-lg text-xs text-cyan-200">
            <strong>Clean Canonical URL Pattern:</strong> <code>/[type]/[slug]/</code> (e.g. <code>/agents/cursor/</code>, <code>/compare/chatgpt-vs-claude/</code>) provides flat 2-directory deep hierarchy for Google crawl efficiency and LLM entity mapping.
          </div>

          <div className="space-y-2">
            {recommendedPseoUrls.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 p-3.5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 transition"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
                      {item.type}
                    </span>
                    <span className="text-xs font-bold text-white">{item.entity}</span>
                  </div>
                  <p className="text-xs text-slate-400">{item.description}</p>
                  <code className="text-[11px] text-cyan-300 font-mono mt-1 block">{item.path}</code>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy(`https://bestaiagent.in${item.path}`)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1.5"
                  >
                    {copiedUrl === `https://bestaiagent.in${item.path}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Link
                      </>
                    )}
                  </button>

                  {onNavigateToUrl && (
                    <button
                      onClick={() => onNavigateToUrl(item.path)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-medium text-white flex items-center gap-1"
                    >
                      Visit Route <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
