---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-admin-guide-cpu-load",
  "title": "Linux 内核：CPU 负载",
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
  "snapshotHash": "ffe36b611ebb1922fbabf6883a3f37c1bea85947f05a9e6e7e849be361d31f2b",
  "generatedHash": "69d2c0aa8b22eafb4ae4d71303f0b085270668861a22d4f8389ea0095a04528e",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "Linux通过``/proc/stat``和``/proc/uptime``导出各种信息，用户空间工具 如top(1)使用这些信息计算系统花费在某个特定状态的平均时间。 例如： 这里系统认为在默认采样周期內有10.01%的时间工作在用户空间，2.92%的时 间用在系统空间，总体上有81.63%的时间是空闲的。 大多数情况下``/proc/stat``的信息几",
  "l1": "Linux通过``/proc/stat``和``/proc/uptime``导出各种信息，用户空间工具 如top(1)使用这些信息计算系统花费在某个特定状态的平均时间。 例如： 这里系统认为在默认采样周期內有10.01%的时间工作在用户空间，2.92%的时 间用在系统空间，总体上有81.63%的时间是空闲的。 大多数情况下``/proc/stat``的信息几乎真实反映了系统信息，然而，由于内 核采集这些数据的方式/时间的特点，有时这些信息根本不可靠。 那么这些信息是如何被搜集的呢？每当时间中断触发时，内核查看此刻运行的 进程类型，并增加与此类型/状态进程对应的计数器的值。这种方法的问题是 在两次时间中断之间系统（进程）能够在多种状态之间切换多次，而计数器只 增加最后一种状态下的计数。 假设系统有一个进程以如下方式周期性地占用cpu: 在上面的情况下，根据``/proc/stat``的信息（",
  "questions": [
    "Linux 内核：CPU 负载的原理是什么？",
    "Linux 内核：CPU 负载有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-admin-guide-cpu-load",
      "url": "https://docs.kernel.org/translations/zh_CN/admin-guide/cpu-load.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：CPU 负载

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## CPU 负载

Linux通过``/proc/stat``和``/proc/uptime``导出各种信息，用户空间工具
如top(1)使用这些信息计算系统花费在某个特定状态的平均时间。
例如：

> $ iostat
> Linux 2.6.18.3-exp (linmac) 02/20/2007
>
> avg-cpu: %user %nice %system %iowait %steal %idle
> :   10.01 0.00 2.92 5.44 0.00 81.63
>
> ...

这里系统认为在默认采样周期內有10.01%的时间工作在用户空间，2.92%的时
间用在系统空间，总体上有81.63%的时间是空闲的。

大多数情况下``/proc/stat``的信息几乎真实反映了系统信息，然而，由于内
核采集这些数据的方式/时间的特点，有时这些信息根本不可靠。

那么这些信息是如何被搜集的呢？每当时间中断触发时，内核查看此刻运行的
进程类型，并增加与此类型/状态进程对应的计数器的值。这种方法的问题是
在两次时间中断之间系统（进程）能够在多种状态之间切换多次，而计数器只
增加最后一种状态下的计数。

举例
---

假设系统有一个进程以如下方式周期性地占用cpu:

```
 两个时钟中断之间的时间线
|-----------------------|
 ^                     ^
 |_ 开始运行           |
                       |_ 开始睡眠
                       （很快会被唤醒）
```

在上面的情况下，根据``/proc/stat``的信息（由于当系统处于空闲状态时，
时间中断经常会发生）系统的负载将会是0

大家能够想象内核的这种行为会发生在许多情况下，这将导致``/proc/stat``
中存在相当古怪的信息:

```
/* gcc -o hog smallhog.c */
#include <time.h>
#include <limits.h>
#include <signal.h>
#include <sys/time.h>
#define HIST 10

static volatile sig_atomic_t stop;

static void sighandler (int signr)
{
(void) signr;
stop = 1;
}
static unsigned long hog (unsigned long niters)
{
stop = 0;
while (!stop && --niters);
return niters;
}
int main (void)
{
int i;
struct itimerval it = { .it_interval = { .tv_sec = 0, .tv_usec = 1 },
                        .it_value = { .tv_sec = 0, .tv_usec = 1 } };
sigset_t set;
unsigned long v[HIST];
double tmp = 0.0;
unsigned long n;
signal (SIGALRM, &sighandler);
setitimer (ITIMER_REAL, &it, NULL);

hog (ULONG_MAX);
for (i = 0; i < HIST; ++i) v[i] = ULONG_MAX - hog (ULONG_MAX);
for (i = 0; i < HIST; ++i) tmp += v[i];
tmp /= HIST;
n = tmp - (tmp / 3.0);

sigemptyset (&set);
sigaddset (&set, SIGALRM);

for (;;) {
        hog (n);
        sigwait (&set, &i);
}
return 0;
}
```

参考
---

- <https://lore.kernel.org/r/loom.20070212T063225-663@post.gmane.org>
- Documentation/filesystems/proc.rst (1.8)

谢谢
---

Con Kolivas, Pavel Machek

## 来源、版本与核验

- 来源：[CPU 负载](https://docs.kernel.org/translations/zh_CN/admin-guide/cpu-load.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/admin-guide/cpu-load.rst`。
