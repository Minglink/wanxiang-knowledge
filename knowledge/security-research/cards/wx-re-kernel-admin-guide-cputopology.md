---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-admin-guide-cputopology",
  "title": "Linux 内核：如何通过sysfs将CPU拓扑导出",
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
  "snapshotHash": "f3daa5392c3742de5647cc7065b10cd633f0af001cdcf685bb45312899b65689",
  "generatedHash": "cf84c4c06a05af4040893b358b109d009e28991b0afd29981b334dcbcc871ec1",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "CPU拓扑信息通过sysfs导出。显示的项（属性）和某些架构的/proc/cpuinfo输出相似。它们位于 /sys/devices/system/cpu/cpuX/topology/。请阅读ABI文件： Documentation/ABI/stable/sysfs-devices-system-cpu。 drivers/base/topology.c是体系",
  "l1": "CPU拓扑信息通过sysfs导出。显示的项（属性）和某些架构的/proc/cpuinfo输出相似。它们位于 /sys/devices/system/cpu/cpuX/topology/。请阅读ABI文件： Documentation/ABI/stable/sysfs-devices-system-cpu。 drivers/base/topology.c是体系结构中性的，它导出了这些属性。然而，die、cluster、book、 draw这些层次结构相关的文件仅在体系结构提供了下文描述的宏的条件下被创建。 对于支持这个特性的体系结构，它必须在include/asm-XXX/topology.h中定义这些宏中的一部分: **_id macros 的类型是int。 **_cpumask macros 的类型是 (const) struct cpumask * 。后者和恰当的 **_sibling",
  "questions": [
    "Linux 内核：如何通过sysfs将CPU拓扑导出的原理是什么？",
    "Linux 内核：如何通过sysfs将CPU拓扑导出有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-admin-guide-cputopology",
      "url": "https://docs.kernel.org/translations/zh_CN/admin-guide/cputopology.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：如何通过sysfs将CPU拓扑导出

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 如何通过sysfs将CPU拓扑导出

CPU拓扑信息通过sysfs导出。显示的项（属性）和某些架构的/proc/cpuinfo输出相似。它们位于
/sys/devices/system/cpu/cpuX/topology/。请阅读ABI文件：
Documentation/ABI/stable/sysfs-devices-system-cpu。

drivers/base/topology.c是体系结构中性的，它导出了这些属性。然而，die、cluster、book、
draw这些层次结构相关的文件仅在体系结构提供了下文描述的宏的条件下被创建。

对于支持这个特性的体系结构，它必须在include/asm-XXX/topology.h中定义这些宏中的一部分:

```
#define topology_physical_package_id(cpu)
#define topology_die_id(cpu)
#define topology_cluster_id(cpu)
#define topology_core_id(cpu)
#define topology_book_id(cpu)
#define topology_drawer_id(cpu)
#define topology_sibling_cpumask(cpu)
#define topology_core_cpumask(cpu)
#define topology_cluster_cpumask(cpu)
#define topology_die_cpumask(cpu)
#define topology_book_cpumask(cpu)
#define topology_drawer_cpumask(cpu)
```

\*\*\_id macros 的类型是int。
\*\*\_cpumask macros 的类型是 (const) struct cpumask \* 。后者和恰当的
\*\*\_siblings sysfs属性对应（除了topology\_sibling\_cpumask()，它和thread\_siblings
对应）。

为了在所有体系结构上保持一致，include/linux/topology.h提供了上述所有宏的默认定义，以防
它们未在include/asm-XXX/topology.h中定义:

1. topology\_physical\_package\_id: -1
2. topology\_die\_id: -1
3. topology\_cluster\_id: -1
4. topology\_core\_id: 0
5. topology\_book\_id: -1
6. topology\_drawer\_id: -1
7. topology\_sibling\_cpumask: 仅入参CPU
8. topology\_core\_cpumask: 仅入参CPU
9. topology\_cluster\_cpumask: 仅入参CPU
10. topology\_die\_cpumask: 仅入参CPU
11. topology\_book\_cpumask: 仅入参CPU
12. topology\_drawer\_cpumask: 仅入参CPU

此外，CPU拓扑信息由/sys/devices/system/cpu提供，包含下述文件。输出对应的内部数据源放在
方括号（"[]"）中。

> |  |  |
> | --- | --- |
> | kernel\_max: | 内核配置允许的最大CPU下标值。[NR\_CPUS-1] |
> | offline: | 由于热插拔移除或者超过内核允许的CPU上限（上文描述的kernel\_max） 导致未上线的CPU。[~cpu\_online\_mask + cpus >= NR\_CPUS] |
> | online: | 在线的CPU，可供调度使用。[cpu\_online\_mask] |
> | possible: | 已被分配资源的CPU，如果它们CPU实际存在，可以上线。 [cpu\_possible\_mask] |
> | present: | 被系统识别实际存在的CPU。[cpu\_present\_mask] |

上述输出的格式和cpulist\_parse()兼容[参见 <linux/cpumask.h>]。下面给些例子。

在本例中，系统中有64个CPU，但是CPU 32-63超过了kernel\_max值，因为NR\_CPUS配置项是32，
取值范围被限制为0..31。此外注意CPU2和4-31未上线，但是可以上线，因为它们同时存在于
present和possible:

```
kernel_max: 31
   offline: 2,4-31,32-63
    online: 0-1,3
  possible: 0-31
   present: 0-31
```

在本例中，NR\_CPUS配置项是128，但内核启动时设置possible\_cpus=144。系统中有4个CPU，
CPU2被手动设置下线（也是唯一一个可以上线的CPU）:

```
kernel_max: 127
   offline: 2,4-127,128-143
    online: 0-1,3
  possible: 0-127
   present: 0-3
```

阅读Documentation/core-api/cpu\_hotplug.rst可了解开机参数possible\_cpus=NUM，同时还
可以了解各种cpumask的信息。

## 来源、版本与核验

- 来源：[如何通过sysfs将CPU拓扑导出](https://docs.kernel.org/translations/zh_CN/admin-guide/cputopology.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/admin-guide/cputopology.rst`。
