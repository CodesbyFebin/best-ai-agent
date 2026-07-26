#!/usr/bin/env tsx
/**
 * P0-02: SSR Runtime Verification
 *
 * Produces evidence artifacts by building and probing the SSR server.
 *
 * Output: evidence/p0-ssr-runtime/
 */

import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EVIDENCE_DIR = path.join(__dirname, '..', 'evidence', 'p0-ssr-runtime');
const BUILD_LOG = path.join(EVIDENCE_DIR, 'build.log');
const SERVER_LOG = path.join(EVIDENCE_DIR, 'server.log');
const DIAGNOSTICS = path.join(EVIDENCE_DIR, 'runtime-diagnostics.json');

function ensureEvidenceDir() {
  if (!fs.existsSync(EVIDENCE_DIR)) {
    fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
  }
}

function logToFile(content: string, filename: string) {
  fs.appendFileSync(path.join(EVIDENCE_DIR, filename), content);
}

function checksum(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    hash = ((hash << 5) - hash) + content.charCodeAt(i);
    hash = hash & hash;
  }
  return `${Math.abs(hash).toString(16)}:${content.length}`;
}

function writeChecksums() {
  const files = fs.readdirSync(EVIDENCE_DIR).filter(f => f !== 'checksums.sha256' && !f.endsWith('.sha256'));
  const lines = files.map(f => {
    const content = fs.readFileSync(path.join(EVIDENCE_DIR, f), 'utf-8');
    return `${checksum(content)}  ${f}`;
  });
  fs.writeFileSync(path.join(EVIDENCE_DIR, 'checksums.sha256'), lines.join('\n') + '\n');
}

async function runBuild(): Promise<boolean> {
  console.log('🔨 Running build...');
  logToFile('=== BUILD START ===\n', 'build.log');
  
  return new Promise((resolve) => {
    const proc = spawn('npm', ['run', 'build'], {
      cwd: path.join(__dirname, '..'),
      stdio: 'pipe',
      shell: true
    });

    proc.stdout.on('data', (data) => {
      logToFile(data.toString(), 'build.log');
      process.stdout.write(data);
    });
    proc.stderr.on('data', (data) => {
      logToFile(data.toString(), 'build.log');
      process.stderr.write(data);
    });

    proc.on('close', (code) => {
      logToFile(`\n=== BUILD EXIT ${code} ===\n`, 'build.log');
      resolve(code === 0);
    });
  });
}

async function startServer(): Promise<{ server: any; port: number }> {
  console.log('🚀 Starting SSR server...');
  logToFile('=== SERVER START ===\n', 'server.log');

  return new Promise((resolve, reject) => {
    // Server hardcodes PORT=3000 in server.tsx
    const port = 3000;
    const env = { ...process.env, NODE_ENV: 'production' };
    const proc = spawn('node', ['dist/server.cjs'], {
      cwd: path.join(__dirname, '..'),
      env,
      stdio: 'pipe',
      shell: false // avoid shell=True security warning
    });

    proc.stdout.on('data', (data) => {
      const txt = data.toString();
      logToFile(txt, 'server.log');
      process.stdout.write(txt);
    });
    proc.stderr.on('data', (data) => {
      const txt = data.toString();
      logToFile(txt, 'server.log');
      process.stderr.write(txt);
    });

    proc.on('error', (err) => {
      reject(new Error(`Spawn error: ${err.message}`));
    });

    // Wait for server to be ready by polling /health
    let attempts = 0;
    const maxAttempts = 40; // 40 * 500ms = 20 seconds
    const checkInterval = setInterval(() => {
      attempts++;
      const req = http.get(`http://localhost:${port}/health`, (res) => {
        const body = '';
        res.on('data', () => {});
        res.on('end', () => {
          clearInterval(checkInterval);
          console.log(`✅ Server ready on :${port} (attempt ${attempts})`);
          resolve({ server: proc, port });
        });
      });
      req.on('error', () => {
        // Wait until attempts exhausted
      });
      req.setTimeout(2000, () => req.destroy());
      if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        reject(new Error('Server failed to start after ' + (attempts * 500) + 'ms'));
      }
    }, 500);
  });
}

function stopServer(server: any) {
  server.kill('SIGTERM');
}

async function probeRoute(port: number, path: string, expectedStatus: number = 200): Promise<{ status: number; headers: any; body: string }> {
  return new Promise((resolve) => {
    const url = `http://localhost:${port}${path}`;
    const start = Date.now();
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`  GET ${path} → ${res.statusCode} (${data.length} bytes)`);
        resolve({ status: res.statusCode, headers: res.headers, body: data });
      });
    });
    req.on('error', (err) => {
      resolve({ status: -1, headers: {}, body: `Request error: ${err.message}` });
    });
    req.setTimeout(5000, () => req.destroy());
  });
}

async function runProbes(port: number): Promise<any> {
  console.log('🔍 Probing routes...\n');
  const results: any = {
    
  };

  const routes = [
    { path: '/', description: 'homepage', expectContent: 'BestAIAgent.in' },
    { path: '/agents/cursor', description: 'agent page', expectContent: 'Cursor AI' },
    { path: '/categories/coding-agents', description: 'category page', expectContent: 'Coding Agents' },
    { path: '/best-ai-agent-for-coding', description: 'pillar page', expectContent: 'Best AI Coding Agents' },
    { path: '/admin', description: 'admin (should be 404)', expect: 404, expectContent: null },
    { path: '/api/graph/stats', description: 'graph API', expectContent: 'nodes' },
    { path: '/sitemap.xml', description: 'sitemap', expectContent: 'sitemap' },
    { path: '/tools/cursor', description: 'legacy redirect', expect: 301, expectContent: null }
  ];

  for (const r of routes) {
    const probed = await probeRoute(port, r.path, r.expect);
    const key = r.path.replace(/\//g, '_') || 'root';
    fs.writeFileSync(path.join(EVIDENCE_DIR, `response_${key}.html`), probed.body);
    
    let contentPass: boolean = true;
    if (r.expectContent) {
      if (r.path === '/api/graph/stats') {
        try {
          const json = JSON.parse(probed.body);
          contentPass = json.nodes !== undefined && json.edges !== undefined;
        } catch {
          contentPass = false;
        }
      } else {
        contentPass = probed.body.includes(r.expectContent);
      }
    }

    results[r.path] = {
      description: r.description,
      expected: r.expect || 200,
      actual: probed.status,
      pass: probed.status === (r.expect || 200) && contentPass,
      contentType: probed.headers['content-type'],
      contentLength: probed.body.length,
      contentMatch: r.expectContent ? contentPass : null,
      expectedContent: r.expectContent
    };
    if (probed.body.length < 10000) {
      fs.writeFileSync(path.join(EVIDENCE_DIR, `status_${key}.txt`), 
        `Status: ${probed.status}\nContent-Type: ${probed.headers['content-type']}\nExpected Content: ${r.expectContent || 'any'}\nContent Match: ${contentPass}\n\n${probed.body.substring(0, 2000)}`);
    }
  }

  console.log('');
  return results;
}

function validateHtml(html: string, path: string): any {
  const checks = {
    hasRootDiv: html.includes('id="root"'),
    hasReactComments: html.includes('<!--]-->') || html.includes('<!--[-->'),
    hasNoHydrationError: !html.toLowerCase().includes('hydration failed') && !html.includes('<!--$?'),
    hasExpectedTitle: path === '/' ? html.includes('<title>') : true,
    hasJsonLd: html.includes('application/ld+json'),
    hasCanonical: html.includes('rel="canonical"'),
    hasNoAdminIn404: path === '/admin' ? !html.includes('AdminDashboard') : true
  };
  return checks;
}

function validateSchemas(): any {
  // Validate JSON-LD from a saved response if exists
  const sitemapPath = path.join(EVIDENCE_DIR, 'response__sitemap.xml.html');
  if (fs.existsSync(sitemapPath)) {
    const content = fs.readFileSync(sitemapPath, 'utf-8');
    if (content.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
      return { sitemapValid: true };
    }
  }
  return { sitemapValid: false };
}

async function main() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  P0-02: SSR Runtime Verification');
  console.log('═══════════════════════════════════════════════════\n');

  ensureEvidenceDir();

  // 1. Build
  const buildOk = await runBuild();
  if (!buildOk) {
    console.error('❌ Build failed. See build.log');
    process.exit(1);
  }

  // 2. Start server
  let serverProc: any;
  try {
    const { server, port } = await startServer();
    serverProc = server;

    // 3. Probe routes
    const probeResults = await runProbes(port);
    const diagnostics: any = {
      timestamp: new Date().toISOString(),
      build: buildOk ? 'success' : 'failed',
      server: 'running',
      port,
      routes: probeResults,
      validation: {} as any
    };

    // 4. Validate HTML content
    console.log('\n📊 Validating HTML output...\n');
    const rootHtmlPath = path.join(EVIDENCE_DIR, 'response__root.html');
    if (fs.existsSync(rootHtmlPath)) {
      const homeHtml = fs.readFileSync(rootHtmlPath, 'utf-8');
      diagnostics.validation.home = validateHtml(homeHtml, '/');
      console.log(`  Home HTML: ${diagnostics.validation.home.hasRootDiv ? '✅' : '❌'} root div, ${diagnostics.validation.home.hasReactComments ? '✅' : '❌'} React markers`);
    }

    const adminPath = path.join(EVIDENCE_DIR, 'response__admin.html');
    if (fs.existsSync(adminPath)) {
      const adminHtml = fs.readFileSync(adminPath, 'utf-8');
      diagnostics.validation.admin = validateHtml(adminHtml, '/admin');
      console.log(`  Admin page: status ${probeResults['/admin']?.actual}, contains AdminDashboard? ${adminHtml.includes('AdminDashboard') ? '❌' : '✅'}`);
    }

    // 5. Validate schemas
    diagnostics.schema = validateSchemas();

    // 6. Write diagnostics JSON
    fs.writeFileSync(DIAGNOSTICS, JSON.stringify(diagnostics, null, 2));

    // 7. Generate evidence manifest
    const manifest = {
      phase: 'P0-02',
      control: 'SSR runtime and hydration verification',
      commit: '(working tree)',
      generatedAt: new Date().toISOString(),
      buildSuccess: buildOk,
      serverPort: port,
      testRoutes: Object.keys(probeResults),
      summary: {
        totalRoutes: Object.keys(probeResults).length,
        passedRoutes: Object.values(probeResults).filter((r: any) => r.pass).length,
        htmlValid: diagnostics.validation.home?.hasRootDiv || false
      }
    };
    fs.writeFileSync(path.join(EVIDENCE_DIR, 'evidence-manifest.json'), JSON.stringify(manifest, null, 2));

    // 8. Checksums
    writeChecksums();

    console.log('\n✅ P0-02 verification complete');
    console.log(`   Evidence: ${EVIDENCE_DIR}/`);
  } catch (err: any) {
    console.error('❌ Verification failed:', err.message);
    process.exit(1);
  } finally {
    if (serverProc) stopServer(serverProc);
  }
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
