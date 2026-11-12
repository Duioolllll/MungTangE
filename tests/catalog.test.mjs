import test from 'node:test';
import assert from 'node:assert/strict';
import { loadCatalog, listSkills, selectSkills } from '../src/catalog.js';
import { STAGES, CHECKS } from '../src/pipeline.js';

test('catalog contains exactly 300 unique referenced source entries', () => {
  const entries = loadCatalog();
  assert.equal(entries.length, 300);
  assert.equal(new Set(entries.map((item) => item.id)).size, entries.length);
  for (const category of ['design', 'model-output', 'web']) {
    assert.equal(entries.filter((item) => item.category === category).length, 100);
  }
});
test('filtering respects categories and page size', () => {
  const result = listSkills({ category: 'web', limit: 8 });
  assert.equal(result.length, 8);
  assert.ok(result.every((item) => item.category === 'web'));
});
test('ranking is bounded and preserves all three category lanes', () => {
  const result = selectSkills({ goal: 'accessible React frontend redesign', profile: { frameworks: ['react'] }, perCategory: 3 });
  assert.equal(result.length, 9);
  for (const category of ['design', 'model-output', 'web']) {
    assert.equal(result.filter((item) => item.category === category).length, 3);
  }
});
test('workflow has ordered dependent stages and mandatory checks', () => {
  assert.deepEqual(STAGES, ['brief', 'research', 'system', 'build', 'audit', 'ship']);
  assert.ok(STAGES.every((stage) => CHECKS[stage]?.length > 0));
});
