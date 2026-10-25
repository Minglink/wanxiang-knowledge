---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-dev-tools-ubsan",
  "title": "Linux 内核：未定义行为消毒剂 - UBSAN",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "dev-tools"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "752d4c1983245e13df2a19c1beacb62ae704f23f5c002ef724f6e526f2166ddb",
  "generatedHash": "2ad6988192e1297717e423ddaaad12a85916a60079c26c7c4ba08ca5d8308b38",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "UBSAN是一种动态未定义行为检查工具。 UBSAN使用编译时插桩捕捉未定义行为。编译器在可能导致未定义行为的操作前插入特定 检测代码。如果检查失败，即检测到未定义行为，__ubsan_handle_* 函数将被调用打印 错误信息。 GCC自4.9.x [1] （详见 -fsanitize=undefined 选项及其子选项）版本后引入这 一特性。GCC 5",
  "l1": "UBSAN是一种动态未定义行为检查工具。 UBSAN使用编译时插桩捕捉未定义行为。编译器在可能导致未定义行为的操作前插入特定 检测代码。如果检查失败，即检测到未定义行为，__ubsan_handle_* 函数将被调用打印 错误信息。 GCC自4.9.x [1] （详见 -fsanitize=undefined 选项及其子选项）版本后引入这 一特性。GCC 5.x 版本实现了更多检查器 [2]。 排除一个目录中的所有文件: 当全部文件都被禁用，可通过如下方式为特定文件启用: 未对齐的内存访问检测可通过开启独立选项 - CONFIG_UBSAN_ALIGNMENT 检测。 该选项在支持未对齐访问的架构上(CONFIG_HAVE_EFFICIENT_UNALIGNED_ACCESS=y) 默认为关闭。该选项仍可通过内核配置启用，但它将产生大量的UBSAN报告。",
  "questions": [
    "Linux 内核：未定义行为消毒剂 - UBSAN的原理是什么？",
    "Linux 内核：未定义行为消毒剂 - UBSAN有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-dev-tools-ubsan",
      "url": "https://docs.kernel.org/translations/zh_CN/dev-tools/ubsan.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：未定义行为消毒剂 - UBSAN

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 未定义行为消毒剂 - UBSAN

UBSAN是一种动态未定义行为检查工具。

UBSAN使用编译时插桩捕捉未定义行为。编译器在可能导致未定义行为的操作前插入特定
检测代码。如果检查失败，即检测到未定义行为，\_\_ubsan\_handle\_\* 函数将被调用打印
错误信息。

GCC自4.9.x [[1](https://gcc.gnu.org/onlinedocs/gcc-4.9.0/gcc/Debugging-Options.html)] （详见 -fsanitize=undefined 选项及其子选项）版本后引入这
一特性。GCC 5.x 版本实现了更多检查器 [[2](https://gcc.gnu.org/onlinedocs/gcc/Debugging-Options.html)]。

### 报告样例

```
================================================================================
UBSAN: Undefined behaviour in ../include/linux/bitops.h:110:33
shift exponent 32 is to large for 32-bit type 'unsigned int'
CPU: 0 PID: 0 Comm: swapper Not tainted 4.4.0-rc1+ #26
 0000000000000000 ffffffff82403cc8 ffffffff815e6cd6 0000000000000001
 ffffffff82403cf8 ffffffff82403ce0 ffffffff8163a5ed 0000000000000020
 ffffffff82403d78 ffffffff8163ac2b ffffffff815f0001 0000000000000002
Call Trace:
 [<ffffffff815e6cd6>] dump_stack+0x45/0x5f
 [<ffffffff8163a5ed>] ubsan_epilogue+0xd/0x40
 [<ffffffff8163ac2b>] __ubsan_handle_shift_out_of_bounds+0xeb/0x130
 [<ffffffff815f0001>] ? radix_tree_gang_lookup_slot+0x51/0x150
 [<ffffffff8173c586>] _mix_pool_bytes+0x1e6/0x480
 [<ffffffff83105653>] ? dmi_walk_early+0x48/0x5c
 [<ffffffff8173c881>] add_device_randomness+0x61/0x130
 [<ffffffff83105b35>] ? dmi_save_one_device+0xaa/0xaa
 [<ffffffff83105653>] dmi_walk_early+0x48/0x5c
 [<ffffffff831066ae>] dmi_scan_machine+0x278/0x4b4
 [<ffffffff8111d58a>] ? vprintk_default+0x1a/0x20
 [<ffffffff830ad120>] ? early_idt_handler_array+0x120/0x120
 [<ffffffff830b2240>] setup_arch+0x405/0xc2c
 [<ffffffff830ad120>] ? early_idt_handler_array+0x120/0x120
 [<ffffffff830ae053>] start_kernel+0x83/0x49a
 [<ffffffff830ad120>] ? early_idt_handler_array+0x120/0x120
 [<ffffffff830ad386>] x86_64_start_reservations+0x2a/0x2c
 [<ffffffff830ad4f3>] x86_64_start_kernel+0x16b/0x17a
================================================================================
```

### 用法

使用如下内核配置启用UBSAN:

```
CONFIG_UBSAN=y
```

排除要被检测的文件:

```
UBSAN_SANITIZE_main.o := n
```

排除一个目录中的所有文件:

```
UBSAN_SANITIZE := n
```

当全部文件都被禁用，可通过如下方式为特定文件启用:

```
UBSAN_SANITIZE_main.o := y
```

未对齐的内存访问检测可通过开启独立选项 - CONFIG\_UBSAN\_ALIGNMENT 检测。
该选项在支持未对齐访问的架构上(CONFIG\_HAVE\_EFFICIENT\_UNALIGNED\_ACCESS=y)
默认为关闭。该选项仍可通过内核配置启用，但它将产生大量的UBSAN报告。

### 参考文献

## 来源、版本与核验

- 来源：[未定义行为消毒剂 - UBSAN](https://docs.kernel.org/translations/zh_CN/dev-tools/ubsan.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/dev-tools/ubsan.rst`。
