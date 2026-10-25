---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-mm-hwpoison",
  "title": "Linux 内核：hwpoison",
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
  "snapshotHash": "e06f2d82f3c7ff6a2b62aaf615f5e2ee1058e4daef4a941568d6a5e330e2202f",
  "generatedHash": "0a05b40404ca40aae1281dfa3b2350a52efaa3bc54c73610acae335e32c5b892",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "即将推出的英特尔CPU支持从一些内存错误中恢复（ MCA恢复 ）。这需要操作系统宣布 一个页面\"poisoned\"，杀死与之相关的进程，并避免在未来使用它。 这个补丁包在虚拟机中实现了必要的(编程)框架。 该代码由mm/memory-failure.c中的高级处理程序、一个新的页面poison位和虚拟机中的 各种检查组成，用来处理poison的页面。 现在主",
  "l1": "即将推出的英特尔CPU支持从一些内存错误中恢复（ MCA恢复 ）。这需要操作系统宣布 一个页面\"poisoned\"，杀死与之相关的进程，并避免在未来使用它。 这个补丁包在虚拟机中实现了必要的(编程)框架。 该代码由mm/memory-failure.c中的高级处理程序、一个新的页面poison位和虚拟机中的 各种检查组成，用来处理poison的页面。 现在主要目标是KVM客户机，但它适用于所有类型的应用程序。支持KVM需要最近的qemu-kvm 版本。 对于KVM的使用，需要一个新的信号类型，这样KVM就可以用适当的地址将机器检查注入到客户 机中。这在理论上也允许其他应用程序处理内存故障。我们的期望是，所有的应用程序都不要这 样做，但一些非常专业的应用程序可能会这样做。 有两种（实际上是三种）模式的内存故障恢复可以在。 vm.memory_failure_recovery sysctl 置",
  "questions": [
    "Linux 内核：hwpoison的原理是什么？",
    "Linux 内核：hwpoison有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-mm-hwpoison",
      "url": "https://docs.kernel.org/translations/zh_CN/mm/hwpoison.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：hwpoison

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## hwpoison

### 什么是hwpoison?

即将推出的英特尔CPU支持从一些内存错误中恢复（ MCA恢复 ）。这需要操作系统宣布
一个页面"poisoned"，杀死与之相关的进程，并避免在未来使用它。

这个补丁包在虚拟机中实现了必要的(编程)框架。

引用概述中的评论:

```
高级机器的检查与处理。处理方法是损坏的页面被硬件报告，通常是由于2位ECC内
存或高速缓存故障。

这主要是针对在后台检测到的损坏的页面。当当前的CPU试图访问它时，当前运行的进程
可以直接被杀死。因为还没有访问损坏的页面, 如果错误由于某种原因不能被处理，就可
以安全地忽略它. 而不是用另外一个机器检查去处理它。

处理不同状态的页面缓存页。这里棘手的部分是，相对于其他虚拟内存用户， 我们可以异
步访问任何页面。因为内存故障可能随时随地发生，可能违反了他们的一些假设。这就是
为什么这段代码必须非常小心。一般来说，它试图使用正常的锁规则，如获得标准锁，即使
这意味着错误处理可能需要很长的时间。

这里的一些操作有点低效，并且具有非线性的算法复杂性，因为数据结构没有针对这种情
况进行优化。特别是从vma到进程的映射就是这种情况。由于这种情况大概率是罕见的，所
以我们希望我们可以摆脱这种情况。
```

该代码由mm/memory-failure.c中的高级处理程序、一个新的页面poison位和虚拟机中的
各种检查组成，用来处理poison的页面。

现在主要目标是KVM客户机，但它适用于所有类型的应用程序。支持KVM需要最近的qemu-kvm
版本。

对于KVM的使用，需要一个新的信号类型，这样KVM就可以用适当的地址将机器检查注入到客户
机中。这在理论上也允许其他应用程序处理内存故障。我们的期望是，所有的应用程序都不要这
样做，但一些非常专业的应用程序可能会这样做。

### 故障恢复模式

有两种（实际上是三种）模式的内存故障恢复可以在。

vm.memory\_failure\_recovery sysctl 置零:
:   所有的内存故障都会导致panic。请不要尝试恢复。

早期处理
:   (可以在全局和每个进程中控制) 一旦检测到错误，立即向应用程序发送SIGBUS这允许
    应用程序以温和的方式处理内存错误（例如，放弃受影响的对象） 这是KVM qemu使用的
    模式。

推迟处理
:   当应用程序运行到损坏的页面时，发送SIGBUS。这对不知道内存错误的应用程序来说是
    最好的，默认情况下注意一些页面总是被当作late kill处理。

### 用户控制

vm.memory\_failure\_recovery
:   参阅 sysctl.txt

vm.memory\_failure\_early\_kill
:   全局启用early kill

PR\_MCE\_KILL
:   设置early/late kill mode/revert 到系统默认值。

    arg1: PR\_MCE\_KILL\_CLEAR:
    :   恢复到系统默认值

    arg1: PR\_MCE\_KILL\_SET:
    :   arg2定义了线程特定模式

        PR\_MCE\_KILL\_EARLY:
        :   Early kill

        PR\_MCE\_KILL\_LATE:
        :   Late kill

        PR\_MCE\_KILL\_DEFAULT
        :   使用系统全局默认值

    注意，如果你想有一个专门的线程代表进程处理SIGBUS(BUS\_MCEERR\_AO)，你应该在
    指定线程上调用prctl(PR\_MCE\_KILL\_EARLY)。否则，SIGBUS将被发送到主线程。

PR\_MCE\_KILL\_GET
:   返回当前模式

### 测试

- madvise(MADV\_HWPOISON, ....) (as root) - 在测试过程中Poison一个页面
- 通过debugfs /sys/kernel/debug/hwpoison/ hwpoison-inject模块

  corrupt-pfn
  :   在PFN处注入hwpoison故障，并echoed到这个文件。这做了一些早期过滤，以避
      免在测试套件中损坏非预期页面。

  unpoison-pfn
  :   在PFN的Software-unpoison页面对应到这个文件。这样，一个页面可以再次被
      复用。这只对Linux注入的故障起作用，对真正的内存故障不起作用。

  注意这些注入接口并不稳定，可能会在不同的内核版本中发生变化

  corrupt-filter-dev-major, corrupt-filter-dev-minor
  :   只处理与块设备major/minor定义的文件系统相关的页面的内存故障。-1U是通
      配符值。这应该只用于人工注入的测试。

  corrupt-filter-memcg
  :   限制注入到memgroup拥有的页面。由memcg的inode号指定。

      Example:

      ```
      mkdir /sys/fs/cgroup/mem/hwpoison

      usemem -m 100 -s 1000 &
      echo `jobs -p` > /sys/fs/cgroup/mem/hwpoison/tasks

      memcg_ino=$(ls -id /sys/fs/cgroup/mem/hwpoison | cut -f1 -d' ')
      echo $memcg_ino > /debug/hwpoison/corrupt-filter-memcg

      page-types -p `pidof init`   --hwpoison  # shall do nothing
      page-types -p `pidof usemem` --hwpoison  # poison its pages
      ```

  corrupt-filter-flags-mask, corrupt-filter-flags-value
  :   当指定时，只有在((page\_flags & mask) == value)的情况下才会poison页面。
      这允许对许多种类的页面进行压力测试。page\_flags与/proc/kpageflags中的相
      同。这些标志位在include/linux/kernel-page-flags.h中定义，并在
      Documentation/admin-guide/mm/pagemap.rst中记录。
- 架构特定的MCE注入器

  x86 有 mce-inject, mce-test

  在mce-test中的一些便携式hwpoison测试程序，见下文。

### 引用

<http://halobates.de/mce-lc09-2.pdf>
:   09年LinuxCon的概述演讲

git://git.kernel.org/pub/scm/utils/cpu/mce/mce-test.git
:   测试套件（在tsrc中的hwpoison特定可移植测试）。

git://git.kernel.org/pub/scm/utils/cpu/mce/mce-inject.git
:   x86特定的注入器

### 限制

- 不是所有的页面类型都被支持，而且永远不会。大多数内核内部对象不能被恢
  复，目前只有LRU页。

---
Andi Kleen, 2009年10月

## 来源、版本与核验

- 来源：[hwpoison](https://docs.kernel.org/translations/zh_CN/mm/hwpoison.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/mm/hwpoison.rst`。
