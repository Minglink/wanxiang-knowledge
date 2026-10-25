---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-networking-napi",
  "title": "Linux 内核：NAPI",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "networking"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "081fea3ddb942c9d3eeafd198e1bb67718f075729bdf3d0e72bc51527308822e",
  "generatedHash": "7300907d9e4c415215f94f0447f993d6d20905d35a383c23a5efd33862134e6f",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "NAPI 是 Linux 网络堆栈中使用的事件处理机制。NAPI 的名称现在不再代表任何特定含义 [[1]](#footnote-1)。 在基本操作中，设备通过中断通知主机有新事件发生。主机随后调度 NAPI 实例来处理这些事件。 该设备也可以通过 NAPI 进行事件轮询，而无需先接收中断信号（忙轮询）。 NAPI 处理通常发生在软中断上下文中，但有一个选项",
  "l1": "NAPI 是 Linux 网络堆栈中使用的事件处理机制。NAPI 的名称现在不再代表任何特定含义 [[1]](#footnote-1)。 在基本操作中，设备通过中断通知主机有新事件发生。主机随后调度 NAPI 实例来处理这些事件。 该设备也可以通过 NAPI 进行事件轮询，而无需先接收中断信号（忙轮询）。 NAPI 处理通常发生在软中断上下文中，但有一个选项，可以使用 单独的内核线程 来进行 NAPI 处理。 总的来说，NAPI 为驱动程序抽象了事件（数据包接收和发送）处理的上下文环境和配置情况。 NAPI 最重要的两个元素是 struct napi_struct 和关联的 poll 方法。struct napi_struct 持有 NAPI 实例的状态，而方法则是与驱动程序相关的事件处理器。该方法通常会释放已传输的发送 (Tx)数据包并处理新接收的数据包。 netif_napi_add(",
  "questions": [
    "Linux 内核：NAPI的原理是什么？",
    "Linux 内核：NAPI有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-networking-napi",
      "url": "https://docs.kernel.org/translations/zh_CN/networking/napi.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "(GPL-2.0-only OR BSD-2-Clause)"
}
---
# Linux 内核：NAPI

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## NAPI

NAPI 是 Linux 网络堆栈中使用的事件处理机制。NAPI 的名称现在不再代表任何特定含义 [[1]](#footnote-1)。

在基本操作中，设备通过中断通知主机有新事件发生。主机随后调度 NAPI 实例来处理这些事件。
该设备也可以通过 NAPI 进行事件轮询，而无需先接收中断信号（忙轮询）。

NAPI 处理通常发生在软中断上下文中，但有一个选项，可以使用 单独的内核线程
来进行 NAPI 处理。

总的来说，NAPI 为驱动程序抽象了事件（数据包接收和发送）处理的上下文环境和配置情况。

### 驱动程序API

NAPI 最重要的两个元素是 struct napi\_struct 和关联的 poll 方法。struct napi\_struct
持有 NAPI 实例的状态，而方法则是与驱动程序相关的事件处理器。该方法通常会释放已传输的发送
(Tx)数据包并处理新接收的数据包。

#### 控制API

netif\_napi\_add() 和 netif\_napi\_del() 用于向系统中添加/删除一个 NAPI 实例。实例会被
附加到作为参数传递的 netdevice上（并在 netdevice 注销时自动删除）。实例在添加时处于禁
用状态。

napi\_enable() 和 napi\_disable() 管理禁用状态。禁用的 NAPI 不会被调度，并且保证其
poll 方法不会被调用。napi\_disable() 会等待 NAPI 实例的所有权被释放。

这些控制 API 并非幂等的。控制 API 调用在面对数据路径 API 的并发使用时是安全的，但控制
API 调用顺序错误可能会导致系统崩溃、死锁或竞态条件。例如，连续多次调用 napi\_disable()
会造成死锁。

#### 数据路径API

napi\_schedule() 是调度 NAPI 轮询的基本方法。驱动程序应在其中断处理程序中调用此函数
（更多信息请参见 drv\_sched\_zh\_CN）。成功的 napi\_schedule() 调用将获得 NAPI 实例
的所有权。

之后，在 NAPI 被调度后，驱动程序的 poll 方法将被调用以处理事件/数据包。该方法接受一个
budget 参数 - 驱动程序可以处理任意数量的发送 (Tx) 数据包完成，但处理最多处理
budget 个接收 (Rx) 数据包。处理接收数据包通常开销更大。

换句话说，对于接收数据包的处理，budget 参数限制了驱动程序在单次轮询中能够处理的数
据包数量。当 budget 为 0 时，像页面池或 XDP 这类专门用于接收的 API 根本无法使用。
无论 budget 的值是多少，skb 的发送处理都应该进行，但是如果 budget 参数为 0，
驱动程序就不能调用任何 XDP（或页面池）API。

Warning

如果内核仅尝试处理skb的发送完成情况，而不处理接收 (Rx) 或 XDP 数据包，那么 budget
参数可能为 0。

轮询方法会返回已完成的工作量。如果驱动程序仍有未完成的工作（例如，budget 已用完），
轮询方法应精确返回 budget 的值。在这种情况下，NAPI 实例将再次被处理 / 轮询（无需
重新调度）。

如果事件处理已完成（所有未处理的数据包都已处理完毕），轮询方法在返回之前应调用 napi\_complete\_done()。
napi\_complete\_done() 会释放实例的所有权。

Warning

当出现既完成了所有事件处理，又恰好达到了 budget 数量的情况时，必须谨慎处理。因为没
有办法将这种（很少出现的）情况报告给协议栈，所以驱动程序要么不调用 napi\_complete\_done()
并等待再次被调用，要么返回 budget - 1。

当 budget 为 0 时，napi\_complete\_done() 绝对不能被调用。

#### 调用序列

驱动程序不应假定调用的顺序是固定不变的。即使驱动程序没有调度该实例，轮询方法也可能会被调用
（除非该实例处于禁用状态）。同样，即便 napi\_schedule() 调用成功，也不能保证轮询方法一定
会被调用（例如，如果该实例被禁用）。

正如在 drv\_ctrl\_zh\_CN 部分所提到的，napi\_disable() 以及后续对轮询方法的调用，
仅会等待该实例的所有权被释放，而不会等待轮询方法退出。这意味着，驱动程序在调用 napi\_complete\_done()
之后，应避免访问任何数据结构。

#### 调度与IRQ屏蔽

驱动程序应在调度 NAPI 实例后保持中断屏蔽 - 直到 NAPI 轮询完成，任何进一步的中断都是不必要的。

显式屏蔽中断的驱动程序（而非设备自动屏蔽 IRQ）应使用 napi\_schedule\_prep() 和
\_\_napi\_schedule() 调用：

```
if (napi_schedule_prep(&v->napi)) {
    mydrv_mask_rxtx_irq(v->idx);
    /* 在屏蔽后调度以避免竞争 */
    __napi_schedule(&v->napi);
}
```

IRQ 仅应在成功调用 napi\_complete\_done() 后取消屏蔽：

```
if (budget && napi_complete_done(&v->napi, work_done)) {
  mydrv_unmask_rxtx_irq(v->idx);
  return min(work_done, budget - 1);
}
```

napi\_schedule\_irqoff() 是 napi\_schedule() 的一个变体，它利用了在中断请求（IRQ）上下文
环境中调用所带来的特性（无需屏蔽中断）。如果中断请求（IRQ）是通过线程处理的（例如启用了
PREEMPT\_RT 时的情况），napi\_schedule\_irqoff() 会回退为使用 napi\_schedule() 。

#### 实例到队列的映射

现代设备每个接口有多个 NAPI 实例（struct napi\_struct）。关于实例如何映射到队列和中断没有
严格要求。NAPI 主要是事件处理/轮询抽象，没有用户可见的语义。也就是说，大多数网络设备最终以
非常相似的方式使用 NAPI。

NAPI 实例最常以 1:1:1 映射到中断和队列对（队列对是由一个接收队列和一个发送队列组成的一组
队列）。

在不太常见的情况下，一个 NAPI 实例可能会用于处理多个队列，或者在单个内核上，接收（Rx）队列
和发送（Tx）队列可以由不同的 NAPI 实例来处理。不过，无论队列如何分配，通常 NAPI 实例和中断
之间仍然保持一一对应的关系。

值得注意的是，ethtool API 使用了 “通道” 这一术语，每个通道可以是 rx （接收）、tx
（发送）或 combined （组合）类型。目前尚不清楚一个通道具体由什么构成，建议的理解方式是
将一个通道视为一个为特定类型队列提供服务的 IRQ（中断请求）/ NAPI 实例。例如，配置为 1 个
rx 通道、1 个 tx 通道和 1 个 combined 通道的情况下，预计会使用 3 个中断、
2 个接收队列和 2 个发送队列。

#### 持久化NAPI配置

驱动程序常常会动态地分配和释放 NAPI 实例。这就导致每当 NAPI 实例被重新分配时，与 NAPI 相关
的用户配置就会丢失。netif\_napi\_add\_config() API接口通过将每个 NAPI 实例与基于驱动程序定义
的索引值（如队列编号）的持久化 NAPI 配置相关联，从而避免了这种配置丢失的情况。

使用此 API 可实现持久化的 NAPI 标识符（以及其他设置），这对于使用 SO\_INCOMING\_NAPI\_ID
的用户空间程序来说是有益的。有关其他 NAPI 配置的设置，请参阅以下章节。

驱动程序应尽可能尝试使用 netif\_napi\_add\_config()。

### 用户API

用户与 NAPI 的交互依赖于 NAPI 实例 ID。这些实例 ID 仅通过 SO\_INCOMING\_NAPI\_ID 套接字
选项对用户可见。

用户可以使用 Netlink 来查询某个设备或设备队列的 NAPI 标识符。这既可以在用户应用程序中通过编程
方式实现，也可以使用内核源代码树中包含的一个脚本：tools/net/ynl/pyynl/cli.py 来完成。

例如，使用该脚本转储某个设备的所有队列（这将显示每个队列的 NAPI 标识符）：

```
$ kernel-source/tools/net/ynl/pyynl/cli.py \
          --spec Documentation/netlink/specs/netdev.yaml \
          --dump queue-get \
          --json='{"ifindex": 2}'
```

有关可用操作和属性的更多详细信息，请参阅 Documentation/netlink/specs/netdev.yaml。

#### 软件IRQ合并

默认情况下，NAPI 不执行任何显式的事件合并。在大多数场景中，数据包的批量处理得益于设备进行
的中断请求（IRQ）合并。不过，在某些情况下，软件层面的合并操作也很有帮助。

可以将 NAPI 配置为设置一个重新轮询定时器，而不是在处理完所有数据包后立即取消屏蔽硬件中断。
网络设备的 gro\_flush\_timeout sysfs 配置项可用于控制该定时器的延迟时间，而 napi\_defer\_hard\_irqs
则用于控制在 NAPI 放弃并重新启用硬件中断之前，连续进行空轮询的次数。

上述参数也可以通过 Netlink 的 netdev-genl 接口，基于每个 NAPI 实例进行设置。当通过
Netlink 进行配置且是基于每个 NAPI 实例设置时，上述参数使用连字符（-）而非下划线（\_）
来命名，即 gro-flush-timeout 和 napi-defer-hard-irqs。

基于每个 NAPI 实例的配置既可以在用户应用程序中通过编程方式完成，也可以使用内核源代码树中的
一个脚本实现，该脚本为 tools/net/ynl/pyynl/cli.py。

例如，通过如下方式使用该脚本：

```
$ kernel-source/tools/net/ynl/pyynl/cli.py \
          --spec Documentation/netlink/specs/netdev.yaml \
          --do napi-set \
          --json='{"id": 345,
                   "defer-hard-irqs": 111,
                   "gro-flush-timeout": 11111}'
```

类似地，参数 irq-suspend-timeout 也可以通过 netlink 的 netdev-genl 设置。没有全局
的 sysfs 参数可用于设置这个值。

irq-suspend-timeout 用于确定应用程序可以完全挂起 IRQ 的时长。与 SO\_PREFER\_BUSY\_POLL
结合使用，后者可以通过 EPIOCSPARAMS ioctl 在每个 epoll 上下文中设置。

#### 忙轮询

忙轮询允许用户进程在设备中断触发前检查传入的数据包。与其他忙轮询一样，它以 CPU 周期换取更低
的延迟（生产环境中 NAPI 忙轮询的使用尚不明确）。

通过在选定套接字上设置 SO\_BUSY\_POLL 或使用全局 net.core.busy\_poll 和 net.core.busy\_read
等 sysctls 启用忙轮询。还存在基于 io\_uring 的 NAPI 忙轮询 API 可使用。

#### 基于epoll的忙轮询

可以从 epoll\_wait 调用直接触发数据包处理。为了使用此功能，用户应用程序必须确保添加到
epoll 上下文的所有文件描述符具有相同的 NAPI ID。

如果应用程序使用专用的 acceptor 线程，那么该应用程序可以获取传入连接的 NAPI ID（使用
SO\_INCOMING\_NAPI\_ID）然后将该文件描述符分发给工作线程。工作线程将该文件描述符添加到其
epoll 上下文。这确保了每个工作线程的 epoll 上下文中所包含的文件描述符具有相同的 NAPI ID。

或者，如果应用程序使用 SO\_REUSEPORT，可以插入 bpf 或 ebpf 程序来分发传入连接，使得每个
线程只接收具有相同 NAPI ID 的连接。但是必须谨慎处理系统中可能存在多个网卡的情况。

为了启用忙轮询，有两种选择：

1. /proc/sys/net/core/busy\_poll 可以设置为微秒数以在忙循环中等待事件。这是一个系统
   范围的设置，将导致所有基于 epoll 的应用程序在调用 epoll\_wait 时忙轮询。这可能不是理想
   的情况，因为许多应用程序可能不需要忙轮询。
2. 使用最新内核的应用程序可以在 epoll 上下文的文件描述符上发出 ioctl 来设置(EPIOCSPARAMS)
   或获取(EPIOCGPARAMS) struct epoll\_params，用户程序定义如下：

```
struct epoll_params {
    uint32_t busy_poll_usecs;
    uint16_t busy_poll_budget;
    uint8_t prefer_busy_poll;

    /* 将结构填充到 64 位的倍数 */
    uint8_t __pad;
};
```

#### IRQ缓解

虽然忙轮询旨在用于低延迟应用，但类似的机制可用于减少中断请求。

每秒高请求的应用程序（尤其是路由/转发应用程序和特别使用 AF\_XDP 套接字的应用程序）
可能希望在处理完一个请求或一批数据包之前不被中断。

此类应用程序可以向内核承诺会定期执行忙轮询操作，而驱动程序应将设备的中断请求永久屏蔽。
通过使用 SO\_PREFER\_BUSY\_POLL 套接字选项可启用此模式。为避免系统出现异常，如果
在 gro\_flush\_timeout 时间内没有进行任何忙轮询调用，该承诺将被撤销。对于基于
epoll 的忙轮询应用程序，可以将 struct epoll\_params 结构体中的 prefer\_busy\_poll
字段设置为 1，并使用 EPIOCSPARAMS 输入 / 输出控制（ioctl）操作来启用此模式。
更多详情请参阅上述章节。

NAPI 忙轮询的 budget 低于默认值（这符合正常忙轮询的低延迟意图）。减少中断请求的场景中
并非如此，因此 budget 可以通过 SO\_BUSY\_POLL\_BUDGET 套接字选项进行调整。对于基于
epoll 的忙轮询应用程序，可以通过调整 struct epoll\_params 中的 busy\_poll\_budget
字段为特定值，并使用 EPIOCSPARAMS ioctl 在特定 epoll 上下文中设置。更多详细信
息请参见上述部分。

需要注意的是，为 gro\_flush\_timeout 选择较大的值会延迟中断请求，以实现更好的批
量处理，但在系统未满载时会增加延迟。为 gro\_flush\_timeout 选择较小的值可能会因
设备中断请求和软中断处理而干扰尝试进行忙轮询的用户应用程序。应权衡这些因素后谨慎选择
该值。基于 epoll 的忙轮询应用程序可以通过为 maxevents 选择合适的值来减少用户
处理的干扰。

用户可能需要考虑使用另一种方法，IRQ 挂起，以帮助应对这些权衡问题。

#### IRQ挂起

IRQ 挂起是一种机制，其中设备 IRQ 在 epoll 触发 NAPI 数据包处理期间被屏蔽。

只要应用程序对 epoll\_wait 的调用成功获取事件，内核就会推迟 IRQ 挂起定时器。如果
在忙轮询期间没有获取任何事件（例如，因为网络流量减少），则会禁用IRQ挂起功能，并启
用上述减少中断请求的策略。

这允许用户在 CPU 消耗和网络处理效率之间取得平衡。

要使用此机制：

> 1. 每个 NAPI 的配置参数 irq-suspend-timeout 应设置为应用程序可以挂起
>    IRQ 的最大时间（纳秒）。这通过 netlink 完成，如上所述。此超时时间作为一
>    种安全机制，如果应用程序停滞，将重新启动中断驱动程序的中断处理。此值应选择
>    为覆盖用户应用程序调用 epoll\_wait 处理数据所需的时间，需注意的是，应用程
>    序可通过在调用 epoll\_wait 时设置 max\_events 来控制获取的数据量。
> 2. sysfs 参数或每个 NAPI 的配置参数 gro\_flush\_timeout 和 napi\_defer\_hard\_irqs
>    可以设置为较低值。它们将用于在忙轮询未找到数据时延迟 IRQs。
> 3. 必须将 prefer\_busy\_poll 标志设置为 true。如前文所述，可使用 EPIOCSPARAMS
>    ioctl操作来完成此设置。
> 4. 应用程序按照上述方式使用 epoll 触发 NAPI 数据包处理。

如上所述，只要后续对 epoll\_wait 的调用向用户空间返回事件，irq-suspend-timeout
就会被推迟并且 IRQ 会被禁用。这允许应用程序在无干扰的情况下处理数据。

一旦 epoll\_wait 的调用没有找到任何事件，IRQ 挂起会被自动禁用，并且 gro\_flush\_timeout
和 napi\_defer\_hard\_irqs 缓解机制将开始起作用。

预期是 irq-suspend-timeout 的设置值会远大于 gro\_flush\_timeout，因为 irq-suspend-timeout
应在一个用户空间处理周期内暂停中断请求。

虽然严格来说不必通过 napi\_defer\_hard\_irqs 和 gro\_flush\_timeout 来执行 IRQ 挂起，
但强烈建议这样做。

中断请求挂起会使系统在轮询模式和由中断驱动的数据包传输模式之间切换。在网络繁忙期间，irq-suspend-timeout
会覆盖 gro\_flush\_timeout，使系统保持忙轮询状态，但是当 epoll 未发现任何事件时，gro\_flush\_timeout
和 napi\_defer\_hard\_irqs 的设置将决定下一步的操作。

有三种可能的网络处理和数据包交付循环：

1. 硬中断 -> 软中断 -> NAPI 轮询；基本中断交付
2. 定时器 -> 软中断 -> NAPI 轮询；延迟的 IRQ 处理
3. epoll -> 忙轮询 -> NAPI 轮询；忙循环

循环 2 可以接管循环 1，如果设置了 gro\_flush\_timeout 和 napi\_defer\_hard\_irqs。

如果设置了 gro\_flush\_timeout 和 napi\_defer\_hard\_irqs，循环 2 和 3 将互相“争夺”控制权。

在繁忙时期，irq-suspend-timeout 用作循环 2 的定时器，这基本上使网络处理倾向于循环 3。

如果不设置 gro\_flush\_timeout 和 napi\_defer\_hard\_irqs，循环 3 无法从循环 1 接管。

因此，建议设置 gro\_flush\_timeout 和 napi\_defer\_hard\_irqs，因为若不这样做，设置
irq-suspend-timeout 可能不会有明显效果。

#### 线程化NAPI

线程化 NAPI 是一种操作模式，它使用专用的内核线程而非软件中断上下文来进行 NAPI 处理。这种配置
是针对每个网络设备的，并且会影响该设备的所有 NAPI 实例。每个 NAPI 实例将生成一个单独的线程
（称为 napi/${ifc-name}-${napi-id} ）。

建议将每个内核线程固定到单个 CPU 上，这个 CPU 与处理中断的 CPU 相同。请注意，中断请求（IRQ）
和 NAPI 实例之间的映射关系可能并不简单（并且取决于驱动程序）。NAPI 实例 ID 的分配顺序将与内
核线程的进程 ID 顺序相反。

线程化 NAPI 是通过向网络设备的 sysfs 目录中的 threaded 文件写入 0 或 1 来控制的。

脚注

[[1](#footnote-reference-1)]

NAPI 最初在 2.4 Linux 中被称为 New API。

## 来源、版本与核验

- 来源：[NAPI](https://docs.kernel.org/translations/zh_CN/networking/napi.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：(GPL-2.0-only OR BSD-2-Clause)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/networking/napi.rst`。
