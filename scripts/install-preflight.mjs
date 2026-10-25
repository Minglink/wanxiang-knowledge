import { mkdir, readFile, readdir, lstat, copyFile, cp, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

export async function inventory(root, relative = '') {
  const records = [];
  for (const name of (await readdir(path.join(root, relative))).sort()) {
    const rel = path.join(relative, name);
    const stat = await lstat(path.join(root, rel));
    if (stat.isSymbolicLink()) throw new Error('知识目录含符号链接，需先人工检查备份范围');
    if (stat.isDirectory()) records.push(...await inventory(root, rel));
    else if (stat.isFile()) records.push({ file: rel, bytes: stat.size, sha256: createHash('sha256').update(await readFile(path.join(root, rel))).digest('hex') });
  }
  return records;
}

export async function backupKnowledge(knowledgeRoot, destination) {
  const source = path.resolve(knowledgeRoot), target = path.resolve(destination);
  if (target === source || target.toLocaleLowerCase().startsWith(source.toLocaleLowerCase() + path.sep)) throw new Error('备份不能位于知识目录内部');
  const before = await inventory(source);
  await cp(source, target, { recursive: true, errorOnExist: true, force: false });
  const copied = await inventory(target);
  const after = await inventory(source);
  if (JSON.stringify(before) !== JSON.stringify(copied) || JSON.stringify(before) !== JSON.stringify(after)) throw new Error('备份校验不一致，停止安装');
  return copied;
}

export async function hostIdle(base) {
  const url = new URL(base);
  if (!['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname) || url.protocol !== 'http:') throw new Error('只允许本机Harness地址');
  const htmlResponse = await fetch(new URL('/wanxiang', url), { signal: AbortSignal.timeout(5000) });
  if (!htmlResponse.ok) throw new Error('无法读取已安装插件，不能确认会话状态');
  const html = await htmlResponse.text();
  const token = html.match(/name="wanxiang-token" content="([^"]+)"/)?.[1];
  if (!token) throw new Error('无法获取本机插件访问令牌');
  const api = async action => {
    const response = await fetch(new URL('/api/wanxiang/' + action, url), { headers: { 'x-wanxiang-token': token }, signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error('无法确认宿主状态');
    return response.json();
  };
  const sessions = await api('sessions');
  if (!Array.isArray(sessions) || sessions.some(session => typeof session.running !== 'boolean')) throw new Error('宿主未明确提供全部会话运行状态，停止安装');
  if (sessions.some(session => session.running)) throw new Error('存在正在执行的会话，停止安装');
  const state = await api('state');
  if (state.jobs.some(job => ['running', 'queued'].includes(job.status))) throw new Error('存在未完成落库任务，停止安装');
  if (state.imports?.some(job => ['running', 'queued'].includes(job.status))) throw new Error('存在未完成导入或文件夹学习任务，停止安装');
  if (state.metadataJob?.status === 'running') throw new Error('存在未完成元数据整理任务，停止安装');
  return { knowledgeRoot: state.settings.root, sessions: sessions.length, checkedAt: new Date().toISOString() };
}

export async function installPreflight(base, backup, home) {
  const status = await hostIdle(base);
  await mkdir(backup, { recursive: true });
  const files = await backupKnowledge(status.knowledgeRoot, path.join(backup, 'knowledge'));
  const settingsFile = path.join(home, 'wanxiang/settings.json');
  const settings = JSON.parse(await readFile(settingsFile, 'utf8'));
  if (path.resolve(settings.root) !== path.resolve(status.knowledgeRoot)) throw new Error('磁盘配置与宿主知识目录不一致，停止安装');
  await copyFile(settingsFile, path.join(backup, 'wanxiang-settings.json'));
  // Back up only known profile files, never credentials or session history.
  for (const file of ['package.json', 'pnpm-lock.yaml', 'cordis.patch.yml']) {
    try { await copyFile(path.join(home, 'profiles/desktop', file), path.join(backup, file)); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  const finalStatus = await hostIdle(base);
  if (finalStatus.knowledgeRoot !== status.knowledgeRoot) throw new Error('备份期间目录变更，停止安装');
  await writeFile(path.join(backup, 'inventory.json'), JSON.stringify({ ...finalStatus, files }, null, 2));
  return { backup, files: files.length, sessions: finalStatus.sessions, checkedAt: finalStatus.checkedAt };
}
