---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-arch-arm64-amu",
  "title": "Linux 内核：AArch64 Linux 中扩展的活动监控单元",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "arch"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ab3173bd52d56a5cd86b0eb73efc54e331b20c596bcf9435692f26385b81f2c0",
  "generatedHash": "4968f12ca2cbf7aa375b9b2037cc907f15dcdfb059de1b012e4e88fd6a095351",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "本文档简要描述了 AArch64 Linux 支持的活动监控单元的规范。 活动监控是 ARMv8.4 CPU 架构引入的一个可选扩展特性。 活动监控单元(在每个 CPU 中实现)为系统管理提供了性能计数器。既可以通 过系统寄存器的方式访问计数器，同时也支持外部内存映射的方式访问计数器。 AMUv1 架构实现了一个由4个固定的64位事件计数器组成的计数器组。 ",
  "l1": "本文档简要描述了 AArch64 Linux 支持的活动监控单元的规范。 活动监控是 ARMv8.4 CPU 架构引入的一个可选扩展特性。 活动监控单元(在每个 CPU 中实现)为系统管理提供了性能计数器。既可以通 过系统寄存器的方式访问计数器，同时也支持外部内存映射的方式访问计数器。 AMUv1 架构实现了一个由4个固定的64位事件计数器组成的计数器组。 - CPU 周期计数器：同 CPU 的频率增长 - 常量计数器：同固定的系统时钟频率增长 - 淘汰指令计数器: 同每次架构指令执行增长 - 内存停顿周期计数器：计算由在时钟域内的最后一级缓存中未命中而引起 的指令调度停顿周期数 当处于 WFI 或者 WFE 状态时，计数器不会增长。 AMU 架构提供了一个高达16位的事件计数器空间，未来新的 AMU 版本中可能 用它来实现新增的事件计数器。 另外，AMUv1 实现了一个多达16个64位辅",
  "questions": [
    "Linux 内核：AArch64 Linux 中扩展的活动监控单元的原理是什么？",
    "Linux 内核：AArch64 Linux 中扩展的活动监控单元有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-arch-arm64-amu",
      "url": "https://docs.kernel.org/translations/zh_CN/arch/arm64/amu.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：AArch64 Linux 中扩展的活动监控单元

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

Translator: Bailu Lin <[bailu.lin@vivo.com](mailto:bailu.lin@vivo.com)>

## AArch64 Linux 中扩展的活动监控单元

作者: Ionela Voinescu <[ionela.voinescu@arm.com](mailto:ionela.voinescu@arm.com)>

日期: 2019-09-10

本文档简要描述了 AArch64 Linux 支持的活动监控单元的规范。

### 架构总述

活动监控是 ARMv8.4 CPU 架构引入的一个可选扩展特性。

活动监控单元(在每个 CPU 中实现)为系统管理提供了性能计数器。既可以通
过系统寄存器的方式访问计数器，同时也支持外部内存映射的方式访问计数器。

AMUv1 架构实现了一个由4个固定的64位事件计数器组成的计数器组。

> - CPU 周期计数器：同 CPU 的频率增长
> - 常量计数器：同固定的系统时钟频率增长
> - 淘汰指令计数器: 同每次架构指令执行增长
> - 内存停顿周期计数器：计算由在时钟域内的最后一级缓存中未命中而引起
>   的指令调度停顿周期数

当处于 WFI 或者 WFE 状态时，计数器不会增长。

AMU 架构提供了一个高达16位的事件计数器空间，未来新的 AMU 版本中可能
用它来实现新增的事件计数器。

另外，AMUv1 实现了一个多达16个64位辅助事件计数器的计数器组。

冷复位时所有的计数器会清零。

### 基本支持

内核可以安全地运行在支持 AMU 和不支持 AMU 的 CPU 组合中。
因此，当配置 CONFIG\_ARM64\_AMU\_EXTN 后我们无条件使能后续
(secondary or hotplugged) CPU 检测和使用这个特性。

当在 CPU 上检测到该特性时，我们会标记为特性可用但是不能保证计数器的功能，
仅表明有扩展属性。

固件(代码运行在高异常级别，例如 arm-tf )需支持以下功能：

> - 提供低异常级别(EL2 和 EL1)访问 AMU 寄存器的能力。
> - 使能计数器。如果未使能，它的值应为 0。
> - 在从电源关闭状态启动 CPU 前或后保存或者恢复计数器。

当使用使能了该特性的内核启动但固件损坏时，访问计数器寄存器可能会遭遇
panic 或者死锁。即使未发现这些症状，计数器寄存器返回的数据结果并不一
定能反映真实情况。通常，计数器会返回 0，表明他们未被使能。

如果固件没有提供适当的支持最好关闭 CONFIG\_ARM64\_AMU\_EXTN。
值得注意的是，出于安全原因，不要绕过 AMUSERRENR\_EL0 设置而捕获从
EL0(用户空间) 访问 EL1(内核空间)。 因此，固件应该确保访问 AMU寄存器
不会困在 EL2或EL3。

AMUv1 的固定计数器可以通过如下系统寄存器访问：

> - SYS\_AMEVCNTR0\_CORE\_EL0
> - SYS\_AMEVCNTR0\_CONST\_EL0
> - SYS\_AMEVCNTR0\_INST\_RET\_EL0
> - SYS\_AMEVCNTR0\_MEM\_STALL\_EL0

特定辅助计数器可以通过 SYS\_AMEVCNTR1\_EL0(n) 访问，其中n介于0到15。

详细信息定义在目录：arch/arm64/include/asm/sysreg.h。

### 用户空间访问

由于以下原因，当前禁止从用户空间访问 AMU 的寄存器：

> - 安全因数：可能会暴露处于安全模式执行的代码信息。
> - 意愿：AMU 是用于系统管理的。

同样，该功能对用户空间不可见。

### 虚拟化

由于以下原因，当前禁止从 KVM 客户端的用户空间(EL0)和内核空间(EL1)
访问 AMU 的寄存器：

> - 安全因数：可能会暴露给其他客户端或主机端执行的代码信息。

任何试图访问 AMU 寄存器的行为都会触发一个注册在客户端的未定义异常。

## 来源、版本与核验

- 来源：[AArch64 Linux 中扩展的活动监控单元](https://docs.kernel.org/translations/zh_CN/arch/arm64/amu.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/arch/arm64/amu.rst`。
