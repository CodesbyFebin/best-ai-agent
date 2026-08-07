import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Build an MCP Server | MCPserver.in',
  description: 'Step-by-step guide to building a Model Context Protocol server using the 2026-07-28 spec.',
};

export default function HowToBuildMcpServerPage() {
  return (
    <article>
      <h1>How to Build an MCP Server</h1>

      <p>
        This guide covers building an MCP server using the 2026-07-28 specification.
        All examples are aligned with the current stateless core, MRTR pattern, and
        Streamable HTTP transport.
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li>Node.js 18+ or Python 3.10+</li>
        <li>MCP SDK: <code>@modelcontextprotocol/sdk</code> (latest)</li>
        <li>Transport choice: stdio (local) or Streamable HTTP (remote)</li>
      </ul>

      <h2>Server Discovery</h2>
      <p>
        Every MCP server must implement <code>server/discover</code>. This replaces the
        pre-2026-07-28 <code>initialize</code> handshake. The server advertises its
        supported protocol versions and capabilities.
      </p>

      <h2 id="example-discovery">Example: server/discover response</h2>
      {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
      <pre className="code-block">
{`{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "resultType": "complete",
    "supportedVersions": ["2026-07-28"],
    "capabilities": {
      "tools": { "listChanged": true },
      "resources": {},
      "prompts": {}
    },
    "_meta": {
      "io.modelcontextprotocol/serverInfo": {
        "name": "example-server",
        "version": "1.0.0"
      }
    },
    "ttlMs": 3600000,
    "cacheScope": "public"
  }
}`}
      </pre>
      <p className="meta">
        <strong>Scope:</strong> PROTOCOL | <strong>Source:</strong>{' '}
        <a href="https://modelcontextprotocol.io/specification/2026-07-28/learn/architecture">
          modelcontextprotocol.io/specification/2026-07-28/learn/architecture
        </a>
      </p>

      <h2 id="example-stdio-server">Example: stdio server (TypeScript)</h2>
      {/* claim_scope: SDK, source_type: SECONDARY, materiality: HIGH */}
      <pre className="code-block">
{`import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "example-server",
    version: "1.0.0",
  },
  { capabilities: { tools: {}, resources: {} } }
);

server.setRequestHandler("tools/list", async () => ({
  tools: [
    {
      name: "echo",
      description: "Echo the input text",
      inputSchema: {
        type: "object",
        properties: {
          text: { type: "string", description: "Text to echo" }
        },
        required: ["text"]
      }
    }
  ]
}));

server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;
  if (name === "echo") {
    return {
      content: [{ type: "text", text: args.text }]
    };
  }
  throw new Error("Unknown tool");
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Server running on stdio");`}
      </pre>
      <p className="meta">
        <strong>Scope:</strong> SDK | <strong>Package:</strong> @modelcontextprotocol/sdk@2.0.0 |
        <strong>Source:</strong>{' '}
        <a href="https://github.com/modelcontextprotocol/sdk-typescript">github.com/modelcontextprotocol/sdk-typescript</a>
      </p>

      <h2 id="example-tool-call">Example: tools/call with per-request metadata</h2>
      {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
      <pre className="code-block">
{`{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "echo",
    "arguments": { "text": "hello" },
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": {
        "name": "example-client",
        "version": "1.0.0"
      },
      "io.modelcontextprotocol/clientCapabilities": {}
    }
  }
}`}
      </pre>
      <p className="meta">
        <strong>Scope:</strong> PROTOCOL | <strong>Source:</strong>{' '}
        <a href="https://modelcontextprotocol.io/specification/2026-07-28/learn/architecture">
          modelcontextprotocol.io/specification/2026-07-28/learn/architecture
        </a>
      </p>

      <h2 id="example-mrtr-elicitation">Example: MRTR elicitation pattern</h2>
      <p>
        In the 2026-07-28 spec, servers no longer send their own JSON-RPC requests.
        When the server needs additional input, it returns an <code>InputRequiredResult</code>
        containing <code>inputRequests</code>. The client retries the original request
        with <code>inputResponses</code>.
      </p>
      {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
      <pre className="code-block">
{`Server response when elicitation is needed:

{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "resultType": "input_required",
    "inputRequests": {
      "confirm_action": {
        "method": "elicitation/create",
        "params": {
          "mode": "form",
          "message": "Confirm deletion of 3 files?",
          "requestedSchema": {
            "type": "object",
            "properties": {
              "confirmed": { "type": "boolean" }
            },
            "required": ["confirmed"]
          }
        }
      }
    },
    "requestState": "opaque-server-encoded-state"
  }
}

Client retries the original request with inputResponses:

{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "delete_files",
    "arguments": { "files": ["a.txt", "b.txt", "c.txt"] },
    "inputResponses": {
      "confirm_action": { "action": "accept", "content": { "confirmed": true } }
    },
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": { "name": "example-client", "version": "1.0.0" }
    }
  }
}`}
      </pre>
      <p className="meta">
        <strong>Scope:</strong> PROTOCOL | <strong>Source:</strong>{' '}
        <a href="https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr">
          modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr
        </a>
      </p>

      <h2 id="example-streamable-http">Example: Streamable HTTP request headers</h2>
      {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
      <pre className="code-block">
{`POST /mcp HTTP/1.1
Content-Type: application/json
MCP-Protocol-Version: 2026-07-28
Mcp-Method: tools/call
Mcp-Name: echo

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "echo",
    "arguments": { "text": "hello" },
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": { "name": "example-client", "version": "1.0.0" }
    }
  }
}`}
      </pre>
      <p className="meta">
        <strong>Scope:</strong> PROTOCOL | <strong>Source:</strong>{' '}
        <a href="https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http">
          modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http
        </a>
      </p>

      <h2 id="example-result-type">Example: resultType on all responses</h2>
      {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
      <pre className="code-block">
{`Complete result:
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "resultType": "complete",
    "content": [{ "type": "text", "text": "Echo: hello" }]
  }
}

Input-required result:
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "resultType": "input_required",
    "inputRequests": { /* ... */ },
    "requestState": "opaque-server-encoded-state"
  }
}`}
      </pre>
      <p className="meta">
        <strong>Scope:</strong> PROTOCOL | <strong>Source:</strong>{' '}
        <a href="https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr">
          modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr
        </a>
      </p>

      <h2 id="deprecated-features">Deprecated Features (2026-07-28)</h2>
      {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
      <ul>
        <li><strong>Roots</strong> — Migrate to tool parameters, resource URIs, or server config. Earliest removal: 2027-07-28.</li>
        <li><strong>Sampling</strong> — Migrate to direct LLM provider API integration. Earliest removal: 2027-07-28.</li>
        <li><strong>Logging</strong> — Migrate to stderr (stdio) or OpenTelemetry. Earliest removal: 2027-07-28.</li>
        <li><strong>HTTP+SSE transport</strong> — Migrate to Streamable HTTP. Removal follows SEP-2596 Final.</li>
        <li><strong>Dynamic Client Registration (RFC7591)</strong> — Migrate to Client ID Metadata Documents.</li>
      </ul>

      <h2 id="removed-features">Removed in 2026-07-28</h2>
      {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
      <ul>
        <li><code>initialize</code> / <code>notifications/initialized</code> handshake</li>
        <li><code>Mcp-Session-Id</code> header</li>
        <li>GET SSE stream endpoint</li>
        <li><code>Last-Event-ID</code> resumability</li>
        <li>Server-initiated requests on SSE streams (replaced by MRTR)</li>
      </ul>
    </article>
  );
}
