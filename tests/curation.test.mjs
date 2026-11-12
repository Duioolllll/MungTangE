import test from 'node:test';
import assert from 'node:assert/strict';
import {validateModelReview} from '../scripts/curate-knowledge.mjs';
const card={id:'repo--skill',sha:'a'.repeat(40)};
const src='---\nname: example\n---\n# Example\nStart with a concrete user scenario.\nUse keyboard-only navigation to reach the submit button.\nVerify that the form can be submitted from the keyboard.\nDo not claim tests were run if you only described them.';
const ok={
 id:card.id,sha:card.sha,objective:'Help build accessible forms that have a real user journey.',
 trigger:'Use when implementing forms that must work with keyboard input.',
 practices:[
  {when:'The form needs keyboard-operable actions.',action:'Confirm each submit control can be focused and activated without a mouse.',check:'Try keyboard-only navigation and record whether submission succeeds.',evidence_lines:[6,7]},
  {when:'The task demands an evidence-based review.',action:'Separate suggested checks from checks actually executed in a browser.',check:'Ensure any unrun test is reported as NOT RUN.',evidence_lines:[8]}
 ],caveats:[],related_tags:['forms']
};
test('accepts structurally valid independent action and evidence',()=>{
 const result=validateModelReview(ok,card,src);assert.equal(result.ok,true,result.errors.join('; '));
});
test('rejects invented or out of range source line evidence',()=>{
 const out=structuredClone(ok);out.practices[0].evidence_lines=[999];
 assert.equal(validateModelReview(out,card,src).ok,false);
});
test('rejects wrong SHA or missing action',()=>{
 const out=structuredClone(ok);out.sha='b'.repeat(40);out.practices[0].action='';
 assert.equal(validateModelReview(out,card,src).ok,false);
});

test('allows no procedure only with explicit insufficient-source caveat',()=>{
 const out=structuredClone(ok);out.practices=[];out.caveats=['insufficient source detail: no actionable procedure'];
 assert.equal(validateModelReview(out,card,src).ok,true);
});
test('rejects unsupported action from a wrong but in-range line',()=>{
 const out=structuredClone(ok);out.practices[0].evidence_lines=[4];
 assert.equal(validateModelReview(out,card,src).ok,false);
});
