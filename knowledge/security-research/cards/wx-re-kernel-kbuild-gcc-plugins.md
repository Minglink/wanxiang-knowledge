---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-kbuild-gcc-plugins",
  "title": "Linux 内核：GCC 插件基础设施",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "kbuild"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "a1b21053b695d57717782b6c3def891c288e4d77675e99b254794999ab4e2e1d",
  "generatedHash": "eff377139df4122f796d7c593f17245ebb0fcdc35f86561d502e360281516ec3",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "GCC 插件是为编译器提供额外功能的可加载模块 [[1]](#footnote-1)。它们对于运行时插装和静态分析非常有用。 我们可以在编译过程中通过回调 [[2]](#footnote-2)，GIMPLE [[3]](#footnote-3)，IPA [[4]](#footnote-4) 和 RTL Passes [[5]](#footnote-5) （译",
  "l1": "GCC 插件是为编译器提供额外功能的可加载模块 [[1]](#footnote-1)。它们对于运行时插装和静态分析非常有用。 我们可以在编译过程中通过回调 [[2]](#footnote-2)，GIMPLE [[3]](#footnote-3)，IPA [[4]](#footnote-4) 和 RTL Passes [[5]](#footnote-5) （译者注：Pass 是编译器所采用的一种结构化技术，用于完成编译对象的分析、优化或转换等功能） 来分析、修改和添加更多的代码。 内核的 GCC 插件基础设施支持构建树外模块、交叉编译和在单独的目录中构建。插件源文件必须由 C++ 编译器编译。 目前 GCC 插件基础设施只支持一些架构。搜索 \"select HAVE_GCC_PLUGINS\" 来查找支持 GCC 插件的架构。 这个基础设施是从 grsecurity [[6]](#footno",
  "questions": [
    "Linux 内核：GCC 插件基础设施的原理是什么？",
    "Linux 内核：GCC 插件基础设施有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-kbuild-gcc-plugins",
      "url": "https://docs.kernel.org/translations/zh_CN/kbuild/gcc-plugins.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：GCC 插件基础设施

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## GCC 插件基础设施

### 介绍

GCC 插件是为编译器提供额外功能的可加载模块 [[1]](#footnote-1)。它们对于运行时插装和静态分析非常有用。
我们可以在编译过程中通过回调 [[2]](#footnote-2)，GIMPLE [[3]](#footnote-3)，IPA [[4]](#footnote-4) 和 RTL Passes [[5]](#footnote-5)
（译者注：Pass 是编译器所采用的一种结构化技术，用于完成编译对象的分析、优化或转换等功能）
来分析、修改和添加更多的代码。

内核的 GCC 插件基础设施支持构建树外模块、交叉编译和在单独的目录中构建。插件源文件必须由
C++ 编译器编译。

目前 GCC 插件基础设施只支持一些架构。搜索 "select HAVE\_GCC\_PLUGINS" 来查找支持
GCC 插件的架构。

这个基础设施是从 grsecurity [[6]](#footnote-6) 和 PaX [[7]](#footnote-7) 移植过来的。

--

[[1](#footnote-reference-1)]

<https://gcc.gnu.org/onlinedocs/gccint/Plugins.html>


[[2](#footnote-reference-2)]

<https://gcc.gnu.org/onlinedocs/gccint/Plugin-API.html#Plugin-API>


[[3](#footnote-reference-3)]

<https://gcc.gnu.org/onlinedocs/gccint/GIMPLE.html>


[[4](#footnote-reference-4)]

<https://gcc.gnu.org/onlinedocs/gccint/IPA.html>


[[5](#footnote-reference-5)]

<https://gcc.gnu.org/onlinedocs/gccint/RTL.html>


[[6](#footnote-reference-6)]

<https://grsecurity.net/>


[[7](#footnote-reference-7)]

<https://pax.grsecurity.net/>

### 目的

GCC 插件的设计目的是提供一个用于试验 GCC 或 Clang 上游没有的潜在编译器功能的场所。
一旦它们的实用性得到验证，这些功能将被添加到 GCC（和 Clang）的上游。随后，在所有
支持的 GCC 版本都支持这些功能后，它们会被从内核中移除。

具体来说，新插件应该只实现上游编译器（GCC 和 Clang）不支持的功能。

当 Clang 中存在 GCC 中不存在的某项功能时，应努力将该功能做到 GCC 上游（而不仅仅
是作为内核专用的 GCC 插件），以使整个生态都能从中受益。

类似的，如果 GCC 插件提供的功能在 Clang 中 **不** 存在，但该功能被证明是有用的，也应
努力将该功能上传到 GCC（和 Clang）。

在上游 GCC 提供了某项功能后，该插件将无法在相应的 GCC 版本（以及更高版本）下编译。
一旦所有内核支持的 GCC 版本都提供了该功能，该插件将从内核中移除。

### 文件

**$(src)/scripts/gcc-plugins**

> 这是 GCC 插件的目录。

**$(src)/scripts/gcc-plugins/gcc-common.h**

> 这是 GCC 插件的兼容性头文件。
> 应始终包含它，而不是单独的 GCC 头文件。

**$(src)/scripts/gcc-plugins/gcc-generate-gimple-pass.h,
$(src)/scripts/gcc-plugins/gcc-generate-ipa-pass.h,
$(src)/scripts/gcc-plugins/gcc-generate-simple\_ipa-pass.h,
$(src)/scripts/gcc-plugins/gcc-generate-rtl-pass.h**

> 这些头文件可以自动生成 GIMPLE、SIMPLE\_IPA、IPA 和 RTL passes 的注册结构。
> 与手动创建结构相比，它们更受欢迎。

### 用法

你必须为你的 GCC 版本安装 GCC 插件头文件，以 Ubuntu 上的 gcc-10 为例:

```
apt-get install gcc-10-plugin-dev
```

或者在 Fedora 上:

```
dnf install gcc-plugin-devel libmpc-devel
```

或者在 Fedora 上使用包含插件的交叉编译器时:

```
dnf install libmpc-devel
```

在内核配置中启用 GCC 插件基础设施与一些你想使用的插件:

```
CONFIG_GCC_PLUGINS=y
CONFIG_GCC_PLUGIN_LATENT_ENTROPY=y
...
```

运行 gcc（本地或交叉编译器），确保能够检测到插件头文件:

```
gcc -print-file-name=plugin
CROSS_COMPILE=arm-linux-gnu- ${CROSS_COMPILE}gcc -print-file-name=plugin
```

"plugin" 这个词意味着它们没有被检测到:

```
plugin
```

完整的路径则表示插件已经被检测到:

```
/usr/lib/gcc/x86_64-redhat-linux/12/plugin
```

编译包括插件在内的最小工具集:

```
make scripts
```

或者直接在内核中运行 make，使用循环复杂性 GCC 插件编译整个内核。

### 4. 如何添加新的 GCC 插件

GCC 插件位于 scripts/gcc-plugins/。你需要将插件源文件放在 scripts/gcc-plugins/ 目录下。
子目录创建并不支持，你必须添加在 scripts/gcc-plugins/Makefile、scripts/Makefile.gcc-plugins
和相关的 Kconfig 文件中。

## 来源、版本与核验

- 来源：[GCC 插件基础设施](https://docs.kernel.org/translations/zh_CN/kbuild/gcc-plugins.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/kbuild/gcc-plugins.rst`。
