---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-arch-openrisc-openrisc-port",
  "title": "Linux 内核：OpenRISC Linux",
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
  "snapshotHash": "c4166a1abe35f66b02e370c7058664e5b09b0316c2e99cf67a620d7e25c74e19",
  "generatedHash": "ce3b08e0620f6740e8106e74dc29eea3091142d70c5773267ba0d52c57e88028",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "这是Linux对OpenRISC类微处理器的移植；具体来说，最早移植目标是32位 OpenRISC 1000系列（或1k）。 关于OpenRISC处理器和正在进行中的开发的信息: 为了构建和运行Linux for OpenRISC，你至少需要一个基本的工具链，或许 还需要架构模拟器。 这里概述了准备就位这些部分的步骤。 工具链二进制文件可以从openrisc",
  "l1": "这是Linux对OpenRISC类微处理器的移植；具体来说，最早移植目标是32位 OpenRISC 1000系列（或1k）。 关于OpenRISC处理器和正在进行中的开发的信息: 为了构建和运行Linux for OpenRISC，你至少需要一个基本的工具链，或许 还需要架构模拟器。 这里概述了准备就位这些部分的步骤。 工具链二进制文件可以从openrisc.io或我们的github发布页面获得。不同 工具链的构建指南可以在openrisc.io或Stafford的工具链构建和发布脚本 中找到。 OpenRISC社区通常使用FuseSoC来管理构建和编程SoC到FPGA中。 下面是用 OpenRISC SoC对De0 Nano开发板进行编程的一个例子。 在构建过程中， FPGA RTL是从FuseSoC IP核库中下载的代码，并使用FPGA供应商工具构建。 二进制文件用openocd加载到",
  "questions": [
    "Linux 内核：OpenRISC Linux的原理是什么？",
    "Linux 内核：OpenRISC Linux有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-arch-openrisc-openrisc-port",
      "url": "https://docs.kernel.org/translations/zh_CN/arch/openrisc/openrisc_port.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：OpenRISC Linux

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## OpenRISC Linux

这是Linux对OpenRISC类微处理器的移植；具体来说，最早移植目标是32位
OpenRISC 1000系列（或1k）。

关于OpenRISC处理器和正在进行中的开发的信息:

> |  |  |
> | --- | --- |
> | 网站 | <https://openrisc.io> |
> | 邮箱 | [linux-openrisc@vger.kernel.org](mailto:linux-openrisc@vger.kernel.org) |

---

### OpenRISC工具链和Linux的构建指南

为了构建和运行Linux for OpenRISC，你至少需要一个基本的工具链，或许
还需要架构模拟器。 这里概述了准备就位这些部分的步骤。

1. 工具链

工具链二进制文件可以从openrisc.io或我们的github发布页面获得。不同
工具链的构建指南可以在openrisc.io或Stafford的工具链构建和发布脚本
中找到。

> |  |  |
> | --- | --- |
> | 二进制 | <https://github.com/stffrdhrn/or1k-toolchain-build/releases> |
> | 工具链 | <https://openrisc.io/software> |
> | 构建 | <https://github.com/stffrdhrn/or1k-toolchain-build> |

2. 构建

像往常一样构建Linux内核:

```
make ARCH=openrisc CROSS_COMPILE="or1k-linux-" defconfig
make ARCH=openrisc CROSS_COMPILE="or1k-linux-"
```

3. 在FPGA上运行（可选)

OpenRISC社区通常使用FuseSoC来管理构建和编程SoC到FPGA中。 下面是用
OpenRISC SoC对De0 Nano开发板进行编程的一个例子。 在构建过程中，
FPGA RTL是从FuseSoC IP核库中下载的代码，并使用FPGA供应商工具构建。
二进制文件用openocd加载到电路板上。

```
git clone https://github.com/olofk/fusesoc
cd fusesoc
sudo pip install -e .

fusesoc init
fusesoc build de0_nano
fusesoc pgm de0_nano

openocd -f interface/altera-usb-blaster.cfg \
        -f board/or1k_generic.cfg

telnet localhost 4444
> init
> halt; load_image vmlinux ; reset
```

4. 在模拟器上运行（可选）

QEMU是一个处理器仿真器，我们推荐它来模拟OpenRISC平台。 请按照QEMU网
站上的OpenRISC说明，让Linux在QEMU上运行。 你可以自己构建QEMU，但你的
Linux发行版可能提供了支持OpenRISC的二进制包。

> |  |  |
> | --- | --- |
> | qemu openrisc | <https://wiki.qemu.org/Documentation/Platforms/OpenRISC> |

---

### 术语表

代码中使用了以下符号约定以将范围限制在几个特定处理器实现上：

|  |  |
| --- | --- |
| openrisc: | OpenRISC类型处理器 |
| or1k: | OpenRISC 1000系列处理器 |
| or1200: | OpenRISC 1200处理器 |

---

### 历史

2003-11-18 Matjaz Breskvar ([phoenix@bsemi.com](mailto:phoenix@bsemi.com))
:   将linux初步移植到OpenRISC或32架构。
    :   所有的核心功能都实现了，并且可以使用。

2003-12-08 Matjaz Breskvar ([phoenix@bsemi.com](mailto:phoenix@bsemi.com))
:   彻底改变TLB失误处理。
    重写异常处理。
    在默认的initrd中实现了sash-3.6的所有功能。
    大幅改进的版本。

2004-04-10 Matjaz Breskvar ([phoenix@bsemi.com](mailto:phoenix@bsemi.com))
:   大量的bug修复。
    支持以太网，http和telnet服务器功能。
    可以运行许多标准的linux应用程序。

2004-06-26 Matjaz Breskvar ([phoenix@bsemi.com](mailto:phoenix@bsemi.com))
:   移植到2.6.x。

2004-11-30 Matjaz Breskvar ([phoenix@bsemi.com](mailto:phoenix@bsemi.com))
:   大量的bug修复和增强功能。
    增加了opencores framebuffer驱动。

2010-10-09 Jonas Bonn ([jonas@southpole.se](mailto:jonas@southpole.se))
:   重大重写，使其与上游的Linux 2.6.36看齐。

## 来源、版本与核验

- 来源：[OpenRISC Linux](https://docs.kernel.org/translations/zh_CN/arch/openrisc/openrisc_port.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/arch/openrisc/openrisc_port.rst`。
