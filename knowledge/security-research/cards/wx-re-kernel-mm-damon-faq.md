---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-mm-damon-faq",
  "title": "Linux 内核：常见问题",
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
  "snapshotHash": "33a33a6efbd43a3925727c6a5c323c800138399184816afd46c3e7cb137a0b5b",
  "generatedHash": "a4209beeae5d899173b741b287630db7e97f23518ef35daed1272fd64f7e165a",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "不，DAMON的核心是独立于地址空间的。用户可以在DAMON核心上实现和配置特定地址空间的低级原始 部分，包括监测目标区域的构造和实际的访问检查。通过这种方式，DAMON用户可以用任何访问检查技 术来监测任何地址空间。 尽管如此，DAMON默认为虚拟内存和物理内存提供了基于vma/rmap跟踪和PTE访问位检查的地址空间 相关功能的实现，以供参考和方便使用。",
  "l1": "不，DAMON的核心是独立于地址空间的。用户可以在DAMON核心上实现和配置特定地址空间的低级原始 部分，包括监测目标区域的构造和实际的访问检查。通过这种方式，DAMON用户可以用任何访问检查技 术来监测任何地址空间。 尽管如此，DAMON默认为虚拟内存和物理内存提供了基于vma/rmap跟踪和PTE访问位检查的地址空间 相关功能的实现，以供参考和方便使用。 是的，你可以通过设置 min_nr_regions 属性高于工作集大小除以页面大小的值来实现。 因为监视目标区域的大小被强制为 >=page size ，所以区域分割不会产生任何影响。",
  "questions": [
    "Linux 内核：常见问题的原理是什么？",
    "Linux 内核：常见问题有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-mm-damon-faq",
      "url": "https://docs.kernel.org/translations/zh_CN/mm/damon/faq.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：常见问题

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 常见问题

### DAMON是否只支持虚拟内存？

不，DAMON的核心是独立于地址空间的。用户可以在DAMON核心上实现和配置特定地址空间的低级原始
部分，包括监测目标区域的构造和实际的访问检查。通过这种方式，DAMON用户可以用任何访问检查技
术来监测任何地址空间。

尽管如此，DAMON默认为虚拟内存和物理内存提供了基于vma/rmap跟踪和PTE访问位检查的地址空间
相关功能的实现，以供参考和方便使用。

### 我可以简单地监测页面的粒度吗？

是的，你可以通过设置 min\_nr\_regions 属性高于工作集大小除以页面大小的值来实现。
因为监视目标区域的大小被强制为 >=page size ，所以区域分割不会产生任何影响。

## 来源、版本与核验

- 来源：[常见问题](https://docs.kernel.org/translations/zh_CN/mm/damon/faq.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/mm/damon/faq.rst`。
