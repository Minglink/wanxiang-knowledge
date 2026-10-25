---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-1325",
  "title": "CWE-1325: 未正确控制的顺序内存分配",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-1325",
    "内存安全"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "e6af0fb16222cea5838ac0bb7350d0b05b1b629c1e4a7d7e2f8ba13b446f8023",
  "generatedHash": "fc4d6a0e00d000e49ad9d3a70299bc96b7da81776f2f6e6d118f71d63c3337a4",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "产品管理一组对象或资源，并为每个对象执行单独的内存分配，但它没有正确限制所有组合对象消耗的内存总量。",
  "l1": "产品管理一组对象或资源，并为每个对象执行单独的内存分配，但它没有正确限制所有组合对象消耗的内存总量。 尽管产品可能会限制单个操作中为单个对象（例如数组的 malloc）分配的内存量，但如果攻击者能够导致在单独的操作中分配多个对象，那么这可能会导致比开发人员预期更高的总内存消耗，从而导致拒绝服务。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 DoS: 资源消耗（内存） 范围：可用性 未能控制内存分配可能导致请求过多的系统内存，可能因内存不足而导致应用程序崩溃，或系统上消耗大量内存。 阶段 缓解措施 实施 确保对同类对象的多次分配进行适",
  "questions": [
    "CWE-1325: 未正确控制的顺序内存分配的原理是什么？",
    "CWE-1325: 未正确控制的顺序内存分配有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-cwe-770",
      "kind": "ChildOf"
    },
    {
      "to": "wx-re-cwe-789",
      "kind": "PeerOf"
    },
    {
      "to": "wx-re-cwe-476",
      "kind": "CanPrecede"
    }
  ],
  "externalSources": [
    {
      "id": "cwe-1325",
      "url": "https://cwe.mitre.org/data/definitions/1325.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-1325: 未正确控制的顺序内存分配

## 缺陷定义

产品管理一组对象或资源，并为每个对象执行单独的内存分配，但它没有正确限制所有组合对象消耗的内存总量。

## 机制与扩展说明

尽管产品可能会限制单个操作中为单个对象（例如数组的 malloc）分配的内存量，但如果攻击者能够导致在单独的操作中分配多个对象，那么这可能会导致比开发人员预期更高的总内存消耗，从而导致拒绝服务。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
DoS: 资源消耗（内存）
范围：可用性
未能控制内存分配可能导致请求过多的系统内存，可能因内存不足而导致应用程序崩溃，或系统上消耗大量内存。

## 预防与缓解措施

阶段
缓解措施
实施
确保对同类对象的多次分配进行适当跟踪——可能跨多个会话、请求或消息。定义处理超出限制请求的适当策略，并考虑支持配置选项，以便管理员在必要时可以扩展使用的内存量。
运营
使用系统提供的内存资源限制运行程序。这可能仍然会导致程序崩溃或退出，但对系统其余部分的影响将降至最低。

## 适用平台

此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。
语言 (复数)
C
(流行度未定)
C++
(流行度未确定)
类：非特定语言
(普遍程度未定)

## 引入阶段

不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。
阶段
说明
实施

## 官方英文定义（核对锚点）

Improperly Controlled Sequential Memory Allocation

The product manages a group of objects or resources and performs a separate memory allocation for each object, but it does not properly limit the total amount of memory that is consumed by all of the combined objects.

## 编目边界

抽象级别：Base；上游状态：Incomplete。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-1325: 未正确控制的顺序内存分配 / Improperly Controlled Sequential Memory Allocation](https://cwe.mitre.org/data/definitions/1325.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/1325.html)；官方英文定义与译文未逐句人工比对。
