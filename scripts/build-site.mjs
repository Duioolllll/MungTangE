import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCatalog, CATEGORIES } from '../src/catalog.js';

const destination = fileURLToPath(new URL('../site/catalog.json', import.meta.url));
const fields = ['id', 'name', 'category', 'source_repo', 'source_url', 'blob_sha', 'fit_score', 'tags', 'reviewed'];
const items = loadCatalog().map((entry) => Object.fromEntries(
  fields.map((field) => [field, entry[field] ?? null])
));
const data = {
  schema_version: 1,
  total: items.length,
  categories: Object.fromEntries(CATEGORIES.map((key) => [key, items.filter((item) => item.category === key).length])),
  notice: 'Reference metadata only; linked external skills have not been individually safety or license audited.',
  items
};
mkdirSync(dirname(destination), { recursive: true });
writeFileSync(destination, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('Built static catalog: ' + data.total + ' entries');
