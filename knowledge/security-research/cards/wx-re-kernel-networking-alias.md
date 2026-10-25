---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-networking-alias",
  "title": "Linux 内核：IP别名",
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
  "snapshotHash": "98c2ece31d6299cdf910971218485878d0a9e5c73ac98b63e782fdff821dfba8",
  "generatedHash": "513abb33d9de98fa5299c163daa8fd25224717f8f4c2a2ac742a2c75cb2ccd21",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "IP别名是管理每个接口存在多个IP地址/子网掩码的一种过时方法。 虽然更新的工具如iproute2支持每个接口多个地址/前缀， 但为了向后兼容性，别名仍被支持。 别名通过在使用 ifconfig 时在接口名后添加冒号和一个字符串来创建。 这个字符串通常是数字，但并非必须。 别名的创建是通过“特殊的”接口命名机制完成的：例如， 要为eth0创建一个 200.1",
  "l1": "IP别名是管理每个接口存在多个IP地址/子网掩码的一种过时方法。 虽然更新的工具如iproute2支持每个接口多个地址/前缀， 但为了向后兼容性，别名仍被支持。 别名通过在使用 ifconfig 时在接口名后添加冒号和一个字符串来创建。 这个字符串通常是数字，但并非必须。 别名的创建是通过“特殊的”接口命名机制完成的：例如， 要为eth0创建一个 200.1.1.1 的别名... 该命令也会设置相应的路由表项。请注意：路由表项始终指向基础接口。 通过关闭别名即可将其删除: 别名不是真实的设备，但程序应该能够正常配置和引用它们（ifconfig、route等）。 如果基础设备被关闭，则其上添加的所有别名也将被删除。",
  "questions": [
    "Linux 内核：IP别名的原理是什么？",
    "Linux 内核：IP别名有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-networking-alias",
      "url": "https://docs.kernel.org/translations/zh_CN/networking/alias.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：IP别名

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## IP别名

IP别名是管理每个接口存在多个IP地址/子网掩码的一种过时方法。
虽然更新的工具如iproute2支持每个接口多个地址/前缀，
但为了向后兼容性，别名仍被支持。

别名通过在使用 ifconfig 时在接口名后添加冒号和一个字符串来创建。
这个字符串通常是数字，但并非必须。

### 别名创建

别名的创建是通过“特殊的”接口命名机制完成的：例如，
要为eth0创建一个 200.1.1.1 的别名...

```
# ifconfig eth0:0 200.1.1.1  等等
      ~~ -> 请求为eth0创建别名#0（如果尚不存在）
```

该命令也会设置相应的路由表项。请注意：路由表项始终指向基础接口。

### 别名删除

通过关闭别名即可将其删除:

```
# ifconfig eth0:0 down
      ~~~~~~~~~~ -> 将删除别名
```

### 别名（重新）配置

别名不是真实的设备，但程序应该能够正常配置和引用它们（ifconfig、route等）。

### 与主设备的关系

如果基础设备被关闭，则其上添加的所有别名也将被删除。

## 来源、版本与核验

- 来源：[IP别名](https://docs.kernel.org/translations/zh_CN/networking/alias.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/networking/alias.rst`。
