import { DatabaseSync } from 'node:sqlite';
const database = new DatabaseSync(':memory:');
process.on('message', request => {
  if (request.query === 'warmup') {
    process.send({ id: request.id, rows: [] });
    return;
  }
  process.send({ type: 'started' });
  // Real CPU-bound synchronous SQLite, deliberately far beyond the deadline.
  database.prepare('WITH RECURSIVE counter(n) AS (VALUES(0) UNION ALL SELECT n+1 FROM counter WHERE n<1000000000) SELECT sum(n) FROM counter').get();
  process.send({ id: request.id, rows: [] });
});
