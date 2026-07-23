import React, { useState } from 'react';
import { Rss, Copy, Check, Download, ExternalLink, X, Code, Newspaper } from 'lucide-react';
import { generateRssFeedXml } from '../utils/rss-feed-generator';

interface RssFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RssFeedModal({ isOpen, onClose }: RssFeedModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'xml'>('preview');
  
  if (!isOpen) return null;

  const feedXml = generateRssFeedXml();
  const feedUrl = "https://bestaiagent.in/rss.xml";

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(feedUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadXml = () => {
    const blob = new Blob([feedXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'feed.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Rss className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                BestAIAgent.in RSS Feed Endpoint
              </h2>
              <p className="text-xs text-slate-400">Track latest AI agent reviews, benchmarks &amp; comparison releases in feed readers</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feed Endpoint Bar */}
        <div className="p-4 bg-slate-950/70 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300 font-mono overflow-x-auto py-1">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold uppercase text-[10px]">RSS 2.0</span>
            <span className="text-slate-400">{feedUrl}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyUrl}
              className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Feed URL!' : 'Copy Feed Link'}</span>
            </button>
            <button
              onClick={handleDownloadXml}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download feed.xml</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-6 py-3 border-b-2 transition flex items-center gap-2 ${activeTab === 'preview' ? 'border-amber-400 text-amber-400 bg-slate-800/40' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <Newspaper className="w-4 h-4" /> Live Feed Items
          </button>
          <button
            onClick={() => setActiveTab('xml')}
            className={`px-6 py-3 border-b-2 transition flex items-center gap-2 ${activeTab === 'xml' ? 'border-amber-400 text-amber-400 bg-slate-800/40' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <Code className="w-4 h-4" /> Raw XML Source
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'preview' ? (
            <div className="space-y-4 text-xs text-slate-300">
              <p className="text-slate-400">
                Subscribe to <strong className="text-slate-200">https://bestaiagent.in/feed.xml</strong> in Feedly, NetNewsWire, Readwise, or custom LLM ingestion pipelines:
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-amber-400 font-bold">
                    <span>Cursor AI Deep-Dive Review &amp; Benchmark Score</span>
                    <span className="text-[10px] text-slate-500">June 11, 2026</span>
                  </div>
                  <p className="text-slate-400">SWE-bench verified multi-file AI code editor evaluation, India pricing analysis, and .cursorrules guide.</p>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-amber-400 font-bold">
                    <span>Vapi AI Voice Stream Benchmark Evaluation</span>
                    <span className="text-[10px] text-slate-500">June 11, 2026</span>
                  </div>
                  <p className="text-slate-400">420ms latency speech loop pipeline with Hinglish vernacular accent support for Indian enterprise sales.</p>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-amber-400 font-bold">
                    <span>Yellow.ai Omnichannel WhatsApp &amp; UPI Support</span>
                    <span className="text-[10px] text-slate-500">June 10, 2026</span>
                  </div>
                  <p className="text-slate-400">DPDP Act 2023 compliant customer support and automated invoicing in 12+ Indian languages.</p>
                </div>
              </div>
            </div>
          ) : (
            <pre className="p-4 bg-slate-950 text-emerald-400 text-xs font-mono rounded-2xl overflow-x-auto leading-relaxed border border-slate-800">
              {feedXml}
            </pre>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition">
            Close Feed Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
