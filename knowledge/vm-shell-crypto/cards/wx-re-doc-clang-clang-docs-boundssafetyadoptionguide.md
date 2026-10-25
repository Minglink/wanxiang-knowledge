---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-clang-clang-docs-boundssafetyadoptionguide",
  "title": "CLANG：Adoption Guide for -fbounds-safety",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "BoundsSafetyAdoptionGuide",
    "漏洞研究",
    "内存安全",
    "clang"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "7797e21f1e9d57022b184ef50a5bac30553c5de490ff08e837d5311261dcdc09",
  "generatedHash": "84aa2a89a4f163cfa3d136549b3fddad1bad512dc194531ea2ee8be499f0da61",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Adoption Guide for -fbounds-safety：Adoption Guide for ``-fbounds-safety``",
  "l1": ".. contents:: :local: The open sourcing to llvm.org's `llvm-project` is still on going and the feature is not available yet. In the mean time, the preview implementation is available [here ](https://github.com/swiftlang/llvm-project/tree/stable/20240723) in a fork of `llvm-project`. Please follow [Building LLVM with CMake ](https://llvm.org/docs/CMake.html) to build the compiler. Pass `-fbounds-safety` as a Clang compilation flag for the C file that you want to adopt. We recommend adopting the model file by file, because adoption requires some effort to add bounds annotations and fix compiler diagnostics. `ptrcheck.h` is a Clang toolchain header to provide definition of the bounds annotations such as `__counted_by`, `__counted_by_or_null`, `__sized_by`, etc. In the LLVM source tree, the header is located in `llvm-project/clang/lib/Headers",
  "questions": [
    "BoundsSafetyAdoptionGuide 如何用于Adoption Guide for -fbounds-safety？",
    "BoundsSafetyAdoptionGuide 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-clang-clang-docs-boundssafetyadoptionguide",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/BoundsSafetyAdoptionGuide.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# CLANG：Adoption Guide for -fbounds-safety

> 本文收录 CLANG 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：Adoption Guide for -fbounds-safety。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Adoption Guide for ``-fbounds-safety``

## 技术正文

## Adoption Guide for ``-fbounds-safety``


.. contents::
   :local:

## Where to get ``-fbounds-safety``


The open sourcing to llvm.org's `llvm-project` is still on going and the
feature is not available yet. In the mean time, the preview implementation is
available
[here ](https://github.com/swiftlang/llvm-project/tree/stable/20240723) in a
fork of `llvm-project`. Please follow
[Building LLVM with CMake ](https://llvm.org/docs/CMake.html) to build the
compiler.

## Feature flag


Pass `-fbounds-safety` as a Clang compilation flag for the C file that you
want to adopt. We recommend adopting the model file by file, because adoption
requires some effort to add bounds annotations and fix compiler diagnostics.

## Include ``ptrcheck.h``


`ptrcheck.h` is a Clang toolchain header to provide definition of the bounds
annotations such as `__counted_by`, `__counted_by_or_null`, `__sized_by`,
etc. In the LLVM source tree, the header is located in
`llvm-project/clang/lib/Headers/ptrcheck.h`.


## Add bounds annotations on pointers as necessary


Annotate pointers on struct fields and function parameters if they are pointing
to an array of object, with appropriate bounds annotations. Please see
`BoundsSafety` to learn what kind of bounds annotations are available and
their semantics. Note that local pointer variables typically don't need bounds
annotations because they are implicitely a wide pointer (`__bidi_indexable`)
that automatically carries the bounds information.

## Address compiler diagnostics


Once you pass `-fbounds-safety` to compiler a C file, you will see some new
compiler warnings and errors, which guide adoption of `-fbounds-safety`.
Consider the following example:

```c
#include <ptrcheck.h>

void init_buf(int *p, int n) {
   for (int i = 0; i < n; ++i)
      p[i] = 0; // error: array subscript on single pointer 'p' must use a constant index of 0 to be in bounds
}

```

The parameter `int *p` doesn't have a bounds annotation, so the compiler will
complain about the code indexing into it (`p[i]`) as it assumes that `p` is
pointing to a single `int` object or null. To address the diagnostics, you
should add a bounds annotation on `int *p` so that the compiler can reason
about the safety of the array subscript. In the following example, `p` is now
`int *__counted_by(n)`, so the compiler will allow the array subscript with
additional run-time checks as necessary.

```c
#include <ptrcheck.h>

void init_buf(int *__counted_by(n) p, int n) {
   for (int i = 0; i < n; ++i)
      p[i] = 0; // ok; `p` is now has a type with bounds annotation.
}

```

## Run test suites to fix new run-time traps


Adopting `-fbounds-safety` may cause your program to trap if it violates
bounds safety or it has incorrect adoption. Thus, it is necessary to perform
run-time testing of your program to gain confidence that it won't trap at
run time.

## Repeat the process for each remaining file


Once you've done with adopting a single C file, please repeat the same process
for each remaining C file that you want to adopt.

## 来源、版本与核验

- 上游：[clang/docs/BoundsSafetyAdoptionGuide.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/BoundsSafetyAdoptionGuide.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/clang/clang/docs/BoundsSafetyAdoptionGuide.rst`；SHA-256：`7797e21f1e9d57022b184ef50a5bac30553c5de490ff08e837d5311261dcdc09`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
