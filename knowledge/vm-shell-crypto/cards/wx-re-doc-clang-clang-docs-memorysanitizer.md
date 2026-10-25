---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-clang-clang-docs-memorysanitizer",
  "title": "CLANG：未初始化内存检测",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "MemorySanitizer",
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
  "snapshotHash": "f1f6255897aa56b3208fe44eb851b9e4322f99e8f5083b1b282594a22e27066b",
  "generatedHash": "21e058a9d3d58a6d7f1c344f496c4501fb8a71c644b17c84d95114626680d115",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "未初始化内存检测：MemorySanitizer",
  "l1": ".. contents:: :local: MemorySanitizer is a detector of uninitialized memory use. It consists of a compiler instrumentation module and a run-time library. Typical slowdown introduced by MemorySanitizer is **3x**. Here is a not comprehensive of list cases when MemorySanitizer will report an error: * Uninitialized value was used in a conditional branch. * Uninitialized pointer was used for memory accesses. * Uninitialized value was passed or returned from a function call, which is considered an undefined behavior. The check can be disabled with `-fno-sanitize-memory-param-retval`. * Uninitialized data was passed into some libc calls. Build LLVM/Clang with [CMake ](https://llvm.org/docs/CMake.html). Simply compile and link your program with `-fsanitize=memory` flag. The MemorySanitizer run-time library should be linked to the final executable",
  "questions": [
    "MemorySanitizer 如何用于未初始化内存检测？",
    "MemorySanitizer 有哪些参数、约束、实现语义和注意事项？"
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
      "id": "doc-clang-clang-docs-memorysanitizer",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/MemorySanitizer.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# CLANG：未初始化内存检测

> 本文收录 CLANG 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：未初始化内存检测。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

MemorySanitizer

## 技术正文

## MemorySanitizer


.. contents::
   :local:

## Introduction


MemorySanitizer is a detector of uninitialized memory use. It consists of a
compiler instrumentation module and a run-time library.

Typical slowdown introduced by MemorySanitizer is **3x**.

Here is a not comprehensive of list cases when MemorySanitizer will report an error:

* Uninitialized value was used in a conditional branch.
* Uninitialized pointer was used for memory accesses.
* Uninitialized value was passed or returned from a function call, which is considered an undefined behavior. The check can be disabled with `-fno-sanitize-memory-param-retval`.
* Uninitialized data was passed into some libc calls.

## How to build


Build LLVM/Clang with [CMake ](https://llvm.org/docs/CMake.html).

## Usage


Simply compile and link your program with `-fsanitize=memory` flag.
The MemorySanitizer run-time library should be linked to the final
executable, so make sure to use `clang` (not `ld`) for the final
link step. When linking shared libraries, the MemorySanitizer run-time
is not linked, so `-Wl,-z,defs` may cause link errors (don't use it
with MemorySanitizer). To get a reasonable performance add `-O1` or
higher. To get meaningful stack traces in error messages add
`-fno-omit-frame-pointer`. To get perfect stack traces you may need
to disable inlining (just use `-O1`) and tail call elimination
(`-fno-optimize-sibling-calls`).

```console
% cat umr.cc
#include <stdio.h>

int main(int argc, char** argv) {
  int* a = new int[10];
  a[5] = 0;
  if (a[argc])
    printf("xx\n");
  return 0;
}

% clang -fsanitize=memory -fno-omit-frame-pointer -g -O2 umr.cc

```

If a bug is detected, the program will print an error message to
stderr and exit with a non-zero exit code.

```console
% ./a.out
WARNING: MemorySanitizer: use-of-uninitialized-value
    #0 0x7f45944b418a in main umr.cc:6
    #1 0x7f45938b676c in __libc_start_main libc-start.c:226

```

By default, MemorySanitizer exits on the first detected error. If you
find the error report hard to understand, try enabling
`origin tracking <msan-origins>`.

### ``__has_feature(memory_sanitizer)``


In some cases one may need to execute different code depending on
whether MemorySanitizer is enabled. :ref:`\_\_has\_feature
<langext-__has_feature-__has_extension>` can be used for this purpose.

```c
#if defined(__has_feature)
#  if __has_feature(memory_sanitizer)
// code that builds only under MemorySanitizer
#  endif
#endif

```

### ``__attribute__((no_sanitize("memory")))``


Some code should not be checked by MemorySanitizer.  One may use the function
attribute `no_sanitize("memory")` to disable uninitialized checks in a
particular function.  MemorySanitizer may still instrument such functions to
avoid false positives.  This attribute may not be supported by other compilers,
so we suggest to use it together with `__has_feature(memory_sanitizer)`.

### ``__attribute__((disable_sanitizer_instrumentation))``


The `disable_sanitizer_instrumentation` attribute can be applied to functions
to prevent all kinds of instrumentation. As a result, it may introduce false
positives and therefore should be used with care, and only if absolutely
required; for example for certain code that cannot tolerate any instrumentation
and resulting side-effects. This attribute overrides `no_sanitize("memory")`.

### Ignorelist


MemorySanitizer supports `src` and `fun` entity types in
`SanitizerSpecialCaseList`, that can be used to relax MemorySanitizer
checks for certain source files and functions. All "Use of uninitialized value"
warnings will be suppressed and all values loaded from memory will be
considered fully initialized.

## Report symbolization


MemorySanitizer uses an external symbolizer to print files and line numbers in
reports. Make sure that `llvm-symbolizer` binary is in `PATH`,
or set environment variable `MSAN_SYMBOLIZER_PATH` to point to it.


## Origin Tracking


MemorySanitizer can track origins of uninitialized values, similar to
Valgrind's --track-origins option. This feature is enabled by
`-fsanitize-memory-track-origins=2` (or simply
`-fsanitize-memory-track-origins`) Clang option. With the code from
the example above,

```console
% cat umr2.cc
#include <stdio.h>

int main(int argc, char** argv) {
  int* a = new int[10];
  a[5] = 0;
  volatile int b = a[argc];
  if (b)
    printf("xx\n");
  return 0;
}

% clang -fsanitize=memory -fsanitize-memory-track-origins=2 -fno-omit-frame-pointer -g -O2 umr2.cc
% ./a.out
WARNING: MemorySanitizer: use-of-uninitialized-value
    #0 0x7f7893912f0b in main umr2.cc:7
    #1 0x7f789249b76c in __libc_start_main libc-start.c:226

  Uninitialized value was stored to memory at
    #0 0x7f78938b5c25 in __msan_chain_origin msan.cc:484
    #1 0x7f7893912ecd in main umr2.cc:6

  Uninitialized value was created by a heap allocation
    #0 0x7f7893901cbd in operator new[](unsigned long) msan_new_delete.cc:44
    #1 0x7f7893912e06 in main umr2.cc:4

```

By default, MemorySanitizer collects both allocation points and all
intermediate stores the uninitialized value went through.  Origin
tracking has proved to be very useful for debugging MemorySanitizer
reports. It slows down program execution by a factor of 1.5x-2x on top
of the usual MemorySanitizer slowdown and increases memory overhead.

Clang option `-fsanitize-memory-track-origins=1` enables a slightly
faster mode when MemorySanitizer collects only allocation points but
not intermediate stores.

## Use-after-destruction detection


MemorySanitizer includes use-after-destruction detection. After invocation of
the destructor, the object will be considered no longer readable, and using
underlying memory will lead to error reports in runtime. Refer to the standard
for [lifetime ](https://eel.is/c++draft/basic.life#1) definition.

This feature can be disabled with either:

#. Pass addition Clang option `-fno-sanitize-memory-use-after-dtor` during
   compilation.
#. Set environment variable `MSAN_OPTIONS=poison_in_dtor=0` before running
   the program.

## Handling external code


MemorySanitizer requires that all program code is instrumented. This
also includes any libraries that the program depends on, even libc.
Failing to achieve this may result in false reports.
For the same reason you may need to replace all inline assembly code that writes to memory
with a pure C/C++ code.

Full MemorySanitizer instrumentation is very difficult to achieve. To
make it easier, MemorySanitizer runtime library includes 70+
interceptors for the most common libc functions. They make it possible
to run MemorySanitizer-instrumented programs linked with
uninstrumented libc. For example, the authors were able to bootstrap
MemorySanitizer-instrumented Clang compiler by linking it with
self-built instrumented libc++ (as a replacement for libstdc++).

## Security Considerations


MemorySanitizer is a bug detection tool and its runtime is not meant to be
linked against production executables. While it may be useful for testing,
MemorySanitizer's runtime was not developed with security-sensitive
constraints in mind and may compromise the security of the resulting executable.

## Supported Platforms


MemorySanitizer is supported on the following OS:

* Linux
* NetBSD
* FreeBSD

## Limitations


* MemorySanitizer uses 2x more real memory than a native run, 3x with
  origin tracking.
* MemorySanitizer maps (but not reserves) 64 Terabytes of virtual
  address space. This means that tools like `ulimit` may not work as
  usually expected.
* Static linking is not supported.
* Older versions of MSan (LLVM 3.7 and older) didn't work with
  non-position-independent executables, and could fail on some Linux
  kernel versions with disabled ASLR. Refer to documentation for older versions
  for more details.
* MemorySanitizer might be incompatible with position-independent executables
  from FreeBSD 13 but there is a check done at runtime and throws a warning
  in this case.

## Current Status


MemorySanitizer is known to work on large real-world programs
(like Clang/LLVM itself) that can be recompiled from source, including all
dependent libraries.

## More Information


`<https://github.com/google/sanitizers/wiki/MemorySanitizer>`_

## 来源、版本与核验

- 上游：[clang/docs/MemorySanitizer.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/MemorySanitizer.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/clang/clang/docs/MemorySanitizer.rst`；SHA-256：`f1f6255897aa56b3208fe44eb851b9e4322f99e8f5083b1b282594a22e27066b`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
