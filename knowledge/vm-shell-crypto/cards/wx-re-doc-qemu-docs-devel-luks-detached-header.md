---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-devel-luks-detached-header",
  "title": "QEMU：LUKS volume with detached header",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "luks-detached-header",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "dfbb1a82a274f3762afb31332f1bc0647c9076c5ddd4164c0385416e912f6505",
  "generatedHash": "c14b312d28aa06e793e1d1dd035febfe4b6979664459d22182c680d741050005",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "LUKS volume with detached header：LUKS volume with detached header",
  "l1": "This document gives an overview of the design of LUKS volume with detached header and how to use it. The LUKS format has ability to store the header in a separate volume from the payload. We could extend the LUKS driver in QEMU to support this use case. Normally a LUKS volume has a layout: :: +-----------------------------------------------+ | | | | disk | header | key material | disk payload data | | | | | +-----------------------------------------------+ With a detached LUKS header, you need 2 disks so getting: :: +--------------------------+ disk1 | header | key material | +--------------------------+ +---------------------+ disk2 | disk payload data | +---------------------+ There are a variety of benefits to doing this: * Secrecy - the disk2 cannot be identified as containing LUKS volume since there's no header * Control - if access ",
  "questions": [
    "luks-detached-header 如何用于LUKS volume with detached header？",
    "luks-detached-header 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-devel-luks-detached-header",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/luks-detached-header.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：LUKS volume with detached header

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：LUKS volume with detached header。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

LUKS volume with detached header

## 技术正文

## LUKS volume with detached header


## Introduction


This document gives an overview of the design of LUKS volume with detached
header and how to use it.

## Background


The LUKS format has ability to store the header in a separate volume from
the payload. We could extend the LUKS driver in QEMU to support this use
case.

Normally a LUKS volume has a layout:

::

         +-----------------------------------------------+
         |         |                |                    |
 disk    | header  |  key material  |  disk payload data |
         |         |                |                    |
         +-----------------------------------------------+

With a detached LUKS header, you need 2 disks so getting:

::

         +--------------------------+
 disk1   |   header  | key material |
         +--------------------------+
         +---------------------+
 disk2   |  disk payload data  |
         +---------------------+

There are a variety of benefits to doing this:

 * Secrecy - the disk2 cannot be identified as containing LUKS
             volume since there's no header
 * Control - if access to the disk1 is restricted, then even
             if someone has access to disk2 they can't unlock
             it. Might be useful if you have disks on NFS but
             want to restrict which host can launch a VM
             instance from it, by dynamically providing access
             to the header to a designated host
 * Flexibility - your application data volume may be a given
                 size and it is inconvenient to resize it to
                 add encryption.You can store the LUKS header
                 separately and use the existing storage
                 volume for payload
 * Recovery - corruption of a bit in the header may make the
              entire payload inaccessible. It might be
              convenient to take backups of the header. If
              your primary disk header becomes corrupt, you
              can unlock the data still by pointing to the
              backup detached header

## Architecture


Take the qcow2 encryption, for example. The architecture of the
LUKS volume with detached header is shown in the diagram below.

There are two children of the root node: a file and a header.
Data from the disk payload is stored in the file node. The
LUKS header and key material are located in the header node,
as previously mentioned.

::

                       +-----------------------------+
  Root node            |          foo[luks]          |
                       +-----------------------------+
                          |                       |
                     file |                header |
                          |                       |
               +---------------------+    +------------------+
  Child node   |payload-format[qcow2]|    |header-format[raw]|
               +---------------------+    +------------------+
                          |                       |
                     file |                 file  |
                          |                       |
               +----------------------+  +---------------------+
  Child node   |payload-protocol[file]|  |header-protocol[file]|
               +----------------------+  +---------------------+
                          |                       |
                          |                       |
                          |                       |
                     Host storage            Host storage

## Usage


### Create a LUKS disk with a detached header using qemu-img


Shell commandline::

  # qemu-img create --object secret,id=sec0,data=abc123 -f luks \
    -o cipher-alg=aes-256,cipher-mode=xts -o key-secret=sec0 \
    -o detached-header=true test-header.img
  # qemu-img create -f qcow2 test-payload.qcow2 200G
  # qemu-img info 'json:{"driver":"luks","file":{"filename": \
    "test-payload.img"},"header":{"filename":"test-header.img"}}'

### Set up a VM's LUKS volume with a detached header


Qemu commandline::

  # qemu-system-x86_64 ... \
    -object '{"qom-type":"secret","id":"libvirt-3-format-secret", \
    "data":"abc123"}' \
    -blockdev '{"driver":"file","filename":"/path/to/test-header.img", \
    "node-name":"libvirt-1-storage"}' \
    -blockdev '{"node-name":"libvirt-1-format","read-only":false, \
    "driver":"raw","file":"libvirt-1-storage"}' \
    -blockdev '{"driver":"file","filename":"/path/to/test-payload.qcow2", \
    "node-name":"libvirt-2-storage"}' \
    -blockdev '{"node-name":"libvirt-2-format","read-only":false, \
    "driver":"qcow2","file":"libvirt-2-storage"}' \
    -blockdev '{"node-name":"libvirt-3-format","driver":"luks", \
    "file":"libvirt-2-format","header":"libvirt-1-format","key-secret": \
    "libvirt-3-format-secret"}' \
    -device '{"driver":"virtio-blk-pci","bus":XXX,"addr":YYY,"drive": \
    "libvirt-3-format","id":"virtio-disk1"}'

### Add LUKS volume to a VM with a detached header


1. object-add the secret for decrypting the cipher stored in
   LUKS header above::

    # virsh qemu-monitor-command vm '{"execute":"object-add", \
      "arguments":{"qom-type":"secret", "id": \
      "libvirt-4-format-secret", "data":"abc123"}}'

2. block-add the protocol node for LUKS header::

    # virsh qemu-monitor-command vm '{"execute":"blockdev-add", \
      "arguments":{"node-name":"libvirt-1-storage", "driver":"file", \
      "filename": "/path/to/test-header.img" }}'

3. block-add the raw-drived node for LUKS header::

    # virsh qemu-monitor-command vm '{"execute":"blockdev-add", \
      "arguments":{"node-name":"libvirt-1-format", "driver":"raw", \
      "file":"libvirt-1-storage"}}'

4. block-add the protocol node for disk payload image::

    # virsh qemu-monitor-command vm '{"execute":"blockdev-add", \
      "arguments":{"node-name":"libvirt-2-storage", "driver":"file", \
      "filename":"/path/to/test-payload.qcow2"}}'

5. block-add the qcow2-drived format node for disk payload data::

    # virsh qemu-monitor-command vm '{"execute":"blockdev-add", \
      "arguments":{"node-name":"libvirt-2-format", "driver":"qcow2", \
      "file":"libvirt-2-storage"}}'

6. block-add the luks-drived format node to link the qcow2 disk
   with the LUKS header by specifying the field "header"::

    # virsh qemu-monitor-command vm '{"execute":"blockdev-add", \
      "arguments":{"node-name":"libvirt-3-format", "driver":"luks", \
      "file":"libvirt-2-format", "header":"libvirt-1-format", \
      "key-secret":"libvirt-2-format-secret"}}'

7. hot-plug the virtio-blk device finally::

    # virsh qemu-monitor-command vm '{"execute":"device_add", \
      "arguments": {"driver":"virtio-blk-pci", \
      "drive": "libvirt-3-format", "id":"virtio-disk2"}}

## TODO


1. Support the shared detached LUKS header within the VM.

## 来源、版本与核验

- 上游：[docs/devel/luks-detached-header.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/luks-detached-header.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/devel/luks-detached-header.rst`；SHA-256：`dfbb1a82a274f3762afb31332f1bc0647c9076c5ddd4164c0385416e912f6505`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
