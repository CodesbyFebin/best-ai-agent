# ADR 0005: Blueprint Engine Architecture

**Status:** Approved  
**Date:** 2026-07-25  
**Authors:** Content Platform  
**Reviewers:** TBD  
**Phase:** C4 — Blueprint Engine

---

## Context

We need to render pages from manifest data. Different page types (product detail, category overview, comparison, research) require different HTML structures, SEO fields, and component assemblies.

A naive approach might use conditional rendering:

```tsx
if (manifest.contentType === 'product_detail') {
  return <ProductDetail entity={entity} />;
} else if (manifest.contentType === 'category_overview') {
  return <CategoryOverview entity={entity} />;
}
```

This leads to:
- One massive component with dozens of conditionals
- Difficult to add new page types (modify central switch)
- No versioning of page templates
- Testing complexity (all page types in one component)

We need an **extensible rendering system** where new page types can be added without modifying core engine code.

---

## Problem

How do we design a rendering system that:

1. **Supports multiple page types** — product, category, comparison, research, landing
2. **Is extensible** — Add new blueprint without changing engine
3. **Maintains determinism** — Same context → identical HTML
4. **Allows versioning** — Blueprint v1 and v2 can coexist (A/B testing or migration)
5. **Validates suitability** — Blueprint can reject manifest it cannot render
6. **Separates concerns** — Blueprint logic does not leak into engine

---

## Decision

Implement a **Blueprint Engine** with:

- **Blueprint interface** (frozen contract) — what all blueprints must implement
- **Blueprint Registry** — catalog of available blueprints (by blueprintId)
- **Blueprint Selector** — chooses blueprint for a given manifest (by contentType match)
- **Blueprint Output** — standardized result (html, metadata, evidence, resources)

### Blueprint Interface

```ts
interface Blueprint {
  readonly id: string;                     // e.g., "product-detail-v1"
  readonly contentType: ContentType[];     // supported types (usually one)

  generate(ctx: GenerationContext): BlueprintOutput;
  validate(manifest: ContentManifest): BlueprintValidation;
  canGenerate?(ctx: GenerationContext): boolean;
}
```

### Registry Pattern

```ts
class BlueprintRegistry {
  private blueprints: Map<string, Blueprint>; // blueprintId → Blueprint

  register(blueprint: Blueprint): void;
  get(blueprintId: string): Blueprint | null;
  select(contentType: ContentType): Blueprint[]; // all that support this type
}
```

### Selection Logic

```ts
function selectBlueprint(manifest: ContentManifest, registry: BlueprintRegistry): Blueprint {
  // 1. Look up by manifest.blueprintId (exact match)
  const byId = registry.get(manifest.blueprintId);
  if (byId && manifest.contentType in byId.contentType) {
    return byId;
  }

  // 2. Fallback: first blueprint that supports this contentType
  const candidates = registry.select(manifest.contentType);
  if (candidates.length > 0) {
    return candidates[0]; // Or highest priority (future)
  }

  throw new Error(`No blueprint found for contentType=${manifest.contentType}`);
}
```

### Invariants

1. **Deterministic selection**: Given same manifest and registry, always returns same blueprint
2. **Version frozen**: Blueprint interface never changes without MAJOR version bump
3. **No side effects**: Blueprint constructor must be pure (no file/network IO)
4. **Output validity**: `BlueprintOutput.html` must be valid HTML5 (enforced by validation)

---

## Alternatives Considered

### Alternative 1: Single PageRenderer component with switch

One React component that switches on `manifest.contentType`.

**Pros:**
- Simple to understand
- All rendering in one place

**Cons:**
- Violates Open/Closed Principle (must modify for each new type)
- Becomes huge and unmaintainable as types grow
- Hard to version (cannot have v1 and v2 simultaneously)
- Tightly coupled to React (blueprint would not be engine-agnostic)
- **Rejected** — not scalable

---

### Alternative 2: Template files (Handlebars, EJS)

Store HTML templates in files; engine loads template by contentType and interpolates data.

**Pros:**
- Separates structure from code
- Designers can edit templates without TS changes

**Cons:**
- Limited logic in templates (no loops over evidence, complex conditionals)
- Hard to enforce deterministic rendering (template engine features vary)
- No type safety (template variables must be manually kept in sync)
- Versioning templates is possible but awkward (file naming)
- **Rejected** — we need full TypeScript logic; templates too limited

---

### Alternative 3: Component library only (no engine)

Just build React components for each page type; manifest indicates which component to use.

**Pros:**
- Leverages React ecosystem
- Easy for frontend developers

**Cons:**
- Blueprint would have side effects (component lifecycle)
- Hard to test outside React runtime
- Mixing concerns: blueprint should be pure function of context, not component with hooks
- Not SSR-friendly during build (needs React render for validation)
- **Rejected** — blueprint must be pure function; React components are view layer, not blueprint layer

---

### Alternative 4: Plugin system with dynamic loading

Discover blueprints by scanning `engine/content/blueprints/` directory, loading all `.ts` files, auto-registering.

**Pros:**
- Automatic registration (no manual registry population)
- Easy to add new blueprint (just drop file)

**Cons:**
- Implicit dependencies (hard to know what blueprints exist without running code)
- Difficult for tree-shaking/bundling (all blueprints bundled even if unused)
- No version explicit in code (would need metadata export)
- **Rejected** — explicit registration is clearer; we can build auto-registration as convenience layer later if needed

---

## Consequences

### Positive

- **Extensible**: Register new blueprint without modifying engine (Open/Closed)
- **Versioned**: Blueprint ID includes version; multiple versions can coexist (migration strategy)
- **Testable**: Blueprint is pure function; can unit test with mock context
- **Explicit**: Registry lists all available blueprints (discoverable)
- **Validatable**: `validate(manifest)` lets blueprint reject unsuitable manifests upfront
- **Optional features**: `canGenerate?(ctx)` enables dynamic capability (e.g., only if evidence present)

### Negative (Trade-offs)

- **Registry management**: Must ensure all blueprints are registered at startup (initialization order matters)
- **Selection ambiguity**: Multiple blueprints for same contentType → need priority system (future)
- **No auto-discovery**: Developer must remember to register new blueprint (could be automated with decorator pattern)
- **Blueprint version proliferation**: Need policy for retiring old versions (avoid "v1, v2, v3 forever")

---

## Deferred Work

- **Blueprint priority**: When multiple blueprints support contentType, choose by priority (semver ordering)
- **Blueprint composition**: Allow blueprints to wrap/decorate other blueprints (middleware pattern)
- **Blueprint metrics**: Track generation time, error rates per blueprint (observability)
- **Dynamic loading**: Load blueprints from external packages (plugin architecture)
- **Blueprint templates**: Shared UI components library for blueprints to import (design system)

---

## Implementation Checklist

- [ ] Interface defined (already in `Blueprint.ts`)
- [x] ADR 0005 written
- [ ] BlueprintRegistry implementation (in-memory Map)
- [ ] BlueprintSelector with fallback logic
- [ ] Built-in blueprints: ProductDetailV1, CategoryOverviewV1, ComparisonV1
- [ ] Validation: blueprint must declare support for manifest.contentType
- [ ] Unit tests: registry, selection, validation
- [ ] Integration: blueprint selection in generation pipeline
- [ ] Documentation: how to create a new blueprint
- [ ] ADR approved and contract frozen at v1.0.0

---

## Related ADRs

- **0002** — Content Manifest (blueprintId field)
- **0004** — GenerationContext (input to generate)
- **0006** — Validation Pipeline (blueprint output validated)

---

## Success Criteria

- Adding new page type requires only: (1) new blueprint class, (2) manifest entries with new contentType, (3) registry registration
- Blueprint selection does not throw for any registered contentType
- Two blueprints can coexist with different IDs (e.g., "product-detail-v1" and "product-detail-v2") and manifests can choose either
- Blueprint `validate()` rejects manifests with missing required fields (pre-flight check)

---

*This ADR must be approved before Blueprint Engine implementation is considered complete. The contract will be frozen at v1.0.0 upon sign-off.*
