#!/usr/bin/env node
/**
 * Optional sanity-check for three competing brand directions. This validates
 * evidence structure, distinct fields and the decision trail, NOT artistic
 * superiority. Core SKILL.md never requires structured JSON.
 */
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const own=x=>typeof x==='object'&&x!==null&&!Array.isArray(x);
const str=x=>typeof x==='string'&&x.trim().length>=12;
const clean=x=>typeof x==='string'?x.toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim():'';
const core=['narrative','heroLayout','motif','proof'];
const criteria=['productFit','proofCredibility','distinctiveness','readability','implementationCost'];
const outline=x=>Array.isArray(x)&&x.length>=3&&x.every(str);
const identity=x=>own(x)&&str(x.signal)&&str(x.source)&&str(x.designDecision);
const links=x=>own(x)&&str(x.signal)&&str(x.treatment)&&str(x.section);

export function evaluateCompetition(data){
 const errors=[],pairwise=[];
 if(!own(data)||!own(data.project)||!str(data.project.name)||!str(data.project.audience)||!str(data.project.goal))
  errors.push('Project must name the product, intended audience and goal');
 const signals=data?.project?.identitySignals;
 if(!Array.isArray(signals)||signals.length<3||!signals.every(identity))
  errors.push('Identity evidence: >=3 real signal/source/designDecision entries required');
 else if(new Set(signals.map(x=>clean(x.signal))).size<3)
  errors.push('Identity evidence must contain three distinct project/owner signals');
 const directions=Array.isArray(data?.directions)?data.directions:[];
 if(directions.length!==3)errors.push('Exactly three directions required for competition');
 const ids=directions.map(x=>x?.id);
 if(new Set(ids).size!==3||ids.some(x=>typeof x!=='string'||!/^[a-z][a-z0-9-]+$/.test(x)))
  errors.push('Every direction needs a unique stable lowercase id');
 for(const d of directions){
  if(!own(d)){errors.push('Direction must be an object');continue;}
  for(const k of ['name','thesis','narrative','heroLayout','motif','proof','risk','responsive390']){
   if(!str(d[k]))errors.push(d.id+': missing specific '+k);
  }
  if(!outline(d.contentOutline))errors.push(d.id+': need a concrete ordered contentOutline with >=3 sections');
  if(!own(d.typography)||!['display','body','code'].every(k=>str(d.typography[k])))
   errors.push(d.id+': specify distinct typography display/body/code roles');
  if(!own(d.cta)||!str(d.cta.primary)||!str(d.cta.secondary))
   errors.push(d.id+': specify true primary and secondary CTA behavior');
  if(!own(d.evidence)||!str(d.evidence.reference)||!str(d.evidence.claim))
   errors.push(d.id+': need source-backed proof and grounded reference');
 }
 for(let i=0;i<directions.length;i++)for(let j=i+1;j<directions.length;j++){
  const a=directions[i],b=directions[j];
  if(!own(a)||!own(b))continue;
  const dimensions=[
   ...core.map(k=>[k,clean(a[k])!==clean(b[k])]),
   ['typography',clean(a.typography?.display)!==clean(b.typography?.display)],
   ['cta',clean(a.cta?.primary)!==clean(b.cta?.primary)],
   ['contentOutline',clean((a.contentOutline||[]).join(' | '))!==clean((b.contentOutline||[]).join(' | '))]
  ];
  const differing=dimensions.filter(([,different])=>different).map(([k])=>k);
  const mustChange=clean(a.narrative)!==clean(b.narrative)||clean(a.heroLayout)!==clean(b.heroLayout);
  pairwise.push({directions:[a.id,b.id],differentDimensions:differing});
  if(differing.length<4||!mustChange||!differing.includes('contentOutline'))
   errors.push(a.id+' vs '+b.id+': need >=4 distinct substantive dimensions, including narrative/hero and ordered contentOutline');
 }
 const decision=data?.decision;
 if(!own(decision)||!ids.includes(decision.winner)||!str(decision.why))
  errors.push('Select a valid winner with project-grounded rationale');
 if(!own(decision?.comparison))errors.push('Require evidence-based decision comparison');
 for(const c of criteria){
  const row=decision?.comparison?.[c];
  if(!own(row)||directions.some(d=>!str(row[d.id])))
   errors.push('Comparison '+c+' needs a concrete reason for all three directions');
 }
 if(!own(decision?.losingStrengths)||directions.filter(d=>d.id!==decision?.winner).some(d=>!str(decision.losingStrengths[d.id])))
  errors.push('Explain one strength of each rejected direction');
 const dna=data?.brandDNA;
 if(!own(dna))errors.push('Selected direction needs Brand DNA');
 else{
  for(const key of ['positioning','typography','colors','signatureMotif','layoutGrammar','proofStyle','interaction','responsive390'])
   if(!str(dna[key]))errors.push('Brand DNA missing '+key);
  if(!Array.isArray(dna.motifApplications)||dna.motifApplications.length<2||!dna.motifApplications.every(str))
   errors.push('Brand motif must be used in at least two meaningful places');
  if(!Array.isArray(dna.antiTemplates)||dna.antiTemplates.length<2||!dna.antiTemplates.every(str))
   errors.push('Set concrete anti-template constraints');
  if(!str(dna.contentVoice)||!str(dna.signatureContent))
   errors.push('Brand DNA needs a project-grounded editorial voice and signature content');
  if(!Array.isArray(dna.identityLinks)||dna.identityLinks.length<3||!dna.identityLinks.every(links)||
     new Set(dna.identityLinks?.map(x=>clean(x.section))).size<2)
   errors.push('Brand DNA requires >=3 grounded identity links across multiple page sections');
  const swap=dna.substitutionTest;
  if(!own(swap)||!str(swap.replacement)||!Array.isArray(swap.fails)||swap.fails.length<2||
     !swap.fails.every(x=>own(x)&&str(x.element)&&str(x.reason)))
   errors.push('Substitution test needs a different hypothetical owner/project and >=2 specific elements that fail the swap');
 }
 return {status:errors.length?'FAIL':'PASS',errors,pairwise,winner:decision?.winner||null,
  notice:'Structural evidence only. Identity truth, meaningful authorship, semantic difference, actual renders, readability and working CTAs still require independent review.'};
}

async function main(){
 const args=process.argv.slice(2);
 if(args[0]!=='validate'||args[1]!=='--file'||!args[2]||args.length!==3)
  throw Error('Usage: node scripts/brand-competition.mjs validate --file competition.json');
 const data=JSON.parse(readFileSync(resolve(args[2]),'utf8'));
 const result=evaluateCompetition(data);
 console.log(JSON.stringify(result,null,2));
 if(result.status!=='PASS')process.exitCode=1;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))
 main().catch(e=>{console.error(String(e.message||e));process.exitCode=1;});
