# Legacy manifest quarantine

`21k-manifest-data.json` contains 21,801 legacy programmatic-content manifests retained solely for audit and recovery.

The dataset is not a publication source. It must not be imported into the canonical route registry, sitemap output, or production build. `npm run generate:content` skips it unless `ENABLE_LEGACY_MANIFEST=true` is set explicitly. CI runs `npm run check:quarantine` to detect exact canonical-path leakage.

An approved audit can inspect one manifest with:

```bash
npm run quarantine:enable -- <manifest-id-or-slug>
```

Review generated output manually. Never publish it without independent evidence, uniqueness, opportunity, and editorial gates.
