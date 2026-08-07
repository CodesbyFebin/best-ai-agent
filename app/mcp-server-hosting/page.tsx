import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MCP Server Hosting | MCPserver.in',
  description: 'Guidance on hosting and deploying MCP servers, with clear separation between protocol requirements and operational recommendations.',
};

export default function McpServerHostingPage() {
  return (
    <article>
      <h1>MCP Server Hosting</h1>

      <p className="lead">
        This page covers how to deploy MCP servers in production environments.
        It draws a strict boundary between <strong>MCP protocol requirements</strong>,
        <strong>operational best practices</strong>, and <strong>deployment context</strong>.
      </p>

      <h2>MCP Protocol Requirements</h2>
      <p>These are requirements from the MCP 2026-07-28 specification. Every MCP server implementation must satisfy these regardless of deployment environment.</p>

      <ul>
        <li>
          {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
          <p>Streamable HTTP transport: expose a single POST endpoint (the MCP endpoint) that accepts JSON-RPC requests.</p>
        </li>
        <li>
          {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
          <p>Every POST request MUST include <code>MCP-Protocol-Version</code>, <code>Mcp-Method</code>, and <code>Mcp-Name</code> headers.</p>
        </li>
        <li>
          {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
          <p>Servers MUST validate the <code>Origin</code> header on all incoming connections to prevent DNS rebinding attacks.</p>
        </li>
        <li>
          {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
          <p>When running locally, servers SHOULD bind only to localhost (127.0.0.1).</p>
        </li>
        <li>
          {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
          <p>MCP servers MUST implement OAuth 2.0 Protected Resource Metadata (RFC 9728) for authorization server discovery.</p>
        </li>
        <li>
          {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
          <p>Servers MUST accept bearer tokens in the <code>Authorization</code> header for authenticated requests.</p>
        </li>
        <li>
          {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: MEDIUM */}
          <p>Access tokens MUST be validated for audience — servers MUST accept only tokens issued for their own resources per RFC 8707.</p>
        </li>
      </ul>

      <h2>Operational Best Practices (Recommendations)</h2>
      <p>The following are recommendations, not protocol requirements. They represent common patterns for reliable production deployments.</p>

      <ul>
        <li>
          {/* claim_scope: OPERATIONS, source_type: SECONDARY, materiality: MEDIUM */}
          <p>Deploy behind a TLS-terminating reverse proxy.</p>
        </li>
        <li>
          {/* claim_scope: OPERATIONS, source_type: SECONDARY, materiality: MEDIUM */}
          <p>Include <code>X-Accel-Buffering: no</code> in SSE response streams to prevent reverse-proxy buffering.</p>
        </li>
        <li>
          {/* claim_scope: OPERATIONS, source_type: SECONDARY, materiality: LOW */}
          <p>Emit periodic SSE comment lines (colon-prefixed) as keep-alive on long-lived <code>subscriptions/listen</code> streams.</p>
        </li>
        <li>
          {/* claim_scope: OPERATIONS, source_type: SECONDARY, materiality: MEDIUM */}
          <p>Implement health check endpoints for orchestration platforms.</p>
        </li>
        <li>
          {/* claim_scope: OPERATIONS, source_type: SECONDARY, materiality: MEDIUM */}
          <p>Use process managers or container orchestration to maintain server availability.</p>
        </li>
        <li>
          {/* claim_scope: OPERATIONS, source_type: SECONDARY, materiality: LOW */}
          <p>Log to stderr for stdio transports; use OpenTelemetry for observability in remote deployments.</p>
        </li>
      </ul>

      <h2>Transport Deployment Notes</h2>

      <h3>stdio (Local)</h3>
      {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
      <p>
        stdio transport uses standard input/output streams for direct process communication.
        No network exposure. Credentials are retrieved from the environment — not from network auth.
      </p>

      <h3>Streamable HTTP (Remote)</h3>
      {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
      <p>
        Streamable HTTP exposes a single POST endpoint. The server operates as an independent
        process that can handle multiple client connections. OAuth 2.1 is the recommended
        authentication mechanism for remote transports.
      </p>

      <h2>What Is Not an MCP Requirement</h2>
      <p>The following are deployment-specific choices, not MCP protocol requirements:</p>

      <ul>
        <li>Specific cloud providers or hosting platforms</li>
        <li>Container orchestration systems</li>
        <li>Autoscaling policies</li>
        <li>Specific compute regions or data residency</li>
        <li>Latency targets or availability SLAs</li>
        <li>Load balancing strategies</li>
      </ul>

      <p>
        Any statement about specific infrastructure choices should be evaluated against
        your own operational requirements and is outside the scope of the MCP specification.
      </p>

      <h2>Common Deployment Mistakes</h2>
      <ul>
        <li>Exposing stdio servers to network interfaces — stdio is for local process communication only.</li>
        <li>Skipping <code>Origin</code> header validation on Streamable HTTP — enables DNS rebinding attacks.</li>
        <li>Using deprecated HTTP+SSE transport — migrate to Streamable HTTP.</li>
        <li>Relying on <code>Mcp-Session-Id</code> for session state — sessions were removed in 2026-07-28.</li>
        <li>Sending server-initiated requests on SSE streams — use MRTR <code>InputRequiredResult</code> instead.</li>
      </ul>
    </article>
  );
}
