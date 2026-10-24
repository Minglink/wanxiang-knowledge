import type { Entry, Job } from './types.js';

export function allProjects(entries: Iterable<Entry>) {
  return [...new Set([...entries].map(entry => entry.project).filter(Boolean))].sort();
}

export function jobPage(jobs: Job[], offset = 0, limit = 50) {
  const start = Math.max(0, Math.floor(Number(offset) || 0));
  const size = Math.max(1, Math.min(100, Math.floor(Number(limit) || 50)));
  return { items: jobs.slice(start, start + size), total: jobs.length, offset: start, limit: size };
}
