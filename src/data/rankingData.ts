import { agentEntities } from './agentEntities';
import { modelEntities } from './modelEntities';
import { frameworkEntities } from './frameworkEntities';
import { mcpEntities } from './mcpEntities';
import { companyEntities } from './companyEntities';

export type RankingCategory =
  | 'overall'
  | 'coding-agents'
  | 'voice-agents'
  | 'business-agents'
  | 'research-agents'
  | 'multi-agent-frameworks'
  | 'rag-frameworks'
  | 'observability'
  | 'mcp-servers'
  | 'models-reasoning'
  | 'models-coding'
  | 'models-multimodal'
  | 'india-fit'
  | 'value-for-money'
  | 'enterprise-ready'
  | 'open-source'
  | 'beginner-friendly';

export interface RankingEntry {
  rank: number;
  previousRank?: number;
  entityId: string;
  entityName: string;
  entityType: 'agent' | 'model' | 'framework' | 'mcp-server' | 'company';
  score: number;
  maxScore: number;
  highlights: string[];
  change: 'up' | 'down' | 'same' | 'new';
  changeAmount?: number;
}

export interface Ranking {
  id: string;
  category: RankingCategory;
  title: string;
  description: string;
  methodology: string;
  lastUpdated: string;
  nextUpdate: string;
  entries: RankingEntry[];
}

export interface Award {
  id: string;
  year: number;
  category: string;
  subcategory?: string;
  winner: string;
  winnerEntityId: string;
  runnersUp: string[];
  runnersUpEntityIds: string[];
  description: string;
  criteria: string[];
  judges?: string[];
  methodology: string;
}

export interface Achievement {
  id: string;
  entityId: string;
  type: 'award' | 'certification' | 'milestone' | 'recognition' | 'record';
  title: string;
  description: string;
  date: string;
  source: string;
  url?: string;
}

export const rankings: Ranking[] = [
  {
    id: 'overall-agents-2026', category: 'overall', title: 'Best AI Agents Overall 2026',
    description: 'Overall ranking of the best AI agents across all categories based on our 42-point evaluation methodology.',
    methodology: '42-point scoring across 8 dimensions: capability, ease of use, features, documentation, pricing, reliability, support, security',
    lastUpdated: '2026-06-12', nextUpdate: '2026-09-12',
    entries: [
      { rank: 1, previousRank: 2, entityId: 'cursor-ai', entityName: 'Cursor AI', entityType: 'agent', score: 9.6, maxScore: 10, highlights: ['Best coding agent', 'Repository indexing', 'Multi-file editing'], change: 'up', changeAmount: 1 },
      { rank: 2, previousRank: 1, entityId: 'claude-code', entityName: 'Claude Code', entityType: 'agent', score: 9.5, maxScore: 10, highlights: ['Extended thinking', 'Computer use', 'Terminal-native'], change: 'down', changeAmount: 1 },
      { rank: 3, entityId: 'vapi-ai', entityName: 'Vapi AI', entityType: 'agent', score: 9.5, maxScore: 10, highlights: ['Best voice agent', 'Sub-500ms latency', 'Indian language support'], change: 'same' },
      { rank: 4, entityId: 'claude', entityName: 'Claude', entityType: 'agent', score: 9.4, maxScore: 10, highlights: ['Best general AI', 'Document analysis', 'Artifacts'], change: 'same' },
      { rank: 5, entityId: 'crewai', entityName: 'CrewAI', entityType: 'agent', score: 9.4, maxScore: 10, highlights: ['Best multi-agent', 'Role-based teams', 'Open-source'], change: 'same' },
      { rank: 6, entityId: 'yellow-ai', entityName: 'Yellow.ai', entityType: 'agent', score: 9.3, maxScore: 10, highlights: ['Best for India', 'WhatsApp automation', 'Enterprise-grade'], change: 'up', changeAmount: 2 },
      { rank: 7, entityId: 'github-copilot', entityName: 'GitHub Copilot', entityType: 'agent', score: 9.3, maxScore: 10, highlights: ['Best IDE integration', 'Agent mode', 'Multi-model'], change: 'down', changeAmount: 1 },
      { rank: 8, entityId: 'perplexity-ai', entityName: 'Perplexity AI', entityType: 'agent', score: 9.1, maxScore: 10, highlights: ['Best research agent', 'Real-time web', 'Citations'], change: 'up', changeAmount: 1 },
      { rank: 9, entityId: 'retell-ai', entityName: 'Retell AI', entityType: 'agent', score: 9.1, maxScore: 10, highlights: ['Voice AI', 'Telephony', 'Enterprise'], change: 'down', changeAmount: 1 },
      { rank: 10, entityId: 'flowise-agent', entityName: 'Flowise', entityType: 'agent', score: 9.1, maxScore: 10, highlights: ['Best open-source builder', 'Visual builder', 'Self-hosted'], change: 'up', changeAmount: 3 },
    ],
  },
  {
    id: 'coding-agents-2026', category: 'coding-agents', title: 'Best AI Coding Agents 2026',
    description: 'Ranking of the best AI coding agents for professional developers, evaluated on code quality, IDE integration, and developer experience.',
    methodology: 'SWE-bench scores (40%), code completion quality (20%), IDE integration (20%), developer experience (20%)',
    lastUpdated: '2026-06-12', nextUpdate: '2026-09-12',
    entries: [
      { rank: 1, entityId: 'cursor-ai', entityName: 'Cursor AI', entityType: 'agent', score: 9.8, maxScore: 10, highlights: ['68.3% SWE-bench', 'Repository indexing', 'Composer mode'], change: 'same' },
      { rank: 2, entityId: 'claude-code', entityName: 'Claude Code', entityType: 'agent', score: 9.7, maxScore: 10, highlights: ['72.5% SWE-bench', 'Extended thinking', 'Computer use'], change: 'same' },
      { rank: 3, entityId: 'github-copilot', entityName: 'GitHub Copilot', entityType: 'agent', score: 9.3, maxScore: 10, highlights: ['62.1% SWE-bench', 'IDE integration', 'Agent mode'], change: 'same' },
      { rank: 4, entityId: 'windsurf', entityName: 'Windsurf', entityType: 'agent', score: 9.0, maxScore: 10, highlights: ['59.8% SWE-bench', 'AI-native IDE', 'Cascade mode'], change: 'up', changeAmount: 1 },
      { rank: 5, entityId: 'qodo', entityName: 'Qodo', entityType: 'agent', score: 8.8, maxScore: 10, highlights: ['Code review specialist', 'Test generation', 'CI/CD integration'], change: 'up', changeAmount: 1 },
      { rank: 6, entityId: 'replit-ai', entityName: 'Replit Agent', entityType: 'agent', score: 8.5, maxScore: 10, highlights: ['Full app generation', 'Cloud IDE', 'Beginner friendly'], change: 'down', changeAmount: 2 },
    ],
  },
  {
    id: 'voice-agents-2026', category: 'voice-agents', title: 'Best AI Voice Agents 2026',
    description: 'Ranking of the best AI voice agents evaluated on latency, naturalness, language support, and enterprise features.',
    methodology: 'Latency (30%), naturalness MOS (25%), language support (20%), enterprise features (15%), pricing (10%)',
    lastUpdated: '2026-06-12', nextUpdate: '2026-09-12',
    entries: [
      { rank: 1, entityId: 'vapi-ai', entityName: 'Vapi AI', entityType: 'agent', score: 9.5, maxScore: 10, highlights: ['380ms latency', 'Indian languages', 'Developer-first'], change: 'same' },
      { rank: 2, entityId: 'elevenlabs-voice-agents', entityName: 'ElevenLabs Voice Agents', entityType: 'agent', score: 9.3, maxScore: 10, highlights: ['4.6 MOS naturalness', 'Voice cloning', 'Emotional TTS'], change: 'up', changeAmount: 1 },
      { rank: 3, entityId: 'retell-ai', entityName: 'Retell AI', entityType: 'agent', score: 9.1, maxScore: 10, highlights: ['420ms latency', 'Enterprise features', 'CRM integration'], change: 'down', changeAmount: 1 },
      { rank: 4, entityId: 'bland-ai', entityName: 'Bland AI', entityType: 'agent', score: 8.9, maxScore: 10, highlights: ['HIPAA compliant', 'Human-like', 'High-volume'], change: 'same' },
    ],
  },
  {
    id: 'mcp-servers-2026', category: 'mcp-servers', title: 'Top MCP Servers 2026',
    description: 'Ranking of the most popular and capable MCP servers based on GitHub stars, downloads, tool count, and community adoption.',
    methodology: 'GitHub stars (25%), download count (25%), tool count (20%), documentation quality (15%), community activity (15%)',
    lastUpdated: '2026-06-12', nextUpdate: '2026-09-12',
    entries: [
      { rank: 1, entityId: 'mcp-github', entityName: 'GitHub MCP Server', entityType: 'mcp-server', score: 9.5, maxScore: 10, highlights: ['12K stars', 'Official', 'Full GitHub API'], change: 'same' },
      { rank: 2, entityId: 'mcp-filesystem', entityName: 'Filesystem MCP Server', entityType: 'mcp-server', score: 9.4, maxScore: 10, highlights: ['8K stars', 'Official', 'Core server'], change: 'same' },
      { rank: 3, entityId: 'mcp-brave-search', entityName: 'Brave Search MCP', entityType: 'mcp-server', score: 9.2, maxScore: 10, highlights: ['5.5K stars', 'Web search', 'Real-time info'], change: 'up', changeAmount: 1 },
      { rank: 4, entityId: 'mcp-memory', entityName: 'Memory MCP Server', entityType: 'mcp-server', score: 9.0, maxScore: 10, highlights: ['4.5K stars', 'Knowledge graphs', 'Persistent memory'], change: 'up', changeAmount: 2 },
      { rank: 5, entityId: 'mcp-postgres', entityName: 'PostgreSQL MCP Server', entityType: 'mcp-server', score: 8.9, maxScore: 10, highlights: ['6K stars', 'Database access', 'Read-only safety'], change: 'down', changeAmount: 1 },
      { rank: 6, entityId: 'mcp-puppeteer', entityName: 'Puppeteer MCP Server', entityType: 'mcp-server', score: 8.8, maxScore: 10, highlights: ['7K stars', 'Browser automation', 'Web scraping'], change: 'down', changeAmount: 3 },
      { rank: 7, entityId: 'mcp-fetch', entityName: 'Fetch MCP Server', entityType: 'mcp-server', score: 8.7, maxScore: 10, highlights: ['4.5K stars', 'Web content', 'Markdown conversion'], change: 'up', changeAmount: 1 },
      { rank: 8, entityId: 'mcp-slack', entityName: 'Slack MCP Server', entityType: 'mcp-server', score: 8.5, maxScore: 10, highlights: ['3K stars', 'Team communication', 'Message management'], change: 'same' },
      { rank: 9, entityId: 'mcp-notion', entityName: 'Notion MCP Server', entityType: 'mcp-server', score: 8.4, maxScore: 10, highlights: ['4K stars', 'Knowledge management', 'Page operations'], change: 'up', changeAmount: 2 },
      { rank: 10, entityId: 'mcp-kubernetes', entityName: 'Kubernetes MCP Server', entityType: 'mcp-server', score: 8.3, maxScore: 10, highlights: ['3.5K stars', 'Container orchestration', 'Cloud ops'], change: 'same' },
    ],
  },
  {
    id: 'india-fit-2026', category: 'india-fit', title: 'Best AI Agents for India 2026',
    description: 'Ranking of AI agents with the best India fit, considering INR pricing, DPDP compliance, Indian language support, and local infrastructure.',
    methodology: 'India pricing (25%), DPDP compliance (25%), language support (20%), local infrastructure (15%), support hours (15%)',
    lastUpdated: '2026-06-12', nextUpdate: '2026-09-12',
    entries: [
      { rank: 1, entityId: 'yellow-ai', entityName: 'Yellow.ai', entityType: 'agent', score: 9.7, maxScore: 10, highlights: ['India-native', 'Hindi/Hinglish', 'DPDP compliant'], change: 'same' },
      { rank: 2, entityId: 'vapi-ai', entityName: 'Vapi AI', entityType: 'agent', score: 9.6, maxScore: 10, highlights: ['Indian languages', 'Affordable pricing', 'India support'], change: 'same' },
      { rank: 3, entityId: 'cursor-ai', entityName: 'Cursor AI', entityType: 'agent', score: 9.2, maxScore: 10, highlights: ['INR pricing', 'Strong India user base', 'Good support'], change: 'up', changeAmount: 1 },
      { rank: 4, entityId: 'github-copilot', entityName: 'GitHub Copilot', entityType: 'agent', score: 9.0, maxScore: 10, highlights: ['INR pricing', 'Azure India region', 'Student pricing'], change: 'down', changeAmount: 1 },
      { rank: 5, entityId: 'n8n-agent', entityName: 'n8n', entityType: 'agent', score: 8.9, maxScore: 10, highlights: ['Self-hosted option', 'India hosting', 'Open-source'], change: 'same' },
      { rank: 6, entityId: 'chatgpt', entityName: 'ChatGPT', entityType: 'agent', score: 8.8, maxScore: 10, highlights: ['INR pricing', 'Indian language support', 'Widely used'], change: 'up', changeAmount: 1 },
      { rank: 7, entityId: 'perplexity-ai', entityName: 'Perplexity AI', entityType: 'agent', score: 8.7, maxScore: 10, highlights: ['Free tier', 'Research focus', 'India popular'], change: 'up', changeAmount: 2 },
      { rank: 8, entityId: 'claude', entityName: 'Claude', entityType: 'agent', score: 8.6, maxScore: 10, highlights: ['INR pricing', 'Strong reasoning', 'Indian developer favorite'], change: 'down', changeAmount: 1 },
      { rank: 9, entityId: 'flowise-agent', entityName: 'Flowise', entityType: 'agent', score: 8.5, maxScore: 10, highlights: ['Open-source', 'Self-hosted', 'Free'], change: 'same' },
      { rank: 10, entityId: 'dify-agent', entityName: 'Dify', entityType: 'agent', score: 8.4, maxScore: 10, highlights: ['Open-source', 'INR pricing', 'RAG support'], change: 'same' },
    ],
  },
];

export const awards: Award[] = [
  {
    id: 'award-2026-coding', year: 2026, category: 'Best AI Coding Agent',
    winner: 'Cursor AI', winnerEntityId: 'cursor-ai',
    runnersUp: ['Claude Code', 'GitHub Copilot'], runnersUpEntityIds: ['claude-code', 'github-copilot'],
    description: 'Awarded to the AI coding agent that demonstrates the best overall performance, developer experience, and code quality.',
    criteria: ['SWE-bench score', 'Developer experience', 'Code quality', 'IDE integration', 'Innovation'],
    methodology: 'Editorial evaluation combined with benchmark results and user feedback',
  },
  {
    id: 'award-2026-voice', year: 2026, category: 'Best AI Voice Agent',
    winner: 'Vapi AI', winnerEntityId: 'vapi-ai',
    runnersUp: ['Retell AI', 'Bland AI'], runnersUpEntityIds: ['retell-ai', 'bland-ai'],
    description: 'Awarded to the AI voice agent with the best latency, naturalness, language support, and developer experience.',
    criteria: ['Latency', 'Naturalness', 'Language support', 'Developer API', 'Enterprise features'],
    methodology: 'Independent benchmark testing combined with editorial evaluation',
  },
  {
    id: 'award-2026-multagent', year: 2026, category: 'Best Multi-Agent Framework',
    winner: 'CrewAI', winnerEntityId: 'crewai',
    runnersUp: ['LangGraph', 'AutoGen'], runnersUpEntityIds: ['langgraph', 'autogen'],
    description: 'Awarded to the framework that best enables building and orchestrating multi-agent systems.',
    criteria: ['Collaboration patterns', 'Ease of use', 'Performance', 'Documentation', 'Community'],
    methodology: 'Multi-agent benchmark results combined with editorial evaluation',
  },
  {
    id: 'award-2026-mcp', year: 2026, category: 'Best MCP Server',
    winner: 'GitHub MCP Server', winnerEntityId: 'mcp-github',
    runnersUp: ['Filesystem MCP Server', 'Brave Search MCP'], runnersUpEntityIds: ['mcp-filesystem', 'mcp-brave-search'],
    description: 'Awarded to the MCP server with the best tool coverage, documentation, and community adoption.',
    criteria: ['Tool count', 'Documentation', 'Downloads', 'Community', 'Integration quality'],
    methodology: 'Community metrics combined with editorial evaluation',
  },
  {
    id: 'award-2026-india', year: 2026, category: 'Best AI Agent for India',
    winner: 'Yellow.ai', winnerEntityId: 'yellow-ai',
    runnersUp: ['Vapi AI', 'Haptik'], runnersUpEntityIds: ['vapi-ai', 'haptik'],
    description: 'Awarded to the AI agent that provides the best experience for Indian users and enterprises.',
    criteria: ['India pricing', 'Language support', 'DPDP compliance', 'Local support', 'Integration'],
    methodology: 'India-specific evaluation criteria combined with user feedback',
  },
  {
    id: 'award-2026-open-source', year: 2026, category: 'Best Open-Source AI Agent',
    winner: 'Flowise', winnerEntityId: 'flowise-agent',
    runnersUp: ['CrewAI', 'n8n'], runnersUpEntityIds: ['crewai', 'n8n-agent'],
    description: 'Awarded to the best open-source AI agent or framework for building AI applications.',
    criteria: ['GitHub activity', 'Features', 'Documentation', 'Community', 'Self-hosting'],
    methodology: 'Open-source metrics combined with editorial evaluation',
  },
  {
    id: 'award-2026-reasoning', year: 2026, category: 'Best Reasoning Model',
    winner: 'GPT-4o', winnerEntityId: 'gpt-4o',
    runnersUp: ['Claude Sonnet 4', 'Gemini 2.5 Pro'], runnersUpEntityIds: ['claude-sonnet-4', 'gemini-2.5-pro'],
    description: 'Awarded to the AI model that demonstrates the best reasoning capabilities across benchmarks.',
    criteria: ['MMLU-Pro', 'GPQA', 'HumanEval', 'GAIA', 'Real-world reasoning'],
    methodology: 'Aggregate benchmark performance across reasoning tasks',
  },
  {
    id: 'award-2026-business', year: 2026, category: 'Best Business AI Agent',
    winner: 'Claude', winnerEntityId: 'claude',
    runnersUp: ['ChatGPT', 'Perplexity AI'], runnersUpEntityIds: ['chatgpt', 'perplexity-ai'],
    description: 'Awarded to the AI agent that provides the best value for business users and enterprises.',
    criteria: ['Versatility', 'Accuracy', 'Safety', 'Enterprise features', 'API quality'],
    methodology: 'Business-focused evaluation criteria combined with user feedback',
  },
  {
    id: 'award-2026-observability', year: 2026, category: 'Best Agent Observability',
    winner: 'LangSmith', winnerEntityId: 'langsmith',
    runnersUp: ['AgentOps', 'Arize Phoenix'], runnersUpEntityIds: ['agentops', 'arize-phoenix'],
    description: 'Awarded to the best platform for monitoring, debugging, and evaluating AI agents.',
    criteria: ['Tracing', 'Evaluation', 'Monitoring', 'Ease of use', 'Framework support'],
    methodology: 'Feature evaluation combined with user feedback',
  },
  {
    id: 'award-2026-innovation', year: 2026, category: 'Innovation Award',
    winner: 'Claude Code', winnerEntityId: 'claude-code',
    runnersUp: ['Cursor AI', 'Replit Agent'], runnersUpEntityIds: ['cursor-ai', 'replit-ai'],
    description: 'Awarded to the AI agent that introduces the most innovative capabilities in 2026.',
    criteria: ['Novel capabilities', 'Technical innovation', 'Market impact', 'Future potential'],
    methodology: 'Editorial panel evaluation of innovative features',
  },
];

export interface RankingStatistics {
  totalEntities: number;
  agents: number;
  models: number;
  frameworks: number;
  mcpServers: number;
  companies: number;
  totalRankings: number;
  totalAwards: number;
  totalBenchmarks: number;
  lastUpdated: string;
}

export function getRankingStatistics(): RankingStatistics {
  return {
    totalEntities: agentEntities.length + modelEntities.length + frameworkEntities.length + mcpEntities.length + companyEntities.length,
    agents: agentEntities.length,
    models: modelEntities.length,
    frameworks: frameworkEntities.length,
    mcpServers: mcpEntities.length,
    companies: companyEntities.length,
    totalRankings: rankings.length,
    totalAwards: awards.length,
    totalBenchmarks: 0,
    lastUpdated: '2026-06-12',
  };
}

export function getRanking(id: string): Ranking | undefined {
  return rankings.find(r => r.id === id);
}

export function getRankingByCategory(category: RankingCategory): Ranking | undefined {
  return rankings.find(r => r.category === category);
}

export function getAward(id: string): Award | undefined {
  return awards.find(a => a.id === id);
}

export function getAwardsByYear(year: number): Award[] {
  return awards.filter(a => a.year === year);
}

export function getAwardsByCategory(category: string): Award[] {
  return awards.filter(a => a.category === category);
}

export function getTopRanked(entityType: RankingEntry['entityType'], limit = 10): RankingEntry[] {
  const overall = rankings.find(r => r.category === 'overall');
  if (!overall) return [];
  return overall.entries.filter(e => e.entityType === entityType).slice(0, limit);
}

export function getWinner(entityId: string): Award[] {
  return awards.filter(a => a.winnerEntityId === entityId);
}

export function getRunnerUp(entityId: string): Award[] {
  return awards.filter(a => a.runnersUpEntityIds.includes(entityId));
}

export function getAllEntityIds(): string[] {
  const ids = new Set<string>();
  rankings.forEach(r => r.entries.forEach(e => ids.add(e.entityId)));
  awards.forEach(a => {
    ids.add(a.winnerEntityId);
    a.runnersUpEntityIds.forEach(id => ids.add(id));
  });
  return Array.from(ids);
}

// Pre-built index for O(1) entity-to-rankings lookup
const _entityRankingsCache: Map<string, Array<{ ranking: string; rank: number; score: number; maxScore: number }>> = (() => {
  const cache = new Map<string, Array<{ ranking: string; rank: number; score: number; maxScore: number }>>();
  rankings.forEach(r => {
    r.entries.forEach(e => {
      if (!cache.has(e.entityId)) cache.set(e.entityId, []);
      cache.get(e.entityId)!.push({ ranking: r.title, rank: e.rank, score: e.score, maxScore: e.maxScore });
    });
  });
  return cache;
})();

export function getEntityRankings(entityId: string): Array<{ ranking: string; rank: number; score: number; maxScore: number }> {
  return _entityRankingsCache.get(entityId) || [];
}
