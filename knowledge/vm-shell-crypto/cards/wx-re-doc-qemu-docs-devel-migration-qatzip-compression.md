---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-devel-migration-qatzip-compression",
  "title": "QEMU：QATzip Compression",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "qatzip-compression",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f281d68f67ee524eb5ff9757e90bb174f4b316cce522d5395b94445dab073adb",
  "generatedHash": "d66e500865ce75e82ec0282858e080bdbceb0fc235b4e6a818a475b58b408939",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "QATzip Compression：QATzip Compression",
  "l1": "In scenarios with limited network bandwidth, the `QATzip` solution can help users save a lot of host CPU resources by accelerating compression and decompression through the Intel QuickAssist Technology(`QAT`) hardware. The following test was conducted using 8 multifd channels and 10Gbps network bandwidth. The results show that, compared to zstd, `QATzip` significantly saves CPU resources on the sender and reduces migration time. Compared to the uncompressed solution, `QATzip` greatly improves the dirty page processing capability, indicated by the Pages per Second metric, and also reduces the total migration time. :: VM Configuration: 16 vCPU and 64G memory VM Workload: all vCPUs are idle and 54G memory is filled with Silesia data. QAT Devices: 4 |-----------|--------|---------|----------|----------|------|------| |8 Channels |Total |down ",
  "questions": [
    "qatzip-compression 如何用于QATzip Compression？",
    "qatzip-compression 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-devel-migration-qatzip-compression",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/migration/qatzip-compression.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：QATzip Compression

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：QATzip Compression。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

QATzip Compression

## 技术正文

## QATzip Compression

In scenarios with limited network bandwidth, the `QATzip` solution can help
users save a lot of host CPU resources by accelerating compression and
decompression through the Intel QuickAssist Technology(`QAT`) hardware.


The following test was conducted using 8 multifd channels and 10Gbps network
bandwidth. The results show that, compared to zstd, `QATzip` significantly
saves CPU resources on the sender and reduces migration time. Compared to the
uncompressed solution, `QATzip` greatly improves the dirty page processing
capability, indicated by the Pages per Second metric, and also reduces the
total migration time.

::

   VM Configuration: 16 vCPU and 64G memory
   VM Workload: all vCPUs are idle and 54G memory is filled with Silesia data.
   QAT Devices: 4
   |-----------|--------|---------|----------|----------|------|------|
   |8 Channels |Total   |down     |throughput|pages per | send | recv |
   |           |time(ms)|time(ms) |(mbps)    |second    | cpu %| cpu% |
   |-----------|--------|---------|----------|----------|------|------|
   |qatzip     |   16630|       28|     10467|   2940235|   160|   360|
   |-----------|--------|---------|----------|----------|------|------|
   |zstd       |   20165|       24|      8579|   2391465|   810|   340|
   |-----------|--------|---------|----------|----------|------|------|
   |none       |   46063|       40|     10848|    330240|    45|    85|
   |-----------|--------|---------|----------|----------|------|------|


## QATzip Compression Framework


`QATzip` is a user space library which builds on top of the Intel QuickAssist
Technology to provide extended accelerated compression and decompression
services.

For more `QATzip` introduction, please refer to `QATzip Introduction
<https://github.com/intel/QATzip?tab=readme-ov-file#introductionl>`_

::

  +----------------+
  | MultiFd Thread |
  +-------+--------+
          |
          | compress/decompress
  +-------+--------+
  | QATzip library |
  +-------+--------+
          |
  +-------+--------+
  |  QAT library   |
  +-------+--------+
          |         user space
  --------+---------------------
          |         kernel space
   +------+-------+
   |  QAT  Driver |
   +------+-------+
          |
   +------+-------+
   | QAT Devices  |
   +--------------+


### QATzip Installation


The `QATzip` installation package has been integrated into some Linux
distributions and can be installed directly. For example, the Ubuntu Server
24.04 LTS system can be installed using below command

```shell
#apt search qatzip
libqatzip-dev/noble 1.2.0-0ubuntu3 amd64
  Intel QuickAssist user space library development files

libqatzip3/noble 1.2.0-0ubuntu3 amd64
  Intel QuickAssist user space library

qatzip/noble,now 1.2.0-0ubuntu3 amd64 [installed]
  Compression user-space tool for Intel QuickAssist Technology

#sudo apt install libqatzip-dev libqatzip3 qatzip

```

If your system does not support the `QATzip` installation package, you can
use the source code to build and install, please refer to `QATzip source code installation
<https://github.com/intel/QATzip?tab=readme-ov-file#build-intel-quickassist-technology-driver>`_

### QAT Hardware Deployment


`QAT` supports physical functions(PFs) and virtual functions(VFs) for
deployment, and users can configure `QAT` resources for migration according
to actual needs. For more details about `QAT` deployment, please refer to
`Intel QuickAssist Technology Documentation
<https://intel.github.io/quickassist/index.html>`_

For more `QAT` hardware introduction, please refer to `intel-quick-assist-technology-overview
<https://www.intel.com/content/www/us/en/architecture-and-technology/intel-quick-assist-technology-overview.html>`_

## How To Use QATzip Compression


1 - Install `QATzip` library

2 - Build `QEMU` with `--enable-qatzip` parameter

  E.g. configure --target-list=x86_64-softmmu --enable-kvm `--enable-qatzip`

3 - Set `migrate_set_parameter multifd-compression qatzip`

4 - Set `migrate_set_parameter multifd-qatzip-level comp_level`, the default
comp_level value is 1, and it supports levels from 1 to 9

## QAT Memory Requirements


The user needs to reserve system memory for the QAT memory management to
allocate DMA memory. The size of the reserved system memory depends on the
number of devices used for migration and the number of multifd channels.

Because memory usage depends on QAT configuration, please refer to `QAT Memory
Driver Queries
<https://intel.github.io/quickassist/PG/infrastructure_debugability.html?highlight=memory>`_
for memory usage calculation.

> 原文 RST 指令（依赖上游工程，未展开）：`.. list-table:: An example of a PF used for migration`
  :header-rows: 1

  * - Number of channels
    - Sender memory usage
    - Receiver memory usage
  * - 2
    - 10M
    - 10M
  * - 4
    - 12M
    - 14M
  * - 8
    - 16M
    - 20M

## How To Choose Between QATzip and QPL

Starting from 4th Gen Intel Xeon Scalable processors, codenamed Sapphire Rapids
processor(`SPR`), multiple built-in accelerators are supported including
`QAT` and `IAA`.  The former can accelerate `QATzip` and the latter is
used to accelerate `QPL`.

Here are some suggestions:

1 - If the live migration scenario is limited by network bandwidth and `QAT`
hardware resources exceed `IAA`, use the `QATzip` method, which can save a
lot of host CPU resources for compression.

2 - If the system cannot support shared virtual memory (SVM) technology, use
the `QATzip` method because `QPL` performance is not good without SVM
support.

3 - For other scenarios, use the `QPL` method first.

## 来源、版本与核验

- 上游：[docs/devel/migration/qatzip-compression.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/migration/qatzip-compression.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/devel/migration/qatzip-compression.rst`；SHA-256：`f281d68f67ee524eb5ff9757e90bb174f4b316cce522d5395b94445dab073adb`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
