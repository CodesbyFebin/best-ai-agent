export interface KnowledgeGraphNode {
  id: string;
  name: string;
  type: 'agent' | 'company' | 'model' | 'framework' | 'mcp-server' | 'category' | 'use-case';
  slug: string;
  score?: number;
}

export interface KnowledgeGraphEdge {
  source: string;
  target: string;
  relationship: 'created_by' | 'powered_by' | 'belongs_to' | 'integrates_with' | 'competes_with' | 'uses_framework';
}

export const KNOWLEDGE_GRAPH_NODES: KnowledgeGraphNode[] = [
  { id: 'agent-cursor', name: 'Cursor AI', type: 'agent', slug: 'cursor', score: 9.7 },
  { id: 'agent-claude', name: 'Claude Sonnet', type: 'agent', slug: 'claude', score: 9.6 },
  { id: 'agent-chatgpt', name: 'ChatGPT', type: 'agent', slug: 'chatgpt', score: 9.5 },
  { id: 'agent-vapi', name: 'Vapi AI', type: 'agent', slug: 'vapi', score: 9.3 },
  { id: 'agent-yellow', name: 'Yellow.ai', type: 'agent', slug: 'yellow-ai', score: 9.2 },
  { id: 'company-anthropic', name: 'Anthropic', type: 'company', slug: 'anthropic' },
  { id: 'company-openai', name: 'OpenAI', type: 'company', slug: 'openai' },
  { id: 'framework-langgraph', name: 'LangGraph', type: 'framework', slug: 'langgraph' },
  { id: 'framework-crewai', name: 'CrewAI', type: 'framework', slug: 'crewai' },
  { id: 'mcp-github', name: 'GitHub MCP Server', type: 'mcp-server', slug: 'github' },
];

export const KNOWLEDGE_GRAPH_EDGES: KnowledgeGraphEdge[] = [
  { source: 'agent-claude', target: 'company-anthropic', relationship: 'created_by' },
  { source: 'agent-chatgpt', target: 'company-openai', relationship: 'created_by' },
  { source: 'agent-cursor', target: 'mcp-github', relationship: 'integrates_with' },
  { source: 'agent-cursor', target: 'agent-claude', relationship: 'competes_with' },
  { source: 'agent-chatgpt', target: 'agent-claude', relationship: 'competes_with' },
];
