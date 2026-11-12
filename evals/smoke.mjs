import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,existsSync,readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {evaluateJob,compareScreenshots} from './lib/evaluate.mjs';
import {generateReport} from './lib/report.mjs';
import {taskChecks} from './lib/checks.mjs';

const root=mkdtempSync(join(tmpdir(),'mungtange-eval-smoke-'));
const here=fileURLToPath(new URL('.',import.meta.url));
const tasks=JSON.parse(readFileSync(join(here,'tasks.json'),'utf8')).tasks;
try{
  assert.equal(tasks.length,10);
  assert.equal(Object.keys(taskChecks).length,10);
  for(const task of tasks) assert.ok(taskChecks[task.id]?.length>=2,task.id);
  const valid=await evaluateJob({
    workspace:join(here,'fixtures','faq-pass'),
    taskId:'faq-accordion',
    artifactsDir:join(root,'artifacts','faq-accordion','mungtange')
  });
  assert.equal(valid.functional_pass,valid.functional_total,'valid fixture must pass all functional checks');
  assert.equal(valid.responsive_pass,3,'valid fixture must not overflow any viewport');
  assert.equal(valid.accessibility_serious_critical,0,'valid fixture must have no serious/critical axe findings');
  assert.equal(valid.runtime_clean,true);
  const invalid=await evaluateJob({
    workspace:join(here,'fixtures','faq-fail'),
    taskId:'faq-accordion',
    artifactsDir:join(root,'artifacts','faq-accordion','baseline')
  });
  assert.ok(invalid.functional_pass<invalid.functional_total,'broken fixture must fail functional checks');
  const pair=compareScreenshots(
    invalid.screenshots.find(x=>x.width===1440).path,
    valid.screenshots.find(x=>x.width===1440).path,
    join(root,'artifacts','smoke-diff.png')
  );
  assert.equal(pair.status,'compared');
  assert.ok(pair.pixels>0,'screenshot differences must be detected');
  const partial=generateReport({
    runRoot:root,tasks,
    runMeta:{run_id:'smoke',model:null,jobs:{}},
    results:{'faq-accordion:baseline':invalid,'faq-accordion:mungtange':valid}
  });
  assert.match(partial.comparison_status,/INCOMPLETE/);
  assert.equal(partial.groups.baseline.scored,1);
  assert.equal(partial.groups.mungtange.scored,1);
  assert.ok(existsSync(join(root,'report.md')));
  console.log('PLAYWRIGHT + AXE SMOKE PASSED: valid UI accepted; broken UI rejected; screenshots diffed; incomplete report honest.');
}finally{
  rmSync(root,{recursive:true,force:true});
}
