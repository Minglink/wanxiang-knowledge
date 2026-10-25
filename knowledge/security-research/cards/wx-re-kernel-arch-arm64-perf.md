---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-arch-arm64-perf",
  "title": "Linux 内核：Perf 事件属性",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "arch"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "c77ece7b11b33c3a1eff1530277f5db6b7d09da83de5c215bb079311ee362b11",
  "generatedHash": "0c2d19f62faf74deebd548cb935a3dba3263f829d510925a8d7c02693ee58d1b",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "用户空间始终运行在 EL0，因此该属性将排除 EL0。 打开 VHE 时内核运行在 EL2，不打开 VHE 时内核运行在 EL1。客户机 内核总是运行在 EL1。 对于宿主机，该属性排除 EL1 和 VHE 上的 EL2。 对于客户机，该属性排除 EL1。请注意客户机从来不会运行在 EL2。 对于 VHE 宿主机该属性将被忽略，此时我们认为宿主机内核是虚拟机",
  "l1": "用户空间始终运行在 EL0，因此该属性将排除 EL0。 打开 VHE 时内核运行在 EL2，不打开 VHE 时内核运行在 EL1。客户机 内核总是运行在 EL1。 对于宿主机，该属性排除 EL1 和 VHE 上的 EL2。 对于客户机，该属性排除 EL1。请注意客户机从来不会运行在 EL2。 对于 VHE 宿主机该属性将被忽略，此时我们认为宿主机内核是虚拟机监 控器。 对于 non-VHE 宿主机该属性将排除 EL2，因为虚拟机监控器运行在 EL2 的任何代码主要用于客户机和宿主机的切换。 对于客户机该属性无效。请注意客户机从来不会运行在 EL2。 这些属性分别排除了 KVM 宿主机和客户机。 KVM 宿主机可能运行在 EL0（用户空间），EL1（non-VHE 内核）和 EL2（VHE 内核 或 non-VHE 虚拟机监控器）。 KVM 客户机可能运行在 EL0（用户空间）和 EL1（内",
  "questions": [
    "Linux 内核：Perf 事件属性的原理是什么？",
    "Linux 内核：Perf 事件属性有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-arch-arm64-perf",
      "url": "https://docs.kernel.org/translations/zh_CN/arch/arm64/perf.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：Perf 事件属性

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

Translator: Bailu Lin <[bailu.lin@vivo.com](mailto:bailu.lin@vivo.com)>

## Perf 事件属性

作者:
:   Andrew Murray <[andrew.murray@arm.com](mailto:andrew.murray@arm.com)>

日期:
:   2019-03-06

### exclude\_user

该属性排除用户空间。

用户空间始终运行在 EL0，因此该属性将排除 EL0。

### exclude\_kernel

该属性排除内核空间。

打开 VHE 时内核运行在 EL2，不打开 VHE 时内核运行在 EL1。客户机
内核总是运行在 EL1。

对于宿主机，该属性排除 EL1 和 VHE 上的 EL2。

对于客户机，该属性排除 EL1。请注意客户机从来不会运行在 EL2。

### exclude\_hv

该属性排除虚拟机监控器。

对于 VHE 宿主机该属性将被忽略，此时我们认为宿主机内核是虚拟机监
控器。

对于 non-VHE 宿主机该属性将排除 EL2，因为虚拟机监控器运行在 EL2
的任何代码主要用于客户机和宿主机的切换。

对于客户机该属性无效。请注意客户机从来不会运行在 EL2。

### exclude\_host / exclude\_guest

这些属性分别排除了 KVM 宿主机和客户机。

KVM 宿主机可能运行在 EL0（用户空间），EL1（non-VHE 内核）和
EL2（VHE 内核 或 non-VHE 虚拟机监控器）。

KVM 客户机可能运行在 EL0（用户空间）和 EL1（内核）。

由于宿主机和客户机之间重叠的异常级别，我们不能仅仅依靠 PMU 的硬件异
常过滤机制-因此我们必须启用/禁用对于客户机进入和退出的计数。而这在
VHE 和 non-VHE 系统上表现不同。

对于 non-VHE 系统的 exclude\_host 属性排除 EL2 - 在进入和退出客户
机时，我们会根据 exclude\_host 和 exclude\_guest 属性在适当的情况下
禁用/启用该事件。

对于 VHE 系统的 exclude\_guest 属性排除 EL1，而对其中的 exclude\_host
属性同时排除 EL0，EL2。在进入和退出客户机时，我们会适当地根据
exclude\_host 和 exclude\_guest 属性包括/排除 EL0。

以上声明也适用于在 not-VHE 客户机使用这些属性时，但是请注意客户机从
来不会运行在 EL2。

### 准确性

在 non-VHE 宿主机上，我们在 EL2 进入/退出宿主机/客户机的切换时启用/
关闭计数器 -但是在启用/禁用计数器和进入/退出客户机之间存在一段延时。
对于 exclude\_host， 我们可以通过过滤 EL2 消除在客户机进入/退出边界
上用于计数客户机事件的宿主机事件计数器。但是当使用 !exclude\_hv 时，
在客户机进入/退出有一个小的停电窗口无法捕获到宿主机的事件。

在 VHE 系统没有停电窗口。

## 来源、版本与核验

- 来源：[Perf 事件属性](https://docs.kernel.org/translations/zh_CN/arch/arm64/perf.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/arch/arm64/perf.rst`。
