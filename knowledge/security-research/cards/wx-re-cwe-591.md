---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-591",
  "title": "CWE-591: 敏感数据存储在未正确锁定的内存中",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-591",
    "内存安全",
    "并发安全"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "d348ecaece8d9c4eee1c62a9bebaa3b15d2dd3b2ee1ea74cb8f364220cff2ef2",
  "generatedHash": "ce816d4e75273f8e1fc25c99cdd28e3873485c2d5c0503a8d5eeb705a2e61f90",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "产品将敏感数据存储在未锁定或锁定不当的内存中，这可能导致内存被虚拟内存管理器写入磁盘上的交换文件中。这可能会使数据更容易被外部参与者访问。",
  "l1": "产品将敏感数据存储在未锁定或锁定不当的内存中，这可能导致内存被虚拟内存管理器写入磁盘上的交换文件中。这可能会使数据更容易被外部参与者访问。 在 Windows 系统上，VirtualLock 函数可以锁定内存页，以确保其保留在内存中而不会被交换到磁盘。然而，在较旧的 Windows 版本（如 95、98 或 Me）上，VirtualLock() 函数只是一个存根（stub），并不提供任何保护。在 POSIX 系统上，mlock() 调用确保页面保持在内存中，但不能保证该页面不会出现在交换空间中。因此，它不适合作为敏感数据的保护机制。某些平台（尤其是 Linux）确实保证页面不会被交换，但这是非标准的，且不可移植。调用 mlock() 还需要管理员权限。必须检查这两个调用的返回值，以确保锁定操作确实成功。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述",
  "questions": [
    "CWE-591: 敏感数据存储在未正确锁定的内存中的原理是什么？",
    "CWE-591: 敏感数据存储在未正确锁定的内存中有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-cwe-413",
      "kind": "ChildOf"
    }
  ],
  "externalSources": [
    {
      "id": "cwe-591",
      "url": "https://cwe.mitre.org/data/definitions/591.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-591: 敏感数据存储在未正确锁定的内存中

## 缺陷定义

产品将敏感数据存储在未锁定或锁定不当的内存中，这可能导致内存被虚拟内存管理器写入磁盘上的交换文件中。这可能会使数据更容易被外部参与者访问。

## 机制与扩展说明

在 Windows 系统上，VirtualLock 函数可以锁定内存页，以确保其保留在内存中而不会被交换到磁盘。然而，在较旧的 Windows 版本（如 95、98 或 Me）上，VirtualLock() 函数只是一个存根（stub），并不提供任何保护。在 POSIX 系统上，mlock() 调用确保页面保持在内存中，但不能保证该页面不会出现在交换空间中。因此，它不适合作为敏感数据的保护机制。某些平台（尤其是 Linux）确实保证页面不会被交换，但这是非标准的，且不可移植。调用 mlock() 还需要管理员权限。必须检查这两个调用的返回值，以确保锁定操作确实成功。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
读取应用程序数据; 读取内存
范围：机密性
写入交换文件的敏感数据可能会被泄露。

## 预防与缓解措施

阶段
缓解措施
架构与设计
识别需要防止交换的数据，并选择适合平台的保护机制。
实施
检查返回值以确保锁定操作成功。

## 适用平台

此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。
语言 (复数)
类：非特定语言
(普遍程度未定)

## 引入阶段

不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。
阶段
说明
实施

## 官方英文定义（核对锚点）

Sensitive Data Storage in Improperly Locked Memory

The product stores sensitive data in memory that is not locked, or that has been incorrectly locked, which might cause the memory to be written to swap files on disk by the virtual memory manager. This can make the data more accessible to external actors.

## 编目边界

抽象级别：Variant；上游状态：Draft。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-591: 敏感数据存储在未正确锁定的内存中 / Sensitive Data Storage in Improperly Locked Memory](https://cwe.mitre.org/data/definitions/591.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/591.html)；官方英文定义与译文未逐句人工比对。
