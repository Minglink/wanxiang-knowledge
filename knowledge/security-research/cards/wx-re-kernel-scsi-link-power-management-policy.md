---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-scsi-link-power-management-policy",
  "title": "Linux 内核：链路电源管理策略",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "scsi"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "53de6f24192a394114c8aaebfa14fbd84c0c572a42232a037518ec08cc393b3d",
  "generatedHash": "4ef2e38e8aab7ee166954840fda8f6740b2a0e05faa22ef8d1ef6cc43b1b0109",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "该参数允许用户设置链路（接口）的电源管理模式。 共计三类可选项：",
  "l1": "该参数允许用户设置链路（接口）的电源管理模式。 共计三类可选项：",
  "questions": [
    "Linux 内核：链路电源管理策略的原理是什么？",
    "Linux 内核：链路电源管理策略有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-scsi-link-power-management-policy",
      "url": "https://docs.kernel.org/translations/zh_CN/scsi/link_power_management_policy.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：链路电源管理策略

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 链路电源管理策略

该参数允许用户设置链路（接口）的电源管理模式。
共计三类可选项：

| 选项 | 作用 |
| --- | --- |
| min\_power | 指示控制器在可能的情况下尽量使链路处于最低功耗。 这可能会牺牲一定的性能，因为从低功耗状态恢复时会增加延迟。 |
| max\_performance | 通常，这意味着不进行电源管理。指示 控制器优先考虑性能而非电源管理。 |
| medium\_power | 指示控制器在可能的情况下进入较低功耗状态， 而非最低功耗状态，从而改善min\_power模式下的延迟。 |

## 来源、版本与核验

- 来源：[链路电源管理策略](https://docs.kernel.org/translations/zh_CN/scsi/link_power_management_policy.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/scsi/link_power_management_policy.rst`。
