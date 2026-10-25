---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-650",
  "title": "CWE-650: 在服务器端信任 HTTP 权限方法",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-650",
    "身份与权限"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "4992d0de7cd1ad2ca00d59e3397e47699e548e973827382d4942c896df44d1d4",
  "generatedHash": "3f576ef9ca0f09dc8eb63429ce0237b1885c8ec4a13efca932c8c637653cf41f",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "服务器包含一种保护机制，该机制假定任何使用 HTTP GET 访问的 URI 都不会导致相关资源的状态发生变化。这可能允许攻击者绕过预期的访问限制并执行资源修改和删除攻击，因为某些应用程序允许 GET 修改状态。",
  "l1": "服务器包含一种保护机制，该机制假定任何使用 HTTP GET 访问的 URI 都不会导致相关资源的状态发生变化。这可能允许攻击者绕过预期的访问限制并执行资源修改和删除攻击，因为某些应用程序允许 GET 修改状态。 HTTP GET 方法和某些其他方法旨在检索资源，而不是在服务器端更改应用程序或资源的状态。此外，HTTP 规范要求 GET 请求（及其他请求）不应产生副作用。由于认为这足以防止意外的资源更改，应用程序可能会禁止 HTTP 请求对资源表示执行 DELETE、PUT 和 POST 操作。然而，HTTP 协议本身并没有任何机制能真正阻止 HTTP GET 方法执行除数据查询之外的操作。开发人员可以轻松编写程序，使其接受一个实际上会在服务器上创建、更新或删除数据的 HTTP GET 请求。例如，在基于 REST 的 Web 服务中，使用 HTTP GET 请求在服务器端修改资源是一种常",
  "questions": [
    "CWE-650: 在服务器端信任 HTTP 权限方法的原理是什么？",
    "CWE-650: 在服务器端信任 HTTP 权限方法有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "cwe-650",
      "url": "https://cwe.mitre.org/data/definitions/650.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-650: 在服务器端信任 HTTP 权限方法

## 缺陷定义

服务器包含一种保护机制，该机制假定任何使用 HTTP GET 访问的 URI 都不会导致相关资源的状态发生变化。这可能允许攻击者绕过预期的访问限制并执行资源修改和删除攻击，因为某些应用程序允许 GET 修改状态。

## 机制与扩展说明

HTTP GET 方法和某些其他方法旨在检索资源，而不是在服务器端更改应用程序或资源的状态。此外，HTTP 规范要求 GET 请求（及其他请求）不应产生副作用。由于认为这足以防止意外的资源更改，应用程序可能会禁止 HTTP 请求对资源表示执行 DELETE、PUT 和 POST 操作。然而，HTTP 协议本身并没有任何机制能真正阻止 HTTP GET 方法执行除数据查询之外的操作。开发人员可以轻松编写程序，使其接受一个实际上会在服务器上创建、更新或删除数据的 HTTP GET 请求。例如，在基于 REST 的 Web 服务中，使用 HTTP GET 请求在服务器端修改资源是一种常见做法。然而，每当这种情况发生时，应用程序中必须正确强制执行访问控制。不应假设只有 HTTP DELETE、PUT、POST 和其他方法具有更改请求中被访问资源表示的能力。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
获取特权或冒充身份
范围: 访问控制
攻击者可能会提升权限。
修改应用程序数据
范围：完整性
攻击者可能会修改资源。
读取应用程序数据
范围：机密性
攻击者可能会获取敏感信息。

## 预防与缓解措施

阶段
缓解措施
系统配置
在服务器端配置 ACL（访问控制列表），以确保为每个可访问的资源表示定义了适当级别的访问控制。

## 适用平台

此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。
语言 (复数)
类：非特定语言
(普遍程度未定)
技术
类：基于 Web
（流行度未确定）
Web 服务器
（流行度未确定）

## 引入阶段

不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。
阶段
说明
架构与设计
实施
运营

## 官方英文定义（核对锚点）

Trusting HTTP Permission Methods on the Server Side

The server contains a protection mechanism that assumes that any URI that is accessed using HTTP GET will not cause a state change to the associated resource. This might allow attackers to bypass intended access restrictions and conduct resource modification and deletion attacks, since some applications allow GET to modify state.

## 编目边界

抽象级别：Variant；上游状态：Incomplete。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-650: 在服务器端信任 HTTP 权限方法 / Trusting HTTP Permission Methods on the Server Side](https://cwe.mitre.org/data/definitions/650.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/650.html)；官方英文定义与译文未逐句人工比对。
