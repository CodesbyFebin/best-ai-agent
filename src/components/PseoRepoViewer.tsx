import React, { useState } from 'react';
import { 
  X, 
  Folder, 
  FileText, 
  Code, 
  Download, 
  Copy, 
  Check, 
  Terminal, 
  ChevronRight, 
  ChevronDown, 
  FolderOpen,
  Sparkles,
  BookOpen,
  ShieldAlert,
  Server
} from 'lucide-react';
import { pseoRepoStructure, RepoFileNode } from '../data/pseoRepoBlueprint';

interface PseoRepoViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PseoRepoViewer({ isOpen, onClose }: PseoRepoViewerProps) {
  const [selectedNode, setSelectedNode] = useState<RepoFileNode>(pseoRepoStructure.children![0]); // README.md
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'best-ai-agent-pseo/': true,
    'best-ai-agent-pseo/docs/': true,
    'best-ai-agent-pseo/generators/': true,
  });
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderTree = (node: RepoFileNode, level = 0) => {
    const isFolder = node.type === 'folder';
    const isExpanded = expandedFolders[node.path];
    const isSelected = selectedNode.path === node.path;

    return (
      <div key={node.path} style={{ paddingLeft: `${level * 12}px` }}>
        <div
          onClick={() => {
            if (isFolder) {
              toggleFolder(node.path);
            } else {
              setSelectedNode(node);
            }
          }}
          className={`flex items-center gap-2 py-1.5 px-2 rounded-md cursor-pointer text-xs font-mono transition ${
            isSelected
              ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
              : 'text-slate-300 hover:bg-slate-800/60'
          }`}
        >
          {isFolder ? (
            <>
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
              {isExpanded ? (
                <FolderOpen className="w-4 h-4 text-cyan-400" />
              ) : (
                <Folder className="w-4 h-4 text-cyan-400" />
              )}
            </>
          ) : (
            <>
              <span className="w-3.5" />
              {node.name.endsWith('.py') ? (
                <Terminal className="w-4 h-4 text-amber-400" />
              ) : (
                <FileText className="w-4 h-4 text-emerald-400" />
              )}
            </>
          )}
          <span className="truncate">{node.name}</span>
        </div>

        {isFolder && isExpanded && node.children && (
          <div>{node.children.map(child => renderTree(child, level + 1))}</div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-6xl h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                BestAIAgent.in PSEO Repository Architecture
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  v2.4 Production
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                100,000+ Keyword Programmatic Engine, Generators, Schemas & URL Routing Blueprint.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Repository Body Layout */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* File Tree Explorer Column */}
          <div className="md:col-span-4 bg-slate-950/70 border-r border-slate-800 p-4 overflow-y-auto">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2 flex items-center justify-between">
              <span>Repository Tree</span>
              <span className="text-[10px] text-cyan-400 font-mono">best-ai-agent-pseo/</span>
            </h3>
            <div className="space-y-0.5">{renderTree(pseoRepoStructure)}</div>
          </div>

          {/* File Content Preview Column */}
          <div className="md:col-span-8 flex flex-col bg-slate-900/90 overflow-hidden">
            {/* File Path Header */}
            <div className="px-6 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-300 truncate">
                {selectedNode.name.endsWith('.py') ? (
                  <Terminal className="w-4 h-4 text-amber-400" />
                ) : (
                  <FileText className="w-4 h-4 text-emerald-400" />
                )}
                <span>{selectedNode.path}</span>
              </div>

              {selectedNode.codeSnippet && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCode(selectedNode.codeSnippet!)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedCode ? 'Copied' : 'Copy'}
                  </button>

                  <button
                    onClick={() => handleDownloadFile(selectedNode.name, selectedNode.codeSnippet!)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium rounded-lg transition shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              )}
            </div>

            {/* Code / Markdown View Area */}
            <div className="flex-1 p-6 overflow-y-auto bg-slate-950 font-mono text-xs text-slate-200">
              {selectedNode.description && (
                <div className="p-3 mb-4 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-sans text-xs">
                  <strong>Description:</strong> {selectedNode.description}
                </div>
              )}

              {selectedNode.codeSnippet ? (
                <pre className="whitespace-pre-wrap leading-relaxed text-cyan-100 font-mono">
                  {selectedNode.codeSnippet}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 font-sans py-12">
                  <Folder className="w-12 h-12 mb-2 text-slate-700" />
                  <p className="text-sm">Select a file from the repository tree on the left to preview its source code or markdown specification.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <span>Target Deployment: Cloud Run Express Service (Port 3000)</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 100/100 AEO & GEO Ready
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
