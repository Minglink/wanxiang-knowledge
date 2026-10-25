---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-filesystems-dnotify",
  "title": "Linux 内核：Linux 目录通知",
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
  "snapshotHash": "d2ca6098aa6280c3147ba1ede5f498553bb78b203311f3a237725db25cd3d2a2",
  "generatedHash": "3b3f7c2f3027489371e1f6bbab262c7503168fe3c9d045c21cbfde892b944f1c",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "目录通知的目的是使用户应用程序能够在目录或目录中的任何文件发生变更时收到通知。基本机制包括应用程序 通过 fcntl(2) 调用在目录上注册通知，通知本身则通过信号传递。 应用程序可以决定希望收到哪些 “事件” 的通知。当前已定义的事件如下： 通常，应用程序必须在每次通知后重新注册，但如果将 DN_MULTISHOT 与事件掩码进行或运算，则注册 将一直保持",
  "l1": "目录通知的目的是使用户应用程序能够在目录或目录中的任何文件发生变更时收到通知。基本机制包括应用程序 通过 fcntl(2) 调用在目录上注册通知，通知本身则通过信号传递。 应用程序可以决定希望收到哪些 “事件” 的通知。当前已定义的事件如下： 通常，应用程序必须在每次通知后重新注册，但如果将 DN_MULTISHOT 与事件掩码进行或运算，则注册 将一直保持有效，直到被显式移除（通过注册为不接收任何事件）。 默认情况下，SIGIO 信号将被传递给进程，且不附带其他有用的信息。但是，如果使用 F_SETSIG fcntl(2) 调用让内核知道要传递哪个信号，一个 siginfo 结构体将被传递给信号处理程序，该结构体的 si_fd 成员将 包含与发生事件的目录相关联的文件描述符。 应用程序最好选择一个实时信号（SIGRTMIN + <n>），以便通知可以被排队。如果指定了 DN_MULTIS",
  "questions": [
    "Linux 内核：Linux 目录通知的原理是什么？",
    "Linux 内核：Linux 目录通知有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-filesystems-dnotify",
      "url": "https://docs.kernel.org/translations/zh_CN/filesystems/dnotify.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：Linux 目录通知

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## Linux 目录通知

> Stephen Rothwell <[sfr@canb.auug.org.au](mailto:sfr@canb.auug.org.au)>

目录通知的目的是使用户应用程序能够在目录或目录中的任何文件发生变更时收到通知。基本机制包括应用程序
通过 fcntl(2) 调用在目录上注册通知，通知本身则通过信号传递。

应用程序可以决定希望收到哪些 “事件” 的通知。当前已定义的事件如下：

> |  |  |
> | --- | --- |
> | DN\_ACCESS | 目录中的文件被访问（read） |
> | DN\_MODIFY | 目录中的文件被修改（write,truncate） |
> | DN\_CREATE | 目录中创建了文件 |
> | DN\_DELETE | 目录中的文件被取消链接 |
> | DN\_RENAME | 目录中的文件被重命名 |
> | DN\_ATTRIB | 目录中的文件属性被更改（chmod,chown） |

通常，应用程序必须在每次通知后重新注册，但如果将 DN\_MULTISHOT 与事件掩码进行或运算，则注册
将一直保持有效，直到被显式移除（通过注册为不接收任何事件）。

默认情况下，SIGIO 信号将被传递给进程，且不附带其他有用的信息。但是，如果使用 F\_SETSIG fcntl(2)
调用让内核知道要传递哪个信号，一个 siginfo 结构体将被传递给信号处理程序，该结构体的 si\_fd 成员将
包含与发生事件的目录相关联的文件描述符。

应用程序最好选择一个实时信号（SIGRTMIN + <n>），以便通知可以被排队。如果指定了 DN\_MULTISHOT，
这一点尤为重要。注意，SIGRTMIN 通常是被阻塞的，因此最好使用（至少）SIGRTMIN + 1。

### 实现预期（特性与缺陷 :-)）

对于文件的任何本地访问，通知都应能正常工作，即使实际文件系统位于远程服务器上。这意味着，对本地用户
模式服务器提供的文件的远程访问应能触发通知。同样的，对本地内核 NFS 服务器提供的文件的远程访问
也应能触发通知。

为了尽可能减小对文件系统代码的影响，文件硬链接的问题已被忽略。因此，如果一个文件（x）存在于两个
目录（a 和 b）中，通过名称”a/x”对该文件进行的更改应通知给期望接收目录“a”通知的程序，但不会
通知给期望接收目录“b”通知的程序。

此外，取消链接的文件仍会在它们链接到的最后一个目录中触发通知。

### 配置

Dnotify 由 CONFIG\_DNOTIFY 配置选项控制。禁用该选项时，fcntl(fd, F\_NOTIFY, ...) 将返
回 -EINVAL。

### 示例

具体示例可参见 tools/testing/selftests/filesystems/dnotify\_test.c。

### 注意

从 Linux 2.6.13 开始，dnotify 已被 inotify 取代。有关 inotify 的更多信息，请参见
Documentation/filesystems/inotify.rst。

## 来源、版本与核验

- 来源：[Linux 目录通知](https://docs.kernel.org/translations/zh_CN/filesystems/dnotify.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/filesystems/dnotify.rst`。
