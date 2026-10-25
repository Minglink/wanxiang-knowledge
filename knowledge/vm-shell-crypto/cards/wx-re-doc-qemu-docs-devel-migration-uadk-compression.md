---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-devel-migration-uadk-compression",
  "title": "QEMU：User Space Accelerator Development Kit (UADK) Compression",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "uadk-compression",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "198377652a4b9e0f874a0d71ac8eeec96b4e1396695d8720966e2b38a0423d38",
  "generatedHash": "e79fab928aca86bdceda55569ebe68efa729ad97d292e82c971d2f24a563c576",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "User Space Accelerator Development Kit (UADK) Compression：User Space Accelerator Development Kit (UADK) Compression",
  "l1": "UADK is a general-purpose user space accelerator framework that uses shared virtual addressing (SVA) to provide a unified programming interface for hardware acceleration of cryptographic and compression algorithms. UADK includes Unified/User-space-access-intended Accelerator Framework (UACCE), which enables hardware accelerators from different vendors that support SVA to adapt to UADK. Currently, HiSilicon Kunpeng hardware accelerators have been registered with UACCE. Through the UADK framework, users can run cryptographic and compression algorithms using hardware accelerators instead of CPUs, freeing up CPU computing power and improving computing performance. https://github.com/Linaro/uadk/tree/master/docs UADK consists of UACCE, vendors' drivers, and an algorithm layer. UADK requires the hardware accelerator to support SVA, and the oper",
  "questions": [
    "uadk-compression 如何用于User Space Accelerator Development Kit (UADK) Compression？",
    "uadk-compression 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-devel-migration-uadk-compression",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/migration/uadk-compression.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：User Space Accelerator Development Kit (UADK) Compression

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：User Space Accelerator Development Kit (UADK) Compression。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

User Space Accelerator Development Kit (UADK) Compression

## 技术正文

## User Space Accelerator Development Kit (UADK) Compression

UADK is a general-purpose user space accelerator framework that uses shared
virtual addressing (SVA) to provide a unified programming interface for
hardware acceleration of cryptographic and compression algorithms.

UADK includes Unified/User-space-access-intended Accelerator Framework (UACCE),
which enables hardware accelerators from different vendors that support SVA to
adapt to UADK.

Currently, HiSilicon Kunpeng hardware accelerators have been registered with
UACCE. Through the UADK framework, users can run cryptographic and compression
algorithms using hardware accelerators instead of CPUs, freeing up CPU
computing power and improving computing performance.

https://github.com/Linaro/uadk/tree/master/docs

## UADK Framework

UADK consists of UACCE, vendors' drivers, and an algorithm layer. UADK requires
the hardware accelerator to support SVA, and the operating system to support
IOMMU and SVA. Hardware accelerators from different vendors are registered as
different character devices with UACCE by using kernel-mode drivers of the
vendors. A user can access the hardware accelerators by performing user-mode
operations on the character devices.

::

          +----------------------------------+
          |                apps              |
          +----+------------------------+----+
               |                        |
               |                        |
       +-------+--------+       +-------+-------+
       |   scheduler    |       | alg libraries |
       +-------+--------+       +-------+-------+
               |                         |
               |                         |
               |                         |
               |                +--------+------+
               |                | vendor drivers|
               |                +-+-------------+
               |                  |
               |                  |
            +--+------------------+--+
            |         libwd          |
### User    +----+-------------+-----+

    Kernel    +--+-----+   +------+
              | uacce  |   | smmu |
              +---+----+   +------+
                  |
              +---+------------------+
              | vendor kernel driver |
### +----------------------+

             +----------------------+
             |   HW Accelerators    |
             +----------------------+

### UADK Installation

#### Build UADK


```shell
git clone https://github.com/Linaro/uadk.git
cd uadk
mkdir build
./autogen.sh
./configure --prefix=$PWD/build
make
make install

```

Without --prefix, UADK will be installed to /usr/local/lib by default.
If get error:"cannot find -lnuma", please install the libnuma-dev

#### Run pkg-config libwd to ensure env is setup correctly


* export PKG_CONFIG_PATH=$PWD/build/lib/pkgconfig
* pkg-config libwd --cflags --libs
  -I/usr/local/include -L/usr/local/lib -lwd

* export PKG_CONFIG_PATH is required on demand.
  Not required if UADK is installed to /usr/local/lib

### UADK Host Kernel Requirements

User needs to make sure that `UACCE` is already supported in Linux kernel.
The kernel version should be at least v5.9 with SVA (Shared Virtual
Addressing) enabled.

#### Kernel Configuration


`UACCE` could be built as module or built-in.

Here's an example to enable UACCE with hardware accelerator in HiSilicon
Kunpeng platform.

*    CONFIG_IOMMU_SVA_LIB=y
*    CONFIG_ARM_SMMU=y
*    CONFIG_ARM_SMMU_V3=y
*    CONFIG_ARM_SMMU_V3_SVA=y
*    CONFIG_PCI_PASID=y
*    CONFIG_UACCE=y
*    CONFIG_CRYPTO_DEV_HISI_QM=y
*    CONFIG_CRYPTO_DEV_HISI_ZIP=y

Make sure all these above kernel configurations are selected.

### Accelerator dev node permissions

Hardware accelerators (eg: HiSilicon Kunpeng Zip accelerator) gets registered to
UADK and char devices are created in dev directory. In order to access resources
on hardware accelerator devices, write permission should be provided to user.

```shell
$ sudo chmod 777 /dev/hisi_zip-*

```

### How To Use UADK Compression In QEMU Migration

* Make sure UADK is installed as above
* Build `QEMU` with `--enable-uadk` parameter

  E.g. configure --target-list=aarch64-softmmu --enable-kvm `--enable-uadk`

* Enable `UADK` compression during migration

  Set `migrate_set_parameter multifd-compression uadk`

Since UADK uses Shared Virtual Addressing(SVA) and device access virtual memory
directly it is possible that SMMUv3 may encounter page faults while walking the
IO page tables. This may impact the performance. In order to mitigate this,
please make sure to specify `-mem-prealloc` parameter to the destination VM
boot parameters.

Though both UADK and ZLIB are based on the deflate compression algorithm, UADK
is not fully compatible with ZLIB. Hence, please make sure to use `uadk` on
both source and destination during migration.

## 来源、版本与核验

- 上游：[docs/devel/migration/uadk-compression.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/migration/uadk-compression.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/devel/migration/uadk-compression.rst`；SHA-256：`198377652a4b9e0f874a0d71ac8eeec96b4e1396695d8720966e2b38a0423d38`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
