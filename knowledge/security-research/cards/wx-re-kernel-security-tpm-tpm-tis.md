---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-security-tpm-tpm-tis",
  "title": "Linux 内核：TPM FIFO接口驱动",
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
  "snapshotHash": "4fe49fe9a0b4d786093efbab95df30f1ea6ae33e64dd167f25bea3ab40a01c61",
  "generatedHash": "971bda8024238b1aa9aa89d5f62c99e30990b3939ca2704ed8a81ad500553a69",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "TCG PTP规范定义了两种接口类型：FIFO和CRB。前者基于顺序的读写操作， 后者基于包含完整命令或响应的缓冲区。 FIFO（先进先出）接口被tpm_tis_core依赖的驱动程序使用。最初，Linux只 有一个名为tpm_tis的驱动，覆盖了内存映射（即 MMIO）接口，但后来它被 扩展以支持TCG标准所支持的其他物理接口。 由于历史原因，最初的MMI",
  "l1": "TCG PTP规范定义了两种接口类型：FIFO和CRB。前者基于顺序的读写操作， 后者基于包含完整命令或响应的缓冲区。 FIFO（先进先出）接口被tpm_tis_core依赖的驱动程序使用。最初，Linux只 有一个名为tpm_tis的驱动，覆盖了内存映射（即 MMIO）接口，但后来它被 扩展以支持TCG标准所支持的其他物理接口。 由于历史原因，最初的MMIO驱动被称为tpm_tis，而FIFO驱动的框架被命名为 tpm_tis_core。在tpm_tis中的“tis”后缀来自TPM接口规范，这是针对TPM1.x 芯片的硬件接口规范。 通信基于一个由TPM芯片通过硬件总线或内存映射共享的20KiB 缓冲区，具体 取决于物理接线。该缓冲区进一步分为五个相等大小的4KiB缓冲区，为CPU和 TPM之间的通信提供等效的寄存器集。这些通信端点在TCG术语中称为localities。 当内核想要向T",
  "questions": [
    "Linux 内核：TPM FIFO接口驱动的原理是什么？",
    "Linux 内核：TPM FIFO接口驱动有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-security-tpm-tpm-tis",
      "url": "https://docs.kernel.org/translations/zh_CN/security/tpm/tpm_tis.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：TPM FIFO接口驱动

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## TPM FIFO接口驱动

TCG PTP规范定义了两种接口类型：FIFO和CRB。前者基于顺序的读写操作，
后者基于包含完整命令或响应的缓冲区。

FIFO（先进先出）接口被tpm\_tis\_core依赖的驱动程序使用。最初，Linux只
有一个名为tpm\_tis的驱动，覆盖了内存映射（即 MMIO）接口，但后来它被
扩展以支持TCG标准所支持的其他物理接口。

由于历史原因，最初的MMIO驱动被称为tpm\_tis，而FIFO驱动的框架被命名为
tpm\_tis\_core。在tpm\_tis中的“tis”后缀来自TPM接口规范，这是针对TPM1.x
芯片的硬件接口规范。

通信基于一个由TPM芯片通过硬件总线或内存映射共享的20KiB 缓冲区，具体
取决于物理接线。该缓冲区进一步分为五个相等大小的4KiB缓冲区，为CPU和
TPM之间的通信提供等效的寄存器集。这些通信端点在TCG术语中称为localities。

当内核想要向TPM芯片发送命令时，它首先通过在TPM\_ACCESS寄存器中设置
requestUse位来保留locality0。当访问被授予时，该位由芯片清除。一旦完成
通信，内核会写入TPM\_ACCESS.activeLocality位。这告诉芯片该本地性已被
释放。

待处理的本地性由芯片按优先级降序逐个服务，一次一个：

- Locality0优先级最低。
- Locality5优先级最高。

关于localities的更多信息和含义，请参阅TCG PC客户端平台TPM 配置文件规范的第3.2节。

## 参考文献

TCG PC客户端平台TPM配置文件（PTP）规范
<https://trustedcomputinggroup.org/resource/pc-client-platform-tpm-profile-ptp-specification/>

## 来源、版本与核验

- 来源：[TPM FIFO接口驱动](https://docs.kernel.org/translations/zh_CN/security/tpm/tpm_tis.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/security/tpm/tpm_tis.rst`。
