#!/usr/bin/env node
/**
 * Optional browser capture + pixel comparison for human/vision review.
 * No quality score is inferred from pixel change. No package is required
 * for normal SKILL.md usage; Playwright and pixel diff tools load on demand.
 *
 * Usage:
 *   node scripts/visual-capture.mjs capture --url http://localhost:3000 --out .visual-review/before
 *   node scripts/visual-capture.mjs compare --before .visual-review/before --after .visual-review/after --out .visual-review/diff
 */
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';

const widths=[375,768,1440],height=900;
const scriptPath=fileURLToPath(import.meta.url);
export function parseFlags(argv){
 const flags={};
 for(let i=0;i<argv.length;i++){
  const arg=argv[i];
  if(!arg.startsWith('--')||arg.length<3)throw Error('Invalid argument: '+arg);
  const key=arg.slice(2),val=argv[++i];
  if(!val||val.startsWith('--')||Object.hasOwn(flags,key))throw Error('Invalid or duplicate --'+key);
  flags[key]=val;
 }
 return flags;
}
function assertAllowedURL(url,allowRemote){
 const parsed=new URL(url);
 if(!['http:','https:'].includes(parsed.protocol))throw Error('Only HTTP(S) URLs are supported');
 if(!allowRemote&&!['localhost','127.0.0.1','[::1]'].includes(parsed.hostname))
  throw Error('Refusing non-local URL; pass --allow-remote true if authorized');
 if(parsed.username||parsed.password)throw Error('Do not put credentials in screenshot URLs');
 return parsed.href;
}
function outputDir(path){
 if(!path||path==='.'||path==='..')throw Error('Explicit output directory required');
 const dest=resolve(path);
 if(dest===resolve('.'))throw Error('Do not write visual output to repository root');
 return dest;
}
export function checkComparable(before,after){
 const issues=[];
 if(before.url!==after.url)issues.push('URLs differ (even if visual content looks similar)');
 if(before.height!==after.height)issues.push('Viewport heights differ');
 if(before.colorScheme!==after.colorScheme)issues.push('Color schemes differ');
 if(JSON.stringify(before.widths)!==JSON.stringify(after.widths))issues.push('Captured widths differ');
 return issues;
}
const fmt=n=>Math.round(n*10000)/100;
export async function captureSite({url,out,colorScheme='light',allowRemote=false,waitMs=100}){
 const safeURL=assertAllowedURL(url,allowRemote);
 if(!['dark','light'].includes(colorScheme))throw Error('Color scheme must be light or dark');
 if(!Number.isFinite(waitMs)||waitMs<0||waitMs>3000)throw Error('waitMs must be 0–3000');
 const dest=outputDir(out);
 if(existsSync(join(dest,'manifest.json')))throw Error('Capture already exists: '+dest+'; choose a new directory');
 const {chromium}=await import('playwright').catch(()=>{
  throw Error('Playwright not installed. See references/VISUAL-LOOP.md for optional setup');
 });
 mkdirSync(dest,{recursive:true});
 const browser=await chromium.launch({headless:true});
 const manifest={schema:1,url:safeURL,capturedAt:new Date().toISOString(),browser:'chromium',browserVersion:browser.version(),
  colorScheme,widths,height,waitMs,screens:[]};
 try{
  for(const width of widths){
   const context=await browser.newContext({viewport:{width,height},colorScheme,reducedMotion:'reduce'});
   const page=await context.newPage();
   const errors=[],failedRequests=[];
   page.on('pageerror',e=>errors.push('pageerror: '+String(e.message).slice(0,200)));
   page.on('console',m=>{if(m.type()==='error')errors.push('console: '+m.text().slice(0,200));});
   page.on('requestfailed',r=>failedRequests.push(r.url().split('?')[0].slice(0,150)));
   try{
    const response=await page.goto(safeURL,{waitUntil:'domcontentloaded',timeout:30000});
    await page.evaluate(()=>document.fonts?.ready);
    if(waitMs)await page.waitForTimeout(waitMs);
    const facts=await page.evaluate(()=>{
     const d=document.documentElement,b=document.body;
     const images=[...document.images].filter(x=>!x.complete||x.naturalWidth===0);
     const headings=[...document.querySelectorAll('h1')].map(x=>x.textContent?.trim().slice(0,150));
     const screen={viewportWidth:innerWidth,documentWidth:Math.max(d.scrollWidth,b?.scrollWidth||0),
      brokenImages:images.length,documentTitle:document.title,h1:headings,
      interactiveElements:document.querySelectorAll('a[href],button,input,select,textarea').length,
      fontsStatus:document.fonts?.status??'unavailable'};
     return screen;
    });
    const viewportFile=join(dest,width+'.png');
    const fullFile=join(dest,width+'-full.png');
    await page.screenshot({path:viewportFile,fullPage:false,animations:'disabled'});
    await page.screenshot({path:fullFile,fullPage:true,animations:'disabled'});
    manifest.screens.push({
     width,httpStatus:response?.status()||null,
     horizontalOverflow:facts.documentWidth>facts.viewportWidth+1,
     ...facts,viewportFile,fullFile,
     pageErrors:errors,failedRequests
    });
   }catch(e){
    manifest.screens.push({width,status:'CAPTURE_FAILED',error:String(e.message||e).slice(0,500)});
   }finally{await context.close();}
  }
 }finally{await browser.close();}
 writeFileSync(join(dest,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
 const lines=['# Visual capture — observed browser facts','',
   'Source URL: '+manifest.url,'Browser: Chromium '+manifest.browserVersion,
   'Captured: '+manifest.capturedAt,'Color scheme: '+colorScheme,
   'These are technical observations, NOT a visual quality score. Open the actual PNG images before making aesthetic claims.','',
   '| Width | Capture | Horizontal overflow | Broken images | JS console errors |',
   '| ---: | --- | --- | ---: | ---: |'];
 for(const s of manifest.screens){
  lines.push('| '+s.width+' | '+(s.status||'CAPTURED')+' | '+(s.horizontalOverflow??'NOT RUN')+
   ' | '+(s.brokenImages??'NOT RUN')+' | '+(s.pageErrors?.length??'NOT RUN')+' |');
 }
 lines.push('','## Human / visual-model critique (fill only after viewing images)','',
 '- Brand and audience fit: **NOT RUN**',
 '- Hero hierarchy and product proof: **NOT RUN**',
 '- Typographic rhythm, spacing and component details: **NOT RUN**',
 '- Observed high-impact visual issues (region + width + evidence): **NOT RUN**',
 '- Next targeted change and rationale: **NOT RUN**',
 '');
 writeFileSync(join(dest,'review-template.md'),lines.join('\n'));
 const failed=manifest.screens.some(s=>s.status==='CAPTURE_FAILED');
 if(failed)console.error('Some captures failed. Inspect manifest.json; do NOT call this a PASS.');
 else console.log('Captured actual screenshots at '+widths.join(', ')+'px in '+dest);
 return {...manifest,status:failed?'PARTIAL':'CAPTURED'};
}
export async function compareCaptures({before,after,out}){
 const first=JSON.parse(readFileSync(join(resolve(before),'manifest.json'),'utf8'));
 const second=JSON.parse(readFileSync(join(resolve(after),'manifest.json'),'utf8'));
 const issues=checkComparable(first,second);
 if(issues.length)throw Error('Cannot compare unequal browser configurations: '+issues.join('; '));
 const dest=outputDir(out);
 if(existsSync(join(dest,'comparison.json')))throw Error('Comparison already exists; choose a new directory');
 const [{default:pixelmatch},{PNG}]=await Promise.all([
  import('pixelmatch').catch(()=>{throw Error('Missing optional pixelmatch dependency')}),
  import('pngjs').catch(()=>{throw Error('Missing optional pngjs dependency')})
 ]);
 mkdirSync(dest,{recursive:true});
 const entries=[];
 for(const width of widths){
  const a=first.screens.find(s=>s.width===width),b=second.screens.find(s=>s.width===width);
  if(!a?.viewportFile||!b?.viewportFile){
   entries.push({width,status:'NOT RUN',reason:'Missing screenshot from one capture'});continue;
  }
  const one=PNG.sync.read(readFileSync(a.viewportFile)),two=PNG.sync.read(readFileSync(b.viewportFile));
  if(one.width!==two.width||one.height!==two.height){
   entries.push({width,status:'NOT COMPARABLE',reason:'PNG dimensions differ'});continue;
  }
  const png=new PNG({width:one.width,height:one.height});
  const count=pixelmatch(one.data,two.data,png.data,one.width,one.height,{threshold:0.12});
  const file=join(dest,'diff-'+width+'.png');
  writeFileSync(file,PNG.sync.write(png));
  entries.push({width,status:'COMPARED',changedPixels:count,pixelCount:one.width*one.height,
   changedPercent:fmt(count/(one.width*one.height)),diffImage:file,
   before:a.viewportFile,after:b.viewportFile,
   beforeOverflow:a.horizontalOverflow,afterOverflow:b.horizontalOverflow,
   beforeErrors:a.pageErrors?.length||0,afterErrors:b.pageErrors?.length||0});
 }
 const result={schema:1,createdAt:new Date().toISOString(),url:first.url,
  warning:'Pixel difference is NOT a visual quality improvement score. No subjective aesthetic evaluation performed.',
  entries};
 writeFileSync(join(dest,'comparison.json'),JSON.stringify(result,null,2)+'\n');
 const markdown=['# Before/after screenshot comparison','',
  'Pixel differences prove change, NOT better design. Visually review both source PNGs to assess brand, hierarchy and microcraft.','',
  '| Width | Capture | Changed pixels | Overflow before → after |',
  '| ---: | --- | ---: | --- |',
  ...entries.map(e=>'| '+e.width+' | '+e.status+' | '+(e.changedPercent??'NOT RUN')+
  (e.changedPercent==null?'':'%')+' | '+(e.beforeOverflow??'NOT RUN')+' → '+(e.afterOverflow??'NOT RUN')+' |'),
  '','## Verified subjective visual improvements','',
  '**NOT RUN** — requires a real human or vision-capable reviewer viewing the before/after PNGs.',
  '','## Outstanding observed issues','',
  '**NOT RUN** — record only actual reviewed observations; never invent a fixed quota.',
  ''];
 writeFileSync(join(dest,'comparison.md'),markdown.join('\n'));
 console.log('Compared captures in '+dest+'. Pixel differences are NOT quality scores.');
 return result;
}
async function main(){
 const [command,...args]=process.argv.slice(2);
 const opts=parseFlags(args);
 if(command==='capture'){
  if(!opts.url||!opts.out)throw Error('Usage: capture --url URL --out PATH [--theme light|dark] [--allow-remote true]');
  const result=await captureSite({url:opts.url,out:opts.out,colorScheme:opts.theme||'light',
   allowRemote:opts['allow-remote']==='true',waitMs:opts.wait?Number(opts.wait):100});
  if(result.status==='PARTIAL')process.exitCode=2;
 }else if(command==='compare'){
  if(!opts.before||!opts.after||!opts.out)throw Error('Usage: compare --before PATH --after PATH --out PATH');
  await compareCaptures({before:opts.before,after:opts.after,out:opts.out});
 }else throw Error('Usage: visual-capture.mjs capture|compare (see references/VISUAL-LOOP.md)');
}
if(process.argv[1]&&resolve(process.argv[1])===scriptPath){
 main().catch(e=>{console.error('Visual capture: '+String(e.message||e));process.exitCode=1;});
}
