---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-core-api-memory-allocation",
  "title": "Linux 内核：内存分配指南",
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
  "snapshotHash": "63926f843659e8b7e23ce1006ef656761384738975228ace07085cc0edf795cb",
  "generatedHash": "8f7ed2df901d4d9f0015882e803c5e4c32606449e0bffcee7cb0f3629fa0e672",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "Linux为内存分配提供了多种API。你可以使用 kmalloc 或 kmem_cache_alloc 系列分配小块内存，使用 vmalloc 及其派生产品分配大的几乎连续的区域，或者 你可以用 alloc_pages 直接向页面分配器请求页面。也可以使用更专业的分配器， 例如 cma_alloc 或 zs_malloc 。 大多数的内存分配API使用GFP",
  "l1": "Linux为内存分配提供了多种API。你可以使用 kmalloc 或 kmem_cache_alloc 系列分配小块内存，使用 vmalloc 及其派生产品分配大的几乎连续的区域，或者 你可以用 alloc_pages 直接向页面分配器请求页面。也可以使用更专业的分配器， 例如 cma_alloc 或 zs_malloc 。 大多数的内存分配API使用GFP标志来表达该内存应该如何分配。GFP的缩写代表 “(get free pages)获取空闲页”，是底层的内存分配功能。 （内存）分配API的多样性与众多的GFP标志相结合，使得“我应该如何分配内存？”这个问 题不那么容易回答，尽管很可能你应该使用 当然，有些情况下必须使用其他分配API和不同的GFP标志。 GFP标志控制分配器的行为。它们告诉我们哪些内存区域可以被使用，分配器应该多努力寻 找空闲的内存，这些内存是否可以被用户空间访问等等",
  "questions": [
    "Linux 内核：内存分配指南的原理是什么？",
    "Linux 内核：内存分配指南有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-core-api-memory-allocation",
      "url": "https://docs.kernel.org/translations/zh_CN/core-api/memory-allocation.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：内存分配指南

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 内存分配指南

Linux为内存分配提供了多种API。你可以使用 kmalloc 或 kmem\_cache\_alloc
系列分配小块内存，使用 vmalloc 及其派生产品分配大的几乎连续的区域，或者
你可以用 alloc\_pages 直接向页面分配器请求页面。也可以使用更专业的分配器，
例如 cma\_alloc 或 zs\_malloc 。

大多数的内存分配API使用GFP标志来表达该内存应该如何分配。GFP的缩写代表
“(get free pages)获取空闲页”，是底层的内存分配功能。

（内存）分配API的多样性与众多的GFP标志相结合，使得“我应该如何分配内存？”这个问
题不那么容易回答，尽管很可能你应该使用

```
kzalloc(<size>, GFP_KERNEL);
```

当然，有些情况下必须使用其他分配API和不同的GFP标志。

### 获取空闲页标志

GFP标志控制分配器的行为。它们告诉我们哪些内存区域可以被使用，分配器应该多努力寻
找空闲的内存，这些内存是否可以被用户空间访问等等。内存管理API为GFP标志和它们的
组合提供了参考文件，这里我们简要介绍一下它们的推荐用法:

> - 大多数时候， GFP\_KERNEL 是你需要的。内核数据结构的内存，DMA可用内存，inode
>   缓存，所有这些和其他许多分配类型都可以使用 GFP\_KERNEL 。注意，使用 GFP\_KERNEL
>   意味着 GFP\_RECLAIM ，这意味着在有内存压力的情况下可能会触发直接回收；调用上
>   下文必须允许睡眠。
> - 如果分配是从一个原子上下文中进行的，例如中断处理程序，使用 GFP\_NOWAIT 。这个
>   标志可以防止直接回收和IO或文件系统操作。因此，在内存压力下， GFP\_NOWAIT 分配
>   可能会失败。有合理退路的分配应该使用 GFP\_NOWARN 。
> - 如果你认为访问保留内存区是合理的，并且除非分配成功，否则内核会有压力，你可以使用 GFP\_ATOMIC 。
> - 从用户空间触发的不可信任的分配应该是kmem核算的对象，必须设置 \_\_GFP\_ACCOUNT 位。
>   有一个方便的用于 GFP\_KERNEL 分配的 GFP\_KERNEL\_ACCOUNT 快捷键，其应该被核
>   算。
> - 用户空间的分配应该使用 GFP\_USER 、 GFP\_HIGHUSER 或 GFP\_HIGHUSER\_MOVABLE
>   中的一个标志。标志名称越长，限制性越小。
>
>   GFP\_HIGHUSER\_MOVABLE 不要求分配的内存将被内核直接访问，并意味着数据是可迁移的。
>
>   GFP\_HIGHUSER 意味着所分配的内存是不可迁移的，但也不要求它能被内核直接访问。举个
>   例子就是一个硬件分配内存，这些数据直接映射到用户空间，但没有寻址限制。
>
>   GFP\_USER 意味着分配的内存是不可迁移的，它必须被内核直接访问。

你可能会注意到，在现有的代码中，有相当多的分配指定了 GFP\_NOIO 或 GFP\_NOFS 。
从历史上看，它们被用来防止递归死锁，这种死锁是由直接内存回收调用到FS或IO路径以及对已
经持有的资源进行阻塞引起的。从4.12开始，解决这个问题的首选方法是使用新的范围API，即
Documentation/core-api/gfp\_mask-from-fs-io.rst.

其他传统的GFP标志是 GFP\_DMA 和 GFP\_DMA32 。它们用于确保分配的内存可以被寻
址能力有限的硬件访问。因此，除非你正在为一个有这种限制的设备编写驱动程序，否则要避免
使用这些标志。而且，即使是有限制的硬件，也最好使用dma\_alloc\* APIs。

#### GFP标志和回收行为

内存分配可能会触发直接或后台回收，了解页面分配器将如何努力满足该请求或其他请求是非常
有用的。

> - GFP\_KERNEL & ~\_\_GFP\_RECLAIM - 乐观分配，完全不尝试释放内存。最轻量级的模
>   式，甚至不启动后台回收。应该小心使用，因为它可能会耗尽内存，而下一个用户可能会启
>   动更积极的回收。
> - GFP\_KERNEL & ~\_\_GFP\_DIRECT\_RECLAIM (or GFP\_NOWAIT ) - 乐观分配，不
>   试图从当前上下文中释放内存，但如果该区域低于低水位，可以唤醒kswapd来回收内存。可
>   以从原子上下文中使用，或者当请求是一个性能优化，并且有另一个慢速路径的回退。
> - (GFP\_KERNEL|\_\_GFP\_HIGH) & ~\_\_GFP\_DIRECT\_RECLAIM (aka GFP\_ATOMIC ) - 非
>   睡眠分配，有一个昂贵的回退，所以它可以访问某些部分的内存储备。通常从中断/底层上下
>   文中使用，有一个昂贵的慢速路径回退。
> - GFP\_KERNEL - 允许后台和直接回收，并使用默认的页面分配器行为。这意味着廉价
>   的分配请求基本上是不会失败的，但不能保证这种行为，所以失败必须由调用者适当检查（例
>   如，目前允许OOM杀手失败）。
> - GFP\_KERNEL | \_\_GFP\_NORETRY - 覆盖默认的分配器行为，所有的分配请求都会提前
>   失败，而不是导致破坏性的回收（在这个实现中是一轮的回收）。OOM杀手不被调用。
> - GFP\_KERNEL | \_\_GFP\_RETRY\_MAYFAIL - 覆盖 **默认** 的分配器行为，所有分配请求都非
>   常努力。如果回收不能取得任何进展，该请求将失败。OOM杀手不会被触发。
> - GFP\_KERNEL | \_\_GFP\_NOFAIL - 覆盖默认的分配器行为，所有分配请求将无休止地循
>   环，直到成功。这可能真的很危险，特别是对于较大的需求。

### 选择内存分配器

分配内存的最直接的方法是使用kmalloc()系列的函数。而且，为了安全起见，最好使用将内存
设置为零的例程，如kzalloc()。如果你需要为一个数组分配内存，有kmalloc\_array()和kcalloc()
辅助程序。辅助程序struct\_size()、array\_size()和array3\_size()可以用来安全地计算对
象的大小而不会溢出。

可以用 kmalloc 分配的块的最大尺寸是有限的。实际的限制取决于硬件和内核配置，但是对于
小于页面大小的对象，使用 kmalloc 是一个好的做法。

用 kmalloc 分配的块的地址至少要对齐到ARCH\_KMALLOC\_MINALIGN字节。对于2的幂的大小，
对齐方式也被保证为至少是各自的大小。

用kmalloc()分配的块可以用krealloc()调整大小。与kmalloc\_array()类似：以krealloc\_array()
的形式提供了一个用于调整数组大小的辅助工具。

对于大量的分配，你可以使用vmalloc()和vzalloc()，或者直接向页面分配器请求页面。由vmalloc
和相关函数分配的内存在物理上是不连续的。

如果你不确定分配的大小对 kmalloc 来说是否太大，可以使用kvmalloc()及其派生函数。它将尝
试用kmalloc分配内存，如果分配失败，将用 vmalloc 重新尝试。对于哪些GFP标志可以与 kvmalloc
一起使用是有限制的；请看kvmalloc\_node()参考文档。注意， kvmalloc 可能会返回物理上不连
续的内存。

如果你需要分配许多相同的对象，你可以使用slab缓存分配器。在使用缓存之前，应该用
kmem\_cache\_create()或kmem\_cache\_create\_usercopy()来设置缓存。如果缓存的一部分可能被复
制到用户空间，应该使用第二个函数。在缓存被创建后，kmem\_cache\_alloc()和它的封装可以从该缓
存中分配内存。

当分配的内存不再需要时，它必须被释放。你可以使用kvfree()来处理用 kmalloc 、 vmalloc
和 kvmalloc 分配的内存。slab缓存应该用kmem\_cache\_free()来释放。不要忘记用
kmem\_cache\_destroy()来销毁缓存。

## 来源、版本与核验

- 来源：[内存分配指南](https://docs.kernel.org/translations/zh_CN/core-api/memory-allocation.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/core-api/memory-allocation.rst`。
