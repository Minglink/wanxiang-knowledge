---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-clang-clang-docs-amdgpusupport",
  "title": "CLANG：AMDGPU Support",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "AMDGPUSupport",
    "clang"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "fac6278c387f1df7193f6eaaba3bfadeabf9027f7249cc7d242b5b0a69c1ff67",
  "generatedHash": "71b90a59081fded2916c7b730cf48aa00c67db7e7ab34f346dbaa76bab6e0abc",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "AMDGPU Support：AMDGPU Support",
  "l1": ".. raw:: html <style type=\"text/css\"> .none { background-color: #FFCCCC } .part { background-color: #FFFF99 } .good { background-color: #CCFF99 } </style> .. role:: none .. role:: part .. role:: good .. contents:: :local: Clang supports OpenCL, HIP and OpenMP on AMD GPU targets. :header-rows: 1 * - Macro - Description * - `__AMDGPU__` - Indicates that the code is being compiled for an AMD GPU. * - `__AMDGCN__` - Defined if the GPU target is AMDGCN. * - `__R600__` - Defined if the GPU target is R600. * - `__<ArchName>__` - Defined with the name of the architecture (e.g., `__gfx906__` for the gfx906 architecture). * - `__<GFXN>__` - Defines the GFX family (e.g., for gfx906, this macro would be `__GFX9__`). * - `__amdgcn_processor__` - Defined with the processor name as a string (e.g., `\"gfx906\"`). * - `__amdgcn_target_id__` - Defined with t",
  "questions": [
    "AMDGPUSupport 如何用于AMDGPU Support？",
    "AMDGPUSupport 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-clang-clang-docs-amdgpusupport",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/AMDGPUSupport.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# CLANG：AMDGPU Support

> 本文收录 CLANG 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：AMDGPU Support。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

AMDGPU Support

## 技术正文

.. raw:: html

  <style type="text/css">
    .none { background-color: #FFCCCC }
    .part { background-color: #FFFF99 }
    .good { background-color: #CCFF99 }
  </style>

.. role:: none
.. role:: part
.. role:: good

.. contents::
   :local:

## AMDGPU Support


Clang supports OpenCL, HIP and OpenMP on AMD GPU targets.


## Predefined Macros



> 原文 RST 指令（依赖上游工程，未展开）：`.. list-table::`
   :header-rows: 1

   * - Macro
     - Description
   * - `__AMDGPU__`
     - Indicates that the code is being compiled for an AMD GPU.
   * - `__AMDGCN__`
     - Defined if the GPU target is AMDGCN.
   * - `__R600__`
     - Defined if the GPU target is R600.
   * - `__<ArchName>__`
     - Defined with the name of the architecture (e.g., `__gfx906__` for the gfx906 architecture).
   * - `__<GFXN>__`
     - Defines the GFX family (e.g., for gfx906, this macro would be `__GFX9__`).
   * - `__amdgcn_processor__`
     - Defined with the processor name as a string (e.g., `"gfx906"`).
   * - `__amdgcn_target_id__`
     - Defined with the target ID as a string.
   * - `__amdgcn_feature_<feature-name>__`
     - Defined for each supported target feature. The value is 1 if the feature is enabled and 0 if it is disabled. Allowed feature names are sramecc and xnack.
   * - `__AMDGCN_CUMODE__`
     - Defined as 1 if the CU mode is enabled and 0 if the WGP mode is enabled.
   * - `__AMDGCN_UNSAFE_FP_ATOMICS__`
     - Defined if unsafe floating-point atomics are allowed.
   * - `__AMDGCN_WAVEFRONT_SIZE__`
     - Defines the wavefront size. Allowed values are 32 and 64 (deprecated).
   * - `__AMDGCN_WAVEFRONT_SIZE`
     - Alias to `__AMDGCN_WAVEFRONT_SIZE__` (deprecated).
   * - `__HAS_FMAF__`
     - Defined if FMAF instruction is available (deprecated).
   * - `__HAS_LDEXPF__`
     - Defined if LDEXPF instruction is available (deprecated).
   * - `__HAS_FP64__`
     - Defined if FP64 instruction is available (deprecated).

Please note that the specific architecture and feature names will vary depending on the GPU. Also, some macros are deprecated and may be removed in future releases.

## 来源、版本与核验

- 上游：[clang/docs/AMDGPUSupport.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/clang/docs/AMDGPUSupport.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/clang/clang/docs/AMDGPUSupport.rst`；SHA-256：`fac6278c387f1df7193f6eaaba3bfadeabf9027f7249cc7d242b5b0a69c1ff67`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
