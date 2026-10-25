---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-mm-remap-file-pages",
  "title": "Linux 内核：remap_file_pages()系统调用",
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
  "snapshotHash": "7f2cc7ad5782b8c1dc20a977e46a98d0576ecae796e2c7c6e898f35895bdb46e",
  "generatedHash": "8c682daf3786629226a745d774d1dddaa587a9dad71cd3fdf1fd6be1d55bce66",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "remap_file_pages()系统调用被用来创建一个非线性映射，也就是说，在这个映射中， 文件的页面被无序映射到内存中。使用remap_file_pages()比重复调用mmap(2)的好 处是，前者不需要内核创建额外的VMA（虚拟内存区）数据结构。 支持非线性映射需要在内核虚拟内存子系统中编写大量的non-trivial的代码，包括热 路径。另外，为",
  "l1": "remap_file_pages()系统调用被用来创建一个非线性映射，也就是说，在这个映射中， 文件的页面被无序映射到内存中。使用remap_file_pages()比重复调用mmap(2)的好 处是，前者不需要内核创建额外的VMA（虚拟内存区）数据结构。 支持非线性映射需要在内核虚拟内存子系统中编写大量的non-trivial的代码，包括热 路径。另外，为了使非线性映射工作，内核需要一种方法来区分正常的页表项和带有文件 偏移的项（pte_file）。内核为达到这个目的在PTE中保留了标志。PTE标志是稀缺资 源，特别是在某些CPU架构上。如果能腾出这个标志用于其他用途就更好了。 幸运的是，在生活中并没有很多remap_file_pages()的用户。只知道有一个企业的RDBMS 实现在32位系统上使用这个系统调用来映射比32位虚拟地址空间线性尺寸更大的文件。 由于64位系统的广泛使用，这",
  "questions": [
    "Linux 内核：remap_file_pages()系统调用的原理是什么？",
    "Linux 内核：remap_file_pages()系统调用有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-mm-remap-file-pages",
      "url": "https://docs.kernel.org/translations/zh_CN/mm/remap_file_pages.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：remap_file_pages()系统调用

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## remap\_file\_pages()系统调用

remap\_file\_pages()系统调用被用来创建一个非线性映射，也就是说，在这个映射中，
文件的页面被无序映射到内存中。使用remap\_file\_pages()比重复调用mmap(2)的好
处是，前者不需要内核创建额外的VMA（虚拟内存区）数据结构。

支持非线性映射需要在内核虚拟内存子系统中编写大量的non-trivial的代码，包括热
路径。另外，为了使非线性映射工作，内核需要一种方法来区分正常的页表项和带有文件
偏移的项（pte\_file）。内核为达到这个目的在PTE中保留了标志。PTE标志是稀缺资
源，特别是在某些CPU架构上。如果能腾出这个标志用于其他用途就更好了。

幸运的是，在生活中并没有很多remap\_file\_pages()的用户。只知道有一个企业的RDBMS
实现在32位系统上使用这个系统调用来映射比32位虚拟地址空间线性尺寸更大的文件。
由于64位系统的广泛使用，这种使用情况已经不重要了。

syscall被废弃了，现在用一个模拟来代替它。仿真会创建新的VMA，而不是非线性映射。
对于remap\_file\_pages()的少数用户来说，它的工作速度会变慢，但ABI被保留了。

仿真的一个副作用（除了性能之外）是，由于额外的VMA，用户可以更容易达到
vm.max\_map\_count的限制。关于限制的更多细节，请参见DEFAULT\_MAX\_MAP\_COUNT
的注释。

## 来源、版本与核验

- 来源：[remap_file_pages()系统调用](https://docs.kernel.org/translations/zh_CN/mm/remap_file_pages.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/mm/remap_file_pages.rst`。
