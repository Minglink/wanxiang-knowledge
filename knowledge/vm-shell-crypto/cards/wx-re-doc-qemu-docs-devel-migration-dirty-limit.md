---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-devel-migration-dirty-limit",
  "title": "QEMU：Dirty limit",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "dirty-limit",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "fcef50b19f315bcd60d0875f22df1ea0ca64b4d5afb40323daf86f69fdd8c99a",
  "generatedHash": "31d7d036e1c85e0a1931dd930a027a20dd65010ce1381756869ff6ebd0a49ca5",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Dirty limit：Dirty limit",
  "l1": "The dirty limit, short for dirty page rate upper limit, is a new capability introduced in the 8.1 QEMU release that uses a new algorithm based on the KVM dirty ring to throttle down the guest during live migration. The algorithm framework is as follows: :: ------------------------------------------------------------------------------ main --------------> throttle thread ------------> PREPARE(1) <-------- thread \\ | | \\ | | \\ V | -\\ CALCULATE(2) | \\ | | \\ | | \\ V | \\ SET PENALTY(3) ----- -\\ | \\ | \\ V When the qmp command qmp_set_vcpu_dirty_limit is called for the first time, the QEMU main thread starts the throttle thread. The throttle thread, once launched, executes the loop, which consists of three steps: - PREPARE (1) The entire work of PREPARE (1) is preparation for the second stage, CALCULATE(2), as the name implies. It involves prepa",
  "questions": [
    "dirty-limit 如何用于Dirty limit？",
    "dirty-limit 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-devel-migration-dirty-limit",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/migration/dirty-limit.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：Dirty limit

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：Dirty limit。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Dirty limit

## 技术正文

## Dirty limit


The dirty limit, short for dirty page rate upper limit, is a new capability
introduced in the 8.1 QEMU release that uses a new algorithm based on the KVM
dirty ring to throttle down the guest during live migration.

The algorithm framework is as follows:

::

  ------------------------------------------------------------------------------
  main   --------------> throttle thread ------------> PREPARE(1) <--------
  thread  \                                                |              |
           \                                               |              |
            \                                              V              |
             -\                                        CALCULATE(2)       |
               \                                           |              |
                \                                          |              |
                 \                                         V              |
                  \                                    SET PENALTY(3) -----
                   -\                                      |
                     \                                     |
                      \                                    V
### -> virtual CPU thread -------> ACCEPT PENALTY(4)


When the qmp command qmp_set_vcpu_dirty_limit is called for the first time,
the QEMU main thread starts the throttle thread. The throttle thread, once
launched, executes the loop, which consists of three steps:

  - PREPARE (1)

     The entire work of PREPARE (1) is preparation for the second stage,
     CALCULATE(2), as the name implies. It involves preparing the dirty
     page rate value and the corresponding upper limit of the VM:
     The dirty page rate is calculated via the KVM dirty ring mechanism,
     which tells QEMU how many dirty pages a virtual CPU has had since the
     last KVM_EXIT_DIRTY_RING_FULL exception; The dirty page rate upper
     limit is specified by caller, therefore fetch it directly.

  - CALCULATE (2)

     Calculate a suitable sleep period for each virtual CPU, which will be
     used to determine the penalty for the target virtual CPU. The
     computation must be done carefully in order to reduce the dirty page
     rate progressively down to the upper limit without oscillation. To
     achieve this, two strategies are provided: the first is to add or
     subtract sleep time based on the ratio of the current dirty page rate
     to the limit, which is used when the current dirty page rate is far
     from the limit; the second is to add or subtract a fixed time when
     the current dirty page rate is close to the limit.

  - SET PENALTY (3)

     Set the sleep time for each virtual CPU that should be penalized based
     on the results of the calculation supplied by step CALCULATE (2).

After completing the three above stages, the throttle thread loops back
to step PREPARE (1) until the dirty limit is reached.

On the other hand, each virtual CPU thread reads the sleep duration and
sleeps in the path of the KVM_EXIT_DIRTY_RING_FULL exception handler, that
is ACCEPT PENALTY (4). Virtual CPUs tied with writing processes will
obviously exit to the path and get penalized, whereas virtual CPUs involved
with read processes will not.

In summary, thanks to the KVM dirty ring technology, the dirty limit
algorithm will restrict virtual CPUs as needed to keep their dirty page
rate inside the limit. This leads to more steady reading performance during
live migration and can aid in improving large guest responsiveness.

## 来源、版本与核验

- 上游：[docs/devel/migration/dirty-limit.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/migration/dirty-limit.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/devel/migration/dirty-limit.rst`；SHA-256：`fcef50b19f315bcd60d0875f22df1ea0ca64b4d5afb40323daf86f69fdd8c99a`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
