#!/usr/bin/env node
import fs from "fs";
import path from "path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const DIST_DIR = path.join(process.cwd(), "dist");
const ERRORS = [];

function validateRouteMeta(filePath, label) {
  if (!fs.existsSync(filePath)) {
    ERRORS.push(`${label}: ${filePath} not found`);
    return;
  }
  const routeMap = JSON.parse(fs.readFileSync(filePath, "utf8"));
  for (const [route, meta] of Object.entries(routeMap)) {
    // Check title
    if (!meta.title) {
      ERRORS.push(`${label}: ${route} has missing title (null/undefined)`);
    } else if (typeof meta.title !== "string") {
      ERRORS.push(`${label}: ${route} has non-string title: ${typeof meta.title}`);
    } else if (meta.title === "") {
      ERRORS.push(`${label}: ${route} has empty title`);
    } else if (meta.title.startsWith("undefined")) {
      ERRORS.push(`${label}: ${route} has 'undefined' title: "${meta.title.slice(0, 50)}..."`);
    } else if (meta.title.includes("| undefined") || meta.title.includes("undefined |")) {
      ERRORS.push(`${label}: ${route} has malformed title: "${meta.title.slice(0, 80)}..."`);
    }

    // Check description
    if (!meta.description) {
      ERRORS.push(`${label}: ${route} has missing description (null/undefined)`);
    } else if (typeof meta.description !== "string") {
      ERRORS.push(`${label}: ${route} has non-string description: ${typeof meta.description}`);
    } else if (meta.description === "") {
      ERRORS.push(`${label}: ${route} has empty description`);
    }

    // Check og:title in schemas
    for (const schema of meta.schemas || []) {
      if (schema["og:title"] && schema["og:title"].includes("undefined")) {
        ERRORS.push(`${label}: ${route} schema has undefined og:title`);
      }
      if (schema["name"] && typeof schema["name"] === "string" && schema["name"].includes("undefined")) {
        ERRORS.push(`${label}: ${route} schema has undefined name`);
      }
      // Check breadcrumb titles
      if (schema.itemListElement) {
        for (const item of schema.itemListElement) {
          if (item.name && item.name.includes("undefined")) {
            ERRORS.push(`${label}: ${route} breadcrumb has undefined name in ${JSON.stringify(item)}`);
          }
        }
      }
    }

    // Check that title doesn't start with "undefined |"
    if (meta.title && meta.title.startsWith("undefined |")) {
      ERRORS.push(`${label}: ${route} title is exactly "undefined | ..."`);
    }
  }
}

// Validate both public and dist route-meta.json
validateRouteMeta(path.join(PUBLIC_DIR, "route-meta.json"), "public/route-meta.json");
validateRouteMeta(path.join(DIST_DIR, "route-meta.json"), "dist/route-meta.json");

// Validate generated HTML for critical pages
function validateHTMLMeta(filePath, url) {
  if (!fs.existsSync(filePath)) return;
  const html = fs.readFileSync(filePath, "utf8");
  
  // Check for <title>undefined
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  if (titleMatch) {
    const title = titleMatch[1];
    if (title.includes("undefined") || title.trim() === "undefined") {
      ERRORS.push(`index.html (${url}): title contains undefined: "${title}"`);
    }
  }
  
  // Check og:title
  const ogTitleMatch = html.match(/<meta property="og:title" content="([^"]*)"/i);
  if (ogTitleMatch) {
    const ogTitle = ogTitleMatch[1];
    if (ogTitle.includes("undefined") || ogTitle.trim() === "undefined") {
      ERRORS.push(`index.html (${url}): og:title contains undefined: "${ogTitle}"`);
    }
  }
  
  // Check twitter:title
  const twitterTitleMatch = html.match(/<meta name="twitter:title" content="([^"]*)"/i);
  if (twitterTitleMatch) {
    const twitterTitle = twitterTitleMatch[1];
    if (twitterTitle.includes("undefined") || twitterTitle.trim() === "undefined") {
      ERRORS.push(`index.html (${url}): twitter:title contains undefined: "${twitterTitle}"`);
    }
  }
}

validateHTMLMeta(path.join(DIST_DIR, "client/index.html"), "dist/client/");

if (ERRORS.length) {
  console.error("SEO TITLE VALIDATION ERRORS:");
  console.error(ERRORS.map(e => `  - ${e}`).join("\n"));
  process.exit(1);
}

console.log("✅ All SEO titles validated successfully.");