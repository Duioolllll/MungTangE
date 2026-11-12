import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('site uses relative assets that work under /MungTangE/', () => {
  const html = readFileSync(new URL('../site/index.html', import.meta.url), 'utf8');
  assert.match(html, /href="\.\/styles\.css"/);
  assert.match(html, /src="\.\/app\.js"/);
  assert.doesNotMatch(html, /<script[^>]+src="https?:/i);
});
test('site uses safe text rendering and a same-origin catalog', () => {
  const js = readFileSync(new URL('../site/app.js', import.meta.url), 'utf8');
  assert.match(js, /fetch\('\.\/catalog\.json'/);
  assert.match(js, /textContent/);
  assert.doesNotMatch(js, /innerHTML\s*=/);
});
test('main skill uses standards-compatible discovery metadata', () => {
  const skill = readFileSync(new URL('../skills/mungtange/SKILL.md', import.meta.url), 'utf8');
  assert.ok(skill.startsWith('---\n'));
  assert.match(skill, /^name: mungtange$/m);
  assert.match(skill, /^description:/m);
});
