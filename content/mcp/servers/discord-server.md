---
title: "Discord Server"
description: "Discord bot integration"
mcp: "discord-server"
category: "communication"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# Discord Server

## Overview

Discord bot integration. This MCP server provides integration capabilities for AI agents needing communication functionality.

## Key Features

- **Integration Type**: communication
- **Use Case**: Discord Server enables AI agents to perform communication tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-discord-server
```

## Configuration

```json
{
  "mcpServers": {
    "discord-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-discord-server"]
    }
  }
}
```

## Usage

The Discord Server MCP server provides tools for communication tasks. Common operations include:

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
