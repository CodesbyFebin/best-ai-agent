import fs from "node:fs";
import { SITE_URL, TODAY } from "./seo_utils.js";

const routeMeta = JSON.parse(fs.readFileSync("public/route-meta.json", "utf8"));
const entries = Object.entries(routeMeta);

const lines = [];
lines.push("# BestAIAgent.in - AI Agent Authority for India");
lines.push(`Updated: ${TODAY}`);
lines.push(`Site: ${SITE_URL}`);
lines.push("");
lines.push("## Site Overview");
lines.push("India-focused AI agent authority. Reviews, comparisons, pricing, tutorials, glossary definitions, MCP directories, and topical cluster guides for AI agents, coding agents, voice agents, builders, and MCP servers. Written for Indian startups, SMEs, developers, procurement teams, and enterprises.");
lines.push("");
lines.push("## Entity Definitions");

const coreEntities = [
  { name: "AI Agent", def: "Software system that perceives, reasons, and acts autonomously to accomplish goals.", cat: "Core", pages: "/best-ai-agent, /what-is-an-ai-agent, /ai-agents" },
  { name: "MCP (Model Context Protocol)", def: "Open protocol for connecting AI systems to tools, data, and external context. Standardized way for agents to access files, APIs, databases safely.", cat: "Infrastructure", pages: "/what-is-mcp, /mcp-hub, /best-mcp-servers" },
  { name: "RAG (Retrieval-Augmented Generation)", def: "Technique combining retrieval of information with generative AI to produce accurate, sourced answers.", cat: "Architecture", pages: "/what-is-rag, /tools/llamaindex, /tools/langchain" },
  { name: "CrewAI", def: "Open-source multi-agent framework for Python. Role-based agent orchestration with memory and tool integration.", cat: "Framework", pages: "/tools/crewai, /what-is-crewai, /crewai-vs-langgraph" },
  { name: "LangGraph", def: "Graph-based agent orchestration framework by LangChain. State machines for complex multi-agent workflows.", cat: "Framework", pages: "/tools/langgraph, /what-is-langgraph, /langgraph-vs-crewai" },
  { name: "Cursor AI", def: "AI-powered code editor forked from VS Code. Repository context indexing, Composer multi-file editing, Privacy Mode.", cat: "Coding Agent", score: "9.6/10", price: "₹1,680/month", pages: "/tools/cursor-ai, /cursor-pricing, /how-to-use-cursor-ai, /cursor-vs-github-copilot" },
  { name: "GitHub Copilot", def: "AI pair programmer integrated into VS Code and JetBrains. Autocomplete, Chat, CLI.", cat: "Coding Agent", score: "9.2/10", price: "₹1,300/month", pages: "/tools/github-copilot, /github-copilot-pricing, /how-to-use-github-copilot" },
  { name: "Vapi AI", def: "Voice AI backend pipeline. Real-time voice conversations with sub-500ms latency, Hinglish support, Twilio integration.", cat: "Voice Agent", score: "9.5/10", price: "$0.15/min", pages: "/tools/vapi-ai, /vapi-pricing, /how-to-use-vapi, /vapi-vs-retell" },
  { name: "Retell AI", def: "AI voice calling platform for outbound/inbound calls. Telephony, LLM integration, sub-500ms latency.", cat: "Voice Agent", score: "9.0/10", price: "$0.20/min", pages: "/tools/retell-ai, /how-to-use-retell, /retell-vs-bland-ai" },
  { name: "Yellow.ai", def: "Enterprise conversational AI platform. WhatsApp Business API, UPI checkout, 135+ language support, DPDP compliant.", cat: "Business Agent", score: "9.3/10", price: "Custom enterprise", pages: "/tools/yellow-ai, /yellow-ai-pricing, /how-to-use-yellow-ai" },
  { name: "Flowise", def: "Open-source visual AI agent builder. Drag-and-drop nodes for LLM workflows, RAG, and API integrations.", cat: "Builder", score: "9.1/10", price: "Free self-hosted", pages: "/tools/flowise, /flowise-pricing, /how-to-build-ai-agent-with-flowise" },
  { name: "Dify", def: "Open-source LLM application platform. Visual workflow builder, RAG, agent orchestration.", cat: "Builder", score: "9.0/10", price: "Free / Cloud", pages: "/tools/dify, /dify-vs-flowise" },
  { name: "Claude Code", def: "Terminal-based AI coding agent by Anthropic. Shell integration, repo context, permissions.", cat: "Coding Agent", score: "9.3/10", price: "Free / API", pages: "/tools/claude-code, /claude-code-vs-cursor" },
  { name: "Windsurf", def: "AI-native IDE by Codeium. Cascade agent, context-aware editing, free tier.", cat: "Coding Agent", score: "8.6/10", price: "Free / $10/mo", pages: "/tools/windsurf, /cursor-vs-windsurf" },
  { name: "Replit Agent", def: "AI coding agent inside Replit online IDE. Browser-based, collaborative.", cat: "Coding Agent", score: "8.5/10", price: "Free / $25/mo", pages: "/tools/replit-agent, /replit-vs-cursor" },
  { name: "Sarvam AI", def: "India-founded language AI. 10 Indian language voice models, Hinglish speech, ONDC.", cat: "Voice AI", score: "9.0/10", price: "API / Enterprise", pages: "/tools/sarvam-ai" },
  { name: "ElevenLabs", def: "AI voice synthesis and cloning. Text-to-speech, voice cloning, dubbing, multilingual.", cat: "Voice AI", score: "9.1/10", price: "$5/month", pages: "/tools/elevenlabs, /vapi-vs-elevenlabs, /retell-vs-elevenlabs" },
  { name: "Bland AI", def: "AI phone calling platform. Programmable voice agents, telephony, Twilio-like API.", cat: "Voice Agent", score: "8.5/10", price: "$0.10/min", pages: "/tools/bland-ai, /vapi-vs-bland-ai" },
  { name: "Haptik", def: "Enterprise AI conversational platform. WhatsApp, SMS, voice. Strong India enterprise presence.", cat: "Business Agent", score: "9.0/10", price: "Custom enterprise", pages: "/tools/haptik" },
  { name: "Wati", def: "WhatsApp Business platform for India. Chatbots, bulk messaging, Shopify integration.", cat: "Business Agent", score: "8.6/10", price: "₹5,000+/mo", pages: "/tools/wati" },
  { name: "Intercom", def: "Customer messaging platform. Fin AI agent, support tickets, product tours.", cat: "Business Agent", score: "8.8/10", price: "Custom", pages: "/tools/intercom" },
  { name: "Gupshup", def: "WhatsApp-first conversational AI. Bot builder, campaign management, rich formats.", cat: "Business Agent", score: "8.9/10", price: "Usage-based", pages: "/tools/gupshup" },
  { name: "AutoGen", def: "Multi-agent conversational framework by Microsoft. Agent chat, code execution, human-in-the-loop.", cat: "Framework", score: "8.8/10", price: "Free OSS", pages: "/tools/autogen, /autogen-vs-crewai" },
  { name: "LangChain", def: "Framework for developing LLM-powered applications. Chains, agents, retrieval, memory.", cat: "Framework", score: "8.7/10", price: "Free OSS / Cloud", pages: "/tools/langchain, /what-is-langchain" },
  { name: "LlamaIndex", def: "Data framework for LLM applications. RAG, document ingestion, query engines.", cat: "Framework", score: "8.6/10", price: "Free OSS / Cloud", pages: "/tools/llamaindex, /llamaindex-vs-langchain" },
  { name: "n8n", def: "Open-source workflow automation. 400+ integrations, self-hosted, fair-code.", cat: "Automation", score: "8.7/10", price: "Free self-hosted", pages: "/tools/n8n, /n8n-pricing, /flowise-vs-n8n" },
  { name: "Make", def: "Visual workflow automation platform. Scenarios, apps, enterprise automation.", cat: "Automation", score: "8.5/10", price: "Free / Paid", pages: "/tools/make, /n8n-vs-make" },
  { name: "Zapier", def: "No-code automation platform. 5000+ app integrations, Zaps, workflows.", cat: "Automation", score: "8.4/10", price: "Free / Paid", pages: "/tools/zapier, /n8n-vs-zapier" },
];

coreEntities.forEach((e) => {
  const scoreLine = e.score ? ` Score: ${e.score}. Price: ${e.price}.` : "";
  lines.push(`### ${e.name}`);
  lines.push(`Definition: ${e.def} Category: ${e.cat}.${scoreLine} Pages: ${e.pages}`);
  lines.push("");
});

lines.push("## Editorial Policy");
lines.push("Independent editorial rankings. No vendor can buy organic placement. Sponsored placements, if present, are labelled separately. Rankings are reviewed through capability, reliability, India Fit, and implementation value criteria.");
lines.push("");

lines.push("## Comparisons Index");
lines.push("Head-to-head AI agent comparisons on BestAIAgent.in:");
lines.push("");

const compSlugs = entries
  .filter(([, m]) => (m.slug || "").includes("-vs-"))
  .slice(0, 50);

compSlugs.forEach(([slug, m]) => {
  const s = slug.replace(/-/g, " ");
  const title = m.title || m.h1 || s;
  lines.push(`- [${title}](/${slug}): ${m.description || (m.h1 || title)}`);
});

lines.push("");
lines.push("## Hub Index");
lines.push("");

const hubs = entries.filter(([slug, m]) => {
  const s = slug || "";
  return s.endsWith("-hub") || s === "ai-agents-india" || s === "business-ai-agents" || s === "ai-agent-builders-hub" || s === "coding-agents-hub" || s === "voice-ai-hub" || s === "mcp-hub";
});

const seen = new Set();
hubs.forEach(([slug, m]) => {
  if (seen.has(slug)) return;
  seen.add(slug);
  lines.push(`### ${m.h1 || m.title}`);
  lines.push(`Path: /${slug} - ${m.description || m.title}`);
  lines.push("");
});

lines.push("## Key Hubs");
lines.push("");

seen.forEach((slug) => {
  const m = Object.entries(routeMeta).find(([s]) => s === slug)?.[1];
  if (m) {
    lines.push(`- [${m.h1 || m.title}](/${slug}) - ${m.description || m.title}`);
  }
});
lines.push("");

lines.push("## Topical Authorities (Priority ≥ 0.90)");
lines.push("");
entries
  .filter(([, m]) => parseFloat(m.priority || "0") >= 0.90)
  .sort((a, b) => parseFloat(b[1].priority || "0") - parseFloat(a[1].priority || "0"))
  .slice(0, 40)
  .forEach(([slug, m]) => {
    lines.push(`- [${m.title}](/${slug}) (priority: ${m.priority})`);
  });

lines.push("");
lines.push("## Tool Reviews");
lines.push("Scored tool review pages are available in the tool sitemap and content index, with review, pricing, alternatives, and tutorial relationships also exposed in JSON.");
lines.push("");

lines.push("## Comparisons");
lines.push("Head-to-head comparisons cover coding agents, voice agents, support platforms, agent builders, frameworks, and MCP implementation choices.");
lines.push("");

lines.push("## Pricing Pages");
lines.push("Pricing pages track INR context, GST invoice notes, free tiers, enterprise plans, and volatile vendor pricing caveats.");
lines.push("");

lines.push("## Alternatives");
lines.push("Alternative pages map substitute tools by category, budget, implementation complexity, India Fit, and deployment model.");
lines.push("");

lines.push("## Tutorials");
lines.push("Tutorial pages cover AI agent setup, coding agents, voice agents, WhatsApp agents, RAG, CrewAI, and MCP server implementation.");
lines.push("");

lines.push("## Glossary");
lines.push("Glossary pages define MCP, RAG, tool use, function calling, context windows, multi-agent systems, AgentOps, SWE-bench, GAIA, CrewAI, and LangGraph.");
lines.push("");

lines.push("## MCP Pages");
lines.push("MCP coverage includes the protocol guide, server directory, marketplace, MCP vs API, security, enterprise usage, and India DPI server opportunities.");
lines.push("");

lines.push("## Security and Compliance");
lines.push("Security coverage includes DPDP Act 2023, prompt injection, tool permission scoping, audit logging, data residency, and enterprise governance.");
lines.push("");

lines.push("## Freshness");
lines.push("Daily rebuilds update generated indexes and feeds. Rankings are re-verified quarterly; pricing is updated when changes are confirmed; MCP availability is reviewed monthly.");
lines.push("");

lines.push("## India-Specific Considerations");
lines.push("Pricing: INR estimates + GST invoice notes on all tools");
lines.push("Compliance: DPDP Act 2023 privacy checks on all reviews");
lines.push("Languages: Hindi, Hinglish, Tamil, Telugu, Bengali, Marathi, Gujarati documented");
lines.push("Payments: UPI, Razorpay, Indian payment methods");
lines.push("Hosting: AWS Mumbai, DigitalOcean Bangalore, local data residency");
lines.push("Channels: WhatsApp Business API native integration prioritised");
lines.push("");
lines.push("## Machine-Readable Files");
lines.push(`Sitemap: ${SITE_URL}/sitemap.xml`);
lines.push(`Content Index: ${SITE_URL}/content-index.json`);
lines.push(`Entity Index: ${SITE_URL}/entity-index.json`);
lines.push(`Knowledge Graph: ${SITE_URL}/knowledge-graph.json`);
lines.push(`Tool Relationships: ${SITE_URL}/tool-relationships.json`);
lines.push(`LLM Readable Index: ${SITE_URL}/llms.txt`);
lines.push("");
lines.push(`Last verified: ${TODAY}`);

fs.writeFileSync("public/llms.txt", lines.join("\n") + "\n");
console.log(`llms.txt generated: ${lines.length} lines, ${Buffer.byteLength(lines.join("\n"))} bytes`);

// Generate llms-full.txt with extended context
const fullLines = [];
fullLines.push("# BestAIAgent.in — Complete LLM Context (Extended)");
fullLines.push(`Updated: ${TODAY}`);
fullLines.push(`Site: ${SITE_URL}`);
fullLines.push("");
fullLines.push("## Machine-Readable File References");
fullLines.push(`Content Index: ${SITE_URL}/content-index.json`);
fullLines.push(`Entity Index: ${SITE_URL}/entity-index.json`);
fullLines.push(`Knowledge Graph: ${SITE_URL}/knowledge-graph.json`);
fullLines.push(`Tool Relationships: ${SITE_URL}/tool-relationships.json`);
fullLines.push(`AI Agents Index: ${SITE_URL}/ai-index.json`);
fullLines.push(`Benchmark Index: ${SITE_URL}/benchmark-index.json`);
fullLines.push(`Ranking Index: ${SITE_URL}/ranking-index.json`);
fullLines.push("");
fullLines.push("## Page Excerpts (Priority ≥ 0.90)");
fullLines.push("High-priority pages with full descriptions for LLM consumption:");
fullLines.push("");

const highPriorityFull = entries
  .filter(([, m]) => parseFloat(m.priority || "0") >= 0.90)
  .sort((a, b) => parseFloat(b[1].priority || "0") - parseFloat(a[1].priority || "0"));

highPriorityFull.forEach(([slug, m]) => {
  const cleanDesc = (m.description || "").replace(/\[[^\]]+\]\(([^)]+)\)/g, "$1").slice(0, 500);
  fullLines.push(`### ${m.title}`);
  fullLines.push(`Path: /${slug}`);
  fullLines.push(`Category: ${m.category || "page"}`);
  fullLines.push(`Description: ${cleanDesc}`);
  fullLines.push("");
});

fs.writeFileSync("public/llms-full.txt", fullLines.join("\n") + "\n");
console.log(`llms-full.txt generated: ${fullLines.length} lines, ${Buffer.byteLength(fullLines.join("\n"))} bytes`);
