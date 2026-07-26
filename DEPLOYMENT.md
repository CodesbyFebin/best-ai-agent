# ATLAS GODMODE - Deployment Guide

## Prerequisites

- Node.js 20+
- npm or yarn
- Server with reverse proxy (nginx, Apache)
- SSL certificate (Let's Encrypt recommended)

## Environment Variables

Create `.env` on the server:

```bash
NODE_ENV=production
PORT=3000
# Optional: SITEMAP_DOMAIN=https://bestaiagent.in
```

## Build and Deploy

### 1. Local Production Build

```bash
npm ci --only=production
npm run build
```

This creates:
- `dist/index.html` - Static assets
- `dist/assets/` - CSS and JS bundles
- `dist/server.cjs` - Node server bundle

### 2. Server Setup

Copy the `dist/` directory to your server.

Install production dependencies on server:

```bash
npm ci --only=production
```

### 3. Run Server

```bash
# Using systemd, PM2, or similar
node dist/server.cjs
```

The server:
- Serves static files from `dist/`
- Handles SSR via `renderSsrBody()`
- Resolves routes through `routeResolver`
- Manages redirects and 404s

### 4. Reverse Proxy (nginx example)

```nginx
server {
    listen 80;
    server_name bestaiagent.in;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name bestaiagent.in;
    
    ssl_certificate /etc/letsencrypt/live/bestaiagent.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bestaiagent.in/privkey.pem;
    
    root /var/www/atlas/dist;
    index index.html;
    
    location / {
        try_files $uri @node;
    }
    
    location @node {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Static assets long cache
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 5. Health Checks

The server responds to:
- `GET /` - Homepage (200)
- `GET /api/health` - Health status (200 if running)

## Verification After Deployment

Run these checks **against the live domain**:

```bash
# Set your production URL
export BASE_URL=https://bestaiagent.in

# Run full verification
npx tsx scripts/verify-production.mjs

# Check sitemaps
npx tsx scripts/verify-sitemaps.ts

# Validate redirects still work
npx tsx scripts/verify-redirects.ts

# Verify evidence system
npm run test:evidence
```

All tests must pass.

## Rollback

To rollback:
1. Stop the server process
2. Restore previous `dist/` directory from backup
3. Restart server

Keep previous releases in `releases/` with timestamps.

## Monitoring

- Server logs: `journalctl -u atlas -f` (systemd)
- Application metrics: Add Prometheus endpoint in future
- Error tracking: Consider Sentry integration

## SSL/TLS

Use Let's Encrypt with certbot:

```bash
certbot --nginx -d bestaiagent.in -d www.bestaiagent.in
```

Auto-renewal is configured by certbot.

## Performance Tuning

- Enable gzip/brotli compression in nginx
- Use CDN for static assets if needed
- Set appropriate cache headers (see nginx config above)
- Consider Redis for session storage if adding auth

## Security Checklist

- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Set `NODE_ENV=production`
- [ ] Use non-root user for process
- [ ] Configure firewall (only 80/443 open)
- [ ] Enable rate limiting in nginx
- [ ] Keep server OS updated

## Updates

To deploy new version:

1. Build locally or on CI
2. Transfer new `dist/` to server
3. Stop server gracefully (SIGTERM)
4. Replace files
5. Restart server
6. Run verification checks

## Support

See DEVELOPMENT.md for development workflow and debugging.

## Emergency Contacts

- Engineering: [contact]
- DevOps: [contact]
- Security: [contact]

---

**Version:** ATLAS P99 + Safe-Deep OS  
**Last Updated:** 2026-07-24
