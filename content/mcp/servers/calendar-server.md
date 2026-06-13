---
title: "Calendar Server"
description: "Calendar and scheduling integration"
mcp: "calendar-server"
category: "productivity"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# Calendar Server

## Overview

Calendar and scheduling integration. This MCP server provides integration capabilities for AI agents needing productivity functionality.

## Key Features

- **Integration Type**: productivity
- **Use Case**: Calendar Server enables AI agents to perform productivity tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-calendar-server
```

## Configuration

```json
{
  "mcpServers": {
    "calendar-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-calendar-server"]
    }
  }
}
```

## Usage

The Calendar Server MCP server provides tools for productivity tasks. Common operations include:

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
