---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-cpu-freq-core",
  "title": "Linux 内核：CPUFreq核心和CPUFreq通知器的通用说明",
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
  "snapshotHash": "2de26b1e5ed59d424aca9c3738e2bb93cf83dfdc1b883213048964944bf59e4a",
  "generatedHash": "3a98686ebe89edf8b363ab5dac168bae64337b00ab0ddfbe820dc4547844616b",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "cpufreq核心代码位于drivers/cpufreq/cpufreq.c中。这些cpufreq代码为CPUFreq架构的驱 动程序（那些执行硬件频率切换的代码）以及 \"通知器\" 提供了一个标准化的接口。 包括设备驱动程序；需要了解策略变化（如 ACPI 热量管理），或所有频率变化（如计时代码）， 甚至需要强制限制为指定频率（如 ARM 架构上的 LCD ",
  "l1": "cpufreq核心代码位于drivers/cpufreq/cpufreq.c中。这些cpufreq代码为CPUFreq架构的驱 动程序（那些执行硬件频率切换的代码）以及 \"通知器\" 提供了一个标准化的接口。 包括设备驱动程序；需要了解策略变化（如 ACPI 热量管理），或所有频率变化（如计时代码）， 甚至需要强制限制为指定频率（如 ARM 架构上的 LCD 驱动程序）的其它内核组件。 此外，内核 \"常数\" loops_per_jiffy 会根据频率变化而更新。 cpufreq策略的引用计数由 cpufreq_cpu_get 和 cpufreq_cpu_put 来完成，以确保 cpufreq 驱 动程序被正确地注册到核心中，并且驱动程序在 cpufreq_put_cpu 被调用之前不会被卸载。这也保证 了每个CPU核的cpufreq 策略在使用期间不会被释放。 CPUFreq通知器遵循标准的",
  "questions": [
    "Linux 内核：CPUFreq核心和CPUFreq通知器的通用说明的原理是什么？",
    "Linux 内核：CPUFreq核心和CPUFreq通知器的通用说明有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-cpu-freq-core",
      "url": "https://docs.kernel.org/translations/zh_CN/cpu-freq/core.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：CPUFreq核心和CPUFreq通知器的通用说明

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## CPUFreq核心和CPUFreq通知器的通用说明

作者:
:   - Dominik Brodowski <[linux@brodo.de](mailto:linux@brodo.de)>
    - David Kimdon <[dwhedon@debian.org](mailto:dwhedon@debian.org)>
    - Rafael J. Wysocki <[rafael.j.wysocki@intel.com](mailto:rafael.j.wysocki@intel.com)>
    - Viresh Kumar <[viresh.kumar@linaro.org](mailto:viresh.kumar@linaro.org)>

### 1. CPUFreq核心和接口

cpufreq核心代码位于drivers/cpufreq/cpufreq.c中。这些cpufreq代码为CPUFreq架构的驱
动程序（那些执行硬件频率切换的代码）以及 "通知器" 提供了一个标准化的接口。
包括设备驱动程序；需要了解策略变化（如 ACPI 热量管理），或所有频率变化（如计时代码），
甚至需要强制限制为指定频率（如 ARM 架构上的 LCD 驱动程序）的其它内核组件。
此外，内核 "常数" loops\_per\_jiffy 会根据频率变化而更新。

cpufreq策略的引用计数由 cpufreq\_cpu\_get 和 cpufreq\_cpu\_put 来完成，以确保 cpufreq 驱
动程序被正确地注册到核心中，并且驱动程序在 cpufreq\_put\_cpu 被调用之前不会被卸载。这也保证
了每个CPU核的cpufreq 策略在使用期间不会被释放。

### 2. CPUFreq 通知器

CPUFreq通知器遵循标准的内核通知器接口。
关于通知器的细节请参阅 linux/include/linux/notifier.h。

这里有两个不同的CPUfreq通知器 - 策略通知器和转换通知器。

#### 2.1 CPUFreq策略通知器

当创建或移除策略时，这些都会被通知。

阶段是在通知器的第二个参数中指定的。当第一次创建策略时，阶段是CPUFREQ\_CREATE\_POLICY，当
策略被移除时，阶段是CPUFREQ\_REMOVE\_POLICY。

第三个参数 void \*pointer 指向一个结构体cpufreq\_policy，其包括min，max(新策略的下限和
上限（单位为kHz）)这几个值。

#### 2.2 CPUFreq转换通知器

当CPUfreq驱动切换CPU核心频率时，策略中的每个在线CPU都会收到两次通知，这些变化没有任何外部干
预。

第二个参数指定阶段 - CPUFREQ\_PRECHANGE or CPUFREQ\_POSTCHANGE.

第三个参数是一个包含如下值的结构体cpufreq\_freqs：

|  |  |
| --- | --- |
| policy | 指向struct cpufreq\_policy的指针 |
| old | 旧频率 |
| new | 新频率 |
| flags | cpufreq驱动的标志 |

### 3. 含有Operating Performance Point (OPP)的CPUFreq表的生成

关于OPP的细节请参阅 Documentation/power/opp.rst

dev\_pm\_opp\_init\_cpufreq\_table -
:   这个函数提供了一个随时可用的转换例程，用来将OPP层关于可用频率的内部信息翻译成一种
    cpufreq易于处理的格式。

    Warning

    不要在中断上下文中使用此函数。

    例如:

    ```
    soc_pm_init()
    {
           /* Do things */
           r = dev_pm_opp_init_cpufreq_table(dev, &freq_table);
           if (!r)
                   policy->freq_table = freq_table;
           /* Do other things */
    }
    ```

    Note

    该函数只有在CONFIG\_PM\_OPP之外还启用了CONFIG\_CPU\_FREQ时才可用。

dev\_pm\_opp\_free\_cpufreq\_table
:   释放dev\_pm\_opp\_init\_cpufreq\_table分配的表。

## 来源、版本与核验

- 来源：[CPUFreq核心和CPUFreq通知器的通用说明](https://docs.kernel.org/translations/zh_CN/cpu-freq/core.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/cpu-freq/core.rst`。
