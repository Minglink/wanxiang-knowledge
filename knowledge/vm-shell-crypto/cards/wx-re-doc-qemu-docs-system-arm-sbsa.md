---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-system-arm-sbsa",
  "title": "QEMU：ARM设备模型 · sbsa",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "sbsa",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "bdd974c7068b3141be06f47e516d2e7cc2a726f64c587f14c29fe09e9a8d62dd",
  "generatedHash": "62beb869a4ad3138b1d9587997875f37390acc6281b1f50b024b1ace507810ff",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Arm Server Base System Architecture Reference board (sbsa-ref)：Arm Server Base System Architecture Reference board (``sbsa-ref``)",
  "l1": "The `sbsa-ref` board intends to look like real hardware (while the `virt` board is a generic board platform that doesn't match any real hardware). The hardware part is defined by two specifications: - [Base System Architecture ](https://developer.arm.com/documentation/den0094/) (BSA) - [Server Base System Architecture ](https://developer.arm.com/documentation/den0029/) (SBSA) The [Arm Base Boot Requirements ](https://developer.arm.com/documentation/den0044/) (BBR) specification defines how the firmware reports that to any operating system. It is intended to be a machine for developing firmware and testing standards compliance with operating systems. The `sbsa-ref` board supports: - A configurable number of AArch64 CPUs - GIC version 3 - System bus AHCI controller - System bus XHCI controller - CDROM and hard disc on AHCI bus - E1000E ethe",
  "questions": [
    "sbsa 如何用于Arm Server Base System Architecture Reference board (sbsa-ref)？",
    "sbsa 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-system-arm-sbsa",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/sbsa.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：ARM设备模型 · sbsa

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：Arm Server Base System Architecture Reference board (sbsa-ref)。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Arm Server Base System Architecture Reference board (``sbsa-ref``)

## 技术正文

## Arm Server Base System Architecture Reference board (``sbsa-ref``)


The `sbsa-ref` board intends to look like real hardware (while the `virt`
board is a generic board platform that doesn't match any real hardware).

The hardware part is defined by two specifications:

  - [Base System Architecture ](https://developer.arm.com/documentation/den0094/) (BSA)
  - [Server Base System Architecture ](https://developer.arm.com/documentation/den0029/) (SBSA)

The [Arm Base Boot Requirements ](https://developer.arm.com/documentation/den0044/) (BBR)
specification defines how the firmware reports that to any operating system.

It is intended to be a machine for developing firmware and testing
standards compliance with operating systems.

### Supported devices


The `sbsa-ref` board supports:

  - A configurable number of AArch64 CPUs
  - GIC version 3
  - System bus AHCI controller
  - System bus XHCI controller
  - CDROM and hard disc on AHCI bus
  - E1000E ethernet card on PCIe bus
  - Bochs display adapter on PCIe bus
  - A generic SBSA watchdog device


### Board to firmware interface


`sbsa-ref` is a static system that reports a very minimal devicetree to the
firmware for non-discoverable information about system components. This
includes both internal hardware and parts affected by the qemu command line
(i.e. CPUs and memory). As a result it must have a firmware specifically built
to expect a certain hardware layout (as you would in a real machine).

Note
''''

QEMU provides the guest EL3 firmware with minimal information about hardware
platform using minimalistic devicetree. This is not a Linux devicetree. It is
not even a firmware devicetree.

It is information passed from QEMU to describe the information a hardware
platform would have other mechanisms to discover at runtime, that are affected
by the QEMU command line.

Ultimately this devicetree may be replaced by IPC calls to an emulated SCP.

DeviceTree information
''''''''''''''''''''''

The devicetree reports:

   - CPUs
   - memory
   - platform version
   - GIC addresses
   - NUMA node id for CPUs and memory
   - CPU topology information

Platform version
''''''''''''''''

The platform version is only for informing platform firmware about
what kind of `sbsa-ref` board it is running on. It is neither
a QEMU versioned machine type nor a reflection of the level of the
SBSA/SystemReady SR support provided.

The `machine-version-major` value is updated when changes breaking
fw compatibility are introduced. The `machine-version-minor` value
is updated when features are added that don't break fw compatibility.

Platform version changes:

0.0
  Devicetree holds information about CPUs, memory and platform version.

0.1
  GIC information is present in devicetree.

0.2
  GIC ITS information is present in devicetree.

0.3
  The USB controller is an XHCI device, not EHCI.

0.4
  CPU topology information is present in devicetree.

## 来源、版本与核验

- 上游：[docs/system/arm/sbsa.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/sbsa.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/system/arm/sbsa.rst`；SHA-256：`bdd974c7068b3141be06f47e516d2e7cc2a726f64c587f14c29fe09e9a8d62dd`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
