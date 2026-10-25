---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-784",
  "title": "CWE-784: 在安全决策中依赖未经验证和完整性检查的 Cookie",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-784",
    "输入验证"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ffa8c60204137db016c04aebcaca6765c6f6d45b7bb24fa485b96c920ef8b908",
  "generatedHash": "6226ee794de306588396f22c051ec10ff28fa9f5212d9ffda2ebf862e8de10fd",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "产品使用依赖于 Cookie 存在或值的保护机制，但未正确确保该 Cookie 对于关联用户有效。",
  "l1": "产品使用依赖于 Cookie 存在或值的保护机制，但未正确确保该 Cookie 对于关联用户有效。 攻击者可以轻松地在浏览器内或通过在浏览器之外实现客户端代码来修改 Cookie。通过将 Cookie 修改为包含预期值，攻击者可以绕过授权和身份验证等保护机制。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 绕过保护机制；获取特权或冒充身份 范围: 访问控制 使用 Cookie 来设置用户权限是危险的。Cookie 可以被操纵以声称拥有高级别的授权，或者声称已成功通过身份验证。 阶段 缓解措施 架构与设计 避免将 Cookie 数据用于",
  "questions": [
    "CWE-784: 在安全决策中依赖未经验证和完整性检查的 Cookie的原理是什么？",
    "CWE-784: 在安全决策中依赖未经验证和完整性检查的 Cookie有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-cwe-807",
      "kind": "ChildOf"
    },
    {
      "to": "wx-re-cwe-565",
      "kind": "ChildOf"
    }
  ],
  "externalSources": [
    {
      "id": "cwe-784",
      "url": "https://cwe.mitre.org/data/definitions/784.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-784: 在安全决策中依赖未经验证和完整性检查的 Cookie

## 缺陷定义

产品使用依赖于 Cookie 存在或值的保护机制，但未正确确保该 Cookie 对于关联用户有效。

## 机制与扩展说明

攻击者可以轻松地在浏览器内或通过在浏览器之外实现客户端代码来修改 Cookie。通过将 Cookie 修改为包含预期值，攻击者可以绕过授权和身份验证等保护机制。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
绕过保护机制；获取特权或冒充身份
范围: 访问控制
使用 Cookie 来设置用户权限是危险的。Cookie 可以被操纵以声称拥有高级别的授权，或者声称已成功通过身份验证。

## 预防与缓解措施

阶段
缓解措施
架构与设计
避免将 Cookie 数据用于安全相关的决策。
实施
如果您要将 Cookie 数据用于安全相关的决策，请对 Cookie 数据执行彻底的输入验证（例如：服务器端验证）。
架构与设计
添加完整性检查以检测篡改。
架构与设计
保护关键 Cookie 免受重放攻击，因为跨站脚本攻击或其他攻击可能允许攻击者窃取通过完整性检查且被强加密的 Cookie。此缓解措施适用于仅在单个事务或会话期间有效的 Cookie。通过强制执行超时，您可以限制攻击的范围。作为完整性检查的一部分，请使用未向客户端公开的、不可预测的服务器端值。

## 适用平台

此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。
语言 (复数)
类：非特定语言
(普遍程度未定)
技术
类：基于 Web
(普遍存在)
Web 服务器
（流行度未确定）

## 引入阶段

不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。
阶段
说明
实施

## 补充说明与边界

维护
可能需要为该条目定义一个新的父级。该条目专门针对 Cookie，这反映了 2008 年和 2009 年 CVE 中报告的大量基于 Cookie 的身份验证漏洞。然而，其他类型的输入（如参数或头部）也可用于类似的身份验证或授权。类似的问题（在研究视图下）包括
CWE-247
和
CWE-472
。

## 官方英文定义（核对锚点）

Reliance on Cookies without Validation and Integrity Checking in a Security Decision

The product uses a protection mechanism that relies on the existence or values of a cookie, but it does not properly ensure that the cookie is valid for the associated user.

## 编目边界

抽象级别：Variant；上游状态：Draft。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-784: 在安全决策中依赖未经验证和完整性检查的 Cookie / Reliance on Cookies without Validation and Integrity Checking in a Security Decision](https://cwe.mitre.org/data/definitions/784.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/784.html)；官方英文定义与译文未逐句人工比对。
