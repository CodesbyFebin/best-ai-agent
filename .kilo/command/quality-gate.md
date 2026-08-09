---
description: Run automated quality gate checks against the content and evidence pipeline
---

# /quality-gate — Automated Quality Gate Runner

Runs the full Safe-Deep evidence validation and quality scoring pipeline against
selected content entities, benchmarks, or the entire site.

## Usage

```
/quality-gate [entity|all]
```

## What This Does

1. **Evidence validation** — Runs `src/data/evidenceSchema.ts` `validateEvidence()`
