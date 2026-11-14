import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parseFlags,checkComparable} from '../scripts/visual-capture.mjs';
const root=readFileSync(new URL('../SKILLS.md',import.meta.url),'utf8');
const local=readFileSync(new URL('../skills/mungtange/SKILL.md',import.meta.url),'utf8');
const brand=readFileSync(new URL('../skills/mungtange/references/BRAND-DIRECTION.md',import.meta.url),'utf8');
const loop=readFileSync(new URL('../skills/mungtange/references/VISUAL-LOOP.md',import.meta.url),'utf8');
test('root skill stays short, references are optional, and install links are valid',()=>{
 assert.ok(root.split('\n').length<500);
 assert.equal(root.replaceAll('(skills/mungtange/references/','(references/'),local);
 assert.match(root,/at most two/i);
 for(const name of ['BRAND-DIRECTION.md','VISUAL-LOOP.md']){
  assert.ok(root.includes('skills/mungtange/references/'+name));
  assert.ok(local.includes('(references/'+name+')'));
 }
 assert.match(root,/No reference is mandatory/);
});
test('brand strategy separates framework, SaaS and other archetypes',()=>{
 for(const name of ['Developer framework','B2B SaaS','Open-source library','Developer operations tool','Consumer app'])
  assert.ok(brand.includes(name),name);
 assert.match(brand,/PyNext/);
 assert.match(brand,/experimental|실험/i);
 assert.match(brand,/Next\.js\/React-compatible/i);
 assert.match(brand,/code|Python route/i);
 assert.match(brand,/invented|unverified/i);
 assert.match(brand,/Runtime Blueprint/);
 assert.match(brand,/Builder's Field Notes/);
});
test('visual loop never invents a score or an observed defect',()=>{
 assert.match(loop,/not\*\* aesthetic quality|not aesthetic quality|not a visual quality/i);
 assert.match(loop,/NOT RUN/);
 assert.match(loop,/viewing the PNGs|viewed screenshot|screenshot/i);
 assert.match(loop,/no invented defects|do not invent|never invent/i);
 assert.match(loop,/1440.*768.*390/);
});
test('capture flag grammar and comparison environment mismatch detection',()=>{
 assert.deepEqual(parseFlags(['--url','http://localhost:3000/','--out','.visual-review/before']),
  {url:'http://localhost:3000/',out:'.visual-review/before'});
 assert.throws(()=>parseFlags(['--url']),/Invalid or duplicate/);
 assert.throws(()=>parseFlags(['--out','x','--out','y']),/Invalid or duplicate/);
 const a={url:'http://localhost:3000/',height:900,widths:[1440,768,390],colorScheme:'light'};
 assert.deepEqual(checkComparable(a,{...a}),[]);
 assert.ok(checkComparable(a,{...a,height:600}).length>0);
 assert.ok(checkComparable(a,{...a,colorScheme:'dark'}).length>0);
 assert.ok(checkComparable(a,{...a,widths:[375]}).length>0);
});

import {evaluateCompetition} from '../scripts/brand-competition.mjs';
import {compareCritic,captureIssues} from '../scripts/visual-critic.mjs';

test('three PyNext brand proposals are structurally distinct and selection grounded',()=>{
 const sample=JSON.parse(readFileSync(new URL('../examples/brand-competition-pynext.json',import.meta.url),'utf8'));
 const result=evaluateCompetition(sample);
 assert.equal(result.status,'PASS',result.errors.join('; '));
 assert.equal(sample.directions.length,3);
 assert.equal(result.pairwise.length,3);
 assert.equal(result.winner,'runtime-blueprint');
});
test('palette swaps are not accepted as three design directions',()=>{
 const example=JSON.parse(readFileSync(new URL('../examples/brand-competition-pynext.json',import.meta.url),'utf8'));
 example.directions[1]={...example.directions[0],id:'purple-blueprint',name:'Purple Blueprint'};
 const outcome=evaluateCompetition(example);
 assert.equal(outcome.status,'FAIL');
 assert.ok(outcome.errors.some(x=>x.includes('distinct')));
});
test('no winner or absent identity continuity fails the brand contract',()=>{
 const example=JSON.parse(readFileSync(new URL('../examples/brand-competition-pynext.json',import.meta.url),'utf8'));
 example.decision.winner='none';
 example.brandDNA.motifApplications=['Only in the hero'];
 const outcome=evaluateCompetition(example);
 assert.equal(outcome.status,'FAIL');
 assert.ok(outcome.errors.some(x=>x.includes('winner')));
 assert.ok(outcome.errors.some(x=>x.includes('motif')));
});
test('visual critic catches measured failures and successful repair without inventing aesthetic scores',()=>{
 const make=(overflow=false,errors=[])=>({
  url:'http://localhost:3000/',height:900,widths:[1440,768,390],
  browserVersion:'144.0',colorScheme:'light',waitMs:100,reducedMotion:'reduce',
  screens:[1440,768,390].map(width=>({
   width,httpStatus:200,viewportWidth:width,documentWidth:width+(overflow&&width===390?430:0),
   horizontalOverflow:overflow&&width===390,brokenImages:0,pageErrors:width===390?errors:[],failedRequests:[]
  }))
 });
 const before=make(true),after=make(false);
 const outcome=compareCritic(before,after);
 assert.equal(outcome.status,'PASS');
 assert.equal(outcome.resolved.length,1);
 assert.equal(outcome.regressions.length,0);
 assert.equal(outcome.visualArtDirectionReview,'NOT RUN');
 assert.equal(captureIssues(after).length,0);
 const broken=compareCritic(after,make(false,['Uncaught error']));
 assert.equal(broken.status,'FAIL');
 assert.equal(broken.regressions[0].kind,'JS_ERRORS');
 assert.throws(()=>compareCritic(before,{...after,waitMs:800}),/Different browser/);
});

// Evidence-rich brand identity contract (structure only; real authorship needs review).
test('brand identity cannot be silently replaced by generic developer styling',()=>{
 const sample=JSON.parse(readFileSync(new URL('../examples/brand-competition-pynext.json',import.meta.url),'utf8'));
 assert.equal(evaluateCompetition(sample).status,'PASS');
 sample.project.identitySignals=[];
 assert.equal(evaluateCompetition(sample).status,'FAIL');
 assert.match(evaluateCompetition(sample).errors.join(' '),/Identity evidence/);
});
test('rejects generic swap claims and identical content structures',()=>{
 const sample=JSON.parse(readFileSync(new URL('../examples/brand-competition-pynext.json',import.meta.url),'utf8'));
 sample.brandDNA.substitutionTest.fails=[];
 assert.match(evaluateCompetition(sample).errors.join(' '),/Substitution test/);
 sample.brandDNA.substitutionTest.fails=[{element:'Distinct Python hero',reason:'A different project lacks the documented routing details'},{element:'Exact source snippet',reason:'A different project does not expose the same page API'}];
 sample.directions[1].contentOutline=[...sample.directions[0].contentOutline];
 assert.match(evaluateCompetition(sample).errors.join(' '),/contentOutline/);
});
