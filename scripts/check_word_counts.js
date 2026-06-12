import fs from "node:fs";
import { walkMarkdown, wordCount } from "./seo_utils.js";

const under1500 = [];
const under2500 = [];

for (const file of walkMarkdown()) {
  const words = wordCount(fs.readFileSync(file, "utf8"));
  if (words < 1500) under1500.push(`${words} ${file}`);
  if (words < 2500) under2500.push(`${words} ${file}`);
}

if (under2500.length) {
  console.warn("Pages under 2,500 words (legacy/app-exempt unless listed under hard failures):");
  console.warn(under2500.join("\n"));
}

if (under1500.length) {
  console.error("Pages under 1,500 words:");
  console.error(under1500.join("\n"));
  process.exit(1);
}

console.log("Word-count check passed.");
