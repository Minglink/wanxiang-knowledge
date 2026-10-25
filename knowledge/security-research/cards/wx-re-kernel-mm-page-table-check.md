---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-mm-page-table-check",
  "title": "Linux 内核：页表检查",
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
  "snapshotHash": "3aad5413fa7ec37f799b2ef5c51ea82e0d929c4566eaa5257839a03ece5f5604",
  "generatedHash": "319ae256374796a418d959bf0507ca80ead0ddee33083a44cd2a377cb031b12b",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "页表检查允许通过确保防止某些类型的内存损坏来强化内核。 当新的页面可以从用户空间访问时，页表检查通过将它们的页表项（PTEs PMD等）添加到页表中来执行额外 的验证。 在检测到损坏的情况下，内核会被崩溃。页表检查有一个小的性能和内存开销。因此，它在默认情况下是禁用 的，但是在额外的加固超过性能成本的系统上，可以选择启用。另外，由于页表检查是同步的，它可以帮",
  "l1": "页表检查允许通过确保防止某些类型的内存损坏来强化内核。 当新的页面可以从用户空间访问时，页表检查通过将它们的页表项（PTEs PMD等）添加到页表中来执行额外 的验证。 在检测到损坏的情况下，内核会被崩溃。页表检查有一个小的性能和内存开销。因此，它在默认情况下是禁用 的，但是在额外的加固超过性能成本的系统上，可以选择启用。另外，由于页表检查是同步的，它可以帮助调 试双映射内存损坏问题，在错误的映射发生时崩溃内核，而不是在内存损坏错误发生后内核崩溃。 - PAGE_TABLE_CHECK=y 注意，它只能在ARCH_SUPPORTS_PAGE_TABLE_CHECK可用的平台上启用。 - 使用 \"page_table_check=on\" 内核参数启动。 可以选择用PAGE_TABLE_CHECK_ENFORCED来构建内核，以便在没有额外的内核参数的情况下获得页表 支持。 我们特意决定不使用",
  "questions": [
    "Linux 内核：页表检查的原理是什么？",
    "Linux 内核：页表检查有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-mm-page-table-check",
      "url": "https://docs.kernel.org/translations/zh_CN/mm/page_table_check.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：页表检查

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 页表检查

### 概述

页表检查允许通过确保防止某些类型的内存损坏来强化内核。

当新的页面可以从用户空间访问时，页表检查通过将它们的页表项（PTEs PMD等）添加到页表中来执行额外
的验证。

在检测到损坏的情况下，内核会被崩溃。页表检查有一个小的性能和内存开销。因此，它在默认情况下是禁用
的，但是在额外的加固超过性能成本的系统上，可以选择启用。另外，由于页表检查是同步的，它可以帮助调
试双映射内存损坏问题，在错误的映射发生时崩溃内核，而不是在内存损坏错误发生后内核崩溃。

### 双重映射检测逻辑

| Current Mapping | New mapping | Permissions | Rule |
| --- | --- | --- | --- |
| Anonymous | Anonymous | Read | Allow |
| Anonymous | Anonymous | Read / Write | Prohibit |
| Anonymous | Named | Any | Prohibit |
| Named | Anonymous | Any | Prohibit |
| Named | Named | Any | Allow |

### 启用页表检查

用以下方法构建内核:

- PAGE\_TABLE\_CHECK=y
  注意，它只能在ARCH\_SUPPORTS\_PAGE\_TABLE\_CHECK可用的平台上启用。
- 使用 "page\_table\_check=on" 内核参数启动。

可以选择用PAGE\_TABLE\_CHECK\_ENFORCED来构建内核，以便在没有额外的内核参数的情况下获得页表
支持。

### 实现注意事项

我们特意决定不使用 VMA 信息，以避免依赖于 MM 状态（除了有限的 “struct page” 信息）。页表检查
独立于 Linux-MM 状态机，它验证用户可访问的页面不会被错误地共享。

PAGE\_TABLE\_CHECK 依赖于 EXCLUSIVE\_SYSTEM\_RAM。原因在于，若没有 EXCLUSIVE\_SYSTEM\_RAM，
用户被允许通过 /dev/mem 将任意物理内存区域映射到用户空间。同时，页面可能在映射到用户空间期间
改变自己的属性（例如，从匿名页面变为命名页面），导致页表检查检测到“损坏”。

即使有 EXCLUSIVE\_SYSTEM\_RAM，I/O 页面可能仍然被允许通过 /dev/mem 映射。然而，这些页面始终
被视为命名页面，所以它们不会破坏页表检查中使用的逻辑。

## 来源、版本与核验

- 来源：[页表检查](https://docs.kernel.org/translations/zh_CN/mm/page_table_check.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/mm/page_table_check.rst`。
