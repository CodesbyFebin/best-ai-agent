import React, { useState, useMemo } from 'react';
import {
  Share2,
  Copy,
  Check,
  Server,
  Award,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Terminal,
  ExternalLink,
  Code2,
  Search,
  Database,
  SearchCode,
  ChevronDown,
  ChevronUp,
  Sliders,
  Table,
  Cpu,
  Info
} from 'lucide-react';
import { SiloPage } from '../data/db';

interface IndiaMcpCustomizerProps {
  activeSiloPages: SiloPage[];
  routeTo: (view: string, article?: any, slug?: string) => void;
}

// Model representing MCP Server info in our live hub
interface McpServerRef {
  id: string;
  name: string;
  category: 'Developer tools' | 'Local context' | 'Databases' | 'Web automation' | 'Knowledge and memory' | 'Other';
  hosts: string[];
  securityNote: string;
  officialSource: string;
  useCase: string;
  features: string[];
  githubStars?: string;
  authorName?: string;
}

const INITIAL_MCP_SERVERS_REGISTRY: McpServerRef[] = [
  {
    id: 'github',
    name: 'GitHub MCP Server',
    category: 'Developer tools',
    hosts: ['Claude Desktop', 'Cursor', 'VS Code', 'Custom client'],
    securityNote: 'Use least-privilege personal access tokens and limit repository permissions strictly.',
    officialSource: 'https://github.com/modelcontextprotocol/servers/tree/main/src/github',
    useCase: 'Repository searching, managing issues, tracking pull requests, and multi-file code review telemetry.',
    features: ['Code search inside files', 'Issue tracking & comments', 'Pull requests creation', 'Branch management'],
    githubStars: '22.8k',
    authorName: 'Model Context Protocol (Official)'
  },
  {
    id: 'filesystem',
    name: 'Filesystem MCP Server',
    category: 'Local context',
    hosts: ['Claude Desktop', 'Cursor', 'Windsurf', 'Custom client'],
    securityNote: 'Always confine workspace directories explicitly to prevent arbitrary host drive reads.',
    officialSource: 'https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem',
    useCase: 'Read and write approved local folders and code repositories for real-time prompt generation.',
    features: ['Read directory state', 'Surgically write specific blocks', 'Read file metadata', 'Pattern-based search'],
    githubStars: '22.8k',
    authorName: 'Model Context Protocol (Official)'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL MCP Server',
    category: 'Databases',
    hosts: ['Claude Desktop', 'Cursor Code', 'Custom database agents'],
    securityNote: 'Connect using read-only credentials with strictly audited query logging layers.',
    officialSource: 'https://github.com/modelcontextprotocol/servers/tree/main/src/postgres',
    useCase: 'Query structured schemas, inspect postgres indexes, export tables, and debug active schemas.',
    features: ['Tables schema discovery', 'SQL query validation', 'Auto-generated join planning', 'System parameter listing'],
    githubStars: '22.8k',
    authorName: 'Model Context Protocol (Official)'
  },
  {
    id: 'browser',
    name: 'Browser Automation (Puppeteer)',
    category: 'Web automation',
    hosts: ['Developer agents', 'Scripted testing containers'],
    securityNote: 'Expose ONLY under sandboxed virtual displays; bypass sensitive cookie directories.',
    officialSource: 'https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer',
    useCase: 'Let agentic models click, scroll, scrape, screenshot, and validate dynamic browser pipelines.',
    features: ['Interactive screenshot capture', 'CSS selector parsing', 'Simulated clicks and text inputs', 'DOM content stripping'],
    githubStars: '22.8k',
    authorName: 'Model Context Protocol (Official)'
  },
  {
    id: 'memory',
    name: 'Sequential Memory MCP Server',
    category: 'Knowledge and memory',
    hosts: ['Claude Desktop', 'Cursor IDE', 'Autonomous workflow executors'],
    securityNote: 'Implement standard encryption at rest for sqlite-backed knowledge triples.',
    officialSource: 'https://github.com/modelcontextprotocol/servers/tree/main/src/memory',
    useCase: 'Build permanent knowledge graphs, entity relationships, and conversational memory states.',
    features: ['Entity extraction', 'Attribute metadata modeling', 'Graph relationship storage', 'Semantic retrieval loops'],
    githubStars: '22.8k',
    authorName: 'Model Context Protocol (Official)'
  },
  {
    id: 'brave-search',
    name: 'Brave Search Engine MCP',
    category: 'Web automation',
    hosts: ['Claude Desktop', 'Developer agents'],
    securityNote: 'Requires API key subscription from Brave Developer Portal inside env declarations.',
    officialSource: 'https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search',
    useCase: 'Expose web search capabilities directly to localized model reasoning cycles for up-to-date trend indexing.',
    features: ['Brave web search index API', 'Local business coordinates fetch', 'Real-time news snippets parsing'],
    githubStars: '15.4k',
    authorName: 'Brave Software'
  }
];

export default function IndiaMcpCustomizer({
  activeSiloPages,
  routeTo
}: IndiaMcpCustomizerProps) {
  // Main view state switcher
  const [activeTab, setActiveTab] = useState<'registry' | 'templates' | 'developer-tools' | 'aeo-answer'>('registry');

  // General States
  const [copiedShare, setCopiedShare] = useState(false);
  const [registrySearch, setRegistrySearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Custom State for developers to "Submit Server" interactively
  const [serversList, setServersList] = useState<McpServerRef[]>(INITIAL_MCP_SERVERS_REGISTRY);
  const [submitSubmitting, setSubmitSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [newServer, setNewServer] = useState({
    name: '',
    category: 'Developer tools' as any,
    useCase: '',
    officialSource: '',
    primaryFeature: '',
    securityNote: 'Require explicit user authorization for write endpoints.'
  });

  // Server Reference Configuration Builder states
  const [selectedConfigServer, setSelectedConfigServer] = useState<'filesystem' | 'postgresql' | 'github'>('filesystem');
  const [selectedConfigClient, setSelectedConfigClient] = useState<'claude' | 'cursor'>('claude');
  const [configParams, setConfigParams] = useState({
    allowedDirectories: '["/Users/admin/projects/my-web-app"]',
    postgresConnectionString: 'postgresql://postgres:secret@localhost:5432/mcp_database',
    githubAccessToken: 'github_pat_11AXYZ789...',
    githubRepositories: '["owner/repo-name"]'
  });
  const [copiedConfigBlock, setCopiedConfigBlock] = useState(false);

  // Scheme Validator States
  const [validatorSchema, setValidatorSchema] = useState(`{
  "name": "calculate_gst_invoice",
  "description": "Calculates India GST (18%) and totals for invoices",
  "inputSchema": {
    "type": "object",
    "properties": {
      "baseAmount": { "type": "number", "description": "Base price in INR" },
      "includeCess": { "type": "boolean", "description": "Whether to append custom compensation cess" }
    },
    "required": ["baseAmount"]
  }
}`);
  const [validationResult, setValidationResult] = useState<{
    status: 'idle' | 'success' | 'error';
    message: string;
    errors?: string[];
  }>({ status: 'idle', message: '' });

  // FAQ Expand state
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false,
    3: false
  });

  // Copy Hub URL
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '/mcp-hub').catch(() => {});
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  // Handle Form Submission of custom server
  const handleSubmitServer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServer.name || !newServer.useCase) return;

    setSubmitSubmitting(true);
    
    // Simulate API registering
    setTimeout(() => {
      const added: McpServerRef = {
        id: newServer.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: newServer.name,
        category: newServer.category,
        hosts: ['Claude Desktop', 'Custom client'],
        securityNote: newServer.securityNote,
        officialSource: newServer.officialSource || 'https://github.com/custom-mcp/server',
        useCase: newServer.useCase,
        features: [newServer.primaryFeature || 'Execution telemetry API', 'RPC JSON status checks'],
        githubStars: 'Custom MVP',
        authorName: 'Community Contributor'
      };

      setServersList(prev => [...prev, added]);
      setSubmitSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form variables
      setNewServer({
        name: '',
        category: 'Developer tools',
        useCase: '',
        officialSource: '',
        primaryFeature: '',
        securityNote: 'Require explicit user authorization for write endpoints.'
      });

      setTimeout(() => setSubmitSuccess(false), 4000);
    }, 800);
  };

  // Filtered servers in Registry Explorer
  const filteredServers = useMemo(() => {
    return serversList.filter(srv => {
      const matchesSearch = srv.name.toLowerCase().includes(registrySearch.toLowerCase()) ||
                            srv.useCase.toLowerCase().includes(registrySearch.toLowerCase()) ||
                            srv.features.some(f => f.toLowerCase().includes(registrySearch.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || srv.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [serversList, registrySearch, selectedCategory]);

  // JSON Config block evaluator
  const renderedConfigBlock = useMemo(() => {
    if (selectedConfigClient === 'claude') {
      let serverConfigJson: any = {};
      if (selectedConfigServer === 'filesystem') {
        let parsedDirs = ["/Users/admin/projects/my-web-app"];
        try { parsedDirs = JSON.parse(configParams.allowedDirectories); } catch(e){}
        serverConfigJson = {
          "mcpServers": {
            "filesystem": {
              "command": "npx",
              "args": [
                "-y",
                "@modelcontextprotocol/server-filesystem",
                ...parsedDirs
              ]
            }
          }
        };
      } else if (selectedConfigServer === 'postgresql') {
        serverConfigJson = {
          "mcpServers": {
            "postgres": {
              "command": "npx",
              "args": [
                "-y",
                "@modelcontextprotocol/server-postgres",
                configParams.postgresConnectionString
              ]
            }
          }
        };
      } else {
        let parsedRepos = ["owner/repo-name"];
        try { parsedRepos = JSON.parse(configParams.githubRepositories); } catch(e){}
        serverConfigJson = {
          "mcpServers": {
            "github": {
              "command": "npx",
              "args": ["-y", "@modelcontextprotocol/server-github"],
              "env": {
                "GITHUB_PERSONAL_ACCESS_TOKEN": configParams.githubAccessToken
              }
            }
          }
        };
      }
      return JSON.stringify(serverConfigJson, null, 2);
    } else {
      // Cursor format is slightly different
      if (selectedConfigServer === 'filesystem') {
        return `{
  "command": "node",
  "args": ["/path/to/server-filesystem/dist/index.js", ${configParams.allowedDirectories.replace(/[\[\]]/g, '')}]
}`;
      } else if (selectedConfigServer === 'postgresql') {
        return `{
  "command": "node",
  "args": ["/path/to/server-postgres/dist/index.js", "${configParams.postgresConnectionString}"]
}`;
      } else {
        return `{
  "command": "node",
  "args": ["/path/to/server-github/dist/index.js"],
  "env": {
    "GITHUB_PERSONAL_ACCESS_TOKEN": "${configParams.githubAccessToken}"
  }
}`;
      }
    }
  }, [selectedConfigServer, selectedConfigClient, configParams]);

  // Copy Config Block to clipboard
  const handleCopyConfigBlock = () => {
    navigator.clipboard.writeText(renderedConfigBlock).then(() => {
      setCopiedConfigBlock(true);
      setTimeout(() => setCopiedConfigBlock(false), 2000);
    }).catch(() => {
      setCopiedConfigBlock(false);
    });
  };

  // Schema Validation engine simulation
  const handleValidateSchema = () => {
    try {
      const obj = JSON.parse(validatorSchema);
      if (!obj.name) {
        setValidationResult({
          status: 'error',
          message: 'Validation failed: Missing main identity parameter.',
          errors: ['Parameter "name" is legally required for valid tool initialization.']
        });
        return;
      }
      if (!obj.description || obj.description.length < 10) {
        setValidationResult({
          status: 'error',
          message: 'AEO Schema Warning: Poor description parameter.',
          errors: ['Description should exceed 10 characters to give models adequate context maps.']
        });
        return;
      }
      if (!obj.inputSchema || typeof obj.inputSchema !== 'object') {
        setValidationResult({
          status: 'error',
          message: 'Validation failed: Invalid inputSchema block.',
          errors: ['inputSchema must compile to a standard JSON Schema properties block.']
        });
        return;
      }
      setValidationResult({
        status: 'success',
        message: 'MCP Schema compliant! Tool is ready for registry publication.',
        errors: []
      });
    } catch(err: any) {
      setValidationResult({
        status: 'error',
        message: 'JSON parsing failure.',
        errors: [err.message || 'Malformed brackets or quotes detected.']
      });
    }
  };

  // Comprehensive JSON-LD structured schemas for AEO and SEO crawls
  const seoJsonLd = useMemo(() => {
    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Model Context Protocol (MCP) standard?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Model Context Protocol (MCP) is an open standard designed by Anthropic and supported by leading platforms (like Google and Cursor) that enables AI models to connect securely and dynamically with local resources, files, databases, web tools, and microservice contexts using a structured JSON-RPC protocol."
          }
        },
        {
          "@type": "Question",
          "name": "How do you install or register an MCP server inside Claude?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For Claude Desktop, configure the global configuration file (claude_desktop_config.json) by adding command parameters under the 'mcpServers' object, detailing command, args and localized environment variable flags as needed."
          }
        },
        {
          "@type": "Question",
          "name": "Why are security profiles critical in MCP configurations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Since MCP grant large language models access to local storage directories or relational database systems, developer operators must restrict directories list, configure read-only schemas, and verify credential environments strictly."
          }
        }
      ]
    };

    // DataCatalog Schema for our Registry
    const catalogSchema = {
      "@context": "https://schema.org",
      "@type": "DataCatalog",
      "name": "BestAIAgent MCP Authorized Server Registry Catalog",
      "description": "An open community-reviewed index directory detailing verified Model Context Protocol clients, adapters, and server repositories.",
      "publisher": {
        "@type": "Organization",
        "name": "BestAIAgent.in",
        "url": "https://bestaiagent.in"
      },
      "dataset": serversList.map(srv => ({
        "@type": "Dataset",
        "name": srv.name,
        "description": srv.useCase,
        "license": "https://opensource.org/licenses/MIT",
        "creator": {
          "@type": "Organization",
          "name": srv.authorName || "Model Context Protocol Community"
        }
      }))
    };

    // TechArticle describing Model Context Protocol
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": "Model Context Protocol Authority Hub - Absolute 2026 Developer Blueprint",
      "description": "Standardize local workspace databases, APIs, memory loops, and agent context tunnels through the official Model Context Protocol architecture standard.",
      "author": {
        "@type": "Person",
        "name": "Arshdeep Singh"
      },
      "publisher": {
        "@type": "Organization",
        "name": "BestAIAgent.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://bestaiagent.in/assets/logo.png"
        }
      }
    };

    return [faqSchema, catalogSchema, articleSchema];
  }, [serversList]);

  return (
    <div className="space-y-12">
      
      {/* 1. Header Authority Block */}
      <div className="bg-gradient-to-br from-slate-950 via-teal-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden border border-teal-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="relative space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-[10px] sm:text-xs bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-teal-400" /> MCP Authority Hub v2.6.2
            </span>
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-bold rounded-xl uppercase tracking-wider transition-all flex items-center gap-2"
            >
              {copiedShare ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied Link!
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" /> Share Authority Hub
                </>
              )}
            </button>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-slate-100">
              MCP Authority Hub <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-emerald-300 to-emerald-400">
                Protocol &amp; Server Reference Blueprints
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-4xl font-light leading-relaxed">
              Standardize secure local storage links, container SQL queries, web scraper engines, and agent memory loops through structured Model Context Protocol context exchanges. Optimized strictly for search crawlers and AI answer engines.
            </p>
          </div>

          {/* Quick FAQ Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 mt-4 space-y-2">
            <span className="text-[10px] text-teal-400 uppercase font-bold tracking-wider block">Official Context Definition</span>
            <p className="text-xs sm:text-sm text-slate-200 font-bold leading-relaxed">
              Model Context Protocol (MCP) is an open-source standard enabling LLM applications to coordinate and communicate with external resources, memory databases, APIs, and dev files safely without writing fragile API connector code.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
            <div>• <strong className="text-slate-300">Format:</strong> JSON-RPC 2.0</div>
            <div>• <strong className="text-slate-300">Standard:</strong> Open-Spec (MIT)</div>
            <div>• <strong className="text-slate-300">AEO Compliant:</strong> Yes (100% indexed)</div>
          </div>
        </div>
      </div>

      {/* 2. Anchor Subpage Navigation */}
      <div className="border-b border-slate-200 pb-px">
        <div className="flex flex-wrap gap-2 sm:gap-6 -mb-px">
          <button
            onClick={() => setActiveTab('registry')}
            className={`cursor-pointer pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition ${activeTab === 'registry' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            📋 MCP Registry Explorer
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`cursor-pointer pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition ${activeTab === 'templates' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            ⚙️ Configuration Templates
          </button>
          <button
            onClick={() => setActiveTab('developer-tools')}
            className={`cursor-pointer pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition ${activeTab === 'developer-tools' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            🛠️ Dev Tools &amp; Testing
          </button>
          <button
            onClick={() => setActiveTab('aeo-answer')}
            className={`cursor-pointer pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition ${activeTab === 'aeo-answer' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            🌐 AEO Search Q&amp;A
          </button>
        </div>
      </div>

      {/* 3. Tab Content Viewport */}
      <div>
        
        {/* TAB: REGISTRY EXPLORER */}
        {activeTab === 'registry' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-950 flex items-center gap-2">
                    <Database className="w-5.5 h-5.5 text-teal-600" /> MCP Verified Directory Registry
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-light">
                    Search and inspect leading open-source MCP adapters and server instances verified compatible with local host environments.
                  </p>
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  
                  {/* Category switcher */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-lg text-xs font-semibold text-slate-705 cursor-pointer max-w-[150px]"
                  >
                    <option value="all">🌐 All Categories</option>
                    <option value="developer tools">🛠️ Developer Tools</option>
                    <option value="local context">📂 Local Context</option>
                    <option value="databases">🗄️ Databases</option>
                    <option value="web automation">🕸️ Web Automation</option>
                    <option value="knowledge and memory">🧠 Knowledge &amp; Memory</option>
                  </select>

                  {/* Text search */}
                  <div className="relative flex-1 md:w-64 max-w-xs">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
                    <input
                      type="text"
                      placeholder="Search key features or names..."
                      value={registrySearch}
                      onChange={(e) => setRegistrySearch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 pl-9 pr-3 py-1.5 rounded-lg text-xs font-mono"
                    />
                  </div>

                </div>
              </div>

              {/* Grid of Servers */}
              <div className="grid sm:grid-cols-2 gap-6">
                {filteredServers.length === 0 ? (
                  <div className="sm:col-span-2 text-center py-12 bg-slate-50 border border-dashed rounded-2xl p-6">
                    <Info className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs text-slate-500 font-bold">No registered servers matched your search criteria.</p>
                  </div>
                ) : (
                  filteredServers.map((srv) => (
                    <div key={srv.id} className="border border-slate-200 hover:border-slate-350 focus-within:border-teal-500 rounded-2xl p-5 space-y-4 transition bg-white block relative overflow-hidden group">
                      <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2">
                        <div>
                          <span className="text-[9px] bg-teal-50 text-teal-850 font-black uppercase tracking-wider px-2 py-0.5 rounded border border-teal-100">
                            {srv.category}
                          </span>
                          <h4 className="text-base font-extrabold text-slate-950 mt-1">{srv.name}</h4>
                        </div>
                        {srv.githubStars && (
                          <span className="text-[10px] bg-slate-100/90 text-slate-600 font-mono px-2 py-0.5 rounded font-bold">
                            ★ {srv.githubStars}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 text-xs text-slate-700">
                        <p className="font-semibold leading-relaxed text-slate-605">{srv.useCase}</p>
                        <p className="text-[10px] text-slate-500 font-light flex items-center gap-1">
                          <strong className="text-slate-700 font-semibold">Author:</strong> {srv.authorName || 'Open-source Community'} 
                        </p>

                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Approved Hosts</p>
                          <p className="font-mono text-[10px] text-slate-600 leading-none">{srv.hosts.join(', ')}</p>
                        </div>

                        {srv.securityNote && (
                          <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-100 space-y-1">
                            <p className="text-[9px] font-black text-rose-700 uppercase tracking-widest flex items-center gap-1">
                              <ShieldAlert className="w-3 h-3 text-rose-600" /> Security Advisory
                            </p>
                            <p className="text-[10px] text-rose-900 leading-tight font-medium">{srv.securityNote}</p>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 flex flex-wrap gap-1.5 items-center justify-between border-t border-slate-100">
                        <div className="flex flex-wrap gap-1.5">
                          {srv.features.map((f, i) => (
                            <span key={i} className="text-[9px] bg-slate-100 text-slate-600 py-0.5 px-2 rounded-md font-semibold">
                              {f}
                            </span>
                          ))}
                        </div>
                        <a
                          href={srv.officialSource}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-teal-700 hover:underline flex items-center gap-0.5 whitespace-nowrap"
                        >
                          Source <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>

            {/* Submit Your Server Form Widget */}
            <div className="bg-gradient-to-tr from-slate-900 to-slate-950 text-white border border-slate-850 rounded-3xl p-6 sm:p-8 shadow-md">
              <div className="grid md:grid-cols-5 gap-8 items-start">
                
                <div className="md:col-span-2 space-y-4">
                  <span className="text-[9px] font-black uppercase bg-teal-500/20 text-teal-300 py-1 px-2.5 rounded-md border border-teal-500/30">
                    Community Contributions
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-100">Add Custom Host Server</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    Developing a custom Model Context Protocol capability? Input its primary parameters to preview its telemetry structure and publish it locally inside your dynamic memory map.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                      <span>Generates standard JSON-RPC interface payload.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                      <span>Injects directly into memory schema registers.</span>
                    </li>
                  </ul>
                </div>

                <div className="md:col-span-3 bg-slate-950/50 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
                  
                  {submitSuccess && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold text-center">
                      ✔ Success! MCP registry entry compiled and injected successfully.
                    </div>
                  )}

                  <form onSubmit={handleSubmitServer} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Server Identity Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. SQLite Searcher"
                          className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-xs py-2 px-3 rounded-lg text-slate-100"
                          value={newServer.name}
                          onChange={(e) => setNewServer(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Server Category</label>
                        <select
                          className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 text-xs py-2 px-3 rounded-lg text-slate-100 cursor-pointer"
                          value={newServer.category}
                          onChange={(e) => setNewServer(prev => ({ ...prev, category: e.target.value as any }))}
                        >
                          <option value="Developer tools">🛠️ Developer tools</option>
                          <option value="Local context">📂 Local context</option>
                          <option value="Databases">🗄️ Databases</option>
                          <option value="Web automation">🕸️ Web automation</option>
                          <option value="Knowledge and memory">🧠 Knowledge and memory</option>
                        </select>
                      </div>

                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Core Use Case (Detailed description)</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Exposes SQL query capabilities over localized SQLite storage files."
                        className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 text-xs py-2 px-3 rounded-lg text-slate-100"
                        value={newServer.useCase}
                        onChange={(e) => setNewServer(prev => ({ ...prev, useCase: e.target.value }))}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Primary Feature Token</label>
                        <input
                          type="text"
                          placeholder="e.g. read_schema, run_query"
                          className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 text-xs py-2 px-3 rounded-lg text-slate-100"
                          value={newServer.primaryFeature}
                          onChange={(e) => setNewServer(prev => ({ ...prev, primaryFeature: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Official Source Repository</label>
                        <input
                          type="url"
                          placeholder="https://github.com/my-org/mcp-server"
                          className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 text-xs py-2 px-3 rounded-lg text-slate-100"
                          value={newServer.officialSource}
                          onChange={(e) => setNewServer(prev => ({ ...prev, officialSource: e.target.value }))}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitSubmitting}
                      className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-slate-950 font-black rounded-lg text-xs uppercase tracking-wider transition font-mono shrink-0"
                    >
                      {submitSubmitting ? 'Processing Telemetry...' : 'Add Server and Generate JSON'}
                    </button>
                  </form>

                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB: TEMPLATES CONFIG BUILDER */}
        {activeTab === 'templates' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 animate-fade-in">
            
            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-950">Interactive MCP Server Configuration Blueprint</h3>
              <p className="text-slate-500 text-xs sm:text-sm font-light">
                Configure your host client (Claude Desktop or Cursor) instantly. Select a server type, customize variables, and copy the compliant JSON configuration.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              
              {/* Controls Column */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* 1. Pick Host Client */}
                <div className="space-y-2">
                  <span className="text-[10px] text-teal-650 font-bold uppercase tracking-wider block">1. Selected IDE Host</span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedConfigClient('claude')}
                      className={`p-3 rounded-xl border text-left transition ${selectedConfigClient === 'claude' ? 'border-teal-600 bg-teal-50 text-teal-950 font-bold' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      <p className="text-xs uppercase font-semibold leading-relaxed">Claude Desktop</p>
                      <p className="text-[10px] text-slate-400 font-light font-mono">claude_desktop_config.json</p>
                    </button>
                    <button
                      onClick={() => setSelectedConfigClient('cursor')}
                      className={`p-3 rounded-xl border text-left transition ${selectedConfigClient === 'cursor' ? 'border-teal-600 bg-teal-50 text-teal-950 font-bold' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      <p className="text-xs uppercase font-semibold leading-relaxed">Cursor IDE</p>
                      <p className="text-[10px] text-slate-400 font-light font-mono">Cursor Settings UI</p>
                    </button>
                  </div>
                </div>

                {/* 2. Pick Server type */}
                <div className="space-y-2">
                  <span className="text-[10px] text-teal-650 font-bold uppercase tracking-wider block">2. Select Target Server template</span>
                  <div className="flex flex-col gap-2">
                    {[
                      { id: 'filesystem', label: 'Local Filesystem Server', desc: 'Allows reading and editing of files.' },
                      { id: 'postgresql', label: 'PostgreSQL Database Connection', desc: 'Allows executing audited queries.' },
                      { id: 'github', label: 'GitHub Repository Manager', desc: 'Handles pull requests and tasks.' }
                    ].map((srv) => (
                      <button
                        key={srv.id}
                        onClick={() => setSelectedConfigServer(srv.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${selectedConfigServer === srv.id ? 'border-teal-600 bg-teal-50 text-teal-950 font-bold' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                      >
                        <p className="text-xs">{srv.label}</p>
                        <p className="text-[10px] text-slate-500 font-light mt-0.5">{srv.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Parameters text Inputs */}
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-150">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">3. Configure Key Parameters</span>
                  
                  {selectedConfigServer === 'filesystem' && (
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-600 font-bold">Confined Directories (JSON array)</label>
                      <input
                        type="text"
                        className="w-full bg-white border text-xs font-mono py-1.5 px-3 rounded text-slate-800"
                        value={configParams.allowedDirectories}
                        onChange={(e) => setConfigParams(prev => ({ ...prev, allowedDirectories: e.target.value }))}
                      />
                      <p className="text-[9px] text-slate-450 leading-tight">Must compile to a valid JSON paths directory array.</p>
                    </div>
                  )}

                  {selectedConfigServer === 'postgresql' && (
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-600 font-bold">Standard Connection URL</label>
                      <input
                        type="text"
                        className="w-full bg-white border text-xs font-mono py-1.5 px-3 rounded text-slate-800"
                        value={configParams.postgresConnectionString}
                        onChange={(e) => setConfigParams(prev => ({ ...prev, postgresConnectionString: e.target.value }))}
                      />
                      <p className="text-[9px] text-slate-450 leading-tight">We strongly recommend using read-only credentials inside host connections.</p>
                    </div>
                  )}

                  {selectedConfigServer === 'github' && (
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-600 font-bold">GitHub Account Access Token</label>
                        <input
                          type="password"
                          className="w-full bg-white border text-xs font-mono py-1.5 px-3 rounded text-slate-800"
                          value={configParams.githubAccessToken}
                          onChange={(e) => setConfigParams(prev => ({ ...prev, githubAccessToken: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-600 font-bold">Scope Restrictions (Repos JSON Array)</label>
                        <input
                          type="text"
                          className="w-full bg-white border text-xs font-mono py-1.5 px-3 rounded text-slate-800"
                          value={configParams.githubRepositories}
                          onChange={(e) => setConfigParams(prev => ({ ...prev, githubRepositories: e.target.value }))}
                        />
                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* Code viewer column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between bg-slate-900 text-slate-300 px-4 py-2.5 rounded-t-xl font-mono text-xs border-b border-slate-800">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Terminal className="w-3.5 h-3.5 text-teal-400" />
                    {selectedConfigClient === 'claude' ? 'claude_desktop_config.json' : 'mcp-cli-definition.json'}
                  </span>
                  <button
                    onClick={handleCopyConfigBlock}
                    className="flex items-center gap-1 text-[10px] bg-slate-800 hover:bg-slate-700 uppercase tracking-widest text-slate-100 py-1 px-2.5 rounded transition"
                  >
                    {copiedConfigBlock ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedConfigBlock ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <pre className="bg-slate-950 text-emerald-400 p-5 rounded-b-xl overflow-x-auto text-xs font-mono leading-relaxed border border-slate-900 border-t-0 max-h-[350px] select-all">
                  <code>{renderedConfigBlock}</code>
                </pre>

                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-2 text-xs text-slate-600 font-medium">
                  <p className="font-bold text-slate-950 flex items-center gap-1">
                    <Sliders className="w-4 h-4 text-teal-600" /> Setup Location Instructions:
                  </p>
                  
                  {selectedConfigClient === 'claude' ? (
                    <ul className="list-disc pl-5 space-y-1 font-light leading-relaxed">
                      <li><strong>MacOS:</strong> Save inside <code className="bg-slate-150 py-0.5 px-1 rounded text-red-650 font-mono text-[10px]">~/Library/Application\ Support/Claude/claude_desktop_config.json</code></li>
                      <li><strong>Windows:</strong> Save inside <code className="bg-slate-150 py-0.5 px-1 rounded text-red-650 font-mono text-[10px]">%APPDATA%\Claude\claude_desktop_config.json</code></li>
                      <li><strong>Next step:</strong> Completely restart the Claude Desktop Application to load newly registered endpoints.</li>
                    </ul>
                  ) : (
                    <ul className="list-disc pl-5 space-y-1 font-light leading-relaxed">
                      <li>Go to <strong>Cursor Settings &gt; Models &gt; MCP</strong></li>
                      <li>Click <strong>+ Add New MCP Server</strong></li>
                      <li>Configure Name, Command as <code className="bg-slate-150 py-0.5 px-1 rounded font-mono text-[10px]">node</code> and paste the arguments block into the configuration input.</li>
                    </ul>
                  )}
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB: DEVELOPER TOOLS & TESTING */}
        {activeTab === 'developer-tools' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-950">MCP Tooling and Inspector Blueprint</h3>
                <p className="text-slate-500 text-xs sm:text-sm font-light">
                  Use the official developer SDK testing suite to validate custom tool schemas, mock response formats, and verify JSON-RPC data parsing.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* Visual CLI commands list */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase font-black text-slate-400 tracking-wider">Useful Developer CLI SDK Packages</h4>
                  
                  <div className="space-y-3">
                    
                    <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
                      <div className="flex justify-between items-center bg-slate-200/50 p-2 rounded-lg font-mono text-[11px] text-slate-800">
                        <span>npx -y @modelcontextprotocol/inspector</span>
                        <span className="text-[9px] bg-slate-950 text-white font-mono rounded px-1.5 font-bold uppercase py-0.5">Official Inspector</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-light">
                        Provides a beautiful interactive local web UI to query, call, and view available tools, schemas, and resource outputs in isolation.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
                      <div className="flex justify-between items-center bg-slate-200/50 p-2 rounded-lg font-mono text-[11px] text-slate-800">
                        <span>npm install @modelcontextprotocol/sdk</span>
                        <span className="text-[9px] bg-slate-950 text-white font-mono rounded px-1.5 font-bold uppercase py-0.5">TypeScript SDK</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-light">
                        The primary Node.js compiler library to declare safe MCP servers, set up stdio transport, and structure schema validations.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
                      <div className="flex justify-between items-center bg-slate-200/50 p-2 rounded-lg font-mono text-[11px] text-slate-800">
                        <span>pip install mcp</span>
                        <span className="text-[9px] bg-slate-950 text-white font-mono rounded px-1.5 font-bold uppercase py-0.5">Python SDK</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-light">
                        Fully compliant Python libraries supporting asyncio, tool registration decorators, and custom server integrations.
                      </p>
                    </div>

                  </div>
                </div>

                {/* Schema validation module */}
                <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl space-y-4">
                  <span className="text-[10px] text-teal-650 font-bold uppercase tracking-wider block">Interactive Schema Compliance Auditor</span>
                  <p className="text-xs text-slate-505 font-light leading-relaxed">
                    Paste a custom tool definition markup below to evaluate standard schema protocol completeness required by search engine scrapers and LLM context clients.
                  </p>

                  <div className="space-y-3">
                    <textarea
                      rows={6}
                      className="w-full bg-white border border-slate-250 focus:border-teal-500 rounded-xl p-3 font-mono text-[11px] leading-relaxed select-text"
                      value={validatorSchema}
                      onChange={(e) => setValidatorSchema(e.target.value)}
                    ></textarea>

                    <button
                      onClick={handleValidateSchema}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition font-mono"
                    >
                      Audit Schema Telemetry
                    </button>

                    {validationResult.status !== 'idle' && (
                      <div className={`p-4 rounded-xl border space-y-2 ${validationResult.status === 'success' ? 'bg-emerald-50 border-emerald-250/50 text-emerald-950' : 'bg-rose-50 border-rose-250/50 text-rose-950'}`}>
                        <p className="text-xs font-extrabold flex items-center gap-1 leading-none">
                          {validationResult.status === 'success' ? '✔ Schema Audit Approved' : '✖ Audit Warning'}
                        </p>
                        <p className="text-[11px] leading-tight font-light">{validationResult.message}</p>
                        {validationResult.errors && validationResult.errors.length > 0 && (
                          <ul className="list-disc pl-4 text-[10px] font-mono leading-relaxed space-y-1">
                            {validationResult.errors.map((e, idx) => <li key={idx}>{e}</li>)}
                          </ul>
                        )}
                      </div>
                    )}

                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB: AEO SEARCH FAQ CONSOLE */}
        {activeTab === 'aeo-answer' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in animate-fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-950">AEO Topic FAQ Console</h3>
              <p className="text-slate-500 text-xs sm:text-sm font-light">
                Verified developer Q&amp;As formatted strictly to comply with standard Search and Answer Engine indexing policies.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "What is Model Context Protocol (MCP) and how does it prevent security exploits?",
                  a: "Model Context Protocol is an open-standard communication architecture. It secures environments by enforcing standard Unix socket or stdio transports on the host machine. By writing tight filesystem bounds or database roles, developer operators ensure the AI agent cannot access parameters outside of specified parameters."
                },
                {
                  q: "How does Arshdeep Singh evaluate MCP registries for enterprise use?",
                  a: "We evaluate tools using five core parameters: Transport safety (Stdio vs SSE handles), scope limits parameters, community momentum (such as active GitHub releases), ease of CLI deployment, and localization compliance metrics."
                },
                {
                  q: "Can I connect custom Gemini models through the @modelcontextprotocol/sdk?",
                  a: "Yes! While the protocol was bootstrapped by Anthropic, it is model-agnostic. Google has shipped official MCP client integrations, and any modern TS/JS system can parse MCP JSON-RPC protocol messages seamlessly."
                },
                {
                  q: "What is the difference between a custom client and an active server in MCP architecture?",
                  a: "An MCP Server acts as a localized microservice that connects cleanly with real resources (like database engines or filesystem hooks). The MCP Client is the user-facing AI model interface (Claude, Cursor, custom agents) that formats tools prompts, queries schemas, and resolves human-in-the-loop triggers."
                }
              ].map((faq, idx) => (
                <div key={idx} className="border border-slate-150 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setFaqOpen(prev => ({ ...prev, [idx]: !prev[idx] }))}
                    className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition font-sans"
                  >
                    <span className="font-extrabold text-xs sm:text-sm text-slate-900">{faq.q}</span>
                    {faqOpen[idx] ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>
                  {faqOpen[idx] && (
                    <div className="p-4 bg-white text-xs sm:text-sm text-slate-705 border-t border-slate-150 leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Visual Callout for AEO and search crawler bots */}
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-150 p-4 rounded-xl flex items-center justify-between text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                <span>Active schema headers contain verified <strong className="text-slate-900 font-bold">DataCatalog</strong>, <strong className="text-slate-900 font-bold">TechArticle</strong>, &amp; <strong className="text-slate-900 font-bold">FAQPage</strong> JSON-LD objects.</span>
              </div>
              <span className="text-[10px] bg-teal-100 text-teal-850 px-2 py-0.5 rounded font-black font-mono">Verified Crawlable</span>
            </div>

          </div>
        )}

      </div>

      {/* 4. Highlighted System Evaluation Summary (Pros & Cons) */}
      <div id="mcp-authority-pros-cons" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <h4 className="font-extrabold text-slate-950 text-base leading-snug">System Evaluation Summary (Pros &amp; Cons)</h4>
        
        <div className="grid sm:grid-cols-2 gap-6 pt-1">
          <div className="bg-teal-50/40 p-5 rounded-2xl border border-teal-150 space-y-3">
            <h5 className="font-extrabold text-teal-950 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5 leading-none">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span> Protocol Strengths (Pros)
            </h5>
            <ul className="list-disc pl-5 text-xs text-slate-700 space-y-2 leading-relaxed">
              <li>Configures localized server systems inside standardized JSON configurations (no glue-code needed).</li>
              <li>Saves developer operators massive time standardizing multiple IDE systems (Cursor, Claude, VS Code).</li>
              <li>Exposes highly responsive CLI inspectors to debug tools, prompts, and resources immediately in isolation.</li>
            </ul>
          </div>

          <div className="bg-rose-50/30 p-5 rounded-2xl border border-rose-100 space-y-3">
            <h5 className="font-extrabold text-rose-950 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5 leading-none">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span> Current Friction limits (Cons)
            </h5>
            <ul className="list-disc pl-5 text-xs text-slate-700 space-y-2 leading-relaxed">
              <li>Relies heavily on local Node.js or Python environments (can cause runtime issues for non-technical clients).</li>
              <li>Command execution lacks structured human-in-the-loop sandboxing guarantees by default.</li>
              <li>Token expenses can climb quickly during iterative tool request debugging loops.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5. Related Guides Subpage index links */}
      <div id="mcp-authority-related-guides" className="bg-slate-50 border rounded-2xl p-5 space-y-3">
        <h5 className="font-extrabold text-xs text-slate-500 uppercase tracking-wider">Related Guides Inside Directory</h5>
        <div className="flex flex-wrap gap-2.5">
          {activeSiloPages.map((page, idx) => (
            <button
              key={idx}
              onClick={() => routeTo('article', undefined, page.slug)}
              className="bg-white hover:bg-slate-100 hover:border-slate-350 transition px-3.5 py-1.5 border border-slate-200 text-xs font-bold text-slate-700 rounded-lg flex items-center gap-1 shadow-xs"
            >
              /{page.slug} <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
