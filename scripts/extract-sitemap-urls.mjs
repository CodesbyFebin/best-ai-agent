import fs from "node:fs";
import path from "node:path";

const BASE_DIR = process.cwd();

const SITEMAPS = [
  "public/sitemaps/agents.xml",
  "public/sitemaps/mcp.xml",
  "public/sitemaps/entities.xml",
  "public/sitemaps/research.xml",
  "public/sitemaps/pillars.xml",
  "public/sitemaps/hubs.xml",
  "public/sitemaps/topics.xml",
  "public/sitemaps/comparisons.xml",
  "public/sitemaps/rankings.xml",
  "public/sitemaps/india.xml",
  "public/sitemaps/trust.xml",
  "public/sitemaps/authors.xml",
  "public/sitemaps/images.xml"
];

const OUT_DIR = path.join(BASE_DIR, "reports");
fs.mkdirSync(OUT_DIR, { recursive: true });

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map(match => match[1].trim())
    .filter(Boolean);
}

const rows = [];
const allUrls = new Set();

for (const sitemapPath of SITEMAPS) {
  const absolutePath = path.join(BASE_DIR, sitemapPath);

  if (!fs.existsSync(absolutePath)) {
    console.warn(`Missing sitemap: ${sitemapPath}`);
    continue;
  }

  const xml = fs.readFileSync(absolutePath, "utf8");
  const urls = extractLocs(xml);

  for (const url of urls) {
    allUrls.add(url);
    rows.push({
      sitemap: sitemapPath,
      url
    });
  }
}

const sortedUrls = [...allUrls].sort();

const badUrls = sortedUrls.filter(url =>
  url.includes("#") ||
  url.includes("localhost") ||
  url.includes("127.0.0.1") ||
  url.includes("vercel.app") ||
  !url.startsWith("https://bestaiagent.in")
);

fs.writeFileSync(
  path.join(OUT_DIR, "all-sitemap-urls.txt"),
  sortedUrls.join("\n") + "\n"
);

fs.writeFileSync(
  path.join(OUT_DIR, "all-sitemap-urls.csv"),
  ["sitemap,url", ...rows.map(r => `"${r.sitemap}","${r.url}"`)].join("\n") + "\n"
);

fs.writeFileSync(
  path.join(OUT_DIR, "all-sitemap-urls.json"),
  JSON.stringify(
    {
      totalUrls: sortedUrls.length,
      totalSitemapsChecked: SITEMAPS.length,
      badUrls,
      urls: sortedUrls
    },
    null,
    2
  )
);

fs.writeFileSync(
  path.join(OUT_DIR, "all-sitemap-urls-report.md"),
  `# Sitemap URL Extraction Report

## Summary

- Sitemaps checked: ${SITEMAPS.length}
- Unique URLs found: ${sortedUrls.length}
- Bad URLs found: ${badUrls.length}

## Bad URLs

${badUrls.length ? badUrls.map(url => `- ${url}`).join("\n") : "None"}

## All URLs

${sortedUrls.map(url => `- ${url}`).join("\n")}
`
);

console.log(`✅ Extracted ${sortedUrls.length} unique URLs`);
console.log(`📄 reports/all-sitemap-urls.txt`);
console.log(`📄 reports/all-sitemap-urls.csv`);
console.log(`📄 reports/all-sitemap-urls.json`);
console.log(`📄 reports/all-sitemap-urls-report.md`);

if (badUrls.length) {
  console.error(`❌ Found ${badUrls.length} bad URLs. Check reports/all-sitemap-urls.json`);
  process.exit(1);
}
