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

const fixes = [
  [/baseline\.9\. Document/g, "baseline.\n9. Document"],
  [/requirements before expanding to a wider team\.\n\n### 2/g, "requirements before expanding to a wider team.\n\n### 2"],
  [/- \*\*Prefer measurable pilots\.\*\*([^\n]+)\n## Best-Fit User Profiles/g, "- **Prefer measurable pilots.**$1\n\n## Best-Fit User Profiles"],
  [/- Connecting WhatsApp, CRM, email, or payment systems without permission boundaries\.\n## Alternatives/g, "- Connecting WhatsApp, CRM, email, or payment systems without permission boundaries.\n\n## Alternatives"],
  [/- Link to implementation tutorials for readers ready to build or deploy\.\n## Final Verdict/g, "- Link to implementation tutorials for readers ready to build or deploy.\n\n## Final Verdict"],
  [/\n{3,}##/g, "\n\n##"],
];

let changed = 0;
for (const filePath of walk(CONTENT_DIR)) {
  let text = fs.readFileSync(filePath, "utf8");
  if (!text.includes(MARKER)) continue;
  const before = text;
  for (const [pattern, replacement] of fixes) {
    text = text.replace(pattern, replacement);
  }
  if (text !== before) {
    fs.writeFileSync(filePath, text);
    changed += 1;
  }
}

console.log(JSON.stringify({ changedCount: changed }, null, 2));
