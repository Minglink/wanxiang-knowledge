---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-directxusage",
  "title": "LLVM：User Guide for the DirectX Target",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "DirectXUsage",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "31a14ffdcc82080bc0c018458bdca17d7a1f6861d8436b9d6f3afb12519ac979",
  "generatedHash": "eb9d8ad75421fc5656610c4b57b0ed7a4dfd70020a463eac7b0774eb124ed405",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "User Guide for the DirectX Target：User Guide for the DirectX Target",
  "l1": ".. warning:: Disclaimer: The DirectX backend is experimental and under active development. It is not yet feature complete or ready to be used outside of experimental or demonstration contexts. .. contents:: :local: :hidden: DirectX/DXContainer DirectX/DXILArchitecture DirectX/DXILOpTableGenDesign DirectX/DXILResources The DirectX target implements the DirectX programmability interfaces. These interfaces are documented in the [DirectX Specifications. ](https://github.com/Microsoft/DirectX-Specs) Initially the backend is aimed at supporting DirectX 12, and support for DirectX 11 is planned at a later date. The DirectX backend is currently experimental and is not shipped with any release builds of LLVM tools. To enable building the DirectX backend locally add `DirectX` to the `LLVM_EXPERIMENTAL_TARGETS_TO_BUILD` CMake option. For more inform",
  "questions": [
    "DirectXUsage 如何用于User Guide for the DirectX Target？",
    "DirectXUsage 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-directxusage",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/DirectXUsage.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：User Guide for the DirectX Target

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：User Guide for the DirectX Target。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

User Guide for the DirectX Target

## 技术正文

## User Guide for the DirectX Target


.. warning::
   Disclaimer: The DirectX backend is experimental and under active development.
   It is not yet feature complete or ready to be used outside of experimental or
   demonstration contexts.

.. contents::
   :local:

> 原文 RST 指令（依赖上游工程，未展开）：`.. toctree::`
   :hidden:

   DirectX/DXContainer
   DirectX/DXILArchitecture
   DirectX/DXILOpTableGenDesign
   DirectX/DXILResources

## Introduction


The DirectX target implements the DirectX programmability interfaces. These
interfaces are documented in the [DirectX Specifications. ](https://github.com/Microsoft/DirectX-Specs)

Initially the backend is aimed at supporting DirectX 12, and support for DirectX
11 is planned at a later date.

The DirectX backend is currently experimental and is not shipped with any
release builds of LLVM tools. To enable building the DirectX backend locally add
`DirectX` to the `LLVM_EXPERIMENTAL_TARGETS_TO_BUILD` CMake option. For more
information on building LLVM see the `CMake` documentation.


## Target Triples


At present the DirectX target only supports the `dxil` architecture, which
generates code for the
[DirectX Intermediate Language. ](https://github.com/microsoft/DirectXShaderCompiler/blob/main/docs/DXIL.rst)

In addition to target architecture, the DirectX backend also needs to know the
target runtime version and pipeline stage. These are expressed using the OS and
Environment triple component.

Presently the DirectX backend requires targeting the `shadermodel` OS, and
supports versions 6.0+ (at time of writing the latest announced version is 6.7).

> 原文 RST 指令（依赖上游工程，未展开）：`.. table:: DirectX Environments`

     ================== ========================================================
     Environment         Description
     ================== ========================================================
     `pixel`           Pixel shader
     `vertex`          Vertex shader
     `geometry`        Geometry shader
     `hull`            Hull shader (tesselation)
     `domain`          Domain shader (tesselation)
     `compute`         Compute kernel
     `library`         Linkable `dxil` library
     `raygeneration`   Ray generation (ray tracing)
     `intersection`    Ray intersection (ray tracing)
     `anyhit`          Ray any collision (ray tracing)
     `closesthit`      Ray closest collision (ray tracing)
     `miss`            Ray miss (ray tracing)
     `callable`        Callable shader (ray tracing)
     `mesh`            Mesh shader
     `amplification`   Amplification shader
     ================== ========================================================

## Output Binaries


The DirectX runtime APIs read a file format based on the
[DirectX Specification. ](https://github.com/Microsoft/DirectX-Specs). In
different codebases the file format is referred to by different names
(specifically `DXBC` and `DXILContainer`). Since the format is used to store
both `DXBC` and `DXIL` outputs, and the ultimate goal is to support both as
code generation targets in LLVM, the LLVM codebase uses a more neutral name,
`DXContainer`.

The `DXContainer` format is sparsely documented in the functional
specification, but a reference implementation exists in the
[DirectXShaderCompiler. ](https://github.com/microsoft/DirectXShaderCompiler).
The format is documented in the LLVM project docs as well (see
`DirectX/DXContainer`).

Support for generating `DXContainer` files in LLVM, is being added to the LLVM
MC layer for object streamers and writers, and to the Object and ObjectYAML
libraries for testing and object file tooling.

For `dxil` targeting, bitcode emission into `DXContainer` files follows a
similar model to the `-fembed-bitcode` flag supported by clang for other
targets.

## 来源、版本与核验

- 上游：[llvm/docs/DirectXUsage.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/DirectXUsage.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/DirectXUsage.rst`；SHA-256：`31a14ffdcc82080bc0c018458bdca17d7a1f6861d8436b9d6f3afb12519ac979`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
