import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

function readJson(file) {
  try { return JSON.parse(readFileSync(file, 'utf8')); }
  catch { return {}; }
}

export function scanProject(directory = '.') {
  const root = resolve(directory);
  const pkg = readJson(join(root, 'package.json'));
  const dependencies = { ...pkg.dependencies, ...pkg.devDependencies };
  const names = Object.keys(dependencies);
  const frameworks = [];
  for (const name of ['next', 'react', 'vue', 'nuxt', 'svelte', 'astro', 'vite', 'angular', 'tailwindcss', 'playwright']) {
    if (names.some(dep => dep === name || dep.startsWith('@' + name + '/'))) frameworks.push(name);
  }
  const files = existsSync(root) ? readdirSync(root) : [];
  if (files.includes('manage.py')) frameworks.push('django');
  if (files.includes('pyproject.toml')) frameworks.push('python');
  if (files.includes('Cargo.toml')) frameworks.push('rust');
  const technologies = [...new Set(frameworks)];
  const language = files.includes('tsconfig.json') ? 'typescript' :
    files.includes('pyproject.toml') ? 'python' :
    files.includes('package.json') ? 'javascript' : 'unknown';
  const packageManager = ['pnpm-lock.yaml', 'yarn.lock', 'bun.lock', 'package-lock.json']
    .find(file => files.includes(file)) || null;
  return {
    root, name: pkg.name || root.split(/[\\/]/).pop(), language, frameworks,
    technologies, packageManager, hasGit: files.includes('.git'),
    detectedFiles: files.filter(file => /^(src|app|pages|components|public|styles|package.json|pyproject.toml|manage.py)$/i.test(file))
  };
}
