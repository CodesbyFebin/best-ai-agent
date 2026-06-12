import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content");
const MARKER = "<!-- FULL_EXPANSION_V1 -->";

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return entry.isFile() && entry.name.endsWith(".md") ? [fullPath] : [];
  });
}

function wc(text) {
  return (text.match(/\S+/g) || []).length;
}

function trimExpansion(text) {
  let next = text;

  next = next.replace(/\nThe search intent behind this page is mixed\.[\s\S]*?data transfer terms can change the real experience\.\n/, "\n");
  next = next.replace(/\n- \*\*Keep humans in the loop\.\*\*[\s\S]*?- \*\*Review alternatives\.\*\* Compare at least two competing products or approaches, including one lower-cost or open-source option where feasible\.\n/, "");
  next = next.replace(/\| SME or family-run business \|[\s\S]*?\| Developer or technical team \|[^\n]+\n/, "| SME or family-run business | Medium if the workflow is simple and support is available | Local language support, invoice format, onboarding help, and escalation |\n| Enterprise team | High only with governance and procurement readiness | SSO, audit logs, vendor risk review, DPA, retention, and SLA |\n");
  next = next.replace(/\nBestAIAgent\.in evaluates AI agent tools[\s\S]*?over-weighting demos\.\n/, "\nUse this condensed 42-point framework summary to balance capability, cost, risk, and India readiness.\n");
  next = next.replace(/\| Reliability \|[\s\S]*?\| Strategic value \|[^\n]+\n/, "| Reliability | Error handling, latency, uptime, retries, and fallback paths | Production workflows need predictable behavior under messy real inputs |\n| Security and privacy | Access control, encryption, audit logs, retention, DPA, and DPDP readiness | Teams must understand how personal data and business data are handled |\n| Cost and India fit | Seat pricing, usage pricing, GST, INR estimates, languages, WhatsApp, and support | Localization can determine whether users actually adopt the system |\n| Commercial readiness | Procurement, SLAs, vendor maturity, roadmap clarity, and customer support | Teams need continuity after the initial pilot |\n");
  next = next.replace(/\nFor startups, the practical feature question[\s\S]*?improve the system\.\n/, "\n");
  next = next.replace(/\| Observability \|[\s\S]*?\| Exit plan \|[^\n]+\n/, "| Observability | Are logs, traces, transcripts, evaluations, and cost reports available to admins? |\n| Permissions | Can roles be separated for admins, editors, reviewers, agents, and viewers? |\n| Reliability | What happens when the model fails, an API times out, or the confidence score is low? |\n| Exit plan | Can the team migrate data, prompts, automations, and documentation if the tool changes? |\n");
  next = next.replace(/\nThe hidden cost is implementation\.[\s\S]*?value of time saved or revenue gained\.\n/, "\n");
  next = next.replace(/\nAgencies should also consider client procurement\.[\s\S]*?explains AI limitations\.\n/, "\n");
  next = next.replace(/\nFor AI agents, privacy risk often appears through convenience\.[\s\S]*?accidental exposures\.\n/, "\n");
  next = next.replace(/\nSelf-hosting can improve control[\s\S]*?procurement expectations\.\n/, "\n");
  next = next.replace(/\nBefore production, create a small test set[\s\S]*?escalates when uncertain\.\n/, "\n");
  next = next.replace(/\| Can support WhatsApp, CRM, helpdesk, and payment-adjacent workflows when integrated carefully \|[^\n]+\n/, "");
  next = next.replace(/\nFor revenue workflows, track conversion[\s\S]*?match the business outcome\.\n/, "\n");
  next = next.replace(/\n9\. Add escalation paths[\s\S]*?11\. Review performance monthly and retire workflows that do not produce measurable value\.\n/, "9. Document prompts, workflows, integrations, owners, and rollback steps.\n");
  next = next.replace(/\n- Measuring activity instead of business outcomes\.[\s\S]*?- Skipping an exit plan in case pricing, terms, or product direction changes\.\n/, "");
  next = next.replace(/\| Manual process with templates \|[^\n]+\n/, "");
  next = next.replace(/\n- Link to glossary pages such as AI agent, RAG, MCP, function calling, context window, and tool use where technical terms appear\.[\s\S]*?workflow automation\.\n/, "");
  next = next.replace(/\nUse this page as a decision aid rather than a final procurement sign-off\.[\s\S]*?more teams or clients\.\n/, "\n");
  next = next.replace(/\n### 11\. [\s\S]*?(?=\n## Structured Data Recommendations)/, "\n");

  return next;
}

const changed = [];
for (const filePath of walk(CONTENT_DIR)) {
  const original = fs.readFileSync(filePath, "utf8");
  if (!original.includes(MARKER)) continue;
  const before = wc(original);
  const trimmed = trimExpansion(original);
  if (trimmed !== original) {
    fs.writeFileSync(filePath, trimmed);
    changed.push({ file: path.relative(process.cwd(), filePath), before, after: wc(trimmed) });
  }
}

console.log(JSON.stringify({ changedCount: changed.length, changed }, null, 2));
