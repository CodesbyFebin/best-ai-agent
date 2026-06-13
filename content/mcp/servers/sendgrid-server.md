---
title: "SendGrid Server"
description: "Email delivery service"
mcp: "sendgrid-server"
category: "email"
developer: "Community"
status: "Active"
--- [MCP server registry](/mcp/registry)

# SendGrid Server

## Overview

Email delivery service. This MCP server provides integration capabilities for AI agents needing email functionality.

## Key Features

- **Integration Type**: email
- **Use Case**: SendGrid Server enables AI agents to perform email tasks
- **Protocol**: Model Context Protocol (MCP)

## Installation

```bash
npm install @modelcontextprotocol/server-sendgrid-server
```

## Configuration

```json
{
  "mcpServers": {
    "sendgrid-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sendgrid-server"]
    }
  }
}
```

## Usage

The SendGrid Server MCP server provides tools for email tasks. Common operations include:

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
