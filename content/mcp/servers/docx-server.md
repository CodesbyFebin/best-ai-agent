---
title: "DOCX Server"
description: "Word document processing"
mcp: "docx-server"
category: "documents"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# DOCX Server

## Overview

Word document processing. This MCP server provides integration capabilities for AI agents needing documents functionality.

## Key Features

- **Integration Type**: documents
- **Use Case**: DOCX Server enables AI agents to perform documents tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-docx-server
```

## Configuration

```json
{
  "mcpServers": {
    "docx-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-docx-server"]
    }
  }
}
```

## Usage

The DOCX Server MCP server provides tools for documents tasks. Common operations include:

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
