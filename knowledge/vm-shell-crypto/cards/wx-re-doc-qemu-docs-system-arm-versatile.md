---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-system-arm-versatile",
  "title": "QEMU：ARM设备模型 · versatile",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "versatile",
    "qemu",
    "RSA非对称密码"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ae849c804e01b9dd4e092af25e1632b6520b53a2a166707c96243c38c15c71d5",
  "generatedHash": "7578474ad4273dd993a8dce0ba5b4f166473fb1ef2beacfd4e4cafede3730db9",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Arm Versatile boards (versatileab, versatilepb)：Arm Versatile boards (``versatileab``, ``versatilepb``)",
  "l1": "The Arm Versatile baseboard is emulated with the following devices: - ARM926E, ARM1136 or Cortex-A8 CPU - PL190 Vectored Interrupt Controller - Four PL011 UARTs - SMC 91c111 Ethernet adapter - PL110 LCD controller - PL050 KMI with PS/2 keyboard and mouse. - PCI host bridge. Note the emulated PCI bridge only provides access to PCI memory space. It does not provide access to PCI IO space. This means some devices (eg. ne2k_pci NIC) are not usable, and others (eg. rtl8139 NIC) are only usable when the guest drivers use the memory mapped control registers. - PCI OHCI USB controller. - LSI53C895A PCI SCSI Host Bus Adapter with hard disk and CD-ROM devices. - PL181 MultiMedia Card Interface with SD card. Building a current Linux kernel with `versatile_defconfig` should be enough to get something running. Nowadays an out-of-tree build is recommen",
  "questions": [
    "versatile 如何用于Arm Versatile boards (versatileab, versatilepb)？",
    "versatile 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-rsa-oaep",
      "kind": "机制参照"
    }
  ],
  "externalSources": [
    {
      "id": "doc-qemu-docs-system-arm-versatile",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/versatile.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：ARM设备模型 · versatile

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：Arm Versatile boards (versatileab, versatilepb)。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Arm Versatile boards (``versatileab``, ``versatilepb``)

## 技术正文

## Arm Versatile boards (``versatileab``, ``versatilepb``)


The Arm Versatile baseboard is emulated with the following devices:

-  ARM926E, ARM1136 or Cortex-A8 CPU

-  PL190 Vectored Interrupt Controller

-  Four PL011 UARTs

-  SMC 91c111 Ethernet adapter

-  PL110 LCD controller

-  PL050 KMI with PS/2 keyboard and mouse.

-  PCI host bridge. Note the emulated PCI bridge only provides access
   to PCI memory space. It does not provide access to PCI IO space. This
   means some devices (eg. ne2k_pci NIC) are not usable, and others (eg.
   rtl8139 NIC) are only usable when the guest drivers use the memory
   mapped control registers.

-  PCI OHCI USB controller.

-  LSI53C895A PCI SCSI Host Bus Adapter with hard disk and CD-ROM
   devices.

-  PL181 MultiMedia Card Interface with SD card.

### Booting a Linux kernel


Building a current Linux kernel with `versatile_defconfig` should be
enough to get something running. Nowadays an out-of-tree build is
recommended (and also useful if you build a lot of different targets).
In the following example $BLD points to the build directory and $SRC
points to the root of the Linux source tree. You can drop $SRC if you
are running from there.

```bash
$ make O=$BLD -C $SRC ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- versatile_defconfig
$ make O=$BLD -C $SRC ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf-

```

You may want to enable some additional modules if you want to boot
something from the SCSI interface::

  CONFIG_PCI=y
  CONFIG_PCI_VERSATILE=y
  CONFIG_SCSI=y
  CONFIG_SCSI_SYM53C8XX_2=y

You can then boot with a command line like:

```bash
$ qemu-system-arm -machine type=versatilepb \
    -serial mon:stdio \
    -drive if=scsi,driver=file,filename=debian-buster-armel-rootfs.ext4 \
    -kernel zImage \
    -dtb versatile-pb.dtb  \
    -append "console=ttyAMA0 ro root=/dev/sda"
```

## 来源、版本与核验

- 上游：[docs/system/arm/versatile.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/versatile.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/system/arm/versatile.rst`；SHA-256：`ae849c804e01b9dd4e092af25e1632b6520b53a2a166707c96243c38c15c71d5`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
