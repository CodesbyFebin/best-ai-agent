import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import crypto from 'node:crypto';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { generateRssFeedXml } from './src/utils/rss-feed-generator.js';
import { generateMasterSitemapXml, generateSegmentedSitemapXml } from './src/data/sitemapGenerator.js';
import { resolveRoute } from './src/routing/routeResolver.js';
import { AppRouter } from './src/components/RouterApp';
import { Request, Response } from 'express';

dotenv.config();

// Knowledge Graph types
interface GraphNode {
  id: string;
  type: 'agent' | 'category' | 'comparison' | 'research';
  data: Record<string, unknown>;
}

interface GraphEdge {
  from: string;
  to: string;
  type: string;
  properties: Record<string, unknown>;
}

interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  metadata: {
    generatedAt: string;
    nodeCount: number;
    edgeCount: number;
  };
}

const isProd = process.env.NODE_ENV === 'production';
const PORT = 3000;

function timingSafeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function authenticateAdmin(req: Request, res: Response, next: Function): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  const token = authHeader.substring('Bearer '.length).trim();
  if (token.length === 0) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  const expectedToken = process.env.ADMIN_API_TOKEN;
  if (expectedToken && timingSafeEqual(token, expectedToken)) {
    return next();
  }
  if (!isProd && !expectedToken) {
    console.warn('[auth] ADMIN_API_TOKEN not set; accepting dev admin token');
    return next();
  }
  return res.status(401).json({ error: 'Invalid token' });
}

interface SeoRenderResult {
  statusCode: number;
  html: string;
  redirectTo?: string;
}

function renderHtmlWithSeo(urlPath: string, templateHtml: string): SeoRenderResult {
  try {
    // === P0-01: Admin route protection ===
    // Block all admin routes from server-side rendering
    // This is critical for security - admin dashboard should never be rendered to unauthenticated users
    const normalizedPath = urlPath.toLowerCase().replace(/\/+$/, '');
    if (normalizedPath === '/admin' || normalizedPath.startsWith('/admin/')) {
      return {
        statusCode: 404,
        html: templateHtml.replace(/<title>.*?<\/title>/, '<title>404 - Page Not Found | BestAIAgent.in</title>'),
      };
    }

    const resolution = resolveRoute(urlPath);

    if (resolution.kind === 'redirect') {
      return {
        statusCode: 301,
        html: '',
        redirectTo: resolution.destination
      };
    }

    if (resolution.kind === 'not-found') {
      const title = "404 - Page Not Found | BestAIAgent.in";
      const description = "The requested URL was not found in the BestAIAgent.in directory.";
      // Do NOT include canonical on 404 pages (SEO best practice - prevents indexing of invalid URLs)
      
      const headMeta = `
        <title>${title}</title>
        <meta name="description" content="${description}">
        <meta name="robots" content="noindex, follow">
      `;

      // Render the app for 404 (we'll pass null route to AppRouter)
      const reactHtml = renderToString(<AppRouter route={null} />);

      let result = templateHtml;
      if (result.includes('<title>')) {
        result = result.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
      }
      result = result.replace('</head>', `${headMeta}\n</head>`);

      // Replace root div content while preserving the div itself
      result = result.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${reactHtml}</div>`);

      return { statusCode: 404, html: result };
    }

    // Valid Route
    const route = resolution.route;
    const { title, description, canonicalPath } = route;
    const canonical = `https://bestaiagent.in${canonicalPath === '/' ? '/' : canonicalPath + '/'}`;

    const orgSchema = {
      "@type": "Organization",
      "@id": "https://bestaiagent.in/#organization",
      "name": "BestAIAgent.in",
      "url": "https://bestaiagent.in/",
      "logo": "https://bestaiagent.in/logo.png",
      "description": "Independent AI Agent Evaluation Registry & Benchmark Platform"
    };

    const websiteSchema = {
      "@type": "WebSite",
      "@id": "https://bestaiagent.in/#website",
      "url": "https://bestaiagent.in/",
      "name": "BestAIAgent.in",
      "publisher": { "@id": "https://bestaiagent.in/#organization" }
    };

    const webpageSchema = {
      "@type": "WebPage",
      "@id": canonical,
      "url": canonical,
      "name": title,
      "description": description
    };

    const headMeta = `
      <title>${title}</title>
      <meta name="description" content="${description}">
      <link rel="canonical" href="${canonical}">
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${description}">
      <meta property="og:url" content="${canonical}">
      <meta property="og:type" content="website">
      <script type="application/ld+json">
        ${JSON.stringify({ "@context": "https://schema.org", "@graph": [orgSchema, websiteSchema, webpageSchema] })}
      </script>
    `;

    // Render the app with the resolved route
    const reactHtml = renderToString(<AppRouter route={route} />);

    let result = templateHtml;
    if (result.includes('<title>')) {
      result = result.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    }
    result = result.replace('</head>', `${headMeta}\n</head>`);

    result = result.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${reactHtml}</div>`);

    return { statusCode: 200, html: result };
  } catch (err) {
    console.error("Error generating SEO HTML:", err);
    return { statusCode: 200, html: templateHtml };
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Load Knowledge Graph data
  let graphData: GraphData | null = null;
  try {
    const graphPath = path.resolve('./graph-data.json');
    const graphJson = fs.readFileSync(graphPath, 'utf-8');
    graphData = JSON.parse(graphJson) as GraphData;
    console.log(`Server: Knowledge Graph loaded (${graphData.nodes.length} nodes, ${graphData.edges.length} edges)`);
  } catch (e) {
    console.warn('Server: graph-data.json not found. Graph API endpoints will return empty data.');
  }

  // Setup Server-Side Gemini API Client
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    try {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      console.log("Server: Gemini API Client initialized successfully.");
    } catch (e) {
      console.error("Server: Failed to init GoogleGenAI SDK", e);
    }
  }

  // --- TOP-LEVEL 301 REDIRECT MIDDLEWARE ---
  app.use((req, res, next) => {
    // Exclude API, static assets, Vite internal modules
    if (
      req.path.startsWith('/api') ||
      req.path.startsWith('/@') ||
      req.path.startsWith('/src') ||
      req.path.startsWith('/node_modules') ||
      req.path.includes('.')
    ) {
      return next();
    }

    const resolution = resolveRoute(req.path);
    if (resolution.kind === 'redirect') {
      return res.redirect(301, resolution.destination);
    }
    next();
  });

  // --- XML SITEMAP & RSS ENDPOINTS ---

  app.get('/llms.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    let txt = `# BestAIAgent.in - Topical Authority Index for AI crawlers\n`;
    txt += `This directory lists our comprehensive 100-Pillar Topical Authority Map built for Google, ChatGPT, Gemini, Claude, Perplexity, Copilot, and AI Overviews.\n\n`;
    
    const clusters = [
      { name: "AI Agent Core", slugs: ["cursor", "vapi", "crewai", "yellow-ai", "flowise-ai", "reclaim-ai", "n8n"] },
      { name: "Frameworks & SDKs", slugs: ["langgraph", "crewai", "autogen"] },
      { name: "Tool Comparisons", slugs: ["cursor-vs-copilot", "chatgpt-vs-claude", "crewai-vs-autogen", "vapi-vs-retell"] }
    ];

    clusters.forEach(c => {
      txt += `\n## ${c.name}\n`;
      c.slugs.forEach(s => {
        txt += `- https://bestaiagent.in/agents/${s}/\n`;
      });
    });

    res.send(txt);
  });

  // Sitemap Index endpoints
  app.get(['/sitemap.xml', '/sitemap-index.xml', '/sitemap-indexed.xml'], (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    res.send(generateMasterSitemapXml());
  });

  // Segmented Sitemaps
  app.get('/sitemap-agents.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    res.send(generateSegmentedSitemapXml('agents'));
  });

  app.get('/sitemap-categories.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    res.send(generateSegmentedSitemapXml('categories'));
  });

  app.get('/sitemap-comparisons.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    res.send(generateSegmentedSitemapXml('comparisons'));
  });

  app.get('/sitemap-mcp.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    res.send(generateSegmentedSitemapXml('mcp'));
  });

  app.get('/sitemap-research.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    res.send(generateSegmentedSitemapXml('research'));
  });

  app.get('/sitemap-pages.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    res.send(generateSegmentedSitemapXml('pages'));
  });

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    });
  });

  // Backward compatibility sitemaps
  app.get(['/ai-agent-sitemap.xml', '/tool-sitemap.xml', '/pseo-sitemap.xml'], (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    res.send(generateSegmentedSitemapXml('agents'));
  });

  app.get('/comparison-sitemap.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    res.send(generateSegmentedSitemapXml('comparisons'));
  });

  // RSS Feed endpoints
  app.get(['/rss.xml', '/feed.xml', '/rss'], (req, res) => {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.send(generateRssFeedXml());
  });

  // Rate limiting middleware for API endpoints
  const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
  const RATE_LIMIT_WINDOW_MS = 60 * 1000;
  const RATE_LIMIT_MAX = 60;

  function apiRateLimit(req: Request, res: Response, next: Function) {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
      res.setHeader('X-RateLimit-Limit', RATE_LIMIT_MAX.toString());
      res.setHeader('X-RateLimit-Remaining', (RATE_LIMIT_MAX - 1).toString());
      return next();
    }

    if (record.count >= RATE_LIMIT_MAX) {
      res.setHeader('X-RateLimit-Limit', RATE_LIMIT_MAX.toString());
      res.setHeader('X-RateLimit-Remaining', '0');
      res.setHeader('X-RateLimit-Reset', Math.floor(record.resetTime / 1000).toString());
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    record.count++;
    res.setHeader('X-RateLimit-Limit', RATE_LIMIT_MAX.toString());
    res.setHeader('X-RateLimit-Remaining', (RATE_LIMIT_MAX - record.count).toString());
    res.setHeader('X-RateLimit-Reset', Math.floor(record.resetTime / 1000).toString());
    next();
  }

  // API Endpoints (with rate limiting)
  app.post('/api/analyze-doc', apiRateLimit, async (req, res) => {
    try {
      const { content, filename, mimeType } = req.body;
      if (!content || typeof content !== 'string') {
        return res.status(400).json({ error: 'Content payload is required for review.' });
      }

      if (ai) {
        const model = 'gemini-3.5-flash';
        const formattedPrompt = `You are the Principal AI Architect at BestAIAgent.in. Evaluate the following document retrieved from our user's secure Google Drive.
File Name: "${filename}"
Mime Type: "${mimeType}"

Document Content Snippet:
"""
${content.slice(0, 5000)}
"""

Provide an expert AI Agent Capability Review and Actionable Implementation Checklist in Markdown.`;

        const response = await ai.models.generateContent({
          model,
          contents: formattedPrompt
        });

        res.json({ text: response.text });
      } else {
        res.json({ text: `### 📊 AI Agent Capability Review\nDocument Analyzed: ${filename}\n- **Recommendation**: Deploy Cursor AI for coding and Vapi AI for voice operations.` });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error processing document analysis' });
    }
  });

  app.post('/api/recommend', async (req, res) => {
    try {
      const { prompt, industry, budget } = req.body;
      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Prompt description is required.' });
      }

      if (ai) {
        const model = 'gemini-3.5-flash';
        const formattedPrompt = `Suggest the best AI Agents, Visual Builders, or Orchestration Frameworks for this scenario:
Query: "${prompt}", Industry: ${industry || 'Unspecified'}, Budget: ${budget || 'Unspecified'}`;

        const response = await ai.models.generateContent({
          model,
          contents: formattedPrompt
        });

        res.json({ text: response.text });
      } else {
        res.json({ text: `### Recommendations for ${industry || 'Business'}:\n1. **Cursor AI** (Coding)\n2. **Vapi AI** (Voice Bots)\n3. **Flowise AI** (No-Code RAG)` });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error processing recommendation' });
    }
  });

  app.post('/api/submit-lead', apiRateLimit, (req, res) => {
    try {
      const { name, company, phone, desc } = req.body || {};
      if (!name || !company || !desc) {
        return res.status(400).json({ error: 'name, company, and desc are required.' });
      }
      const id = `lead-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      res.status(201).json({ success: true, id, message: 'Lead captured successfully.' });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error processing lead submission' });
    }
  });

  app.post('/api/submit-tool', apiRateLimit, (req, res) => {
    try {
      const { name, url, category, description, email } = req.body || {};
      if (!name || !url || !category || !description) {
        return res.status(400).json({ error: 'name, url, category, and description are required.' });
      }
      const id = `tool-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      res.status(201).json({ success: true, id, message: 'Tool submitted successfully.' });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error processing tool submission' });
    }
  });

  app.post('/api/subscribe', apiRateLimit, (req, res) => {
    try {
      const { email } = req.body || {};
      if (!email || !validateEmail(email)) {
        return res.status(400).json({ error: 'A valid email is required.' });
      }
      const id = `sub-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      res.status(201).json({ success: true, id, message: 'Subscribed successfully.' });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error processing subscription' });
    }
  });

  // ========================================
  // KNOWLEDGE GRAPH API ENDPOINTS (Phase B)
  // ========================================

  // GET /api/graph/stats - Graph statistics
  app.get('/api/graph/stats', (req, res) => {
    if (!graphData) {
      return res.status(503).json({ error: 'Graph data not loaded' });
    }

    const nodeTypeCounts: Record<string, number> = {};
    const edgeTypeCounts: Record<string, number> = {};

    for (const node of graphData.nodes) {
      nodeTypeCounts[node.type] = (nodeTypeCounts[node.type] || 0) + 1;
    }
    for (const edge of graphData.edges) {
      edgeTypeCounts[edge.type] = (edgeTypeCounts[edge.type] || 0) + 1;
    }

    res.json({
      metadata: graphData.metadata,
      nodes: {
        total: graphData.nodes.length,
        byType: nodeTypeCounts
      },
      edges: {
        total: graphData.edges.length,
        byType: edgeTypeCounts
      }
    });
  });

  // GET /api/graph/related/:entityType/:entityId - Get entities related to a given entity
  app.get('/api/graph/related/:entityType/:entityId', (req, res) => {
    if (!graphData) {
      return res.status(503).json({ error: 'Graph data not loaded' });
    }

    const { entityType, entityId } = req.params;
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);

    const nodeId = `${entityType}/${entityId}`;

    // Find edges where this node is the source
    const outgoingEdges = graphData.edges.filter(e => e.from === nodeId);
    const incomingEdges = graphData.edges.filter(e => e.to === nodeId);

    // Build related entities
    const related: Array<{ node: GraphNode; edge: GraphEdge; direction: 'outgoing' | 'incoming' }> = [];

    for (const edge of outgoingEdges) {
      const targetNode = graphData.nodes.find(n => n.id === edge.to);
      if (targetNode) {
        related.push({ node: targetNode, edge, direction: 'outgoing' });
      }
    }

    for (const edge of incomingEdges) {
      const sourceNode = graphData.nodes.find(n => n.id === edge.from);
      if (sourceNode) {
        related.push({ node: sourceNode, edge, direction: 'incoming' });
      }
    }

    // Sort by edge type relevance (prioritize certain relationships)
    const priorityEdges = ['SIMILAR_TO', 'BELONGS_TO', 'TOP_AGENT', 'COMPARED_WITH', 'WRITTEN_BY', 'CITED_BY'];
    related.sort((a, b) => {
      const aPriority = priorityEdges.indexOf(a.edge.type);
      const bPriority = priorityEdges.indexOf(b.edge.type);
      if (aPriority === -1 && bPriority === -1) return 0;
      if (aPriority === -1) return 1;
      if (bPriority === -1) return -1;
      return aPriority - bPriority;
    });

    const paginated = related.slice(0, limit);

    res.json({
      entityId: nodeId,
      total: related.length,
      limit,
      relationships: paginated.map(r => ({
        node: r.node,
        relationship: r.edge.type,
        direction: r.direction,
        properties: r.edge.properties
      }))
    });
  });

  // GET /api/graph/similar/:entityType/:entityId - Find similar entities (agents in same categories)
  app.get('/api/graph/similar/:entityType/:entityId', (req, res) => {
    if (!graphData) {
      return res.status(503).json({ error: 'Graph data not loaded' });
    }

    const { entityType, entityId } = req.params;
    const limit = Math.min(parseInt(req.query.limit as string) || 5, 20);

    if (entityType !== 'agent') {
      return res.status(400).json({ error: 'Similarity currently only supported for agents' });
    }

    const nodeId = `agent/${entityId}`;
    const agentNode = graphData.nodes.find(n => n.id === nodeId);
    if (!agentNode) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    // Find categories this agent belongs to
    const categoryEdges = graphData.edges.filter(e => e.from === nodeId && e.type === 'BELONGS_TO');
    const categoryIds = categoryEdges.map(e => e.to);

    if (categoryIds.length === 0) {
      return res.json({ entityId: nodeId, total: 0, limit, similar: [] });
    }

    // Find other agents in the same categories
    const similarAgents = new Map<string, { node: GraphNode; score: number }>();

    for (const categoryId of categoryIds) {
      const agentEdges = graphData.edges.filter(e => e.to === categoryId && e.from !== nodeId && e.from.startsWith('agent/'));
      
      for (const edge of agentEdges) {
        const existing = similarAgents.get(edge.from);
        const newScore = (existing?.score || 0) + 1; // Count shared categories
        
        const targetNode = graphData.nodes.find(n => n.id === edge.from);
        if (targetNode) {
          similarAgents.set(edge.from, { node: targetNode, score: newScore });
        }
      }
    }

    // Sort by similarity score (most shared categories first)
    const sorted = Array.from(similarAgents.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    res.json({
      entityId: nodeId,
      total: similarAgents.size,
      limit,
      similar: sorted.map(s => ({
        node: s.node,
        similarityScore: s.score
      }))
    });
  });

  // GET /api/graph/path/:fromType/:fromId/:toType/:toId - Find shortest path between entities
  app.get('/api/graph/path/:fromType/:fromId/:toType/:toId', (req, res) => {
    if (!graphData) {
      return res.status(503).json({ error: 'Graph data not loaded' });
    }

    const { fromType, fromId, toType, toId } = req.params;
    const fromNodeId = `${fromType}/${fromId}`;
    const toNodeId = `${toType}/${toId}`;

    // Simple BFS to find shortest path
    const queue: Array<{ nodeId: string; path: string[] }> = [{ nodeId: fromNodeId, path: [fromNodeId] }];
    const visited = new Set<string>([fromNodeId]);

    while (queue.length > 0) {
      const { nodeId, path } = queue.shift()!;

      if (nodeId === toNodeId) {
        // Build path with edge info
        const fullPath = [];
        for (let i = 0; i < path.length - 1; i++) {
          const edge = graphData.edges.find(e => e.from === path[i] && e.to === path[i + 1]);
          const fromNode = graphData.nodes.find(n => n.id === path[i]);
          const toNode = graphData.nodes.find(n => n.id === path[i + 1]);
          fullPath.push({
            from: fromNode,
            to: toNode,
            edge
          });
        }
        return res.json({ path: fullPath, length: path.length - 1 });
      }

      // Explore neighbors
      const outgoingEdges = graphData.edges.filter(e => e.from === nodeId);
      for (const edge of outgoingEdges) {
        if (!visited.has(edge.to)) {
          visited.add(edge.to);
          queue.push({ nodeId: edge.to, path: [...path, edge.to] });
        }
      }
    }

    res.status(404).json({ error: 'No path found between entities' });
  });

  // --- ADMIN ENDPOINTS (READ-ONLY, NO MODIFICATIONS) ---
  // These endpoints verify admin access but don't perform any administrative actions

  app.get('/api/admin/verify', authenticateAdmin, (req, res) => {
    res.json({
      authenticated: true,
      role: 'admin',
      permissions: ['read', 'audit', 'inspect']
    });
  });

  // Admin info endpoint (read-only)
  app.get('/api/admin/info', authenticateAdmin, (req, res) => {
    res.json({
      version: '1.0.0',
      endpoints: ['/api/admin/verify', '/api/admin/info'],
      capabilities: ['read-only', 'audit', 'system-status']
    });
  });

  // --- VITE MIDDLEWARE & SERVER-SIDE SEO INTERCEPTION ---

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    app.use(async (req, res, next) => {
      const isHtmlRequest = 
        req.method === 'GET' && 
        req.headers.accept?.includes('text/html') && 
        !req.path.startsWith('/api') && 
        !req.path.startsWith('/@') && 
        !req.path.startsWith('/src') && 
        !req.path.startsWith('/node_modules');

      if (isHtmlRequest) {
        try {
          const rawTemplate = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
          const transformedHtml = await vite.transformIndexHtml(req.originalUrl, rawTemplate);
          const seoResult = renderHtmlWithSeo(req.path, transformedHtml);

          if (seoResult.redirectTo) {
            return res.redirect(301, seoResult.redirectTo);
          }

          return res.status(seoResult.statusCode).set({ 'Content-Type': 'text/html' }).end(seoResult.html);
        } catch (e) {
          vite.ssrFixStacktrace(e as Error);
          next(e);
        }
      } else {
        vite.middlewares(req, res, next);
      }
    });
  } else {
    // Production static asset serving + SSR
    const distPath = path.resolve('./dist');
    app.use(express.static(distPath, { index: false }));
    
    app.get('*', (req, res) => {
      try {
        const rawTemplate = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
        const seoResult = renderHtmlWithSeo(req.path, rawTemplate);

        if (seoResult.redirectTo) {
          return res.redirect(301, seoResult.redirectTo);
        }

        res.status(seoResult.statusCode).set({ 'Content-Type': 'text/html' }).send(seoResult.html);
      } catch (e) {
        res.sendFile(path.resolve(distPath, 'index.html'));
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server: Running on http://0.0.0.0:${PORT} (isProd: ${isProd})`);
  });
}

startServer();
