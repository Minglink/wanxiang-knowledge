---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-core-api-irq-irqflags-tracing",
  "title": "Linux 内核：IRQ-flags状态追踪",
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
  "snapshotHash": "4bc6a225389a80596dc69298327098130ad61d930c28f5b6cdd313b95766233f",
  "generatedHash": "8085a2d82fc97e09174c25bd25b0b34396b76e2335c526d0d0bf956362788d8f",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "“irq-flags tracing”（中断标志追踪）功能可以 “追踪” hardirq和softirq的状态，它让 感兴趣的子系统有机会了解到到内核中发生的每一个 hardirqs-off/hardirqs-on、softirqs-off/softirqs-on事件。 CONFIG_TRACE_IRQFLAGS_SUPPORT是通用锁调试代码提供的CONF",
  "l1": "“irq-flags tracing”（中断标志追踪）功能可以 “追踪” hardirq和softirq的状态，它让 感兴趣的子系统有机会了解到到内核中发生的每一个 hardirqs-off/hardirqs-on、softirqs-off/softirqs-on事件。 CONFIG_TRACE_IRQFLAGS_SUPPORT是通用锁调试代码提供的CONFIG_PROVE_SPIN_LOCKING 和CONFIG_PROVE_RW_LOCKING所需要的。否则将只有CONFIG_PROVE_MUTEX_LOCKING和 CONFIG_PROVE_RWSEM_LOCKING在一个架构上被提供--这些都是不在IRQ上下文中使用的 锁API。（rwsems的一个异常是可以解决的） 架构对这一点的支持当然不属于“微不足道”的范畴，因为很多低级的汇编代码都要处理irq-flags 的状态变化。但是",
  "questions": [
    "Linux 内核：IRQ-flags状态追踪的原理是什么？",
    "Linux 内核：IRQ-flags状态追踪有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-core-api-irq-irqflags-tracing",
      "url": "https://docs.kernel.org/translations/zh_CN/core-api/irq/irqflags-tracing.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：IRQ-flags状态追踪

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## IRQ-flags状态追踪

Author:
:   最初由Ingo Molnar <[mingo@redhat.com](mailto:mingo@redhat.com)>开始撰写

“irq-flags tracing”（中断标志追踪）功能可以 “追踪” hardirq和softirq的状态，它让
感兴趣的子系统有机会了解到到内核中发生的每一个
hardirqs-off/hardirqs-on、softirqs-off/softirqs-on事件。

CONFIG\_TRACE\_IRQFLAGS\_SUPPORT是通用锁调试代码提供的CONFIG\_PROVE\_SPIN\_LOCKING
和CONFIG\_PROVE\_RW\_LOCKING所需要的。否则将只有CONFIG\_PROVE\_MUTEX\_LOCKING和
CONFIG\_PROVE\_RWSEM\_LOCKING在一个架构上被提供--这些都是不在IRQ上下文中使用的
锁API。（rwsems的一个异常是可以解决的）

架构对这一点的支持当然不属于“微不足道”的范畴，因为很多低级的汇编代码都要处理irq-flags
的状态变化。但是一个架构可以以一种相当直接且无风险的方式启用irq-flags-tracing。

架构如果想支持这个，需要先做一些代码组织上的改变:

- 在他们的arch级Kconfig文件中添加并启用TRACE\_IRQFLAGS\_SUPPORT。

然后还需要做一些功能上的改变来实现对irq-flags-tracing的支持:

- 在低级入口代码中增加（构建条件）对trace\_hardirqs\_off()/trace\_hardirqs\_on()
  函数的调用。锁验证器会密切关注 “real”的irq-flags是否与 “virtual”的irq-flags
  状态相匹配，如果两者不匹配，则会发出警告（并关闭自己）。通常维护arch中
  irq-flags-track的大部分时间都是在这种状态下度过的：看看lockdep的警告，试着
  找出我们还没有搞定的汇编代码。修复并重复。一旦系统启动，并且在irq-flags跟踪功
  能中没有出现lockdep警告的情况下，arch支持就完成了。
- 如果该架构有不可屏蔽的中断，那么需要通过lockdep\_off()/lockdep\_on()将这些中
  断从irq跟踪[和锁验证]机制中排除。

> 一般来说，在一个架构中，不完整的irq-flags-tracing实现是没有风险的：lockdep
> 会检测到这一点，并将自己关闭。即锁验证器仍然可靠。应该不会因为irq-tracing的错
> 误而崩溃。（除非通过修改不该修改的条件来更改汇编或寄存器而破坏其他代码）

## 来源、版本与核验

- 来源：[IRQ-flags状态追踪](https://docs.kernel.org/translations/zh_CN/core-api/irq/irqflags-tracing.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/core-api/irq/irqflags-tracing.rst`。
