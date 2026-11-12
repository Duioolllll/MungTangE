import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const source = readFileSync(new URL('../skills/mungtange/SKILL.md', import.meta.url), 'utf8');
const generated = readFileSync(new URL('../SKILLS.md', import.meta.url), 'utf8');

test('standard narrow frontmatter and short source entrypoint', () => {
  assert.match(source, /^---\nname: mungtange\ndescription:/);
  assert.match(source, /Do not use for\s+backend-only/);
  assert.doesNotMatch(source, /^runtime:/m);
  assert.ok(source.trimEnd().split('\n').length <= 500);
});
test('every on-demand reference is discoverable and installed alongside the skill', () => {
  const refs = [...source.matchAll(/\]\(references\/([^)]+\.md)\)/g)].map(match => match[1]);
  assert.equal(new Set(refs).size, 7);
  for (const ref of refs) {
    const path = new URL('../skills/mungtange/references/' + ref, import.meta.url);
    assert.ok(existsSync(path), 'missing reference ' + ref);
  }
});
test('root SKILLS.md is deterministic generated output and retains references', () => {
  assert.match(generated, /GENERATED from skills\/mungtange\/SKILL\.md/);
  assert.match(generated, /\]\(skills\/mungtange\/references\/DESIGN\.md\)/);
  const check = spawnSync(process.execPath, ['scripts/sync-skill.mjs', '--check'], { encoding: 'utf8' });
  assert.equal(check.status, 0, check.stderr);
});
test('prompt-only and legacy CLI contracts are explicitly separated', () => {
  const promptRef = readFileSync(new URL('../skills/mungtange/references/OUTPUT.md', import.meta.url), 'utf8');
  const pipeline = readFileSync(new URL('../skills/mungtange/references/PIPELINE.md', import.meta.url), 'utf8');
  const legacy = readFileSync(new URL('../docs/LEGACY-CLI.md', import.meta.url), 'utf8');
  assert.match(source, /No CLI, generated JSON/);
  assert.match(promptRef, /No file, JSON schema, run ID or CLI is required/);
  assert.match(pipeline, /not.*CLI|not required|not used by this prompt-only path/i);
  assert.match(legacy, /optional/);
});
test('rendering is free of literal malformed backtick markers', () => {
  for (const path of [
    '../SKILLS.md',
    '../skills/mungtange/SKILL.md',
    '../skills/mungtange/references/SECURITY.md'
  ]) assert.ok(!readFileSync(new URL(path, import.meta.url), 'utf8').includes(String.fromCharCode(167)));
});
