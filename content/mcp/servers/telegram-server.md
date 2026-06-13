---
title: "Telegram Server"
description: "Telegram bot integration"
mcp: "telegram-server"
category: "communication"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# Telegram Server

## Overview

Telegram bot integration. This MCP server provides integration capabilities for AI agents needing communication functionality.

## Key Features

- **Integration Type**: communication
- **Use Case**: Telegram Server enables AI agents to perform communication tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-telegram-server
```

## Configuration

```json
{
  "mcpServers": {
    "telegram-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-telegram-server"]
    }
  }
}
```

## Usage

The Telegram Server MCP server provides tools for communication tasks. Common operations include:

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
