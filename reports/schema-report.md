# Schema (JSON-LD) Report
Generated: 2026-06-13

## Schema Types
| Type | Where Used | Status |
|------|-----------|--------|
| Organization | Homepage + About | ✅ Server + Client injection |
| WebSite | Every page (SearchAction) | ✅ |
| BreadcrumbList | Every page except home | ✅ |
| Article | Silo articles | ✅ |
| Review | Product profiles | ✅ |
| Product | Product profiles | ✅ |
| SoftwareApplication | Product profiles | ✅ |
| FAQPage | Homepage (12 FAQs) | ✅ |
| ItemList | Homepage + leaderboard | ✅ |
| Person | Author profiles | ✅ |

## Injection Method
- **Server-side:** `server.ts` — `injectMeta()` function (line 313)
- **Client-side:** `App.tsx` — `useEffect` at line 692 (dynamic JSON-LD)
- **OG/Twitter:** `server.ts` lines 322-347 + `App.tsx` lines 261-288

## Validation
Run: `npm run validate:jsonld` (calls `scripts/validate_jsonld.js`)
Built-in checks: script tag presence, JSON parseability, context/type fields

## Recommendations
- Add `aggregateRating` Review schema on more product pages (currently on a subset)
- Consider `VideoObject` schema for embedded tutorial videos
- Add `HowTo` schema for step-by-step tutorials with author + date