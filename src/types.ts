export type Kind = 'note'|'method'|'pitfall'|'project';
export interface Message { seq:number; id?:string; role:string; text:string }
export interface Snapshot { id:string; title:string; cwd?:string; messages:Message[]; lastSeq:number; model?:{provider:string;model:string;reasoningEffort?:string} }
export interface Entry { id:string; title:string; type:Kind; tags:string[]; project:string; createdAt:string; updatedAt:string; sourceSession:string; sourceTitle:string; sourceSeqs:number[]; snapshotHash:string; generatedHash:string; archived:boolean; verification:string; body:string; file:string }
export interface Tool { id:string; name:string; category:string; type:string; path:string; notes:string; version:string; status:string; checkedAt?:string; detector?:string; linkedIds:string[] }
export interface Job { id:string; sessionId:string; title:string; hash:string; stage:string; status:'queued'|'running'|'success'|'failed'|'cancelled'|'skipped'; createdAt:string; finishedAt?:string; error?:string; entryIds:string[]; mode:string; progress:{done:number;total:number}; lastSeq:number; messageCount:number; model?:string; usage?:unknown[]; generationKey?:string }
export interface Host { listSessions():Promise<{id:string;title:string;cwd?:string;createdAt?:number;running?:boolean}[]>; snapshot(id:string):Promise<Snapshot>; generate?(snapshot:Snapshot,prompt:string,signal:AbortSignal,onUsage:(usage:unknown)=>void):Promise<string>; openPath?(file:string):Promise<void> }
export interface Settings { root:string; mode:'ai'|'export'; autoQueue:boolean }
