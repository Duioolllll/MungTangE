#!/usr/bin/env node
/** Pure mechanical Visual Critic Loop: actual recorded browser facts only. */
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {resolve,join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {checkComparable,parseFlags} from './visual-capture.mjs';

const widths=[1440,768,390];
const warn='This report measures browser failures and regressions, NOT aesthetic quality. Visual screenshot review is NOT RUN unless images were actually viewed by a human/vision reviewer.';
const sort=(a,b)=>widths.indexOf(a.width)-widths.indexOf(b.width)||a.kind.localeCompare(b.kind);
export function captureIssues(manifest){
 const issues=[];
 for(const width of widths){
  const s=manifest.screens?.find(x=>x.width===width);
  if(!s||s.status==='CAPTURE_FAILED'){
   issues.push({width,kind:'CAPTURE_FAILED',evidence:s?.error||'Missing actual browser capture'});continue;
  }
  if(!Number.isInteger(s.httpStatus)||s.httpStatus<200||s.httpStatus>=400)
   issues.push({width,kind:'HTTP_FAILURE',evidence:'HTTP '+String(s.httpStatus)});
  if(s.horizontalOverflow===true)
   issues.push({width,kind:'HORIZONTAL_OVERFLOW',evidence:'documentWidth '+s.documentWidth+' > viewport '+s.viewportWidth});
  if(typeof s.brokenImages==='number'&&s.brokenImages>0)
   issues.push({width,kind:'BROKEN_IMAGES',evidence:String(s.brokenImages)+' incomplete/broken images'});
  if(Array.isArray(s.pageErrors)&&s.pageErrors.length)
   issues.push({width,kind:'JS_ERRORS',evidence:s.pageErrors.slice(0,4)});
  if(Array.isArray(s.failedRequests)&&s.failedRequests.length)
   issues.push({width,kind:'FAILED_REQUESTS',evidence:s.failedRequests.slice(0,4)});
 }
 return issues.sort(sort);
}
export function compareCritic(before,after){
 const mismatches=checkComparable(before,after);
 if(mismatches.length)throw Error('Different browser capture conditions: '+mismatches.join('; '));
 if(JSON.stringify(before.widths)!==JSON.stringify(widths))throw Error('Expected 1440,768,390 browser captures');
 const earlier=captureIssues(before),later=captureIssues(after);
 const beforeMobile=before.screens?.find(x=>x.width===390);
 const afterMobile=after.screens?.find(x=>x.width===390);
 const beforeSmall=beforeMobile?.smallText||[],afterSmall=afterMobile?.smallText||[];
 const key=x=>x.width+':'+x.kind;
 const start=new Map(earlier.map(x=>[key(x),x]));
 const end=new Map(later.map(x=>[key(x),x]));
 const resolved=earlier.filter(x=>!end.has(key(x)));
 const unresolved=earlier.filter(x=>end.has(key(x)));
 const regressions=later.filter(x=>!start.has(key(x)));
 const captureMissing=later.some(x=>x.kind==='CAPTURE_FAILED');
 return {
  schema:1,status:captureMissing?'NOT RUN':later.length?'FAIL':'PASS',
  reviewScope:'mechanical facts only',visualArtDirectionReview:'NOT RUN',
  viewports:widths,baselineIssues:earlier,afterIssues:later,
  mobileReadability:{beforeCandidateCount:beforeMobile?.smallTextTotal??beforeSmall.length,
   afterCandidateCount:afterMobile?.smallTextTotal??afterSmall.length,
   afterCandidates:afterSmall,
   review:'NOT RUN',note:'Small visible text (below 14px or compact line height at 390px) is a review warning, not a WCAG violation or proof of unreadability.'},
  resolved,unresolved,regressions,
  verdict:later.length===0?'No mechanical failure remains in measured captures; subjective design quality NOT RUN.':'Mechanical problems remain or regressions were observed.',
  warning:warn
 };
}
async function main(){
 const args=parseFlags(process.argv.slice(2));
 if(!args.before||!args.after||!args.out)throw Error('Usage: node scripts/visual-critic.mjs --before DIR --after DIR --out FILE.json');
 const first=JSON.parse(readFileSync(join(resolve(args.before),'manifest.json'),'utf8'));
 const second=JSON.parse(readFileSync(join(resolve(args.after),'manifest.json'),'utf8'));
 const result=compareCritic(first,second);
 const path=resolve(args.out);
 if(!path.endsWith('.json'))throw Error('--out must end in .json');
 if(existsSync(path))throw Error('Report already exists; choose a fresh path');
 mkdirSync(dirname(path),{recursive:true});
 writeFileSync(path,JSON.stringify(result,null,2)+'\n');
 const markdown=['# Visual Critic — mechanical browser observations','','**Mechanical status:** '+result.status,
  '**Subjective brand/visual review:** NOT RUN (requires viewing PNGs)',
  '**390px readability:** '+result.mobileReadability.beforeCandidateCount+' → '+result.mobileReadability.afterCandidateCount+' measured warning candidates; screenshot/zoom review NOT RUN', '',
  '| Viewport | Observed baseline issues | After issues |',
  '| ---: | --- | --- |',
  ...widths.map(width=>{const a=result.baselineIssues.filter(x=>x.width===width).map(x=>x.kind).join(', ')||'None observed';
    const b=result.afterIssues.filter(x=>x.width===width).map(x=>x.kind).join(', ')||'None observed';return '| '+width+' | '+a+' | '+b+' |';}),
  '','Resolved: '+result.resolved.length+'; still open: '+result.unresolved.length+'; regressions: '+result.regressions.length+'.',
  '',result.warning,'','**Human/vision critic observations:** NOT RUN — open and inspect the actual screenshot PNGs.',''];
 writeFileSync(path.slice(0,-5)+'.md',markdown.join('\n'));
 console.log('Mechanical critic: '+result.status+', resolved='+result.resolved.length+', regressions='+result.regressions.length+'. Visual review NOT RUN.');
 if(result.status!=='PASS')process.exitCode=2;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))
 main().catch(e=>{console.error('Visual critic: '+String(e.message||e));process.exitCode=1;});
