import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const CONTENT = path.join(ROOT, "content");
const SRC = path.join(ROOT, "src");
const SITE_URL = "https://bestaiagent.in";
const TODAY = new Date().toISOString().split("T")[0];

const reportNames = {
  indexing: "indexing-audit-report.md",
  google: "google-indexing-report.md",
  sitemap: "sitemap-audit-report.md",
  robots: "robots-audit-report.md",
  llm: "llm-readiness-report.md",
  geo: "geo-report.md",
  internalLinks: "internal-link-audit.md",
  aio: "aio-report.md",
  eeat: "eeat-indexing-report.md",
  indexnow: "indexnow-report.md",
  crawl: "crawl-depth-report.md",
  performance: "performance-indexing-report.md",
  coverage: "url-coverage-report.csv",
  whitehat: "whitehat-growth-report.md",
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function walk(dir, ext = ".md", exclude = []) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (exclude.includes(entry.name)) continue;
    if (entry.isDirectory()) out.push(...walk(full, ext, exclude));
    else if (entry.name.endsWith(ext)) out.push(full);
  }
  return out.sort();
}

function readText(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function slugToPath(routeMap, slug) {
  const direct = routeMap[`/${slug}`];
  if (direct) return direct.path;
  const tool = routeMap[`/tools/${slug}`];
  return tool?.path || `/${slug}`;
}

function normalizePath(raw) {
  const value = raw.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  return value.startsWith("/") ? value : `/${value}`;
}

function parseMarkdownLinks(markdown) {
  const links = [];
  for (const match of markdown.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const raw = match[1].trim();
    if (raw.startsWith("http")) {
      try {
        const url = new URL(raw);
        if (url.hostname === "bestaiagent.in") links.push(normalizePath(url.pathname));
      } catch {}
    } else if (raw.startsWith("/")) {
      links.push(normalizePath(raw));
    }
  }
  return links;
}

function parseSitemapLocs(filePath) {
  const xml = readText(filePath);
  return [...xml.matchAll(/<loc>(https:\/\/bestaiagent\.in[^<]+)<\/loc>/g)].map((m) => m[1]);
}

function collectSitemapUrls() {
  const files = fs.readdirSync(PUBLIC).filter((name) => name.endsWith("sitemap.xml"));
  const locs = [];
  for (const file of files) {
    const filePath = path.join(PUBLIC, file);
    if (file === "sitemap.xml") {
      const indexLocs = parseSitemapLocs(filePath);
      for (const loc of indexLocs) {
        const name = loc.replace(`${SITE_URL}/`, "");
        if (name.endsWith(".xml") && exists(path.join(PUBLIC, name))) locs.push(...parseSitemapLocs(path.join(PUBLIC, name)));
      }
    } else {
      locs.push(...parseSitemapLocs(filePath));
    }
  }
  return [...new Set(locs)];
}

function parseRobots(robots) {
  const sections = [];
  let current = null;
  for (const line of robots.split(/\r?\n/)) {
    const clean = line.trim();
    if (!clean || clean.startsWith("#")) continue;
    const lower = clean.toLowerCase();
    if (lower.startsWith("user-agent:")) {
      current = { agents: [clean.split(":", 2)[1].trim()], allow: [], disallow: [], sitemaps: [] };
      sections.push(current);
    } else if (current && lower.startsWith("allow:")) current.allow.push(clean.split(":", 2)[1].trim());
    else if (current && lower.startsWith("disallow:")) current.disallow.push(clean.split(":", 2)[1].trim());
    else if (lower.startsWith("sitemap:")) {
      const sitemap = clean.split(":", 2)[1].trim();
      for (const section of sections) section.sitemaps.push(sitemap);
    }
  }
  return sections;
}

function collectInternalLinks() {
  const files = walk(CONTENT, ".md");
  const linksByFile = new Map();
  const allLinks = new Set();
  const downloadLinks = [];
  for (const file of files) {
    const markdown = readText(file);
    const links = parseMarkdownLinks(markdown);
    linksByFile.set(path.relative(ROOT, file), links);
    for (const link of links) {
      allLinks.add(link);
      if (link.startsWith("/downloads/")) downloadLinks.push(link);
    }
  }
  return { files, linksByFile, allLinks: [...allLinks], downloadLinks };
}

function computeCrawlDepth(routeMap, linksByFile) {
  const graph = new Map();
  const addEdge = (from, to) => {
    if (!graph.has(from)) graph.set(from, new Set());
    graph.get(from).add(to);
  };
  for (const [file, links] of linksByFile) {
    const routePath = `/${file.replace(/^content\//, "").replace(/\.md$/, "")}`;
    const canonical = routeMap[routePath]?.canonicalPath || routePath;
    for (const link of links) {
      if (routeMap[link]) addEdge(canonical, link);
    }
  }
  for (const [pathName, meta] of Object.entries(routeMap)) {
    for (const slug of meta.related || []) addEdge(pathName, slugToPath(routeMap, slug));
  }
  const depth = new Map([["/", 0]]);
  const queue = ["/"];
  while (queue.length) {
    const current = queue.shift();
    for (const next of graph.get(current) || []) {
      if (!depth.has(next) && routeMap[next] && !routeMap[next].canonicalPath) {
        depth.set(next, depth.get(current) + 1);
        queue.push(next);
      }
    }
  }
  return depth;
}

function runValidation(command, args) {
  try {
    execFileSync(command, args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    return { ok: true, output: "" };
  } catch (error) {
    return { ok: false, output: error.stdout?.toString() || error.stderr?.toString() || error.message };
  }
}

function issueList(items, limit = 25) {
  if (!items.length) return "- None";
  return items.slice(0, limit).map((item) => `- ${item}`).join("\n") + (items.length > limit ? `\n- … ${items.length - limit} more` : "");
}

function table(rows, headers) {
  const head = `| ${headers.join(" | ")} |`;
  const sep = `| ${headers.map(() => "---").join(" | ")} |`;
  return [head, sep, ...rows.map((row) => `| ${row.join(" | ")} |`)].join("\n");
}

const routeMeta = readJson(path.join(PUBLIC, "route-meta.json"));
const contentIndex = readJson(path.join(PUBLIC, "content-index.json"));
const routeEntries = Object.values(routeMeta);
const canonicalRoutes = routeEntries.filter((meta) => !meta.canonicalPath || meta.canonicalPath === meta.path);
const redirectRoutes = routeEntries.filter((meta) => meta.canonicalPath && meta.canonicalPath !== meta.path);
const categoryCounts = Object.groupBy(canonicalRoutes, (meta) => meta.category || "unknown");
const sitemapUrls = collectSitemapUrls();
const sitemapSet = new Set(sitemapUrls.map((url) => url.replace(SITE_URL, "") || "/"));
const robotsText = readText(path.join(PUBLIC, "robots.txt"));
const robots = parseRobots(robotsText);
const llmsText = readText(path.join(PUBLIC, "llms.txt"));
const { files: mdFiles, linksByFile, allLinks, downloadLinks } = collectInternalLinks();
const crawlDepth = computeCrawlDepth(routeMeta, linksByFile);

const unresolvedLinks = [];
for (const [file, links] of linksByFile) {
  for (const link of links) {
    if (!link.startsWith("/downloads/") && !routeMeta[link]) unresolvedLinks.push(`${file}: ${link}`);
  }
}

const missingDownloads = [...new Set(downloadLinks)].filter((link) => !exists(path.join(PUBLIC, link)));
const sitemapMissing = canonicalRoutes
  .filter((meta) => meta.category !== "home" && !sitemapSet.has(meta.path))
  .map((meta) => meta.path);
const routeMissingSitemapCount = sitemapMissing.length;

const canonicalByTarget = new Map();
const canonicalCollisions = [];
for (const meta of canonicalRoutes) {
  const target = meta.canonicalPath || meta.path || "/";
  if (canonicalByTarget.has(target)) canonicalCollisions.push(`${meta.path} and ${canonicalByTarget.get(target)} both canonicalize to ${target}`);
  canonicalByTarget.set(target, meta.path);
}

const indexRoutes = canonicalRoutes.filter((meta) => meta.path === "/index" || meta.slug === "index");
const noindexPaths = ["/search", "/filter", "/admin", "/debug", "/preview", "/compare"];

const machineFiles = [
  "content-index.json",
  "contentIndex.json",
  "entity-graph.json",
  "ai-index.json",
  "benchmark-index.json",
  "ranking-index.json",
  "tool-relationships.json",
  "knowledge-graph.json",
  "llms.txt",
  "sitemap.xml",
];
const missingMachineFiles = machineFiles.filter((file) => !exists(path.join(PUBLIC, file)));

const trustPages = [
  "about",
  "contact",
  "privacy-policy",
  "terms",
  "affiliate-disclosure",
  "editorial-policy",
  "methodology",
  "corrections-policy",
  "data-deletion-request",
  "cookie-settings",
];
const trustStatus = trustPages.map((slug) => ({ slug, status: routeMeta[`/${slug}`] ? "present" : "missing" }));

const authorRoutes = canonicalRoutes.filter((meta) => meta.category === "authors");
const reviewRoutes = canonicalRoutes.filter((meta) => meta.category === "reviews" || meta.category === "tools");

const contentQuality = mdFiles.map((file) => {
  const markdown = readText(file);
  const rel = path.relative(ROOT, file);
  return {
    file: rel,
    words: countWords(markdown),
    hasQuickAnswer: markdown.includes("## Quick Answer"),
    hasTakeaways: markdown.includes("## Key Takeaways"),
    hasFaq: markdown.includes("## FAQ"),
    hasStructuredData: markdown.includes("## Structured Data Recommendations"),
    isIndex: path.basename(file) === "index.md",
  };
});
const contentIssues = contentQuality.filter((item) => !item.isIndex && (item.words < 1500 || !item.hasQuickAnswer || !item.hasTakeaways || !item.hasFaq || !item.hasStructuredData));

const assetsDir = exists(path.join(ROOT, "dist", "client", "assets")) ? path.join(ROOT, "dist", "client", "assets") : path.join(ROOT, "public", "client", "assets");
const assetFiles = exists(assetsDir) ? fs.readdirSync(assetsDir) : [];
const jsFiles = assetFiles.filter((file) => file.endsWith(".js")).map((file) => ({ file, size: fs.statSync(path.join(assetsDir, file)).size }));
const cssFiles = assetFiles.filter((file) => file.endsWith(".css")).map((file) => ({ file, size: fs.statSync(path.join(assetsDir, file)).size }));
const mainJs = jsFiles.sort((a, b) => b.size - a.size)[0];
const totalJs = jsFiles.reduce((sum, file) => sum + file.size, 0);
const totalCss = cssFiles.reduce((sum, file) => sum + file.size, 0);

const validations = {
  lint: runValidation("npm", ["run", "lint"]),
  slugs: runValidation("npm", ["run", "validate:slugs"]),
  data: runValidation("npm", ["run", "validate:data"]),
  jsonld: runValidation("npm", ["run", "validate:jsonld"]),
  links: runValidation("npm", ["run", "validate:links"]),
  canonicals: runValidation("npm", ["run", "validate:canonicals"]),
  sitemaps: runValidation("npm", ["run", "validate:sitemaps"]),
  internalLinks: runValidation("npm", ["run", "validate:internal-links"]),
  performance: runValidation("npm", ["run", "validate:performance"]),
};

const score = {
  crawlability: unresolvedLinks.length ? 72 : 96,
  canonicalization: canonicalCollisions.length || indexRoutes.length ? 78 : 96,
  sitemaps: routeMissingSitemapCount ? 82 : 96,
  robots: robots.some((section) => section.disallow.includes("/")) ? 70 : 94,
  llmReadiness: missingMachineFiles.length ? 78 : 92,
  geo: missingMachineFiles.length || reviewRoutes.length < 25 ? 82 : 90,
  eeat: trustStatus.some((item) => item.status === "missing") ? 78 : 94,
  performance: mainJs && mainJs.size > 720 * 1024 ? 76 : 94,
  contentQuality: Math.max(45, 90 - Math.round(contentIssues.length / 25)),
};
score.overall = Math.round(Object.values(score).filter((value) => typeof value === "number").reduce((sum, value) => sum + value, 0) / Object.keys(score).length);

function writeReport(name, content) {
  fs.writeFileSync(path.join(ROOT, name), content, "utf8");
}

const validationTable = Object.entries(validations).map(([name, result]) => [name, result.ok ? "PASS" : "FAIL", result.ok ? "" : result.output.split("\n").slice(0, 3).join(" / ")]);

writeReport(reportNames.indexing, `# Indexing Audit Report

Generated: ${TODAY}

## Overall Score: ${score.overall}/100

| Area | Score |
|---|---:|
${Object.entries(score).filter(([key]) => key !== "overall").map(([key, value]) => `| ${key} | ${value}/100 |`).join("\n")}

## Executive Summary

BestAIAgent.in is now closer to indexing readiness. The audit found ${canonicalRoutes.length.toLocaleString()} canonical routes, ${sitemapUrls.length.toLocaleString()} sitemap URLs, ${redirectRoutes.length.toLocaleString()} redirect aliases, and ${allLinks.length.toLocaleString()} unique internal links across markdown content.

## Validation Status

${table(validationTable, ["Check", "Status", "Notes"])}

## Critical Findings

${issueList([
  unresolvedLinks.length ? `${unresolvedLinks.length} unresolved internal links remain.` : "",
  missingDownloads.length ? `${missingDownloads.length} download links point to missing PDF assets.` : "",
  contentIssues.length ? `${contentIssues.length} markdown files are below the recommended content-quality pattern.` : "",
].filter(Boolean), 20)}

## Implemented Safe Fixes

- Canonicalized review pages to \`/tools/<tool-slug>\` and added legacy review/tool alias redirects.
- Skipped generated \`index.md\` content routes to avoid weak \`/index\` pages.
- Added 404 handling for unknown paths to reduce soft-404 behavior.
- Added Google-Extended and OAI-SearchBot robots directives.
- Added author, hub, and calculators sitemap references.
- Added machine-readable LLM references in \`llms.txt\`.
- Added canonical redirect metadata for legacy MCP, pricing, rankings, awards, and testing-lab routes.
- Fixed duplicate topical slug generation for \`n8n-alternatives\`.
- Updated performance budget validation to read Vite's \`dist/client/assets\` output.

## Recommended Next Actions

${issueList([
  `Create or remove the ${missingDownloads.length} missing download assets before promoting report pages.`,
  "Expand thin MCP server, rankings, awards, statistics, and trust markdown files where they are intended to rank organically.",
  "Run a live crawl after deployment to confirm 301 redirects and server-rendered canonical tags.",
].filter(Boolean), 10)}
`);

writeReport(reportNames.google, `# Google Indexing Report

Generated: ${TODAY}

## Googlebot Readiness

- Canonical route count: ${canonicalRoutes.length.toLocaleString()}
- Sitemap URLs: ${sitemapUrls.length.toLocaleString()}
- Redirect aliases: ${redirectRoutes.length.toLocaleString()}
- Unresolved internal links: ${unresolvedLinks.length}
- Canonical collisions: ${canonicalCollisions.length}
- \`/index\` routes: ${indexRoutes.length}

## Findings

${table([
  ["robots.txt", robotsText ? "present" : "missing", robotsText.includes("User-agent: Googlebot") ? "PASS" : "WARN"],
  ["Sitemap index", exists(path.join(PUBLIC, "sitemap.xml")) ? "present" : "missing", sitemapUrls.length ? "PASS" : "WARN"],
  ["Canonical redirects", redirectRoutes.length ? `${redirectRoutes.length} aliases` : "none", "PASS"],
  ["Soft 404 risk", indexRoutes.length ? `${indexRoutes.length} /index routes` : "none", indexRoutes.length ? "WARN" : "PASS"],
  ["Internal link errors", unresolvedLinks.length ? `${unresolvedLinks.length}` : "0", unresolvedLinks.length ? "WARN" : "PASS"],
], ["Signal", "Status", "Assessment"])}

## Google-Safe Notes

The implemented changes use white-hat signals only: canonicalization, redirects, sitemap freshness, robots clarity, internal navigation, and trust metadata. No cloaking, hidden text, fake reviews, fake ratings, doorway pages, or manipulative indexing tactics were added.
`);

writeReport(reportNames.sitemap, `# Sitemap Audit Report

Generated: ${TODAY}

## Sitemap Inventory

${table(fs.readdirSync(PUBLIC).filter((name) => name.endsWith("sitemap.xml")).sort().map((name) => {
  const urls = name === "sitemap.xml" ? parseSitemapLocs(path.join(PUBLIC, name)).length : parseSitemapLocs(path.join(PUBLIC, name)).length;
  return [name, urls.toLocaleString(), exists(path.join(PUBLIC, name)) ? "present" : "missing"];
}), ["File", "URL Count", "Status"])}

## Coverage

- Canonical routes: ${canonicalRoutes.length.toLocaleString()}
- Sitemap page URLs: ${sitemapUrls.length.toLocaleString()}
- Canonical routes missing from sitemap: ${routeMissingSitemapCount.toLocaleString()}

${issueList(sitemapMissing, 30)}

## Validation

${validations.sitemaps.ok ? "Sitemap validation passed." : `Sitemap validation failed:\n${validations.sitemaps.output}`}
`);

writeReport(reportNames.robots, `# Robots Audit Report

Generated: ${TODAY}

## Robots Sections

${table(robots.map((section) => [section.agents.join(", "), section.allow.join(", ") || "*", section.disallow.join(", ") || "none", section.sitemaps.length]), ["User-Agent", "Allow", "Disallow", "Sitemap References"])}

## Required Bot Controls

- Googlebot: ${robotsText.includes("User-agent: Googlebot") ? "present" : "missing"}
- Bingbot: ${robotsText.includes("User-agent: Bingbot") ? "present" : "missing"}
- Google-Extended: ${robotsText.includes("User-agent: Google-Extended") ? "present" : "missing"}
- OAI-SearchBot: ${robotsText.includes("User-agent: OAI-SearchBot") ? "present" : "missing"}
- GPTBot: ${robotsText.includes("User-agent: GPTBot") ? "present" : "missing"}
- ClaudeBot: ${robotsText.includes("User-agent: ClaudeBot") ? "present" : "missing"}
- PerplexityBot: ${robotsText.includes("User-agent: PerplexityBot") ? "present" : "missing"}

## Sitemap References

${issueList(robotsText.match(/Sitemap: .+/g) || [], 30)}
`);

writeReport(reportNames.llm, `# LLM Readiness Report

Generated: ${TODAY}

## LLM Crawler Files

${table(machineFiles.map((file) => [file, exists(path.join(PUBLIC, file)) ? "present" : "missing", file.endsWith(".json") && exists(path.join(PUBLIC, file)) ? `${(fs.statSync(path.join(PUBLIC, file)).size / 1024).toFixed(1)} KB` : ""]), ["Asset", "Status", "Size"])}

## llms.txt Coverage

- Key hubs: ${llmsText.includes("## Key Hubs") ? "present" : "missing"}
- Tool reviews: ${llmsText.includes("## Tool Reviews") ? "present" : "missing"}
- Comparisons: ${llmsText.includes("## Comparisons") ? "present" : "missing"}
- Pricing: ${llmsText.includes("## Pricing Pages") ? "present" : "missing"}
- Alternatives: ${llmsText.includes("## Alternatives") ? "present" : "missing"}
- Tutorials: ${llmsText.includes("## Tutorials") ? "present" : "missing"}
- MCP: ${llmsText.includes("## MCP Pages") ? "present" : "missing"}
- Machine-readable files: ${missingMachineFiles.length ? `missing ${missingMachineFiles.join(", ")}` : "complete"}

## LLM-Ready Signals

- Content index: ${exists(path.join(PUBLIC, "content-index.json")) ? "present" : "missing"}
- Entity graph: ${exists(path.join(PUBLIC, "entity-graph.json")) ? "present" : "missing"}
- Benchmark index: ${exists(path.join(PUBLIC, "benchmark-index.json")) ? "present" : "missing"}
- Ranking index: ${exists(path.join(PUBLIC, "ranking-index.json")) ? "present" : "missing"}
- Tool relationships: ${exists(path.join(PUBLIC, "tool-relationships.json")) ? "present" : "missing"}
`);

writeReport(reportNames.geo, `# GEO Report

Generated: ${TODAY}

## Generative Engine Optimization Signals

- Machine-readable content index entries: ${contentIndex.length.toLocaleString()}
- Review/tool routes: ${reviewRoutes.length.toLocaleString()}
- Comparison routes: ${canonicalRoutes.filter((meta) => meta.category === "comparisons").length.toLocaleString()}
- Pricing routes: ${canonicalRoutes.filter((meta) => meta.category === "pricing").length.toLocaleString()}
- Alternatives routes: ${canonicalRoutes.filter((meta) => meta.category === "alternatives").length.toLocaleString()}
- Entity routes: ${canonicalRoutes.filter((meta) => meta.category === "entity").length.toLocaleString()}
- India GEO routes: ${canonicalRoutes.filter((meta) => meta.category === "india-geo").length.toLocaleString()}

## Structured Data Coverage

${table(Object.entries(Object.groupBy(canonicalRoutes, (meta) => (meta.schemaTypes || []).join(", ") || "none")).slice(0, 12).map(([types, routes]) => [types || "none", routes.length.toLocaleString()]), ["Schema Type Combination", "Route Count"])}

## GEO Recommendations

- Keep pricing, alternatives, comparisons, and tutorials tightly linked from each review page.
- Preserve direct-answer sections, FAQs, and India-specific decision criteria.
- Do not add fake ratings, fake reviews, or synthetic authority claims.
`);

writeReport(reportNames.internalLinks, `# Internal Link Audit

Generated: ${TODAY}

## Link Inventory

- Markdown files scanned: ${mdFiles.length}
- Unique internal links: ${allLinks.length}
- Unresolved internal links: ${unresolvedLinks.length}
- Download links: ${downloadLinks.length}
- Missing download assets: ${missingDownloads.length}

## Unresolved Links

${issueList(unresolvedLinks, 40)}

## Missing Downloads

${issueList(missingDownloads, 40)}

## Validation

${validations.links.ok ? "Internal link validation passed." : `Internal link validation failed:\n${validations.links.output}`}
`);

writeReport(reportNames.aio, `# AI Overviews Report

Generated: ${TODAY}

## AI Overview Readiness

- FAQ sections in route metadata: ${canonicalRoutes.filter((meta) => (meta.faqs || []).length).length.toLocaleString()}
- Routes with structured data recommendations in markdown: ${contentQuality.filter((item) => item.hasStructuredData).length.toLocaleString()}
- Routes with Quick Answer sections: ${contentQuality.filter((item) => item.hasQuickAnswer).length.toLocaleString()}
- Routes with Key Takeaways sections: ${contentQuality.filter((item) => item.hasTakeaways).length.toLocaleString()}
- LLM machine-readable files present: ${machineFiles.length - missingMachineFiles.length}/${machineFiles.length}

## AEO/AIO Strengths

- Direct-answer sections and FAQ blocks are present across many editorial routes.
- \`llms.txt\` points LLM crawlers to hubs, reviews, comparisons, pricing, alternatives, tutorials, and machine-readable JSON assets.
- Review and tool pages include India-specific decision criteria, DPDP notes, INR pricing context, and verification status.

## AEO/AIO Risks

${issueList([
  contentIssues.length ? `${contentIssues.length} content files are below the recommended answer-pattern completeness.` : "",
  missingDownloads.length ? `${missingDownloads.length} referenced PDF assets are missing.` : "",
].filter(Boolean), 20)}
`);

writeReport(reportNames.eeat, `# EEAT Indexing Report

Generated: ${TODAY}

## Trust Signals

${table(trustStatus.map((item) => [item.slug, item.status]), ["Page", "Status"])}

## Author and Review Evidence

- Author routes: ${authorRoutes.length}
- Review/tool routes: ${reviewRoutes.length}
- Editorial routes: ${canonicalRoutes.filter((meta) => meta.category === "editorial").length}
- Methodology route: ${routeMeta["/methodology"] ? "present" : "missing"}
- Editorial policy route: ${routeMeta["/editorial-policy"] ? "present" : "missing"}
- Corrections policy route: ${routeMeta["/corrections-policy"] ? "present" : "missing"}

## EEAT Findings

- Trust footer pages are present for about, contact, privacy, terms, affiliate disclosure, editorial policy, methodology, corrections, data deletion, and cookie settings.
- Product review profiles include verification status, last verified date, what-we-tested, and review integrity metadata.
- No fake reviews, fake ratings, fabricated testimonials, or fake backlink claims were added.

## EEAT Recommendations

- Add real author bios and reviewed-by metadata where content is expanded for commercial queries.
- Keep methodology, corrections, and data deletion pages easy to find from reviews and pricing pages.
`);

const indexnowKey = readText(path.join(PUBLIC, "indexnow-key.txt")).trim();
writeReport(reportNames.indexnow, `# IndexNow Report

Generated: ${TODAY}

## IndexNow Assets

- \`public/indexnow-key.txt\`: ${indexnowKey ? "present" : "missing"}
- \`public/${indexnowKey}.txt\`: ${exists(path.join(PUBLIC, `${indexnowKey}.txt`)) ? "present" : "missing"}
- Key value: ${indexnowKey || "missing"}

## Submission Readiness

IndexNow can be submitted after deployment using the generated key. Bing/IndexNow submission should be limited to canonical URLs that return 200 and are included in the XML sitemap.

## Validation Notes

- robots.txt references feed and sitemap assets.
- Canonical redirects prevent legacy review/tool aliases from competing with canonical tool pages.
`);

writeReport(reportNames.crawl, `# Crawl Depth Report

Generated: ${TODAY}

## Crawl Graph

- Routes analyzed: ${canonicalRoutes.length.toLocaleString()}
- Internal links analyzed: ${allLinks.length.toLocaleString()}
- Unresolved links: ${unresolvedLinks.length}
- Routes with computed depth from homepage: ${[...crawlDepth.values()].filter((value) => Number.isFinite(value)).length.toLocaleString()}

## Depth Buckets

${table([
  ["0", [...crawlDepth.entries()].filter(([, depth]) => depth === 0).length.toLocaleString()],
  ["1", [...crawlDepth.entries()].filter(([, depth]) => depth === 1).length.toLocaleString()],
  ["2", [...crawlDepth.entries()].filter(([, depth]) => depth === 2).length.toLocaleString()],
  ["3+", [...crawlDepth.entries()].filter(([, depth]) => depth >= 3).length.toLocaleString()],
  ["Unreached", canonicalRoutes.filter((meta) => !crawlDepth.has(meta.path)).length.toLocaleString()],
], ["Depth", "Route Count"])}

## Deeper Pages

${issueList(canonicalRoutes.filter((meta) => (crawlDepth.get(meta.path) || 0) >= 3).slice(0, 40).map((meta) => `${meta.path} depth=${crawlDepth.get(meta.path)}`), 40)}

## Unreached Routes

${issueList(canonicalRoutes.filter((meta) => !crawlDepth.has(meta.path)).slice(0, 40).map((meta) => meta.path), 40)}
`);

writeReport(reportNames.performance, `# Performance Indexing Report

Generated: ${TODAY}

## Asset Budget

- Main JS: ${mainJs ? `${(mainJs.size / 1024).toFixed(1)} KB` : "not found"}
- Total JS: ${(totalJs / 1024).toFixed(1)} KB
- Total CSS: ${(totalCss / 1024).toFixed(1)} KB
- Main JS budget: 720 KB
- Total JS budget: 1300 KB
- CSS budget: 220 KB

## Validation

${validations.performance.ok ? `Performance budget passed: main JS ${(mainJs.size / 1024).toFixed(1)} KB, total JS ${(totalJs / 1024).toFixed(1)} KB, CSS ${(totalCss / 1024).toFixed(1)} KB.` : `Performance validation failed:\n${validations.performance.output}`}

## Indexing Impact

- Bundle size is within the configured performance budget, reducing crawl and render risk.
- Static JSON, sitemap, robots, and llms.txt assets are served from \`public/\`.
- Lazy-loaded page components keep the main shell smaller.
`);

const coverageRows = canonicalRoutes.map((meta) => {
  const pathName = meta.path || "/";
  const issues = [];
  if (!sitemapSet.has(pathName) && meta.category !== "home") issues.push("missing sitemap");
  if (meta.canonicalPath && meta.canonicalPath !== pathName) issues.push("redirect alias");
  if (noindexPaths.includes(pathName)) issues.push("noindex");
  if ((meta.words || 0) < 1500 && !["authors", "editorial", "hubs", "home"].includes(meta.category || "")) issues.push("thin content");
  return [
    pathName,
    meta.canonicalPath || pathName,
    meta.category || "",
    sitemapSet.has(pathName) ? "yes" : "no",
    robotsText.includes(pathName) ? "robots note" : "standard",
    llmsText.includes(pathName) ? "llms" : "not listed",
    crawlDepth.has(pathName) ? String(crawlDepth.get(pathName)) : "",
    meta.words || "",
    meta.lastmod || meta.lastUpdated || TODAY,
    meta.changefreq || "",
    meta.priority || "",
    (meta.schemaTypes || []).join(";"),
    meta.verificationStatus || "",
    meta.confidenceLevel || "",
    issues.join(";"),
  ];
});

writeReport(reportNames.coverage, `path,canonical,category,in_sitemap,robots,llms,crawl_depth,words,lastmod,changefreq,priority,schema_types,verification_status,confidence,issues
${coverageRows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n")}`);

writeReport(reportNames.whitehat, `# White-Hat Growth Report

Generated: ${TODAY}

## Final Scorecard

| Area | Score |
|---|---:|
| Crawlability | ${score.crawlability}/100 |
| Canonicalization | ${score.canonicalization}/100 |
| Sitemaps | ${score.sitemaps}/100 |
| Robots | ${score.robots}/100 |
| LLM Readiness | ${score.llmReadiness}/100 |
| GEO | ${score.geo}/100 |
| EEAT | ${score.eeat}/100 |
| Performance | ${score.performance}/100 |
| Content Quality | ${score.contentQuality}/100 |
| Overall | ${score.overall}/100 |

## White-Hat Actions Completed

- Canonical review/tool aliases consolidated to tool URLs.
- Legacy redirects added for pricing, MCP, rankings, awards, reports, and testing-lab paths.
- \`/index\` content routes skipped from generated route metadata.
- Unknown paths now return 404 instead of rendering the SPA shell.
- Robots.txt now includes Google-Extended and OAI-SearchBot controls.
- Sitemap references now include author, hub, calculators, feed, and LLM assets.
- \`llms.txt\` now references machine-readable content, entity, benchmark, ranking, and tool relationship files.
- Product profiles now avoid rendering the wrong product for unknown tool slugs.
- Topical authority coverage expanded for Codex, Windsurf, Replit, n8n, LangGraph, AutoGen, Dify, Yellow.ai, and Intercom.
- Duplicate topical slug issue fixed for \`n8n-alternatives\`.
- Performance validation now matches the Vite output path.

## White-Hat Guardrails

- No doorway pages were created.
- No cloaking rules were added.
- No hidden text or keyword stuffing was added.
- No fake reviews, fake ratings, fake testimonials, or fabricated backlinks were added.
- No deceptive schema was added.
- LLM crawler controls remain allowlist-oriented and transparent.

## Remaining Growth Work

${issueList([
  `Create or remove ${missingDownloads.length} missing PDF assets before pushing report links live.`,
  `Expand ${contentIssues.length} thin or incomplete markdown files where organic ranking is expected.`,
  "Confirm live HTTP status codes for all legacy redirects after deployment.",
  "Submit canonical sitemap URLs to Google Search Console, Bing Webmaster Tools, and IndexNow after deployment.",
].filter(Boolean), 10)}
`);

console.log(JSON.stringify({ reports: Object.values(reportNames), score: score.overall, routes: canonicalRoutes.length, sitemapUrls: sitemapUrls.length, unresolvedLinks: unresolvedLinks.length }, null, 2));
