---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-arch-mips-booting",
  "title": "Linux 内核：BMIPS设备树引导",
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
  "snapshotHash": "1c09d2c95518e5faf6bafc17dc155c7a84cbfd62611b9352332160a44e07f081",
  "generatedHash": "6b49666c7f2d31276027b70275f05d5eff13be1b78a1e8a56ce39bbc8846fcd8",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "一些bootloaders只支持在内核镜像开始地址处的单一入口点。而其它 bootloaders将跳转到ELF的开始地址处。两种方案都支持的；因为 CONFIG_BOOT_RAW=y and CONFIG_NO_EXCEPT_FILL=y, 所以第一条指令 会立即跳转到kernel_entry()入口处执行。 与arch/arm情况(b)类似，dt感知的引导",
  "l1": "一些bootloaders只支持在内核镜像开始地址处的单一入口点。而其它 bootloaders将跳转到ELF的开始地址处。两种方案都支持的；因为 CONFIG_BOOT_RAW=y and CONFIG_NO_EXCEPT_FILL=y, 所以第一条指令 会立即跳转到kernel_entry()入口处执行。 与arch/arm情况(b)类似，dt感知的引导加载程序需要设置以下寄存器: a2RAM中指向设备树块的物理指针(在chapterII中定义)。 :   设备树可以位于前512MB物理地址空间(0x00000000 - 0x1fffffff)的任何位置，以64位边界对齐。 传统bootloaders不会使用这样的约定，并且它们不传入DT块。 在这种情况下，Linux将通过选中CONFIG_DT_*查找DTB。 以上约定只在32位系统中定义，因为目前没有任何64位的BMIPS实现。",
  "questions": [
    "Linux 内核：BMIPS设备树引导的原理是什么？",
    "Linux 内核：BMIPS设备树引导有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-arch-mips-booting",
      "url": "https://docs.kernel.org/translations/zh_CN/arch/mips/booting.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：BMIPS设备树引导

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## BMIPS设备树引导

> 一些bootloaders只支持在内核镜像开始地址处的单一入口点。而其它
> bootloaders将跳转到ELF的开始地址处。两种方案都支持的；因为
> CONFIG\_BOOT\_RAW=y and CONFIG\_NO\_EXCEPT\_FILL=y, 所以第一条指令
> 会立即跳转到kernel\_entry()入口处执行。
>
> 与arch/arm情况(b)类似，dt感知的引导加载程序需要设置以下寄存器:
>
> > a0 : 0
> >
> > a1 : 0xffffffff
> >
> > a2RAM中指向设备树块的物理指针(在chapterII中定义)。
> > :   设备树可以位于前512MB物理地址空间(0x00000000 -
> >     0x1fffffff)的任何位置，以64位边界对齐。
>
> 传统bootloaders不会使用这样的约定，并且它们不传入DT块。
> 在这种情况下，Linux将通过选中CONFIG\_DT\_\*查找DTB。
>
> 以上约定只在32位系统中定义，因为目前没有任何64位的BMIPS实现。

## 来源、版本与核验

- 来源：[BMIPS设备树引导](https://docs.kernel.org/translations/zh_CN/arch/mips/booting.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/arch/mips/booting.rst`。
