---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-driver-api-io-ordering",
  "title": "Linux 内核：对内存映射地址的I/O写入排序",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "driver-api"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "63e923c6a7dc6f6713fb8e20b23c776430a05eb8582b4bf8cc923ba186809492",
  "generatedHash": "c468112f0606d890a3c61e3062f38c91d6e16fc7d322f66ae942d598304b872a",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "在某些平台上，所谓的内存映射I/O是弱顺序。在这些平台上，驱动开发者有责任 保证I/O内存映射地址的写操作按程序图意的顺序达到设备。通常读取一个“安全” 设备寄存器或桥寄存器，触发IO芯片清刷未处理的写操作到达设备后才处理读操作， 而达到保证目的。驱动程序通常在spinlock保护的临界区退出之前使用这种技术。 这也可以保证后面的写操作只在前面的写操作之后到",
  "l1": "在某些平台上，所谓的内存映射I/O是弱顺序。在这些平台上，驱动开发者有责任 保证I/O内存映射地址的写操作按程序图意的顺序达到设备。通常读取一个“安全” 设备寄存器或桥寄存器，触发IO芯片清刷未处理的写操作到达设备后才处理读操作， 而达到保证目的。驱动程序通常在spinlock保护的临界区退出之前使用这种技术。 这也可以保证后面的写操作只在前面的写操作之后到达设备（这非常类似于内存 屏障操作，mb()，不过仅适用于I/O）。 假设一个设备驱动程的具体例子: 上述例子中，设备可能会先接收到newval2的值，然后接收到newval的值，问题就 发生了。不过很容易通过下面方法来修复: 在解决方案中，读取safe_register寄存器，触发IO芯片清刷未处理的写操作， 再处理后面的读操作，防止引发数据不一致问题。",
  "questions": [
    "Linux 内核：对内存映射地址的I/O写入排序的原理是什么？",
    "Linux 内核：对内存映射地址的I/O写入排序有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-driver-api-io-ordering",
      "url": "https://docs.kernel.org/translations/zh_CN/driver-api/io_ordering.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：对内存映射地址的I/O写入排序

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 对内存映射地址的I/O写入排序

在某些平台上，所谓的内存映射I/O是弱顺序。在这些平台上，驱动开发者有责任
保证I/O内存映射地址的写操作按程序图意的顺序达到设备。通常读取一个“安全”
设备寄存器或桥寄存器，触发IO芯片清刷未处理的写操作到达设备后才处理读操作，
而达到保证目的。驱动程序通常在spinlock保护的临界区退出之前使用这种技术。
这也可以保证后面的写操作只在前面的写操作之后到达设备（这非常类似于内存
屏障操作，mb()，不过仅适用于I/O）。

假设一个设备驱动程的具体例子:

```
        ...
CPU A:  spin_lock_irqsave(&dev_lock, flags)
CPU A:  val = readl(my_status);
CPU A:  ...
CPU A:  writel(newval, ring_ptr);
CPU A:  spin_unlock_irqrestore(&dev_lock, flags)
        ...
CPU B:  spin_lock_irqsave(&dev_lock, flags)
CPU B:  val = readl(my_status);
CPU B:  ...
CPU B:  writel(newval2, ring_ptr);
CPU B:  spin_unlock_irqrestore(&dev_lock, flags)
        ...
```

上述例子中，设备可能会先接收到newval2的值，然后接收到newval的值，问题就
发生了。不过很容易通过下面方法来修复:

```
        ...
CPU A:  spin_lock_irqsave(&dev_lock, flags)
CPU A:  val = readl(my_status);
CPU A:  ...
CPU A:  writel(newval, ring_ptr);
CPU A:  (void)readl(safe_register); /* 配置寄存器？*/
CPU A:  spin_unlock_irqrestore(&dev_lock, flags)
        ...
CPU B:  spin_lock_irqsave(&dev_lock, flags)
CPU B:  val = readl(my_status);
CPU B:  ...
CPU B:  writel(newval2, ring_ptr);
CPU B:  (void)readl(safe_register); /* 配置寄存器？*/
CPU B:  spin_unlock_irqrestore(&dev_lock, flags)
```

在解决方案中，读取safe\_register寄存器，触发IO芯片清刷未处理的写操作，
再处理后面的读操作，防止引发数据不一致问题。

## 来源、版本与核验

- 来源：[对内存映射地址的I/O写入排序](https://docs.kernel.org/translations/zh_CN/driver-api/io_ordering.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/driver-api/io_ordering.rst`。
