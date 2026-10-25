---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-userspace-api-no-new-privs",
  "title": "Linux 内核：无新权限标志",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "userspace-api"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "540f36db3f5b2495766ea4cf76796ddc9a2f06cff3eaa2f412d98d3396798f75",
  "generatedHash": "ffe21853fe0c0b57ddcdc994e94ce06cfd4ed9e85ff34de5cf9658ced7974b0b",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "execve系统调用可以给一个新启动的程序授予它的父程序本没有的权限。最明显的两个 例子就是setuid/setgid控制程序和文件的能力。为了避免父程序也获得这些权限，内 核和用户代码必须小心避免任何父程序可以颠覆子程序的情况。比如： - 程序在setuid后，动态装载器处理 LD_* 环境变量的不同方式。 - 对于非特权程序，chroot是不允许的，因为",
  "l1": "execve系统调用可以给一个新启动的程序授予它的父程序本没有的权限。最明显的两个 例子就是setuid/setgid控制程序和文件的能力。为了避免父程序也获得这些权限，内 核和用户代码必须小心避免任何父程序可以颠覆子程序的情况。比如： - 程序在setuid后，动态装载器处理 LD_* 环境变量的不同方式。 - 对于非特权程序，chroot是不允许的，因为这会允许 /etc/passwd 在继承 chroot的程序眼中被替换。 - 执行代码对ptrace有特殊处理。 这些都是临时性的修复。 no_new_privs 位（从 Linux 3.5 起）是一个新的通 用的机制来保证一个进程安全地修改其执行环境并跨execve持久化。任何任务都可以设 置 no_new_privs 。一旦该位被设置，它会在fork、clone和execve中继承下去 ，并且不能被撤销。在 no_new_privs",
  "questions": [
    "Linux 内核：无新权限标志的原理是什么？",
    "Linux 内核：无新权限标志有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-userspace-api-no-new-privs",
      "url": "https://docs.kernel.org/translations/zh_CN/userspace-api/no_new_privs.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：无新权限标志

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 无新权限标志

execve系统调用可以给一个新启动的程序授予它的父程序本没有的权限。最明显的两个
例子就是setuid/setgid控制程序和文件的能力。为了避免父程序也获得这些权限，内
核和用户代码必须小心避免任何父程序可以颠覆子程序的情况。比如：

> - 程序在setuid后，动态装载器处理 LD\_\* 环境变量的不同方式。
> - 对于非特权程序，chroot是不允许的，因为这会允许 /etc/passwd 在继承
>   chroot的程序眼中被替换。
> - 执行代码对ptrace有特殊处理。

这些都是临时性的修复。 no\_new\_privs 位（从 Linux 3.5 起）是一个新的通
用的机制来保证一个进程安全地修改其执行环境并跨execve持久化。任何任务都可以设
置 no\_new\_privs 。一旦该位被设置，它会在fork、clone和execve中继承下去
，并且不能被撤销。在 no\_new\_privs 被设置的情况下， execve() 将保证
不会授予权限去做任何没有execve调用就不能做的事情。比如， setuid 和 setgid
位不会再改变 uid 或 gid；文件能力不会被添加到授权集合中，并且Linux安全模块（
LSM）不会在execve调用后放松限制。

设置 no\_new\_privs 使用:

```
prctl(PR_SET_NO_NEW_PRIVS, 1, 0, 0, 0);
```

不过要小心，Linux安全模块（LSM）也可能不会在 no\_new\_privs 模式下收紧约束。
（这意味着一个一般的服务启动器在执行守护进程前就去设置 no\_new\_privs 可能
会干扰基于LSM的沙箱。）

请注意， no\_new\_privs 并不能阻止不涉及 execve() 的权限变化。一个拥有
适当权限的任务仍然可以调用 setuid(2) 并接收 SCM\_RIGHTS 数据报。

目前来说， no\_new\_privs 有两大使用场景：

> - 为seccomp模式2沙箱安装的过滤器会跨execve持久化，并能够改变新执行程序的行为。
>   非特权用户因此在 no\_new\_privs 被设置的情况下只允许安装这样的过滤器。
> - no\_new\_privs 本身就能被用于减少非特权用户的攻击面。如果所有以某个 uid
>   运行的程序都设置了 no\_new\_privs ，那么那个 uid 将无法通过攻击 setuid，
>   setgid 和使用文件能力的二进制来提权；它需要先攻击一些没有被设置 no\_new\_privs
>   位的东西。

将来，其他潜在的危险的内核特性可能被非特权任务利用，即使 no\_new\_privs 被置位。
原则上，当 no\_new\_privs 被置位时， unshare(2) 和 clone(2) 的几个选
项将是安全的，并且 no\_new\_privs 加上 chroot 是可以被认为比 chroot本身危
险性小得多的。

## 来源、版本与核验

- 来源：[无新权限标志](https://docs.kernel.org/translations/zh_CN/userspace-api/no_new_privs.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/userspace-api/no_new_privs.rst`。
