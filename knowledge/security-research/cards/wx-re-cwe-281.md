---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-281",
  "title": "CWE-281: 权限保留不当",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-281",
    "身份与权限"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "daee62b5f96d08c16dc00edea1a5e857485a07c054d4287a74b1543acea17079",
  "generatedHash": "b804732893940b06e5031213b904152ed75ca77c1fe6e3ec488d1f8e19fd4710",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "产品在复制、恢复或共享对象时未保留或错误地保留了权限，这可能导致它们具有比预期更宽松的权限。",
  "l1": "产品在复制、恢复或共享对象时未保留或错误地保留了权限，这可能导致它们具有比预期更宽松的权限。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 读取应用程序数据；修改应用程序数据 范围：机密性、完整性 此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。 语言 (复数) 类：非特定语言 (普遍程度未定) 不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。 阶段 ",
  "questions": [
    "CWE-281: 权限保留不当的原理是什么？",
    "CWE-281: 权限保留不当有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-cwe-732",
      "kind": "ChildOf"
    }
  ],
  "externalSources": [
    {
      "id": "cwe-281",
      "url": "https://cwe.mitre.org/data/definitions/281.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-281: 权限保留不当

## 缺陷定义

产品在复制、恢复或共享对象时未保留或错误地保留了权限，这可能导致它们具有比预期更宽松的权限。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
读取应用程序数据；修改应用程序数据
范围：机密性、完整性

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
实现：此弱点是在实现架构安全策略期间导致的。
运营

## 官方英文定义（核对锚点）

Improper Preservation of Permissions

The product does not preserve permissions or incorrectly preserves permissions when copying, restoring, or sharing objects, which can cause them to have less restrictive permissions than intended.

## 编目边界

抽象级别：Base；上游状态：Draft。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-281: 权限保留不当 / Improper Preservation of Permissions](https://cwe.mitre.org/data/definitions/281.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/281.html)；官方英文定义与译文未逐句人工比对。
