import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = readFileSync(new URL('../SKILLS.md', import.meta.url), 'utf8');
const installed = readFileSync(new URL('../skills/mungtange/SKILL.md', import.meta.url), 'utf8');

test('canonical source and generated installable skill match', () => {
  assert.equal(root, installed);
});
test('focused metadata, concise prompt, progressive references', () => {
  assert.match(root, /^name: mungtange$/m);
  assert.match(root, /^description:/m);
  assert.doesNotMatch(root, /^metadata:/m);
  assert.ok(root.split('\n').length < 500);
  assert.match(root, /Do not use for unrelated backend/);
  for (const name of ['PIPELINE.md','QUALITY.md','SECURITY.md','OUTPUT.md','PLAYBOOKS.md']) {
    assert.ok(root.includes('references/' + name), name);
  }
});
test('no mandatory CLI, JSON reports or subagents', () => {
  assert.match(root, /without a CLI, catalog, JSON report or subagents/);
  assert.match(root, /legacy CLI-only/);
  assert.match(root, /NOT RUN/);
});
