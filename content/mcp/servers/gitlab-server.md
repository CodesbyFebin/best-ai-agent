---
title: GitLab MCP Server
description: MCP server for GitLab repository access
author: GitLab MCP Team
transport: stdio
useCases: ["Code repositories", "CI/CD integration", "Project management", "CI/CD pipeline orchestration"]
tags: ["gitlab", "code", "ci-cd", "repositories", "collaboration"]
---
# GitLab MCP Server [MCP server registry](/mcp/registry)

The GitLab MCP Server enables AI agents to interact with GitLab repositories for code management, CI/CD pipeline orchestration, and version control automation.

## Overview

Provides access to GitLab's API through MCP, allowing agents to read and write repositories, manage CI/CD pipelines, and collaborate on code projects within agent workflows.

## Key Features

- **Repository Access**: Read and write files, create issues, and manage merge requests
- **CI/CD Pipeline Management**: Trigger and monitor pipeline runs
- **Code Analysis**: Integrate code quality tools and linting
- **Version Control**: Track changes and manage branches
- **Workflow Automation**: Automate code review and deployment processes

## Transport Type

**stdio** - Communicates via standard input/output streams

## Use Cases

1. **Code Quality Analysis**: Run linting and security scans during development
2. **Pipeline Automation**: Trigger CI/CD pipelines based on code changes
3. **Issue Tracking**: Create and update issues based on agent analysis
4. **Code Collaboration**: Manage pull requests and branch merges
5. **Code Generation**: Store and retrieve generated code artifacts

## Example Code Snippet

```typescript
import { MCPClient } from '@modelcontextprotocol/sdk/client';

// Connect to GitLab MCP server
const client = new MCPClient({
  command: 'npx',
  args: [
    '@modelcontextprotocol/server-gitlab',
    '--url', 'https://gitlab.example.com',
    '--token', process.env.GITLAB_ACCESS_TOKEN
  ],
  transport: 'stdio'
});

await client.connect();

// Create a new repository
const repo = await client.callTool('create_repo', {
  name: 'ai-agent-tools'
});

// Create a merge request
const mr = await client.callTool('create_merge_request', {
  source_branch: 'feature/xyz',
  target_branch: 'main',
  title: 'Implement MCP support'
});

// Run a pipeline
const pipeline = await client.callTool('run_pipeline', {
  job: 'test',
  pipeline_id: '123'
});

// List repository contents
const contents = await client.callTool('list_repo_contents', {
  path: 'src/index.ts'
});

// Get merge request status
const status = await client.callTool('get_merge_request_status', {
  mr_id: 'merge-request-id'
});
```

## Setup Instructions

```bash
npm install -g @modelcontextprotocol/server-gitlab
```

### Authentication

```bash
# Option 1: Personal access token
export GITLAB_ACCESS_TOKEN=your_token_here

# Option 2: OAuth integration
# (Requires GitLab OAuth app configuration)
```

## Security Considerations

- Never store credentials in client-side code
- Use short-lived tokens with limited scope
- Validate all repository operations
- Implement rate limiting for API calls
- Monitor GitLab audit logs

## Compatibility

- GitLab 16.0+
- Works with all MCP client implementations
- Supports both HTTP and SSH connections