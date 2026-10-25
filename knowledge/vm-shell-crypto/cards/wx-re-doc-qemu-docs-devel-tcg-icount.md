---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-devel-tcg-icount",
  "title": "QEMU：TCG Instruction Counting",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "tcg-icount",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "cb09a12f574ff2fb6b41d7647668c27f0d44c7807295e75b520220713cf98ace",
  "generatedHash": "130fbbdd2f706c6e910556807fabf28f1882670cc982846690b3881576a82818",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "TCG Instruction Counting：TCG Instruction Counting",
  "l1": ".. Copyright (c) 2020, Linaro Limited Written by Alex Bennée TCG has long supported a feature known as icount which allows for instruction counting during execution. This should not be confused with cycle accurate emulation - QEMU does not attempt to emulate how long an instruction would take on real hardware. That is a job for other more detailed (and slower) tools that simulate the rest of a micro-architecture. This feature is only available for system emulation and is incompatible with multi-threaded TCG. It can be used to better align execution time with wall-clock time so a \"slow\" device doesn't run too fast on modern hardware. It can also provides for a degree of deterministic execution and is an essential part of the record/replay support in QEMU. At its heart icount is simply a count of executed instructions which is stored in the",
  "questions": [
    "tcg-icount 如何用于TCG Instruction Counting？",
    "tcg-icount 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-vm-jit-cache",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-qemu-docs-devel-tcg-icount",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/tcg-icount.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：TCG Instruction Counting

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：TCG Instruction Counting。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

TCG Instruction Counting

## 技术正文

..
   Copyright (c) 2020, Linaro Limited
   Written by Alex Bennée


## TCG Instruction Counting


TCG has long supported a feature known as icount which allows for
instruction counting during execution. This should not be confused
with cycle accurate emulation - QEMU does not attempt to emulate how
long an instruction would take on real hardware. That is a job for
other more detailed (and slower) tools that simulate the rest of a
micro-architecture.

This feature is only available for system emulation and is
incompatible with multi-threaded TCG. It can be used to better align
execution time with wall-clock time so a "slow" device doesn't run too
fast on modern hardware. It can also provides for a degree of
deterministic execution and is an essential part of the record/replay
support in QEMU.

## Core Concepts


At its heart icount is simply a count of executed instructions which
is stored in the TimersState of QEMU's timer sub-system. The number of
executed instructions can then be used to calculate QEMU_CLOCK_VIRTUAL
which represents the amount of elapsed time in the system since
execution started. Depending on the icount mode this may either be a
fixed number of ns per instruction or adjusted as execution continues
to keep wall clock time and virtual time in sync.

To be able to calculate the number of executed instructions the
translator starts by allocating a budget of instructions to be
executed. The budget of instructions is limited by how long it will be
until the next timer will expire. We store this budget as part of a
vCPU icount_decr field which shared with the machinery for handling
cpu_exit(). The whole field is checked at the start of every
translated block and will cause a return to the outer loop to deal
with whatever caused the exit.

In the case of icount, before the flag is checked we subtract the
number of instructions the translation block would execute. If this
would cause the instruction budget to go negative we exit the main
loop and regenerate a new translation block with exactly the right
number of instructions to take the budget to 0 meaning whatever timer
was due to expire will expire exactly when we exit the main run loop.

### Dealing with MMIO


While we can adjust the instruction budget for known events like timer
expiry we cannot do the same for MMIO. Every load/store we execute
might potentially trigger an I/O event, at which point we will need an
up to date and accurate reading of the icount number.

To deal with this case, when an I/O access is made we:

  - restore un-executed instructions to the icount budget
  - re-compile a single [1]_ instruction block for the current PC
  - exit the cpu loop and execute the re-compiled block

.. [1] sometimes two instructions if dealing with delay slots  

### Other I/O operations


MMIO isn't the only type of operation for which we might need a
correct and accurate clock. IO port instructions and accesses to
system registers are the common examples here. These instructions have
to be handled by the individual translators which have the knowledge
of which operations are I/O operations.

When the translator is handling an instruction of this kind:

* it must call gen_io_start() if icount is enabled, at some
   point before the generation of the code which actually does
   the I/O, using a code fragment similar to:

.. code:: c

    if (tb_cflags(s->base.tb) & CF_USE_ICOUNT) {
        gen_io_start();
    }

* it must end the TB immediately after this instruction

## 来源、版本与核验

- 上游：[docs/devel/tcg-icount.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/tcg-icount.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/devel/tcg-icount.rst`；SHA-256：`cb09a12f574ff2fb6b41d7647668c27f0d44c7807295e75b520220713cf98ace`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
