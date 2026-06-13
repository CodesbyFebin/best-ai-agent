import fs from "node:fs";
import path from "node:path";
import { PUBLIC_DIR, SITE_URL } from "./seo_utils.js";

const required = [
  "robots.txt",
  "sitemap.xml",
  "ai-agent-sitemap.xml",
  "tool-sitemap.xml",
  "comparison-sitemap.xml",
  "pricing-sitemap.xml",
  "alternatives-sitemap.xml",
  "tutorials-sitemap.xml",
  "glossary-sitemap.xml",
  "mcp-sitemap.xml",
  "author-sitemap.xml",
  "hub-sitemap.xml",
  "calculators-sitemap.xml",
  "feed.xml",
  "llms.txt",
  "indexnow-key.txt",
  "contentIndex.json",
  "content-index.json",
  "entity-index.json",
  "knowledge-graph.json",
  "tool-relationships.json",
  "route-meta.json",
];

const errors = [];

for (const name of required) {
  const file = path.join(PUBLIC_DIR, name);
  if (!fs.existsSync(file)) errors.push(`Missing public/${name}`);
}

for (const name of required.filter((n) => n.endsWith(".xml"))) {
  const file = path.join(PUBLIC_DIR, name);
  if (!fs.existsSync(file)) continue;
  const text = fs.readFileSync(file, "utf8");
  if (!text.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) errors.push(`${name}: missing XML declaration`);
  if (text.includes("#")) errors.push(`${name}: hash URL found`);
  if (/https:\/\/bestaiagent\.in\/\//.test(text)) errors.push(`${name}: double slash URL found`);
  if (text.includes("bestaigent.in")) errors.push(`${name}: stale misspelled domain`);
  if (name === "feed.xml" && !text.includes("<rss version=\"2.0\"")) errors.push("feed.xml is not RSS 2.0");
  if (name !== "feed.xml" && name !== "sitemap.xml") {
    for (const block of text.matchAll(/<url>[\s\S]*?<\/url>/g)) {
      for (const tag of ["loc", "lastmod", "changefreq", "priority"]) {
        if (!block[0].includes(`<${tag}>`)) errors.push(`${name}: URL block missing ${tag}`);
      }
    }
  }
}

const robots = fs.existsSync(path.join(PUBLIC_DIR, "robots.txt")) ? fs.readFileSync(path.join(PUBLIC_DIR, "robots.txt"), "utf8") : "";
for (const sitemap of required.filter((n) => n.endsWith(".xml") || n === "llms.txt")) {
  if (!robots.includes(`${SITE_URL}/${sitemap}`) && sitemap !== "author-sitemap.xml" && sitemap !== "hub-sitemap.xml" && sitemap !== "calculators-sitemap.xml") {
    errors.push(`robots.txt missing reference to ${sitemap}`);
  }
}

const llms = fs.existsSync(path.join(PUBLIC_DIR, "llms.txt")) ? fs.readFileSync(path.join(PUBLIC_DIR, "llms.txt"), "utf8") : "";
for (const heading of ["Editorial Policy", "Key Hubs", "Tool Reviews", "Comparisons", "Pricing Pages", "Alternatives", "Tutorials", "Glossary", "MCP Pages", "Security and Compliance", "Freshness"]) {
  if (!llms.includes(`## ${heading}`)) errors.push(`llms.txt missing ${heading}`);
}

for (const name of required.filter((n) => n.endsWith(".json"))) {
  const file = path.join(PUBLIC_DIR, name);
  if (!fs.existsSync(file)) continue;
  try {
    JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    errors.push(`${name}: invalid JSON (${error.message})`);
  }
}

const contentIndexPath = path.join(PUBLIC_DIR, "contentIndex.json");
if (fs.existsSync(contentIndexPath)) {
  const contentIndex = JSON.parse(fs.readFileSync(contentIndexPath, "utf8"));
  if (!Array.isArray(contentIndex) || contentIndex.length === 0) errors.push("contentIndex.json is empty");
  for (const entry of contentIndex) {
    for (const key of ["path", "canonical", "title", "description", "category", "lastmod", "schemaTypes", "parentHub"]) {
      if (!(key in entry)) errors.push(`contentIndex.json entry missing ${key}`);
    }
    if (entry.canonical?.includes("#")) errors.push(`contentIndex.json canonical contains hash: ${entry.canonical}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Sitemap, robots, feed, and llms.txt validation passed.");
