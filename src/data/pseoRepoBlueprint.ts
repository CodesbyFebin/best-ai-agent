export interface RepoFileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  description?: string;
  codeSnippet?: string;
  children?: RepoFileNode[];
}

export const pseoRepoStructure: RepoFileNode = {
  name: "best-ai-agent-pseo",
  type: "folder",
  path: "best-ai-agent-pseo/",
  description: "Production PSEO repository for BestAIAgent.in targeting 100k+ semantic keyword paths.",
  children: [
    {
      name: "README.md",
      type: "file",
      path: "best-ai-agent-pseo/README.md",
      description: "Master project documentation and setup instructions for BestAIAgent.in PSEO engine.",
      codeSnippet: `# BestAIAgent.in PSEO Engine (100k+ Pages Scale)

Enterprise-grade Programmatic SEO, AEO (Answer Engine), and GEO (Generative Engine) pipeline for BestAIAgent.in.

## Architecture
- **10 Pillar Guides** (/pillars/)
- **300+ Category Pages** (/categories/)
- **2,000+ Company Pages** (/companies/)
- **5,000+ AI Agent Pages** (/tools/)
- **1,500+ Framework Pages** (/frameworks/)
- **1,000+ MCP Server Pages** (/mcp/)
- **10,000+ Comparison Pages** (/compare/)
- **3,000+ Pricing Pages** (/pricing/)
- **2,000+ Alternatives Pages** (/alternatives/)
- **1,000+ Industry Pages** (/industries/)

## Quick Start
\`\`\`bash
pip install -r requirements.txt
python scripts/build_all.py --dry-run
python scripts/deploy.py
\`\`\``
    },
    {
      name: "docs",
      type: "folder",
      path: "best-ai-agent-pseo/docs/",
      description: "Comprehensive blueprint markdown documentation files.",
      children: [
        {
          name: "01-information-architecture.md",
          type: "file",
          path: "best-ai-agent-pseo/docs/01-information-architecture.md",
          codeSnippet: `# Information Architecture
Flat 2-directory deep structure for optimal crawl budget and page rank distribution:
/a/best-ai-agent/reviews/{agent_slug}/
/a/best-ai-agent/comparisons/{pair_slug}/
/a/best-ai-agent/pricing/{agent_slug}/
/a/best-ai-agent/alternatives/{agent_slug}/
/a/best-ai-agent/frameworks/{framework_slug}/
/a/best-ai-agent/use-cases/{usecase_slug}/`
        },
        {
          name: "02-semantic-entity-model.md",
          type: "file",
          path: "best-ai-agent-pseo/docs/02-semantic-entity-model.md",
          codeSnippet: `# Semantic Entity Model
5-Hop Entity Graph linking each article to:
1. Parent Pillar Page (100% mandatory)
2. Sub-Cluster Hub Page (100% mandatory)
3. Alternative Entity Comparison (80% frequency)
4. Security & Compliance Page (60% frequency)
5. Pricing or ROI Calculator Page (40% frequency)`
        },
        {
          name: "03-pseo-blueprint.md",
          type: "file",
          path: "best-ai-agent-pseo/docs/03-pseo-blueprint.md",
          codeSnippet: `# PSEO Blueprint
- 10 Pillars x 10 Subclusters x 50 Modifiers x 20 Entities = 100,000 Target URLs
- AEO Direct Answer Block (0-50 words) at top of every article
- Dynamic E-E-A-T testing dates, benchmark scores, and limitations`
        },
        {
          name: "04-url-architecture.md",
          type: "file",
          path: "best-ai-agent-pseo/docs/04-url-architecture.md",
          codeSnippet: `# Recommended URL Architecture
All long-tail URLs strictly formatted to <=60 chars:
- /a/best-ai-agent/reviews/chatgpt/
- /a/best-ai-agent/comparisons/chatgpt-vs-claude/
- /a/best-ai-agent/pricing/claude/
- /a/best-ai-agent/alternatives/cursor/`
        },
        {
          name: "05-internal-linking-engine.md",
          type: "file",
          path: "best-ai-agent-pseo/docs/05-internal-linking-engine.md",
          codeSnippet: `# Internal Linking Engine Algorithm
Anchor Text Distribution:
- 40% Exact Match Keyword
- 30% Partial Match
- 20% Entity Brand Name
- 10% Conversational CTA ("Read full benchmark review")`
        },
        {
          name: "06-content-generation-rules.md",
          type: "file",
          path: "best-ai-agent-pseo/docs/06-content-generation-rules.md",
          codeSnippet: `# Content Generation Rules
1. Template Variation: Rotate between Review, Comparison, and Tutorial templates.
2. Anti-Spam: Inject unique failure cases and tested limitations on every page.
3. Direct Answer Block: 50-word verbatim answer block for Google SGE & Perplexity citation.`
        },
        {
          name: "07-schema-architecture.md",
          type: "file",
          path: "best-ai-agent-pseo/docs/07-schema-architecture.md",
          codeSnippet: `# Schema JSON-LD Architecture
Include FAQPage, SoftwareApplication, Review, Article, BreadcrumbList, and Speakable JSON-LD on every URL.`
        },
        {
          name: "08-humanization-pipeline.md",
          type: "file",
          path: "best-ai-agent-pseo/docs/08-humanization-pipeline.md",
          codeSnippet: `# Humanization Pipeline
Post-generation LLM pass injecting personal testing anecdotes, specific benchmarks, and realistic edge-case limitations.`
        },
        {
          name: "09-security-checklist.md",
          type: "file",
          path: "best-ai-agent-pseo/docs/09-security-checklist.md",
          codeSnippet: `# Security & SpamGuard Checklist
- Word Count Variance: Randomize between 1,800 to 2,600 words per page.
- Crawl Rate Limit: Submit 500 URLs per day via IndexNow and Search Console API.`
        },
        {
          name: "10-deployment-guide.md",
          type: "file",
          path: "best-ai-agent-pseo/docs/10-deployment-guide.md",
          codeSnippet: `# Deployment Guide
Build statically or server-side render via Express on Cloud Run port 3000.`
        },
        {
          name: "11-production-checklist.md",
          type: "file",
          path: "best-ai-agent-pseo/docs/11-production-checklist.md",
          codeSnippet: `# Production Release Checklist
[x] 10 Sitemaps generated (10k URLs per sitemap)
[x] RSS Feed generated at /rss.xml
[x] Search Console API authentication configured`
        },
        {
          name: "12-future-roadmap.md",
          type: "file",
          path: "best-ai-agent-pseo/docs/12-future-roadmap.md",
          codeSnippet: `# Future Roadmap
- Autonomous multi-agent auto-updater using Gemini API
- Real-time SWE-bench benchmark sync`
        }
      ]
    },
    {
      name: "generators",
      type: "folder",
      path: "best-ai-agent-pseo/generators/",
      description: "Python generation engines for keywords, HTML, schemas, and sitemaps.",
      children: [
        {
          name: "keyword_generator.py",
          type: "file",
          path: "best-ai-agent-pseo/generators/keyword_generator.py",
          codeSnippet: `import csv, re, random

templates = [
    "best {mod} {entity} for {seed} in 2026",
    "how to use {entity} for {seed} tutorial",
    "{entity} vs {alt_entity} comparison for {seed}"
]

def generate_keywords(seeds, entities, modifiers):
    results = []
    for seed in seeds:
        for entity in entities:
            for mod in modifiers:
                query = f"best {mod} {entity} for {seed}"
                slug = re.sub(r'[^a-z0-9\-]', '', query.lower().replace(' ', '-'))[:60]
                results.append({"query": query, "slug": slug})
    return results`
        },
        {
          name: "schema_generator.py",
          type: "file",
          path: "best-ai-agent-pseo/generators/schema_generator.py",
          codeSnippet: `import json

def build_schema(item_name, rating, direct_answer):
    return {
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
            "@type": "SoftwareApplication",
            "name": item_name,
            "applicationCategory": "AIAgent"
        },
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": rating,
            "bestRating": 5
        },
        "reviewBody": direct_answer
    }`
        },
        {
          name: "sitemap_generator.py",
          type: "file",
          path: "best-ai-agent-pseo/generators/sitemap_generator.py",
          codeSnippet: `def generate_sitemap_xml(urls):
    xml = '<?xml version="1.0" encoding="UTF-8"?>\\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n'
    for url in urls:
        xml += f'  <url>\\n    <loc>{url}</loc>\\n    <lastmod>2026-07-23</lastmod>\\n    <priority>0.80</priority>\\n  </url>\\n'
    xml += '</urlset>'
    return xml`
        },
        {
          name: "humanizer_pipeline.py",
          type: "file",
          path: "best-ai-agent-pseo/generators/humanizer_pipeline.py",
          codeSnippet: `import random

def humanize_article(raw_text):
    anecdotes = [
        "In our testing, we noticed a minor latency spike during peak API load.",
        "When processing complex multi-step tool calls, latency averaged 640ms."
    ]
    return f"{raw_text}\\n\\n### Testing Observation\\n{random.choice(anecdotes)}"`
        }
      ]
    },
    {
      name: "website",
      type: "folder",
      path: "best-ai-agent-pseo/website/",
      description: "Target URL hierarchy structure for web routing.",
      children: [
        {
          name: "a",
          type: "folder",
          path: "best-ai-agent-pseo/website/a/",
          children: [
            { name: "best-ai-agent", type: "folder", path: "best-ai-agent-pseo/website/a/best-ai-agent/" }
          ]
        }
      ]
    }
  ]
};
