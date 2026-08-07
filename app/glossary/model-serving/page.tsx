import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Model Serving | MCPserver.in',
  description: 'Definition of model serving and its relationship to MCP infrastructure.',
};

export default function GlossaryModelServingPage() {
  return (
    <article>
      <h1>Model Serving</h1>

      {/* claim_scope: DEFINITION, source_type: SECONDARY, materiality: HIGH */}
      <p className="lead">
        <strong>Model serving</strong> is the practice of deploying machine learning models
        as network-accessible endpoints that accept inference requests and return predictions.
        It is a distinct concept from MCP server functionality, though the two can be composed.
      </p>

      <h2>Definition</h2>
      {/* claim_scope: DEFINITION, source_type: SECONDARY, materiality: HIGH */}
      <p>
        A model serving system runs or exposes inference models — typically large language models,
        embedding models, or other ML models — via HTTP, gRPC, or other APIs. The model serving
        layer handles batching, scaling, versioning, and hardware acceleration (GPUs/TPUs).
      </p>

      <h2>How Model Serving Differs from MCP Servers</h2>

      <table>
        <thead>
          <tr>
            <th>Model Serving</th>
            <th>MCP Server</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Runs/exposes inference models</td>
            <td>Exposes contextual capabilities to MCP clients</td>
          </tr>
          <tr>
            <td>Accepts inference requests (prompt, embeddings, etc.)</td>
            <td>Accepts MCP JSON-RPC requests (tools, resources, prompts)</td>
          </tr>
          <tr>
            <td>Returns model outputs (tokens, probabilities, embeddings)</td>
            <td>Returns MCP results (tool outputs, resource contents, prompt renders)</td>
          </tr>
          <tr>
            <td>Scales by model sharding, batching, caching</td>
            <td>Scales by connection management, stateless request handling</td>
          </tr>
          <tr>
            <td>Vendor: model provider (e.g., LLM API)</td>
            <td>Publisher: tool/data provider (e.g., database, API, filesystem)</td>
          </tr>
        </tbody>
      </table>

      <h2>MCP Relevance</h2>
      {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: HIGH */}
      <p>
        MCP does not define model serving as a protocol primitive. An MCP server may call
        a model serving endpoint internally (e.g., to power a tool that uses an LLM), but
        the model serving layer is an implementation detail of that tool — not part of the
        MCP protocol itself.
      </p>

      <h2>How the Roles Compose</h2>
      {/* claim_scope: PROTOCOL, source_type: PRIMARY, materiality: MEDIUM */}
      <p>
        In a typical architecture, three roles coexist:
      </p>
      <ol>
        <li>
          <strong>Model serving</strong> — runs/exposes inference models (e.g., OpenAI API,
          Anthropic API, self-hosted vLLM)
        </li>
        <li>
          <strong>MCP server</strong> — exposes contextual capabilities to MCP clients
          (e.g., a weather tool, a database query tool)
        </li>
        <li>
          <strong>MCP client/host</strong> — may use both an LLM/model service AND MCP servers
          (e.g., Claude Desktop, Cursor, VS Code)
        </li>
      </ol>
      <p>
        These roles are related but not interchangeable. The MCP client orchestrates the
        interaction: it may call an MCP server tool, which in turn calls a model serving
        endpoint, and returns the result to the client for LLM reasoning.
      </p>

      <h2>Example: MCP Server Using Model Serving</h2>
      {/* claim_scope: ILLUSTRATIVE, source_type: INFERRED, materiality: LOW */}
      <pre className="code-block">
{`// Conceptual: an MCP server that uses an LLM internally
// This is NOT an MCP protocol primitive — it is an implementation choice

server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "summarize") {
    // MCP server internally calls a model serving endpoint
    const summary = await callModelServingEndpoint({
      model: "claude-3-5-sonnet",
      prompt: \`Summarize: \${args.text}\`
    });

    return {
      content: [{ type: "text", text: summary }]
    };
  }
});`}
      </pre>
      <p className="meta">
        <strong>Scope:</strong> ILLUSTRATIVE | <strong>Note:</strong> Conceptual example only.
        Model serving integration is an implementation choice, not an MCP protocol requirement.
      </p>

      <h2>What Model Serving Is NOT</h2>
      <ul>
        <li>Not an MCP protocol primitive</li>
        <li>Not a replacement for MCP servers</li>
        <li>Not required for MCP to function</li>
        <li>Not defined in the MCP specification</li>
      </ul>

      <h2>Primary Sources</h2>
      <ul>
        <li>
          <a href="https://modelcontextprotocol.io/specification/2026-07-28/learn/architecture">
            MCP Architecture Overview
          </a> — defines MCP servers, clients, hosts, and primitives
        </li>
        <li>
          <a href="https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts">
            Understanding MCP Servers
          </a> — server primitives (tools, resources, prompts)
        </li>
      </ul>
    </article>
  );
}
