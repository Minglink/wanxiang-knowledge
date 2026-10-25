---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-clang-clang-docs-jsoncompilationdatabase",
  "title": "CLANG：JSON Compilation Database Format Specification",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "JSONCompilationDatabase",
    "clang"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "d74237ada3b2163d8b420546e09ecd7509663710bc7bf91621db29c893ec3683",
  "generatedHash": "5e4fafe67d241c376a71e540a79567215c768e077a1e8c73beb760033f918fa5",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "JSON Compilation Database Format Specification：JSON Compilation Database Format Specification",
  "l1": "This document describes a format for specifying how to replay single compilations independently of the build system. Tools based on the C++ Abstract Syntax Tree need full information how to parse a translation unit. Usually this information is implicitly available in the build system, but running tools as part of the build system is not necessarily the best solution: - Build systems are inherently change driven, so running multiple tools over the same code base without changing the code does not fit into the architecture of many build systems. - Figuring out whether things have changed is often an IO bound process; this makes it hard to build low latency end user tools based on the build system. - Build systems are inherently sequential in the build graph, for example due to generated source code. While tools that run independently of the",
  "questions": [
    "JSONCompilationDatabase 如何用于JSON Compilation Database Format Specification？",
    "JSONCompilationDatabase 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-clang-clang-docs-jsoncompilationdatabase",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/JSONCompilationDatabase.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# CLANG：JSON Compilation Database Format Specification

> 本文收录 CLANG 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：JSON Compilation Database Format Specification。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

JSON Compilation Database Format Specification

## 技术正文

## JSON Compilation Database Format Specification


This document describes a format for specifying how to replay single
compilations independently of the build system.

## Background


Tools based on the C++ Abstract Syntax Tree need full information how to
parse a translation unit. Usually this information is implicitly
available in the build system, but running tools as part of the build
system is not necessarily the best solution:

-  Build systems are inherently change driven, so running multiple tools
   over the same code base without changing the code does not fit into
   the architecture of many build systems.
-  Figuring out whether things have changed is often an IO bound
   process; this makes it hard to build low latency end user tools based
   on the build system.
-  Build systems are inherently sequential in the build graph, for
   example due to generated source code. While tools that run
   independently of the build still need the generated source code to
   exist, running tools multiple times over unchanging source does not
   require serialization of the runs according to the build dependency
   graph.

## Supported Systems


Clang has the ability to generate compilation database fragments via
`-MJ argument <clang -MJ\<arg>>`. You can concatenate those
fragments together between `[` and `]` to create a compilation database.

Currently [CMake ](https://cmake.org) (since 2.8.5) supports generation
of compilation databases for Unix Makefile builds (Ninja builds in the
works) with the option `CMAKE_EXPORT_COMPILE_COMMANDS`.

For projects on Linux, there is an alternative to intercept compiler
calls with a tool called [Bear ](https://github.com/rizsotto/Bear).

[Bazel ](https://bazel.build) can export a compilation database via
`this extractor extension
<https://github.com/hedronvision/bazel-compile-commands-extractor>`_.
Bazel is otherwise resistant to Bear and other compiler-intercept
techniques.

Clang's tooling interface supports reading compilation databases; see
the `LibTooling documentation <LibTooling>`. libclang and its
python bindings also support this (since clang 3.2); see
[CXCompilationDatabase.h ](/doxygen/group__COMPILATIONDB.html).

## Format


A compilation database is a JSON file, which consist of an array of
"command objects", where each command object specifies one way a
translation unit is compiled in the project.

Each command object contains the translation unit's main file, the
working directory of the compile run and the actual compile command.

Example:

::

    [
      { "directory": "/home/user/llvm/build",
        "arguments": ["/usr/bin/clang++", "-Irelative", "-DSOMEDEF=With spaces, quotes and \\-es.", "-c", "-o", "file.o", "file.cc"],
        "file": "file.cc" },

      { "directory": "/home/user/llvm/build",
        "command": "/usr/bin/clang++ -Irelative -DSOMEDEF=\"With spaces, quotes and \\-es.\" -c -o file.o file.cc",
        "file": "file2.cc" },

      ...
    ]

The contracts for each field in the command object are:

-  **directory:** The working directory of the compilation. All paths
   specified in the **command** or **file** fields must be either
   absolute or relative to this directory.
-  **file:** The main translation unit source processed by this
   compilation step. This is used by tools as the key into the
   compilation database. There can be multiple command objects for the
   same file, for example if the same source file is compiled with
   different configurations.
-  **arguments:** The compile command argv as list of strings.
   This should run the compilation step for the translation unit `file`.
   `arguments[0]` should be the executable name, such as `clang++`.
   Arguments should not be escaped, but ready to pass to `execvp()`.
-  **command:** The compile command as a single shell-escaped string.
   Arguments may be shell quoted and escaped following platform conventions,
   with '`"`' and '`\`' being the only special characters. Shell expansion
   is not supported.

   Either **arguments** or **command** is required. **arguments** is preferred,
   as shell (un)escaping is a possible source of errors.
-  **output:** The name of the output created by this compilation step.
   This field is optional. It can be used to distinguish different processing
   modes of the same input file.

## Build System Integration


The convention is to name the file compile\_commands.json and put it at
the top of the build directory. Clang tools are pointed to the top of
the build directory to detect the file and use the compilation database
to parse C++ code in the source tree.

## Alternatives

For simple projects, Clang tools also recognize a `compile_flags.txt` file.
This should contain one argument per line. The same flags will be used to
compile any file.

Example:

::

    -xc++
    -I
    libwidget/include/

Here `-I libwidget/include` is two arguments, and so becomes two lines.
Paths are relative to the directory containing `compile_flags.txt`.

## 来源、版本与核验

- 上游：[clang/docs/JSONCompilationDatabase.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/JSONCompilationDatabase.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/clang/clang/docs/JSONCompilationDatabase.rst`；SHA-256：`d74237ada3b2163d8b420546e09ecd7509663710bc7bf91621db29c893ec3683`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
