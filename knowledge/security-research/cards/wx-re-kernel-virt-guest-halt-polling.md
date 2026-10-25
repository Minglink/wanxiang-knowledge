---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-virt-guest-halt-polling",
  "title": "Linux 内核：客户机停机轮询机制（Guest halt polling）",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "virt"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "fa57c31d0a4797e3385ccddc8fb7399e9a88ffae40b8655141e80aff7dbbe6ca",
  "generatedHash": "cb5fcd3eb39062fdef79c60347075736112692c0051eedfb632468e71d4c09b8",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "cpuidle_haltpoll驱动，与haltpoll管理器一起，允许客户机vcpus在停机前轮询 一定的时间。 这为物理机侧的轮询提供了以下好处: 1. 在执行轮询时，POLL标志被设置，这允许远程vCPU在执行唤醒时避免发送 IPI（以及处理IPI的相关成本）。 2. 可以避免虚拟机退出的成本。 客户机侧轮询的缺点是，即使在物理机中的其他可运行任务中也",
  "l1": "cpuidle_haltpoll驱动，与haltpoll管理器一起，允许客户机vcpus在停机前轮询 一定的时间。 这为物理机侧的轮询提供了以下好处: 1. 在执行轮询时，POLL标志被设置，这允许远程vCPU在执行唤醒时避免发送 IPI（以及处理IPI的相关成本）。 2. 可以避免虚拟机退出的成本。 客户机侧轮询的缺点是，即使在物理机中的其他可运行任务中也会进行轮询。 其基本逻辑如下。一个全局值，即guest_halt_poll_ns，是由用户配置的，表示允 许轮询的最大时间量。这个值是固定的。 每个vcpu都有一个可调整的guest_halt_poll_ns（\"per-cpu guest_halt_poll_ns\"）， 它由算法响应事件进行调整（解释如下）。 haltpoll管理器有5个可调整的模块参数: 轮询停机前执行的最大时间，以纳秒为单位。 当唤醒事件发生在全局的guest_ha",
  "questions": [
    "Linux 内核：客户机停机轮询机制（Guest halt polling）的原理是什么？",
    "Linux 内核：客户机停机轮询机制（Guest halt polling）有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-virt-guest-halt-polling",
      "url": "https://docs.kernel.org/translations/zh_CN/virt/guest-halt-polling.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：客户机停机轮询机制（Guest halt polling）

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 客户机停机轮询机制（Guest halt polling）

cpuidle\_haltpoll驱动，与haltpoll管理器一起，允许客户机vcpus在停机前轮询
一定的时间。

这为物理机侧的轮询提供了以下好处:

> 1. 在执行轮询时，POLL标志被设置，这允许远程vCPU在执行唤醒时避免发送
>    IPI（以及处理IPI的相关成本）。
> 2. 可以避免虚拟机退出的成本。

客户机侧轮询的缺点是，即使在物理机中的其他可运行任务中也会进行轮询。

其基本逻辑如下。一个全局值，即guest\_halt\_poll\_ns，是由用户配置的，表示允
许轮询的最大时间量。这个值是固定的。

每个vcpu都有一个可调整的guest\_halt\_poll\_ns（"per-cpu guest\_halt\_poll\_ns"），
它由算法响应事件进行调整（解释如下）。

### 模块参数

haltpoll管理器有5个可调整的模块参数:

1. guest\_halt\_poll\_ns:

轮询停机前执行的最大时间，以纳秒为单位。

默认值: 200000

2. guest\_halt\_poll\_shrink:

当唤醒事件发生在全局的guest\_halt\_poll\_ns之后，用于缩减每个CPU的guest\_halt\_poll\_ns
的划分系数。

默认值: 2

3. guest\_halt\_poll\_grow:

当事件发生在per-cpu guest\_halt\_poll\_ns之后但在global guest\_halt\_poll\_ns之前，
用于增长per-cpu guest\_halt\_poll\_ns的乘法系数。

默认值: 2

4. guest\_halt\_poll\_grow\_start:

在系统空闲的情况下，每个cpu guest\_halt\_poll\_ns最终达到零。这个值设置了增长时的
初始每cpu guest\_halt\_poll\_ns。这个值可以从10000开始增加，以避免在最初的增长阶
段出现失误。:

10k, 20k, 40k, ... (例如，假设guest\_halt\_poll\_grow=2).

默认值: 50000

5. guest\_halt\_poll\_allow\_shrink:

允许缩减的Bool参数。设置为N以避免它（一旦达到全局的guest\_halt\_poll\_ns值，每CPU的
guest\_halt\_poll\_ns将保持高位）。

默认值: Y

模块参数可以从sysfs文件中设置，在:

```
/sys/module/haltpoll/parameters/
```

### 进一步说明

- 在设置guest\_halt\_poll\_ns参数时应该小心，因为一个大的值有可能使几乎是完全空闲机
  器上的cpu使用率达到100%。

## 来源、版本与核验

- 来源：[客户机停机轮询机制（Guest halt polling）](https://docs.kernel.org/translations/zh_CN/virt/guest-halt-polling.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/virt/guest-halt-polling.rst`。
