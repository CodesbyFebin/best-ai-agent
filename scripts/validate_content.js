import fs from "node:fs";
import { buildRouteMeta, field, h1, walkMarkdown, wordCount } from "./seo_utils.js";

const errors = [];
const warnings = [];
const seenRoutes = new Map();
const shortFormCategories = new Set(["editorial", "longtail", "reports"]);

for (const file of walkMarkdown()) {
  const markdown = fs.readFileSync(file, "utf8");
  const words = wordCount(markdown);
  const slug = (field(markdown, "URL Slug") || file.split("/").pop().replace(/\.md$/, "")).replace(/^\/+/, "");
  const category = file.split("/content/")[1]?.split("/")[0] || "";
  const allowShortForm = shortFormCategories.has(category);
  const route =
    category === "tools" ? `/tools/${slug}` :
    category === "mcp" && slug === "what-is-mcp" ? "/mcp/what-is-mcp" :
    `/${slug}`;
  const title = field(markdown, "SEO Title");
  const meta = field(markdown, "Meta Description");
  const pageH1 = h1(markdown);
  const hasQuickAnswer = /^## Quick Answer/m.test(markdown) || /^## Expanded Quick Answer for AI Overviews/m.test(markdown);
  const hasTakeaways = /^## Key Takeaways/m.test(markdown) || /^## Expanded Key Takeaways/m.test(markdown);
  const hasFaq = /^## FAQ/m.test(markdown) || /^## FAQ Section/m.test(markdown) || /^## Expanded FAQ/m.test(markdown);
  const hasStructuredData = /^## Structured Data Recommendations/m.test(markdown);

  if (seenRoutes.has(route)) errors.push(`Duplicate route "${route}" in ${file} and ${seenRoutes.get(route)}`);
  seenRoutes.set(route, file);
  if (words < 1500) {
    const message = `${file}: below 1,500 words (${words})`;
    if (allowShortForm) warnings.push(`${message}; allowed short-form ${category} asset`);
    else errors.push(message);
  }
  if (words < 2500) warnings.push(`${file}: intentionally below 2,500 words (${words}); likely legacy canonical/app route`);
  if (!title) warnings.push(`${file}: missing SEO Title header`);
  if (!meta) warnings.push(`${file}: missing Meta Description header`);
  if (!pageH1) errors.push(`${file}: missing H1`);
  if (!hasQuickAnswer) (allowShortForm ? warnings : errors).push(`${file}: missing Quick Answer`);
  if (!hasTakeaways) (allowShortForm ? warnings : errors).push(`${file}: missing Key Takeaways`);
  if (!hasFaq) (allowShortForm ? warnings : errors).push(`${file}: missing FAQ section`);
  if (!hasStructuredData) (allowShortForm ? warnings : errors).push(`${file}: missing Structured Data Recommendations`);
  if (markdown.includes("https://bestaigent.in")) errors.push(`${file}: stale misspelled domain`);
  if (/https:\/\/bestaiagent\.in\/\//.test(markdown)) errors.push(`${file}: double slash URL`);
}

const routeMap = buildRouteMeta();
const duplicateRoutes = new Set();
const seenRouteMapKeys = new Set();
for (const route of Object.keys(routeMap)) {
  if (seenRouteMapKeys.has(route)) duplicateRoutes.add(route);
  seenRouteMapKeys.add(route);
}
for (const route of duplicateRoutes) errors.push(`Duplicate route ${route}`);

if (warnings.length) console.warn(warnings.join("\n"));
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Content validation passed.");
