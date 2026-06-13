---
title: "MCP with Claude Desktop - Complete Integration Guide"
author: "Desktop Integration Team"
fact_checker: "Michael Chen"
last_updated: "2026-06-12"
estimated_time_minutes: 120
difficulty: "Beginner"
--- [MCP server registry](/mcp/registry)

# MCP with Claude Desktop - Complete Integration Guide

## Introduction to Claude Desktop MCP Integration

Claude Desktop represents the flagship integration platform for Model Context Protocol, offering seamless connectivity between Anthropic's AI assistant and external tools. This guide covers everything you need to know to integrate MCP servers with Claude Desktop, from initial setup through advanced configuration and troubleshooting.

The MCP integration transforms Claude Desktop from a conversation-only interface into a powerful automation platform. With MCP servers, Claude can read your files, query databases, interact with APIs, and automate complex workflows—all through natural language requests. This capability extends far beyond simple Q&A to genuine task automation.

## Installing Claude Desktop

### System Requirements

Before installing Claude Desktop, verify your system meets the requirements:

- **macOS**: 12.0 or later (Intel or Apple Silicon)
- **Windows**: Windows 10 version 1809 or later
- **Linux**: Supported on major distributions with GUI support
- **Memory**: Minimum 8GB RAM recommended
- **Storage**: 500MB available space plus space for MCP servers

### Download and Installation

Download Claude Desktop from the official Anthropic website:

1. Visit claude.ai/desktop
2. Download the appropriate installer for your operating system
3. Run the installer with administrator privileges if prompted
4. Launch Claude Desktop and complete the initial setup

### Initial Configuration

During first launch, Claude Desktop creates configuration directories and asks for basic preferences. The MCP configuration file is located at:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

This JSON file controls all MCP server integrations. Any changes require restarting Claude Desktop to take effect.

## MCP Configuration in Claude Desktop

### Understanding the Configuration Structure

The Claude Desktop MCP configuration follows a JSON schema that defines server connections:

```json
{
  "$schema": "https://json.schemastore.org/claude-desktop-config",
  "mcpServers": {
    "server-name": {
      "command": "executable",
      "args": ["arg1", "arg2"],
      "env": {
        "ENV_VAR": "value"
      },
      "disabled": false
    }
  }
}
```

Each server entry requires a unique name under `mcpServers`. The `command` field specifies the executable to run (typically `npx` for npm packages or `python` for Python servers). Arguments and environment variables customize server behavior.

### Adding Your First MCP Server

Let's add the official filesystem server as our first integration:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-filesystem",
        "~/Documents",
        "~/Projects"
      ],
      "env": {
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

This configuration grants Claude access to your Documents and Projects folders. The tilde expansion works on macOS and Linux; use full paths on Windows. Save this configuration and restart Claude Desktop.

### Verifying Server Connection

After configuration, verify the server loaded correctly:

1. Check Claude Desktop's menu bar - you should see an MCP indicator
2. Ask Claude: "What tools do you have available?"
3. Claude should list the filesystem tools like `read_file` and `write_file`

If tools don't appear, check the server logs in Claude Desktop's developer console or verify your configuration syntax.

## Working with MCP Tools in Claude Desktop

### Basic File Operations

With the filesystem server configured, you can ask Claude to perform file operations:

**Reading files**:
"Claude, please read the package.json file in my current project"

Claude translates this to an MCP tool call, the filesystem server validates the path and returns contents.

**Writing files**:
"Create a new TypeScript file that exports a greeting function"

Claude generates appropriate content and uses the write_file tool to create the file.

**Directory listing**:
"Show me all JavaScript files in my src directory"

The list_directory tool returns structured file information that Claude can analyze.

### Database Queries

Add a PostgreSQL server for database access:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    }
  }
}
```

Then ask Claude database questions:
"Show me the top 5 customers by order count from my database"

Claude constructs appropriate SQL queries through the MCP interface, executes them safely, and formats results in conversation.

### API Integration

Add GitHub integration:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your-token-here"
      }
    }
  }
}
```

Ask Claude to automate GitHub tasks:
"Create a pull request with my recent changes and assign @team-lead as reviewer"

Claude uses GitHub's API to create branches, commit files, and open PRs—all through natural language.

## Advanced Configuration Patterns

### Environment Variable Management

Never hardcode sensitive credentials in your configuration. Instead, use environment variable references:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    }
  }
}
```

Claude Desktop substitutes these variables from your system environment or a `.env` file in the configuration directory.

### Multiple Server Instances

Run multiple instances of the same server with different configurations:

```json
{
  "mcpServers": {
    "filesystem-work": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "~/Work"],
    },
    "filesystem-personal": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "~/Personal"],
    },
    "postgres-analytics": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${ANALYTICS_DB_URL}",
        "READONLY": "true"
      }
    },
    "postgres-writable": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${WRITABLE_DB_URL}"
      }
    }
  }
}
```

Each server instance operates independently, allowing you to separate concerns and apply different security policies.

### Custom Tool Configuration

Some MCP servers support custom tool registration. For development servers:

```json
{
  "mcpServers": {
    "filesystem-dev": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-filesystem",
        "~/Projects/MyApp/src"
      ],
      "env": {
        "ENABLE_UNDO": "true",
        "BACKUP_BEFORE_WRITE": "true"
      }
    }
  }
}
```

These environment variables customize server behavior for specific use cases.

## Security Best Practices

### Directory Access Control

Always explicitly specify which directories your servers can access:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-filesystem",
        "~/Projects/current-project",
        "~/Documents/project-docs"
      ]
    }
  }
}
```

Never use wildcard paths or root directories. Each MCP server operates with the file system permissions of the Claude Desktop process.

### Credential Management

Use secure credential storage rather than configuration files:

```bash
# macOS Keychain approach
security add-generic-password -a $USER -s GITHUB_TOKEN -w

# Linux secret service
secret-tool store --label="GitHub MCP" GITHUB_TOKEN
```

Then reference these in your environment:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

### Network Security

For network-enabled servers, consider proxy and firewall settings:

```json
{
  "mcpServers": {
    "api-server": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-api"],
      "env": {
        "HTTP_PROXY": "http://corporate-proxy:8080",
        "ALLOWED_DOMAINS": "api.company.com,internal.company.com"
      }
    }
  }
}
```

This ensures all traffic goes through corporate inspection points.

### Audit Logging

Enable audit logging for compliance requirements:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "~/Projects"],
      "env": {
        "AUDIT_LOG": "true",
        "AUDIT_LOG_FILE": "~/Logs/mcp-audit.log"
      }
    }
  }
}
```

Logs capture all file operations without including file contents, supporting security audits.

## Troubleshooting Common Issues

### Server Won't Connect

When servers fail to connect, check these common issues:

1. **Configuration syntax**: Validate JSON syntax with a linter
2. **Missing dependencies**: Ensure Node.js or Python is installed
3. **Network connectivity**: Verify firewalls allow server connections
4. **Credential validity**: Test API tokens outside Claude Desktop

Debug by checking logs in Claude Desktop's developer console or running the server manually:

```bash
npx @modelcontextprotocol/server-filesystem ~/Documents
```

### Permission Errors

Permission errors indicate configuration issues:

- **File access denied**: Check directory paths and file permissions
- **API rate limited**: Verify API quotas and implement backoff
- **Database connection failed**: Test connection strings independently

### Performance Problems

Slow MCP operations usually stem from:

- Large file operations without proper pagination
- Database queries without proper indexing
- Network latency to remote servers
- Resource constraints in the host system

### Unexpected Behavior

When MCP tools behave unexpectedly:

1. Check the specific server's documentation
2. Verify you're using the latest server version
3. Test with simpler operations first
4. Review server logs for error details

## Production Deployment Patterns

### Team Configuration Templates

Create configuration templates for team deployment:

```json
{
  "mcpServers": {
    "filesystem-project": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "${PROJECT_DIR}"],
      "env": {
        "READONLY": "${READONLY_MODE:-false}"
      }
    }
  }
}
```

Teams can customize through environment variables without modifying configuration.

### Certificate Management

For enterprise environments with custom certificates:

```json
{
  "mcpServers": {
    "database": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}",
        "SSL_CERT_PATH": "/etc/ssl/company-ca.crt"
      }
    }
  }
}
```

This ensures secure connections to internal services.

### Monitoring Integration

Production deployments need observability:

```json
{
  "mcpServers": {
    "analytics": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres"],
      "env": {
        "METRICS_PORT": "9090",
        "LOG_LEVEL": "debug"
      }
    }
  }
}
```

Metrics endpoints integrate with Prometheus or other monitoring systems.

## Advanced Use Cases

### Automated Code Review

Combine multiple servers for powerful workflows:

```json
{
  "mcpServers": {
    "github": { /* GitHub config */ },
    "filesystem": { /* Project files config */ },
    "slack": { /* Notification config */ }
  }
}
```

Ask Claude to automate code review:
"Review my latest PR, check for security issues, and post a summary to #engineering"

### Data Pipeline Automation

Build ETL pipelines through MCP:

"Connect to my database, extract sales data, generate a report, and save it to my documents"

Claude orchestrates filesystem, database, and reporting tools seamlessly.

### Research Assistance

Automate research workflows:

"Search my local papers for mentions of machine learning, summarize findings, and create a bibliography"

Multiple servers work together to process and synthesize information.

## Conclusion

MCP integration with Claude Desktop transforms the assistant into a genuine productivity tool. By enabling safe file access, database queries, and API interactions, Claude can accomplish real work rather than just provide information. The security-first design ensures this power doesn't compromise system safety.

Start with simple file operations, gradually add more servers as you become comfortable with the security model. Join the MCP community to discover new servers and share your own integrations. The ecosystem grows through contributions from developers like you who extend what's possible with AI assistance.

As you advance, consider building custom servers for unique tools in your workflow. The MCP server development patterns are straightforward, and your work directly benefits other Claude Desktop users facing similar challenges.