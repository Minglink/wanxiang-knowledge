import { tokens } from './tokenize.js';
import type { Aliases } from './query-rewrite.js';
import type { Entry } from './types.js';

export function skipRecall(query: string) {
  const text = query.trim();
  if (/^(好的?|嗯+|谢谢|收到|明白|继续|可以|是的|没问题|ok|yes|thanks|continue)[，。！!.\s]*$/iu.test(text)) return 'confirmation';
  if (/^\/[\w-]+(?:\s.*)?$/.test(text) || /^(?:[$>]\s*)?(?:git|npm|pnpm|node|python|pip|cd|ls|dir|pwd|echo|cat|type|rm|del|mkdir)(?:\s+[\x20-\x7e]+)?$/i.test(text)) return 'command';
  if ([...text].length < 4) return 'short';
  return '';
}
function canonical(text: string, aliases: Aliases) {
  let normalized = text.normalize('NFKC').toLowerCase();
  for (const [name, words] of Object.entries(aliases)) {
    for (const word of [name, ...words].sort((a, b) => b.length - a.length)) {
      normalized = normalized.split(word.normalize('NFKC').toLowerCase()).join(name.normalize('NFKC').toLowerCase());
    }
  }
  return normalized;
}
export function recallConfidence(query: string, entry: Entry, aliases: Aliases) {
  const terms = [...new Set(tokens(canonical(query, aliases)))].slice(0, 64);
  if (!terms.length) return 0;
  const text = canonical([entry.title, entry.l0 || '', ...(entry.questions || [])].join('\n'), aliases);
  const indexed = new Set(tokens(text));
  return terms.filter(term => indexed.has(term)).length / terms.length;
}
