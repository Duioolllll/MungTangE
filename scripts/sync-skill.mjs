import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const skillDir = new URL('../skills/mungtange/', import.meta.url);
const canonicalPath = fileURLToPath(new URL('SKILL.md', skillDir));
const rootPath = fileURLToPath(new URL('../SKILLS.md', import.meta.url));
const source = readFileSync(canonicalPath, 'utf8');
const frontmatter = /^---\n([\s\S]*?)\n---\n/.exec(source);
if (!frontmatter) throw Error('SKILL.md requires YAML frontmatter');
if (!/^name: mungtange$/m.test(frontmatter[1]) || !/^description:/m.test(frontmatter[1]))
  throw Error('Missing standard name or description');
if (/^runtime:/m.test(frontmatter[1]))
  throw Error('Unsupported runtime metadata is not allowed');

const lines = source.trimEnd().split('\n').length;
if (lines > 500) throw Error('Main SKILL.md exceeds 500 lines: ' + lines);
if (source.includes('`')) throw Error('Malformed Markdown backtick marker');

const references = [...source.matchAll(/\]\(references\/([^)]+\.md)\)/g)].map(match => match[1]);
if (references.length < 5) throw Error('Progressive references not discoverable');
for (const rel of references) {
  if (!/^[A-Z-]+\.md$/.test(rel) || !existsSync(new URL('references/' + rel, skillDir)))
    throw Error('Missing/unsafe reference: ' + rel);
}
const end = source.indexOf('\n---\n', 4);
if (end === -1) throw Error('Broken frontmatter closing fence');
const generated = source.slice(0, end + 5)
  + '\n<!-- GENERATED from skills/mungtange/SKILL.md. Do not edit manually. -->\n'
  + source.slice(end + 5).replaceAll('references/', 'skills/mungtange/references/');

if (process.argv.includes('--check')) {
  if (!existsSync(rootPath) || readFileSync(rootPath, 'utf8') !== generated) {
    console.error('SKILLS.md is stale. Run npm run build:skill');
    process.exitCode = 1;
  } else {
    console.log('PASS: generated SKILLS.md in sync; ' + lines + ' main lines, ' + references.length + ' linked references');
  }
} else {
  writeFileSync(rootPath, generated, 'utf8');
  console.log('Generated SKILLS.md from canonical skill: ' + lines + ' lines');
}
