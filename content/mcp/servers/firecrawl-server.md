---
title: "Firecrawl Server"
description: "Web scraping and crawling"
mcp: "firecrawl-server"
category: "browsing"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# Firecrawl Server

## Overview

Web scraping and crawling. This MCP server provides integration capabilities for AI agents needing browsing functionality.

## Key Features

- **Integration Type**: browsing
- **Use Case**: Firecrawl Server enables AI agents to perform browsing tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-firecrawl-server
```

## Configuration

```json
{
  "mcpServers": {
    "firecrawl-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-firecrawl-server"]
    }
  }
}
```

## Usage

The Firecrawl Server MCP server provides tools for browsing tasks. Common operations include:

- Data retrieval and processing
- Integration with existing workflows
- Secure API communication

## India-Specific Notes

- API endpoints available in IN
- Support for Indian languages
- GST-compliant billing available

## External Links

- [MCP Documentation](https://spec.modelcontextprotocol.io/)
- [Server Repository](https://github.com/modelcontextprotocol/servers)

---
*Last updated: 2026-06-13*
