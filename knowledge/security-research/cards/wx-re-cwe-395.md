---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-395",
  "title": "CWE-395: 使用捕获 NullPointerException 来检测空指针解引用",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-395",
    "内存安全"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "374a4853f7b367b7e2c09b0b7951ec2480d643ce7567a73cc1c6d5f5710e2ead",
  "generatedHash": "261dd5e29acca3b7d1842bccd427e3421ae6ba1b00d18cf60c2e9a9ab27a8115",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "不应使用捕获 NullPointerException 作为防止空指针解引用的程序化检查的替代方法。",
  "l1": "不应使用捕获 NullPointerException 作为防止空指针解引用的程序化检查的替代方法。 程序员通常在三种情况下捕获 NullPointerException 程序包含空指针解引用。捕获由此产生的异常比修复根本问题更容易。 程序明确抛出 NullPointerException 以指示错误情况。 代码是测试工具的一部分，该工具向被测类提供意外的输入。 在这三种情况中，只有最后一种是可以接受的。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 DoS：资源消耗（CPU） 范围：可用性 阶段 缓解措施 架构与设计；实现 不要过度",
  "questions": [
    "CWE-395: 使用捕获 NullPointerException 来检测空指针解引用的原理是什么？",
    "CWE-395: 使用捕获 NullPointerException 来检测空指针解引用有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "cwe-395",
      "url": "https://cwe.mitre.org/data/definitions/395.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-395: 使用捕获 NullPointerException 来检测空指针解引用

## 缺陷定义

不应使用捕获 NullPointerException 作为防止空指针解引用的程序化检查的替代方法。

## 机制与扩展说明

程序员通常在三种情况下捕获 NullPointerException
程序包含空指针解引用。捕获由此产生的异常比修复根本问题更容易。
程序明确抛出 NullPointerException 以指示错误情况。
代码是测试工具的一部分，该工具向被测类提供意外的输入。
在这三种情况中，只有最后一种是可以接受的。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
DoS：资源消耗（CPU）
范围：可用性

## 预防与缓解措施

阶段
缓解措施
架构与设计；实现
不要过度依赖捕获异常（特别是用于验证用户输入）来处理错误。处理异常会降低应用程序的性能。

## 检测与审计方法

方法
详细信息
自动化静态分析 - 二进制或字节码
根据 SOAR [
REF-1479
]，以下检测技术可能有用
部分覆盖范围且具有成本效益
字节码弱点分析 - 包括反汇编器 + 源代码弱点分析
二进制弱点分析 - 包括反汇编器 + 源代码弱点分析
有效性：SOAR 部分
动态分析及人工结果解释
根据 SOAR [
REF-1479
]，以下检测技术可能有用
部分覆盖范围且具有成本效益
基于框架的模糊测试工具
有效性：SOAR 部分
人工静态分析 - 源代码
根据 SOAR [
REF-1479
]，以下检测技术可能有用
部分覆盖范围且具有成本效益
人工源代码审查 (非检查)
有效性：SOAR 部分
自动化静态分析 - 源代码
根据 SOAR [
REF-1479
]，以下检测技术可能有用
极具成本效益
源代码弱点分析器
上下文配置的源代码弱点分析器
有效性：高
架构或设计审查
根据 SOAR [
REF-1479
]，以下检测技术可能有用
极具成本效益
形式化方法 / 正确构造法
部分覆盖范围且具有成本效益
检查 (IEEE 1028 标准) (可应用于需求、设计、源代码等)
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

## 官方英文定义（核对锚点）

Use of NullPointerException Catch to Detect NULL Pointer Dereference

Catching NullPointerException should not be used as an alternative to programmatic checks to prevent dereferencing a null pointer.

## 编目边界

抽象级别：Base；上游状态：Draft。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-395: 使用捕获 NullPointerException 来检测空指针解引用 / Use of NullPointerException Catch to Detect NULL Pointer Dereference](https://cwe.mitre.org/data/definitions/395.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/395.html)；官方英文定义与译文未逐句人工比对。
