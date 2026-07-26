# Knowledge Graph - System Specification

**Phase:** 13  
**Status:** Not Implemented (Future)  
**Priority:** High (enables AI Search)  
**Dependencies:** P04 (Entity Resolvers) complete

---

## 1. Overview

The Knowledge Graph models relationships between entities (agents, categories, authors, MCP servers, research reports) to enable intelligent navigation, recommendations, and semantic understanding.

---

## 2. Graph Schema

### 2.1 Node Types

| Node Type | Properties | Example |
|-----------|------------|---------|
| Agent | name, slug, category, pricing, scores | cursor, claude |
| Category | name, slug, description | coding-agents, voice-bots |
| Author | name, slug, bio, verified | arshdeep-singh |
| McpServer | name, slug, description, capability | github-mcp |
| Research | title, slug, summary, publishDate | state-of-ai-agents-india-2026 |

### 2.2 Edge Types

| Edge Type | From → To | Properties |
|-----------|-----------|------------|
| BELONGS_TO | Agent → Category | since, confidence |
| WRITTEN_BY | Agent → Author | contributionType |
| RELATED_TO | Agent ↔ Agent | similarityScore, relationType |
| MENTIONS | Agent ↔ McpServer | context, integrationType |
| CITED_BY | Research → Agent | claimSegment |
| AUTHORED_BY | Research → Author | role |

---

## 3. Technical Implementation

### 3.1 Database Choice

**Option 1 - Neo4j (Recommended)**
- Purpose-built graph database
- Cypher query language
- Visual graph explorer
- Good for complex traversals

**Option 2 - PostgreSQL + pgvector**
- Already in use for relational data
- pgvector for embeddings + graph queries
- Single database
- Good for hybrid queries

### 3.2 Graph Construction

**Initial Population:**
1. Extract entities from existing data (`src/data/*.ts`)
2. Create nodes for each entity
3. Infer edges from relationships:
   - Agent.category → BELONGS_TO Category
   - Explicit author fields → WRITTEN_BY
   - Comparison data → RELATED_TO (similarity scores)
   - MCP integration mentions → MENTIONS
4. Manual curation UI for adding missing edges

**Ongoing Updates:**
- On agent page publish → add/update nodes
- On evidence addition → update edge weights
- Daily batch job to recalculate similarity scores

---

## 4. API

### 4.1 Query Endpoints

```
GET /api/graph/related/:entityType/:entityId
→ Returns nodes connected to given entity

GET /api/graph/path/:fromType/:fromId/:toType/:toId
→ Returns shortest path between entities

GET /api/graph/similar/:entityType/:entityId
→ Returns similar entities (via RELATED_TO)

GET /api/graph/traverse/:entityType/:entityId?depth=2
→ Returns N-hop neighborhood

POST /api/graph/search?q=<query>
→ Full-text + vector search across nodes
→ Returns matching entities + relevance scores
```

### 4.2 Admin API

```
POST /api/admin/graph/node
POST /api/admin/graph/edge
DELETE /api/admin/graph/node/:id
DELETE /api/admin/graph/edge/:from/:to
GET /api/admin/graph/stats
```

---

## 5. Use Cases

### 5.1 "Related Agents" Widget
On an agent page, show 3-5 similar agents based on:
- Same category
- Mentioned together in research
- Shared MCP integrations
- Similar pricing tier

**Implementation:** `/api/graph/similar/agent/cursor?limit=5`

### 5.2 "Users Also Searched"
On category page, show agents frequently viewed together.

**Implementation:** Co-occurrence graph edges with view counts.

### 5.3 Intelligent Navigation
 breadcrumb trails that adapt based on exploration patterns.

### 5.4 Search Enhancement
Use graph to boost results based on entity relationships (e.g., search "coding agents" also include agents in related categories).

---

## 6. Implementation Phases

**P13-1: Schema & Database Setup** (Week 1-2)
- Finalize graph schema
- Deploy Neo4j (or pgvector)
- Define constraints/indices
- Test connectivity

**P13-2: Data Pipeline** (Week 2-3)
- Write ETL from `src/data/*.ts` → graph
- Script for incremental updates
- Validate node/edge counts

**P13-3: API Development** (Week 3-4)
- Implement query endpoints
- Add caching layer (Redis)
- Rate limiting
- Documentation (OpenAPI)

**P13-4: Admin UI** (Week 4-5)
- Graph visualization (Cytoscape.js, D3)
- Node/edge creation forms
- Relationship management
- Stats dashboard

**P13-5: Integration** (Week 5-6)
- "Related agents" component on agent pages
- Breadcrumb enhancement
- Search query boosting
- Monitoring & logging

**P13-6: Testing & QA** (Week 6-7)
- Integration tests (100+ scenarios)
- Performance testing (<100ms queries)
- Data validation (no orphaned nodes)
- Load testing (1000 QPS)

**P13-7: Documentation & Handoff** (Week 7-8)
- API docs
- Graph query cookbook
- Maintenance runbook
- Team training

---

## 7. Success Criteria

- 500+ nodes populated
- 1000+ edges created
- Query latency p95 < 100ms
- No orphaned entities
- Graph visualization functional
- "Related agents" CTR > 5%

---

## 8. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Graph too sparse initially | Seed with inferred edges; manual curation |
| Query performance issues | Add indices; cache heavily; pagination |
| Data consistency | Transactional updates; daily reconciliation |
| Vendor lock-in | Use open-source graph DB; export to JSON |
| Team unfamiliarity | Training; hire graph specialist |

---

**Status:** Awaiting P13 kickoff after platform launch
