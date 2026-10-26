export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export interface MarkdownLink { start: number; end: number; image: boolean; label: string; target: string }
export function markdownLinks(text: string): MarkdownLink[] {
  const result: MarkdownLink[] = [];
  const pattern = /(!?)\[([^\]\n]*)\]\(/g; let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    let depth = 1, end = pattern.lastIndex;
    for (; end < text.length && text[end] !== '\n'; end++) {
      if (text[end] === '\\') { end++; continue; }
      if (text[end] === '(') depth++;
      if (text[end] === ')' && --depth === 0) break;
    }
    if (depth !== 0) continue;
    result.push({start: match.index, end: end + 1, image: !!match[1], label: match[2], target: text.slice(pattern.lastIndex, end).replace(/^<|>$/g, '')});
    pattern.lastIndex = end + 1;
  }
  return result;
}
export function renderMarkdown(body: string, assetHref: (target: string) => string) {
  const plain = (s: string) => escapeHtml(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  const inline = (s: string): string => {
    const code = /(`+)([^\n]*?)\1/g; const pieces: string[] = []; let at = 0, m: RegExpExecArray | null;
    const withLinks = (text: string) => {
      let offset = 0, html = '';
      for (const l of markdownLinks(text)) {
        html += plain(text.slice(offset, l.start));
        const external = /^https?:\/\//i.test(l.target);
        const local = !/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(l.target) && !!l.target;
        const url = external ? l.target : local ? assetHref(l.target) : '';
        html += url ? l.image && local
          ? `<img class="knowledge-image" src="${escapeHtml(url)}" alt="${escapeHtml(l.label)}" loading="lazy">`
          : `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.label || l.target)}</a>`
          : escapeHtml(text.slice(l.start, l.end));
        offset = l.end;
      }
      return html + plain(text.slice(offset));
    };
    while ((m = code.exec(s))) { pieces.push(withLinks(s.slice(at, m.index)), '<code>' + escapeHtml(m[2]) + '</code>'); at = code.lastIndex; }
    return pieces.join('') + withLinks(s.slice(at));
  };
  const lines = body.split('\n'), html: string[] = []; let fence = '', code: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i], marker = line.match(/^\s{0,3}(`{3,}|~{3,})(.*)$/);
    if (fence) {
      if (marker && marker[1][0] === fence[0] && marker[1].length >= fence.length && !marker[2].trim()) { html.push('<pre><code>' + escapeHtml(code.join('\n')) + '</code></pre>'); fence = ''; code = []; }
      else code.push(line);
      continue;
    }
    if (marker) { fence = marker[1]; continue; }
    if (i + 1 < lines.length && line.includes('|') && /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[i + 1])) {
      const cells = (s: string) => s.trim().replace(/^\||\|$/g, '').split('|');
      html.push('<div class="knowledge-table"><table><thead><tr>' + cells(line).map(c => '<th>' + inline(c.trim()) + '</th>').join('') + '</tr></thead><tbody>'); i++;
      while (i + 1 < lines.length && lines[i + 1].includes('|') && lines[i + 1].trim()) html.push('<tr>' + cells(lines[++i]).map(c => '<td>' + inline(c.trim()) + '</td>').join('') + '</tr>');
      html.push('</tbody></table></div>'); continue;
    }
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) { const n = Math.min(6, heading[1].length + 1); html.push(`<h${n}>${inline(heading[2])}</h${n}>`); }
    else if (/^\s*(?:---+|\*\*\*+)\s*$/.test(line)) html.push('<hr>');
    else if (/^>\s?/.test(line)) html.push('<blockquote>' + inline(line.replace(/^>\s?/, '')) + '</blockquote>');
    else if (/^[-*]\s/.test(line)) html.push('<p class="bullet">• ' + inline(line.slice(2)) + '</p>');
    else if (line.trim()) html.push('<p>' + inline(line) + '</p>');
  }
  if (fence) html.push('<pre><code>' + escapeHtml(code.join('\n')) + '</code></pre>');
  return html.join('');
}
