---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-core-api-idr",
  "title": "Linux 内核：ID分配",
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
  "snapshotHash": "f57bc8bb607942d12b89f8e93d3e4f559d6d0be441ee382a616cea5b1874fb0b",
  "generatedHash": "dbe11d663a9943ab5911c5060403cb22ab79bf6c1ef3855a4d602e1769c09399",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "要解决的一个常见问题是分配标识符（IDs）；它通常是标识事物的数字。比如包括文件描述 符、进程ID、网络协议中的数据包标识符、SCSI标记和设备实例编号。IDR和IDA为这个问题 提供了一个合理的解决方案，以避免每个人都自创。IDR提供将ID映射到指针的能力，而IDA 仅提供ID分配，因此内存效率更高。 首先初始化一个IDR，对于静态分配的IDR使用DEFI",
  "l1": "要解决的一个常见问题是分配标识符（IDs）；它通常是标识事物的数字。比如包括文件描述 符、进程ID、网络协议中的数据包标识符、SCSI标记和设备实例编号。IDR和IDA为这个问题 提供了一个合理的解决方案，以避免每个人都自创。IDR提供将ID映射到指针的能力，而IDA 仅提供ID分配，因此内存效率更高。 首先初始化一个IDR，对于静态分配的IDR使用DEFINE_IDR()，或者对于动态分配的IDR使用 idr_init()。 您可以调用idr_alloc()来分配一个未使用的ID。通过调用idr_find()查询与该ID相关的指针， 并通过调用idr_remove()释放该ID。 如果需要更改与一个ID相关联的指针，可以调用idr_replace()。这样做的一个常见原因是通 过将 NULL 指针传递给分配函数来保留ID；用保留的ID初始化对象，最后将初始化的对 象插入IDR。 一些用户",
  "questions": [
    "Linux 内核：ID分配的原理是什么？",
    "Linux 内核：ID分配有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-core-api-idr",
      "url": "https://docs.kernel.org/translations/zh_CN/core-api/idr.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0+"
}
---
# Linux 内核：ID分配

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## ID分配

作者:
:   Matthew Wilcox

### 概述

要解决的一个常见问题是分配标识符（IDs）；它通常是标识事物的数字。比如包括文件描述
符、进程ID、网络协议中的数据包标识符、SCSI标记和设备实例编号。IDR和IDA为这个问题
提供了一个合理的解决方案，以避免每个人都自创。IDR提供将ID映射到指针的能力，而IDA
仅提供ID分配，因此内存效率更高。

IDR接口已经被废弃，请使用 XArray 。

### IDR的用法

首先初始化一个IDR，对于静态分配的IDR使用DEFINE\_IDR()，或者对于动态分配的IDR使用
idr\_init()。

您可以调用idr\_alloc()来分配一个未使用的ID。通过调用idr\_find()查询与该ID相关的指针，
并通过调用idr\_remove()释放该ID。

如果需要更改与一个ID相关联的指针，可以调用idr\_replace()。这样做的一个常见原因是通
过将 NULL 指针传递给分配函数来保留ID；用保留的ID初始化对象，最后将初始化的对
象插入IDR。

一些用户需要分配大于 INT\_MAX 的ID。到目前为止，所有这些用户都满足 UINT\_MAX
的限制，他们使用idr\_alloc\_u32()。如果您需要超出u32的ID，我们将与您合作以满足您的
需求。

如果需要按顺序分配ID，可以使用idr\_alloc\_cyclic()。处理较大数量的ID时，IDR的效率会
降低，所以使用这个函数会有一点代价。

要对IDR使用的所有指针进行操作，您可以使用基于回调的idr\_for\_each()或迭代器样式的
idr\_for\_each\_entry()。您可能需要使用idr\_for\_each\_entry\_continue()来继续迭代。如果
迭代器不符合您的需求，您也可以使用idr\_get\_next()。

当使用完IDR后，您可以调用idr\_destroy()来释放IDR占用的内存。这并不会释放IDR指向的
对象；如果您想这样做，请使用其中一个迭代器来执行此操作。

您可以使用idr\_is\_empty()来查看当前是否分配了任何ID。

如果在从IDR分配一个新ID时需要带锁，您可能需要传递一组限制性的GFP标志，但这可能导
致IDR无法分配内存。为了解决该问题，您可以在获取锁之前调用idr\_preload()，然后在分
配之后调用idr\_preload\_end()。

IDR同步的相关内容请见include/linux/idr.h文件中的“DOC: idr sync”。

### IDA的用法

IDA的用法的相关内容请见lib/idr.c文件中的“DOC: IDA description”。

### 函数和数据结构

该API在以下内核代码中:

include/linux/idr.h

lib/idr.c

## 来源、版本与核验

- 来源：[ID分配](https://docs.kernel.org/translations/zh_CN/core-api/idr.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0+。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/core-api/idr.rst`。
