export const toolCategories = ['逆向分析', '流量分析', '动态分析', '抓包代理', '知识管理', '文件与代码', '网络与浏览', '会话与任务', '运行环境', '其他工具'];

export function classifyTool(tool: { name?: string; description?: string; notes?: string; detector?: string; hostToolName?: string }) {
  const text = [tool.name, tool.description, tool.notes, tool.detector, tool.hostToolName].filter(Boolean).join(' ');
  const rules: [string, RegExp][] = [
    ['运行环境', /(?:^|[_\s])(?:environment|versions?)(?:$|[_\s])|运行环境|组件版本|Node\.js|Python版本/i],
    ['抓包代理', /mitmproxy|mitmdump|http_flows|抓包代理|代理流量/i],
    ['流量分析', /wireshark|tshark|dpkt|pcap|scapy|capture_|packet|流量|数据包|抓包/i],
    ['动态分析', /frida|x64dbg|lldb|gdb|debugger|动态分析|调试器/i],
    ['逆向分析', /security_|ig5_|reverse|pefile|pyelftools|capstone|disassembl|反汇编|逆向|静态分析|ELF|Mach-O|\bPE\b|APK|DEX|Androguard|YARA|固件|\.NET|字节码/i],
    ['知识管理', /knowledge|recall|知识|笔记|记忆|检索/i],
    ['文件与代码', /file|directory|str_replace|editor|read_|write_|bash|powershell|pwsh|terminal|shell|git_|代码|文件|目录|终端/i],
    ['网络与浏览', /web|browser|fetch|https?|浏览器|网页|搜索引擎/i],
    ['会话与任务', /session|agent|todo|schedule|goal|workflow|task|会话|子代理|任务|计划/i],
  ];
  return rules.find(([, expression]) => expression.test(text))?.[0] || '其他工具';
}
