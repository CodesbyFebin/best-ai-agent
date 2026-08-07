import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glossary | MCPserver.in',
  description: 'Definitions of key Model Context Protocol terms and concepts.',
};

const glossaryEntries = [
  { term: 'MCP Server', slug: 'mcp-server', description: 'Programs that expose capabilities to AI applications through MCP.' },
  { term: 'MCP Client', slug: 'mcp-client', description: 'Component that maintains a connection to an MCP server.' },
  { term: 'Tool', slug: 'tool', description: 'Executable functions that AI applications can invoke to perform actions.' },
  { term: 'Resource', slug: 'resource', description: 'Data sources that provide contextual information to AI applications.' },
  { term: 'Prompt', slug: 'prompt', description: 'Reusable templates that structure interactions with language models.' },
  { term: 'Streamable HTTP', slug: 'streamable-http', description: 'Current remote transport for MCP, introduced in 2025-03-26 and revised in 2026-07-28.' },
  { term: 'MRTR', slug: 'mrtr', description: 'Multi Round-Trip Requests pattern for server-to-client interactions.' },
  { term: 'server/discover', slug: 'server-discover', description: 'Mandatory discovery RPC method introduced in 2026-07-28.' },
  { term: 'Model Serving', slug: 'model-serving', description: 'Deploying ML models as inference endpoints — distinct from MCP server functionality.' },
];

export default function GlossaryPage() {
  return (
    <article>
      <h1>Glossary</h1>
      <p className="lead">
        Definitions of key Model Context Protocol terms and concepts.
        Each entry is a standalone page with direct answer, MCP relevance, example, limitations, evidence, and contextual links.
      </p>

      <h2>Entries</h2>
      <ul>
        {glossaryEntries.map((entry) => (
          <li key={entry.slug}>
            <a href={`/glossary/${entry.slug}/`}>{entry.term}</a> — {entry.description}
          </li>
        ))}
      </ul>
    </article>
  );
}
