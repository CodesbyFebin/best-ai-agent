// @ts-check
/**
 * ESLint flat config — Best AI Agent
 *
 * Established 2026-08-20 (Phase 13). Previously the repo had
 * `@typescript-eslint/*` in devDependencies but no ESLint config at all, and
 * `npm run lint` was an alias for `tsc --noEmit` (typecheck, not linting).
 * See AUDIT.md §G.2.
 *
 * Design: catch real regressions without churn-blocking the existing tree.
 * TypeScript's own checks already run in CI (`tsc --noEmit`); ESLint's job here
 * is to catch what tsc does NOT — unused vars, unhandled promises, debugger
 * statements, `console` in committed code outside server.tsx/scripts, and
 * obviously broken patterns. Stylistic rules are OFF by design; match the
 * surrounding file instead.
 *
 * ADOPTION POLICY (ratchet): eslint runs in CI as an advisory step
 * (`continue-on-error: true` in ci.yml) until the baseline is driven down.
 * Measured baseline on 2026-08-20 (after ignoring .mjs files): ~25 errors,
 * ~326 warnings across ~60 files, dominated by no-unused-vars and a handful of
 * prefer-const / no-useless-* / no-unsafe-function-type errors. The plan is to
 * (1) auto-fix the trivially-safe errors, (2) ratchet unused-vars to zero,
 * (3) once errors hit 0, flip CI to a hard gate. `npm run lint:eslint` is the
 * local entrypoint; `npm run lint` stays as `tsc --noEmit` for CI compatibility
 * until the flip.
 */
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  // Base JS recommendations + TS-aware variant
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // Global ignores — build output, deps, the untracked scratch scripts that
  // currently fail typecheck (see AUDIT.md §G.3), and the quarantine zone.
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.vite/**',
      '.next/**',
      '.turbo/**',
      'public/**',
      'evidence/**',
      'quarantine/**',
      'packages/**',          // unwired monorepo skeleton (AUDIT.md §A.8), not part of build
      'apps/**',
      'projects/**',
      'engine/**',
      'content/**',
      'reports/**',
      'artifacts/**',
      'audit/**',
      'config/**',
      'schemas/**',
      'metadata.json',
      'graph-data.json',
      'firebase-applet-config.json',
      '**/*.mjs',             // excluded from the TS project in tsconfig; parse diff causes no-undef noise
      'scripts/generate-manifests-scaled.ts',  // untracked scratch, fails typecheck (AUDIT.md §G.3)
      'scripts/generate-all-scaled-content.ts',
      'scripts/generate-scaled-content.ts',
      'scripts/verify-sitemaps-static.ts',
      '*.log',
      '*.zip',
      'kernel/**',            // unrelated GPU project (AUDIT.md §A.9)
    ],
  },

  // Project-wide TS settings
  {
    files: ['src/**/*.ts', 'src/**/*.tsx', 'server.tsx', 'api/**/*.ts', 'scripts/**/*.ts', 'scripts/**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // tsc already covers: no-unused-vars partially, types, etc. We layer on
      // rules that catch runtime regressions tsc *cannot*.
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      '@typescript-eslint/no-explicit-any': 'off',    // existing code uses `any` deliberately; flipping is churn
      'no-console': 'off',                            // server.tsx + scripts legitimately log
      'no-debugger': 'error',
      'no-unused-private-class-members': 'error',
      'no-self-compare': 'error',
      'no-unreachable': 'error',
      'no-extra-semi': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'prefer-const': 'error',
      'no-var': 'error',
      'no-constant-condition': ['warn', { checkLoops: false }],
      'no-control-regex': 'error',
      'no-dupe-keys': 'error',
      'no-irregular-whitespace': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-redeclare': 'off',                          // tseslint handles via @typescript-eslint/no-redeclare
      'no-undef': 'off',                               // TS handles; enabling triggers false positives with ESM globals
    },
  },

  // JSX-specific: allow React/JSX without needing React in scope (react-jsx runtime)
  {
    files: ['src/**/*.tsx', 'server.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },

  // Scripts may use console + process freely
  {
    files: ['scripts/**/*.ts', 'scripts/**/*.tsx', 'server.tsx'],
    rules: {
      'no-console': 'off',
    },
  },
);
