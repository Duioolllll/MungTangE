#!/usr/bin/env node
// Verifies source identity and deterministic structural cards, NOT the quality,
// license, runtime safety or current compatibility of upstream skills.
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=p=>JSON.parse(readFileSync(p,'utf8'));
const manifest=read('research/motion-100-sources.json');
const analysis=read('research/motion-100-analysis.json');
assert.equal(manifest.total,100);
assert.equal(manifest.sources.length,100);
assert.equal(analysis.source_count,100);
assert.equal(analysis.read_count,100);
assert.equal(analysis.failed_count,0);
assert.equal(analysis.items.length,100);
assert.equal(analysis.unique_sources,100);
const ids=new Set(), blobs=new Set(),repos=new Set();
for(let i=0;i<100;i++){
 const source=manifest.sources[i],item=analysis.items[i];
 assert.equal(item.id,source.id);
 assert.equal(item.name,source.name);
 assert.equal(item.source_repo,source.source_repo);
 assert.equal(item.path,source.path);
 assert.equal(item.sha,source.sha);
 assert.equal(item.index,i+1);
 assert.equal(item.status,'source_fetched_structural_review');
 assert.ok(Number.isInteger(item.source_lines)&&item.source_lines>3);
 assert.ok(Array.isArray(item.headings)&&item.headings.length>0);
 for(const clue of [...item.headings,...item.technique_cues,...item.qa_cues]){
  assert.ok(Number.isInteger(clue.line)&&clue.line>0&&clue.line<=item.source_lines,item.name);
 }
 assert.ok(/^[0-9a-f]{40}$/.test(source.sha));
 assert.ok(source.path.endsWith('/SKILL.md'));
 assert.ok(source.source_url.includes('/blob/'+source.sha+'/'));
 assert.ok(!ids.has(source.id),'Duplicate source ID '+source.id);
 assert.ok(!blobs.has(source.source_repo+'|'+source.sha),'Duplicate original source '+source.sha);
 ids.add(source.id);blobs.add(source.source_repo+'|'+source.sha);repos.add(source.source_repo);
 const shard='skills/mungtange/references/motion/SOURCES-0'+(Math.floor(i/25)+1)+'.md';
 assert.ok(existsSync(shard));
 const text=readFileSync(shard,'utf8');
 assert.ok(text.includes('## Source '+(i+1)+' — '+source.name),source.name);
 assert.ok(text.includes(source.source_url),source.name);
}
assert.equal(repos.size,5);
const router=readFileSync('skills/mungtange/references/motion/ROUTER.md','utf8');
for(const source of manifest.sources)assert.ok(router.includes(source.source_url),source.name);
const skill=readFileSync('SKILLS.md','utf8');
assert.ok(skill.includes('MOTION-3D.md'));
assert.match(skill,/optional|opt.in/i);
const installed=readFileSync('skills/mungtange/SKILL.md','utf8');
assert.ok(installed.includes('(references/MOTION-3D.md)'));
const guide=readFileSync('skills/mungtange/references/MOTION-3D.md','utf8');
assert.match(guide,/World Bible/i);
assert.match(guide,/390/);
assert.match(guide,/reduced.motion/i);
assert.match(guide,/source.backed|source-backed/i);
assert.ok(guide.includes('motion/ROUTER.md'));
console.log('PASS 100/100 unique SHA-pinned motion SKILL.md files, full source fetch/structure records, 4 local shards and opt-in pipeline contract');
console.log('Scope: provenance and structural consistency only, NOT independent expertise, license, browser quality or current API verification.');
