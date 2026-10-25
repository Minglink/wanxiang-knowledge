---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-llvm-llvm-docs-segmentedstacks",
  "title": "LLVM：Segmented Stacks in LLVM",
  "type": "note",
  "tags": [
    "软件底层",
    "编译器",
    "逆向分析",
    "SegmentedStacks",
    "llvm"
  ],
  "project": "编译器与漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "e12e3a486d14497b5ae2ee8c616dc640f66d32aeef324c8ca79fd1588f05a7c9",
  "generatedHash": "fea4882fbfada24a6e08f1e7d4df3da6b64fb9d43e7345c9ca56f67eeeb51237",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Segmented Stacks in LLVM：Segmented Stacks in LLVM",
  "l1": ".. contents:: :local: Segmented stack allows stack space to be allocated incrementally than as a monolithic chunk (of some worst case size) at thread initialization. This is done by allocating stack blocks (henceforth called *stacklets*) and linking them into a doubly linked list. The function prologue is responsible for checking if the current stacklet has enough space for the function to execute; and if not, call into the libgcc runtime to allocate more stack space. Segmented stacks are enabled with the `\"split-stack\"` attribute on LLVM functions. The runtime functionality is `already there in libgcc <http://gcc.gnu.org/wiki/SplitStacks>`_. As mentioned above, the function prologue checks if the current stacklet has enough space. The current approach is to use a slot in the TCB to store the current stack limit (minus the amount of space",
  "questions": [
    "SegmentedStacks 如何用于Segmented Stacks in LLVM？",
    "SegmentedStacks 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-llvm-llvm-docs-segmentedstacks",
      "url": "https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/SegmentedStacks.rst",
      "checkedAt": "2026-10-25",
      "version": "llvmorg-20.1.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0 WITH LLVM-exception"
}
---
# LLVM：Segmented Stacks in LLVM

> 本文收录 LLVM 的独立技术文献正文，固定标签 `llvmorg-20.1.0`。主题：Segmented Stacks in LLVM。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Segmented Stacks in LLVM

## 技术正文

## Segmented Stacks in LLVM


.. contents::
   :local:

## Introduction


Segmented stack allows stack space to be allocated incrementally than as a
monolithic chunk (of some worst case size) at thread initialization. This is
done by allocating stack blocks (henceforth called *stacklets*) and linking them
into a doubly linked list. The function prologue is responsible for checking if
the current stacklet has enough space for the function to execute; and if not,
call into the libgcc runtime to allocate more stack space. Segmented stacks are
enabled with the `"split-stack"` attribute on LLVM functions.

The runtime functionality is `already there in libgcc
<http://gcc.gnu.org/wiki/SplitStacks>`_.

## Implementation Details



### Allocating Stacklets


As mentioned above, the function prologue checks if the current stacklet has
enough space. The current approach is to use a slot in the TCB to store the
current stack limit (minus the amount of space needed to allocate a new block) -
this slot's offset is again dictated by `libgcc`. The generated
assembly looks like this on x86-64:

```text
  leaq     -8(%rsp), %r10
  cmpq     %fs:112,  %r10
  jg       .LBB0_2

  # More stack space needs to be allocated
  movabsq  $8, %r10   # The amount of space needed
  movabsq  $0, %r11   # The total size of arguments passed on stack
  callq    __morestack
  ret                 # The reason for this extra return is explained below
.LBB0_2:
  # Usual prologue continues here

```

The size of function arguments on the stack needs to be passed to
`__morestack` (this function is implemented in `libgcc`) since that number
of bytes has to be copied from the previous stacklet to the current one. This is
so that SP (and FP) relative addressing of function arguments work as expected.

The unusual `ret` is needed to have the function which made a call to
`__morestack` return correctly. `__morestack`, instead of returning, calls
into `.LBB0_2`. This is possible since both, the size of the `ret`
instruction and the PC of call to `__morestack` are known. When the function
body returns, control is transferred back to `__morestack`. `__morestack`
then de-allocates the new stacklet, restores the correct SP value, and does a
second return, which returns control to the correct caller.

### Variable Sized Allocas


The section on `allocating stacklets`_ automatically assumes that every stack
frame will be of fixed size. However, LLVM allows the use of the `llvm.alloca`
intrinsic to allocate dynamically sized blocks of memory on the stack. When
faced with such a variable-sized alloca, code is generated to:

* Check if the current stacklet has enough space. If yes, just bump the SP, like
  in the normal case.
* If not, generate a call to `libgcc`, which allocates the memory from the
  heap.

The memory allocated from the heap is linked into a list in the current
stacklet, and freed along with the same. This prevents a memory leak.

## 来源、版本与核验

- 上游：[llvm/docs/SegmentedStacks.rst](https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/llvm/docs/SegmentedStacks.rst)
- 作者：llvm/llvm-project 项目贡献者，原文内具体署名保留。
- 标签：llvmorg-20.1.0；树标识：tag:llvmorg-20.1.0；获取日期：2026-10-25。
- 许可：Apache-2.0 WITH LLVM-exception；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/llvm/llvm/docs/SegmentedStacks.rst`；SHA-256：`e12e3a486d14497b5ae2ee8c616dc640f66d32aeef324c8ca79fd1588f05a7c9`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
