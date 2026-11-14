// Repository-only read-only catalog loader for Pages and integrity checks.
// This is not the removed agent-planning CLI or a runtime dependency of SKILL.md.
import {readFileSync} from 'node:fs';
export const CATEGORIES=Object.freeze(['design','model-output','web']);

export function loadCatalog(){
 const records=[];
 for(const category of CATEGORIES){
  const file=new URL('../catalog/'+category+'.json',import.meta.url);
  const group=JSON.parse(readFileSync(file,'utf8'));
  if(group.category!==category||group.count!==100||group.items?.length!==100)
   throw Error('Catalog integrity failure: '+category);
  records.push(...group.items);
 }
 const ids=new Set();
 for(const item of records){
  if(ids.has(item.id)||!CATEGORIES.includes(item.category)||
     !/^[a-f0-9]{40}$/.test(item.blob_sha)||
     !item.source_path?.endsWith('/SKILL.md')||
     !item.source_url?.startsWith('https://github.com/'))
   throw Error('Bad or duplicate catalog entry: '+item.id);
  ids.add(item.id);
 }
 return records;
}
