---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-572",
  "title": "CWE-572: 调用 Thread run() 而非 start()",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-572",
    "并发安全"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "06cdbb6949ebd43bc2f2bfa8c25acb551657c02797430f4e2f0a7a5115376cb2",
  "generatedHash": "476c918ac2ba1ff1644a62ab308c79059f35af4def8d9801e0658ba542497b4f",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "该产品调用线程的 run() 方法而不是 start() 方法，这会导致代码在调用者的线程中运行，而不是在被调用者的线程中运行。",
  "l1": "该产品调用线程的 run() 方法而不是 start() 方法，这会导致代码在调用者的线程中运行，而不是在被调用者的线程中运行。 在大多数情况下，直接调用 Thread 对象的 run() 方法是一个 bug。程序员的意图是启动一个新的控制线程，但却误调用了 run() 而非 start()，导致 run() 方法在调用者的控制线程中执行。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 质量下降；因情况而异 范围：其他 阶段 缓解措施 实施 使用 start() 方法而非 run() 方法。 方法 详细信息 自动化静态分析 自动静态分",
  "questions": [
    "CWE-572: 调用 Thread run() 而非 start()的原理是什么？",
    "CWE-572: 调用 Thread run() 而非 start()有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "cwe-572",
      "url": "https://cwe.mitre.org/data/definitions/572.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-572: 调用 Thread run() 而非 start()

## 缺陷定义

该产品调用线程的 run() 方法而不是 start() 方法，这会导致代码在调用者的线程中运行，而不是在被调用者的线程中运行。

## 机制与扩展说明

在大多数情况下，直接调用 Thread 对象的 run() 方法是一个 bug。程序员的意图是启动一个新的控制线程，但却误调用了 run() 而非 start()，导致 run() 方法在调用者的控制线程中执行。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
质量下降；因情况而异
范围：其他

## 预防与缓解措施

阶段
缓解措施
实施
使用 start() 方法而非 run() 方法。

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

## 官方英文定义（核对锚点）

Call to Thread run() instead of start()

The product calls a thread's run() method instead of calling start(), which causes the code to run in the thread of the caller instead of the callee.

## 编目边界

抽象级别：Variant；上游状态：Draft。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-572: 调用 Thread run() 而非 start() / Call to Thread run() instead of start()](https://cwe.mitre.org/data/definitions/572.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/572.html)；官方英文定义与译文未逐句人工比对。
