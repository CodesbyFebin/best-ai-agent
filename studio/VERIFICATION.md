# Hardened Slice Verification

Date: 2026-08-29

## Scope

- Bearer authentication for all state-changing routes.
- Admin/editor/reviewer role separation.
- Evidence created as pending regardless of caller input.
- Reviewer-only evidence transitions with required reason, passage, and retrieval time.
- Named page approval tied to the exact body SHA-256.
- Publish gate requires current human approval.
- Append-only application audit events.
- Pinned runtime/dev dependencies and container hardening.

## Commands and results

```text
python -m compileall -q app scripts tests    PASS (exit 0)
.venv/bin/pip install -r requirements-dev.txt PASS (exit 0)
.venv/bin/pytest -q                           PASS: 8 passed
.venv/bin/pip check                           PASS
```

## Boundaries

This is a local hardening slice, not a production release. Migrations,
PostgreSQL, durable workers, rate limiting, external identity integration,
source capture, claim extraction, public page rendering, and the full Content
Studio/chat UI remain pending. No GitHub push or deployment was performed.
