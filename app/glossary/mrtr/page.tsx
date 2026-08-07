import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Multi Round-Trip Requests (MRTR) | MCPserver.in',
  description: 'Definition of the MRTR pattern in the Model Context Protocol.',
};

export default function MrtrGlossaryPage() {
  return (
    <article>
      {/* DEFINITION gate */}
      <h1>Multi Round-Trip Requests (MRTR)</h1>
      <p className="lead">
        <strong>Multi Round-Trip Requests (MRTR)</strong> is the pattern introduced in MCP
        protocol version 2026-07-28 (SEP-2322) that replaces server-initiated JSON-RPC requests.
        When a server needs additional input from the client, it returns an
        <code>InputRequiredResult</code> containing <code>inputRequests</code>. The client
        retries the original request with <code>inputResponses</code>.
      </p>

      {/* MCP_RELATIONSHIP gate */}
      <h2>MCP Relevance</h2>
      <p>
        MRTR is the mechanism that enables server-to-client interactions — such as elicitation
        (requesting user input) and sampling (requesting LLM completions) — without requiring
        protocol-level sessions or server-initiated JSON-RPC requests. It is a core architectural
        change in the 2026-07-28 spec that makes MCP stateless.
      </p>

      {/* PRACTICAL_CONTEXT gate */}
      <h2>Example</h2>
      <p>
        A server receives <code>tools/call</code> for a &quot;delete_file&quot; tool. It needs
        user confirmation before proceeding. Instead of sending its own JSON-RPC request, the server
        returns:
      </p>
      <pre className="code-block">
{`{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "resultType": "input_required",
    "inputRequests": {
      "confirm_delete": {
        "method": "elicitation/create",
        "params": {
          "mode": "form",
          "message": "Delete this file?",
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
}`}
      </pre>
      <p>The client gathers user input and retries:</p>
      <pre className="code-block">
{`{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "delete_file",
    "arguments": { "path": "/tmp/data.txt" },
    "inputResponses": {
      "confirm_delete": { "action": "accept", "content": { "confirmed": true } }
    },
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": { "name": "example-client", "version": "1.0.0" }
    }
  }
}`}
      </pre>

      {/* LIMITATION_BOUNDARY gate */}
      <h2>What MRTR Is Not</h2>
      <ul>
        <li>Not server-initiated JSON-RPC requests — servers MUST NOT send their own requests on SSE streams</li>
        <li>Not a session mechanism — MRTR does not require protocol-level sessions</li>
        <li>Not specific to elicitation — MRTR also applies to sampling and roots (both deprecated)</li>
        <li>Not a polling pattern — the client retries the original request with additional input, not a new request</li>
      </ul>

      {/* EVIDENCE gate */}
      <h2>Primary Source</h2>
      <p>
        <a href="https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr">
          Multi Round-Trip Requests — MCP Specification 2026-07-28
        </a>
      </p>

      {/* GRAPH_LINKAGE gate */}
      <h2>Related Terms</h2>
      <ul>
        <li><a href="/glossary/streamable-http/">Streamable HTTP</a> — transport that carries MRTR responses</li>
        <li><a href="/glossary/mcp-server/">MCP Server</a> — returns InputRequiredResult when elicitation is needed</li>
        <li><a href="/glossary/tool/">Tool</a> — tools/call can return InputRequiredResult</li>
        <li><a href="/how-to-build-mcp-server/">How to Build an MCP Server</a> — MRTR implementation guide</li>
      </ul>
    </article>
  );
}
