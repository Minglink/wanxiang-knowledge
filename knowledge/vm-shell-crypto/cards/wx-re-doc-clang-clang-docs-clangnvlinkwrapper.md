---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-clang-clang-docs-clangnvlinkwrapper",
  "title": "CLANG：Clang nvlink Wrapper",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "ClangNVLinkWrapper",
    "clang"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "dad01ac29572bf88a76cb41f7874fb231c2aa05e1a1d512eb26d2daaf03bebd6",
  "generatedHash": "2615de4301765f01405490c7fe33e52d30a6fcc633f1d36d77e258151c51e9f8",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Clang nvlink Wrapper：Clang nvlink Wrapper",
  "l1": ".. contents:: :local: This tools works as a wrapper around the NVIDIA `nvlink` linker. The purpose of this wrapper is to provide an interface similar to the `ld.lld` linker while still relying on NVIDIA's proprietary linker to produce the final output. `nvlink` has a number of known quirks that make it difficult to use in a unified offloading setting. For example, it does not accept `.o` files as they must be named `.cubin`. Static archives do not work, so passing a `.a` will provide a linker error. `nvlink` also does not support link time optimization and ignores many standard linker arguments. This tool works around these issues. This tool can be used with the following options. Any arguments not intended only for the linker wrapper will be forwarded to `nvlink`. ```console OVERVIEW: A utility that wraps around the NVIDIA 'nvlink' linke",
  "questions": [
    "ClangNVLinkWrapper 如何用于Clang nvlink Wrapper？",
    "ClangNVLinkWrapper 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-clang-clang-docs-clangnvlinkwrapper",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/ClangNVLinkWrapper.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# CLANG：Clang nvlink Wrapper

> 本文收录 CLANG 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：Clang nvlink Wrapper。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Clang nvlink Wrapper

## 技术正文

## Clang nvlink Wrapper


.. contents::
   :local:


## Introduction


This tools works as a wrapper around the NVIDIA `nvlink` linker. The purpose
of this wrapper is to provide an interface similar to the `ld.lld` linker
while still relying on NVIDIA's proprietary linker to produce the final output.

`nvlink` has a number of known quirks that make it difficult to use in a
unified offloading setting. For example, it does not accept `.o` files as they
must be named `.cubin`. Static archives do not work, so passing a `.a` will
provide a linker error. `nvlink` also does not support link time optimization
and ignores many standard linker arguments. This tool works around these issues.

## Usage


This tool can be used with the following options. Any arguments not intended
only for the linker wrapper will be forwarded to `nvlink`.

```console
OVERVIEW: A utility that wraps around the NVIDIA 'nvlink' linker.
This enables static linking and LTO handling for NVPTX targets.

USAGE: clang-nvlink-wrapper [options] <options to passed to nvlink>

OPTIONS:
  --arch <value>       Specify the 'sm_' name of the target architecture.
  --cuda-path=<dir>    Set the system CUDA path
  --dry-run            Print generated commands without running.
  --feature <value>    Specify the '+ptx' freature to use for LTO.
  -g                   Specify that this was a debug compile.
  -help-hidden         Display all available options
  -help                Display available options (--help-hidden for more)
  -L <dir>             Add <dir> to the library search path
  -l <libname>         Search for library <libname>
  -mllvm <arg>         Arguments passed to LLVM, including Clang invocations,
                       for which the '-mllvm' prefix is preserved. Use '-mllvm
                       --help' for a list of options.
  -o <path>            Path to file to write output
  --plugin-opt=jobs=<value>
                       Number of LTO codegen partitions
  --plugin-opt=lto-partitions=<value>
                       Number of LTO codegen partitions
  --plugin-opt=O<O0, O1, O2, or O3>
                       Optimization level for LTO
  --plugin-opt=thinlto<value>
                       Enable the thin-lto backend
  --plugin-opt=<value> Arguments passed to LLVM, including Clang invocations,
                       for which the '-mllvm' prefix is preserved. Use '-mllvm
                       --help' for a list of options.
  --save-temps         Save intermediate results
  --version            Display the version number and exit
  -v                   Print verbose information

```

## Example


This tool is intended to be invoked when targeting the NVPTX toolchain directly
as a cross-compiling target. This can be used to create standalone GPU
executables with normal linking semantics similar to standard compilation.

```console
clang --target=nvptx64-nvidia-cuda -march=native -flto=full input.c
```

## 来源、版本与核验

- 上游：[clang/docs/ClangNVLinkWrapper.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/ClangNVLinkWrapper.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/clang/clang/docs/ClangNVLinkWrapper.rst`；SHA-256：`dad01ac29572bf88a76cb41f7874fb231c2aa05e1a1d512eb26d2daaf03bebd6`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
