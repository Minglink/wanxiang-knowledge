---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-filesystems-gfs2-glocks",
  "title": "Linux 内核：Glock 内部加锁规则",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "filesystems"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "8a03e41a278cc80bbbe65a8fac5f3da04823c07f999660d7f173b3cf30e8d39b",
  "generatedHash": "fb6a9b14278f742fe37482a69cd4fe1c5feca1e31693a1b2e16e76465430bd04",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "本文档阐述 glock 状态机内部运作的基本原理。每个 glock（即 fs/gfs2/incore.h 中的 struct gfs2_glock）包含两把主要的内部锁： 1. 自旋锁（gl_lockref.lock）：用于保护内部状态（如 gl_state、gl_target）和持有者列表（gl_holders） 2. 非阻塞的位锁（GLF_LOCK）：用",
  "l1": "本文档阐述 glock 状态机内部运作的基本原理。每个 glock（即 fs/gfs2/incore.h 中的 struct gfs2_glock）包含两把主要的内部锁： 1. 自旋锁（gl_lockref.lock）：用于保护内部状态（如 gl_state、gl_target）和持有者列表（gl_holders） 2. 非阻塞的位锁（GLF_LOCK）：用于防止其他线程同时调用 DLM 等操作。若某线程获取此锁，则在释放时必须调用 run_queue（通常通过工作队列），以确保所有待处理任务 得以完成。 gl_holders 列表包含与该 glock 关联的所有排队锁请求（不 仅是持有者）。若存在已持有的锁，它们将位于列表开头的连 续条目中。锁的授予严格遵循排队顺序。 glock 层用户可请求三种锁状态：共享（SH）、延迟（DF）和 排他（EX）。它们对应以下 DLM 锁模式： 因此，D",
  "questions": [
    "Linux 内核：Glock 内部加锁规则的原理是什么？",
    "Linux 内核：Glock 内部加锁规则有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-filesystems-gfs2-glocks",
      "url": "https://docs.kernel.org/translations/zh_CN/filesystems/gfs2-glocks.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：Glock 内部加锁规则

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## Glock 内部加锁规则

本文档阐述 glock 状态机内部运作的基本原理。每个 glock（即
fs/gfs2/incore.h 中的 struct gfs2\_glock）包含两把主要的内部锁：

> 1. 自旋锁（gl\_lockref.lock）：用于保护内部状态（如
>    gl\_state、gl\_target）和持有者列表（gl\_holders）
> 2. 非阻塞的位锁（GLF\_LOCK）：用于防止其他线程同时调用
>    DLM 等操作。若某线程获取此锁，则在释放时必须调用
>    run\_queue（通常通过工作队列），以确保所有待处理任务
>    得以完成。

gl\_holders 列表包含与该 glock 关联的所有排队锁请求（不
仅是持有者）。若存在已持有的锁，它们将位于列表开头的连
续条目中。锁的授予严格遵循排队顺序。

glock 层用户可请求三种锁状态：共享（SH）、延迟（DF）和
排他（EX）。它们对应以下 DLM 锁模式：

| Glock 模式 | DLM | 锁模式 |
| --- | --- | --- |
| UN | IV/NL | 未加锁（无关联的 DLM 锁）或 NL |
| SH | PR | 受保护读（Protected read） |
| DF | CW | 并发写（Concurrent write） |
| EX | EX | 排他（Exclusive） |

因此，DF 本质上是一种与“常规”共享锁模式（SH）互斥的共
享模式。在 GFS2 中，DF 模式专用于直接 I/O 操作。Glock
本质上是锁加缓存管理例程的组合，其缓存规则如下：

| Glock 模式 | 缓存元数据 | 缓存数据 | 脏数据 | 脏元数据 |
| --- | --- | --- | --- | --- |
| UN | 否 | 否 | 否 | 否 |
| DF | 是 | 否 | 否 | 否 |
| SH | 是 | 是 | 否 | 否 |
| EX | 是 | 是 | 是 | 是 |

这些规则通过为每种 glock 定义的操作函数实现。并非所有
glock 类型都使用全部的模式，例如仅 inode glock 使用 DF 模
式。

glock 操作函数及类型常量说明表：

| 字段 | 用途 |
| --- | --- |
| go\_sync | 远程状态变更前调用（如同步脏数据） |
| go\_xmote\_bh | 远程状态变更后调用（如刷新缓存） |
| go\_inval | 远程状态变更需使缓存失效时调用 |
| go\_instantiate | 获取 glock 时调用 |
| go\_held | 每次获取 glock 持有者时调用 |
| go\_dump | 为 debugfs 文件打印对象内容，或出错时将 glock 转储至日志 |
| go\_callback | 若 DLM 发送回调以释放此锁时调用 |
| go\_unlocked | 当 glock 解锁时调用（dlm\_unlock()） |
| go\_type | glock 类型，LM\_TYPE\_\* |
| go\_flags | 若 glock 关联地址空间，则设置GLOF\_ASPACE 标志 |

每种锁的最短持有时间是指在远程锁授予后忽略远程降级请求
的时间段。此举旨在防止锁在集群节点间持续弹跳而无实质进
展的情况，此现象常见于多节点写入的共享内存映射文件。通
过延迟响应远程回调的降级操作，为用户空间程序争取页面取
消映射前的处理时间。

未来计划将 glock 的 "EX" 模式设为本地共享，使本地锁通
过 i\_mutex 实现而非 glock。

glock 操作函数的加锁规则：

| 操作 | GLF\_LOCK 位锁持有 | gl\_lockref.lock 自旋锁持有 |
| --- | --- | --- |
| go\_sync | 是 | 否 |
| go\_xmote\_bh | 是 | 否 |
| go\_inval | 是 | 否 |
| go\_instantiate | 否 | 否 |
| go\_held | 否 | 否 |
| go\_dump | 有时 | 是 |
| go\_callback | 有时（N/A） | 是 |
| go\_unlocked | 是 | 否 |

Note

若入口处持有锁则操作期间不得释放位锁或自旋锁。
go\_dump 和 do\_demote\_ok 严禁阻塞。
仅当 glock 状态指示其缓存最新数据时才会调用 go\_dump。

GFS2 内部的 glock 加锁顺序：

> 1. i\_rwsem（如需要）
> 2. 重命名 glock（仅用于重命名）
> 3. Inode glock
>    （父级优先于子级，同级 inode 按锁编号排序）
> 4. Rgrp glock（用于（反）分配操作）
> 5. 事务 glock（通过 gfs2\_trans\_begin，非读操作）
> 6. i\_rw\_mutex（如需要）
> 7. 页锁（始终最后，至关重要！）

每个 inode 对应两把 glock：一把管理 inode 本身（加锁顺
序如上），另一把（称为 iopen glock）结合 inode 的
i\_nlink 字段决定 inode 生命周期。inode 加锁基于单个
inode，rgrp 加锁基于单个 rgrp。通常优先获取本地锁再获
取集群锁。

### Glock 统计

统计分为两类：超级块相关统计和单个 glock 相关统计。超级
块统计按每 CPU 执行以减少收集开销，并进一步按 glock 类
型细分。所有时间单位为纳秒。

超级块和 glock 统计收集相同信息。超级块时序统计为 glock
时序统计提供默认值，使新建 glock 具有合理的初始值。每个
glock 的计数器在创建时初始化为零，当 glock 从内存移除时
统计丢失。

统计包含三组均值/方差对及两个计数器。均值/方差对为平滑
指数估计，算法与网络代码中的往返时间计算类似（参见《
TCP/IP详解 卷1》第21.3节及《卷2》第25.10节）。与 TCP/IP
案例不同，此处均值/方差未缩放且单位为整数纳秒。

三组均值/方差对测量以下内容：

> 1. DLM 锁时间（非阻塞请求）
> 2. DLM 锁时间（阻塞请求）
> 3. 请求间隔时间（指向 DLM）

非阻塞请求指无论目标 DLM 锁处于何种状态均能立即完成的请求。
当前满足条件的请求包括：(a)锁当前状态为互斥（如锁降级）、
(b)请求状态为空置或解锁（同样如锁降级）、或(c)设置"try lock"
标志的请求。其余锁请求均属阻塞请求。

两个计数器分别统计：
:   1. 锁请求总数（决定均值/方差计算的数据量）
    2. glock 代码顶层的持有者排队数（通常远大于 DLM 锁请求数）

为什么收集这些统计数据？我们需深入分析时序参数的动因如下：

1. 更精准设置 glock "最短持有时间"
2. 快速识别性能问题
3. 改进资源组分配算法（基于锁等待时间而非盲目 "try lock"）

因平滑更新的特性，采样量的阶跃变化需经 8 次采样（方差需
4 次）才能完全体现，解析结果时需审慎考虑。

通过锁请求完成时间和 glock 平均锁请求间隔时间，可计算节
点使用 glock 时长与集群共享时长的占比，对设置锁最短持有
时间至关重要。

我们已采取严谨措施，力求精准测量目标量值。任何测量系统均
存在误差，但我期望当前方案已达到合理精度极限。

超级块状态统计路径:

```
/sys/kernel/debug/gfs2/<fsname>/sbstats
```

Glock 状态统计路径:

```
/sys/kernel/debug/gfs2/<fsname>/glstats
```

（假设 debugfs 挂载于 /sys/kernel/debug，且 <fsname> 替
换为对应 GFS2 文件系统名）

输出缩写说明：

|  |  |
| --- | --- |
| srtt | 非阻塞 DLM 请求的平滑往返时间 |
| srttvar | srtt 的方差估计 |
| srttb | （潜在）阻塞 DLM 请求的平滑往返时间 |
| srttvarb | srttb 的方差估计 |
| sirt | DLM 请求的平滑请求间隔时间 |
| sirtvar | sirt 的方差估计 |
| dlm | DLM 请求数（glstats 文件中的 dcnt） |
| queue | 排队的 glock 请求数（glstats 文件中的 qcnt） |

sbstats文件按glock类型（每种类型8行）和CPU核心（每CPU一列）
记录统计数据集。glstats文件则为每个glock提供统计集，其格式
与glocks文件类似，但所有时序统计量均采用均值/方差格式存储。

gfs2\_glock\_lock\_time 跟踪点实时输出目标 glock 的当前统计
值，并附带每次接收到的dlm响应附加信息：

|  |  |
| --- | --- |
| status | DLM 请求状态 |
| flags | DLM 请求标志 |
| tdiff | 该请求的耗时 |

（其余字段同上表）

## 来源、版本与核验

- 来源：[Glock 内部加锁规则](https://docs.kernel.org/translations/zh_CN/filesystems/gfs2-glocks.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/filesystems/gfs2-glocks.rst`。
