import { build } from 'esbuild';
import { chromium } from 'playwright';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const bundled=await build({stdin:{contents:"export {GraphView,newGraphState} from './src/panel/graph/view.ts';",resolveDir:process.cwd()},bundle:true,write:false,format:'iife',globalName:'GrowingGraph',platform:'browser'});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
await mkdir('artifacts/graph-growth',{recursive:true});const reports=[];
try{
 const page=await browser.newPage({viewport:{width:1280,height:900},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setContent('<section class="wx-graph"></section>');await page.addStyleTag({content:await readFile('src/style.css','utf8')});await page.addScriptTag({content:bundled.outputFiles[0].text});
 for(const count of [1500,1501,2529,10001,50001]){
  const r=await page.evaluate(async count=>{
   window.view?.destroy();const nodes=Array.from({length:count},(_,i)=>({id:'n'+i,title:'知识 '+i,kind:i%137===0?'method':i%53===0?'pitfall':i%199===0?'project':'note',cluster:'p'+i%12,project:'p'+i%12,tags:[],degree:2,status:'原文',updatedAt:''}));
   const clusters=Array.from({length:12},(_,i)=>({id:'p'+i,label:'项目'+i,count:nodes.filter(n=>n.cluster==='p'+i).length}));let requests=0;
   const started=performance.now();window.view=new GrowingGraph.GraphView(document.querySelector('section'),GrowingGraph.newGraphState(),async(c,offset=0)=>{requests++;const end=Math.min(count,offset+1000);return {nodes:nodes.slice(offset,end),edges:nodes.slice(Math.max(1,offset),end).map((n,i)=>({s:'n'+(Math.max(1,offset)+i-1),t:n.id,kind:'same_project',w:.2})),clusters,total:count,truncated:false,snapshot:'stable',nextOffset:end<count?end:null};},()=>{});
   await window.view.mount();await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
   const canvas=document.querySelector('canvas');return {count,loaded:Number(canvas.dataset.nodes),drawn:Number(canvas.dataset.drawnNodes),kinds:JSON.parse(canvas.dataset.kindCounts),domNodes:document.querySelectorAll('[data-graph-node]').length,requests,mountMs:performance.now()-started,drawMs:Number(canvas.dataset.drawMs),countText:document.querySelector('.wx-graph-count').textContent,networkInitialized:!!window.view.engine.networkState};
  },count);
  assert.equal(r.loaded,count);assert.ok(r.kinds.method>0);assert.equal(r.domNodes,200);assert.equal(r.requests,Math.ceil(count/1000));assert.equal(r.networkInitialized,false);assert.ok(!r.countText.includes('簇节点'));
  reports.push(r);console.log(JSON.stringify(r));if(count===2529||count===50001)await page.screenshot({path:`artifacts/graph-growth/sphere-${count}.png`});
 }
 await page.getByLabel('搜索图谱节点').fill('知识 50000');assert.ok(await page.locator('[data-graph-node="n50000"]').count());
 await page.locator('.wx-graph-list summary').click();await page.locator('[data-graph-node="n50000"]').click();assert.equal(await page.evaluate(()=>window.view.engine.selected),'n50000');
 await page.getByRole('button',{name:'方法',exact:false}).click(); // filter must keep real metadata, never synthesize purple nodes
 assert.deepEqual(errors,[]);await writeFile('artifacts/graph-growth/results.json',JSON.stringify({checkedAt:new Date().toISOString(),reports,searchBeyond5000:true,errors},null,2));
}finally{await browser.close();}
