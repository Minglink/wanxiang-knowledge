---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-arch-parisc-debugging",
  "title": "Linux 内核：调试PA-RISC",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "arch"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "0b9438dd44e931088ebafe5269c326579060f0c23dcd7c77ba02b42e2f6646b4",
  "generatedHash": "1e5ee2624209784337a83601b47fbeeac810805ab04474183953189cfabed15e",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "好吧，这里有一些关于调试linux/parisc的较底层部分的信息。 很多汇编代码目前运行在实模式下，这意味着会使用绝对地址，而不是像内核其他 部分那样使用虚拟地址。要将绝对地址转换为虚拟地址，你可以在System.map中查 找，添加__PAGE_OFFSET（目前是0x10000000）。 当实模式的代码试图访问不存在的内存时，会出现HPMC（high ",
  "l1": "好吧，这里有一些关于调试linux/parisc的较底层部分的信息。 很多汇编代码目前运行在实模式下，这意味着会使用绝对地址，而不是像内核其他 部分那样使用虚拟地址。要将绝对地址转换为虚拟地址，你可以在System.map中查 找，添加__PAGE_OFFSET（目前是0x10000000）。 当实模式的代码试图访问不存在的内存时，会出现HPMC（high priority machine check）而不是内核oops。若要调试HPMC，请尝试找到系统响应程序/请求程序地址。 系统请求程序地址应该与（某）处理器的HPA（I/O范围内的高地址）相匹配；系统响应程 序地址是实模式代码试图访问的地址。 系统响应程序地址的典型值是大于__PAGE_OFFSET （0x10000000）的地址，这意味着 在实模式试图访问它之前，虚拟地址没有被翻译成物理地址。 某些非常关键的代码必须清除PSW中的Q",
  "questions": [
    "Linux 内核：调试PA-RISC的原理是什么？",
    "Linux 内核：调试PA-RISC有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-arch-parisc-debugging",
      "url": "https://docs.kernel.org/translations/zh_CN/arch/parisc/debugging.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：调试PA-RISC

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 调试PA-RISC

好吧，这里有一些关于调试linux/parisc的较底层部分的信息。

### 1. 绝对地址

很多汇编代码目前运行在实模式下，这意味着会使用绝对地址，而不是像内核其他
部分那样使用虚拟地址。要将绝对地址转换为虚拟地址，你可以在System.map中查
找，添加\_\_PAGE\_OFFSET（目前是0x10000000）。

### 2. HPMCs

当实模式的代码试图访问不存在的内存时，会出现HPMC（high priority machine
check）而不是内核oops。若要调试HPMC，请尝试找到系统响应程序/请求程序地址。
系统请求程序地址应该与（某）处理器的HPA（I/O范围内的高地址）相匹配；系统响应程
序地址是实模式代码试图访问的地址。

系统响应程序地址的典型值是大于\_\_PAGE\_OFFSET （0x10000000）的地址，这意味着
在实模式试图访问它之前，虚拟地址没有被翻译成物理地址。

### 3. 有趣的Q位

某些非常关键的代码必须清除PSW中的Q位。当Q位被清除时，CPU不会更新中断处理
程序所读取的寄存器，以找出机器被中断的位置——所以如果你在清除Q位的指令和再
次设置Q位的RFI之间遇到中断，你不知道它到底发生在哪里。如果你幸运的话，IAOQ
会指向清除Q位的指令，如果你不幸运的话，它会指向任何地方。通常Q位的问题会
表现为无法解释的系统挂起或物理内存越界。

## 来源、版本与核验

- 来源：[调试PA-RISC](https://docs.kernel.org/translations/zh_CN/arch/parisc/debugging.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/arch/parisc/debugging.rst`。
