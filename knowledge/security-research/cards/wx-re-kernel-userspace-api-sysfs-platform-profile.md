---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-userspace-api-sysfs-platform-profile",
  "title": "Linux 内核：平台配置文件选择（如 /sys/firmware/acpi/platform_profile）",
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
  "snapshotHash": "b6c9a7d7294e9d9625c7644d6dddd91964ccc20d5542a94d1a8360c639a32037",
  "generatedHash": "d4dec6c55b00154b2bace37fe22fffc9a3fe0efb16f00ee08e346c3ebe4ff2fc",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "现代系统中平台性能、温度、风扇和其他硬件相关的特性通常是可以动态配置的。平台 配置通常会根据当前的状态由一些自动机制（很可能存在于内核之外）来自动调整。 这些平台自动调整机制通常能够被配置成多个平台配置文件中的一个，要么偏向节能运 行，要么偏向性能运行。 platform_profile属性的目的是提供一个通用的sysfs API来选择这些平台自动配置 机制",
  "l1": "现代系统中平台性能、温度、风扇和其他硬件相关的特性通常是可以动态配置的。平台 配置通常会根据当前的状态由一些自动机制（很可能存在于内核之外）来自动调整。 这些平台自动调整机制通常能够被配置成多个平台配置文件中的一个，要么偏向节能运 行，要么偏向性能运行。 platform_profile属性的目的是提供一个通用的sysfs API来选择这些平台自动配置 机制的配置文件。 需要注意的是，这个API只能用作选择平台配置文件，用来监测所产生的性能特征并不 是其目标。监测性能最好使用设备/供应商提供的工具，比如turbostat。 具体来说，当选择高性能配置文件时，真实能达到的性能可能受制于多种因素，比如： 其他组件的发热，房间温度，笔记本底部的自由空气流动等。让用户空间知道任何阻碍 达到要求性能水平的局部最优条件，显然不是这个API的目标。 由于数字本身并不能代表一个配置文件会调整的多个变量（功",
  "questions": [
    "Linux 内核：平台配置文件选择（如 /sys/firmware/acpi/platform_profile）的原理是什么？",
    "Linux 内核：平台配置文件选择（如 /sys/firmware/acpi/platform_profile）有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-userspace-api-sysfs-platform-profile",
      "url": "https://docs.kernel.org/translations/zh_CN/userspace-api/sysfs-platform_profile.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：平台配置文件选择（如 /sys/firmware/acpi/platform_profile）

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 平台配置文件选择（如 /sys/firmware/acpi/platform\_profile）

现代系统中平台性能、温度、风扇和其他硬件相关的特性通常是可以动态配置的。平台
配置通常会根据当前的状态由一些自动机制（很可能存在于内核之外）来自动调整。

这些平台自动调整机制通常能够被配置成多个平台配置文件中的一个，要么偏向节能运
行，要么偏向性能运行。

platform\_profile属性的目的是提供一个通用的sysfs API来选择这些平台自动配置
机制的配置文件。

需要注意的是，这个API只能用作选择平台配置文件，用来监测所产生的性能特征并不
是其目标。监测性能最好使用设备/供应商提供的工具，比如turbostat。

具体来说，当选择高性能配置文件时，真实能达到的性能可能受制于多种因素，比如：
其他组件的发热，房间温度，笔记本底部的自由空气流动等。让用户空间知道任何阻碍
达到要求性能水平的局部最优条件，显然不是这个API的目标。

由于数字本身并不能代表一个配置文件会调整的多个变量（功耗，发热等），这个API
使用字符串来描述多种配置文件。为了保证用户空间能够获得一致的体验，
sysfs-platform\_profile ABI 文档定义了一个固定的配置文件名集合。驱动程序
*必须* 将它们内置的配置文件表示映射到这个固定的集合中。

如果映射时没有很好的匹配，可以添加一个新的配置文件名称。驱动希望引入的新配置
文件名称时必须：

> 1. 解释为什么无法使用已有的配置文件名称。
> 2. 添加一个新的配置文件名称，以及预期行为的清晰描述，保存到
>    sysfs-platform\_profile ABI文档中。

## 来源、版本与核验

- 来源：[平台配置文件选择（如 /sys/firmware/acpi/platform_profile）](https://docs.kernel.org/translations/zh_CN/userspace-api/sysfs-platform_profile.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/userspace-api/sysfs-platform_profile.rst`。
