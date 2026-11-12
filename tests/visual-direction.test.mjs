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
 assert.match(loop,/does not certify visual quality|not a magical visual-quality grader/i);
 assert.match(loop,/NOT RUN/);
 assert.match(loop,/actual PNG|viewed screenshots|viewing images/i);
 assert.match(loop,/never invent|do not.*invent|not an invented/i);
 assert.match(loop,/375.*768.*1440/);
});
test('capture flag grammar and comparison environment mismatch detection',()=>{
 assert.deepEqual(parseFlags(['--url','http://localhost:3000/','--out','.visual-review/before']),
  {url:'http://localhost:3000/',out:'.visual-review/before'});
 assert.throws(()=>parseFlags(['--url']),/Invalid or duplicate/);
 assert.throws(()=>parseFlags(['--out','x','--out','y']),/Invalid or duplicate/);
 const a={url:'http://localhost:3000/',height:900,widths:[375,768,1440],colorScheme:'light'};
 assert.deepEqual(checkComparable(a,{...a}),[]);
 assert.ok(checkComparable(a,{...a,height:600}).length>0);
 assert.ok(checkComparable(a,{...a,colorScheme:'dark'}).length>0);
 assert.ok(checkComparable(a,{...a,widths:[375]}).length>0);
});
