---
title: "Currency Server"
description: "Real-time currency conversion"
mcp: "currency-server"
category: "api"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# Currency Server

## Overview

Real-time currency conversion. This MCP server provides integration capabilities for AI agents needing api functionality.

## Key Features

- **Integration Type**: api
- **Use Case**: Currency Server enables AI agents to perform api tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-currency-server
```

## Configuration

```json
{
  "mcpServers": {
    "currency-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-currency-server"]
    }
  }
}
```

## Usage

The Currency Server MCP server provides tools for api tasks. Common operations include:

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
