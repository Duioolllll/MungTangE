import {writeFileSync,existsSync,readFileSync} from 'node:fs';
import {join,relative} from 'node:path';
import {compareScreenshots} from './evaluate.mjs';

const groups=['baseline','mungtange'];
const pct=(a,b)=>b?((a/b)*100).toFixed(1)+'%':'N/A';
const seconds=ms=>typeof ms==='number'?(ms/1000).toFixed(1)+'s':'N/A';
const status=e=>!e?'NOT RUN':e.status==='scored'?'SCORED':e.status==='failed'?'FAILED':'NOT RUN';
const safe=v=>String(v??'').replaceAll('|','\\|').replaceAll('\n',' ');

function aggregate(tasks,entries,runMeta,group){
  const rows=tasks.map(task=>{
    const key=task.id+':'+group;
    const score=entries[key];
    const agent=runMeta.jobs[key]||{};
    return {task:task.id,status:status(score),score,agent};
  });
  const scored=rows.filter(x=>x.status==='SCORED');
  const functional_pass=scored.reduce((s,x)=>s+x.score.functional_pass,0);
  const functional_total=scored.reduce((s,x)=>s+x.score.functional_total,0);
  const accessibilityClean=scored.filter(x=>x.score.accessibility_clean).length;
  const responsivePass=scored.reduce((s,x)=>s+x.score.responsive_pass,0);
  const responsiveTotal=scored.reduce((s,x)=>s+x.score.responsive_total,0);
  const runtimeClean=scored.filter(x=>x.score.runtime_clean).length;
  const measured=rows.filter(x=>typeof x.agent.duration_ms==='number');
  const durationTotal=measured.reduce((s,x)=>s+x.agent.duration_ms,0);
  return {
    scored:scored.length,failed:rows.filter(x=>x.status==='FAILED').length,
    not_run:rows.filter(x=>x.status==='NOT RUN').length,
    functional_pass,functional_total,functional_rate:functional_total?functional_pass/functional_total:null,
    a11y_clean:accessibilityClean,a11y_total:scored.length,a11y_rate:scored.length?accessibilityClean/scored.length:null,
    responsive_pass:responsivePass,responsive_total:responsiveTotal,responsive_rate:responsiveTotal?responsivePass/responsiveTotal:null,
    runtime_clean:runtimeClean,runtime_total:scored.length,runtime_rate:scored.length?runtimeClean/scored.length:null,
    work_seconds:measured.length===tasks.length?durationTotal/1000:null,
    work_seconds_partial:durationTotal/1000,
    work_samples:measured.length
  };
}

export function generateReport({runRoot,tasks,runMeta,results}){
  const summaries=Object.fromEntries(groups.map(g=>[g,aggregate(tasks,results,runMeta,g)]));
  const pairs=[];
  for(const task of tasks){
    const base=results[task.id+':baseline'];
    const skill=results[task.id+':mungtange'];
    const pair={task:task.id,baseline:status(base),mungtange:status(skill),visual_diff:{}};
    if(base?.status==='scored'&&skill?.status==='scored'){
      for(const width of [375,768,1440]){
        const a=base.screenshots.find(x=>x.width===width)?.path;
        const b=skill.screenshots.find(x=>x.width===width)?.path;
        if(a&&b&&existsSync(a)&&existsSync(b)){
          const dest=join(runRoot,'artifacts',task.id,'visual-diff-'+width+'.png');
          pair.visual_diff[width]=compareScreenshots(a,b,dest);
        }
      }
    }
    pairs.push(pair);
  }
  const complete=groups.every(g=>summaries[g].scored===tasks.length&&summaries[g].work_samples===tasks.length);
  const data={
    schema_version:1,run_id:runMeta.run_id,created_at:new Date().toISOString(),
    comparison_status:complete?'COMPLETE':'INCOMPLETE — NO PERFORMANCE CLAIM',
    evaluated_model:runMeta.model||'NOT SPECIFIED',
    task_count:tasks.length,group_count:groups.length,metric_count:5,
    metrics:{
      functional_success:'Functional checks passed / executed checks',
      accessibility:'Fraction of evaluated pages without serious/critical axe violations at 375 and 1440px',
      responsive:'Fraction of 375/768/1440 screenshots with no document horizontal overflow',
      browser_robustness:'Fraction of evaluated pages without console/page errors or blocked external requests',
      work_cost:'Actual wall-clock agent execution seconds, not API price or token billing'
    },
    groups:summaries,pairs,results
  };
  writeFileSync(join(runRoot,'report.json'),JSON.stringify(data,null,2)+'\n');
  const b=summaries.baseline,s=summaries.mungtange;
  const lines=[
    '# MungTangE Benchmark v1 — paired comparison','',
    '**Status:** '+data.comparison_status,'',
    '- Run: '+data.run_id,
    '- Model/runner metadata: '+safe(data.evaluated_model),
    '- Tasks: '+tasks.length+' × 2 groups = 20 required outputs',
    '- Both groups receive the **same task text and output contract**. The treatment adds MungTangE SKILL.md and optional reference files.',
    '- These metrics measure outputs, not whether instructions were internally followed. No treatment advantage can be claimed without both groups fully evaluated.','',
    '## Five metrics','',
    '| Metric | Baseline | MungTangE |',
    '| --- | ---: | ---: |',
    '| Functional success | '+pct(b.functional_pass,b.functional_total)+' ('+b.functional_pass+'/'+b.functional_total+') | '+pct(s.functional_pass,s.functional_total)+' ('+s.functional_pass+'/'+s.functional_total+') |',
    '| Accessibility clean | '+pct(b.a11y_clean,b.a11y_total)+' ('+b.a11y_clean+'/'+b.a11y_total+') | '+pct(s.a11y_clean,s.a11y_total)+' ('+s.a11y_clean+'/'+s.a11y_total+') |',
    '| Responsive width pass | '+pct(b.responsive_pass,b.responsive_total)+' ('+b.responsive_pass+'/'+b.responsive_total+') | '+pct(s.responsive_pass,s.responsive_total)+' ('+s.responsive_pass+'/'+s.responsive_total+') |',
    '| Browser robustness clean | '+pct(b.runtime_clean,b.runtime_total)+' ('+b.runtime_clean+'/'+b.runtime_total+') | '+pct(s.runtime_clean,s.runtime_total)+' ('+s.runtime_clean+'/'+s.runtime_total+') |',
    '| Work cost — measured agent wall-time | '+(b.work_seconds===null?'NOT RUN / partial':b.work_seconds.toFixed(1)+'s')+' ('+b.work_samples+'/10 measured) | '+(s.work_seconds===null?'NOT RUN / partial':s.work_seconds.toFixed(1)+'s')+' ('+s.work_samples+'/10 measured) |',
    '',
    'Cost is elapsed time only; token counts and billed USD cannot be inferred without independently captured provider telemetry. Lower time does not necessarily mean lower financial cost.','',
    '## Tasks and screenshot differences','',
    '| Task | Baseline | MungTangE | Desktop pixel difference* |',
    '| --- | --- | --- | ---: |',
    ...pairs.map(p=>{
      const d=p.visual_diff['1440'];
      return '| '+p.task+' | '+p.baseline+' | '+p.mungtange+' | '+(d?.status==='compared'?pct(d.pixels,d.total_pixels):'NOT RUN')+' |';
    }),
    '',
    '*Pixel difference compares the two rendered screenshots. It is **not a visual quality score**, and cannot identify which design is better. Screenshot PNGs and diff PNGs are saved under artifacts/.','',
    '## Completeness and interpretation','',
    '- Baseline evaluated: '+b.scored+'/'+tasks.length+'; failed: '+b.failed+'; not run: '+b.not_run,
    '- MungTangE evaluated: '+s.scored+'/'+tasks.length+'; failed: '+s.failed+'; not run: '+s.not_run,
    '- Browser engine: Chromium; accessibility: axe-core; responsive screenshots: 375/768/1440px; static local outputs only.',
    '- A single run with 10 tasks is exploratory; use multiple fresh paired trials and human blind design review before statistical claims.',
    complete?
      '- **All 20 outputs evaluated with actual agent elapsed time.** Compare metrics cautiously; shared benchmark hooks can bias toward the tests.':
      '- **No complete A/B result yet.** Missing/failed outputs are not silently treated as either wins or losses. Execute the same configured real agent for both groups.',
    '',
    '## Reproduce','',
    'Use npm run eval:prepare, npm run eval:run and npm run eval:score as documented in evals/README.md. This report contains no fabricated model run.',
    ''
  ];
  writeFileSync(join(runRoot,'report.md'),lines.join('\n'));
  return data;
}
