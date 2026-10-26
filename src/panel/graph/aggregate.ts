import type { GraphData } from '../../graph.js';

/** Compatibility for older benchmarks. Real nodes are preserved; transport is paged. */
export function aggregateGraph(data: GraphData): GraphData { return data; }
