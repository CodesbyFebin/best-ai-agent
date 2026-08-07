import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'server/discover | MCPserver.in',
  description: 'Definition of the server/discover RPC method in the Model Context Protocol.',
};

export default function ServerDiscoverGlossaryPage() {
  return (
    <article>
      {/* DEFINITION gate */}
      <h1>server/discover</h1>
      <p className="lead">
        <strong>server/discover</strong> is a mandatory RPC method introduced in MCP protocol
        version 2026-07-28 (SEP-2575). It allows clients to query a server&apos;s supported
        protocol versions, capabilities, and identity before issuing other requests.
      </p>

      {/* MCP_RELATIONSHIP gate */}
      <h2>MCP Relevance</h2>
      <p>
        <code>server/discover</code> replaces the pre-2026-07-28 <code>initialize</code> handshake
        as the mechanism for protocol version negotiation and capability discovery. Because MCP is
        now stateless, every request carries its protocol version in <code>_meta</code>, but
        <code>server/discover</code> provides an optimized up-front discovery flow. Clients MAY
        call it before any other request, or use it as a backward-compatibility probe.
      </p>

      {/* PRACTICAL_CONTEXT gate */}
      <h2>Example</h2>
      <p>
        A client sends <code>server/discover</code> on startup to learn what the server supports:
      </p>
      <pre className="code-block">
{`Client request:
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "server/discover",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": {
        "name": "example-client",
        "version": "1.0.0"
      },
      "io.modelcontextprotocol/clientCapabilities": {}
    }
  }
}

Server response:
{
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

      {/* LIMITATION_BOUNDARY gate */}
      <h2>What server/discover Is Not</h2>
      <ul>
        <li>Not the <code>initialize</code> handshake — the handshake is removed in 2026-07-28</li>
        <li>Not a session-establishment mechanism — MCP is stateless</li>
        <li>Not required before every request — clients MAY call it once at startup or skip it entirely</li>
        <li>Not a capability negotiation — it is a discovery mechanism; unsupported operations return errors</li>
      </ul>

      {/* EVIDENCE gate */}
      <h2>Primary Source</h2>
      <p>
        <a href="https://modelcontextprotocol.io/specification/2026-07-28/learn/architecture">
          Architecture Overview — MCP Specification 2026-07-28
        </a>
      </p>

      {/* GRAPH_LINKAGE gate */}
      <h2>Related Terms</h2>
      <ul>
        <li><a href="/glossary/mcp-server/">MCP Server</a> — must implement server/discover</li>
        <li><a href="/glossary/streamable-http/">Streamable HTTP</a> — transport that carries server/discover requests</li>
        <li><a href="/glossary/mrtr/">MRTR</a> — replaces the old initialize/initialized pattern</li>
        <li><a href="/how-to-build-mcp-server/">How to Build an MCP Server</a> — server/discover implementation</li>
      </ul>
    </article>
  );
}
