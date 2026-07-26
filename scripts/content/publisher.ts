import { Manifest } from './load-manifest';

export interface PublisherOptions {
  baseUrl?: string;
  template?: 'default' | 'minimal';
}

export function renderHtml(
  manifest: Manifest,
  contentBySection: Record<string, string>,
  entityNode: any,
  options: PublisherOptions = {}
): string {
  const { baseUrl = 'https://bestaiagent.in', template = 'default' } = options;

  const title = inferTitle(manifest, entityNode);
  const description = inferDescription(manifest, contentBySection);
  const slug = entityNode.id.split('/')[1];
  const canonical = `${baseUrl}/${slug}/`;

  const sectionsHtml = manifest.sections
    .map(sec => {
      const content = contentBySection[sec.id] || `<p>Missing section: ${sec.id}</p>`;
      return `<section id="${sec.id}"><h2>${sec.id.replace(/-/g, ' ')}</h2>\n${content}</section>`;
    })
    .join('\n');

  const schema = buildSchema(manifest, entityNode, canonical);

  const style = template === 'minimal'
    ? 'body{font-family:system-ui,sans-serif;max-width:800px;margin:2rem auto;padding:0 1rem;line-height:1.6}'
    : `body{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;max-width:900px;margin:0 auto;padding:2rem 1rem;line-height:1.7;color:#333;background:#fff}
header{border-bottom:1px solid #eee;margin-bottom:2rem;padding-bottom:1rem}
header a{color:#0066cc;text-decoration:none}
h1{font-size:2.2rem;margin:0.5rem 0}
h2{font-size:1.6rem;margin:2rem 0 1rem;color:#222}
section{margin-bottom:2rem}
footer{margin-top:3rem;padding-top:1rem;border-top:1px solid #eee;font-size:0.9rem;color:#666}
a{color:#0066cc}
a:hover{text-decoration:underline}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>
  <style>${style}</style>
</head>
<body>
  <header><a href="/">← BestAIAgent.in</a></header>
  <main>${sectionsHtml}</main>
  <footer>© 2026 BestAIAgent.in — All rights reserved.</footer>
</body>
</html>`;
}

function inferTitle(manifest: Manifest, entity: any): string {
  // Check entity data for SEO title, fallback to manifest name
  const entityName = entity.data?.name || entity.id.split('/')[1];
  if (manifest.schema['Review']) {
    return `${entityName} Review — Best AI Agent`;
  }
  if (manifest.schema['WebPage']) {
    return `${entityName} — BestAIAgent.in Guide`;
  }
  return manifest.name;
}

function inferDescription(manifest: Manifest, contentBySection: Record<string, string>): string {
  // Try to get first paragraph from first required section
  const firstSection = manifest.sections.find(s => s.required);
  if (firstSection && contentBySection[firstSection.id]) {
    const text = stripMarkdown(contentBySection[firstSection.id]);
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    if (sentences.length > 0) {
      return sentences[0].trim().substring(0, 160);
    }
  }
  return manifest.name;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\n+/g, ' ');
}

function buildSchema(manifest: Manifest, entityNode: any, canonical: string) {
  const base = {
    "@context": "https://schema.org",
    "@graph": []
  };

  const webPage = {
    "@type": "WebPage",
    "@id": canonical,
    "url": canonical,
    "name": inferTitle(manifest, entityNode),
    "description": inferDescription(manifest, {} as any),
    "inLanguage": "en-US"
  };
  base["@graph"].push(webPage);

  // Add entity-specific schema
  if (entityNode.type === 'agent' && manifest.schema['Review']) {
    const review = {
      "@type": "Review",
      "name": webPage.name,
      "reviewedBody": {
        "@type": "Thing",
        "name": entityNode.data.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": entityNode.data.score?.overall || 0,
        "bestRating": 10,
        "worstRating": 1
      },
      "author": {
        "@type": "Organization",
        "name": "BestAIAgent.in"
      },
      "datePublished": new Date().toISOString().split('T')[0]
    };
    base["@graph"].push(review);
  }

  // Add mainEntity if applicable
  if (entityNode.data?.name) {
    const mainEntity = entityNode.type === 'agent'
      ? { "@type": "Product", "name": entityNode.data.name, "brand": { "@type": "Organization", "name": entityNode.data.company } }
      : undefined;

    if (mainEntity) {
      webPage.mainEntity = mainEntity;
    }
  }

  return base;
}
