import { redacted } from './knowledge-prompts.js';

export interface DiscoveredTool { name: string; description: string; parameters: string[] }
export interface ToolDiscovery {
  available: boolean;
  scope: 'global' | 'session';
  sessionId?: string;
  warning?: string;
  tools: DiscoveredTool[];
}

/** Read the same public schema registry used by the Host, without executing tools. */
export function discoverHostTools(ctx: any, sessionId = ''): ToolDiscovery {
  const result: ToolDiscovery = { available: false, scope: 'global', tools: [] };
  try {
    const registry = ctx.get?.('tools') ?? ctx.tools;
    if (typeof registry?.schemas !== 'function') {
      return { ...result, warning: '宿主工具目录暂不可读取，手动登记仍可使用。' };
    }
    const agent = sessionId ? ctx.agents?.get(sessionId) : undefined;
    if (agent) {
      result.scope = 'session';
      result.sessionId = sessionId;
    } else if (sessionId) {
      result.warning = '该会话尚无活动工具上下文，当前显示宿主全局工具；未启动或恢复会话。';
    }
    const schemas = registry.schemas(agent);
    if (!Array.isArray(schemas)) throw new Error('Invalid registry response');
    const unique = new Map<string, DiscoveredTool>();
    for (const schema of schemas) {
      if (typeof schema?.name !== 'string' || !schema.name) continue;
      unique.set(schema.name, {
        name: redacted(schema.name).slice(0, 200),
        description: redacted(String(schema.description || '')).slice(0, 2000),
        parameters: Object.keys(schema.parameters?.properties || {}).map(key => redacted(key).slice(0, 100)),
      });
    }
    return { ...result, available: true, tools: [...unique.values()].sort((a, b) => a.name.localeCompare(b.name)) };
  } catch {
    return { ...result, warning: '读取宿主工具目录失败，保留手动登记；可稍后刷新重试。' };
  }
}
