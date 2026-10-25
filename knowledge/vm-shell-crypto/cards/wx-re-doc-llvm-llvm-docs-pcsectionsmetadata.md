---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-pcsectionsmetadata",
  "title": "LLVM：LLVM PC Sections Metadata",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "PCSectionsMetadata",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "7248b2c06b4c59b8249ea183395ff573fb4455f4116f10ae1a8fccdbb0c9147b",
  "generatedHash": "a65135a274a39b1591165561381ef1b38c5f592500730cd9d321e7332cc13537",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "LLVM PC Sections Metadata：LLVM PC Sections Metadata",
  "l1": ".. contents:: :local: PC Sections Metadata can be attached to instructions and functions, for which addresses, viz. program counters (PCs), are to be emitted in specially encoded binary sections. Metadata is assigned as an `MDNode` of the `MD_pcsections` (`!pcsections`) kind; the following section describes the metadata format. An arbitrary number of interleaved `MDString` and constant operators can be added, where a new `MDString` always denotes a section name, followed by an arbitrary number of auxiliary constant data encoded along the PC of the instruction or function. The first operator must be a `MDString` denoting the first section. ```none !0 = !{ !\"<section#1>\" [ , !1 ... ] [ !\"<section#2\"> [ , !2 ... ] ... ] } !1 = !{ iXX <aux-consts#1>, ... } !2 = !{ iXX <aux-consts#2>, ... } ... ``` The occurrence of `section#1`, `section#2`, .",
  "questions": [
    "PCSectionsMetadata 如何用于LLVM PC Sections Metadata？",
    "PCSectionsMetadata 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-pcsectionsmetadata",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/PCSectionsMetadata.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：LLVM PC Sections Metadata

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：LLVM PC Sections Metadata。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

LLVM PC Sections Metadata

## 技术正文

## LLVM PC Sections Metadata


.. contents::
   :local:

## Introduction


PC Sections Metadata can be attached to instructions and functions, for which
addresses, viz. program counters (PCs), are to be emitted in specially encoded
binary sections. Metadata is assigned as an `MDNode` of the `MD_pcsections`
(`!pcsections`) kind; the following section describes the metadata format.

## Metadata Format


An arbitrary number of interleaved `MDString` and constant operators can be
added, where a new `MDString` always denotes a section name, followed by an
arbitrary number of auxiliary constant data encoded along the PC of the
instruction or function. The first operator must be a `MDString` denoting the
first section.

```none
!0 = !{
  !"<section#1>"
  [ , !1 ... ]
  [ !"<section#2">
    [ , !2 ... ]
    ... ]
}
!1 = !{ iXX <aux-consts#1>, ... }
!2 = !{ iXX <aux-consts#2>, ... }
...

```

The occurrence of `section#1`, `section#2`, ..., `section#N` in the
metadata causes the backend to emit the PC for the associated instruction or
function to all named sections. For each emitted PC in a section #N, the
constants `aux-consts#N` in the tuple `!N` will be emitted after the PC.
Multiple tuples with constant data may be provided after a section name string
(e.g. `!0 = !{"s1", !1, !2}`), and a single constant tuple may be reused for
different sections (e.g. `!0 = !{"s1", !1, "s2", !1}`).

## Binary Encoding


*Instructions* result in emitting a single PC, and *functions* result in
emission of the start of the function and a 32-bit size. This is followed by
the auxiliary constants that followed the respective section name in the
`MD_pcsections` metadata.

To avoid relocations in the final binary, each PC address stored at `entry`
is a relative relocation, computed as `pc - entry`. To decode, a user has to
compute `entry + *entry`.

The size of each entry depends on the code model. With large and medium sized
code models, the entry size matches pointer size. For any smaller code model
the entry size is just 32 bits.

### Encoding Options


Optional encoding options can be passed in the first `MDString` operator:
`<section>!<options>`. The following options are available:

    * `C` -- Compress constant integers of size 2-8 bytes as ULEB128; this
      includes the function size (but excludes the PC entry).

For example, `foo!C` will emit into section `foo` with all constants
encoded as ULEB128.

## Guarantees on Code Generation


Attaching `!pcsections` metadata to LLVM IR instructions *shall not* affect
optimizations or code generation outside the requested PC sections.

While relying on LLVM IR metadata to request PC sections makes the above
guarantee relatively trivial, propagation of metadata through the optimization
and code generation pipeline has the following guarantees.

### Metadata Propagation


In general, LLVM *does not make any guarantees* about preserving IR metadata
(attached to an `Instruction`) through IR transformations. When using PC
sections metadata, this guarantee is unchanged, and `!pcsections` metadata is
remains *optional* until lowering to machine IR (MIR).

### Note for Code Generation


As with other LLVM IR metadata, there are no requirements for LLVM IR
transformation passes to preserve `!pcsections` metadata, with the following
exceptions:

    * The `AtomicExpandPass` shall preserve `!pcsections` metadata
      according to the below rules 1-4.

When translating LLVM IR to MIR, the `!pcsections` metadata shall be copied
from the source `Instruction` to the target `MachineInstr` (set with
`MachineInstr::setPCSections()`). The instruction selectors and MIR
optimization passes shall preserve PC sections metadata as follows:

    1. Replacements will preserve PC sections metadata of the replaced
       instruction.

    2. Duplications will preserve PC sections metadata of the copied
       instruction.

    3. Merging will preserve PC sections metadata of one of the two
       instructions (no guarantee on which instruction's metadata is used).

    4. Deletions will loose PC sections metadata.

This is similar to debug info, and the `BuildMI()` helper provides a
convenient way to propagate debug info and `!pcsections` metadata in the
`MIMetadata` bundle.

### Note for Metadata Users


Use cases for `!pcsections` metadata should either be fully tolerant to
missing metadata, or the passes inserting `!pcsections` metadata should run
*after* all LLVM IR optimization passes to preserve the metadata until being
translated to MIR.

## 来源、版本与核验

- 上游：[llvm/docs/PCSectionsMetadata.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/PCSectionsMetadata.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/PCSectionsMetadata.rst`；SHA-256：`7248b2c06b4c59b8249ea183395ff573fb4455f4116f10ae1a8fccdbb0c9147b`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
