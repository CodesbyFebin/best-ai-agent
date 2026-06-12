import fs from "node:fs";
import path from "node:path";
import { PUBLIC_DIR, SITE_URL, buildRouteMeta, walkMarkdown } from "./seo_utils.js";

const routeMap = buildRouteMeta();
const validPaths = new Set(Object.keys(routeMap));
const errors = [];

function checkPath(source, raw) {
  if (!raw || raw.startsWith("//")) return;
  if (raw.startsWith("/api/") || raw.startsWith("/assets/")) return;
  const clean = raw.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  if (clean.includes("#")) errors.push(`${source}: hash URL found (${raw})`);
  if (!validPaths.has(clean)) {
    errors.push(`${source}: unresolved internal link ${raw}`);
  }
}

for (const file of walkMarkdown()) {
  const markdown = fs.readFileSync(file, "utf8");
  for (const match of markdown.matchAll(/\]\((\/[^)\s]+)\)/g)) checkPath(file, match[1]);
  for (const match of markdown.matchAll(/https:\/\/bestaiagent\.in(\/[^\s"')<]*)/g)) checkPath(file, match[1]);
}

const sitemapFiles = fs.existsSync(PUBLIC_DIR) ? fs.readdirSync(PUBLIC_DIR).filter((name) => name.endsWith("sitemap.xml") || name === "sitemap.xml") : [];
for (const sitemap of sitemapFiles) {
  const xml = fs.readFileSync(path.join(PUBLIC_DIR, sitemap), "utf8");
  if (xml.includes("#")) errors.push(`${sitemap}: hash URL found`);
  for (const match of xml.matchAll(new RegExp(`${SITE_URL.replace(/\./g, "\\.")}(/[^<]*)`, "g"))) {
    const value = match[1];
    if (value.endsWith(".xml")) continue;
    checkPath(sitemap, value);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Link validation passed.");
