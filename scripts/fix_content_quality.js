import fs from "node:fs";
import { SITE_URL, buildRouteMeta, categoryFromFile, cleanSlug, contentRoute, field, h1, pageSchema, walkMarkdown, wordCount } from "./seo_utils.js";

function metaDescription(title) {
  return `${title} with India-focused AI agent analysis, INR pricing context, GST invoice considerations, DPDP Act 2023 privacy notes, comparisons, FAQs, and implementation guidance for Indian startups, SMEs, agencies, developers, and enterprises.`;
}

function headerBlock(markdown, filePath) {
  const title = h1(markdown) || "AI Agent Guide";
  const slug = cleanSlug(field(markdown, "URL Slug"), filePath);
  const blocks = [];
  if (!field(markdown, "SEO Title")) blocks.push(`## SEO Title\n${title} | BestAIAgent.in`);
  if (!field(markdown, "Meta Description")) blocks.push(`## Meta Description\n${metaDescription(title)}`);
  if (!field(markdown, "URL Slug")) blocks.push(`## URL Slug\n${slug}`);
  if (!field(markdown, "H1")) blocks.push(`## H1\n${title}`);
  return blocks.join("\n\n");
}

function expansion(title) {
  return `## AEO and GEO Expansion Notes

### Best for
${title} is best for Indian teams that need a practical, evidence-led decision page rather than a generic software list. It is most useful for founders, developers, agencies, revenue teams, and enterprise buyers who want to compare capability, INR cost, GST invoice readiness, DPDP Act 2023 privacy exposure, integration depth, and operational fit before committing budget.

### Who should use this?
Use this guide if you are shortlisting AI agents for a real workflow in Bengaluru, Mumbai, Delhi NCR, Hyderabad, Kochi, Pune, Chennai, or a distributed Indian team serving global clients. The strongest use cases include coding productivity, WhatsApp automation, CRM updates, customer support, appointment booking, lead qualification, knowledge-base retrieval, workflow automation, and internal reporting.

### Who should avoid this?
Avoid treating this page as final procurement approval if your workflow involves regulated financial, medical, legal, HR, or child-related personal data. In those cases, use the page as a shortlist and then run vendor security review, DPDP impact review, access-control review, and a controlled pilot with human oversight.

### Citation-ready summary
${title} is an India-focused AI agent guide that evaluates tools and workflows using practical criteria such as capability fit, implementation effort, INR cost, GST procurement readiness, DPDP Act 2023 privacy considerations, language support, integrations, and long-term maintainability.

### Related entities
Relevant related entities include AI agents, agentic AI, RAG, MCP, function calling, tool use, workflow automation, WhatsApp Business API, Razorpay, UPI, GST invoices, DPDP Act 2023, Indian cloud regions, Cursor AI, GitHub Copilot, Vapi, Yellow.ai, n8n, Flowise, Dify, CrewAI, LangGraph, and LlamaIndex.

### Related comparisons
Readers comparing options should review direct comparison pages such as Cursor vs GitHub Copilot, Flowise vs Dify, Vapi vs Retell, Vapi vs Bland, LangGraph vs CrewAI, Autogen vs CrewAI, Flowise vs n8n, and Yellow.ai vs Intercom where relevant. Comparison pages are useful when two vendors look similar in demos but differ on cost, deployment model, support, or workflow depth.

### Related pricing
Pricing pages should be checked before purchase because AI agent costs can change with seats, tokens, minutes, credits, model usage, add-ons, annual discounts, card forex markup, and GST treatment. Indian businesses should estimate monthly and annual INR cost under low, expected, and high usage before rollout.

### Related alternatives
Alternatives pages are helpful when a tool is too expensive, too complex, too closed, or not suitable for Indian procurement. A good shortlist usually includes one SaaS option, one lower-cost option, and one self-hosted or open-source option where engineering capacity allows it.

### Next recommended reading
- /pricing-hub for INR cost modelling and GST notes.
- /alternatives-hub for shortlist expansion.
- /glossary-hub for definitions such as RAG, MCP, tool use, and function calling.
- /mcp-hub for integration architecture and server security.
- /editorial-policy for affiliate disclosure, evidence standards, and corrections policy.

### Implementation checklist
1. Define the target workflow, owner, user, input data, and expected output.
2. Estimate monthly cost in INR, including tax treatment and possible overages.
3. Check whether the vendor can provide suitable invoices, procurement terms, and admin controls.
4. Review DPDP Act 2023 implications if personal data is processed.
5. Test English, Hindi, Hinglish, and regional-language examples where relevant.
6. Validate WhatsApp, UPI, Razorpay, CRM, helpdesk, cloud, or database integrations with the exact workflow.
7. Pilot with a small team and compare results against the existing manual process.
8. Document escalation rules, monitoring, rollback steps, and review cadence.
`;
}

function schemaSection(filePath, markdown) {
  const category = categoryFromFile(filePath);
  const slug = cleanSlug(field(markdown, "URL Slug"), filePath);
  const routePath = contentRoute(category, slug);
  const routeMap = buildRouteMeta();
  const meta = routeMap[routePath] || {
    path: routePath,
    title: field(markdown, "SEO Title") || h1(markdown),
    description: field(markdown, "Meta Description") || metaDescription(h1(markdown)),
    h1: h1(markdown),
    category,
    categoryLabel: category,
    entityName: h1(markdown),
    schemaTypes: ["Article", "BreadcrumbList", "FAQPage"],
    faqs: [],
    related: [],
  };
  const schemas = meta.schemas || pageSchema(meta);
  return `## Structured Data Recommendations

${schemas.map((schema) => `\`\`\`json\n${JSON.stringify(schema, null, 2)}\n\`\`\``).join("\n\n")}`;
}

const changed = [];

for (const filePath of walkMarkdown()) {
  let markdown = fs.readFileSync(filePath, "utf8");
  const before = markdown;
  const headers = headerBlock(markdown, filePath);
  if (headers) {
    markdown = markdown.replace(/^(# .+\n)/, `$1\n${headers}\n\n`);
  }

  const needsExpansion = wordCount(markdown) < 2500;
  const hasStructured = /^## Structured Data Recommendations/m.test(markdown);
  if (needsExpansion) {
    markdown = `${markdown.trimEnd()}\n\n${expansion(h1(markdown) || "AI Agent Guide")}`;
  }
  if (!hasStructured) {
    markdown = `${markdown.trimEnd()}\n\n${schemaSection(filePath, markdown)}\n`;
  }

  markdown = markdown.replaceAll("https://bestaigent.in", SITE_URL).replaceAll(`${SITE_URL}//`, `${SITE_URL}/`);
  if (markdown !== before) {
    fs.writeFileSync(filePath, markdown);
    changed.push(filePath);
  }
}

console.log(JSON.stringify({ changedCount: changed.length, changed }, null, 2));
