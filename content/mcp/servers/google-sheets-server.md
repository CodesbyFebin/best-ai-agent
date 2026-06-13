---
title: "Google Sheets Server"
description: "Google Sheets integration"
mcp: "google-sheets-server"
category: "data"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# Google Sheets Server

## Overview

Google Sheets integration. This MCP server provides integration capabilities for AI agents needing data functionality.

## Key Features

- **Integration Type**: data
- **Use Case**: Google Sheets Server enables AI agents to perform data tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-google-sheets-server
```

## Configuration

```json
{
  "mcpServers": {
    "google-sheets-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-google-sheets-server"]
    }
  }
}
```

## Usage

The Google Sheets Server MCP server provides tools for data tasks. Common operations include:

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
