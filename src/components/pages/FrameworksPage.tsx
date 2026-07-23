import React from 'react';
import { Cpu, ArrowUpRight, Github, ExternalLink, Code } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const frameworksList = [
  { slug: 'langgraph', name: 'LangGraph', author: 'LangChain', language: 'Python / TypeScript', stars: '18.4k', description: 'Stateful, multi-actor orchestration framework for building resilient agent workflows with cycles and human-in-the-loop.' },
  { slug: 'crewai', name: 'CrewAI', author: 'CrewAI', language: 'Python', stars: '24.1k', description: 'Cutting-edge framework for orchestrating role-playing autonomous AI agents to collaborate seamlessly on complex tasks.' },
  { slug: 'autogen', name: 'Microsoft AutoGen', author: 'Microsoft', language: 'Python / C#', stars: '32.5k', description: 'Multi-agent conversation framework enabling multi-agent collaboration and tool-use event loops.' },
  { slug: 'flowise', name: 'Flowise AI', author: 'FlowiseAI', language: 'Node.js / React', stars: '29.2k', description: 'Drag-and-drop visual node UI for building LLM flows, RAG pipelines, and agent tools without writing code.' },
  { slug: 'dify', name: 'Dify', author: 'Dify.ai', language: 'Python / Next.js', stars: '45.1k', description: 'Open-source LLM app development platform combining AI workflow, RAG pipeline, and agent management.' },
];

export default function FrameworksPage({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold uppercase">
            <Code className="w-3.5 h-3.5" /> AI Agent Frameworks & SDK Registry
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            Top Open Source Agent Frameworks
          </h1>
          <p className="text-slate-400 text-base md:text-lg">
            Evaluate leading orchestration libraries, SDKs, and visual workflow builders for constructing production multi-agent systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {frameworksList.map(fw => (
            <div key={fw.slug} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-indigo-500/50 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{fw.name}</h3>
                  <div className="text-xs text-slate-400">By {fw.author} • {fw.language}</div>
                </div>
                <div className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-amber-400 flex items-center gap-1">
                  <Github className="w-3.5 h-3.5" /> {fw.stars} stars
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{fw.description}</p>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">License: MIT / Apache 2.0</span>
                <button
                  onClick={() => onNavigate(`/agents/${fw.slug}/`)}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                >
                  View Framework Specs <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
