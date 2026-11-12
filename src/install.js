import {
  constants, closeSync, existsSync, fstatSync, lstatSync, openSync,
  readFileSync, readdirSync, mkdirSync, realpathSync, writeSync
} from 'node:fs';
import { resolve, join, dirname, relative, isAbsolute, sep } from 'node:path';
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
    if (!entry.isFile() && !entry.isDirectory()) throw Error('Special source file refused: ' + rel);
    return entry.isDirectory() ? listFiles(join(dir, entry.name), rel) : [rel];
  });
}

function lstatIfPresent(path) {
  try { return lstatSync(path); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

function assertInside(root, path) {
  const rel = relative(root, path);
  if (rel === '..' || rel.startsWith('..' + sep) || isAbsolute(rel)) {
    throw Error('Destination escapes project: ' + path);
  }
}

// Walk EVERY component between root and destination, including ancestors that
// do not exist yet. Unlike existsSync, lstat detects dangling symlink leaves.
// This prevents ordinary existing-symlink redirects at any parent depth.
function assertSafePath(root, path) {
  assertInside(root, path);
  const base = lstatIfPresent(root);
  if (!base || !base.isDirectory() || base.isSymbolicLink()) {
    throw Error('Project root must be a real directory: ' + root);
  }
  const segments = relative(root, path).split(sep).filter(Boolean);
  let current = root;
  for (const part of segments) {
    current = join(current, part);
    const stat = lstatIfPresent(current);
    if (stat?.isSymbolicLink()) throw Error('Symlink ancestor refused: ' + current);
    if (stat && current !== path && !stat.isDirectory()) {
      throw Error('Non-directory ancestor refused: ' + current);
    }
  }
}

// A separately selected project path may have symlinked parents (for example,
// /home/current -> /real/work). Resolve the explicit root once, then keep every
// installed destination under that canonical real directory.
function canonicalProject(project) {
  const requested = resolve(project);
  const stat = lstatIfPresent(requested);
  if (!stat || !stat.isDirectory() || stat.isSymbolicLink()) {
    throw Error('Project directory missing or symbolic link: ' + requested);
  }
  return realpathSync(requested);
}

function safelyWrite(root, dest, contents, force) {
  const parent = dirname(dest);
  assertSafePath(root, parent);
  mkdirSync(parent, {recursive: true});
  assertSafePath(root, dest);
  const realParent = realpathSync(parent);
  assertInside(root, realParent);
  const stat = lstatIfPresent(dest);
  if (stat?.isSymbolicLink()) throw Error('Symlink file refused: ' + dest);
  if (stat && !stat.isFile()) throw Error('Non-file target refused: ' + dest);
  if (stat && !force) throw Error('Already installed: ' + dest + ' (use --force)');

  // NOFOLLOW protects the final file at open-time against symlink swaps.
  // EXCL guarantees that !force never overwrites a newly appearing file.
  // Realpath checks cover existing ancestors; concurrent malicious directory
  // swaps during mkdir/open require an OS-specific openat/dirfd sandbox.
  const flags = constants.O_WRONLY | constants.O_CREAT |
    (constants.O_NOFOLLOW || 0) | (force ? constants.O_TRUNC : constants.O_EXCL);
  const fd = openSync(dest, flags, 0o644);
  try {
    if (!fstatSync(fd).isFile()) throw Error('Refusing to write non-file: ' + dest);
    let offset = 0;
    while (offset < contents.length) offset += writeSync(fd, contents, offset, contents.length - offset);
  } finally {
    closeSync(fd);
  }
}

export function installSkill({ project = '.', agent = 'codex', force = false } = {}) {
  const root = canonicalProject(project);
  const names = agent === 'all' ? Object.keys(targets) : agent.split(',').map(x => x.trim());
  if (!names.length || names.some(name => !Object.hasOwn(targets, name))) {
    throw Error('--agent must be codex, claude, opencode, all or comma-separated names');
  }
  const agents = [...new Set(names)], sourceFiles = listFiles(source), pending = [];

  // PREFLIGHT *all* destinations before the first write, so a preexisting
  // unsafe path for any selected agent cannot cause partial installations.
  for (const name of agents) {
    const dir = join(root, targets[name]);
    assertSafePath(root, dir);
    for (const file of sourceFiles) {
      const dest = join(dir, file);
      assertSafePath(root, dest);
      const stat = lstatIfPresent(dest);
      if (stat && !stat.isFile()) throw Error('Non-file target refused: ' + dest);
      if (stat && !force) throw Error('Already installed: ' + dest + ' (use --force)');
      pending.push({from: join(source, file), dest});
    }
  }
  for (const {from, dest} of pending) safelyWrite(root, dest, readFileSync(from), force);
  return {
    installed: pending.length, agents, project: root,
    next: 'Read .agents/skills/mungtange/SKILL.md (or the corresponding agent directory)',
    policy: 'Only first-party MungTangE skill files copied; upstream catalog entries are references.'
  };
}
