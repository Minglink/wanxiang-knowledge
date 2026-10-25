---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-gwpasan",
  "title": "LLVM：GWP-ASan",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "GwpAsan",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "9be5c8af5607d7382bd09169bf2b33f4ccdc32fbf42919d1ed99ebfd871f61da",
  "generatedHash": "afff117de9b5c0a1665d6eb9a262348af026d40dddcadfac13787e5a133441cd",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "GWP-ASan：GWP-ASan",
  "l1": ".. contents:: :local: :depth: 2 GWP-ASan is a sampled allocator framework that assists in finding use-after-free and heap-buffer-overflow bugs in production environments. It informally is a recursive acronym, \"**G**\\WP-ASan **W**\\ill **P**\\rovide **A**\\llocation **SAN**\\ity\". GWP-ASan is based on the classic [Electric Fence Malloc Debugger ](https://linux.die.net/man/3/efence), with a key adaptation. Notably, we only choose a very small percentage of allocations to sample, and apply guard pages to these sampled allocations only. The sampling is small enough to allow us to have very low performance overhead. There is a small, tunable memory overhead that is fixed for the lifetime of the process. This is approximately ~40KiB per process using the default settings, depending on the average size of your allocations. Unlike [AddressSanitizer ]",
  "questions": [
    "GwpAsan 如何用于GWP-ASan？",
    "GwpAsan 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-gwpasan",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/GwpAsan.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：GWP-ASan

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：GWP-ASan。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

GWP-ASan

## 技术正文

## GWP-ASan


.. contents::
   :local:
   :depth: 2

## Introduction


GWP-ASan is a sampled allocator framework that assists in finding use-after-free
and heap-buffer-overflow bugs in production environments. It informally is a
recursive acronym, "**G**\WP-ASan **W**\ill **P**\rovide **A**\llocation
**SAN**\ity".

GWP-ASan is based on the classic
[Electric Fence Malloc Debugger ](https://linux.die.net/man/3/efence), with a
key adaptation. Notably, we only choose a very small percentage of allocations
to sample, and apply guard pages to these sampled allocations only. The sampling
is small enough to allow us to have very low performance overhead.

There is a small, tunable memory overhead that is fixed for the lifetime of the
process. This is approximately ~40KiB per process using the default settings,
depending on the average size of your allocations.

## GWP-ASan vs. ASan


Unlike [AddressSanitizer ](https://clang.llvm.org/docs/AddressSanitizer.html),
GWP-ASan does not induce a significant performance overhead. ASan often requires
the use of dedicated canaries to be viable in production environments, and as
such is often impractical. Moreover, ASan's runtime is not developed with
security consideration in mind, making compiled binaries more vulnerable to
exploits.

However, GWP-ASan is only capable of finding a subset of the memory issues
detected by ASan. Furthermore, GWP-ASan's bug detection capabilities are
only probabilistic. As such, we recommend using ASan over GWP-ASan in testing,
as well as anywhere else that guaranteed error detection is more valuable than
the 2x execution slowdown/binary size bloat. For the majority of production
environments, this impact is too high and security is indispensable, so GWP-ASan
proves extremely useful.


## Design


**Please note:** The implementation of GWP-ASan is largely in-flux, and these
details are subject to change. There are currently other implementations of
GWP-ASan, such as the implementation featured in
[Chromium ](https://cs.chromium.org/chromium/src/components/gwp_asan/). The
long-term support goal is to ensure feature-parity where reasonable, and to
support compiler-rt as the reference implementation.

### Allocator Support


GWP-ASan is not a replacement for a traditional allocator. Instead, it works by
inserting stubs into a supporting allocator to redirect allocations to GWP-ASan
when they're chosen to be sampled. These stubs are generally implemented in the
implementation of `malloc()`, `free()` and `realloc()`. The stubs are
extremely small, which makes using GWP-ASan in most allocators fairly trivial.
The stubs follow the same general pattern (example `malloc()` pseudocode
below):

.. code:: cpp

  #ifdef INSTALL_GWP_ASAN_STUBS
    gwp_asan::GuardedPoolAllocator GWPASanAllocator;
  #endif

  void* YourAllocator::malloc(..) {
  #ifdef INSTALL_GWP_ASAN_STUBS
    if (GWPASanAllocator.shouldSample(..))
      return GWPASanAllocator.allocate(..);
  #endif

    // ... the rest of your allocator code here.
  }

Then, all the supporting allocator needs to do is compile with
`-DINSTALL_GWP_ASAN_STUBS` and link against the GWP-ASan library! For
performance reasons, we strongly recommend static linkage of the GWP-ASan
library.

### Guarded Allocation Pool


The core of GWP-ASan is the guarded allocation pool. Each sampled allocation is
backed using its own *guarded* slot, which may consist of one or more accessible
pages. Each guarded slot is surrounded by two *guard* pages, which are mapped as
inaccessible. The collection of all guarded slots makes up the *guarded
allocation pool*.

### Buffer Underflow/Overflow Detection


We gain buffer-overflow and buffer-underflow detection through these guard
pages. When a memory access overruns the allocated buffer, it will touch the
inaccessible guard page, causing memory exception. This exception is caught and
handled by the internal crash handler. Because each allocation is recorded with
metadata about where (and by what thread) it was allocated and deallocated, we
can provide information that will help identify the root cause of the bug.

Allocations are randomly selected to be either left- or right-aligned to provide
equal detection of both underflows and overflows.

### Use after Free Detection


The guarded allocation pool also provides use-after-free detection. Whenever a
sampled allocation is deallocated, we map its guarded slot as inaccessible. Any
memory accesses after deallocation will thus trigger the crash handler, and we
can provide useful information about the source of the error.

Please note that the use-after-free detection for a sampled allocation is
transient. To keep memory overhead fixed while still detecting bugs, deallocated
slots are randomly reused to guard future allocations.

## Usage


GWP-ASan already ships by default in the
[Scudo Hardened Allocator ](https://llvm.org/docs/ScudoHardenedAllocator.html),
so building with `-fsanitize=scudo` is the quickest and easiest way to try out
GWP-ASan.

### Options


GWP-ASan's configuration is managed by the supporting allocator. We provide a
generic configuration management library that is used by Scudo. It allows
several aspects of GWP-ASan to be configured through the following methods:

- When the GWP-ASan library is compiled, by setting
  `-DGWP_ASAN_DEFAULT_OPTIONS` to the options string you want set by default.
  If you're building GWP-ASan as part of a compiler-rt/LLVM build, add it during
  cmake configure time (e.g. `cmake ... -DGWP_ASAN_DEFAULT_OPTIONS="..."`). If
  you're building GWP-ASan outside of compiler-rt, simply ensure that you
  specify `-DGWP_ASAN_DEFAULT_OPTIONS="..."` when building
  `optional/options_parser.cpp`).

- By defining a `__gwp_asan_default_options` function in one's program that
  returns the options string to be parsed. Said function must have the following
  prototype: `extern "C" const char* __gwp_asan_default_options(void)`, with a
  default visibility. This will override the compile time define;

- Depending on allocator support (Scudo has support for this mechanism): Through
  an environment variable, containing the options string to be parsed. In Scudo,
  this is through `SCUDO_OPTIONS=GWP_ASAN_${OPTION_NAME}=${VALUE}` (e.g.
  `SCUDO_OPTIONS=GWP_ASAN_SampleRate=100`). Options defined this way will
  override any definition made through `__gwp_asan_default_options`.

The options string follows a syntax similar to ASan, where distinct options
can be assigned in the same string, separated by colons.

For example, using the environment variable:

.. code:: console

  GWP_ASAN_OPTIONS="MaxSimultaneousAllocations=16:SampleRate=5000" ./a.out

Or using the function:

.. code:: cpp

  extern "C" const char *__gwp_asan_default_options() {
    return "MaxSimultaneousAllocations=16:SampleRate=5000";
  }

The following options are available:

+----------------------------+---------+--------------------------------------------------------------------------------+
| Option                     | Default | Description                                                                    |
+----------------------------+---------+--------------------------------------------------------------------------------+
| Enabled                    | true    | Is GWP-ASan enabled?                                                           |
+----------------------------+---------+--------------------------------------------------------------------------------+
| PerfectlyRightAlign        | false   | When allocations are right-aligned, should we perfectly align them up to the   |
|                            |         | page boundary? By default (false), we round up allocation size to the nearest  |
|                            |         | power of two (2, 4, 8, 16) up to a maximum of 16-byte alignment for            |
|                            |         | performance reasons. Setting this to true can find single byte                 |
|                            |         | buffer-overflows at the cost of performance, and may be incompatible with      |
|                            |         | some architectures.                                                            |
+----------------------------+---------+--------------------------------------------------------------------------------+
| MaxSimultaneousAllocations | 16      | Number of simultaneously-guarded allocations available in the pool.            |
+----------------------------+---------+--------------------------------------------------------------------------------+
| SampleRate                 | 5000    | The probability (1 / SampleRate) that a page is selected for GWP-ASan          |
|                            |         | sampling. Sample rates up to (2^31 - 1) are supported.                         |
+----------------------------+---------+--------------------------------------------------------------------------------+
| InstallSignalHandlers      | true    | Install GWP-ASan signal handlers for SIGSEGV during dynamic loading. This      |
|                            |         | allows better error reports by providing stack traces for allocation and       |
|                            |         | deallocation when reporting a memory error. GWP-ASan's signal handler will     |
|                            |         | forward the signal to any previously-installed handler, and user programs      |
|                            |         | that install further signal handlers should make sure they do the same. Note,  |
|                            |         | if the previously installed SIGSEGV handler is SIG_IGN, we terminate the       |
|                            |         | process after dumping the error report.                                        |
+----------------------------+---------+--------------------------------------------------------------------------------+

### Example


The below code has a use-after-free bug, where the `string_view` is created as
a reference to the temporary result of the `string+` operator. The
use-after-free occurs when `sv` is dereferenced on line 8.

.. code:: cpp

  1: #include <iostream>
  2: #include <string>
  3: #include <string_view>
  4:
  5: int main() {
  6:   std::string s = "Hellooooooooooooooo ";
  7:   std::string_view sv = s + "World\n";
  8:   std::cout << sv;
  9: }

Compiling this code with Scudo+GWP-ASan will probabilistically catch this bug
and provide us a detailed error report:

.. code:: console

  $ clang++ -fsanitize=scudo -g buggy_code.cpp
  $ for i in `seq 1 500`; do
      SCUDO_OPTIONS="GWP_ASAN_SampleRate=100" ./a.out > /dev/null;
    done
  |
  | *** GWP-ASan detected a memory error ***
  | Use after free at 0x7feccab26000 (0 bytes into a 41-byte allocation at 0x7feccab26000) by thread 31027 here:
  |   ...
  |   #9 ./a.out(_ZStlsIcSt11char_traitsIcEERSt13basic_ostreamIT_T0_ES6_St17basic_string_viewIS3_S4_E+0x45) [0x55585c0afa55]
  |   #10 ./a.out(main+0x9f) [0x55585c0af7cf]
  |   #11 /lib/x86_64-linux-gnu/libc.so.6(__libc_start_main+0xeb) [0x7fecc966952b]
  |   #12 ./a.out(_start+0x2a) [0x55585c0867ba]
  |
  | 0x7feccab26000 was deallocated by thread 31027 here:
  |   ...
  |   #7 ./a.out(main+0x83) [0x55585c0af7b3]
  |   #8 /lib/x86_64-linux-gnu/libc.so.6(__libc_start_main+0xeb) [0x7fecc966952b]
  |   #9 ./a.out(_start+0x2a) [0x55585c0867ba]
  |
  | 0x7feccab26000 was allocated by thread 31027 here:
  |   ...
  |   #12 ./a.out(main+0x57) [0x55585c0af787]
  |   #13 /lib/x86_64-linux-gnu/libc.so.6(__libc_start_main+0xeb) [0x7fecc966952b]
  |   #14 ./a.out(_start+0x2a) [0x55585c0867ba]
  |
  | *** End GWP-ASan report ***
  | Segmentation fault

To symbolize these stack traces, some care has to be taken. Scudo currently uses
GNU's `backtrace_symbols()` from `<execinfo.h>` to unwind. The unwinder
provides human-readable stack traces in `function+offset` form, rather than
the normal `binary+offset` form. In order to use addr2line or similar tools to
recover the exact line number, we must convert the `function+offset` to
`binary+offset`. A helper script is available at
`compiler-rt/lib/gwp_asan/scripts/symbolize.sh`. Using this script will
attempt to symbolize each possible line, falling back to the previous output if
anything fails. This results in the following output:

.. code:: console


  $ cat my_gwp_asan_error.txt | symbolize.sh
  |
  | *** GWP-ASan detected a memory error ***
  | Use after free at 0x7feccab26000 (0 bytes into a 41-byte allocation at 0x7feccab26000) by thread 31027 here:
  | ...
  | #9 /usr/lib/gcc/x86_64-linux-gnu/8.0.1/../../../../include/c++/8.0.1/string_view:547
  | #10 /tmp/buggy_code.cpp:8
  |
  | 0x7feccab26000 was deallocated by thread 31027 here:
  | ...
  | #7 /tmp/buggy_code.cpp:8
  | #8 /lib/x86_64-linux-gnu/libc.so.6(__libc_start_main+0xeb) [0x7fecc966952b]
  | #9 ./a.out(_start+0x2a) [0x55585c0867ba]
  |
  | 0x7feccab26000 was allocated by thread 31027 here:
  | ...
  | #12 /tmp/buggy_code.cpp:7
  | #13 /lib/x86_64-linux-gnu/libc.so.6(__libc_start_main+0xeb) [0x7fecc966952b]
  | #14 ./a.out(_start+0x2a) [0x55585c0867ba]
  |
  | *** End GWP-ASan report ***
  | Segmentation fault

## 来源、版本与核验

- 上游：[llvm/docs/GwpAsan.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/GwpAsan.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/GwpAsan.rst`；SHA-256：`9be5c8af5607d7382bd09169bf2b33f4ccdc32fbf42919d1ed99ebfd871f61da`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
