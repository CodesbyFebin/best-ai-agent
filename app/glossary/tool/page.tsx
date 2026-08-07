import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tool | MCPserver.in',
  description: 'Definition of an MCP tool and its role in the Model Context Protocol.',
};

export default function ToolGlossaryPage() {
  return (
    <article>
      {/* DEFINITION gate */}
      <h1>Tool</h1>
      <p className="lead">
        A <strong>tool</strong> is an executable function that an AI application can invoke to
        perform actions, defined as part of an MCP server&apos;s capabilities. Tools use
        JSON Schema for input validation and return structured results.
      </p>

      {/* MCP_RELATIONSHIP gate */}
      <h2>MCP Relevance</h2>
      <p>
        Tools are one of the three core primitives that MCP servers expose. They enable AI models
        to perform actions — querying databases, calling external APIs, modifying files, or
        triggering workflows. Tools are model-controlled: the AI model decides when to invoke them
        based on user requests.
      </p>

      {/* PRACTICAL_CONTEXT gate */}
      <h2>Example</h2>
      <p>
        A weather MCP server might expose a <code>get_weather</code> tool that accepts a location
        parameter and returns current conditions. A database MCP server might expose a
        <code>query</code> tool that accepts a SQL-like query and returns rows. The AI model
        discovers available tools via <code>tools/list</code> and invokes them via
        <code>tools/call</code>.
      </p>

      {/* LIMITATION_BOUNDARY gate */}
      <h2>What Is Not an MCP Tool</h2>
      <ul>
        <li>A generic API endpoint — an MCP tool is wrapped in the MCP JSON-RPC protocol</li>
        <li>A CLI command — an MCP tool is invoked via <code>tools/call</code>, not shell execution</li>
        <li>A prompt or template — those are MCP prompts, not tools</li>
        <li>A passive data source — that is an MCP resource, not a tool</li>
      </ul>

      {/* EVIDENCE gate */}
      <h2>Primary Source</h2>
      <p>
        <a href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools">
          Tools — MCP Specification 2026-07-28
        </a>
      </p>

      {/* GRAPH_LINKAGE gate */}
      <h2>Related Terms</h2>
      <ul>
        <li><a href="/glossary/resource/">Resource</a> — passive data sources in MCP</li>
        <li><a href="/glossary/prompt/">Prompt</a> — reusable templates in MCP</li>
        <li><a href="/glossary/mcp-server/">MCP Server</a> — exposes tools, resources, and prompts</li>
        <li><a href="/glossary/mrtr/">MRTR</a> — pattern for server-to-client interactions including tool-related elicitation</li>
        <li><a href="/how-to-build-mcp-server/">How to Build an MCP Server</a> — tool implementation guide</li>
      </ul>
    </article>
  );
}
