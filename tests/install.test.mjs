import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,symlinkSync,rmSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {installSkill} from '../src/install.js';

function withTemp(fn) {
  const root=mkdtempSync(join(tmpdir(),'mungtange-install-'));
  try{return fn(root);}finally{rmSync(root,{recursive:true,force:true});}
}
test('ordinary installation copies installable skill and required references',()=>{
 withTemp(root=>{
  const result=installSkill({project:root,agent:'codex'});
  assert.ok(result.installed>=2);
  const base=join(root,'.agents','skills','mungtange');
  assert.match(readFileSync(join(base,'SKILL.md'),'utf8'),/name: mungtange/);
  assert.ok(existsSync(join(base,'references','DEEP-INTEGRATION.md')));
  assert.throws(()=>installSkill({project:root,agent:'codex'}),/Already installed/);
  assert.doesNotThrow(()=>installSkill({project:root,agent:'codex',force:true}));
 });
});
test('refuses first-level symlinked install ancestry',()=>{
 withTemp(root=>{
  const outside=join(root,'out');mkdirSync(outside);
  const project=join(root,'project');mkdirSync(project);
  symlinkSync(outside,join(project,'.agents'),'dir');
  assert.throws(()=>installSkill({project,agent:'codex'}),/Symlink ancestor/);
  assert.equal(existsSync(join(outside,'skills')),false);
 });
});
test('refuses deeper intermediate symlink including references directory',()=>{
 withTemp(root=>{
  const project=join(root,'project');mkdirSync(project);
  const outside=join(root,'out');mkdirSync(outside);
  const prefix=join(project,'.agents','skills','mungtange');
  mkdirSync(prefix,{recursive:true});
  symlinkSync(outside,join(prefix,'references'),'dir');
  assert.throws(()=>installSkill({project,agent:'codex'}),/Symlink ancestor/);
  assert.equal(existsSync(join(outside,'DEEP-INTEGRATION.md')),false);
 });
});
test('refuses dangling intermediate symlink (existsSync alone misses this)',()=>{
 withTemp(root=>{
  const project=join(root,'project');mkdirSync(project);
  const prefix=join(project,'.claude');mkdirSync(prefix);
  symlinkSync(join(root,'does-not-exist'),join(prefix,'skills'),'dir');
  assert.throws(()=>installSkill({project,agent:'claude'}),/Symlink ancestor/);
 });
});
test('preflights all selected agents before writing any files',()=>{
 withTemp(root=>{
  const project=join(root,'project');mkdirSync(project);
  const outside=join(root,'outside');mkdirSync(outside);
  symlinkSync(outside,join(project,'.opencode'),'dir');
  assert.throws(()=>installSkill({project,agent:'all'}),/Symlink ancestor/);
  assert.equal(existsSync(join(project,'.agents')),false);
  assert.equal(existsSync(join(project,'.claude')),false);
 });
});
test('refuses symlinked destination file even when force is enabled',()=>{
 withTemp(root=>{
  const project=join(root,'project');mkdirSync(project);
  const base=join(project,'.agents','skills','mungtange');mkdirSync(base,{recursive:true});
  const victim=join(root,'victim');writeFileSync(victim,'DO NOT TOUCH');
  symlinkSync(victim,join(base,'SKILL.md'),'file');
  assert.throws(()=>installSkill({project,agent:'codex',force:true}),/Symlink ancestor/);
  assert.equal(readFileSync(victim,'utf8'),'DO NOT TOUCH');
 });
});
test('rejects explicitly symlinked project root',()=>{
 withTemp(root=>{
  const original=join(root,'real');mkdirSync(original);
  symlinkSync(original,join(root,'link'),'dir');
  assert.throws(()=>installSkill({project:join(root,'link')}),/Project directory/);
 });
});
