---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-681",
  "title": "CWE-681: 数值类型之间的错误转换",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-681",
    "整数与类型"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ab23c9094ca0397f8f4575c434eeddaf4ec5a7fdabfca1c60666a47521494394",
  "generatedHash": "cc41bebfd6b8858f53370cd1ab9bc2bdd3ea86883307fd6dbc1be46b9d7049e4",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "在将一种数据类型转换为另一种数据类型（例如长整型转换为整数）时，数据可能会以导致产生意外值的方式被省略或翻译。如果产生的结果值被用于敏感环境中，则可能会发生危险的行为。",
  "l1": "在将一种数据类型转换为另一种数据类型（例如长整型转换为整数）时，数据可能会以导致产生意外值的方式被省略或翻译。如果产生的结果值被用于敏感环境中，则可能会发生危险的行为。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 意外状态；质量下降 范围：其他，完整性 程序最终可能会使用错误的数字并产生不正确的结果。如果该数字被用于分配资源或做出安全决策，则可能会引入漏洞。 阶段 缓解措施 实施 避免在数值类型之间进行转换。务必检查允许的范围。 方法 详细信息 自动化静态分析 自动静态分析，通常称为静态应用程序安全测试 (SAST)，可以通过分析源",
  "questions": [
    "CWE-681: 数值类型之间的错误转换的原理是什么？",
    "CWE-681: 数值类型之间的错误转换有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-cwe-704",
      "kind": "ChildOf"
    },
    {
      "to": "wx-re-cwe-682",
      "kind": "CanPrecede"
    }
  ],
  "externalSources": [
    {
      "id": "cwe-681",
      "url": "https://cwe.mitre.org/data/definitions/681.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-681: 数值类型之间的错误转换

## 缺陷定义

在将一种数据类型转换为另一种数据类型（例如长整型转换为整数）时，数据可能会以导致产生意外值的方式被省略或翻译。如果产生的结果值被用于敏感环境中，则可能会发生危险的行为。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
意外状态；质量下降
范围：其他，完整性
程序最终可能会使用错误的数字并产生不正确的结果。如果该数字被用于分配资源或做出安全决策，则可能会引入漏洞。

## 预防与缓解措施

阶段
缓解措施
实施
避免在数值类型之间进行转换。务必检查允许的范围。

## 检测与审计方法

方法
详细信息
自动化静态分析
自动静态分析，通常称为静态应用程序安全测试 (SAST)，可以通过分析源代码（或二进制/编译代码）而无需执行它来发现此弱点的某些实例。通常，这是通过构建数据流和控制流的模型，然后搜索连接“源”（输入的起源）和“汇”（数据与外部组件、操作系统等较低层交互的目的地）的潜在易受攻击的模式来完成的。
有效性：高

## 适用平台

此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。
语言 (复数)
C
(流行度未定)
类：非特定语言
(普遍程度未定)
技术
类：非特定于技术
(流行度未确定)

## 引入阶段

不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。
阶段
说明
实施

## 官方英文定义（核对锚点）

Incorrect Conversion between Numeric Types

When converting from one data type to another, such as long to integer, data can be omitted or translated in a way that produces unexpected values. If the resulting values are used in a sensitive context, then dangerous behaviors may occur.

## 编目边界

抽象级别：Base；上游状态：Draft。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-681: 数值类型之间的错误转换 / Incorrect Conversion between Numeric Types](https://cwe.mitre.org/data/definitions/681.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/681.html)；官方英文定义与译文未逐句人工比对。
