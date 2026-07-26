# ADR 0003: Entity Resolver as Single Resolution Point

**Status:** Draft  
**Date:** 2026-07-25  
**Authors:** Platform Engineering, Content Platform  
**Reviewers:** TBD  
**Phase:** C2 — Entity Resolver

---

## Context

The Content OS needs to fetch canonical entity data from the Knowledge Graph. Pages reference entities via `entityId` (e.g., "agent/cursor-ai"). However, the rest of the platform (RelatedAgents widget, recommendation engine, admin UI) also needs to fetch entity data.

Without a dedicated resolver, each consumer would:

- Import graph data directly (coupling to graph format)
- Implement its own entity lookup logic (duplication)
- Need updates whenever graph schema changes (fragility)
- Have inconsistent error handling and caching

We need a **single entry point** for entity resolution that presents a stable interface to consumers, independent of the underlying graph implementation.

---

## Problem

How do we provide entity data to Content OS and other consumers without:

1. Exposing the Knowledge Graph internal structure (GraphNode/GraphEdge)?
2. Duplicating resolution logic across multiple components?
3. Making it hard to change graph storage (e.g., from in-memory JSON to database)?
4. Inconsistent handling of missing entities or errors?
5. Losing the opportunity to batch and cache resolution?

---

## Decision

Adopt an **EntityResolver** service that is the **only** way to obtain canonical entity data.

### Resolver Interface

```ts
interface EntityResolver {
  resolve(entityType: EntityType, entityId: string): ResolvedEntity | null;
  resolveBatch(requests: Array<{ entityType: EntityType; entityId: string }>): Map<string, ResolvedEntity>;
  canResolve(entityType: EntityType, entityId: string): boolean;
}
```

### ResolvedEntity Shape

```ts
interface ResolvedEntity {
  id: string;                    // Graph node ID
  type: EntityType;
  data: Record<string, unknown>; // Raw graph node data (opaque to consumers)
  relationships: Relationship[]; // Direct edges only
  sourceGraphVersion: string;    // Provenance
  resolvedAt: string;            // Timestamp
}
```

### Key Properties

1. **Single point of contact** — All entity fetches go through this interface
2. **Graph-agnostic** — Consumers don't know or care about `GraphNode`/`GraphEdge`
3. **Batch support** — `resolveBatch()` enables efficiency for multiple lookups
4. **Canonical source** — Resolver always uses the current Knowledge Graph instance
5. **Idempotent** — Same input → same output (deterministic)
6. **Versioned contract** — Interface frozen at `v1.0.0`; breaking changes require MAJOR bump

### Implementation

- **Dependency injection** — EntityResolver passed to consumers (not a global singleton)
- **Graph adapter** — Implementation translates from `GraphData` to `ResolvedEntity`
- **Cache layer** — Optional LRU cache on top (can be added without changing interface)
- **Validation** — `canResolve()` pre-check before attempting generation

---

## Alternatives Considered

### Alternative 1: Direct graph import

Consumers import `graph-data.json` directly and perform lookups themselves.

**Pros:**
- No additional abstraction layer
- Consumers control their own caching

**Cons:**
- Tightly couples every consumer to graph schema (`GraphNode`)
- Duplicate lookup code (map operations, edge filtering)
- Hard to change graph representation (all consumers must update)
- No shared cache → repeated work
- **Rejected** — violates abstraction principle; leads to drift

---

### Alternative 2: Static type-guarded lookup utility

Utility function `getEntity(type, id)` exported from a shared module.

**Pros:**
- Single function to maintain
- Still relatively simple

**Cons:**
- Still exposes graph structure (returns `GraphNode`)
- No batch operation for efficiency
- No interface abstraction (consumers still depend on graph types)
- Hard to add caching without changing function signature
- **Rejected** — better than direct import but still insufficient abstraction

---

### Alternative 3: Database-backed entity service

Separate microservice that exposes entity data via HTTP API.

**Pros:**
- Language-agnostic (could serve non-TypeScript consumers)
- Independent scaling
- Shared cache at service layer

**Cons:**
- Overkill for current scale (single process, same runtime)
- Adds network latency for in-process calls
- Operational overhead (deployment, monitoring)
- **Rejected** — premature optimization; resolver as interface allows future migration

---

### Alternative 4: Global singleton resolver

`const EntityResolver = new GlobalResolver();` import anywhere.

**Pros:**
- Easy to use
- Shared cache automatic

**Cons:**
- Hidden dependencies (hard to test, no DI)
- Cannot have multiple instances (e.g., different graph versions for A/B)
- Global mutable state risks (race conditions)
- **Rejected** — testability and DI are more important than convenience

---

## Consequences

### Positive

- **Clean abstraction** — Consumers see only `EntityResolver` interface, not graph internals
- **Centralized logic** — Graph-to-entity translation in one place
- **Testability** — Mock `EntityResolver` in tests without loading graph
- **Future-proof** — Can change graph storage without affecting consumers
- **Batching** — `resolveBatch()` enables optimization for bulk lookups (e.g., related agents fetch)
- **Provenance** — `sourceGraphVersion` and `resolvedAt` included automatically

### Negative (Trade-offs)

- **One more layer** — Adds indirection (but justified by abstraction)
- **Interface maintenance** — Must keep contract stable (v1.0.0 freeze)
- **Dependency injection plumbing** — Need to wire resolver through app bootstrap

---

## Deferred Work

- **Cache strategy**: LRU cache implementation (C3)
- **Graph versioning**: Multiple graph versions for A/B testing (later phase)
- **Metrics**: Resolution latency, cache hit rates (observability)
- **Streaming resolution**: For large batch operations (future)

---

## Implementation Checklist

- [x] Interface defined in `engine/content/contracts/EntityResolver.ts`
- [x] Relationship type definitions (uses existing edge types from graph)
- [ ] Implementation: `EntityResolver` class wrapping graph data
- [ ] Batch resolution with O(1) lookups using Map data structures
- [ ] Error handling: null returns for missing entities (no exceptions)
- [ ] Wire resolver into `GenerationContext` factory (C3)
- [ ] Unit tests: resolve(), resolveBatch(), canResolve()
- [ ] Integration: EntityResolver used by Content OS pipeline
- [ ] ADR approved and contract frozen at v1.0.0

---

## Related ADRs

- **0001** — Knowledge Graph (provides raw graph data)
- **0002** — Content Manifest (uses `entityId` that resolver consumes)
- **0004** — GenerationContext (includes `entity: ResolvedEntity`)

---

## Success Criteria

- All entity fetches in Content OS use `EntityResolver` (no direct graph access)
- `resolveBatch()` is used when multiple entities needed (performance)
- Mock resolver enables isolated unit tests for blueprints
- Changing graph storage (e.g., JSON → DB) requires changes only in resolver implementation, not consumers

---

*This ADR must be approved before EntityResolver implementation is considered complete. The contract will be frozen at v1.0.0 upon sign-off.*
