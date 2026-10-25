---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-cfiverify",
  "title": "LLVM：Control Flow Verification Tool Design Document",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "CFIVerify",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "64369ffc409f3fd4a1799845f43cb41bb414f0c6481ee1f9d4c805e996b644e5",
  "generatedHash": "73351577d859309f303d33f508ac91a0bf1af5fcb8e7930971dacd1154456366",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Control Flow Verification Tool Design Document：Control Flow Verification Tool Design Document",
  "l1": ".. contents:: :local: This document provides an overview of an external tool to verify the protection mechanisms implemented by Clang's *Control Flow Integrity* (CFI) schemes (`-fsanitize=cfi`). This tool, provided a binary or DSO, should infer whether indirect control flow operations are protected by CFI, and should output these results in a human-readable form. This tool should also be added as part of Clang's continuous integration testing framework, where modifications to the compiler ensure that CFI protection schemes are still present in the final binary. This tool will be present as a part of the LLVM toolchain, and will reside in the \"/llvm/tools/llvm-cfi-verify\" directory, relative to the LLVM trunk. It will be tested in two methods: - Unit tests to validate code sections, present in \"/llvm/unittests/tools/llvm-cfi-verify\". - Int",
  "questions": [
    "CFIVerify 如何用于Control Flow Verification Tool Design Document？",
    "CFIVerify 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-cfiverify",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/CFIVerify.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：Control Flow Verification Tool Design Document

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：Control Flow Verification Tool Design Document。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Control Flow Verification Tool Design Document

## 技术正文

## Control Flow Verification Tool Design Document


.. contents::
   :local:

## Objective


This document provides an overview of an external tool to verify the protection
mechanisms implemented by Clang's *Control Flow Integrity* (CFI) schemes
(`-fsanitize=cfi`). This tool, provided a binary or DSO, should infer whether
indirect control flow operations are protected by CFI, and should output these
results in a human-readable form.

This tool should also be added as part of Clang's continuous integration testing
framework, where modifications to the compiler ensure that CFI protection
schemes are still present in the final binary.

## Location


This tool will be present as a part of the LLVM toolchain, and will reside in
the "/llvm/tools/llvm-cfi-verify" directory, relative to the LLVM trunk. It will
be tested in two methods:

- Unit tests to validate code sections, present in
  "/llvm/unittests/tools/llvm-cfi-verify".
- Integration tests, present in "/llvm/tools/clang/test/LLVMCFIVerify". These
  integration tests are part of clang as part of a continuous integration
  framework, ensuring updates to the compiler that reduce CFI coverage on
  indirect control flow instructions are identified.

## Background


This tool will continuously validate that CFI directives are properly
implemented around all indirect control flows by analysing the output machine
code. The analysis of machine code is important as it ensures that any bugs
present in linker or compiler do not subvert CFI protections in the final
shipped binary.

Unprotected indirect control flow instructions will be flagged for manual
review. These unexpected control flows may simply have not been accounted for in
the compiler implementation of CFI (e.g. indirect jumps to facilitate switch
statements may not be fully protected).

It may be possible in the future to extend this tool to flag unnecessary CFI
directives (e.g. CFI directives around a static call to a non-polymorphic base
type). This type of directive has no security implications, but may present
performance impacts.

## Design Ideas


This tool will disassemble binaries and DSO's from their machine code format and
analyse the disassembled machine code. The tool will inspect virtual calls and
indirect function calls. This tool will also inspect indirect jumps, as inlined
functions and jump tables should also be subject to CFI protections. Non-virtual
calls (`-fsanitize=cfi-nvcall`) and cast checks (`-fsanitize=cfi-*cast*`)
are not implemented due to a lack of information provided by the bytecode.

The tool would operate by searching for indirect control flow instructions in
the disassembly. A control flow graph would be generated from a small buffer of
the instructions surrounding the 'target' control flow instruction. If the
target instruction is branched-to, the fallthrough of the branch should be the
CFI trap (on x86, this is a `ud2` instruction). If the target instruction is
the fallthrough (i.e. immediately succeeds) of a conditional jump, the
conditional jump target should be the CFI trap. If an indirect control flow
instruction does not conform to one of these formats, the target will be noted
as being CFI-unprotected.

Note that in the second case outlined above (where the target instruction is the
fallthrough of a conditional jump), if the target represents a vcall that takes
arguments, these arguments may be pushed to the stack after the branch but
before the target instruction. In these cases, a secondary 'spill graph' in
constructed, to ensure the register argument used by the indirect jump/call is
not spilled from the stack at any point in the interim period. If there are no
spills that affect the target register, the target is marked as CFI-protected.

### Other Design Notes


Only machine code sections that are marked as executable will be subject to this
analysis. Non-executable sections do not require analysis as any execution
present in these sections has already violated the control flow integrity.

Suitable extensions may be made at a later date to include analysis for indirect
control flow operations across DSO boundaries. Currently, these CFI features are
only experimental with an unstable ABI, making them unsuitable for analysis.

The tool currently only supports the x86, x86_64, and AArch64 architectures.

## 来源、版本与核验

- 上游：[llvm/docs/CFIVerify.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/CFIVerify.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/CFIVerify.rst`；SHA-256：`64369ffc409f3fd4a1799845f43cb41bb414f0c6481ee1f9d4c805e996b644e5`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
