---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-devel-migration-qpl-compression",
  "title": "QEMU：QPL Compression",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "qpl-compression",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "7540678ca8d7b1571e8bc632cf62e01b18cc56232fd3dd405aa8bdcee611f9b4",
  "generatedHash": "6fa59e00373c702d848e218700c04572bba9f709d92711a29c7a3a1b3ce77edb",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "QPL Compression：QPL Compression",
  "l1": "The Intel Query Processing Library (Intel `QPL`) is an open-source library to provide compression and decompression features and it is based on deflate compression algorithm (RFC 1951). The `QPL` compression relies on Intel In-Memory Analytics Accelerator(`IAA`) and Shared Virtual Memory(`SVM`) technology, they are new features supported from Intel 4th Gen Intel Xeon Scalable processors, codenamed Sapphire Rapids processor(`SPR`). For more `QPL` introduction, please refer to `QPL Introduction <https://intel.github.io/qpl/documentation/introduction_docs/introduction.html>`_ :: +----------------+ +------------------+ | MultiFD Thread | |accel-config tool | +-------+--------+ +--------+---------+ | | | | |compress/decompress | +-------+--------+ | Setup IAA | QPL library | | Resources +-------+---+----+ | | | | | +-------------+-------+ | Op",
  "questions": [
    "qpl-compression 如何用于QPL Compression？",
    "qpl-compression 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-devel-migration-qpl-compression",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/migration/qpl-compression.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：QPL Compression

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：QPL Compression。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

QPL Compression

## 技术正文

## QPL Compression

The Intel Query Processing Library (Intel `QPL`) is an open-source library to
provide compression and decompression features and it is based on deflate
compression algorithm (RFC 1951).

The `QPL` compression relies on Intel In-Memory Analytics Accelerator(`IAA`)
and Shared Virtual Memory(`SVM`) technology, they are new features supported
from Intel 4th Gen Intel Xeon Scalable processors, codenamed Sapphire Rapids
processor(`SPR`).

For more `QPL` introduction, please refer to `QPL Introduction
<https://intel.github.io/qpl/documentation/introduction_docs/introduction.html>`_

## QPL Compression Framework


::

  +----------------+       +------------------+
  | MultiFD Thread |       |accel-config tool |
  +-------+--------+       +--------+---------+
          |                         |
          |                         |
          |compress/decompress      |
  +-------+--------+                | Setup IAA
  |  QPL library   |                | Resources
  +-------+---+----+                |
          |   |                     |
          |   +-------------+-------+
          |   Open IAA      |
          |   Devices +-----+-----+
          |           |idxd driver|
          |           +-----+-----+
          |                 |
          |                 |
          |           +-----+-----+
          +-----------+IAA Devices|
      Submit jobs     +-----------+
      via enqcmd


### QPL Build And Installation


```shell
$git clone --recursive https://github.com/intel/qpl.git qpl
$mkdir qpl/build
$cd qpl/build
$cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=/usr -DQPL_LIBRARY_TYPE=SHARED ..
$sudo cmake --build . --target install

```

For more details about `QPL` installation, please refer to `QPL Installation
<https://intel.github.io/qpl/documentation/get_started_docs/installation.html>`_

### IAA Device Management


The number of `IAA` devices will vary depending on the Xeon product model.
On a `SPR` server, there can be a maximum of 8 `IAA` devices, with up to
4 devices per socket.

By default, all `IAA` devices are disabled and need to be configured and
enabled by users manually.

Check the number of devices through the following command

```shell
#lspci -d 8086:0cfe
6a:02.0 System peripheral: Intel Corporation Device 0cfe
6f:02.0 System peripheral: Intel Corporation Device 0cfe
74:02.0 System peripheral: Intel Corporation Device 0cfe
79:02.0 System peripheral: Intel Corporation Device 0cfe
e7:02.0 System peripheral: Intel Corporation Device 0cfe
ec:02.0 System peripheral: Intel Corporation Device 0cfe
f1:02.0 System peripheral: Intel Corporation Device 0cfe
f6:02.0 System peripheral: Intel Corporation Device 0cfe

```

#### IAA Device Configuration And Enabling


The `accel-config` tool is used to enable `IAA` devices and configure
`IAA` hardware resources(work queues and engines). One `IAA` device
has 8 work queues and 8 processing engines, multiple engines can be assigned
to a work queue via `group` attribute.

For `accel-config` installation, please refer to `accel-config installation
<https://github.com/intel/idxd-config>`_

One example of configuring and enabling an `IAA` device.

```shell
#accel-config config-engine iax1/engine1.0 -g 0
#accel-config config-engine iax1/engine1.1 -g 0
#accel-config config-engine iax1/engine1.2 -g 0
#accel-config config-engine iax1/engine1.3 -g 0
#accel-config config-engine iax1/engine1.4 -g 0
#accel-config config-engine iax1/engine1.5 -g 0
#accel-config config-engine iax1/engine1.6 -g 0
#accel-config config-engine iax1/engine1.7 -g 0
#accel-config config-wq iax1/wq1.0 -g 0 -s 128 -p 10 -b 1 -t 128 -m shared -y user -n app1 -d user
#accel-config enable-device iax1
#accel-config enable-wq iax1/wq1.0

```

.. note::
   IAX is an early name for IAA

- The `IAA` device index is 1, use `ls -lh /sys/bus/dsa/devices/iax*`
  command to query the `IAA` device index.

- 8 engines and 1 work queue are configured in group 0, so all compression jobs
  submitted to this work queue can be processed by all engines at the same time.

- Set work queue attributes including the work mode, work queue size and so on.

- Enable the `IAA1` device and work queue 1.0

.. note::

  Set work queue mode to shared mode, since `QPL` library only supports
  shared mode

For more detailed configuration, please refer to `IAA Configuration Samples
<https://github.com/intel/idxd-config/tree/stable/Documentation/accfg>`_

#### IAA Unit Test


- Enabling `IAA` devices for Xeon platform, please refer to `IAA User Guide
  <https://www.intel.com/content/www/us/en/content-details/780887/intel-in-memory-analytics-accelerator-intel-iaa.html>`_

- `IAA` device driver is Intel Data Accelerator Driver (idxd), it is
  recommended that the minimum version of Linux kernel is 5.18.

- Add `"intel_iommu=on,sm_on"` parameter to kernel command line
  for `SVM` feature enabling.

Here is an easy way to verify `IAA` device driver and `SVM` with `iaa_test
<https://github.com/intel/idxd-config/tree/stable/test>`_

```shell
#./test/iaa_test
 [ info] alloc wq 0 shared size 128 addr 0x7f26cebe5000 batch sz 0xfffffffe xfer sz 0x80000000
 [ info] test noop: tflags 0x1 num_desc 1
 [ info] preparing descriptor for noop
 [ info] Submitted all noop jobs
 [ info] verifying task result for 0x16f7e20
 [ info] test with op 0 passed


```

#### IAA Resources Allocation For Migration


There is no `IAA` resource configuration parameters for migration and
`accel-config` tool configuration cannot directly specify the `IAA`
resources used for migration.

The multifd migration with `QPL` compression method  will use all work
queues that are enabled and shared mode.

.. note::

  Accessing IAA resources requires `sudo` command or `root` privileges
  by default. Administrators can modify the IAA device node ownership
  so that QEMU can use IAA with specified user permissions.

  For example

  #chown -R qemu /dev/iax

## Shared Virtual Memory(SVM) Introduction


An ability for an accelerator I/O device to operate in the same virtual
memory space of applications on host processors. It also implies the
ability to operate from pageable memory, avoiding functional requirements
to pin memory for DMA operations.

When using `SVM` technology, users do not need to reserve memory for the
`IAA` device and perform pin memory operation. The `IAA` device can
directly access data using the virtual address of the process.

For more `SVM` technology, please refer to
`Shared Virtual Addressing (SVA) with ENQCMD
<https://docs.kernel.org/next/x86/sva.html>`_


## How To Use QPL Compression In Migration


1 - Installation of `QPL` library and `accel-config` library if using IAA

2 - Configure and enable `IAA` devices and work queues via `accel-config`

3 - Build `QEMU` with `--enable-qpl` parameter

  E.g. configure --target-list=x86_64-softmmu --enable-kvm `--enable-qpl`

4 - Enable `QPL` compression during migration

  Set `migrate_set_parameter multifd-compression qpl` when migrating, the
  `QPL` compression does not support configuring the compression level, it
  only supports one compression level.

## The Difference Between QPL And ZLIB


Although both `QPL` and `ZLIB` are based on the deflate compression
algorithm, and `QPL` can support the header and tail of `ZLIB`, `QPL`
is still not fully compatible with the `ZLIB` compression in the migration.

`QPL` only supports 4K history buffer, and `ZLIB` is 32K by default.
`ZLIB` compresses data that `QPL` may not decompress correctly and
vice versa.

`QPL` does not support the `Z_SYNC_FLUSH` operation in `ZLIB` streaming
compression, current `ZLIB` implementation uses `Z_SYNC_FLUSH`, so each
`multifd` thread has a `ZLIB` streaming context, and all page compression
and decompression are based on this stream. `QPL` cannot decompress such data
and vice versa.

The introduction for `Z_SYNC_FLUSH`, please refer to `Zlib Manual
<https://www.zlib.net/manual.html>`_

## The Best Practices

When user enables the IAA device for `QPL` compression, it is recommended
to add `-mem-prealloc` parameter to the destination boot parameters. This
parameter can avoid the occurrence of I/O page fault and reduce the overhead
of IAA compression and decompression.

The example of booting with `-mem-prealloc` parameter

```shell
$qemu-system-x86_64 --enable-kvm -cpu host --mem-prealloc ...


```

An example about I/O page fault measurement of destination without
`-mem-prealloc`, the `svm_prq` indicates the number of I/O page fault
occurrences and processing time.

```shell
#echo 1 > /sys/kernel/debug/iommu/intel/dmar_perf_latency
#echo 2 > /sys/kernel/debug/iommu/intel/dmar_perf_latency
#echo 3 > /sys/kernel/debug/iommu/intel/dmar_perf_latency
#echo 4 > /sys/kernel/debug/iommu/intel/dmar_perf_latency
#cat /sys/kernel/debug/iommu/intel/dmar_perf_latency
IOMMU: dmar18 Register Base Address: c87fc000
                <0.1us   0.1us-1us    1us-10us  10us-100us   100us-1ms    1ms-10ms      >=10ms     min(us)     max(us) average(us)
 inv_iotlb           0         286         123           0           0           0           0           0           1           0
inv_devtlb           0         276         133           0           0           0           0           0           2           0
   inv_iec           0           0           0           0           0           0           0           0           0           0
   svm_prq           0           0       25206         364         395           0           0           1         556           9
```

## 来源、版本与核验

- 上游：[docs/devel/migration/qpl-compression.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/migration/qpl-compression.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/devel/migration/qpl-compression.rst`；SHA-256：`7540678ca8d7b1571e8bc632cf62e01b18cc56232fd3dd405aa8bdcee611f9b4`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
