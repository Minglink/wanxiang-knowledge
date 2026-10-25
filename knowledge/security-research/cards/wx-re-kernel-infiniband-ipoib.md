---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-infiniband-ipoib",
  "title": "Linux 内核：infiniband上的IP（IPoIB）",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "infiniband"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "31f86a33e3867c7593f5c549b09ec3fb2c3a8fb016dcd4ad3d77fffe66b967c4",
  "generatedHash": "200b8079a621d49111b4fcdbac385b299b7bbef37145612b4e7012bc0eed28f3",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "ib_ipoib驱动是IETF ipoib工作组发布的RFC 4391和4392所规定的 infiniband上IP协议的一个实现。它是一个“本地”实现，即把接口类型设置为 ARPHRD_INFINIBAND，硬件地址长度为20（早期的专有实现向内核伪装为以太网 接口）。 当IPoIB驱动被加载时，它会使用索引为0的P_Key给每个端口创建一个接口。要用 不",
  "l1": "ib_ipoib驱动是IETF ipoib工作组发布的RFC 4391和4392所规定的 infiniband上IP协议的一个实现。它是一个“本地”实现，即把接口类型设置为 ARPHRD_INFINIBAND，硬件地址长度为20（早期的专有实现向内核伪装为以太网 接口）。 当IPoIB驱动被加载时，它会使用索引为0的P_Key给每个端口创建一个接口。要用 不同的P_Key创建一个接口，将所需的P_Key写入主接口的 /sys/class/net/<intf name>/create_child文件里面。比如说: 这将用P_Key 0x8001创建一个名为ib0.8001的接口。要删除一个子接口，使用 delete_child 文件: 任何接口的P_Key都由“pkey”文件给出，而子接口的主接口在“parent”中。 子接口的创建/删除也可以使用IPoIB的rtnl_link_ops来完成",
  "questions": [
    "Linux 内核：infiniband上的IP（IPoIB）的原理是什么？",
    "Linux 内核：infiniband上的IP（IPoIB）有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-infiniband-ipoib",
      "url": "https://docs.kernel.org/translations/zh_CN/infiniband/ipoib.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：infiniband上的IP（IPoIB）

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## infiniband上的IP（IPoIB）

> ib\_ipoib驱动是IETF ipoib工作组发布的RFC 4391和4392所规定的
> infiniband上IP协议的一个实现。它是一个“本地”实现，即把接口类型设置为
> ARPHRD\_INFINIBAND，硬件地址长度为20（早期的专有实现向内核伪装为以太网
> 接口）。

### 分区和P\_Keys

> 当IPoIB驱动被加载时，它会使用索引为0的P\_Key给每个端口创建一个接口。要用
> 不同的P\_Key创建一个接口，将所需的P\_Key写入主接口的
> /sys/class/net/<intf name>/create\_child文件里面。比如说:
>
> ```
> echo 0x8001 > /sys/class/net/ib0/create_child
> ```
>
> 这将用P\_Key 0x8001创建一个名为ib0.8001的接口。要删除一个子接口，使用
> delete\_child 文件:
>
> ```
> echo 0x8001 > /sys/class/net/ib0/delete_child
> ```
>
> 任何接口的P\_Key都由“pkey”文件给出，而子接口的主接口在“parent”中。
>
> 子接口的创建/删除也可以使用IPoIB的rtnl\_link\_ops来完成，使用两种
> 方式创建的子接口的行为是一样的。

### 数据报与连接模式

> IPoIB驱动支持两种操作模式：数据报和连接。模式是通过接口的
> /sys/class/net/<intf name>/mode文件设置和读取的。
>
> 在数据报模式下，使用IB UD（不可靠数据报）传输，因此接口MTU等于IB L2 MTU
> 减去IPoIB封装头（4字节）。例如，在一个典型的具有2K MTU的IB结构中，IPoIB
> MTU将是2048 - 4 = 2044字节。
>
> 在连接模式下，使用IB RC（可靠的连接）传输。连接模式利用IB传输的连接特性，
> 允许MTU达到最大的IP包大小64K，这减少了处理大型UDP数据包、TCP段等所需的
> IP包数量，提高了大型信息的性能。
>
> 在连接模式下，接口的UD QP仍被用于组播和与不支持连接模式的对等体的通信。
> 在这种情况下，ICMP PMTU数据包的RX仿真被用来使网络堆栈对这些邻居使用较
> 小的UD MTU。

### 无状态卸载

> 如果IB HW支持IPoIB无状态卸载，IPoIB会向网络堆栈广播TCP/IP校验和/或大量
> 传送（LSO）负载转移能力。
>
> 大量传送（LSO）负载转移也已实现，可以使用ethtool调用打开/关闭。目前，LRO
> 只支持具有校验和卸载能力的设备。
>
> 无状态卸载只在数据报模式下支持。

### 中断管理

> 如果底层IB设备支持CQ事件管理，可以使用ethtool来设置中断缓解参数，从而减少
> 处理中断产生的开销。IPoIB的主要代码路径不使用TX完成信号的事件，所以只支持
> RX管理。

### 调试信息

> 通过将CONFIG\_INFINIBAND\_IPOIB\_DEBUG设置为“y”来编译IPoIB驱动，跟踪信
> 息被编译到驱动中。通过将模块参数debug\_level和mcast\_debug\_level设置为1来
> 打开它们。这些参数可以在运行时通过/sys/module/ib\_ipoib/的文件来控制。
>
> CONFIG\_INFINIBAND\_IPOIB\_DEBUG也启用debugfs虚拟文件系统中的文件。通过挂
> 载这个文件系统，例如用:
>
> ```
> mount -t debugfs none /sys/kernel/debug
> ```
>
> 可以从/sys/kernel/debug/ipoib/ib0\_mcg等文件中获得关于多播组的统计数据。
>
> 这个选项对性能的影响可以忽略不计，所以在正常运行时，在debug\_level设置为
> 0的情况下启用这个选项是安全的。
>
> CONFIG\_INFINIBAND\_IPOIB\_DEBUG\_DATA当data\_debug\_level设置为1时，可以
> 在数据路径中启用更多的调试输出。 然而，即使禁用输出，启用这个配置选项也
> 会影响性能，因为它在快速路径中增加了测试。

### 引用

> 在InfiniBand上传输IP（IPoIB）（RFC 4391）。
> :   <http://ietf.org/rfc/rfc4391.txt>
>
> infiniband上的IP:上的IP架构（RFC 4392）。
> :   <http://ietf.org/rfc/rfc4392.txt>
>
> infiniband上的IP: 连接模式 (RFC 4755)
> :   <http://ietf.org/rfc/rfc4755.txt>

## 来源、版本与核验

- 来源：[infiniband上的IP（IPoIB）](https://docs.kernel.org/translations/zh_CN/infiniband/ipoib.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/infiniband/ipoib.rst`。
