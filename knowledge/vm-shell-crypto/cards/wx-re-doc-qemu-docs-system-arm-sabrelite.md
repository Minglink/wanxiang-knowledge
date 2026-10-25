---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-system-arm-sabrelite",
  "title": "QEMU：ARM设备模型 · sabrelite",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "sabrelite",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ef9b9a553df991c1d9d8ecb13f9d541759b0b79ded6ef9f2e42648da10eb6892",
  "generatedHash": "af7327ccb67704271d4e77f6588e0cfae3713f848efa4c9347d5bf797f4a6548",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Boundary Devices SABRE Lite (sabrelite)：Boundary Devices SABRE Lite (``sabrelite``)",
  "l1": "Boundary Devices SABRE Lite i.MX6 Development Board is a low-cost development platform featuring the powerful Freescale / NXP Semiconductor's i.MX 6 Quad Applications Processor. The SABRE Lite machine supports the following devices: * Up to 4 Cortex-A9 cores * Generic Interrupt Controller * 1 Clock Controller Module * 1 System Reset Controller * 5 UARTs * 2 EPIC timers * 1 GPT timer * 2 Watchdog timers * 1 FEC Ethernet controller * 3 I2C controllers * 7 GPIO controllers * 4 SDHC storage controllers * 4 USB 2.0 host controllers * 5 ECSPI controllers * 1 SST 25VF016B flash Please note above list is a complete superset the QEMU SABRE Lite machine can support. For a normal use case, a device tree blob that represents a real world SABRE Lite board, only exposes a subset of devices to the guest software. The SABRE Lite machine can start using t",
  "questions": [
    "sabrelite 如何用于Boundary Devices SABRE Lite (sabrelite)？",
    "sabrelite 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-system-arm-sabrelite",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/sabrelite.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：ARM设备模型 · sabrelite

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：Boundary Devices SABRE Lite (sabrelite)。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Boundary Devices SABRE Lite (``sabrelite``)

## 技术正文

## Boundary Devices SABRE Lite (``sabrelite``)


Boundary Devices SABRE Lite i.MX6 Development Board is a low-cost development
platform featuring the powerful Freescale / NXP Semiconductor's i.MX 6 Quad
Applications Processor.

### Supported devices


The SABRE Lite machine supports the following devices:

 * Up to 4 Cortex-A9 cores
 * Generic Interrupt Controller
 * 1 Clock Controller Module
 * 1 System Reset Controller
 * 5 UARTs
 * 2 EPIC timers
 * 1 GPT timer
 * 2 Watchdog timers
 * 1 FEC Ethernet controller
 * 3 I2C controllers
 * 7 GPIO controllers
 * 4 SDHC storage controllers
 * 4 USB 2.0 host controllers
 * 5 ECSPI controllers
 * 1 SST 25VF016B flash

Please note above list is a complete superset the QEMU SABRE Lite machine can
support. For a normal use case, a device tree blob that represents a real world
SABRE Lite board, only exposes a subset of devices to the guest software.

### Boot options


The SABRE Lite machine can start using the standard -kernel functionality
for loading a Linux kernel, U-Boot bootloader or ELF executable.

### Running Linux kernel


Linux mainline v5.10 release is tested at the time of writing. To build a Linux
mainline kernel that can be booted by the SABRE Lite machine, simply configure
the kernel using the imx_v6_v7_defconfig configuration:

```bash
$ export ARCH=arm
$ export CROSS_COMPILE=arm-linux-gnueabihf-
$ make imx_v6_v7_defconfig
$ make

```

To boot the newly built Linux kernel in QEMU with the SABRE Lite machine, use:

```bash
$ qemu-system-arm -M sabrelite -smp 4 -m 1G \
    -display none -serial null -serial stdio \
    -kernel arch/arm/boot/zImage \
    -dtb arch/arm/boot/dts/imx6q-sabrelite.dtb \
    -initrd /path/to/rootfs.ext4 \
    -append "root=/dev/ram"

```

### Running U-Boot


U-Boot mainline v2020.10 release is tested at the time of writing. To build a
U-Boot mainline bootloader that can be booted by the SABRE Lite machine, use
the mx6qsabrelite_defconfig with similar commands as described above for Linux:

```bash
$ export CROSS_COMPILE=arm-linux-gnueabihf-
$ make mx6qsabrelite_defconfig

```

Note we need to adjust settings by:

```bash
$ make menuconfig

```

then manually select the following configuration in U-Boot:

  Device Tree Control > Provider of DTB for DT Control > Embedded DTB

To start U-Boot using the SABRE Lite machine, provide the u-boot binary to
the -kernel argument, along with an SD card image with rootfs:

```bash
$ qemu-system-arm -M sabrelite -smp 4 -m 1G \
    -display none -serial null -serial stdio \
    -kernel u-boot

```

The following example shows booting Linux kernel from dhcp, and uses the
rootfs on an SD card. This requires some additional command line parameters
for QEMU:

```none
-nic user,tftp=/path/to/kernel/zImage \
-drive file=sdcard.img,id=rootfs -device sd-card,drive=rootfs

```

The directory for the built-in TFTP server should also contain the device tree
blob of the SABRE Lite board. The sample SD card image was populated with the
root file system with one single partition. You may adjust the kernel "root="
boot parameter accordingly.

After U-Boot boots, type the following commands in the U-Boot command shell to
boot the Linux kernel:

```none
=> setenv ethaddr 00:11:22:33:44:55
=> setenv bootfile zImage
=> dhcp
=> tftpboot 14000000 imx6q-sabrelite.dtb
=> setenv bootargs root=/dev/mmcblk3p1
=> bootz 12000000 - 14000000
```

## 来源、版本与核验

- 上游：[docs/system/arm/sabrelite.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/sabrelite.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/system/arm/sabrelite.rst`；SHA-256：`ef9b9a553df991c1d9d8ecb13f9d541759b0b79ded6ef9f2e42648da10eb6892`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
