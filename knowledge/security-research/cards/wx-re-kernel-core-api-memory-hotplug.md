---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-core-api-memory-hotplug",
  "title": "Linux 内核：内存热插拔",
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
  "snapshotHash": "bd7f8de20a65102fcf19d2b7bf483f4c77bb3ae06acc24bce396296c5a067f11",
  "generatedHash": "62740bfdc727dab84af5e4b42fdf31a4054635f18b086453143cfee7cc4f0fb2",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "热插拔事件被发送到一个通知队列中。 在 include/linux/memory.h 中定义了六种类型的通知： MEM_GOING_ONLINE :   在新内存可用之前生成，以便能够为子系统处理内存做准备。页面分配器仍然无法从新 的内存中进行分配。 MEM_ONLINE :   当内存成功上线时产生。回调可以从新的内存中分配页面。 MEM_GOING_OF",
  "l1": "热插拔事件被发送到一个通知队列中。 在 include/linux/memory.h 中定义了六种类型的通知： MEM_GOING_ONLINE :   在新内存可用之前生成，以便能够为子系统处理内存做准备。页面分配器仍然无法从新 的内存中进行分配。 MEM_ONLINE :   当内存成功上线时产生。回调可以从新的内存中分配页面。 MEM_GOING_OFFLINE :   在开始对内存进行下线处理时生成。从内存中的分配不再可能，但是一些要下线的内存 仍然在使用。回调可以用来释放一个子系统在指定内存块中已知的内存。 MEM_CANCEL_OFFLINE :   如果MEM_GOING_OFFLINE失败，则生成。来自我们试图离线的内存块中的内存又可以使 用了。 可以通过调用如下函数来注册一个回调程序: 优先级数值较高的回调函数在数值较低的回调函数之前被调用。 一个回调函数必须有以下原型:",
  "questions": [
    "Linux 内核：内存热插拔的原理是什么？",
    "Linux 内核：内存热插拔有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-core-api-memory-hotplug",
      "url": "https://docs.kernel.org/translations/zh_CN/core-api/memory-hotplug.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：内存热插拔

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 内存热插拔

### 内存热拔插事件通知器

热插拔事件被发送到一个通知队列中。

在 include/linux/memory.h 中定义了六种类型的通知：

MEM\_GOING\_ONLINE
:   在新内存可用之前生成，以便能够为子系统处理内存做准备。页面分配器仍然无法从新
    的内存中进行分配。

MEM\_CANCEL\_ONLINE
:   如果MEM\_GOING\_ONLINE失败，则生成。

MEM\_ONLINE
:   当内存成功上线时产生。回调可以从新的内存中分配页面。

MEM\_GOING\_OFFLINE
:   在开始对内存进行下线处理时生成。从内存中的分配不再可能，但是一些要下线的内存
    仍然在使用。回调可以用来释放一个子系统在指定内存块中已知的内存。

MEM\_CANCEL\_OFFLINE
:   如果MEM\_GOING\_OFFLINE失败，则生成。来自我们试图离线的内存块中的内存又可以使
    用了。

MEM\_OFFLINE
:   在内存下线完成后生成。

可以通过调用如下函数来注册一个回调程序:

> hotplug\_memory\_notifier(callback\_func, priority)

优先级数值较高的回调函数在数值较低的回调函数之前被调用。

一个回调函数必须有以下原型:

```
int callback_func(
  struct notifier_block *self, unsigned long action, void *arg);
```

回调函数的第一个参数（self）是指向回调函数本身的通知器链块的一个指针。第二个参
数（action）是上述的事件类型之一。第三个参数（arg）传递一个指向
memory\_notify结构体的指针:

```
struct memory_notify {
        unsigned long start_pfn;
        unsigned long nr_pages;
        int status_change_nid;
}
```

- start\_pfn是在线/离线内存的start\_pfn。
- nr\_pages是在线/离线内存的页数。
- status\_change\_nid是当nodemask的N\_MEMORY被（将）设置/清除时设置的节点id。这
  意味着一个新的（没上线的）节点通过联机获得新的内存，而一个节点失去了所有的内
  存。如果这个值为-1，那么nodemask的状态就不会改变。

  如果 status\_changed\_nid\* >= 0，回调应该在必要时为节点创建/丢弃结构体。

回调程序应返回 include/linux/notifier.h 中定义的NOTIFY\_DONE, NOTIFY\_OK,
NOTIFY\_BAD, NOTIFY\_STOP中的一个值。

NOTIFY\_DONE和NOTIFY\_OK对进一步处理没有影响。

NOTIFY\_BAD是作为对MEM\_GOING\_ONLINE、MEM\_GOING\_OFFLINE、MEM\_ONLINE或MEM\_OFFLINE
动作的回应，用于取消热插拔。它停止对通知队列的进一步处理。

NOTIFY\_STOP停止对通知队列的进一步处理。

### 内部锁

当添加/删除使用内存块设备（即普通RAM）的内存时，device\_hotplug\_lock应该被保持
为:

- 针对在线/离线请求进行同步（例如，通过sysfs）。这样一来，内存块设备只有在内存
  被完全添加后才能被用户空间访问（.online/.state属性）。而在删除内存时，我们知
  道没有人在临界区。
- 与CPU热拔插或类似操作同步（例如ACPI和PPC相关操作）

特别是，在添加内存和用户空间试图以比预期更快的速度上线该内存时，有可能出现锁反转，
使用device\_hotplug\_lock可以避免此情况:

- device\_online()将首先接受device\_lock()，然后是mem\_hotplug\_lock。
- add\_memory\_resource()将首先使用mem\_hotplug\_lock，然后是device\_lock()（在创
  建设备时，在bus\_add\_device()期间）。

由于在使用device\_lock()之前，设备对用户空间是可见的，这可能导致锁的反转。

内存的上线/下线应该通过device\_online()/device\_offline()完成————确保它与通过
sysfs进行的操作正确同步。建议持有device\_hotplug\_lock（例如，保护online\_type）。

当添加/删除/上线/下线内存或者添加/删除异构或设备内存时，我们应该始终持有写模式的
mem\_hotplug\_lock，以序列化内存热插拔（例如访问全局/区域变量）。

此外，mem\_hotplug\_lock（与device\_hotplug\_lock相反）在读取模式下允许一个相当
有效的get\_online\_mems/put\_online\_mems实现，所以访问内存的代码可以防止该内存
消失。

## 来源、版本与核验

- 来源：[内存热插拔](https://docs.kernel.org/translations/zh_CN/core-api/memory-hotplug.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/core-api/memory-hotplug.rst`。
