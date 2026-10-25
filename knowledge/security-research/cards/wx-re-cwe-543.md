---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-543",
  "title": "CWE-543: 在多线程上下文中未使用同步的单例模式",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-543",
    "并发安全"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "46826a30bac43235a618c79536ba45533bd6458d345fd3a83a70db6037d1707f",
  "generatedHash": "cc9096d0cfe4eb49ee2b2eb189f6dbec8f384c2c775c5f4ccf736920cdc38f1a",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "产品在多线程环境中创建资源时使用了单例模式。",
  "l1": "产品在多线程环境中创建资源时使用了单例模式。 单例模式的使用可能不是线程安全的。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 其他；修改应用程序数据 范围：其他，完整性 阶段 缓解措施 架构与设计 使用线程特定存储模式（Thread-Specific Storage Pattern）。参见参考文献。 实施 不要使用成员字段在 Servlet 中存储信息。在多线程环境中，将用户数据存储在 Servlet 成员字段中会引入数据访问竞争条件。 实施 在无法保证线程安全的语言版本中，避免使用双重检查锁定模式（Double-checked l",
  "questions": [
    "CWE-543: 在多线程上下文中未使用同步的单例模式的原理是什么？",
    "CWE-543: 在多线程上下文中未使用同步的单例模式有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "cwe-543",
      "url": "https://cwe.mitre.org/data/definitions/543.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-543: 在多线程上下文中未使用同步的单例模式

## 缺陷定义

产品在多线程环境中创建资源时使用了单例模式。

## 机制与扩展说明

单例模式的使用可能不是线程安全的。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
其他；修改应用程序数据
范围：其他，完整性

## 预防与缓解措施

阶段
缓解措施
架构与设计
使用线程特定存储模式（Thread-Specific Storage Pattern）。参见参考文献。
实施
不要使用成员字段在 Servlet 中存储信息。在多线程环境中，将用户数据存储在 Servlet 成员字段中会引入数据访问竞争条件。
实施
在无法保证线程安全的语言版本中，避免使用双重检查锁定模式（Double-checked locking）。该模式可用于避免同步调用的开销，但在某些 Java 版本（例如）中，已被证明是不安全的，因为它仍然会引入竞争条件 (
CWE-209
)。
有效性：有限

## 检测与审计方法

方法
详细信息
自动化静态分析
自动静态分析，通常称为静态应用程序安全测试 (SAST)，可以通过分析源代码（或二进制/编译代码）而无需执行它来发现此弱点的某些实例。通常，这是通过构建数据流和控制流的模型，然后搜索连接“源”（输入的起源）和“汇”（数据与外部组件、操作系统等较低层交互的目的地）的潜在易受攻击的模式来完成的。

## 适用平台

此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。
语言 (复数)
Java
(流行程度未定)
C++
(流行度未确定)

## 引入阶段

不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。
阶段
说明
实施

## 官方英文定义（核对锚点）

Use of Singleton Pattern Without Synchronization in a Multithreaded Context

The product uses the singleton pattern when creating a resource within a multithreaded environment.

## 编目边界

抽象级别：Variant；上游状态：Incomplete。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-543: 在多线程上下文中未使用同步的单例模式 / Use of Singleton Pattern Without Synchronization in a Multithreaded Context](https://cwe.mitre.org/data/definitions/543.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/543.html)；官方英文定义与译文未逐句人工比对。
