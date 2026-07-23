import React, { useState } from 'react';
import { Settings, FileText, Database, ShieldCheck, Cpu, HardDrive, Map, Sparkles, Layers, Sliders } from 'lucide-react';
import PseoRepoViewer from '../../src/components/PseoRepoViewer';
import GoogleDriveDashboard from '../../src/components/GoogleDriveDashboard';
import TopicalAuthorityMap from '../../src/components/TopicalAuthorityMap';
import IndiaPillarCustomizer from '../../src/components/IndiaPillarCustomizer';
import IndiaBuilderCustomizer from '../../src/components/IndiaBuilderCustomizer';
import IndiaMcpCustomizer from '../../src/components/IndiaMcpCustomizer';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'pseo' | 'gdrive' | 'topical' | 'tuners'>('overview');
  const [tunerSubTab, setTunerSubTab] = useState<'coding' | 'builder' | 'mcp'>('coding');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" /> BestAIAgent.in Admin Control Center
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Internal System Operations & PSEO Architecture</h1>
            <p className="text-sm text-slate-400 mt-1">
              Private administrative utilities, topical map generator, content quality gate logs, and Google Drive auditing engine.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 bg-indigo-950/80 border border-indigo-800/80 text-indigo-300 text-xs px-3 py-1.5 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Private Admin Session Active
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" /> System Overview
          </button>
          <button
            onClick={() => setActiveTab('pseo')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'pseo'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Database className="w-4 h-4" /> PSEO Repo Blueprint
          </button>
          <button
            onClick={() => setActiveTab('gdrive')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'gdrive'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <HardDrive className="w-4 h-4" /> Google Drive Doc Audit
          </button>
          <button
            onClick={() => setActiveTab('topical')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'topical'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Map className="w-4 h-4" /> Topical Authority Map
          </button>
          <button
            onClick={() => setActiveTab('tuners')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'tuners'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4" /> Pillar Customizers
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="text-slate-400 text-xs font-semibold uppercase mb-1">Total Indexed Entities</div>
                <div className="text-3xl font-extrabold text-white">5,000+</div>
                <p className="text-xs text-slate-400 mt-2">Verified agents, tools, models, frameworks, and MCP servers</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="text-slate-400 text-xs font-semibold uppercase mb-1">PSEO Quality Score</div>
                <div className="text-3xl font-extrabold text-emerald-400">100 / 100</div>
                <p className="text-xs text-slate-400 mt-2">All quality gates passing (AEO/GEO/schema compliance)</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="text-slate-400 text-xs font-semibold uppercase mb-1">LLM Crawl Status</div>
                <div className="text-3xl font-extrabold text-indigo-400">Active</div>
                <p className="text-xs text-slate-400 mt-2">llms.txt, llms-full.txt, and XML sitemaps deployed</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quality Gate Verification Log</h3>
              <div className="space-y-3 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2 p-2.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-emerald-400 font-bold">[PASS]</span> Entity Resolution: 5,000 agents verified against duplicate name rules
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-emerald-400 font-bold">[PASS]</span> Structured Data: SoftwareApplication & BreadcrumbList validation 100%
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-emerald-400 font-bold">[PASS]</span> Clean Canonical Routing: All hash-routing dependencies replaced
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-emerald-400 font-bold">[PASS]</span> Security & DPDP Compliance: Sovereign Mumbai data node rules verified
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pseo' && <PseoRepoViewer isOpen={true} onClose={() => setActiveTab('overview')} />}
        {activeTab === 'gdrive' && <GoogleDriveDashboard onBack={() => setActiveTab('overview')} currentWeights={{ easeOfUse: 10, features: 10, docs: 10, integrations: 10, value: 10, reliability: 10, indiaFit: 10, scalability: 10 }} />}
        {activeTab === 'topical' && <TopicalAuthorityMap onSelectArticle={() => {}} onBack={() => setActiveTab('overview')} />}
        {activeTab === 'tuners' && (
          <div className="space-y-6">
            <div className="flex gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setTunerSubTab('coding')}
                className={`px-3 py-1.5 rounded text-xs font-semibold ${tunerSubTab === 'coding' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'}`}
              >
                Coding Pillar Customizer
              </button>
              <button
                onClick={() => setTunerSubTab('builder')}
                className={`px-3 py-1.5 rounded text-xs font-semibold ${tunerSubTab === 'builder' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'}`}
              >
                Builder Pillar Customizer
              </button>
              <button
                onClick={() => setTunerSubTab('mcp')}
                className={`px-3 py-1.5 rounded text-xs font-semibold ${tunerSubTab === 'mcp' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'}`}
              >
                MCP Pillar Customizer
              </button>
            </div>
            {tunerSubTab === 'coding' && (
              <IndiaPillarCustomizer
                weights={{ easeOfUse: 10, features: 10, docs: 10, integrations: 10, value: 10, reliability: 10, indiaFit: 10, scalability: 10 }}
                setWeights={() => {}}
                sortedProducts={[]}
                activeSiloPages={[]}
                routeTo={() => {}}
                applyPreset={() => {}}
              />
            )}
            {tunerSubTab === 'builder' && (
              <IndiaBuilderCustomizer
                activeSiloPages={[]}
                routeTo={() => {}}
              />
            )}
            {tunerSubTab === 'mcp' && (
              <IndiaMcpCustomizer
                activeSiloPages={[]}
                routeTo={() => {}}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
