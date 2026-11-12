import { existsSync, lstatSync, readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = fileURLToPath(new URL('../skills/mungtange/', import.meta.url));
const targets = Object.freeze({
  codex: '.agents/skills/mungtange',
  claude: '.claude/skills/mungtange',
  opencode: '.opencode/skills/mungtange'
});

function listFiles(dir, prefix = '') {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const rel = join(prefix, entry.name);
    if (entry.isSymbolicLink()) throw Error('Symlink source refused');
    return entry.isDirectory() ? listFiles(join(dir, entry.name), rel) : [rel];
  });
}

export function installSkill({ project = '.', agent = 'codex', force = false } = {}) {
  const root = resolve(project);
  if (!existsSync(root)) throw Error('Project directory missing: ' + root);
  const names = agent === 'all' ? Object.keys(targets) : agent.split(',').map(x => x.trim());
  if (!names.length || names.some(name => !Object.hasOwn(targets, name))) {
    throw Error('--agent must be codex, claude, opencode, all or comma-separated names');
  }
  const sourceFiles = listFiles(source), pending = [];
  for (const name of [...new Set(names)]) {
    const dir = join(root, targets[name]);
    if (existsSync(dir) && lstatSync(dir).isSymbolicLink()) throw Error('Symlink target refused: ' + dir);
    for (const file of sourceFiles) {
      const dest = join(dir, file);
      if (existsSync(dest) && lstatSync(dest).isSymbolicLink()) throw Error('Symlink file refused: ' + dest);
      if (existsSync(dest) && !force) throw Error('Already installed: ' + dest + ' (use --force)');
      pending.push({ from: join(source, file), dest });
    }
  }
  for (const { from, dest } of pending) {
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, readFileSync(from));
  }
  return {
    installed: pending.length, agents: [...new Set(names)], project: root,
    next: 'mungtange plan --goal "Describe the user outcome"',
    policy: 'Only first-party MungTangE skill files copied. All 300 upstream entries stay references.'
  };
}
