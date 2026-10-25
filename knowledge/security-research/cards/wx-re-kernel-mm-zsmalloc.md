---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-mm-zsmalloc",
  "title": "Linux 内核：zsmalloc",
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
  "snapshotHash": "bb9d460fa93d637759d22c2c082f11c71901e56d72ac5cacde7f528d6fd3e03d",
  "generatedHash": "5915a77fd25c9f3175c7078852c8a9d083961de28f1975253d06dacb3cc22a07",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "这个分配器是为与zram一起使用而设计的。因此，该分配器应该在低内存条件下工作良好。特别是， 它从未尝试过higher order页面的分配，这在内存压力下很可能会失败。另一方面，如果我们只 是使用单（0-order）页，它将遭受非常高的碎片化 - 任何大小为PAGE_SIZE/2或更大的对象将 占据整个页面。这是其前身（xvmalloc）的主要问题之一。 ",
  "l1": "这个分配器是为与zram一起使用而设计的。因此，该分配器应该在低内存条件下工作良好。特别是， 它从未尝试过higher order页面的分配，这在内存压力下很可能会失败。另一方面，如果我们只 是使用单（0-order）页，它将遭受非常高的碎片化 - 任何大小为PAGE_SIZE/2或更大的对象将 占据整个页面。这是其前身（xvmalloc）的主要问题之一。 为了克服这些问题，zsmalloc分配了一堆0-order页面，并使用各种\"struct page\"字段将它 们链接起来。这些链接的页面作为一个单一的higher order页面，即一个对象可以跨越0-order 页面的边界。代码将这些链接的页面作为一个实体，称为zspage。 为了简单起见，zsmalloc只能分配大小不超过PAGE_SIZE的对象，因为这满足了所有当前用户的 要求（在最坏的情况下，页面是不可压缩的，因此以\"原样\"即未",
  "questions": [
    "Linux 内核：zsmalloc的原理是什么？",
    "Linux 内核：zsmalloc有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-mm-zsmalloc",
      "url": "https://docs.kernel.org/translations/zh_CN/mm/zsmalloc.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：zsmalloc

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## zsmalloc

这个分配器是为与zram一起使用而设计的。因此，该分配器应该在低内存条件下工作良好。特别是，
它从未尝试过higher order页面的分配，这在内存压力下很可能会失败。另一方面，如果我们只
是使用单（0-order）页，它将遭受非常高的碎片化 - 任何大小为PAGE\_SIZE/2或更大的对象将
占据整个页面。这是其前身（xvmalloc）的主要问题之一。

为了克服这些问题，zsmalloc分配了一堆0-order页面，并使用各种"struct page"字段将它
们链接起来。这些链接的页面作为一个单一的higher order页面，即一个对象可以跨越0-order
页面的边界。代码将这些链接的页面作为一个实体，称为zspage。

为了简单起见，zsmalloc只能分配大小不超过PAGE\_SIZE的对象，因为这满足了所有当前用户的
要求（在最坏的情况下，页面是不可压缩的，因此以"原样"即未压缩的形式存储）。对于大于这
个大小的分配请求，会返回失败（见zs\_malloc）。

此外，zs\_malloc()并不返回一个可重复引用的指针。相反，它返回一个不透明的句柄（无符号
长），它编码了被分配对象的实际位置。这种间接性的原因是zsmalloc并不保持zspages的永久
映射，因为这在32位系统上会导致问题，因为内核空间映射的VA区域非常小。因此，在使用分配
的内存之前，对象必须使用zs\_map\_object()进行映射以获得一个可用的指针，随后使用
zs\_unmap\_object()解除映射。

### stat

通过CONFIG\_ZSMALLOC\_STAT，我们可以通过 /sys/kernel/debug/zsmalloc/<user name>
看到zsmalloc内部信息。下面是一个统计输出的例子。:

```
# cat /sys/kernel/debug/zsmalloc/zram0/classes

class  size almost_full almost_empty obj_allocated   obj_used pages_used pages_per_zspage
   ...
   ...
    9   176           0            1           186        129          8                4
   10   192           1            0          2880       2872        135                3
   11   208           0            1           819        795         42                2
   12   224           0            1           219        159         12                4
   ...
   ...
```

class
:   索引

size
:   zspage存储对象大小

almost\_empty
:   ZS\_ALMOST\_EMPTY zspage的数量（见下文）。

almost\_full
:   ZS\_ALMOST\_FULL zspage的数量(见下图)

obj\_allocated
:   已分配对象的数量

obj\_used
:   分配给用户的对象的数量

pages\_used
:   为该类分配的页数

pages\_per\_zspage
:   组成一个zspage的0-order页面的数量

当n <= N / f时，我们将一个zspage分配给ZS\_ALMOST\_EMPTYfullness组，其中

- n = 已分配对象的数量
- N = zspage可以存储的对象总数
- f = fullness\_threshold\_frac(即，目前是4个)

同样地，我们将zspage分配给:

- ZS\_ALMOST\_FULL when n > N / f
- ZS\_EMPTY when n == 0
- ZS\_FULL when n == N

## 来源、版本与核验

- 来源：[zsmalloc](https://docs.kernel.org/translations/zh_CN/mm/zsmalloc.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/mm/zsmalloc.rst`。
