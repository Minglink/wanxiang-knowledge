---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-system-arm-orangepi",
  "title": "QEMU：ARM设备模型 · orangepi",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "orangepi",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "1b4fef39def60cbd187ed2ddb51685d09cd721237d8909a8ca6c276fba814376",
  "generatedHash": "7b6f2bb4e6b160d457dbeded0688dfe857d395a4b34f7d483a8efe47274e9838",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "Orange Pi PC (orangepi-pc)：Orange Pi PC (``orangepi-pc``)",
  "l1": "The Xunlong Orange Pi PC is an Allwinner H3 System on Chip based embedded computer with mainline support in both U-Boot and Linux. The board comes with a Quad Core Cortex-A7 @ 1.3GHz, 1GiB RAM, 100Mbit ethernet, USB, SD/MMC, USB, HDMI and various other I/O. The Orange Pi PC machine supports the following devices: * SMP (Quad Core Cortex-A7) * Generic Interrupt Controller configuration * SRAM mappings * SDRAM controller * Real Time Clock * Timer device (re-used from Allwinner A10) * UART * SD/MMC storage controller * EMAC ethernet * USB 2.0 interfaces * Clock Control Unit * System Control module * Security Identifier device * TWI (I2C) * Watchdog timer Currently, Orange Pi PC does *not* support the following features: - Graphical output via HDMI, GPU and/or the Display Engine - Audio output - Hardware Watchdog Also see the 'unimplemented' ",
  "questions": [
    "orangepi 如何用于Orange Pi PC (orangepi-pc)？",
    "orangepi 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-system-arm-orangepi",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/orangepi.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：ARM设备模型 · orangepi

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：Orange Pi PC (orangepi-pc)。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Orange Pi PC (``orangepi-pc``)

## 技术正文

## Orange Pi PC (``orangepi-pc``)


The Xunlong Orange Pi PC is an Allwinner H3 System on Chip
based embedded computer with mainline support in both U-Boot
and Linux. The board comes with a Quad Core Cortex-A7 @ 1.3GHz,
1GiB RAM, 100Mbit ethernet, USB, SD/MMC, USB, HDMI and
various other I/O.

### Supported devices


The Orange Pi PC machine supports the following devices:

 * SMP (Quad Core Cortex-A7)
 * Generic Interrupt Controller configuration
 * SRAM mappings
 * SDRAM controller
 * Real Time Clock
 * Timer device (re-used from Allwinner A10)
 * UART
 * SD/MMC storage controller
 * EMAC ethernet
 * USB 2.0 interfaces
 * Clock Control Unit
 * System Control module
 * Security Identifier device
 * TWI (I2C)
 * Watchdog timer

### Limitations


Currently, Orange Pi PC does *not* support the following features:

- Graphical output via HDMI, GPU and/or the Display Engine
- Audio output
- Hardware Watchdog

Also see the 'unimplemented' array in the Allwinner H3 SoC module
for a complete list of unimplemented I/O devices: `./hw/arm/allwinner-h3.c`

### Boot options


The Orange Pi PC machine can start using the standard -kernel functionality
for loading a Linux kernel or ELF executable. Additionally, the Orange Pi PC
machine can also emulate the BootROM which is present on an actual Allwinner H3
based SoC, which loads the bootloader from a SD card, specified via the -sd argument
to qemu-system-arm.

### Machine-specific options


The following machine-specific options are supported:

- allwinner-rtc.base-year=YYYY

  The Allwinner RTC device is automatically created by the Orange Pi PC machine
  and uses a default base year value which can be overridden using the 'base-year' property.
  The base year is the actual represented year when the RTC year value is zero.
  This option can be used in case the target operating system driver uses a different
  base year value. The minimum value for the base year is 1900.

- allwinner-sid.identifier=abcd1122-a000-b000-c000-12345678ffff

  The Security Identifier value can be read by the guest.
  For example, U-Boot uses it to determine a unique MAC address.

The above machine-specific options can be specified in qemu-system-arm
via the '-global' argument, for example:

```bash
$ qemu-system-arm -M orangepi-pc -sd mycard.img \
     -global allwinner-rtc.base-year=2000

```

### Running mainline Linux


Mainline Linux kernels from 4.19 up to latest master are known to work.
To build a Linux mainline kernel that can be booted by the Orange Pi PC machine,
simply configure the kernel using the sunxi_defconfig configuration:

```bash
$ ARCH=arm CROSS_COMPILE=arm-linux-gnueabi- make mrproper
$ ARCH=arm CROSS_COMPILE=arm-linux-gnueabi- make sunxi_defconfig

```

To be able to use USB storage, you need to manually enable the corresponding
configuration item. Start the kconfig configuration tool:

```bash
$ ARCH=arm CROSS_COMPILE=arm-linux-gnueabi- make menuconfig

```

Navigate to the following item, enable it and save your configuration:

  Device Drivers > USB support > USB Mass Storage support

Build the Linux kernel with:

```bash
$ ARCH=arm CROSS_COMPILE=arm-linux-gnueabi- make

```

To boot the newly build linux kernel in QEMU with the Orange Pi PC machine, use:

```bash
$ qemu-system-arm -M orangepi-pc -nic user -nographic \
    -kernel /path/to/linux/arch/arm/boot/zImage \
    -append 'console=ttyS0,115200' \
    -dtb /path/to/linux/arch/arm/boot/dts/sun8i-h3-orangepi-pc.dtb

```

### Orange Pi PC images


Note that the mainline kernel does not have a root filesystem. You may provide it
with an official Orange Pi PC image from the official website:

  http://www.orangepi.org/html/serviceAndSupport/index.html

Another possibility is to run an Armbian image for Orange Pi PC which
can be downloaded from:

   https://www.armbian.com/orange-pi-pc/

Alternatively, you can also choose to build you own image with buildroot
using the orangepi_pc_defconfig. Also see https://buildroot.org for more information.

When using an image as an SD card, it must be resized to a power of two. This can be
done with the `qemu-img` command. It is recommended to only increase the image size
instead of shrinking it to a power of two, to avoid loss of data. For example,
to prepare a downloaded Armbian image, first extract it and then increase
its size to one gigabyte as follows:

```bash
$ qemu-img resize Armbian_19.11.3_Orangepipc_bionic_current_5.3.9.img 1G

```

You can choose to attach the selected image either as an SD card or as USB mass storage.
For example, to boot using the Orange Pi PC Debian image on SD card, simply add the -sd
argument and provide the proper root= kernel parameter:

```bash
$ qemu-system-arm -M orangepi-pc -nic user -nographic \
    -kernel /path/to/linux/arch/arm/boot/zImage \
    -append 'console=ttyS0,115200 root=/dev/mmcblk0p2' \
    -dtb /path/to/linux/arch/arm/boot/dts/sun8i-h3-orangepi-pc.dtb \
    -sd OrangePi_pc_debian_stretch_server_linux5.3.5_v1.0.img

```

To attach the image as an USB mass storage device to the machine,
simply append to the command:

```bash
-drive if=none,id=stick,file=myimage.img \
-device usb-storage,bus=usb-bus.0,drive=stick

```

Instead of providing a custom Linux kernel via the -kernel command you may also
choose to let the Orange Pi PC machine load the bootloader from SD card, just like
a real board would do using the BootROM. Simply pass the selected image via the -sd
argument and remove the -kernel, -append, -dbt and -initrd arguments:

```bash
$ qemu-system-arm -M orangepi-pc -nic user -nographic \
     -sd Armbian_19.11.3_Orangepipc_buster_current_5.3.9.img

```

Note that both the official Orange Pi PC images and Armbian images start
a lot of userland programs via systemd. Depending on the host hardware and OS,
they may be slow to emulate, especially due to emulating the 4 cores.
To help reduce the performance slow down due to emulating the 4 cores, you can
give the following kernel parameters via U-Boot (or via -append):

```bash
=> setenv extraargs 'systemd.default_timeout_start_sec=9000 loglevel=7 nosmp console=ttyS0,115200'

```

### Running U-Boot


U-Boot mainline can be build and configured using the orangepi_pc_defconfig
using similar commands as describe above for Linux. Note that it is recommended
for development/testing to select the following configuration setting in U-Boot:

  Device Tree Control > Provider for DTB for DT Control > Embedded DTB

To start U-Boot using the Orange Pi PC machine, provide the
u-boot binary to the -kernel argument:

```bash
$ qemu-system-arm -M orangepi-pc -nic user -nographic \
    -kernel /path/to/uboot/u-boot -sd disk.img

```

Use the following U-boot commands to load and boot a Linux kernel from SD card:

```bash
=> setenv bootargs console=ttyS0,115200
=> ext2load mmc 0 0x42000000 zImage
=> ext2load mmc 0 0x43000000 sun8i-h3-orangepi-pc.dtb
=> bootz 0x42000000 - 0x43000000

```

### Running NetBSD


The NetBSD operating system also includes support for Allwinner H3 based boards,
including the Orange Pi PC. NetBSD 9.0 is known to work best for the Orange Pi PC
board and provides a fully working system with serial console, networking and storage.
For the Orange Pi PC machine, get the 'evbarm-earmv7hf' based image from:

  https://archive.netbsd.org/pub/NetBSD-archive/NetBSD-9.0/evbarm-earmv7hf/binary/gzimg/armv7.img.gz

The image requires manually installing U-Boot in the image. Build U-Boot with
the orangepi_pc_defconfig configuration as described in the previous section.
Next, unzip the NetBSD image and write the U-Boot binary including SPL using:

```bash
$ gunzip armv7.img.gz
$ dd if=/path/to/u-boot-sunxi-with-spl.bin of=armv7.img bs=1024 seek=8 conv=notrunc

```

Finally, before starting the machine the SD image must be extended such
that the size of the SD image is a power of two and that the NetBSD kernel
will not conclude the NetBSD partition is larger than the emulated SD card:

```bash
$ qemu-img resize armv7.img 2G

```

Start the machine using the following command:

```bash
$ qemu-system-arm -M orangepi-pc -nic user -nographic \
      -sd armv7.img -global allwinner-rtc.base-year=2000

```

At the U-Boot stage, interrupt the automatic boot process by pressing a key
and set the following environment variables before booting:

```bash
=> setenv bootargs root=ld0a
=> setenv kernel netbsd-GENERIC.ub
=> setenv fdtfile dtb/sun8i-h3-orangepi-pc.dtb
=> setenv bootcmd 'fatload mmc 0:1 ${kernel_addr_r} ${kernel}; fatload mmc 0:1 ${fdt_addr_r} ${fdtfile}; fdt addr ${fdt_addr_r}; bootm ${kernel_addr_r} - ${fdt_addr_r}'

```

Optionally you may save the environment variables to SD card with 'saveenv'.
To continue booting simply give the 'boot' command and NetBSD boots.

### Orange Pi PC functional tests


The Orange Pi PC machine has several functional tests included.
To run the whole set of tests, build QEMU from source and simply
provide the following command from the build directory:

```bash
$ QEMU_TEST_ALLOW_LARGE_STORAGE=1 \
  pyvenv/bin/meson test --suite thorough func-arm-arm_orangepi
```

## 来源、版本与核验

- 上游：[docs/system/arm/orangepi.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/orangepi.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/system/arm/orangepi.rst`；SHA-256：`1b4fef39def60cbd187ed2ddb51685d09cd721237d8909a8ca6c276fba814376`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
