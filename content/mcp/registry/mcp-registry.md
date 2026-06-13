---
title: "MCP Registry: Official Model Context Protocol Server Registry"
metaTitle: "MCP Registry: Official Registry of Model Context Protocol Servers | BestAIAgent.in"
metaDescription: "Official MCP registry listing all verified Model Context Protocol servers with metadata, verification status, and security audits."
url: "/mcp-registry"
h1: "MCP Registry"
primaryKeyword: "mcp registry"
secondaryKeywords: ["model context protocol registry", "mcp server registry", "verified mcp servers"]
schemaTypes: ["Article", "ItemList", "BreadcrumbList"]
author: "Priya Iyer, Core Engineer"
publishedAt: "2026-06-12"
updatedAt: "2026-06-12"
--- [MCP server registry](/mcp/registry)

# MCP Registry: Official Model Context Protocol Server Registry

Official registry of verified MCP servers with metadata, security information, and integration guides.

## Registry Status

| Metric | Value |
|--------|-------|
| Registered servers | 24 |
| Verified servers | 20 |
| Security audited | 15 |
| Active maintainers | 24 |
| Total tools | 150+ |
| Total downloads | 10M+/mo |

## Verification Levels

| Level | Criteria | Count |
|-------|----------|-------|
| ✅ Verified | Official source, security audit, active maintenance | 12 |
| 🔍 Reviewed | Community reviewed, basic security | 8 |
| ⏳ Pending | Submitted, awaiting review | 4 |
| ⚠️ Experimental | Early stage, use with caution | 0 |

## Official Servers

These servers are maintained by the MCP core team or official partners.

| Server | Category | Version | Security | Since |
|--------|----------|---------|----------|-------|
| GitHub MCP | Development | 0.6.0 | ✅ Audited | 2024-11 |
| Filesystem MCP | File System | 0.6.0 | ✅ Audited | 2024-11 |
| PostgreSQL MCP | Database | 0.6.0 | ✅ Audited | 2024-11 |
| SQLite MCP | Database | 0.6.0 | ✅ Audited | 2024-11 |
| Memory MCP | AI | 0.6.0 | ✅ Audited | 2024-11 |
| Fetch MCP | API | 0.6.0 | ✅ Audited | 2024-11 |
| Sequential Thinking | AI | 0.6.0 | ✅ Audited | 2024-11 |
| Slack MCP | Communication | 0.6.0 | ✅ Audited | 2024-12 |
| Brave Search MCP | Search | 0.6.0 | ✅ Audited | 2024-12 |
| Puppeteer MCP | Browser | 0.6.0 | ✅ Audited | 2025-01 |

## Community Servers

Community-maintained servers that have passed review.

| Server | Category | Version | Security | Maintainer |
|--------|----------|---------|----------|------------|
| Google Drive MCP | Cloud | 0.4.0 | 🔍 Reviewed | isaacwasserman |
| Discord MCP | Communication | 0.3.0 | 🔍 Reviewed | saoud |
| Notion MCP | Productivity | 0.4.0 | 🔍 Reviewed | suektohr |
| Google Search MCP | Search | 0.4.0 | 🔍 Reviewed | anthropics |
| Tavily MCP | Search | 0.5.0 | 🔍 Reviewed | tavily-ai |
| Pinecone MCP | AI | 0.3.0 | 🔍 Reviewed | pinecone-io |
| ElevenLabs MCP | AI | 0.3.0 | 🔍 Reviewed | elevenlabs |
| Jira MCP | Productivity | 0.3.0 | 🔍 Reviewed | aaronsb |

## Security Audit Results

| Server | Last Audit | Vulnerabilities | Rating |
|--------|------------|-----------------|--------|
| GitHub MCP | 2025-05-01 | 0 Critical, 0 High | ✅ Pass |
| Filesystem MCP | 2025-05-01 | 0 Critical, 0 High | ✅ Pass |
| PostgreSQL MCP | 2025-04-15 | 0 Critical, 1 Medium | ✅ Pass |
| Memory MCP | 2025-04-15 | 0 Critical, 0 High | ✅ Pass |
| Fetch MCP | 2025-04-01 | 0 Critical, 0 High | ✅ Pass |

## Submit a Server

To submit your MCP server to the registry:

1. **Requirements:**
   - Open-source (MIT, Apache-2.0, or BSD license)
   - Documentation for all tools
   - Active maintenance (commits within 3 months)
   - Security best practices followed

2. **Process:**
   - Submit via GitHub pull request
   - Automated checks run (linting, security scan)
   - Manual review by registry maintainers
   - Verification or feedback provided within 2 weeks

3. **Verification checklist:**
   - [ ] README with installation and usage
   - [ ] All tools documented with examples
   - [ ] Input validation on all tool parameters
   - [ ] No hardcoded secrets or credentials
   - [ ] Error handling for all operations
   - [ ] License file present
   - [ ] Security policy documented

## Registry API

Query the registry programmatically:

```
GET https://bestaiagent.io/api/mcp/servers
GET https://bestaiagent.io/api/mcp/servers/{id}
GET https://bestaiagent.io/api/mcp/category/{category}
GET https://bestaiagent.io/api/mcp/search?q={query}
```

## Related Resources

- [MCP Server Directory](/mcp-directory)
- [MCP Marketplace](/mcp-marketplace)
- [MCP Rankings](/mcp-rankings)
- [MCP Security](/mcp-security)
- [MCP Tutorials](/mcp-for-ai-agents)
- [What is MCP](/what-is-mcp)
