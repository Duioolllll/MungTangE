import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {taskChecks} from '../evals/lib/checks.mjs';

const spec=JSON.parse(readFileSync(new URL('../evals/tasks.json',import.meta.url),'utf8'));

test('benchmark has ten distinct UI tasks with functional contracts',()=>{
  assert.equal(spec.tasks.length,10);
  assert.equal(new Set(spec.tasks.map(t=>t.id)).size,10);
  assert.deepEqual(new Set(Object.keys(taskChecks)),new Set(spec.tasks.map(t=>t.id)));
  for(const task of spec.tasks){
    assert.ok(task.contract.length>=2);
    assert.ok(taskChecks[task.id].length>=2);
  }
});
test('fixtures do not masquerade as actual AI generations',()=>{
 const docs=readFileSync(new URL('../evals/README.md',import.meta.url),'utf8');
 assert.match(docs,/smoke fixture/i);
 assert.match(docs,/NOT RUN/);
 assert.match(docs,/baseline/);
 assert.match(docs,/MungTangE/);
});
