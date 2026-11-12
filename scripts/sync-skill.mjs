import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const canonical = resolve('SKILLS.md');
const target = resolve('skills/mungtange/SKILL.md');
const source = readFileSync(canonical, 'utf8');
// Canonical repository-relative links become portable local links when installed.
// This intentionally generates a different path prefix, not a hand-edited copy.
const generated = source.replaceAll('(skills/mungtange/references/', '(references/');
const current = readFileSync(target, 'utf8');
if (process.argv.includes('--check')) {
  if (generated !== current) {
    console.error('SKILL.md is stale. Run npm run sync:skill.');
    process.exitCode = 1;
  } else console.log('Installable SKILL.md matches canonical SKILLS.md rendering');
} else {
  writeFileSync(target, generated);
  console.log('Generated portable skills/mungtange/SKILL.md from SKILLS.md');
}
