import fs from "node:fs";
import path from "node:path";
import { PUBLIC_DIR, SITE_URL, TODAY, buildRouteMeta, ensurePublicDir } from "./seo_utils.js";

ensurePublicDir();

const routeMap = buildRouteMeta();
const routes = Object.values(routeMap)
  .filter((route) => route?.path && Array.isArray(route.schemas) && route.schemas.length > 0)
  .sort((a, b) => a.path.localeCompare(b.path));

const normalizeCanonical = (route) => {
  const canonicalPath = route.canonicalPath || route.path || "/";
  return `${SITE_URL}${canonicalPath === "/" ? "/" : canonicalPath}`;
};

const schemaIndex = {
  _meta: {
    site: SITE_URL,
    generatedAt: TODAY,
    description:
      "BestAIAgent.in route-level Schema.org JSON-LD export for search engines, AI crawlers, and internal SEO verification.",
    routeCount: routes.length,
    schemaCount: routes.reduce((sum, route) => sum + route.schemas.length, 0),
  },
  routes: routes.map((route) => ({
    path: route.path,
    canonical: normalizeCanonical(route),
    title: route.title,
    category: route.category,
    schemaTypes: route.schemaTypes || [],
    schemas: route.schemas,
  })),
};

fs.writeFileSync(path.join(PUBLIC_DIR, "schema-ld.json"), `${JSON.stringify(schemaIndex, null, 2)}\n`);

console.log(JSON.stringify({
  schemaRouteCount: schemaIndex._meta.routeCount,
  schemaCount: schemaIndex._meta.schemaCount,
  output: "public/schema-ld.json",
}, null, 2));
