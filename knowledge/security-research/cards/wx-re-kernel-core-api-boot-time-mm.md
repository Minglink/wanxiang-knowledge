---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-core-api-boot-time-mm",
  "title": "Linux 内核：启动时的内存管理",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "core-api"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "58466b3aea2c1cf78c3ea3b4c772abc905d5821cb5ecc57ba702ee925485adfb",
  "generatedHash": "433149ce890e8296a4bc8635ae1e34935227249388df4d045b2bb413107fc827",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "系统初始化早期“正常”的内存管理由于没有设置完毕无法使用。但是内核仍然需要 为各种数据结构分配内存，例如物理页分配器。 一个叫做 memblock 的专用分配器执行启动时的内存管理。特定架构的初始化 必须在setup_arch()中设置它，并在mem_init()函数中移除它。 一旦早期的内存管理可用，它就为内存分配提供了各种函数和宏。分配请求可以指向 第一",
  "l1": "系统初始化早期“正常”的内存管理由于没有设置完毕无法使用。但是内核仍然需要 为各种数据结构分配内存，例如物理页分配器。 一个叫做 memblock 的专用分配器执行启动时的内存管理。特定架构的初始化 必须在setup_arch()中设置它，并在mem_init()函数中移除它。 一旦早期的内存管理可用，它就为内存分配提供了各种函数和宏。分配请求可以指向 第一个（也可能是唯一的）节点或NUMA系统中的某个特定节点。有一些API变体在分 配失败时panic，也有一些不会panic的。 Memblock还提供了各种控制其自身行为的API。 下面是关于memblock数据结构、函数和宏的描述。其中一些实际上是内部的，但由于 它们被记录下来，漏掉它们是很愚蠢的。此外，阅读内部函数的注释可以帮助理解引 擎盖下真正发生的事情。",
  "questions": [
    "Linux 内核：启动时的内存管理的原理是什么？",
    "Linux 内核：启动时的内存管理有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-core-api-boot-time-mm",
      "url": "https://docs.kernel.org/translations/zh_CN/core-api/boot-time-mm.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：启动时的内存管理

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 启动时的内存管理

系统初始化早期“正常”的内存管理由于没有设置完毕无法使用。但是内核仍然需要
为各种数据结构分配内存，例如物理页分配器。

一个叫做 memblock 的专用分配器执行启动时的内存管理。特定架构的初始化
必须在setup\_arch()中设置它，并在mem\_init()函数中移除它。

一旦早期的内存管理可用，它就为内存分配提供了各种函数和宏。分配请求可以指向
第一个（也可能是唯一的）节点或NUMA系统中的某个特定节点。有一些API变体在分
配失败时panic，也有一些不会panic的。

Memblock还提供了各种控制其自身行为的API。

### Memblock概述

该API在以下内核代码中:

mm/memblock.c

### 函数和结构体

下面是关于memblock数据结构、函数和宏的描述。其中一些实际上是内部的，但由于
它们被记录下来，漏掉它们是很愚蠢的。此外，阅读内部函数的注释可以帮助理解引
擎盖下真正发生的事情。

该API在以下内核代码中:

include/linux/memblock.h
mm/memblock.c

## 来源、版本与核验

- 来源：[启动时的内存管理](https://docs.kernel.org/translations/zh_CN/core-api/boot-time-mm.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/core-api/boot-time-mm.rst`。
