---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-551",
  "title": "CWE-551: 不正确的行为顺序：在解析和规范化之前进行授权",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-551",
    "身份与权限"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f492b2ce22b2e8e93aca1f01c1ecc311d5d3f1a78500ee714798a359593107a1",
  "generatedHash": "974447513464200f54f4cbff26127fd84bf429e50695044cc013a3a7999f0221",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "如果 Web 服务器在检查授权之前没有完全解析请求的 URL，攻击者就可能绕过授权保护。",
  "l1": "如果 Web 服务器在检查授权之前没有完全解析请求的 URL，攻击者就可能绕过授权保护。 例如，字符字符串 /./ 和 / 都表示当前目录。如果 /SomeDirectory 是一个受保护的目录，而攻击者请求 /./SomeDirectory，如果 /./ 在执行授权检查之前没有被转换为 /，那么攻击者可能能够获得对该资源的访问权限。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 绕过保护机制 范围: 访问控制 阶段 缓解措施 架构与设计 URL 输入在进行验证和授权处理之前，应先解码并规范化为应用程序当前的内部表示形式。确保您的应用",
  "questions": [
    "CWE-551: 不正确的行为顺序：在解析和规范化之前进行授权的原理是什么？",
    "CWE-551: 不正确的行为顺序：在解析和规范化之前进行授权有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-cwe-863",
      "kind": "ChildOf"
    },
    {
      "to": "wx-re-cwe-41",
      "kind": "PeerOf"
    }
  ],
  "externalSources": [
    {
      "id": "cwe-551",
      "url": "https://cwe.mitre.org/data/definitions/551.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-551: 不正确的行为顺序：在解析和规范化之前进行授权

## 缺陷定义

如果 Web 服务器在检查授权之前没有完全解析请求的 URL，攻击者就可能绕过授权保护。

## 机制与扩展说明

例如，字符字符串 /./ 和 / 都表示当前目录。如果 /SomeDirectory 是一个受保护的目录，而攻击者请求 /./SomeDirectory，如果 /./ 在执行授权检查之前没有被转换为 /，那么攻击者可能能够获得对该资源的访问权限。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
绕过保护机制
范围: 访问控制

## 预防与缓解措施

阶段
缓解措施
架构与设计
URL 输入在进行验证和授权处理之前，应先解码并规范化为应用程序当前的内部表示形式。确保您的应用程序不会对同一输入进行两次解码。此类错误可能被用于通过在检查后引入危险输入来绕过允许列表方案。

## 适用平台

此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。
语言 (复数)
类：非特定语言
(普遍程度未定)
技术
类：非特定于技术
(流行度未确定)
类：基于 Web
（流行度未确定）
Web 服务器
（流行度未确定）

## 引入阶段

不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。
阶段
说明
实施
实现：此弱点是在实现架构安全策略期间导致的。

## 官方英文定义（核对锚点）

Incorrect Behavior Order: Authorization Before Parsing and Canonicalization

If a web server does not fully parse requested URLs before it examines them for authorization, it may be possible for an attacker to bypass authorization protection.

## 编目边界

抽象级别：Base；上游状态：Incomplete。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-551: 不正确的行为顺序：在解析和规范化之前进行授权 / Incorrect Behavior Order: Authorization Before Parsing and Canonicalization](https://cwe.mitre.org/data/definitions/551.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/551.html)；官方英文定义与译文未逐句人工比对。
