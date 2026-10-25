---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-scheduler-sched-arch",
  "title": "Linux 内核：架构特定代码的CPU调度器实现提示",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "scheduler"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "39552dcd185fc5ffe816f6dd3aef7c9a9b9b4c58e909c35e93bf07961bf3c8b6",
  "generatedHash": "d9ea7a1e013e958ca9f4e8ece3a6eb3302d9dc34c40254c9a6f4caa34dded839",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "1. 运行队列锁 默认情况下，switch_to arch函数在调用时锁定了运行队列。这通常不是一个问题，除非 switch_to可能需要获取运行队列锁。这通常是由于上下文切换中的唤醒操作造成的。 为了要求调度器在运行队列解锁的情况下调用switch_to，你必须在头文件 中`#define __ARCH_WANT_UNLOCKED_CTXSW`(通常是定义",
  "l1": "1. 运行队列锁 默认情况下，switch_to arch函数在调用时锁定了运行队列。这通常不是一个问题，除非 switch_to可能需要获取运行队列锁。这通常是由于上下文切换中的唤醒操作造成的。 为了要求调度器在运行队列解锁的情况下调用switch_to，你必须在头文件 中`#define __ARCH_WANT_UNLOCKED_CTXSW`(通常是定义switch_to的那个文件）。 在CONFIG_SMP的情况下，解锁的上下文切换对核心调度器的实现只带来了非常小的性能损 失。 你的cpu_idle程序需要遵守以下规则： 1. 现在抢占应该在空闲的例程上禁用。应该只在调用schedule()时启用，然后再禁用。 2. need_resched/TIF_NEED_RESCHED 只会被设置，并且在运行任务调用 schedule() 之前永远不会被清除。空闲线程只需要查询need_res",
  "questions": [
    "Linux 内核：架构特定代码的CPU调度器实现提示的原理是什么？",
    "Linux 内核：架构特定代码的CPU调度器实现提示有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-scheduler-sched-arch",
      "url": "https://docs.kernel.org/translations/zh_CN/scheduler/sched-arch.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：架构特定代码的CPU调度器实现提示

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 架构特定代码的CPU调度器实现提示

> Nick Piggin, 2005

### 上下文切换

1. 运行队列锁
默认情况下，switch\_to arch函数在调用时锁定了运行队列。这通常不是一个问题，除非
switch\_to可能需要获取运行队列锁。这通常是由于上下文切换中的唤醒操作造成的。

为了要求调度器在运行队列解锁的情况下调用switch\_to，你必须在头文件
中`#define \_\_ARCH\_WANT\_UNLOCKED\_CTXSW`(通常是定义switch\_to的那个文件）。

在CONFIG\_SMP的情况下，解锁的上下文切换对核心调度器的实现只带来了非常小的性能损
失。

### CPU空转

你的cpu\_idle程序需要遵守以下规则：

1. 现在抢占应该在空闲的例程上禁用。应该只在调用schedule()时启用，然后再禁用。
2. need\_resched/TIF\_NEED\_RESCHED 只会被设置，并且在运行任务调用 schedule()
   之前永远不会被清除。空闲线程只需要查询need\_resched，并且永远不会设置或清除它。
3. 当cpu\_idle发现（need\_resched() == 'true'），它应该调用schedule()。否则
   它不应该调用schedule()。
4. 在检查need\_resched时，唯一需要禁用中断的情况是，我们要让处理器休眠到下一个中
   断（这并不对need\_resched提供任何保护，它可以防止丢失一个中断）:

   > 4a. 这种睡眠类型的常见问题似乎是:
   >
   > ```
   > local_irq_disable();
   > if (!need_resched()) {
   >         local_irq_enable();
   >         *** resched interrupt arrives here ***
   >         __asm__("sleep until next interrupt");
   > }
   > ```
5. 当need\_resched变为高电平时，TIF\_POLLING\_NRFLAG可以由不需要中断来唤醒它们
   的空闲程序设置。换句话说，它们必须定期轮询need\_resched，尽管做一些后台工作或
   进入低CPU优先级可能是合理的。

   > - 5a. 如果TIF\_POLLING\_NRFLAG被设置，而我们确实决定进入一个中断睡眠，那
   >   :   么需要清除它，然后发出一个内存屏障（接着测试need\_resched，禁用中断，如3中解释）。

arch/x86/kernel/process.c有轮询和睡眠空闲函数的例子。

### 可能出现的arch/问题

我发现的可能的arch问题（并试图解决或没有解决）。:

sparc - 在这一点上，IRQ是开着的（？），把local\_irq\_save改为\_disable。
:   - 待办事项: 需要第二个CPU来禁用抢占 (参考 #1)

## 来源、版本与核验

- 来源：[架构特定代码的CPU调度器实现提示](https://docs.kernel.org/translations/zh_CN/scheduler/sched-arch.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/scheduler/sched-arch.rst`。
