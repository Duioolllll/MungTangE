import {readFileSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
const dir='skills/mungtange/references/knowledge/';
const data=JSON.parse(readFileSync(dir+'INDEX.json','utf8'));
const manifest=JSON.parse(readFileSync(dir+'MANIFEST.json','utf8'));
const catalog=['design','model-output','web'].flatMap(c=>JSON.parse(readFileSync('catalog/'+c+'.json','utf8')).items);
assert.equal(data.total,300);assert.equal(data.cards.length,300);
assert.equal(new Set(data.cards.map(x=>x.id)).size,300);
assert.equal(manifest.total,300);
const keys=new Map(catalog.map(x=>[x.id,x]));
let verified=0;
for(const card of data.cards){
 const source=keys.get(card.id);assert.ok(source,'Unknown source ID '+card.id);
 assert.equal(card.sha,source.blob_sha);assert.equal(card.repo,source.source_repo);
 assert.equal(card.path,source.source_path);assert.equal(card.name,source.name);
 assert.ok(card.pinned_url.includes('/blob/'+card.sha+'/'),card.id);
 assert.ok(Array.isArray(card.headings)&&Array.isArray(card.steps)&&Array.isArray(card.checks));
 for(const v of [...card.headings,...card.steps,...card.checks,...card.warnings])assert.ok(Number.isInteger(v.line)&&v.line>0,card.id);
 if(card.status==='sha_verified')verified++;
 keys.delete(card.id);
}
assert.equal(keys.size,0);
assert.equal(data.verified,verified);
assert.equal(data.failed,300-verified);
assert.equal(manifest.verified,verified);
const listed=manifest.buckets.flatMap(x=>x.ids);
assert.equal(listed.length,300);
assert.equal(new Set(listed).size,300);
for(const chunk of manifest.buckets){
 assert.ok(chunk.count>=1&&chunk.count<=12,chunk.file);
 assert.equal(chunk.ids.length,chunk.count);
 assert.ok(existsSync(dir+chunk.file),chunk.file);
 const content=readFileSync(dir+chunk.file,'utf8');
 for(const id of chunk.ids)assert.ok(content.includes(data.cards.find(x=>x.id===id).name),id);
}
const router=readFileSync(dir+'ROUTER.md','utf8');
assert.match(router,/300/);
assert.match(router,/NOT 300 deep semantic reviews|NOT expert semantic reviews|not 300 deep semantic reviews/i);
console.log('Verified '+verified+'/300 SHA-pinned source cards across '+manifest.buckets.length+' bounded shards');
if(verified!==300)process.exitCode=1;
