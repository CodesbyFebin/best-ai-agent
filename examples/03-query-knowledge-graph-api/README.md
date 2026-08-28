# Example 03 — Query the knowledge-graph API

Consume the three read-only `/api/graph/*` endpoints against a running server: `stats`, `related`, `similar`, and `path`. These endpoints traverse `graph-data.json` (86 nodes, 1334 edges on `a54d4fa`) where node IDs follow the `<type>/<slug>` format (e.g. `agent/chatgpt`).

## What this demonstrates

- The four public graph endpoints and their parameter formats.
- The `<type>/<slug>` node-ID convention.
- How `related` prioritizes edge types (`SIMILAR_TO`, `BELONGS_TO`, `TOP_AGENT`, `COMPARED_WITH`, `WRITTEN_BY`, `CITED_BY`).
- A real, executable script (`run.sh`) that boots the server and curls each endpoint.

## Prerequisites

- `npm ci` (from repo root).
- `curl` and `npx` on PATH.
- A free port 3000 (the script uses 3000; change `PORT` in `run.sh` if needed).

## Configuration

`run.sh` reads `PORT` (default 3000) and `HOST` (default `http://localhost:3000`). The `:fromType/:fromId` and `:toType/:toId` path params use the node-ID halves — `agent`(type) + `cursor-ai`(slug) → `agent/cursor-ai` internally.

## Run command

```bash
cd examples/03-query-knowledge-graph-api
./run.sh
```

## Script

```bash
#!/usr/bin/env bash
# examples/03-query-knowledge-graph-api/run.sh
# Boots a production server on PORT, then curls the four /api/graph/* endpoints.
set -euo pipefail

PORT="${PORT:-3000}"
HOST="${HOST:-http://localhost:$PORT}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
SERVER_PID=""

cleanup() {
  if [ -n "$SERVER_PID" ] && kill -0 "$SERVER_PID" 2>/dev/null; then
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

echo "→ Booting server on port $PORT (NODE_ENV=production, dist/server.cjs)…"
cd "$REPO_ROOT"
# Build once so dist/server.cjs exists; skip if already built.
if [ ! -f dist/server.cjs ]; then
  npm run build
fi
NODE_ENV=production PORT="$PORT" node dist/server.cjs &
SERVER_PID=$!

# Wait for /health to respond
echo "→ Waiting for /health…"
for i in $(seq 1 30); do
  if curl -sf "$HOST/health" >/dev/null 2>&1; then
    echo "✓ server is up"
    break
  fi
  sleep 1
done
if ! curl -sf "$HOST/health" >/dev/null 2>&1; then
  echo "✗ server did not come up" >&2
  exit 1
fi

echo
echo "=== 1. GET /api/graph/stats ==="
curl -s "$HOST/api/graph/stats" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const j=JSON.parse(s);console.log("nodes:",j.nodeCount||j.nodes,"edges:",j.edgeCount||j.edges);})'

echo
echo "=== 2. GET /api/graph/related/agent/cursor-ai ==="
curl -s "$HOST/api/graph/related/agent/cursor-ai?limit=3"

echo
echo
echo "=== 3. GET /api/graph/similar/agent/chatgpt ==="
curl -s "$HOST/api/graph/similar/agent/chatgpt?limit=3"

echo
echo
echo "=== 4. GET /api/graph/path/agent/cursor-ai/agent/claude ==="
curl -s "$HOST/api/graph/path/agent/cursor-ai/agent/claude"

echo
echo "✓ done"
```

## Expected output

1. **`/api/graph/stats`** returns JSON with `nodeCount`/`edgeCount` (86 nodes, 1334 edges on `a54d4fa`).
2. **`/api/graph/related/agent/cursor-ai`** returns an array of related nodes, each with `node`, `edge`, and `direction` (`outgoing`/`incoming`), sorted by edge-type priority.
3. **`/api/graph/similar/agent/chatgpt`** returns agents sharing categories with ChatGPT.
4. **`/api/graph/path/agent/cursor-ai/agent/claude`** returns the shortest BFS path as an array of node IDs — or an empty path if no path exists.

If a query returns `503 { error: "Graph data not loaded" }`, the server's `graphData` did not load (check that `graph-data.json` is present at repo root and the build succeeded).

## What NOT to do

- Do **not** hit `/api/admin/*` from this example — those require a bearer token (see SECURITY.md).
- Do **not** POST to `/api/submit-*` or `/api/subscribe` from this example — it is a read-only graph query demo.
- Do **not** assume slugs: node IDs are `<type>/<slug>`, and `slug` is the entity's registry slug (e.g. `cursor-ai`, not `Cursor AI`).
