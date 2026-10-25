---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-mm-page-frags",
  "title": "Linux 内核：页面片段",
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
  "snapshotHash": "032bba60bcae7448395867b9335a7d4869ab632d2436158ec30429ed677e872b",
  "generatedHash": "6c957778f86dc7e56a47f02c60e1b8cb94f6bec1a3fe1031dcd1bafac5de9d8e",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "一个页面片段是一个任意长度的任意偏移的内存区域，它位于一个0或更高阶的复合页面中。 该页中的多个碎片在该页的引用计数器中被单独计算。 page_frag函数，page_frag_alloc和page_frag_free，为页面片段提供了一个简单 的分配框架。这被网络堆栈和网络设备驱动使用，以提供一个内存的支持区域，作为 sk_buff->head使用，或者用",
  "l1": "一个页面片段是一个任意长度的任意偏移的内存区域，它位于一个0或更高阶的复合页面中。 该页中的多个碎片在该页的引用计数器中被单独计算。 page_frag函数，page_frag_alloc和page_frag_free，为页面片段提供了一个简单 的分配框架。这被网络堆栈和网络设备驱动使用，以提供一个内存的支持区域，作为 sk_buff->head使用，或者用于skb_shared_info的 “frags” 部分。 为了使用页面片段API，需要一个支持页面片段的缓冲区。这为碎片分配提供了一个中心点， 并允许多个调用使用一个缓存的页面。这样做的好处是可以避免对get_page的多次调用， 这在分配时开销可能会很大。然而，由于这种缓存的性质，要求任何对缓存的调用都要受到每 个CPU的限制，或者每个CPU的限制，并在执行碎片分配时强制禁止中断。 网络堆栈在每个CPU使用两个独立的缓存来处理碎片分",
  "questions": [
    "Linux 内核：页面片段的原理是什么？",
    "Linux 内核：页面片段有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-mm-page-frags",
      "url": "https://docs.kernel.org/translations/zh_CN/mm/page_frags.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：页面片段

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 页面片段

一个页面片段是一个任意长度的任意偏移的内存区域，它位于一个0或更高阶的复合页面中。
该页中的多个碎片在该页的引用计数器中被单独计算。

page\_frag函数，page\_frag\_alloc和page\_frag\_free，为页面片段提供了一个简单
的分配框架。这被网络堆栈和网络设备驱动使用，以提供一个内存的支持区域，作为
sk\_buff->head使用，或者用于skb\_shared\_info的 “frags” 部分。

为了使用页面片段API，需要一个支持页面片段的缓冲区。这为碎片分配提供了一个中心点，
并允许多个调用使用一个缓存的页面。这样做的好处是可以避免对get\_page的多次调用，
这在分配时开销可能会很大。然而，由于这种缓存的性质，要求任何对缓存的调用都要受到每
个CPU的限制，或者每个CPU的限制，并在执行碎片分配时强制禁止中断。

网络堆栈在每个CPU使用两个独立的缓存来处理碎片分配。netdev\_alloc\_cache被使用
netdev\_alloc\_frag和\_\_netdev\_alloc\_skb调用的调用者使用。napi\_alloc\_cache
被调用\_\_napi\_alloc\_frag和napi\_alloc\_skb的调用者使用。这两个调用的主要区别是
它们可能被调用的环境。“netdev” 前缀的函数可以在任何上下文中使用，因为这些函数
将禁用中断，而 ”napi“ 前缀的函数只可以在softirq上下文中使用。

许多网络设备驱动程序使用类似的方法来分配页面片段，但页面片段是在环或描述符级别上
缓存的。为了实现这些情况，有必要提供一种拆解页面缓存的通用方法。出于这个原因，
\_\_page\_frag\_cache\_drain被实现了。它允许通过一次调用从一个页面释放多个引用。
这样做的好处是，它允许清理被添加到一个页面的多个引用，以避免每次分配都调用
get\_page。

Alexander Duyck，2016年11月29日。

## 来源、版本与核验

- 来源：[页面片段](https://docs.kernel.org/translations/zh_CN/mm/page_frags.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/mm/page_frags.rst`。
