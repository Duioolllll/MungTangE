import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const core=readFileSync(new URL('../SKILLS.md',import.meta.url),'utf8');
const guide=readFileSync(new URL('../skills/mungtange/references/MOTION-3D.md',import.meta.url),'utf8');
const ledger=JSON.parse(readFileSync(new URL('../research/motion-100-analysis.json',import.meta.url),'utf8'));
test('3D and motion is opt-in and grounded in a project identity',()=>{
 assert.match(core,/explicitly requested.*3D|3D.*explicitly requested|motion.*explicit/i);
 assert.match(core,/motion.*identity|identity.*motion/i);
 assert.match(guide,/swap.test/i);
 assert.match(guide,/static.*fallback|poster.*fallback/i);
});
test('comparison makes scene concepts materially different, and does not fake render',()=>{
 assert.match(guide,/three materially different concepts/i);
 assert.match(guide,/three JSON concepts are not three rendered scenes/i);
});
test('temporal review requires actual frames and mobile reading evidence',()=>{
 assert.match(guide,/named key beats/i);
 assert.match(guide,/390/);
 assert.match(guide,/off.screen|off-screen/i);
 assert.match(guide,/NOT RUN/);
});
test('100 sourced files are structural references not 100 expert verdicts',()=>{
 assert.equal(ledger.source_count,100);
 assert.equal(ledger.read_count,100);
 assert.equal(ledger.unique_sources,100);
 assert.ok(ledger.items.every(x=>x.status==='source_fetched_structural_review'));
 assert.match(ledger.analysis_level,/not_100_expert/);
});
