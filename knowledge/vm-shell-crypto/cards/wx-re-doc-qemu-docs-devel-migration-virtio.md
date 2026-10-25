---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-devel-migration-virtio",
  "title": "QEMU：半虚拟化设备",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "virtio",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "1efcca380a22404041ad3a83560e1723290d27b3f361656609e4bf8b2fc5d5f0",
  "generatedHash": "3f0a2c5a5bc5eca6dea4d7e5e4beda02336d91427fd2e9c6c83c911b1c508216",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "半虚拟化设备：Virtio device migration",
  "l1": "Copyright 2015 IBM Corp. This work is licensed under the terms of the GNU GPL, version 2 or later. See the COPYING file in the top-level directory. Saving and restoring the state of virtio devices is a bit of a twisty maze, for several reasons: - state is distributed between several parts: - virtio core, for common fields like features, number of queues, ... - virtio transport (pci, ccw, ...), for the different proxy devices and transport specific state (msix vectors, indicators, ...) - virtio device (net, blk, ...), for the different device types and their state (mac address, request queue, ...) - most fields are saved via the stream interface; subsequently, subsections have been added to make cross-version migration possible This file attempts to document the current procedure and point out some caveats. :: virtio core virtio transport ",
  "questions": [
    "virtio 如何用于半虚拟化设备？",
    "virtio 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-devel-migration-virtio",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/migration/virtio.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：半虚拟化设备

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：半虚拟化设备。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Virtio device migration

## 技术正文

## Virtio device migration


Copyright 2015 IBM Corp.

This work is licensed under the terms of the GNU GPL, version 2 or later.  See
the COPYING file in the top-level directory.

Saving and restoring the state of virtio devices is a bit of a twisty maze,
for several reasons:

- state is distributed between several parts:

  - virtio core, for common fields like features, number of queues, ...

  - virtio transport (pci, ccw, ...), for the different proxy devices and
    transport specific state (msix vectors, indicators, ...)

  - virtio device (net, blk, ...), for the different device types and their
    state (mac address, request queue, ...)

- most fields are saved via the stream interface; subsequently, subsections
  have been added to make cross-version migration possible

This file attempts to document the current procedure and point out some
caveats.

## Save state procedure


::

  virtio core               virtio transport          virtio device
  -----------               ----------------          -------------

                                                      save() function registered
                                                      via VMState wrapper on
                                                      device class
  virtio_save()                                       <----------
               ------>      save_config()
                            - save proxy device
                            - save transport-specific
                              device fields
  - save common device
    fields
  - save common virtqueue
    fields
               ------>      save_queue()
                            - save transport-specific
                              virtqueue fields
               ------>                               save_device()
                                                     - save device-specific
                                                       fields
  - save subsections
    - device endianness,
      if changed from
      default endianness
    - 64 bit features, if
      any high feature bit
      is set
    - virtio-1 virtqueue
      fields, if VERSION_1
      is set

## Load state procedure


::

  virtio core               virtio transport          virtio device
  -----------               ----------------          -------------

                                                      load() function registered
                                                      via VMState wrapper on
                                                      device class
  virtio_load()                                       <----------
               ------>      load_config()
                            - load proxy device
                            - load transport-specific
                              device fields
  - load common device
    fields
  - load common virtqueue
    fields
               ------>      load_queue()
                            - load transport-specific
                              virtqueue fields
  - notify guest
               ------>                               load_device()
                                                     - load device-specific
                                                       fields
  - load subsections
    - device endianness
    - 64 bit features
    - virtio-1 virtqueue
      fields
  - sanitize endianness
  - sanitize features
  - virtqueue index sanity
    check
                                                     - feature-dependent setup

## Implications of this setup


Devices need to be careful in their state processing during load: The
load_device() procedure is invoked by the core before subsections have
been loaded. Any code that depends on information transmitted in subsections
therefore has to be invoked in the device's load() function _after_
virtio_load() returned (like e.g. code depending on features).

Any extension of the state being migrated should be done in subsections
added to the core for compatibility reasons. If transport or device specific
state is added, core needs to invoke a callback from the new subsection.

## 来源、版本与核验

- 上游：[docs/devel/migration/virtio.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/migration/virtio.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/devel/migration/virtio.rst`；SHA-256：`1efcca380a22404041ad3a83560e1723290d27b3f361656609e4bf8b2fc5d5f0`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
