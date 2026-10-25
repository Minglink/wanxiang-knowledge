---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-devel-migration-mapped-ram",
  "title": "QEMU：Mapped-ram",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "mapped-ram",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "fbb1db3a9ea7cc850acbe9ac16ad81d1666f7995f8a293149de230f5c722f5b5",
  "generatedHash": "289abe837211220c5450f2a596513b4269c8e4f42b65d8704a053c0f1b7a1842",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Mapped-ram：Mapped-ram",
  "l1": "Mapped-ram is a new stream format for the RAM section designed to supplement the existing `file:` migration and make it compatible with `multifd`. This enables parallel migration of a guest's RAM to a file. The core of the feature is to ensure that RAM pages are mapped directly to offsets in the resulting migration file. This enables the `multifd` threads to write exclusively to those offsets even if the guest is constantly dirtying pages (i.e. live migration). Another benefit is that the resulting file will have a bounded size, since pages which are dirtied multiple times will always go to a fixed location in the file, rather than constantly being added to a sequential stream. Having the pages at fixed offsets also allows the usage of O_DIRECT for save/restore of the migration stream as the pages are ensured to be written respecting O_DI",
  "questions": [
    "mapped-ram 如何用于Mapped-ram？",
    "mapped-ram 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-devel-migration-mapped-ram",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/migration/mapped-ram.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：Mapped-ram

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：Mapped-ram。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Mapped-ram

## 技术正文

## Mapped-ram


Mapped-ram is a new stream format for the RAM section designed to
supplement the existing `file:` migration and make it compatible
with `multifd`. This enables parallel migration of a guest's RAM to
a file.

The core of the feature is to ensure that RAM pages are mapped
directly to offsets in the resulting migration file. This enables the
`multifd` threads to write exclusively to those offsets even if the
guest is constantly dirtying pages (i.e. live migration). Another
benefit is that the resulting file will have a bounded size, since
pages which are dirtied multiple times will always go to a fixed
location in the file, rather than constantly being added to a
sequential stream. Having the pages at fixed offsets also allows the
usage of O_DIRECT for save/restore of the migration stream as the
pages are ensured to be written respecting O_DIRECT alignment
restrictions.

### Usage


On both source and destination, enable the `multifd` and
`mapped-ram` capabilities:

    `migrate_set_capability multifd on`

    `migrate_set_capability mapped-ram on`

Use a `file:` URL for migration:

    `migrate file:/path/to/migration/file`

Mapped-ram migration is best done non-live, i.e. by stopping the VM on
the source side before migrating.

For best performance enable the `direct-io` parameter as well:

    `migrate_set_parameter direct-io on`

### Use-cases


The mapped-ram feature was designed for use cases where the migration
stream will be directed to a file in the filesystem and not
immediately restored on the destination VM\ [#alternatives]_. These could be
thought of as snapshots. We can further categorize them into live and
non-live.

- Non-live snapshot

If the use case requires a VM to be stopped before taking a snapshot,
that's the ideal scenario for mapped-ram migration. Not having to
track dirty pages, the migration will write the RAM pages to the disk
as fast as it can.

Note: if a snapshot is taken of a running VM, but the VM will be
stopped after the snapshot by the admin, then consider stopping it
right before the snapshot to take benefit of the performance gains
mentioned above.

- Live snapshot

If the use case requires that the VM keeps running during and after
the snapshot operation, then mapped-ram migration can still be used,
but will be less performant. Other strategies such as
background-snapshot should be evaluated as well. One benefit of
mapped-ram in this scenario is portability since background-snapshot
depends on async dirty tracking (KVM_GET_DIRTY_LOG) which is not
supported outside of Linux.

.. [#alternatives] While this same effect could be obtained with the usage of
       snapshots or the `file:` migration alone, mapped-ram provides
       a performance increase for VMs with larger RAM sizes (10s to
       100s of GiBs), specially if the VM has been stopped beforehand.

### RAM section format


Instead of having a sequential stream of pages that follow the
RAMBlock headers, the dirty pages for a RAMBlock follow its header
instead. This ensures that each RAM page has a fixed offset in the
resulting migration file.

A bitmap is introduced to track which pages have been written in the
migration file. Pages are written at a fixed location for every
ramblock. Zero pages are ignored as they'd be zero in the destination
migration as well.

::

 Without mapped-ram:                  With mapped-ram:

 ---------------------               --------------------------------
 | ramblock 1 header |               | ramblock 1 header            |
 ---------------------               --------------------------------
 | ramblock 2 header |               | ramblock 1 mapped-ram header |
 ---------------------               --------------------------------
 | ...               |               | padding to next 1MB boundary |
 ---------------------               | ...                          |
 | ramblock n header |               --------------------------------
 ---------------------               | ramblock 1 pages             |
 | RAM_SAVE_FLAG_EOS |               | ...                          |
 ---------------------               --------------------------------
 | stream of pages   |               | ramblock 2 header            |
 | (iter 1)          |               --------------------------------
 | ...               |               | ramblock 2 mapped-ram header |
 ---------------------               --------------------------------
 | RAM_SAVE_FLAG_EOS |               | padding to next 1MB boundary |
 ---------------------               | ...                          |
 | stream of pages   |               --------------------------------
 | (iter 2)          |               | ramblock 2 pages             |
 | ...               |               | ...                          |
 ---------------------               --------------------------------
 | ...               |               | ...                          |
 ---------------------               --------------------------------
### | RAM_SAVE_FLAG_EOS            |

### | ...                          |


where:
 - ramblock header: the generic information for a ramblock, such as
   idstr, used_len, etc.

 - ramblock mapped-ram header: the information added by this feature:
   bitmap of pages written, bitmap size and offset of pages in the
   migration file.

### Restrictions


Since pages are written to their relative offsets and out of order
(due to the memory dirtying patterns), streaming channels such as
sockets are not supported. A seekable channel such as a file is
required. This can be verified in the QIOChannel by the presence of
the QIO_CHANNEL_FEATURE_SEEKABLE.

The improvements brought by this feature apply only to guest physical
RAM. Other types of memory such as VRAM are migrated as part of device
states.

## 来源、版本与核验

- 上游：[docs/devel/migration/mapped-ram.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/migration/mapped-ram.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/devel/migration/mapped-ram.rst`；SHA-256：`fbb1db3a9ea7cc850acbe9ac16ad81d1666f7995f8a293149de230f5c722f5b5`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
