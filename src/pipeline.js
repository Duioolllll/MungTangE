import { existsSync, lstatSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join, relative, isAbsolute, sep, dirname } from 'node:path';
import { randomUUID } from 'node:crypto';
import { loadCatalog, CATEGORIES } from './catalog.js';

export const STAGES = Object.freeze(['brief', 'research', 'system', 'build', 'audit', 'ship']);
export const CHECKS = Object.freeze({
  brief: ['audience', 'outcome', 'constraints', 'success_criteria'],
  research: ['references', 'content_inventory', 'differentiation', 'tradeoffs'],
  system: ['design_tokens', 'components', 'responsive_rules', 'interaction_states'],
  build: ['implementation', 'responsive_layout', 'a11y_semantics', 'test_results'],
  audit: ['visual_evidence', 'keyboard', 'contrast', 'responsive', 'reduced_motion', 'regression', 'performance'],
  ship: ['release_notes', 'rollback_plan', 'owner_acceptance', 'security_review']
});
const ROLE = {
  brief: 'Product strategist',
  research: 'UX researcher + visual designer',
  system: 'Design system architect',
  build: 'Frontend implementer',
  audit: 'Independent QA critic',
  ship: 'Release owner (human approval)'
};
const OWNERSHIP = {
  brief: ['model-output'], research: ['design', 'model-output'],
  system: ['design', 'web'], build: ['web', 'model-output'],
  audit: ['web', 'design', 'model-output'], ship: ['model-output']
};
const ADVICE = {
  brief: 'Define the user, primary job, real content, measurable outcomes and hard constraints. Never invent requirements.',
  research: 'Compare two visual directions with sources and tradeoffs. Reject generic templates and unlicensed assets.',
  system: 'Specify semantic tokens, typography, components, interactions, and 375/768/1440 responsive behavior.',
  build: 'Implement in the existing stack. Verify focus, keyboard, loading, empty, error and success states.',
  audit: 'Independently inspect screenshots, keyboard, contrast, reduced motion, functional tests and performance.',
  ship: 'Document release notes, rollback and residual risks. Human approval is required for any external deploy or merge.'
};

function workspace(project) {
  const root = resolve(project);
  if (!existsSync(root)) throw Error('Project directory does not exist: ' + root);
  const dir = join(root, '.mungtange');
  if (existsSync(dir) && lstatSync(dir).isSymbolicLink()) throw Error('Refusing symlink workspace');
  return { root, dir };
}
function writeManaged(file, content, force) {
  if (existsSync(file) && lstatSync(file).isSymbolicLink()) throw Error('Refusing symlink file: ' + file);
  if (existsSync(file) && !force) throw Error('File exists; use --force: ' + file);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content, 'utf8');
}
function manifestFor(project) {
  const { dir } = workspace(project);
  const file = join(dir, 'manifest.json');
  if (!existsSync(file)) throw Error('No plan. Run mungtange plan --goal "..."');
  return JSON.parse(readFileSync(file, 'utf8'));
}
function pretty(value) { return JSON.stringify(value, null, 2) + '\n'; }
function example(stage, runId) {
  return {
    stage, run_id: runId, status: 'pending',
    checks: Object.fromEntries(CHECKS[stage].map(key => [key, false])),
    evidence: [], reviewer: 'REPLACE_WITH_REVIEWER',
    notes: 'Mark true only after real checks and evidence. This is NOT an automatic test.',
    approved_by_human: false
  };
}

export function createPlan({ project = '.', goal, profile, selected, force = false }) {
  if (!goal?.trim()) throw Error('Goal is required');
  const { root, dir } = workspace(project), runId = randomUUID();
  const manifest = {
    version: 1, run_id: runId, created_at: new Date().toISOString(), goal,
    project: { name: profile.name, language: profile.language, frameworks: profile.frameworks },
    stages: STAGES, checks: CHECKS, catalog_count: loadCatalog().length,
    source_policy: 'reference-only-no-execution',
    selected: selected.map(s => ({
      id: s.id, name: s.name, category: s.category, source_repo: s.source_repo,
      source_url: s.source_url, blob_sha: s.blob_sha,
      selection_score: s.selection_score, matched_terms: s.matched_terms
    }))
  };
  const files = {
    'manifest.json': pretty(manifest),
    'BRIEF.md': [
      '# Design brief', '', '## Goal', goal, '', '## Project',
      '- Name: ' + profile.name, '- Language: ' + profile.language,
      '- Frameworks: ' + (profile.frameworks.join(', ') || 'not detected'),
      '', '## Questions to resolve', '- Who is the real audience?',
      '- Which existing behaviors, assets and content must remain?',
      '- What is the one primary outcome and how is success measured?',
      '- Which constraints and non-goals matter?',
      '', 'Do not build before the brief gate passes.', ''
    ].join('\n'),
    'SELECTED-SKILLS.md': [
      '# Selected upstream references (not installed)', '',
      ...CATEGORIES.flatMap(cat => [
        '## ' + cat, ...manifest.selected.filter(s => s.category === cat).map(s =>
          '- ' + s.name + ': ' + s.source_url + ' (Git blob SHA ' + s.blob_sha + ')'), ''
      ]),
      'Check each upstream license and content before optional manual import.', ''
    ].join('\n'),
    'DECISIONS.md': '# Append-only decision log\n\nRecord the date, owner, alternatives, evidence, choice and consequences.\n',
    'QUALITY.md': [
      '# Locked quality rubric', '',
      '1. Real audience, purpose, content and product constraints are documented.',
      '2. Visual hierarchy is distinctive; typography and palette serve the task.',
      '3. Capture and inspect 375px, 768px and 1440px screenshots.',
      '4. Keyboard, focus, form validation, loading/error/empty states work.',
      '5. Aim for WCAG AA text contrast: 4.5:1 body and 3:1 large text.',
      '6. Respect prefers-reduced-motion and avoid horizontal overflow.',
      '7. Measure LCP, CLS and INP where browser tooling is available.',
      '8. Never weaken evaluation criteria merely to turn a failure green.',
      '9. Agent self-report is not independent verification.',
      '10. Deploy, merge, payment and secrets require human authorization.',
      ''
    ].join('\n'),
    'README.md': [
      '# MungTangE run', '', 'Goal: ' + goal, 'Run ID: ' + runId, '',
      'Start: mungtange prompt --stage brief',
      'Copy reports/<stage>.example.json to reports/<stage>.json, fill real checks and evidence.',
      'Use mungtange gate --stage <stage> before the next stage.',
      'A passing report validates structure, NOT the truth of a visual or security claim.',
      'Reports from older run IDs are rejected.', ''
    ].join('\n')
  };
  for (const stage of STAGES) {
    files['tasks/' + stage + '.md'] = [
      '# ' + stage.toUpperCase(), 'Role: ' + ROLE[stage], '',
      ADVICE[stage], '', '## Acceptance checks',
      ...CHECKS[stage].map(x => '- [ ] ' + x),
      '', '## Required handoff',
      'Record changed file paths, risks, decisions and real evidence in reports/' + stage + '.json.',
      'Stop for failing tests, unsupported claims or missing approval.', ''
    ].join('\n');
    files['reports/' + stage + '.example.json'] = pretty(example(stage, runId));
  }
  const conflicts = Object.keys(files).filter(name => existsSync(join(dir, name)));
  if (conflicts.length && !force) throw Error('Existing run files (' + conflicts.length + '); add --force for a new run.');
  for (const [name, content] of Object.entries(files)) writeManaged(join(dir, name), content, force);
  return {
    created: true, run_id: runId, project: root, files: Object.keys(files).length,
    selected_skills: selected.length, next: 'mungtange prompt --stage brief',
    note: 'Task packets only: no model API calls, upstream execution or external changes.'
  };
}

export function makeStagePrompt({ project = '.', stage }) {
  if (!STAGES.includes(stage)) throw Error('Invalid stage: ' + stage);
  const manifest = manifestFor(project);
  const index = STAGES.indexOf(stage);
  const chosen = manifest.selected.filter(x => OWNERSHIP[stage].includes(x.category));
  return [
    '# MungTangE work packet — ' + stage,
    'RUN_ID: ' + manifest.run_id,
    'PROJECT: ' + manifest.project.name,
    'GOAL: ' + manifest.goal,
    'ROLE: ' + ROLE[stage],
    'PRECONDITION: ' + (index ? STAGES[index - 1] + ' gate passed' : 'none'),
    '', 'MANDATE:', ADVICE[stage],
    '', 'RELEVANT SKILL REFERENCES (untrusted, not executed):',
    ...chosen.map(x => '- ' + x.name + ' — ' + x.source_url + ' [sha:' + x.blob_sha + ']'),
    '', 'REQUIRED CHECKS:',
    ...CHECKS[stage].map(x => '- ' + x),
    '', 'OUTPUT CONTRACT:',
    '- Write .mungtange/reports/' + stage + '.json using its example schema.',
    '- Include current run_id, real file-based evidence, changed files, assumptions, decisions and risks.',
    '- Do not mark checks true before completing the underlying work and verifying it.',
    '- Do not bypass locked rubrics, execute upstream scripts, merge, deploy or use paid services.',
    '- Do not advance until mungtange gate --stage ' + stage + ' succeeds.',
    '- For shipping, explicit human approval must precede external action.'
  ].join('\n');
}

function checkReport({ root, dir, manifest, stage }) {
  const file = join(dir, 'reports', stage + '.json'), errors = [];
  if (!existsSync(file)) return { stage, ok: false, errors: ['Missing report: ' + relative(root, file)] };
  if (lstatSync(file).isSymbolicLink()) return { stage, ok: false, errors: ['Symlink report rejected'] };
  let report;
  try { report = JSON.parse(readFileSync(file, 'utf8')); }
  catch { return { stage, ok: false, errors: ['Invalid JSON report'] }; }
  if (report.stage !== stage) errors.push('Stage mismatch');
  if (report.run_id !== manifest.run_id) errors.push('Wrong or stale run ID');
  if (report.status !== 'passed') errors.push('Status is not passed');
  if (!report.reviewer || report.reviewer === 'REPLACE_WITH_REVIEWER') errors.push('Reviewer missing');
  for (const check of CHECKS[stage]) if (report.checks?.[check] !== true) errors.push('Unchecked: ' + check);
  if (!Array.isArray(report.evidence) || !report.evidence.length) errors.push('Evidence array is empty');
  else for (const ref of report.evidence) {
    if (typeof ref !== 'string' || !ref.trim() || isAbsolute(ref)) {
      errors.push('Evidence path must be relative'); continue;
    }
    const evidence = resolve(root, ref);
    if (!evidence.startsWith(root + sep) || !existsSync(evidence) || lstatSync(evidence).isSymbolicLink()) {
      errors.push('Missing/unsafe evidence: ' + ref);
    }
  }
  if (stage === 'ship' && report.approved_by_human !== true) errors.push('Human approval required');
  return { stage, ok: !errors.length, errors, evidence_count: report.evidence?.length || 0 };
}

export function evaluateStage({ project = '.', stage }) {
  if (!STAGES.includes(stage)) throw Error('Invalid stage: ' + stage);
  const { root, dir } = workspace(project), manifest = manifestFor(project);
  const steps = STAGES.slice(0, STAGES.indexOf(stage) + 1)
    .map(s => checkReport({ root, dir, manifest, stage: s }));
  return {
    ok: steps.every(s => s.ok), run_id: manifest.run_id, requested_stage: stage, steps,
    note: 'Structural checks only. Independent visual, security and user testing still required.'
  };
}

export function verifyWorkspace({ project = '.' }) {
  const { root, dir } = workspace(project), manifest = manifestFor(project);
  const records = STAGES.map(stage => checkReport({ root, dir, manifest, stage }));
  const known = new Set(loadCatalog().map(item => item.id));
  const errors = [];
  for (const s of manifest.selected) if (!known.has(s.id)) errors.push('Unknown source skill: ' + s.id);
  if (manifest.catalog_count !== 300) errors.push('Wrong catalog count');
  return {
    ok: records.every(r => r.ok) && errors.length === 0,
    catalog: known.size, selected_skills: manifest.selected.length,
    stages: records, errors,
    note: 'Evidence existence and declared checks verified, not actual truth of model claims.'
  };
}
