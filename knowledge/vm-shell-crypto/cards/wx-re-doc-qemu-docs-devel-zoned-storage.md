---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-devel-zoned-storage",
  "title": "QEMU：zoned-storage",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "zoned-storage",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "cd879f1f5caeca944825eaaf8790db7b50f7b6ac4ff12328b4d83f2b9c53abae",
  "generatedHash": "8392323311cc043830b9471cabc93da57e6a68256ee12cf33c2891aaa7f0f87f",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "zoned-storage：zoned-storage",
  "l1": "Zoned Block Devices (ZBDs) divide the LBA space into block regions called zones that are larger than the LBA size. They can only allow sequential writes, which can reduce write amplification in SSDs, and potentially lead to higher throughput and increased capacity. More details about ZBDs can be found at: https://zonedstorage.io/docs/introduction/zoned-storage QEMU block layer supports three zoned storage models: - BLK_Z_HM: The host-managed zoned model only allows sequential writes access to zones. It supports ZBD-specific I/O commands that can be used by a host to manage the zones of a device. - BLK_Z_HA: The host-aware zoned model allows random write operations in zones, making it backward compatible with regular block devices. - BLK_Z_NONE: The non-zoned model has no zones support. It includes both regular and drive-managed ZBD device",
  "questions": [
    "zoned-storage 如何用于zoned-storage？",
    "zoned-storage 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-devel-zoned-storage",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/zoned-storage.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：zoned-storage

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：zoned-storage。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

zoned-storage

## 技术正文

## zoned-storage


Zoned Block Devices (ZBDs) divide the LBA space into block regions called zones
that are larger than the LBA size. They can only allow sequential writes, which
can reduce write amplification in SSDs, and potentially lead to higher
throughput and increased capacity. More details about ZBDs can be found at:

https://zonedstorage.io/docs/introduction/zoned-storage

### 1. Block layer APIs for zoned storage

QEMU block layer supports three zoned storage models:
- BLK_Z_HM: The host-managed zoned model only allows sequential writes access
to zones. It supports ZBD-specific I/O commands that can be used by a host to
manage the zones of a device.
- BLK_Z_HA: The host-aware zoned model allows random write operations in
zones, making it backward compatible with regular block devices.
- BLK_Z_NONE: The non-zoned model has no zones support. It includes both
regular and drive-managed ZBD devices. ZBD-specific I/O commands are not
supported.

The block device information resides inside BlockDriverState. QEMU uses
BlockLimits struct(BlockDriverState::bl) that is continuously accessed by the
block layer while processing I/O requests. A BlockBackend has a root pointer to
a BlockDriverState graph(for example, raw format on top of file-posix). The
zoned storage information can be propagated from the leaf BlockDriverState all
the way up to the BlockBackend. If the zoned storage model in file-posix is
set to BLK_Z_HM, then block drivers will declare support for zoned host device.

The block layer APIs support commands needed for zoned storage devices,
including report zones, four zone operations, and zone append.

### 2. Emulating zoned storage controllers

When the BlockBackend's BlockLimits model reports a zoned storage device, users
like the virtio-blk emulation or the qemu-io-cmds.c utility can use block layer
APIs for zoned storage emulation or testing.

For example, to test zone_report on a null_blk device using qemu-io is::

  $ path/to/qemu-io --image-opts -n driver=host_device,filename=/dev/nullb0 -c "zrp offset nr_zones"

To expose the host's zoned block device through virtio-blk, the command line
can be (includes the -device parameter)::

  -blockdev node-name=drive0,driver=host_device,filename=/dev/nullb0,cache.direct=on \
  -device virtio-blk-pci,drive=drive0

Or only use the -drive parameter::

  -driver driver=host_device,file=/dev/nullb0,if=virtio,cache.direct=on

Additionally, QEMU has several ways of supporting zoned storage, including:
(1) Using virtio-scsi: --device scsi-block allows for the passing through of
SCSI ZBC devices, enabling the attachment of ZBC or ZAC HDDs to QEMU.
(2) PCI device pass-through: While NVMe ZNS emulation is available for testing
purposes, it cannot yet pass through a zoned device from the host. To pass on
the NVMe ZNS device to the guest, use VFIO PCI pass the entire NVMe PCI adapter
through to the guest. Likewise, an HDD HBA can be passed on to QEMU all HDDs
attached to the HBA.

## 来源、版本与核验

- 上游：[docs/devel/zoned-storage.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/zoned-storage.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/devel/zoned-storage.rst`；SHA-256：`cd879f1f5caeca944825eaaf8790db7b50f7b6ac4ff12328b4d83f2b9c53abae`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
