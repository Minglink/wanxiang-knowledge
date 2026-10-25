---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-core-api-refcount-vs-atomic",
  "title": "Linux 内核：与atomic_t相比，refcount_t的API是这样的",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "core-api"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "63533b4917f76c9101c67f8599bbaf5ed32f0bea86d148638c4d21cc51433bc0",
  "generatedHash": "7505d63f76d6ba2cb2a0a9ed845e0f20992db694baa2e5e944968697d896a88d",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "- 简介 - 内存顺序的相关类型 - 函数的比较 - 情况1） - 非 “读/修改/写”（RMW）操作 - 情况2） - 基于增量的操作，不返回任何值 - 情况3） - 基于递减的RMW操作，没有返回值 - 情况4） - 基于增量的RMW操作，返回一个值 - 情况 5） - 基于Dec/Sub递减的通用RMW操作，返回一个值 - 情况6）其他基于递减的RMW",
  "l1": "- 简介 - 内存顺序的相关类型 - 函数的比较 - 情况1） - 非 “读/修改/写”（RMW）操作 - 情况2） - 基于增量的操作，不返回任何值 - 情况3） - 基于递减的RMW操作，没有返回值 - 情况4） - 基于增量的RMW操作，返回一个值 - 情况 5） - 基于Dec/Sub递减的通用RMW操作，返回一个值 - 情况6）其他基于递减的RMW操作，返回一个值 - 情况7）--基于锁的RMW refcount_t API的目标是为实现对象的引用计数器提供一个最小的API。虽然来自 lib/refcount.c的独立于架构的通用实现在下面使用了原子操作，但一些 refcount_*() 和 atomic_*() 函数在内存顺序保证方面有很多不同。本文档概述了这些差异，并 提供了相应的例子，以帮助开发者根据这些内存顺序保证的变化来验证他们的代码。 本文档中使用的术语尽量遵循too",
  "questions": [
    "Linux 内核：与atomic_t相比，refcount_t的API是这样的的原理是什么？",
    "Linux 内核：与atomic_t相比，refcount_t的API是这样的有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-core-api-refcount-vs-atomic",
      "url": "https://docs.kernel.org/translations/zh_CN/core-api/refcount-vs-atomic.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：与atomic_t相比，refcount_t的API是这样的

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 与atomic\_t相比，refcount\_t的API是这样的

- [简介](#section-1)
- [内存顺序的相关类型](#section-2)
- [函数的比较](#section-3)

  - [情况1） - 非 “读/修改/写”（RMW）操作](#rmw)
  - [情况2） - 基于增量的操作，不返回任何值](#section-4)
  - [情况3） - 基于递减的RMW操作，没有返回值](#rmw-1)
  - [情况4） - 基于增量的RMW操作，返回一个值](#rmw-2)
  - [情况 5） - 基于Dec/Sub递减的通用RMW操作，返回一个值](#dec-subrmw)
  - [情况6）其他基于递减的RMW操作，返回一个值](#rmw-3)
  - [情况7）--基于锁的RMW](#rmw-4)

### [简介](#toc-entry-1)

refcount\_t API的目标是为实现对象的引用计数器提供一个最小的API。虽然来自
lib/refcount.c的独立于架构的通用实现在下面使用了原子操作，但一些 refcount\_\*()
和 atomic\_\*() 函数在内存顺序保证方面有很多不同。本文档概述了这些差异，并
提供了相应的例子，以帮助开发者根据这些内存顺序保证的变化来验证他们的代码。

本文档中使用的术语尽量遵循tools/memory-model/Documentation/explanation.txt
中定义的正式LKMM。

memory-barriers.txt和atomic\_t.txt提供了更多关于内存顺序的背景，包括通用的
和针对原子操作的。

### [内存顺序的相关类型](#toc-entry-2)

Note

下面的部分只涵盖了本文使用的与原子操作和引用计数器有关的一些内存顺
序类型。如果想了解更广泛的情况，请查阅memory-barriers.txt文件。

在没有任何内存顺序保证的情况下（即完全无序），atomics和refcounters只提供原
子性和程序顺序（program order, po）关系（在同一个CPU上）。它保证每个
atomic\_\* () 和 refcount\_\*() 操作都是原子性的，指令在单个CPU上按程序
顺序执行。这是用READ\_ONCE()/WRITE\_ONCE()和比较并交换原语实现的。

强（完全）内存顺序保证在同一CPU上的所有较早加载和存储的指令（所有程序顺序较早
[po-earlier]指令）在执行任何程序顺序较后指令（po-later）之前完成。它还保证
同一CPU上储存的程序优先较早的指令和来自其他CPU传播的指令必须在该CPU执行任何
程序顺序较后指令之前传播到其他CPU（A-累积属性）。这是用smp\_mb()实现的。

RELEASE内存顺序保证了在同一CPU上所有较早加载和存储的指令（所有程序顺序较早
指令）在此操作前完成。它还保证同一CPU上储存的程序优先较早的指令和来自其他CPU
传播的指令必须在释放（release）操作之前传播到所有其他CPU（A-累积属性）。这是用
smp\_store\_release()实现的。

ACQUIRE内存顺序保证了同一CPU上的所有后加载和存储的指令（所有程序顺序较后
指令）在获取（acquire）操作之后完成。它还保证在获取操作执行后，同一CPU上
储存的所有程序顺序较后指令必须传播到所有其他CPU。这是用
smp\_acquire\_\_after\_ctrl\_dep()实现的。

对Refcounters的控制依赖（取决于成功）保证了如果一个对象的引用被成功获得（引用计数
器的增量或增加行为发生了，函数返回true），那么进一步的存储是针对这个操作的命令。对存
储的控制依赖没有使用任何明确的屏障来实现，而是依赖于CPU不对存储进行猜测。这只是
一个单一的CPU关系，对其他CPU不提供任何保证。

### [函数的比较](#toc-entry-3)

#### [情况1） - 非 “读/修改/写”（RMW）操作](#toc-entry-4)

函数变化:

> - atomic\_set() --> refcount\_set()
> - atomic\_read() --> refcount\_read()

内存顺序保证变化:

> - none (两者都是完全无序的)

#### [情况2） - 基于增量的操作，不返回任何值](#toc-entry-5)

函数变化:

> - atomic\_inc() --> refcount\_inc()
> - atomic\_add() --> refcount\_add()

内存顺序保证变化:

> - none (两者都是完全无序的)

#### [情况3） - 基于递减的RMW操作，没有返回值](#toc-entry-6)

函数变化:

> - atomic\_dec() --> refcount\_dec()

内存顺序保证变化:

> - 完全无序的 --> RELEASE顺序

#### [情况4） - 基于增量的RMW操作，返回一个值](#toc-entry-7)

函数变化:

> - atomic\_inc\_not\_zero() --> refcount\_inc\_not\_zero()
> - 无原子性对应函数 --> refcount\_add\_not\_zero()

内存顺序保证变化:

> - 完全有序的 --> 控制依赖于存储的成功

Note

此处 **假设** 了，必要的顺序是作为获得对象指针的结果而提供的。

#### [情况 5） - 基于Dec/Sub递减的通用RMW操作，返回一个值](#toc-entry-8)

函数变化:

> - atomic\_dec\_and\_test() --> refcount\_dec\_and\_test()
> - atomic\_sub\_and\_test() --> refcount\_sub\_and\_test()

内存顺序保证变化:

> - 完全有序的 --> RELEASE顺序 + 成功后ACQUIRE顺序

#### [情况6）其他基于递减的RMW操作，返回一个值](#toc-entry-9)

函数变化:

> - 无原子性对应函数 --> refcount\_dec\_if\_one()
> - atomic\_add\_unless(&var, -1, 1) --> refcount\_dec\_not\_one(&var)

内存顺序保证变化:

> - 完全有序的 --> RELEASE顺序 + 控制依赖

Note

atomic\_add\_unless()只在执行成功时提供完整的顺序。

#### [情况7）--基于锁的RMW](#toc-entry-10)

函数变化:

> - atomic\_dec\_and\_lock() --> refcount\_dec\_and\_lock()
> - atomic\_dec\_and\_mutex\_lock() --> refcount\_dec\_and\_mutex\_lock()

内存顺序保证变化:

> - 完全有序 --> RELEASE顺序 + 控制依赖 + 持有

## 来源、版本与核验

- 来源：[与atomic_t相比，refcount_t的API是这样的](https://docs.kernel.org/translations/zh_CN/core-api/refcount-vs-atomic.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/core-api/refcount-vs-atomic.rst`。
