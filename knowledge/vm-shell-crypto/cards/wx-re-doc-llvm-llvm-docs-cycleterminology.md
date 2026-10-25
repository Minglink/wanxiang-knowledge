---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-cycleterminology",
  "title": "LLVM：LLVM Cycle Terminology",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "CycleTerminology",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f1de00842ad008e9255ebde30e4a561510f4c1524aa9ccd56dddfafcf3be6789",
  "generatedHash": "f647bfaccb05b7f144d6a29c4ae8341c16f18446e0cf6eb0100d6e1ae1cec623",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "LLVM Cycle Terminology：LLVM Cycle Terminology",
  "l1": ".. contents:: :local: Cycles are a generalization of LLVM `loops <loop-terminology>`, defined recursively as follows [HavlakCycles]_: 1. In a directed graph G that is a function CFG or a subgraph of it, a *cycle* is a maximal strongly connected region with at least one internal edge. (Informational note --- The requirement for at least one internal edge ensures that a single basic block is a cycle only if there is an edge that goes back to the same basic block.) 2. A basic block in a cycle that can be reached from the entry of the function along a path that does not visit any other basic block in the cycle is called an *entry* of the cycle. A cycle can have multiple entries. 3. For a given depth-first search starting from the entry of the function, the first node of a cycle to be visited is called the *header* of this cycle with respect t",
  "questions": [
    "CycleTerminology 如何用于LLVM Cycle Terminology？",
    "CycleTerminology 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-cycleterminology",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/CycleTerminology.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：LLVM Cycle Terminology

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：LLVM Cycle Terminology。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

LLVM Cycle Terminology

## 技术正文

## LLVM Cycle Terminology


.. contents::
   :local:


## Cycles


Cycles are a generalization of LLVM `loops <loop-terminology>`,
defined recursively as follows [HavlakCycles]_:

1. In a directed graph G that is a function CFG or a subgraph of it, a *cycle*
   is a maximal strongly connected region with at least one internal edge.
   (Informational note --- The requirement for at least one internal edge
   ensures that a single basic block is a cycle only if there is an edge
   that goes back to the same basic block.)
2. A basic block in a cycle that can be reached from the entry of
   the function along a path that does not visit any other basic block
   in the cycle is called an *entry* of the cycle.
   A cycle can have multiple entries.
3. For a given depth-first search starting from the entry of the function, the
   first node of a cycle to be visited is called the *header* of this cycle
   with respect to this particular DFS. The header is always an entry node.
4. In any depth-first search starting from the entry, the set of cycles
   found in the CFG is the same. These are the *top-level cycles*
   that do not themselves have a parent.
5. The *child cycles* (or simply cycles) nested inside a cycle C with
   header H are the cycles in the subgraph induced on the set of nodes (C - H).
   C is said to be the *parent* of these cycles.

Thus, cycles form an implementation-defined forest where each cycle C is
the parent of any child cycles nested inside C. The tree closely
follows the nesting of loops in the same function. The unique entry of
a reducible cycle (an LLVM loop) L dominates all its other nodes, and
is always chosen as the header of some cycle C regardless of the DFS
tree used. This cycle C is a superset of the loop L. For an
irreducible cycle, no one entry dominates the nodes of the cycle. One
of the entries is chosen as header of the cycle, in an
implementation-defined way.


A cycle is *irreducible* if it has multiple entries and it is
*reducible* otherwise.


A cycle C is said to be the *parent* of a basic block B if B occurs in
C but not in any child cycle of C. Then B is also said to be a *child*
of cycle C.


A block B is said to be a *top-level block* if it is not the child of
any cycle.


A basic block or cycle X is a *sibling* of another basic block or
cycle Y if they both have no parent or both have the same parent.

Informational notes:

- Non-header entry blocks of a cycle can be contained in child cycles.
- If the CFG is reducible, the cycles are exactly the natural loops and
  every cycle has exactly one entry block.
- Cycles are well-nested (by definition).
- The entry blocks of a cycle are siblings in the dominator tree.

.. [HavlakCycles] Paul Havlak, "Nesting of reducible and irreducible
                  loops." ACM Transactions on Programming Languages
                  and Systems (TOPLAS) 19.4 (1997): 557-567.


## Examples of Cycles


### Irreducible cycle enclosing natural loops


.. Graphviz source; the indented blocks below form a comment.

  ///     |   |
  ///   />A] [B<\
  ///   |  \ /  |
  ///   ^---C---^
  ///       |

  strict digraph {
    { rank=same; A B}
    Entry -> A
    Entry -> B
    A -> A
    A -> C
    B -> B
    B -> C
    C -> A
    C -> B
    C -> Exit
  }

> 原文 RST 指令（依赖上游工程，未展开）：`.. image:: cycle-1.png`

The self-loops of `A` and `B` give rise to two single-block
natural loops. A possible hierarchy of cycles is::

    cycle: {A, B, C} entries: {A, B} header: A
    - cycle: {B, C}  entries: {B, C} header: C
      - cycle: {B}   entries: {B}    header: B

This hierarchy arises when DFS visits the blocks in the order `A`,
`C`, `B` (in preorder).

### Irreducible union of two natural loops


.. Graphviz source; the indented blocks below form a comment.

  ///     |   |
  ///     A<->B
  ///     ^   ^
  ///     |   |
  ///     v   v
  ///     C   D
  ///     |   |

  strict digraph {
    { rank=same; A B}
    { rank=same; C D}
    Entry -> A
    Entry -> B
    A -> B
    B -> A
    A -> C
    C -> A
    B -> D
    D -> B
    C -> Exit
    D -> Exit
  }

> 原文 RST 指令（依赖上游工程，未展开）：`.. image:: cycle-2.png`

There are two natural loops: `{A, C}` and `{B, D}`. A possible
hierarchy of cycles is::

    cycle: {A, B, C, D} entries: {A, B} header: A
    - cycle: {B, D}     entries: {B}    header: B

### Irreducible cycle without natural loops


.. Graphviz source; the indented blocks below form a comment.

  ///     |   |
  ///   />A   B<\
  ///   | |\ /| |
  ///   | | x | |
  ///   | |/ \| |
  ///   ^-C   D-^
  ///     |   |
  ///

  strict digraph {
    { rank=same; A B}
    { rank=same; C D}
    Entry -> A
    Entry -> B
    A -> C
    A -> D
    B -> C
    B -> D
    C -> A
    D -> B
    C -> Exit
    D -> Exit
  }

> 原文 RST 指令（依赖上游工程，未展开）：`.. image:: cycle-3.png`

This graph does not contain any natural loops --- the nodes `A`,
`B`, `C` and `D` are siblings in the dominator tree. A possible
hierarchy of cycles is::

    cycle: {A, B, C, D} entries: {A, B} header: A
    - cycle: {B, D}     entries: {B, D} header: D


## Closed Paths and Cycles


A *closed path* in a CFG is a connected sequence of nodes and edges in
the CFG whose start and end nodes are the same, and whose remaining
(inner) nodes are distinct.

An *entry* to a closed path `P` is a node on `P` that is reachable
from the function entry without passing through any other node on `P`.

1. If a node D dominates one or more nodes in a closed path P and P
   does not contain D, then D dominates every node in P.

   **Proof:** Let U be a node in P that is dominated by D. If there
   was a node V in P not dominated by D, then U would be reachable
   from the function entry node via V without passing through D, which
   contradicts the fact that D dominates U.

2. If a node D dominates one or more nodes in a closed path P and P
   does not contain D, then there exists a cycle C that contains P but
   not D.

   **Proof:** From the above property, D dominates all the nodes in P.
   For any nesting of cycles discovered by the implementation-defined
   DFS, consider the smallest cycle C which contains P. For the sake
   of contradiction, assume that D is in C. Then the header H of C
   cannot be in P, since the header of a cycle cannot be dominated by
   any other node in the cycle. Thus, P is in the set (C-H), and there
   must be a smaller cycle C' in C which also contains P, but that
   contradicts how we chose C.

3. If a closed path P contains nodes U1 and U2 but not their
   dominators D1 and D2 respectively, then there exists a cycle C that
   contains U1 and U2 but neither of D1 and D2.

   **Proof:** From the above properties, each D1 and D2 separately
   dominate every node in P. There exists a cycle C1 (respectively,
   C2) that contains P but not D1 (respectively, D2). Either C1 and C2
   are the same cycle, or one of them is nested inside the other.
   Hence there is always a cycle that contains U1 and U2 but neither
   of D1 and D2.


4. In any cycle hierarchy, the header `H` of the smallest cycle
   `C` containing a closed path `P` itself lies on `P`.

   **Proof:** If `H` is not in `P`, then there is a smaller cycle
   `C'` in the set `C - H` containing `P`, thus contradicting
   the claim that `C` is the smallest such cycle.


## Reducible Cycle Headers


Although the cycle hierarchy depends on the DFS chosen, reducible
cycles satisfy the following invariant:

  If a reducible cycle `C` with header `H` is discovered in any
  DFS, then there exists a cycle `C'` in every DFS with header
  `H`, that contains `C`.

**Proof:** For a closed path `P` in `C` that passes through `H`,
every cycle hierarchy has a smallest cycle `C'` containing `P` and
whose header is in `P`. Since `H` is the only entry to `P`,
`H` must be the header of `C'`. Since headers uniquely define
cycles, `C'` contains every such closed path `P`, and hence `C'`
contains `C`.

## 来源、版本与核验

- 上游：[llvm/docs/CycleTerminology.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/CycleTerminology.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/CycleTerminology.rst`；SHA-256：`f1de00842ad008e9255ebde30e4a561510f4c1524aa9ccd56dddfafcf3be6789`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
