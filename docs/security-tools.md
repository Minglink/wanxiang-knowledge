# DeepSeek Harness 安全分析工具库

这套工具由万象插件注册到 Harness 的模型工具服务。安装软件、工具库登记和模型接口分别可核验；目录中的“可用”表示组件版本检测成功，具体分析仍可能因文件损坏、架构选择、设备连接而失败。

## 已接入的接口

| Harness 工具 | 实际组件 | 输入与结果 |
|---|---|---|
| `security_environment` | Python 专用环境、TShark | 实时查询组件版本 |
| `security_binary_inspect` | pefile、pyelftools | 文件绝对路径；PE/ELF 头、区段、PE 导入导出、SHA256 |
| `security_disassemble` | Capstone | 文件、架构、文件偏移、显示地址；最多 4096 字节、256 条指令 |
| `security_strings` | 内置提取器 | 文件；ASCII/UTF16LE 字符串和字节偏移 |
| `security_pcap_summary` | TShark，缺失时 dpkt | 已有 pcap/pcapng；前 N 包的地址、端口、协议等元数据 |
| `security_http_flows` | mitmproxy | 已保存的 mitmproxy 流量文件；方法、主机、路径、状态码、长度 |
| `security_frida_devices` | Frida | 当前可见设备列表 |

在 Harness 中可直接提出：“用万象工具分析 `C:\samples\demo.exe` 的 PE 导入和区段”，或“读取 `C:\captures\demo.pcapng` 的前 100 个包”。反汇编需要明确 `arch=x86/x64/arm/thumb/arm64`。文件偏移不是 RVA，`address` 只设置显示地址，不会自动换算地址。

Frida、frida-ps、mitmdump、mitmweb 等完整 CLI 安装在专用 Python 环境的 Scripts 目录。代理启动、证书配置、进程附加及脚本注入需要各自的目标和工作流。实时抓包现已补齐 Npcap，并提供限量抓包接口，需要明确接口与 BPF 过滤器；不会在安装时抓取日常流量。

## 第二批扩展：25项组件、23个模型接口

新增安装 Androguard、dnfile、dncil、LIEF、YARA、oletools、puremagic、Scapy、Keystone、Unicorn、Ropper、ROPGadget、capa、Temurin JDK 21、JADX、Apktool、Npcap、FLOSS，共18项。dncil、Scapy、Unicorn、Ropper、ROPGadget、Apktool 已安装完整组件/CLI，目前没有独立的模型操作；工具目录明确标注此状态。

| 新增 Harness 接口 | 能力 |
|---|---|
| `security_extra_environment` | 扩展环境版本 |
| `security_identify` | 文件魔数和格式候选 |
| `security_apk_inspect` / `security_dex_inspect` | APK权限、组件与DEX类/方法 |
| `security_dotnet_inspect` | .NET元数据、类型、方法RVA与引用 |
| `security_yara_scan` | 使用本地规则扫描，禁用include，10秒超时 |
| `security_office_macros` | VBA源码预览及可疑指标 |
| `security_archive_inventory` | ZIP/APK/JAR成员和路径风险，不解压 |
| `security_lief_inspect` | PE/ELF/Mach-O区段与入口 |
| `security_firmware_inspect` | 固件签名候选、整体熵与跨文件采样 |
| `security_assemble` | x86/x64/ARM/ARM64汇编转换机器码，不执行 |
| `security_jadx_decompile` | 反编译指定完整类名；输出Java源文件 |
| `security_capture_interfaces` | 真实TShark抓包接口枚举 |
| `security_capture_bounded` | 明确接口和BPF过滤器；1–20秒、最多200包/2MB，任意上限达到即结束 |
| `security_capa` | 官方规则能力识别，格式pe/elf/dotnet/sc32/sc64；命中不等于恶意判定 |
| `security_floss` | 默认静态字符串；mode=all增加工具内部的栈与解码字符串仿真 |

第二套 Python 环境位于 `tool-runtime/analysis-python`，与 mitmproxy/Frida 隔离。完整版本记录在 `analysis-requirements.lock.txt`；`node scripts/setup-security-extra.mjs` 检测已经安装的组件并合并目录。capa 的 PyPI 库不附带默认规则，本机另装官方 capa-rules 快照 `21332a057f5be39fa145bc4aea7ae2431ff05fc3`，运行时使用固定规则路径。FLOSS使用官方独立版3.2.0，JADX/Apktool/FLOSS发行资产按GitHub官方release API的SHA256核验；Npcap安装包按Windows签名核验。

扩展组件可在创建虚拟环境后用 PyPI 安装：

```powershell
python -m venv "$env:USERPROFILE\.dsh\wanxiang\tool-runtime\analysis-python"
& "$env:USERPROFILE\.dsh\wanxiang\tool-runtime\analysis-python\Scripts\python.exe" -m pip install androguard dnfile dncil lief yara-python oletools puremagic scapy keystone-engine unicorn ropper ROPGadget flare-capa
```

JADX、Apktool、Java和FLOSS的实际路径以 `runtime.json` 为准。Npcap免费版通过官方图形安装器安装；不要将其视为支持免费静默安装或可重新分发的组件。抓包原始数据保存在 `tools/captures`，反编译结果和capa/FLOSS隔离输入副本保存在 `tools/artifacts`。这些本地文件可能含业务资料，保留到用户自行清理。

## 安装和配置

Windows 安装 Wireshark（winget 验证发行包哈希）：

```powershell
winget install --id WiresharkFoundation.Wireshark --exact --source winget --silent --accept-package-agreements --accept-source-agreements --disable-interactivity
node scripts/setup-security-tools.mjs
```

脚本安装 PyPI 包到 `~/.dsh/wanxiang/tool-runtime/python`，记录实际解析版本至 `requirements.lock.txt`，不修改系统 Python。`--register-only` 只登记已安装的环境。重复执行默认 pip install 会保留满足条件的已装版本；若需要从同一批确切版本恢复，可先创建虚拟环境，再 `python -m pip install -r requirements.lock.txt`。锁文件记录版本，不是完整供应链哈希锁。

`DSH_HOME` 可指定另一套 Harness 目录；`WANXIANG_PYTHON` 可指定创建虚拟环境使用的 Python；`WANXIANG_TSHARK` 可指定已安装的 TShark 路径。配置文件位于 `~/.dsh/wanxiang/tool-runtime/runtime.json`；模型输入和目录中可编辑的 path 字段不能覆盖这些执行路径。

工具目录合并到配置的知识根目录 `tools/catalog.json`，已有条目保留；覆盖同一批受管理工具时备份目录，并保留已有知识关联。修改目录后，已运行的旧插件需要重新加载才会读入新目录。

插件更新使用现有流程：先 `npm run pack:plugin`，设置 `WANXIANG_HOST_URL` 为当前 Harness 内部本机地址，再运行 `node scripts/install-desktop.mjs`。安装器核验所有会话空闲、完整备份知识目录并检查哈希；不会用调试载体冒充真实宿主。

## 运行记录与限制

每次调用在知识目录 `tools/runs/<uuid>.json` 保存操作、文件路径、开始/结束时间、成功/失败及有长度上限的结果。输入文件不超过 128MB，单次进程最多 30 秒、输出最多 2MB，返回正文约 22KB；超出正文预算会明确返回 truncated 和预览。原始网络负载与 HTTP 正文不返回，结果经过现有密钥脱敏。文件路径、域名、IP、字符串和 URL 路径仍可能包含业务信息，运行记录按本地知识资料保存。

所有分析使用固定程序和参数数组，不经 shell，不执行被分析文件。解析器属于本机进程隔离，**不是恶意样本沙箱**；超时与文件大小限制也不能替代操作系统沙箱。计数上限表示前缀，不代表完整文件统计；dpkt 回退只解析支持的链路格式，遇到其他链路会标记。异常或不完整文件需要结合具体错误判断。

## 官方来源

- [Wireshark Windows 安装说明](https://www.wireshark.org/docs/wsug_html_chunked/ChBuildInstallWinInstall.html)、[TShark 参数](https://www.wireshark.org/docs/man-pages/tshark.html)
- [Frida 安装](https://frida.re/docs/installation/)
- [mitmproxy 安装](https://docs.mitmproxy.org/stable/overview/installation/)
- [pefile](https://github.com/erocarrera/pefile)、[pyelftools](https://github.com/eliben/pyelftools)、[Capstone](https://www.capstone-engine.org/)、[dpkt](https://github.com/kbandla/dpkt)
