import fs from "node:fs";
import path from "node:path";
import { AUTHORS, HUBS, PUBLIC_DIR, SITE_URL, TODAY, buildRouteMeta, ensurePublicDir, titleCase, xmlEscape } from "./seo_utils.js";

ensurePublicDir();

const normalizeRelatedSlug = (slug) => slug.replace(/^\//, "").replace(/\/$/, "");

const routeMap = buildRouteMeta();
const routes = Object.values(routeMap)
  .filter((route, index, arr) => route.path && route.path === (route.canonicalPath || route.path) && arr.findIndex((other) => other.path === route.path) === index)
  .sort((a, b) => a.path.localeCompare(b.path));
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "7f4f2d728f93411eb9a03bestaiagentin";


function write(name, content) {
  fs.writeFileSync(path.join(PUBLIC_DIR, name), content.endsWith("\n") ? content : `${content}\n`);
}

function urlset(entries) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map((entry) => [
      "  <url>",
      `    <loc>${SITE_URL}${xmlEscape(entry.path)}</loc>`,
      `    <lastmod>${entry.lastmod || TODAY}</lastmod>`,
      `    <changefreq>${entry.changefreq || "weekly"}</changefreq>`,
      `    <priority>${entry.priority || "0.80"}</priority>`,
      "  </url>",
    ].join("\n")),
    "</urlset>",
  ].join("\n");
}

function walkPublicAssets(dir = path.join(PUBLIC_DIR, "assets")) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkPublicAssets(full);
    return /\.(svg|png|webp|avif|jpe?g)$/i.test(entry.name) ? [full] : [];
  });
}

function imageSitemap() {
  const imagePaths = walkPublicAssets()
    .map((file) => `/${path.relative(PUBLIC_DIR, file).split(path.sep).join("/")}`)
    .sort();
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    "  <url>",
    `    <loc>${SITE_URL}/</loc>`,
    ...imagePaths.map((imagePath) => `    <image:image><image:loc>${SITE_URL}${xmlEscape(imagePath)}</image:loc></image:image>`),
    "  </url>",
    "</urlset>",
  ].join("\n");
}

const categoryMatches = (route, categories) => categories.includes(route.category) || categories.includes(route.categoryLabel);

const sitemapGroups = {
  "ai-agent-sitemap.xml": routes.filter((r) => categoryMatches(r, ["core", "pillars", "guides", "research", "frameworks", "buyers-guides", "reddit", "entity", "india-geo", "directories", "AI Agent Core", "AI Frameworks & Tools", "Buyer Guides", "Reddit & Community Intent", "Entity Pages", "India GEO Targeting", "Directories", "Open Source AI Agents", "Security & Compliance", "Industry AI Agents", "Longtail Engine", "Long-tail Guides", "Research & Benchmarks", "Courses & Certifications", "Pricing Intelligence", "Voice AI Agents", "Business AI Agents", "AI Agent Builders", "Coding Agents", "MCP Servers", "Glossary", "Tutorials", "Alternatives", "Free AI Agents"])),
  "tool-sitemap.xml": routes.filter((r) => categoryMatches(r, ["reviews", "tools", "Tool Reviews", "Tool Profiles"])),
  "comparison-sitemap.xml": routes.filter((r) => r.category === "comparisons" || r.category === "Comparisons"),
  "pricing-sitemap.xml": routes.filter((r) => categoryMatches(r, ["pricing", "Pricing", "Pricing Intelligence"])),
  "alternatives-sitemap.xml": routes.filter((r) => categoryMatches(r, ["alternatives", "Alternatives"])),
  "tutorials-sitemap.xml": routes.filter((r) => categoryMatches(r, ["tutorials", "courses", "Tutorials", "Courses", "Courses & Certifications"])),
  "glossary-sitemap.xml": routes.filter((r) => categoryMatches(r, ["glossary", "Glossary"])),
  "mcp-sitemap.xml": routes.filter((r) => categoryMatches(r, ["mcp", "MCP", "MCP Servers"])),
  "author-sitemap.xml": routes.filter((r) => categoryMatches(r, ["authors", "Authors"])),
  "hub-sitemap.xml": routes.filter((r) => categoryMatches(r, ["hubs", "editorial", "home", "Hubs", "Editorial", "Home"])),
  "calculators-sitemap.xml": routes.filter((r) => categoryMatches(r, ["calculators", "Calculators"]) || /calculator/i.test(r.path)),
};

for (const [name, entries] of Object.entries(sitemapGroups)) {
  write(name, urlset(entries));
}

write("sitemap.xml", [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...Object.keys(sitemapGroups).map((name) => [
    "  <sitemap>",
    `    <loc>${SITE_URL}/${name}</loc>`,
    `    <lastmod>${TODAY}</lastmod>`,
    "  </sitemap>",
  ].join("\n")),
  "  <sitemap>",
  `    <loc>${SITE_URL}/image-sitemap.xml</loc>`,
  `    <lastmod>${TODAY}</lastmod>`,
  "  </sitemap>",
  "</sitemapindex>",
].join("\n"));

write("image-sitemap.xml", imageSitemap());

write("robots.txt", [
  "# BestAIAgent.in robots.txt",
  `# Updated: ${TODAY}`,
  "",
  "User-agent: *",
  "Allow: /",
  "Disallow: /api/",
  "",
  "User-agent: Googlebot",
  "Allow: /",
  "User-agent: Bingbot",
  "Allow: /",
  "User-agent: GPTBot",
  "Allow: /",
  "User-agent: ChatGPT-User",
  "Allow: /",
  "User-agent: ClaudeBot",
  "Allow: /",
  "User-agent: PerplexityBot",
  "Allow: /",
  "User-agent: Google-Extended",
  "Allow: /",
  "User-agent: OAI-SearchBot",
  "Allow: /",
  "User-agent: Applebot",
  "Allow: /",
  "User-agent: DuckDuckBot",
  "Allow: /",
  "User-agent: CCBot",
  "Allow: /",
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
  `Sitemap: ${SITE_URL}/ai-agent-sitemap.xml`,
  `Sitemap: ${SITE_URL}/tool-sitemap.xml`,
  `Sitemap: ${SITE_URL}/comparison-sitemap.xml`,
  `Sitemap: ${SITE_URL}/pricing-sitemap.xml`,
  `Sitemap: ${SITE_URL}/alternatives-sitemap.xml`,
  `Sitemap: ${SITE_URL}/tutorials-sitemap.xml`,
  `Sitemap: ${SITE_URL}/glossary-sitemap.xml`,
  `Sitemap: ${SITE_URL}/mcp-sitemap.xml`,
  `Sitemap: ${SITE_URL}/author-sitemap.xml`,
  `Sitemap: ${SITE_URL}/hub-sitemap.xml`,
  `Sitemap: ${SITE_URL}/calculators-sitemap.xml`,
  `Sitemap: ${SITE_URL}/image-sitemap.xml`,
  `Sitemap: ${SITE_URL}/feed.xml`,
  `Sitemap: ${SITE_URL}/llms.txt`,
].join("\n"));

write("indexnow-key.txt", INDEXNOW_KEY);
write(`${INDEXNOW_KEY}.txt`, INDEXNOW_KEY);

const section = (title, entries) => [`## ${title}`, ...entries.map((entry) => {
  const label = String(entry.h1 || entry.title).replace(/\[[^\]]+\]\(([^)]+)\)/g, "").replace(/\s+/g, " ").trim();
  const description = String(entry.description || "").replace(/\[[^\]]+\]\(([^)]+)\)/g, (_match, url) => url).replace(/\s+/g, " ").trim().slice(0, 260);
  return `- [${label}](${SITE_URL}${entry.path}) - ${description}`;
}), ""].join("\n");

write("llms.txt", [
  "# BestAIAgent.in - AI Agent Authority for India",
  `Updated: ${TODAY}`,
  `Site: ${SITE_URL}`,
  "",
  "## Site Overview",
  "India-focused AI agent authority. Reviews, comparisons, pricing, tutorials, and glossary definitions for AI agents, coding agents, voice agents, builders, and MCP servers. Written for Indian startups, SMEs, developers, procurement teams, and enterprises.",
  "",
  "## Entity Definitions",
  "",
  "### AI Agent",
  "Definition: Software system that perceives, reasons, and acts autonomously to accomplish goals. Category: Core. Primary tools: Cursor AI, GitHub Copilot, Vapi, Yellow.ai, Flowise. Pages: /best-ai-agent, /tools/cursor-ai, /tools/github-copilot, /tools/vapi-ai",
  "",
  "### MCP (Model Context Protocol)",
  "Definition: Open protocol for connecting AI systems to tools, data, and external context. Standardized way for agents to access files, APIs, databases safely. Category: Infrastructure. Key tools: Claude, Cursor, Flowise. Pages: /what-is-mcp, /mcp-hub, /best-mcp-servers",
  "",
  "### RAG (Retrieval-Augmented Generation)",
  "Definition: Technique combining retrieval of information with generative AI to produce accurate, sourced answers. Category: Architecture. Key tools: LlamaIndex, LangChain. Pages: /what-is-rag, /tools/llamaindex, /tools/langchain",
  "",
  "### CrewAI",
  "Definition: Open-source multi-agent framework for Python. Role-based agent orchestration with memory and tool integration. Category: Framework. Key tools: CrewAI. Pages: /tools/crewai, /what-is-crewai, /crewai-vs-langgraph",
  "",
  "### LangGraph",
  "Definition: Graph-based agent orchestration framework. State machines for complex multi-agent workflows. Category: Framework. Key tools: LangGraph. Pages: /tools/langgraph, /what-is-langgraph, /langgraph-vs-crewai",
  "",
  "### Cursor AI",
  "Definition: AI-powered code editor forked from VS Code. Repository context indexing, Composer multi-file editing, Privacy Mode. Category: Coding Agent. Score: 9.6/10. Price: ₹1,680/month. Pages: /tools/cursor-ai, /cursor-pricing, /how-to-use-cursor-ai",
  "",
  "### Vapi AI",
  "Definition: Voice AI backend pipeline. Real-time voice conversations with sub-500ms latency, Hinglish support, Twilio integration. Category: Voice Agent. Score: 9.5/10. Price: $0.15/min. Pages: /tools/vapi-ai, /vapi-pricing, /how-to-use-vapi",
  "",
  "### Flowise",
  "Definition: Open-source visual AI agent builder. Drag-and-drop nodes for LLM workflows, RAG, and API integrations. Category: Builder. Score: 9.1/10. Price: Free self-hosted. Pages: /tools/flowise, /flowise-pricing, /how-to-build-ai-agent-with-flowise",
  "",
  "### Yellow.ai",
  "Definition: Enterprise conversational AI platform. WhatsApp Business API, UPI checkout, 135+ language support, DPDP compliant. Category: Business Agent. Score: 9.3/10. Price: Custom enterprise. Pages: /tools/yellow-ai, /yellow-ai-pricing, /how-to-use-yellow-ai",
  "",
  "## Hub Index",
  "",
  "### Coding AI Agents Hub",
  "Path: /coding-agents-hub - Developer-focused AI coding agents, IDE copilots, pricing guides, comparisons, and setup tutorials for Indian engineering teams.",
  "### Business AI Agents Hub",
  "Path: /business-ai-hub - AI agents for Indian SMEs, startups, agencies, CRM teams, sales teams, customer support, WhatsApp workflows, and enterprise automation.",
  "### AI Agent Builders Hub",
  "Path: /ai-agent-builders-hub - No-code, low-code, and developer platforms for building AI agents, RAG workflows, automations, and multi-agent systems.",
  "### Voice AI Agents Hub",
  "Path: /voice-ai-hub - AI voice agents for Indian call centers, appointment booking, outbound calling, support workflows, Hinglish calls, and DPDP-aware deployments.",
  "### MCP Hub",
  "Path: /mcp-hub - Model Context Protocol explainers, MCP server directories, security guidance, API comparisons, and implementation tutorials.",
  "",
  "## Tool Reviews (Scored)",
  "",
  "- Cursor AI: 9.6/10 - ₹1,680/month - Privacy Mode - /tools/cursor-ai",
  "- CrewAI: 9.4/10 - Free open-source - Python multi-agent - /tools/crewai",
  "- Vapi AI: 9.5/10 - $0.15/min - Hinglish support - /tools/vapi-ai",
  "- Yellow.ai: 9.3/10 - Enterprise custom - WhatsApp/UPI - /tools/yellow-ai",
  "- Flowise: 9.1/10 - Free self-hosted - Visual builder - /tools/flowise",
  "- GitHub Copilot: 9.2/10 - ₹1,300/month - GitHub native - /tools/github-copilot",
  "- Retell AI: 9.0/10 - $0.20/min - Telephony - /tools/retell-ai",
  "- LangGraph: 8.9/10 - Free open-source - Graph-based - /tools/langgraph",
  "- AutoGen: 8.8/10 - Free open-source - Microsoft - /tools/autogen",
  "- n8n: 8.7/10 - Free open-source - Workflow - /tools/n8n",
  "",
  "## India-Specific Considerations",
  "Pricing Model: All tools reviewed with INR estimates + GST invoice notes",
  "Compliance: DPDP Act 2023 privacy checks on all reviews",
  "Language: Hindi, Hinglish, Tamil, Telugu, Bengali support documented",
  "Payment: UPI, Razorpay, Indian payment method support",
  "Hosting: AWS Mumbai, DigitalOcean Bangalore, local data residency options",
  "",
  "## Machine-Readable Files",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
  `Content Index: ${SITE_URL}/content-index.json`,
  `Entity Index: ${SITE_URL}/entity-index.json`,
  `Knowledge Graph: ${SITE_URL}/knowledge-graph.json`,
  `Tool Relationships: ${SITE_URL}/tool-relationships.json`,
  "",
  `Last verified: ${TODAY}`,
].join("\n"));

const importantEntities = [
  "AI Agent",
  "AI Coding Agent",
  "AI Voice Agent",
  "AI Agent Builder",
  "MCP",
  "LangGraph",
  "CrewAI",
  "Cursor",
  "GitHub Copilot",
  "Claude Code",
  "Vapi",
  "Retell",
  "Flowise",
  "Dify",
  "AutoGen",
  "Yellow.ai",
  "Intercom",
  "n8n",
  "Make",
  "Zapier",
  "ElevenLabs",
  "Bland.ai",
  "Windsurf",
  "Replit AI",
  "Tabnine",
  "Amazon CodeWhisperer",
  "OpenAI Codex",
  "Qodo",
  "LangChain",
  "LlamaIndex",
  "Vercel AI SDK",
  "ChatGPT",
  "Claude",
  "Google Gemini",
  "Perplexity",
];

const bySlug = Object.fromEntries(routes.map((route) => [route.slug, route]));
const validRoutePaths = new Set(routes.map((route) => route.path));
const validSlugSet = new Set(routes.map((route) => route.slug));
const routeForSlug = (slug) => bySlug[slug]?.path || (validRoutePaths.has(`/${slug}`) ? `/${slug}` : undefined);
const toolRoutes = routes.filter((route) => ["reviews", "tools"].includes(route.category));
const pricingRoutes = routes.filter((route) => route.category === "pricing");
const comparisonRoutes = routes.filter((route) => route.category === "comparisons");
const alternativeRoutes = routes.filter((route) => route.category === "alternatives");
const tutorialRoutes = routes.filter((route) => route.category === "tutorials");

const contentIndex = routes.map((route) => ({
  path: route.path,
  canonical: `${SITE_URL}${route.path === "/" ? "/" : route.path}`,
  slug: route.slug,
  title: route.title,
  description: route.description,
  h1: route.h1,
  category: route.category,
  categoryLabel: route.categoryLabel,
  parentHub:
    route.category === "pricing" ? "/pricing-hub" :
    route.category === "alternatives" ? "/alternatives-hub" :
    route.category === "tutorials" || route.category === "courses" ? "/tutorials-hub" :
    route.category === "glossary" ? "/glossary-hub" :
    route.category === "mcp" ? "/mcp-hub" :
    route.category === "free" ? "/free-ai-agents-hub" :
    route.category === "reviews" || route.category === "tools" ? "/best-ai-agent" :
    route.category === "comparisons" ? "/best-ai-agent" :
    route.category === "hubs" ? "/" :
    "/best-ai-agent",
  lastmod: route.lastmod || TODAY,
  lastUpdated: route.lastUpdated || route.lastmod || TODAY,
  lastReviewed: route.lastReviewed || TODAY,
  nextReview: route.nextReview || "2026-09-11",
  lastVerified: route.lastVerified || TODAY,
  verificationStatus: route.verificationStatus || "mapped",
  confidenceLevel: route.confidenceLevel || 75,
  sourcesUsed: route.sourcesUsed || ["editorial_review"],
  editorialReviewDate: route.editorialReviewDate || TODAY,
  changefreq: route.changefreq,
  priority: route.priority,
  schemaTypes: route.schemaTypes || [],
  relatedPages: (route.related || [])
    .map((slug) => normalizeRelatedSlug(slug))
    .filter((slug) => validSlugSet.has(slug) || validRoutePaths.has(`/${slug}`))
    .slice(0, 24),
  wordCount: route.words,
  source: route.source,
}));

const findRoutes = (needle) => {
  const normalized = needle.toLowerCase().replace(/\s+/g, "-");
  return routes
    .filter((route) => `${route.slug} ${route.title} ${route.description}`.toLowerCase().includes(normalized) || `${route.title} ${route.description}`.toLowerCase().includes(needle.toLowerCase()))
    .slice(0, 20)
    .map((route) => route.path);
};

const entityIndex = importantEntities.map((entity) => ({
  entity,
  slug: entity.toLowerCase().replace(/\+/g, "plus").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  definition: `${entity} is tracked as a BestAIAgent.in authority entity with related definitions, reviews, pricing pages, comparisons, alternatives, tutorials, and implementation context where available.`,
  pages: findRoutes(entity),
  relatedConcepts: importantEntities.filter((other) => other !== entity).slice(0, 6),
}));

const relationships = [];
for (const tool of toolRoutes) {
  const base = tool.slug.replace(/-review$/, "").replace(/-ai$/, "");
  const relatedPricing = pricingRoutes.filter((route) => route.slug.includes(base)).map((route) => route.path);
  const relatedComparisons = comparisonRoutes.filter((route) => route.slug.includes(base)).map((route) => route.path);
  const relatedAlternatives = alternativeRoutes.filter((route) => route.slug.includes(base)).map((route) => route.path);
  const relatedTutorials = tutorialRoutes.filter((route) => route.slug.includes(base)).map((route) => route.path);
  relationships.push({
    tool: tool.entityName || titleCase(tool.slug),
    review: tool.path,
    category: tool.categoryLabel,
    pricing: relatedPricing,
    competitors: relatedComparisons,
    alternatives: relatedAlternatives,
    tutorials: relatedTutorials,
  });
}

const graphNodes = [
  ...routes.map((route) => ({ id: route.path, type: route.category, label: route.h1 || route.title, url: `${SITE_URL}${route.path === "/" ? "" : route.path}` })),
  ...importantEntities.map((entity) => ({ id: `entity:${entity}`, type: "entity", label: entity })),
];
const graphEdges = [
  ...contentIndex.map((entry) => ({ from: entry.path, to: entry.parentHub, relation: "parentHub" })).filter((edge) => edge.from !== edge.to),
  ...relationships.flatMap((rel) => [
    { from: rel.review, to: rel.category, relation: "category" },
    ...rel.pricing.map((to) => ({ from: rel.review, to, relation: "pricing" })),
    ...rel.competitors.map((to) => ({ from: rel.review, to, relation: "competitor" })),
    ...rel.alternatives.map((to) => ({ from: rel.review, to, relation: "alternative" })),
    ...rel.tutorials.map((to) => ({ from: rel.review, to, relation: "tutorial" })),
  ]),
  ...entityIndex.flatMap((entity) => entity.pages.map((to) => ({ from: `entity:${entity.entity}`, to, relation: "mentionedOn" }))),
];

write("contentIndex.json", JSON.stringify(contentIndex, null, 2));
write("content-index.json", JSON.stringify(contentIndex, null, 2));
write("entity-index.json", JSON.stringify(entityIndex, null, 2));
write("tool-relationships.json", JSON.stringify(relationships, null, 2));
write("knowledge-graph.json", JSON.stringify({ generatedAt: TODAY, nodes: graphNodes, edges: graphEdges }, null, 2));
write("route-meta.json", JSON.stringify(routeMap, null, 2));

console.log(JSON.stringify({
  routeCount: routes.length,
  sitemapCount: Object.keys(sitemapGroups).length,
  contentIndexCount: contentIndex.length,
  entityCount: entityIndex.length,
  publicDir: path.relative(process.cwd(), PUBLIC_DIR),
}, null, 2));
