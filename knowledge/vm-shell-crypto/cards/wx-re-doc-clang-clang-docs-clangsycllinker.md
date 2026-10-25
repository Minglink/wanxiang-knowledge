---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-clang-clang-docs-clangsycllinker",
  "title": "CLANG：Clang SYCL Linker",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "ClangSYCLLinker",
    "clang"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "bc91374b8fb90529b0ef93f1055c84152b463f67a2ef18467fc56d27f7a9c43d",
  "generatedHash": "7598af202338cf9f2d25984a011954909c02879fb886c265f5bd4db7a6706614",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Clang SYCL Linker：Clang SYCL Linker",
  "l1": ".. contents:: :local: This tool works as a wrapper around the SYCL device code linking process. The purpose of this tool is to provide an interface to link SYCL device bitcode in LLVM IR format, SYCL device bitcode in SPIR-V IR format, and native binary objects, and then use the SPIR-V LLVM Translator tool on fully linked device objects to produce the final output. After the linking stage, the fully linked device code in LLVM IR format may undergo several SYCL-specific finalization steps before the SPIR-V code generation step. The tool will also support the Ahead-Of-Time (AOT) compilation flow. AOT compilation is the process of invoking the back-end at compile time to produce the final binary, as opposed to just-in-time (JIT) compilation when final code generation is deferred until application runtime. Device code linking for SYCL offload",
  "questions": [
    "ClangSYCLLinker 如何用于Clang SYCL Linker？",
    "ClangSYCLLinker 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-clang-clang-docs-clangsycllinker",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/ClangSYCLLinker.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# CLANG：Clang SYCL Linker

> 本文收录 CLANG 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：Clang SYCL Linker。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Clang SYCL Linker

## 技术正文

## Clang SYCL Linker


.. contents::
   :local:


## Introduction


This tool works as a wrapper around the SYCL device code linking process.
The purpose of this tool is to provide an interface to link SYCL device bitcode
in LLVM IR format, SYCL device bitcode in SPIR-V IR format, and native binary
objects, and then use the SPIR-V LLVM Translator tool on fully linked device
objects to produce the final output.
After the linking stage, the fully linked device code in LLVM IR format may
undergo several SYCL-specific finalization steps before the SPIR-V code
generation step.
The tool will also support the Ahead-Of-Time (AOT) compilation flow. AOT
compilation is the process of invoking the back-end at compile time to produce
the final binary, as opposed to just-in-time (JIT) compilation when final code
generation is deferred until application runtime.

Device code linking for SYCL offloading has several known quirks that
make it difficult to use in a unified offloading setting. Two of the primary
issues are:
1. Several finalization steps are required to be run on the fully linked LLVM
IR bitcode to guarantee conformance to SYCL standards. This step is unique to
the SYCL offloading compilation flow.
2. The SPIR-V LLVM Translator tool is an external tool and hence SPIR-V IR code
generation cannot be done as part of LTO. This limitation can be lifted once
the SPIR-V backend is available as a viable LLVM backend.

This tool has been proposed to work around these issues.

## Usage


This tool can be used with the following options. Several of these options will
be passed down to downstream tools like 'llvm-link', 'llvm-spirv', etc.

```console
OVERVIEW: A utility that wraps around the SYCL device code linking process.
This enables linking and code generation for SPIR-V JIT targets and AOT
targets.

USAGE: clang-sycl-linker [options]

OPTIONS:
  --arch <value>                Specify the name of the target architecture.
  --dry-run                     Print generated commands without running.
  -g                            Specify that this was a debug compile.
  -help-hidden                  Display all available options
  -help                         Display available options (--help-hidden for more)
  --library-path=<dir>          Set the library path for SYCL device libraries
  --device-libs=<value>         A comma separated list of device libraries that are linked during the device link
  -o <path>                     Path to file to write output
  --save-temps                  Save intermediate results
  --triple <value>              Specify the target triple.
  --version                     Display the version number and exit
  -v                            Print verbose information
  -spirv-dump-device-code=<dir> Directory to dump SPIR-V IR code into
  -is-windows-msvc-env          Specify if we are compiling under windows environment
  -llvm-spirv-options=<value>   Pass options to llvm-spirv tool
  --llvm-spirv-path=<dir>       Set the system llvm-spirv path

```

## Example


This tool is intended to be invoked when targeting any of the target offloading
toolchains. When the --sycl-link option is passed to the clang driver, the
driver will invoke the linking job of the target offloading toolchain, which in
turn will invoke this tool. This tool can be used to create one or more fully
linked device images that are ready to be wrapped and linked with host code to
generate the final executable.

```console
clang-sycl-linker --triple spirv64 --arch native input.bc
```

## 来源、版本与核验

- 上游：[clang/docs/ClangSYCLLinker.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/ClangSYCLLinker.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/clang/clang/docs/ClangSYCLLinker.rst`；SHA-256：`bc91374b8fb90529b0ef93f1055c84152b463f67a2ef18467fc56d27f7a9c43d`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
