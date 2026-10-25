---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-fatlto",
  "title": "LLVM：FatLTO",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "FatLTO",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "0fb84f2f5302f74a73dc014091f9f02ae15a7af4c1c0531120410425222a3f63",
  "generatedHash": "8b869584ad178bf86066b36d41465a46a63d3247d060bd418f852233f53f4994",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "FatLTO：FatLTO",
  "l1": ".. contents:: :local: :depth: 2 :maxdepth: 1 FatLTO objects are a special type of `fat object file <https://en.wikipedia.org/wiki/Fat_binary>`_ that contain LTO compatible IR in addition to generated object code, instead of containing object code for multiple target architectures. This allows users to defer the choice of whether to use LTO or not to link-time, and has been a feature available in other compilers, like `GCC <https://gcc.gnu.org/onlinedocs/gccint/LTO-Overview.html>`_, for some time. Under FatLTO the compiler can emit standard object files which contain both the machine code in the `.text` section and LLVM bitcode in the `.llvm.lto` section. Within LLVM, FatLTO is supported by choosing the `FatLTODefaultPipeline`. This pipeline will: #) Run the pre-link (Thin)LTO pipeline on the current module. #) Embed the pre-link bitcode i",
  "questions": [
    "FatLTO 如何用于FatLTO？",
    "FatLTO 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-fatlto",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/FatLTO.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：FatLTO

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：FatLTO。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

FatLTO

## 技术正文

## FatLTO

.. contents::
   :local:
   :depth: 2

> 原文 RST 指令（依赖上游工程，未展开）：`.. toctree::`
   :maxdepth: 1

## Introduction


FatLTO objects are a special type of `fat object file
<https://en.wikipedia.org/wiki/Fat_binary>`_ that contain LTO compatible IR in
addition to generated object code, instead of containing object code for
multiple target architectures. This allows users to defer the choice of whether
to use LTO or not to link-time, and has been a feature available in other
compilers, like `GCC
<https://gcc.gnu.org/onlinedocs/gccint/LTO-Overview.html>`_, for some time.

Under FatLTO the compiler can emit standard object files which contain both the
machine code in the `.text` section and LLVM bitcode in the `.llvm.lto`
section.

## Overview


Within LLVM, FatLTO is supported by choosing the `FatLTODefaultPipeline`.
This pipeline will:

#) Run the pre-link (Thin)LTO pipeline on the current module.
#) Embed the pre-link bitcode in a special `.llvm.lto` section.
#) Finish optimizing the module using the ModuleOptimization pipeline.
#) Emit the object file, including the new `.llvm.lto` section.

.. NOTE

   Previously, we conservatively ran independent pipelines on separate copies
   of the LLVM module to generate the bitcode section and the object code,
   which happen to be identical to those used outside of FatLTO. While that
   resulted in  compiled artifacts that were identical to those produced by the
   default and (Thin)LTO pipelines, module cloning led to some cases of
   miscompilation, and we have moved away from trying to keep bitcode
   generation and optimization completely disjoint.

   Bit-for-bit compatibility is not (and never was) a guarantee, and we reserve
   the right to change this at any time. Explicitly, users should not rely on
   the produced bitcode or object code to match their non-LTO counterparts
   precisely. They will exhibit similar performance characteristics, but may
   not be bit-for-bit the same.

Internally, the `.llvm.lto` section is created by running the
`EmbedBitcodePass` after the `ThinLTOPreLinkDefaultPipeline`. This pass is
responsible for emitting the `.llvm.lto` section. Afterwards, the
`ThinLTODefaultPipeline` runs and the compiler can emit the fat object file.

## Limitations


### Linkers


Currently, using LTO with LLVM fat lto objects is supported by LLD and by the
GNU linkers via `GoldPlugin`. This may change in the future, but
extending support to other linkers isn't planned for now.

.. NOTE
   For standard linking the fat object files should be usable by any
   linker capable of using ELF objects, since the `.llvm.lto` section is
   marked `SHF_EXCLUDE`.

### Supported File Formats


The current implementation only supports ELF files. At time of writing, it is
unclear if it will be useful to support other object file formats like `COFF`
or `Mach-O`.

## Usage


Clang users can specify `-ffat-lto-objects` with `-flto` or `-flto=thin`.
Without the `-flto` option, `-ffat-lto-objects` has no effect.

Compile an object file using FatLTO:

```console
$ clang -flto -ffat-lto-objects example.c -c -o example.o

```

Link using the object code from the fat object without LTO. This turns
`-ffat-lto-objects` into a no-op, when `-fno-lto` is specified:

```console
$ clang -fno-lto -ffat-lto-objects -fuse-ld=lld example.o

```

Alternatively, you can omit any references to LTO with fat objects and retain standard linker behavior:

```console
$ clang -fuse-ld=lld example.o

```

Link using the LLVM bitcode from the fat object with Full LTO:

```console
$ clang -flto -ffat-lto-objects -fuse-ld=lld example.o  # clang will pass --lto=full --fat-lto-objects to ld.lld

```

Link using the LLVM bitcode from the fat object with Thin LTO:

```console
$ clang -flto=thin -ffat-lto-objects -fuse-ld=lld example.o  # clang will pass --lto=thin --fat-lto-objects to ld.lld
```

## 来源、版本与核验

- 上游：[llvm/docs/FatLTO.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/FatLTO.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/FatLTO.rst`；SHA-256：`0fb84f2f5302f74a73dc014091f9f02ae15a7af4c1c0531120410425222a3f63`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
