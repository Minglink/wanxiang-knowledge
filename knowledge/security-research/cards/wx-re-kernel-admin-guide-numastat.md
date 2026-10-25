---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-admin-guide-numastat",
  "title": "Linux 内核：Numa策略命中/未命中统计",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "admin-guide"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "797feacedac81ffbf2fd02545c3614cecd4bbabe69c2c9f3b60ba350520d0d85",
  "generatedHash": "b045193d3a755f1753a7b19ebe377ebbbd752a035f7fe7878b985b331a9478ec",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "所有数据的单位都是页面。巨页有独立的计数器。 numa_hit、numa_miss和numa_foreign计数器反映了进程是否能够在他们偏好的节点上分配内存。 如果进程成功在偏好的节点上分配内存则在偏好的节点上增加numa_hit计数，否则在偏好的节点上增 加numa_foreign计数同时在实际内存分配的节点上增加numa_miss计数。 通常，偏好的节",
  "l1": "所有数据的单位都是页面。巨页有独立的计数器。 numa_hit、numa_miss和numa_foreign计数器反映了进程是否能够在他们偏好的节点上分配内存。 如果进程成功在偏好的节点上分配内存则在偏好的节点上增加numa_hit计数，否则在偏好的节点上增 加numa_foreign计数同时在实际内存分配的节点上增加numa_miss计数。 通常，偏好的节点是进程运行所在的CPU的本地节点，但是一些限制可以改变这一行为，比如内存策略， 因此同样有两个基于CPU本地节点的计数器。local_node和numa_hit类似，当在CPU所在的节点上分 配内存时增加local_node计数，other_node和numa_miss类似，当在CPU所在节点之外的其他节点 上成功分配内存时增加other_node计数。需要注意，没有和numa_foreign对应的计数器。 你可以使用numactl软",
  "questions": [
    "Linux 内核：Numa策略命中/未命中统计的原理是什么？",
    "Linux 内核：Numa策略命中/未命中统计有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-admin-guide-numastat",
      "url": "https://docs.kernel.org/translations/zh_CN/admin-guide/numastat.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：Numa策略命中/未命中统计

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## Numa策略命中/未命中统计

/sys/devices/system/node/node\*/numastat

所有数据的单位都是页面。巨页有独立的计数器。

numa\_hit、numa\_miss和numa\_foreign计数器反映了进程是否能够在他们偏好的节点上分配内存。
如果进程成功在偏好的节点上分配内存则在偏好的节点上增加numa\_hit计数，否则在偏好的节点上增
加numa\_foreign计数同时在实际内存分配的节点上增加numa\_miss计数。

通常，偏好的节点是进程运行所在的CPU的本地节点，但是一些限制可以改变这一行为，比如内存策略，
因此同样有两个基于CPU本地节点的计数器。local\_node和numa\_hit类似，当在CPU所在的节点上分
配内存时增加local\_node计数，other\_node和numa\_miss类似，当在CPU所在节点之外的其他节点
上成功分配内存时增加other\_node计数。需要注意，没有和numa\_foreign对应的计数器。

更多细节内容:

|  |  |
| --- | --- |
| numa\_hit | 一个进程想要从本节点分配内存并且成功。 |
| numa\_miss | 一个进程想要从其他节点分配内存但是最终在本节点完成内存分配。 |
| numa\_foreign | 一个进程想要在本节点分配内存但是最终在其他节点完成内存分配。 |
| local\_node | 一个进程运行在本节点的CPU上并且从本节点上获得了内存。 |
| other\_node | 一个进程运行在其他节点的CPU上但是在本节点上获得了内存。 |
| interleave\_hit | 内存交叉分配策略下想要从本节点分配内存并且成功。 |

你可以使用numactl软件包（<http://oss.sgi.com/projects/libnuma/>）中的numastat工具
来辅助阅读。需要注意，numastat工具目前只在有少量CPU的机器上运行良好。

需要注意，在包含无内存节点（一个节点有CPUs但是没有内存）的系统中numa\_hit、numa\_miss和
numa\_foreign统计数据会被严重曲解。在当前的内核实现中，如果一个进程偏好一个无内存节点（即
进程正在该节点的一个本地CPU上运行），实际上会从距离最近的有内存节点中挑选一个作为偏好节点。
结果会导致相应的内存分配不会增加无内存节点上的numa\_foreign计数器，并且会扭曲最近节点上的
numa\_hit、numa\_miss和numa\_foreign统计数据。

## 来源、版本与核验

- 来源：[Numa策略命中/未命中统计](https://docs.kernel.org/translations/zh_CN/admin-guide/numastat.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/admin-guide/numastat.rst`。
