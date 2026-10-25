---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-9",
  "title": "CWE-9: J2EE 配置错误：EJB 方法访问权限过弱",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-9",
    "身份与权限"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "1f17336878e30ec6d46c7975c123156267eb6c1ed95c6192d1def1e908ba128c",
  "generatedHash": "e53db68566aa403f10a970ec38f9e1050c1d5482f011ae3fa092d401bc87c24d",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "如果将提升的访问权限分配给 EJB 方法，那么攻击者可以利用这些权限来攻击产品。",
  "l1": "如果将提升的访问权限分配给 EJB 方法，那么攻击者可以利用这些权限来攻击产品。 如果 EJB 部署描述符包含一个或多个授予特殊 ANYONE 角色的方法权限，这表明应用程序的访问控制尚未经过充分考虑，或者应用程序的结构导致无法实现合理的访问控制限制。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 其他 范围：其他 阶段 缓解措施 架构与设计；系统配置 在为 EJB 方法分配访问权限时，应遵循最小权限原则。不应向 ANYONE 角色授予调用 EJB 方法的权限。 此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操",
  "questions": [
    "CWE-9: J2EE 配置错误：EJB 方法访问权限过弱的原理是什么？",
    "CWE-9: J2EE 配置错误：EJB 方法访问权限过弱有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-cwe-266",
      "kind": "ChildOf"
    }
  ],
  "externalSources": [
    {
      "id": "cwe-9",
      "url": "https://cwe.mitre.org/data/definitions/9.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-9: J2EE 配置错误：EJB 方法访问权限过弱

## 缺陷定义

如果将提升的访问权限分配给 EJB 方法，那么攻击者可以利用这些权限来攻击产品。

## 机制与扩展说明

如果 EJB 部署描述符包含一个或多个授予特殊 ANYONE 角色的方法权限，这表明应用程序的访问控制尚未经过充分考虑，或者应用程序的结构导致无法实现合理的访问控制限制。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
其他
范围：其他

## 预防与缓解措施

阶段
缓解措施
架构与设计；系统配置
在为 EJB 方法分配访问权限时，应遵循最小权限原则。不应向 ANYONE 角色授予调用 EJB 方法的权限。

## 适用平台

此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。
语言 (复数)
Java
(流行程度未定)

## 引入阶段

不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。
阶段
说明
架构与设计
实施

## 官方英文定义（核对锚点）

J2EE Misconfiguration: Weak Access Permissions for EJB Methods

If elevated access rights are assigned to EJB methods, then an attacker can take advantage of the permissions to exploit the product.

## 编目边界

抽象级别：Variant；上游状态：Draft。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-9: J2EE 配置错误：EJB 方法访问权限过弱 / J2EE Misconfiguration: Weak Access Permissions for EJB Methods](https://cwe.mitre.org/data/definitions/9.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/9.html)；官方英文定义与译文未逐句人工比对。
