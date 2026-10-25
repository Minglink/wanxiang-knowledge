---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-devel-secure-coding-practices",
  "title": "QEMU：安全编码",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "secure-coding-practices",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "5e92e721d8aa59c220d1ab078b5823645ba84a0c8aab978f55175f676087954c",
  "generatedHash": "f75b4bfa501f3782695de967d3a431df1ec502d4c8bf5da6721d59b7f98e080b",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "安全编码：Secure Coding Practices",
  "l1": "This document covers topics that both developers and security researchers must be aware of so that they can develop safe code and audit existing code properly. For details on how to report security bugs or ask questions about potential security bugs, see the `Security Process wiki page <https://wiki.qemu.org/SecurityProcess>`_. Most CVEs (security bugs) reported against QEMU are not specific to virtualization or emulation. They are simply C programming bugs. Therefore it's critical to be aware of common classes of security bugs. There is a wide selection of resources available covering secure C coding. For example, the `CERT C Coding Standard <https://wiki.sei.cmu.edu/confluence/display/c/SEI+CERT+C+Coding+Standard>`_ covers the most important classes of security bugs. Instead of describing them in detail here, only the names of the most ",
  "questions": [
    "secure-coding-practices 如何用于安全编码？",
    "secure-coding-practices 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-devel-secure-coding-practices",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/secure-coding-practices.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：安全编码

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：安全编码。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

Secure Coding Practices

## 技术正文

## Secure Coding Practices

This document covers topics that both developers and security researchers must
be aware of so that they can develop safe code and audit existing code
properly.

### Reporting Security Bugs

For details on how to report security bugs or ask questions about potential
security bugs, see the `Security Process wiki page
<https://wiki.qemu.org/SecurityProcess>`_.

### General Secure C Coding Practices

Most CVEs (security bugs) reported against QEMU are not specific to
virtualization or emulation.  They are simply C programming bugs.  Therefore
it's critical to be aware of common classes of security bugs.

There is a wide selection of resources available covering secure C coding.  For
example, the `CERT C Coding Standard
<https://wiki.sei.cmu.edu/confluence/display/c/SEI+CERT+C+Coding+Standard>`_
covers the most important classes of security bugs.

Instead of describing them in detail here, only the names of the most important
classes of security bugs are mentioned:

* Buffer overflows
* Use-after-free and double-free
* Integer overflows
* Format string vulnerabilities

Some of these classes of bugs can be detected by analyzers.  Static analysis is
performed regularly by Coverity and the most obvious of these bugs are even
reported by compilers.  Dynamic analysis is possible with valgrind, tsan, and
asan.

### Input Validation

Inputs from the guest or external sources (e.g. network, files) cannot be
trusted and may be invalid.  Inputs must be checked before using them in a way
that could crash the program, expose host memory to the guest, or otherwise be
exploitable by an attacker.

The most sensitive attack surface is device emulation.  All hardware register
accesses and data read from guest memory must be validated.  A typical example
is a device that contains multiple units that are selectable by the guest via
an index register::

  typedef struct {
      ProcessingUnit unit[2];
      ...
  } MyDeviceState;

  static void mydev_writel(void *opaque, uint32_t addr, uint32_t val)
  {
      MyDeviceState *mydev = opaque;
      ProcessingUnit *unit;

      switch (addr) {
      case MYDEV_SELECT_UNIT:
          unit = &mydev->unit[val];   <-- this input wasn't validated!
          ...
      }
  }

If `val` is not in range [0, 1] then an out-of-bounds memory access will take
place when `unit` is dereferenced.  The code must check that `val` is 0 or
1 and handle the case where it is invalid.

### Unexpected Device Accesses

The guest may access device registers in unusual orders or at unexpected
moments.  Device emulation code must not assume that the guest follows the
typical "theory of operation" presented in driver writer manuals.  The guest
may make nonsense accesses to device registers such as starting operations
before the device has been fully initialized.

A related issue is that device emulation code must be prepared for unexpected
device register accesses while asynchronous operations are in progress.  A
well-behaved guest might wait for a completion interrupt before accessing
certain device registers.  Device emulation code must handle the case where the
guest overwrites registers or submits further requests before an ongoing
request completes.  Unexpected accesses must not cause memory corruption or
leaks in QEMU.

Invalid device register accesses can be reported with
`qemu_log_mask(LOG_GUEST_ERROR, ...)`.  The `-d guest_errors` command-line
option enables these log messages.

### Live Migration

Device state can be saved to disk image files and shared with other users.
Live migration code must validate inputs when loading device state so an
attacker cannot gain control by crafting invalid device states.  Device state
is therefore considered untrusted even though it is typically generated by QEMU
itself.

### Guest Memory Access Races

Guests with multiple vCPUs may modify guest RAM while device emulation code is
running.  Device emulation code must copy in descriptors and other guest RAM
structures and only process the local copy.  This prevents
time-of-check-to-time-of-use (TOCTOU) race conditions that could cause QEMU to
crash when a vCPU thread modifies guest RAM while device emulation is
processing it.

### Use of null-co block drivers


The `null-co` block driver is designed for performance: its read accesses are
not initialized by default. In case this driver has to be used for security
research, it must be used with the `read-zeroes=on` option which fills read
buffers with zeroes. Security issues reported with the default
(`read-zeroes=off`) will be discarded.

## 来源、版本与核验

- 上游：[docs/devel/secure-coding-practices.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/secure-coding-practices.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/devel/secure-coding-practices.rst`；SHA-256：`5e92e721d8aa59c220d1ab078b5823645ba84a0c8aab978f55175f676087954c`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
