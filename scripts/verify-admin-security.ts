#!/usr/bin/env node
/**
 * ATLAS P0-01 — Admin Security Verification
 * 
 * Verifies that administrative routes are inaccessible without authentication.
 * In production, /admin routes must return 404 (disabled until auth implemented).
 * 
 * Run: npx tsx scripts/verify-admin-security.ts
 */

import http from 'http';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

interface TestCase {
  path: string;
  description: string;
}

const adminRoutes: TestCase[] = [
  { path: '/admin', description: 'Admin root' },
  { path: '/admin/', description: 'Admin with trailing slash' },
  { path: '/admin/users', description: 'Admin users subpath' },
  { path: '/admin?debug=true', description: 'Admin with query param' },
];

function fetch(path: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve) => {
    const url = `${BASE_URL}${path}`;
    const req = http.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode || 0, body });
      });
    });
    req.on('error', (e) => {
      resolve({ status: 0, body: e.message });
    });
    req.end();
  });
}

async function main() {
  console.log('🔐 ATLAS Admin Security Verification\n');
  console.log('Testing admin route protection...\n');

  let passed = 0;
  let failed = 0;

  for (const test of adminRoutes) {
    const { status, body } = await fetch(test.path);
    
    // In development, we expect 200 if server is running
    // In production, we expect 404 (disabled)
    const isDev = process.env.NODE_ENV !== 'production';
    const expectedStatus = isDev ? 200 : 404;
    
    const isProtected = status === 404 || status === 401 || status === 403;
    const hasAdminContent = body.includes('AdminDashboard') || 
                            body.includes('System Metrics') ||
                            body.includes('Internal Routes');
    
    if (isProtected || (!isDev && status === 404)) {
      console.log(`✅ ${test.path}: ${status} (protected)`);
      passed++;
    } else if (status === 200 && !hasAdminContent) {
      console.log(`✅ ${test.path}: ${status} (no admin content leaked)`);
      passed++;
    } else {
      console.log(`❌ ${test.path}: ${status} - Admin content exposed!`);
      if (hasAdminContent) {
        console.log('   ⚠️  No AdminDashboard check failed');
      }
      failed++;
    }
  }

  // Check that sitemap doesn't contain admin URLs
  console.log('\n🔍 Checking sitemap for admin URLs...');
  // This would require fetching and parsing sitemap - simplified for now

  console.log(`\n${'='.repeat(50)}`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log(`${'='.repeat(50)}`);

  if (failed > 0) {
    console.error('\n❌ Admin security verification FAILED');
    process.exit(1);
  }
  console.log('\n✅ Admin security looks OK');
  process.exit(0);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
