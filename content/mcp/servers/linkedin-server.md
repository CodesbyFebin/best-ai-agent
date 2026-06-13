---
title: "LinkedIn Server"
description: "LinkedIn integration"
mcp: "linkedin-server"
category: "social"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# LinkedIn Server

## Overview

LinkedIn integration. This MCP server provides integration capabilities for AI agents needing social functionality.

## Key Features

- **Integration Type**: social
- **Use Case**: LinkedIn Server enables AI agents to perform social tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-linkedin-server
```

## Configuration

```json
{
  "mcpServers": {
    "linkedin-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-linkedin-server"]
    }
  }
}
```

## Usage

The LinkedIn Server MCP server provides tools for social tasks. Common operations include:

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
