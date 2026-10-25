---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-memtagsanitizer",
  "title": "LLVM：MemTagSanitizer",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "MemTagSanitizer",
    "漏洞研究",
    "内存安全",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "8ea91b14a5416dbacd6ab1310f928e01606f264eba5a0eb63852017d4d0bf27c",
  "generatedHash": "02355931c57a67f0754685de162ce7ab41d11b3cec8139a5efe1569d23a52ba1",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "MemTagSanitizer：MemTagSanitizer",
  "l1": ".. contents:: :local: **Note:** this page describes a tool under development. Part of this functionality is planned but not implemented. Hardware capable of running MemTagSanitizer does not exist as of Oct 2019. MemTagSanitizer is a fast memory error detector and **a code hardening tool** based on the Armv8.5-A `Memory Tagging Extension`_. It detects a similar class of errors as `AddressSanitizer`_ or `HardwareAssistedAddressSanitizer`_, but with **much** lower overhead. MemTagSanitizer overhead is expected to be in low single digits, both CPU and memory. There are plans for a debug mode with slightly higher memory overhead and better diagnostics. The primary use case of MemTagSanitizer is code hardening in production binaries, where it is expected to be a strong mitigation for both stack and heap-based memory bugs. Compile and link your ",
  "questions": [
    "MemTagSanitizer 如何用于MemTagSanitizer？",
    "MemTagSanitizer 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-cwe-787",
      "kind": "检测相关"
    }
  ],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-memtagsanitizer",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/MemTagSanitizer.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：MemTagSanitizer

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：MemTagSanitizer。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

MemTagSanitizer

## 技术正文

## MemTagSanitizer


.. contents::
   :local:

## Introduction


**Note:** this page describes a tool under development. Part of this
functionality is planned but not implemented.  Hardware capable of
running MemTagSanitizer does not exist as of Oct 2019.

MemTagSanitizer is a fast memory error detector and **a code hardening
tool** based on the Armv8.5-A `Memory Tagging Extension`_. It
detects a similar class of errors as `AddressSanitizer`_ or `HardwareAssistedAddressSanitizer`_, but with
**much** lower overhead.

MemTagSanitizer overhead is expected to be in low single digits, both
CPU and memory. There are plans for a debug mode with slightly higher
memory overhead and better diagnostics. The primary use case of
MemTagSanitizer is code hardening in production binaries, where it is
expected to be a strong mitigation for both stack and heap-based
memory bugs.


## Usage


Compile and link your program with the `-fsanitize=memtag` flag. This
will only work when targeting AArch64 Android with the memory tagging extension.
One possible way to achieve that is to add `--target=aarch64-linux-android -march=armv8+memtag`
to your compilation flags.

Note that doing this will override existing flags of the same type. Assuming that
you are already targeting AArch64 Android, an alternative is to add
`-Xclang -target-feature -Xclang +mte` to your compilation flags. This
adds the memory tagging feature, without changing anything else.

## Implementation


See `HardwareAssistedAddressSanitizer`_ for a general overview of a
tag-based approach to memory safety.  MemTagSanitizer follows a
similar implementation strategy, but with the tag storage (shadow)
provided by the hardware.

A quick overview of MTE hardware capabilities:

* Every 16 aligned bytes of memory can be assigned a 4-bit Allocation Tag.
* Every pointer can have a 4-bit Address Tag that is in its most significant byte.
* Most memory access instructions generate an exception if Address Tag != Allocation Tag.
* Special instructions are provided for fast tag manipulation.

## Stack instrumentation


Stack-based memory errors are detected by updating Allocation Tag for
each local variable to a random value at the start of its lifetime,
and resetting it to the stack pointer Address Tag at the end of
it. Unallocated stack space is expected to match the Address Tag of
SP; this allows to skip tagging of any variable when memory safety can
be statically proven.

Allocating a truly random tag for each stack variable in a large
function may incur significant code size overhead, because it means
that each variable's address is an independent, non-rematerializable
value; thus a function with N local variables will have extra N live
values to keep through most of its life time.

For this reason MemTagSanitizer generates at most one random tag per
function, called a "base tag". Other stack variables, if there are
any, are assigned tags at a fixed offset from the base.

Please refer to `this document
<https://github.com/google/sanitizers/wiki/Stack-instrumentation-with-ARM-Memory-Tagging-Extension-(MTE)>`_
for more details about stack instrumentation.

## Heap tagging


**Note:** this part is not implemented as of Oct 2019.

MemTagSanitizer will use `ScudoHardenedAllocator`
with additional code to update memory tags when

* New memory is obtained from the system.
* An allocation is freed.

There is no need to change Allocation Tags for the bulk of the
allocated memory in malloc(), as long as a pointer with the matching
Address Tag is returned.

## More information


* [LLVM Developer Meeting 2018 talk on Memory Tagging ](https://llvm.org/devmtg/2018-10/slides/Serebryany-Stepanov-Tsyrklevich-Memory-Tagging-Slides-LLVM-2018.pdf)
* [Memory Tagging Whitepaper ](https://arxiv.org/pdf/1802.09517.pdf)

.. _Memory Tagging Extension: https://community.arm.com/developer/ip-products/processors/b/processors-ip-blog/posts/arm-a-profile-architecture-2018-developments-armv85a
.. _AddressSanitizer: https://clang.llvm.org/docs/AddressSanitizer.html
.. _HardwareAssistedAddressSanitizer: https://clang.llvm.org/docs/HardwareAssistedAddressSanitizerDesign.html

## 来源、版本与核验

- 上游：[llvm/docs/MemTagSanitizer.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/MemTagSanitizer.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/MemTagSanitizer.rst`；SHA-256：`8ea91b14a5416dbacd6ab1310f928e01606f264eba5a0eb63852017d4d0bf27c`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
