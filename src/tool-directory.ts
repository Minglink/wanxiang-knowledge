import type { Host, Tool } from './types.js';
import type { ToolDiscovery } from './tool-discovery.js';
import { classifyTool, toolCategories } from './tool-categories.js';
import { redacted } from './knowledge-prompts.js';

export interface DirectoryEntry {
  key: string;
  name: string;
  category: string;
  hostToolName: string;
  callable: boolean;
  toolId?: string;
  description: string;
  status: string;
  version: string;
  detector?: string;
  environmentStatus?: string;
  path: string;
  parameters: string[];
}
export interface ToolDirectory {
  discovery: Omit<ToolDiscovery, 'tools'>;
  groups: { category: string; callable: number; items: DirectoryEntry[] }[];
  total: number;
  callable: number;
}
const titles: Record<string, string> = {
  security_binary_inspect: 'PE / ELF 静态分析', security_disassemble: 'Capstone 反汇编',
  security_pcap_summary: '数据包分析（TShark / dpkt）', security_http_flows: 'mitmproxy 流量解析',
  security_frida_devices: 'Frida 设备枚举', security_capture_interfaces: 'TShark 抓包接口',
  security_capture_bounded: 'TShark 限时抓包', security_apk_inspect: 'APK 静态分析',
  security_dex_inspect: 'DEX 类与方法分析', security_dotnet_inspect: '.NET 程序集分析',
  security_jadx_decompile: 'JADX 类反编译', security_yara_scan: 'YARA 规则匹配',
};

export async function readToolDirectory(host: Host, manual: Tool[], sessionId = ''): Promise<ToolDirectory> {
  let discovery: ToolDiscovery = { available: false, scope: 'global', warning: '宿主未提供工具发现接口，仅显示手动登记。', tools: [] };
  try { if (host.listTools) { const found = await host.listTools(sessionId); if (!found || !Array.isArray(found.tools)) throw new Error('Invalid tool directory'); discovery = found; } }
  catch { discovery.warning = '宿主工具目录暂不可读取，仅显示手动登记。'; }
  const consumed = new Set<string>();
  const entries: DirectoryEntry[] = discovery.tools.map(tool => {
    const saved = manual.find(item => item.hostToolName === tool.name);
    if (saved) consumed.add(saved.id);
    const category = saved?.categoryMode !== 'auto' && saved?.category
      ? saved.category : classifyTool({ ...tool, notes: saved?.notes });
    return {
      key: 'host:' + tool.name, name: redacted(saved?.name || titles[tool.name] || tool.name), category,
      hostToolName: tool.name, callable: true, toolId: saved?.id,
      description: redacted(saved?.notes || tool.description), status: '已注册',
      version: saved?.version || '', detector: saved?.detector, environmentStatus: saved?.status, path: saved?.path || '', parameters: tool.parameters,
    };
  });
  for (const tool of manual) {
    if (consumed.has(tool.id)) continue;
    entries.push({
      key: 'manual:' + tool.id, name: tool.name,
      category: tool.categoryMode === 'auto' ? classifyTool(tool) : tool.category || '其他工具',
      hostToolName: tool.hostToolName || '', callable: false, toolId: tool.id,
      description: tool.notes, status: tool.hostToolName ? '当前范围未注册' : '手动登记',
      version: tool.version, detector: tool.detector, environmentStatus: tool.status, path: tool.path, parameters: [],
    });
  }
  const groups = new Map<string, DirectoryEntry[]>();
  for (const entry of entries) {
    const items = groups.get(entry.category) || [];
    items.push(entry);
    groups.set(entry.category, items);
  }
  const order = (category: string) => toolCategories.includes(category) ? toolCategories.indexOf(category) : toolCategories.length;
  return {
    discovery: { available: discovery.available, scope: discovery.scope, sessionId: discovery.sessionId, warning: discovery.warning },
    groups: [...groups].sort(([a], [b]) => order(a) - order(b) || a.localeCompare(b)).map(([category, items]) => ({
      category, callable: items.filter(item => item.callable).length,
      items: items.sort((a, b) => Number(b.callable) - Number(a.callable) || a.name.localeCompare(b.name)),
    })),
    total: entries.length, callable: entries.filter(item => item.callable).length,
  };
}
