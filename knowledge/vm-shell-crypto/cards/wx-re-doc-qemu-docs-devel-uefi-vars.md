---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-devel-uefi-vars",
  "title": "QEMU：UEFI variables",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "uefi-vars",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ffa1d70f95d5ede9ba542026f93bb13b0cf0205ef7f64ed4c9b6c7ad2cf08123",
  "generatedHash": "09aa2e8c1930e8f1126b8d732c73df33d10d72800944277d9526f2df77ed1593",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "UEFI variables：UEFI variables",
  "l1": "The traditional approach for UEFI Variable storage in qemu guests is to work as close as possible to physical hardware. That means providing pflash as storage and leaving the management of variables and flash to the guest. Secure boot support comes with the requirement that the UEFI variable storage must be protected against direct access by the OS. All update requests must pass the sanity checks. (Parts of) the firmware must run with a higher privilege level than the OS so this can be enforced by the firmware. On x86 this has been implemented using System Management Mode (SMM) in qemu and kvm, which again is the same approach taken by physical hardware. Only privileged code running in SMM mode is allowed to access flash storage. Communication with the firmware code running in SMM mode works by serializing the requests to a shared buffer,",
  "questions": [
    "uefi-vars 如何用于UEFI variables？",
    "uefi-vars 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-devel-uefi-vars",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/uefi-vars.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：UEFI variables

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：UEFI variables。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

UEFI variables

## 技术正文

## UEFI variables


## Guest UEFI variable management


The traditional approach for UEFI Variable storage in qemu guests is
to work as close as possible to physical hardware.  That means
providing pflash as storage and leaving the management of variables
and flash to the guest.

Secure boot support comes with the requirement that the UEFI variable
storage must be protected against direct access by the OS.  All update
requests must pass the sanity checks.  (Parts of) the firmware must
run with a higher privilege level than the OS so this can be enforced
by the firmware.  On x86 this has been implemented using System
Management Mode (SMM) in qemu and kvm, which again is the same
approach taken by physical hardware.  Only privileged code running in
SMM mode is allowed to access flash storage.

Communication with the firmware code running in SMM mode works by
serializing the requests to a shared buffer, then trapping into SMM
mode via SMI.  The SMM code processes the request, stores the reply in
the same buffer and returns.

## Host UEFI variable service


Instead of running the privileged code inside the guest we can run it
on the host.  The serialization protocol can be reused.  The
communication with the host uses a virtual device, which essentially
configures the shared buffer location and size, and traps to the host
to process the requests.

The `uefi-vars` device implements the UEFI virtual device.  It comes
in `uefi-vars-x86` and `uefi-vars-sysbus` flavours.  The device
reimplements the handlers needed, specifically
`EfiSmmVariableProtocol` and `VarCheckPolicyLibMmiHandler`.  It
also consumes events (`EfiEndOfDxeEventGroup`,
`EfiEventReadyToBoot` and `EfiEventExitBootServices`).

The advantage of the approach is that we do not need a special
privilege level for the firmware to protect itself, i.e. it does not
depend on SMM emulation on x64, which allows the removal of a bunch of
complex code for SMM emulation from the linux kernel
(CONFIG_KVM_SMM=n).  It also allows support for secure boot on arm
without implementing secure world (el3) emulation in kvm.

Of course there are also downsides.  The added device increases the
attack surface of the host, and we are adding some code duplication
because we have to reimplement some edk2 functionality in qemu.

### usage on x86_64


.. code::

   qemu-system-x86_64 \
      -device uefi-vars-x86,jsonfile=/path/to/vars.json

### usage on aarch64


.. code::

   qemu-system-aarch64 -M virt \
      -device uefi-vars-sysbus,jsonfile=/path/to/vars.json

## 来源、版本与核验

- 上游：[docs/devel/uefi-vars.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/uefi-vars.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/devel/uefi-vars.rst`；SHA-256：`ffa1d70f95d5ede9ba542026f93bb13b0cf0205ef7f64ed4c9b6c7ad2cf08123`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
