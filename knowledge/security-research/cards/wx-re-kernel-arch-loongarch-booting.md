---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-arch-loongarch-booting",
  "title": "Linux 内核：启动 Linux/LoongArch",
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
  "snapshotHash": "199300ff745e8444ff45083d3273b5ea420ef091c8174990aa39be6779a9c26e",
  "generatedHash": "ecf06807e0f7eb25c85a8cb7b460d421e90497d38dd3e65e6af443e1ab7816b5",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "LoongArch支持ACPI和FDT启动，需要传递给内核的信息包括memmap、initrd、cmdline、可 选的ACPI/FDT表等。 内核在 kernel_entry 入口处被传递以下参数: - a0 = efi_boot: efi_boot 是一个标志，表示这个启动环境是否完全符合UEFI 的要求。 - a1 = cmdline: cmdline",
  "l1": "LoongArch支持ACPI和FDT启动，需要传递给内核的信息包括memmap、initrd、cmdline、可 选的ACPI/FDT表等。 内核在 kernel_entry 入口处被传递以下参数: - a0 = efi_boot: efi_boot 是一个标志，表示这个启动环境是否完全符合UEFI 的要求。 - a1 = cmdline: cmdline 是一个指向内核命令行的指针。 - a2 = systemtable: systemtable 指向EFI的系统表，在这个阶段涉及的所有 指针都是物理地址。 内核镜像是EFI镜像。作为PE文件，它们有一个64字节的头部结构体，如下所示:",
  "questions": [
    "Linux 内核：启动 Linux/LoongArch的原理是什么？",
    "Linux 内核：启动 Linux/LoongArch有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-arch-loongarch-booting",
      "url": "https://docs.kernel.org/translations/zh_CN/arch/loongarch/booting.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：启动 Linux/LoongArch

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 启动 Linux/LoongArch

作者:
:   司延腾 <[siyanteng@loongson.cn](mailto:siyanteng@loongson.cn)>

日期:
:   2022年11月18日

### BootLoader传递给内核的信息

LoongArch支持ACPI和FDT启动，需要传递给内核的信息包括memmap、initrd、cmdline、可
选的ACPI/FDT表等。

内核在 kernel\_entry 入口处被传递以下参数:

> - a0 = efi\_boot: efi\_boot 是一个标志，表示这个启动环境是否完全符合UEFI
>   的要求。
> - a1 = cmdline: cmdline 是一个指向内核命令行的指针。
> - a2 = systemtable: systemtable 指向EFI的系统表，在这个阶段涉及的所有
>   指针都是物理地址。

### Linux/LoongArch内核镜像文件头

内核镜像是EFI镜像。作为PE文件，它们有一个64字节的头部结构体，如下所示:

```
u32     MZ_MAGIC                /* "MZ", MS-DOS 头 */
u32     res0 = 0                /* 保留 */
u64     kernel_entry            /* 内核入口点 */
u64     _end - _text            /* 内核镜像有效大小 */
u64     load_offset             /* 加载内核镜像相对内存起始地址的偏移量 */
u64     res1 = 0                /* 保留 */
u64     res2 = 0                /* 保留 */
u64     res3 = 0                /* 保留 */
u32     LINUX_PE_MAGIC          /* 魔术数 */
u32     pe_header - _head       /* 到PE头的偏移量 */
```

## 来源、版本与核验

- 来源：[启动 Linux/LoongArch](https://docs.kernel.org/translations/zh_CN/arch/loongarch/booting.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/arch/loongarch/booting.rst`。
