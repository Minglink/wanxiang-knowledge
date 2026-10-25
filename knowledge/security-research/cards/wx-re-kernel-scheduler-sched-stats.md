---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-scheduler-sched-stats",
  "title": "Linux 内核：调度器统计数据",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "scheduler"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "6fc4b2e0b87e334857244145a5a48b72e280a729472f52f897c8c85aa4460282",
  "generatedHash": "ed05306b6f801afe570ef13ae498997972d008518f74a0f08bc004eb960df074",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "第15版schedstats去掉了sched_yield的一些计数器：yld_exp_empty，yld_act_empty 和yld_both_empty。在其它方面和第14版完全相同。 第14版schedstats包括对sched_domains（译注：调度域）的支持，该特性进入内核 主线2.6.20，不过这一版schedstats与2.6.13-2.6",
  "l1": "第15版schedstats去掉了sched_yield的一些计数器：yld_exp_empty，yld_act_empty 和yld_both_empty。在其它方面和第14版完全相同。 第14版schedstats包括对sched_domains（译注：调度域）的支持，该特性进入内核 主线2.6.20，不过这一版schedstats与2.6.13-2.6.19内核的版本12的统计数据是完全 相同的（内核未发布第13版）。有些计数器按每个运行队列统计是更有意义的，其它则 按每个调度域统计是更有意义的。注意，调度域（以及它们的附属信息）仅在开启 CONFIG_SMP的机器上是相关的和可用的。 在第14版schedstat中，每个被列出的CPU至少会有一级域统计数据，且很可能有一个 以上的域。在这个实现中，域没有特别的名字，但是编号最高的域通常在机器上所有的 CPU上仲裁平衡，而domain",
  "questions": [
    "Linux 内核：调度器统计数据的原理是什么？",
    "Linux 内核：调度器统计数据有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-scheduler-sched-stats",
      "url": "https://docs.kernel.org/translations/zh_CN/scheduler/sched-stats.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：调度器统计数据

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 调度器统计数据

第15版schedstats去掉了sched\_yield的一些计数器：yld\_exp\_empty，yld\_act\_empty
和yld\_both\_empty。在其它方面和第14版完全相同。

第14版schedstats包括对sched\_domains（译注：调度域）的支持，该特性进入内核
主线2.6.20，不过这一版schedstats与2.6.13-2.6.19内核的版本12的统计数据是完全
相同的（内核未发布第13版）。有些计数器按每个运行队列统计是更有意义的，其它则
按每个调度域统计是更有意义的。注意，调度域（以及它们的附属信息）仅在开启
CONFIG\_SMP的机器上是相关的和可用的。

在第14版schedstat中，每个被列出的CPU至少会有一级域统计数据，且很可能有一个
以上的域。在这个实现中，域没有特别的名字，但是编号最高的域通常在机器上所有的
CPU上仲裁平衡，而domain0是最紧密聚焦的域，有时仅在一对CPU之间进行平衡。此时，
没有任何体系结构需要3层以上的域。域统计数据中的第一个字段是一个位图，表明哪些
CPU受该域的影响。

这些字段是计数器，而且只能递增。使用这些字段的程序将需要从基线观测开始，然后在
后续每一个观测中计算出计数器的变化。一个能以这种方式处理其中很多字段的perl脚本
可见

> <http://eaglet.pdxhosts.com/rick/linux/schedstat/>

请注意，任何这样的脚本都必须是特定于版本的，改变版本的主要原因是输出格式的变化。
对于那些希望编写自己的脚本的人，可以参考这里描述的各个字段。

### CPU统计数据

cpu<N> 1 2 3 4 5 6 7 8 9

第一个字段是sched\_yield()的统计数据：

> 1. sched\_yield()被调用了#次

接下来的三个是schedule()的统计数据：

> 2. 这个字段是一个过时的数组过期计数，在O(1)调度器中使用。为了ABI兼容性，
>    我们保留了它，但它总是被设置为0。
> 3. schedule()被调用了#次
> 4. 调用schedule()导致处理器变为空闲了#次

接下来的两个是try\_to\_wake\_up()的统计数据：

> 5. try\_to\_wake\_up()被调用了#次
> 6. 调用try\_to\_wake\_up()导致本地CPU被唤醒了#次

接下来的三个统计数据描述了调度延迟：

> 7. 本处理器运行任务的总时间，单位是纳秒
> 8. 本处理器任务等待运行的时间，单位是纳秒
> 9. 本CPU运行了#个时间片

### 域统计数据

对于每个被描述的CPU，和它相关的每一个调度域均会产生下面一行数据（注意，如果
CONFIG\_SMP没有被定义，那么\*没有\*调度域被使用，这些行不会出现在输出中）。

domain<N> <cpumask> 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36

第一个字段是一个位掩码，表明该域在操作哪些CPU。

接下来的24个字段是load\_balance()函数的各个统计数据，按空闲类型分组（空闲，
繁忙，新空闲）：

> 1. 当CPU空闲时，sched\_balance\_rq()在这个调度域中被调用了#次
> 2. 当CPU空闲时，sched\_balance\_rq()在这个调度域中被调用，但是发现负载无需
>    均衡#次
> 3. 当CPU空闲时，sched\_balance\_rq()在这个调度域中被调用，试图迁移1个或更多
>    任务且失败了#次
> 4. 当CPU空闲时，sched\_balance\_rq()在这个调度域中被调用，发现不均衡（如果有）
>    #次
> 5. 当CPU空闲时，pull\_task()在这个调度域中被调用#次
> 6. 当CPU空闲时，尽管目标任务是热缓存状态，pull\_task()依然被调用#次
> 7. 当CPU空闲时，sched\_balance\_rq()在这个调度域中被调用，未能找到更繁忙的
>    队列#次
> 8. 当CPU空闲时，在调度域中找到了更繁忙的队列，但未找到更繁忙的调度组
>    #次
> 9. 当CPU繁忙时，sched\_balance\_rq()在这个调度域中被调用了#次
> 10. 当CPU繁忙时，sched\_balance\_rq()在这个调度域中被调用，但是发现负载无需
>     均衡#次
> 11. 当CPU繁忙时，sched\_balance\_rq()在这个调度域中被调用，试图迁移1个或更多
>     任务且失败了#次
> 12. 当CPU繁忙时，sched\_balance\_rq()在这个调度域中被调用，发现不均衡（如果有）
>     #次
> 13. 当CPU繁忙时，pull\_task()在这个调度域中被调用#次
> 14. 当CPU繁忙时，尽管目标任务是热缓存状态，pull\_task()依然被调用#次
> 15. 当CPU繁忙时，sched\_balance\_rq()在这个调度域中被调用，未能找到更繁忙的
>     队列#次
> 16. 当CPU繁忙时，在调度域中找到了更繁忙的队列，但未找到更繁忙的调度组
>     #次
> 17. 当CPU新空闲时，sched\_balance\_rq()在这个调度域中被调用了#次
> 18. 当CPU新空闲时，sched\_balance\_rq()在这个调度域中被调用，但是发现负载无需
>     均衡#次
> 19. 当CPU新空闲时，sched\_balance\_rq()在这个调度域中被调用，试图迁移1个或更多
>     任务且失败了#次
> 20. 当CPU新空闲时，sched\_balance\_rq()在这个调度域中被调用，发现不均衡（如果有）
>     #次
> 21. 当CPU新空闲时，pull\_task()在这个调度域中被调用#次
> 22. 当CPU新空闲时，尽管目标任务是热缓存状态，pull\_task()依然被调用#次
> 23. 当CPU新空闲时，sched\_balance\_rq()在这个调度域中被调用，未能找到更繁忙的
>     队列#次
> 24. 当CPU新空闲时，在调度域中找到了更繁忙的队列，但未找到更繁忙的调度组
>     #次

接下来的3个字段是active\_load\_balance()函数的各个统计数据：

> 25. active\_load\_balance()被调用了#次
> 26. active\_load\_balance()被调用，试图迁移1个或更多任务且失败了#次
> 27. active\_load\_balance()被调用，成功迁移了#次任务

接下来的3个字段是sched\_balance\_exec()函数的各个统计数据：

> 28. sbe\_cnt不再被使用
> 29. sbe\_balanced不再被使用
> 30. sbe\_pushed不再被使用

接下来的3个字段是sched\_balance\_fork()函数的各个统计数据：

> 31. sbf\_cnt不再被使用
> 32. sbf\_balanced不再被使用
> 33. sbf\_pushed不再被使用

接下来的3个字段是try\_to\_wake\_up()函数的各个统计数据：

> 34. 在这个调度域中调用try\_to\_wake\_up()唤醒任务时，任务在调度域中一个
>     和上次运行不同的新CPU上运行了#次
> 35. 在这个调度域中调用try\_to\_wake\_up()唤醒任务时，任务被迁移到发生唤醒
>     的CPU次数为#，因为该任务在原CPU是冷缓存状态
> 36. 在这个调度域中调用try\_to\_wake\_up()唤醒任务时，引发被动负载均衡#次

### /proc/<pid>/schedstat

schedstats还添加了一个新的/proc/<pid>/schedstat文件，来提供一些进程级的
相同信息。这个文件中，有三个字段与该进程相关：

> 1. 在CPU上运行花费的时间(单位是纳秒)
> 2. 在运行队列上等待的时间(单位是纳秒)
> 3. 在CPU上运行了#个时间片

可以很容易地编写一个程序，利用这些额外的字段来报告一个特定的进程或一组进程在
调度器策略下的表现如何。这样的程序的一个简单版本可在下面的链接找到

> <http://eaglet.pdxhosts.com/rick/linux/schedstat/v12/latency.c>

## 来源、版本与核验

- 来源：[调度器统计数据](https://docs.kernel.org/translations/zh_CN/scheduler/sched-stats.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/scheduler/sched-stats.rst`。
