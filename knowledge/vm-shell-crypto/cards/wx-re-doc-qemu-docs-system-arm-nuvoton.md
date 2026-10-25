---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-system-arm-nuvoton",
  "title": "QEMU：ARM设备模型 · nuvoton",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "nuvoton",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "5678ba4a2d647a842cbd3626f46d20c7713479d1ccc090d9954abfd789fa0eb3",
  "generatedHash": "ebdaab77b4af1a2992e9786fa6bff21ab5bc777770c938561a1fd44784b90b4e",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Nuvoton iBMC boards (kudo-bmc, mori-bmc, npcm750-evb, quanta-gbs-bmc, quanta-gsj, npcm845-evb)：Nuvoton iBMC boards (``kudo-bmc``, ``mori-bmc``, ``npcm750-evb``, ``quanta-gbs-bmc``, ``quanta-gsj``, ``npcm845-evb``)",
  "l1": "The `Nuvoton iBMC`_ chips are a family of Arm-based SoCs that are designed to be used as Baseboard Management Controllers (BMCs) in various servers. Currently there are two families: NPCM7XX series and NPCM8XX series. NPCM7XX series feature one or two Arm Cortex-A9 CPU cores, while NPCM8XX feature 4 Arm Cortex-A35 CPU cores. Both series contain a different assortment of peripherals targeted for either Enterprise or Data Center / Hyperscale applications. .. _Nuvoton iBMC: https://www.nuvoton.com/products/cloud-computing/ibmc/ The NPCM750 SoC has two Cortex-A9 cores and is targeted for the Enterprise segment. The following machines are based on this chip : - `npcm750-evb` Nuvoton NPCM750 Evaluation board The NPCM730 SoC has two Cortex-A9 cores and is targeted for Data Center and Hyperscale applications. The following machines are based on t",
  "questions": [
    "nuvoton 如何用于Nuvoton iBMC boards (kudo-bmc, mori-bmc, npcm750-evb, quanta-gbs-bmc, quanta-gsj, npcm845-evb)？",
    "nuvoton 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-system-arm-nuvoton",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/nuvoton.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：ARM设备模型 · nuvoton

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：Nuvoton iBMC boards (kudo-bmc, mori-bmc, npcm750-evb, quanta-gbs-bmc, quanta-gsj, npcm845-evb)。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Nuvoton iBMC boards (``kudo-bmc``, ``mori-bmc``, ``npcm750-evb``, ``quanta-gbs-bmc``, ``quanta-gsj``, ``npcm845-evb``)

## 技术正文

## Nuvoton iBMC boards (``kudo-bmc``, ``mori-bmc``, ``npcm750-evb``, ``quanta-gbs-bmc``, ``quanta-gsj``, ``npcm845-evb``)


The `Nuvoton iBMC`_ chips are a family of Arm-based SoCs that are
designed to be used as Baseboard Management Controllers (BMCs) in various
servers. Currently there are two families: NPCM7XX series and
NPCM8XX series. NPCM7XX series feature one or two Arm Cortex-A9 CPU cores,
while NPCM8XX feature 4 Arm Cortex-A35 CPU cores. Both series contain a
different assortment of peripherals targeted for either Enterprise or Data
Center / Hyperscale applications.

.. _Nuvoton iBMC: https://www.nuvoton.com/products/cloud-computing/ibmc/

The NPCM750 SoC has two Cortex-A9 cores and is targeted for the Enterprise
segment. The following machines are based on this chip :

- `npcm750-evb`       Nuvoton NPCM750 Evaluation board

The NPCM730 SoC has two Cortex-A9 cores and is targeted for Data Center and
Hyperscale applications. The following machines are based on this chip :

- `quanta-gbs-bmc`    Quanta GBS server BMC
- `quanta-gsj`        Quanta GSJ server BMC
- `kudo-bmc`          Fii USA Kudo server BMC
- `mori-bmc`          Fii USA Mori server BMC

There are also two more SoCs, NPCM710 and NPCM705, which are single-core
variants of NPCM750 and NPCM730, respectively. These are currently not
supported by QEMU.

The NPCM8xx SoC is the successor of the NPCM7xx SoC. It has 4 Cortex-A35 cores.
The following machines are based on this chip :

- `npcm845-evb`       Nuvoton NPCM845 Evaluation board

### Supported devices


 * SMP (Dual Core Cortex-A9)
 * Cortex-A9MPCore built-in peripherals: SCU, GIC, Global Timer, Private Timer
   and Watchdog.
 * SRAM, ROM and DRAM mappings
 * System Global Control Registers (GCR)
 * Clock and reset controller (CLK)
 * Timer controller (TIM)
 * Serial ports (16550-based)
 * DDR4 memory controller (dummy interface indicating memory training is done)
 * OTP controllers (no protection features)
 * Flash Interface Unit (FIU; no protection features)
 * Random Number Generator (RNG)
 * USB host (USBH)
 * GPIO controller
 * Analog to Digital Converter (ADC)
 * Pulse Width Modulation (PWM)
 * SMBus controller (SMBF)
 * Ethernet controller (EMC)
 * Tachometer
 * Peripheral SPI controller (PSPI)

### Missing devices


 * LPC/eSPI host-to-BMC interface, including

   * Keyboard and mouse controller interface (KBCI)
   * Keyboard Controller Style (KCS) channels
   * BIOS POST code FIFO
   * System Wake-up Control (SWC)
   * Shared memory (SHM)
   * eSPI slave interface
   * Block-transfer interface (8XX only)
   * Virtual UART (8XX only)

 * Ethernet controller (GMAC)
 * USB device (USBD)
 * SD/MMC host
 * PECI interface
 * PCI and PCIe root complex and bridges
 * VDM and MCTP support
 * Serial I/O expansion
 * LPC/eSPI host
 * Coprocessor
 * Graphics
 * Video capture
 * Encoding compression engine
 * Security features
 * I3C buses (8XX only)
 * Temperature sensor interface (8XX only)
 * Virtual UART (8XX only)
 * Flash monitor (8XX only)
 * JTAG master (8XX only)

### Boot options


The Nuvoton machines can boot from an OpenBMC firmware image, or directly into
a kernel using the `-kernel` option. OpenBMC images for `quanta-gsj` and
possibly others can be downloaded from the OpenBMC jenkins :

   https://jenkins.openbmc.org/

The firmware image should be attached as an MTD drive. Example :

```bash
$ qemu-system-arm -machine quanta-gsj -nographic \
    -drive file=image-bmc,if=mtd,bus=0,unit=0,format=raw

```

The default root password for test images is usually `0penBmc`.

## 来源、版本与核验

- 上游：[docs/system/arm/nuvoton.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/nuvoton.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/system/arm/nuvoton.rst`；SHA-256：`5678ba4a2d647a842cbd3626f46d20c7713479d1ccc090d9954abfd789fa0eb3`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
