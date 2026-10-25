---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-kbuild-headers-install",
  "title": "Linux 内核：导出内核头文件供用户空间使用",
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
  "snapshotHash": "b3cd094bfb97546857b4fbf83ac83704ca459456f91843007ceac007733163a0",
  "generatedHash": "415f2fa72049a32bd2b97e7afa1375ad2b3b64811bba069b725dd092ebc8cb01",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "\"make headers_install\" 命令以适合于用户空间程序的形式导出内核头文件。 Linux 内核导出的头文件描述了用户空间程序尝试使用内核服务的 API。这些内核 头文件被系统的 C 库（例如 glibc 和 uClibc）用于定义可用的系统调用，以及 与这些系统调用一起使用的常量和结构。C 库的头文件包括来自 linux 子目录的 内核头文件",
  "l1": "\"make headers_install\" 命令以适合于用户空间程序的形式导出内核头文件。 Linux 内核导出的头文件描述了用户空间程序尝试使用内核服务的 API。这些内核 头文件被系统的 C 库（例如 glibc 和 uClibc）用于定义可用的系统调用，以及 与这些系统调用一起使用的常量和结构。C 库的头文件包括来自 linux 子目录的 内核头文件。系统的 libc 头文件通常被安装在默认位置 /usr/include，而内核 头文件在该位置的子目录中（主要是 /usr/include/linux 和 /usr/include/asm）。 内核头文件向后兼容，但不向前兼容。这意味着使用旧内核头文件的 C 库构建的程序 可以在新内核上运行（尽管它可能无法访问新特性），但使用新内核头文件构建的程序 可能无法在旧内核上运行。 \"make headers_install\" 命令可以在内核",
  "questions": [
    "Linux 内核：导出内核头文件供用户空间使用的原理是什么？",
    "Linux 内核：导出内核头文件供用户空间使用有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-kbuild-headers-install",
      "url": "https://docs.kernel.org/translations/zh_CN/kbuild/headers_install.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0"
}
---
# Linux 内核：导出内核头文件供用户空间使用

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 导出内核头文件供用户空间使用

"make headers\_install" 命令以适合于用户空间程序的形式导出内核头文件。

Linux 内核导出的头文件描述了用户空间程序尝试使用内核服务的 API。这些内核
头文件被系统的 C 库（例如 glibc 和 uClibc）用于定义可用的系统调用，以及
与这些系统调用一起使用的常量和结构。C 库的头文件包括来自 linux 子目录的
内核头文件。系统的 libc 头文件通常被安装在默认位置 /usr/include，而内核
头文件在该位置的子目录中（主要是 /usr/include/linux 和 /usr/include/asm）。

内核头文件向后兼容，但不向前兼容。这意味着使用旧内核头文件的 C 库构建的程序
可以在新内核上运行（尽管它可能无法访问新特性），但使用新内核头文件构建的程序
可能无法在旧内核上运行。

"make headers\_install" 命令可以在内核源代码的顶层目录中运行（或使用标准
的树外构建）。它接受两个可选参数:

```
make headers_install ARCH=i386 INSTALL_HDR_PATH=/usr
```

ARCH 表明为其生成头文件的架构，默认为当前架构。导出内核头文件的 linux/asm
目录是基于特定平台的，要查看支持架构的完整列表，使用以下命令:

```
ls -d include/asm-* | sed 's/.*-//'
```

INSTALL\_HDR\_PATH 表明头文件的安装位置，默认为 "./usr"。

该命令会在 INSTALL\_HDR\_PATH 中自动创建创建一个 'include' 目录，而头文件
会被安装在 INSTALL\_HDR\_PATH/include 中。

内核头文件导出的基础设施由 David Woodhouse <[dwmw2@infradead.org](mailto:dwmw2@infradead.org)> 维护。

## 来源、版本与核验

- 来源：[导出内核头文件供用户空间使用](https://docs.kernel.org/translations/zh_CN/kbuild/headers_install.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/kbuild/headers_install.rst`。
