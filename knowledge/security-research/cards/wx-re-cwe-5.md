---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-5",
  "title": "CWE-5: J2EE 配置错误：数据传输未加密",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-5",
    "密码与证书"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "b52f50cb626aec0e23784272919089692e6d22ab5d0ec47b1e0f49ee59419db9",
  "generatedHash": "9fcf469157c1e59bedcd7191fdff64e30c712f74356cc8dc27a1ad2d7853ba36",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "通过网络发送的信息在传输过程中可能会被破坏。如果数据以纯文本发送或加密强度较弱，攻击者可能能够读取或修改其内容。",
  "l1": "通过网络发送的信息在传输过程中可能会被破坏。如果数据以纯文本发送或加密强度较弱，攻击者可能能够读取或修改其内容。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 读取应用程序数据 范围：机密性 修改应用程序数据 范围：完整性 阶段 缓解措施 系统配置 产品配置应确保对所有受访问控制的页面使用 SSL 或具有同等强度且经过审查的加密机制。 此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。 语言 (复数) Java (流行程度未定) 不同的引入模式提",
  "questions": [
    "CWE-5: J2EE 配置错误：数据传输未加密的原理是什么？",
    "CWE-5: J2EE 配置错误：数据传输未加密有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "cwe-5",
      "url": "https://cwe.mitre.org/data/definitions/5.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-5: J2EE 配置错误：数据传输未加密

## 缺陷定义

通过网络发送的信息在传输过程中可能会被破坏。如果数据以纯文本发送或加密强度较弱，攻击者可能能够读取或修改其内容。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
读取应用程序数据
范围：机密性
修改应用程序数据
范围：完整性

## 预防与缓解措施

阶段
缓解措施
系统配置
产品配置应确保对所有受访问控制的页面使用 SSL 或具有同等强度且经过审查的加密机制。

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
运营

## 补充说明与边界

其他
如果应用程序使用 SSL 来保证与客户端浏览器的机密通信，则应用程序配置应使用户无法在没有 SSL 的情况下查看任何受访问控制的页面。SSL 被绕过通常有三种常见方式：
用户手动输入 URL，输入“HTTP”而不是“HTTPS”。
攻击者故意将用户引导至不安全的 URL。
程序员错误地在应用程序中创建了指向某个页面的相对链接，该链接未从 HTTP 切换到 HTTPS。（当链接在网站的公共区域和受保护区域之间移动时，尤其容易发生这种情况。）

## 官方英文定义（核对锚点）

J2EE Misconfiguration: Data Transmission Without Encryption

Information sent over a network can be compromised while in transit. An attacker may be able to read or modify the contents if the data are sent in plaintext or are weakly encrypted.

## 编目边界

抽象级别：Variant；上游状态：Draft。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-5: J2EE 配置错误：数据传输未加密 / J2EE Misconfiguration: Data Transmission Without Encryption](https://cwe.mitre.org/data/definitions/5.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/5.html)；官方英文定义与译文未逐句人工比对。
