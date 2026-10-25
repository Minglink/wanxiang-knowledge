---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-305",
  "title": "CWE-305: 由主要弱点导致的身份验证绕过",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-305",
    "身份与权限"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "3b995639540c6c91973394cba79d07f37c9a06d869707370e9995a0da4b00162",
  "generatedHash": "da8ead02ab37d1ceee2cc2cf8275f942992c4669c3e09a167b45e03735b45055",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "身份验证算法本身是合理的，但实现的机制可以被绕过，这是该身份验证错误的主要原因导致的单独弱点的结果。",
  "l1": "身份验证算法本身是合理的，但实现的机制可以被绕过，这是该身份验证错误的主要原因导致的单独弱点的结果。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 绕过保护机制 范围: 访问控制 此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。 语言 (复数) 类：非特定语言 (普遍程度未定) 不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。 阶段 说明 实施 实现：",
  "questions": [
    "CWE-305: 由主要弱点导致的身份验证绕过的原理是什么？",
    "CWE-305: 由主要弱点导致的身份验证绕过有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "cwe-305",
      "url": "https://cwe.mitre.org/data/definitions/305.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-305: 由主要弱点导致的身份验证绕过

## 缺陷定义

身份验证算法本身是合理的，但实现的机制可以被绕过，这是该身份验证错误的主要原因导致的单独弱点的结果。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
绕过保护机制
范围: 访问控制

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
实现：此弱点是在实现架构安全策略期间导致的。

## 补充说明与边界

关系
大多数“身份验证绕过”错误是结果性的，而非原发的。

## 官方英文定义（核对锚点）

Authentication Bypass by Primary Weakness

The authentication algorithm is sound, but the implemented mechanism can be bypassed as the result of a separate weakness that is primary to the authentication error.

## 编目边界

抽象级别：Base；上游状态：Draft。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-305: 由主要弱点导致的身份验证绕过 / Authentication Bypass by Primary Weakness](https://cwe.mitre.org/data/definitions/305.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/305.html)；官方英文定义与译文未逐句人工比对。
