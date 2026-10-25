---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-networking-netif-msg",
  "title": "Linux 内核：网络接口消息级别",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "networking"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "aa29154587ad99281c87379d0d2246c3d10761e05d427812961c60bb319d29aa",
  "generatedHash": "21f93ec30cfec3690a5463d5c3f4a4783265b6fc2ea18d27422c6f930c1fb259",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "网络接口消息级别设置的设计方案。 调试消息接口的设计遵循并受制于向后兼容性及历史实践。理解其发展历史有助于把握 当前实践，并将其与旧版驱动代码相关联。 自Linux诞生之初，每个网络设备驱动均包含一个本地整型变量以控制调试消息级别。 消息级别范围为0至7，数值越大表示输出越详细。 消息级别的定义在3级之后未明确细化，但实际实现通常与指定级别相差±1。驱动程序",
  "l1": "网络接口消息级别设置的设计方案。 调试消息接口的设计遵循并受制于向后兼容性及历史实践。理解其发展历史有助于把握 当前实践，并将其与旧版驱动代码相关联。 自Linux诞生之初，每个网络设备驱动均包含一个本地整型变量以控制调试消息级别。 消息级别范围为0至7，数值越大表示输出越详细。 消息级别的定义在3级之后未明确细化，但实际实现通常与指定级别相差±1。驱动程序 成熟后，冗余的详细级别消息常被移除。 - 0 最简消息，仅显示致命错误的关键信息。 - 1 标准消息，初始化状态。无运行时消息。 - 2 特殊介质选择消息，通常由定时器驱动。 - 3 接口开启和停止消息，包括正常状态信息。 - 4 Tx/Rx帧错误消息及异常驱动操作。 - 5 Tx数据包队列信息、中断事件。 - 6 每个完成的Tx数据包和接收的Rx数据包状态。 - 7 Tx/Rx数据包初始内容。 最初，该消息级别变量在各驱动中具有唯一",
  "questions": [
    "Linux 内核：网络接口消息级别的原理是什么？",
    "Linux 内核：网络接口消息级别有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-networking-netif-msg",
      "url": "https://docs.kernel.org/translations/zh_CN/networking/netif-msg.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：网络接口消息级别

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 网络接口消息级别

网络接口消息级别设置的设计方案。

### 历史背景

调试消息接口的设计遵循并受制于向后兼容性及历史实践。理解其发展历史有助于把握
当前实践，并将其与旧版驱动代码相关联。

自Linux诞生之初，每个网络设备驱动均包含一个本地整型变量以控制调试消息级别。
消息级别范围为0至7，数值越大表示输出越详细。

消息级别的定义在3级之后未明确细化，但实际实现通常与指定级别相差±1。驱动程序
成熟后，冗余的详细级别消息常被移除。

> - 0 最简消息，仅显示致命错误的关键信息。
> - 1 标准消息，初始化状态。无运行时消息。
> - 2 特殊介质选择消息，通常由定时器驱动。
> - 3 接口开启和停止消息，包括正常状态信息。
> - 4 Tx/Rx帧错误消息及异常驱动操作。
> - 5 Tx数据包队列信息、中断事件。
> - 6 每个完成的Tx数据包和接收的Rx数据包状态。
> - 7 Tx/Rx数据包初始内容。

最初，该消息级别变量在各驱动中具有唯一名称（如"lance\_debug"），便于通过
内核符号调试器定位和修改其设置。模块化内核出现后，变量统一重命名为"debug"，
并作为模块参数设置。

这种方法效果良好。然而，人们始终对附加功能存在需求。多年来，以下功能逐渐
成为合理且易于实现的增强方案：

> - 通过ioctl()调用修改消息级别。
> - 按接口而非驱动设置消息级别。
> - 对发出的消息类型进行更具选择性的控制。

netif\_msg 建议添加了这些功能，仅带来了轻微的复杂性增加和代码规模增长。

推荐方案如下：

> - 保留驱动级整型变量"debug"作为模块参数，默认值为'1'。
> - 添加一个名为 "msg\_enable" 的接口私有变量。该变量是位图而非级别，
>   并按如下方式初始化:
>
>   ```
>     1 << debug
>
>   或更精确地说::
>
>      debug < 0 ? 0 : 1 << min(sizeof(int)-1, debug)
>   ```
>
>   消息应从以下形式更改:
>
>   ```
>   if (debug > 1)
>        printk(MSG_DEBUG "%s: ...
>   ```
>
>   改为:
>
>   ```
>   if (np->msg_enable & NETIF_MSG_LINK)
>        printk(MSG_DEBUG "%s: ...
>   ```

消息级别命名对应关系

> | 旧级别 | 名称 | 位位置 |
> | --- | --- | --- |
> | 1 | NETIF\_MSG\_PROBE | 0x0002 |
> | 2 | NETIF\_MSG\_LINK | 0x0004 |
> | 2 | NETIF\_MSG\_TIMER | 0x0004 |
> | 3 | NETIF\_MSG\_IFDOWN | 0x0008 |
> | 3 | NETIF\_MSG\_IFUP | 0x0008 |
> | 4 | NETIF\_MSG\_RX\_ERR | 0x0010 |
> | 4 | NETIF\_MSG\_TX\_ERR | 0x0010 |
> | 5 | NETIF\_MSG\_TX\_QUEUED | 0x0020 |
> | 5 | NETIF\_MSG\_INTR | 0x0020 |
> | 6 | NETIF\_MSG\_TX\_DONE | 0x0040 |
> | 6 | NETIF\_MSG\_RX\_STATUS | 0x0040 |
> | 7 | NETIF\_MSG\_PKTDATA | 0x0080 |

## 来源、版本与核验

- 来源：[网络接口消息级别](https://docs.kernel.org/translations/zh_CN/networking/netif-msg.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/networking/netif-msg.rst`。
