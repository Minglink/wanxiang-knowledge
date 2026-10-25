---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-fuzzingllvm",
  "title": "LLVM：Fuzzing LLVM libraries and tools",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "FuzzingLLVM",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ea4ad3fd1208840ddff9823c8f8b246f3979665f3446f976e0d8752ba5f03a59",
  "generatedHash": "f526a96ad40185a674d0b2cd52599e523cf2615db886dce6371d0a26478fed84",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Fuzzing LLVM libraries and tools：Fuzzing LLVM libraries and tools",
  "l1": ".. contents:: :local: :depth: 2 The LLVM tree includes a number of fuzzers for various components. These are built on top of `LibFuzzer <LibFuzzer>`. In order to build and run these fuzzers, see `building-fuzzers`. A |generic fuzzer| that tries to compile textual input as C++ code. Some of the bugs this fuzzer has reported are `on bugzilla`__ and `on OSS Fuzz's tracker`__. __ https://llvm.org/pr23057 __ https://bugs.chromium.org/p/oss-fuzz/issues/list?q=proj-llvm+clang-fuzzer A |protobuf fuzzer| that compiles valid C++ programs generated from a protobuf class that describes a subset of the C++ language. This fuzzer accepts clang command line options after `ignore_remaining_args=1`. For example, the following command will fuzz clang with a higher optimization level: ```shell % bin/clang-proto-fuzzer <corpus-dir> -ignore_remaining_args=1 -O",
  "questions": [
    "FuzzingLLVM 如何用于Fuzzing LLVM libraries and tools？",
    "FuzzingLLVM 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-fuzzingllvm",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/FuzzingLLVM.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：Fuzzing LLVM libraries and tools

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：Fuzzing LLVM libraries and tools。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Fuzzing LLVM libraries and tools

## 技术正文

## Fuzzing LLVM libraries and tools


.. contents::
   :local:
   :depth: 2

## Introduction


The LLVM tree includes a number of fuzzers for various components. These are
built on top of `LibFuzzer <LibFuzzer>`. In order to build and run these
fuzzers, see `building-fuzzers`.


## Available Fuzzers


### clang-fuzzer


A |generic fuzzer| that tries to compile textual input as C++ code. Some of the
bugs this fuzzer has reported are `on bugzilla`__ and `on OSS Fuzz's
tracker`__.

__ https://llvm.org/pr23057
__ https://bugs.chromium.org/p/oss-fuzz/issues/list?q=proj-llvm+clang-fuzzer

### clang-proto-fuzzer


A |protobuf fuzzer| that compiles valid C++ programs generated from a protobuf
class that describes a subset of the C++ language.

This fuzzer accepts clang command line options after `ignore_remaining_args=1`.
For example, the following command will fuzz clang with a higher optimization
level:

```shell
% bin/clang-proto-fuzzer <corpus-dir> -ignore_remaining_args=1 -O3

```

### clang-format-fuzzer


A |generic fuzzer| that runs clang-format_ on C++ text fragments. Some of the
bugs this fuzzer has reported are `on bugzilla`__
and `on OSS Fuzz's tracker`__.

.. _clang-format: https://clang.llvm.org/docs/ClangFormat.html
__ https://llvm.org/pr23052
__ https://bugs.chromium.org/p/oss-fuzz/issues/list?q=proj-llvm+clang-format-fuzzer

### llvm-as-fuzzer


A |generic fuzzer| that tries to parse text as `LLVM assembly <LangRef>`.
Some of the bugs this fuzzer has reported are `on bugzilla`__.

__ https://llvm.org/pr24639

### llvm-dwarfdump-fuzzer


A |generic fuzzer| that interprets inputs as object files and runs
`llvm-dwarfdump <CommandGuide/llvm-dwarfdump>` on them. Some of the bugs
this fuzzer has reported are `on OSS Fuzz's tracker`__

__ https://bugs.chromium.org/p/oss-fuzz/issues/list?q=proj-llvm+llvm-dwarfdump-fuzzer

### llvm-demangle-fuzzer


A |generic fuzzer| for the Itanium demangler used in various LLVM tools. We've
fuzzed __cxa_demangle to death, why not fuzz LLVM's implementation of the same
function!

### llvm-isel-fuzzer


A |LLVM IR fuzzer| aimed at finding bugs in instruction selection.

This fuzzer accepts flags after `ignore_remaining_args=1`. The flags match
those of `llc <CommandGuide/llc>` and the triple is required. For example,
the following command would fuzz AArch64 with `GlobalISel/index`:

```shell
% bin/llvm-isel-fuzzer <corpus-dir> -ignore_remaining_args=1 -mtriple aarch64 -global-isel -O0

```

Some flags can also be specified in the binary name itself in order to support
OSS Fuzz, which has trouble with required arguments. To do this, you can copy
or move `llvm-isel-fuzzer` to `llvm-isel-fuzzer--x-y-z`, separating options
from the binary name using "--". The valid options are architecture names
(`aarch64`, `x86_64`), optimization levels (`O0`, `O2`), or specific
keywords, like `gisel` for enabling global instruction selection. In this
mode, the same example could be run like so:

```shell
% bin/llvm-isel-fuzzer--aarch64-O0-gisel <corpus-dir>

```

### llvm-opt-fuzzer


A |LLVM IR fuzzer| aimed at finding bugs in optimization passes.

It receives optimization pipeline and runs it for each fuzzer input.

Interface of this fuzzer almost directly mirrors `llvm-isel-fuzzer`. Both
`mtriple` and `passes` arguments are required. Passes are specified in a
format suitable for the new pass manager. You can find some documentation about
this format in the doxygen for `PassBuilder::parsePassPipeline`.

```shell
% bin/llvm-opt-fuzzer <corpus-dir> -ignore_remaining_args=1 -mtriple x86_64 -passes instcombine

```

Similarly to the `llvm-isel-fuzzer` arguments in some predefined configurations
might be embedded directly into the binary file name:

```shell
% bin/llvm-opt-fuzzer--x86_64-instcombine <corpus-dir>

```

### llvm-mc-assemble-fuzzer


A |generic fuzzer| that fuzzes the MC layer's assemblers by treating inputs as
target specific assembly.

Note that this fuzzer has an unusual command line interface which is not fully
compatible with all of libFuzzer's features. Fuzzer arguments must be passed
after `--fuzzer-args`, and any `llc` flags must use two dashes. For
example, to fuzz the AArch64 assembler you might use the following command:

```console
llvm-mc-fuzzer --triple=aarch64-linux-gnu --fuzzer-args -max_len=4

```

This scheme will likely change in the future.

### llvm-mc-disassemble-fuzzer


A |generic fuzzer| that fuzzes the MC layer's disassemblers by treating inputs
as assembled binary data.

Note that this fuzzer has an unusual command line interface which is not fully
compatible with all of libFuzzer's features. See the notes above about
`llvm-mc-assemble-fuzzer` for details.


.. |generic fuzzer| replace:: `generic fuzzer <fuzzing-llvm-generic>`
.. |protobuf fuzzer|
   replace:: `libprotobuf-mutator based fuzzer <fuzzing-llvm-protobuf>`
.. |LLVM IR fuzzer|
   replace:: `structured LLVM IR fuzzer <fuzzing-llvm-ir>`

### lldb-target-fuzzer


A |generic fuzzer| that interprets inputs as object files and uses them to
create a target in lldb.

## Mutators and Input Generators


The inputs for a fuzz target are generated via random mutations of a
`corpus <libfuzzer-corpus>`. There are a few options for the kinds of
mutations that a fuzzer in LLVM might want.


### Generic Random Fuzzing


The most basic form of input mutation is to use the built in mutators of
LibFuzzer. These simply treat the input corpus as a bag of bits and make random
mutations. This type of fuzzer is good for stressing the surface layers of a
program, and is good at testing things like lexers, parsers, or binary
protocols.

Some of the in-tree fuzzers that use this type of mutator are `clang-fuzzer`_,
`clang-format-fuzzer`_, `llvm-as-fuzzer`_, `llvm-dwarfdump-fuzzer`_,
`llvm-mc-assemble-fuzzer`_, and `llvm-mc-disassemble-fuzzer`_.


### Structured Fuzzing using ``libprotobuf-mutator``


We can use libprotobuf-mutator_ in order to perform structured fuzzing and
stress deeper layers of programs. This works by defining a protobuf class that
translates arbitrary data into structurally interesting input. Specifically, we
use this to work with a subset of the C++ language and perform mutations that
produce valid C++ programs in order to exercise parts of clang that are more
interesting than parser error handling.

To build this kind of fuzzer you need `protobuf`_ and its dependencies
installed, and you need to specify some extra flags when configuring the build
with `CMake <CMake>`. For example, `clang-proto-fuzzer`_ can be enabled by
adding `-DCLANG_ENABLE_PROTO_FUZZER=ON` to the flags described in
`building-fuzzers`.

The only in-tree fuzzer that uses `libprotobuf-mutator` today is
`clang-proto-fuzzer`_.

.. _libprotobuf-mutator: https://github.com/google/libprotobuf-mutator
.. _protobuf: https://github.com/google/protobuf


### Structured Fuzzing of LLVM IR


We also use a more direct form of structured fuzzing for fuzzers that take
`LLVM IR <LangRef>` as input. This is achieved through the `FuzzMutate`
library, which was `discussed at EuroLLVM 2017`_.

The `FuzzMutate` library is used to structurally fuzz backends in
`llvm-isel-fuzzer`_.

.. _discussed at EuroLLVM 2017: https://www.youtube.com/watch?v=UBbQ_s6hNgg


## Building and Running



### Configuring LLVM to Build Fuzzers


Fuzzers will be built and linked to libFuzzer by default as long as you build
LLVM with sanitizer coverage enabled. You would typically also enable at least
one sanitizer to find bugs faster. The most common way to build the fuzzers is
by adding the following two flags to your CMake invocation:
`-DLLVM_USE_SANITIZER=Address -DLLVM_USE_SANITIZE_COVERAGE=On`.

.. note:: If you have `compiler-rt` checked out in an LLVM tree when building
          with sanitizers, you'll want to specify `-DLLVM_BUILD_RUNTIME=Off`
          to avoid building the sanitizers themselves with sanitizers enabled.

.. note:: You may run into issues if you build with BFD ld, which is the
          default linker on many unix systems. These issues are being tracked
          in https://llvm.org/PR34636.

### Continuously Running and Finding Bugs


There used to be a public buildbot running LLVM fuzzers continuously, and while
this did find issues, it didn't have a very good way to report problems in an
actionable way. Because of this, we're moving towards using `OSS Fuzz`_ more
instead.

You can browse the `LLVM project issue list`_ for the bugs found by
`LLVM on OSS Fuzz`_. These are also mailed to the `llvm-bugs mailing
list`_.

.. _OSS Fuzz: https://github.com/google/oss-fuzz
   https://bugs.chromium.org/p/oss-fuzz/issues/list?q=Proj-llvm
   https://github.com/google/oss-fuzz/blob/master/projects/llvm
   http://lists.llvm.org/cgi-bin/mailman/listinfo/llvm-bugs


## Utilities for Writing Fuzzers


There are some utilities available for writing fuzzers in LLVM.

Some helpers for handling the command line interface are available in
`include/llvm/FuzzMutate/FuzzerCLI.h`, including functions to parse command
line options in a consistent way and to implement standalone main functions so
your fuzzer can be built and tested when not built against libFuzzer.

There is also some handling of the CMake config for fuzzers, where you should
use the `add_llvm_fuzzer` to set up fuzzer targets. This function works
similarly to functions such as `add_llvm_tool`, but they take care of linking
to LibFuzzer when appropriate and can be passed the `DUMMY_MAIN` argument to
enable standalone testing.

## 来源、版本与核验

- 上游：[llvm/docs/FuzzingLLVM.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/FuzzingLLVM.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/FuzzingLLVM.rst`；SHA-256：`ea4ad3fd1208840ddff9823c8f8b246f3979665f3446f976e0d8752ba5f03a59`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
