---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-devicetree-changesets",
  "title": "Linux 内核：设备树变更集",
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
  "snapshotHash": "e19204834ed02b5db89e59133824228df6b1a2ecdcf4d41a78d96501708168f3",
  "generatedHash": "9e4afe4f539fde2ed8f16096784b0068779888426d5e9265748adac20fb8f6ab",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "设备树变更集是一种方法，它允许人们以这样一种方式在实时树中使用变化，即要么使用全部的 变化，要么不使用。如果在使用变更集的过程中发生错误，那么树将被回滚到之前的状态。一个 变更集也可以在使用后被删除。 当一个变更集被使用时，所有的改变在发出OF_RECONFIG通知器之前被一次性使用到树上。这是 为了让接收者在收到通知时看到一个完整的、一致的树的状态。 1.",
  "l1": "设备树变更集是一种方法，它允许人们以这样一种方式在实时树中使用变化，即要么使用全部的 变化，要么不使用。如果在使用变更集的过程中发生错误，那么树将被回滚到之前的状态。一个 变更集也可以在使用后被删除。 当一个变更集被使用时，所有的改变在发出OF_RECONFIG通知器之前被一次性使用到树上。这是 为了让接收者在收到通知时看到一个完整的、一致的树的状态。 1. of_changeset_init() - 初始化一个变更集。 2. 一些DT树变化的调用，of_changeset_attach_node(), of_changeset_detach_node(), of_changeset_add_property(), of_changeset_remove_property, of_changeset_update_property()来准备一组变更。此时不会对活动树做任何变更。所有 的变更",
  "questions": [
    "Linux 内核：设备树变更集的原理是什么？",
    "Linux 内核：设备树变更集有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-devicetree-changesets",
      "url": "https://docs.kernel.org/translations/zh_CN/devicetree/changesets.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：设备树变更集

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 设备树变更集

设备树变更集是一种方法，它允许人们以这样一种方式在实时树中使用变化，即要么使用全部的
变化，要么不使用。如果在使用变更集的过程中发生错误，那么树将被回滚到之前的状态。一个
变更集也可以在使用后被删除。

当一个变更集被使用时，所有的改变在发出OF\_RECONFIG通知器之前被一次性使用到树上。这是
为了让接收者在收到通知时看到一个完整的、一致的树的状态。

一个变化集的顺序如下。

1. of\_changeset\_init() - 初始化一个变更集。
2. 一些DT树变化的调用，of\_changeset\_attach\_node(), of\_changeset\_detach\_node(),
   of\_changeset\_add\_property(), of\_changeset\_remove\_property,
   of\_changeset\_update\_property()来准备一组变更。此时不会对活动树做任何变更。所有
   的变更操作都记录在of\_changeset的 entries 列表中。
3. of\_changeset\_apply() - 将变更使用到树上。要么整个变更集被使用，要么如果有错误，
   树会被恢复到之前的状态。核心通过锁确保正确的顺序。如果需要的话，可以使用一个解锁的
   \_\_of\_changeset\_apply版本。

如果一个成功使用的变更集需要被删除，可以用of\_changeset\_revert()来完成。

## 来源、版本与核验

- 来源：[设备树变更集](https://docs.kernel.org/translations/zh_CN/devicetree/changesets.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/devicetree/changesets.rst`。
