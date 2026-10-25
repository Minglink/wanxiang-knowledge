---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-1222",
  "title": "CWE-1222：寄存器锁保护的地址区域粒度不足",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-1222",
    "并发安全"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "163e4f4de4497b1efade03839eb8b010b420ba92406a0737a1d8b4265ffcc3cd",
  "generatedHash": "3b97ef7c4d27fe27d674952bc35278f0c9a0a4a61e0aa36e56e37eae5414c474",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "产品定义了一个受同一寄存器锁控制位修改保护的大地址区域。这导致功能需求（操作期间某些地址需要可由软件写入）与安全需求（引导过程中系统配置锁定位必须被设置）之间发生冲突。",
  "l1": "产品定义了一个受同一寄存器锁控制位修改保护的大地址区域。这导致功能需求（操作期间某些地址需要可由软件写入）与安全需求（引导过程中系统配置锁定位必须被设置）之间发生冲突。 集成电路和硬件 IP 可能会暴露一些设备配置控制项，这些配置需要在设备上电重置后由受信任的固件或软件模块（通常由 BIOS/引导加载程序设置）进行编程，随后锁定以防止进一步修改。在硬件设计中，这通常使用可编程的锁定位来实现，该位用于启用/禁用对一组受保护寄存器或地址区域的写入。当设置了可编程锁定位时，相关的地址区域可以作为硬件逻辑中的硬编码值来实现，之后无法更改。 当受保护区域的定义粒度不足时，就会出现问题。一旦设置了可编程锁定位，如果不更改硬件设计，就无法实现新的功能。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相",
  "questions": [
    "CWE-1222：寄存器锁保护的地址区域粒度不足的原理是什么？",
    "CWE-1222：寄存器锁保护的地址区域粒度不足有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "cwe-1222",
      "url": "https://cwe.mitre.org/data/definitions/1222.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-1222：寄存器锁保护的地址区域粒度不足

## 缺陷定义

产品定义了一个受同一寄存器锁控制位修改保护的大地址区域。这导致功能需求（操作期间某些地址需要可由软件写入）与安全需求（引导过程中系统配置锁定位必须被设置）之间发生冲突。

## 机制与扩展说明

集成电路和硬件 IP 可能会暴露一些设备配置控制项，这些配置需要在设备上电重置后由受信任的固件或软件模块（通常由 BIOS/引导加载程序设置）进行编程，随后锁定以防止进一步修改。在硬件设计中，这通常使用可编程的锁定位来实现，该位用于启用/禁用对一组受保护寄存器或地址区域的写入。当设置了可编程锁定位时，相关的地址区域可以作为硬件逻辑中的硬编码值来实现，之后无法更改。
当受保护区域的定义粒度不足时，就会出现问题。一旦设置了可编程锁定位，如果不更改硬件设计，就无法实现新的功能。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
其他
范围: 访问控制
系统安全配置的定义方式可能与设备的功能需求产生冲突。

## 预防与缓解措施

阶段
缓解措施
架构与设计
应在设计阶段早期与软件团队一起审查或测试受保护锁定寄存器的定义，以确保软件流程不会被安全锁阻碍。
作为使用寄存器锁控制位和固定访问控制区域的替代方案，硬件设计可以采用可编程的安全访问控制配置，以便设备受信任的固件能够根据软件使用情况和安全模型配置及更改受保护区域。

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
类：片上系统
(流行度未确定)

## 引入阶段

不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。
阶段
说明
架构与设计
此类问题是在硬件架构和设计过程中引入的，因为软件控制和配置是在这些阶段定义的，而问题是在后来的测试或系统配置阶段发现的。

## 官方英文定义（核对锚点）

Insufficient Granularity of Address Regions Protected by Register Locks

The product defines a large address region protected from modification by the same register lock control bit. This results in a conflict between the functional requirement that some addresses need to be writable by software during operation and the security requirement that the system configuration lock bit must be set during the boot process.

## 编目边界

抽象级别：Variant；上游状态：Incomplete。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-1222：寄存器锁保护的地址区域粒度不足 / Insufficient Granularity of Address Regions Protected by Register Locks](https://cwe.mitre.org/data/definitions/1222.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/1222.html)；官方英文定义与译文未逐句人工比对。
