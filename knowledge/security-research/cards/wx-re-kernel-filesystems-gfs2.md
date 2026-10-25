---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-filesystems-gfs2",
  "title": "Linux 内核：全局文件系统 2 (Global File System 2)",
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
  "snapshotHash": "434532ce62d3fd39c7b2170c7a229091b3e772103f9b7d42f6be495f103cb0c4",
  "generatedHash": "52cea3e530c7d1002cf3d07d0004abb61beb9059b4dce171040a766a8fd253ee",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "GFS2 是一个集群文件系统。它允许一组计算机同时使用在它们之间共享的块设备（通 过 FC、iSCSI、NBD 等）。GFS2 像本地文件系统一样读写块设备，但也使用一个锁 模块来让计算机协调它们的 I/O 操作，从而维护文件系统的一致性。GFS2 的出色特 性之一是完美一致性——在一台机器上对文件系统所做的更改会立即显示在集群中的所 有其他机器上。 GFS",
  "l1": "GFS2 是一个集群文件系统。它允许一组计算机同时使用在它们之间共享的块设备（通 过 FC、iSCSI、NBD 等）。GFS2 像本地文件系统一样读写块设备，但也使用一个锁 模块来让计算机协调它们的 I/O 操作，从而维护文件系统的一致性。GFS2 的出色特 性之一是完美一致性——在一台机器上对文件系统所做的更改会立即显示在集群中的所 有其他机器上。 GFS2 使用可互换的节点间锁定机制，当前支持的机制有： lock_dlm :   - 使用分布式锁管理器 (dlm) 进行节点间锁定。 该 dlm 位于 linux/fs/dlm/ lock_dlm 依赖于在上述 URL 中找到的用户空间集群管理系统。 若要将 GFS2 用作本地文件系统，则不需要外部集群系统，只需：: 在所有集群节点上都需要安装 gfs2-utils 软件包；对于 lock_dlm，您还需要按 照文档配置 dlm 和 co",
  "questions": [
    "Linux 内核：全局文件系统 2 (Global File System 2)的原理是什么？",
    "Linux 内核：全局文件系统 2 (Global File System 2)有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-filesystems-gfs2",
      "url": "https://docs.kernel.org/translations/zh_CN/filesystems/gfs2.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：全局文件系统 2 (Global File System 2)

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 全局文件系统 2 (Global File System 2)

GFS2 是一个集群文件系统。它允许一组计算机同时使用在它们之间共享的块设备（通
过 FC、iSCSI、NBD 等）。GFS2 像本地文件系统一样读写块设备，但也使用一个锁
模块来让计算机协调它们的 I/O 操作，从而维护文件系统的一致性。GFS2 的出色特
性之一是完美一致性——在一台机器上对文件系统所做的更改会立即显示在集群中的所
有其他机器上。

GFS2 使用可互换的节点间锁定机制，当前支持的机制有：

> lock\_nolock
> :   - 允许将 GFS2 用作本地文件系统
>
> lock\_dlm
> :   - 使用分布式锁管理器 (dlm) 进行节点间锁定。
>       该 dlm 位于 linux/fs/dlm/

lock\_dlm 依赖于在上述 URL 中找到的用户空间集群管理系统。

若要将 GFS2 用作本地文件系统，则不需要外部集群系统，只需：:

> $ mkfs -t gfs2 -p lock\_nolock -j 1 /dev/block\_device
> $ mount -t gfs2 /dev/block\_device /dir

在所有集群节点上都需要安装 gfs2-utils 软件包；对于 lock\_dlm，您还需要按
照文档配置 dlm 和 corosync 用户空间工具。

gfs2-utils 可在 <https://pagure.io/gfs2-utils> 找到。

GFS2 在磁盘格式上与早期版本的 GFS 不兼容，但它已相当接近。

以下手册页 (man pages) 可在 gfs2-utils 中找到：

> |  |  |
> | --- | --- |
> | fsck.gfs2 | 用于修复文件系统 |
> | gfs2\_grow | 用于在线扩展文件系统 |
> | gfs2\_jadd | 用于在线向文件系统添加日志 |
> | tunegfs2 | 用于操作、检查和调优文件系统 |
> | gfs2\_convert | 用于将 gfs 文件系统原地转换为 GFS2 |
> | mkfs.gfs2 | 用于创建文件系统 |

## 来源、版本与核验

- 来源：[全局文件系统 2 (Global File System 2)](https://docs.kernel.org/translations/zh_CN/filesystems/gfs2.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/filesystems/gfs2.rst`。
