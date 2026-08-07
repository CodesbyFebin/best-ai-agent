import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MCP Server | MCPserver.in',
  description: 'Definition of an MCP server and its role in the Model Context Protocol.',
};

export default function McpServerGlossaryPage() {
  return (
    <article>
      {/* DEFINITION gate */}
      <h1>MCP Server</h1>
      <p className="lead">
        An <strong>MCP server</strong> is a program that exposes specific capabilities to AI
        applications through standardized protocol interfaces, implementing the Model Context
        Protocol to provide tools, resources, and prompts.
      </p>

      {/* MCP_RELATIONSHIP gate */}
      <h2>MCP Relevance</h2>
      <p>
        MCP servers are one of the three core participants in the MCP architecture, alongside
        MCP clients and MCP hosts. A server provides the actual functionality — tools for actions,
        resources for data, and prompts for interaction templates. Without servers, an MCP host
        has no external capabilities to invoke.
      </p>

      {/* PRACTICAL_CONTEXT gate */}
      <h2>Example</h2>
      <p>
        A filesystem MCP server exposes tools for reading, writing, and listing files. A database
        MCP server exposes tools for querying tables. A calendar MCP server exposes tools for
        creating and reading events. Each server implements the same MCP protocol but provides
        different capabilities.
      </p>

      {/* LIMITATION_BOUNDARY gate */}
      <h2>What Is Not an MCP Server</h2>
      <ul>
        <li>An LLM API endpoint (e.g., OpenAI API) — that is model serving, not an MCP server</li>
        <li>A raw database connection — an MCP server wraps the database with MCP tools and resources</li>
        <li>A generic HTTP API — an MCP server implements the MCP JSON-RPC protocol</li>
        <li>A plugin or extension inside an AI application — that is an MCP client feature, not a server</li>
      </ul>

      {/* EVIDENCE gate */}
      <h2>Primary Source</h2>
      <p>
        <a href="https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts">
          Understanding MCP Servers — modelcontextprotocol.io
        </a>
      </p>

      {/* GRAPH_LINKAGE gate */}
      <h2>Related Terms</h2>
      <ul>
        <li><a href="/glossary/mcp-client/">MCP Client</a> — maintains connections to MCP servers</li>
        <li><a href="/glossary/tool/">Tool</a> — executable functions exposed by MCP servers</li>
        <li><a href="/glossary/resource/">Resource</a> — data sources exposed by MCP servers</li>
        <li><a href="/glossary/prompt/">Prompt</a> — templates exposed by MCP servers</li>
        <li><a href="/mcp-server/">How to Build an MCP Server</a> — implementation guide</li>
      </ul>
    </article>
  );
}
