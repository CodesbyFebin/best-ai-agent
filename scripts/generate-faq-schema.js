import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.resolve(__dirname, "../content");
const PUBLIC_DIR = path.resolve(__dirname, "../public");
const SITE_URL = (process.env.SITE_URL || 'https://bestaiagent.in').replace(/\/$/, '');

function extractFrontmatterAndBody(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { front: {}, body: content };
  const front = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const [k, ...rest] = line.split(":");
    if (k && rest.length) front[k.trim()] = rest.join(":").trim().replace(/^["']|["']$/g, "");
  });
  return { front, body: match[2] };
}

function extractFaqSection(body) {
  const faqMatch = body.match(/## FAQ([\s\S]*?)(?=\n## |$)/);
  if (!faqMatch) return null;
  const questions = [];
  const lines = faqMatch[1].split("\n");
  let currentQ = null;
  for (const line of lines) {
    if (line.startsWith("### ")) {
      if (currentQ) questions.push(currentQ);
      currentQ = { name: line.replace(/^### /, "").trim(), acceptedAnswer: { text: "" } };
    } else if (currentQ && line.trim()) {
      currentQ.acceptedAnswer.text += line.trim() + " ";
    }
  }
  if (currentQ) questions.push(currentQ);
  return questions.length > 0 ? questions : null;
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function walkMarkdown(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkMarkdown(full));
    else if (entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function toJsonLd(obj) {
  return `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n</script>`;
}

const files = walkMarkdown(CONTENT_DIR);
const allSchemas = [];

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const { front, body } = extractFrontmatterAndBody(content);
  const questions = extractFaqSection(body);
  if (!questions || questions.length < 2) continue;

  const slug = front["URL Slug"] || front.slug || path.basename(file, ".md");
  const url = `${SITE_URL}/${slug.replace(/^\/+/, "")}`;
  const title = front["SEO Title"] || front.title || slug;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.name,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.acceptedAnswer.text.trim(),
      },
    })),
  };

  allSchemas.push({ slug, url, title, schema });
}

fs.mkdirSync(PUBLIC_DIR, { recursive: true });
fs.writeFileSync(
  path.join(PUBLIC_DIR, "faq-schema.json"),
  JSON.stringify({ generated: new Date().toISOString().split("T")[0], pages: allSchemas }, null, 2)
);

console.log(`FAQ schema generated: ${allSchemas.length} pages with Q&A.`);
