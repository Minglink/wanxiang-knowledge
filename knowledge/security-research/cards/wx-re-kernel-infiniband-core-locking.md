---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-infiniband-core-locking",
  "title": "Linux 内核：infiniband中间层锁",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "infiniband"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ccc8bac64b169b43648fb97efa5b7684e2904a499caf02012fb36435c4068467",
  "generatedHash": "97e1567c967a442e47fae3a08e2f2da6cb0ad58001bdf3db849ac465ea51c550",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "本指南试图明确infiniband中间层的锁假设。它描述了对位于中间层以下的低 级驱动程序和使用中间层的上层协议的要求。 除了以下异常情况，ib_device结构体中所有方法的低级驱动实现都可以睡眠。 这些异常情况是列表中的任意的方法: 他们可能不可以睡眠，而且必须可以从任何上下文中调用。 向上层协议使用者输出的相应函数: 因此，在任何情况下都可以安全调用（",
  "l1": "本指南试图明确infiniband中间层的锁假设。它描述了对位于中间层以下的低 级驱动程序和使用中间层的上层协议的要求。 除了以下异常情况，ib_device结构体中所有方法的低级驱动实现都可以睡眠。 这些异常情况是列表中的任意的方法: 他们可能不可以睡眠，而且必须可以从任何上下文中调用。 向上层协议使用者输出的相应函数: 因此，在任何情况下都可以安全调用（它们）。 被底层驱动用来通过中间层调度异步事件的“A”，也可以从任何上下文中安全调 用。 由低级驱动程序导出的ib_device结构体中的所有方法必须是完全可重入的。 即使使用同一对象的多个函数调用被同时运行，低级驱动程序也需要执行所有 必要的同步以保持一致性。 IB中间层不执行任何函数调用的序列化。 因为低级驱动程序是可重入的，所以不要求上层协议使用者任何顺序执行。然 而，为了得到合理的结果，可能需要一些顺序。例如，一个使用者可以在多",
  "questions": [
    "Linux 内核：infiniband中间层锁的原理是什么？",
    "Linux 内核：infiniband中间层锁有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-infiniband-core-locking",
      "url": "https://docs.kernel.org/translations/zh_CN/infiniband/core_locking.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：infiniband中间层锁

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## infiniband中间层锁

> 本指南试图明确infiniband中间层的锁假设。它描述了对位于中间层以下的低
> 级驱动程序和使用中间层的上层协议的要求。

### 睡眠和中断环境

> 除了以下异常情况，ib\_device结构体中所有方法的低级驱动实现都可以睡眠。
> 这些异常情况是列表中的任意的方法:
>
> > - create\_ah
> > - modify\_ah
> > - query\_ah
> > - destroy\_ah
> > - post\_send
> > - post\_recv
> > - poll\_cq
> > - req\_notify\_cq
> >
> > 他们可能不可以睡眠，而且必须可以从任何上下文中调用。
> >
> > 向上层协议使用者输出的相应函数:
> >
> > - rdma\_create\_ah
> > - rdma\_modify\_ah
> > - rdma\_query\_ah
> > - rdma\_destroy\_ah
> > - ib\_post\_send
> > - ib\_post\_recv
> > - ib\_req\_notify\_cq
> >
> > 因此，在任何情况下都可以安全调用（它们）。
>
> 此外，该函数
>
> > - ib\_dispatch\_event
>
> 被底层驱动用来通过中间层调度异步事件的“A”，也可以从任何上下文中安全调
> 用。

#### 可重入性

> 由低级驱动程序导出的ib\_device结构体中的所有方法必须是完全可重入的。
> 即使使用同一对象的多个函数调用被同时运行，低级驱动程序也需要执行所有
> 必要的同步以保持一致性。
>
> IB中间层不执行任何函数调用的序列化。
>
> 因为低级驱动程序是可重入的，所以不要求上层协议使用者任何顺序执行。然
> 而，为了得到合理的结果，可能需要一些顺序。例如，一个使用者可以在多个
> CPU上同时安全地调用ib\_poll\_cq()。然而，不同的ib\_poll\_cq()调用之间
> 的工作完成信息的顺序没有被定义。

#### 回调

> 低级驱动程序不得直接从与ib\_device方法调用相同的调用链中执行回调。例
> 如，低级驱动程序不允许从post\_send方法直接调用使用者的完成事件处理程
> 序。相反，低级驱动程序应该推迟这个回调，例如，调度一个tasklet来执行
> 这个回调。
>
> 低层驱动负责确保同一CQ的多个完成事件处理程序不被同时调用。驱动程序必
> 须保证一个给定的CQ的事件处理程序在同一时间只有一个在运行。换句话说，
> 以下情况是不允许的:
>
> ```
>       CPU1                                    CPU2
>
> low-level driver ->
>   consumer CQ event callback:
>     /* ... */
>     ib_req_notify_cq(cq, ...);
>                                       low-level driver ->
>     /* ... */                           consumer CQ event callback:
>                                           /* ... */
>     return from CQ event handler
> ```
>
> 完成事件和异步事件回调的运行环境没有被定义。 根据低级别的驱动程序，它可能是
> 进程上下文、softirq上下文或中断上下文。上层协议使用者可能不会在回调中睡眠。

#### 热插拔

> 当一个低级驱动程序调用ib\_register\_device()时，它宣布一个设备已经
> 准备好供使用者使用，所有的初始化必须在这个调用之前完成。设备必须保
> 持可用，直到驱动对ib\_unregister\_device()的调用返回。
>
> 低级驱动程序必须从进程上下文调用ib\_register\_device()和
> ib\_unregister\_device()。如果使用者在这些调用中回调到驱动程序，它
> 不能持有任何可能导致死锁的semaphores。
>
> 一旦其结构体ib\_client的add方法被调用，上层协议使用者就可以开始使用
> 一个IB设备。使用者必须在从移除方法返回之前完成所有的清理工作并释放
> 与设备相关的所有资源。
>
> 使用者被允许在其添加和删除方法中睡眠。

## 来源、版本与核验

- 来源：[infiniband中间层锁](https://docs.kernel.org/translations/zh_CN/infiniband/core_locking.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/infiniband/core_locking.rst`。
