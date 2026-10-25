# 逆向工程知识正文 · 首批

核对日期：2026-10-25。本批包含 20 条知识正文，来源登记 29 项。正文有原理、分析例、判断方法和边界；不包含学习路线。

本目录同时是符合现有万象 Markdown 元数据格式的内容包。cards/ 保存正文，sources/ 保存出处及读取状态，manifest.json 保存条目与文件哈希。外部来源通过 externalSources 和文末链接保留；sourceSession 使用 external: 前缀且 sourceSeqs 为空，未伪造宿主消息引用。

## 知识条目

- [PE：文件偏移、RVA、VA 与零填充区域](cards/wx-re-pe-address.md)
- [PE：导入表、IAT 与间接调用的含义](cards/wx-re-pe-import.md)
- [PE：导出转发字符串与函数地址的区别](cards/wx-re-pe-forwarder.md)
- [Windows x64：参数位置、影子空间和栈偏移](cards/wx-re-x64-abi.md)
- [反编译：伪代码、类型推断与真实指令证据](cards/wx-re-decompiler-evidence.md)
- [动态调试：执行断点与数据观察点如何定位不同问题](cards/wx-re-watchpoints.md)
- [优化代码：变量不可见、内联与源码单步跳行](cards/wx-re-optimized-variables.md)
- [ELF：节视图、段视图与动态信息的交叉读取](cards/wx-re-elf-views.md)
- [ELF：PLT、GOT 与延迟绑定的调用链](cards/wx-re-elf-plt-got.md)
- [Android：多组件入口与界面事件到业务方法的定位](cards/wx-re-android-entry.md)
- [DEX：字符串、类型、方法索引与方法实现的区别](cards/wx-re-dex-indices.md)
- [JNI：名称解析、动态注册与 Java 到 Native 的映射](cards/wx-re-jni-registration.md)
- [Android：反编译异常时用字节码核对分支与调用](cards/wx-re-jadx-smali.md)
- [动态插桩：调用期间的数据生命周期与观测偏差](cards/wx-re-frida-observation.md)
- [二进制字符串：编码、运行时构造与交叉引用证据](cards/wx-re-strings-context.md)
- [能力识别：capa 规则命中与真实行为的证据层级](cards/wx-re-capa-evidence.md)
- [符号执行：路径条件、模型假设与结果复核](cards/wx-re-symbolic-constraints.md)
- [固件：签名、熵与嵌入内容识别的边界](cards/wx-re-firmware-entropy.md)
- [.NET：元数据、IL 与本机代码的分析层次](cards/wx-re-dotnet-layers.md)
- [编译前端：词法单元与语法结构为何必须分开](cards/wx-re-lexer-recovery.md)

## 证据说明

知识为原创归纳，示例均标明本库构造，未下载或执行样本，未把文献核对标成实测。来源不是全文镜像，不承诺网页永久可用，也未固定所有上游仓库的提交版本。涉及版本的行为需在使用时再次核对。

吾爱破解主页访问失败、ELF gABI 被拒绝访问；只登记待采集，未作为知识依据。Reddit 本次只读取发现页，未将列表中的标题转成技术结论。GitHub 仓库并非每个都单独生成卡片，避免把工具目录当作知识正文。

## 维护与导入

新增知识沿用稳定 ID；修订应保留旧版及变更原因。工具或样本实测后，再单独补充环境、版本、输入与输出证据。

在项目根目录运行：

```powershell
node scripts/import-reverse-knowledge.mjs --root 'C:\绝对路径\万象知识库'
```

导入只新增文件，相同文件跳过，冲突时拒绝覆盖；不会修改已有知识或直接写宿主数据库。已运行的插件需在空闲时使用界面中的“重建索引”刷新缓存。
