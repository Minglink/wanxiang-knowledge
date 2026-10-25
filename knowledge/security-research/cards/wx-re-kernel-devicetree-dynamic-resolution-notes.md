---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-devicetree-dynamic-resolution-notes",
  "title": "Linux 内核：Devicetree动态解析器说明",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "devicetree"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "909f6df2085beebb5ddabd98c122cdfe7629ba9358de770936fe563d30907ed0",
  "generatedHash": "d79f5185da34ea40b80eca9cf0e0f45bb96fb569f24909c002158410a5b79791",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "本文描述了内核内DeviceTree解析器的实现，它位于drivers/of/resolver.c中。 解析器被赋予一个任意的树作为输入，该树用适当的dtc选项编译，并有一个/plugin/标签。这就产 生了适当的__fixups__和__local_fixups__节点。 解析器依次通过以下步骤工作: 1. 从实时树中获取最大的设备树phandle值 + ",
  "l1": "本文描述了内核内DeviceTree解析器的实现，它位于drivers/of/resolver.c中。 解析器被赋予一个任意的树作为输入，该树用适当的dtc选项编译，并有一个/plugin/标签。这就产 生了适当的__fixups__和__local_fixups__节点。 解析器依次通过以下步骤工作: 1. 从实时树中获取最大的设备树phandle值 + 1. 2. 调整树的所有本地 phandles，以解决这个量。 3. 使用 __local__fixups__ 节点信息以相同的量调整所有本地引用。 4. 对于__fixups__节点中的每个属性，找到它在实时树中引用的节点。这是用来标记该节点的标签。 5. 检索fixup的目标的phandle。 6. 对于属性中的每个fixup，找到节点:属性:偏移的位置，并用phandle值替换它。",
  "questions": [
    "Linux 内核：Devicetree动态解析器说明的原理是什么？",
    "Linux 内核：Devicetree动态解析器说明有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-devicetree-dynamic-resolution-notes",
      "url": "https://docs.kernel.org/translations/zh_CN/devicetree/dynamic-resolution-notes.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：Devicetree动态解析器说明

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## Devicetree动态解析器说明

本文描述了内核内DeviceTree解析器的实现，它位于drivers/of/resolver.c中。

### 解析器如何工作？

解析器被赋予一个任意的树作为输入，该树用适当的dtc选项编译，并有一个/plugin/标签。这就产
生了适当的\_\_fixups\_\_和\_\_local\_fixups\_\_节点。

解析器依次通过以下步骤工作:

1. 从实时树中获取最大的设备树phandle值 + 1.
2. 调整树的所有本地 phandles，以解决这个量。
3. 使用 \_\_local\_\_fixups\_\_ 节点信息以相同的量调整所有本地引用。
4. 对于\_\_fixups\_\_节点中的每个属性，找到它在实时树中引用的节点。这是用来标记该节点的标签。
5. 检索fixup的目标的phandle。
6. 对于属性中的每个fixup，找到节点:属性:偏移的位置，并用phandle值替换它。

## 来源、版本与核验

- 来源：[Devicetree动态解析器说明](https://docs.kernel.org/translations/zh_CN/devicetree/dynamic-resolution-notes.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/devicetree/dynamic-resolution-notes.rst`。
