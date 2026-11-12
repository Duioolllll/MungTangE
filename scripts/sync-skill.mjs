import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const canonical = resolve('SKILLS.md');
const target = resolve('skills/mungtange/SKILL.md');
const source = readFileSync(canonical, 'utf8');
const current = readFileSync(target, 'utf8');
if (process.argv.includes('--check')) {
  if (source !== current) {
    console.error('SKILL.md is stale. Run npm run sync:skill.');
    process.exitCode = 1;
  } else console.log('SKILL.md matches canonical SKILLS.md');
} else {
  writeFileSync(target, source);
  console.log('Generated skills/mungtange/SKILL.md from SKILLS.md');
}
