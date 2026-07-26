# ATLAS GODMODE - Baseline Repository State

## Git Status
- **Branch:** main
- **Commit:** 864e24c (fix(atlas-p00): tighten inline type in audit-baseline.ts)
- **Uncommitted changes:** 72 files

## Package Information
- **Package manager:** npm (package.json present)
- **Runtime:** Node.js
- **Framework:** Vite + React
- **TypeScript:** ~5.8.2

## Current Test Status (Baseline)
- Evidence tests: 9/9 passing
- Production tests: 54/54 passing  
- Redirect tests: 290/290 passing
- TypeScript compilation: Has errors in unrelated files (App.tsx, RouterApp.tsx, ingest.ts, main.tsx)

## Known Issues
1. TypeScript errors in:
   - src/App.tsx (651-652: Dispatch<SetStateAction<boolean>> assignment)
   - src/components/RouterApp.tsx (47: missing onNavigate property)
   - src/main.tsx (3-4: .tsx extension import issue)
   - scripts/ingest.ts (missing csv-parse/sync, CsvRow property mismatches)

2. These errors are pre-existing but must be fixed for 100% completion

## Repository Structure
- src/ - TypeScript/React source
- scripts/ - Verification and utility scripts
- packages/ - Monorepo packages (empty index.ts files)
- public/ - Static assets
- reports/baseline/ - Baseline audit reports
- .atlas/ - Project tracking

## Environment
- OS: darwin 24.6.0 x64
- Shell: zsh
- Node: Available (version check needed)

## Build Configuration
- Build command: `npm run build` (vite + esbuild)
- Dev: `npm run dev` (tsx server.ts)
- Lint: `npm run lint` (tsc --noEmit)
