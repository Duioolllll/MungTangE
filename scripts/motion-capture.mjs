#!/usr/bin/env node
/**
 * Optional real-browser scroll-beat capture for motion critique.
 * Records evidence only. NOT an aesthetic, FPS, a11y or WebGL quality judge.
 * Needs Playwright/Chromium in the full repository checkout.
 */
import {existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {parseFlags} from './visual-capture.mjs';

export const widths=[1440,768,390];
export const beats=[
 {id:'start',progress:0},
 {id:'quarter',progress:0.25},
 {id:'middle',progress:0.5},
 {id:'three-quarter',progress:0.75},
 {id:'end',progress:1},
 {id:'reverse-middle',progress:0.5},
 {id:'reverse-start',progress:0}
];
function safeURL(url,allowRemote){
 const parsed=new URL(url);
 if(!['http:','https:'].includes(parsed.protocol))throw Error('Only HTTP(S) URLs');
 if(parsed.username||parsed.password)throw Error('Credentials in URL are forbidden');
 if(!allowRemote&&!['localhost','127.0.0.1','[::1]'].includes(parsed.hostname))
  throw Error('Remote site requires explicit --allow-remote true permission');
 return parsed.href;
}
export async function captureMotion({url,out,selector='body',reducedMotion='no-preference',allowRemote=false,settleMs=150}){
 const target=safeURL(url,allowRemote),dest=resolve(out||'');
 if(!out||dest===resolve('.'))throw Error('Use an explicit output directory');
 if(existsSync(join(dest,'motion-manifest.json')))throw Error('Capture already exists; choose a new output directory');
 if(!['no-preference','reduce'].includes(reducedMotion))throw Error('Invalid motion preference');
 if(!Number.isFinite(settleMs)||settleMs<0||settleMs>3000)throw Error('settleMs must be 0–3000');
 const {chromium}=await import('playwright').catch(()=>{throw Error('Playwright missing; install optional browser dependencies');});
 mkdirSync(dest,{recursive:true});
 const browser=await chromium.launch({headless:true});
 const record={schema:1,source:target,capturedAt:new Date().toISOString(),
  browser:'chromium',browserVersion:browser.version(),selector,reducedMotion,
  note:'Actual browser frames at normalized document scroll positions. This is NOT a real-time animation or GPU performance benchmark.',
  widths,beats,screens:[]};
 try{
  for(const width of widths){
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion});
   const page=await context.newPage(),errors=[];
   page.on('pageerror',error=>errors.push(String(error.message).slice(0,180)));
   page.on('console',message=>{if(message.type()==='error')errors.push(message.text().slice(0,180));});
   const screen={width,samples:[],status:'CAPTURED'};
   try{
    const response=await page.goto(target,{waitUntil:'domcontentloaded',timeout:30000});
    screen.httpStatus=response?.status()??null;
    await page.evaluate(()=>document.fonts?.ready);
    const initial=await page.evaluate(selector=>{
     const doc=document.documentElement;
     return {maxScroll:Math.max(0,doc.scrollHeight-innerHeight),
      selectorExists:!!document.querySelector(selector)};
    },selector);
    screen.maxScroll=initial.maxScroll;
    screen.selectorExists=initial.selectorExists;
    if(!initial.selectorExists||initial.maxScroll<=0||!screen.httpStatus||screen.httpStatus>=400)
     screen.status='PARTIAL';
    for(const beat of beats){
     await page.evaluate(progress=>{
      const max=Math.max(0,document.documentElement.scrollHeight-innerHeight);
      window.scrollTo({top:max*progress,behavior:'instant'});
     },beat.progress);
     if(settleMs)await page.waitForTimeout(settleMs);
     await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(resolve)));
     const facts=await page.evaluate(selector=>{
      const el=document.querySelector(selector);
      const rect=el?.getBoundingClientRect();
      return {scrollY:Math.round(window.scrollY),
       documentWidth:document.documentElement.scrollWidth,
       overflow:document.documentElement.scrollWidth>innerWidth+1,
       transform:el?getComputedStyle(el).transform:null,
       targetPosition:rect?{x:Math.round(rect.x),y:Math.round(rect.y)}:null,
       canvasCount:document.querySelectorAll('canvas').length};
     },selector);
     const file=join(dest,width+'-'+beat.id+'.png');
     await page.screenshot({path:file,fullPage:false,animations:'allow'});
     screen.samples.push({...beat,...facts,filename:file});
    }
   }catch(error){screen.status='CAPTURE_FAILED';screen.error=String(error.message||error).slice(0,400);}
   screen.errors=errors;
   record.screens.push(screen);
   await context.close();
  }
 }finally{await browser.close();}
 record.status=record.screens.every(x=>x.status==='CAPTURED'&&x.errors.length===0)?'CAPTURED':'PARTIAL';
 writeFileSync(join(dest,'motion-manifest.json'),JSON.stringify(record,null,2)+'\n');
 console.log('Motion beats: '+record.status+' at 1440/768/390; observed frames only, visual review NOT RUN.');
 return record;
}
async function main(){
 const a=parseFlags(process.argv.slice(2));
 if(!a.url||!a.out)throw Error('Usage: node scripts/motion-capture.mjs --url http://localhost:3000 --out .visual-review/motion [--selector "#scene"] [--motion reduce]');
 const report=await captureMotion({url:a.url,out:a.out,selector:a.selector||'body',
  reducedMotion:a.motion||'no-preference',allowRemote:a['allow-remote']==='true',
  settleMs:a.settle?Number(a.settle):150});
 if(report.status!=='CAPTURED')process.exitCode=2;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))
 main().catch(error=>{console.error(String(error.message||error));process.exitCode=1;});
