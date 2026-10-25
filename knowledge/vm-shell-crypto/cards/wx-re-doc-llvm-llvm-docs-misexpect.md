---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-misexpect",
  "title": "LLVM：Misexpect",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "MisExpect",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "0b89d72639e4861101ccc515a8dbafa319ec2099f6e41baf2226044c50a16602",
  "generatedHash": "aadbdfb91f4927556665eb61b0ba0db8d4b1bececb77e5f16e9d6b7fd15c88e4",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Misexpect：Misexpect",
  "l1": ".. contents:: :maxdepth: 1 When developers use `llvm.expect` intrinsics, i.e., through use of `__builtin_expect(...)`, they are trying to communicate how their code is expected to behave at runtime to the optimizer. These annotations, however, can be incorrect for a variety of reasons: changes to the code base invalidate them silently, the developer mis-annotated them (e.g., using `LIKELY` instead of `UNLIKELY`), or perhaps they assumed something incorrectly when they wrote the annotation. Regardless of why, it is useful to detect these situations so that the optimizer can make more useful decisions about the code. MisExpect diagnostics are intended to help developers identify and address these situations, by comparing the use of the `llvm.expect` intrinsic to the ground truth provided by a profiling input. The MisExpect checks in the LLV",
  "questions": [
    "MisExpect 如何用于Misexpect？",
    "MisExpect 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-misexpect",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/MisExpect.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：Misexpect

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：Misexpect。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Misexpect

## 技术正文

## Misexpect

.. contents::

> 原文 RST 指令（依赖上游工程，未展开）：`.. toctree::`
   :maxdepth: 1

When developers use `llvm.expect` intrinsics, i.e., through use of
`__builtin_expect(...)`, they are trying to communicate how their code is
expected to behave at runtime to the optimizer. These annotations, however, can
be incorrect for a variety of reasons: changes to the code base invalidate them
silently, the developer mis-annotated them (e.g., using `LIKELY` instead of
`UNLIKELY`), or perhaps they assumed something incorrectly when they wrote
the annotation. Regardless of why, it is useful to detect these situations so
that the optimizer can make more useful decisions about the code. MisExpect
diagnostics are intended to help developers identify and address these
situations, by comparing the use of the `llvm.expect` intrinsic to the ground
truth provided by a profiling input.

The MisExpect checks in the LLVM backend follow a simple procedure: if there is
a mismatch between the branch weights collected during profiling and those
supplied by an `llvm.expect` intrinsic, then it will emit a diagnostic
message to the user.

The most natural place to perform the verification is just prior to when
branch weights are assigned to the target instruction in the form of
branch weight metadata.

There are 3 key places in the LLVM backend where branch weights are
created and assigned based on profiling information or the use of the
`llvm.expect` intrinsic, and our implementation focuses on these
places to perform the verification.

We calculate the threshold for emitting MisExpect related diagnostics
based on the values the compiler assigns to `llvm.expect` intrinsics,
which can be set through the `-likely-branch-weight` and
`-unlikely-branch-weight` LLVM options. During verification, if the
profile weights mismatch the calculated threshold, then we will emit a
remark or warning detailing a potential performance regression. The
diagnostic also reports the percentage of the time the annotation was
correct during profiling to help developers reason about how to proceed.

The diagnostics are also available in the form of optimization remarks,
which can be serialized and processed through the `opt-viewer.py`
scripts in LLVM.

.. option:: -pass-remarks=misexpect

  Enables optimization remarks for misexpect when profiling data conflicts with
  use of `llvm.expect` intrinsics.


.. option:: -pgo-warn-misexpect

  Enables misexpect warnings when profiling data conflicts with use of
  `llvm.expect` intrinsics.

LLVM supports 4 types of profile formats: Frontend, IR, CS-IR, and
Sampling. MisExpect Diagnostics are compatible with all Profiling formats.

+----------------+--------------------------------------------------------------------------------------+
| Profile Type   | Description                                                                          |
+================+======================================================================================+
| Frontend       | Profiling instrumentation added during compilation by the frontend, i.e. `clang`   |
+----------------+--------------------------------------------------------------------------------------+
| IR             | Profiling instrumentation added during by the LLVM backend                           |
+----------------+--------------------------------------------------------------------------------------+
| CS-IR          | Context Sensitive IR based profiles                                                  |
+----------------+--------------------------------------------------------------------------------------+
| Sampling       | Profiles collected through sampling with external tools, such as `perf` on Linux   |
+----------------+--------------------------------------------------------------------------------------+

## 来源、版本与核验

- 上游：[llvm/docs/MisExpect.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/MisExpect.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/MisExpect.rst`；SHA-256：`0b89d72639e4861101ccc515a8dbafa319ec2099f6e41baf2226044c50a16602`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
