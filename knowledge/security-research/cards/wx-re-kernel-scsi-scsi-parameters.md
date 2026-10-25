---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-scsi-scsi-parameters",
  "title": "Linux 内核：SCSI内核参数",
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
  "snapshotHash": "cf7942b673533343a9af30024ab0acc47618d57793b80a1c94571ea78d4bc36b",
  "generatedHash": "b4e1e5fc1444ce23a99be67b7553e50775b902e0ba8b0d102bc020acfed23863",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "请查阅Documentation/admin-guide/kernel-parameters.rst以获取 指定模块参数相关的通用信息。 当前文档可能不完全是最新和全面的。命令 modinfo -p ${modulename} 显示了可加载模块的参数列表。可加载模块被加载到内核中后，也会在 /sys/module/${modulename}/paramete",
  "l1": "请查阅Documentation/admin-guide/kernel-parameters.rst以获取 指定模块参数相关的通用信息。 当前文档可能不完全是最新和全面的。命令 modinfo -p ${modulename} 显示了可加载模块的参数列表。可加载模块被加载到内核中后，也会在 /sys/module/${modulename}/parameters/ 目录下显示其参数。其 中某些参数可以通过命令 echo -n ${value} > /sys/module/${modulename}/parameters/${parm} 在运行时修改。",
  "questions": [
    "Linux 内核：SCSI内核参数的原理是什么？",
    "Linux 内核：SCSI内核参数有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-scsi-scsi-parameters",
      "url": "https://docs.kernel.org/translations/zh_CN/scsi/scsi-parameters.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：SCSI内核参数

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## SCSI内核参数

请查阅Documentation/admin-guide/kernel-parameters.rst以获取
指定模块参数相关的通用信息。

当前文档可能不完全是最新和全面的。命令 modinfo -p ${modulename}
显示了可加载模块的参数列表。可加载模块被加载到内核中后，也会在
/sys/module/${modulename}/parameters/ 目录下显示其参数。其
中某些参数可以通过命令
echo -n ${value} > /sys/module/${modulename}/parameters/${parm}
在运行时修改。

```
advansys=       [HW,SCSI]
                请查阅 drivers/scsi/advansys.c 文件头部。

aha152x=        [HW,SCSI]
                请查阅 Documentation/scsi/aha152x.rst。

aha1542=        [HW,SCSI]
                格式：<portbase>[,<buson>,<busoff>[,<dmaspeed>]]

aic7xxx=        [HW,SCSI]
                请查阅 Documentation/scsi/aic7xxx.rst。

aic79xx=        [HW,SCSI]
                请查阅 Documentation/scsi/aic79xx.rst。

atascsi=        [HW,SCSI]
                请查阅 drivers/scsi/atari_scsi.c。

BusLogic=       [HW,SCSI]
                请查阅 drivers/scsi/BusLogic.c 文件中
                BusLogic_ParseDriverOptions()函数前的注释。

gvp11=          [HW,SCSI]

ips=            [HW,SCSI] Adaptec / IBM ServeRAID 控制器
                请查阅 drivers/scsi/ips.c 文件头部。

mac5380=        [HW,SCSI]
                请查阅 drivers/scsi/mac_scsi.c。

scsi_mod.max_luns=
                [SCSI] 最大可探测LUN数。
                取值范围为 1 到 2^32-1。

scsi_mod.max_report_luns=
                [SCSI] 接收到的最大LUN数。
                取值范围为 1 到 16384。

NCR_D700=       [HW,SCSI]
                请查阅 drivers/scsi/NCR_D700.c 文件头部。

ncr5380=        [HW,SCSI]
                请查阅 Documentation/scsi/g_NCR5380.rst。

ncr53c400=      [HW,SCSI]
                请查阅 Documentation/scsi/g_NCR5380.rst。

ncr53c400a=     [HW,SCSI]
                请查阅 Documentation/scsi/g_NCR5380.rst。

ncr53c8xx=      [HW,SCSI]

osst=           [HW,SCSI] SCSI磁带驱动
                格式：<buffer_size>,<write_threshold>
                另请查阅 Documentation/scsi/st.rst。

scsi_debug_*=   [SCSI]
                请查阅 drivers/scsi/scsi_debug.c。

scsi_mod.default_dev_flags=
                [SCSI] SCSI默认设备标志
                格式：<integer>

scsi_mod.dev_flags=
                [SCSI] 厂商和型号的黑/白名单条目
                格式：<vendor>:<model>:<flags>
                （flags 为整数值）

scsi_mod.scsi_logging_level=
                [SCSI] 日志级别的位掩码
                位的定义请查阅 drivers/scsi/scsi_logging.h。
                此参数也可以通过sysctl对dev.scsi.logging_level
                进行设置（/proc/sys/dev/scsi/logging_level）。
                此外，S390-tools软件包提供了一个便捷的
                ‘scsi_logging_level’ 脚本，可以从以下地址下载：
                https://github.com/ibm-s390-linux/s390-tools/blob/master/scripts/scsi_logging_level

scsi_mod.scan=  [SCSI] sync（默认）在发现SCSI总线过程中
                同步扫描。async在内核线程中异步扫描，允许系统继续
                启动流程。none忽略扫描，预期由用户空间完成扫描。

sim710=         [SCSI,HW]
                请查阅 drivers/scsi/sim710.c 文件头部。

st=             [HW,SCSI] SCSI磁带参数（缓冲区大小等）
                请查阅 Documentation/scsi/st.rst。

wd33c93=        [HW,SCSI]
                请查阅 drivers/scsi/wd33c93.c 文件头部。
```

## 来源、版本与核验

- 来源：[SCSI内核参数](https://docs.kernel.org/translations/zh_CN/scsi/scsi-parameters.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/scsi/scsi-parameters.rst`。
