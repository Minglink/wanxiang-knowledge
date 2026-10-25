---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-arch-arm64-hugetlbpage",
  "title": "Linux 内核：ARM64中的 HugeTLBpage",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "arch"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "b84eed69975a00da0180da506d36cf53735411b5b06b99c8844a2feedd5e7a62",
  "generatedHash": "457cc58a01d6063ffae547cbc467f55cbbf04f699b5652e827650f6d685a8a8c",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "大页依靠有效利用 TLBs 来提高地址翻译的性能。这取决于以下 两点 - - 大页的大小 - TLBs 支持的条目大小 这是常规大页，他们的 pmd 或 pud 页面表条目指向一个内存块。 不管 TLB 中支持的条目大小如何，块映射可以减少翻译大页地址 所需遍历的页表深度。 架构中转换页表条目(D4.5.3, ARM DDI 0487C.a)中提供一个连续 ",
  "l1": "大页依靠有效利用 TLBs 来提高地址翻译的性能。这取决于以下 两点 - - 大页的大小 - TLBs 支持的条目大小 这是常规大页，他们的 pmd 或 pud 页面表条目指向一个内存块。 不管 TLB 中支持的条目大小如何，块映射可以减少翻译大页地址 所需遍历的页表深度。 架构中转换页表条目(D4.5.3, ARM DDI 0487C.a)中提供一个连续 位告诉 MMU 这个条目是一个连续条目集的一员，它可以被缓存在单 个 TLB 条目中。 在 Linux 中连续位用来增加 pmd 和 pte(最后一级)级别映射的大 小。受支持的连续页表条目数量因页面大小和页表级别而异。",
  "questions": [
    "Linux 内核：ARM64中的 HugeTLBpage的原理是什么？",
    "Linux 内核：ARM64中的 HugeTLBpage有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-arch-arm64-hugetlbpage",
      "url": "https://docs.kernel.org/translations/zh_CN/arch/arm64/hugetlbpage.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：ARM64中的 HugeTLBpage

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

Translator: Bailu Lin <[bailu.lin@vivo.com](mailto:bailu.lin@vivo.com)>

## ARM64中的 HugeTLBpage

大页依靠有效利用 TLBs 来提高地址翻译的性能。这取决于以下
两点 -

> - 大页的大小
> - TLBs 支持的条目大小

ARM64 接口支持2种大页方式。

### 1) pud/pmd 级别的块映射

这是常规大页，他们的 pmd 或 pud 页面表条目指向一个内存块。
不管 TLB 中支持的条目大小如何，块映射可以减少翻译大页地址
所需遍历的页表深度。

### 2) 使用连续位

架构中转换页表条目(D4.5.3, ARM DDI 0487C.a)中提供一个连续
位告诉 MMU 这个条目是一个连续条目集的一员，它可以被缓存在单
个 TLB 条目中。

在 Linux 中连续位用来增加 pmd 和 pte(最后一级)级别映射的大
小。受支持的连续页表条目数量因页面大小和页表级别而异。

支持以下大页尺寸配置 -

> |  | CONT PTE | PMD | CONT PMD | PUD |
> | --- | --- | --- | --- | --- |
> | 4K: | 64K | 2M | 32M | 1G |
> | 16K: | 2M | 32M | 1G |  |
> | 64K: | 2M | 512M | 16G |  |

## 来源、版本与核验

- 来源：[ARM64中的 HugeTLBpage](https://docs.kernel.org/translations/zh_CN/arch/arm64/hugetlbpage.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/arch/arm64/hugetlbpage.rst`。
