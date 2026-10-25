---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-filesystems-gfs2-uevents",
  "title": "Linux 内核：uevents 与 GFS2",
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
  "snapshotHash": "3da7d0ba1f868ebf3db706916bcb963bfb1be38d8a3891cfc515c33b6b15b2f2",
  "generatedHash": "f6732afb60885f01eafba413b71a02465c9c7d81dffa75eb982aa6b811795dd6",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "在 GFS2 文件系统的挂载生命周期内，会生成多个 uevent。 本文档解释了这些事件的含义及其用途（被 gfs2-utils 中的 gfs_controld 使用）。 ADD 事件发生在挂载时。它始终是新建文件系统生成的第一个 uevent。如果挂载成 功，随后会生成 ONLINE uevent。如果挂载失败，则随后会生成 REMOVE uevent。 ",
  "l1": "在 GFS2 文件系统的挂载生命周期内，会生成多个 uevent。 本文档解释了这些事件的含义及其用途（被 gfs2-utils 中的 gfs_controld 使用）。 ADD 事件发生在挂载时。它始终是新建文件系统生成的第一个 uevent。如果挂载成 功，随后会生成 ONLINE uevent。如果挂载失败，则随后会生成 REMOVE uevent。 ADD uevent 包含两个环境变量：SPECTATOR=[0|1] 和 RDONLY=[0|1]，分别用 于指定文件系统的观察者状态（一种未分配日志的只读挂载）和只读状态（已分配日志）。 ONLINE uevent 在成功挂载或重新挂载后生成。它具有与 ADD uevent 相同的环 境变量。ONLINE uevent 及其用于标识观察者和 RDONLY 状态的两个环境变量是较 新版本内核引入的功能（2.6.32-rc+ 及以上），",
  "questions": [
    "Linux 内核：uevents 与 GFS2的原理是什么？",
    "Linux 内核：uevents 与 GFS2有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-filesystems-gfs2-uevents",
      "url": "https://docs.kernel.org/translations/zh_CN/filesystems/gfs2-uevents.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：uevents 与 GFS2

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## uevents 与 GFS2

在 GFS2 文件系统的挂载生命周期内，会生成多个 uevent。
本文档解释了这些事件的含义及其用途（被 gfs2-utils 中的 gfs\_controld 使用）。

### GFS2 uevents 列表

#### 1. ADD

ADD 事件发生在挂载时。它始终是新建文件系统生成的第一个 uevent。如果挂载成
功，随后会生成 ONLINE uevent。如果挂载失败，则随后会生成 REMOVE uevent。

ADD uevent 包含两个环境变量：SPECTATOR=[0|1] 和 RDONLY=[0|1]，分别用
于指定文件系统的观察者状态（一种未分配日志的只读挂载）和只读状态（已分配日志）。

#### 2. ONLINE

ONLINE uevent 在成功挂载或重新挂载后生成。它具有与 ADD uevent 相同的环
境变量。ONLINE uevent 及其用于标识观察者和 RDONLY 状态的两个环境变量是较
新版本内核引入的功能（2.6.32-rc+ 及以上），旧版本内核不会生成此事件。

#### 3. CHANGE

CHANGE uevent 在两种场景下使用。一是报告第一个节点成功挂载文件系统时
（FIRSTMOUNT=Done）。这作为信号告知 gfs\_controld，此时集群中其他节点可以
安全挂载该文件系统。

另一个 CHANGE uevent 用于通知文件系统某个日志的日志恢复已完成。它包含两个
环境变量：JID= 指定刚恢复的日志 ID，RECOVERY=[Done|Failed] 表示操作成
功与否。这些 uevent 会在每次日志恢复时生成，无论是在初始挂载过程中，还是
gfs\_controld 通过 /sys/fs/gfs2/<fsname>/lock\_module/recovery 文件
请求特定日志恢复的结果。

由于早期版本的 gfs\_controld 使用 CHANGE uevent 时未检查环境变量以确定状
态，若为其添加新功能，存在用户工具版本过旧导致集群故障的风险。因此，在新增用
于标识成功挂载或重新挂载的 uevent 时，选择了使用 ONLINE uevent。

#### 4. OFFLINE

OFFLINE uevent 仅在文件系统发生错误时生成，是 "withdraw" 机制的一部分。
当前该事件未提供具体错误信息，此问题有待修复。

#### 5. REMOVE

REMOVE uevent 在挂载失败结束或卸载文件系统时生成。所有 REMOVE uevent
之前都至少存在同一文件系统的 ADD uevent。与其他 uevent 不同，它由内核的
kobject 子系统自动生成。

### 所有 GFS2 uevents 的通用信息（uevent 环境变量）

#### 1. LOCKTABLE=

LOCKTABLE 是一个字符串，其值来源于挂载命令行（locktable=）或 fstab 文件。
它用作文件系统标签，并为 lock\_dlm 类型的挂载提供加入集群所需的信息。

#### 2. LOCKPROTO=

LOCKPROTO 是一个字符串，其值取决于挂载命令行或 fstab 中的设置。其值将是
lock\_nolock 或 lock\_dlm。未来可能支持其他锁管理器。

#### 3. JOURNALID=

如果文件系统正在使用日志（观察者挂载不分配日志），则所有 GFS2 uevent 中都
会包含此变量，其值为数字形式的日志 ID。

#### 4. UUID=

在较新版本的 gfs2-utils 中，mkfs.gfs2 会向文件系统超级块写入 UUID。若存
在 UUID，所有与该文件系统相关的 uevent 中均会包含此信息。

## 来源、版本与核验

- 来源：[uevents 与 GFS2](https://docs.kernel.org/translations/zh_CN/filesystems/gfs2-uevents.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/filesystems/gfs2-uevents.rst`。
