import type { Entry } from './types.js';

export interface SearchFilter {
  query?: string;
  type?: string;
  archived?: boolean;
  project?: string;
  offset?: number;
  limit?: number;
}
export interface IndexEngine {
  readonly name: string;
  readonly fullText: boolean;
  init(): Promise<void>;
  reset(): void;
  index(entry: Entry): void;
  search(filter: SearchFilter): string[];
  flush(): Promise<void>;
  close(): void;
  fullSearch?(filter: SearchFilter & { hot?: boolean; validOnly?: boolean }): { id: string; score: number }[];
  begin?(): void;
  end?(): void;
  replaceRelations?(rows: Iterable<import('./relations.js').Relation>): void;
}
