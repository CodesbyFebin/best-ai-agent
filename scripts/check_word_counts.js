import fs from "node:fs";
import { walkMarkdown, wordCount } from "./seo_utils.js";

const under1500 = [];
const under2500 = [];
const hardFailures = [];
const shortFormCategories = new Set(["editorial", "longtail", "reports"]);

for (const file of walkMarkdown()) {
  const words = wordCount(fs.readFileSync(file, "utf8"));
  const category = file.split("/content/")[1]?.split("/")[0] || "";
  const entry = `${words} ${file}`;
  if (words < 1500) {
    under1500.push(entry);
    if (!shortFormCategories.has(category)) hardFailures.push(entry);
  }
  if (words < 2500) under2500.push(`${words} ${file}`);
}

if (under2500.length) {
  console.warn("Pages under 2,500 words (legacy/app-exempt unless listed under hard failures):");
  console.warn(under2500.join("\n"));
}

if (under1500.length) {
  console.warn("Pages under 1,500 words:");
  console.warn(under1500.join("\n"));
}

if (hardFailures.length) {
  console.error("Hard word-count failures:");
  console.error(hardFailures.join("\n"));
  process.exit(1);
}

console.log("Word-count check passed.");
