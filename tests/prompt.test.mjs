import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = readFileSync(new URL('../SKILLS.md', import.meta.url), 'utf8');
const installed = readFileSync(new URL('../skills/mungtange/SKILL.md', import.meta.url), 'utf8');
const deep = readFileSync(new URL('../skills/mungtange/references/DEEP-INTEGRATION.md', import.meta.url), 'utf8');

test('canonical source generates installed-relative links', () => {
  assert.equal(root.replaceAll('(skills/mungtange/references/', '(references/'), installed);
});

test('focused prompt keeps optional, bounded, relevant references', () => {
  assert.match(root, /^name: mungtange$/m);
  assert.match(root, /^description:/m);
  assert.ok(root.split('\n').length < 500);
  assert.match(root, /No reference is mandatory/);
  assert.match(root, /at most two/);
  assert.match(root, /do not invent one/i);
  assert.doesNotMatch(root, /For \*\*STANDARD\/DEEP web UI work\*\*, first read/);
  for (const path of ['DEEP-INTEGRATION.md','QUALITY.md','PLAYBOOKS.md','SECURITY.md']) {
    assert.ok(root.includes('skills/mungtange/references/' + path));
  }
  for (const obsolete of ['KNOWLEDGE-ROUTER.md','DESIGN-DNA.md','WEB-ENGINEERING.md','AGENT-HARNESS.md','SOURCE-INDEX.md']) {
    assert.ok(!installed.includes(obsolete));
  }
});

test('expert guide does not force fictional defect repair or measures', () => {
  assert.match(deep, /10 directly examined/);
  assert.match(deep, /no defect|none are found/i);
  assert.doesNotMatch(deep, /two observed interface defects resolved/i);
  assert.match(deep, /React\/Next.js performance/);
  assert.match(deep, /Context Compression/);
});

test('source provenance is archival data, not a skill effectiveness score', () => {
  const audit = JSON.parse(readFileSync(new URL('../research/source-audit.json', import.meta.url), 'utf8'));
  assert.equal(audit.total, 300);
  assert.equal(audit.read, 300);
  assert.equal(audit.failed, 0);
  assert.ok(audit.items.every(x => x.status === 'read_full_blob' && x.sha_verified));
  assert.ok(!installed.includes('SHA-verified 300 synthesis'));
});
