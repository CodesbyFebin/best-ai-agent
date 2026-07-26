# ADR 0004: Immutable Generation Context

**Status:** Draft  
**Date:** 2026-07-25  
**Authors:** Content Platform  
**Reviewers:** TBD  
**Phase:** C3 — Generation Context

---

## Context

Blueprint generation must be **deterministic**: same inputs → identical HTML output. However, blueprints need access to:

- The manifest (page configuration)
- The resolved entity (canonical data)
- Graph relationships (for linking, comparisons)
- Build metadata (timestamps, version)

If blueprints fetch this data ad-hoc (e.g., call EntityResolver themselves), they could:
- Get different graph state between runs (non-deterministic)
- Have hidden dependencies (hard to test)
- Vary based on external factors (time, random)

We need a **single immutable snapshot** that contains everything a blueprint needs, frozen at generation time.

---

## Problem

How do we provide all necessary data to blueprints in a way that guarantees:

1. **Determinism** — No variation between runs with same manifest
2. **Immutability** — Blueprint cannot modify source data
3. **Completeness** — Blueprint has everything it needs (no runtime graph queries)
4. **Testability** — Can create context in tests without graph loading
5. **Serializability** — Context could be cached/stored (optional)

---

## Decision

Create a **GenerationContext** object that is constructed **once** before blueprint invocation and passed as read-only input.

### Context Interface

```ts
interface GenerationContext {
  manifest: ContentManifest;
  entity: ResolvedEntity;
  graphSnapshot: GraphSnapshot;  // Pre-filtered subgraph
  locale: string;
  mode: 'ssr' | 'static' | 'preview';
  buildId: string;
  buildTimestamp: string;
  features: {
    includeEvidence: boolean;
    includeQualityScore: boolean;
    internalLinkingDepth: number;
  };
}
```

### Graph Snapshot

Rather than giving blueprints access to the full graph (which could be huge), we include a **pre-filtered snapshot**:

- Contains nodes within `internalLinkingDepth` hops of the entity
- Includes edges between those nodes only
- Built once by context factory (not by blueprint)
- Size-bounded (prevent memory bloat)

### Immutability Enforcement

- Context type is deeply `readonly` (TypeScript `as const` / `deepReadonly`)
- Blueprint receives context as `readonly` — compile-time error if mutation attempted
- No setters or mutable methods on context objects
- Timestamps are set during construction and never changed

### Construction Pipeline

```text
Manifest (from registry)
    ↓
EntityResolver.resolve(manifest.entityId)
    ↓
GraphSnapshotBuilder.build(entity, depth=manifest.linkingDepth)
    ↓
GenerationContext({
  manifest,
  entity,
  graphSnapshot,
  locale: manifest.language,
  mode: currentRenderMode,
  buildId: generated,
  buildTimestamp: now,
  features: from config
})
    ↓
Blueprint.generate(ctx)
```

---

## Alternatives Considered

### Alternative 1: Blueprint calls EntityResolver directly

Blueprint receives resolve function and fetches data itself during generation.

**Pros:**
- Blueprint controls what data to load (could be lazy)
- Smaller initial context payload

**Cons:**
- Non-deterministic if graph changes between runs
- Hard to test (need to mock resolver within blueprint)
- Repeated resolution calls for related data (inefficient)
- Blueprint becomes coupled to graph loading strategy
- **Rejected** — breaks determinism and testability

---

### Alternative 2: Global context singleton

`const CurrentContext = { ... }` imported by blueprints.

**Pros:**
- Easy access from anywhere
- No need to pass through function parameters

**Cons:**
- Hidden dependency (blueprint signature doesn't show it needs context)
- Not thread-safe (concurrent renders interfere)
- Impossible to have multiple contexts (e.g., preview two pages side-by-side)
- **Rejected** — anti-pattern; explicit dependency is better

---

### Alternative 3: Full graph passed (no snapshot)

Blueprint gets entire graph (all nodes/edges) to query as needed.

**Pros:**
- Maximum flexibility — blueprint can find any relationship
- No need to pre-compute snapshot

**Cons:**
- Memory heavy (full graph could be thousands of nodes/edges)
- Performance (traversing full graph each render)
- Hard to bound complexity (O(n) vs O(k) where k = snapshot size)
- **Rejected** — snapshot is sufficient for linking; full graph is overkill

---

### Alternative 4: Mutable context builder pattern

Blueprint receives a `ContextBuilder` that it can modify and add data to.

**Pros:**
- Blueprint can enrich context with computed values
- Reduces repeated work (store intermediate results)

**Cons:**
- Allows mutations that could affect determinism
- Harder to reason about (blueprint might modify builder for next blueprint)
- **Rejected** — immutability is more important than convenience; blueprint can compute local variables instead

---

## Consequences

### Positive

- **Deterministic generation**: Context frozen before blueprint runs; no external variation
- **Explicit dependencies**: Blueprint signature `generate(ctx: GenerationContext)` shows all inputs
- **Testable**: Tests construct mock context with known values; no graph loading needed
- **Cacheable**: Context could be serialized and cached (future)
- **Performance**: Graph snapshot limits work to relevant subgraph only
- **Feature flags**: `features` object controls optional behavior without branching

### Negative (Trade-offs)

- **Initial overhead**: Building snapshot adds CPU/memory before blueprint runs (but justified by speed during generation)
- **Snapshot limits**: Blueprint can't access nodes outside `internalLinkingDepth` (must request deeper depth in manifest, which increases snapshot size)
- **Additional complexity**: Need `GraphSnapshotBuilder` component (C4 deliverable)

---

## Deferred Work

- **Snapshot caching**: Reuse snapshots for same entity (if graph unchanged)
- **Dynamic depth**: Allow blueprints to request deeper traversal mid-generation (would need async resolution, violates determinism?)
- **Context compression**: Strip unused fields from snapshot based on blueprint requirements (optimization)
- **Snapshot diffing**: For incremental rebuilds (only rebuild if snapshot changed)

---

## Implementation Checklist

- [x] Interface defined in `engine/content/contracts/GenerationContext.ts`
- [ ] GraphSnapshotBuilder implementation (C4)
- [ ] ContextFactory: builds GenerationContext from manifest + resolver
- [ ] Immutability enforcement (TypeScript `deep readonly` utility)
- [ ] Timestamp generation (ISO 8601)
- [ ] Feature flag defaults from configuration
- [ ] Unit tests: context construction, snapshot size limits, immutability checks
- [ ] Integration: EntityResolver + snapshot builder wired to blueprint invocation
- [ ] ADR approved and contract frozen at v1.0.0

---

## Related ADRs

- **0002** — Content Manifest (source of manifest)
- **0003** — EntityResolver (provides `entity`)
- **0005** — Blueprint Engine (consumes context)

---

## Success Criteria

- Blueprint `generate()` method signature accepts only `GenerationContext` (plus no other parameters)
- Context is deeply immutable (TypeScript compiler enforces)
- Graph snapshot size ≤ 100 nodes for typical agent page (configurable bound)
- `buildTimestamp` identical across all parts of generated page (cache-busting consistency)
- Feature flags correctly control blueprint behavior (evidence injection, quality score display)

---

*This ADR must be approved before GenerationContext implementation ships. The contract will be frozen at v1.0.0 upon sign-off.*
