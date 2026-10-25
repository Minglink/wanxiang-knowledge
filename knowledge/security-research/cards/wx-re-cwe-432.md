---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-432",
  "title": "CWE-432: 执行敏感操作时未禁用危险信号处理程序",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-432"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "bd4a87e729a51e1d9dcc84a7499ec92fda67a1ac4e219f08a5c4e2be96470f28",
  "generatedHash": "e4a632cdf1681f03a8cce5ba5fe93342deb12257fe129b0efb3809211adef48a",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "产品使用了一个与其他信号处理程序共享状态的信号处理程序，但它未能正确屏蔽或防止在原始信号处理程序仍在运行时调用这些信号处理程序。",
  "l1": "产品使用了一个与其他信号处理程序共享状态的信号处理程序，但它未能正确屏蔽或防止在原始信号处理程序仍在运行时调用这些信号处理程序。 在信号处理程序执行期间，当发送另一个不同的信号时，它可以被另一个处理程序中断。如果这两个处理程序共享状态（例如全局变量），那么攻击者可以在第一个处理程序完成执行之前发送另一个信号，从而破坏该状态。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 修改应用程序数据 范围：完整性 阶段 缓解措施 实施 在执行敏感操作时，关闭危险的处理程序。 此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操",
  "questions": [
    "CWE-432: 执行敏感操作时未禁用危险信号处理程序的原理是什么？",
    "CWE-432: 执行敏感操作时未禁用危险信号处理程序有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-cwe-364",
      "kind": "ChildOf"
    }
  ],
  "externalSources": [
    {
      "id": "cwe-432",
      "url": "https://cwe.mitre.org/data/definitions/432.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-432: 执行敏感操作时未禁用危险信号处理程序

## 缺陷定义

产品使用了一个与其他信号处理程序共享状态的信号处理程序，但它未能正确屏蔽或防止在原始信号处理程序仍在运行时调用这些信号处理程序。

## 机制与扩展说明

在信号处理程序执行期间，当发送另一个不同的信号时，它可以被另一个处理程序中断。如果这两个处理程序共享状态（例如全局变量），那么攻击者可以在第一个处理程序完成执行之前发送另一个信号，从而破坏该状态。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
修改应用程序数据
范围：完整性

## 预防与缓解措施

阶段
缓解措施
实施
在执行敏感操作时，关闭危险的处理程序。

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

Dangerous Signal Handler not Disabled During Sensitive Operations

The product uses a signal handler that shares state with other signal handlers, but it does not properly mask or prevent those signal handlers from being invoked while the original signal handler is still running.

## 编目边界

抽象级别：Base；上游状态：Draft。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-432: 执行敏感操作时未禁用危险信号处理程序 / Dangerous Signal Handler not Disabled During Sensitive Operations](https://cwe.mitre.org/data/definitions/432.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/432.html)；官方英文定义与译文未逐句人工比对。
