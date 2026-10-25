---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-security-tpm-tpm-vtpm-proxy",
  "title": "Linux 内核：Linux容器的虚拟TPM代理驱动",
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
  "snapshotHash": "7dadeef678e30cca12678a9bd9df70a8e2c62c4cfe46113f72d91326fa5aa71b",
  "generatedHash": "9ea9cd15d5a805de3c8355db9f6c81e45da56ca2c16b60b2b02c8f4b44466a87",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "本文档描述了用于Linux容器的虚拟可信平台模块（vTPM）代理设备驱动。 这项工作的目标是为每个Linux容器提供TPM功能。这使得程序能够像与物理系统 上的TPM交互一样，与容器中的TPM进行交互。每个容器都会获得一个唯一的、模 拟的软件TPM。 为了使每个容器都能使用模拟的软件TPM，容器管理栈需要创建一对设备，其中 包括一个客户端TPM字符设备 /d",
  "l1": "本文档描述了用于Linux容器的虚拟可信平台模块（vTPM）代理设备驱动。 这项工作的目标是为每个Linux容器提供TPM功能。这使得程序能够像与物理系统 上的TPM交互一样，与容器中的TPM进行交互。每个容器都会获得一个唯一的、模 拟的软件TPM。 为了使每个容器都能使用模拟的软件TPM，容器管理栈需要创建一对设备，其中 包括一个客户端TPM字符设备 /dev/tpmX （X=0,1,2...）和一个‘服务器端’ 文件描述符。当文件描述符传被递给TPM模拟器时，前者通过创建具有适当主次 设备号的字符设备被移入容器，然后，容器内的软件可以使用字符设备发送TPM 命令，模拟器将通过文件描述符接收这些命令，并用它来发送响应。 为了支持这一点，虚拟TPM代理驱动程序提供了一个设备 /dev/vtpmx ，该设备 用于通过ioctl创建设备对。ioctl将其作为配置设备的输入标志，例如这些标志指示",
  "questions": [
    "Linux 内核：Linux容器的虚拟TPM代理驱动的原理是什么？",
    "Linux 内核：Linux容器的虚拟TPM代理驱动有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-security-tpm-tpm-vtpm-proxy",
      "url": "https://docs.kernel.org/translations/zh_CN/security/tpm/tpm_vtpm_proxy.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：Linux容器的虚拟TPM代理驱动

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## Linux容器的虚拟TPM代理驱动

作者：

Stefan Berger <[stefanb@linux.vnet.ibm.com](mailto:stefanb@linux.vnet.ibm.com)>

本文档描述了用于Linux容器的虚拟可信平台模块（vTPM）代理设备驱动。

### 介绍

这项工作的目标是为每个Linux容器提供TPM功能。这使得程序能够像与物理系统
上的TPM交互一样，与容器中的TPM进行交互。每个容器都会获得一个唯一的、模
拟的软件TPM。

### 设计

为了使每个容器都能使用模拟的软件TPM，容器管理栈需要创建一对设备，其中
包括一个客户端TPM字符设备 /dev/tpmX （X=0,1,2...）和一个‘服务器端’
文件描述符。当文件描述符传被递给TPM模拟器时，前者通过创建具有适当主次
设备号的字符设备被移入容器，然后，容器内的软件可以使用字符设备发送TPM
命令，模拟器将通过文件描述符接收这些命令，并用它来发送响应。

为了支持这一点，虚拟TPM代理驱动程序提供了一个设备 /dev/vtpmx ，该设备
用于通过ioctl创建设备对。ioctl将其作为配置设备的输入标志，例如这些标志指示
TPM模拟器是否支持TPM1.2或TPM2功能。ioctl的结果是返回‘服务器端’的文件描述符
以及创建的字符设备的主次设备号。此外，还会返回TPM字符设备的编号。例如，如果
创建了 /dev/tpm10 ，则返回编号（ dev\_num ）10。

一旦设备被创建，驱动程序将立即尝试与TPM进行通信。来自驱动程序的所有命令
都可以从ioctl返回的文件描述符中读取。这些命令应该立即得到响应。

### UAPI

该API在以下内核代码中：

include/uapi/linux/vtpm\_proxy.h
drivers/char/tpm/tpm\_vtpm\_proxy.c

函数：vtpmx\_ioc\_new\_dev

## 来源、版本与核验

- 来源：[Linux容器的虚拟TPM代理驱动](https://docs.kernel.org/translations/zh_CN/security/tpm/tpm_vtpm_proxy.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/security/tpm/tpm_vtpm_proxy.rst`。
