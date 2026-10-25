---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-usb-dwc3",
  "title": "Linux 内核：DWC3 驱动",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "usb"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "3220fe37694d8b2994746f35dff3ebefe509e909f1344780f50a8812f9265fb0",
  "generatedHash": "bcd9cdee7453295a83b94c1d22135de25cfcd00022e71eb9e7afb8ba37cae1a7",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "如果你愿意接手其中一项任务，可以从下面选择： - 将中断处理程序改为每个端点各自使用线程化 IRQ 实践表明，某些 DWC3 命令大约需要 ~1 ms 才能完成。当前代码会一直自旋 等待命令完成，这并不是好办法。 - DWC 核心实现了一个按端点分发中断的 IRQ 控制器。中断号在探测 （probe）阶段分配，并归属于该设备。如果硬件通过 MSI 为每个 端",
  "l1": "如果你愿意接手其中一项任务，可以从下面选择： - 将中断处理程序改为每个端点各自使用线程化 IRQ 实践表明，某些 DWC3 命令大约需要 ~1 ms 才能完成。当前代码会一直自旋 等待命令完成，这并不是好办法。 - DWC 核心实现了一个按端点分发中断的 IRQ 控制器。中断号在探测 （probe）阶段分配，并归属于该设备。如果硬件通过 MSI 为每个 端点提供独立中断，那么这个“虚拟”IRQ 控制器就可以被真实的端点中断 取代。 - 在调用 usb_ep_enable() 时请求并分配中断资源，在调用 usb_ep_disable() 时释放中断资源。最坏情况下需要 32 个中断，最少是 ep0/1 的两个中断。 - dwc3_send_gadget_ep_cmd() 将在 wait_for_completion_timeout() 中休眠，直到命令完成。 - 中断处理程序分为以下几个",
  "questions": [
    "Linux 内核：DWC3 驱动的原理是什么？",
    "Linux 内核：DWC3 驱动有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-usb-dwc3",
      "url": "https://docs.kernel.org/translations/zh_CN/usb/dwc3.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：DWC3 驱动

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## DWC3 驱动

### 待办

如果你愿意接手其中一项任务，可以从下面选择：

- 将中断处理程序改为每个端点各自使用线程化 IRQ

  实践表明，某些 DWC3 命令大约需要 ~1 ms 才能完成。当前代码会一直自旋
  等待命令完成，这并不是好办法。

  实现思路：

  - DWC 核心实现了一个按端点分发中断的 IRQ 控制器。中断号在探测
    （probe）阶段分配，并归属于该设备。如果硬件通过 MSI 为每个
    端点提供独立中断，那么这个“虚拟”IRQ 控制器就可以被真实的端点中断
    取代。
  - 在调用 usb\_ep\_enable() 时请求并分配中断资源，在调用
    usb\_ep\_disable() 时释放中断资源。最坏情况下需要 32 个中断，最少是
    ep0/1 的两个中断。
  - dwc3\_send\_gadget\_ep\_cmd() 将在 wait\_for\_completion\_timeout()
    中休眠，直到命令完成。
  - 中断处理程序分为以下几个部分：

    - 设备级主中断处理程序
      遍历每个事件，并调用 generic\_handle\_irq() 处理。返回后再确认
      事件计数器，让中断最终消失。
    - 设备级线程化处理程序
      无。
    - 端点中断的主处理程序
      读取事件并尽量处理；凡是需要睡眠的操作都交给线程处理。事件保存在
      每个端点的数据结构中。一旦某项工作已经交给线程处理，主处理程序里就
      不要再碰它，以免出现优先级反转之类的问题。
    - 端点中断的线程化处理程序
      处理剩余的端点工作，这些工作可能会睡眠，例如等待命令完成。

  延迟：

  > 不应增加额外延迟，因为中断线程优先级较高，会在普通用户任务之前运行
  > （除非用户更改了调度优先级）。

## 来源、版本与核验

- 来源：[DWC3 驱动](https://docs.kernel.org/translations/zh_CN/usb/dwc3.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/usb/dwc3.rst`。
