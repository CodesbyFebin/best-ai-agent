---
title: "PDF Server"
description: "PDF processing and extraction"
mcp: "pdf-server"
category: "documents"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# PDF Server

## Overview

PDF processing and extraction. This MCP server provides integration capabilities for AI agents needing documents functionality.

## Key Features

- **Integration Type**: documents
- **Use Case**: PDF Server enables AI agents to perform documents tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-pdf-server
```

## Configuration

```json
{
  "mcpServers": {
    "pdf-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-pdf-server"]
    }
  }
}
```

## Usage

The PDF Server MCP server provides tools for documents tasks. Common operations include:

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
