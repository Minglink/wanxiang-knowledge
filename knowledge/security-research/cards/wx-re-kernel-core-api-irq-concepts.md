---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-core-api-irq-concepts",
  "title": "Linux 内核：什么是IRQ？",
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
  "snapshotHash": "6c944090d88af9bde983fcb27fd8410faafa3f9daead707f2d05b7f547bee196",
  "generatedHash": "d6c5a32f1adc13665c379ae2d60058dbea653e5e7657b345817683e2910204cb",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "IRQ (Interrupt ReQuest) 指来自设备的中断请求。 目前，它们可以通过一个引脚或通过一个数据包进入。 多个设备可以连接到同一个引脚，从而共享一个IRQ。 IRQ编号是用来描述硬件中断源的内核标识符。通常它是一个到全局irq_desc数组的索引， 但是除了在linux/interrupt.h中实现的之外，其它细节是体系结构特征相关的。 IR",
  "l1": "IRQ (Interrupt ReQuest) 指来自设备的中断请求。 目前，它们可以通过一个引脚或通过一个数据包进入。 多个设备可以连接到同一个引脚，从而共享一个IRQ。 IRQ编号是用来描述硬件中断源的内核标识符。通常它是一个到全局irq_desc数组的索引， 但是除了在linux/interrupt.h中实现的之外，其它细节是体系结构特征相关的。 IRQ编号是对机器上可能的中断源的枚举。通常枚举的是系统中所有中断控制器的输入引脚 编号。在ISA（工业标准体系结构）的情况下所枚举的是两个i8259中断控制器的16个输入引脚。 体系结构可以给IRQ号赋予额外的含义，在涉及到硬件手动配置的情况下，我们鼓励这样做。 ISA IRQ是赋予这种额外含义的一个典型例子。",
  "questions": [
    "Linux 内核：什么是IRQ？的原理是什么？",
    "Linux 内核：什么是IRQ？有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-core-api-irq-concepts",
      "url": "https://docs.kernel.org/translations/zh_CN/core-api/irq/concepts.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：什么是IRQ？

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 什么是IRQ？

IRQ (Interrupt ReQuest) 指来自设备的中断请求。
目前，它们可以通过一个引脚或通过一个数据包进入。
多个设备可以连接到同一个引脚，从而共享一个IRQ。

IRQ编号是用来描述硬件中断源的内核标识符。通常它是一个到全局irq\_desc数组的索引，
但是除了在linux/interrupt.h中实现的之外，其它细节是体系结构特征相关的。

IRQ编号是对机器上可能的中断源的枚举。通常枚举的是系统中所有中断控制器的输入引脚
编号。在ISA（工业标准体系结构）的情况下所枚举的是两个i8259中断控制器的16个输入引脚。

体系结构可以给IRQ号赋予额外的含义，在涉及到硬件手动配置的情况下，我们鼓励这样做。
ISA IRQ是赋予这种额外含义的一个典型例子。

## 来源、版本与核验

- 来源：[什么是IRQ？](https://docs.kernel.org/translations/zh_CN/core-api/irq/concepts.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/core-api/irq/concepts.rst`。
