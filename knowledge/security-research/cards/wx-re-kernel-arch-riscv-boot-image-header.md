---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-arch-riscv-boot-image-header",
  "title": "Linux 内核：RISC-V Linux启动镜像文件头",
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
  "snapshotHash": "035fb80cd49a26879f95ff5994da387a101f9c4e118fb9d93ad039290d1154ff",
  "generatedHash": "8ec0a6e06ed8a90dc6c0a99301267041b9cf4b50ab070ae248028b4dab45faaa",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "此文档仅描述RISC-V Linux 启动文件头的详情。 在解压后的Linux内核镜像中存在以下64字节的文件头: 这种头格式与PE/COFF文件头兼容，并在很大程度上受到ARM64文件头的启发。因此，ARM64 和RISC-V文件头可以在未来合并为一个共同的头。 - 将来也可以复用这个文件头，用来对RISC-V的EFI桩提供支持。为了使内核镜像如同一个 E",
  "l1": "此文档仅描述RISC-V Linux 启动文件头的详情。 在解压后的Linux内核镜像中存在以下64字节的文件头: 这种头格式与PE/COFF文件头兼容，并在很大程度上受到ARM64文件头的启发。因此，ARM64 和RISC-V文件头可以在未来合并为一个共同的头。 - 将来也可以复用这个文件头，用来对RISC-V的EFI桩提供支持。为了使内核镜像如同一个 EFI应用程序一样加载，EFI规范中规定在内核镜像的开始需要PE/COFF镜像文件头。为了 支持EFI桩，应该用“MZ”魔术字符替换掉code0，并且res3（偏移量未0x3c）应指向PE/COFF 文件头的其余部分. - 表示文件头版本号的Drop-bit位域 这保持了新旧版本之间的兼容性。 当前版本被定义为0.2。 - 从版本0.2开始，结构体成员“magic”就已经被弃用，在之后的版本中，可能会移除掉它。 最初，该成员应该与ARM6",
  "questions": [
    "Linux 内核：RISC-V Linux启动镜像文件头的原理是什么？",
    "Linux 内核：RISC-V Linux启动镜像文件头有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-arch-riscv-boot-image-header",
      "url": "https://docs.kernel.org/translations/zh_CN/arch/riscv/boot-image-header.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：RISC-V Linux启动镜像文件头

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## RISC-V Linux启动镜像文件头

Author:
:   Atish Patra <[atish.patra@wdc.com](mailto:atish.patra@wdc.com)>

Date:
:   20 May 2019

此文档仅描述RISC-V Linux 启动文件头的详情。

TODO:
:   写一个完整的启动指南。

在解压后的Linux内核镜像中存在以下64字节的文件头:

```
u32 code0;                /* Executable code */
u32 code1;                /* Executable code */
u64 text_offset;          /* Image load offset, little endian */
u64 image_size;           /* Effective Image size, little endian */
u64 flags;                /* kernel flags, little endian */
u32 version;              /* Version of this header */
u32 res1 = 0;             /* Reserved */
u64 res2 = 0;             /* Reserved */
u64 magic = 0x5643534952; /* Magic number, little endian, "RISCV" */
u32 magic2 = 0x05435352;  /* Magic number 2, little endian, "RSC\x05" */
u32 res3;                 /* Reserved for PE COFF offset */
```

这种头格式与PE/COFF文件头兼容，并在很大程度上受到ARM64文件头的启发。因此，ARM64
和RISC-V文件头可以在未来合并为一个共同的头。

### 注意

- 将来也可以复用这个文件头，用来对RISC-V的EFI桩提供支持。为了使内核镜像如同一个
  EFI应用程序一样加载，EFI规范中规定在内核镜像的开始需要PE/COFF镜像文件头。为了
  支持EFI桩，应该用“MZ”魔术字符替换掉code0，并且res3（偏移量未0x3c）应指向PE/COFF
  文件头的其余部分.
- 表示文件头版本号的Drop-bit位域

  > |  |  |
  > | --- | --- |
  > | Bits 0:15 | 次要 版本 |
  > | Bits 16:31 | 主要 版本 |

  这保持了新旧版本之间的兼容性。
  当前版本被定义为0.2。
- 从版本0.2开始，结构体成员“magic”就已经被弃用，在之后的版本中，可能会移除掉它。
  最初，该成员应该与ARM64头的“magic”成员匹配，但遗憾的是并没有。
  “magic2”成员代替“magic”成员与ARM64头相匹配。
- 在当前的文件头，标志位域只剩下了一个位。

  > |  |  |
  > | --- | --- |
  > | Bit 0 | 内核字节序。1 if BE, 0 if LE. |
- 对于引导加载程序加载内核映像来说，image\_size成员对引导加载程序而言是必须的，否
  则将引导失败。

## 来源、版本与核验

- 来源：[RISC-V Linux启动镜像文件头](https://docs.kernel.org/translations/zh_CN/arch/riscv/boot-image-header.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/arch/riscv/boot-image-header.rst`。
