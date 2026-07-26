# API Contracts

**Version:** 1.0.0  
**Status:** Frozen  
**Owner:** Platform Engineering  
**Last Updated:** 2026-07-25

This document defines all external HTTP APIs in the ATLAS P99 platform. All endpoints are versioned, documented, and frozen.

---

## General Conventions

- **Base URL:** All endpoints are relative to application root
- **Content-Type:** Requests expect `application/json`; responses return `application/json`
- **Error Format:** `{ "error": "Human-readable message", "code": "ERROR_CODE" }`
- **Success Format:** `{ "success": true, "data": {...} }` or direct payload
- **CORS:** All endpoints support CORS for same-origin requests
- **Auth:** None (public endpoints)

---

## Table of Contents

1. [Knowledge Graph API](#knowledge-graph-api)
2. [Recommendation API](#recommendation-api)
3. [Lead Capture API](#lead-capture-api)
4. [Tool Submission API](#tool-submission-api)
5. [Subscribe API](#subscribe-api)
6. [Error Codes](#error-codes)
7. [Rate Limits](#rate-limits)
8. [Versioning Policy](#versioning-policy)

---

## Knowledge Graph API

### Base Path: `/api/graph/*`

All graph endpoints are read-only and serve pre-built `graph-data.json`.

---

#### GET `/api/graph/stats`

Returns statistics about the knowledge graph.

**Response:**
```json
{
  "nodeCount": 25,
  "edgeCount": 68,
  "nodeTypes": {
    "agent": 8,
    "category": 6,
    "comparison": 9,
    "research": 2
  },
  "edgeTypes": {
    "BELONGS_TO": 20,
    "TOP_AGENT": 5,
    "COMPARED_WITH": 24,
    "SIMILAR_TO": 18,
    "CITED_BY": 1
  },
  "generatedAt": "2025-07-25T12:00:00Z"
}
```

**Errors:**
- `503` — Graph data not loaded (server misconfiguration)

**Cache-Control:** `public, max-age=3600` (1 hour)

---

#### GET `/api/graph/related/:entityType/:entityId`

Returns all nodes directly connected to the specified entity.

**Path Parameters:**
- `entityType` — One of: `agent`, `category`, `comparison`, `research`
- `entityId` — Graph node ID (slug), e.g., `cursor-ai`

**Query Parameters:**
- `types` (optional) — Filter relationships by comma-separated edge types, e.g., `BELONGS_TO,SIMILAR_TO`

**Response:**
```json
{
  "entity": {
    "id": "agent/cursor-ai",
    "type": "agent",
    "data": { /* full node data */ }
  },
  "relationships": [
    {
      "type": "BELONGS_TO",
      "target": {
        "id": "category/coding-agents",
        "type": "category",
        "data": { /* category data */ }
      }
    },
    // ... more relationships
  ]
}
```

**Errors:**
- `404` — Entity not found in graph
- `400` — Invalid entityType

---

#### GET `/api/graph/similar/:entityType/:entityId`

Returns similar entities based on graph proximity and edge weights.

**Path Parameters:**
- `entityType` — One of: `agent`, `category`, `comparison`, `research`
- `entityId` — Graph node ID (slug)

**Query Parameters:**
- `limit` (optional) — Maximum number of similar results (default 5, max 20)

**Response:**
```json
{
  "entity": {
    "id": "agent/cursor-ai",
    "type": "agent",
    "data": { /* full node data */ }
  },
  "similar": [
    {
      "node": {
        "id": "agent/claude-ai",
        "type": "agent",
        "data": {
          "slug": "claude-ai",
          "name": "Claude AI",
          "company": "Anthropic",
          "logo": "/images/logos/claude.svg",
          "score": { "overall": 4.7 }
        }
      },
      "similarityScore": 0.89,
      "sharedRelationships": ["category/coding-agents", "category/ai-assistants"]
    },
    // ... more similar entities
  ]
}
```

**Algorithm:** Multi-hop graph traversal with relationship weighting. Higher `similarityScore` indicates stronger graph connectivity.

**Errors:**
- `404` — Entity not found
- `400` — Invalid entityType or limit

---

#### GET `/api/graph/path/:fromType/:fromId/:toType/:toId`

Returns the shortest path between two entities in the graph.

**Path Parameters:**
- `fromType`, `toType` — Entity types
- `fromId`, `toId` — Graph node IDs

**Response:**
```json
{
  "from": "agent/cursor-ai",
  "to": "agent/github-copilot",
  "path": [
    {
      "node": { "id": "agent/cursor-ai", "type": "agent", "data": {...} },
      "incomingEdge": null,
      "outgoingEdge": { "type": "BELONGS_TO", "to": "category/coding-agents" }
    },
    {
      "node": { "id": "category/coding-agents", "type": "category", "data": {...} },
      "incomingEdge": { "type": "BELONGS_TO", "from": "agent/cursor-ai" },
      "outgoingEdge": { "type": "TOP_AGENT", "to": "agent/github-copilot" }
    },
    {
      "node": { "id": "agent/github-copilot", "type": "agent", "data": {...} },
      "incomingEdge": { "type": "TOP_AGENT", "from": "category/coding-agents" },
      "outgoingEdge": null
    }
  ],
  "length": 2,
  "algorithm": "BFS"
}
```

**Algorithm:** Breadth-First Search (BFS) for unweighted shortest path.

**Errors:**
- `404` — No path exists between entities
- `400` — Invalid entity types or IDs

---

## Recommendation API

### POST `/api/recommend`

Generates AI-powered recommendations based on user query.

**Request Body:**
```json
{
  "prompt": "I need an AI agent for coding Python",
  "industry": "Technology",  // optional
  "budget": "Premium"        // optional
}
```

**Response:**
```json
{
  "text": "### Recommendations:\n1. **Cursor AI** (Coding)\n2. **Claude AI** (General Assistant)\n..."
}
```

**Errors:**
- `400` — Missing or invalid `prompt` field
- `500` — AI service error

**Notes:**
- Uses Google Gemini if configured; otherwise returns static fallback
- Not rate-limited (but may be in future)

---

## Lead Capture API

### POST `/api/submit-lead`

Captures lead information from contact forms.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "message": "Interested in partnership"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lead captured successfully."
}
```

**Errors:**
- `400` — Missing required fields
- `500` — Storage failure

**Implementation:** Currently no-op (returns success); integrate with CRM later.

---

## Tool Submission API

### POST `/api/submit-tool`

Handles community tool submissions.

**Request Body:**
```json
{
  "name": "My AI Tool",
  "description": "Does amazing things",
  "url": "https://mytool.com",
  "submitterEmail": "creator@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Tool submitted successfully."
}
```

**Errors:**
- `400` — Invalid payload
- `500` — Submission failed

**Implementation:** Currently no-op; send to review queue.

---

## Subscribe API

### POST `/api/subscribe`

Handles newsletter subscription.

**Request Body:**
```json
{
  "email": "subscriber@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Subscribed successfully."
}
```

**Errors:**
- `400` — Invalid email format
- `409` — Already subscribed
- `500` — Subscription service failure

**Implementation:** Currently no-op; integrate with email provider.

---

## Error Codes

| Code | HTTP Status | Meaning | Resolution |
|------|-------------|---------|------------|
| `MISSING_FIELD` | 400 | Required request field missing | Check request body |
| `INVALID_ENTITY` | 404 | Graph entity not found | Verify entityId |
| `GRAPH_UNAVAILABLE` | 503 | Graph data not loaded | Check server startup |
| `AI_SERVICE_ERROR` | 500 | External AI service failed | Retry later |
| `UNKNOWN` | 500 | Unexpected server error | Contact support |

All errors include a human-readable `message`. Clients should display messages to end-users where appropriate.

---

## Rate Limits

**Current:** None (all endpoints unlimited)

**Planned (Phase E):**
- Graph API: 100 req/min per IP
- Recommendation API: 10 req/min per IP
- Form submissions: 5 req/min per IP

Rate limits will be enforced via middleware and return `429 Too Many Requests`.

---

## Versioning Policy

All API endpoints follow semantic versioning:

- Major version (`/api/v1/...`) required for breaking changes
- Current version: `v1` (implicit; no prefix yet)
- When breaking changes occur: Add `/api/v2/` prefix, keep v1 for 12 months
- Deprecation notices in response headers: `X-API-Deprecated: true`, `X-API-Deprecation-Date`, `X-API-Sunset-Date`

**Contract Stability:** 
- Graph API endpoints are frozen at v1.0.0 (see [GRAPH_SPECIFICATION.md](../GRAPH_SPECIFICATION.md))
- Content OS APIs (manifest, resolver) will be versioned when public

---

## Schema Registry

No formal schema registry yet. Schemas are documented in this file and in:
- Graph API: [`docs/GRAPH_SPECIFICATION.md`](../GRAPH_SPECIFICATION.md)
- Content OS: [`docs/ARCHITECTURE/CONTENT_OS.md`](CONTENT_OS.md)

---

## Verification

Production deployment can be verified with:

```bash
npm run test:production
```

Which runs `scripts/verify-production.mjs` against `BASE_URL`.

---

## Change Log

| Date | Change | Endpoint | Version | Author |
|------|--------|----------|---------|--------|
| 2026-07-25 | Initial API contracts frozen v1.0.0 | All | 1.0.0 | Platform Engineering |
| 2026-07-25 | Add Graph API endpoints | /api/graph/* | 1.0.0 | Platform Engineering |
| 2026-07-25 | Add Recommendation API | /api/recommend | 1.0.0 | Platform Engineering |

---

*This document defines the complete external API surface. All implementations must comply with these contracts.*
