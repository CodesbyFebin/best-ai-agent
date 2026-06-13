---
title: "Linear Server"
description: "Issue tracking and project management"
mcp: "linear-server"
category: "productivity"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# Linear Server

## Overview

Issue tracking and project management. This MCP server provides integration capabilities for AI agents needing productivity functionality.

## Key Features

- **Integration Type**: productivity
- **Use Case**: Linear Server enables AI agents to perform productivity tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-linear-server
```

## Configuration

```json
{
  "mcpServers": {
    "linear-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-linear-server"]
    }
  }
}
```

## Usage

The Linear Server MCP server provides tools for productivity tasks. Common operations include:

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
