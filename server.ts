import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { generateRssFeedXml } from './src/utils/rss-feed-generator.js';
import { generateMasterSitemapXml, generateSegmentedSitemapXml } from './src/data/sitemapGenerator.js';
import { resolveRoute } from './src/routing/routeResolver.js';
import { renderSsrBody } from './src/routing/renderSsrBody.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';
const PORT = 3000;

interface SeoRenderResult {
  statusCode: number;
  html: string;
  redirectTo?: string;
}

function renderHtmlWithSeo(urlPath: string, templateHtml: string): SeoRenderResult {
  try {
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
      const canonical = `https://bestaiagent.in${urlPath}`;
      
      const headMeta = `
        <title>${title}</title>
        <meta name="description" content="${description}">
        <meta name="robots" content="noindex, follow">
        <link rel="canonical" href="${canonical}">
      `;

      const ssrBody = renderSsrBody(null, urlPath);

      let result = templateHtml;
      if (result.includes('<title>')) {
        result = result.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
      }
      result = result.replace('</head>', `${headMeta}\n</head>`);

      if (result.includes('<div id="root"></div>')) {
        result = result.replace('<div id="root"></div>', ssrBody);
      } else if (result.includes('<div id="root">')) {
        result = result.replace(/<div id="root">[\s\S]*?<\/div>/, ssrBody);
      }

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

    const ssrBody = renderSsrBody(route, urlPath);

    let result = templateHtml;
    if (result.includes('<title>')) {
      result = result.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    }
    result = result.replace('</head>', `${headMeta}\n</head>`);

    if (result.includes('<div id="root"></div>')) {
      result = result.replace('<div id="root"></div>', ssrBody);
    } else if (result.includes('<div id="root">')) {
      result = result.replace(/<div id="root">[\s\S]*?<\/div>/, ssrBody);
    }

    return { statusCode: 200, html: result };
  } catch (err) {
    console.error("Error generating SEO HTML:", err);
    return { statusCode: 200, html: templateHtml };
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

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

  // API Endpoints
  app.post('/api/analyze-doc', async (req, res) => {
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

  app.post('/api/submit-lead', (req, res) => {
    res.json({ success: true, message: "Lead captured successfully." });
  });

  app.post('/api/submit-tool', (req, res) => {
    res.json({ success: true, message: "Tool submitted successfully." });
  });

  app.post('/api/subscribe', (req, res) => {
    res.json({ success: true, message: "Subscribed successfully." });
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
