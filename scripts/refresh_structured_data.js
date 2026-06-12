import fs from "node:fs";
import { buildRouteMeta, categoryFromFile, cleanSlug, contentRoute, field, pageSchema, walkMarkdown } from "./seo_utils.js";

const routeMap = buildRouteMeta();
let changed = 0;

for (const filePath of walkMarkdown()) {
  let markdown = fs.readFileSync(filePath, "utf8");
  const category = categoryFromFile(filePath);
  const slug = cleanSlug(field(markdown, "URL Slug"), filePath);
  const routePath = contentRoute(category, slug);
  const meta = routeMap[routePath];
  if (!meta) continue;
  const schemas = meta.schemas || pageSchema(meta);
  const section = `## Structured Data Recommendations

${schemas.map((schema) => `\`\`\`json\n${JSON.stringify(schema, null, 2)}\n\`\`\``).join("\n\n")}
`;
  if (/^## Structured Data Recommendations/m.test(markdown)) {
    markdown = markdown.replace(/^## Structured Data Recommendations[\s\S]*$/m, section);
  } else {
    markdown = `${markdown.trimEnd()}\n\n${section}`;
  }
  fs.writeFileSync(filePath, markdown);
  changed += 1;
}

console.log(JSON.stringify({ changedCount: changed }, null, 2));
