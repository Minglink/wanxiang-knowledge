---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-admin-guide-mm-damon-reclaim",
  "title": "Linux 内核：基于DAMON的回收",
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
  "snapshotHash": "280ff3535a24cea3c501d14f1d52bba0f15ebe9693a246b15f332427fe455541",
  "generatedHash": "93d191f908711e3f01917a00123c9f1f0fff13c5a854902bd71534a4d9d4dd38",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "基于DAMON的回收（DAMON_RECLAIM）是一个静态的内核模块，旨在用于轻度内存压力下的主动和轻 量级的回收。它的目的不是取代基于LRU列表的页面回收，而是有选择地用于不同程度的内存压力和要 求。 在一般的内存超量使用（over-committed systems，虚拟化相关术语）的系统上，主动回收冷页 有助于节省内存和减少延迟高峰，这些延迟是由直接",
  "l1": "基于DAMON的回收（DAMON_RECLAIM）是一个静态的内核模块，旨在用于轻度内存压力下的主动和轻 量级的回收。它的目的不是取代基于LRU列表的页面回收，而是有选择地用于不同程度的内存压力和要 求。 在一般的内存超量使用（over-committed systems，虚拟化相关术语）的系统上，主动回收冷页 有助于节省内存和减少延迟高峰，这些延迟是由直接回收进程或kswapd的CPU消耗引起的，同时只产 生最小的性能下降 [[1]](#footnote-1) [[2]](#footnote-2) 。 基于空闲页报告 [[3]](#footnote-3) 的内存过度承诺的虚拟化系统就是很好的例子。在这样的系统中，客户机 向主机报告他们的空闲内存，而主机则将报告的内存重新分配给其他客户。因此，系统的内存得到了充 分的利用。然而，客户可能不那么节省内存，主要是因为一些内核子系统和用户空间应用",
  "questions": [
    "Linux 内核：基于DAMON的回收的原理是什么？",
    "Linux 内核：基于DAMON的回收有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-admin-guide-mm-damon-reclaim",
      "url": "https://docs.kernel.org/translations/zh_CN/admin-guide/mm/damon/reclaim.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：基于DAMON的回收

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 基于DAMON的回收

基于DAMON的回收（DAMON\_RECLAIM）是一个静态的内核模块，旨在用于轻度内存压力下的主动和轻
量级的回收。它的目的不是取代基于LRU列表的页面回收，而是有选择地用于不同程度的内存压力和要
求。

### 哪些地方需要主动回收？

在一般的内存超量使用（over-committed systems，虚拟化相关术语）的系统上，主动回收冷页
有助于节省内存和减少延迟高峰，这些延迟是由直接回收进程或kswapd的CPU消耗引起的，同时只产
生最小的性能下降 [[1]](#footnote-1) [[2]](#footnote-2) 。

基于空闲页报告 [[3]](#footnote-3) 的内存过度承诺的虚拟化系统就是很好的例子。在这样的系统中，客户机
向主机报告他们的空闲内存，而主机则将报告的内存重新分配给其他客户。因此，系统的内存得到了充
分的利用。然而，客户可能不那么节省内存，主要是因为一些内核子系统和用户空间应用程序被设计为
使用尽可能多的内存。然后，客户机可能只向主机报告少量的内存是空闲的，导致系统的内存利用率下降。
在客户中运行主动回收可以缓解这个问题。

### 它是如何工作的？

DAMON\_RECLAIM找到在特定时间内没有被访问的内存区域并分页。为了避免它在分页操作中消耗过多
的CPU，可以配置一个速度限制。在这个速度限制下，它首先分页出那些没有被访问过的内存区域。系
统管理员还可以配置在什么情况下这个方案应该自动激活和停用三个内存压力水位。

### 接口: 模块参数

要使用这个功能，你首先要确保你的系统运行在一个以 CONFIG\_DAMON\_RECLAIM=y 构建的内
核上。

为了让系统管理员启用或禁用它，并为给定的系统进行调整，DAMON\_RECLAIM利用了模块参数。也就
是说，你可以把 damon\_reclaim.<parameter>=<value> 放在内核启动命令行上，或者把
适当的值写入 /sys/module/damon\_reclaim/parameters/<parameter> 文件。

下面是每个参数的描述。

#### enabled

启用或禁用DAMON\_RECLAIM。

你可以通过把这个参数的值设置为 Y 来启用DAMON\_RCLAIM，把它设置为 N 可以禁用
DAMON\_RECLAIM。注意，由于基于水位的激活条件，DAMON\_RECLAIM不能进行真正的监测和回收。
这一点请参考下面关于水位参数的描述。

#### min\_age

识别冷内存区域的时间阈值，单位是微秒。

如果一个内存区域在这个时间或更长的时间内没有被访问，DAMON\_RECLAIM会将该区域识别为冷的，
并回收它。

默认为120秒。

#### quota\_ms

回收的时间限制，以毫秒为单位。

DAMON\_RECLAIM 试图在一个时间窗口（quota\_reset\_interval\_ms）内只使用到这个时间，以
尝试回收冷页。这可以用来限制DAMON\_RECLAIM的CPU消耗。如果该值为零，则该限制被禁用。

默认为10ms。

#### quota\_sz

回收的内存大小限制，单位为字节。

DAMON\_RECLAIM 收取在一个时间窗口（quota\_reset\_interval\_ms）内试图回收的内存量，并
使其不超过这个限制。这可以用来限制CPU和IO的消耗。如果该值为零，则限制被禁用。

默认情况下是128 MiB。

#### quota\_reset\_interval\_ms

时间/大小配额收取重置间隔，单位为毫秒。

时间（quota\_ms）和大小（quota\_sz）的配额的目标重置间隔。也就是说，DAMON\_RECLAIM在
尝试回收‘不’超过quota\_ms毫秒或quota\_sz字节的内存。

默认为1秒。

#### wmarks\_interval

当DAMON\_RECLAIM被启用但由于其水位规则而不活跃时，在检查水位之前的最小等待时间。

#### wmarks\_high

高水位的可用内存率（每千字节）。

如果系统的可用内存（以每千字节为单位）高于这个数值，DAMON\_RECLAIM就会变得不活跃，所以
它什么也不做，只是定期检查水位。

#### wmarks\_mid

中间水位的可用内存率（每千字节）。

如果系统的空闲内存（以每千字节为单位）在这个和低水位线之间，DAMON\_RECLAIM就会被激活，
因此开始监测和回收。

#### wmarks\_low

低水位的可用内存率（每千字节）。

如果系统的空闲内存（以每千字节为单位）低于这个数值，DAMON\_RECLAIM就会变得不活跃，所以
它除了定期检查水位外什么都不做。在这种情况下，系统会退回到基于LRU列表的页面粒度回收逻辑。

#### sample\_interval

监测的采样间隔，单位是微秒。

DAMON用于监测冷内存的采样间隔。更多细节请参考DAMON文档 (usage) 。

#### aggr\_interval

监测的聚集间隔，单位是微秒。

DAMON对冷内存监测的聚集间隔。更多细节请参考DAMON文档 (usage)。

#### min\_nr\_regions

监测区域的最小数量。

DAMON用于冷内存监测的最小监测区域数。这可以用来设置监测质量的下限。但是，设
置的太高可能会导致监测开销的增加。更多细节请参考DAMON文档 (usage) 。

#### max\_nr\_regions

监测区域的最大数量。

DAMON用于冷内存监测的最大监测区域数。这可以用来设置监测开销的上限值。但是，
设置得太低可能会导致监测质量不好。更多细节请参考DAMON文档 (usage) 。

#### monitor\_region\_start

目标内存区域的物理地址起点。

DAMON\_RECLAIM将对其进行工作的内存区域的起始物理地址。也就是说，DAMON\_RECLAIM
将在这个区域中找到冷的内存区域并进行回收。默认情况下，该区域使用最大系统内存区。

#### monitor\_region\_end

目标内存区域的结束物理地址。

DAMON\_RECLAIM将对其进行工作的内存区域的末端物理地址。也就是说，DAMON\_RECLAIM将
在这个区域内找到冷的内存区域并进行回收。默认情况下，该区域使用最大系统内存区。

#### kdamond\_pid

DAMON线程的PID。

如果DAMON\_RECLAIM被启用，这将成为工作线程的PID。否则，为-1。

#### nr\_reclaim\_tried\_regions

试图通过DAMON\_RECLAIM回收的内存区域的数量。

#### bytes\_reclaim\_tried\_regions

试图通过DAMON\_RECLAIM回收的内存区域的总字节数。

#### nr\_reclaimed\_regions

通过DAMON\_RECLAIM成功回收的内存区域的数量。

#### bytes\_reclaimed\_regions

通过DAMON\_RECLAIM成功回收的内存区域的总字节数。

#### nr\_quota\_exceeds

超过时间/空间配额限制的次数。

### 例子

下面的运行示例命令使DAMON\_RECLAIM找到30秒或更长时间没有访问的内存区域并“回收”？
为了避免DAMON\_RECLAIM在分页操作中消耗过多的CPU时间，回收被限制在每秒1GiB以内。
它还要求DAMON\_RECLAIM在系统的可用内存率超过50%时不做任何事情，但如果它低于40%时
就开始真正的工作。如果DAMON\_RECLAIM没有取得进展，因此空闲内存率低于20%，它会要求
DAMON\_RECLAIM再次什么都不做，这样我们就可以退回到基于LRU列表的页面粒度回收了:

```
# cd /sys/module/damon_reclaim/parameters
# echo 30000000 > min_age
# echo $((1 * 1024 * 1024 * 1024)) > quota_sz
# echo 1000 > quota_reset_interval_ms
# echo 500 > wmarks_high
# echo 400 > wmarks_mid
# echo 200 > wmarks_low
# echo Y > enabled
```

[[1](#footnote-reference-1)]

<https://research.google/pubs/pub48551/>


[[2](#footnote-reference-2)]

<https://lwn.net/Articles/787611/>


[[3](#footnote-reference-3)]

<https://www.kernel.org/doc/html/latest/mm/free_page_reporting.html>

## 来源、版本与核验

- 来源：[基于DAMON的回收](https://docs.kernel.org/translations/zh_CN/admin-guide/mm/damon/reclaim.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/admin-guide/mm/damon/reclaim.rst`。
