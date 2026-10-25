---
{
  "schemaVersion": 2,
  "id": "wx-re-focus-shell-android-inmemory",
  "title": "Android内存DEX加载：载体变化与执行语义变化",
  "type": "note",
  "tags": [
    "壳",
    "Android",
    "DEX",
    "InMemoryDexClassLoader",
    "类加载器"
  ],
  "project": "壳与装载研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "公开资料原创归纳（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "736f59261574e593aa6f502cd60a4473bbe619b7ffb08820b28980a9ab185aba",
  "generatedHash": "18c6ecdf1426229c8e5cceb7d59e642a14b0cdb763f51c2bbb7bc12bf55f846e",
  "archived": false,
  "verification": "已阅读相关来源并作机制归纳；构造示例未执行；未复现样本",
  "l0": "从内存缓冲区加载DEX改变字节码载体，但本身不意味着DEX已经被自定义VM虚拟化。",
  "l1": "Android公开API允许InMemoryDexClassLoader从包含DEX的ByteBuffer创建类加载器。研究时应关联缓冲区内容来源、有效范围、加载器实例及父加载器关系，再跟踪实际解析的类和方法。载体在内存中不改变DEX作为标准字节码的基本身份。 本库构造：应用先解压资源再放入ByteBuffer，之后由标准运行时加载。此流程涉及封装与动态加载，仍可能执行正常DEX方法；只有发现自定义操作码和解释执行证据，才进一步讨论保护VM。 多个构造函数和可用API级别存在差异，应核对目标Android版本。缓冲区出现DEX头也不保证完整有效，加载器对象存在也不证明某类已被执行；本库没有采集设备内存或运行附件。",
  "questions": [
    "InMemoryDexClassLoader是否就是VMP？",
    "分析Android内存加载时应记录哪些对象？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-dex-indices",
      "kind": "相关机制"
    }
  ],
  "externalSources": [
    {
      "id": "classloader",
      "url": "https://developer.android.com/reference/dalvik/system/InMemoryDexClassLoader",
      "checkedAt": "2026-10-25",
      "version": "获取日公开文档；未固定上游提交"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "万象知识库原创归纳；引文和原始资料权利归各自作者"
}
---
# Android内存DEX加载：载体变化与执行语义变化

## 机制

Android公开API允许InMemoryDexClassLoader从包含DEX的ByteBuffer创建类加载器。研究时应关联缓冲区内容来源、有效范围、加载器实例及父加载器关系，再跟踪实际解析的类和方法。载体在内存中不改变DEX作为标准字节码的基本身份。

## 分析例与核对方法

本库构造：应用先解压资源再放入ByteBuffer，之后由标准运行时加载。此流程涉及封装与动态加载，仍可能执行正常DEX方法；只有发现自定义操作码和解释执行证据，才进一步讨论保护VM。

## 判断边界

多个构造函数和可用API级别存在差异，应核对目标Android版本。缓冲区出现DEX头也不保证完整有效，加载器对象存在也不证明某类已被执行；本库没有采集设备内存或运行附件。

## 来源与核验

- [InMemoryDexClassLoader](https://developer.android.com/reference/dalvik/system/InMemoryDexClassLoader)；作者/维护者：Android Open Source Project；版本：获取日公开文档；未固定上游提交；核对日期：2026-10-25。

本文是本库原创机制归纳。“本库构造”的例子用于说明判断方法，没有下载或执行论坛附件、保护样本；文献核对不等于实验复现。原始资料权利归其作者，本文不镜像论坛全文。
