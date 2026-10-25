---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-clang-clang-docs-leaksanitizer",
  "title": "CLANG：内存泄漏检测",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "LeakSanitizer",
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
  "snapshotHash": "a452e6551ba818cc61ddad9733a89e240c264957080896a13fb550ba66b52b4e",
  "generatedHash": "0ecd53d62ad07fb9fb9c422aec6f4e9905f89d510b4bdff5651c5f28182d2a13",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "内存泄漏检测：LeakSanitizer",
  "l1": ".. contents:: :local: LeakSanitizer is a run-time memory leak detector. It can be combined with `AddressSanitizer` to get both memory error and leak detection, or used in a stand-alone mode. LSan adds almost no performance overhead until the very end of the process, at which point there is an extra leak detection phase. `AddressSanitizer`: integrates LeakSanitizer and enables it by default on supported platforms. ```console $ cat memory-leak.c #include <stdlib.h> void *p; int main() { p = malloc(7); p = 0; // The memory is leaked here. return 0; } % clang -fsanitize=address -g memory-leak.c ; ASAN_OPTIONS=detect_leaks=1 ./a.out ==23646==ERROR: LeakSanitizer: detected memory leaks Direct leak of 7 byte(s) in 1 object(s) allocated from: #0 0x4af01b in __interceptor_malloc /projects/compiler-rt/lib/asan/asan_malloc_linux.cc:52:3 #1 0x4da26a ",
  "questions": [
    "LeakSanitizer 如何用于内存泄漏检测？",
    "LeakSanitizer 有哪些参数、约束、实现语义和注意事项？"
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
      "id": "doc-clang-clang-docs-leaksanitizer",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/LeakSanitizer.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# CLANG：内存泄漏检测

> 本文收录 CLANG 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：内存泄漏检测。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

LeakSanitizer

## 技术正文

## LeakSanitizer


.. contents::
   :local:

## Introduction


LeakSanitizer is a run-time memory leak detector. It can be combined with
`AddressSanitizer` to get both memory error and leak detection, or
used in a stand-alone mode. LSan adds almost no performance overhead
until the very end of the process, at which point there is an extra leak
detection phase.

## Usage


`AddressSanitizer`: integrates LeakSanitizer and enables it by default on
supported platforms.

```console
$ cat memory-leak.c
#include <stdlib.h>
void *p;
int main() {
  p = malloc(7);
  p = 0; // The memory is leaked here.
  return 0;
}
% clang -fsanitize=address -g memory-leak.c ; ASAN_OPTIONS=detect_leaks=1 ./a.out
==23646==ERROR: LeakSanitizer: detected memory leaks
Direct leak of 7 byte(s) in 1 object(s) allocated from:
    #0 0x4af01b in __interceptor_malloc /projects/compiler-rt/lib/asan/asan_malloc_linux.cc:52:3
    #1 0x4da26a in main memory-leak.c:4:7
    #2 0x7f076fd9cec4 in __libc_start_main libc-start.c:287
SUMMARY: AddressSanitizer: 7 byte(s) leaked in 1 allocation(s).

```

To use LeakSanitizer in stand-alone mode, link your program with
`-fsanitize=leak` flag. Make sure to use `clang` (not `ld`) for the
link step, so that it would link in proper LeakSanitizer run-time library
into the final executable.

## Security Considerations


LeakSanitizer is a bug detection tool and its runtime is not meant to be
linked against production executables. While it may be useful for testing,
LeakSanitizer's runtime was not developed with security-sensitive
constraints in mind and may compromise the security of the resulting executable.

## Supported Platforms


* Android
* Fuchsia
* Linux
* macOS
* NetBSD

## More Information


`<https://github.com/google/sanitizers/wiki/AddressSanitizerLeakSanitizer>`_

## 来源、版本与核验

- 上游：[clang/docs/LeakSanitizer.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/LeakSanitizer.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/clang/clang/docs/LeakSanitizer.rst`；SHA-256：`a452e6551ba818cc61ddad9733a89e240c264957080896a13fb550ba66b52b4e`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
