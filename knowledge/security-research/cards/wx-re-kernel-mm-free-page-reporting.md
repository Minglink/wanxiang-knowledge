---
{
  "schemaVersion": 2,
  "id": "wx-re-kernel-mm-free-page-reporting",
  "title": "Linux 内核：空闲页报告",
  "type": "note",
  "tags": [
    "软件底层",
    "Linux",
    "mm"
  ],
  "project": "软件底层研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "5f6d52b94e33d901d0db814aa14919fba99f4aae4e93b08e8b2da5e95b1111fd",
  "generatedHash": "f5d333d02b77051d212f397a451b65caa0c20761694fb180f92120293c7419bd",
  "archived": false,
  "verification": "自动结构整理；未实测",
  "l0": "空闲页报告是一个API，设备可以通过它来注册接收系统当前未使用的页面列表。这在虚拟 化的情况下是很有用的，客户机能够使用这些数据来通知管理器它不再使用内存中的某些页 面。 对于驱动，通常是气球驱动要使用这个功能，它将分配和初始化一个page_reporting_dev_info 结构体。它要填充的结构体中的字段是用于处理散点列表的 \"report\" 函数指针",
  "l1": "空闲页报告是一个API，设备可以通过它来注册接收系统当前未使用的页面列表。这在虚拟 化的情况下是很有用的，客户机能够使用这些数据来通知管理器它不再使用内存中的某些页 面。 对于驱动，通常是气球驱动要使用这个功能，它将分配和初始化一个page_reporting_dev_info 结构体。它要填充的结构体中的字段是用于处理散点列表的 \"report\" 函数指针。它还必 须保证每次调用该函数时能处理至少相当于PAGE_REPORTING_CAPACITY的散点列表条目。 假设没有其他页面报告设备已经注册， 对page_reporting_register的调用将向报告框 架注册页面报告接口。 一旦注册，页面报告API将开始向驱动报告成批的页面。API将在接口被注册后2秒开始报告 页面，并在任何足够高的页面被释放之后2秒继续报告。 报告的页面将被存储在传递给报告函数的散列表中，最后一个条目的结束",
  "questions": [
    "Linux 内核：空闲页报告的原理是什么？",
    "Linux 内核：空闲页报告有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "kernel-mm-free-page-reporting",
      "url": "https://docs.kernel.org/translations/zh_CN/mm/free_page_reporting.html",
      "checkedAt": "2026-10-25",
      "mode": "许可文献摘编，RST 转 Markdown；保留完整原始文档"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "GPL-2.0 (repository default; no file SPDX found)"
}
---
# Linux 内核：空闲页报告

> 本文由 Linux 内核中文文档转换收录。翻译可能滞后，版本相关的结构与行为应对照实际内核；本库没有运行文中命令。

## 空闲页报告

空闲页报告是一个API，设备可以通过它来注册接收系统当前未使用的页面列表。这在虚拟
化的情况下是很有用的，客户机能够使用这些数据来通知管理器它不再使用内存中的某些页
面。

对于驱动，通常是气球驱动要使用这个功能，它将分配和初始化一个page\_reporting\_dev\_info
结构体。它要填充的结构体中的字段是用于处理散点列表的 "report" 函数指针。它还必
须保证每次调用该函数时能处理至少相当于PAGE\_REPORTING\_CAPACITY的散点列表条目。
假设没有其他页面报告设备已经注册， 对page\_reporting\_register的调用将向报告框
架注册页面报告接口。

一旦注册，页面报告API将开始向驱动报告成批的页面。API将在接口被注册后2秒开始报告
页面，并在任何足够高的页面被释放之后2秒继续报告。

报告的页面将被存储在传递给报告函数的散列表中，最后一个条目的结束位被设置在条目
nent-1中。 当页面被报告函数处理时，分配器将无法访问它们。一旦报告函数完成，这些
页将被返回到它们所获得的自由区域。

在移除使用空闲页报告的驱动之前，有必要调用page\_reporting\_unregister，以移除
目前被空闲页报告使用的page\_reporting\_dev\_info结构体。这样做将阻止进一步的报
告通过该接口发出。如果另一个驱动或同一驱动被注册，它就有可能恢复前一个驱动在报告
空闲页方面的工作。

Alexander Duyck, 2019年12月04日

## 来源、版本与核验

- 来源：[空闲页报告](https://docs.kernel.org/translations/zh_CN/mm/free_page_reporting.html)
- 作者/维护者：Linux kernel 文档作者及中文翻译者（完整署名见正文与原始 RST）
- 获取日期：2026-10-25。docs.kernel.org snapshot retrieved 2026-10-25; not pinned to a Git commit
- 收录方式：许可文献摘编，RST 转 Markdown；保留完整原始文档。自动结构整理；未实测。
- 许可：GPL-2.0 (repository default; no file SPDX found)。原始署名及相关许可保留在本批 sources 附件中。
- 原始文档随库保存：`sources/research-2026-10-25-002/kernel-originals/mm/free_page_reporting.rst`。
