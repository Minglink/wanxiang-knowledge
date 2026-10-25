---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-mm-mmu-notifier",
  "title": "Linux 内核：什么时候需要页表锁内通知？",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "mm"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "2e175786e6336ffc290eb91192c66f3dd223ea061bcb9a93d6d1104ab63946cc",
  "generatedHash": "e293fccc0daa5471832afe8f23d631b80232a67ac20d6b6958fc1e07f13d3a3f",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "当清除一个pte/pmd时，我们可以选择通过在页表锁下（通知版的*_clear_flush调用 mmu_notifier_invalidate_range）通知事件。但这种通知并不是在所有情况下都需要的。 对于二级TLB（非CPU TLB），如IOMMU TLB或设备TLB（当设备使用类似ATS/PASID的东西让 IOMMU走CPU页表来访问进程的虚拟地址",
  "l1": "当清除一个pte/pmd时，我们可以选择通过在页表锁下（通知版的*_clear_flush调用 mmu_notifier_invalidate_range）通知事件。但这种通知并不是在所有情况下都需要的。 对于二级TLB（非CPU TLB），如IOMMU TLB或设备TLB（当设备使用类似ATS/PASID的东西让 IOMMU走CPU页表来访问进程的虚拟地址空间）。只有两种情况需要在清除pte/pmd时在持有页 表锁的同时通知这些二级TLB： 1. 在mmu_notifier_invalidate_range_end()之前，支持页的地址被释放。 2. 一个页表项被更新以指向一个新的页面（COW，零页上的写异常，__replace_page()，...）。 情况A很明显，你不想冒风险让设备写到一个现在可能被一些完全不同的任务使用的页面。 情况B更加微妙。为了正确起见，它需要按照以下序列发生",
  "questions": [
    "Linux 内核：什么时候需要页表锁内通知？的原理是什么？",
    "Linux 内核：什么时候需要页表锁内通知？有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-mm-mmu-notifier",
      "url": "https://docs.kernel.org/translations/zh_CN/mm/mmu_notifier.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：什么时候需要页表锁内通知？

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 什么时候需要页表锁内通知？

当清除一个pte/pmd时，我们可以选择通过在页表锁下（通知版的\*\_clear\_flush调用
mmu\_notifier\_invalidate\_range）通知事件。但这种通知并不是在所有情况下都需要的。

对于二级TLB（非CPU TLB），如IOMMU TLB或设备TLB（当设备使用类似ATS/PASID的东西让
IOMMU走CPU页表来访问进程的虚拟地址空间）。只有两种情况需要在清除pte/pmd时在持有页
表锁的同时通知这些二级TLB：

> 1. 在mmu\_notifier\_invalidate\_range\_end()之前，支持页的地址被释放。
> 2. 一个页表项被更新以指向一个新的页面（COW，零页上的写异常，\_\_replace\_page()，...）。

情况A很明显，你不想冒风险让设备写到一个现在可能被一些完全不同的任务使用的页面。

情况B更加微妙。为了正确起见，它需要按照以下序列发生:

> - 上页表锁
> - 清除页表项并通知 ([pmd/pte]p\_huge\_clear\_flush\_notify())
> - 设置页表项以指向新页

如果在设置新的pte/pmd值之前，清除页表项之后没有进行通知，那么你就会破坏设备的C11或
C++11等内存模型。

考虑以下情况（设备使用类似于ATS/PASID的功能）。

两个地址addrA和addrB，这样|addrA - addrB| >= PAGE\_SIZE，我们假设它们是COW的
写保护（B的其他情况也适用）。

```
[Time N] --------------------------------------------------------------------
CPU-thread-0  {尝试写到addrA}
CPU-thread-1  {尝试写到addrB}
CPU-thread-2  {}
CPU-thread-3  {}
DEV-thread-0  {读取addrA并填充设备TLB}
DEV-thread-2  {读取addrB并填充设备TLB}
[Time N+1] ------------------------------------------------------------------
CPU-thread-0  {COW_step0: {mmu_notifier_invalidate_range_start(addrA)}}
CPU-thread-1  {COW_step0: {mmu_notifier_invalidate_range_start(addrB)}}
CPU-thread-2  {}
CPU-thread-3  {}
DEV-thread-0  {}
DEV-thread-2  {}
[Time N+2] ------------------------------------------------------------------
CPU-thread-0  {COW_step1: {更新页表以指向addrA的新页}}
CPU-thread-1  {COW_step1: {更新页表以指向addrB的新页}}
CPU-thread-2  {}
CPU-thread-3  {}
DEV-thread-0  {}
DEV-thread-2  {}
[Time N+3] ------------------------------------------------------------------
CPU-thread-0  {preempted}
CPU-thread-1  {preempted}
CPU-thread-2  {写入addrA，这是对新页面的写入}
CPU-thread-3  {}
DEV-thread-0  {}
DEV-thread-2  {}
[Time N+3] ------------------------------------------------------------------
CPU-thread-0  {preempted}
CPU-thread-1  {preempted}
CPU-thread-2  {}
CPU-thread-3  {写入addrB，这是一个写入新页的过程}
DEV-thread-0  {}
DEV-thread-2  {}
[Time N+4] ------------------------------------------------------------------
CPU-thread-0  {preempted}
CPU-thread-1  {COW_step3: {mmu_notifier_invalidate_range_end(addrB)}}
CPU-thread-2  {}
CPU-thread-3  {}
DEV-thread-0  {}
DEV-thread-2  {}
[Time N+5] ------------------------------------------------------------------
CPU-thread-0  {preempted}
CPU-thread-1  {}
CPU-thread-2  {}
CPU-thread-3  {}
DEV-thread-0  {从旧页中读取addrA}
DEV-thread-2  {从新页面读取addrB}
```

所以在这里，因为在N+2的时候，清空页表项没有和通知一起作废二级TLB，设备在看到addrA的新值之前
就看到了addrB的新值。这就破坏了设备的总内存序。

当改变一个pte的写保护或指向一个新的具有相同内容的写保护页（KSM）时，将mmu\_notifier\_invalidate\_range
调用延迟到页表锁外的mmu\_notifier\_invalidate\_range\_end()是可以的。即使做页表更新的线程
在释放页表锁后但在调用mmu\_notifier\_invalidate\_range\_end()前被抢占，也是如此。

## 来源、版本与核验

- 来源：[什么时候需要页表锁内通知？](https://docs.kernel.org/translations/zh_CN/mm/mmu_notifier.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/mm/mmu_notifier.rst`。
