---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-core-api-mm-api",
  "title": "Linux 内核：内存管理APIs",
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
  "snapshotHash": "d3bc62fc1b11a6befe350393fc539c0ecd7e8403b1565a4e826ffd5ca0160729",
  "generatedHash": "d71801fe570a8271f0f7141c5a21999df408ff1741bccf8dc2f8ad061681c2b5",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "此缓存非cpu片上缓存，请读者自行查阅资料。",
  "l1": "此缓存非cpu片上缓存，请读者自行查阅资料。",
  "questions": [
    "Linux 内核：内存管理APIs的原理是什么？",
    "Linux 内核：内存管理APIs有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-core-api-mm-api",
      "url": "https://docs.kernel.org/translations/zh_CN/core-api/mm-api.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：内存管理APIs

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 内存管理APIs

API（Application Programming Interface，应用程序接口）

### 用户空间内存访问

该API在以下内核代码中:

arch/x86/include/asm/uaccess.h

arch/x86/lib/usercopy\_32.c

mm/gup.c

### 内存分配控制

该API在以下内核代码中:

include/linux/gfp\_types.h

### Slab缓存

此缓存非cpu片上缓存，请读者自行查阅资料。

该API在以下内核代码中:

include/linux/slab.h

mm/slab.c

mm/slab\_common.c

mm/util.c

### 虚拟连续（内存页）映射

该API在以下内核代码中:

mm/vmalloc.c

### 文件映射和页面缓存

该API在以下内核代码中:

#### 文件映射

mm/filemap.c

#### 预读

mm/readahead.c

#### 回写

mm/page-writeback.c

#### 截断

mm/truncate.c

include/linux/pagemap.h

### 内存池

该API在以下内核代码中:

mm/mempool.c

### DMA池

DMA(Direct Memory Access，直接存储器访问)

该API在以下内核代码中:

mm/dmapool.c

### 更多的内存管理函数

该API在以下内核代码中:

mm/memory.c

mm/page\_alloc.c

mm/mempolicy.c

include/linux/mm\_types.h

include/linux/mm\_inline.h

include/linux/page-flags.h

include/linux/mm.h

include/linux/page\_ref.h

include/linux/mmzone.h

mm/util.c

## 来源、版本与核验

- 来源：[内存管理APIs](https://docs.kernel.org/translations/zh_CN/core-api/mm-api.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/core-api/mm-api.rst`。
