---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-scsi-scsi",
  "title": "Linux 内核：SCSI子系统文档",
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
  "snapshotHash": "2470e94d86adde91cb76a3d80240836749b016c3ab236d9a601a58347fdcff2f",
  "generatedHash": "bcd513d4c2a170ddcedd99796f0a91c248a8d462cc10889cbdbe333c833c9f71",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "Linux文档项目（LDP）维护了一份描述Linux内核（lk） 2.4中SCSI 子系统的文档。请参考： <https://www.tldp.org/HOWTO/SCSI-2.4-HOWTO> 。LDP提供单页和 多页的HTML版本，以及PostScript与PDF格式的文档。 Linux内核中的SCSI支持可以根据终端用户的需求以不同的方式模块 化。为了",
  "l1": "Linux文档项目（LDP）维护了一份描述Linux内核（lk） 2.4中SCSI 子系统的文档。请参考： <https://www.tldp.org/HOWTO/SCSI-2.4-HOWTO> 。LDP提供单页和 多页的HTML版本，以及PostScript与PDF格式的文档。 Linux内核中的SCSI支持可以根据终端用户的需求以不同的方式模块 化。为了理解你的选择，我们首先需要定义一些术语。 scsi-core（也被称为“中间层”）包含SCSI支持的核心。没有他你将 无法使用任何其他SCSI驱动程序。SCSI核心支持可以是一个模块（ scsi_mod.o），也可以编译进内核。如果SCSI核心是一个模块，那么 他必须是第一个被加载的SCSI模块，如果你将卸载该模块，那么他必 须是最后一个被卸载的模块。实际上，modprobe和rmmod命令将确保 SCSI子系统中模块加载与卸载的正确顺",
  "questions": [
    "Linux 内核：SCSI子系统文档的原理是什么？",
    "Linux 内核：SCSI子系统文档有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-scsi-scsi",
      "url": "https://docs.kernel.org/translations/zh_CN/scsi/scsi.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：SCSI子系统文档

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## SCSI子系统文档

Linux文档项目（LDP）维护了一份描述Linux内核（lk） 2.4中SCSI
子系统的文档。请参考：
<https://www.tldp.org/HOWTO/SCSI-2.4-HOWTO> 。LDP提供单页和
多页的HTML版本，以及PostScript与PDF格式的文档。

### 在SCSI子系统中使用模块的注意事项

Linux内核中的SCSI支持可以根据终端用户的需求以不同的方式模块
化。为了理解你的选择，我们首先需要定义一些术语。

scsi-core（也被称为“中间层”）包含SCSI支持的核心。没有他你将
无法使用任何其他SCSI驱动程序。SCSI核心支持可以是一个模块（
scsi\_mod.o），也可以编译进内核。如果SCSI核心是一个模块，那么
他必须是第一个被加载的SCSI模块，如果你将卸载该模块，那么他必
须是最后一个被卸载的模块。实际上，modprobe和rmmod命令将确保
SCSI子系统中模块加载与卸载的正确顺序。

一旦SCSI核心存在于内核中（无论是编译进内核还是作为模块加载），
独立的上层驱动和底层驱动可以按照任意顺序加载。磁盘驱动程序
（sd\_mod.o）、光盘驱动程序（sr\_mod.o）、磁带驱动程序 [[1]](#footnote-1)
（st.o）以及SCSI通用驱动程序（sg.o）代表了上层驱动，用于控制
相应的各种设备。例如，你可以加载磁带驱动程序来使用磁带驱动器，
然后在不需要该驱动程序时卸载他（并释放相关内存）。

底层驱动程序用于支持您所运行硬件平台支持的不同主机卡。这些不同
的主机卡通常被称为主机总线适配器（HBAs）。例如，aic7xxx.o驱动
程序被用于控制Adaptec所属的所有最新的SCSI控制器。几乎所有的底
层驱动都可以被编译为模块或直接编译进内核。

[[1](#footnote-reference-1)]

磁带驱动程序有一个变种用于控制OnStream磁带设备。其模块
名称为osst.o 。

## 来源、版本与核验

- 来源：[SCSI子系统文档](https://docs.kernel.org/translations/zh_CN/scsi/scsi.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/scsi/scsi.rst`。
