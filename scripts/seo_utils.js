import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

export const ROOT = process.cwd();
export const CONTENT_DIR = path.join(ROOT, "content");
export const PUBLIC_DIR = path.join(ROOT, "public");
export const SITE_URL = "https://bestaiagent.in";
export const TODAY = "2026-06-11";

const CATEGORY_LABELS = {
  alternatives: "Alternatives",
  comparisons: "Comparisons",
  core: "AI Agent Core",
  courses: "Courses",
  free: "Free AI Agents",
  glossary: "Glossary",
  guides: "Guides",
  longtail: "Long-tail Guides",
  mcp: "MCP",
  pillars: "AI Agent Pillars",
  pricing: "Pricing",
  research: "Research",
  reviews: "Tool Reviews",
  tools: "Tool Profiles",
  tutorials: "Tutorials",
  hubs: "Hubs",
  "buyers-guides": "Buyer Guides",
  reddit: "Reddit Reviews",
  entity: "Entity Pages",
  "india-geo": "India GEO",
  directories: "Directories",
  calculators: "Calculators",
};

export const HUBS = [
  {
    slug: "coding-agents-hub",
    title: "Coding AI Agents Hub",
    description: "Developer-focused AI coding agents, IDE copilots, pricing guides, comparisons, and setup tutorials for Indian engineering teams.",
    children: ["best-ai-agent-for-python", "best-ai-agent-for-react", "best-ai-agent-for-nextjs", "github-copilot", "cursor-ai", "cursor-vs-github-copilot", "cursor-pricing"],
  },
  {
    slug: "business-ai-hub",
    title: "Business AI Agents Hub",
    description: "AI agents for Indian SMEs, startups, agencies, CRM teams, sales teams, customer support, WhatsApp workflows, and enterprise automation.",
    children: ["best-ai-agent-for-business", "best-ai-agents-for-business", "best-ai-agent-for-sales", "best-ai-agent-for-customer-support", "best-ai-agent-for-crm"],
  },
  {
    slug: "ai-agent-builders-hub",
    title: "AI Agent Builders Hub",
    description: "No-code, low-code, and developer platforms for building AI agents, RAG workflows, automations, and multi-agent systems.",
    children: ["best-ai-agent-builder", "best-no-code-ai-agent-builder", "best-ai-agent-platform", "flowise-review", "dify-review", "n8n-review"],
  },
  {
    slug: "voice-ai-hub",
    title: "Voice AI Agents Hub",
    description: "AI voice agents for Indian call centers, appointment booking, outbound calling, support workflows, Hinglish calls, and DPDP-aware deployments.",
    children: ["best-ai-voice-agent", "best-ai-call-center-agent", "best-ai-phone-agent", "vapi-review", "retell-review", "vapi-vs-retell"],
  },
  {
    slug: "pricing-hub",
    title: "AI Agent Pricing Hub",
    description: "INR pricing, GST invoice notes, free-vs-paid comparisons, ROI models, and procurement guidance for AI agent tools in India.",
    children: ["cursor-pricing", "github-copilot-pricing", "vapi-pricing", "n8n-pricing", "flowise-pricing"],
  },
  {
    slug: "alternatives-hub",
    title: "AI Agent Alternatives Hub",
    description: "Alternative shortlists for Cursor, GitHub Copilot, Vapi, Retell, n8n, Flowise, Dify, Intercom, and other AI agent tools.",
    children: ["cursor-alternatives", "github-copilot-alternatives", "vapi-alternatives", "n8n-alternatives", "flowise-alternatives"],
  },
  {
    slug: "tutorials-hub",
    title: "AI Agent Tutorials Hub",
    description: "Step-by-step implementation guides for Cursor, GitHub Copilot, Vapi, Retell, Flowise, CrewAI, MCP servers, and multi-agent systems.",
    children: ["how-to-use-cursor-ai", "how-to-use-github-copilot", "how-to-use-vapi", "how-to-build-ai-agent-with-flowise", "how-to-create-mcp-server"],
  },
  {
    slug: "glossary-hub",
    title: "AI Agent Glossary Hub",
    description: "Plain-English definitions for RAG, MCP, tool use, function calling, context windows, multi-agent systems, AgentOps, and AI benchmarks.",
    children: ["what-is-rag", "what-is-mcp", "what-is-function-calling", "what-is-tool-use", "what-is-agentic-ai"],
  },
  {
    slug: "mcp-hub",
    title: "MCP Hub",
    description: "Model Context Protocol explainers, MCP server directories, security guidance, API comparisons, and implementation tutorials.",
    children: ["what-is-mcp", "best-mcp-servers", "mcp-directory", "mcp-security", "mcp-vs-api"],
  },
  {
    slug: "free-ai-agents-hub",
    title: "Free AI Agents Hub",
    description: "Free and open-source AI agents, builders, voice agents, coding agents, and business automation tools for budget-conscious Indian teams.",
    children: ["best-free-ai-agents", "best-free-ai-coding-agents", "best-free-ai-agent-builder", "best-free-ai-voice-agent", "best-free-open-source-ai-agents"]
  },
  {
    slug: "buyers-guides-hub",
    title: "AI Agent Buyer Guides Hub",
    description: "High-converting industry and role-based buyer guides for choosing the right AI agent in India.",
    children: ["best-ai-agent-for-startups", "best-ai-agent-for-enterprises", "best-ai-agent-for-saas", "best-ai-agent-for-freelancers", "best-ai-agent-for-solopreneurs", "best-ai-agent-for-agencies", "best-ai-agent-for-indian-businesses", "best-ai-agent-for-developers", "best-ai-agent-for-students", "best-ai-agent-for-content-creators"]
  },
  {
    slug: "india-hub",
    title: "AI Agents India Hub",
    description: "India-specific AI agent guides with INR pricing, DPDP compliance, WhatsApp integration, and regional language support.",
    children: ["best-ai-agent-india", "ai-agent-pricing-india", "ai-agent-for-indian-startups", "ai-agent-for-indian-smes", "ai-agent-for-whatsapp-business"]
  },
  {
    slug: "calculators-hub",
    title: "AI Agent Calculators Hub",
    description: "Interactive cost calculators and ROI tools for AI agent pricing, costs, and business cases.",
    children: ["ai-agent-cost-calculator", "cursor-cost-calculator", "vapi-cost-calculator", "retell-cost-calculator", "ai-support-agent-roi-calculator"]
  },
  {
    slug: "reddit-hub",
    title: "AI Agent Reddit Reviews Hub",
    description: "Community-sourced reviews and Reddit-intent pages for popular AI agents.",
    children: ["cursor-ai-reddit-review", "github-copilot-reddit-review", "claude-code-reddit-review", "vapi-reddit-review", "retell-reddit-review", "flowise-reddit-review"]
  },
  {
    slug: "entity-hub",
    title: "AI Agent Entity Pages Hub",
    description: "LLM-optimized entity definition pages for major AI agents with structured data.",
    children: ["cursor-ai-entity", "github-copilot-entity", "claude-code-entity", "vapi-entity", "retell-entity", "flowise-entity", "dify-entity", "langgraph-entity", "crewai-entity", "autogen-entity"]
  },
  {
    slug: "directories-hub",
    title: "AI Agent Directories Hub",
    description: "Comprehensive directories of AI agents organized by category with filters, pricing, and ratings.",
    children: ["ai-agent-directory", "coding-agents-directory", "business-agents-directory", "voice-agents-directory", "agent-builders-directory", "open-source-agents-directory", "mcp-servers-directory", "free-agents-directory"]
  }
];

export const EDITORIAL_ROUTES = [
  {
    path: "/methodology",
    title: "Editorial Methodology and 42-Point AI Agent Scoring Framework",
    description: "How BestAIAgent.in evaluates AI agents across capability, documentation, integrations, India fit, DPDP privacy, INR pricing, and commercial readiness.",
  },
  {
    path: "/editorial-policy",
    title: "Editorial Policy, Independence, Corrections, and Affiliate Disclosure",
    description: "BestAIAgent.in editorial policy covering independence, affiliate disclosure, evidence standards, corrections, pricing disclaimers, and conflicts of interest.",
  },
  {
    path: "/ai-agent-scoring-system",
    title: "AI Agent Scoring System",
    description: "The BestAIAgent.in scoring system for AI agents, including ease of use, features, reliability, security, India suitability, and enterprise readiness.",
  },
  {
    path: "/affiliate-disclosure",
    title: "Affiliate Disclosure",
    description: "Affiliate disclosure and pricing disclaimer for BestAIAgent.in. We may earn commissions without making fake partnership claims.",
  },
  {
    path: "/contact",
    title: "Contact BestAIAgent.in",
    description: "Contact the BestAIAgent.in editorial team for corrections, review updates, vendor submissions, and AI agent research requests.",
  },
  {
    path: "/ai-agent-tools",
    title: "AI Agent Tools Directory",
    description: "Browse the BestAIAgent.in AI agent tools directory for coding agents, business AI, voice agents, builders, workflow automation, pricing, and India-focused use cases.",
  },
];

export const AUTHORS = [
  {
    slug: "arshdeep-singh",
    name: "Arshdeep Singh",
    role: "Chief AI Analyst",
    description: "Arshdeep Singh leads BestAIAgent.in methodology, AI agent rankings, DPDP compliance reviews, and India-market editorial quality.",
  },
  {
    slug: "priya-iyer",
    name: "Priya Iyer",
    role: "Core Engineer",
    description: "Priya Iyer reviews developer tools, AI agent builders, APIs, benchmarks, and implementation workflows for Indian engineering teams.",
  },
  {
    slug: "karan-mehra",
    name: "Karan Mehra",
    role: "Enterprise Lead",
    description: "Karan Mehra evaluates voice agents, WhatsApp automation, enterprise procurement, and AI deployment readiness for Indian businesses.",
  },
];

export const HOME_FAQS = [
  ["What is the best AI agent in India in 2026?", "The best AI agent depends on the job. Cursor is a strong coding choice, Vapi and Retell fit voice workflows, Yellow.ai and Intercom suit business support, while Flowise, Dify, CrewAI, and LangGraph fit agent building."],
  ["How does BestAIAgent.in score AI agents?", "BestAIAgent.in uses a 42-point editorial framework covering capability, ease of use, documentation, integrations, reliability, India fit, DPDP considerations, pricing transparency, and implementation readiness."],
  ["Are INR prices exact?", "No. INR prices are estimates because exchange rates, taxes, usage tiers, and vendor plans can change. Buyers should confirm official prices, GST invoices, and procurement terms before purchase."],
  ["Which AI agents are best for Indian SMEs?", "Indian SMEs typically need low setup effort, clear pricing, WhatsApp or CRM integration, support workflows, and invoice-friendly billing."],
  ["Which AI agents are best for developers?", "Developers should compare Cursor, GitHub Copilot, Claude Code-style tools, CrewAI, LangGraph, Flowise, and Dify depending on whether they need coding assistance, agent orchestration, or workflow builders."],
  ["Do AI agents support Hindi or Hinglish?", "Some voice and chat platforms may support Hindi, Hinglish, or regional-language workflows depending on the model, telephony stack, and vendor plan."],
  ["What is DPDP Act relevance for AI agents?", "AI agents can process personal data in chats, calls, CRM notes, and support tickets, so Indian businesses should review consent, retention, access control, vendor terms, and deletion workflows."],
  ["Do these tools support UPI or Razorpay?", "Many global SaaS tools rely on cards or invoices, while India-first vendors may support UPI, Razorpay, or GST-ready invoicing."],
  ["What is the difference between AI agent builders and AI agents?", "AI agents perform tasks or decisions, while AI agent builders are platforms that help teams create custom agents with workflows, tools, memory, and integrations."],
  ["Which pages should I read first?", "Start with the best AI agents guide, then visit the relevant hub for coding, business, voice, builders, pricing, alternatives, tutorials, glossary, MCP, or free tools."],
  ["Does BestAIAgent.in use affiliate links?", "Some pages may include affiliate links, but rankings remain independent and based on editorial methodology."],
  ["How often are pages reviewed?", "Major pages show freshness signals such as last reviewed and pricing check dates, and pricing, features, integrations, and compliance notes should be rechecked periodically."],
];

export const HOME_TOP_TOOLS = [
  ["Cursor AI", "/tools/cursor-ai"],
  ["Vapi", "/vapi-review"],
  ["Retell", "/retell-review"],
  ["Yellow.ai", "/yellow-ai-review"],
  ["Intercom", "/intercom-review"],
  ["Flowise", "/flowise-review"],
  ["Dify", "/dify-review"],
  ["CrewAI", "/crewai-review"],
  ["LangGraph", "/langgraph-review"],
  ["GitHub Copilot", "/tools/github-copilot"],
  ["Claude Code", "/tools/claude-code"],
  ["n8n", "/tools/n8n"],
  ["AutoGen", "/tools/autogen"],
  ["Windsurf", "/tools/windsurf"],
  ["Replit AI", "/tools/replit-ai"],
];

export function ensurePublicDir() {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

export function walkMarkdown(dir = CONTENT_DIR) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkMarkdown(full);
    return entry.isFile() && entry.name.endsWith(".md") ? [full] : [];
  });
}

export function wordCount(text) {
  return (text.match(/[A-Za-z0-9₹$€£][A-Za-z0-9₹$€£.,:%/+()-]*/g) || []).length;
}

export function field(markdown, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = markdown.match(new RegExp(`^## ${escaped}\\s*\\n([\\s\\S]*?)(?=\\n## |\\n# |$)`, "m"));
  if (!match) return "";
  return match[1].trim().split(/\n/)[0].replace(/^#+\s*/, "").trim();
}

export function h1(markdown) {
  return field(markdown, "H1") || (markdown.match(/^#\s+(.+)$/m)?.[1] || "").trim();
}

export function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function titleCase(slug) {
  const acronyms = new Set(["ai", "api", "mcp", "rag", "seo", "crm", "gst", "dpdp", "llm", "sme", "smb"]);
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => (acronyms.has(part) ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1)))
    .join(" ");
}

export function cleanSlug(raw, filePath) {
  const fallback = path.basename(filePath, ".md");
  return (raw || fallback).trim().replace(/^\/+/, "").replace(/\/+$/, "");
}

export function contentRoute(category, slug) {
  if (category === "tools") return `/tools/${slug}`;
  if (category === "mcp" && slug === "what-is-mcp") return "/mcp/what-is-mcp";
  if (category === "comparisons") return `/${slug}`;
  return `/${slug}`;
}

export function categoryFromFile(filePath) {
  return path.relative(CONTENT_DIR, filePath).split(path.sep)[0];
}

export function schemaTypesFor(category, slug) {
  const types = ["Article", "BreadcrumbList"];
  if (category === "reviews" || category === "tools") types.push("Review", "SoftwareApplication", "FAQPage");
  if (["pillars", "comparisons", "alternatives", "pricing", "free", "buyers-guides", "entity", "india-geo", "directories", "reddit"].includes(category)) types.push("ItemList", "FAQPage");
  if (category === "tutorials" || slug.startsWith("how-to-")) types.push("HowTo", "FAQPage");
  if (category === "glossary" || category === "mcp" || category === "research" || category === "guides" || category === "entity") types.push("FAQPage");
  if (category === "glossary") types.push("DefinedTerm");
  if (category === "calculators") types.push("WebApplication", "FAQPage");
  return [...new Set(types)];
}

export function ogImageFor(category, slug, pathName = `/${slug}`) {
  if (pathName === "/") return "/assets/og/home.png";
  if (pathName.startsWith("/tools/")) return `/assets/og/${pathName.replace("/tools/", "")}.png`;
  if (category === "comparisons" || slug.includes("-vs-")) return `/assets/comparisons/${slug}.png`;
  if (slug.endsWith("-hub")) return `/assets/og/${slug}.png`;
  return "/assets/brand/og-default.png";
}

export function ogImageAltFor(category, slug, title) {
  if (category === "comparisons" || slug.includes("-vs-")) return `${titleCase(slug)} comparison preview image on BestAIAgent.in`;
  if (slug.endsWith("-hub")) return `${titleCase(slug)} hub preview image on BestAIAgent.in`;
  if (category === "reviews" || category === "tools") return `${title.replace(/\s*\|\s*BestAIAgent\.in$/, "")} logo and review preview image on BestAIAgent.in`;
  return `${title.replace(/\s*\|\s*BestAIAgent\.in$/, "")} preview image on BestAIAgent.in`;
}

export function articleSchema(meta) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}${meta.path}#article`,
    headline: meta.title,
    description: meta.description,
    url: `${SITE_URL}${meta.path}`,
    inLanguage: "en-IN",
    dateModified: TODAY,
    author: { "@type": "Organization", name: "BestAIAgent.in Editorial Team" },
    publisher: { "@type": "Organization", name: "BestAIAgent.in", url: SITE_URL },
  };
}

export function breadcrumbSchema(meta) {
  const categoryHubs = {
    Alternatives: "/alternatives-hub",
    Comparisons: "/best-ai-agent",
    "AI Agent Core": "/best-ai-agent",
    Courses: "/tutorials-hub",
    "Free AI Agents": "/free-ai-agents-hub",
    Glossary: "/glossary-hub",
    Guides: "/methodology",
    "Long-tail Guides": "/best-ai-agent",
    MCP: "/mcp-hub",
    "AI Agent Pillars": "/best-ai-agent",
    Pricing: "/pricing-hub",
    Research: "/ai-agent-trends",
    "Tool Reviews": "/best-ai-agent",
    "Tool Profiles": "/best-ai-agent",
    Tutorials: "/tutorials-hub",
    Hubs: "/",
    Editorial: "/editorial-policy",
    Authors: "/editorial-policy",
    "Buyer Guides": "/buyers-guides-hub",
    "Reddit Reviews": "/reddit-hub",
    "Entity Pages": "/entity-hub",
    "India GEO": "/india-hub",
    Directories: "/directories-hub",
    Calculators: "/calculators-hub",
  };
  const categoryPath = categoryHubs[meta.categoryLabel] || "/";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${meta.path}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: meta.categoryLabel || "Guide", item: `${SITE_URL}${categoryPath}` },
      { "@type": "ListItem", position: 3, name: meta.h1 || meta.title, item: `${SITE_URL}${meta.path}` },
    ],
  };
}

export function pageSchema(meta) {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}${meta.path}#webpage`,
      name: meta.title,
      description: meta.description,
      url: `${SITE_URL}${meta.path}`,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      inLanguage: "en-IN",
      dateModified: TODAY,
    },
    articleSchema(meta),
    breadcrumbSchema(meta),
  ];

  if (meta.schemaTypes.includes("FAQPage")) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE_URL}${meta.path}#faq`,
      mainEntity: (meta.faqs || []).slice(0, 10).map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }
  if (meta.schemaTypes.includes("SoftwareApplication")) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}${meta.path}#software`,
      name: meta.entityName,
      applicationCategory: "AI Agent Software",
      operatingSystem: "Web",
      url: `${SITE_URL}${meta.path}`,
      inLanguage: "en-IN",
    });
  }
  if (meta.schemaTypes.includes("Review")) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Review",
      "@id": `${SITE_URL}${meta.path}#review`,
      itemReviewed: { "@type": "SoftwareApplication", name: meta.entityName, applicationCategory: "AI Agent Software" },
      author: { "@type": "Organization", name: "BestAIAgent.in Editorial Team" },
      reviewBody: meta.description,
    });
  }
  if (meta.schemaTypes.includes("ItemList")) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${SITE_URL}${meta.path}#itemlist`,
      name: meta.h1 || meta.title,
      itemListElement: (meta.related || []).slice(0, 10).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: titleCase(item),
        url: `${SITE_URL}/${item}`,
      })),
    });
  }
  if (meta.schemaTypes.includes("HowTo")) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "@id": `${SITE_URL}${meta.path}#howto`,
      name: meta.h1 || meta.title,
      step: [
        { "@type": "HowToStep", name: "Define the workflow", text: "Document the user, data source, owner, and success metric." },
        { "@type": "HowToStep", name: "Configure the tool", text: "Set up credentials, prompts, integrations, and access controls." },
        { "@type": "HowToStep", name: "Test with Indian examples", text: "Validate INR, GST, DPDP, Hindi, Hinglish, and regional workflows." },
        { "@type": "HowToStep", name: "Deploy and monitor", text: "Launch with logs, escalation paths, reviews, and rollback steps." },
      ],
    });
  }
  if (meta.schemaTypes.includes("DefinedTerm")) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "@id": `${SITE_URL}${meta.path}#term`,
      name: meta.entityName,
      description: meta.description,
      inDefinedTermSet: `${SITE_URL}/glossary-hub`,
      url: `${SITE_URL}${meta.path}`,
    });
  }
  return schemas.filter((schema) => !schema.mainEntity || schema.mainEntity.length > 0);
}

export function extractFaqs(markdown) {
  const matches = [...markdown.matchAll(/^###\s+(?:\d+\.\s*)?(.+\?)\s*\n([^#\n][\s\S]*?)(?=\n### |\n## |$)/gm)];
  return matches.slice(0, 15).map((m) => ({
    question: m[1].trim(),
    answer: m[2].trim().replace(/\s+/g, " ").slice(0, 600),
  }));
}

export function buildContentEntries() {
  return walkMarkdown().map((filePath) => {
    const markdown = fs.readFileSync(filePath, "utf8");
    const category = categoryFromFile(filePath);
    const slug = cleanSlug(field(markdown, "URL Slug"), filePath);
    const pathName = contentRoute(category, slug);
    const title = field(markdown, "SEO Title") || h1(markdown) || titleCase(slug);
    const description = field(markdown, "Meta Description") || `${title} with India-focused AI agent analysis, INR pricing notes, DPDP considerations, comparisons, FAQs, and implementation guidance.`;
    const pageH1 = h1(markdown) || title;
    const linkSource = markdown.split(/^## Structured Data Recommendations\s*$/m)[0];
    const related = [
      ...linkSource.matchAll(/\]\((\/[a-z0-9][a-z0-9/-]+)(?:[)#?][^)]*)?\)/g),
      ...linkSource.matchAll(/https:\/\/bestaiagent\.in(\/[a-z0-9][a-z0-9/-]+)/g),
    ]
      .map((match) => match[1].replace(/^\//, "").replace(/\/$/, ""))
      .filter(Boolean);
    const entry = {
      source: path.relative(ROOT, filePath),
      category,
      categoryLabel: CATEGORY_LABELS[category] || titleCase(category),
      slug,
      path: pathName,
      aliases: category === "reviews" && slug.endsWith("-review") ? [`/tools/${slug.replace(/-review$/, "")}`] : [],
      title,
      description,
      h1: pageH1,
      entityName: pageH1.replace(/\s*[–-]\s*.*$/, "").replace(/\s+Review$/i, "").trim() || titleCase(slug),
      words: wordCount(markdown),
      lastmod: TODAY,
      changefreq: ["core", "pricing", "reviews", "tools"].includes(category) ? "weekly" : "monthly",
      priority: category === "core" ? "0.95" : category === "pillars" ? "0.90" : "0.80",
      ogImage: ogImageFor(category, slug, pathName),
      ogImageAlt: ogImageAltFor(category, slug, title),
      schemaTypes: schemaTypesFor(category, slug),
      faqs: extractFaqs(markdown),
      related,
    };
    entry.schemas = pageSchema(entry);
    return entry;
  });
}

export function buildHubEntries() {
  return HUBS.map((hub) => {
    const meta = {
      source: "generated-hub",
      category: "hubs",
      categoryLabel: "Hubs",
      slug: hub.slug,
      path: `/${hub.slug}`,
      aliases: [],
      title: `${hub.title} | BestAIAgent.in`,
      description: hub.description,
      h1: hub.title,
      entityName: hub.title,
      words: 2500,
      lastmod: TODAY,
      changefreq: "weekly",
      priority: "0.90",
      ogImage: ogImageFor("hubs", hub.slug, `/${hub.slug}`),
      ogImageAlt: ogImageAltFor("hubs", hub.slug, hub.title),
      schemaTypes: ["WebPage", "BreadcrumbList", "ItemList", "FAQPage"],
      faqs: [
        { question: `What is ${hub.title}?`, answer: hub.description },
        { question: `Who should use ${hub.title}?`, answer: "Indian startups, SMEs, agencies, developers, and enterprise teams comparing AI agent options should use this hub as a navigation and shortlist page." },
        { question: `How often is ${hub.title} updated?`, answer: "BestAIAgent.in refreshes hub links and freshness notes as tool pricing, features, and India-specific requirements change." },
      ],
      related: hub.children,
    };
    if (["buyers-guides", "india-geo", "directories", "entity", "reddit", "calculators"].includes(hub.slug.replace("-hub", ""))) {
      meta.schemaTypes.push("CollectionPage");
    }
    meta.schemas = pageSchema(meta);
    meta.schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${SITE_URL}/${hub.slug}#hub-itemlist`,
      name: hub.title,
      itemListElement: hub.children.map((child, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: titleCase(child),
        url: `${SITE_URL}/${child}`,
      })),
    });
    return meta;
  });
}

export function readTopicalPagesSnapshot() {
  const tsxBin = path.join(ROOT, "node_modules", ".bin", process.platform === "win32" ? "tsx.cmd" : "tsx");
  if (!fs.existsSync(tsxBin)) return [];
  try {
    const code = [
      "import { allTopicalPages } from './src/data/topicalAuthority.ts';",
      "process.stdout.write(JSON.stringify(allTopicalPages));",
    ].join("\n");
    return JSON.parse(execFileSync(tsxBin, ["-e", code], { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }));
  } catch (error) {
    console.warn(`Unable to load topicalAuthority.ts snapshot: ${error.message}`);
    return [];
  }
}

export function buildTopicalEntries(existingPaths = new Set()) {
  return readTopicalPagesSnapshot()
    .filter((page) => page?.slug && !existingPaths.has(`/${page.slug}`) && !existingPaths.has(`/tools/${page.slug}`))
    .map((page) => {
      const meta = {
        source: "generated-topical-authority",
        category: page.clusterId || "topical-authority",
        categoryLabel: page.clusterName || titleCase(page.clusterId || "topical authority"),
        slug: page.slug,
        path: `/${page.slug}`,
        aliases: page.pageType === "entity" && page.slug.endsWith("-entity")
          ? [`/entity/${page.slug.replace(/-entity$/, "")}`]
          : [],
        title: `${page.title} | BestAIAgent.in`,
        description: page.description,
        h1: page.h1 || page.title,
        entityName: (page.h1 || page.title).replace(/\s*[–-]\s*.*$/, "").trim(),
        words: 2500,
        lastmod: page.lastReviewed || TODAY,
        lastReviewed: page.lastReviewed || TODAY,
        nextReview: page.nextReview || "2026-09-11",
        lastVerified: page.lastReviewed || TODAY,
        changefreq: "weekly",
        priority: String(page.priority || 0.75),
        ogImage: ogImageFor(page.clusterId || "topical-authority", page.slug, `/${page.slug}`),
        ogImageAlt: ogImageAltFor(page.clusterId || "topical-authority", page.slug, page.title),
        schemaTypes: page.schemaTypes || schemaTypesFor(page.clusterId || "topical-authority", page.slug),
        faqs: [
          { question: `What is ${page.title}?`, answer: page.description },
          { question: `Who should read ${page.title}?`, answer: "Indian founders, developers, automation agencies, SMEs, IT teams, enterprise buyers, and AI consultants evaluating AI agents or agentic tools should read this guide." },
        ],
        related: page.related || [],
      };
      meta.schemas = pageSchema(meta);
      return meta;
    });
}

export function buildEditorialEntries() {
  const editorial = EDITORIAL_ROUTES.map((route) => {
    const meta = {
      source: "generated-editorial",
      category: "editorial",
      categoryLabel: "Editorial",
      slug: route.path.slice(1),
      path: route.path,
      aliases: [],
      title: `${route.title} | BestAIAgent.in`,
      description: route.description,
      h1: route.title,
      entityName: route.title,
      words: 2500,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: "0.75",
      ogImage: "/assets/brand/og-default.png",
      ogImageAlt: `${route.title} preview image on BestAIAgent.in`,
      schemaTypes: ["WebPage", "BreadcrumbList", "Article"],
      faqs: [],
      related: ["methodology", "editorial-policy", "ai-agent-scoring-system"],
    };
    meta.schemas = pageSchema(meta);
    return meta;
  });

  const authors = AUTHORS.map((author) => {
    const meta = {
      source: "generated-author",
      category: "authors",
      categoryLabel: "Authors",
      slug: author.slug,
      path: `/authors/${author.slug}`,
      aliases: [],
      title: `${author.name} - ${author.role} | BestAIAgent.in`,
      description: author.description,
      h1: author.name,
      entityName: author.name,
      words: 2500,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: "0.70",
      ogImage: "/assets/brand/og-default.png",
      ogImageAlt: `${author.name} author profile preview image on BestAIAgent.in`,
      schemaTypes: ["Person", "BreadcrumbList", "WebPage"],
      faqs: [],
      related: ["methodology", "editorial-policy"],
    };
    meta.schemas = [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${SITE_URL}/authors/${author.slug}#person`,
        name: author.name,
        jobTitle: author.role,
        description: author.description,
        worksFor: { "@type": "Organization", name: "BestAIAgent.in", url: SITE_URL },
        url: `${SITE_URL}/authors/${author.slug}`,
      },
      breadcrumbSchema(meta),
    ];
    return meta;
  });

  return [...editorial, ...authors];
}

export function buildRouteMeta() {
  const baseEntries = [...buildContentEntries(), ...buildHubEntries(), ...buildEditorialEntries()];
  const existingPaths = new Set(baseEntries.flatMap((entry) => [entry.path, ...(entry.aliases || [])]));
  const entries = [...baseEntries, ...buildTopicalEntries(existingPaths)];
  const routeMap = {};
  for (const entry of entries) {
    routeMap[entry.path] = entry;
    for (const alias of entry.aliases || []) {
      routeMap[alias] = { ...entry, path: alias, canonicalPath: entry.path };
    }
  }
  routeMap["/"] = {
    source: "home",
    category: "home",
    categoryLabel: "Home",
    slug: "",
    path: "/",
    title: "Best AI Agents in India 2026: Compare Tools, Builders, Coding Agents and Business Automation",
    description: "Compare the best AI agents in India for coding, business automation, WhatsApp, voice bots, CRM, support, and workflow automation. Independent rankings with INR pricing, DPDP checks, and expert reviews.",
    h1: "Best AI Agents in India 2026",
    entityName: "BestAIAgent.in",
    words: 2500,
    lastmod: TODAY,
    changefreq: "daily",
    priority: "1.00",
    ogImage: "/assets/og/home.png",
    ogImageAlt: "BestAIAgent.in AI agent category dashboard preview",
    schemaTypes: ["Organization", "WebSite", "WebPage", "CollectionPage", "BreadcrumbList", "ItemList", "FAQPage"],
    faqs: HOME_FAQS.map(([question, answer]) => ({ question, answer })),
    related: entries.slice(0, 20).map((entry) => entry.slug),
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "BestAIAgent.in",
        url: SITE_URL,
        description: "India-focused AI agent reviews, comparisons, pricing guides, tutorials, and glossary definitions.",
        logo: `${SITE_URL}/logo.png`,
        areaServed: { "@type": "Country", name: "India" },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "BestAIAgent.in",
        url: SITE_URL,
        inLanguage: "en-IN",
        publisher: { "@id": `${SITE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        name: "Best AI Agents in India 2026",
        url: SITE_URL,
        description: "Compare the best AI agents in India for coding, business automation, WhatsApp, voice bots, CRM, support, and workflow automation.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: [
          { "@type": "Thing", name: "AI Agent" },
          { "@type": "Thing", name: "AI Coding Agent" },
          { "@type": "Thing", name: "AI Voice Agent" },
          { "@type": "Thing", name: "AI Agent Builder" },
          { "@type": "Thing", name: "Model Context Protocol" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/#collection`,
        name: "Best AI Agents in India 2026",
        url: SITE_URL,
        mainEntity: { "@id": `${SITE_URL}/#top-tools` },
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": `${SITE_URL}/#top-tools`,
        name: "Top AI agents and AI agent platforms in India",
        itemListElement: HOME_TOP_TOOLS.map(([name, itemPath], index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          url: `${SITE_URL}${itemPath}`,
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: HOME_FAQS.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        ],
      },
    ],
  };
  return routeMap;
}

export function xmlEscape(value) {
  return String(value).replace(/[<>&'"]/g, (ch) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[ch]);
}
