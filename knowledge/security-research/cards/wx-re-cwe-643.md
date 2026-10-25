---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-643",
  "title": "CWE-643: 对 XPath 表达式中的数据中和不当（“XPath 注入”）",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-643",
    "文件与路径",
    "输入验证"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "4b869d5a959c80b8d213f386417a7c17e22e21d67c5575a2962cefc8e8fd8430",
  "generatedHash": "53e8d96d1c2cf72a0a8e0d9822ddbd93b7038abd1a16791095cb6212140be523",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "产品使用外部输入来动态构建用于从 XML 数据库检索数据的 XPath 表达式，但它没有中和或错误地中和了该输入。这允许攻击者控制查询的结构。",
  "l1": "产品使用外部输入来动态构建用于从 XML 数据库检索数据的 XPath 表达式，但它没有中和或错误地中和了该输入。这允许攻击者控制查询的结构。 其最终后果是攻击者将能够控制从 XML 数据库中查询到的信息，并可能利用这种能力来控制应用程序流程、修改逻辑、检索未经授权的数据或绕过重要检查（例如身份验证）。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 绕过保护机制 范围: 访问控制 控制应用程序流程（例如绕过身份验证）。 读取应用程序数据 范围：机密性 攻击者可以读取受限的 XML 内容。 阶段 缓解措施 实施 使用参数化 XPath ",
  "questions": [
    "CWE-643: 对 XPath 表达式中的数据中和不当（“XPath 注入”）的原理是什么？",
    "CWE-643: 对 XPath 表达式中的数据中和不当（“XPath 注入”）有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-cwe-91",
      "kind": "ChildOf"
    }
  ],
  "externalSources": [
    {
      "id": "cwe-643",
      "url": "https://cwe.mitre.org/data/definitions/643.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-643: 对 XPath 表达式中的数据中和不当（“XPath 注入”）

## 缺陷定义

产品使用外部输入来动态构建用于从 XML 数据库检索数据的 XPath 表达式，但它没有中和或错误地中和了该输入。这允许攻击者控制查询的结构。

## 机制与扩展说明

其最终后果是攻击者将能够控制从 XML 数据库中查询到的信息，并可能利用这种能力来控制应用程序流程、修改逻辑、检索未经授权的数据或绕过重要检查（例如身份验证）。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
绕过保护机制
范围: 访问控制
控制应用程序流程（例如绕过身份验证）。
读取应用程序数据
范围：机密性
攻击者可以读取受限的 XML 内容。

## 预防与缓解措施

阶段
缓解措施
实施
使用参数化 XPath 查询（例如使用 XQuery）。这将有助于确保数据平面与控制平面之间的隔离。
实施
正确验证用户输入。在适当的情况下拒绝数据、过滤数据或转义数据。确保在 XPath 查询中使用的输入在该上下文中是安全的。

## 检测与审计方法

方法
详细信息
自动化静态分析
自动静态分析，通常称为静态应用程序安全测试 (SAST)，可以通过分析源代码（或二进制/编译代码）而无需执行它来发现此弱点的某些实例。通常，这是通过构建数据流和控制流的模型，然后搜索连接“源”（输入的起源）和“汇”（数据与外部组件、操作系统等较低层交互的目的地）的潜在易受攻击的模式来完成的。
有效性：高

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
此弱点类似于其他启用注入式攻击的弱点，例如 SQL 注入、命令注入和 LDAP 注入。主要区别在于此处的攻击目标是 XML 数据库。

## 官方英文定义（核对锚点）

Improper Neutralization of Data within XPath Expressions ('XPath Injection')

The product uses external input to dynamically construct an XPath expression used to retrieve data from an XML database, but it does not neutralize or incorrectly neutralizes that input. This allows an attacker to control the structure of the query.

## 编目边界

抽象级别：Base；上游状态：Incomplete。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-643: 对 XPath 表达式中的数据中和不当（“XPath 注入”） / Improper Neutralization of Data within XPath Expressions ('XPath Injection')](https://cwe.mitre.org/data/definitions/643.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/643.html)；官方英文定义与译文未逐句人工比对。
