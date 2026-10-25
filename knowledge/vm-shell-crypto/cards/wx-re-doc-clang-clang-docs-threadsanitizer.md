---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-clang-clang-docs-threadsanitizer",
  "title": "CLANG：数据竞争检测",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "ThreadSanitizer",
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
  "snapshotHash": "7d1e4b4be03189106c77c6d50e435c5ccb2678d6237dd8f6f2b7f2e7daa9a43a",
  "generatedHash": "0b4445b44432cd6e4d1296c278866b9142265b6c35dd704fcd704402c7d796e9",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "数据竞争检测：ThreadSanitizer",
  "l1": "ThreadSanitizer is a tool that detects data races. It consists of a compiler instrumentation module and a run-time library. Typical slowdown introduced by ThreadSanitizer is about **5x-15x**. Typical memory overhead introduced by ThreadSanitizer is about **5x-10x**. Build LLVM/Clang with [CMake ](https://llvm.org/docs/CMake.html). ThreadSanitizer is supported on the following OS: * Android aarch64, x86_64 * Darwin arm64, x86_64 * FreeBSD * Linux aarch64, x86_64, powerpc64, powerpc64le * NetBSD Support for other 64-bit architectures is possible, contributions are welcome. Support for 32-bit platforms is problematic and is not planned. Simply compile and link your program with `-fsanitize=thread`. To get a reasonable performance add `-O1` or higher. Use `-g` to get file names and line numbers in the warning messages. Example: ```console % c",
  "questions": [
    "ThreadSanitizer 如何用于数据竞争检测？",
    "ThreadSanitizer 有哪些参数、约束、实现语义和注意事项？"
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
      "id": "doc-clang-clang-docs-threadsanitizer",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/ThreadSanitizer.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# CLANG：数据竞争检测

> 本文收录 CLANG 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：数据竞争检测。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

ThreadSanitizer

## 技术正文

## ThreadSanitizer


### Introduction


ThreadSanitizer is a tool that detects data races.  It consists of a compiler
instrumentation module and a run-time library.  Typical slowdown introduced by
ThreadSanitizer is about **5x-15x**.  Typical memory overhead introduced by
ThreadSanitizer is about **5x-10x**.

### How to build


Build LLVM/Clang with [CMake ](https://llvm.org/docs/CMake.html).

### Supported Platforms


ThreadSanitizer is supported on the following OS:

* Android aarch64, x86_64
* Darwin arm64, x86_64
* FreeBSD
* Linux aarch64, x86_64, powerpc64, powerpc64le
* NetBSD

Support for other 64-bit architectures is possible, contributions are welcome.
Support for 32-bit platforms is problematic and is not planned.

### Usage


Simply compile and link your program with `-fsanitize=thread`.  To get a
reasonable performance add `-O1` or higher.  Use `-g` to get file names
and line numbers in the warning messages.

Example:

```console
% cat projects/compiler-rt/lib/tsan/lit_tests/tiny_race.c
#include <pthread.h>
int Global;
void *Thread1(void *x) {
  Global = 42;
  return x;
}
int main() {
  pthread_t t;
  pthread_create(&t, NULL, Thread1, NULL);
  Global = 43;
  pthread_join(t, NULL);
  return Global;
}

$ clang -fsanitize=thread -g -O1 tiny_race.c

```

If a bug is detected, the program will print an error message to stderr.
Currently, ThreadSanitizer symbolizes its output using an external
`addr2line` process (this will be fixed in future).

```bash
% ./a.out
WARNING: ThreadSanitizer: data race (pid=19219)
  Write of size 4 at 0x7fcf47b21bc0 by thread T1:
    #0 Thread1 tiny_race.c:4 (exe+0x00000000a360)

  Previous write of size 4 at 0x7fcf47b21bc0 by main thread:
    #0 main tiny_race.c:10 (exe+0x00000000a3b4)

  Thread T1 (running) created at:
    #0 pthread_create tsan_interceptors.cc:705 (exe+0x00000000c790)
    #1 main tiny_race.c:9 (exe+0x00000000a3a4)

```

### ``__has_feature(thread_sanitizer)``


In some cases one may need to execute different code depending on whether
ThreadSanitizer is enabled.
`\_\_has\_feature <langext-__has_feature-__has_extension>` can be used for
this purpose.

```c
#if defined(__has_feature)
#  if __has_feature(thread_sanitizer)
// code that builds only under ThreadSanitizer
#  endif
#endif

```

### ``__attribute__((no_sanitize("thread")))``


Some code should not be instrumented by ThreadSanitizer.  One may use the
function attribute `no_sanitize("thread")` to disable instrumentation of plain
(non-atomic) loads/stores in a particular function.  ThreadSanitizer still
instruments such functions to avoid false positives and provide meaningful stack
traces.  This attribute may not be supported by other compilers, so we suggest
to use it together with `__has_feature(thread_sanitizer)`.

### ``__attribute__((disable_sanitizer_instrumentation))``


The `disable_sanitizer_instrumentation` attribute can be applied to functions
to prevent all kinds of instrumentation. As a result, it may introduce false
positives and incorrect stack traces. Therefore, it should be used with care,
and only if absolutely required; for example for certain code that cannot
tolerate any instrumentation and resulting side-effects. This attribute
overrides `no_sanitize("thread")`.

### Ignorelist


ThreadSanitizer supports `src` and `fun` entity types in
`SanitizerSpecialCaseList`, that can be used to suppress data race reports
in the specified source files or functions. Unlike functions marked with
`no_sanitize("thread")` attribute, ignored functions are not instrumented
at all. This can lead to false positives due to missed synchronization via
atomic operations and missed stack frames in reports.

### Limitations


* ThreadSanitizer uses more real memory than a native run. At the default
  settings the memory overhead is 5x plus 1Mb per each thread. Settings with 3x
  (less accurate analysis) and 9x (more accurate analysis) overhead are also
  available.
* ThreadSanitizer maps (but does not reserve) a lot of virtual address space.
  This means that tools like `ulimit` may not work as usually expected.
* Libc/libstdc++ static linking is not supported.
* Non-position-independent executables are not supported.  Therefore, the
  `fsanitize=thread` flag will cause Clang to act as though the `-fPIE`
  flag had been supplied if compiling without `-fPIC`, and as though the
  `-pie` flag had been supplied if linking an executable.

### Security Considerations


ThreadSanitizer is a bug detection tool and its runtime is not meant to be
linked against production executables. While it may be useful for testing,
ThreadSanitizer's runtime was not developed with security-sensitive
constraints in mind and may compromise the security of the resulting executable.

### Current Status


ThreadSanitizer is in beta stage.  It is known to work on large C++ programs
using pthreads, but we do not promise anything (yet).  C++11 threading is
supported with llvm libc++.  The test suite is integrated into CMake build
and can be run with `make check-tsan` command.

We are actively working on enhancing the tool --- stay tuned.  Any help,
especially in the form of minimized standalone tests is more than welcome.

### More Information

`<https://github.com/google/sanitizers/wiki/ThreadSanitizerCppManual>`_

## 来源、版本与核验

- 上游：[clang/docs/ThreadSanitizer.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/ThreadSanitizer.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/clang/clang/docs/ThreadSanitizer.rst`；SHA-256：`7d1e4b4be03189106c77c6d50e435c5ccb2678d6237dd8f6f2b7f2e7daa9a43a`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
