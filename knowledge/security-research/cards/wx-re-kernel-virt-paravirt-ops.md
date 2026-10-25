---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-virt-paravirt-ops",
  "title": "Linux 内核：半虚拟化操作",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "virt"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "76aa6f2af87646351b721fbfe8775c03c0b0f5f6d9b03830e7a1af61ec6115e3",
  "generatedHash": "da17140521d85086e86e64e79f12c0f5bbbc9166a2a6b52d0c1ba39506187615",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "Linux提供了对不同管理程序虚拟化技术的支持。历史上，为了支持不同的虚拟机超级管理器 （hypervisor，下文简称超级管理器），需要不同的二进制内核，这个限制已经被pv_ops移 除了。Linux pv_ops是一个虚拟化API，它能够支持不同的管理程序。它允许每个管理程序 优先于关键操作，并允许单一的内核二进制文件在所有支持的执行环境中运行，包括本机",
  "l1": "Linux提供了对不同管理程序虚拟化技术的支持。历史上，为了支持不同的虚拟机超级管理器 （hypervisor，下文简称超级管理器），需要不同的二进制内核，这个限制已经被pv_ops移 除了。Linux pv_ops是一个虚拟化API，它能够支持不同的管理程序。它允许每个管理程序 优先于关键操作，并允许单一的内核二进制文件在所有支持的执行环境中运行，包括本机——没 有任何管理程序。 pv_ops提供了一组函数指针，代表了与低级关键指令和各领域高级功能相对应的操作。 pv-ops允许在运行时进行优化，在启动时对低级关键操作进行二进制修补。 - 简单的间接调用 :   这些操作对应于高水平的函数，众所周知，间接调用的开销并不十分重要。 - 间接调用，允许用二进制补丁进行优化 :   通常情况下，这些操作对应于低级别的关键指令。它们被频繁地调用，并且是对性能关 键。开销是非常重要的。 - 一套用",
  "questions": [
    "Linux 内核：半虚拟化操作的原理是什么？",
    "Linux 内核：半虚拟化操作有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-virt-paravirt-ops",
      "url": "https://docs.kernel.org/translations/zh_CN/virt/paravirt_ops.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：半虚拟化操作

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 半虚拟化操作

Linux提供了对不同管理程序虚拟化技术的支持。历史上，为了支持不同的虚拟机超级管理器
（hypervisor，下文简称超级管理器），需要不同的二进制内核，这个限制已经被pv\_ops移
除了。Linux pv\_ops是一个虚拟化API，它能够支持不同的管理程序。它允许每个管理程序
优先于关键操作，并允许单一的内核二进制文件在所有支持的执行环境中运行，包括本机——没
有任何管理程序。

pv\_ops提供了一组函数指针，代表了与低级关键指令和各领域高级功能相对应的操作。
pv-ops允许在运行时进行优化，在启动时对低级关键操作进行二进制修补。

pv\_ops操作被分为三类:

- 简单的间接调用
  :   这些操作对应于高水平的函数，众所周知，间接调用的开销并不十分重要。
- 间接调用，允许用二进制补丁进行优化
  :   通常情况下，这些操作对应于低级别的关键指令。它们被频繁地调用，并且是对性能关
      键。开销是非常重要的。
- 一套用于手写汇编代码的宏程序
  :   手写的汇编代码（.S文件）也需要半虚拟化，因为它们包括敏感指令或其中的一些代
      码路径对性能非常关键。

## 来源、版本与核验

- 来源：[半虚拟化操作](https://docs.kernel.org/translations/zh_CN/virt/paravirt_ops.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/virt/paravirt_ops.rst`。
