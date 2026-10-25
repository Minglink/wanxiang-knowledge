---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-1232",
  "title": "CWE-1232: 电源状态转换后的锁行为不当",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-1232",
    "并发安全"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f7894ffaa922f3a404e406a7ad8b4a6192a3de5d5a27c44669dbad3558cde5d6",
  "generatedHash": "eabb23835d813131633aadb530b6feebfe3ab1144a571b80d293fef5e11d5690",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "寄存器锁位保护在位设置后禁止更改系统配置。某些受保护的寄存器或锁位在电源状态转换（例如，进入和唤醒低功耗睡眠模式）后变为可编程，导致系统配置可被更改。",
  "l1": "寄存器锁位保护在位设置后禁止更改系统配置。某些受保护的寄存器或锁位在电源状态转换（例如，进入和唤醒低功耗睡眠模式）后变为可编程，导致系统配置可被更改。 设备可能允许在设备电源重置后，通过受信任的固件或软件模块（通常由 BIOS/引导加载程序设置）对设备配置控件进行编程，随后将其锁定以防止进一步修改。此操作通常使用可编程锁定位来实现；一旦设置该位，将禁止对受保护的一组寄存器或地址区域进行写入。 在发生电源状态转换后，锁定位会被重置为解锁状态。此类保护方案中常见的一些弱点包括：锁被清除、受保护寄存器的值被重置，或者锁变得可被重新编程。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现",
  "questions": [
    "CWE-1232: 电源状态转换后的锁行为不当的原理是什么？",
    "CWE-1232: 电源状态转换后的锁行为不当有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-cwe-667",
      "kind": "ChildOf"
    }
  ],
  "externalSources": [
    {
      "id": "cwe-1232",
      "url": "https://cwe.mitre.org/data/definitions/1232.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-1232: 电源状态转换后的锁行为不当

## 缺陷定义

寄存器锁位保护在位设置后禁止更改系统配置。某些受保护的寄存器或锁位在电源状态转换（例如，进入和唤醒低功耗睡眠模式）后变为可编程，导致系统配置可被更改。

## 机制与扩展说明

设备可能允许在设备电源重置后，通过受信任的固件或软件模块（通常由 BIOS/引导加载程序设置）对设备配置控件进行编程，随后将其锁定以防止进一步修改。此操作通常使用可编程锁定位来实现；一旦设置该位，将禁止对受保护的一组寄存器或地址区域进行写入。
在发生电源状态转换后，锁定位会被重置为解锁状态。此类保护方案中常见的一些弱点包括：锁被清除、受保护寄存器的值被重置，或者锁变得可被重新编程。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
修改内存
范围: 访问控制
可能性：高

## 预防与缓解措施

阶段
缓解措施
架构与设计；实现；测试
应审查安全锁定位的保护机制在所有受支持的电源状态转换过程中的行为。
应在硅前（pre-silicon）和硅后（post-silicon）测试中，对安全锁的编程流程和锁属性进行测试，包括跨电源转换的测试。
有效性：高

## 适用平台

此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。
语言 (复数)
类：非特定语言
(普遍程度未定)
操作系统 (复数)
类：非特定于操作系统
(患病率未定)
架构
类：非特定于架构
(患病率未定)
技术
类：非特定于技术
(流行度未确定)

## 引入阶段

不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。
阶段
说明
架构与设计
实施

## 官方英文定义（核对锚点）

Improper Lock Behavior After Power State Transition

Register lock bit protection disables changes to system configuration once the bit is set. Some of the protected registers or lock bits become programmable after power state transitions (e.g., Entry and wake from low power sleep modes) causing the system configuration to be changeable.

## 编目边界

抽象级别：Base；上游状态：Incomplete。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-1232: 电源状态转换后的锁行为不当 / Improper Lock Behavior After Power State Transition](https://cwe.mitre.org/data/definitions/1232.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/1232.html)；官方英文定义与译文未逐句人工比对。
