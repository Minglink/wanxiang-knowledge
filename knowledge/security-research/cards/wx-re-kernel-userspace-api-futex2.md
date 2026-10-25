---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-userspace-api-futex2",
  "title": "Linux 内核：futex2",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "userspace-api"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "38137654198a53385dac01d353a020bc3a53b11bf02e6b1a0e07a423dbc9cb1e",
  "generatedHash": "3add7df2c5aee2d413c5db5c42568ba8bd8eac8f5c47e350848c60400194f5c8",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "futex，或者称为快速用户互斥锁（fast user mutex），是一组允许用户空间创建高性能同步 机制的系统调用，比如用户空间中的互斥锁，信号量和条件变量。C标准库，如glibc，使用它作 为实现更多高级接口的方式，如pthreads。 futex2是初代futex系统调用的后续版本，旨在克服原有接口的限制。 等待一个futex数组，可由其中任意一个唤",
  "l1": "futex，或者称为快速用户互斥锁（fast user mutex），是一组允许用户空间创建高性能同步 机制的系统调用，比如用户空间中的互斥锁，信号量和条件变量。C标准库，如glibc，使用它作 为实现更多高级接口的方式，如pthreads。 futex2是初代futex系统调用的后续版本，旨在克服原有接口的限制。 等待一个futex数组，可由其中任意一个唤醒: 用户空间设置一个struct futex_waitv数组（最多128项），设置 uaddr 为等待的 地址， val 为期望值， flags 为指定的类型（如private）和futex的大小。 __reserved 需要置为0，但是它可用作未来扩展。指向数组第一个元素的指针作为 waiters 传递。如果 waiters 或任何的 uaddr 地址无效，将返回 -EFAULT 。 如果用户空间拥有32位的指针，那么需要做显式转换",
  "questions": [
    "Linux 内核：futex2的原理是什么？",
    "Linux 内核：futex2有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-userspace-api-futex2",
      "url": "https://docs.kernel.org/translations/zh_CN/userspace-api/futex2.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：futex2

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## futex2

作者:
:   André Almeida <[andrealmeid@collabora.com](mailto:andrealmeid@collabora.com)>

futex，或者称为快速用户互斥锁（fast user mutex），是一组允许用户空间创建高性能同步
机制的系统调用，比如用户空间中的互斥锁，信号量和条件变量。C标准库，如glibc，使用它作
为实现更多高级接口的方式，如pthreads。

futex2是初代futex系统调用的后续版本，旨在克服原有接口的限制。

### 用户API

#### futex\_waitv()

等待一个futex数组，可由其中任意一个唤醒:

```
futex_waitv(struct futex_waitv *waiters, unsigned int nr_futexes,
            unsigned int flags, struct timespec *timeout, clockid_t clockid)

struct futex_waitv {
      __u64 val;
      __u64 uaddr;
      __u32 flags;
      __u32 __reserved;
};
```

用户空间设置一个struct futex\_waitv数组（最多128项），设置 uaddr 为等待的
地址， val 为期望值， flags 为指定的类型（如private）和futex的大小。
\_\_reserved 需要置为0，但是它可用作未来扩展。指向数组第一个元素的指针作为
waiters 传递。如果 waiters 或任何的 uaddr 地址无效，将返回 -EFAULT 。

如果用户空间拥有32位的指针，那么需要做显式转换来保证高位清零。 uintptr\_t 设计
得很精巧，在32/64位的指针上都正常工作。

nr\_futexes 指定了数组的大小。不在[1,128]区间内的值会使系统调用返回 -EINVAL 。

系统调用的 flags 参数需要置0，但可用作未来扩展。

对于每个 waiters 数组中的项，在 uaddr 的当前值会和 val 比较。如果
不一致，系统调用会撤销截至目前完成的所有工作，并返回 -EAGAIN 。如果所有测试
和验证都通过，系统调用会等待直到以下情况之一发生：

- 指定的timeout超时，返回 -ETIMEOUT 。
- 一个信号被传递给睡眠中的任务，返回 -ERESTARTSYS 。
- 某个列表中的futex被唤醒，返回那个被唤醒的futex的索引。

关于如何使用接口的例子可以在 tools/testing/selftests/futex/functional/futex\_waitv.c
中找到。

#### 超时

struct timespec \*timeout 是一个指向绝对超时时间的可选参数。你需要在 clockid
参数中指定要使用的时钟类型。支持 CLOCK\_MONOTONIC 和 CLOCK\_REALTIME 。这个
系统调用只接受64位的timespec结构体。

#### futex的类型

futex既可以是私有的也可以是共享的。私有用于多个进程共享同样的内存空间，并且futex的虚拟
地址对所有进程都是一样的。这允许在内核中进行优化。要使用私有futex，需要在futex标志中指定
FUTEX\_PRIVATE\_FLAG 。对于那些不在同一内存空间共享的进程，可以让同一个futex拥有不同
的虚拟地址（例如使用基于文件的共享内存），这需要不同的内部机制来使得正确进入队列。这是默认
的行为，而且对私有futex和共享futex都适用。

futex可以是不同的大小：8，16，32或64位。目前只支持32位大小的futex，并且需要通过 FUTEX\_32
标志指定。

## 来源、版本与核验

- 来源：[futex2](https://docs.kernel.org/translations/zh_CN/userspace-api/futex2.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/userspace-api/futex2.rst`。
