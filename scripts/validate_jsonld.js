import fs from "node:fs";
import path from "node:path";
import { PUBLIC_DIR, SITE_URL, buildRouteMeta, walkMarkdown } from "./seo_utils.js";

const errors = [];

for (const file of walkMarkdown()) {
  const markdown = fs.readFileSync(file, "utf8");
  const structuredDataSection = markdown.split(/^## Structured Data Recommendations\s*$/m)[1] || "";
  for (const match of structuredDataSection.matchAll(/```json\n([\s\S]*?)\n```/g)) {
    try {
      const parsed = JSON.parse(match[1]);
      if (!parsed["@context"]) errors.push(`${file}: JSON-LD missing @context`);
      if (!parsed["@type"]) errors.push(`${file}: JSON-LD missing @type`);
      const text = JSON.stringify(parsed);
      if (text.includes("#") && text.includes(`${SITE_URL}/#`)) {
        // Home-page fragment IDs are fine.
      }
      if (text.includes("bestaigent.in")) errors.push(`${file}: stale misspelled domain`);
    } catch (error) {
      errors.push(`${file}: invalid JSON block - ${error.message}`);
    }
  }
}

const routeMetaPath = path.join(PUBLIC_DIR, "route-meta.json");
if (fs.existsSync(routeMetaPath)) {
  const routeMap = JSON.parse(fs.readFileSync(routeMetaPath, "utf8"));
  for (const [route, meta] of Object.entries(routeMap)) {
    for (const schema of meta.schemas || []) {
      if (schema["@context"] !== "https://schema.org") errors.push(`${route}: schema missing schema.org context`);
      if (!schema["@type"]) errors.push(`${route}: schema missing @type`);
      const text = JSON.stringify(schema);
      if (text.includes("bestaigent.in")) errors.push(`${route}: stale misspelled domain`);
      if (/https:\/\/bestaiagent\.in\/\//.test(text)) errors.push(`${route}: double slash URL in schema`);
    }
  }
} else {
  buildRouteMeta();
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("JSON-LD validation passed.");
