import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | MCPserver.in',
  description: 'Technical analysis, spec-change coverage, implementation lessons, and ecosystem developments.',
};

const posts = [
  {
    title: 'Understanding the 2026-07-28 MCP Specification Changes',
    date: '2026-08-01',
    updated: '2026-08-01',
    intent: 'KEEP_NEWS_INTENT',
    summary: 'Breakdown of stateless core, MRTR, and deprecated features in the latest spec revision.',
  },
  {
    title: 'Building Production MCP Servers with Streamable HTTP',
    date: '2026-07-15',
    updated: '2026-07-15',
    intent: 'KEEP_NEWS_INTENT',
    summary: 'Lessons learned deploying MCP servers at scale with the new Streamable HTTP transport.',
  },
  {
    title: 'MCP Registry: Community-Driven Server Discovery',
    date: '2026-07-10',
    updated: '2026-07-10',
    intent: 'KEEP_NEWS_INTENT',
    summary: 'How the official MCP Registry enables server discovery and namespace authentication.',
  },
];

export default function BlogPage() {
  return (
    <article>
      <h1>Blog</h1>
      <p className="lead">
        Technical analysis, spec-change coverage, implementation lessons, and ecosystem developments.
        This is an editorial discovery surface — not an evergreen authority.
      </p>

      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.title}>
            <a href={`/blog/${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`}>
              {post.title}
            </a>
            <br />
            <small>
              {post.date} {post.updated !== post.date && `(updated ${post.updated})`}
              {' — '}
              <em>{post.summary}</em>
            </small>
            <br />
            <span className="intent-badge">{post.intent}</span>
          </li>
        ))}
      </ul>

      <h2>Evergreen Authority Policy</h2>
      <p>
        Permanent guides, glossary pages, directories, and documentation own canonical
        informational intents. If a blog post begins ranking for an evergreen canonical intent:
      </p>
      <ul>
        <li><strong>KEEP_NEWS_INTENT</strong> — post is time-bound news; keep as-is</li>
        <li><strong>MERGE_INTO_EVERGREEN</strong> — canonical info should move to permanent guide</li>
        <li><strong>301_TO_CANONICAL</strong> — blog post duplicates a permanent guide; redirect</li>
      </ul>
      <p>No blog post should cannibalize permanent guide, glossary, or directory authority.</p>
    </article>
  );
}
