import {createServer} from 'node:http';
import {readFileSync,existsSync,lstatSync,realpathSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,join,relative,isAbsolute,extname,sep} from 'node:path';
import {chromium} from 'playwright';
import axe from 'axe-core';
import pixelmatch from 'pixelmatch';
import {PNG} from 'pngjs';
import {runFunctionalChecks} from './checks.mjs';

const viewports=[375,768,1440];
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon'};

function isInside(root,p){
  const rel=relative(root,p);
  return rel!== '..'&&!rel.startsWith('..'+sep)&&!isAbsolute(rel);
}

export async function startStaticServer(dir){
  const root=realpathSync(dir);
  const server=createServer((req,res)=>{
    try{
      const u=new URL(req.url,'http://localhost');
      if(u.pathname==='/favicon.ico'){
        res.writeHead(204);res.end();return;
      }
      const path=resolve(root,'.'+decodeURIComponent(u.pathname==='/'?'/index.html':u.pathname));
      if(!isInside(root,path))throw Error('Outside output workspace');
      if(!existsSync(path)||!lstatSync(path).isFile()){
        res.writeHead(404);res.end('Not Found');return;
      }
      if(!isInside(root,realpathSync(path)))throw Error('File resolves outside output workspace');
      res.writeHead(200,{'Content-Type':mime[extname(path)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
      res.end(readFileSync(path));
    }catch{
      res.writeHead(403);res.end('Forbidden');
    }
  });
  await new Promise((ok,fail)=>{server.once('error',fail);server.listen(0,'127.0.0.1',ok)});
  const address=server.address();
  return {url:'http://127.0.0.1:'+address.port+'/',close:()=>new Promise(ok=>server.close(ok))};
}

async function snapshotAndAudit(page,url,dir,width){
  await page.setViewportSize({width,height:900});
  await page.goto(url,{waitUntil:'load',timeout:20000});
  await page.evaluate(()=>document.fonts?.ready);
  const overflow=await page.evaluate(()=>Math.max(document.documentElement.scrollWidth,document.body?.scrollWidth||0)>window.innerWidth+1);
  const screenshot=join(dir,width+'.png');
  await page.screenshot({path:screenshot,fullPage:false,animations:'disabled'});
  let violations=[];
  if(width===375||width===1440){
    await page.addScriptTag({content:axe.source});
    const result=await page.evaluate(async()=>window.axe.run(document,{
      runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}
    }));
    violations=result.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.length}));
  }
  return {width,overflow,screenshot,violations};
}

export async function evaluateJob({workspace,taskId,artifactsDir}){
  if(!existsSync(join(workspace,'index.html')))throw Error('Missing index.html output');
  mkdirSync(artifactsDir,{recursive:true});
  const server=await startStaticServer(workspace);
  const browser=await chromium.launch({headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  const page=await context.newPage();
  const runtimeErrors=[];
  page.on('pageerror',error=>runtimeErrors.push('pageerror: '+String(error.message).slice(0,200)));
  page.on('console',message=>{if(message.type()==='error')runtimeErrors.push('console: '+message.text().slice(0,200));});
  await page.route('**/*',route=>{
    try{
      if(new URL(route.request().url()).origin===new URL(server.url).origin) return route.continue();
    }catch{}
    runtimeErrors.push('blocked external request');
    return route.abort();
  });
  try{
    const screens=[];
    for(const width of viewports) screens.push(await snapshotAndAudit(page,server.url,artifactsDir,width));
    const checks=await runFunctionalChecks(page,server.url,taskId);
    const violations=screens.flatMap(s=>s.violations.filter(v=>v.impact==='serious'||v.impact==='critical').map(v=>({...v,width:s.width})));
    return {
      status:'scored',taskId,checks,functional_pass:checks.filter(x=>x.status==='pass').length,
      functional_total:checks.length,
      accessibility_clean:violations.length===0,accessibility_serious_critical:violations.length,
      accessibility_violations:violations,
      responsive_pass:screens.filter(s=>!s.overflow).length,responsive_total:screens.length,
      screenshots:screens.map(s=>({width:s.width,path:s.screenshot,overflow:s.overflow})),
      runtime_clean:runtimeErrors.length===0,runtime_errors:runtimeErrors
    };
  }finally{
    await context.close();
    await browser.close();
    await server.close();
  }
}

// Pixel differences quantify *difference*, not visual quality.
// Never infer that a larger or smaller diff means one group is better.
export function compareScreenshots(a,b,dest){
  const first=PNG.sync.read(readFileSync(a)),second=PNG.sync.read(readFileSync(b));
  if(first.width!==second.width||first.height!==second.height)return {status:'dimension_mismatch'};
  const output=new PNG({width:first.width,height:first.height});
  const pixels=pixelmatch(first.data,second.data,output.data,first.width,first.height,{threshold:0.12});
  mkdirSync(resolve(dest,'..'),{recursive:true});
  writeFileSync(dest,PNG.sync.write(output));
  return {status:'compared',pixels,total_pixels:first.width*first.height,fraction:pixels/(first.width*first.height),image:dest};
}
