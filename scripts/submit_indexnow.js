import fs from "node:fs";
import path from "node:path";
import { PUBLIC_DIR, SITE_URL } from "./seo_utils.js";

const keyFile = path.join(PUBLIC_DIR, "indexnow-key.txt");
const routeMetaFile = path.join(PUBLIC_DIR, "route-meta.json");

if (!fs.existsSync(keyFile)) {
  console.error("Missing public/indexnow-key.txt. Run npm run generate:seo first.");
  process.exit(1);
}

if (!fs.existsSync(routeMetaFile)) {
  console.error("Missing public/route-meta.json. Run npm run generate:seo first.");
  process.exit(1);
}

const key = fs.readFileSync(keyFile, "utf8").trim();
const routeMap = JSON.parse(fs.readFileSync(routeMetaFile, "utf8"));
const urls = Object.values(routeMap)
  .filter((route, index, arr) => route.path && route.path === (route.canonicalPath || route.path) && arr.findIndex((other) => other.path === route.path) === index)
  .map((route) => `${SITE_URL}${route.path === "/" ? "" : route.path}`)
  .slice(0, Number(process.env.INDEXNOW_LIMIT || 10000));

const payload = {
  host: "bestaiagent.in",
  key,
  keyLocation: `${SITE_URL}/${key}.txt`,
  urlList: urls,
};

const endpoint = "https://api.indexnow.org/indexnow";

const response = await fetch(endpoint, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});

if (!response.ok) {
  const text = await response.text();
  console.error(`IndexNow submission failed: ${response.status} ${response.statusText}\n${text}`);
  process.exit(1);
}

console.log(JSON.stringify({ submitted: urls.length, endpoint, status: response.status }, null, 2));
