---
title: "Build Your First MCP Server - Complete Development Guide"
author: "MCP Development Team"
fact_checker: "Sarah Johnson"
last_updated: "2026-06-12"
estimated_time_minutes: 180
difficulty: "Intermediate"
--- [MCP server registry](/mcp/registry)

# Build Your First MCP Server - Complete Development Guide

## Understanding MCP Server Architecture

Building MCP servers requires understanding the fundamental architecture that makes MCP work. At its core, an MCP server is a program that communicates with MCP clients through standard input/output streams or HTTP, following a well-defined JSON protocol. Servers register tools, resources, and prompts that clients can discover and invoke.

The server lifecycle begins when a client launches the server process with appropriate arguments and environment variables. The server initializes, registers its capabilities with the client, and waits for requests. When a client wants to use a tool, it sends a structured request with parameters. The server validates the request, executes the operation, and returns results.

Key concepts for MCP server developers:

**Tool Registration**: Servers define tools with JSON schemas for input validation. Clients discover available tools through the `list_tools` request and invoke them through `call_tool`.

**Resource Management**: Resources represent readable data. Clients use `list_resources` and `read_resource` to access data. Resources have URIs like `file:///path/to/file` or `postgres://database/table`.

**Prompt Templates**: Prompts are reusable interaction templates. Clients use `list_prompts` and `get_prompt` to retrieve formatted prompts with dynamic content.

**Security Boundaries**: Each server defines its own security model. Filesystem servers restrict directory access, database servers require connection strings, and API servers need authentication tokens.

The MCP specification defines the wire protocol and capability contracts. Understanding this specification is essential for building compliant servers, but for most use cases, using an existing framework handles protocol details automatically.

## Setting Up the Development Environment

### Required Tools and Libraries

MCP server development works with multiple languages, but JavaScript/TypeScript and Python currently have the best ecosystem support. We'll focus on TypeScript for this guide, with Python notes for alternative approaches.

**Node.js Setup**:
```bash
# Install Node.js 18 or higher
nvm install 18
nvm use 18

# Verify installation
node --version
npm --version

# Install MCP server SDK
npm install -g @modelcontextprotocol/create-server
```

**Python Setup** (alternative):
```bash
# Install Python 3.10+
python --version

# Install MCP framework
pip install mcp-framework
```

### Project Structure

A typical MCP server project follows this structure:

```
my-mcp-server/
├── src/
│   ├── index.ts          # Main server entry point
│   ├── tools/            # Tool implementations
│   │   ├── readFile.ts
│   │   ├── writeFile.ts
│   │   └── listDirectory.ts
│   ├── resources/        # Resource providers
│   │   └── fileResource.ts
│   └── lib/              # Shared utilities
├── test/
│   ├── tools.test.ts
│   └── integration.test.ts
├── package.json
├── tsconfig.json
├── README.md
└── LICENSE
```

Initialize your project:
```bash
mkdir my-mcp-server
cd my-mcp-server
npm init -y
npm install @modelcontextprotocol/sdk
npm install -D typescript @types/node
```

Create the basic TypeScript configuration:
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "node",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Building Your First Tool

### Creating the Server Entry Point

Start with the main server file that initializes the MCP connection:

```typescript
// src/index.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

const server = new Server(
  {
    name: 'my-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// Define tool input schemas using Zod
const ReadFileArgsSchema = z.object({
  path: z.string().describe('File path to read'),
});

// Register tool handlers
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'read_file',
        description: 'Read a file from the allowed directories',
        inputSchema: ReadFileArgsSchema.shape,
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'read_file') {
    const args = ReadFileArgsSchema.parse(request.params.arguments);
    // Implementation comes next
  }
});

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Implementing File Reading

Now implement the file reading tool with proper security checks:

```typescript
// src/tools/readFile.ts
import { readFileSync, statSync } from 'fs';
import { resolve, isAbsolute } from 'path';
import { z } from 'zod';

const allowedDirectories = process.argv.slice(2) || [];

export function isPathAllowed(filePath: string): boolean {
  const resolved = resolve(filePath);
  return allowedDirectories.some(dir => resolved.startsWith(resolve(dir)));
}

export async function handleReadFile(args: { path: string }): Promise<string> {
  const filePath = resolve(args.path);
  
  // Security check
  if (!isPathAllowed(filePath)) {
    throw new Error(`Path not allowed: ${filePath}`);
  }
  
  // File existence check
  try {
    statSync(filePath);
  } catch {
    throw new Error(`File not found: ${filePath}`);
  }
  
  // Read and return content
  return readFileSync(filePath, 'utf-8');
}
```

Update the main server to use this implementation:

```typescript
// In src/index.ts
import { handleReadFile, isPathAllowed } from './tools/readFile.js';

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'read_file') {
    const args = ReadFileArgsSchema.parse(request.params.arguments);
    
    try {
      const content = await handleReadFile(args);
      return {
        content: [{ type: 'text', text: content }],
      };
    } catch (error) {
      return {
        content: [{ 
          type: 'text', 
          text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` 
        }],
        isError: true,
      };
    }
  }
  
  throw new Error(`Unknown tool: ${request.params.name}`);
});
```

### Adding More Tools

Extend your server with additional tools:

```typescript
// src/tools/writeFile.ts
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';

export async function handleWriteFile(args: { path: string; content: string }): Promise<void> {
  const filePath = resolve(args.path);
  
  // Security check
  if (!isPathAllowed(filePath)) {
    throw new Error(`Path not allowed: ${filePath}`);
  }
  
  // Ensure parent directory exists
  const dir = dirname(filePath);
  mkdirSync(dir, { recursive: true });
  
  // Write content
  writeFileSync(filePath, args.content, 'utf-8');
}

// src/tools/listDirectory.ts
import { readdirSync, statSync } from 'fs';
import { resolve } from 'path';

export async function handleListDirectory(args: { path: string }): Promise<any[]> {
  const dirPath = resolve(args.path);
  
  // Security check
  if (!isPathAllowed(dirPath)) {
    throw new Error(`Path not allowed: ${dirPath}`);
  }
  
  const entries = readdirSync(dirPath);
  return entries.map(entry => {
    const fullPath = join(dirPath, entry);
    const stats = statSync(fullPath);
    return {
      name: entry,
      type: stats.isDirectory() ? 'directory' : 'file',
      size: stats.size,
    };
  });
}
```

Register these tools in your server:

```typescript
// In src/index.ts
const server = new Server(
  { name: 'my-mcp-server', version: '1.0.0' },
  {
    capabilities: { tools: {} },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'read_file',
        description: 'Read a file from allowed directories',
        inputSchema: z.object({
          path: z.string().describe('File path to read'),
        }).shape,
      },
      {
        name: 'write_file',
        description: 'Write a file to allowed directories',
        inputSchema: z.object({
          path: z.string().describe('File path to write'),
          content: z.string().describe('Content to write'),
        }).shape,
      },
      {
        name: 'list_directory',
        description: 'List contents of a directory',
        inputSchema: z.object({
          path: z.string().describe('Directory path to list'),
        }).shape,
      },
    ],
  };
});
```

## Implementing Resources

Resources differ from tools in that they represent readable data without side effects. Clients can list and read resources without invoking actions.

```typescript
// src/resources/fileResource.ts
import { ListResourcesRequestSchema, ReadResourceRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { readdirSync, statSync, readFileSync } from 'fs';
import { join } from 'path';

export async function handleListResources(): Promise<any[]> {
  const resources = [];
  
  for (const dir of allowedDirectories) {
    const entries = readdirSync(dir, { recursive: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      try {
        const stats = statSync(fullPath);
        if (stats.isFile()) {
          resources.push({
            uri: `file://${fullPath}`,
            name: entry,
            mimeType: getMimeType(entry),
          });
        }
      } catch {
        // Skip inaccessible files
      }
    }
  }
  
  return resources;
}

export async function handleReadResource(uri: string): Promise<any> {
  if (!uri.startsWith('file://')) {
    throw new Error(`Unknown resource type: ${uri}`);
  }
  
  const filePath = uri.slice(7);
  if (!isPathAllowed(filePath)) {
    throw new Error(`Path not allowed: ${filePath}`);
  }
  
  const content = readFileSync(filePath);
  return {
    contents: [{
      uri,
      mimeType: getMimeType(filePath),
      blob: content.toString('base64'),
    }],
  };
}

function getMimeType(filename: string): string {
  if (filename.endsWith('.json')) return 'application/json';
  if (filename.endsWith('.md')) return 'text/markdown';
  if (filename.endsWith('.txt')) return 'text/plain';
  return 'text/plain';
}
```

Register resource handlers:

```typescript
// In src/index.ts
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  const resources = await handleListResources();
  return { resources };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  return handleReadResource(request.params.uri);
});
```

## Testing Your MCP Server

### Unit Testing

Write comprehensive tests for your tools:

```typescript
// test/tools.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { handleReadFile, isPathAllowed } from '../src/tools/readFile.js';
import { mkdtempSync, writeFileSync, rmSync } from 'fs';
import { join } from 'path';

describe('isPathAllowed', () => {
  const tempDir = mkdtempSync('/tmp/mcp-test-');
  
  it('allows paths in allowed directories', () => {
    expect(isPathAllowed(join(tempDir, 'test.txt'))).toBe(true);
  });
  
  it('blocks paths outside allowed directories', () => {
    expect(isPathAllowed('/etc/passwd')).toBe(false);
  });
});

describe('handleReadFile', () => {
  const tempDir = mkdtempSync('/tmp/mcp-test-');
  const testFile = join(tempDir, 'test.txt');
  
  beforeEach(() => {
    writeFileSync(testFile, 'Hello, MCP!');
  });
  
  it('reads allowed files successfully', async () => {
    const content = await handleReadFile({ path: testFile });
    expect(content).toBe('Hello, MCP!');
  });
  
  it('throws for disallowed paths', async () => {
    await expect(handleReadFile({ path: '/etc/passwd' }))
      .rejects.toThrow('Path not allowed');
  });
});
```

### Integration Testing

Test the full server protocol:

```typescript
// test/integration.test.ts
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { spawn } from 'child_process';

describe('MCP Server Integration', () => {
  let client: Client;
  
  beforeEach(async () => {
    const transport = new StdioClientTransport({
      command: 'node',
      args: ['dist/index.js', '/tmp/test-allowed-dir'],
    });
    
    client = new Client(
      { name: 'test-client', version: '1.0.0' },
      { capabilities: {} }
    );
    
    await client.connect(transport);
  });
  
  it('lists available tools', async () => {
    const tools = await client.listTools();
    expect(tools.tools).toContainEqual(
      expect.objectContaining({ name: 'read_file' })
    );
  });
  
  it('executes read_file tool', async () => {
    const result = await client.callTool({
      name: 'read_file',
      arguments: { path: '/tmp/test-allowed-dir/sample.txt' },
    });
    
    expect(result.content).toBeDefined();
  });
});
```

### Manual Testing

Test your server manually before publishing:

```bash
# Build the server
npm run build

# Test with MCP CLI
mcp add my-mcp-server --command "node dist/index.js" --args "/tmp/allowed"

# Verify it works
mcp test my-mcp-server read_file --path /tmp/allowed/test.txt
```

## Publishing and Distribution

### Package Configuration

Configure your package for distribution:

```json
// package.json
{
  "name": "@yourname/mcp-server-example",
  "version": "1.0.0",
  "description": "Example MCP server for learning",
  "main": "dist/index.js",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "dev": "tsx watch src/index.ts",
    "test": "vitest run",
    "prepublishOnly": "npm run build"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^0.1.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "tsx": "^4.0.0",
    "vitest": "^1.0.0"
  }
}
```

### Publishing to npm

Publish your server for others to use:

```bash
# Login to npm
npm login

# Publish the package
npm publish --access public
```

Users can then install your server:

```bash
npm install -g @yourname/mcp-server-example
```

### Creating Documentation

Write comprehensive documentation including:

1. **Installation guide** - Prerequisites and setup steps
2. **Configuration options** - All environment variables and arguments
3. **Available tools** - Detailed specifications for each tool
4. **Security considerations** - Permission model and safeguards
5. **Examples** - Common use cases with code samples
6. **Troubleshooting** - Common issues and solutions

Example README structure:

```markdown
# MCP Example Server

A demonstration MCP server for learning purposes.

## Installation

```bash
npm install -g @yourname/mcp-server-example
```

## Configuration

The server accepts the following arguments:
- Directory paths for file access

Environment variables:
- `LOG_LEVEL` - Set to debug for verbose output

## Tools

### read_file
Reads a file from allowed directories.
Input: `{ path: string }`
Output: File contents as text
```

## Advanced Patterns

### Error Handling

Implement comprehensive error handling:

```typescript
// src/lib/errors.ts
export class MCPError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: any
  ) {
    super(message);
    this.name = 'MCPError';
  }
}

export function createErrorResponse(error: Error): any {
  return {
    content: [{
      type: 'text',
      text: `Error: ${error.message}`,
    }],
    isError: true,
  };
}
```

### Resource Templates

Some resources follow patterns that allow dynamic creation:

```typescript
// In src/index.ts
import { ListResourceTemplatesRequestSchema } from '@modelcontextprotocol/sdk/types.js';

server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => {
  return {
    resourceTemplates: [
      {
        uriTemplate: 'file://{path}',
        name: 'File',
        description: 'Access any file in allowed directories',
        mimeType: 'text/plain',
      },
    ],
  };
});
```

### Logging and Monitoring

Add observability for production deployments:

```typescript
// src/lib/logging.ts
import { pino } from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: { colorize: true },
  },
});

// Log all tool invocations
server.setRequestHandler(CallToolRequestSchema, async (request, context) => {
  logger.info({ tool: request.params.name }, 'Tool invoked');
  
  try {
    const result = await handleTool(request.params.name, request.params.arguments);
    logger.info({ tool: request.params.name }, 'Tool completed successfully');
    return result;
  } catch (error) {
    logger.error({ tool: request.params.name, error }, 'Tool failed');
    throw error;
  }
});
```

## Deployment Strategies

### Docker Containerization

Package your server for easy deployment:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
CMD ["node", "dist/index.js"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  mcp-server:
    build: .
    environment:
      - NODE_ENV=production
      - LOG_LEVEL=info
    volumes:
      - /host/data:/allowed/data
```

### Kubernetes Deployment

For enterprise deployments:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mcp-server
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mcp-server
  template:
    metadata:
      labels:
        app: mcp-server
    spec:
      containers:
      - name: server
        image: your-registry/mcp-server:latest
        env:
        - name: LOG_LEVEL
          value: "info"
        volumeMounts:
        - name: data
          mountPath: /allowed/data
      volumes:
      - name: data
        persistentVolumeClaim:
          claimName: mcp-data-pvc
```

### Serverless Deployment

Deploy as serverless functions for on-demand usage:

```typescript
// For Vercel/Netlify style deployments
export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const server = new Server(/* config */);
    // Handle MCP request/response
  }
}
```

## Security Best Practices

### Input Validation

Always validate inputs against schemas:

```typescript
// Use Zod for comprehensive validation
const ToolArgsSchema = z.object({
  path: z.string()
    .min(1)
    .max(4096)
    .regex(/^[a-zA-Z0-9_\-./]+$/)
    .describe('File path within allowed directories'),
  encoding: z.enum(['utf-8', 'base64', 'hex']).optional(),
});
```

### Rate Limiting

Implement rate limiting to prevent abuse:

```typescript
// src/lib/rateLimit.ts
import { LRUCache } from 'lru-cache';

const rateLimitCache = new LRUCache<string, number[]>({
  max: 1000,
  ttl: 60_000,
});

export function checkRateLimit(clientId: string, maxRequests = 100): boolean {
  const now = Date.now();
  const requests = rateLimitCache.get(clientId) || [];
  const recent = requests.filter(t => t > now - 60_000);
  
  if (recent.length >= maxRequests) {
    return false;
  }
  
  rateLimitCache.set(clientId, [...recent, now]);
  return true;
}
```

### Audit Logging

Log all significant operations:

```typescript
// Log all file access for security auditing
logger.info({
  action: 'file_read',
  path: filePath,
  timestamp: new Date().toISOString(),
  clientId: context.clientId,
}, 'File read operation');
```

## Conclusion

Building MCP servers opens up powerful automation possibilities. By following this guide, you've created a functional file server with proper security boundaries, comprehensive testing, and production-ready packaging. The patterns demonstrated here apply to servers for APIs, databases, cloud services, and any tool that benefits from AI integration.

Continue exploring by building servers for services you use daily. Each integration makes your AI assistant more capable and valuable. The MCP ecosystem grows stronger with each contributed server, and your work might help thousands of developers achieve more with AI.

Next steps:
1. Publish your server to npm
2. Add it to the MCP directory for discovery
3. Write blog posts about your use cases
4. Contribute improvements back to the ecosystem

The future of AI-assisted development lies in seamless tool integration. MCP servers are the building blocks of this future.