# 万象知识库

DeepSeek Harness 本地知识库插件。已针对 Windows 上的 `0.2.1-alpha.1` 运行时开发；其他版本需要兼容测试。

## 使用

安装后从宿主侧栏打开「万象知识库」，或点击右下角「会话落库」。选择当前或历史会话，点击「生成到本地」。AI 整理使用宿主已配置的模型；「设置」可切换为无需模型的「原文导出」。

生成结果保存为本地 Markdown，带来源会话 ID、消息序号和生成方式；支持中文搜索、阅读编辑、复制引用、归档恢复及索引重建。相同快照重复生成不会重复发布；新增消息会生成独立的增量记录，保留旧笔记和手工修改。

工具库支持登记 CLI、本地应用、MCP、脚本和链接，关联知识 ID。Node.js、Python、Git、PowerShell 的检测器仅在系统 PATH 中执行固定版本查询；登记的路径不会被当作命令执行。未检测条目不会显示为可用。

## 安装

仓库附带 [0.2.0-alpha.2 插件安装包](https://github.com/Minglink/wanxiang-knowledge/raw/refs/heads/main/artifacts/dsh-wanxiang-knowledge-0.2.0-alpha.2.tgz)，可下载后通过宿主的本地插件安装入口加载。源码验证与实机测试范围见 [测试报告](https://github.com/Minglink/wanxiang-knowledge/blob/main/docs/测试报告.md)。

使用宿主支持的本地插件包安装入口选择 `dsh-wanxiang-knowledge-0.2.0-alpha.2.tgz`。开发机也可在项目目录运行：

```powershell
npm install
npm run build
npm run typecheck
npm test
npm run pack:plugin
$env:WANXIANG_HOST_URL='http://127.0.0.1:<当前Harness端口>'
node scripts/install-desktop.mjs
```

安装脚本通过本机桌面版自带的插件管理 CLI 安装。必须提供当前本机 WANXIANG_HOST_URL；先确认全部会话明确处于空闲、无落库任务，完整备份知识目录并逐文件校验哈希，同时备份插件设置及 profile 的 manifest、锁文件和覆盖配置。检查或备份失败会停止安装。默认安装位置为 `%LOCALAPPDATA%/Programs/DeepSeek Harness`，可用环境变量 `WANXIANG_HARNESS_DIR` 指定其他位置。若宿主未热加载新插件，请在正在执行的会话完成后正常退出并重新打开 Harness。

普通 Web profile 可以使用该版本宿主的 `dsh plugin --profile web add <插件包路径>`。

## 数据

默认目录是用户 Documents 下的「万象知识库」，可在设置中填写新的绝对路径。切换目录不会移动或删除旧文件。配置保存于 `<DSH_HOME>/wanxiang/settings.json`。

正文存于 `notes/`、`cards/`；工具登记保存在 `tools/catalog.json`；来源摘录存于 `sources/`；索引、任务和修订历史存于 `.wanxiang/`。Markdown 元数据以 YAML 兼容的 JSON 对象保存。主引擎为 node:sqlite + FTS5，不能使用时自动降级 sql.js 并提示“大规模场景受限”。检索支持精确子串、混合关键词、深度正文三模式；中文预分词与两字词、卡片 questions[] 和本地别名表共同补强自然语言召回，未实现向量检索。智能改写可选，发送查询给宿主模型，800ms超时回退到规则。

0.2.0-alpha.2 增加存储与检索：正文按需读取；新笔记按年月、新卡片按项目分片，同时维护顶层兼容副本，供0.1.0读取。旧目录不自动整理。设置提供整理预检、备份及撤销；单侧外部编辑可同步，双方不同修改会停止并提示人工处理。请保留 `.wanxiang/mirrors.json` 及备份。副本会增加磁盘占用。

日志页提供摘要与问法补全，每批20条、可暂停续跑，只补元数据并保留修订。启动补全会发送已有知识正文给宿主模型。别名配置保存在 `.wanxiang/aliases.json`，仅在本机使用。

知识文件与检索在本机处理；AI 模式会向宿主模型服务发送选定会话的正文。插件会屏蔽部分常见凭据格式，这不代表能识别所有敏感内容。原文导出不会调用模型。插件不修改或删除 Harness 会话日志，不自动执行知识中的命令。

## 恢复与维护

- 失败和取消可以从日志重试；发布阶段中断后根据已保存清单恢复。
- 索引写入失败后重试会先恢复索引，避免再次模型生成。
- 手工修改前保留修订副本，存在 `.wanxiang/revisions/`。
- 备份时复制整个知识目录。索引可重建，来源、修订和任务记录应随正文一起备份。
- 卸载插件可通过宿主插件管理器完成；知识目录默认保留。

## 开发验证

`npm test` 验证文件写入、中文检索、去重、增量、取消重试、恢复、工具检测和真实 HTTP 请求。`npm run dev` 提供独立调试载体，地址为 `http://127.0.0.1:3098/wanxiang`，只使用明确标识的开发测试会话，不读取个人会话或调用模型。它不代替在真实 Harness 中的集成测试。

## 当前范围

自动模式仅登记待落库候选，生成由用户触发。附件二进制、图像 OCR、语义搜索、批量历史迁移、自动主题合并和云同步未包含在 0.1.0 中。长会话按段整理，上限为 100 段；每张知识卡片必须引用输入中存在的消息序号。模型输出通过结构与来源序号校验，结论仍需结合原文核验。

v0.2 调查结论见 `docs/审计清单.md`、`docs/注入点验证.md`、`docs/引擎探针.md` 和 `docs/测试报告.md`。`node scripts/audit-v02.mjs` 用临时合成库审计页面；`node scripts/eval-recall.mjs` 运行80条固定查询的召回评测（先 build）。`scripts/probes/` 默认关闭且不随产品入口加载；宿主探针需用已安装 Electron 的 Node 模式显式启动。0.2.0-alpha.2 提供总览、知识库、工具库三处图谱入口、球体/神经网络布局、关系详情双向跳转与节点定位。画布保持白色，3000输入自动聚合，支持键盘节点列表与减少动态效果。性能数据与实机限制见测试报告。

回滚可使用保留的 `artifacts/dsh-wanxiang-knowledge-0.1.0.tgz` 重新安装，安装前仍需确认空闲并备份。第2期实现 node:sqlite/FTS5、questions[]、分片与兼容副本；自动召回、对账与反思仍待后续期。整理撤销会核对后续编辑，存在变化时拒绝覆盖；同步异常可回滚，跨文件断电恢复未实机验证。

基准：`node scripts/bench.mjs --run`（三档原生FTS，不含Markdown文件或完整SearchService）；`node --expose-gc scripts/bench-memory.mjs` 对比10万条正文与元数据Map；`node scripts/eval-recall.mjs test/fixtures/recall-eval.json --hybrid` 复测关键词和自然语言。固定合成评测不是实际用户查询或在线模型质量承诺。

## 第3期开发状态（尚未发布）

源码已接入自动召回三档、隐私确认、只读缓存section、可强制终止的隔离SQL子进程、召回记录/反馈/屏蔽和渐进披露工具。默认档位为自动注入；首次确认会向宿主模型发送知识摘要前不会开始自动注入。section未就绪就跳过该步，不阻塞请求。智能改写默认关闭，实测provider单次改写已超过200ms预算。

当前安装与交付包仍是alpha.2；第3期未整体验收、未安装上线。真实知识库正在准备，真实历史留出评测和正式阈值尚未完成；代码中的0.65是开发占位，合成策略评测在该值下漏召率76.25%，不可据此宣称效果达标。`node scripts/eval-recall-policy.mjs`仅运行合成正负例；`node scripts/bench-recall.mjs --run`测实际隔离检索耗时并保留超时比例。百万条基准20/40次超时放弃。

仅显式构建的第3期临时探针包用于生产合成会话验证，产品包不导入探针。清理探针和安装新产品前仍必须确认宿主空闲、备份知识目录；用户制作知识库期间不自动重启。
