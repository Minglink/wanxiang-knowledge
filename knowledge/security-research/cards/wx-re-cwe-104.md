---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-104",
  "title": "CWE-104: Struts：表单 Bean 未继承验证类",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-104",
    "输入验证"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "aeb3ba9297de22da2be440f138587b78675bd601ed9a8cc60e8be81881922976",
  "generatedHash": "8b616086aecab5b23ff8c9b888df9dc79cc2128cbf2063269afa94f9810de8f4",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "如果表单 bean 没有继承 Validator 框架的 ActionForm 子类，可能会使应用程序暴露于与输入验证不足相关的其他弱点中。",
  "l1": "如果表单 bean 没有继承 Validator 框架的 ActionForm 子类，可能会使应用程序暴露于与输入验证不足相关的其他弱点中。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 其他 范围：其他 绕过表单的验证框架会使应用程序面临多种类型的攻击。未经检查的输入是导致跨站脚本攻击 (XSS)、进程控制漏洞和 SQL 注入等漏洞的重要因素。 其他 范围：机密性、完整性、可用性、其他 尽管 J2EE 应用程序通常不易受到内存损坏攻击，但如果 J2EE 应用程序与不执行数组边界检查的本地代码交互，攻击者可能能够利用 J2EE 应用程",
  "questions": [
    "CWE-104: Struts：表单 Bean 未继承验证类的原理是什么？",
    "CWE-104: Struts：表单 Bean 未继承验证类有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "cwe-104",
      "url": "https://cwe.mitre.org/data/definitions/104.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-104: Struts：表单 Bean 未继承验证类

## 缺陷定义

如果表单 bean 没有继承 Validator 框架的 ActionForm 子类，可能会使应用程序暴露于与输入验证不足相关的其他弱点中。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
其他
范围：其他
绕过表单的验证框架会使应用程序面临多种类型的攻击。未经检查的输入是导致跨站脚本攻击 (XSS)、进程控制漏洞和 SQL 注入等漏洞的重要因素。
其他
范围：机密性、完整性、可用性、其他
尽管 J2EE 应用程序通常不易受到内存损坏攻击，但如果 J2EE 应用程序与不执行数组边界检查的本地代码交互，攻击者可能能够利用 J2EE 应用程序中的输入验证错误来发起缓冲区溢出攻击。

## 预防与缓解措施

阶段
缓解措施
实施
确保所有表单都继承自验证类之一。

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
实施

## 背景机制

为了使用 Struts Validator，表单必须继承以下类之一：ValidatorForm、ValidatorActionForm、DynaValidatorActionForm 或 DynaValidatorForm。必须继承这些类中的一个，因为 Struts Validator 通过在这些类中实现 validate() 方法与应用程序进行关联。从 ActionForm 和 DynaActionForm 类派生的表单无法使用 Struts Validator。

## 官方英文定义（核对锚点）

Struts: Form Bean Does Not Extend Validation Class

If a form bean does not extend an ActionForm subclass of the Validator framework, it can expose the application to other weaknesses related to insufficient input validation.

## 编目边界

抽象级别：Variant；上游状态：Draft。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-104: Struts：表单 Bean 未继承验证类 / Struts: Form Bean Does Not Extend Validation Class](https://cwe.mitre.org/data/definitions/104.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/104.html)；官方英文定义与译文未逐句人工比对。
