# Phase B — Knowledge Graph Implementation Plan

**Status:** 📋 PLANNED  
**Estimated Duration:** 1-2 weeks  
**Priority:** High (enables product differentiation)  
**Dependencies:** Phase A (Core Freeze) complete

---

## Objective

Build a knowledge graph that models relationships between entities (agents, categories, authors, MCP servers, research) to enable intelligent navigation, recommendations, and semantic understanding.

---

## Why Knowledge Graph?

Currently, entity relationships are implicit:
- Agent → Category (one-to-many)
- Agent → Author (many-to-many via research)
- No explicit "related agents" relationships

A knowledge graph will enable:
- "Related Agents" widget on each agent page
- "Users also searched" suggestions
- Enhanced category navigation with relationship clusters
- Foundation for future AI search (Phase D)

---

## Graph Schema Design

### Node Types

| Node Type | ID Field | Properties | Count Target |
|-----------|----------|------------|--------------|
| `agent` | `slug` | name, category, pricing, scores, description | 1,250+ |
| `category` | `slug` | name, description, parentCategory | 20-30 |
| `author` | `slug` | name, bio, verified, avatarUrl | 50+ |
| `mcp_server` | `slug` | name, description, capabilities, integrations | 100+ |
| `research` | `slug` | title, summary, publishDate, type | 10+ |

### Edge Types

| Edge Type | From → To | Properties | Inference Logic |
|-----------|-----------|------------|-----------------|
| `BELONGS_TO` | Agent → Category | `{since: string, confidence: number}` | Direct: agent.category field |
| `WRITTEN_BY` | Research → Author | `{role: 'primary'|'secondary'}` | Direct: research.authors array |
| `MENTIONS` | Research → Agent | `{context: string, relevance: number}` | Text extraction: agent slug appears in research content |
| `SIMILAR_TO` | Agent ↔ Agent | `{score: number, reasons: string[]}` | Comparison data, shared features, same category |
| `INTEGRATES_WITH` | Agent → MCP | `{integrationType: string, docsUrl: string}` | Direct: agent.mcpIntegrations array |
| `ALTERNATIVE_TO` | Agent → Agent | `{comparisonUrl: string}` | Comparison pages exist between agents |

---

## Implementation Phases

### B1: Graph Database Setup (Day 1-2)

**Choice:** PostgreSQL + `pgvector` extension (already using PostgreSQL for relational data)

**Why pgvector:**
- Already have PostgreSQL for potential future data
- pgvector supports vector embeddings for semantic search (Phase D)
- Single database, no external dependencies
- Good for hybrid queries (graph + vector)

**Schema:**

```sql
-- Nodes (we'll use existing tables initially, but create graph-specific views)
-- For now, we'll build graph in memory from existing data files

-- Edges table
CREATE TABLE graph_edges (
  id SERIAL PRIMARY KEY,
  from_type TEXT NOT NULL, -- 'agent', 'category', etc.
  from_id TEXT NOT NULL,   -- slug
  to_type TEXT NOT NULL,
  to_id TEXT NOT NULL,
  relationship_type TEXT NOT NULL, -- 'BELONGS_TO', 'SIMILAR_TO', etc.
  properties JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(from_type, from_id, to_type, to_id, relationship_type)
);

-- Indexes for fast traversal
CREATE INDEX idx_graph_from ON graph_edges(from_type, from_id);
CREATE IDX graph_to ON graph_edges(to_type, to_id);
CREATE INDEX idx_graph_relationship ON graph_edges(relationship_type);
```

**Alternative (Simpler for MVP):** Build graph in-memory from entity JSON files, no database required initially. Graph is static (rebuild on data changes).

---

### B2: Graph Builder Pipeline (Day 2-3)

**Script:** `scripts/build-graph.ts`

**Process:**

1. **Load all entities** from `src/data/` files:
   - `agents.ts` → agent nodes
   - `categories.ts` → category nodes
   - `authors.ts` → author nodes
   - `comparisons.ts` → SIMILAR_TO edges
   - `research.ts` → research nodes + WRITTEN_BY, MENTIONS edges

2. **Infer edges:**
   - BELONGS_TO: `agent.category` → category
   - WRITTEN_BY: `research.authors[]` → author
   - SIMILAR_TO: comparisons between agents
   - INTEGRATES_WITH: `agent.mcpIntegrations[]` → mcp_server
   - ALTERNATIVE_TO: comparison pages

3. **Calculate weights:**
   - SIMILAR_TO score: based on shared features, category, comparison verdict
   - MENTIONS relevance: based on context proximity

4. **Output:**
   - Option A: JSON file `graph-data.json` (static, loaded into memory)
   - Option B: Insert into `graph_edges` table (if using database)

**Output format (JSON):**

```json
{
  "nodes": [
    {"id": "agent/cursor", "type": "agent", "data": {...}},
    {"id": "category/coding-agents", "type": "category", "data": {...}}
  ],
  "edges": [
    {"from": "agent/cursor", "to": "category/coding-agents", "type": "BELONGS_TO", "properties": {}},
    {"from": "agent/cursor", "to": "agent/claude", "type": "SIMILAR_TO", "properties": {"score": 0.87, "reasons": ["comparison-page", "same-category"]}}
  ]
}
```

---

### B3: Graph API Endpoints (Day 3-5)

**Add to `server.tsx`:**

```typescript
// GET /api/graph/related/:entityType/:entityId
// Returns all nodes connected to given entity
app.get('/api/graph/related/:entityType/:entityId', async (req, res) => {
  const { entityType, entityId } = req.params;
  const limit = parseInt(req.query.limit as string) || 10;

  // Query graph (from memory or database)
  const related = await getRelatedEntities(entityType, entityId, limit);
  res.json({ related });
});

// GET /api/graph/similar/:entityType/:entityId
// Returns only SIMILAR_TO relationships
app.get('/api/graph/similar/:entityType/:entityId', async (req, res) => {
  const { entityType, entityId } = req.params;
  const limit = parseInt(req.query.limit as string) || 5;

  const similar = await getSimilarEntities(entityType, entityId, limit);
  res.json({ similar });
});

// GET /api/graph/path/:fromType/:fromId/:toType/:toId
// Returns shortest path between two entities
app.get('/api/graph/path/:fromType/:fromId/:toType/:toId', async (req, res) => {
  const { fromType, fromId, toType, toId } = req.params;

  const path = await findShortestPath(fromType, fromId, toType, toId);
  res.json({ path });
});
```

**Response format:**

```json
{
  "related": [
    {
      "id": "agent/claude",
      "type": "agent",
      "data": {
        "name": "Claude 3.5 Sonnet",
        "slug": "claude",
        "category": "coding-agents",
        "bestaiScore": 9.6
      },
      "relationship": "SIMILAR_TO",
      "score": 0.87
    }
  ]
}
```

---

### B4: Frontend Integration (Day 5-7)

#### B4a: "Related Agents" Widget

**Component:** `src/components/RelatedAgents.tsx`

**Props:**
```typescript
interface RelatedAgentsProps {
  agentSlug: string;
  limit?: number;
}
```

**Behavior:**
- On mount, fetch `/api/graph/similar/agent/${agentSlug}?limit=5`
- Display cards with agent name, score, bestaiScore
- Click → navigate to agent page

**Placement:** Agent review page, sidebar below main content.

#### B4b: Enhanced Breadcrumbs

Use graph to show category → subcategory → agent hierarchy with relationship context.

#### B4c: Search Autocomplete

As user types, query graph for entity matches across all types.

---

### B5: Graph Validation & Testing (Day 7-10)

**Tests (add to `scripts/verify-graph.ts`):**

1. **Graph connectivity:**
   - All agents have at least one BELONGS_TO edge
   - No orphaned nodes (except maybe root categories)
   - Graph is connected (single component) or mostly connected

2. **Relationship sanity:**
   - SIMILAR_TO edges only between agents (same type)
   - No self-loops
   - Edge properties have expected structure

3. **API correctness:**
   - `/api/graph/related` returns valid JSON
   - Pagination works (`limit` parameter)
   - Non-existent entity returns 404 gracefully

4. **Performance:**
   - Query latency < 50ms p95 (in-memory graph) or < 100ms (database)
   - Caching headers set appropriately

**Test command:** `npm run test:graph`

---

### B6: Admin Graph Visualization (Day 10-14) *(Optional but valuable)*

**Endpoint:** `/admin/graph/visualize` (protected, admin only)

**UI:** Use Cytoscape.js or D3 to render interactive graph.

**Features:**
- Filter by node type
- Show/hide edge types
- Search for entity by name
- Click node → highlight neighbors
- Show node properties on hover

**Purpose:** Debugging, exploration, editorial planning.

---

## API Specification Summary

| Endpoint | Method | Purpose | Response |
|----------|--------|---------|----------|
| `/api/graph/related/:type/:id` | GET | Get all connected entities | `{related: Array<{id, type, data, relationship, score}>}` |
| `/api/graph/similar/:type/:id` | GET | Get similar agents only | `{similar: [...]}` |
| `/api/graph/path/:fromType/:fromId/:toType/:toId` | GET | Shortest path | `{path: Array<edge>}` |
| `/api/graph/stats` | GET | Graph statistics (node/edge counts) | `{nodes: number, edges: number, density: number}` |

---

## Success Criteria

- ✅ Graph built from all entity data (1,250+ agents, 300+ tools, 20+ categories, etc.)
- ✅ 1,000+ edges created
- ✅ API endpoints functional and documented
- ✅ "Related Agents" widget showing 5 relevant suggestions on each agent page
- ✅ Graph validation tests pass (100%)
- ✅ Query latency < 50ms (in-memory) or < 100ms (database)
- ✅ No orphaned entities (orphan threshold < 5%)

---

## Risks & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Graph too sparse initially | Medium | High | Seed with inferred edges from category memberships; manual curation UI to add relationships |
| Performance degradation | Low | Medium | Cache results (Redis); paginate; limit degree |
| Circular dependencies | Medium | Low | Detect cycles during build; log warnings |
| Data staleness | Medium | Medium | Rebuild graph on data changes (automated job) |
| Stale relationships | Medium | Medium | Freshness score on edges; decay over time |

---

## Rollup

Phase B transforms BestAIAgent.in from a flat directory into an intelligent graph-powered platform. It directly enables:
- Better discovery (related agents)
- Enhanced navigation (graph-based)
- Foundation for semantic search (Phase D)

**Estimated effort:** 1-2 weeks for a production-ready implementation.

---

**Ready to implement.**  
**Next:** Set up graph schema, build pipeline, API endpoints, frontend widget.
