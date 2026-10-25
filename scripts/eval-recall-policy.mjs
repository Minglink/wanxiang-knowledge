// Synthetic-only policy evaluation. Private holdout files are never discovered or read.
import { mkdtemp, readFile, mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { KnowledgeService } from '../lib/index.js';

const fixture = JSON.parse(await readFile('test/fixtures/recall-eval.json', 'utf8'));
const negatives = [
  '明天午饭吃什么比较好？', '帮我写一首关于春天的小诗', '给新出生的小猫起名字', '如何种植阳台上的薄荷？',
  '介绍一下木星的卫星', '怎样整理出游的行李箱？', '推荐几个练习素描的方法', '烤面包的时候为什么会膨胀？',
  '准备一段生日祝福文案', '如何学习基础的钢琴和弦？', '今天适合去哪里散步？', '给我讲一个航海冒险故事',
  '城市地铁的运营原理是什么？', '怎样给多肉植物浇水？', '解释一下彩虹如何形成', '写一段关于秋天落叶的散文',
  '如何在家制作草莓果酱？', '教我几个简单的拉伸动作', '为什么月亮会出现不同形状？', '介绍一下陶瓷烧制的过程',
].map(query => ({ query, expected: [], category: 'unrelated-negative' }));
const root = await mkdtemp(path.join(os.tmpdir(), 'wanxiang-policy-eval-'));
const service = await new KnowledgeService(path.join(root, 'home'), { listSessions: async () => [], snapshot: async () => {} }, path.join(root, 'knowledge')).init();
try {
  for (const [index, entry] of fixture.entries.entries()) {
    await service.store.save({ ...entry, type: 'method', project: 'synthetic', file: 'cards/' + index + '.md',
      updatedAt: new Date(Date.UTC(2026, 0, 1) + index * 1000).toISOString(), archived: false });
  }
  await service.store.flush();
  const rows = [];
  for (const [index, item] of [...fixture.queries, ...negatives].entries()) {
    const start = performance.now();
    let candidates = [], reason = 'success';
    try { candidates = await service.recallSearch.run({ sessionId: 'synthetic-eval', messageId: 'q-' + index, seq: index, query: item.query, cwd: '', recent: [] }, new AbortController().signal); }
    catch (error) { reason = error.name === 'RecallSkip' ? error.message : error.reason || error.message; }
    rows.push({ category: item.category, query: item.query, expected: item.expected, candidates, reason, ms: performance.now() - start });
  }
  const metrics = threshold => {
    let recalled = 0, reciprocal = 0, falseInjected = 0, injected = 0, missed = 0, negativeInjected = 0;
    const positives = rows.filter(row => row.expected.length).length;
    for (const row of rows) {
      const ids = row.candidates.filter(candidate => candidate.score >= threshold).slice(0, 5).map(candidate => candidate.id);
      const correct = ids.filter(id => row.expected.includes(id));
      if (row.expected.length) {
        recalled += correct.length / row.expected.length;
        const rank = ids.findIndex(id => row.expected.includes(id));
        if (rank >= 0) reciprocal += 1 / (rank + 1); else missed++;
      } else if (ids.length) negativeInjected++;
      if (ids.length) {
        injected++;
        if (ids.some(id => !row.expected.includes(id))) falseInjected++;
      }
    }
    return { threshold, recallAt5: recalled / positives, MRR: reciprocal / positives,
      falseInjectionRate: injected ? falseInjected / injected : 0,
      missRate: missed / positives, negativeInjectionRate: negativeInjected / negatives.length,
      injectedQueries: injected, missedQueries: missed };
  };
  const report = { kind: 'synthetic in-distribution only; not private holdout or formal calibration',
    corpus: fixture.entries.length, positiveQueries: fixture.queries.length, unrelatedNegatives: negatives.length,
    thresholds: [0.3, 0.5, 0.65, 0.8, 1].map(metrics),
    skipped: rows.filter(row => row.reason !== 'success').map(row => ({ category: row.category, query: row.query, reason: row.reason })),
    definitions: { falseInjectionRate: 'queries with any injected irrelevant ID / queries with any injection',
      missRate: 'positive queries with no relevant injected ID / all positive queries',
      recallAt5: 'macro fraction of expected IDs among thresholded top5; skips/timeouts count as misses',
      timing: 'isolated RecallSearch results; not production first-step injected rate' }, rows };
  await mkdir('dist/phase3-eval', { recursive: true });
  await writeFile('dist/phase3-eval/synthetic-policy.json', JSON.stringify(report, null, 2));
  const { rows: _rows, ...summary } = report;
  console.log(JSON.stringify(summary, null, 2));
} finally { await service.dispose(); await rm(root, { recursive: true, force: true }); }
