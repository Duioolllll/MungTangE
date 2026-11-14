import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { loadCatalog, CATEGORIES } from './catalog-data.mjs';

const root = new URL('../', import.meta.url);
const site = (path) => fileURLToPath(new URL(path, root));
const entries = loadCatalog();
const errors = [];
const ids = new Set();
for (const entry of entries) {
  if (!entry || !/^[a-z0-9-]+$/i.test(entry.name)) errors.push('Bad name: ' + String(entry?.name));
  if (ids.has(entry.id)) errors.push('Duplicate ID: ' + entry.id);
  ids.add(entry.id);
  if (!CATEGORIES.includes(entry.category)) errors.push('Unknown category: ' + entry.id);
  if (!/^https:\/\/github\.com\/[^/?#]+\/[^/?#]+\/blob\/[^/?#]+\/.+\/SKILL\.md$/i.test(entry.source_url))
    errors.push('Untrusted or malformed source URL: ' + entry.id);
  if (!/^[a-f0-9]{40}$/.test(entry.blob_sha)) errors.push('Missing SHA: ' + entry.id);
  if (!Number.isFinite(entry.fit_score)) errors.push('Invalid heuristic score: ' + entry.id);
  if (!Array.isArray(entry.tags)) errors.push('Invalid tags: ' + entry.id);
  if (typeof entry.reviewed !== 'boolean') errors.push('Missing reviewed flag: ' + entry.id);
}
for (const cat of CATEGORIES) {
  if (entries.filter((entry) => entry.category === cat).length !== 100)
    errors.push('Expected exactly 100 entries for ' + cat);
}
const required = [
  'site/index.html', 'site/app.js', 'site/styles.css', 'site/catalog.json',
  'skills/mungtange/SKILL.md', 'docs/ARCHITECTURE.md', 'docs/DEPLOYMENT.md'
];
for (const path of required) if (!existsSync(site(path))) errors.push('Missing file: ' + path);
if (existsSync(site('site/catalog.json'))) {
  try {
    const generated = JSON.parse(readFileSync(site('site/catalog.json'), 'utf8'));
    if (generated.total !== 300 || generated.items?.length !== 300) errors.push('Generated catalog count drift');
    for (const cat of CATEGORIES) if (generated.categories?.[cat] !== 100) errors.push('Generated category drift: ' + cat);
    if (generated.items?.some((item, i) => item.id !== entries[i].id)) errors.push('Generated catalog order drift');
  } catch (error) { errors.push('Generated catalog invalid JSON: ' + error.message); }
}
const html = readFileSync(site('site/index.html'), 'utf8');
for (const requiredId of ['id="catalog"', 'id="pipeline"', 'id="catalog-list"', 'id="catalog-search"', 'id="result-count"']) {
  if (!html.includes(requiredId)) errors.push('Missing accessible site hook ' + requiredId);
}
if (!html.includes('name="viewport"')) errors.push('Missing responsive viewport');
if (errors.length) {
  console.error(errors.map((message) => 'FAIL ' + message).join('\n'));
  process.exitCode = 1;
} else {
  console.log('PASS: 300 provenance-linked records, 3 categories, generated site and accessible markup hooks');
}
