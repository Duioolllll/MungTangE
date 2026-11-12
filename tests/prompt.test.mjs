import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = readFileSync(new URL('../SKILLS.md', import.meta.url), 'utf8');
const installed = readFileSync(new URL('../skills/mungtange/SKILL.md', import.meta.url), 'utf8');

test('root guide and installable skill are identical standalone prompts', () => {
  assert.equal(root, installed);
});
test('prompt includes router, autonomous build, QA and truthful evidence', () => {
  for (const pattern of [
    /^name: mungtange$/m,
    /runtime: "none"/,
    /INSTANT ROUTER/,
    /SPECIALIST ROUTER/,
    /SIX-GATE ENGINE/,
    /VISUAL DIRECTION/,
    /BUILD DISCIPLINE/,
    /VERIFICATION/,
    /MULTI-AGENT MODE/,
    /ADVERSARIAL REPAIR/,
    /EXECUTION LOOP/,
    /NOT RUN/,
    /Do NOT require[\s\S]{0,150}CLI/
  ]) assert.match(root, pattern);
});
test('no mandatory CLI or machine-readable report dependency', () => {
  assert.match(root, /Do NOT require/);
  assert.match(root, /No installation, no delegated agents/);
  assert.match(root, /If tools do not exist/);
});
