---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-370",
  "title": "CWE-370: 初始检查后未检查证书吊销状态",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-370",
    "密码与证书"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "caabf87cb64f41b110a2c2f9f2c2b32537aa93d8018969fa4166ac2c827e555a",
  "generatedHash": "f97a97ce5467615ec740c2886125acea26d5b29a27ac6a0b9d707a1b52ecb727",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "产品在初始吊销检查后不检查证书的吊销状态，这可能导致产品即使在证书稍后被吊销后仍执行特权操作。",
  "l1": "产品在初始吊销检查后不检查证书的吊销状态，这可能导致产品即使在证书稍后被吊销后仍执行特权操作。 如果在每次需要特权的操作之前未检查证书的吊销状态，系统可能会受到竞争条件的影响。如果证书在初始检查后被吊销，则随后使用该被吊销证书所有者进行的所有操作都将失去该证书所保障的所有安全性。事实上，使用被吊销的证书几乎可以肯定存在恶意活动。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 获取特权或冒充身份 范围: 访问控制 信任可能被赋予给并非其所声称的实体。 修改应用程序数据 范围：完整性 可能集成来自不可信（且可能是恶意）来源的数据。 读取应",
  "questions": [
    "CWE-370: 初始检查后未检查证书吊销状态的原理是什么？",
    "CWE-370: 初始检查后未检查证书吊销状态有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-cwe-299",
      "kind": "ChildOf"
    },
    {
      "to": "wx-re-cwe-296",
      "kind": "PeerOf"
    },
    {
      "to": "wx-re-cwe-297",
      "kind": "PeerOf"
    },
    {
      "to": "wx-re-cwe-298",
      "kind": "PeerOf"
    }
  ],
  "externalSources": [
    {
      "id": "cwe-370",
      "url": "https://cwe.mitre.org/data/definitions/370.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-370: 初始检查后未检查证书吊销状态

## 缺陷定义

产品在初始吊销检查后不检查证书的吊销状态，这可能导致产品即使在证书稍后被吊销后仍执行特权操作。

## 机制与扩展说明

如果在每次需要特权的操作之前未检查证书的吊销状态，系统可能会受到竞争条件的影响。如果证书在初始检查后被吊销，则随后使用该被吊销证书所有者进行的所有操作都将失去该证书所保障的所有安全性。事实上，使用被吊销的证书几乎可以肯定存在恶意活动。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
获取特权或冒充身份
范围: 访问控制
信任可能被赋予给并非其所声称的实体。
修改应用程序数据
范围：完整性
可能集成来自不可信（且可能是恶意）来源的数据。
读取应用程序数据
范围：机密性
数据可能被披露给冒充受信任实体的攻击者，从而导致信息泄露。

## 预防与缓解措施

阶段
缓解措施
架构与设计
确保在每次使用受保护资源之前检查证书的吊销状态。如果在每次访问受保护资源之前都检查证书，则可能产生竞争条件的延迟将变得几乎可以忽略不计，并显著降低与此问题相关的风险。

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

Missing Check for Certificate Revocation after Initial Check

The product does not check the revocation status of a certificate after its initial revocation check, which can cause the product to perform privileged actions even after the certificate is revoked at a later time.

## 编目边界

抽象级别：Variant；上游状态：Draft。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-370: 初始检查后未检查证书吊销状态 / Missing Check for Certificate Revocation after Initial Check](https://cwe.mitre.org/data/definitions/370.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/370.html)；官方英文定义与译文未逐句人工比对。
