# AI Search - System Design

**Phase:** 17  
**Status:** Not Implemented (Future)  
**Dependencies:** Knowledge Graph (P13), Content OS (P14)

---

## 1. Overview

AI Search provides intelligent search capabilities beyond keyword matching, including semantic search, vector embeddings, and personalized recommendations.

---

## 2. Components

### 2.1 Entity Search
- Search across agents, categories, comparisons, MCP servers
- Autocomplete with type-ahead
- Faceted filtering (by category, pricing, features)

### 2.2 Semantic Search
- Vector embeddings for query understanding
- Cosine similarity matching
- Natural language query support

### 2.3 Recommendations
- "Similar agents" based on features
- "Users also searched" patterns
- Personalized based on browsing history

---

## 3. Technical Design

### 3.1 Search Stack

**Option A - PostgreSQL + pgvector**
- Extension for vector storage
- Hybrid search (keyword + vector)
- scales well

**Option B - Meilisearch**
- Purpose-built search engine
- Typo tolerance, synonyms
- Instant search

**Option C - Algolia**
- Hosted service
- Advanced relevance tuning
- Analytics dashboard

### 3.2 Indexing Strategy

- Agents: name, description, features, pricing, evidence summary
- Categories: name, description, agent list
- Comparisons: agents involved, verdict, metrics
- MCP servers: name, description, capabilities

---

## 4. API Surface

```
GET /api/search?q=<query>&type=<entity>&limit=<n>
GET /api/recommend/agent/:slug
GET /api/similar/:slug
GET /api/trending
GET /api/popular
```

---

## 5. Implementation Phases

**P17-1:** Basic entity search with PostgreSQL full-text  
**P17-2:** Vector embeddings with sentence-transformers  
**P17-3:** Recommendation engine  
**P17-4:** Personalization layer

---

**Note:** This document is a placeholder for future implementation. The current platform does not include AI Search functionality.
