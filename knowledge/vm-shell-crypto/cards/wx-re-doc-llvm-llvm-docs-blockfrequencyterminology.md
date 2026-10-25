---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-blockfrequencyterminology",
  "title": "LLVM：LLVM Block Frequency Terminology",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "BlockFrequencyTerminology",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "26a6b050f1b2c11bb422a4694f6b688694c331d0dc3fde57f636c352b8c23c72",
  "generatedHash": "6e5df9eb4d676714996b0ea09ec072121386e14926c50f8224730781efcf5d7d",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "LLVM Block Frequency Terminology：LLVM Block Frequency Terminology",
  "l1": ".. contents:: :local: Block Frequency is a metric for estimating the relative frequency of different basic blocks. This document describes the terminology that the `BlockFrequencyInfo` and `MachineBlockFrequencyInfo` analysis passes use. Blocks with multiple successors have probabilities associated with each outgoing edge. These are called branch probabilities. For a given block, the sum of its outgoing branch probabilities should be 1.0. Rather than storing fractions on each edge, we store an integer weight. Weights are relative to the other edges of a given predecessor block. The branch probability associated with a given edge is its own weight divided by the sum of the weights on the predecessor's outgoing edges. For example, consider this IR: ```llvm define void @foo() { ; ... A: br i1 %cond, label %B, label %C, !prof !0 ; ... } !0 = ",
  "questions": [
    "BlockFrequencyTerminology 如何用于LLVM Block Frequency Terminology？",
    "BlockFrequencyTerminology 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-blockfrequencyterminology",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/BlockFrequencyTerminology.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：LLVM Block Frequency Terminology

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：LLVM Block Frequency Terminology。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

LLVM Block Frequency Terminology

## 技术正文

## LLVM Block Frequency Terminology


.. contents::
   :local:

## Introduction


Block Frequency is a metric for estimating the relative frequency of different
basic blocks.  This document describes the terminology that the
`BlockFrequencyInfo` and `MachineBlockFrequencyInfo` analysis passes use.

## Branch Probability


Blocks with multiple successors have probabilities associated with each
outgoing edge.  These are called branch probabilities.  For a given block, the
sum of its outgoing branch probabilities should be 1.0.

## Branch Weight


Rather than storing fractions on each edge, we store an integer weight.
Weights are relative to the other edges of a given predecessor block.  The
branch probability associated with a given edge is its own weight divided by
the sum of the weights on the predecessor's outgoing edges.

For example, consider this IR:

```llvm
define void @foo() {
    ; ...
    A:
        br i1 %cond, label %B, label %C, !prof !0
    ; ...
}
!0 = !{!"branch_weights", i32 7, i32 8}

```

and this simple graph representation::

   A -> B  (edge-weight: 7)
   A -> C  (edge-weight: 8)

The probability of branching from block A to block B is 7/15, and the
probability of branching from block A to block C is 8/15.

See `BranchWeightMetadata` for details about the branch weight IR
representation.

## Block Frequency


Block frequency is a relative metric that represents the number of times a
block executes.  The ratio of a block frequency to the entry block frequency is
the expected number of times the block will execute per entry to the function.

Block frequency is the main output of the `BlockFrequencyInfo` and
`MachineBlockFrequencyInfo` analysis passes.

## Implementation: a series of DAGs


The implementation of the block frequency calculation analyses each loop,
bottom-up, ignoring backedges; i.e., as a DAG.  After each loop is processed,
it's packaged up to act as a pseudo-node in its parent loop's (or the
function's) DAG analysis.

## Block Mass


For each DAG, the entry node is assigned a mass of `UINT64_MAX` and mass is
distributed to successors according to branch weights.  Block Mass uses a
fixed-point representation where `UINT64_MAX` represents `1.0` and `0`
represents a number just above `0.0`.

After mass is fully distributed, in any cut of the DAG that separates the exit
nodes from the entry node, the sum of the block masses of the nodes succeeded
by a cut edge should equal `UINT64_MAX`.  In other words, mass is conserved
as it "falls" through the DAG.

If a function's basic block graph is a DAG, then block masses are valid block
frequencies.  This works poorly in practice though, since downstream users rely
on adding block frequencies together without hitting the maximum.

## Loop Scale


Loop scale is a metric that indicates how many times a loop iterates per entry.
As mass is distributed through the loop's DAG, the (otherwise ignored) backedge
mass is collected.  This backedge mass is used to compute the exit frequency,
and thus the loop scale.

## Implementation: Getting from mass and scale to frequency


After analysing the complete series of DAGs, each block has a mass (local to
its containing loop, if any), and each loop pseudo-node has a loop scale and
its own mass (from its parent's DAG).

We can get an initial frequency assignment (with entry frequency of 1.0) by
multiplying these masses and loop scales together.  A given block's frequency
is the product of its mass, the mass of containing loops' pseudo nodes, and the
containing loops' loop scales.

Since downstream users need integers (not floating point), this initial
frequency assignment is shifted as necessary into the range of `uint64_t`.

## Block Bias


Block bias is a proposed *absolute* metric to indicate a bias toward or away
from a given block during a function's execution.  The idea is that bias can be
used in isolation to indicate whether a block is relatively hot or cold, or to
compare two blocks to indicate whether one is hotter or colder than the other.

The proposed calculation involves calculating a *reference* block frequency,
where:

* every branch weight is assumed to be 1 (i.e., every branch probability
  distribution is even) and

* loop scales are ignored.

This reference frequency represents what the block frequency would be in an
unbiased graph.

The bias is the ratio of the block frequency to this reference block frequency.

## 来源、版本与核验

- 上游：[llvm/docs/BlockFrequencyTerminology.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/BlockFrequencyTerminology.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/BlockFrequencyTerminology.rst`；SHA-256：`26a6b050f1b2c11bb422a4694f6b688694c331d0dc3fde57f636c352b8c23c72`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
