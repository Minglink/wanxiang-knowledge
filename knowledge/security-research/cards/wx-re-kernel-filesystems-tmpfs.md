---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-filesystems-tmpfs",
  "title": "Linux 内核：Tmpfs",
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
  "snapshotHash": "f672f6dbfa98f8c9cd73824062611faa1c992cb46d474d849afe8dcaadc04b78",
  "generatedHash": "a2a30015e4b20594c390fd5ee8539e26ebd2faabbe2c56abddb2e9a7ed09e558",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "Tmpfs是一个将所有文件都保存在虚拟内存中的文件系统。 tmpfs中的所有内容都是临时的，也就是说没有任何文件会在硬盘上创建。 如果卸载tmpfs实例，所有保存在其中的文件都会丢失。 tmpfs将所有文件保存在内核缓存中，随着文件内容增长或缩小可以将不需要的 页面swap出去。它具有最大限制，可以通过“mount -o remount ...”调整。 和r",
  "l1": "Tmpfs是一个将所有文件都保存在虚拟内存中的文件系统。 tmpfs中的所有内容都是临时的，也就是说没有任何文件会在硬盘上创建。 如果卸载tmpfs实例，所有保存在其中的文件都会丢失。 tmpfs将所有文件保存在内核缓存中，随着文件内容增长或缩小可以将不需要的 页面swap出去。它具有最大限制，可以通过“mount -o remount ...”调整。 和ramfs（创建tmpfs的模板）相比，tmpfs包含交换和限制检查。和tmpfs相似的另 一个东西是RAM磁盘（/dev/ram*），可以在物理RAM中模拟固定大小的硬盘，并在 此之上创建一个普通的文件系统。Ramdisks无法swap，因此无法调整它们的大小。 由于tmpfs完全保存于页面缓存和swap中，因此所有tmpfs页面将在/proc/meminfo 中显示为“Shmem”，而在free(1)中显示为“Shared”。请注意，",
  "questions": [
    "Linux 内核：Tmpfs的原理是什么？",
    "Linux 内核：Tmpfs有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-filesystems-tmpfs",
      "url": "https://docs.kernel.org/translations/zh_CN/filesystems/tmpfs.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：Tmpfs

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

translated by Wang Qing<[wangqing@vivo.com](mailto:wangqing@vivo.com)>

## Tmpfs

Tmpfs是一个将所有文件都保存在虚拟内存中的文件系统。

tmpfs中的所有内容都是临时的，也就是说没有任何文件会在硬盘上创建。
如果卸载tmpfs实例，所有保存在其中的文件都会丢失。

tmpfs将所有文件保存在内核缓存中，随着文件内容增长或缩小可以将不需要的
页面swap出去。它具有最大限制，可以通过“mount -o remount ...”调整。

和ramfs（创建tmpfs的模板）相比，tmpfs包含交换和限制检查。和tmpfs相似的另
一个东西是RAM磁盘（/dev/ram\*），可以在物理RAM中模拟固定大小的硬盘，并在
此之上创建一个普通的文件系统。Ramdisks无法swap，因此无法调整它们的大小。

由于tmpfs完全保存于页面缓存和swap中，因此所有tmpfs页面将在/proc/meminfo
中显示为“Shmem”，而在free(1)中显示为“Shared”。请注意，这些计数还包括
共享内存(shmem，请参阅ipcs(1))。获得计数的最可靠方法是使用df(1)和du(1)。

tmpfs具有以下用途：

1. 内核总有一个无法看到的内部挂载，用于共享匿名映射和SYSV共享内存。

   挂载不依赖于CONFIG\_TMPFS。如果CONFIG\_TMPFS未设置，tmpfs对用户不可见。
   但是内部机制始终存在。
2. glibc 2.2及更高版本期望将tmpfs挂载在/dev/shm上以用于POSIX共享内存
   (shm\_open，shm\_unlink)。添加内容到/etc/fstab应注意如下：

   > tmpfs /dev/shm tmpfs defaults 0 0

   使用时需要记住创建挂载tmpfs的目录。

   SYSV共享内存无需挂载，内部已默认支持。(在2.3内核版本中，必须挂载
   tmpfs的前身(shm fs)才能使用SYSV共享内存)
3. 很多人（包括我）都觉的在/tmp和/var/tmp上挂载非常方便，并具有较大的
   swap分区。目前循环挂载tmpfs可以正常工作，所以大多数发布都应当可以
   使用mkinitrd通过/tmp访问/tmp。
4. 也许还有更多我不知道的地方:-)

tmpfs有三个用于调整大小的挂载选项：

|  |  |
| --- | --- |
| size | tmpfs实例分配的字节数限制。默认值是不swap时物理RAM的一半。 如果tmpfs实例过大，机器将死锁，因为OOM处理将无法释放该内存。 |
| nr\_blocks | 与size相同，但以PAGE\_SIZE为单位。 |
| nr\_inodes | tmpfs实例的最大inode个数。默认值是物理内存页数的一半，或者 (有高端内存的机器)低端内存RAM的页数，二者以较低者为准。 |

这些参数接受后缀k，m或g表示千，兆和千兆字节，可以在remount时更改。
size参数也接受后缀％用来限制tmpfs实例占用物理RAM的百分比：
未指定size或nr\_blocks时，默认值为size=50％

如果nr\_blocks=0（或size=0），block个数将不受限制；如果nr\_inodes=0，
inode个数将不受限制。这样挂载通常是不明智的，因为它允许任何具有写权限的
用户通过访问tmpfs耗尽机器上的所有内存；但同时这样做也会增强在多个CPU的
场景下的访问。

tmpfs具有为所有文件设置NUMA内存分配策略挂载选项(如果启用了CONFIG\_NUMA),
可以通过“mount -o remount ...”调整

|  |  |
| --- | --- |
| mpol=default | 采用进程分配策略 (请参阅 set\_mempolicy(2)) |
| mpol=prefer:Node | 倾向从给定的节点分配 |
| mpol=bind:NodeList | 只允许从指定的链表分配 |
| mpol=interleave | 倾向于依次从每个节点分配 |
| mpol=interleave:NodeList | 依次从每个节点分配 |
| mpol=local | 优先本地节点分配内存 |

NodeList格式是以逗号分隔的十进制数字表示大小和范围，最大和最小范围是用-
分隔符的十进制数来表示。例如，mpol=bind0-3,5,7,9-15

带有有效NodeList的内存策略将按指定格式保存，在创建文件时使用。当任务在该
文件系统上创建文件时，会使用到挂载时的内存策略NodeList选项，如果设置的话，
由调用任务的cpuset[请参见Documentation/admin-guide/cgroup-v1/cpusets.rst]
以及下面列出的可选标志约束。如果NodeLists为设置为空集，则文件的内存策略将
恢复为“默认”策略。

NUMA内存分配策略有可选标志，可以用于模式结合。在挂载tmpfs时指定这些可选
标志可以在NodeList之前生效。
Documentation/admin-guide/mm/numa\_memory\_policy.rst列出所有可用的内存
分配策略模式标志及其对内存策略。

```
=static         相当于     MPOL_F_STATIC_NODES
=relative       相当于     MPOL_F_RELATIVE_NODES
```

例如，mpol=bind=staticNodeList相当于MPOL\_BIND|MPOL\_F\_STATIC\_NODES的分配策略

请注意，如果内核不支持NUMA，那么使用mpol选项挂载tmpfs将会失败；nodelist指定不
在线的节点也会失败。如果您的系统依赖于此，但内核会运行不带NUMA功能(也许是安全
revocery内核)，或者具有较少的节点在线，建议从自动模式中省略mpol选项挂载选项。
可以在以后通过“mount -o remount,mpol=Policy:NodeList MountPoint”添加到挂载点。

要指定初始根目录，可以使用如下挂载选项：

|  |  |
| --- | --- |
| 模式 | 权限用八进制数字表示 |
| uid | 用户ID |
| gid | 组ID |

这些选项对remount没有任何影响。您可以通过chmod(1),chown(1)和chgrp(1)的更改
已经挂载的参数。

tmpfs具有选择32位还是64位inode的挂载选项：

|  |  |
| --- | --- |
| inode64 | 使用64位inode |
| inode32 | 使用32位inode |

在32位内核上，默认是inode32，挂载时指定inode64会被拒绝。
在64位内核上，默认配置是CONFIG\_TMPFS\_INODE64。inode64避免了单个设备上可能有多个
具有相同inode编号的文件；比如32位应用程序使用glibc如果长期访问tmpfs，一旦达到33
位inode编号，就有EOVERFLOW失败的危险，无法打开大于2GiB的文件，并返回EINVAL。

所以'mount -t tmpfs -o size=10G,nr\_inodes=10k,mode=700 tmpfs /mytmpfs'将在
/mytmpfs上挂载tmpfs实例，分配只能由root用户访问的10GB RAM/SWAP，可以有10240个
inode的实例。

作者:
:   Christoph Rohland <[cr@sap.com](mailto:cr@sap.com)>, 1.12.01

更新:
:   Hugh Dickins, 4 June 2007

更新:
:   KOSAKI Motohiro, 16 Mar 2010

更新:
:   Chris Down, 13 July 2020

## 来源、版本与核验

- 来源：[Tmpfs](https://docs.kernel.org/translations/zh_CN/filesystems/tmpfs.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/filesystems/tmpfs.rst`。
