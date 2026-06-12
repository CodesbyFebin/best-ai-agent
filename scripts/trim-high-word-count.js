import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content");

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

const changed = [];
for (const filePath of walk(CONTENT_DIR)) {
  const original = fs.readFileSync(filePath, "utf8");
  if (wc(original) <= 5000) continue;

  let next = original.replace(
    /## Best-Fit User Profiles\n\n[\s\S]*?\n## 42-Point AI Agent Scoring Framework/,
    `## Best-Fit User Profiles

- **Startups and SMEs:** Best when the workflow is narrow, the monthly INR cost is predictable, and setup does not require a large engineering team.
- **Agencies:** Best when templates, reporting, and client data separation make the workflow repeatable across accounts.
- **Enterprises:** Best only when SSO, audit logs, vendor review, DPDP controls, and procurement requirements are clear.

## 42-Point AI Agent Scoring Framework`
  );

  next = next.replace(
    /## Internal Link Suggestions\n\n[\s\S]*?\n## Final Verdict/,
    `## Internal Link Suggestions

- Link to the closest pricing, comparison, alternatives, and tutorial pages.
- Link glossary terms such as AI agent, RAG, MCP, function calling, context window, and tool use when they appear.
- Link relevant pillar pages for sales, support, coding, WhatsApp, voice agents, builders, and workflow automation.

## Final Verdict`
  );

  if (wc(next) > 5000) {
    next = next.replace(
      /## Alternatives and Competitor Comparison\n\n[\s\S]*?\n## Internal Link Suggestions/,
      `## Alternatives and Competitor Comparison

| Option type | When it may be better | Trade-off |
|---|---|---|
| Direct SaaS competitor | You need faster setup, better UX, or stronger vendor support | May cost more and offer less control |
| Open-source framework | You need customization, self-hosting, or technical control | Requires engineering ownership |
| Custom internal build | The workflow is strategic, sensitive, or highly differentiated | Slower launch and higher initial cost |

## Internal Link Suggestions`
    );
  }

  if (wc(next) > 5000) {
    next = next.replace(/```json\n([\s\S]*?)\n```/g, (block, json) => {
      try {
        const parsed = JSON.parse(json);
        if (parsed["@type"] === "FAQPage" && Array.isArray(parsed.mainEntity)) {
          parsed.mainEntity = parsed.mainEntity.slice(0, 10);
          return "```json\n" + JSON.stringify(parsed, null, 2) + "\n```";
        }
      } catch {
        return block;
      }
      return block;
    });
  }

  fs.writeFileSync(filePath, next);
  changed.push({ file: path.relative(process.cwd(), filePath), before: wc(original), after: wc(next) });
}

console.log(JSON.stringify({ changedCount: changed.length, changed }, null, 2));
