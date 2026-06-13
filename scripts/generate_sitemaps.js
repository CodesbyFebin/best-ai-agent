import fs from "node:fs";
import path from "node:path";
import { AUTHORS, HUBS, PUBLIC_DIR, SITE_URL, TODAY, buildRouteMeta, ensurePublicDir, titleCase, xmlEscape } from "./seo_utils.js";

ensurePublicDir();

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

const sitemapGroups = {
  "ai-agent-sitemap.xml": routes.filter((r) => ["core", "pillars", "guides", "research", "buyers-guides", "reddit", "entity", "india-geo", "directories", "Buyer Guides", "Reddit & Community Intent", "Entity Pages", "India GEO Targeting", "Directories", "Open Source AI Agents", "Security & Compliance", "Industry AI Agents", "Longtail Engine", "Long-tail Guides", "Research & Benchmarks", "Courses & Certifications", "Pricing Intelligence", "Voice AI Agents", "Business AI Agents", "AI Agent Builders", "Coding Agents", "MCP Servers", "Glossary", "Tutorials", "Alternatives", "Free AI Agents"].includes(r.category)),
  "tool-sitemap.xml": routes.filter((r) => ["reviews", "tools", "Tool Reviews", "Tool Profiles"].includes(r.category)),
  "comparison-sitemap.xml": routes.filter((r) => r.category === "comparisons" || r.category === "Comparisons"),
  "pricing-sitemap.xml": routes.filter((r) => r.category === "pricing" || r.category === "Pricing" || r.category === "Pricing Intelligence"),
  "alternatives-sitemap.xml": routes.filter((r) => r.category === "alternatives" || r.category === "Alternatives"),
  "tutorials-sitemap.xml": routes.filter((r) => ["tutorials", "courses", "Tutorials", "Courses", "Courses & Certifications"].includes(r.category)),
  "glossary-sitemap.xml": routes.filter((r) => r.category === "glossary" || r.category === "Glossary"),
  "mcp-sitemap.xml": routes.filter((r) => r.category === "mcp" || r.category === "MCP" || r.category === "MCP Servers"),
  "author-sitemap.xml": routes.filter((r) => r.category === "authors" || r.category === "Authors"),
  "hub-sitemap.xml": routes.filter((r) => r.category === "hubs" || r.category === "editorial" || r.category === "home" || r.category === "Hubs" || r.category === "Editorial" || r.category === "Home"),
  "calculators-sitemap.xml": routes.filter((r) => r.category === "calculators" || r.category === "Calculators"),
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
  `Sitemap: ${SITE_URL}/image-sitemap.xml`,
  `Sitemap: ${SITE_URL}/feed.xml`,
  `Sitemap: ${SITE_URL}/llms.txt`,
].join("\n"));

write("indexnow-key.txt", INDEXNOW_KEY);
write(`${INDEXNOW_KEY}.txt`, INDEXNOW_KEY);

const feedItems = routes
  .filter((r) => ["core", "pillars", "reviews", "tools", "comparisons", "pricing", "alternatives", "tutorials", "glossary", "mcp", "buyers-guides", "entity", "india-geo", "directories", "reddit", "calculators", "longtail"].includes(r.category))
  .sort((a, b) => b.priority.localeCompare(a.priority))
  .slice(0, 30);

write("feed.xml", [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
  "  <channel>",
  "    <title>BestAIAgent.in - AI Agent Reviews, Pricing and Guides</title>",
  `    <link>${SITE_URL}</link>`,
  "    <description>Independent India-focused AI agent reviews, rankings, comparisons, pricing pages, tutorials, and glossary guides.</description>",
  "    <language>en-IN</language>",
  `    <lastBuildDate>${new Date(`${TODAY}T12:00:00Z`).toUTCString()}</lastBuildDate>`,
  `    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />`,
  ...feedItems.map((item) => [
    "    <item>",
    `      <title><![CDATA[${item.title}]]></title>`,
    `      <link>${SITE_URL}${item.path}</link>`,
    `      <guid isPermaLink="true">${SITE_URL}${item.path}</guid>`,
    `      <description><![CDATA[${item.description}]]></description>`,
    `      <pubDate>${new Date(`${item.lastmod || TODAY}T12:00:00Z`).toUTCString()}</pubDate>`,
    "      <dc:creator>BestAIAgent.in Editorial Team</dc:creator>",
    `      <category>${xmlEscape(item.categoryLabel)}</category>`,
    "    </item>",
  ].join("\n")),
  "  </channel>",
  "</rss>",
].join("\n"));

const section = (title, entries) => [`## ${title}`, ...entries.map((entry) => `- [${entry.h1 || entry.title}](${SITE_URL}${entry.path}) - ${entry.description}`), ""].join("\n");

write("llms.txt", [
  "# BestAIAgent.in",
  "",
  `Updated: ${TODAY}`,
  "",
  "BestAIAgent.in is an India-focused authority site for AI agents, AI agent builders, coding agents, voice agents, MCP servers, AI automation platforms, and AI agent pricing. It is written for Indian startups, SMEs, agencies, developers, procurement teams, and enterprises.",
  "",
  "## Editorial Policy",
  "- Independent editorial reviews with affiliate disclosure.",
  "- Pricing is treated as estimated unless verified from the vendor at publication time.",
  "- India localization checks include INR pricing, GST invoice considerations, DPDP Act 2023 privacy notes, WhatsApp workflows, UPI/Razorpay relevance, Hindi/Hinglish/regional language support, and Indian cloud/data residency context.",
  "- Methodology uses BestAIAgent.in's 42-point AI Agent Scoring Framework.",
  "",
  "## Freshness",
  `- Global freshness date: ${TODAY}`,
  "- Pages include reviewed-by and last-verified notes where available.",
  "",
  section("Key Hubs", HUBS.map((hub) => routeMap[`/${hub.slug}`]).filter(Boolean)),
  section("Tool Reviews", routes.filter((r) => ["reviews", "tools"].includes(r.category)).slice(0, 40)),
  section("Comparisons", routes.filter((r) => r.category === "comparisons")),
  section("Pricing Pages", routes.filter((r) => r.category === "pricing")),
  section("Alternatives", routes.filter((r) => r.category === "alternatives")),
  section("Tutorials", routes.filter((r) => ["tutorials", "courses"].includes(r.category))),
  section("Glossary", routes.filter((r) => r.category === "glossary")),
  section("MCP Pages", routes.filter((r) => r.category === "mcp")),
  section("Buyer Guides", routes.filter((r) => r.category === "buyers-guides")),
  section("Entity Pages", routes.filter((r) => r.category === "entity")),
  section("India GEO", routes.filter((r) => r.category === "india-geo")),
  section("Directories", routes.filter((r) => r.category === "directories")),
  section("Reddit Reviews", routes.filter((r) => r.category === "reddit")),
  section("Calculators", routes.filter((r) => r.category === "calculators")),
  section("Longtail Guides", routes.filter((r) => r.category === "longtail")),
  section("Security and Compliance", routes.filter((r) => ["guides", "editorial"].includes(r.category))),
  "## Authors",
  ...AUTHORS.map((author) => `- [${author.name}](${SITE_URL}/authors/${author.slug}) - ${author.role}. ${author.description}`),
  "",
  "## Machine-Readable Files",
  `- Sitemap index: ${SITE_URL}/sitemap.xml`,
  `- RSS feed: ${SITE_URL}/feed.xml`,
  `- Robots: ${SITE_URL}/robots.txt`,
  `- LLM crawler file: ${SITE_URL}/llms.txt`,
  `- Content index: ${SITE_URL}/content-index.json`,
  `- Legacy content index: ${SITE_URL}/contentIndex.json`,
  `- Entity index: ${SITE_URL}/entity-index.json`,
  `- Knowledge graph: ${SITE_URL}/knowledge-graph.json`,
].join("\n"));

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
  relatedPages: route.related || [],
  wordCount: route.words,
  source: route.source,
}));

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

const bySlug = Object.fromEntries(routes.map((route) => [route.slug, route]));
const routeForSlug = (slug) => bySlug[slug]?.path || `/${slug}`;
const toolRoutes = routes.filter((route) => ["reviews", "tools"].includes(route.category));
const pricingRoutes = routes.filter((route) => route.category === "pricing");
const comparisonRoutes = routes.filter((route) => route.category === "comparisons");
const alternativeRoutes = routes.filter((route) => route.category === "alternatives");
const tutorialRoutes = routes.filter((route) => route.category === "tutorials");

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
