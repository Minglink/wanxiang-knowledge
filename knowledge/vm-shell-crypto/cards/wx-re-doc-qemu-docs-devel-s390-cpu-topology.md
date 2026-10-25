---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-qemu-docs-devel-s390-cpu-topology",
  "title": "QEMU：QAPI interface for S390 CPU topology",
  "type": "note",
  "tags": [
    "VM",
    "系统虚拟机",
    "QEMU",
    "底层实现",
    "s390-cpu-topology",
    "qemu"
  ],
  "project": "VM与动态翻译",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "d0dba0a04f8bc89260edab7777736d1452088a8c994534f5b4dc97cf880e766a",
  "generatedHash": "5c36818337148bf6d2726a94b81425383d31db3d3192529f1d7b2a7f08afe319",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "QAPI interface for S390 CPU topology：QAPI interface for S390 CPU topology",
  "l1": "The following sections will explain the QAPI interface for S390 CPU topology with the help of exemplary output. For this, let's assume that QEMU has been started with the following command, defining 4 CPUs, where CPU[0] is defined by the -smp argument and will have default values: ```bash qemu-system-s390x \\ -enable-kvm \\ -cpu z14,ctop=on \\ -smp 1,drawers=3,books=3,sockets=2,cores=2,maxcpus=36 \\ -device z14-s390x-cpu,core-id=19,entitlement=high \\ -device z14-s390x-cpu,core-id=11,entitlement=low \\ -device z14-s390x-cpu,core-id=12,entitlement=high \\ ... ``` The command query-cpus-fast allows querying the topology tree and modifiers for all configured vCPUs. ```QMP { \"execute\": \"query-cpus-fast\" } { \"return\": [ { \"dedicated\": false, \"thread-id\": 536993, \"props\": { \"core-id\": 0, \"socket-id\": 0, \"drawer-id\": 0, \"book-id\": 0 }, \"cpu-state\": \"op",
  "questions": [
    "s390-cpu-topology 如何用于QAPI interface for S390 CPU topology？",
    "s390-cpu-topology 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-qemu-docs-devel-s390-cpu-topology",
      "url": "https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/s390-cpu-topology.rst",
      "checkedAt": "2026-10-25",
      "version": "v10.0.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）"
}
---
# QEMU：QAPI interface for S390 CPU topology

> 本文收录 QEMU 的独立技术文献正文，固定标签 `v10.0.0`。主题：QAPI interface for S390 CPU topology。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

QAPI interface for S390 CPU topology

## 技术正文

## QAPI interface for S390 CPU topology


The following sections will explain the QAPI interface for S390 CPU topology
with the help of exemplary output.
For this, let's assume that QEMU has been started with the following
command, defining 4 CPUs, where CPU[0] is defined by the -smp argument and will
have default values:

```bash
qemu-system-s390x \
   -enable-kvm \
   -cpu z14,ctop=on \
   -smp 1,drawers=3,books=3,sockets=2,cores=2,maxcpus=36 \
   -device z14-s390x-cpu,core-id=19,entitlement=high \
   -device z14-s390x-cpu,core-id=11,entitlement=low \
   -device z14-s390x-cpu,core-id=12,entitlement=high \
  ...

```

### Additions to query-cpus-fast


The command query-cpus-fast allows querying the topology tree and
modifiers for all configured vCPUs.

```QMP
{ "execute": "query-cpus-fast" }
{
 "return": [
   {
     "dedicated": false,
     "thread-id": 536993,
     "props": {
       "core-id": 0,
       "socket-id": 0,
       "drawer-id": 0,
       "book-id": 0
     },
     "cpu-state": "operating",
     "entitlement": "medium",
     "qom-path": "/machine/unattached/device[0]",
     "cpu-index": 0,
     "target": "s390x"
   },
   {
     "dedicated": false,
     "thread-id": 537003,
     "props": {
       "core-id": 19,
       "socket-id": 1,
       "drawer-id": 0,
       "book-id": 2
     },
     "cpu-state": "operating",
     "entitlement": "high",
     "qom-path": "/machine/peripheral-anon/device[0]",
     "cpu-index": 19,
     "target": "s390x"
   },
   {
     "dedicated": false,
     "thread-id": 537004,
     "props": {
       "core-id": 11,
       "socket-id": 1,
       "drawer-id": 0,
       "book-id": 1
     },
     "cpu-state": "operating",
     "entitlement": "low",
     "qom-path": "/machine/peripheral-anon/device[1]",
     "cpu-index": 11,
     "target": "s390x"
   },
   {
     "dedicated": true,
     "thread-id": 537005,
     "props": {
       "core-id": 12,
       "socket-id": 0,
       "drawer-id": 3,
       "book-id": 2
     },
     "cpu-state": "operating",
     "entitlement": "high",
     "qom-path": "/machine/peripheral-anon/device[2]",
     "cpu-index": 12,
     "target": "s390x"
   }
 ]
}


```

### QAPI command: set-cpu-topology


The command set-cpu-topology allows modifying the topology tree
or the topology modifiers of a vCPU in the configuration.

```QMP
{ "execute": "set-cpu-topology",
  "arguments": {
     "core-id": 11,
     "socket-id": 0,
     "book-id": 0,
     "drawer-id": 0,
     "entitlement": "low",
     "dedicated": false
  }
}
{"return": {}}

```

The core-id parameter is the only mandatory parameter and every
unspecified parameter keeps its previous value.

### QAPI event CPU_POLARIZATION_CHANGE


When a guest requests a modification of the polarization,
QEMU sends a CPU_POLARIZATION_CHANGE event.

When requesting the change, the guest only specifies horizontal or
vertical polarization.
It is the job of the entity administrating QEMU to set the dedication and fine
grained vertical entitlement in response to this event.

Note that a vertical polarized dedicated vCPU can only have a high
entitlement, giving 6 possibilities for vCPU polarization:

- Horizontal
- Horizontal dedicated
- Vertical low
- Vertical medium
- Vertical high
- Vertical high dedicated

Example of the event received when the guest issues the CPU instruction
Perform Topology Function PTF(0) to request an horizontal polarization:

```QMP
{
  "timestamp": {
    "seconds": 1687870305,
    "microseconds": 566299
  },
  "event": "CPU_POLARIZATION_CHANGE",
  "data": {
    "polarization": "horizontal"
  }
}

```

### QAPI query command: query-s390x-cpu-polarization


The query command query-s390x-cpu-polarization returns the current
CPU polarization of the machine.
In this case the guest previously issued a PTF(1) to request vertical polarization:

```QMP
{ "execute": "query-s390x-cpu-polarization" }
{
    "return": {
      "polarization": "vertical"
    }
}
```

## 来源、版本与核验

- 上游：[docs/devel/s390-cpu-topology.rst](https://github.com/qemu/qemu/blob/v10.0.0/docs/devel/s390-cpu-topology.rst)
- 作者：qemu/qemu 项目贡献者，原文内具体署名保留。
- 标签：v10.0.0；树标识：7c949c53e936aa3a658d84ab53bae5cadaa5d59c；获取日期：2026-10-25。
- 许可：GPL-2.0-or-later（QEMU仓库默认；文件单独声明优先）；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/qemu/docs/devel/s390-cpu-topology.rst`；SHA-256：`d0dba0a04f8bc89260edab7777736d1452088a8c994534f5b4dc97cf880e766a`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
