import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Streamable HTTP Transport Reference | MCPserver.in',
  description: 'Technical reference for the Streamable HTTP transport in MCP 2026-07-28.',
};

export default function GlossaryStreamableHttpPage() {
  return (
    <article>
      <h1>Streamable HTTP</h1>

      {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
      <p className="lead">
        <strong>Streamable HTTP</strong> is the current remote transport for MCP,
        introduced in protocol version 2025-03-26 as a replacement for the deprecated
        HTTP+SSE transport, and revised in 2026-07-28 to remove protocol-level sessions
        and the GET stream endpoint.
      </p>

      <h2>Current Architecture (2026-07-28)</h2>
      {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
      <p>
        The server exposes a single HTTP endpoint (the MCP endpoint) that accepts POST.
        Every JSON-RPC message from the client is a new HTTP POST request to that endpoint.
      </p>

      <h3>Request Requirements</h3>
      {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
      <p>Every POST request MUST include:</p>
      <ul>
        <li><code>Content-Type: application/json</code></li>
        <li><code>Accept: application/json, text/event-stream</code></li>
        <li><code>MCP-Protocol-Version: 2026-07-28</code></li>
        <li><code>Mcp-Method: {method}</code></li>
        <li><code>Mcp-Name: {params.name or params.uri}</code> for tools/call, resources/read, prompts/get</li>
      </ul>

      <h2 id="request-response">Request/Response Behavior</h2>
      {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
      <p>
        The server answers each JSON-RPC request with either:
      </p>
      <ul>
        <li><code>Content-Type: application/json</code> — a single JSON-RPC response object</li>
        <li><code>Content-Type: text/event-stream</code> — an SSE stream scoped to that request, carrying request-related notifications followed by the final response</li>
      </ul>

      <h2 id="header-routing">Header-Based Routing</h2>
      {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
      <p>
        The <code>Mcp-Method</code> and <code>Mcp-Name</code> headers mirror JSON-RPC body fields
        into HTTP headers so that intermediaries (load balancers, gateways, observability tooling)
        can route and inspect requests without parsing the body. Clients MUST support these headers;
        servers MUST validate them.
      </p>

      <h2 id="streaming">Streaming Nuances</h2>
      <ul>
        <li>
          {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: MEDIUM */}
          <p>Request-scoped notifications (<code>notifications/progress</code>, <code>notifications/message</code>) flow on the response stream of the request they relate to — not on a standalone GET stream.</p>
        </li>
        <li>
          {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: MEDIUM */}
          <p>Long-lived change notifications are delivered on the response stream of a <code>subscriptions/listen</code> request. Clients opt in to specific notification types.</p>
        </li>
        <li>
          {/* claim_scope: OPERATIONS, source_type: PRIMARY, materiality: LOW */}
          <p>Servers SHOULD include <code>X-Accel-Buffering: no</code> in SSE responses to prevent reverse-proxy buffering.</p>
        </li>
        <li>
          {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
          <p>Resumable SSE streams via <code>Last-Event-ID</code> are NOT supported in this revision. A broken response stream loses the in-flight request; clients MUST re-issue it as a new request with a new request ID.</p>
        </li>
      </ul>

      <h2 id="mrtr">Multi Round-Trip Requests (MRTR)</h2>
      {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
      <p>
        Server-to-client interactions (elicitation, sampling, roots) are embedded in results as
        <code>InputRequiredResult</code> objects per the MRTR pattern (SEP-2322). Servers MUST NOT
        send independent JSON-RPC requests on SSE streams.
      </p>

      <h2 id="legacy-differences">What Changed from Legacy HTTP+SSE</h2>
      <table>
        <thead>
          <tr>
            <th>Legacy HTTP+SSE (deprecated)</th>
            <th>Streamable HTTP (2026-07-28)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Two endpoints: POST + GET SSE stream</td>
            <td>Single POST endpoint</td>
          </tr>
          <tr>
            <td>Protocol-level sessions via <code>Mcp-Session-Id</code></td>
            <td>No sessions; stateless per-request <code>_meta</code></td>
          </tr>
          <tr>
            <td>Server-initiated requests on SSE streams</td>
            <td>MRTR via <code>InputRequiredResult</code></td>
          </tr>
          <tr>
            <td>Resumable streams via <code>Last-Event-ID</code></td>
            <td>Not supported; broken stream = lost request</td>
          </tr>
          <tr>
            <td><code>initialize</code> handshake required</td>
            <td><code>server/discover</code> for up-front version selection; per-request <code>_meta</code></td>
          </tr>
        </tbody>
      </table>

      <h2 id="security">Security Considerations</h2>
      <ul>
        <li>
          {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
          <p>Servers MUST validate the <code>Origin</code> header on all incoming connections to prevent DNS rebinding attacks.</p>
        </li>
        <li>
          {/* claim_scope: OPERATIONS, source_type: PRIMARY, materiality: MEDIUM */}
          <p>When running locally, servers SHOULD bind only to localhost (127.0.0.1).</p>
        </li>
        <li>
          {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
          <p>MCP servers MUST implement OAuth 2.0 Protected Resource Metadata (RFC 9728). MCP clients MUST use it for authorization server discovery.</p>
        </li>
        <li>
          {/* claim_scope: SDK, source_type: PRIMARY, materiality: MEDIUM */}
          <p>Clients MUST reject tool definitions where <code>x-mcp-header</code> values violate constraints; invalid tools are excluded from <code>tools/list</code> results.</p>
        </li>
      </ul>

      <h2 id="implementation-mistakes">Common Implementation Mistakes</h2>
      {/* claim_scope: OPERATIONS, source_type: SECONDARY, materiality: MEDIUM */}
      <ul>
        <li>Relying on <code>Mcp-Session-Id</code> for session state — sessions were removed in 2026-07-28.</li>
        <li>Sending server-initiated JSON-RPC requests on SSE streams — use MRTR <code>InputRequiredResult</code> instead.</li>
        <li>Using a GET endpoint for SSE — the GET endpoint is not part of this revision; servers SHOULD respond with 405.</li>
        <li>Omitting <code>MCP-Protocol-Version</code> header — required on every POST request.</li>
        <li>Using <code>Last-Event-ID</code> for stream resumption — not supported.</li>
      </ul>

      <h2 id="migration">Migration from HTTP+SSE</h2>
      {/* claim_scope: OPERATIONS, source_type: SECONDARY, materiality: MEDIUM */}
      <ol>
        <li>Remove the GET SSE stream endpoint. Use a single POST MCP endpoint.</li>
        <li>Remove <code>Mcp-Session-Id</code> handling. Use per-request <code>_meta</code> for protocol version and capabilities.</li>
        <li>Replace server-initiated requests with MRTR <code>InputRequiredResult</code> responses.</li>
        <li>Add <code>MCP-Protocol-Version</code>, <code>Mcp-Method</code>, and <code>Mcp-Name</code> headers to all POST requests.</li>
        <li>Implement <code>server/discover</code> for version negotiation instead of <code>initialize</code>.</li>
        <li>Add <code>X-Accel-Buffering: no</code> header to SSE response streams for proxy compatibility.</li>
      </ol>

      <h2 id="backward-compatibility">Backward Compatibility</h2>
      {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: MEDIUM */}
      <p>
        Clients that support both modern and legacy MCP versions MAY detect the era by attempting
        a modern request first. On 400 Bad Request, they SHOULD inspect the response body before
        falling back to <code>initialize</code>.
      </p>
    </article>
  );
}
