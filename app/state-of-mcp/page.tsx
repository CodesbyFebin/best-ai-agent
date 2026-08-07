import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'State of MCP | MCPserver.in',
  description: 'Current state of the Model Context Protocol ecosystem with temporal evidence.',
};

export default function StateOfMcpPage() {
  return (
    <article>
      <h1>State of MCP</h1>
      <p className="lead">
        A snapshot of the Model Context Protocol ecosystem as of the latest verified data.
        All time-sensitive claims carry temporal evidence metadata.
      </p>

      <h2>Protocol Version</h2>
      {/* temporal_evidence: as_of, source, source_type, retrieved_at, review_interval_days, next_review_due, freshness_status */}
      <div className="temporal-claim">
        <p>
          <strong>Current protocol version:</strong> 2026-07-28
        </p>
        <dl className="meta">
          <dt>as_of</dt><dd>2026-08-08</dd>
          <dt>source</dt><dd>https://modelcontextprotocol.io/specification/2026-07-28/</dd>
          <dt>source_type</dt><dd>PRIMARY</dd>
          <dt>retrieved_at</dt><dd>2026-08-08T02:00:00+05:30</dd>
          <dt>review_interval_days</dt><dd>30</dd>
          <dt>next_review_due</dt><dd>2026-09-07</dd>
          <dt>freshness_status</dt><dd>CURRENT</dd>
        </dl>
      </div>

      <h2>MCP Registry</h2>
      <div className="temporal-claim">
        <p>
          <strong>Official MCP Registry:</strong> Operational at <code>registry.modelcontextprotocol.io</code>
        </p>
        <dl className="meta">
          <dt>as_of</dt><dd>2026-08-08</dd>
          <dt>source</dt><dd>https://registry.modelcontextprotocol.io/</dd>
          <dt>source_type</dt><dd>PRIMARY</dd>
          <dt>retrieved_at</dt><dd>2026-08-08T02:00:00+05:30</dd>
          <dt>review_interval_days</dt><dd>30</dd>
          <dt>next_review_due</dt><dd>2026-09-07</dd>
          <dt>freshness_status</dt><dd>CURRENT</dd>
        </dl>
      </div>

      <h2>Key Specification Changes (2026-07-28)</h2>
      <ul>
        <li>Stateless core — <code>initialize</code> handshake removed</li>
        <li><code>server/discover</code> replaces initialize for version negotiation</li>
        <li>No protocol-level sessions — <code>Mcp-Session-Id</code> removed</li>
        <li>MRTR pattern replaces server-initiated requests</li>
        <li>Header-based routing (<code>Mcp-Method</code>, <code>Mcp-Name</code>)</li>
        <li>Cache hints (<code>ttlMs</code>, <code>cacheScope</code>) on list results</li>
        <li>Extensions system (SEP-2133)</li>
      </ul>

      <h2>Deprecated Features</h2>
      <ul>
        <li>Roots — earliest removal 2027-07-28</li>
        <li>Sampling — earliest removal 2027-07-28</li>
        <li>Logging — earliest removal 2027-07-28</li>
        <li>HTTP+SSE transport — removal follows SEP-2596 Final</li>
        <li>Dynamic Client Registration (RFC7591) — migrate to Client ID Metadata Documents</li>
      </ul>

      <h2>Ecosystem Notes</h2>
      <div className="temporal-claim">
        <p>
          The MCP ecosystem includes official SDKs (TypeScript, Python, Go, Java, Kotlin),
          reference server implementations, and a growing registry of third-party servers.
        </p>
        <dl className="meta">
          <dt>as_of</dt><dd>2026-08-08</dd>
          <dt>source</dt><dd>https://modelcontextprotocol.io/docs/2026-07-28/sdk</dd>
          <dt>source_type</dt><dd>PRIMARY</dd>
          <dt>retrieved_at</dt><dd>2026-08-08T02:00:00+05:30</dd>
          <dt>review_interval_days</dt><dd>30</dd>
          <dt>next_review_due</dt><dd>2026-09-07</dd>
          <dt>freshness_status</dt><dd>CURRENT</dd>
        </dl>
      </div>

      <h2>Review Schedule</h2>
      <p>
        This page is reviewed every 30 days. Claims past their <code>next_review_due</code> date
        are flagged as <code>STALE_REVIEW_REQUIRED</code>. Claims past the hard expiry threshold
        are flagged as <code>EXPIRED</code> and require human verification before republication.
      </p>
    </article>
  );
}
