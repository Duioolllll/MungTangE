import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = readFileSync(new URL('../SKILLS.md', import.meta.url), 'utf8');
const installed = readFileSync(new URL('../skills/mungtange/SKILL.md', import.meta.url), 'utf8');

test('canonical source renders portable installation references', () => {
  assert.equal(root.replaceAll('(skills/mungtange/references/', '(references/'), installed);
});
test('focused metadata, concise prompt, progressive references', () => {
  assert.match(root, /^name: mungtange$/m);
  assert.match(root, /^description:/m);
  assert.doesNotMatch(root, /^metadata:/m);
  assert.ok(root.split('\n').length < 500);
  assert.match(root, /Do not use for unrelated backend/);
  for (const name of ['PIPELINE.md','QUALITY.md','SECURITY.md','OUTPUT.md','PLAYBOOKS.md','KNOWLEDGE-ROUTER.md','DESIGN-DNA.md','WEB-ENGINEERING.md','AGENT-HARNESS.md','DEEP-INTEGRATION.md','SOURCE-INDEX.md']) {
    assert.ok(root.includes('skills/mungtange/references/' + name), name);
  }
});
test('no mandatory CLI, JSON reports or subagents', () => {
  assert.match(root, /without a CLI, catalog, JSON report or subagents/);
  assert.match(root, /legacy CLI-only/);
  assert.match(root, /NOT RUN/);
});

test('verified 300-source corpus and generated knowledge base are packaged', () => {
  const audit = JSON.parse(readFileSync(new URL('../research/source-audit.json', import.meta.url), 'utf8'));
  assert.equal(audit.total, 300);
  assert.equal(audit.read, 300);
  assert.equal(audit.failed, 0);
  assert.ok(audit.items.every(x => x.status === 'read_full_blob' && x.sha_verified));
  const router = readFileSync(new URL('../skills/mungtange/references/KNOWLEDGE-ROUTER.md', import.meta.url), 'utf8');
  assert.match(router, /300\/300/);
});
