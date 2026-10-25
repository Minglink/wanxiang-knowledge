---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-stacksafetyanalysis",
  "title": "LLVM：栈安全分析",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "StackSafetyAnalysis",
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
  "snapshotHash": "c7458d9d3d53b372ee16c0e46896537f26a633f94234c1338c98567994a735e4",
  "generatedHash": "bd630e268a50662f829c30cbc4c494a37dcf6c9510f3d61b6cf016f598a0fcba",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "栈安全分析：Stack Safety Analysis",
  "l1": "The Stack Safety Analysis determines if stack allocated variables can be considered 'safe' from memory access bugs. The primary purpose of the analysis is to be used by sanitizers to avoid unnecessary instrumentation of 'safe' variables. SafeStack is going to be the first user. 'safe' variables can be defined as variables that can not be used out-of-scope (e.g. use-after-return) or accessed out of bounds. In the future it can be extended to track other variable properties. E.g. we plan to extend implementation with a check to make sure that variable is always initialized before every read to optimize use-of-uninitialized-memory checks. The analysis is implemented in two stages: The intra-procedural, or 'local', stage performs a depth-first search inside functions to collect all uses of each alloca, including loads/stores and uses as argum",
  "questions": [
    "StackSafetyAnalysis 如何用于栈安全分析？",
    "StackSafetyAnalysis 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-stacksafetyanalysis",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/StackSafetyAnalysis.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：栈安全分析

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：栈安全分析。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Stack Safety Analysis

## 技术正文

## Stack Safety Analysis



## Introduction


The Stack Safety Analysis determines if stack allocated variables can be
considered 'safe' from memory access bugs.

The primary purpose of the analysis is to be used by sanitizers to avoid
unnecessary instrumentation of 'safe' variables. SafeStack is going to be the
first user.

'safe' variables can be defined as variables that can not be used out-of-scope
(e.g. use-after-return) or accessed out of bounds. In the future it can be
extended to track other variable properties. E.g. we plan to extend
implementation with a check to make sure that variable is always initialized
before every read to optimize use-of-uninitialized-memory checks.

## How it works


The analysis is implemented in two stages:

The intra-procedural, or 'local', stage performs a depth-first search inside
functions to collect all uses of each alloca, including loads/stores and uses as
arguments functions. After this stage we know which parts of the alloca are used
by functions itself but we don't know what happens after it is passed as
an argument to another function.

The inter-procedural, or 'global', stage, resolves what happens to allocas after
they are passed as function arguments. This stage performs a depth-first search
on function calls inside a single module and propagates allocas usage through
functions calls.

When used with ThinLTO, the global stage performs a whole program analysis over
the Module Summary Index.

## Testing


The analysis is covered with lit tests.

We expect that users can tolerate false classification of variables as
'unsafe' when in-fact it's 'safe'. This may lead to inefficient code. However, we
can't accept false 'safe' classification which may cause sanitizers to miss actual
bugs in instrumented code. To avoid that we want additional validation tool.

AddressSanitizer may help with this validation. We can instrument all variables
as usual but additionally store stack-safe information in the
`ASanStackVariableDescription`. Then if AddressSanitizer detects a bug on
a 'safe' variable we can produce an additional report to let the user know that
probably Stack Safety Analysis failed and we should check for a bug in the
compiler.

## 来源、版本与核验

- 上游：[llvm/docs/StackSafetyAnalysis.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/StackSafetyAnalysis.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/StackSafetyAnalysis.rst`；SHA-256：`c7458d9d3d53b372ee16c0e46896537f26a633f94234c1338c98567994a735e4`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
