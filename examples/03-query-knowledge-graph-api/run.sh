#!/usr/bin/env bash
# examples/03-query-knowledge-graph-api/run.sh
# Boots a server on PORT, waits for /health, then curls the four /api/graph/* endpoints.
# Real, runnable — tears the server down on exit. See README.md for expected output.
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
if [ ! -f dist/server.cjs ]; then
  echo "→ Building (dist/server.cjs not found)…"
  npm run build
fi
NODE_ENV=production PORT="$PORT" node dist/server.cjs &
SERVER_PID=$!

echo "→ Waiting for /health…"
for i in $(seq 1 30); do
  if curl -sf "$HOST/health" >/dev/null 2>&1; then
    echo "✓ server is up"
    break
  fi
  sleep 1
done
if ! curl -sf "$HOST/health" >/dev/null 2>&1; then
  echo "✗ server did not come up on $HOST" >&2
  exit 1
fi

echo
echo "=== 1. GET /api/graph/stats ==="
curl -s "$HOST/api/graph/stats" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);console.log(JSON.stringify(j,null,2).split("\n").slice(0,8).join("\n"));}catch(e){console.log(s)}})'

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
