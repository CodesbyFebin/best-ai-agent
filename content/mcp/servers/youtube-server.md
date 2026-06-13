---
title: "YouTube Server"
description: "YouTube video search and transcription"
mcp: "youtube-server"
category: "media"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# YouTube Server

## Overview

YouTube video search and transcription. This MCP server provides integration capabilities for AI agents needing media functionality.

## Key Features

- **Integration Type**: media
- **Use Case**: YouTube Server enables AI agents to perform media tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-youtube-server
```

## Configuration

```json
{
  "mcpServers": {
    "youtube-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-youtube-server"]
    }
  }
}
```

## Usage

The YouTube Server MCP server provides tools for media tasks. Common operations include:

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
