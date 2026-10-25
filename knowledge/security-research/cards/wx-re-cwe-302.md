---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-302",
  "title": "CWE-302: 基于假设不可变数据的身份验证绕过",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-302",
    "身份与权限"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "7d0a78f491648de7afe0431e276ed5c0723e045462a555a76e47e636ace30aaf",
  "generatedHash": "9045bb9fa78cfdffc65ee085bb6e852eca83af25240cf2c4208dfe40fe52bd73",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "身份验证方案或实现使用了被假定为不可变的密钥数据元素，但这些元素可以被攻击者控制或修改。",
  "l1": "身份验证方案或实现使用了被假定为不可变的密钥数据元素，但这些元素可以被攻击者控制或修改。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 绕过保护机制 范围: 访问控制 阶段 缓解措施 架构与设计；操作；实现 对不可变数据（例如环境变量、隐藏表单字段等）实施适当的保护 此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。 语言 (复数) 类：非特定语言 (普遍程度未定) 技术 类：非特定于技术 (流行度未确定) 类别：基于 Web (有时普遍存在) ",
  "questions": [
    "CWE-302: 基于假设不可变数据的身份验证绕过的原理是什么？",
    "CWE-302: 基于假设不可变数据的身份验证绕过有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-cwe-807",
      "kind": "ChildOf"
    }
  ],
  "externalSources": [
    {
      "id": "cwe-302",
      "url": "https://cwe.mitre.org/data/definitions/302.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-302: 基于假设不可变数据的身份验证绕过

## 缺陷定义

身份验证方案或实现使用了被假定为不可变的密钥数据元素，但这些元素可以被攻击者控制或修改。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
绕过保护机制
范围: 访问控制

## 预防与缓解措施

阶段
缓解措施
架构与设计；操作；实现
对不可变数据（例如环境变量、隐藏表单字段等）实施适当的保护

## 适用平台

此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。
语言 (复数)
类：非特定语言
(普遍程度未定)
技术
类：非特定于技术
(流行度未确定)
类别：基于 Web
(有时普遍存在)

## 引入阶段

不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。
阶段
说明
架构与设计
委员会：此弱点是指与架构安全策略相关的不正确设计。
实施

## 官方英文定义（核对锚点）

Authentication Bypass by Assumed-Immutable Data

The authentication scheme or implementation uses key data elements that are assumed to be immutable, but can be controlled or modified by the attacker.

## 编目边界

抽象级别：Base；上游状态：Incomplete。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-302: 基于假设不可变数据的身份验证绕过 / Authentication Bypass by Assumed-Immutable Data](https://cwe.mitre.org/data/definitions/302.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/302.html)；官方英文定义与译文未逐句人工比对。
