---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-infiniband-user-verbs",
  "title": "Linux 内核：用户空间verbs访问",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "infiniband"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "6da9fed1adf8a61bd2acbb528a1b4f4438db2503121bd020e4c4d19005ce2cbd",
  "generatedHash": "a538cb116c769d6efe4d679ca321cb883854c238c756c2cbba0a7135ddff08e8",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "ib_uverbs模块，通过启用CONFIG_INFINIBAND_USER_ACCESS构建，使用户空间 通过“verbs”直接访问IB硬件，如InfiniBand架构规范第11章所述。 要使用verbs，需要libibverbs库，可从https://github.com/linux-rdma/rdma-core。 libibverbs包含一个独立于设备",
  "l1": "ib_uverbs模块，通过启用CONFIG_INFINIBAND_USER_ACCESS构建，使用户空间 通过“verbs”直接访问IB硬件，如InfiniBand架构规范第11章所述。 要使用verbs，需要libibverbs库，可从https://github.com/linux-rdma/rdma-core。 libibverbs包含一个独立于设备的API，用于使用ib_uverbs接口。libibverbs 还需要为你的InfiniBand硬件提供适当的独立于设备的内核和用户空间驱动。例如， 要使用Mellanox HCA，你需要安装ib_mthca内核模块和libmthca用户空间驱动。 用户空间通过/dev/infiniband/uverbsN字符设备与内核进行慢速路径、资源管理 操作的通信。快速路径操作通常是通过直接写入硬件寄存器mmap()到用户空间来完成 的，没有系统",
  "questions": [
    "Linux 内核：用户空间verbs访问的原理是什么？",
    "Linux 内核：用户空间verbs访问有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-infiniband-user-verbs",
      "url": "https://docs.kernel.org/translations/zh_CN/infiniband/user_verbs.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：用户空间verbs访问

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 用户空间verbs访问

> ib\_uverbs模块，通过启用CONFIG\_INFINIBAND\_USER\_ACCESS构建，使用户空间
> 通过“verbs”直接访问IB硬件，如InfiniBand架构规范第11章所述。
>
> 要使用verbs，需要libibverbs库，可从https://github.com/linux-rdma/rdma-core。
> libibverbs包含一个独立于设备的API，用于使用ib\_uverbs接口。libibverbs
> 还需要为你的InfiniBand硬件提供适当的独立于设备的内核和用户空间驱动。例如，
> 要使用Mellanox HCA，你需要安装ib\_mthca内核模块和libmthca用户空间驱动。

### 用户-内核通信

> 用户空间通过/dev/infiniband/uverbsN字符设备与内核进行慢速路径、资源管理
> 操作的通信。快速路径操作通常是通过直接写入硬件寄存器mmap()到用户空间来完成
> 的，没有系统调用或上下文切换到内核。
>
> 命令是通过在这些设备文件上的write()s发送给内核的。ABI在
> drivers/infiniband/include/ib\_user\_verbs.h中定义。需要内核响应的命令的结
> 构包含一个64位字段，用来传递一个指向输出缓冲区的指针。状态作为write()系统调
> 用的返回值被返回到用户空间。

### 资源管理

> 由于所有IB资源的创建和销毁都是通过文件描述符传递的命令完成的，所以内核可以跟
> 踪那些被附加到给定用户空间上下文的资源。ib\_uverbs模块维护着idr表，用来在
> 内核指针和不透明的用户空间句柄之间进行转换，这样内核指针就不会暴露给用户空间，
> 而用户空间也无法欺骗内核去跟踪一个假的指针。
>
> 这也允许内核在一个进程退出时进行清理，并防止一个进程触及另一个进程的资源。

### 内存固定

> 直接的用户空间I/O要求与作为潜在I/O目标的内存区域保持在同一物理地址上。ib\_uverbs
> 模块通过get\_user\_pages()和put\_page()调用来管理内存区域的固定和解除固定。它还核
> 算进程的pinned\_vm中被固定的内存量，并检查非特权进程是否超过其RLIMIT\_MEMLOCK限制。
>
> 被多次固定的页面在每次被固定时都会被计数，所以pinned\_vm的值可能会高估一个进程所
> 固定的页面数量。

### /dev文件

> 要想用udev自动创建适当的字符设备文件，可以采用如下规则:
>
> ```
> KERNEL=="uverbs*", NAME="infiniband/%k"
> ```
>
> 可以使用。 这将创建设备节点，名为:
>
> ```
> /dev/infiniband/uverbs0
> ```
>
> 等等。由于InfiniBand的用户空间verbs对于非特权进程来说应该是安全的，因此在udev规
> 则中加入适当的MODE或GROUP可能是有用的。

## 来源、版本与核验

- 来源：[用户空间verbs访问](https://docs.kernel.org/translations/zh_CN/infiniband/user_verbs.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/infiniband/user_verbs.rst`。
