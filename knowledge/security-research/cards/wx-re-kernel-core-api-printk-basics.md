---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-core-api-printk-basics",
  "title": "Linux 内核：使用printk记录消息",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "core-api"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "b74fd347e135da95567416faab434ce2e4a92483a6cae34902b25f81451dbf1e",
  "generatedHash": "54ef85a2fd857572cb7972a5abd6ca0218357dbc416a06e9e0569f0e9a96b8c3",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "printk()是Linux内核中最广为人知的函数之一。它是我们打印消息的标准工具，通常也是追踪和调试 的最基本方法。如果你熟悉printf(3)，你就能够知道printk()是基于它的，尽管它在功能上有一些不 同之处: - printk() 消息可以指定日志级别。 - 格式字符串虽然与C99基本兼容，但并不遵循完全相同的规范。它有一些扩展和一些限制（没 有",
  "l1": "printk()是Linux内核中最广为人知的函数之一。它是我们打印消息的标准工具，通常也是追踪和调试 的最基本方法。如果你熟悉printf(3)，你就能够知道printk()是基于它的，尽管它在功能上有一些不 同之处: - printk() 消息可以指定日志级别。 - 格式字符串虽然与C99基本兼容，但并不遵循完全相同的规范。它有一些扩展和一些限制（没 有 %n 或浮点转换指定符）。参见:ref: 如何正确地获得printk格式指定符<printk-specifiers> 。 所有的printk()消息都会被打印到内核日志缓冲区，这是一个通过/dev/kmsg输出到用户空间的环 形缓冲区。读取它的通常方法是使用 dmesg 。 其中 KERN_INFO 是日志级别（注意，它与格式字符串连在一起，日志级别不是一个单独的参数）。 可用的日志级别是： 日志级别指定了一条消息的重要性。内核根据日",
  "questions": [
    "Linux 内核：使用printk记录消息的原理是什么？",
    "Linux 内核：使用printk记录消息有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-core-api-printk-basics",
      "url": "https://docs.kernel.org/translations/zh_CN/core-api/printk-basics.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：使用printk记录消息

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 使用printk记录消息

printk()是Linux内核中最广为人知的函数之一。它是我们打印消息的标准工具，通常也是追踪和调试
的最基本方法。如果你熟悉printf(3)，你就能够知道printk()是基于它的，尽管它在功能上有一些不
同之处:

> - printk() 消息可以指定日志级别。
> - 格式字符串虽然与C99基本兼容，但并不遵循完全相同的规范。它有一些扩展和一些限制（没
>   有 %n 或浮点转换指定符）。参见:ref: 如何正确地获得printk格式指定符<printk-specifiers> 。

所有的printk()消息都会被打印到内核日志缓冲区，这是一个通过/dev/kmsg输出到用户空间的环
形缓冲区。读取它的通常方法是使用 dmesg 。

printk()的用法通常是这样的:

```
printk(KERN_INFO "Message: %s\n", arg);
```

其中 KERN\_INFO 是日志级别（注意，它与格式字符串连在一起，日志级别不是一个单独的参数）。
可用的日志级别是：

| 名称 | 字符串 | 别名函数 |
| --- | --- | --- |
| KERN\_EMERG | "0" | pr\_emerg() |
| KERN\_ALERT | "1" | pr\_alert() |
| KERN\_CRIT | "2" | pr\_crit() |
| KERN\_ERR | "3" | pr\_err() |
| KERN\_WARNING | "4" | pr\_warn() |
| KERN\_NOTICE | "5" | pr\_notice() |
| KERN\_INFO | "6" | pr\_info() |
| KERN\_DEBUG | "7" | pr\_debug() and pr\_devel() 若定义了DEBUG |
| KERN\_DEFAULT | "" |  |
| KERN\_CONT | "c" | pr\_cont() |

日志级别指定了一条消息的重要性。内核根据日志级别和当前 *console\_loglevel* （一个内核变量）决
定是否立即显示消息（将其打印到当前控制台）。如果消息的优先级比 *console\_loglevel* 高（日志级
别值较低），消息将被打印到控制台。

如果省略了日志级别，则以 KERN\_DEFAULT 级别打印消息。

你可以用以下方法检查当前的 *console\_loglevel*

```
$ cat /proc/sys/kernel/printk
4        4        1        7
```

结果显示了 *current*, *default*, *minimum* 和 *boot-time-default* 日志级别

要改变当前的 console\_loglevel，只需在 /proc/sys/kernel/printk 中写入所需的
级别。例如，要打印所有的消息到控制台上:

```
# echo 8 > /proc/sys/kernel/printk
```

另一种方式，使用 dmesg:

```
# dmesg -n 5
```

设置 console\_loglevel 打印 KERN\_WARNING (4) 或更严重的消息到控制台。更多消息参
见 dmesg(1) 。

作为printk()的替代方案，你可以使用 pr\_\*() 别名来记录日志。这个系列的宏在宏名中
嵌入了日志级别。例如:

```
pr_info("Info message no. %d\n", msg_num);
```

打印 KERN\_INFO 消息。

除了比等效的printk()调用更简洁之外，它们还可以通过pr\_fmt()宏为格式字符串使用一个通用
的定义。例如，在源文件的顶部（在任何 #include 指令之前）定义这样的内容。:

```
#define pr_fmt(fmt) "%s:%s: " fmt, KBUILD_MODNAME, __func__
```

会在该文件中的每一条 pr\_\*() 消息前加上发起该消息的模块和函数名称。

为了调试，还有两个有条件编译的宏：
pr\_debug()和pr\_devel()，除非定义了 DEBUG (或者在pr\_debug()的情况下定义了
CONFIG\_DYNAMIC\_DEBUG )，否则它们不会被编译。

### 函数接口

该API在以下内核代码中:

include/linux/printk.h

## 来源、版本与核验

- 来源：[使用printk记录消息](https://docs.kernel.org/translations/zh_CN/core-api/printk-basics.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/core-api/printk-basics.rst`。
