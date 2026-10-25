---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-virt-acrn-introduction",
  "title": "Linux 内核：ACRN超级管理器介绍",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "virt"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "decfc597545e39aaff48f7a38c29e8b05cb3d270aac914a6d22171bc29deff4e",
  "generatedHash": "71bb81d1fe49d6aa4b4f7be37971f0fbb1b230f1acb543422b10689a9b72f957",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "ACRN超级管理器是一个第一类超级管理器，直接在裸机硬件上运行。它有一个特权管理虚拟机，称为服 务虚拟机，用于管理用户虚拟机和进行I/O仿真。 ACRN用户空间是一个运行在服务虚拟机中的应用程序，它根据命令行配置为用户虚拟机仿真设备。 ACRN管理程序服务模块（HSM）是服务虚拟机中的一个内核模块，为ACRN用户空间提供管理程序服 务。 ACRN用户空间为用",
  "l1": "ACRN超级管理器是一个第一类超级管理器，直接在裸机硬件上运行。它有一个特权管理虚拟机，称为服 务虚拟机，用于管理用户虚拟机和进行I/O仿真。 ACRN用户空间是一个运行在服务虚拟机中的应用程序，它根据命令行配置为用户虚拟机仿真设备。 ACRN管理程序服务模块（HSM）是服务虚拟机中的一个内核模块，为ACRN用户空间提供管理程序服 务。 ACRN用户空间为用户虚拟机分配内存，配置和初始化用户虚拟机使用的设备，加载虚拟引导程序， 初始化虚拟CPU状态，处理来自用户虚拟机的I/O请求访问。它使用ioctls来与HSM通信。HSM通过 与ACRN超级管理器的hypercalls进行交互来实现管理服务。HSM向用户空间输出一个char设备接口 （/dev/acrn_hsm）。 ACRN超级管理器是开源的，任何人都可以贡献。源码库在 <https://github.com/projectacrn/a",
  "questions": [
    "Linux 内核：ACRN超级管理器介绍的原理是什么？",
    "Linux 内核：ACRN超级管理器介绍有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-virt-acrn-introduction",
      "url": "https://docs.kernel.org/translations/zh_CN/virt/acrn/introduction.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：ACRN超级管理器介绍

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## ACRN超级管理器介绍

ACRN超级管理器是一个第一类超级管理器，直接在裸机硬件上运行。它有一个特权管理虚拟机，称为服
务虚拟机，用于管理用户虚拟机和进行I/O仿真。

ACRN用户空间是一个运行在服务虚拟机中的应用程序，它根据命令行配置为用户虚拟机仿真设备。
ACRN管理程序服务模块（HSM）是服务虚拟机中的一个内核模块，为ACRN用户空间提供管理程序服
务。

下图展示了该架构。

```
              服务端VM                      用户端VM
    +----------------------------+  |  +------------------+
    |        +--------------+    |  |  |                  |
    |        |ACRN用户空间  |    |  |  |                  |
    |        +--------------+    |  |  |                  |
    |-----------------ioctl------|  |  |                  |   ...
    |内核空间       +----------+ |  |  |                  |
    |               |   HSM    | |  |  | 驱动             |
    |               +----------+ |  |  |                  |
    +--------------------|-------+  |  +------------------+
+---------------------hypercall----------------------------------------+
|                         ACRN超级管理器                               |
+----------------------------------------------------------------------+
|                          硬件                                        |
+----------------------------------------------------------------------+
```

ACRN用户空间为用户虚拟机分配内存，配置和初始化用户虚拟机使用的设备，加载虚拟引导程序，
初始化虚拟CPU状态，处理来自用户虚拟机的I/O请求访问。它使用ioctls来与HSM通信。HSM通过
与ACRN超级管理器的hypercalls进行交互来实现管理服务。HSM向用户空间输出一个char设备接口
（/dev/acrn\_hsm）。

ACRN超级管理器是开源的，任何人都可以贡献。源码库在
<https://github.com/projectacrn/acrn-hypervisor>。

## 来源、版本与核验

- 来源：[ACRN超级管理器介绍](https://docs.kernel.org/translations/zh_CN/virt/acrn/introduction.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/virt/acrn/introduction.rst`。
