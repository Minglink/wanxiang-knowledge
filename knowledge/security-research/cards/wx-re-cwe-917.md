---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-917",
  "title": "CWE-917: 未对表达式语言语句中使用的特殊元素进行充分净化（“表达式语言注入”）",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-917",
    "输入验证"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "d87cefd2d55c8a677c0ca07360bacb08b61897a56cc8ff4ee9c9e0afaaa8c664",
  "generatedHash": "0ee55ee5bc165b5b40610017de43471f26de56ce1edbf8a98ac924bdef8fc79e",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "产品使用来自上游组件的外部影响输入，在 Java Server Page (JSP) 等框架中构建全部或部分表达式语言 (EL) 语句，但在执行之前，未对可能修改预期 EL 语句的特殊元素进行净化或净化不当。",
  "l1": "产品使用来自上游组件的外部影响输入，在 Java Server Page (JSP) 等框架中构建全部或部分表达式语言 (EL) 语句，但在执行之前，未对可能修改预期 EL 语句的特殊元素进行净化或净化不当。 Java Server Page (JSP) 等框架允许开发人员在原本静态的内容中插入可执行表达式。如果开发人员没有意识到这些表达式的可执行性质和/或没有禁用它们，那么如果攻击者能够注入表达式，就可能导致代码执行或其他意外行为。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 读取应用程序数据 范围：机密性 执行未经授权的代码或命",
  "questions": [
    "CWE-917: 未对表达式语言语句中使用的特殊元素进行充分净化（“表达式语言注入”）的原理是什么？",
    "CWE-917: 未对表达式语言语句中使用的特殊元素进行充分净化（“表达式语言注入”）有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "cwe-917",
      "url": "https://cwe.mitre.org/data/definitions/917.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-917: 未对表达式语言语句中使用的特殊元素进行充分净化（“表达式语言注入”）

## 缺陷定义

产品使用来自上游组件的外部影响输入，在 Java Server Page (JSP) 等框架中构建全部或部分表达式语言 (EL) 语句，但在执行之前，未对可能修改预期 EL 语句的特殊元素进行净化或净化不当。

## 机制与扩展说明

Java Server Page (JSP) 等框架允许开发人员在原本静态的内容中插入可执行表达式。如果开发人员没有意识到这些表达式的可执行性质和/或没有禁用它们，那么如果攻击者能够注入表达式，就可能导致代码执行或其他意外行为。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
读取应用程序数据
范围：机密性
执行未经授权的代码或命令
范围：完整性

## 预防与缓解措施

阶段
缓解措施
架构与设计
尽可能避免将用户可控的数据添加到表达式解释器中。
实施
如果必须将用户可控的数据添加到表达式解释器，则应执行以下一项或多项操作：
验证用户输入是否不会被解析为表达式
以确保其不会被评估为表达式的方式对用户输入进行编码
系统配置；操作
框架或工具可能允许开发人员禁用或取消激活 EL 表达式的处理，例如将 JSP 页面的 isELIgnored 属性设置为“true”。

## 检测与审计方法

方法
详细信息
自动化静态分析
自动静态分析，通常称为静态应用程序安全测试 (SAST)，可以通过分析源代码（或二进制/编译代码）而无需执行它来发现此弱点的某些实例。通常，这是通过构建数据流和控制流的模型，然后搜索连接“源”（输入的起源）和“汇”（数据与外部组件、操作系统等较低层交互的目的地）的潜在易受攻击的模式来完成的。
有效性：高

## 适用平台

此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。
语言 (复数)
Java
(流行程度未定)

## 引入阶段

不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。
阶段
说明
架构与设计
实施

## 补充说明与边界

关系
在某些版本的 Spring 3.0.5 及更早版本中，存在一个漏洞 (CVE-2011-2730)，其中表达式语言标签会被执行两次，这有效地使任何应用程序都面临 EL 注入的风险。然而，即使在更高版本中，这种缺陷也可能根据配置而存在。
维护
CWE-917
和
CWE-1336
之间的相互关系和差异需要进一步澄清。

## 官方英文定义（核对锚点）

Improper Neutralization of Special Elements used in an Expression Language Statement ('Expression Language Injection')

The product constructs all or part of an expression language (EL) statement in a framework such as a Java Server Page (JSP) using externally-influenced input from an upstream component, but it does not neutralize or incorrectly neutralizes special elements that could modify the intended EL statement before it is executed.

## 编目边界

抽象级别：Base；上游状态：Incomplete。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-917: 未对表达式语言语句中使用的特殊元素进行充分净化（“表达式语言注入”） / Improper Neutralization of Special Elements used in an Expression Language Statement ('Expression Language Injection')](https://cwe.mitre.org/data/definitions/917.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/917.html)；官方英文定义与译文未逐句人工比对。
