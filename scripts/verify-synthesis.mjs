import {readFileSync,existsSync} from 'node:fs';
const data=JSON.parse(readFileSync('research/source-audit.json','utf8'));
if(data.total!==300||data.items.length!==300||new Set(data.items.map(x=>x.id)).size!==300)throw Error('Bad corpus size');
let count=0;
for(const item of data.items){
 if(item.status==='read_full_blob'){
  if(!item.sha_verified||!item.bytes||!/^[a-f0-9]{40}$/.test(item.blob_sha))throw Error('Invalid blob evidence '+item.id);
  count++;
 }
}
for(const file of ['KNOWLEDGE-ROUTER.md','DESIGN-DNA.md','WEB-ENGINEERING.md','AGENT-HARNESS.md','SOURCE-INDEX.md']){
 if(!existsSync('skills/mungtange/references/'+file))throw Error('Missing generated '+file);
}
console.log('SHA-verified full-text reads: '+count+'/300');
if(count!==300)process.exitCode=1;
