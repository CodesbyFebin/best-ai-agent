import fs from "node:fs";

const errors = [];
const app = fs.readFileSync("src/App.tsx", "utf8");
const productProfile = fs.readFileSync("src/components/ProductProfile.tsx", "utf8");

function requireIncludes(sourceName, source, value, message) {
  if (!source.includes(value)) errors.push(`${sourceName}: ${message}`);
}

requireIncludes("App.tsx", app, "<header", "missing semantic header");
requireIncludes("App.tsx", app, "aria-label=\"Main navigation\"", "missing main navigation aria label");
requireIncludes("App.tsx", app, "aria-expanded", "mobile menu button should expose expanded state");
requireIncludes("App.tsx", app, "<footer", "missing semantic footer");
requireIncludes("App.tsx", app, "aria-label=\"Footer navigation\"", "missing footer navigation aria label");
requireIncludes("ProductProfile.tsx", productProfile, "alt={screenshotAlt}", "product screenshots must carry descriptive alt text");

if (app.includes('href="#"')) {
  errors.push("App.tsx: placeholder href=\"#\" found");
}

const sitemapStart = app.indexOf("Complete Programmatic index Site Map");
if (sitemapStart === -1) {
  errors.push("App.tsx: footer programmatic index section not found");
} else {
  const sitemapSection = app.slice(sitemapStart, sitemapStart + 1200);
  if (!sitemapSection.includes("<a")) {
    errors.push("App.tsx: footer programmatic index must use crawlable anchors");
  }
  if (sitemapSection.includes("<button")) {
    errors.push("App.tsx: footer programmatic index still uses button links");
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Static accessibility validation passed.");
