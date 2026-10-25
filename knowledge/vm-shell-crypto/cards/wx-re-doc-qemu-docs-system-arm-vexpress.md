---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-system-arm-vexpress",
  "title": "QEMU：ARM设备模型 · vexpress",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "vexpress",
    "qemu",
    "RSA非对称密码"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "4bed3cc2832715580a73678cb50291067ff0ee17478ad8a5a61d9f45ee2e9814",
  "generatedHash": "15efe12dff09bc283aec2ded5909e55f3765cedba56d0496d39de90e741f2c6e",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Arm Versatile Express boards (vexpress-a9, vexpress-a15)：Arm Versatile Express boards (``vexpress-a9``, ``vexpress-a15``)",
  "l1": "QEMU models two variants of the Arm Versatile Express development board family: - `vexpress-a9` models the combination of the Versatile Express motherboard and the CoreTile Express A9x4 daughterboard - `vexpress-a15` models the combination of the Versatile Express motherboard and the CoreTile Express A15x2 daughterboard Note that as this hardware does not have PCI, IDE or SCSI, the only available storage option is emulated SD card. Implemented devices: - PL041 audio - PL181 SD controller - PL050 keyboard and mouse - PL011 UARTs - SP804 timers - I2C controller - PL031 RTC - PL111 LCD display controller - Flash memory - LAN9118 ethernet Unimplemented devices: - SP810 system control block - PCI-express - USB controller (Philips ISP1761) - Local DAP ROM - CoreSight interfaces - PL301 AXI interconnect - SCC - System counter - HDLCD controller ",
  "questions": [
    "vexpress 如何用于Arm Versatile Express boards (vexpress-a9, vexpress-a15)？",
    "vexpress 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-system-arm-vexpress",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/vexpress.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：ARM设备模型 · vexpress

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：Arm Versatile Express boards (vexpress-a9, vexpress-a15)。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Arm Versatile Express boards (``vexpress-a9``, ``vexpress-a15``)

## 技术正文

## Arm Versatile Express boards (``vexpress-a9``, ``vexpress-a15``)


QEMU models two variants of the Arm Versatile Express development
board family:

- `vexpress-a9` models the combination of the Versatile Express
  motherboard and the CoreTile Express A9x4 daughterboard
- `vexpress-a15` models the combination of the Versatile Express
  motherboard and the CoreTile Express A15x2 daughterboard

Note that as this hardware does not have PCI, IDE or SCSI,
the only available storage option is emulated SD card.

Implemented devices:

- PL041 audio
- PL181 SD controller
- PL050 keyboard and mouse
- PL011 UARTs
- SP804 timers
- I2C controller
- PL031 RTC
- PL111 LCD display controller
- Flash memory
- LAN9118 ethernet

Unimplemented devices:

- SP810 system control block
- PCI-express
- USB controller (Philips ISP1761)
- Local DAP ROM
- CoreSight interfaces
- PL301 AXI interconnect
- SCC
- System counter
- HDLCD controller (`vexpress-a15`)
- SP805 watchdog
- PL341 dynamic memory controller
- DMA330 DMA controller
- PL354 static memory controller
- BP147 TrustZone Protection Controller
- TrustZone Address Space Controller

Other differences between the hardware and the QEMU model:

- QEMU will default to creating one CPU unless you pass a different
  `-smp` argument
- QEMU allows the amount of RAM provided to be specified with the
  `-m` argument
- QEMU defaults to providing a CPU which does not provide either
  TrustZone or the Virtualization Extensions: if you want these you
  must enable them with `-machine secure=on` and ``-machine
  virtualization=on``
- QEMU provides 4 virtio-mmio virtio transports; these start at
  address `0x10013000` for `vexpress-a9` and at `0x1c130000` for
  `vexpress-a15`, and have IRQs from 40 upwards. If a dtb is
  provided on the command line then QEMU will edit it to include
  suitable entries describing these transports for the guest.
- QEMU does not currently support either dynamic or static remapping
  of the area of memory at address 0: it is always mapped to alias
  the first flash bank

### Booting a Linux kernel


Building a current Linux kernel with `multi_v7_defconfig` should be
enough to get something running. Nowadays an out-of-tree build is
recommended (and also useful if you build a lot of different targets).
In the following example $BLD points to the build directory and $SRC
points to the root of the Linux source tree. You can drop $SRC if you
are running from there.

```bash
$ make O=$BLD -C $SRC ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- multi_v7_defconfig
$ make O=$BLD -C $SRC ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf-

```

By default you will want to boot your rootfs off the sdcard interface.
Your rootfs will need to be padded to the right size. With a suitable
DTB you could also add devices to the virtio-mmio bus.

```bash
$ qemu-system-arm -cpu cortex-a15 -smp 4 -m 4096 \
    -machine type=vexpress-a15 -serial mon:stdio \
    -drive if=sd,driver=file,filename=armel-rootfs.ext4 \
    -kernel zImage  \
    -dtb vexpress-v2p-ca15-tc1.dtb \
    -append "console=ttyAMA0 root=/dev/mmcblk0 ro"
```

## 来源、版本与核验

- 上游：[docs/system/arm/vexpress.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/vexpress.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/system/arm/vexpress.rst`；SHA-256：`4bed3cc2832715580a73678cb50291067ff0ee17478ad8a5a61d9f45ee2e9814`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
