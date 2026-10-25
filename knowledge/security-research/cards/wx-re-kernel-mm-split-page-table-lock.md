---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-mm-split-page-table-lock",
  "title": "Linux 内核：分页表锁（split page table lock）",
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
  "snapshotHash": "d10c56c7c9d3e5388991ca75fc4686f5d8d28c8285b9a4347d43c4202023f833",
  "generatedHash": "b692437d75785e939447a780cc404f504a227b4f739d02c08f45d72c456c9c3b",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "最初，mm->page_table_lock spinlock保护了mm_struct的所有页表。但是这种方 法导致了多线程应用程序的缺页异常可扩展性差，因为对锁的争夺很激烈。为了提高可扩 展性，我们引入了分页表锁。 有了分页表锁，我们就有了单独的每张表锁来顺序化对表的访问。目前，我们对PTE和 PMD表使用分页锁。对高层表的访问由mm->page_tabl",
  "l1": "最初，mm->page_table_lock spinlock保护了mm_struct的所有页表。但是这种方 法导致了多线程应用程序的缺页异常可扩展性差，因为对锁的争夺很激烈。为了提高可扩 展性，我们引入了分页表锁。 有了分页表锁，我们就有了单独的每张表锁来顺序化对表的访问。目前，我们对PTE和 PMD表使用分页锁。对高层表的访问由mm->page_table_lock保护。 有一些辅助工具来锁定/解锁一个表和其他访问器函数: - pte_offset_map_lock() :   映射pte并获取PTE表锁，返回所取锁的指针； - pte_unmap_unlock() :   解锁和解映射PTE表； - pte_alloc_map_lock() :   如果需要的话，分配PTE表并获取锁，如果分配失败，返回已获取的锁的指针 或NULL； - pte_lockptr() :   返回指向P",
  "questions": [
    "Linux 内核：分页表锁（split page table lock）的原理是什么？",
    "Linux 内核：分页表锁（split page table lock）有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-mm-split-page-table-lock",
      "url": "https://docs.kernel.org/translations/zh_CN/mm/split_page_table_lock.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：分页表锁（split page table lock）

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 分页表锁（split page table lock）

最初，mm->page\_table\_lock spinlock保护了mm\_struct的所有页表。但是这种方
法导致了多线程应用程序的缺页异常可扩展性差，因为对锁的争夺很激烈。为了提高可扩
展性，我们引入了分页表锁。

有了分页表锁，我们就有了单独的每张表锁来顺序化对表的访问。目前，我们对PTE和
PMD表使用分页锁。对高层表的访问由mm->page\_table\_lock保护。

有一些辅助工具来锁定/解锁一个表和其他访问器函数:

> - pte\_offset\_map\_lock()
>   :   映射pte并获取PTE表锁，返回所取锁的指针；
> - pte\_unmap\_unlock()
>   :   解锁和解映射PTE表；
> - pte\_alloc\_map\_lock()
>   :   如果需要的话，分配PTE表并获取锁，如果分配失败，返回已获取的锁的指针
>       或NULL；
> - pte\_lockptr()
>   :   返回指向PTE表锁的指针；
> - pmd\_lock()
>   :   取得PMD表锁，返回所取锁的指针。
> - pmd\_lockptr()
>   :   返回指向PMD表锁的指针；

如果CONFIG\_SPLIT\_PTLOCK\_CPUS（通常为4）小于或等于NR\_CPUS，则在编译
时启用PTE表的分页表锁。如果分页锁被禁用，所有的表都由mm->page\_table\_lock
来保护。

如果PMD表启用了分页锁，并且架构支持它，那么PMD表的分页锁就会被启用（见
下文）。

### Hugetlb 和分页表锁

Hugetlb可以支持多种页面大小。我们只对PMD级别使用分页锁，但不对PUD使用。

Hugetlb特定的辅助函数:

> - huge\_pte\_lock()
>   :   对PMD\_SIZE页面采取pmd分割锁，否则mm->page\_table\_lock；
> - huge\_pte\_lockptr()
>   :   返回指向表锁的指针。

### 架构对分页表锁的支持

没有必要特别启用PTE分页表锁：所有需要的东西都由pagetable\_pte\_ctor()
和pagetable\_pte\_dtor()完成，它们必须在PTE表分配/释放时被调用。

确保架构不使用slab分配器来分配页表：slab使用page->slab\_cache来分配其页
面。这个区域与page->ptl共享存储。

PMD分页锁只有在你有两个以上的页表级别时才有意义。

启用PMD分页锁需要在PMD表分配时调用pagetable\_pmd\_ctor()，在释放时调
用pagetable\_pmd\_dtor()。

分配通常发生在pmd\_alloc\_one()中，释放发生在pmd\_free()和pmd\_free\_tlb()
中，但要确保覆盖所有的PMD表分配/释放路径：即X86\_PAE在pgd\_alloc()中预先
分配一些PMD。

一切就绪后，你可以设置CONFIG\_ARCH\_ENABLE\_SPLIT\_PMD\_PTLOCK。

注意：pagetable\_pte\_ctor()和pagetable\_pmd\_ctor()可能失败--必
须正确处理。

### page->ptl

page->ptl用于访问分割页表锁，其中'page'是包含该表的页面struct page。它
与page->private（以及union中的其他几个字段）共享存储。

为了避免增加struct page的大小并获得最佳性能，我们使用了一个技巧:

> - 如果spinlock\_t适合于long，我们使用page->ptr作为spinlock，这样我们
>   就可以避免间接访问并节省一个缓存行。
> - 如果spinlock\_t的大小大于long的大小，我们使用page->ptl作为spinlock\_t
>   的指针并动态分配它。这允许在启用DEBUG\_SPINLOCK或DEBUG\_LOCK\_ALLOC的
>   情况下使用分页锁，但由于间接访问而多花了一个缓存行。

PTE表的spinlock\_t分配在pagetable\_pte\_ctor()中，PMD表的spinlock\_t
分配在pagetable\_pmd\_ctor()中。

请不要直接访问page->ptl - -使用适当的辅助函数。

## 来源、版本与核验

- 来源：[分页表锁（split page table lock）](https://docs.kernel.org/translations/zh_CN/mm/split_page_table_lock.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/mm/split_page_table_lock.rst`。
