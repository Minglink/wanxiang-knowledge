# 万象知识库

DeepSeek Harness 本地知识库插件。已针对 Windows 上的 `0.2.1-alpha.1` 运行时开发；其他版本需要兼容测试。

## 使用

安装后从宿主侧栏打开「万象知识库」，或点击右下角「会话落库」。选择当前或历史会话，点击「生成到本地」。AI 整理使用宿主已配置的模型；「设置」可切换为无需模型的「原文导出」。

生成结果保存为本地 Markdown，带来源会话 ID、消息序号和生成方式；支持中文搜索、阅读编辑、复制引用、归档恢复及索引重建。相同快照重复生成不会重复发布；新增消息会生成独立的增量记录，保留旧笔记和手工修改。

工具库支持登记 CLI、本地应用、MCP、脚本和链接，关联知识 ID。Node.js、Python、Git、PowerShell 的检测器仅在系统 PATH 中执行固定版本查询；登记的路径不会被当作命令执行。未检测条目不会显示为可用。

## 安装

仓库附带 [0.1.0 插件安装包](https://github.com/Minglink/wanxiang-knowledge/raw/refs/heads/main/artifacts/dsh-wanxiang-knowledge-0.1.0.tgz)，可下载后通过宿主的本地插件安装入口加载。源码验证与实机测试范围见 [测试报告](https://github.com/Minglink/wanxiang-knowledge/blob/main/docs/测试报告.md)。

使用宿主支持的本地插件包安装入口选择 `dsh-wanxiang-knowledge-0.1.0.tgz`。开发机也可在项目目录运行：

```powershell
npm install
npm run build
npm run typecheck
npm test
npm run pack:plugin
node scripts/install-desktop.mjs
```

安装脚本通过本机桌面版自带的插件管理 CLI 安装，先备份 profile 的 manifest、锁文件和覆盖配置。默认安装位置为 `%LOCALAPPDATA%/Programs/DeepSeek Harness`，可用环境变量 `WANXIANG_HARNESS_DIR` 指定其他位置。若宿主未热加载新插件，请在正在执行的会话完成后正常退出并重新打开 Harness。

普通 Web profile 可以使用该版本宿主的 `dsh plugin --profile web add <插件包路径>`。

## 数据

默认目录是用户 Documents 下的「万象知识库」，可在设置中填写新的绝对路径。切换目录不会移动或删除旧文件。配置保存于 `<DSH_HOME>/wanxiang/settings.json`。

正文存于 `notes/`、`cards/`；工具登记保存在 `tools/catalog.json`；来源摘录存于 `sources/`；索引、任务和修订历史存于 `.wanxiang/`。Markdown 元数据以 YAML 兼容的 JSON 对象保存。当前检索使用 SQLite 的 Unicode 规范化子串匹配与多词交集，未包含向量检索。

v0.2 第0期仅增加调查和隔离探针，不更改上述目录或产品行为。当前平铺扫描尚不支持 v2 分片目录，相关兼容迁移与回滚验证在后续存储期进行。

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

v0.2 调查结论见 `docs/审计清单.md`、`docs/注入点验证.md`、`docs/引擎探针.md` 和 `docs/测试报告.md`。`node scripts/audit-v02.mjs` 用临时合成库审计页面；`node scripts/eval-recall.mjs` 运行60条固定查询的召回评测（先 build）。`scripts/probes/` 默认关闭且不随产品入口加载；宿主探针需用已安装 Electron 的 Node 模式显式启动。0.2.0-alpha.1 的图谱、修复、打包安装属于第1期，尚未交付。
