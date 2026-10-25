---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-core-api-irq-irq-affinity",
  "title": "Linux 内核：SMP IRQ 亲和性",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "core-api"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "faf7691f58ff939d89adb90f4bfed618268fde3d7f18a0a89bda6194fef120b9",
  "generatedHash": "8b2e264e998067bf20b07ac91ae484f8aeaa698b6d5ab07c7a25f7f30fa9e840",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "变更记录: :   - 作者：最初由Ingo Molnar <mingo@redhat.com>开始撰写 - 后期更新维护： Max Krasnyansky <maxk@qualcomm.com> /proc/irq/IRQ#/smp_affinity和/proc/irq/IRQ#/smp_affinity_list指定了哪些CPU能 够关联到一个给定的IR",
  "l1": "变更记录: :   - 作者：最初由Ingo Molnar <mingo@redhat.com>开始撰写 - 后期更新维护： Max Krasnyansky <maxk@qualcomm.com> /proc/irq/IRQ#/smp_affinity和/proc/irq/IRQ#/smp_affinity_list指定了哪些CPU能 够关联到一个给定的IRQ源，这两个文件包含了这些指定cpu的cpu位掩码(smp_affinity)和cpu列 表(smp_affinity_list)。它不允许关闭所有CPU， 同时如果IRQ控制器不支持中断请求亲和 (IRQ affinity)，那么所有cpu的默认值将保持不变(即关联到所有CPU). /proc/irq/default_smp_affinity指明了适用于所有非激活IRQ的默认亲和性掩码。一旦IRQ被 分配/激活，它的亲和位掩码将被设置",
  "questions": [
    "Linux 内核：SMP IRQ 亲和性的原理是什么？",
    "Linux 内核：SMP IRQ 亲和性有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-core-api-irq-irq-affinity",
      "url": "https://docs.kernel.org/translations/zh_CN/core-api/irq/irq-affinity.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：SMP IRQ 亲和性

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## SMP IRQ 亲和性

变更记录:
:   - 作者：最初由Ingo Molnar <[mingo@redhat.com](mailto:mingo@redhat.com)>开始撰写
    - 后期更新维护： Max Krasnyansky <[maxk@qualcomm.com](mailto:maxk@qualcomm.com)>

/proc/irq/IRQ#/smp\_affinity和/proc/irq/IRQ#/smp\_affinity\_list指定了哪些CPU能
够关联到一个给定的IRQ源，这两个文件包含了这些指定cpu的cpu位掩码(smp\_affinity)和cpu列
表(smp\_affinity\_list)。它不允许关闭所有CPU， 同时如果IRQ控制器不支持中断请求亲和
(IRQ affinity)，那么所有cpu的默认值将保持不变(即关联到所有CPU).

/proc/irq/default\_smp\_affinity指明了适用于所有非激活IRQ的默认亲和性掩码。一旦IRQ被
分配/激活，它的亲和位掩码将被设置为默认掩码。然后可以如上所述改变它。默认掩码是0xffffffff。

下面是一个先将IRQ44(eth1)限制在CPU0-3上，然后限制在CPU4-7上的例子(这是一个8CPU的SMP box)

```
[root@moon 44]# cd /proc/irq/44
[root@moon 44]# cat smp_affinity
ffffffff

[root@moon 44]# echo 0f > smp_affinity
[root@moon 44]# cat smp_affinity
0000000f
[root@moon 44]# ping -f h
PING hell (195.4.7.3): 56 data bytes
...
--- hell ping statistics ---
6029 packets transmitted, 6027 packets received, 0% packet loss
round-trip min/avg/max = 0.1/0.1/0.4 ms
[root@moon 44]# cat /proc/interrupts | grep 'CPU\|44:'
        CPU0       CPU1       CPU2       CPU3      CPU4       CPU5        CPU6       CPU7
44:       1068       1785       1785       1783         0          0           0         0    IO-APIC-level  eth1
```

从上面一行可以看出，IRQ44只传递给前四个处理器（0-3）。
现在让我们把这个IRQ限制在CPU(4-7)。

```
[root@moon 44]# echo f0 > smp_affinity
[root@moon 44]# cat smp_affinity
000000f0
[root@moon 44]# ping -f h
PING hell (195.4.7.3): 56 data bytes
..
--- hell ping statistics ---
2779 packets transmitted, 2777 packets received, 0% packet loss
round-trip min/avg/max = 0.1/0.5/585.4 ms
[root@moon 44]# cat /proc/interrupts |  'CPU\|44:'
        CPU0       CPU1       CPU2       CPU3      CPU4       CPU5        CPU6       CPU7
44:       1068       1785       1785       1783      1784       1069        1070       1069   IO-APIC-level  eth1
```

这次IRQ44只传递给最后四个处理器。
即CPU0-3的计数器没有变化。

下面是一个将相同的irq(44)限制在cpus 1024到1031的例子

```
[root@moon 44]# echo 1024-1031 > smp_affinity_list
[root@moon 44]# cat smp_affinity_list
1024-1031
```

需要注意的是，如果要用位掩码来做这件事，就需要32个为0的位掩码来追踪其相关的一个。

## 来源、版本与核验

- 来源：[SMP IRQ 亲和性](https://docs.kernel.org/translations/zh_CN/core-api/irq/irq-affinity.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/core-api/irq/irq-affinity.rst`。
