---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-userspace-api-seccomp-filter",
  "title": "Linux 内核：Seccomp BPF (基于过滤器的安全计算)",
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
  "snapshotHash": "f85a832a13d2567363fa02bccd519d89394a460029c797c8d9b1aed567ffc13f",
  "generatedHash": "f86ede0d5ece803ac7510a9c4d21b0af2056d1115f5d8648f3872b8e881638d1",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "大量系统调用被暴露给每个用户空间进程，但其中又有许多系统调用在进程的整个生命 周期中都没被使用。随着系统调用的改变和成熟，缺陷被找到并消除。允许某一部分应 用程序仅能访问一部分系统调用是有好处的，这会缩小内核暴露给应用程序的面积。 系统调用过滤器就是为这些应用程序而生的。 Seccomp过滤提供了一种为进程指定一个处理系统调用的过滤器的方法。这个过滤器体 现",
  "l1": "大量系统调用被暴露给每个用户空间进程，但其中又有许多系统调用在进程的整个生命 周期中都没被使用。随着系统调用的改变和成熟，缺陷被找到并消除。允许某一部分应 用程序仅能访问一部分系统调用是有好处的，这会缩小内核暴露给应用程序的面积。 系统调用过滤器就是为这些应用程序而生的。 Seccomp过滤提供了一种为进程指定一个处理系统调用的过滤器的方法。这个过滤器体 现为一个伯克利包过滤器（BPF）程序，就像套接字过滤器一样，不同在于前者处理的 数据和正在进行的系统调用有关：系统调用号和系统调用参数。这样使用一种长期与 用户空间和直接数据打交道的语言来表达系统调用过滤成为了可能。 此外，BPF让seccomp用户不再成为在系统调用干预框架（system call interposition frameworks）中常见的检查-使用竞态攻击（TOCTOU）的受害者。BPF程序可能无法解引 用指针，这就限",
  "questions": [
    "Linux 内核：Seccomp BPF (基于过滤器的安全计算)的原理是什么？",
    "Linux 内核：Seccomp BPF (基于过滤器的安全计算)有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-userspace-api-seccomp-filter",
      "url": "https://docs.kernel.org/translations/zh_CN/userspace-api/seccomp_filter.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：Seccomp BPF (基于过滤器的安全计算)

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## Seccomp BPF (基于过滤器的安全计算)

*Seccomp: SECure COMPuting*

### 介绍

大量系统调用被暴露给每个用户空间进程，但其中又有许多系统调用在进程的整个生命
周期中都没被使用。随着系统调用的改变和成熟，缺陷被找到并消除。允许某一部分应
用程序仅能访问一部分系统调用是有好处的，这会缩小内核暴露给应用程序的面积。
系统调用过滤器就是为这些应用程序而生的。

Seccomp过滤提供了一种为进程指定一个处理系统调用的过滤器的方法。这个过滤器体
现为一个伯克利包过滤器（BPF）程序，就像套接字过滤器一样，不同在于前者处理的
数据和正在进行的系统调用有关：系统调用号和系统调用参数。这样使用一种长期与
用户空间和直接数据打交道的语言来表达系统调用过滤成为了可能。

此外，BPF让seccomp用户不再成为在系统调用干预框架（system call interposition
frameworks）中常见的检查-使用竞态攻击（TOCTOU）的受害者。BPF程序可能无法解引
用指针，这就限制了所有过滤器仅能直接评估系统调用参数。

### 这不是什么

系统调用过滤并不是一个沙箱。它提供了一种明确定义的机制来最小化内核暴露面。它
旨在成为一个沙箱开发者使用的工具。除此之外，逻辑行为和信息流的策略应该结合其他
系统加固手段或者可能由你选择的内核安全模块（LSM）来管理。易于表达的动态过滤器
为这条路提供了更多选择（比如避免病态的大小或者选择允许 socketcall() 中的多路
系统调用），但将其理解为更完整的沙箱解决方案是错误的。

### 用法

添加了一个额外的seccomp模式，它可以使用和严格seccomp相同的 prctl(2) 调用来启用。
如果架构有 CONFIG\_HAVE\_ARCH\_SECCOMP\_FILTER 标志，那么可以添加以下过滤器：

PR\_SET\_SECCOMP:
:   现在需要添加一个额外的参数来指定使用BPF程序的新过滤器。
    BPF程序将在反应系统调用号、参数和其他元数据的seccomp\_data结构体之上执行。
    BPF程序必须返回允许的值之一来告知内核应该采取什么行动。

    用法:

    ```
    prctl(PR_SET_SECCOMP, SECCOMP_MODE_FILTER, prog);
    ```

    'prog' 参数是一个指向 sock\_fprog 结构体的指针，其中包含了过滤器程序。如
    果程序是无效的，该调用会返回 -1 并设置 errno 为 EINVAL 。

    如果 fork / clone 和 execve 被 @prog 所允许，任何子进程都将
    受到和父进程相同的过滤器和系统调用ABI的约束。

    在调用之前，进程必须调用 prctl(PR\_SET\_NO\_NEW\_PRIVS, 1) 或者在它的
    命名空间内以 CAP\_SYS\_ADMIN 权限运行。如果以上条件不满足，会返回
    -EACCES 。这一要求保证了过滤器程序不能用于比安装过滤器的进程拥有更高
    权限的子进程。

    另外，如果 prctl(2) 被安装的过滤器所允许，就可以叠加额外的过滤器。这会增
    加评估时间，但是可以进一步降低执行进程时的攻击面。

以上调用在成功时返回0，失败时返回一个非零的值。

### 返回值

一个seccomp过滤器可能返回下列任意值。如果多个过滤器存在，评估一个指定系统调用的
返回值总会使用最高优先级的值。（比如 SECCOMP\_RET\_KILL\_PROCESS 总是被优先
返回。）

按照优先级排序，它们是：

SECCOMP\_RET\_KILL\_PROCESS:
:   使得整个进程立即结束而不执行系统调用。进程的退出状态 (status & 0x7f) 将
    是 SIGSYS ，而不是 SIGKILL 。

SECCOMP\_RET\_KILL\_THREAD:
:   使得线程立即结束而不执行系统调用。线程的退出状态 (status & 0x7f) 将是
    是 SIGSYS ，而不是 SIGKILL 。

SECCOMP\_RET\_TRAP:
:   使得内核向触发进程发送一个 SIGSYS 信号而不执行系统调用。
    siginfo->si\_call\_addr 会展示系统调用指令的位置， siginfo->si\_syscall
    和 siginfo->si\_arch 会指出试图进行的系统调用。程序计数器会和发生了系统
    调用的一样（即它不会指向系统调用指令）。返回值寄存器会包含一个与架构相关的值——
    如果恢复执行，需要将其设为合理的值。（架构依赖性是因为将其替换为 -ENOSYS
    会导致一些有用的信息被覆盖。）

    返回值的 SECCOMP\_RET\_DATA 部分会作为 si\_errno 传递。

    由seccomp触发的 SIGSYS 会有一个 SYS\_SECCOMP 的 si\_code 。

SECCOMP\_RET\_ERRNO:
:   使得返回值的低16位作为errno传递给用户空间，而不执行系统调用。

SECCOMP\_RET\_USER\_NOTIF:
:   使得一个 struct seccomp\_notif 消息被发送到已附加的用户空间通知文件描述
    符。如果没有被附加则返回 -ENOSYS 。下面会讨论如何处理用户通知。

SECCOMP\_RET\_TRACE:
:   当返回的时候，这个值会使得内核在执行系统调用前尝试去通知一个基于 ptrace()
    的追踪器。如果没有追踪器， -ENOSYS 会返回给用户空间，并且系统调用不会执行。

    如果追踪器通过 ptrace(PTRACE\_SETOPTIONS) 请求了 PTRACE\_O\_TRACESECCOMP，
    那么它会收到 PTRACE\_EVENT\_SECCOMP 通知。BPF程序返回值的 SECCOMP\_RET\_DATA
    部分会通过 PTRACE\_GETEVENTMSG 提供给追踪器。

    追踪器可以通过改变系统调用号到-1来跳过系统调用。或者追踪器可以改变系统调用号到
    一个有效值来改变请求的系统调用。如果追踪器请求跳过系统调用，那么系统调用将返回
    追踪器放在返回值寄存器中的值。

    在追踪器被通知后，seccomp检查不会再次运行。（这意味着基于seccomp的沙箱必须禁止
    ptrace的使用，甚至其他沙箱进程也不行，除非非常小心；ptrace可以通过这个机制来逃
    逸。）

SECCOMP\_RET\_LOG:
:   使得系统调用在被记录之后再运行。这应该被应用开发者用来检查他们的程序需要哪些
    系统调用，而不需要反复通过多个测试和开发周期来建立清单。

    只有在 actions\_logged sysctl 字符串中出现 "log" 时，这个操作才会被记录。

SECCOMP\_RET\_ALLOW:
:   使得系统调用被执行。

如果多个追踪器存在，评估系统调用的返回值将永远使用最高优先级的值。

优先级只通过 SECCOMP\_RET\_ACTION 掩码来决定。当多个过滤器返回相同优先级的返回
值时，只有来自最近安装的过滤器的 SECCOMP\_RET\_DATA 会被返回。

### 隐患

最需要避免的隐患是在过滤系统调用号时却不检查架构值。因为在任何支持多个系统调用
约定的架构上，系统调用号可能根据具体调用而不同。如果不同调用约定中的调用号有重叠，
那么过滤器的检查可能被滥用。请总是检查架构值！

### 例子

samples/seccomp/ 文件夹包含了x86专用和更通用的使用高层宏接口来生成BPF程序的
例子。

### 用户空间通知

SECCOMP\_RET\_USER\_NOTIF 返回值会让seccomp过滤器传递一个特定的系统调用给用户
空间处理。这可能会对像容器管理器的程序有用，它们希望拦截特定的系统调用（如 mount()，
finit\_module() 等等）并改变其行为。

传递 SECCOMP\_FILTER\_FLAG\_NEW\_LISTENER 参数给 seccomp() 系统调用可以取
得通知文件描述符：

```
fd = seccomp(SECCOMP_SET_MODE_FILTER, SECCOMP_FILTER_FLAG_NEW_LISTENER, &prog);
```

成功情况下会返回一个对过滤器监听的文件描述符，然后可以通过 SCM\_RIGHTS 或类似
的方式传递。需要注意的是，过滤器文件描述符针对的是一个特定的过滤器而不是特定的进程。
所以如果这个进程后来fork了，来自两个进程的通知都会出现在同一个过滤器文件描述符中。
对于过滤器文件描述符的读写也是同步的，所以一个过滤器文件描述符可以安全地拥有多个读者。

seccomp通知文件描述符由两个结构体组成：

```
struct seccomp_notif_sizes {
    __u16 seccomp_notif;
    __u16 seccomp_notif_resp;
    __u16 seccomp_data;
};

struct seccomp_notif {
    __u64 id;
    __u32 pid;
    __u32 flags;
    struct seccomp_data data;
};

struct seccomp_notif_resp {
    __u64 id;
    __s64 val;
    __s32 error;
    __u32 flags;
};
```

struct seccomp\_notif\_sizes 结构体可以用于确定seccomp通知中各种结构体的大小。
struct seccomp\_data 的大小可能未来会改变，所以需要使用下面的代码：

```
struct seccomp_notif_sizes sizes;
seccomp(SECCOMP_GET_NOTIF_SIZES, 0, &sizes);
```

来决定需要分配的多种结构体的大小。请查看 samples/seccomp/user-trap.c 中的例子。

用户可以通过 ioctl(SECCOMP\_IOCTL\_NOTIF\_RECV) (或 poll()) 读取seccomp
通知文件描述符来接收一个 struct seccomp\_notif ，其中包含五个成员：结构体的
输入长度，每个过滤器唯一的 id ， 触发请求进程的 pid （如果进程的pid命名空
间对于监听者的pid命名空间不可见的话，可能为0）。通知还包含传递给seccomp的 data
和一个过滤器标志。在调用ioctl前结构体应该被清空。

之后用户空间可以根据这些信息决定做什么，并通过 ioctl(SECCOMP\_IOCTL\_NOTIF\_SEND)
发送一个响应，表示应该给用户空间返回什么。 struct seccomp\_notif\_resp 的 id
成员应该和 struct seccomp\_notif 的 id 一致。

用户空间也可以通过 ioctl(SECCOMP\_IOCTL\_NOTIF\_ADDFD) 向通知进程添加文件描述
符。 struct seccomp\_notif\_addfd 的 id 成员应该和 struct seccomp\_notif
的 id 保持一致。 newfd\_flags 标志可以被用于在通知进程的文件描述符上设置
O\_CLOEXEC 等标志。如果监督者（supervisor）向文件描述符注入一个特定的数字，可以使用
SECCOMP\_ADDFD\_FLAG\_SETFD 标志，并设置 newfd 成员为要使用的特定数字。
如果文件描述符已经在通知进程中打开，那它将被替换。监督者也可以添加一个文件描述符，
并使用 SECCOMP\_ADDFD\_FLAG\_SEND 标志原子响应，返回值将是注入的文件描述符编号。

通知进程可以被抢占，导致通知被终止。这可能在尝试代表通知进程执行长时间且通常可重试
（如挂载文件系统）的操作时导致问题。另外，在安装过滤器的时候，
SECCOMP\_FILTER\_FLAG\_WAIT\_KILLABLE\_RECV 可以被设置。这个标志使得当监督者收到用
户通知时，通知进程会忽略非致命信号，直到响应被发送。在用户空间收到通知之前发出的信号
将被正常处理。

值得注意的是， struct seccomp\_data 包含了系统调用寄存器参数的值，但是不包含指向
内存的指针。进程的内存可以通过 ptrace() 或 /proc/pid/mem 由合适的特权跟踪
访问。但是，需要注意避免之前提到的TOCTOU攻击：所有从被跟踪者内存中读到的参数都应该先
读到追踪器的内存中，再做出策略决定。这样就可以对系统调用的参数做原子决定。

### Sysctls

Seccomp的sysctl文件可以在 /proc/sys/kernel/seccomp/ 文件夹中找到。这里有对文件
夹中每个文件的描述：

actions\_avail:
:   以字符串形式保存seccomp返回值（参考上文的 SECCOMP\_RET\_\* 宏）的只读有序
    列表。从左往右按照最少许可返回值到最多许可返回值排序。

    这个列表代表了内核支持的seccomp返回值集合。一个用户空间程序可以使用这个列表来在
    程序建立时确定在 seccomp.h 中找到的动作是否和当前运行内核实际支持的动作有所
    不同。

actions\_logged:
:   允许被记录的seccomp返回值（参考上文的 SECCOMP\_RET\_\* 宏）的可读写有序列表。
    对文件写入不需要是有序的，但从文件读取将采用与actions\_avail sysctl一致的方式排序。

    allow 字符串在 actions\_logged sysctl中不被接收，因为不可能记录
    SECCOMP\_RET\_ALLOW 动作。尝试向sysctl写入 allow 会导致返回一个EINVAL。

### 添加架构支持

请查看 arch/Kconfig 了解权威要求。总的来说如果一个架构同时支持ptrace\_event和
seccomp，那么它将可以通过较小的修改支持seccomp过滤器： SIGSYS 支持和seccomp
返回值检查。然后必须将 CONFIG\_HAVE\_ARCH\_SECCOMP\_FILTER 添加到它的架构特定
的Kconfig中。

### 注意事项

vDSO可能导致一些系统调用完全在用户空间中运行，当你在不同机器上跑程序时可能导致回退
到真正系统调用的意外发生。为了在x86上最小化这些意外的发生，请确保你在测试时把
/sys/devices/system/clocksource/clocksource0/current\_clocksource 设置为
acpi\_pm 之类的值。

在x86-64上，vsyscall模拟默认开启。（vsyscalls是vDSO调用的传统变体。）目前，模拟
vsyscalls会遵守seccomp，但是有一些奇怪情况：

- SECCOMP\_RET\_TRAP 的返回值会设置一个指向给定vsyscall入口的 si\_call\_addr，
  而不是'syscall'指令之后的地址。任何想重新开始调用的代码都需要注意 (a) ret指令
  已被模拟，(b) 试图恢复系统调用将再次触发标准vsyscall模拟安全检查，使得恢复系统
  调用在大部分情况下没有意义。
- SECCOMP\_RET\_TRACE 的返回值将像往常一样给追踪器发出信号，但是系统调用可能不能
  使用orig\_rax寄存器改变为另一个系统调用。可能只能改变为-1来跳过当前模拟的调用。
  任何其他改变都可能终止进程。追踪器看到的rip值将是系统调用的入口地址；这和正常行为
  不同。追踪器禁止修改rip或者rsp。（不要依赖其他改变来终止进程，它们可能正常工作。
  比如在一些内核中，选择一个只存在于未来内核中的系统调用将被正确模拟，返回一个
  -ENOSYS 。）

要检测这个古怪的行为，可以检查 addr & ~0x0C00 == 0xFFFFFFFFFF600000。（对于
SECCOMP\_RET\_TRACE ，使用rip。对于 SECCOMP\_RET\_TRAP ，使用
siginfo->si\_call\_addr 。）不要检测其他条件：未来内核可能会改进vsyscall模拟，
当前内核在vsyscall=native模式下会有不同表现，但在这些情况下， 0xF...F600{0,4,8,C}00
处的指令将不是系统调用。

请注意，现代系统根本不可能使用vsyscalls —— 它们是一种遗留功能，而且比标准系统调用
慢得多。 新的代码将使用vDSO，而vDSO发出的系统调用与正常的系统调用没有区别。

## 来源、版本与核验

- 来源：[Seccomp BPF (基于过滤器的安全计算)](https://docs.kernel.org/translations/zh_CN/userspace-api/seccomp_filter.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/userspace-api/seccomp_filter.rst`。
