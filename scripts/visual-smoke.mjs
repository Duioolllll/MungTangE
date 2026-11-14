import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {mkdtempSync,rmSync,existsSync,readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {captureSite,compareCaptures} from './visual-capture.mjs';
import {compareCritic} from './visual-critic.mjs';

const folder=mkdtempSync(join(tmpdir(),'mungtange-visual-'));
let after=false;
const server=createServer((req,res)=>{
 if(req.url==='/favicon.ico'){res.writeHead(204);res.end();return;}
 res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
 res.end([
 '<!doctype html><html lang="en"><head><meta charset="utf-8">',
 '<meta name="viewport" content="width=device-width,initial-scale=1"><title>Framework preview</title>',
 '<style>body{margin:0;font:18px/1.5 system-ui;background:',after?'#f7f8ff':'#ffffff',';color:',after?'#132a43':'#111','}',
 'main{padding:32px;max-width:',after?'1100px':'1200px',';margin:0 auto}',
 'h1{font-size:clamp(32px,5vw,65px);letter-spacing:-.04em}',
 'code{display:block;white-space:pre-wrap;border-radius:8px;padding:20px;background:',
 after?'#142544':'#f3f3f3',';color:',after?'#f4faff':'#111','}',
 'a{display:inline-block;margin-top:20px;color:#0b5189}',
 after?'':'main{min-width:1200px}',
 '</style></head><body><main><p>PyNext framework</p><h1>',
 after?'Python pages. Rust routing.':'Build better apps today.',
 '</h1><p>Experimental framework preview with real documented boundaries.</p>',
 '<code>from pynext import h, page</code>',
 '<a href="#docs">Read documentation</a>',
 '<section id="docs"><h2>Docs</h2><small style="display:block;font-size:',after?'16':'11','px;line-height:1.2">Review the real current documentation and experimental limits</small></section></main></body></html>'
 ].join(''));
});
try{
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 const url='http://127.0.0.1:'+server.address().port+'/';
 const before=await captureSite({url,out:join(folder,'before'),waitMs:0});
 assert.equal(before.status,'CAPTURED');
 assert.equal(before.screens.length,3);
 assert.equal(before.screens.find(s=>s.width===390).horizontalOverflow,true);
 assert.ok(before.screens.find(s=>s.width===390).smallTextTotal>0,'tiny secondary text must be flagged for review');
 assert.ok(existsSync(join(folder,'before','390.png')));
 assert.ok(existsSync(join(folder,'before','390-full.png')));
 assert.match(readFileSync(join(folder,'before','review-template.md'),'utf8'),/NOT RUN/);
 after=true;
 const next=await captureSite({url,out:join(folder,'after'),waitMs:0});
 assert.equal(next.status,'CAPTURED');
 assert.equal(next.screens.find(s=>s.width===390).horizontalOverflow,false);
 assert.equal(next.screens.find(s=>s.width===390).smallTextTotal,0,'secondary text should be readable-size after fix');
 const comparison=await compareCaptures({
  before:join(folder,'before'),after:join(folder,'after'),out:join(folder,'diff')
 });
 assert.equal(comparison.entries.length,3);
 assert.ok(comparison.entries.every(e=>e.status==='COMPARED'));
 assert.ok(comparison.entries.some(e=>e.changedPixels>0));
 assert.ok(existsSync(join(folder,'diff','diff-390.png')));
 assert.match(readFileSync(join(folder,'diff','comparison.md'),'utf8'),/NOT RUN/);
 const review=compareCritic(before,next);
 assert.equal(review.status,'PASS');
 assert.equal(review.visualArtDirectionReview,'NOT RUN');
 assert.equal(review.baselineIssues.some(x=>x.kind==='HORIZONTAL_OVERFLOW'&&x.width===390),true);
 assert.equal(review.resolved.some(x=>x.kind==='HORIZONTAL_OVERFLOW'&&x.width===390),true);
 assert.equal(review.regressions.length,0);
 assert.ok(review.mobileReadability.beforeCandidateCount>0);
 assert.equal(review.mobileReadability.afterCandidateCount,0);
 assert.equal(review.mobileReadability.review,'NOT RUN');
 console.log('VISUAL CRITIC SMOKE PASSED: Chromium captures 1440/768/390, detects overflow change, and produces pixel diff without quality claims.');
}finally{
 await new Promise(ok=>server.close(ok));
 rmSync(folder,{recursive:true,force:true});
}
