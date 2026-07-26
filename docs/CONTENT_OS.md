# Content OS - System Specification

**Phase:** 14  
**Status:** Not Implemented (Future)  
**Priority:** Critical (enables content scale)  
**Dependencies:** P06 (Evidence Schema), P08 (State Machine), P13 (Knowledge Graph) helpful

---

## 1. Overview

Content OS is the automated content generation pipeline that transforms queries into evidence-backed, high-quality agent reviews and comparisons at scale.

---

## 2. Pipeline Stages

### 2.1 Input: Query Intake

**Sources:**
- CSV backlog (`content/backlog.csv`)
- User-submitted suggestions (`/api/suggest`)
- Auto-generated from trending searches
- Manual editorial queue

**Intake Fields:**
```typescript
interface ContentQuery {
  query: string;           // e.g., "best AI agent for coding"
  querySlug: string;      // e.g., "best-ai-agent-for-coding"
  targetEntity?: string;  // e.g., "cursor"
  priority: 1-5;
 estimatedTraffic: number;
}
```

---

### 2.2 Stage 1: Intent Analysis

**Goal:** Classify query type and extract entities.

**Process:**
- NLP classification (review, comparison, list, guide, pricing)
- Entity extraction (agent names, categories, features)
- Intent scoring (0-1)
- SERP analysis classification

**Output:**
```typescript
interface AnalyzedIntent {
  type: 'review' | 'comparison' | 'pricing' | 'alternatives' | 'industry' | 'workflow';
  entities: EntityMatch[];
  confidence: number;
  suggestedRoute: RouteRecord;
}
```

---

### 2.3 Stage 2: SERP Scraping

**Goal:** Collect top-10 search results for query.

**Process:**
- Use SERP API (SerpAPI, SERanking, or custom scraper)
- Extract URLs, titles, snippets, dates
- Filter low-quality sources (spam, thin content)
- Rank by domain authority

**Output:**
```typescript
interface SerpResults {
  organic: SerpResult[];
  news?: SerpResult[];
  videos?: SerpResult[];
  knowledgeGraph?: KnowledgeGraphResult;
}
```

---

### 2.4 Stage 3: Evidence Collection

**Goal:** Extract factual claims from SERP sources.

**Process:**
1. Fetch each URL (headless browser or HTTP)
2. Extract main content (Readability/Mozilla Readability)
3. Run claim extraction (NLP + regex patterns):
   - Pricing claims: "$X/month", "costs ₹Y"
   - Feature claims: "supports WhatsApp integration"
   - Performance claims: "95% accuracy", "<100ms latency"
   - Comparison claims: "better than", "worse than"
4. Validate claims against source (exact match)
5. Assign authority level (primary if vendor docs, secondary if blog)

**Output:**
```typescript
interface ExtractedClaims {
  pricing?: PricingClaim[];
  capabilities?: CapabilityClaim[];
  integrations?: IntegrationClaim[];
  performance?: PerformanceClaim[];
  comparisons?: ComparisonClaim[];
  limitations?: LimitationClaim[];
}
```

---

### 2.5 Stage 4: Brief Generation

**Goal:** Create structured outline for content writer (human or AI).

**Process:**
- Template selection based on intent type (review, comparison, etc.)
- Fill template slots with:
  - Headings (H1, H2, H3) from claims
  - Evidence references (cite sources)
  - Required sections (pricing, verdict, alternatives)
- Brief includes:
  - Target word count (2000-5000)
  - Tone guidelines (technical, beginner-friendly)
  - Evidence IDs to reference
  - Quality targets (score > 85)

**Output:**
```typescript
interface ContentBrief {
  title: string;
  slug: string;
  routeType: RouteType;
  sections: Section[];
  evidenceIds: string[];
  qualityTargets: { score: number; confidence: number };
  wordCountTarget: number;
}
```

---

### 2.6 Stage 5: Outline Approval

**Goal:** Editorial review of brief before full content generation.

**Process:**
- Editor reviews brief in Editorial OS
- Approves or requests revisions
- Once approved, moves to `blueprint_approved` state

---

### 2.7 Stage 6: Section Generation

**Goal:** Generate full content from outline.

**Options:**

**A. Human Writer** (initial phase)
- Writer fills sections using brief + evidence
- Submits to Editorial OS

**B. AI-Assisted** (later phase)
- GPT-4/Claude generates sections with evidence citations
- Human editor revises
- Automated fact-check against sources

**C. Fully Automated** (future, after quality validation)
- AI generates full draft from brief
- Auto fact-check (evidence validation)
- Human editor final review

**Output:**
```typescript
interface GeneratedContent {
  briefId: string;
  markdown: string;
  wordCount: number;
  evidenceUsed: string[];
  qualityScore: number; // auto-calculated
}
```

---

### 2.8 Stage 7: Quality Validation

**Goal:** Ensure content meets quality bar before human review.

**Checks:**
- All claims have evidence (evidenceValidation)
- Quality score >= threshold (e.g., 80)
- No contradictory claims flagged
- Word count met
- Freshness: evidence retrieved within 90 days
- Plagiarism check (external API)
- Readability score (Flesch-Kincaid)

**Automated Rejection:**
- Any CRITICAL claim fails validation → reject
- Quality score < bar → send back to rewrite
- Evidence expired → trigger refresh

**Output:**
```typescript
interface ValidationResult {
  passed: boolean;
  evidenceChecks: { valid: number; invalid: number };
  qualityScore: number;
  freshnessScore: number;
  readability: number;
  warnings: string[];
  errors: string[];
}
```

---

### 2.8 Stage 8: Human Review (Editorial OS)

**Goal:** Final editorial approval before publication.

**Process:**
- Content appears in editorial review queue
- Editor reads full content
- Approves → state `publish_approved`
- Requests revisions → back to `draft`
- Rejects → archived

**Editorial Checks:**
- Tone and style consistency
- Accurate evidence citation
- No unsupported speculation
- Proper formatting
- SEO meta title/description suggested

---

### 2.9 Stage 9: Publication

**Goal:** Publish to production with proper SEO.

**Process:**
- Content published to `src/data/` (or database)
- Route registered (if new)
- Evidence stored in evidence store
- Sitemap regenerated
- Cache purged
- State → `published`

**Automated:**
- Search engine ping (`/sitemap.xml`)
- Social media update (optional Discord/Slack webhook)
- Analytics event tracking

---

### 2.10 Stage 10: Monitoring

**Goal:** Track performance and trigger refreshes.

**Metrics:**
- Page views, bounce rate, time on page
- Search rankings (target queries)
- Evidence freshness decay
- User feedback (thumbs up/down)

**Triggers:**
- Freshness < 0.5 → state `refresh_required`
- Ranking drop > 10 positions → alert editorial
- Evidence source becomes unreachable → alert

---

## 3. Technology Stack

### 3.1 NLP & Claims Extraction
- **Option A:** spaCy (Python microservice)
- **Option B:** GPT-4 API with structured prompt
- **Option C:** Custom regex + ML model

### 3.2 SERP Scraping
- **SerpAPI** (recommended, $50/month)
- **SERanking** (alternative)
- **Custom Puppeteer** (free but fragile)

### 3.3 Content Generation
- **Claude 3.5 Sonnet** (good for technical content)
- **GPT-4o** (good for variety)
- **Local LLM** (Llama 3 70B, no API cost)

### 3.4 Database (for content drafts)
- **SQLite** (simple, file-based)
- **PostgreSQL** (if scaling to 10K+ drafts)
- **NoSQL** (Firestore, MongoDB) if semi-structured

---

## 4. Workflow Example

```
Query: "Cursor AI review"

1. Intent Analysis
   → Type: review
   → Entities: ["cursor"]
   → Confidence: 0.95

2. SERP Scraping
   → Top 10 results
   → Sources: docs.cursor.sh, Reddit, TechCrunch, etc.

3. Evidence Collection
   → Claims extracted:
     - "Cursor has 95% code acceptance" (source: docs)
     - "Pricing: $20/month" (source: pricing page)
     - "Supports VS Code" (source: docs)

4. Brief Generation
   → Outline with sections:
     - Introduction (Cursor overview)
     - Features (with evidence citations)
     - Pricing (with table)
     - Verdict (with scores)

5. Editor approves brief → blueprint_approved

6. Section Generation (AI-assisted)
   → Markdown draft with evidence references

7. Quality Validation
   → Score: 88/100 ✓
   → All claims have evidence ✓
   → Word count: 2500 ✓

8. Editorial Review
   → Editor approves → publish_approved

9. Publication
   → Write to src/data/agents.ts (or DB)
   → Regenerate sitemaps
   → Deploy to production

10. Monitoring
    → Track rankings, clicks
    → Freshness: evidence age 7 days (good)
```

---

## 5. Scale Targets

**Phase P14-1 (MVP):**
- 10 reviews manually generated end-to-end
- AI-assisted writing (human-in-the-loop)

**Phase P14-2 (Scale):**
- 100 reviews/month throughput
- 80% AI-generated (editor-verified)
- Quality bar: 85/100 average

**Phase P14-3 (Full):**
- 500+ reviews/month
- 95% AI-generated (minimal human)
- Quality bar: 90/100 average

---

## 6. Quality Gates

Every piece of content must pass:

1. **Evidence Gate:** All claims have primary/secondary sources
2. **Confidence Gate:** Confidence score >= 0.8 for STANDARD, >=0.9 for CRITICAL
3. **Freshness Gate:** Evidence retrieved within 90 days
4. **Length Gate:** >= 2000 words for reviews, >= 1000 for others
5. **Plagiarism Gate:** < 5% similarity to existing content
6. **Editorial Gate:** Human editor approval

Any fail → reject or send for revision.

---

## 7. Admin Interface

**Content OS Dashboard:**
- Pipeline status (queries in each stage)
- Queue management (prioritize, reassign)
- Quality trends (score distribution)
- Throughput metrics (reviews/week)
- Evidence gap alerts (queries with no sources)

---

## 8. Implementation Timeline

**P14-1:** Intent analysis + SERP scraping (Week 1-2)  
**P14-2:** Evidence extraction pipeline (Week 2-3)  
**P14-3:** Brief generator (Week 3-4)  
**P14-4:** AI-assisted section generation (Week 4-5)  
**P14-5:** Quality validation automation (Week 5-6)  
**P14-6:** Admin dashboard (Week 6-7)  
**P14-7:** Integration with Editorial OS (Week 7-8)

---

**Note:** This is a specification document. Implementation has not started.
