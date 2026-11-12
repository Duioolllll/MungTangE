import {readFileSync, existsSync} from 'node:fs';
import assert from 'node:assert/strict';
const d=JSON.parse(readFileSync('research/source-audit.json','utf8'));
assert.equal(d.total,300);
assert.equal(d.items?.length,300);
const catalog=['design','model-output','web'].flatMap(c=>
  JSON.parse(readFileSync('catalog/'+c+'.json','utf8')).items);
const byId=new Map(catalog.map(x=>[x.id,x]));
assert.equal(byId.size,300);
let verified=0;
for(const x of d.items){
 const source=byId.get(x.id);
 assert.ok(source,'Unknown audit id: '+x.id);
 assert.equal(x.source_repo,source.source_repo);
 assert.equal(x.source_path,source.source_path);
 assert.equal(x.blob_sha,source.blob_sha);
 assert.match(x.blob_sha,/^[a-f0-9]{40}$/);
 if(x.status==='read_full_blob'){
  assert.equal(x.sha_verified,true);
  assert.ok(x.bytes>0);
  verified++;
 }
 byId.delete(x.id);
}
assert.equal(byId.size,0);
assert.equal(d.read,verified);
assert.equal(d.failed,300-verified);
for(const f of ['DEEP-INTEGRATION.md','PLAYBOOKS.md','QUALITY.md','SECURITY.md']){
 assert.ok(existsSync('skills/mungtange/references/'+f),'Missing optional reference '+f);
}
assert.ok(existsSync('docs/SOURCE-AUDIT.md'));
console.log('Archived source integrity: '+verified+'/300 SHA-checked entries (not quality reviews)');
if(verified!==300)process.exitCode=1;
