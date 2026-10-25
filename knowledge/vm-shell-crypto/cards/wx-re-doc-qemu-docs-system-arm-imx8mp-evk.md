---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-system-arm-imx8mp-evk",
  "title": "QEMU：ARM设备模型 · imx8mp-evk",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "imx8mp-evk",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f70a68f7b213c09588d1e209624e48ed2bed7571d51e221186240302f1e6942e",
  "generatedHash": "9d1fa5c84c396d0b35d29fb28fe133126a4dfdeb317cd8d7d729f4c250cada45",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "NXP i.MX 8M Plus Evaluation Kit (imx8mp-evk)：NXP i.MX 8M Plus Evaluation Kit (``imx8mp-evk``)",
  "l1": "The `imx8mp-evk` machine models the i.MX 8M Plus Evaluation Kit, based on an i.MX 8M Plus SoC. The `imx8mp-evk` machine implements the following devices: * Up to 4 Cortex-A53 cores * Generic Interrupt Controller (GICv3) * 4 UARTs * 3 USDHC Storage Controllers * 1 Designware PCI Express Controller * 1 Ethernet Controller * 2 Designware USB 3 Controllers * 5 GPIO Controllers * 6 I2C Controllers * 3 SPI Controllers * 3 Watchdogs * 6 General Purpose Timers * Secure Non-Volatile Storage (SNVS) including an RTC * Clock Tree The `imx8mp-evk` machine can start a Linux kernel directly using the standard `-kernel` functionality. Direct Linux Kernel Boot '''''''''''''''''''''''' Probably the easiest way to get started with a whole Linux system on the machine is to generate an image with Buildroot. Version 2024.11.1 is tested at the time of writing a",
  "questions": [
    "imx8mp-evk 如何用于NXP i.MX 8M Plus Evaluation Kit (imx8mp-evk)？",
    "imx8mp-evk 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-system-arm-imx8mp-evk",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/imx8mp-evk.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：ARM设备模型 · imx8mp-evk

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：NXP i.MX 8M Plus Evaluation Kit (imx8mp-evk)。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

NXP i.MX 8M Plus Evaluation Kit (``imx8mp-evk``)

## 技术正文

## NXP i.MX 8M Plus Evaluation Kit (``imx8mp-evk``)


The `imx8mp-evk` machine models the i.MX 8M Plus Evaluation Kit, based on an
i.MX 8M Plus SoC.

### Supported devices


The `imx8mp-evk` machine implements the following devices:

 * Up to 4 Cortex-A53 cores
 * Generic Interrupt Controller (GICv3)
 * 4 UARTs
 * 3 USDHC Storage Controllers
 * 1 Designware PCI Express Controller
 * 1 Ethernet Controller
 * 2 Designware USB 3 Controllers
 * 5 GPIO Controllers
 * 6 I2C Controllers
 * 3 SPI Controllers
 * 3 Watchdogs
 * 6 General Purpose Timers
 * Secure Non-Volatile Storage (SNVS) including an RTC
 * Clock Tree

### Boot options


The `imx8mp-evk` machine can start a Linux kernel directly using the standard
`-kernel` functionality.

Direct Linux Kernel Boot
''''''''''''''''''''''''

Probably the easiest way to get started with a whole Linux system on the machine
is to generate an image with Buildroot. Version 2024.11.1 is tested at the time
of writing and involves two steps. First run the following commands in the
toplevel directory of the Buildroot source tree:

```bash
$ make freescale_imx8mpevk_defconfig
$ make

```

Once finished successfully there is an `output/image` subfolder. Navigate into
it and resize the SD card image to a power of two:

```bash
$ qemu-img resize sdcard.img 256M

```

Now that everything is prepared the machine can be started as follows:

```bash
$ qemu-system-aarch64 -M imx8mp-evk -smp 4 -m 3G \
    -display none -serial null -serial stdio \
    -kernel Image \
    -dtb imx8mp-evk.dtb \
    -append "root=/dev/mmcblk2p2" \
    -drive file=sdcard.img,if=sd,bus=2,format=raw,id=mmcblk2
```

## 来源、版本与核验

- 上游：[docs/system/arm/imx8mp-evk.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/imx8mp-evk.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/system/arm/imx8mp-evk.rst`；SHA-256：`f70a68f7b213c09588d1e209624e48ed2bed7571d51e221186240302f1e6942e`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
