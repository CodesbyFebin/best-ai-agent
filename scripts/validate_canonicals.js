import fs from "node:fs";
import path from "node:path";
import { PUBLIC_DIR, SITE_URL } from "./seo_utils.js";

const errors = [];
const SITE_URL_PATTERN = SITE_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const routeMetaPath = path.join(PUBLIC_DIR, "route-meta.json");

if (!fs.existsSync(routeMetaPath)) {
  console.error("Missing public/route-meta.json. Run npm run generate:seo first.");
  process.exit(1);
}

const routeMap = JSON.parse(fs.readFileSync(routeMetaPath, "utf8"));
const canonicals = new Map();

for (const [routePath, meta] of Object.entries(routeMap)) {
  const canonicalPath = meta.canonicalPath || meta.path || routePath;
  const canonical = `${SITE_URL}${canonicalPath === "/" ? "/" : canonicalPath}`;
  if (canonical.includes("#")) errors.push(`${routePath}: canonical contains hash (${canonical})`);
  if (new RegExp(`${SITE_URL_PATTERN}//`).test(canonical)) errors.push(`${routePath}: canonical has double slash (${canonical})`);
  if (!canonical.startsWith(SITE_URL)) errors.push(`${routePath}: canonical outside site (${canonical})`);
  if (!meta.canonicalPath && routePath === meta.path && canonicalPath !== routePath && routePath !== "/") {
    errors.push(`${routePath}: canonical path mismatch (${canonicalPath})`);
  }
  const previous = canonicals.get(canonical);
  if (previous && previous !== routePath && !meta.canonicalPath) {
    errors.push(`${routePath}: canonical collision with ${previous} (${canonical})`);
  }
  canonicals.set(canonical, routePath);
}

const sitemapFiles = fs.readdirSync(PUBLIC_DIR).filter((name) => name.endsWith("sitemap.xml") && name !== "sitemap.xml");
for (const sitemap of sitemapFiles) {
  const xml = fs.readFileSync(path.join(PUBLIC_DIR, sitemap), "utf8");
  for (const match of xml.matchAll(new RegExp(`<loc>(${SITE_URL_PATTERN}[^<]+)</loc>`, "g"))) {
    const loc = match[1];
    if (loc.includes("#")) errors.push(`${sitemap}: sitemap URL contains hash (${loc})`);
    if (new RegExp(`${SITE_URL_PATTERN}//`).test(loc)) errors.push(`${sitemap}: sitemap URL has double slash (${loc})`);
    const pathName = loc.replace(SITE_URL, "") || "/";
    if (!routeMap[pathName]) errors.push(`${sitemap}: URL missing from route-meta (${pathName})`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Canonical validation passed.");
