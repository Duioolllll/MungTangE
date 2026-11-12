#!/usr/bin/env node
import {
  existsSync,readFileSync,writeFileSync,mkdirSync,cpSync,createWriteStream
} from 'node:fs';
import {resolve,join,dirname,basename} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
import {performance} from 'node:perf_hooks';
import {createHash} from 'node:crypto';

const repoRoot=fileURLToPath(new URL('../',import.meta.url));
const tasksJSON=JSON.parse(readFileSync(join(repoRoot,'evals/tasks.json'),'utf8'));
const tasks=tasksJSON.tasks;
const groups=['baseline','mungtange'];
const parseArgs=argv=>{
  const args={};
  for(let i=0;i<argv.length;i++){
    if(!argv[i].startsWith('--'))throw Error('Unknown argument '+argv[i]);
    const key=argv[i].slice(2),value=argv[++i];
    if(!value||value.startsWith('--'))throw Error('Missing value for --'+key);
    args[key]=value;
  }
  return args;
};
const runName=name=>{
  if(!name||!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,47}$/.test(name))throw Error('Use --run with 1-48 letters, digits, _ or -');
  return name;
};
const runDir=name=>join(repoRoot,'evals','.runs',runName(name));
const readRun=dir=>{
  if(!existsSync(join(dir,'run.json')))throw Error('Run not prepared: '+dir);
  return JSON.parse(readFileSync(join(dir,'run.json'),'utf8'));
};
const writeRun=(dir,data)=>writeFileSync(join(dir,'run.json'),JSON.stringify(data,null,2)+'\n');
const jobKey=(id,group)=>id+':'+group;
const taskOutput=(dir,task,group)=>join(dir,'jobs',task,group);
const guide=readFileSync(join(repoRoot,'skills/mungtange/SKILL.md'),'utf8');
const hash=createHash('sha256').update(guide).digest('hex');

function promptFor(task,group){
  const base=[
    '# Web development task — '+task.title,
    '',
    'Create a fully functional, polished, responsive single-page web interface.',
    'Work exclusively in the provided empty workspace. The final app MUST have index.html at its workspace root.',
    'You may create relative CSS, JS and assets locally, but must not require a build server, npm install, CDN or external network.',
    'Use HTML/CSS/vanilla JS. Accessible semantic controls, readable content, keyboard usage and small-screen layout matter.',
    'data-testid hooks specified below are part of the public acceptance contract, not UI text.',
    'Do not fake interactions. No live authentication, sending messages, payment API or external data. Keep demo interactions local.',
    '',
    '## Goal',
    task.goal,
    '',
    '## Acceptance and required test selectors',
    ...task.contract.map((c,i)=>(i+1)+'. '+c),
    '',
    'Deliver working code in the current workspace; no extra prose is necessary.'
  ].join('\n');
  if(group==='baseline')return base+'\n';
  return [
    base,'',
    '## Additional MungTangE guidance (the ONLY treatment difference)',
    'Apply the following first-party Agent Skill as appropriate. Optional references are available under ./references/',
    'Only inspect references when they materially improve the current task. Do not add mandatory ceremony.',
    '',
    '<MUNGTANGE_SKILL>',
    guide,
    '</MUNGTANGE_SKILL>',
    ''
  ].join('\n');
}

function prepare(name){
 const root=runDir(name);
 if(existsSync(root))throw Error('Run exists; choose a fresh ID to avoid cross-condition contamination: '+root);
 mkdirSync(root,{recursive:true});
 const jobs={};
 for(const task of tasks){
  for(const group of groups){
   const dir=taskOutput(root,task.id,group);
   const workspace=join(dir,'workspace');
   mkdirSync(workspace,{recursive:true});
   writeFileSync(join(dir,'prompt.md'),promptFor(task,group));
   if(group==='mungtange'){
    // References are *locally available* for optional progressive disclosure,
    // but their text is not automatically forced into the prompt.
    const from=join(repoRoot,'skills/mungtange/references');
    const to=join(workspace,'references');
    mkdirSync(to,{recursive:true});
    for(const f of ['DEEP-INTEGRATION.md','PLAYBOOKS.md','QUALITY.md','SECURITY.md']){
      cpSync(join(from,f),join(to,f));
    }
   }
   jobs[jobKey(task.id,group)]={status:'not_run',duration_ms:null};
  }
 }
 const data={
  schema_version:1,run_id:name,created_at:new Date().toISOString(),
  tasks:tasks.map(x=>x.id),groups,model:null,skill_sha256:hash,
  protocol:'Same static task prompt, identical runner command/environment and model. Treatment adds MungTangE SKILL.md inline + optional local references.',
  jobs
 };
 writeRun(root,data);
 console.log('Prepared 20 clean task workspaces at '+root);
 console.log('No models have been invoked. Next: npm run eval:run -- --run '+name+' --config /path/to/runner.json');
}

function interpolate(str,ctx){
 return String(str).replace(/\{(promptFile|workspace|taskId|group|runId|model)\}/g,(m,key)=>ctx[key]);
}
function runChild(config,job,root){
 const timeoutSec=Math.min(Math.max(Number(config.timeout_seconds)||600,10),3600);
 const promptFile=join(job,'prompt.md'),workspace=join(job,'workspace');
 const ctx={promptFile,workspace,taskId:basename(dirname(job)),group:basename(job),runId:basename(root),model:config.model};
 const args=config.args.map(a=>interpolate(a,ctx));
 const env={};
 for(const key of ['PATH','HOME','USER','USERPROFILE','TMP','TEMP','TMPDIR','LANG','TERM','SYSTEMROOT','COMSPEC']){
  if(process.env[key])env[key]=process.env[key];
 }
 for(const [key,value] of Object.entries(config.env||{})){
  if(!/^[A-Z_][A-Z0-9_]*$/i.test(key))throw Error('Invalid env name '+key);
  env[key]=String(value);
 }
 env.MUNGTANGE_EVAL_PROMPT_FILE=promptFile;
 env.MUNGTANGE_EVAL_WORKSPACE=workspace;
 env.MUNGTANGE_EVAL_TASK=ctx.taskId;
 env.MUNGTANGE_EVAL_GROUP=ctx.group;
 const start=performance.now();
 return new Promise((complete)=>{
  let done=false,timedOut=false,child;
  const out=createWriteStream(join(job,'agent.stdout.log'));
  const err=createWriteStream(join(job,'agent.stderr.log'));
  try{
   child=spawn(config.command,args,{cwd:workspace,env,shell:false,stdio:['pipe','pipe','pipe']});
  }catch(e){out.end();err.end();complete({status:'failed',error:String(e),duration_ms:performance.now()-start});return;}
  child.stdout.pipe(out);child.stderr.pipe(err);
  if(config.stdin_prompt){
    child.stdin.end(readFileSync(promptFile,'utf8'));
  }else child.stdin.end();
  const timer=setTimeout(()=>{timedOut=true;child.kill('SIGKILL');},timeoutSec*1000);
  child.once('error',e=>{
    if(done)return;
    done=true;clearTimeout(timer);
    complete({status:'failed',error:String(e.message||e),duration_ms:Math.round(performance.now()-start)});
  });
  child.once('close',(code,signal)=>{
    if(done)return;
    done=true;clearTimeout(timer);
    const hasOutput=existsSync(join(workspace,'index.html'));
    complete({
      status:!timedOut&&code===0&&hasOutput?'completed':'failed',
      exit_code:code,signal:signal||null,timed_out:timedOut,
      output_found:hasOutput,
      duration_ms:Math.round(performance.now()-start)
    });
  });
 });
}

async function invoke(name,configFile){
 const root=runDir(name),data=readRun(root);
 if(data.skill_sha256!==hash)throw Error('Skill changed since preparation; create a new run for fair comparison');
 if(!configFile)throw Error('Real agent runner config required: --config /path/to/runner.json');
 const config=JSON.parse(readFileSync(resolve(configFile),'utf8'));
 if(typeof config.command!=='string'||!config.command.trim()||!Array.isArray(config.args)||!config.args.every(a=>typeof a==='string'))throw Error('Expected runner command and string args');
 if(typeof config.model!=='string'||!config.model.trim())throw Error('Runner config must identify the actual model');
 if(config.env && (typeof config.env!=='object'||Array.isArray(config.env)))throw Error('Runner env must be an object');
 if(data.model && data.model!==config.model)throw Error('Cannot mix models within one paired run');
 if(!config.stdin_prompt && !config.args.some(arg=>arg.includes('{promptFile}')))throw Error('Runner must receive its prompt via stdin_prompt or {promptFile}');
 data.model=config.model;
 writeRun(root,data);
 let failures=0;
 for(let i=0;i<tasks.length;i++){
  // Counterbalance systematic order effects.
  const order=i%2===0?groups:[...groups].reverse();
  for(const group of order){
   const id=tasks[i].id,key=jobKey(id,group);
   if(data.jobs[key].status!=='not_run')continue;
   console.log('Running '+key+' via '+config.command+' ('+config.model+')');
   const result=await runChild(config,taskOutput(root,id,group),root);
   data.jobs[key]=result;
   writeRun(root,data);
   if(result.status!=='completed')failures++;
  }
 }
 console.log('Agent execution completed. '+failures+' failed jobs; metrics not yet computed.');
 if(failures)process.exitCode=1;
}

async function score(name){
 const {evaluateJob}=await import('./lib/evaluate.mjs');
 const {generateReport}=await import('./lib/report.mjs');
 const root=runDir(name),data=readRun(root),results={};
 for(const task of tasks){
  for(const group of groups){
   const id=jobKey(task.id,group),jobDir=taskOutput(root,task.id,group);
   const output=join(jobDir,'workspace','index.html');
   const meta=data.jobs[id];
   if(!existsSync(output)){
    results[id]={status:meta?.status==='failed'?'failed':'not_run',reason:meta?.status==='failed'?'Agent run failed or produced no index.html':'No output index.html was provided'};
    continue;
   }
   try{
    results[id]=await evaluateJob({
      workspace:join(jobDir,'workspace'),taskId:task.id,
      artifactsDir:join(root,'artifacts',task.id,group)
    });
    console.log('Scored '+id+' function '+results[id].functional_pass+'/'+results[id].functional_total);
   }catch(e){
    results[id]={status:'failed',reason:'Browser evaluator: '+String(e.message||e).slice(0,800)};
    console.error('Failed to evaluate '+id+': '+results[id].reason);
   }
 }
 }
 const report=generateReport({runRoot:root,tasks,runMeta:data,results});
 console.log('Report: '+join(root,'report.md'));
 console.log(report.comparison_status);
 if(report.comparison_status!=='COMPLETE')process.exitCode=2;
}

try{
 const command=process.argv[2],args=parseArgs(process.argv.slice(3));
 if(!['prepare','run','score'].includes(command)){
  throw Error('Usage: node evals/cli.mjs prepare|run|score --run ID [--config /path/to/runner.json]');
 }
 if(command==='prepare')prepare(runName(args.run));
 if(command==='run')await invoke(runName(args.run),args.config);
 if(command==='score')await score(runName(args.run));
}catch(e){console.error('Benchmark error: '+String(e.message||e));process.exitCode=1;}
