const origin = process.env.BASE_URL || "http://localhost:3000";

const home = await fetch(`${origin}/`);
if (!home.ok) {
  throw new Error(`Homepage failed: ${home.status}`);
}

const html = await home.text();

const assets = [
  ...html.matchAll(
    /(?:src|href)=["'](\/assets\/[^"']+\.(?:js|css))["']/g
  ),
].map((match) => match[1]);

if (!assets.length) {
  throw new Error("No production JS/CSS assets found");
}

for (const asset of [...new Set(assets)]) {
  const response = await fetch(`${origin}${asset}`);

  if (!response.ok) {
    throw new Error(`${asset} returned ${response.status}`);
  }

  const body = await response.arrayBuffer();

  if (body.byteLength < 100) {
    throw new Error(`${asset} appears empty`);
  }

  const type = response.headers.get("content-type") || "";

  if (asset.endsWith(".js") && !type.includes("javascript")) {
    throw new Error(`${asset} has invalid content type: ${type}`);
  }

  if (asset.endsWith(".css") && !type.includes("text/css")) {
    throw new Error(`${asset} has invalid content type: ${type}`);
  }
}

console.log(`Validated ${assets.length} production assets`);
