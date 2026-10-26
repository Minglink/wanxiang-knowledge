import test from 'node:test';
import assert from 'node:assert/strict';
import { GraphPages, buildGraph } from '../lib/index.js';

function fixture(count) {
  const entries = new Map(Array.from({length:count},(_,i)=>{
    const e={id:'node-'+String(i).padStart(7,'0'),title:'知识 '+i,type:i===count-1?'method':i%100===0?'pitfall':'note',tags:[],project:'p'+(i%12),updatedAt:'2026-01-01',archived:false,verification:'原文',sourceSession:'',_references:[]};
    Object.defineProperty(e,'body',{get:()=>assert.fail('图谱不得读取正文')});
    return [e.id,e];
  }));
  return {entries,tools:[],root:'fixture',revision:1};
}

test('分页遍历50001个真实节点，不丢失、不重复、保留稀有绿色节点与跨页关系',()=>{
  const store=fixture(50001),pages=new GraphPages(),all=[],edges=[],ids=new Set();let offset=0,snapshot;
  do {
    const page=pages.page(store,{scope:'library'},offset,snapshot);
    assert.equal(page.total,50001);assert.equal(page.truncated,false);assert.ok(page.nodes.length<=1000);
    if(offset===0)assert.ok(page.nodes.some(n=>n.kind==='method'),'稀有类型必须在首批出现');
    for(const n of page.nodes){assert.ok(!ids.has(n.id));ids.add(n.id);all.push(n);}
    for(const e of page.edges){assert.ok(ids.has(e.s)&&ids.has(e.t),'分页边必须指向已加载节点');edges.push(e);}
    snapshot=page.snapshot;offset=page.nextOffset;
  }while(offset!==null);
  assert.equal(all.length,50001);assert.equal(all.filter(n=>n.kind==='method').length,1);
  const full=buildGraph(store.entries.values(),[],{scope:'library',limit:Number.MAX_SAFE_INTEGER});
  assert.equal(edges.length,full.edges.length);assert.equal(new Set(edges.map(e=>JSON.stringify(e))).size,edges.length);
});

test('新写入、筛选或切库时拒绝混合快照；重新开始能够取得新增节点',()=>{
  const store=fixture(3001),pages=new GraphPages(),first=pages.page(store,{scope:'library'});
  store.revision++;
  assert.throws(()=>pages.page(store,{scope:'library'},first.nextOffset,first.snapshot),/更新/);
  const fresh=pages.page(store,{scope:'library'});assert.notEqual(fresh.snapshot,first.snapshot);
  assert.throws(()=>pages.page(store,{scope:'library',project:'p1'},1000,fresh.snapshot),/更新/);
  assert.throws(()=>pages.page(store,{scope:'library'},-1),/偏移/);
});

test('图谱分页的项目、类型、归档和搜索过滤在完整数据集上执行',()=>{
  const store=fixture(6001),pages=new GraphPages();
  const green=pages.page(store,{scope:'library',type:'method'});assert.equal(green.total,1);assert.equal(green.nodes[0].kind,'method');
  const searched=pages.page(store,{scope:'library'},0,'','知识 6000');assert.equal(searched.total,1);
  const empty=pages.page(store,{scope:'library',archived:true});assert.equal(empty.total,0);assert.equal(empty.nextOffset,null);
});
