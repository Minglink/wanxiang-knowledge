---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-security-tpm-tpm-ftpm-tee",
  "title": "Linux 内核：固件TPM驱动",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "security"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "3df0a6e35734976c325bf1ab36ce976704cf646e74056e5718f578b5df2eaadb",
  "generatedHash": "39e3b0efd8b934a2f25a4b9985019c8967d9d63295df72f4227fbb8cff46fd72",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "本文档描述了固件可信平台模块（fTPM）设备驱动。 该驱动程序是用于ARM的TrustZone环境中实现的固件的适配器。该驱动 程序允许程序以与硬件TPM相同的方式与TPM进行交互。 该驱动程序充当一个薄层，传递命令到固件实现的TPM并接收其响应。驱动 程序本身并不包含太多逻辑，更像是固件与内核/用户空间之间的一个管道。 当驱动程序被加载时，它会向用户空间暴",
  "l1": "本文档描述了固件可信平台模块（fTPM）设备驱动。 该驱动程序是用于ARM的TrustZone环境中实现的固件的适配器。该驱动 程序允许程序以与硬件TPM相同的方式与TPM进行交互。 该驱动程序充当一个薄层，传递命令到固件实现的TPM并接收其响应。驱动 程序本身并不包含太多逻辑，更像是固件与内核/用户空间之间的一个管道。 当驱动程序被加载时，它会向用户空间暴露 /dev/tpmX 字符设备，允许 用户空间通过该设备与固件TPM进行通信。",
  "questions": [
    "Linux 内核：固件TPM驱动的原理是什么？",
    "Linux 内核：固件TPM驱动有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-security-tpm-tpm-ftpm-tee",
      "url": "https://docs.kernel.org/translations/zh_CN/security/tpm/tpm_ftpm_tee.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：固件TPM驱动

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 固件TPM驱动

本文档描述了固件可信平台模块（fTPM）设备驱动。

### 介绍

该驱动程序是用于ARM的TrustZone环境中实现的固件的适配器。该驱动
程序允许程序以与硬件TPM相同的方式与TPM进行交互。

### 设计

该驱动程序充当一个薄层，传递命令到固件实现的TPM并接收其响应。驱动
程序本身并不包含太多逻辑，更像是固件与内核/用户空间之间的一个管道。

固件本身基于以下论文：
<https://www.microsoft.com/en-us/research/wp-content/uploads/2017/06/ftpm1.pdf>

当驱动程序被加载时，它会向用户空间暴露 /dev/tpmX 字符设备，允许
用户空间通过该设备与固件TPM进行通信。

## 来源、版本与核验

- 来源：[固件TPM驱动](https://docs.kernel.org/translations/zh_CN/security/tpm/tpm_ftpm_tee.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/security/tpm/tpm_ftpm_tee.rst`。
