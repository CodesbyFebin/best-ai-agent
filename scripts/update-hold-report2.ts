import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const REPO_ROOT = resolve('.');
const holdPath = resolve(REPO_ROOT, 'reports/w0w1-hold-report-2026-08-22.md');
let content = readFileSync(holdPath, 'utf-8');

// Update the G4 section to reflect that we have similarity report with cannibalization
// Find the line with "G4 Originality:" and replace the following lines until the next gate or section.
const g4Start = content.indexOf('G4 Originality:');
if (g4Start !== -1) {
  const g5Start = content.indexOf('G5 Editorial:', g4Start);
  if (g5Start !== -1) {
    const before = content.slice(0, g4Start);
    const after = content.slice(g5Start);
    const newG4Section = `G4 Originality:    HOLD — Classifications: total=50 unique=50 build_now=1 fabricatedSlots=0. BUT:\n                       - Similarity report exists at reports/w0w1-similarity-report.json with text shingle, FAQ, title/meta, shared paragraph, and cross-pillar cannibalization analysis.\n                       - Similarity report present; need to establish concern thresholds and implement duplicate detection algorithms.`;
    content = before + newG4Section + after;
  }
}

// Update the material claims section (the real G3 picture)
// Find the line with "## Material-claim extraction report (the real G3 picture)"
const materialStart = content.indexOf('## Material-claim extraction report (the real G3 picture)');
if (materialStart !== -1) {
  const nextSectionStart = content.indexOf('---', materialStart + 1);
  if (nextSectionStart !== -1) {
    const before = content.slice(0, materialStart);
    const after = content.slice(nextSectionStart);
    const newMaterialSection = `## Material-claim extraction report (the real G3 picture)\n\n\`\`\`text\nTotal material-claim sentences across 21 pages : 68\n  supported  (cited by a ledger claim id)      :  2\n  volatile   (cited by a claim id with expiry)  :  2\n  unresolved (DPDP/GST/Section / Act No. w/o id): 37\n  uncaptured (numeric/vendor w/o claim id)     : 27\n\`\`\`\n\nUntil the 37 unresolved statutory claims and 27 uncaptured numeric/vendor claims are each either mapped to a ledger claim id or explicitly marked as \`unresolved\` with documented reason, G3 cannot PASS. This is a real content-coverage gap, not a script bug.\n`;
    content = before + newMaterialSection + after;
  }
}

// Also update the "What must happen to leave HOLD" section to reflect progress
const mustHappenStart = content.indexOf('## What must happen to leave HOLD');
if (mustHappenStart !== -1) {
  const nextSectionStart = content.indexOf('---', mustHappenStart + 1);
  if (nextSectionStart !== -1) {
    const before = content.slice(0, mustHappenStart);
    const after = content.slice(nextSectionStart);
    const newMustHappen = `## What must happen to leave HOLD\n\n1. **Push the branch** via a credential with \`workflow\` scope, OR export as bundle and apply to a fresh checkout.\n2. **Authoritative P01 inventory** — already restored from verified ZIP (51 rows: 1 pillar + 50 clusters).\n3. **Material-claim coverage** — for each of the 64 unmapped claims (37 unresolved + 27 uncaptured), either add a ledger claim id or mark the sentence explicitly unresolved with a documented reason.\n4. **Similarity & cannibalization report** — produce \`reports/w0w1-similarity-report.json\` (MinHash / shared-paragraph % / FAQ duplication / title-meta duplication / cross-pillar cannibalization).\n   - Similarity report exists with all required analyses; need to establish similarity thresholds for concern and implement duplicate detection algorithms.\n5. **Human editorial review** — sign off on each of the 11 P01 pages; populate \`humanReviewedBy\` and \`humanReviewedAt\` frontmatter.\n6. **Rendered-HTML G6** — validate built HTML for \`<a href>\` resolution, redirects, canonical tags, JSON-LD match, sitemap membership, accessibility, and performance budgets.\n7. **Re-run gates from clean checkout** with the corrected script and confirm the same gate output.\n`;
    content = before + newMustHappen + after;
  }
}

writeFileSync(holdPath, content, 'utf-8');
console.log(`Updated hold report at ${holdPath}`);
