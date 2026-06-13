import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'node:path';
import fs from 'node:fs';
import dotenv from 'dotenv';
import { publicUrl, SITE_URL, normalizePath } from './src/lib/siteUrl';
import { fileURLToPath } from 'node:url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT || 3000);
const BASE_URL = SITE_URL;
const PRODUCTION_HOSTS = new Set(['bestaiagent.in']);
const PREVIEW_ROBOTS = 'noindex, nofollow, noarchive';

type RouteMeta = {
  path: string;
  canonicalPath?: string;
  title: string;
  description: string;
  h1?: string;
  category?: string;
  categoryLabel?: string;
  slug?: string;
  ogImage?: string;
  ogImageAlt?: string;
  schemas?: unknown[];
  robots?: string;
};

type AnalyzeRequest = {
  content?: string;
  filename?: string;
  mimeType?: string;
};

type RecommendRequest = {
  prompt?: string;
  industry?: string;
  budget?: string;
  languagePreference?: string;
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] || char));

const hostName = (host = '') => host.split(':')[0].toLowerCase();

function isPreviewHost(host = '') {
  const hostname = hostName(host);
  return hostname.endsWith('.vercel.app') && !PRODUCTION_HOSTS.has(hostname);
}

function isWwwProductionHost(host = '') {
  return hostName(host) === 'www.bestaiagent.in';
}

const titleCase = (slug: string) =>
  slug
    .split(/[-/]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

function homePageSchemas() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'BestAIAgent.in',
      url: BASE_URL,
      description:
        'India-focused AI agent comparison and review platform covering coding agents, business agents, voice agents, AI builders, MCP servers, pricing, alternatives, tutorials, and glossary definitions with INR and DPDP context.',
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
      inLanguage: 'en-IN',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      name: 'BestAIAgent.in',
      url: BASE_URL,
      description:
        "India's premier independent AI Agent review authority and benchmark ranking index dashboard.",
      inLanguage: 'en-IN',
      publisher: { '@id': `${BASE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${BASE_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${BASE_URL}/#webpage`,
      name: 'Best AI Agents in India 2026',
      description:
        'Compare the best AI agents in India for coding, business automation, WhatsApp, voice bots, CRM, support, and workflow automation.',
      url: BASE_URL,
      isPartOf: { '@id': `${BASE_URL}/#website` },
      about: { '@id': `${BASE_URL}/#organization` },
      breadcrumb: { '@id': `${BASE_URL}/#breadcrumb` },
      inLanguage: 'en-IN',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${BASE_URL}/#collection`,
      name: 'Best AI Agents Directory — India 2026',
      description:
        'Curated collection of AI agents reviewed for Indian startups, SMEs, developers, and enterprises.',
      url: BASE_URL,
      isPartOf: { '@id': `${BASE_URL}/#website` },
    },
  ];
}

const homeFAQs = [
  { q: 'What is the best AI agent in India?', a: 'The best AI agent depends on your use case. Cursor AI leads for coding, Vapi and Retell are strong for voice automation, Yellow.ai and Intercom fit customer support, while Flowise, Dify, CrewAI, and LangGraph are better for building custom agents.' },
  { q: 'Which AI agent is best for coding?', a: 'Cursor AI is the strongest choice for multi-file IDE coding assistance, with GitHub Copilot as an alternative for inline suggestions. Both support TypeScript, Python, and React workflows.' },
  { q: 'What is the best free AI agent?', a: 'Flowise, Dify Community Edition, and CrewAI offer strong free tiers for Indian teams. Many vendors provide trial periods without credit card requirements for initial testing.' },
  { q: 'Which AI agent is best for Indian businesses?', a: 'Yellow.ai and Intercom lead for customer support automation, Vapi and Retell for voice workflows, and Flowise for internal process automation. Choose based on your integration needs.' },
  { q: 'Which AI agent supports WhatsApp automation?', a: 'Yellow.ai, Wati, and Intercom offer native WhatsApp Business API integration. Ensure compliance with Meta messaging templates and DPDP consent requirements for Indian users.' },
  { q: 'What is the best AI agent builder?', a: 'Flowise, Dify, n8n, and LangGraph are the top builders. Flowise and Dify suit visual no-code workflows, while LangGraph and CrewAI are better for code-first agent pipelines.' },
  { q: 'Are AI agents DPDP compliant?', a: 'DPDP compliance depends on configuration. Review consent flows, data retention policies, cross-border transfer rules, and vendor processing terms. Indian-hosted deployments may reduce risk.' },
  { q: 'How much do AI agents cost in India?', a: 'Free tiers exist for Flowise, Dify, and open-source tools. Paid agents range from ₹1,500 to ₹15,000 per user per month. Enterprise pricing varies by volume and support needs.' },
  { q: 'Is Cursor better than GitHub Copilot?', a: 'Cursor excels at multi-file editing and project-wide refactoring. Copilot is stronger for inline completions and GitHub-native workflows. The best choice depends on your team workflow.' },
  { q: 'What is MCP in AI agents?', a: 'Model Context Protocol (MCP) is a standard for connecting AI agents to external tools, data sources, and APIs. It enables agents to read files, query databases, and call external services safely.' },
  { q: 'Which AI agent is best for startups?', a: 'Start with Flowise or Dify for internal automation, Vapi for voice, and Cursor for engineering. All offer free tiers suitable for early-stage budgets and quick iteration.' },
  { q: 'Which AI agent is best for customer support?', a: 'Yellow.ai, Intercom Fin, and Tidio are strong for Indian customer support. Evaluate WhatsApp integration, Hindi support, pricing transparency, and DPDP compliance.' },
];

function homepageFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFAQs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

function homepageBreadcrumbSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${BASE_URL}/#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
    ],
  };
}

function homepageItemlistSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top AI Agents in India 2026',
    description: 'India-focused editorial rankings of the best AI agents across coding, business, voice, and building categories.',
    numberOfItems: 5,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Cursor AI — Best for coding', url: `${BASE_URL}/tools/cursor-ai` },
      { '@type': 'ListItem', position: 2, name: 'Yellow.ai — Best for Indian business support', url: `${BASE_URL}/tools/yellow-ai` },
      { '@type': 'ListItem', position: 3, name: 'Vapi — Best for voice automation', url: `${BASE_URL}/tools/vapi-ai` },
      { '@type': 'ListItem', position: 4, name: 'Flowise — Best visual builder', url: `${BASE_URL}/tools/flowise` },
      { '@type': 'ListItem', position: 5, name: 'CrewAI — Best open-source agent framework', url: `${BASE_URL}/tools/crewai` },
    ],
  };
}

const defaultHomeMeta: RouteMeta = {
  path: '/',
  title: 'Best AI Agents in India 2026: Compare Tools, Builders, Coding Agents and Business Automation',
  description:
    'Compare the best AI agents in India for coding, business automation, WhatsApp, voice bots, CRM, support, and workflow automation. Independent rankings with INR pricing, DPDP checks, and expert reviews.',
  h1: 'Best AI Agents in India 2026',
  slug: 'home',
  ogImage: '/assets/og/home.png',
  ogImageAlt: 'BestAIAgent.in AI agent category dashboard preview',
  schemas: [
    ...homePageSchemas(),
    homepageFaqSchema(),
    homepageBreadcrumbSchema(),
    homepageItemlistSchema(),
  ],
};

function readRouteMeta(): Record<string, RouteMeta> {
  const candidates = [
    path.resolve(process.cwd(), 'public/route-meta.json'),
    path.resolve(process.cwd(), 'dist/route-meta.json'),
    path.resolve(__dirname, 'route-meta.json'),
  ];
  for (const file of candidates) {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf8')) as Record<string, RouteMeta>;
    }
  }
  return { '/': defaultHomeMeta };
}

let routeMeta = readRouteMeta();
const noindexPaths = new Set(['/search', '/filter', '/admin', '/debug', '/preview']);

routeMeta['/'] = routeMeta['/'] || defaultHomeMeta;

const redirectRoutes = new Map(
  Object.entries(routeMeta)
    .filter(([, meta]) => meta.canonicalPath && meta.canonicalPath !== meta.path)
    .map(([pathName, meta]) => [pathName, meta.canonicalPath || meta.path]),
);

function fallbackMeta(reqPath: string): RouteMeta {
  const isAuthor = reqPath.startsWith('/authors/');
  const isTool = reqPath.startsWith('/tools/');
  const isComparison = reqPath.includes('-vs-');
  const isPricing = reqPath.includes('-pricing');
  const label = titleCase(reqPath);
  const title = isAuthor
    ? `${label} - AI Agent Author | BestAIAgent.in`
    : isTool
      ? `${label.replace(/^Tools /, '')} Review, Pricing and India Fit | BestAIAgent.in`
      : isComparison
        ? `${label} Comparison for India | BestAIAgent.in`
        : isPricing
          ? `${label} in INR: Pricing, GST and Plan Guide | BestAIAgent.in`
          : `${label} | BestAIAgent.in`;

  return {
    path: reqPath,
    slug: reqPath.replace(/^\//, '') || 'home',
    title,
    description: `${label} with India-focused AI agent analysis, INR pricing notes, GST and DPDP considerations, comparisons, FAQs, and implementation guidance.`,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${BASE_URL}${reqPath}#webpage`,
        name: title,
        description: `${label} from BestAIAgent.in.`,
        url: `${BASE_URL}${reqPath}`,
        inLanguage: 'en-IN',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${BASE_URL}${reqPath}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: label, item: `${BASE_URL}${reqPath}` },
        ],
      },
    ],
  };
}

function routeImageMeta(meta: RouteMeta) {
  const pathName = normalizePath(meta.canonicalPath || meta.path || '/');
  const slug = meta.slug || pathName.replace(/^\//, '') || 'home';
  let image = meta.ogImage;
  let alt = meta.ogImageAlt;

  if (!image) {
    if (pathName === '/') image = '/assets/og/home.png';
    else if (pathName.startsWith('/tools/')) image = `/assets/og/${pathName.replace('/tools/', '')}.png`;
    else if (slug.includes('-vs-')) image = `/assets/comparisons/${slug}.png`;
    else if (slug.endsWith('-hub')) image = `/assets/og/${slug}.png`;
    else image = '/assets/brand/og-default.png';
  }

  if (!alt) {
    if (pathName.startsWith('/tools/')) alt = `${titleCase(pathName.replace('/tools/', ''))} review preview image on BestAIAgent.in`;
    else if (slug.includes('-vs-')) alt = `${titleCase(slug)} comparison preview image on BestAIAgent.in`;
    else if (slug.endsWith('-hub')) alt = `${titleCase(slug)} hub preview image on BestAIAgent.in`;
    else alt = 'BestAIAgent.in independent AI agent authority preview image';
  }

  return {
    image: publicUrl(image),
    alt: escapeHtml(alt),
  };
}

function getRouteMeta(reqPath: string): RouteMeta | null {
  const pathName = normalizePath(reqPath);
  if (noindexPaths.has(pathName)) {
    return { ...fallbackMeta(pathName), robots: 'noindex,follow' };
  }
  return routeMeta[pathName] || null;
}

function getRouteMetaForRequest(req: express.Request): RouteMeta | null {
  const meta = getRouteMeta(req.path);
  if (!meta) return null;
  if (normalizePath(req.path) === '/compare' && req.originalUrl.includes('?')) {
    return { ...meta, robots: 'noindex,follow' };
  }
  return meta;
}

function schemaScript(meta: RouteMeta) {
  const schemas = meta.schemas && meta.schemas.length ? meta.schemas : fallbackMeta(meta.path).schemas || [];
  return schemas
    .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`)
    .join('\n  ');
}

function injectMeta(html: string, meta: RouteMeta, options: { noindexPreview?: boolean } = {}) {
  const canonicalPath = meta.canonicalPath || meta.path || '/';
  const canonical = `${BASE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`;
  const title = escapeHtml(meta.title || defaultHomeMeta.title);
  const description = escapeHtml(meta.description || defaultHomeMeta.description);
  const robots = options.noindexPreview ? PREVIEW_ROBOTS : meta.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const imageMeta = routeImageMeta(meta);
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION || process.env.VITE_GOOGLE_SITE_VERIFICATION;
  const bingVerification = process.env.BING_SITE_VERIFICATION || process.env.VITE_BING_SITE_VERIFICATION;
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    googleVerification ? `<meta name="google-site-verification" content="${escapeHtml(googleVerification)}" />` : '',
    bingVerification ? `<meta name="msvalidate.01" content="${escapeHtml(bingVerification)}" />` : '',
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="BestAIAgent.in" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${imageMeta.image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${imageMeta.alt}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@bestaiagentin" />`,
    `<meta name="twitter:creator" content="@arshdeepsingh_" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${imageMeta.image}" />`,
    `<meta name="twitter:image:alt" content="${imageMeta.alt}" />`,
    schemaScript(meta),
  ].filter(Boolean).join('\n  ');

  let out = html
    .replace(/<title>[\s\S]*?<\/title>\s*/g, '')
    .replace(/<meta name="description"[^>]*>\s*/g, '')
    .replace(/<meta name="robots"[^>]*>\s*/g, '')
    .replace(/<meta name="google-site-verification"[^>]*>\s*/g, '')
    .replace(/<meta name="msvalidate\.01"[^>]*>\s*/g, '')
    .replace(/<link rel="canonical"[^>]*>\s*/g, '')
    .replace(/<meta property="og:(?:type|site_name|url|title|description|image|image:width|image:height|image:alt|locale)"[^>]*>\s*/g, '')
    .replace(/<meta name="twitter:(?:card|site|creator|title|description|image|image:alt)"[^>]*>\s*/g, '');

  out = out.replace(/<!-- ROUTE_SEO_START -->[\s\S]*?<!-- ROUTE_SEO_END -->/, `<!-- ROUTE_SEO_START -->\n  ${tags}\n  <!-- ROUTE_SEO_END -->`);
  if (!out.includes('<!-- ROUTE_SEO_START -->')) {
    out = out.replace('</head>', `  <!-- ROUTE_SEO_START -->\n  ${tags}\n  <!-- ROUTE_SEO_END -->\n  </head>`);
  }
  return out;
}

function contentTypeFor(fileName: string) {
  if (fileName.endsWith('.xml')) return fileName === 'feed.xml' ? 'application/rss+xml; charset=utf-8' : 'application/xml; charset=utf-8';
  if (fileName.endsWith('.txt')) return 'text/plain; charset=utf-8';
  if (fileName.endsWith('.json')) return 'application/json; charset=utf-8';
  return 'text/plain; charset=utf-8';
}

function sendGeneratedFile(res: express.Response, fileName: string) {
  const candidates = [
    path.resolve(process.cwd(), 'public', fileName),
    path.resolve(process.cwd(), 'dist', fileName),
    path.resolve(__dirname, fileName),
  ];
  const file = candidates.find((candidate) => fs.existsSync(candidate));
  if (!file) return res.status(404).send('Not found');
  res.setHeader('Content-Type', contentTypeFor(fileName));
  return res.send(fs.readFileSync(file, 'utf8'));
}

function simulatedRecommendation(prompt: string) {
  const lower = prompt.toLowerCase();
  if (lower.includes('code') || lower.includes('developer') || lower.includes('frontend') || lower.includes('backend')) {
    return `### Recommended AI Coding Stack\n\n1. **Cursor AI** - Best for multi-file repository work, React/TypeScript refactors, and fast prototyping. Estimated Pro pricing is typically around ₹1,700/month before tax depending on exchange rate.\n2. **GitHub Copilot** - Best for GitHub-first teams that want inline IDE suggestions with lighter workflow change.\n\n**India checklist:** confirm card billing, GST invoice treatment, privacy mode, repository exclusions, and DPDP-safe handling of client code.`;
  }
  if (lower.includes('whatsapp') || lower.includes('voice') || lower.includes('call') || lower.includes('support')) {
    return `### Recommended Customer Automation Stack\n\n1. **Vapi** - Best for voice-agent prototypes, appointment booking, and call summaries.\n2. **Yellow.ai** - Best for enterprise WhatsApp and omnichannel support with India-market procurement fit.\n\n**India checklist:** test Hindi/Hinglish calls, WhatsApp opt-ins, Razorpay or UPI payment handoff, escalation rules, and DPDP Act 2023 consent language.`;
  }
  return `### Recommended AI Agent Stack\n\n1. **Flowise** - Best for visual RAG and workflow prototypes that can be self-hosted.\n2. **n8n** - Best for automation-heavy workflows across CRM, sheets, email, and webhooks.\n3. **CrewAI** - Best for Python teams building role-based multi-agent workflows.\n\n**India checklist:** estimate INR usage, GST treatment, hosting region, DPDP exposure, and support ownership before scaling.`;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));
  app.use((req, res, next) => {
    if (isWwwProductionHost(req.headers.host)) {
      const pathName = normalizePath(req.path);
      const query = req.originalUrl.includes('?') ? req.originalUrl.slice(req.originalUrl.indexOf('?')) : '';
      return res.redirect(308, `${BASE_URL}${pathName}${query}`);
    }
    if (isPreviewHost(req.headers.host)) {
      res.setHeader('X-Robots-Tag', PREVIEW_ROBOTS);
    }
    return next();
  });

  app.use((req, res, next) => {
    const pathName = normalizePath(req.path);
    if (req.path !== pathName) {
      const query = req.originalUrl.includes('?') ? req.originalUrl.slice(req.originalUrl.indexOf('?')) : '';
      return res.redirect(301, `${pathName}${query}`);
    }
    return next();
  });

  app.use((req, res, next) => {
    const pathName = normalizePath(req.path);
    const target = redirectRoutes.get(pathName);
    if (target) {
      return res.redirect(301, `${BASE_URL}${target}`);
    }
    return next();
  });

  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey && apiKey !== 'MY_GEMINI_API_KEY' ? new GoogleGenAI({ apiKey }) : null;

  const writeRateLimits = new Map<string, { count: number; firstSeen: number }>();
  const RATE_LIMIT_WINDOW_MS = 60_000;
  const RATE_LIMIT_MAX = 10;

  function rateLimit(req: express.Request, res: express.Response, next: express.NextFunction) {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const entry = writeRateLimits.get(ip);
    if (!entry || now - entry.firstSeen > RATE_LIMIT_WINDOW_MS) {
      writeRateLimits.set(ip, { count: 1, firstSeen: now });
      return next();
    }
    entry.count += 1;
    if (entry.count > RATE_LIMIT_MAX) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }
    next();
  }

  function validateEmail(email?: string) {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function hasConsent(req: express.Request) {
    return Boolean(req.body && typeof req.body.consent === 'boolean' && req.body.consent === true);
  }

  function isHoneypotTriggered(req: express.Request) {
    const honeypotKeys = ['website', 'hp', 'honeypot', 'url_hp'];
    const body = (req.body || {}) as Record<string, unknown>;
    return honeypotKeys.some((key) => typeof body[key] === 'string' && (body[key] as string).trim().length > 0);
  }

  function safeWriteHandler<T extends Record<string, unknown>>(
    req: express.Request,
    res: express.Response,
    validate: (body: T) => { ok: boolean; status?: number; error?: string }
  ) {
    try {
      const body = req.body as T;
      const result = validate(body);
      if (!result.ok) {
        return res.status(result.status || 400).json({ error: result.error || 'Invalid request.' });
      }
      return res.json({ success: true });
    } catch {
      return res.status(500).json({ error: 'Request failed. Please try again later.' });
    }
  }

  app.get('/', (req, res, next) => {
    const view = typeof req.query.view === 'string' ? req.query.view : '';
    const article = typeof req.query.article === 'string' ? req.query.article : '';
    const product = typeof req.query.product === 'string' ? req.query.product : '';
    const silo = typeof req.query.silo === 'string' ? req.query.silo : '';
    if (product) return res.redirect(301, `/tools/${product}`);
    if (article) return res.redirect(301, `/${article}`);
    if (view === 'article' && article) return res.redirect(301, `/${article}`);
    if (view === 'product' && product) return res.redirect(301, `/tools/${product}`);
    if (view === 'silo-pillar' && silo) {
      const siloMap: Record<string, string> = {
        reviews: '/best-ai-agent',
        builders: '/ai-agent-builders-hub',
        'coding-agents': '/coding-agents-hub',
        frameworks: '/ai-agent-builders-hub',
        business: '/business-ai-hub',
        research: '/ai-agent-trends',
        mcp: '/mcp-hub',
      };
      return res.redirect(301, siloMap[silo] || '/best-ai-agent');
    }
    return next();
  });

  app.get([
    '/robots.txt',
    '/sitemap.xml',
    '/ai-agent-sitemap.xml',
    '/tool-sitemap.xml',
    '/comparison-sitemap.xml',
    '/pricing-sitemap.xml',
    '/alternatives-sitemap.xml',
    '/tutorials-sitemap.xml',
    '/glossary-sitemap.xml',
    '/mcp-sitemap.xml',
    '/author-sitemap.xml',
    '/hub-sitemap.xml',
    '/calculators-sitemap.xml',
    '/image-sitemap.xml',
    '/feed.xml',
    '/llms.txt',
    '/contentIndex.json',
    '/content-index.json',
    '/entity-index.json',
    '/knowledge-graph.json',
    '/tool-relationships.json',
    '/route-meta.json',
  ], (req, res) => sendGeneratedFile(res, req.path.slice(1)));

  app.post('/api/analyze-doc', async (req, res) => {
    try {
      const { content = '', filename = 'uploaded document', mimeType = 'text/plain' } = req.body as AnalyzeRequest;
      if (!content.trim()) return res.status(400).json({ error: 'Content payload is required for review.' });
      if (ai) {
        const response = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: `Audit this document for AI agent automation opportunities in India.\nFilename: ${filename}\nMime type: ${mimeType}\n\n${content.slice(0, 5000)}`,
        });
        return res.json({ text: response.text });
      }
      return res.json({
        text: `### AI Agent Capability Review\n\n**Document analyzed:** \`${filename}\`\n\nThis document appears suitable for an AI workflow audit. Start by classifying the workflow, identifying personal data, and mapping repetitive tasks to a bounded agent.\n\n**Recommended stack:** Flowise or n8n for workflow automation, Cursor for engineering documents, and Vapi or Yellow.ai for voice/WhatsApp support workflows.\n\n**India readiness checklist:** estimate INR cost, review GST invoice handling, document DPDP Act 2023 purpose limitation, and test Hindi/Hinglish examples before production.`,
      });
    } catch {
      return res.status(500).json({ error: 'Request failed. Please try again later.' });
    }
  });

  app.post('/api/recommend', async (req, res) => {
    try {
      const { prompt = '', industry, budget, languagePreference } = req.body as RecommendRequest;
      if (!prompt.trim()) return res.status(400).json({ error: 'Prompt description is required.' });
      if (ai) {
        const response = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: `Recommend 2-3 AI agents for an Indian buyer.\nQuery: ${prompt}\nIndustry: ${industry || 'Unspecified'}\nBudget: ${budget || 'Unspecified'}\nLanguage: ${languagePreference || 'English/Hinglish'}\nInclude INR estimates, DPDP notes, GST/procurement notes, and first implementation step.`,
        });
        return res.json({ text: response.text });
      }
      return res.json({ text: simulatedRecommendation(prompt) });
    } catch {
      return res.status(500).json({ error: 'Request failed. Please try again later.' });
    }
  });

  app.post('/api/submit-lead', rateLimit, (req, res) => {
    try {
      const { name, company, phone, desc } = req.body as Record<string, unknown>;
      if (typeof name !== 'string' || name.trim().length > 500) {
        return res.status(400).json({ error: 'Name is required and must be under 500 characters.' });
      }
      if (typeof company !== 'string' || company.trim().length > 500) {
        return res.status(400).json({ error: 'Company is required and must be under 500 characters.' });
      }
      if (!hasConsent(req)) {
        return res.status(400).json({ error: 'Consent is required before submitting.' });
      }
      if (isHoneypotTriggered(req)) {
        return res.status(400).json({ error: 'Invalid submission.' });
      }
      console.log('Lead captured:', { name, company, phone: phone ? '<redacted>' : '', desc: typeof desc === 'string' ? desc.slice(0, 200) : '', consent: hasConsent(req) });
      return res.json({ success: true, message: 'Lead captured. Our automation advisor will reach out within 24 business hours.' });
    } catch {
      return res.status(500).json({ error: 'Request failed. Please try again later.' });
    }
  });

  app.post('/api/submit-tool', rateLimit, (req, res) => {
    try {
      const { name, url, category, description, email } = req.body as Record<string, unknown>;
      if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 500) {
        return res.status(400).json({ error: 'Tool name is required.' });
      }
      if (typeof url !== 'string' || url.trim().length === 0) {
        return res.status(400).json({ error: 'Tool URL is required.' });
      }
      if (typeof category !== 'string' || category.trim().length === 0) {
        return res.status(400).json({ error: 'Category is required.' });
      }
      if (typeof description !== 'string' || description.trim().length < 10 || description.trim().length > 2000) {
        return res.status(400).json({ error: 'Description must be between 10 and 2000 characters.' });
      }
      if (typeof email === 'string' && !validateEmail(email)) {
        return res.status(400).json({ error: 'A valid email is required.' });
      }
      if (isHoneypotTriggered(req)) {
        return res.status(400).json({ error: 'Invalid submission.' });
      }
      console.log('Tool submission received:', { name, url, category, description: typeof description === 'string' ? description.slice(0, 200) : '', email: email ? '<redacted>' : '', consent: hasConsent(req) });
      return res.json({ success: true, message: 'Tool submitted for editorial review.' });
    } catch {
      return res.status(500).json({ error: 'Request failed. Please try again later.' });
    }
  });

  app.post('/api/subscribe', rateLimit, (req, res) => {
    try {
      const { email } = req.body as { email?: string };
      if (!validateEmail(email)) {
        return res.status(400).json({ error: 'A valid email address is required.' });
      }
      if (!hasConsent(req)) {
        return res.status(400).json({ error: 'Consent is required before subscribing.' });
      }
      if (isHoneypotTriggered(req)) {
        return res.status(400).json({ error: 'Invalid request.' });
      }
      console.log('New subscription:', { email: email ? '<redacted>' : '', consent: hasConsent(req) });
      return res.json({ success: true, message: 'Subscribed to BestAIAgent.in updates.' });
    } catch {
      return res.status(500).json({ error: 'Request failed. Please try again later.' });
    }
  });

  if (!isProd) {
    app.use(express.static(path.resolve(process.cwd(), 'public'), { index: false }));
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'custom' });
    app.use(vite.middlewares);
    app.get('*', async (req, res, next) => {
      const pathName = normalizePath(req.path);
      if (!routeMeta[pathName] && !noindexPaths.has(pathName)) {
        return res.status(404).send('Not found');
      }
      try {
        const template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf8');
        const meta = getRouteMetaForRequest(req);
        if (!meta) {
          return res.status(404).send('Not found');
        }
        const html = await vite.transformIndexHtml(req.originalUrl, injectMeta(template, meta, { noindexPreview: isPreviewHost(req.headers.host) }));
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).send(html);
      } catch (error) {
        vite.ssrFixStacktrace(error as Error);
        next(error);
      }
    });
  } else {
    const distPath = path.resolve(process.cwd(), 'dist', 'client');
    app.use(express.static(path.resolve(process.cwd(), 'public'), { index: false }));
    app.use(express.static(distPath, { index: false }));
    app.get('*', (req, res) => {
      const pathName = normalizePath(req.path);
      if (!routeMeta[pathName] && !noindexPaths.has(pathName)) return res.status(404).send('Not found');
      const htmlPath = path.join(distPath, 'index.html');
      if (!fs.existsSync(htmlPath)) return res.status(404).send('Not found');
      const meta = getRouteMetaForRequest(req);
      if (!meta) return res.status(404).send('Not found');
      const html = injectMeta(fs.readFileSync(htmlPath, 'utf8'), meta, { noindexPreview: isPreviewHost(req.headers.host) });
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.send(html);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT} (isProd: ${isProd})`);
  });
}

startServer();
