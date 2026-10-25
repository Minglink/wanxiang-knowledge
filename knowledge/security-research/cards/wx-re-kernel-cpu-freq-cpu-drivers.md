---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-cpu-freq-cpu-drivers",
  "title": "Linux 内核：如何实现一个新的CPUFreq处理器驱动程序？",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "cpu-freq"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "5407ca13db0f7b5d8bdc12ebec62f90b25d4ce313827bcfcd6760d00d0ec4802",
  "generatedHash": "111ad38a9b60d3716b129261bca7fa7179c914022a72e63f481a8b5d9fa2d274",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "如果，你刚刚得到了一个全新的CPU/芯片组及其数据手册，并希望为这个CPU/芯片组添加cpufreq 支持？很好，这里有一些至关重要的提示： 首先，在 __initcall level 7 (module_init())或更靠后的函数中检查这个内核是否 运行在正确的CPU和正确的芯片组上。如果是，则使用cpufreq_register_driver()向 C",
  "l1": "如果，你刚刚得到了一个全新的CPU/芯片组及其数据手册，并希望为这个CPU/芯片组添加cpufreq 支持？很好，这里有一些至关重要的提示： 首先，在 __initcall level 7 (module_init())或更靠后的函数中检查这个内核是否 运行在正确的CPU和正确的芯片组上。如果是，则使用cpufreq_register_driver()向 CPUfreq核心层注册一个cpufreq_driver结构体。 .init - 一个指向per-policy初始化函数的指针。 .get_intermediate 和 target_intermediate - 用于在改变CPU频率时切换到稳定 的频率。 .exit - 一个指向per-policy清理函数的指针，该函数在CPU热插拔过程的CPU_POST_DEAD 阶段被调用。 .suspend - 一个指向per-policy暂停函",
  "questions": [
    "Linux 内核：如何实现一个新的CPUFreq处理器驱动程序？的原理是什么？",
    "Linux 内核：如何实现一个新的CPUFreq处理器驱动程序？有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-cpu-freq-cpu-drivers",
      "url": "https://docs.kernel.org/translations/zh_CN/cpu-freq/cpu-drivers.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：如何实现一个新的CPUFreq处理器驱动程序？

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 如何实现一个新的CPUFreq处理器驱动程序？

作者:

> - Dominik Brodowski <[linux@brodo.de](mailto:linux@brodo.de)>
> - Rafael J. Wysocki <[rafael.j.wysocki@intel.com](mailto:rafael.j.wysocki@intel.com)>
> - Viresh Kumar <[viresh.kumar@linaro.org](mailto:viresh.kumar@linaro.org)>

### 1. 怎么做？

如果，你刚刚得到了一个全新的CPU/芯片组及其数据手册，并希望为这个CPU/芯片组添加cpufreq
支持？很好，这里有一些至关重要的提示：

#### 1.1 初始化

首先，在 \_\_initcall level 7 (module\_init())或更靠后的函数中检查这个内核是否
运行在正确的CPU和正确的芯片组上。如果是，则使用cpufreq\_register\_driver()向
CPUfreq核心层注册一个cpufreq\_driver结构体。

结构体cpufreq\_driver应该包含什么成员?

> .name - 驱动的名字。
>
> .init - 一个指向per-policy初始化函数的指针。
>
> .verify - 一个指向"verification"函数的指针。
>
> .setpolicy 或 .fast\_switch 或 .target 或 .target\_index - 差异见
> 下文。

其它可选成员

> .flags - 给cpufreq核心的提示。
>
> .driver\_data - cpufreq驱动程序的特有数据。
>
> .get\_intermediate 和 target\_intermediate - 用于在改变CPU频率时切换到稳定
> 的频率。
>
> .get - 返回CPU的当前频率。
>
> .bios\_limit - 返回HW/BIOS对CPU的最大频率限制值。
>
> .exit - 一个指向per-policy清理函数的指针，该函数在CPU热插拔过程的CPU\_POST\_DEAD
> 阶段被调用。
>
> .suspend - 一个指向per-policy暂停函数的指针，该函数在关中断且在该策略的调节器停止
> 后被调用。
>
> .resume - 一个指向per-policy恢复函数的指针，该函数在关中断且在调节器再一次启动前被
> 调用。
>
> .ready - 一个指向per-policy准备函数的指针，该函数在策略完全初始化之后被调用。
>
> .attr - 一个指向NULL结尾的"struct freq\_attr"列表的指针，该列表允许导出值到
> sysfs。
>
> .boost\_enabled - 如果设置，则启用提升(boost)频率。
>
> .set\_boost - 一个指向per-policy函数的指针，该函数用来开启/关闭提升(boost)频率功能。

#### 1.2 Per-CPU 初始化

每当一个新的CPU被注册到设备模型中，或者当cpufreq驱动注册自身之后，如果此CPU的cpufreq策
略不存在，则会调用per-policy的初始化函数cpufreq\_driver.init。请注意，.init()和.exit()例程
只为某个策略调用一次，而不是对该策略管理的每个CPU调用一次。它需要一个 struct cpufreq\_policy \*policy 作为参数。现在该怎么做呢？

如果有必要，请在你的CPU上激活CPUfreq功能支持。

然后，驱动程序必须填写以下值:

|  |  |
| --- | --- |
| policy->cpuinfo.min\_freq和 policy->cpuinfo.max\_freq | 该CPU支持的最低和最高频率（kHz） |
| policy->cpuinfo.transition\_latency | CPU在两个频率之间切换所需的时间，以 纳秒为单位 |
| policy->cur | 该CPU当前的工作频率(如适用) |
| policy->min, policy->max, policy->policy and, if necessary, policy->governor | 必须包含该CPU的"默认策略"。稍后 会用这些值调用 cpufreq\_driver.verify和下面函数 之一：cpufreq\_driver.setpolicy或 cpufreq\_driver.target/target\_index |
| policy->cpus | 该policy通过DVFS框架影响的全部CPU (即与本CPU共享"时钟/电压"对)构成 掩码(同时包含在线和离线CPU)，用掩码 更新本字段 |

对于设置其中的一些值(cpuinfo.min[max]\_freq, policy->min[max])，频率表辅助函数可能会有帮
助。关于它们的更多信息，请参见第2节。

#### 1.3 验证

当用户决定设置一个新的策略(由"policy,governor,min,max组成")时，必须对这个策略进行验证，
以便纠正不兼容的值。为了验证这些值，cpufreq\_verify\_within\_limits(struct cpufreq\_policy \*policy, unsigned int min\_freq, unsigned int max\_freq)函数可能会有帮助。
关于频率表辅助函数的详细内容请参见第2节。

您需要确保至少有一个有效频率（或工作范围）在 policy->min 和 policy->max 范围内。如果有必
要，先增大policy->max，只有在没有解决方案的情况下，才减小policy->min。

#### 1.4 target 或 target\_index 或 setpolicy 或 fast\_switch?

大多数cpufreq驱动甚至大多数CPU频率升降算法只允许将CPU频率设置为预定义的固定值。对于这些，你
可以使用->target()，->target\_index()或->fast\_switch()回调。

有些具有硬件调频能力的处理器可以自行依据某些限制来切换CPU频率。它们应使用->setpolicy()回调。

#### 1.5. target/target\_index

target\_index调用有两个参数： struct cpufreq\_policy \* policy 和 unsigned int
索引(用于索引频率表项)。

当调用这里时，CPUfreq驱动必须设置新的频率。实际频率必须由freq\_table[index].frequency决定。

在发生错误的情况下总是应该恢复到之前的频率(即policy->restore\_freq)，即使我们已经切换到了
中间频率。

#### 已弃用

target调用有三个参数。struct cpufreq\_policy \* policy, unsigned int target\_frequency,
unsigned int relation.

CPUfreq驱动在调用这里时必须设置新的频率。实际的频率必须使用以下规则来确定。

- 尽量贴近"目标频率"。
- policy->min <= new\_freq <= policy->max (这必须是有效的!!!)
- 如果 relation==CPUFREQ\_REL\_L，尝试选择一个高于或等于 target\_freq 的 new\_freq。("L代表
  最低，但不能低于")
- 如果 relation==CPUFREQ\_REL\_H，尝试选择一个低于或等于 target\_freq 的 new\_freq。("H代表
  最高，但不能高于")

这里，频率表辅助函数可能会帮助你 -- 详见第2节。

#### 1.6. fast\_switch

这个函数用于从调度器的上下文进行频率切换。并非所有的驱动都要实现它，因为不允许在这个回调中睡眠。这
个回调必须经过高度优化，以尽可能快地进行切换。

这个函数有两个参数： struct cpufreq\_policy \*policy 和 unsigned int target\_frequency。

#### 1.7 setpolicy

setpolicy调用只需要一个 struct cpufreq\_policy \* policy 作为参数。需要将处理器内或芯片组内动态频
率切换的下限设置为policy->min，上限设置为policy->max，如果支持的话，当policy->policy为
CPUFREQ\_POLICY\_PERFORMANCE时选择面向性能的设置，为CPUFREQ\_POLICY\_POWERSAVE时选择面向省电的设置。
也可以查看drivers/cpufreq/longrun.c中的参考实现。

#### 1.8 get\_intermediate 和 target\_intermediate

仅适用于未设置 target\_index() 和 CPUFREQ\_ASYNC\_NOTIFICATION 的驱动。

get\_intermediate应该返回一个平台想要切换到的稳定的中间频率，target\_intermediate()应该将CPU设置为
该频率，然后再跳转到'index'对应的频率。cpufreq核心会负责发送通知，驱动不必在
target\_intermediate()或target\_index()中处理它们。

在驱动程序不想为某个目标频率切换到中间频率的情况下，它们可以让get\_intermediate()返回'0'。
在这种情况下，cpufreq核心将直接调用->target\_index()。

注意：->target\_index()应该在发生失败的情况下将频率恢复到policy->restore\_freq，
因为cpufreq核心会为此发送通知。

### 2. 频率表辅助函数

由于大多数支持cpufreq的处理器只允许被设置为几个特定的频率，因此，"频率表"和一些相关函数可能会辅助处理器驱动
程序的一些工作。这样的"频率表"是一个由struct cpufreq\_frequency\_table的条目构成的数组，"driver\_data"成员包
含驱动程序的专用值，"frequency"成员包含了相应的频率，此外还有标志成员。在表的最后，需要添加一个
cpufreq\_frequency\_table条目，频率设置为CPUFREQ\_TABLE\_END。如果想跳过表中的一个条目，则将频率设置为
CPUFREQ\_ENTRY\_INVALID。这些条目不需要按照任何特定的顺序排序，如果排序了，cpufreq核心执行DVFS会更快一点，
因为搜索最佳匹配会更快。

如果在policy->freq\_table字段中包含一个有效的频率表指针，频率表就会被cpufreq核心自动验证。

cpufreq\_frequency\_table\_verify()保证至少有一个有效的频率在policy->min和policy->max范围内，并且所有其他
准则都被满足。这对->verify调用很有帮助。

cpufreq\_frequency\_table\_target()是对应于->target阶段的频率表辅助函数。只要把值传递给这个函数，这个函数就会返
回包含CPU要设置的频率的频率表条目。

以下宏可以作为cpufreq\_frequency\_table的迭代器。

cpufreq\_for\_each\_entry(pos, table) - 遍历频率表的所有条目。

cpufreq\_for\_each\_valid\_entry(pos, table) - 该函数遍历所有条目，不包括CPUFREQ\_ENTRY\_INVALID频率。
使用参数"pos" -- 一个 cpufreq\_frequency\_table \* 作为循环指针，使用参数"table" -- 作为你想迭代
的 cpufreq\_frequency\_table \* 。

例如:

```
struct cpufreq_frequency_table *pos, *driver_freq_table;

cpufreq_for_each_entry(pos, driver_freq_table) {
        /* Do something with pos */
        pos->frequency = ...
}
```

如果你需要在driver\_freq\_table中处理pos的位置，不要做指针减法，因为它的代价相当高。作为替代，使用宏
cpufreq\_for\_each\_entry\_idx() 和 cpufreq\_for\_each\_valid\_entry\_idx() 。

## 来源、版本与核验

- 来源：[如何实现一个新的CPUFreq处理器驱动程序？](https://docs.kernel.org/translations/zh_CN/cpu-freq/cpu-drivers.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/cpu-freq/cpu-drivers.rst`。
