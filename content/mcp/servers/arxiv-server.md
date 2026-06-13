---
title: "arXiv Server"
description: "Academic paper search and retrieval"
mcp: "arxiv-server"
category: "research"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# arXiv Server

## Overview

Academic paper search and retrieval. This MCP server provides integration capabilities for AI agents needing research functionality.

## Key Features

- **Integration Type**: research
- **Use Case**: arXiv Server enables AI agents to perform research tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-arxiv-server
```

## Configuration

```json
{
  "mcpServers": {
    "arxiv-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-arxiv-server"]
    }
  }
}
```

## Usage

The arXiv Server MCP server provides tools for research tasks. Common operations include:

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
