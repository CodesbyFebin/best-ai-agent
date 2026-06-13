#!/usr/bin/env node

/**
 * Fetch MCP Servers Script
 * Scrapes official MCP registry + GitHub topic mcp-server
 * Updates mcpRegistry.json with latest server data
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const REGISTRY_PATH = path.join(process.cwd(), 'src', 'data', 'mcpRegistry.json');

async function fetchMcpServersFromGitHub() {
  try {
    const response = await axios.get('https://api.github.com/search/repositories', {
      params: {
        q: 'topic:mcp-server',
        sort: 'stars',
        order: 'desc',
        per_page: 100
      },
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'BestAIAgent.in MCP Fetcher'
      }
    });

    return response.data.items.map(repo => ({
      id: repo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: repo.name,
      slug: repo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: repo.description || `MCP server for ${repo.name}`,
      category: 'community',
      tags: ['mcp', 'server'],
      github: repo.html_url,
      stars: repo.stargazers_count,
      license: repo.license?.spdx_id || 'Unknown',
      featured: repo.stargazers_count > 500,
      lastVerified: new Date().toISOString().split('T')[0]
    }));
  } catch (error) {
    console.error('Error fetching MCP servers:', error.message);
    return [];
  }
}

async function main() {
  console.log('Fetching MCP servers...');

  const servers = await fetchMcpServersFromGitHub();
  const existing = fs.existsSync(REGISTRY_PATH) 
    ? JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8')) 
    : [];

  // Merge with existing data
  const merged = [...existing, ...servers.filter(s => 
    !existing.some(e => e.slug === s.slug)
  )];

  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(merged, null, 2));
  console.log(`Updated mcpRegistry.json with ${merged.length} servers`);
}

main().catch(console.error);