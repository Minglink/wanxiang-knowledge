---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-system-arm-mps2",
  "title": "QEMU：ARM设备模型 · mps2",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "mps2",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f5503e28667d1c3e76840aaad44503b924c2a08c55218bbfa322d99ed9143e83",
  "generatedHash": "446ce5daa0ff14941bdc8aa0e01dcfed5383d36c4de7eed804cb4aaef0a2fc57",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Arm MPS2 and MPS3 boards (mps2-an385, mps2-an386, mps2-an500, mps2-an505, mps2-an511, mps2-an521, mps3-an524, mps3-an536, mps3-an547)：Arm MPS2 and MPS3 boards (``mps2-an385``, ``mps2-an386``, ``mps2-an500``, ``mps2-an505``, ``mps2-an511``, ``mps2-an521``, ``mps3-an524``, ``mps3-an536``, ``mps3-an547``)",
  "l1": "These board models use Arm M-profile or R-profile CPUs. The Arm MPS2, MPS2+ and MPS3 dev boards are FPGA based (the 2+ has a bigger FPGA but is otherwise the same as the 2; the 3 has a bigger FPGA again, can handle 4GB of RAM and has a USB controller and QSPI flash). Since the CPU itself and most of the devices are in the FPGA, the details of the board as seen by the guest depend significantly on the FPGA image. QEMU models the following FPGA images: FPGA images using M-profile CPUs: `mps2-an385` Cortex-M3 as documented in Arm Application Note AN385 `mps2-an386` Cortex-M4 as documented in Arm Application Note AN386 `mps2-an500` Cortex-M7 as documented in Arm Application Note AN500 `mps2-an505` Cortex-M33 as documented in Arm Application Note AN505 `mps2-an511` Cortex-M3 'DesignStart' as documented in Arm Application Note AN511 `mps2-an521",
  "questions": [
    "mps2 如何用于Arm MPS2 and MPS3 boards (mps2-an385, mps2-an386, mps2-an500, mps2-an505, mps2-an511, mps2-an521, mps3-an524, mps3-an536, mps3-an547)？",
    "mps2 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-system-arm-mps2",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/mps2.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：ARM设备模型 · mps2

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：Arm MPS2 and MPS3 boards (mps2-an385, mps2-an386, mps2-an500, mps2-an505, mps2-an511, mps2-an521, mps3-an524, mps3-an536, mps3-an547)。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Arm MPS2 and MPS3 boards (``mps2-an385``, ``mps2-an386``, ``mps2-an500``, ``mps2-an505``, ``mps2-an511``, ``mps2-an521``, ``mps3-an524``, ``mps3-an536``, ``mps3-an547``)

## 技术正文

## Arm MPS2 and MPS3 boards (``mps2-an385``, ``mps2-an386``, ``mps2-an500``, ``mps2-an505``, ``mps2-an511``, ``mps2-an521``, ``mps3-an524``, ``mps3-an536``, ``mps3-an547``)


These board models use Arm M-profile or R-profile CPUs.

The Arm MPS2, MPS2+ and MPS3 dev boards are FPGA based (the 2+ has a
bigger FPGA but is otherwise the same as the 2; the 3 has a bigger
FPGA again, can handle 4GB of RAM and has a USB controller and QSPI flash).

Since the CPU itself and most of the devices are in the FPGA, the
details of the board as seen by the guest depend significantly on the
FPGA image.

QEMU models the following FPGA images:

FPGA images using M-profile CPUs:

`mps2-an385`
  Cortex-M3 as documented in Arm Application Note AN385
`mps2-an386`
  Cortex-M4 as documented in Arm Application Note AN386
`mps2-an500`
  Cortex-M7 as documented in Arm Application Note AN500
`mps2-an505`
  Cortex-M33 as documented in Arm Application Note AN505
`mps2-an511`
  Cortex-M3 'DesignStart' as documented in Arm Application Note AN511
`mps2-an521`
  Dual Cortex-M33 as documented in Arm Application Note AN521
`mps3-an524`
  Dual Cortex-M33 on an MPS3, as documented in Arm Application Note AN524
`mps3-an547`
  Cortex-M55 on an MPS3, as documented in Arm Application Note AN547

FPGA images using R-profile CPUs:

`mps3-an536`
  Dual Cortex-R52 on an MPS3, as documented in Arm Application Note AN536

Differences between QEMU and real hardware:

- AN385/AN386 remapping of low 16K of memory to either ZBT SSRAM1 or to
  block RAM is unimplemented (QEMU always maps this to ZBT SSRAM1, as
  if zbt_boot_ctrl is always zero)
- AN524 remapping of low memory to either BRAM or to QSPI flash is
  unimplemented (QEMU always maps this to BRAM, ignoring the
  SCC CFG_REG0 memory-remap bit)
- QEMU provides a LAN9118 ethernet rather than LAN9220; the only guest
  visible difference is that the LAN9118 doesn't support checksum
  offloading
- QEMU does not model the QSPI flash in MPS3 boards as real QSPI
  flash, but only as simple ROM, so attempting to rewrite the flash
  from the guest will fail
- QEMU does not model the USB controller in MPS3 boards
- AN536 does not support runtime control of CPU reset and halt via
  the SCC CFG_REG0 register.
- AN536 does not support enabling or disabling the flash and ATCM
  interfaces via the SCC CFG_REG1 register.
- AN536 does not support setting of the initial vector table
  base address via the SCC CFG_REG6 and CFG_REG7 register config,
  and does not provide a mechanism for specifying these values at
  startup, so all guest images must be built to start from TCM
  (i.e. to expect the interrupt vector base at 0 from reset).
- AN536 defaults to only creating a single CPU; this is the equivalent
  of the way the real FPGA image usually runs with the second Cortex-R52
  held in halt via the initial SCC CFG_REG0 register setting. You can
  create the second CPU with `-smp 2`; both CPUs will then start
  execution immediately on startup.

Note that for the AN536 the first UART is accessible only by
CPU0, and the second UART is accessible only by CPU1. The
first UART accessible shared between both CPUs is the third
UART. Guest software might therefore be built to use either
the first UART or the third UART; if you don't see any output
from the UART you are looking at, try one of the others.
(Even if the AN536 machine is started with a single CPU and so
no "CPU1-only UART", the UART numbering remains the same,
with the third UART being the first of the shared ones.)

### Machine-specific options


The following machine-specific options are supported:

remap
  Supported for `mps3-an524` only.
  Set `BRAM`/`QSPI` to select the initial memory mapping. The
  default is `BRAM`.

## 来源、版本与核验

- 上游：[docs/system/arm/mps2.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/mps2.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/system/arm/mps2.rst`；SHA-256：`f5503e28667d1c3e76840aaad44503b924c2a08c55218bbfa322d99ed9143e83`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
