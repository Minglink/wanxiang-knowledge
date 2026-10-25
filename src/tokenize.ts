const segmenter = new Intl.Segmenter('zh', { granularity: 'word' });
const ignored = new Set(['的', '了', '吗', '呢', '我', '怎么', '如何', '为什么', '可以', '是否', '时候', '这个', '一个', '什么', '应该', '怎么办', '不能', '没有']);
export function tokens(text: string, grams = true) {
  const normalized = text.normalize('NFKC').toLowerCase();
  const result = new Set<string>();
  for (const part of segmenter.segment(normalized)) {
    if (part.isWordLike && !ignored.has(part.segment)) result.add(part.segment);
  }
  if (grams) for (const run of normalized.match(/[\p{Script=Han}]+/gu) || []) {
    for (let i = 0; i < run.length - 1; i++) {
      const pair = run.slice(i, i + 2);
      if (!ignored.has(pair)) result.add(pair);
    }
  }
  return [...result];
}
export function indexText(text: string) { return tokens(text).join(' '); }
export function matchQuery(text: string) {
  return tokens(text).slice(0, 64).map(token => '"' + token.replaceAll('"', '""') + '"').join(' OR ');
}
