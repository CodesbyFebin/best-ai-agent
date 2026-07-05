const fs = require('node:fs');
const path = require('node:path');

const htmlPath = path.resolve(process.cwd(), 'dist/client/index.html');
const manifestPath = path.resolve(process.cwd(), 'public/client-assets.json');

if (!fs.existsSync(htmlPath)) {
  throw new Error(`Missing built client HTML at ${htmlPath}`);
}

const html = fs.readFileSync(htmlPath, 'utf8');
const script = html.match(/src="(\/assets\/index-[^"]+\.js)"/)?.[1];
const style = html.match(/href="(\/assets\/index-[^"]+\.css)"/)?.[1];

if (!script) {
  throw new Error('Could not find built client entry script in dist/client/index.html');
}

fs.writeFileSync(
  manifestPath,
  `${JSON.stringify({ script, style: style || null }, null, 2)}\n`,
);

console.log(`Client asset manifest written: ${manifestPath}`);
