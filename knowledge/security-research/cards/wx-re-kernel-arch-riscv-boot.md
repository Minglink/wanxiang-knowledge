---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-arch-riscv-boot",
  "title": "Linux 内核：RISC-V内核启动要求和限制",
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
  "snapshotHash": "766ff8fad020eba2b624868f9e46bacdea54df875ee513e9aa2213589b7a8a98",
  "generatedHash": "2554adbdf4ce66ea2e2328cd56090318614e489a2121090df60ddbb5aa291a72",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "这份文档描述了RISC-V内核对引导加载程序和固件的期望，以及任何开发者在接触 早期启动过程时必须牢记的约束。在这份文档中， 早期启动过程 指的是在最 终虚拟映射设置之前运行的任何代码。 RISC-V内核对引导加载程序和平台固件有以下要求： - $a0 应包含当前核心的hartid。 - $a1 应包含内存中设备树的地址。 RISC-V内核在直接映射中不能映",
  "l1": "这份文档描述了RISC-V内核对引导加载程序和固件的期望，以及任何开发者在接触 早期启动过程时必须牢记的约束。在这份文档中， 早期启动过程 指的是在最 终虚拟映射设置之前运行的任何代码。 RISC-V内核对引导加载程序和平台固件有以下要求： - $a0 应包含当前核心的hartid。 - $a1 应包含内存中设备树的地址。 RISC-V内核在直接映射中不能映射任何常驻内存或用PMPs保护的内存， 因此固件必须根据设备树规范 和/或 UEFI规范正确标记这些区域。 RISC-V内核期望被放置在PMD边界（对于rv64为2MB对齐，对于rv32为4MB对齐）。 请注意，如果不是这样，EFI stub 将重定位内核。 固件可以将设备树或ACPI表传递给RISC-V内核。 设备树可以直接从前一阶段通过$a1寄存器传递给内核，或者在使用UEFI启动时， 可以通过EFI配置表传递。 ACPI表通过EF",
  "questions": [
    "Linux 内核：RISC-V内核启动要求和限制的原理是什么？",
    "Linux 内核：RISC-V内核启动要求和限制有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-arch-riscv-boot",
      "url": "https://docs.kernel.org/translations/zh_CN/arch/riscv/boot.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：RISC-V内核启动要求和限制

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## RISC-V内核启动要求和限制

Author:
:   Alexandre Ghiti <[alexghiti@rivosinc.com](mailto:alexghiti@rivosinc.com)>

Date:
:   23 May 2023

这份文档描述了RISC-V内核对引导加载程序和固件的期望，以及任何开发者在接触
早期启动过程时必须牢记的约束。在这份文档中， 早期启动过程 指的是在最
终虚拟映射设置之前运行的任何代码。

### 内核预加载的要求和限制

RISC-V内核对引导加载程序和平台固件有以下要求：

#### 寄存器状态

RISC-V内核期望：

> - $a0 应包含当前核心的hartid。
> - $a1 应包含内存中设备树的地址。

#### CSR 寄存器状态

RISC-V内核期望：

> - $satp = 0： 如果存在MMU，必须将其禁用。

#### 为常驻固件保留的内存

RISC-V内核在直接映射中不能映射任何常驻内存或用PMPs保护的内存，
因此固件必须根据设备树规范 和/或 UEFI规范正确标记这些区域。

#### 内核的位置

RISC-V内核期望被放置在PMD边界（对于rv64为2MB对齐，对于rv32为4MB对齐）。
请注意，如果不是这样，EFI stub 将重定位内核。

#### 硬件描述

固件可以将设备树或ACPI表传递给RISC-V内核。

设备树可以直接从前一阶段通过$a1寄存器传递给内核，或者在使用UEFI启动时，
可以通过EFI配置表传递。

ACPI表通过EFI配置表传递给内核。在这种情况下，EFI stub 仍然会创建一个
小的设备树。请参阅下面的"EFI stub 和设备树"部分，了解这个设备树的详细
信息。

#### 内核入口

在SMP系统中，有两种方法可以进入内核：

- RISCV\_BOOT\_SPINWAIT：固件在内核中释放所有的hart，一个hart赢
  得抽奖并执行早期启动代码，而其他的hart则停在那里等待初始化完成。这种
  方法主要用于支持没有SBI HSM扩展和M模式RISC-V内核的旧固件。
- 有序启动：固件只释放一个将执行初始化阶段的hart，然后使用SBI HSM
  扩展启动所有其他的hart。有序启动方法是启动RISC-V内核的首选启动方法，
  因为它可以支持CPU热插拔和kexec。

#### UEFI

##### UEFI 内存映射

使用UEFI启动时，RISC-V内核将只使用EFI内存映射来填充系统内存。

UEFI固件必须解析 /reserved-memory 设备树节点的子节点，并遵守设备
树规范，将这些子节点的属性（ no-map 和 reusable ）转换为其正
确的EFI等价物（参见设备树规范v0.4-rc1的"3.5.4/reserved-memory和
UEFI"部分）。

##### RISCV\_EFI\_BOOT\_PROTOCOL

使用UEFI启动时，EFI stub 需要引导hartid以便将其传递给 $a1 中的
RISC-V内核。EFI stub使用以下方法之一获取引导hartid：

- RISCV\_EFI\_BOOT\_PROTOCOL （**首选**）。
- boot-hartid 设备树子节点（**已弃用**）。

任何新的固件都必须实现 RISCV\_EFI\_BOOT\_PROTOCOL，因为基于设备树
的方法现已被弃用。

### 早期启动的要求和约束

RISC-V内核的早期启动过程遵循以下约束：

#### EFI stub 和设备树

使用UEFI启动时，EFI stub 会用与arm64相同的参数补充（或创建）设备树，
这些参数在Documentation/arch/arm/uefi.rst中的
"UEFI kernel supporton ARM"段落中有描述。

#### 虚拟映射安装

在RISC-V内核中，虚拟映射的安装分为两步进行：

1. setup\_vm() 在 early\_pg\_dir 中安装一个临时的内核映射，这
   允许发现系统内存。 此时只有内核文本/数据被映射。在建立这个映射时，
   不能进行分配（因为系统内存还未知），所以``early\_pg\_dir``页表是静
   态分配的（每个级别只使用一个表）。
2. setup\_vm\_final() 在 swapper\_pg\_dir 中创建最终的内核映
   射，并利用发现的系统内存 创建线性映射。在建立这个映射时，内核可以
   分配内存，但不能直接访问它（因为直接映射还不存在），所以它使用fixmap
   区域的临时映射来访问新分配的页表级别。

为了让 virt\_to\_phys() 和 phys\_to\_virt() 能够正确地将直接
映射地址转换为物理地址，它们需要知道DRAM的起始位置。这发生在步骤1之后，
就在步骤2安装直接映射之前（参见arch/riscv/mm/init.c中的
setup\_bootmem() 函数）。在安装最终虚拟映射之前使用这些宏时必须
仔细检查。

#### 通过fixmap进行设备树映射

由于 reserved\_mem 数组是用 setup\_vm() 建立的虚拟地址初始化
的，并且与``setup\_vm\_final()``建立的映射一起使用，RISC-V内核使用
fixmap区域来映射设备树。这确保设备树可以通过两种虚拟映射访问。

#### Pre-MMU执行

在建立第一个虚拟映射之前，需要运行一些代码。这些包括第一个虚拟映射的安装本身，
早期替代方案的修补，以及内核命令行的早期解析。这些代码必须非常小心地编译，因为：

- -fno-pie：这对于使用``-fPIE``的可重定位内核是必需的，否则，任何对
  全局符号的访问都将通过 GOT进行，而GOT只是虚拟地重新定位。
- -mcmodel=medany：任何对全局符号的访问都必须是PC相对的，以避免在设
  置MMU之前发生任何重定位。
- *所有* 的仪表化功能也必须被禁用（包括KASAN，ftrace和其他）。

由于使用来自不同编译单元的符号需要用这些标志编译该单元，我们建议尽可能不要使用
外部符号。

## 来源、版本与核验

- 来源：[RISC-V内核启动要求和限制](https://docs.kernel.org/translations/zh_CN/arch/riscv/boot.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/arch/riscv/boot.rst`。
