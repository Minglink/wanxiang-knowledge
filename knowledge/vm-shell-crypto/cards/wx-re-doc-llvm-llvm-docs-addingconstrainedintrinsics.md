---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-addingconstrainedintrinsics",
  "title": "LLVM：How To Add A Constrained Floating-Point Intrinsic",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "AddingConstrainedIntrinsics",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "809aa193afb059d38bd3f20a42a04443ba9e3f06b2d1f0c710a11be2646a8ff8",
  "generatedHash": "111aa69ca2b4c250f5a9da723adaa8d3131cc4a27ee5edb46061725887c39e97",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "How To Add A Constrained Floating-Point Intrinsic：How To Add A Constrained Floating-Point Intrinsic",
  "l1": ".. contents:: :local: .. warning:: This is a work in progress. Multiple files need to be updated when adding a new constrained intrinsic. Add the new intrinsic to the table of intrinsics:: include/llvm/IR/Intrinsics.td Add the new STRICT version of the node type to the ISD::NodeType enum:: include/llvm/CodeGen/ISDOpcodes.h Strict version name must be a concatenation of prefix `STRICT_` and the name of corresponding non-strict node name. For instance, strict version of the node FADD must be STRICT_FADD. Add new record to the mapping of instructions to constrained intrinsic and DAG nodes:: include/llvm/IR/ConstrainedOps.def Follow instructions provided in this file. Update the IR verifier:: lib/IR/Verifier.cpp The function SelectionDAGBuilder::visitConstrainedFPIntrinsic builds DAG nodes using mappings specified in ConstrainedOps.def. If ho",
  "questions": [
    "AddingConstrainedIntrinsics 如何用于How To Add A Constrained Floating-Point Intrinsic？",
    "AddingConstrainedIntrinsics 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-addingconstrainedintrinsics",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/AddingConstrainedIntrinsics.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：How To Add A Constrained Floating-Point Intrinsic

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：How To Add A Constrained Floating-Point Intrinsic。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

How To Add A Constrained Floating-Point Intrinsic

## 技术正文

## How To Add A Constrained Floating-Point Intrinsic


.. contents::
   :local:

.. warning::
  This is a work in progress.

## Add the intrinsic


Multiple files need to be updated when adding a new constrained intrinsic.

Add the new intrinsic to the table of intrinsics::

  include/llvm/IR/Intrinsics.td

## Add SelectionDAG node types


Add the new STRICT version of the node type to the ISD::NodeType enum::

  include/llvm/CodeGen/ISDOpcodes.h

Strict version name must be a concatenation of prefix `STRICT_` and the name
of corresponding non-strict node name. For instance, strict version of the
node FADD must be STRICT_FADD.

## Update mappings


Add new record to the mapping of instructions to constrained intrinsic and
DAG nodes::

  include/llvm/IR/ConstrainedOps.def

Follow instructions provided in this file.

## Update IR components


Update the IR verifier::

  lib/IR/Verifier.cpp

## Update Selector components


### Building the SelectionDAG


The function SelectionDAGBuilder::visitConstrainedFPIntrinsic builds DAG nodes
using mappings specified in ConstrainedOps.def. If however this default build is
not sufficient, the build can be modified, see how it is implemented for
STRICT_FP_ROUND. The new STRICT node will eventually be converted
to the matching non-STRICT node. For this reason it should have the same
operands and values as the non-STRICT version but should also use the chain.
This makes subsequent sharing of code for STRICT and non-STRICT code paths
easier::

  lib/CodeGen/SelectionDAG/SelectionDAGBuilder.cpp

Most of the STRICT nodes get legalized the same as their matching non-STRICT
counterparts. A new STRICT node with this property must get added to the
switch in SelectionDAGLegalize::LegalizeOp().::

  lib/CodeGen/SelectionDAG/LegalizeDAG.cpp

Other parts of the legalizer may need to be updated as well. Look for
places where the non-STRICT counterpart is legalized and update as needed.
Be careful of the chain since STRICT nodes use it but their counterparts
often don't.

The code to do the conversion or mutation of the STRICT node to a non-STRICT
version of the node happens in SelectionDAG::mutateStrictFPToFP(). In most cases
the function can do the conversion using information from ConstrainedOps.def. Be
careful updating this function since some nodes have the same return type
as their input operand, but some are different. Both of these cases must
be properly handled::

  lib/CodeGen/SelectionDAG/SelectionDAG.cpp

Whether the mutation may happens or not, depends on how the new node has been
registered in TargetLoweringBase::initActions(). By default all strict nodes are
registered with Expand action::

  lib/CodeGen/TargetLoweringBase.cpp

To make debug logs readable it is helpful to update the SelectionDAG's
debug logger:::

  lib/CodeGen/SelectionDAG/SelectionDAGDumper.cpp

## Add documentation and tests


::

  docs/LangRef.rst

## 来源、版本与核验

- 上游：[llvm/docs/AddingConstrainedIntrinsics.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/AddingConstrainedIntrinsics.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/AddingConstrainedIntrinsics.rst`；SHA-256：`809aa193afb059d38bd3f20a42a04443ba9e3f06b2d1f0c710a11be2646a8ff8`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
