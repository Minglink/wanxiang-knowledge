---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-scsi-scsi-eh",
  "title": "Linux 内核：SCSI 中间层错误处理",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "scsi"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "e016fbca74d9aac45af83e3201fbb0c3c5fb702ee492e7d8ae146d604df639d0",
  "generatedHash": "54ba03699ec0f1bb83f811defd31059eda1a9e0b572dd13b8ef970ebd06c4c57",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "本文档描述了SCSI中间层（mid layer）的错误处理基础架构。 关于SCSI中间层的更多信息，请参阅： Documentation/scsi/scsi_mid_low_api.rst。 每个SCSI命令都由struct scsi_cmnd（简称scmd）结构体 表示。scmd包含两个list_head类型的链表节点：scmd->list 与scmd->",
  "l1": "本文档描述了SCSI中间层（mid layer）的错误处理基础架构。 关于SCSI中间层的更多信息，请参阅： Documentation/scsi/scsi_mid_low_api.rst。 每个SCSI命令都由struct scsi_cmnd（简称scmd）结构体 表示。scmd包含两个list_head类型的链表节点：scmd->list 与scmd->eh_entry。其中scmd->list是用于空闲链表或设备 专属的scmd分配链表，与错误处理讨论关联不大。而 scmd->eh_entry则是专用于命令完成和错误处理链表，除非 特别说明，本文讨论中所有scmd的链表操作均通过 scmd->eh_entry实现。 底层设备驱动（LLDD）在获取SCSI命令（scmd）后，存在两种 完成路径：底层驱动可通过调用hostt->queuecommand()时从 中间层传递的scsi_do",
  "questions": [
    "Linux 内核：SCSI 中间层错误处理的原理是什么？",
    "Linux 内核：SCSI 中间层错误处理有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-scsi-scsi-eh",
      "url": "https://docs.kernel.org/translations/zh_CN/scsi/scsi_eh.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：SCSI 中间层错误处理

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## SCSI 中间层错误处理

本文档描述了SCSI中间层（mid layer）的错误处理基础架构。
关于SCSI中间层的更多信息，请参阅：
Documentation/scsi/scsi\_mid\_low\_api.rst。

### 1. SCSI命令在中间层及错误处理中的传递流程

#### 1.1 scsi\_cmnd结构体

每个SCSI命令都由struct scsi\_cmnd（简称scmd）结构体
表示。scmd包含两个list\_head类型的链表节点：scmd->list
与scmd->eh\_entry。其中scmd->list是用于空闲链表或设备
专属的scmd分配链表，与错误处理讨论关联不大。而
scmd->eh\_entry则是专用于命令完成和错误处理链表，除非
特别说明，本文讨论中所有scmd的链表操作均通过
scmd->eh\_entry实现。

#### 1.2 scmd是如何完成的？

底层设备驱动（LLDD）在获取SCSI命令（scmd）后，存在两种
完成路径：底层驱动可通过调用hostt->queuecommand()时从
中间层传递的scsi\_done回调函数主动完成命令，或者当命令未
及时完成时由块层（block layer）触发超时处理机制。

##### 1.2.1 通过scsi\_done回调完成SCSI命令

对于所有非错误处理（EH）命令，scsi\_done()是其完成回调
函数。它只调用blk\_mq\_complete\_request()来删除块层的
定时器并触发块设备软中断（BLOCK\_SOFTIRQ）。

BLOCK\_SOFTIRQ会间接调用scsi\_complete()，进而调用
scsi\_decide\_disposition()来决定如何处理该命令。
scsi\_decide\_disposition()会查看scmd->result值和感
应码数据来决定如何处理命令。

> - SUCCESS
>
>   > 调用scsi\_finish\_command()来处理该命令。该函数会
>   > 执行一些维护操作，然后调用scsi\_io\_completion()来
>   > 完成I/O操作。scsi\_io\_completion()会通过调用
>   > blk\_end\_request及其相关函数来通知块层该请求已完成，
>   > 如果发生错误，还会判断如何处理剩余的数据。
> - NEEDS\_RETRY
> - ADD\_TO\_MLQUEUE
>
>   > scmd被重新加入到块设备队列中。
> - otherwise
>
>   > 调用scsi\_eh\_scmd\_add(scmd)来处理该命令。
>   > 关于此函数的详细信息，请参见 [1-3]。

##### 1.2.2 scmd超时完成机制

SCSI命令超时处理机制由scsi\_timeout()函数实现。
当发生超时事件时，该函数

> 1. 首先调用可选的hostt->eh\_timed\_out()回调函数。
>    返回值可能是以下3种情况之一：
>
>    > - SCSI\_EH\_RESET\_TIMER
>    >   :   表示需要延长命令执行时间并重启计时器。
>    > - SCSI\_EH\_NOT\_HANDLED
>    >   :   表示eh\_timed\_out()未处理该命令。
>    >       此时将执行第2步的处理流程。
>    > - SCSI\_EH\_DONE
>    >   :   表示eh\_timed\_out()已完成该命令。
> 2. 若未通过回调函数解决，系统将调用
>    scsi\_abort\_command()发起异步中止操作，该操作最多
>    可执行scmd->allowed + 1次。但存在三种例外情况会跳
>    过异步中止而直接进入第3步处理：当检测到
>    SCSI\_EH\_ABORT\_SCHEDULED标志位已置位（表明该命令先
>    前已被中止过一次且当前重试仍失败）、当重试次数已达上
>    限、或当错误处理时限已到期时。在这些情况下，系统将跳
>    过异步中止流程而直接执行第3步处理方案。
> 3. 最终未解决的命令会通过scsi\_eh\_scmd\_add(scmd)移交给
>    错误处理子系统，具体流程详见[1-4]章节说明。

#### 1.3 异步命令中止机制

当命令超时触发后，系统会通过scsi\_abort\_command()调度异
步中止操作。若中止操作执行成功，则根据重试次数决定后续处
理：若未达最大重试限制，命令将重新下发执行；若重试次数已
耗尽，则命令最终以DID\_TIME\_OUT状态终止。当中止操作失败
时，系统会调用scsi\_eh\_scmd\_add()将该命令移交错误处理子
系统，具体处理流程详见[1-4]。

#### 1.4 错误处理(EH)接管机制

SCSI命令通过scsi\_eh\_scmd\_add()函数进入错误处理流程，该函
数执行以下操作：

> 1. 将scmd->eh\_entry链接到shost->eh\_cmd\_q
> 2. 在shost->shost\_state中设置SHOST\_RECOVERY状态位
> 3. 递增shost->host\_failed失败计数器
> 4. 当检测到shost->host\_busy == shost->host\_failed
>    时（即所有进行中命令均已失败）立即唤醒SCSI错误处理
>    线程。

如上所述，当任一scmd被加入到shost->eh\_cmd\_q队列时，系统
会立即置位shost\_state中的SHOST\_RECOVERY状态标志位，该操
作将阻止块层向对应主机控制器下发任何新的SCSI命令。在此状
态下，主机控制器上所有正在处理的scmd最终会进入以下三种状
态之一：正常完成、失败后被移入到eh\_cmd\_q队列、或因超时被
添加到shost->eh\_cmd\_q队列。

如果所有的SCSI命令都已经完成或失败，系统中正在执行的命令
数量与失败命令数量相等（
即shost->host\_busy == shost->host\_failed），此时将唤
醒SCSI错误处理线程。SCSI错误处理线程一旦被唤醒，就可以确
保所有未完成命令均已标记为失败状态，并且已经被链接到
shost->eh\_cmd\_q队列中。

需要特别说明的是，这并不意味着底层处理流程完全静止。当底层
驱动以错误状态完成某个scmd时，底层驱动及其下层组件会立刻遗
忘该命令的所有关联状态。但对于超时命令，除非
hostt->eh\_timed\_out()回调函数已经明确通知底层驱动丢弃该
命令（当前所有底层驱动均未实现此功能），否则从底层驱动视角
看该命令仍处于活跃状态，理论上仍可能在某时刻完成。当然，由
于超时计时器早已触发，所有此类延迟完成都将被系统直接忽略。

我们将在后续章节详细讨论关于SCSI错误处理如何执行中止操作（
即强制底层驱动丢弃已超时SCSI命令）。

### 2. SCSI错误处理机制详解

SCSI底层驱动可以通过以下两种方式之一来实现SCSI错误处理。

> - 细粒度的错误处理回调机制
>   :   底层驱动可选择实现细粒度的错误处理回调函数，由SCSI中间层
>       主导错误恢复流程并自动调用对应的回调函数。此实现模式的详
>       细设计规范在[2-1]节中展开讨论。
> - eh\_strategy\_handler()回调函数
>   :   该回调函数作为统一的错误处理入口，需要完整实现所有的恢复
>       操作。具体而言，它必须涵盖SCSI中间层在常规恢复过程中执行
>       的全部处理流程，相关实现将在[2-2]节中详细描述。

当错误恢复流程完成后，SCSI错误处理系统通过调用
scsi\_restart\_operations()函数恢复正常运行，该函数按顺序执行
以下操作：

> 1. 验证是否需要执行驱动器安全门锁定机制
> 2. 清除shost\_state中的SHOST\_RECOVERY状态标志位
> 3. 唤醒所有在shost->host\_wait上等待的任务。如果有人调用了
>    scsi\_block\_when\_processing\_errors()则会发生这种情况。
>    （疑问：由于错误处理期间块层队列已被阻塞，为何仍需显式
>    唤醒？）
> 4. 强制激活该主机控制器下所有设备的I/O队列

#### 2.1 基于细粒度回调的错误处理机制

##### 2.1.1 概述

如果不存在eh\_strategy\_handler()，SCSI中间层将负责驱动的
错误处理。错误处理（EH）的目标有两个：一是让底层驱动程序、
主机和设备不再维护已超时的SCSI命令（scmd）；二是使他们准备
好接收新命令。当一个SCSI命令（scmd）被底层遗忘且底层已准备
好再次处理或拒绝该命令时，即可认为该scmd已恢复。

为实现这些目标，错误处理（EH）会逐步执行严重性递增的恢复
操作。部分操作通过下发SCSI命令完成，而其他操作则通过调用
以下细粒度的错误处理回调函数实现。这些回调函数可以省略，
若被省略则默认始终视为执行失败。

```
int (* eh_abort_handler)(struct scsi_cmnd *);
int (* eh_device_reset_handler)(struct scsi_cmnd *);
int (* eh_bus_reset_handler)(struct scsi_cmnd *);
int (* eh_host_reset_handler)(struct scsi_cmnd *);
```

只有在低级别的错误恢复操作无法恢复部分失败的SCSI命令
（scmd）时，才会采取更高级别的恢复操作。如果最高级别的错误
处理失败，就意味着整个错误恢复（EH）过程失败，所有未能恢复
的设备被强制下线。

在恢复过程中，需遵循以下规则：

> - 错误恢复操作针对待处理列表eh\_work\_q中的失败的scmds执
>   行。如果某个恢复操作成功恢复了一个scmd，那么该scmd会
>   从eh\_work\_q链表中移除。
>
>   需要注意的是，对某个scmd执行的单个恢复操作可能会恢复
>   多个scmd。例如，对某个设备执行复位操作可能会恢复该设
>   备上所有失败的scmd。
> - 仅当低级别的恢复操作完成且eh\_work\_q仍然非空时，才会
>   触发更高级别的操作
> - SCSI错误恢复机制会重用失败的scmd来发送恢复命令。对于
>   超时的scmd，SCSI错误处理机制会确保底层驱动在重用scmd
>   前已不再维护该命令。

当一个SCSI命令（scmd）被成功恢复后，错误处理逻辑会通过
scsi\_eh\_finish\_cmd()将其从待处理队列（eh\_work\_q）移
至错误处理的本地完成队列（eh\_done\_q）。当所有scmd均恢
复完成（即eh\_work\_q为空时），错误处理逻辑会调用
scsi\_eh\_flush\_done\_q()对这些已恢复的scmd进行处理，即
重新尝试或错误总终止（向上层通知失败）。

SCSI命令仅在满足以下全部条件时才会被重试：对应的SCSI设
备仍处于在线状态，未设置REQ\_FAILFAST标志或递增后的
scmd->retries值仍小于scmd->allowed。

##### 2.1.2 SCSI命令在错误处理过程中的流转路径

> 1. 错误完成/超时
>
>    处理:
>    :   调用scsi\_eh\_scmd\_add()处理scmd
>
>        - 将scmd添加到shost->eh\_cmd\_q
>        - 设置SHOST\_RECOVERY标记位
>        - shost->host\_failed++
>
>    锁要求:
>    :   shost->host\_lock
> 2. 启动错误处理（EH）
>
>    操作:
>    :   将所有scmd移动到EH本地eh\_work\_q队列，并
>        清空 shost->eh\_cmd\_q。
>
>    锁要求:
>    :   shost->host\_lock（非严格必需，仅为保持一致性）
> 3. scmd恢复
>
>    操作:
>    :   调用scsi\_eh\_finish\_cmd()完成scmd的EH
>
>        - 将scmd从本地eh\_work\_q队列移至本地eh\_done\_q队列
>
>    锁要求:
>    :   无
>
>    并发控制:
>    :   每个独立的eh\_work\_q至多一个线程，确保无锁
>        队列的访问
> 4. EH完成
>
>    操作:
>    :   调用scsi\_eh\_flush\_done\_q()重试scmd或通知上层处理
>        失败。此函数可以被并发调用，但每个独立的eh\_work\_q队
>        列至多一个线程，以确保无锁队列的访问。
>
>        > - 从eh\_done\_q队列中移除scmd，清除scmd->eh\_entry
>        > - 如果需要重试，调用scsi\_queue\_insert()重新入队scmd
>        > - 否则，调用scsi\_finish\_command()完成scmd
>        > - 将shost->host\_failed置为零
>
>    锁要求:
>    :   队列或完成函数会执行适当的加锁操作

##### 2.1.3 控制流

> 通过细粒度回调机制执行的SCSI错误处理（EH）是从
> scsi\_unjam\_host()函数开始的

scsi\_unjam\_host

> 1. 持有shost->host\_lock锁，将shost->eh\_cmd\_q中的命令移动
>    到本地的eh\_work\_q队里中，并释放host\_lock锁。注意，这一步
>    会清空shost->eh\_cmd\_q。
> 2. 调用scsi\_eh\_get\_sense函数。
>
> scsi\_eh\_get\_sense
>
> > 该操作针对没有有效感知数据的错误完成命令。大部分SCSI传输协议
> > 或底层驱动在命令失败时会自动获取感知数据（自动感知）。出于性
> > 能原因，建议使用自动感知，推荐使用自动感知机制，因为它不仅有
> > 助于提升性能，还能避免从发生CHECK CONDITION到执行本操作之间，
> > 感知信息出现不同步的问题。
> >
> > 注意，如果不支持自动感知，那么在使用scsi\_done()以错误状态完成
> > scmd 时，scmd->sense\_buffer将包含无效感知数据。在这种情况下，
> > scsi\_decide\_disposition()总是返回FAILED从而触发SCSI错误处理
> > （EH）。当该scmd执行到这里时，会重新获取感知数据，并再次调用
> > scsi\_decide\_disposition()进行处理。
> >
> > 1. 调用scsi\_request\_sense()发送REQUEST\_SENSE命令。如果失败，
> >    则不采取任何操作。请注意，不采取任何操作会导致对该scmd执行
> >    更高级别的恢复操作。
> > 2. 调用scsi\_decide\_disposition()处理scmd
> >
> >    > - SUCCESS
> >    >   :   scmd->retries被设置为scmd->allowed以防止
> >    >       scsi\_eh\_flush\_done\_q()重试该scmd，并调用
> >    >       scsi\_eh\_finish\_cmd()。
> >    > - NEEDS\_RETRY
> >    >   :   调用scsi\_eh\_finish\_cmd()
> >    > - 其他情况
> >    >   :   无操作。
>
> 4. 如果!list\_empty(&eh\_work\_q)，则调用scsi\_eh\_ready\_devs()。
>
> scsi\_eh\_ready\_devs
>
> > 该函数采取四种逐步增强的措施，使失败的设备准备好处理新的命令。
> >
> > 1. 调用scsi\_eh\_stu()
> >
> > scsi\_eh\_stu
> >
> > > 对于每个具有有效感知数据且scsi\_check\_sense()判断为失败的
> > > scmd发送START STOP UNIT（STU）命令且将start置1。注意，由
> > > 于我们明确选择错误完成的scmd，可以确定底层驱动已不再维护该
> > > scmd，我们可以重用它进行STU。
> > >
> > > 如果STU操作成功且sdev处于离线或就绪状态，所有在sdev上失败的
> > > scmd都会通过scsi\_eh\_finish\_cmd()完成。
> > >
> > > *注意* 如果hostt->eh\_abort\_handler()未实现或返回失败，可能
> > > 此时仍有超时的scmd，此时STU不会导致底层驱动不再维护scmd。但
> > > 是，如果STU执行成功，该函数会通过scsi\_eh\_finish\_cmd()来完成
> > > sdev上的所有scmd，这会导致底层驱动处于不一致的状态。看来STU
> > > 操作应仅在sdev不包含超时scmd时进行。
> >
> > 2. 如果!list\_empty(&eh\_work\_q)，调用scsi\_eh\_bus\_device\_reset()。
> >
> > scsi\_eh\_bus\_device\_reset
> >
> > > 此操作与scsi\_eh\_stu()非常相似，区别在于使用
> > > hostt->eh\_device\_reset\_handler()替代STU命令。此外，由于我们
> > > 没有发送SCSI命令且重置会清空该sdev上所有的scmd，所以无需筛选错
> > > 误完成的scmd。
> >
> > 3. 如果!list\_empty(&eh\_work\_q)，调用scsi\_eh\_bus\_reset()。
> >
> > scsi\_eh\_bus\_reset
> >
> > > 对于每个包含失败scmd的SCSI通道调用
> > > hostt->eh\_bus\_reset\_handler()。如果总线重置成功，那么该通道上
> > > 所有准备就绪或离线状态sdev上的失败scmd都会被处理处理完成。
> >
> > 4. 如果!list\_empty(&eh\_work\_q)，调用scsi\_eh\_host\_reset()。
> >
> > scsi\_eh\_host\_reset
> >
> > > 调用hostt->eh\_host\_reset\_handler()是最终的手段。如果SCSI主机
> > > 重置成功，主机上所有就绪或离线sdev上的失败scmd都会通过错误处理
> > > 完成。
> >
> > 5. 如果!list\_empty(&eh\_work\_q)，调用scsi\_eh\_offline\_sdevs()。
> >
> > scsi\_eh\_offline\_sdevs
> >
> > > 离线所有包含未恢复scmd的所有sdev，并通过
> > > scsi\_eh\_finish\_cmd()完成这些scmd。
>
> 5. 调用scsi\_eh\_flush\_done\_q()。
>
>    > scsi\_eh\_flush\_done\_q
>    >
>    > > 此时所有的scmd都已经恢复（或放弃），并通过
>    > > scsi\_eh\_finish\_cmd()函数加入eh\_done\_q队列。该函数通过
>    > > 重试或显示通知上层scmd的失败来刷新eh\_done\_q。

#### 2.2 基于transportt->eh\_strategy\_handler()的错误处理机制

在该机制中，transportt->eh\_strategy\_handler()替代
scsi\_unjam\_host()的被调用，并负责整个错误恢复过程。该处理
函数完成后应该确保底层驱动不再维护任何失败的scmd并且将设备
设置为就绪（准备接收新命令）或离线状态。此外，该函数还应该
执行SCSI错误处理的维护任务，以维护SCSI中间层的数据完整性。
换句话说，eh\_strategy\_handler()必须实现[2-1-2]中除第1步
外的所有步骤。

##### 2.2.1 transportt->eh\_strategy\_handler()调用前的SCSI中间层状态

> 进入该处理函数时，以下条件成立。
>
> - 每个失败的scmd的eh\_flags字段已正确设置。
> - 每个失败的scmd通过scmd->eh\_entry链接到scmd->eh\_cmd\_q队列。
> - 已设置SHOST\_RECOVERY标志。
> - shost->host\_failed == shost->host\_busy。

##### 2.2.2 transportt->eh\_strategy\_handler()调用后的SCSI中间层状态

> 从该处理函数退出时，以下条件成立。
>
> - shost->host\_failed为零。
> - shost->eh\_cmd\_q被清空。
> - 每个scmd->eh\_entry被清空。
> - 对每个scmd必须调用scsi\_queue\_insert()或scsi\_finish\_command()。
>   注意，该处理程序可以使用scmd->retries（剩余重试次数）和
>   scmd->allowed（允许重试次数）限制重试次数。

##### 2.2.3 注意事项

> - 需明确已超时的scmd在底层仍处于活跃状态，因此在操作这些
>   scmd前，必须确保底层已彻底不再维护。
> - 访问或修改shost数据结构时，必须持有shost->host\_lock锁
>   以维持数据一致性。
> - 错误处理完成后，每个故障设备必须彻底清除所有活跃SCSI命
>   令（scmd）的关联状态。
> - 错误处理完成后，每个故障设备必须被设置为就绪（准备接收
>   新命令）或离线状态。

Tejun Heo
[htejun@gmail.com](mailto:htejun@gmail.com)

11th September 2005

## 来源、版本与核验

- 来源：[SCSI 中间层错误处理](https://docs.kernel.org/translations/zh_CN/scsi/scsi_eh.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/scsi/scsi_eh.rst`。
