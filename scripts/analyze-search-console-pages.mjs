import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SITE_URL = "https://bestaiagent.in";
const DEFAULT_INPUT = path.join(ROOT, "scripts/reference/search-console-top-pages.txt");
const DEFAULT_REPORT = path.join(ROOT, "reports/search-console-top-pages-report.md");
const DEFAULT_JSON = path.join(ROOT, "reports/search-console-top-pages.json");

function parseNumber(value) {
  return Number(String(value || "").replace(/,/g, "").trim()) || 0;
}

function normalizePath(urlOrPath) {
  const raw = String(urlOrPath || "").trim();
  if (!raw) return "";
  try {
    const parsed = new URL(raw.startsWith("http") ? raw : `${SITE_URL}${raw.startsWith("/") ? raw : `/${raw}`}`);
    const clean = parsed.pathname.replace(/\/+$/, "");
    return clean || "/";
  } catch {
    const clean = raw.replace(/^https?:\/\/[^/]+/i, "").replace(/\/+$/, "");
    return clean.startsWith("/") ? clean || "/" : `/${clean}`;
  }
}

function isSiteUrl(urlOrPath) {
  const raw = String(urlOrPath || "").trim();
  if (!raw) return false;
  if (raw.startsWith("/")) return true;
  try {
    return new URL(raw).hostname.replace(/^www\./, "") === "bestaiagent.in";
  } catch {
    return false;
  }
}

function classifyPath(pathName) {
  if (pathName === "/") return "home";
  if (pathName.startsWith("/tools/")) return "tool-profile";
  if (pathName.includes("-pricing") || pathName === "/pricing") return "pricing";
  if (pathName.includes("-alternatives")) return "alternatives";
  if (pathName.includes("-vs-")) return "comparison";
  if (pathName.includes("mcp")) return "mcp";
  if (pathName.includes("coding") || pathName.includes("cursor") || pathName.includes("copilot") || pathName.includes("claude-code")) return "coding";
  if (pathName.includes("voice") || pathName.includes("vapi") || pathName.includes("retell") || pathName.includes("yellow-ai")) return "voice";
  if (pathName.includes("finance") || pathName.includes("business") || pathName.includes("sales") || pathName.includes("support")) return "business";
  if (pathName.includes("free")) return "free";
  return "guide";
}

function targetCtrFor(kind) {
  if (kind === "pricing") return 0.06;
  if (kind === "tool-profile") return 0.05;
  if (kind === "comparison" || kind === "alternatives") return 0.045;
  if (kind === "home") return 0.04;
  return 0.035;
}

function buildPageMetric(url, pathName, clicks, impressions) {
  const kind = classifyPath(pathName);
  const ctr = impressions ? clicks / impressions : 0;
  const targetCtr = targetCtrFor(kind);
  const opportunityClicks = Math.max(0, Math.round(impressions * targetCtr - clicks));
  return {
    url,
    path: pathName,
    clicks,
    impressions,
    ctr,
    ctrPercent: Number((ctr * 100).toFixed(2)),
    kind,
    targetCtr,
    targetCtrPercent: Number((targetCtr * 100).toFixed(1)),
    opportunityClicks,
    opportunityScore: Number((opportunityClicks * Math.log10(impressions + 10)).toFixed(2)),
  };
}

export function parseTopPages(text) {
  const lines = String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const pageMap = new Map();

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const urlMatch = line.match(/https?:\/\/\S+/);
    if (!urlMatch) continue;

    const url = urlMatch[0];
    if (!isSiteUrl(url)) continue;
    let metricsText = line.slice(urlMatch.index + url.length).trim();
    if (!/\d/.test(metricsText) && i + 1 < lines.length) {
      metricsText = lines[i + 1];
      i += 1;
    }

    const metricMatches = [...String(metricsText).matchAll(/[\d,]+(?:\.\d+)?/g)].map((match) => match[0]);
    if (metricMatches.length < 2) continue;

    const clicks = parseNumber(metricMatches[0]);
    const impressions = parseNumber(metricMatches[1]);
    const pathName = normalizePath(url);
    const existing = pageMap.get(pathName);
    pageMap.set(pathName, {
      url,
      path: pathName,
      clicks: (existing?.clicks || 0) + clicks,
      impressions: (existing?.impressions || 0) + impressions,
    });
  }

  return [...pageMap.values()]
    .map((page) => buildPageMetric(page.url, page.path, page.clicks, page.impressions))
    .sort((a, b) => b.impressions - a.impressions);
}

function actionFor(page) {
  if (page.impressions >= 100 && page.ctr < 0.01) {
    return "Rewrite title/meta for search intent, add stronger above-fold answer, and add links from relevant winners.";
  }
  if (page.impressions >= 25 && page.ctr < 0.02) {
    return "Tighten SERP snippet and add 3-5 contextual internal links from related high-traffic pages.";
  }
  if (page.clicks > 0 && page.ctr >= 0.03) {
    return "Use as an internal-link source and preserve current title pattern.";
  }
  return "Monitor; prioritize after higher-impression pages.";
}

function markdownTable(rows, headers) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`),
  ].join("\n");
}

function buildReport(pages, sourceLabel) {
  const totalClicks = pages.reduce((sum, page) => sum + page.clicks, 0);
  const totalImpressions = pages.reduce((sum, page) => sum + page.impressions, 0);
  const weightedCtr = totalImpressions ? totalClicks / totalImpressions : 0;
  const zeroClick = pages.filter((page) => page.impressions >= 10 && page.clicks === 0);
  const opportunities = [...pages]
    .filter((page) => page.impressions >= 10)
    .sort((a, b) => b.opportunityScore - a.opportunityScore)
    .slice(0, 20);
  const winners = [...pages]
    .filter((page) => page.clicks > 0)
    .sort((a, b) => b.ctr - a.ctr || b.impressions - a.impressions)
    .slice(0, 12);

  const kindSummary = Object.entries(
    pages.reduce((acc, page) => {
      acc[page.kind] ||= { clicks: 0, impressions: 0, pages: 0 };
      acc[page.kind].clicks += page.clicks;
      acc[page.kind].impressions += page.impressions;
      acc[page.kind].pages += 1;
      return acc;
    }, {})
  ).sort(([, a], [, b]) => b.impressions - a.impressions);

  return [
    "# Search Console Top Pages Action Report",
    "",
    `Source: \`${sourceLabel}\``,
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    "",
    "## Summary",
    "",
    `- Pages parsed: ${pages.length}`,
    `- Clicks: ${totalClicks.toLocaleString()}`,
    `- Impressions: ${totalImpressions.toLocaleString()}`,
    `- Weighted CTR: ${(weightedCtr * 100).toFixed(2)}%`,
    `- Zero-click pages with 10+ impressions: ${zeroClick.length}`,
    "",
    "## Highest Opportunity Pages",
    "",
    markdownTable(
      opportunities.map((page) => [
        `[${page.path}](${SITE_URL}${page.path})`,
        page.kind,
        page.clicks,
        page.impressions.toLocaleString(),
        `${page.ctrPercent}%`,
        `+${page.opportunityClicks}`,
        actionFor(page),
      ]),
      ["Page", "Intent", "Clicks", "Impressions", "CTR", "Est. click gap", "Action"]
    ),
    "",
    "## Current Winners To Use As Link Sources",
    "",
    markdownTable(
      winners.map((page) => [
        `[${page.path}](${SITE_URL}${page.path})`,
        page.clicks,
        page.impressions.toLocaleString(),
        `${page.ctrPercent}%`,
        page.kind,
      ]),
      ["Page", "Clicks", "Impressions", "CTR", "Intent"]
    ),
    "",
    "## Segment Summary",
    "",
    markdownTable(
      kindSummary.map(([kind, stats]) => [
        kind,
        stats.pages,
        stats.clicks,
        stats.impressions.toLocaleString(),
        `${stats.impressions ? ((stats.clicks / stats.impressions) * 100).toFixed(2) : "0.00"}%`,
      ]),
      ["Intent", "Pages", "Clicks", "Impressions", "CTR"]
    ),
    "",
    "## Recommended Queue",
    "",
    "1. Rewrite SERP-facing snippets for `/cursor-pricing`, `/tools/crewai`, `/github-copilot-pricing`, `/tools/flowise`, and `/claude-code-pricing` first.",
    "2. Add contextual links from clicked pages such as `/best-mcp-servers`, `/ai-agents-for-finance`, `/best-ai-agents-for-automation`, `/how-to-use-cursor-ai`, and `/best-free-ai-coding-agents` into high-impression zero-click pages.",
    "3. Consolidate slash/no-slash variants in internal links for `/coding-agents-hub`, `/what-is-mcp`, `/mcp-directory`, and `/best-ai-agent-for-coding` so impressions collect on the canonical path.",
    "4. Re-run this script after the next Search Console export and compare the JSON output for CTR movement.",
    "",
  ].join("\n");
}

const inputPath = path.resolve(process.argv[2] || DEFAULT_INPUT);
const reportPath = path.resolve(process.argv[3] || DEFAULT_REPORT);
const jsonPath = path.resolve(process.argv[4] || DEFAULT_JSON);

if (!fs.existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

const pages = parseTopPages(fs.readFileSync(inputPath, "utf8"));
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, buildReport(pages, path.relative(ROOT, inputPath)));
fs.writeFileSync(jsonPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), pages }, null, 2)}\n`);

console.log(JSON.stringify({
  pages: pages.length,
  report: path.relative(ROOT, reportPath),
  json: path.relative(ROOT, jsonPath),
  topOpportunity: pages
    .filter((page) => page.impressions >= 10)
    .sort((a, b) => b.opportunityScore - a.opportunityScore)
    .slice(0, 5)
    .map((page) => ({ path: page.path, clicks: page.clicks, impressions: page.impressions, ctr: page.ctrPercent })),
}, null, 2));
