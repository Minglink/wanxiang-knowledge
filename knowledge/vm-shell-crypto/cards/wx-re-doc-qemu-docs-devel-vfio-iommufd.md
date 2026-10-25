---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-devel-vfio-iommufd",
  "title": "QEMU：IOMMUFD BACKEND usage with VFIO",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "vfio-iommufd",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f14a1bb9ed709bb1b608c89c386203d3aba0b2ec409252c3e42d91a8632f0470",
  "generatedHash": "98b0e7ef9d75c3bdc6781dad1692a0023dd6ed902e1a95ad3c14483206cc36cf",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "IOMMUFD BACKEND usage with VFIO：IOMMUFD BACKEND usage with VFIO",
  "l1": "(Same meaning for backend/container/BE) With the introduction of iommufd, the Linux kernel provides a generic interface for user space drivers to propagate their DMA mappings to kernel for assigned devices. While the legacy kernel interface is group-centric, the new iommufd interface is device-centric, relying on device fd and iommufd. To support both interfaces in the QEMU VFIO device, introduce a base container to abstract the common part of VFIO legacy and iommufd container. So that the generic VFIO code can use either container. The base container implements generic functions such as memory_listener and address space management whereas the derived container implements callbacks specific to either legacy or iommufd. Each container has its own way to setup secure context and dma management interface. The below diagram shows how it looks",
  "questions": [
    "vfio-iommufd 如何用于IOMMUFD BACKEND usage with VFIO？",
    "vfio-iommufd 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-devel-vfio-iommufd",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/vfio-iommufd.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：IOMMUFD BACKEND usage with VFIO

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：IOMMUFD BACKEND usage with VFIO。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

IOMMUFD BACKEND usage with VFIO

## 技术正文

## IOMMUFD BACKEND usage with VFIO


(Same meaning for backend/container/BE)

With the introduction of iommufd, the Linux kernel provides a generic
interface for user space drivers to propagate their DMA mappings to kernel
for assigned devices. While the legacy kernel interface is group-centric,
the new iommufd interface is device-centric, relying on device fd and iommufd.

To support both interfaces in the QEMU VFIO device, introduce a base container
to abstract the common part of VFIO legacy and iommufd container. So that the
generic VFIO code can use either container.

The base container implements generic functions such as memory_listener and
address space management whereas the derived container implements callbacks
specific to either legacy or iommufd. Each container has its own way to setup
secure context and dma management interface. The below diagram shows how it
looks like with both containers.

::

                      VFIO                           AddressSpace/Memory
      +-------+  +----------+  +-----+  +-----+
      |  pci  |  | platform |  |  ap |  | ccw |
      +---+---+  +----+-----+  +--+--+  +--+--+     +----------------------+
          |           |           |        |        |   AddressSpace       |
          |           |           |        |        +------------+---------+
      +---V-----------V-----------V--------V----+               /
      |           VFIOAddressSpace              | <------------+
      |                  |                      |  MemoryListener
      |        VFIOContainerBase list           |
      +-------+----------------------------+----+
              |                            |
              |                            |
      +-------V------+            +--------V----------+
      |   iommufd    |            |    vfio legacy    |
      |  container   |            |     container     |
      +-------+------+            +--------+----------+
              |                            |
              | /dev/iommu                 | /dev/vfio/vfio
              | /dev/vfio/devices/vfioX    | /dev/vfio/$group_id
  Userspace   |                            |
  ============+============================+===========================
  Kernel      |  device fd                 |
              +---------------+            | group/container fd
              | (BIND_IOMMUFD |            | (SET_CONTAINER/SET_IOMMU)
              |  ATTACH_IOAS) |            | device fd
              |               |            |
              |       +-------V------------V-----------------+
      iommufd |       |                vfio                  |
  (map/unmap  |       +---------+--------------------+-------+
  ioas_copy)  |                 |                    | map/unmap
              |                 |                    |
       +------V------+    +-----V------+      +------V--------+
       | iommfd core |    |  device    |      |  vfio iommu   |
       +-------------+    +------------+      +---------------+

* Secure Context setup

  - iommufd BE: uses device fd and iommufd to setup secure context
    (bind_iommufd, attach_ioas)
  - vfio legacy BE: uses group fd and container fd to setup secure context
    (set_container, set_iommu)

* Device access

  - iommufd BE: device fd is opened through `/dev/vfio/devices/vfioX`
  - vfio legacy BE: device fd is retrieved from group fd ioctl

* DMA Mapping flow

  1. VFIOAddressSpace receives MemoryRegion add/del via MemoryListener
  2. VFIO populates DMA map/unmap via the container BEs
     * iommufd BE: uses iommufd
     * vfio legacy BE: uses container fd

## Example configuration


### Step 1: configure the host device


It's exactly same as the VFIO device with legacy VFIO container.

### Step 2: configure QEMU


Interactions with the `/dev/iommu` are abstracted by a new iommufd
object (compiled in with the `CONFIG_IOMMUFD` option).

Any QEMU device (e.g. VFIO device) wishing to use `/dev/iommu` must
be linked with an iommufd object. It gets a new optional property
named iommufd which allows to pass an iommufd object. Take `vfio-pci`
device for example:

```bash
-object iommufd,id=iommufd0
-device vfio-pci,host=0000:02:00.0,iommufd=iommufd0

```

Note the `/dev/iommu` and VFIO cdev can be externally opened by a
management layer. In such a case the fd is passed, the fd supports a
string naming the fd or a number, for example:

```bash
-object iommufd,id=iommufd0,fd=22
-device vfio-pci,iommufd=iommufd0,fd=23

```

If the `fd` property is not passed, the fd is opened by QEMU.

If no `iommufd` object is passed to the `vfio-pci` device, iommufd
is not used and the user gets the behavior based on the legacy VFIO
container:

```bash
-device vfio-pci,host=0000:02:00.0

```

## Supported platform


Supports x86, ARM and s390x currently.

## Caveats


### Dirty page sync


Dirty page sync with iommufd backend is unsupported yet, live migration is
disabled by default. But it can be force enabled like below, low efficient
though.

```bash
-object iommufd,id=iommufd0
-device vfio-pci,host=0000:02:00.0,iommufd=iommufd0,enable-migration=on

```

### P2P DMA


PCI p2p DMA is unsupported as IOMMUFD doesn't support mapping hardware PCI
BAR region yet. Below warning shows for assigned PCI device, it's not a bug.

```none
qemu-system-x86_64: warning: IOMMU_IOAS_MAP failed: Bad address, PCI BAR?
qemu-system-x86_64: vfio_container_dma_map(0x560cb6cb1620, 0xe000000021000, 0x3000, 0x7f32ed55c000) = -14 (Bad address)

```

### FD passing with mdev


`vfio-pci` device checks sysfsdev property to decide if backend is a mdev.
If FD passing is used, there is no way to know that and the mdev is treated
like a real PCI device. There is an error as below if user wants to enable
RAM discarding for mdev.

```none
qemu-system-x86_64: -device vfio-pci,iommufd=iommufd0,x-balloon-allowed=on,fd=9: vfio VFIO_FD9: x-balloon-allowed only potentially compatible with mdev devices

```

`vfio-ap` and `vfio-ccw` devices don't have same issue as their backend
devices are always mdev and RAM discarding is force enabled.

## 来源、版本与核验

- 上游：[docs/devel/vfio-iommufd.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/vfio-iommufd.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/devel/vfio-iommufd.rst`；SHA-256：`f14a1bb9ed709bb1b608c89c386203d3aba0b2ec409252c3e42d91a8632f0470`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
