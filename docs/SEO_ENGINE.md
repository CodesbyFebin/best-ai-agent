# SEO Engine - Technical Specification

**Phase:** 18 (Programmatic SEO)  
**Status:** Not Implemented (Future)  
**Dependencies:** Content OS (P14), Publishing Engine (P16)

---

## 1. Overview

Programmatic SEO enables automatic generation of SEO-optimized pages at scale using templates and data.

---

## 2. Page Types

### 2.1 Review Templates
- Agent review pages (already implemented manually)
- Template: `/templates/agent-review.tsx`
- Dynamic content: agent data, benchmarks, pricing

### 2.2 Comparison Templates
- Agent vs Agent comparisons
- Template: `/templates/comparison.tsx`
- Dynamic content: feature matrix, scores

### 2.3 Pricing Pages
- Pricing comparisons by tier
- Template: `/templates/pricing.tsx`
- Dynamic content: pricing tables, value analysis

### 2.4 Alternatives Pages
- "X alternatives" pages
- Template: `/templates/alternatives.tsx`
- Dynamic content: similar agents list

### 2.5 Industry Pages
- "Best AI agents for [industry]"
- Template: `/templates/industry.tsx`
- Dynamic content: category filtering

### 2.6 Workflow Pages
- "Best AI agents for [workflow]"
- Template: `/templates/workflow.tsx`
- Dynamic content: use-case matching

---

## 3. Template System

### 3.1 Template Structure

```typescript
interface SeoTemplate {
  title: string; // with variables: {agentName}, {category}
  description: string;
  canonicalPath: string;
  schema: SchemaObject;
  sections: Section[];
  metadata: SeoMetadata;
}
```

### 3.2 Data Binding

Templates are populated from the content store:

```typescript
const renderedPage = renderTemplate('agent-review', {
  agent: agentData,
  evidence: evidenceData,
  comparisons: comparisonData,
  seo: seoMetadata
});
```

---

## 4. Scale Strategy

**Goal:** Generate 15,000-30,000 pages

**Approach:**
- Static generation at build time (where possible)
- Dynamic SSR for long-tail queries
- Hybrid: pre-render popular pages, SSR for niche

**Storage:**
- Generated HTML in S3/CloudFront
- Or edge-side includes (ESI)
- Cache TTL based on freshness score

---

## 5. SEO Best Practices

- Unique title & description per page
- Canonical URLs (no duplicates)
- Breadcrumb trails
- JSON-LD structured data per page type
- Internal linking strategy
- Sitemap segmentation (already implemented)
- robots.txt directives

---

## 6. Implementation Roadmap

**P18-1:** Review template engine (basic)  
**P18-2:** Comparison template engine  
**P18-3:** Pricing & alternatives templates  
**P18-4:** Industry & workflow templates  
**P18-5:** Bulk generation pipeline (10K pages)  
**P18-6:** Performance optimization (caching, CDN)  
**P18-7:** Validation & QA automation  

---

**Note:** This document describes future work. Current platform has manual review pages only.
