const PAGE = 18;
const statusNode = document.getElementById('result-count');
const grid = document.getElementById('catalog-list');
const queryInput = document.getElementById('catalog-search');
const moreButton = document.getElementById('show-more');
const filters = [...document.querySelectorAll('[data-category]')];
const state = { category: 'all', query: '', limit: PAGE, items: [] };

function node(tag, cls, value) {
  const result = document.createElement(tag);
  if (cls) result.className = cls;
  if (value !== undefined) result.textContent = String(value);
  return result;
}
function render() {
  const q = state.query.trim().toLocaleLowerCase();
  const matched = state.items.filter((item) =>
    (state.category === 'all' || item.category === state.category) &&
    (!q || [item.name, item.source_repo, ...(item.tags || [])].join(' ').toLocaleLowerCase().includes(q))
  );
  statusNode.textContent = matched.length + ' results / ' + state.items.length + ' linked references';
  const fragment = document.createDocumentFragment();
  for (const item of matched.slice(0, state.limit)) {
    const card = node('article', 'skill-card');
    card.append(node('span', 'skill-category', item.category.replace('-', ' / ')));
    card.append(node('h3', '', item.name));
    card.append(node('p', 'skill-source', item.source_repo));
    const bottom = node('div', 'skill-bottom');
    bottom.append(node('span', 'skill-review' + (item.reviewed ? ' reviewed' : ''), item.reviewed ? 'REVIEW RECORDED' : 'SOURCE NOT AUDITED'));
    const source = node('a', '', 'View source ↗');
    source.href = item.source_url;
    source.target = '_blank';
    source.rel = 'noopener noreferrer';
    source.setAttribute('aria-label', item.name + ' 원본 GitHub 스킬 보기');
    bottom.append(source);
    card.append(bottom);
    fragment.append(card);
  }
  grid.replaceChildren(fragment);
  if (!matched.length) grid.append(node('p', 'empty-state', '검색 결과가 없습니다. 다른 키워드를 입력해보세요.'));
  moreButton.hidden = matched.length <= state.limit;
}
function setCategory(category) {
  state.category = category;
  state.limit = PAGE;
  for (const button of filters) {
    const current = button.dataset.category === category;
    button.classList.toggle('active', current);
    button.setAttribute('aria-pressed', String(current));
  }
  render();
}
for (const button of filters) button.addEventListener('click', () => setCategory(button.dataset.category));
queryInput.addEventListener('input', () => {
  state.query = queryInput.value;
  state.limit = PAGE;
  render();
});
moreButton.addEventListener('click', () => { state.limit += PAGE; render(); });
document.addEventListener('keydown', (event) => {
  if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey &&
      !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName) &&
      !document.activeElement?.isContentEditable) {
    event.preventDefault(); queryInput.focus();
  }
});
for (const button of document.querySelectorAll('[data-copy]')) {
  button.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('clipboard unavailable');
      await navigator.clipboard.writeText(button.dataset.copy);
      document.getElementById('copy-status').textContent = '명령어를 복사했습니다.';
      button.textContent = 'COPIED';
    } catch {
      document.getElementById('copy-status').textContent = '직접 명령어를 선택해 복사해주세요.';
    }
  });
}
async function load() {
  try {
    const response = await fetch('./catalog.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const data = await response.json();
    if (data.schema_version !== 1 || data.total !== 300 || !Array.isArray(data.items) || data.items.length !== 300)
      throw new Error('Unexpected catalog schema');
    state.items = data.items;
    render();
  } catch (error) {
    statusNode.textContent = '카탈로그를 읽지 못했습니다. 로컬에서는 npm run build:site를 먼저 실행하세요.';
    grid.replaceChildren(node('p', 'empty-state', 'Catalog unavailable: ' + error.message));
    moreButton.hidden = true;
  }
}
load();
