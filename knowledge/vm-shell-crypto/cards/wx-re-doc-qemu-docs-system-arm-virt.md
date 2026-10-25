---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-system-arm-virt",
  "title": "QEMU：ARM设备模型 · virt",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "virt",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "bfda320511e74a5c6cbefd072d8be1dc224c6ff83e5531c557f9464e7093cce6",
  "generatedHash": "866469ee5e69641014923f53af2248cf8740b6c1d5dca9b1626192fd467d7b64",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "'virt' generic virtual platform (virt)：'virt' generic virtual platform (``virt``)",
  "l1": "The `virt` board is a platform which does not correspond to any real hardware; it is designed for use in virtual machines. It is the recommended board type if you simply want to run a guest such as Linux and do not care about reproducing the idiosyncrasies and limitations of a particular bit of real-world hardware. This is a \"versioned\" board model, so as well as the `virt` machine type itself (which may have improvements, bugfixes and other minor changes between QEMU versions) a version is provided that guarantees to have the same behaviour as that of previous QEMU releases, so that VM migration will work between QEMU versions. For instance the `virt-5.0` machine type will behave like the `virt` machine from the QEMU 5.0 release, and migration should work between `virt-5.0` of the 5.0 release and `virt-5.0` of the 5.1 release. Migration ",
  "questions": [
    "virt 如何用于'virt' generic virtual platform (virt)？",
    "virt 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-system-arm-virt",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/virt.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：ARM设备模型 · virt

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：'virt' generic virtual platform (virt)。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

'virt' generic virtual platform (``virt``)

## 技术正文

## 'virt' generic virtual platform (``virt``)


The `virt` board is a platform which does not correspond to any
real hardware; it is designed for use in virtual machines.
It is the recommended board type if you simply want to run
a guest such as Linux and do not care about reproducing the
idiosyncrasies and limitations of a particular bit of real-world
hardware.

This is a "versioned" board model, so as well as the `virt` machine
type itself (which may have improvements, bugfixes and other minor
changes between QEMU versions) a version is provided that guarantees
to have the same behaviour as that of previous QEMU releases, so
that VM migration will work between QEMU versions. For instance the
`virt-5.0` machine type will behave like the `virt` machine from
the QEMU 5.0 release, and migration should work between `virt-5.0`
of the 5.0 release and `virt-5.0` of the 5.1 release. Migration
is not guaranteed to work between different QEMU releases for
the non-versioned `virt` machine type.

VM migration is not guaranteed when using `-cpu max`, as features
supported may change between QEMU versions.  To ensure your VM can be
migrated, it is recommended to use another cpu model instead.

### Supported devices


The virt board supports:

- PCI/PCIe devices
- Flash memory
- Either one or two PL011 UARTs for the NonSecure World
- An RTC
- The fw_cfg device that allows a guest to obtain data from QEMU
- A PL061 GPIO controller
- An optional SMMUv3 IOMMU
- hotpluggable DIMMs
- hotpluggable NVDIMMs
- An MSI controller (GICv2M or ITS). GICv2M is selected by default along
  with GICv2. ITS is selected by default with GICv3 (>= virt-2.7). Note
  that ITS is not modeled in TCG mode.
- 32 virtio-mmio transport devices
- running guests using the KVM accelerator on aarch64 hardware
- large amounts of RAM (at least 255GB, and more if using highmem)
- many CPUs (up to 512 if using a GICv3 and highmem)
- Secure-World-only devices if the CPU has TrustZone:

  - A second PL011 UART
  - A second PL061 GPIO controller, with GPIO lines for triggering
    a system reset or system poweroff
  - A secure flash memory
  - 16MB of secure RAM

The second NonSecure UART only exists if a backend is configured
explicitly (e.g. with a second -serial command line option) and
TrustZone emulation is not enabled.

Supported guest CPU types:

- `cortex-a7` (32-bit)
- `cortex-a15` (32-bit; the default)
- `cortex-a35` (64-bit)
- `cortex-a53` (64-bit)
- `cortex-a55` (64-bit)
- `cortex-a57` (64-bit)
- `cortex-a72` (64-bit)
- `cortex-a76` (64-bit)
- `cortex-a710` (64-bit)
- `a64fx` (64-bit)
- `host` (with KVM and HVF only)
- `neoverse-n1` (64-bit)
- `neoverse-v1` (64-bit)
- `neoverse-n2` (64-bit)
- `max` (same as `host` for KVM and HVF; best possible emulation with TCG)

Note that the default is `cortex-a15`, so for an AArch64 guest you must
specify a CPU type.

Also, please note that passing `max` CPU (i.e. `-cpu max`) won't
enable all the CPU features for a given `virt` machine. Where a CPU
architectural feature requires support in both the CPU itself and in the
wider system (e.g. the MTE feature), it may not be enabled by default,
but instead requires a machine option to enable it.

For example, MTE support must be enabled with `-machine virt,mte=on`,
as well as by selecting an MTE-capable CPU (e.g., `max`) with the
`-cpu` option.

See the machine-specific options below, or check them for a given machine
by passing the `help` suboption, like: `-machine virt-9.0,help`.

Graphics output is available, but unlike the x86 PC machine types
there is no default display device enabled: you should select one from
the Display devices section of "-device help". The recommended option
is `virtio-gpu-pci`; this is the only one which will work correctly
with KVM. You may also need to ensure your guest kernel is configured
with support for this; see below.

### Machine-specific options


The following machine-specific options are supported:

secure
  Set `on`/`off` to enable/disable emulating a guest CPU which implements the
  Arm Security Extensions (TrustZone). The default is `off`.

virtualization
  Set `on`/`off` to enable/disable emulating a guest CPU which implements the
  Arm Virtualization Extensions. The default is `off`.

mte
  Set `on`/`off` to enable/disable emulating a guest CPU which implements the
  Arm Memory Tagging Extensions. The default is `off`.

highmem
  Set `on`/`off` to enable/disable placing devices and RAM in physical
  address space above 32 bits. The default is `on` for machine types
  later than `virt-2.12` when the CPU supports an address space
  bigger than 32 bits (i.e. 64-bit CPUs, and 32-bit CPUs with the
  Large Physical Address Extension (LPAE) feature). If you want to
  boot a 32-bit kernel which does not have `CONFIG_LPAE` enabled on
  a CPU type which implements LPAE, you will need to manually set
  this to `off`; otherwise some devices, such as the PCI controller,
  will not be accessible.

compact-highmem
  Set `on`/`off` to enable/disable the compact layout for high memory regions.
  The default is `on` for machine types later than `virt-7.2`.

highmem-redists
  Set `on`/`off` to enable/disable the high memory region for GICv3 or
  GICv4 redistributor. The default is `on`. Setting this to `off` will
  limit the maximum number of CPUs when GICv3 or GICv4 is used.

highmem-ecam
  Set `on`/`off` to enable/disable the high memory region for PCI ECAM.
  The default is `on` for machine types later than `virt-3.0`.

highmem-mmio
  Set `on`/`off` to enable/disable the high memory region for PCI MMIO.
  The default is `on`.

highmem-mmio-size
  Set the high memory region size for PCI MMIO. Must be a power of 2 and
  greater than or equal to the default size (512G).

gic-version
  Specify the version of the Generic Interrupt Controller (GIC) to provide.
  Valid values are:

  `2`
    GICv2. Note that this limits the number of CPUs to 8.
  `3`
    GICv3. This allows up to 512 CPUs.
  `4`
    GICv4. Requires `virtualization` to be `on`; allows up to 317 CPUs.
  `host`
    Use the same GIC version the host provides, when using KVM
  `max`
    Use the best GIC version possible (same as host when using KVM;
    with TCG this is currently `3` if `virtualization` is `off` and
    `4` if `virtualization` is `on`, but this may change in future)

its
  Set `on`/`off` to enable/disable ITS instantiation. The default is `on`
  for machine types later than `virt-2.7`.

iommu
  Set the IOMMU type to create for the guest. Valid values are:

  `none`
    Don't create an IOMMU (the default)
  `smmuv3`
    Create an SMMUv3

default-bus-bypass-iommu
  Set `on`/`off` to enable/disable `bypass_iommu
  <https://gitlab.com/qemu-project/qemu/-/blob/master/docs/bypass-iommu.txt>`_
  for default root bus.

ras
  Set `on`/`off` to enable/disable reporting host memory errors to a guest
  using ACPI and guest external abort exceptions. The default is off.

acpi
  Set `on`/`off`/`auto` to enable/disable ACPI.

dtb-randomness
  Set `on`/`off` to pass random seeds via the guest DTB
  rng-seed and kaslr-seed nodes (in both "/chosen" and
  "/secure-chosen") to use for features like the random number
  generator and address space randomisation. The default is
  `on`. You will want to disable it if your trusted boot chain
  will verify the DTB it is passed, since this option causes the
  DTB to be non-deterministic. It would be the responsibility of
  the firmware to come up with a seed and pass it on if it wants to.

dtb-kaslr-seed
  A deprecated synonym for dtb-randomness.

x-oem-id
  Set string (up to 6 bytes) to override the default value of field OEMID in ACPI
  table header.

x-oem-table-id
  Set string (up to 8 bytes) to override the default value of field OEM Table ID
  in ACPI table header.

### Linux guest kernel configuration


The 'defconfig' for Linux arm and arm64 kernels should include the
right device drivers for virtio and the PCI controller; however some older
kernel versions, especially for 32-bit Arm, did not have everything
enabled by default. If you're not seeing PCI devices that you expect,
then check that your guest config has::

  CONFIG_PCI=y
  CONFIG_VIRTIO_PCI=y
  CONFIG_PCI_HOST_GENERIC=y

If you want to use the `virtio-gpu-pci` graphics device you will also
need::

  CONFIG_DRM=y
  CONFIG_DRM_VIRTIO_GPU=y

### Hardware configuration information for bare-metal programming


The `virt` board automatically generates a device tree blob ("dtb")
which it passes to the guest. This provides information about the
addresses, interrupt lines and other configuration of the various devices
in the system. Guest code can rely on and hard-code the following
addresses:

- Flash memory starts at address 0x0000_0000

- RAM starts at 0x4000_0000

All other information about device locations may change between
QEMU versions, so guest code must look in the DTB.

QEMU supports two types of guest image boot for `virt`, and
the way for the guest code to locate the dtb binary differs:

- For guests using the Linux kernel boot protocol (this means any
  non-ELF file passed to the QEMU `-kernel` option) the address
  of the DTB is passed in a register (`r2` for 32-bit guests,
  or `x0` for 64-bit guests)

- For guests booting as "bare-metal" (any other kind of boot),
  the DTB is at the start of RAM (0x4000_0000)

## 来源、版本与核验

- 上游：[docs/system/arm/virt.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/system/arm/virt.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/system/arm/virt.rst`；SHA-256：`bfda320511e74a5c6cbefd072d8be1dc224c6ff83e5531c557f9464e7093cce6`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
