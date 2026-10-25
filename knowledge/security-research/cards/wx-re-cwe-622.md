---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-622",
  "title": "CWE-622: 函数钩子参数验证不当 (Improper Validation of Function Hook Arguments)",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-622",
    "输入验证"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "4c002346c2c7ad97238a39ba1b43201097504c46940e5a5a3c4a48491c856612",
  "generatedHash": "7bb230ad57de4e5c89ba1ed8b6c4cb0adfad46b42132c04509f394a5cce73e93",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "产品向用户可访问的 API 函数添加钩子，但未正确验证参数。这可能导致由此产生的漏洞。",
  "l1": "产品向用户可访问的 API 函数添加钩子，但未正确验证参数。这可能导致由此产生的漏洞。 此类钩子可用于具有特权的防御性软件（如反病毒软件或防火墙），这些软件会钩住内核调用。当参数未经过验证时，它们可能会被用于绕过保护机制或攻击产品本身。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 非预期状态 范围：完整性 阶段 缓解措施 架构与设计 确保所有参数都按照您所保护的 API 的定义进行了验证。 架构与设计 如果可能，在调用此类函数之前降低特权。 此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、",
  "questions": [
    "CWE-622: 函数钩子参数验证不当 (Improper Validation of Function Hook Arguments)的原理是什么？",
    "CWE-622: 函数钩子参数验证不当 (Improper Validation of Function Hook Arguments)有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-cwe-20",
      "kind": "ChildOf"
    }
  ],
  "externalSources": [
    {
      "id": "cwe-622",
      "url": "https://cwe.mitre.org/data/definitions/622.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-622: 函数钩子参数验证不当 (Improper Validation of Function Hook Arguments)

## 缺陷定义

产品向用户可访问的 API 函数添加钩子，但未正确验证参数。这可能导致由此产生的漏洞。

## 机制与扩展说明

此类钩子可用于具有特权的防御性软件（如反病毒软件或防火墙），这些软件会钩住内核调用。当参数未经过验证时，它们可能会被用于绕过保护机制或攻击产品本身。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
非预期状态
范围：完整性

## 预防与缓解措施

阶段
缓解措施
架构与设计
确保所有参数都按照您所保护的 API 的定义进行了验证。
架构与设计
如果可能，在调用此类函数之前降低特权。

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

Improper Validation of Function Hook Arguments

The product adds hooks to user-accessible API functions, but it does not properly validate the arguments. This could lead to resultant vulnerabilities.

## 编目边界

抽象级别：Variant；上游状态：Draft。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-622: 函数钩子参数验证不当 (Improper Validation of Function Hook Arguments) / Improper Validation of Function Hook Arguments](https://cwe.mitre.org/data/definitions/622.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/622.html)；官方英文定义与译文未逐句人工比对。
