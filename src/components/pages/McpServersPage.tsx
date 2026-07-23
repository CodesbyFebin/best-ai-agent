import React from 'react';
import { Cpu, Network, ArrowUpRight, CheckCircle, ShieldCheck } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const mcpServersList = [
  { slug: 'github-mcp', name: 'GitHub MCP Server', category: 'Developer Tools', author: 'Anthropic Official', description: 'Model Context Protocol server enabling AI agents to query issues, inspect pull requests, and commit code directly.' },
  { slug: 'postgres-mcp', name: 'PostgreSQL MCP Server', category: 'Database & Storage', author: 'Community Verified', description: 'Safely execute read/write queries and inspect database schemas with built-in connection pool rate limiting.' },
  { slug: 'google-drive-mcp', name: 'Google Drive MCP Server', category: 'Document Search', author: 'Official Integrator', description: 'Deep semantic search across Docs, Sheets, and Slides for real-time document grounding in agent memory.' },
  { slug: 'slack-mcp', name: 'Slack MCP Server', category: 'Communication', author: 'Anthropic Official', description: 'Enable agents to post updates, monitor channels, and draft thread responses automatically.' },
  { slug: 'puppeteer-mcp', name: 'Puppeteer Browser MCP', category: 'Web Scraping & Automation', author: 'Puppeteer Core', description: 'Headless browser automation giving agents real-time web navigation, screenshotting, and DOM extraction capabilities.' },
];

export default function McpServersPage({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold uppercase">
            <Network className="w-3.5 h-3.5" /> Model Context Protocol (MCP) Hub
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            1,000+ Verified MCP Server Directory
          </h1>
          <p className="text-slate-400 text-base md:text-lg">
            Connect your AI agents to external databases, APIs, file systems, and SaaS tools using Anthropic's open Model Context Protocol.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mcpServersList.map(server => (
            <div key={server.slug} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-indigo-500/50 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300">
                    {server.category}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{server.name}</h3>
                <div className="text-xs text-slate-400">Maintained by {server.author}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{server.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-indigo-400 font-semibold">
                <span>Inspect Config & Usage</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
