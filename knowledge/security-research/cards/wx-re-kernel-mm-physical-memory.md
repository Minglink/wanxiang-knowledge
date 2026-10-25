---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-mm-physical-memory",
  "title": "Linux 内核：物理内存",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "mm"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "5001e3e9cba493f6f9bbef3f7a32113350224b7f2c566a8f2c9d99c79a59d63e",
  "generatedHash": "41a42bfbb610f7caa1ab1c9255fbd1df87f442c4bc182a7e83c8150de5a05133",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "Linux可用于多种架构，因此需要一个与架构无关的抽象来表示物理内存。本章描述 了管理运行系统中物理内存的结构。 第一个与内存管理相关的主要概念是 非一致性内存访问(NUMA) <https://en.wikipedia.org/wiki/Non-uniform_memory_access> 在多核和多插槽机器中，内存可能被组织成不同的存储区，这些存储区根据",
  "l1": "Linux可用于多种架构，因此需要一个与架构无关的抽象来表示物理内存。本章描述 了管理运行系统中物理内存的结构。 第一个与内存管理相关的主要概念是 非一致性内存访问(NUMA) <https://en.wikipedia.org/wiki/Non-uniform_memory_access> 在多核和多插槽机器中，内存可能被组织成不同的存储区，这些存储区根据与处理器 的距离“不同”而有不同的访问开销。例如，可能为每个CPU分配内存存储区，或者为 外围设备在附近分配一个非常适合DMA的内存存储区。 每个存储区被称为一个节点，节点在Linux中表示为 struct pglist_data， 即使是在UMA架构中也是这样表示。该结构总是通过 pg_data_t 来引用。特 定节点的 pg_data_t 结构体可以通过NODE_DATA(nid)引用，其中nid被称 为该节点的ID。 对于非一致性",
  "questions": [
    "Linux 内核：物理内存的原理是什么？",
    "Linux 内核：物理内存有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-mm-physical-memory",
      "url": "https://docs.kernel.org/translations/zh_CN/mm/physical_memory.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：物理内存

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 物理内存

Linux可用于多种架构，因此需要一个与架构无关的抽象来表示物理内存。本章描述
了管理运行系统中物理内存的结构。

第一个与内存管理相关的主要概念是 非一致性内存访问(NUMA)
<https://en.wikipedia.org/wiki/Non-uniform\_memory\_access>

在多核和多插槽机器中，内存可能被组织成不同的存储区，这些存储区根据与处理器
的距离“不同”而有不同的访问开销。例如，可能为每个CPU分配内存存储区，或者为
外围设备在附近分配一个非常适合DMA的内存存储区。

每个存储区被称为一个节点，节点在Linux中表示为 struct pglist\_data，
即使是在UMA架构中也是这样表示。该结构总是通过 pg\_data\_t 来引用。特
定节点的 pg\_data\_t 结构体可以通过NODE\_DATA(nid)引用，其中nid被称
为该节点的ID。

对于非一致性内存访问（NUMA）架构，节点数据结构在引导时由特定于架构的代码早
期分配。通常，这些结构在其所在的内存区上本地分配。对于一致性内存访问（UMA）
架构，只使用一个静态的 pg\_data\_t 结构体，称为 contig\_page\_data。
节点将会在 节点 章节中进一步讨论。

整个物理内存被划分为一个或多个被称为区域的块，这些区域表示内存的范围。这
些范围通常由访问内存的架构限制来决定。在节点内，与特定区域对应的内存范围
由 struct zone 结构体描述，该结构被定义为 zone\_t，每种区域都
属于以下描述类型的一种。

- ZONE\_DMA 和 ZONE\_DMA32 在历史上代表适用于DMA的内存，这些
  内存由那些不能访问所有可寻址内存的外设访问。多年来，已经有了更好、更稳
  固的接口来获取满足特定DMA需求的内存（这些接口由
  Documentation/core-api/dma-api.rst 文档描述），但是 ZONE\_DMA
  和 ZONE\_DMA32 仍然表示访问受限的内存范围。

取决于架构的不同，这两种区域可以在构建时通过关闭 CONFIG\_ZONE\_DMA 和
CONFIG\_ZONE\_DMA32 配置选项来禁用。一些64位的平台可能需要这两种区域，
因为他们支持具有不同DMA寻址限制的外设。

- ZONE\_NORMAL 是普通内存的区域，这种内存可以被内核随时访问。如果DMA
  设备支持将数据传输到所有可寻址的内存区域，那么可在该区域的页面上执行DMA
  操作。ZONE\_NORMAL 总是开启的。
- ZONE\_HIGHMEM 是指那些没有在内核页表中永久映射的物理内存部分。该区
  域的内存只能通过临时映射被内核访问。该区域只在某些32位架构上可用，并且是
  通过 CONFIG\_HIGHMEM 选项开启。
- ZONE\_MOVABLE 是指可访问的普通内存区域，就像 ZONE\_NORMAL
  一样。不同之处在于 ZONE\_MOVABLE 中的大多数页面内容是可移动的。
  这意味着这些页面的虚拟地址不会改变，但它们的内容可能会在不同的物理页面
  之间移动。通常，在内存热插拔期间填充 ZONE\_MOVABLE，在启动时也可
  以使用 kernelcore、movablecore 和 movable\_node
  这些内核命令行参数来填充。更多详细信息，请参阅内核文档
  Documentation/mm/page\_migration.rst 和
  Documentation/admin-guide/mm/memory-hotplug.rst。
- ZONE\_DEVICE 表示位于持久性内存（PMEM）和图形处理单元（GPU）
  等设备上的内存。它与RAM区域类型有不同的特性，并且它的存在是为了提供
  struct page 结构和内存映射服务，以便设备驱动程序能
  识别物理地址范围。ZONE\_DEVICE 通过 CONFIG\_ZONE\_DEVICE
  选项开启。

需要注意的是，许多内核操作只能使用 ZONE\_NORMAL 来执行，因此它是
性能最关键区域。区域在 区域 章节中有更详细的讨论。

节点和区域范围之间的关系由固件报告的物理内存映射决定，另外也由内存寻址
的架构约束以及内核命令行中的某些参数决定。

例如，在具有2GB RAM的x86统一内存架构（UMA）机器上运行32位内核时，整
个内存将位于节点0，并且将有三个区域： ZONE\_DMA、 ZONE\_NORMAL
和 ZONE\_HIGHMEM:

```
0                                                            2G
+-------------------------------------------------------------+
|                            node 0                           |
+-------------------------------------------------------------+

0         16M                    896M                        2G
+----------+-----------------------+--------------------------+
| ZONE_DMA |      ZONE_NORMAL      |       ZONE_HIGHMEM       |
+----------+-----------------------+--------------------------+
```

在内核构建时关闭 ZONE\_DMA 开启 ZONE\_DMA32，并且具有16GB
RAM平均分配在两个节点上的arm64机器上，使用 movablecore=80% 参数
启动时，ZONE\_DMA32、ZONE\_NORMAL 和 ZONE\_MOVABLE
位于节点0，而 ZONE\_NORMAL 和 ZONE\_MOVABLE 位于节点1:

```
1G                                9G                         17G
 +--------------------------------+ +--------------------------+
 |              node 0            | |          node 1          |
 +--------------------------------+ +--------------------------+

 1G       4G        4200M          9G          9320M          17G
 +---------+----------+-----------+ +------------+-------------+
 |  DMA32  |  NORMAL  |  MOVABLE  | |   NORMAL   |   MOVABLE   |
 +---------+----------+-----------+ +------------+-------------+
```

内存存储区可能位于交错的节点。在下面的例子中，一台x86机器有16GB的RAM分
布在4个内存存储区上，偶数编号的内存存储区属于节点0，奇数编号的内存条属于
节点1:

```
0              4G              8G             12G            16G
+-------------+ +-------------+ +-------------+ +-------------+
|    node 0   | |    node 1   | |    node 0   | |    node 1   |
+-------------+ +-------------+ +-------------+ +-------------+

0   16M      4G
+-----+-------+ +-------------+ +-------------+ +-------------+
| DMA | DMA32 | |    NORMAL   | |    NORMAL   | |    NORMAL   |
+-----+-------+ +-------------+ +-------------+ +-------------+
```

在这种情况下，节点0将覆盖从0到12GB的内存范围，而节点1将覆盖从4GB到16GB
的内存范围。

### 节点

正如我们所提到的，内存中的每个节点由 pg\_data\_t 描述，通过
struct pglist\_data 结构体的类型定义。在分配页面时，默认情况下，Linux
使用节点本地分配策略，从离当前运行CPU的最近节点分配内存。由于进程倾向于在同
一个CPU上运行，很可能会使用当前节点的内存。分配策略可以由用户控制，如内核文
档 Documentation/admin-guide/mm/numa\_memory\_policy.rst 中所述。

大多数NUMA（非统一内存访问）架构维护了一个指向节点结构的指针数组。这些实际
的结构在启动过程中的早期被分配，这时特定于架构的代码解析了固件报告的物理内
存映射。节点初始化的大部分工作是在由free\_area\_init()实现的启动过程之后
完成，该函数在后面的小节 初始化 中有详细描述。

除了节点结构，内核还维护了一个名为 node\_states 的 nodemask\_t
位掩码数组。这个数组中的每个位掩码代表一组特定属性的节点，这些属性由
enum node\_states 定义，定义如下：

N\_POSSIBLE
节点可能在某个时刻上线。

N\_ONLINE
节点已经上线。

N\_NORMAL\_MEMORY
节点拥有普通内存。

N\_HIGH\_MEMORY
节点拥有普通或高端内存。当关闭 CONFIG\_HIGHMEM 配置时，
也可以称为 N\_NORMAL\_MEMORY。

N\_MEMORY
节点拥有（普通、高端、可移动）内存。

N\_CPU
节点拥有一个或多个CPU。

对于具有上述属性的每个节点，node\_states[<property>]
掩码中对应于节点ID的位会被置位。

例如，对于具有常规内存和CPU的节点2，第二个bit将被设置:

```
node_states[N_POSSIBLE]
node_states[N_ONLINE]
node_states[N_NORMAL_MEMORY]
node_states[N_HIGH_MEMORY]
node_states[N_MEMORY]
node_states[N_CPU]
```

有关使用节点掩码（nodemasks）可能进行的各种操作，请参考
include/linux/nodemask.h。

除此之外，节点掩码（nodemasks）提供用于遍历节点的宏，即
for\_each\_node() 和 for\_each\_online\_node()。

例如，要为每个在线节点调用函数 foo()，可以这样操作:

```
for_each_online_node(nid) {
              pg_data_t *pgdat = NODE_DATA(nid);

              foo(pgdat);
      }
```

#### 节点数据结构

节点结构 struct pglist\_data 在 include/linux/mmzone.h
中声明。这里我们将简要描述这个结构体的字段：

##### 通用字段

node\_zones
表示该节点的区域列表。并非所有区域都可能被填充，但这是
完整的列表。它被该节点的node\_zonelists以及其它节点的
node\_zonelists引用。

node\_zonelists
表示所有节点中所有区域的列表。此列表定义了分配内存时首选的区域
顺序。node\_zonelists 在核心内存管理结构初始化期间，
由 mm/page\_alloc.c 中的 build\_zonelists()
函数设置。

nr\_zones
表示此节点中已填充区域的数量。

node\_mem\_map
对于使用FLATMEM内存模型的UMA系统，0号节点的 node\_mem\_map
表示每个物理帧的struct pages数组。

node\_page\_ext
对于使用FLATMEM内存模型的UMA系统，0号节点的 node\_page\_ext
是struct pages的扩展数组。只有在构建时开启了 CONFIG\_PAGE\_EXTENSION
选项的内核中才可用。

node\_start\_pfn
表示此节点中起始页面帧的页面帧号。

node\_present\_pages
表示此节点中存在的物理页面的总数。

node\_spanned\_pages
表示包括空洞在内的物理页面范围的总大小。

node\_size\_lock
一个保护定义节点范围字段的锁。仅在开启了 CONFIG\_MEMORY\_HOTPLUG 或
CONFIG\_DEFERRED\_STRUCT\_PAGE\_INIT 配置选项中的某一个时才定义。提
供了 pgdat\_resize\_lock() 和 pgdat\_resize\_unlock() 用来操作
node\_size\_lock，而无需检查 CONFIG\_MEMORY\_HOTPLUG 或
CONFIG\_DEFERRED\_STRUCT\_PAGE\_INIT 选项。

node\_id
节点的节点ID（NID），从0开始。

totalreserve\_pages
这是每个节点保留的页面，这些页面不可用于用户空间分配。

first\_deferred\_pfn
如果大型机器上的内存初始化被推迟，那么第一个PFN（页帧号）是需要初始化的。
在开启了 CONFIG\_DEFERRED\_STRUCT\_PAGE\_INIT 选项时定义。

deferred\_split\_queue
每个节点的大页队列，这些大页的拆分被推迟了。仅在开启了 CONFIG\_TRANSPARENT\_HUGEPAGE
配置选项时定义。

\_\_lruvec
每个节点的lruvec持有LRU（最近最少使用）列表和相关参数。仅在禁用了内存
控制组（cgroups）时使用。它不应该直接访问，而应该使用 mem\_cgroup\_lruvec()
来查找lruvecs。

##### 回收控制

另见内核文档 Documentation/mm/page\_reclaim.rst 文件。

kswapd
每个节点的kswapd内核线程实例。

kswapd\_wait, pfmemalloc\_wait, reclaim\_wait
同步内存回收任务的工作队列。

nr\_writeback\_throttled
等待写回脏页时，被限制的任务数量。

kswapd\_order
控制kswapd尝试回收的order。

kswapd\_highest\_zoneidx
kswapd线程可以回收的最高区域索引。

kswapd\_failures
kswapd无法回收任何页面的运行次数。

min\_unmapped\_pages
无法回收的未映射文件支持的最小页面数量。由 vm.min\_unmapped\_ratio
系统控制台（sysctl）参数决定。在开启 CONFIG\_NUMA 配置时定义。

min\_slab\_pages
无法回收的SLAB页面的最少数量。由 vm.min\_slab\_ratio 系统控制台
（sysctl）参数决定。在开启 CONFIG\_NUMA 时定义。

flags
控制回收行为的标志位。

##### 内存压缩控制

kcompactd\_max\_order
kcompactd应尝试实现的页面order。

kcompactd\_highest\_zoneidx
kcompactd可以压缩的最高区域索引。

kcompactd\_wait
同步内存压缩任务的工作队列。

kcompactd
每个节点的kcompactd内核线程实例。

proactive\_compact\_trigger
决定是否使用主动压缩。由 vm.compaction\_proactiveness 系统控
制台（sysctl）参数控制。

##### 统计信息

per\_cpu\_nodestats
表示节点的Per-CPU虚拟内存统计信息。

vm\_stat
表示节点的虚拟内存统计数据。

### 区域

Stub

本节内容不完整。请列出并描述相应的字段。

### 页

Stub

本节内容不完整。请列出并描述相应的字段。

### 页码

Stub

本节内容不完整。请列出并描述相应的字段。

### 初始化

Stub

本节内容不完整。请列出并描述相应的字段。

## 来源、版本与核验

- 来源：[物理内存](https://docs.kernel.org/translations/zh_CN/mm/physical_memory.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/mm/physical_memory.rst`。
