/**
 * Offline indexes and conservative duplicate candidates for the 300 exact
 * source cards. Signals are NOT semantic proof of equivalence; never delete
 * one source or overwrite its method based on lexical similarity alone.
 */
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const root='skills/mungtange/references/knowledge/';
const data=JSON.parse(readFileSync(root+'INDEX.json','utf8'));
const manifest=JSON.parse(readFileSync(root+'MANIFEST.json','utf8'));
const cards=data.cards;
if(cards.length!==300||manifest.total!==300)throw Error('300 verified cards needed');
const map=new Map(manifest.buckets.flatMap(b=>b.ids.map(id=>[id,b.file])));
const table=['# Exact source-name index — 300 upstream SKILL.md files','',
 '> Lookup table for the installed skill. This is a navigation layer over 300 machine-generated source cards, NOT a list of expert-validated instructions. Never load it for routine work.','',
 '| Upstream skill | Area | Local capsule | Exact original |',
 '| --- | --- | --- | --- |'];
for(const c of [...cards].sort((a,b)=>a.name.localeCompare(b.name)||a.repo.localeCompare(b.repo))){
 const file=map.get(c.id);
 if(!file)throw Error('Missing shard for '+c.id);
 table.push('| '+c.name.replaceAll('|','\\|')+' | '+c.lane+' | ['+file+']('+file+') | [pinned SHA]('+c.pinned_url+') |');
}
writeFileSync(root+'NAME-INDEX.md',table.join('\n')+'\n');

const normalized=new Map();
for(const c of cards){
 const key=c.name.toLowerCase().replace(/[^a-z0-9]+/g,'');
 normalized.set(key,[...(normalized.get(key)||[]),c]);
}
const sameNames=[...normalized].filter(([key,items])=>items.length>1)
 .map(([key,items])=>({normalized_name:key,ids:items.map(x=>x.id),source_urls:items.map(x=>x.pinned_url)}));
const sameSHA=new Map();
for(const c of cards)sameSHA.set(c.sha,[...(sameSHA.get(c.sha)||[]),c]);
const exactIdentical=[...sameSHA].filter(([sha,items])=>items.length>1)
 .map(([sha,items])=>({sha,ids:items.map(x=>x.id)}));

const tokens=c=>new Set([
 ...(c.headings||[]).flatMap(x=>x.title.toLowerCase().split(/[^a-z0-9]+/)),
 ...(c.steps||[]).flatMap(x=>x.terms)
].filter(x=>x.length>=5));
const sets=cards.map(tokens),near=[];
for(let i=0;i<cards.length;i++)for(let j=i+1;j<cards.length;j++){
 if(cards[i].lane!==cards[j].lane||sets[i].size<8||sets[j].size<8)continue;
 const a=sets[i],b=sets[j],inter=[...a].filter(x=>b.has(x)).length;
 const jaccard=inter/(a.size+b.size-inter);
 if(jaccard>=0.55)near.push({a:cards[i].id,b:cards[j].id,lane:cards[i].lane,jaccard:Math.round(jaccard*1000)/1000});
}
near.sort((a,b)=>b.jaccard-a.jaccard);
const report={
 source_count:300,algorithm:'Same SHA, normalized title, or same-lane heading/action token Jaccard >=0.55. Candidate-only; NOT semantic redundancy proof.',
 exact_sha_groups:exactIdentical,name_collision_groups:sameNames,lexical_similarity_candidates:near,
 any_remove_automatically:false
};
mkdirSync('research',{recursive:true});
writeFileSync('research/knowledge-overlaps.json',JSON.stringify(report,null,2)+'\n');
const md=[
 '# Candidate overlap report — NOT automated skill deletion','',
 'The 300 skills remain discoverable. This report helps decide where human semantic deduplication may improve the final curated guidance. It is not a quality score.','',
 '- Exact identical blob groups: '+exactIdentical.length,
 '- Same normalized skill-name collisions: '+sameNames.length,
 '- Same-lane lexical near-overlap candidates (>=0.55 Jaccard): '+near.length,
 '- Automatic removals: **0**','',
 '## Same-name candidates','',
 ...(sameNames.length?sameNames.map(x=>'- '+x.normalized_name+': '+x.ids.join(' vs ')):['None.']),
 '',
 '## Similar procedural outlines','',
 ...(near.length?near.map(x=>'- '+x.a+' vs '+x.b+'; Jaccard '+x.jaccard):['None.']),
 '',
 '**Interpretation:** A collision does not mean two skills teach the same technique, and different titles do not imply unique advice. Full semantic comparison of all 300 requires the opt-in model-assisted review plus independent QA.',''
];
writeFileSync('docs/KNOWLEDGE-OVERLAPS.md',md.join('\n'));
console.log('300-name index compiled: '+sameNames.length+' name collisions, '+near.length+' possible lexical near-overlaps');
