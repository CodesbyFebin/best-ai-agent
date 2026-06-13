# Performance Report
Generated: 2026-06-13

## Build Metrics
- **mainJs:** 97 KB gzipped (378 KB raw)
- **css:** 14 KB gzipped (95 KB raw)
- **buildTime:** 1.19s
- **lazyComponents:** ProductProfile,ComparisonPage,GoogleDriveDashboard,TopicalAuthorityMap,IndiaPillarCustomizer,IndiaBuilderCustomizer,IndiaMcpCustomizer,IndiaGeneralPillarCustomizer

## Core Web Vitals Targets
| Metric | Target | Current Estimate | Status |
|--------|--------|-----------------|--------|
| LCP | < 2.5s | ~1.8s (sticky header, lazy JS) | ✅ Likely |
| CLS | < 0.1 | ~0.03 (reserved image slots) | ✅ Likely |
| INP | < 200ms | ~120ms (light JS bundle) | ✅ Likely |
| Lighthouse Mobile | ≥ 90 | Depends on CDN + image optimization | ⚠️ |

## Optimizations Applied
- Code splitting: 8 lazy-loaded page components
- Image loading: `loading="lazy"` + `decoding="async"`
- No render-blocking CSS (Tailwind Vite plugin produces minimal critical CSS)
- gzip enabled via Express + Vite static serving
- Font strategy: system font stack (no custom font download)

## Recommendations
- Convert all PNG images to WebP/AVIF (currently using JPEG from Unsplash)
- Add CDN (Cloudflare Pages / Vercel Edge Network)
- Preload hero image and logo SVG
- Add `fetchpriority="high"` to LCP hero image
- Enable Brotli compression on Express server
- Run Lighthouse CI (LCP, CLS, INP) via `npm run validate:performance`