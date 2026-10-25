---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-663",
  "title": "CWE-663：在并发上下文中调用非重入函数",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-663",
    "并发安全"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "602e8005ba3769a546fb68e6fefc3f394dd94e994cae3a880e89a4d8eff9baff",
  "generatedHash": "c7d6503986aa9fbdcb54ca818f65f44de1dbb59f0f2e45dac8c3b046551a2736",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "产品在并发上下文中调用非重入函数，在该上下文中，竞争的代码序列（例如线程或信号处理程序）可能有机会调用同一个函数或以其他方式影响其状态。",
  "l1": "产品在并发上下文中调用非重入函数，在该上下文中，竞争的代码序列（例如线程或信号处理程序）可能有机会调用同一个函数或以其他方式影响其状态。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 修改内存；读取内存；修改应用程序数据；读取应用程序数据；篡改执行逻辑 范围：完整性，机密性，其他 阶段 缓解措施 实施 如果可用，请使用可重入函数。 实施 为您的非重入函数添加同步机制。 实施 在 Java 中，使用 ReentrantLock 类。 方法 详细信息 自动化静态分析 自动静态分析，通常称为静态应用程序安全测试 (SAST)，可以通过分析源",
  "questions": [
    "CWE-663：在并发上下文中调用非重入函数的原理是什么？",
    "CWE-663：在并发上下文中调用非重入函数有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "cwe-663",
      "url": "https://cwe.mitre.org/data/definitions/663.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-663：在并发上下文中调用非重入函数

## 缺陷定义

产品在并发上下文中调用非重入函数，在该上下文中，竞争的代码序列（例如线程或信号处理程序）可能有机会调用同一个函数或以其他方式影响其状态。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
修改内存；读取内存；修改应用程序数据；读取应用程序数据；篡改执行逻辑
范围：完整性，机密性，其他

## 预防与缓解措施

阶段
缓解措施
实施
如果可用，请使用可重入函数。
实施
为您的非重入函数添加同步机制。
实施
在 Java 中，使用 ReentrantLock 类。

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
C
(流行度未定)

## 引入阶段

不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。
阶段
说明
实施

## 官方英文定义（核对锚点）

Use of a Non-reentrant Function in a Concurrent Context

The product calls a non-reentrant function in a concurrent context in which a competing code sequence (e.g. thread or signal handler) may have an opportunity to call the same function or otherwise influence its state.

## 编目边界

抽象级别：Base；上游状态：Draft。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-663：在并发上下文中调用非重入函数 / Use of a Non-reentrant Function in a Concurrent Context](https://cwe.mitre.org/data/definitions/663.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/663.html)；官方英文定义与译文未逐句人工比对。
