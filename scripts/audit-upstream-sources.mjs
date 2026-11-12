/**
 * Archive-only Git blob integrity check for 300 linked upstream SKILL.md files.
 * Downloads text bytes from exact catalog Git SHAs and compares the Git blob
 * SHA-1 digest. Does NOT run scripts, quality-rate, semantically analyze,
 * install or redistribute upstream skill text. The output is research data,
 * never a runtime reference for the installed MungTangE skill.
 */
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
const cats=['design','model-output','web'];
const entries=cats.flatMap(c=>{
 const parsed=JSON.parse(readFileSync('catalog/'+c+'.json','utf8'));
 if(parsed.category!==c||parsed.items?.length!==100)throw Error('Bad catalog '+c);
 return parsed.items;
});
if(entries.length!==300||new Set(entries.map(x=>x.id)).size!==300)throw Error('Expected 300 unique links');
const headers={'Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','User-Agent':'MungTangE-source-integrity'};
if(process.env.GITHUB_TOKEN)headers.Authorization='Bearer '+process.env.GITHUB_TOKEN;
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function inspect(entry){
 let err='';
 for(let attempt=0;attempt<4;attempt++){
  try{
   const response=await fetch(
     'https://api.github.com/repos/'+entry.source_repo+'/git/blobs/'+entry.blob_sha,
     {headers,signal:AbortSignal.timeout(45000)}
   );
   if(!response.ok)throw Error('HTTP '+response.status);
   const data=await response.json();
   if(data.sha!==entry.blob_sha||data.encoding!=='base64'||typeof data.content!=='string')
     throw Error('Git blob metadata mismatch');
   const buf=Buffer.from(data.content.replace(/\s/g,''),'base64');
   const actual=createHash('sha1').update('blob '+buf.length+'\0').update(buf).digest('hex');
   if(actual!==entry.blob_sha)throw Error('Git blob content digest mismatch');
   const full=new TextDecoder('utf-8',{fatal:true}).decode(buf);
   const headings=[...full.matchAll(/^#{1,4}\s+([^\r\n]+)/gm)].slice(0,3).map(m=>m[1].trim().slice(0,110));
   return {status:'read_full_blob',sha_verified:true,bytes:buf.length,headings};
  }catch(e){
   err=String(e.message||e);
   if(attempt<3)await pause(500*(attempt+1)*(attempt+1));
  }
 }
 return {status:'fetch_failed',sha_verified:false,error:err,bytes:0,headings:[]};
}
const result=new Array(entries.length);
let next=0;
async function worker(){
 while(next<entries.length){
  const i=next++;
  const x=entries[i], outcome=await inspect(x);
  result[i]={
   id:x.id,category:x.category,source_repo:x.source_repo,
   source_path:x.source_path,blob_sha:x.blob_sha,...outcome
  };
  if((i+1)%50===0)console.log('Checked '+(i+1)+' source positions');
 }
}
await Promise.all(Array.from({length:6},worker));
const total=result.length,read=result.filter(x=>x.sha_verified).length;
const document={
 generated_at:new Date().toISOString(),
 method:'Automated SHA-pinned Git blob fetch, byte hash check and heading extraction; not a skill quality/safety/semantic assessment',
 total,read,failed:total-read,items:result
};
// One JSON object per line for compact, reviewable provenance.
const content=[
 '{',
 '  "generated_at": '+JSON.stringify(document.generated_at)+',',
 '  "method": '+JSON.stringify(document.method)+',',
 '  "total": '+total+',',
 '  "read": '+read+',',
 '  "failed": '+(total-read)+',',
 '  "items": [',
 ...result.map((x,i)=>'    '+JSON.stringify(x)+(i===result.length-1?'':',')),
 '  ]',
 '}',''
].join('\n');
mkdirSync('research',{recursive:true});
writeFileSync('research/source-audit.json',content);
console.log('Source blob integrity: '+read+'/'+total+' SHA-matched, '+(total-read)+' unavailable. Not a review.');
if(read!==total)process.exitCode=1;
