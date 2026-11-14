import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {existsSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {captureMotion} from './motion-capture.mjs';

const dest=mkdtempSync(join(tmpdir(),'mungtange-motion-smoke-'));
const server=createServer((req,res)=>{
 if(req.url==='/favicon.ico'){res.writeHead(204);res.end();return;}
 res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
 res.end('<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Motion beat fixture</title>'+
 '<style>body{margin:0;min-height:3600px;background:#fafafa}#scene{position:fixed;top:20%;left:15%;width:140px;height:140px;background:#222;transform:translateX(0px)}'+
 '@media (prefers-reduced-motion:reduce){#scene{transform:none!important}}</style></head><body>'+
 '<main><h1>Motion fixture</h1><div id="scene" role="img" aria-label="Geometric square"></div></main>'+
 '<script>function update(){let max=Math.max(1,document.documentElement.scrollHeight-innerHeight);document.querySelector("#scene").style.transform="translateX("+(Math.round(scrollY/max*250))+"px)"}addEventListener("scroll",update,{passive:true});update()</script></body></html>');
});
try{
 await new Promise(done=>server.listen(0,'127.0.0.1',done));
 const url='http://127.0.0.1:'+server.address().port;
 const normal=await captureMotion({url,out:join(dest,'normal'),selector:'#scene',settleMs:0});
 assert.equal(normal.status,'CAPTURED');
 assert.deepEqual(normal.widths,[1440,768,390]);
 for(const screen of normal.screens){
  assert.equal(screen.samples.length,7);
  assert.ok(screen.maxScroll>0);
  assert.ok(screen.samples.some(x=>x.transform!=='matrix(1, 0, 0, 1, 0, 0)'));
  assert.equal(screen.samples[0].scrollY,screen.samples[6].scrollY);
  assert.equal(screen.samples[2].scrollY,screen.samples[5].scrollY);
  assert.equal(screen.samples[0].transform,screen.samples[6].transform);
  assert.ok(existsSync(screen.samples[4].filename));
 }
 const still=await captureMotion({url,out:join(dest,'reduce'),selector:'#scene',reducedMotion:'reduce',settleMs:0});
 assert.equal(still.status,'CAPTURED');
 for(const screen of still.screens)assert.ok(screen.samples.every(x=>x.transform==='none'));
 console.log('MOTION SMOKE PASSED: actual Chromium scroll-beat frames, reverse progress, 3 viewports and reduced-motion static fallback; no aesthetic claims.');
}finally{
 await new Promise(done=>server.close(done));
 rmSync(dest,{recursive:true,force:true});
}
