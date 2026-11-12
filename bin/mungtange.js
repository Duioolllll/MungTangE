#!/usr/bin/env node
import { loadCatalog, listSkills, selectSkills, CATEGORIES } from '../src/catalog.js';
import { scanProject } from '../src/project.js';
import { createPlan, makeStagePrompt, evaluateStage, verifyWorkspace, STAGES } from '../src/pipeline.js';
import { installSkill } from '../src/install.js';

function parseArgs(argv) {
  const options = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith('--')) { options._.push(arg); continue; }
    const equals = arg.indexOf('=');
    const key = equals === -1 ? arg.slice(2) : arg.slice(2, equals);
    if (equals !== -1) { options[key] = arg.slice(equals + 1); continue; }
    if (['force', 'json', 'help'].includes(key)) options[key] = true;
    else options[key] = argv[++i] ?? '';
  }
  return options;
}
function help() {
  console.log([
    'MungTangE · 300 referenced SKILL.md sources + evidence-gated design pipeline',
    '',
    'Commands:',
    '  doctor [--project .] [--json]',
    '  catalog [--category design|model-output|web] [--search text] [--limit 20] [--json]',
    '  init [--agent codex|claude|opencode|all] [--project .] [--force]',
    '  plan --goal "Describe the outcome" [--project .] [--per-category 4] [--force]',
    '  prompt --stage brief|research|system|build|audit|ship [--project .]',
    '  gate --stage <stage> [--project .] [--json]',
    '  verify [--project .] [--json]',
    '',
    'No network activity, upstream skill execution, or model API calls occur.',
    'npx --yes github:Duioolllll/MungTangE init --agent all'
  ].join('\n'));
}
function show(value, json) {
  if (json) console.log(JSON.stringify(value, null, 2));
  else if (typeof value === 'string') console.log(value);
  else console.log(JSON.stringify(value, null, 2));
}
async function main() {
  const [command = 'help', ...rest] = process.argv.slice(2);
  const args = parseArgs(rest);
  const project = args.project || '.';
  if (args.help || command === 'help' || command === '--help') return help();
  if (command === 'doctor') {
    const profile = scanProject(project);
    const catalog = loadCatalog();
    return show({ ok: Number(process.versions.node.split('.')[0]) >= 20, node: process.versions.node,
      catalog: catalog.length, categories: CATEGORIES, profile, stages: STAGES }, args.json);
  }
  if (command === 'catalog') {
    const category = args.category || 'all';
    if (category !== 'all' && !CATEGORIES.includes(category)) throw Error('Unknown category: ' + category);
    return show(listSkills({ category, search: args.search, limit: args.limit }), args.json);
  }
  if (command === 'init') return show(installSkill({ project, agent: args.agent || 'codex',
    force: !!args.force }), args.json);
  if (command === 'plan') {
    if (!args.goal || !args.goal.trim()) throw Error('Use --goal "specific outcome"');
    const profile = scanProject(project);
    const perCategory = Math.min(8, Math.max(1, Number(args['per-category']) || 4));
    const selected = selectSkills({ goal: args.goal, profile, perCategory });
    return show(createPlan({ project, goal: args.goal, profile, selected, force: !!args.force }), args.json);
  }
  if (command === 'prompt') return show(makeStagePrompt({ project, stage: args.stage || args._[0] }), args.json);
  if (command === 'gate') {
    const result = evaluateStage({ project, stage: args.stage || args._[0] });
    show(result, args.json); if (!result.ok) process.exitCode = 2; return;
  }
  if (command === 'verify') {
    const result = verifyWorkspace({ project });
    show(result, args.json); if (!result.ok) process.exitCode = 2; return;
  }
  throw Error('Unknown command: ' + command + '. Run mungtange help.');
}
main().catch(error => { console.error('MungTangE error: ' + error.message); process.exitCode = 1; });
