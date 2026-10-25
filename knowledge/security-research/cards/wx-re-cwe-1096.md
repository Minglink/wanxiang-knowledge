---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-1096",
  "title": "CWE-1096: 未使用适当锁或同步创建单例类实例",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-1096",
    "并发安全"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "92930a23cd527328340dc1504dac6d0029e1015e03158113012e6d5be1abf013",
  "generatedHash": "da23bed0483243330bf299dda78ee102743a3d5924cccd8f64acbdc7dec8334d",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "产品实现了单例设计模式，但没有使用适当的锁定或其他同步机制来确保单例类仅被实例化一次。",
  "l1": "产品实现了单例设计模式，但没有使用适当的锁定或其他同步机制来确保单例类仅被实例化一次。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 降低可靠性 范围：其他 此问题可能会导致产品无法可靠运行，例如通过使实例化过程非线程安全并引入死锁 ( CWE-833 ) 或活锁条件。如果攻击者可以触及相关代码，那么这种可靠性问题可能会引入漏洞。 此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。 语言 (复数) 类：非特定语言 (普遍程度未定) 不同的引入模式",
  "questions": [
    "CWE-1096: 未使用适当锁或同步创建单例类实例的原理是什么？",
    "CWE-1096: 未使用适当锁或同步创建单例类实例有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "cwe-1096",
      "url": "https://cwe.mitre.org/data/definitions/1096.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-1096: 未使用适当锁或同步创建单例类实例

## 缺陷定义

产品实现了单例设计模式，但没有使用适当的锁定或其他同步机制来确保单例类仅被实例化一次。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
降低可靠性
范围：其他
此问题可能会导致产品无法可靠运行，例如通过使实例化过程非线程安全并引入死锁 (
CWE-833
) 或活锁条件。如果攻击者可以触及相关代码，那么这种可靠性问题可能会引入漏洞。

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

## 官方英文定义（核对锚点）

Singleton Class Instance Creation without Proper Locking or Synchronization

The product implements a Singleton design pattern but does not use appropriate locking or other synchronization mechanism to ensure that the singleton class is only instantiated once.

## 编目边界

抽象级别：Variant；上游状态：Incomplete。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-1096: 未使用适当锁或同步创建单例类实例 / Singleton Class Instance Creation without Proper Locking or Synchronization](https://cwe.mitre.org/data/definitions/1096.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/1096.html)；官方英文定义与译文未逐句人工比对。
