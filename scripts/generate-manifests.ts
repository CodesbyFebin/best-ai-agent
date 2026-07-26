#!/usr/bin/env npx tsx

/**
 * Generate Content Manifests for all agents
 * Creates manifest entries for comprehensive content pages
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the agents data
async function loadAgents() {
  const agentsPath = path.join(__dirname, '..', 'dist', 'assets', 'index.js');
  // For now, we'll use the agents from the source
  const agents = [
    { id: "chatgpt", slug: "chatgpt", name: "ChatGPT (Agent Mode)" },
    { id: "claude", slug: "claude", name: "Claude 3.5 Sonnet" },
    { id: "cursor-ai", slug: "cursor-ai", name: "Cursor AI Editor" },
    { id: "vapi-ai", slug: "vapi-ai", name: "Vapi Voice AI Platform" },
    { id: "grok", slug: "grok", name: "Grok 2 & Grok Heavy" }
  ];
  return agents;
}

// Agent categories
const AGENT_CATEGORIES = {
  'coding': ['cursor-ai', 'claude-sonnet', 'claude', 'copilot', 'tabnine', 'devgenie', 'kody', 'deepseek-coder', 'mistral-code'],
  'voice': ['vapi-ai', 'eleven-labs', 'descript', 'voice', 'yara'],
  'research': ['perplexity', 'kagi', 'jina-ai', 'you-com', 'claude', 'chatgpt'],
  'enterprise': ['n8n', 'make', 'retool', 'zapier-mcp', 'anthropic', 'cohere'],
  'frameworks': ['crewai', 'langchain-js', 'autogpt', 'babyagi', 'crewai'],
  'open-source': ['crewai', 'n8n', 'gpt4all', 'openassistant', 'ollama', 'lmstudio', 'llava', 'minicpm']
};

// Generate manifest for each agent
function generateManifest(agent: any, index: number): any {
  return {
    id: `manifest:page:agent:${agent.slug}`,
    slug: agent.slug,
    canonicalUrl: `https://bestaiagent.in/agents/${agent.slug}/`,
    entityId: `agent/${agent.slug}`,
    entityType: 'agent',
    blueprintId: 'agent-detail-v1',
    graphNodeId: `agent/${agent.slug}`,
    contentType: 'product_detail',
    status: 'published',
    language: 'en-US',
    version: '1.0.0',
    createdAt: '2025-07-25T12:00:00Z',
    updatedAt: '2025-07-25T12:00:00Z',
    metadata: {
      title: `${agent.name} - Best AI Agent`,
      description: `Detailed review and analysis of ${agent.name}, a leading AI agent for modern applications.`,
      keywords: [agent.slug, 'ai', 'agent', 'review', 'comparison'],
      ogImage: `/images/og/${agent.slug}.jpg`,
      build: {
        buildId: `build-20250725-${index}`,
        generatedAt: '2025-07-25T12:00:00Z',
        blueprintVersion: '1.0.0',
        contentVersion: '1.0.0'
      },
      quality: {
        score: 85,
        passed: true,
        lastValidated: '2025-07-25T12:00:00Z',
        validatorVersion: '1.0.0'
      },
      editorial: {
        state: 'published',
        reviewer: 'editorial-team',
        reviewedAt: '2025-07-25T10:00:00Z'
      },
      minWordCount: 2000 // Enable deep content
    }
  };
}

// Generate category manifests
function generateCategoryManifest(category: string, agents: string[]): any {
  return {
    id: `manifest:page:category:${category}`,
    slug: category,
    canonicalUrl: `https://bestaiagent.in/categories/${category}/`,
    entityId: `category/${category}`,
    entityType: 'category',
    blueprintId: 'category-deep-dive-v1',
    graphNodeId: `category/${category}`,
    contentType: 'article',
    status: 'published',
    language: 'en-US',
    version: '1.0.0',
    createdAt: '2025-07-25T12:00:00Z',
    updatedAt: '2025-07-25T12:00:00Z',
    metadata: {
      title: `AI Agents for ${category.replace('-', ' ')}`,
      description: `Comprehensive guide to AI agents in the ${category} category.`,
      keywords: ['ai', 'agents', category, 'review'],
      build: {
        buildId: 'build-20250725-cat',
        generatedAt: '2025-07-25T12:00:00Z',
        blueprintVersion: '1.0.0'
      },
      minWordCount: 2500 // Enable deep content for categories too
    }
  };
}

// Generate comparison manifests
function generateComparisonManifest(slugs: string[]): any {
  const id = `manifest:page:comparison:${slugs[0]}-vs-${slugs[1]}`;
  return {
    id,
    slug: `${slugs[0]}-vs-${slugs[1]}`,
    canonicalUrl: `https://bestaiagent.in/compare/${slugs[0]}-vs-${slugs[1]}`,
    entityId: `comparison/${slugs[0]}-vs-${slugs[1]}`,
    entityType: 'comparison',
    blueprintId: 'comparison-deep-v1',
    graphNodeId: `comparison/${slugs[0]}-vs-${slugs[1]}`,
    contentType: 'comparison',
    status: 'published',
    language: 'en-US',
    version: '1.0.0',
    createdAt: '2025-07-25T12:00:00Z',
    updatedAt: '2025-07-25T12:00:00Z',
    metadata: {
      title: `${slugs[0]} vs ${slugs[1]} - AI Agent Comparison`,
      description: `Detailed head-to-head comparison of ${slugs[0]} and ${slugs[1]} AI agents.`,
      keywords: [slugs[0], slugs[1], 'comparison', 'ai agent'],
      build: {
        buildId: `build-20250725-comp-${Date.now()}`,
        generatedAt: '2025-07-25T12:00:00Z',
        blueprintVersion: '1.0.0'
      },
      minWordCount: 2000
    }
  };
}

async function main() {
  console.log('Generating content manifests for Phase C deep content...\n');

  // Agent manifests
  const agents = [
    { id: "chatgpt", slug: "chatgpt", name: "ChatGPT (Agent Mode)" },
    { id: "claude", slug: "claude", name: "Claude 3.5 Sonnet" },
    { id: "claude-3-opus", slug: "claude-3-opus", name: "Claude 3 Opus" },
    { id: "claude-3-sonnet", slug: "claude-3-sonnet", name: "Claude 3.5 Sonnet" },
    { id: "claude-code", slug: "claude-code", name: "Claude Code" },
    { id: "cursor-ai", slug: "cursor-ai", name: "Cursor AI Editor" },
    { id: "copilot", slug: "copilot", name: "GitHub Copilot" },
    { id: "vapi-ai", slug: "vapi-ai", name: "Vapi Voice AI Platform" },
    { id: "eleven-labs", slug: "eleven-labs", name: "ElevenLabs Voice AI" },
    { id: "grok", slug: "grok", name: "Grok 2" },
    { id: "perplexity", slug: "perplexity", name: "Perplexity Pro Agent" },
    { id: "crewai", slug: "crewai", name: "CrewAI Orchestration" },
    { id: "n8n", slug: "n8n", name: "n8n Workflow Automation" },
    { id: "mistral-large", slug: "mistral-large", name: "Mistral Large" },
    { id: "gemini-pro", slug: "gemini-pro", name: "Gemini Pro" },
    { id: "qwen2.5", slug: "qwen2.5", name: "Qwen 2.5" },
    { id: "deepseek-coder", slug: "deepseek-coder", name: "DeepSeek Coder" },
    { id: "ollama", slug: "ollama", name: "Ollama" },
    { id: "tabnine", slug: "tabnine", name: "Tabnine" },
    { id: "autogpt", slug: "autogpt", name: "AutoGPT" },
    { id: "zapi-voice", slug: "zapier-mcp", name: "Zapier MCP Connector" },
    { id: "kagi", slug: "kagi", name: "Kagi Search" },
    { id: "replit", slug: "replit", name: "Replit Ghostwriter" }
  ];

  const agentManifests = agents.map((agent, i) => generateManifest(agent, i));

  // Category manifests
  const categories = [
    { name: 'coding-agents', agents: ['cursor-ai', 'claude', 'copilot', 'claude-code'] },
    { name: 'voice-agents', agents: ['vapi-ai', 'eleven-labs'] },
    { name: 'business-automation', agents: ['n8n', 'zapier-mcp', 'crewai'] },
    { name: 'research-agents', agents: ['perplexity', 'kagi', 'jina-ai'] },
    { name: 'developer-tools', agents: ['cursor-ai', 'copilot', 'tabnine', 'claude-code'] },
    { name: 'open-source-agents', agents: ['crewai', 'n8n', 'ollama', 'gpt4all'] },
    { name: 'frameworks', agents: ['crewai', 'autogpt', 'babyagi'] }
  ];

  const categoryManifests = categories.map(cat => generateCategoryManifest(cat.name, cat.agents));

  // Comparison manifests
  const comparisons = [
    ['chatgpt', 'claude'],
    ['cursor-ai', 'copilot'],
    ['vapi-ai', 'eleven-labs'],
    ['crewai', 'autogpt'],
    ['n8n', 'make']
  ];

  const comparisonManifests = comparisons.map(comp => generateComparisonManifest(comp));

  // Combine all manifests
  const allManifests = [...agentManifests, ...categoryManifests, ...comparisonManifests];

  console.log(`Generated ${allManifests.length} manifests:`);
  console.log(`  - ${agentManifests.length} agent pages`);
  console.log(`  - ${categoryManifests.length} category pages`);
  console.log(`  - ${comparisonManifests.length} comparison pages`);

  // Write to manifest-data.json
  const outputPath = path.join(__dirname, '..', 'manifest-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(allManifests, null, 2));
  
  console.log(`\n✅ Wrote ${allManifests.length} manifests to ${outputPath}`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});