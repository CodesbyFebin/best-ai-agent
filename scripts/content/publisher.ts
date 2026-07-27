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

  // Build quick answer from first paragraph
  const quickAnswer = buildQuickAnswer(contentBySection, manifest, entityNode);

  // Convert markdown sections to clean HTML
  const sectionsHtml = manifest.sections
    .map(sec => {
      const content = contentBySection[sec.id] || `<p>Missing section: ${sec.id}</p>`;
      const htmlContent = convertMarkdownToCleanHtml(content);
      return `<section id="${sec.id}"><h2>${formatSectionId(sec.id)}</h2>\n${htmlContent}</section>`;
    })
    .join('\n');

  const schema = buildSchema(manifest, entityNode, canonical, contentBySection);

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
  <main>
    ${quickAnswer}
    ${sectionsHtml}
  </main>
  <footer>© 2026 BestAIAgent.in — All rights reserved.</footer>
</body>
</html>`;
}

function formatSectionId(id: string): string {
  return id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function buildQuickAnswer(contentBySection: Record<string, string>, manifest: Manifest, entityNode: any): string {
  const firstSection = manifest.sections.find(s => s.required);
  if (!firstSection || !contentBySection[firstSection.id]) {
    return '';
  }

  const content = contentBySection[firstSection.id];
  const text = stripMarkdown(content);
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  
  if (sentences.length === 0) return '';

  const quickSentences = sentences.slice(0, 2).join('. ') + '.';
  const entityName = entityNode.data?.title || entityNode.data?.name || 'AI Agent';

  return `<section id="quick-answer" class="quick-answer">
    <h2>Quick Answer</h2>
    <p><strong>${entityName}:</strong> ${quickSentences}</p>
  </section>`;
}

function convertMarkdownToCleanHtml(markdown: string): string {
  let html = markdown;
  
  // Remove markdown headers and convert to clean paragraphs
  html = html.replace(/^#{1,6}\s+/gm, '');
  
  // Handle bold **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // Handle italic *text* (avoid matching bold already processed)
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // Handle bullet lists
  html = html.replace(/^[\*\-] (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)/gs, '<ul>$1</ul>');
  
  // Convert multiple newlines to paragraph breaks
  const paragraphs = html.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  html = paragraphs.map(p => {
    const cleanP = p.trim();
    if (cleanP.startsWith('<ul>') || cleanP.startsWith('<ol>')) {
      return cleanP;
    }
    return `<p>${cleanP}</p>`;
  }).join('\n');
  
  return html;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function inferTitle(manifest: Manifest, entity: any): string {
  const entityName = entity.data?.title || entity.data?.name || entity.id.split('/')[1];
  if (manifest.schema['Review']) {
    return `${entityName} Review — Best AI Agent`;
  }
  if (manifest.schema['Comparison'] || manifest.name === 'Agent Comparison') {
    return `${entityName} — BestAIAgent.in Comparison`;
  }
  if (manifest.schema['WebPage']) {
    return `${entityName} — BestAIAgent.in Guide`;
  }
  return manifest.name;
}

function inferDescription(manifest: Manifest, contentBySection: Record<string, string>): string {
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

function buildSchema(manifest: Manifest, entityNode: any, canonical: string, contentBySection?: Record<string, string>): any {
  const base: any = {
    "@context": "https://schema.org",
    "@graph": []
  };

  const webPage: any = {
    "@type": "WebPage",
    "@id": canonical,
    "url": canonical,
    "name": inferTitle(manifest, entityNode),
    "description": inferDescription(manifest, contentBySection || {}),
    "inLanguage": "en-US",
    "mainEntityOfPage": true
  };

  // Add BreadcrumbList for all pages
  const breadcrumbs = buildBreadcrumbs(entityNode);
  if (breadcrumbs.length > 0) {
    webPage.breadcrumb = {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs
    };
  }

  base["@graph"].push(webPage);

  // Add entity-specific schema
  if (entityNode.type === 'agent' && manifest.schema['Review']) {
    const review = {
      "@type": "Review",
      "name": webPage.name,
      "reviewedBody": {
        "@type": "Thing",
        "name": entityNode.data?.name || 'AI Agent'
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": entityNode.data?.score?.overall || 0,
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

  // Add FAQPage schema for pages with FAQ sections
  if (manifest.sections.some(s => s.id === 'faq')) {
    const faqSchema = buildFaqSchema(manifest, entityNode);
    if (faqSchema) {
      base["@graph"].push(faqSchema);
    }
  }

  // Add mainEntity if applicable
  if (entityNode.type === 'agent') {
    webPage.mainEntity = {
      "@type": "Product",
      "name": entityNode.data?.name || 'AI Agent',
      "brand": {
        "@type": "Organization",
        "name": entityNode.data?.company || 'AI Company'
      }
    };
  }

  return base;
}

function buildFaqSchema(manifest: Manifest, entityNode: any): any {
  const faqQuestions = [
    {
      "@type": "Question",
      "name": `What is ${entityNode.data?.name || 'this AI agent'}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${entityNode.data?.name || 'This AI agent'} is a powerful AI assistant with capabilities including reasoning, coding, and workflow automation.`
      }
    },
    {
      "@type": "Question",
      "name": `How much does ${entityNode.data?.name || 'this AI agent'} cost?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Pricing varies by plan. ${entityNode.data?.pricing?.details || 'Standard plans start at affordable monthly rates.'}`
      }
    },
    {
      "@type": "Question",
      "name": `Is ${entityNode.data?.name || 'this AI agent'} suitable for enterprise use?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Yes, ${entityNode.data?.name || 'This AI agent'} offers enterprise-grade security, compliance, and integration capabilities.`
      }
    },
    {
      "@type": "Question",
      "name": `How secure is ${entityNode.data?.name || 'this AI agent'}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${entityNode.data?.name || 'This AI agent'} uses industry-standard encryption and security measures.`
      }
    },
    {
      "@type": "Question",
      "name": `Can I integrate ${entityNode.data?.name || 'this AI agent'} with my tools?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${entityNode.data?.name || 'This AI agent'} offers extensive API integrations and tools ecosystem.`
      }
    }
  ];

  return {
    "@type": "FAQPage",
    "mainEntity": faqQuestions
  };
}

function buildBreadcrumbs(entityNode: any): any[] {
  const breadcrumbs: any[] = [];
  const entityName = entityNode.data?.title || entityNode.data?.name || entityNode.id.split('/')[1];
  
  breadcrumbs.push({
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://bestaiagent.in/"
  });

  if (entityNode.type === 'agent') {
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 2,
      "name": "AI Agents",
      "item": "https://bestaiagent.in/agents/"
    });
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 3,
      "name": entityName,
      "item": `https://bestaiagent.in/agents/${entityNode.data?.slug || entityNode.id.split('/')[1]}/`
    });
  } else if (entityNode.type === 'comparison') {
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Comparisons",
      "item": "https://bestaiagent.in/compare/"
    });
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 3,
      "name": entityName,
      "item": `https://bestaiagent.in/compare/${entityNode.id.split('/')[1]}/`
    });
  } else if (entityNode.type === 'category') {
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Categories",
      "item": "https://bestaiagent.in/categories/"
    });
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 3,
      "name": entityName,
      "item": `https://bestaiagent.in/categories/${entityNode.data?.slug || entityNode.id.split('/')[1]}/`
    });
  }

  return breadcrumbs;
}