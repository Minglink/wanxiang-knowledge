---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-filesystems-virtiofs",
  "title": "Linux 内核：virtiofs: virtio-fs 主机<->客机共享文件系统",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "filesystems"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "e7b7d6cd5703b2bee1e02f046c1e60bc22c6a9338e8916bcfe5f88b91206c3ef",
  "generatedHash": "96bd33e11ccd8528b6e1f9725eec2e056cdd0f3ed07ecfb509fd5bba2be4fe46",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "Linux的virtiofs文件系统实现了一个半虚拟化VIRTIO类型“virtio-fs”设备的驱动，通过该类型设备实现客机<->主机文件系统共享。它允许客机挂载一个已经导出到主机的目录。 客机通常需要访问主机或者远程系统上的文件。使用场景包括：在新客机安装时让文件对其可见；从主机上的根文件系统启动；对无状态或临时客机提供持久存储和在客机之间共享目录。 尽",
  "l1": "Linux的virtiofs文件系统实现了一个半虚拟化VIRTIO类型“virtio-fs”设备的驱动，通过该类型设备实现客机<->主机文件系统共享。它允许客机挂载一个已经导出到主机的目录。 客机通常需要访问主机或者远程系统上的文件。使用场景包括：在新客机安装时让文件对其可见；从主机上的根文件系统启动；对无状态或临时客机提供持久存储和在客机之间共享目录。 尽管在某些任务可能通过使用已有的网络文件系统完成，但是却需要非常难以自动化的配置步骤，且将存储网络暴露给客机。而virtio-fs设备通过提供不经过网络的文件系统访问文件的设计方式解决了这些问题。 另外，virto-fs设备发挥了主客机共存的优点提高了性能，并且提供了网络文件系统所不具备 的一些语义功能。 请查阅 <https://virtio-fs.gitlab.io/> 了解配置QEMU和virtiofsd守护程序的详细信息。 由于v",
  "questions": [
    "Linux 内核：virtiofs: virtio-fs 主机<->客机共享文件系统的原理是什么？",
    "Linux 内核：virtiofs: virtio-fs 主机<->客机共享文件系统有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-filesystems-virtiofs",
      "url": "https://docs.kernel.org/translations/zh_CN/filesystems/virtiofs.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：virtiofs: virtio-fs 主机<->客机共享文件系统

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

译者

```
中文版维护者： 王文虎 Wang Wenhu <wenhu.wang@vivo.com>
中文版翻译者： 王文虎 Wang Wenhu <wenhu.wang@vivo.com>
中文版校译者： 王文虎 Wang Wenhu <wenhu.wang@vivo.com>
```

## virtiofs: virtio-fs 主机<->客机共享文件系统

- Copyright (C) 2020 Vivo Communication Technology Co. Ltd.

### 介绍

Linux的virtiofs文件系统实现了一个半虚拟化VIRTIO类型“virtio-fs”设备的驱动，通过该类型设备实现客机<->主机文件系统共享。它允许客机挂载一个已经导出到主机的目录。

客机通常需要访问主机或者远程系统上的文件。使用场景包括：在新客机安装时让文件对其可见；从主机上的根文件系统启动；对无状态或临时客机提供持久存储和在客机之间共享目录。

尽管在某些任务可能通过使用已有的网络文件系统完成，但是却需要非常难以自动化的配置步骤，且将存储网络暴露给客机。而virtio-fs设备通过提供不经过网络的文件系统访问文件的设计方式解决了这些问题。

另外，virto-fs设备发挥了主客机共存的优点提高了性能，并且提供了网络文件系统所不具备
的一些语义功能。

### 用法

以``myfs``标签将文件系统挂载到``/mnt``:

```
guest# mount -t virtiofs myfs /mnt
```

请查阅 <https://virtio-fs.gitlab.io/> 了解配置QEMU和virtiofsd守护程序的详细信息。

### 内幕

由于virtio-fs设备将FUSE协议用于文件系统请求，因此Linux的virtiofs文件系统与FUSE文件系统客户端紧密集成在一起。客机充当FUSE客户端而主机充当FUSE服务器，内核与用户空间之间的/dev/fuse接口由virtio-fs设备接口代替。

FUSE请求被置于虚拟队列中由主机处理。主机填充缓冲区中的响应部分，而客机处理请求的完成部分。

将/dev/fuse映射到虚拟队列需要解决/dev/fuse和虚拟队列之间语义上的差异。每次读取/dev/fuse设备时，FUSE客户端都可以选择要传输的请求，从而可以使某些请求优先于其他请求。虚拟队列有其队列语义，无法更改已入队请求的顺序。在虚拟队列已满的情况下尤
其关键，因为此时不可能加入高优先级的请求。为了解决此差异，virtio-fs设备采用“hiprio”（高优先级）虚拟队列，专门用于有别于普通请求的高优先级请求。

## 来源、版本与核验

- 来源：[virtiofs: virtio-fs 主机<->客机共享文件系统](https://docs.kernel.org/translations/zh_CN/filesystems/virtiofs.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/filesystems/virtiofs.rst`。
