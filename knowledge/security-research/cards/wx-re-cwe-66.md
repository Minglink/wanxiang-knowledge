---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-66",
  "title": "CWE-66: 对标识虚拟资源的文件名处理不当",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-66",
    "文件与路径"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "0137a0ea1ffc815d16e6ff8839c3e6a30ea77195566d8f18135f2605f7a6aa3c",
  "generatedHash": "82be2c114cb2b7aedbffb8dd85c4b09c766d4544d5cf4b8655f327fa31ac4c68",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "产品未处理或错误地处理了一个标识“虚拟”资源的文件名，该资源未在与文件名关联的目录内明确指定，导致产品对非文件资源执行基于文件的操作。",
  "l1": "产品未处理或错误地处理了一个标识“虚拟”资源的文件名，该资源未在与文件名关联的目录内明确指定，导致产品对非文件资源执行基于文件的操作。 虚拟文件名表现得像普通文件名，但它们实际上是其他资源的别名，其行为与普通文件不同。根据其功能，它们可能是替代实体。它们未必会列在目录中。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 其他 范围：其他 方法 详细信息 自动化静态分析 - 二进制或字节码 根据 SOAR [ REF-1479 ]，以下检测技术可能有用： 部分覆盖范围且具有成本效益 字节码弱点分析 - 包括反汇编器 + 源代码弱点分析 有",
  "questions": [
    "CWE-66: 对标识虚拟资源的文件名处理不当的原理是什么？",
    "CWE-66: 对标识虚拟资源的文件名处理不当有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "cwe-66",
      "url": "https://cwe.mitre.org/data/definitions/66.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-66: 对标识虚拟资源的文件名处理不当

## 缺陷定义

产品未处理或错误地处理了一个标识“虚拟”资源的文件名，该资源未在与文件名关联的目录内明确指定，导致产品对非文件资源执行基于文件的操作。

## 机制与扩展说明

虚拟文件名表现得像普通文件名，但它们实际上是其他资源的别名，其行为与普通文件不同。根据其功能，它们可能是替代实体。它们未必会列在目录中。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
其他
范围：其他

## 检测与审计方法

方法
详细信息
自动化静态分析 - 二进制或字节码
根据 SOAR [
REF-1479
]，以下检测技术可能有用：
部分覆盖范围且具有成本效益
字节码弱点分析 - 包括反汇编器 + 源代码弱点分析
有效性：SOAR 部分
人工静态分析 - 二进制或字节码
根据 SOAR [
REF-1479
]，以下检测技术可能有用：
部分覆盖范围且具有成本效益
二进制/字节码反汇编器 - 然后使用人工分析漏洞和异常
有效性：SOAR 部分
具有自动化结果解释的动态分析
根据 SOAR [
REF-1479
]，以下检测技术可能有用：
部分覆盖范围且具有成本效益
Web 应用扫描器
Web 服务扫描器
数据库扫描器
有效性：SOAR 部分
动态分析及人工结果解释
根据 SOAR [
REF-1479
]，以下检测技术可能有用：
部分覆盖范围且具有成本效益
模糊测试工具 (Fuzz Tester)
基于框架的模糊测试工具
有效性：SOAR 部分
人工静态分析 - 源代码
根据 SOAR [
REF-1479
]，以下检测技术可能有用：
极具成本效益
聚焦式人工抽查 - 对源代码进行聚焦式人工分析
人工源代码审查 (非检查)
有效性：高
自动化静态分析 - 源代码
根据 SOAR [
REF-1479
]，以下检测技术可能有用：
部分覆盖范围且具有成本效益
源代码弱点分析器
上下文配置的源代码弱点分析器
有效性：SOAR 部分
架构或设计审查
根据 SOAR [
REF-1479
]，以下检测技术可能有用：
极具成本效益
形式化方法 / 正确构造法
部分覆盖范围且具有成本效益
检查 (IEEE 1028 标准) (可应用于需求、设计、源代码等)
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
运营

## 官方英文定义（核对锚点）

Improper Handling of File Names that Identify Virtual Resources

The product does not handle or incorrectly handles a file name that identifies a "virtual" resource that is not directly specified within the directory that is associated with the file name, causing the product to perform file-based operations on a resource that is not a file.

## 编目边界

抽象级别：Base；上游状态：Draft。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-66: 对标识虚拟资源的文件名处理不当 / Improper Handling of File Names that Identify Virtual Resources](https://cwe.mitre.org/data/definitions/66.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/66.html)；官方英文定义与译文未逐句人工比对。
