import fs from "node:fs";
import path from "node:path";

const assetsDir = path.join(process.cwd(), "dist", "assets");
const errors = [];
const warnings = [];

if (!fs.existsSync(assetsDir)) {
  console.error("dist/assets not found. Run npm run build before npm run validate:performance.");
  process.exit(1);
}

const files = fs.readdirSync(assetsDir);
const jsFiles = files.filter((file) => file.endsWith(".js"));
const cssFiles = files.filter((file) => file.endsWith(".css"));
const mainJs = jsFiles
  .map((file) => ({ file, size: fs.statSync(path.join(assetsDir, file)).size }))
  .sort((a, b) => b.size - a.size)[0];
const totalJs = jsFiles.reduce((sum, file) => sum + fs.statSync(path.join(assetsDir, file)).size, 0);
const totalCss = cssFiles.reduce((sum, file) => sum + fs.statSync(path.join(assetsDir, file)).size, 0);

const kb = (bytes) => Math.round(bytes / 1024);
const mainBudget = 720 * 1024;
const totalJsBudget = 1300 * 1024;
const cssBudget = 220 * 1024;

if (mainJs && mainJs.size > mainBudget) {
  errors.push(`Main JS chunk ${mainJs.file} is ${kb(mainJs.size)}KB; budget is ${kb(mainBudget)}KB.`);
}
if (totalJs > totalJsBudget) {
  errors.push(`Total JS is ${kb(totalJs)}KB; budget is ${kb(totalJsBudget)}KB.`);
}
if (totalCss > cssBudget) {
  warnings.push(`Total CSS is ${kb(totalCss)}KB; review if this grows beyond ${kb(cssBudget)}KB.`);
}

if (warnings.length) console.warn(warnings.join("\n"));

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Performance budget passed: main JS ${mainJs ? kb(mainJs.size) : 0}KB, total JS ${kb(totalJs)}KB, CSS ${kb(totalCss)}KB.`);
