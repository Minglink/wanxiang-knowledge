---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-arch-loongarch-irq-chip-model",
  "title": "Linux 内核：LoongArch的IRQ芯片模型（层级关系）",
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
  "snapshotHash": "44938cc0f451dfd520b41609d11908a0b4145d3ad8d96d87b14f11775812c74a",
  "generatedHash": "8419de55d9098cf6be136bc9ccf751e9947b8b6e348579ec6532c1fc97ca450c",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "目前，基于LoongArch的处理器（如龙芯3A5000）只能与LS7A芯片组配合工作。LoongArch计算机 中的中断控制器（即IRQ芯片）包括CPUINTC（CPU Core Interrupt Controller）、LIOINTC（ Legacy I/O Interrupt Controller）、EIOINTC（Extended I/O Inte",
  "l1": "目前，基于LoongArch的处理器（如龙芯3A5000）只能与LS7A芯片组配合工作。LoongArch计算机 中的中断控制器（即IRQ芯片）包括CPUINTC（CPU Core Interrupt Controller）、LIOINTC（ Legacy I/O Interrupt Controller）、EIOINTC（Extended I/O Interrupt Controller）、 HTVECINTC（Hyper-Transport Vector Interrupt Controller）、PCH-PIC（LS7A芯片组的主中 断控制器）、PCH-LPC（LS7A芯片组的LPC中断控制器）和PCH-MSI（MSI中断控制器）。 CPUINTC是一种CPU内部的每个核本地的中断控制器，LIOINTC/EIOINTC/HTVECINTC是CPU内部的 全局中断控制器（每个芯片一个，",
  "questions": [
    "Linux 内核：LoongArch的IRQ芯片模型（层级关系）的原理是什么？",
    "Linux 内核：LoongArch的IRQ芯片模型（层级关系）有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-arch-loongarch-irq-chip-model",
      "url": "https://docs.kernel.org/translations/zh_CN/arch/loongarch/irq-chip-model.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：LoongArch的IRQ芯片模型（层级关系）

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## LoongArch的IRQ芯片模型（层级关系）

目前，基于LoongArch的处理器（如龙芯3A5000）只能与LS7A芯片组配合工作。LoongArch计算机
中的中断控制器（即IRQ芯片）包括CPUINTC（CPU Core Interrupt Controller）、LIOINTC（
Legacy I/O Interrupt Controller）、EIOINTC（Extended I/O Interrupt Controller）、
HTVECINTC（Hyper-Transport Vector Interrupt Controller）、PCH-PIC（LS7A芯片组的主中
断控制器）、PCH-LPC（LS7A芯片组的LPC中断控制器）和PCH-MSI（MSI中断控制器）。

CPUINTC是一种CPU内部的每个核本地的中断控制器，LIOINTC/EIOINTC/HTVECINTC是CPU内部的
全局中断控制器（每个芯片一个，所有核共享），而PCH-PIC/PCH-LPC/PCH-MSI是CPU外部的中
断控制器（在配套芯片组里面）。这些中断控制器（或者说IRQ芯片）以一种层次树的组织形式
级联在一起，一共有两种层级关系模型（传统IRQ模型和扩展IRQ模型）。

### 传统IRQ模型

在这种模型里面，IPI（Inter-Processor Interrupt）和CPU本地时钟中断直接发送到CPUINTC，
CPU串口（UARTs）中断发送到LIOINTC，而其他所有设备的中断则分别发送到所连接的PCH-PIC/
PCH-LPC/PCH-MSI，然后被HTVECINTC统一收集，再发送到LIOINTC，最后到达CPUINTC:

```
+-----+     +---------+     +-------+
| IPI | --> | CPUINTC | <-- | Timer |
+-----+     +---------+     +-------+
                 ^
                 |
            +---------+     +-------+
            | LIOINTC | <-- | UARTs |
            +---------+     +-------+
                 ^
                 |
           +-----------+
           | HTVECINTC |
           +-----------+
            ^         ^
            |         |
      +---------+ +---------+
      | PCH-PIC | | PCH-MSI |
      +---------+ +---------+
        ^     ^           ^
        |     |           |
+---------+ +---------+ +---------+
| PCH-LPC | | Devices | | Devices |
+---------+ +---------+ +---------+
     ^
     |
+---------+
| Devices |
+---------+
```

### 扩展IRQ模型

在这种模型里面，IPI（Inter-Processor Interrupt）和CPU本地时钟中断直接发送到CPUINTC，
CPU串口（UARTs）中断发送到LIOINTC，而其他所有设备的中断则分别发送到所连接的PCH-PIC/
PCH-LPC/PCH-MSI，然后被EIOINTC统一收集，再直接到达CPUINTC:

```
      +-----+     +---------+     +-------+
      | IPI | --> | CPUINTC | <-- | Timer |
      +-----+     +---------+     +-------+
                   ^       ^
                   |       |
            +---------+ +---------+     +-------+
            | EIOINTC | | LIOINTC | <-- | UARTs |
            +---------+ +---------+     +-------+
             ^       ^
             |       |
      +---------+ +---------+
      | PCH-PIC | | PCH-MSI |
      +---------+ +---------+
        ^     ^           ^
        |     |           |
+---------+ +---------+ +---------+
| PCH-LPC | | Devices | | Devices |
+---------+ +---------+ +---------+
     ^
     |
+---------+
| Devices |
+---------+
```

### 虚拟扩展IRQ模型

在这种模型里面, IPI(Inter-Processor Interrupt) 和CPU本地时钟中断直接发送到CPUINTC,
CPU串口 (UARTs) 中断发送到PCH-PIC, 而其他所有设备的中断则分别发送到所连接的PCH\_PIC/
PCH-MSI, 然后V-EIOINTC统一收集，再直接到达CPUINTC:

```
+-----+    +-------------------+     +-------+
| IPI |--> | CPUINTC(0-255vcpu)| <-- | Timer |
+-----+    +-------------------+     +-------+
                     ^
                     |
               +-----------+
               | V-EIOINTC |
               +-----------+
                ^         ^
                |         |
         +---------+ +---------+
         | PCH-PIC | | PCH-MSI |
         +---------+ +---------+
           ^      ^          ^
           |      |          |
    +--------+ +---------+ +---------+
    | UARTs  | | Devices | | Devices |
    +--------+ +---------+ +---------+
```

V-EIOINTC 是EIOINTC的扩展, 仅工作在虚拟机模式下, 中断经EIOINTC最多可个路由到
４个虚拟CPU. 但中断经V-EIOINTC最多可个路由到256个虚拟CPU.

传统的EIOINTC中断控制器，中断路由分为两个部分：8比特用于控制路由到哪个CPU，
4比特用于控制路由到特定CPU的哪个中断管脚。控制CPU路由的8比特前4比特用于控制
路由到哪个EIOINTC节点，后4比特用于控制此节点哪个CPU。中断路由在选择CPU路由
和CPU中断管脚路由时，使用bitmap编码方式而不是正常编码方式，所以对于一个
EIOINTC中断控制器节点，中断只能路由到CPU0 - CPU3，中断管脚IP0-IP3。

V-EIOINTC新增了两个寄存器，支持中断路由到更多CPU个和中断管脚。

#### V-EIOINTC功能寄存器

功能寄存器是只读寄存器，用于显示V-EIOINTC支持的特性，目前两个支持两个特性
EXTIOI\_HAS\_INT\_ENCODE 和 EXTIOI\_HAS\_CPU\_ENCODE。

特性EXTIOI\_HAS\_INT\_ENCODE是传统EIOINTC中断控制器的一个特性，如果此比特为1，
显示CPU中断管脚路由方式支持正常编码，而不是bitmap编码，所以中断可以路由到
管脚IP0 - IP15。

特性EXTIOI\_HAS\_CPU\_ENCODE是V-EIOINTC新增特性，如果此比特为1，表示CPU路由
方式支持正常编码，而不是bitmap编码，所以中断可以路由到CPU0 - CPU255。

#### V-EIOINTC配置寄存器

配置寄存器是可读写寄存器，为了兼容性考虑，如果不写此寄存器，中断路由采用
和传统EIOINTC相同的路由设置。如果对应比特设置为1，表示采用正常路由方式而
不是bitmap编码的路由方式。

### 高级扩展IRQ模型

在这种模型里面，IPI（Inter-Processor Interrupt）和CPU本地时钟中断直接发送到CPUINTC，
CPU串口（UARTs）中断发送到LIOINTC，PCH-MSI中断发送到AVECINTC，而后通过AVECINTC直接
送达CPUINTC，而其他所有设备的中断则分别发送到所连接的PCH-PIC/PCH-LPC，然后由EIOINTC
统一收集，再直接到达CPUINTC:

```
+-----+     +-----------------------+     +-------+
| IPI | --> |        CPUINTC        | <-- | Timer |
+-----+     +-----------------------+     +-------+
             ^          ^          ^
             |          |          |
      +---------+ +----------+ +---------+     +-------+
      | EIOINTC | | AVECINTC | | LIOINTC | <-- | UARTs |
      +---------+ +----------+ +---------+     +-------+
           ^            ^
           |            |
      +---------+  +---------+
      | PCH-PIC |  | PCH-MSI |
      +---------+  +---------+
        ^     ^           ^
        |     |           |
+---------+ +---------+ +---------+
| Devices | | PCH-LPC | | Devices |
+---------+ +---------+ +---------+
                 ^
                 |
            +---------+
            | Devices |
            +---------+
```

### 高级扩展IRQ模型 (带重定向)

在这种模型里面，IPI（Inter-Processor Interrupt）和CPU本地时钟中断直接发送到CPUINTC，
CPU串口（UARTs）中断发送到LIOINTC，PCH-MSI中断首先发送到REDIRECT模块,完成重定向后发
送到AVECINTC，而后通过AVECINTC直接送达CPUINTC，而其他所有设备的中断则分别发送到所连
接的PCH-PIC/PCH-LPC，然后由EIOINTC统一收集，再直接到达CPUINTC:

```
+-----+     +-----------------------+     +-------+
| IPI | --> |        CPUINTC        | <-- | Timer |
+-----+     +-----------------------+     +-------+
             ^          ^          ^
             |          |          |
             |    +----------+     |
      +---------+ | AVECINTC | +---------+     +-------+
      | EIOINTC | +----------+ | LIOINTC | <-- | UARTs |
      +---------+ | REDIRECT | +---------+     +-------+
           ^      +----------+
           |            ^
           |            |
      +---------+  +---------+
      | PCH-PIC |  | PCH-MSI |
      +---------+  +---------+
        ^     ^           ^
        |     |           |
+---------+ +---------+ +---------+
| Devices | | PCH-LPC | | Devices |
+---------+ +---------+ +---------+
                 ^
                 |
            +---------+
            | Devices |
            +---------+
```

### ACPI相关的定义

CPUINTC:

```
ACPI_MADT_TYPE_CORE_PIC;
struct acpi_madt_core_pic;
enum acpi_madt_core_pic_version;
```

LIOINTC:

```
ACPI_MADT_TYPE_LIO_PIC;
struct acpi_madt_lio_pic;
enum acpi_madt_lio_pic_version;
```

EIOINTC:

```
ACPI_MADT_TYPE_EIO_PIC;
struct acpi_madt_eio_pic;
enum acpi_madt_eio_pic_version;
```

HTVECINTC:

```
ACPI_MADT_TYPE_HT_PIC;
struct acpi_madt_ht_pic;
enum acpi_madt_ht_pic_version;
```

PCH-PIC:

```
ACPI_MADT_TYPE_BIO_PIC;
struct acpi_madt_bio_pic;
enum acpi_madt_bio_pic_version;
```

PCH-MSI:

```
ACPI_MADT_TYPE_MSI_PIC;
struct acpi_madt_msi_pic;
enum acpi_madt_msi_pic_version;
```

PCH-LPC:

```
ACPI_MADT_TYPE_LPC_PIC;
struct acpi_madt_lpc_pic;
enum acpi_madt_lpc_pic_version;
```

### 参考文献

龙芯3A5000的文档：

> <https://github.com/loongson/LoongArch-Documentation/releases/latest/download/Loongson-3A5000-usermanual-1.02-CN.pdf> (中文版)
>
> <https://github.com/loongson/LoongArch-Documentation/releases/latest/download/Loongson-3A5000-usermanual-1.02-EN.pdf> (英文版)

龙芯LS7A芯片组的文档：

> <https://github.com/loongson/LoongArch-Documentation/releases/latest/download/Loongson-7A1000-usermanual-2.00-CN.pdf> (中文版)
>
> <https://github.com/loongson/LoongArch-Documentation/releases/latest/download/Loongson-7A1000-usermanual-2.00-EN.pdf> (英文版)

Note

- CPUINTC：即《龙芯架构参考手册卷一》第7.4节所描述的CSR.ECFG/CSR.ESTAT寄存器及其
  中断控制逻辑；
- LIOINTC：即《龙芯3A5000处理器使用手册》第11.1节所描述的“传统I/O中断”；
- EIOINTC：即《龙芯3A5000处理器使用手册》第11.2节所描述的“扩展I/O中断”；
- HTVECINTC：即《龙芯3A5000处理器使用手册》第14.3节所描述的“HyperTransport中断”；
- PCH-PIC/PCH-MSI：即《龙芯7A1000桥片用户手册》第5章所描述的“中断控制器”；
- PCH-LPC：即《龙芯7A1000桥片用户手册》第24.3节所描述的“LPC中断”。

## 来源、版本与核验

- 来源：[LoongArch的IRQ芯片模型（层级关系）](https://docs.kernel.org/translations/zh_CN/arch/loongarch/irq-chip-model.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/arch/loongarch/irq-chip-model.rst`。
