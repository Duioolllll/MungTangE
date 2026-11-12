import { readFileSync } from 'node:fs';

export const CATEGORIES = Object.freeze(['design', 'model-output', 'web']);
const preference = {
  design: ['frontend-design', 'design-critique', 'design-token', 'design-system', 'interface-review', 'better-typography'],
  'model-output': ['harness-engineering', 'advanced-evaluation', 'context-compression', 'tool-design', 'code-review', 'long-horizon-prompting'],
  web: ['web-design-guidelines', 'react-best-practices', 'playwright-explore-website', 'gsap-performance', 'premium-frontend-ui']
};
const aliases = {
  '디자인': 'design', '브랜드': 'brand', '타이포': 'typography', '접근성': 'accessibility',
  '반응형': 'responsive', '웹': 'web', '프론트': 'frontend', '애니메이션': 'animation',
  '성능': 'performance', '평가': 'evaluation', '모델': 'model', '출력': 'output',
  '스킬': 'skill', '프롬프트': 'prompt', '페이지': 'page', '컴포넌트': 'component'
};

export function loadCatalog() {
  const items = [];
  for (const category of CATEGORIES) {
    const file = new URL('../catalog/' + category + '.json', import.meta.url);
    const data = JSON.parse(readFileSync(file, 'utf8'));
    if (data.category !== category || data.count !== 100 || data.items?.length !== 100) {
      throw new Error('Catalog integrity failure: ' + category);
    }
    items.push(...data.items);
  }
  const ids = new Set();
  for (const item of items) {
    if (ids.has(item.id)) throw new Error('Duplicate catalog id: ' + item.id);
    ids.add(item.id);
    if (item.category !== CATEGORIES.find(c => c === item.category) ||
        !/^[a-f0-9]{40}$/.test(item.blob_sha) ||
        !item.source_path.endsWith('/SKILL.md') ||
        !item.source_url.startsWith('https://github.com/')) {
      throw new Error('Bad catalog entry: ' + item.id);
    }
  }
  return items;
}

function normalize(input) {
  let text = String(input || '').toLowerCase();
  for (const [original, english] of Object.entries(aliases)) text = text.split(original).join(' ' + english + ' ');
  return text;
}

export function selectSkills({ goal, profile = {}, perCategory = 4, catalog = loadCatalog() }) {
  const context = normalize([goal, ...(profile.frameworks || []), ...(profile.technologies || []), profile.language].join(' '));
  const words = new Set(context.match(/[a-z0-9]+/g) || []);
  const results = [];
  for (const category of CATEGORIES) {
    const scored = catalog.filter(item => item.category === category).map(item => {
      const name = normalize(item.name);
      const slugWords = [...new Set(name.split('-'))].filter(word => word.length > 2);
      const hits = slugWords.filter(word => words.has(word) || (word.length > 4 && context.includes(word)));
      const tagHits = (item.tags || []).filter(tag => words.has(tag));
      const preferredIndex = (preference[category] || []).indexOf(item.name);
      const relevance = hits.length * 17 + tagHits.length * 13;
      const prior = preferredIndex >= 0 ? 26 - preferredIndex * 3 : 0;
      const framework = profile.frameworks || [];
      const mismatch = (name.includes('react') && framework.includes('vue')) ||
                       (name.includes('vue') && framework.includes('react')) ? -25 : 0;
      const score = relevance + prior + mismatch + (item.fit_score || 50) / 10;
      return { ...item, selection_score: Math.round(score), matched_terms: [...new Set([...hits, ...tagHits])] };
    }).sort((a, b) => b.selection_score - a.selection_score || a.id.localeCompare(b.id));
    const chosen = [];
    const byRepo = {};
    for (const entry of scored) {
      if (chosen.length >= perCategory) break;
      if ((byRepo[entry.source_repo] || 0) >= 2) continue;
      chosen.push(entry);
      byRepo[entry.source_repo] = (byRepo[entry.source_repo] || 0) + 1;
    }
    results.push(...chosen);
  }
  return results;
}

export function listSkills({ category = 'all', search = '', limit = 20 } = {}) {
  const query = normalize(search);
  return loadCatalog().filter(item =>
    (category === 'all' || item.category === category) &&
    (!query || normalize(item.name + ' ' + item.source_repo + ' ' + item.tags.join(' ')).includes(query))
  ).slice(0, Math.min(Math.max(Number(limit) || 20, 1), 300));
}
