---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-admin-guide-init",
  "title": "Linux 内核：解释“No working init found.”启动挂起消息",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "admin-guide"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "450b7073d5275185a187ca0edc39ce0b228bd8ea0be58277e663ac9cfcd365f5",
  "generatedHash": "54de7cab3820b587aad7a93155783542396b3f7c12d1fc7bc5802a36969eafbc",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "本文档提供了加载初始化二进制（init binary）失败的一些高层级原因（大致按执行 顺序列出）。 1. **无法挂载根文件系统Unable to mount root FS** ：请设置“debug”内核参数（在 引导加载程序bootloader配置文件或CONFIG_CMDLINE）以获取更详细的内核消息。 2. **初始化二进制不存在于根文件系统上i",
  "l1": "本文档提供了加载初始化二进制（init binary）失败的一些高层级原因（大致按执行 顺序列出）。 1. **无法挂载根文件系统Unable to mount root FS** ：请设置“debug”内核参数（在 引导加载程序bootloader配置文件或CONFIG_CMDLINE）以获取更详细的内核消息。 2. **初始化二进制不存在于根文件系统上init binary doesn't exist on rootfs** ： 确保您的根文件系统类型正确（并且 root= 内核参数指向正确的分区）；拥有 所需的驱动程序，例如SCSI或USB等存储硬件；文件系统（ext3、jffs2等）是内建的 （或者作为模块由initrd预加载）。 3. **控制台设备损坏Broken console device** ： console= setup 中可能存在 冲突 --> 初始控制台不可用（i",
  "questions": [
    "Linux 内核：解释“No working init found.”启动挂起消息的原理是什么？",
    "Linux 内核：解释“No working init found.”启动挂起消息有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-admin-guide-init",
      "url": "https://docs.kernel.org/translations/zh_CN/admin-guide/init.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：解释“No working init found.”启动挂起消息

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 解释“No working init found.”启动挂起消息

作者:
:   Andreas Mohr <andi at lisas period de>

    Cristian Souza <cristianmsbr at gmail period com>

本文档提供了加载初始化二进制（init binary）失败的一些高层级原因（大致按执行
顺序列出）。

1. **无法挂载根文件系统Unable to mount root FS** ：请设置“debug”内核参数（在
   引导加载程序bootloader配置文件或CONFIG\_CMDLINE）以获取更详细的内核消息。
2. **初始化二进制不存在于根文件系统上init binary doesn't exist on rootfs** ：
   确保您的根文件系统类型正确（并且 root= 内核参数指向正确的分区）；拥有
   所需的驱动程序，例如SCSI或USB等存储硬件；文件系统（ext3、jffs2等）是内建的
   （或者作为模块由initrd预加载）。
3. **控制台设备损坏Broken console device** ： console= setup 中可能存在
   冲突 --> 初始控制台不可用（initial console unavailable）。例如，由于串行
   IRQ问题（如缺少基于中断的配置）导致的某些串行控制台不可靠。尝试使用不同的
   console= device 或像 netconsole= 。
4. **二进制存在但依赖项不可用Binary exists but dependencies not available** ：
   例如初始化二进制的必需库依赖项，像 /lib/ld-linux.so.2 丢失或损坏。使用
   readelf -d <INIT>|grep NEEDED 找出需要哪些库。
5. **无法加载二进制Binary cannot be loaded** ：请确保二进制的体系结构与您的
   硬件匹配。例如i386不匹配x86\_64，或者尝试在ARM硬件上加载x86。如果您尝试在
   此处加载非二进制文件（shell脚本？），您应该确保脚本在其工作头（shebang
   header）行 #!/... 中指定能正常工作的解释器（包括其库依赖项）。在处理
   脚本之前，最好先测试一个简单的非脚本二进制文件，比如 /bin/sh ，并确认
   它能成功执行。要了解更多信息，请将代码添加到 init/main.c 以显示
   kernel\_execve()的返回值。

当您发现新的失败原因时，请扩展本解释（毕竟加载初始化二进制是一个 **关键** 且
艰难的过渡步骤，需要尽可能无痛地进行），然后向LKML提交一个补丁。

待办事项：

- 通过一个可以存储 kernel\_execve() 结果值的结构体数组实现各种
  run\_init\_process() 调用，并在失败时通过迭代 **所有** 结果来记录一切
  （非常重要的可用性修复）。
- 试着使实现本身在一般情况下更有帮助，例如在受影响的地方提供额外的错误消息。

## 来源、版本与核验

- 来源：[解释“No working init found.”启动挂起消息](https://docs.kernel.org/translations/zh_CN/admin-guide/init.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/admin-guide/init.rst`。
