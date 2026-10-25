---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-58",
  "title": "CWE-58: 路径等价性：Windows 8.3 文件名",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-58",
    "文件与路径"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "8e2ae3c00cc26eaeba24c063bb8aa9bbf130368ba2ade0d4fac8507ae6cceae1",
  "generatedHash": "dd75f033cdded07df1cb9ef969cb4ef537778606499057afd1a4358e9fb8d7d0",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "该产品包含一种限制对 Windows 操作系统上长文件名访问的保护机制，但它没有正确限制对等效的短“8.3”文件名的访问。",
  "l1": "该产品包含一种限制对 Windows 操作系统上长文件名访问的保护机制，但它没有正确限制对等效的短“8.3”文件名的访问。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 读取文件或目录；修改文件或目录 范围：机密性、完整性 阶段 缓解措施 系统配置 通过编辑 Windows 注册表，禁用 Windows 对 8.3 文件名的支持。防止生成 8.3 文件名并不会删除之前已经生成的 8.3 文件名。 此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。",
  "questions": [
    "CWE-58: 路径等价性：Windows 8.3 文件名的原理是什么？",
    "CWE-58: 路径等价性：Windows 8.3 文件名有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-cwe-41",
      "kind": "ChildOf"
    }
  ],
  "externalSources": [
    {
      "id": "cwe-58",
      "url": "https://cwe.mitre.org/data/definitions/58.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-58: 路径等价性：Windows 8.3 文件名

## 缺陷定义

该产品包含一种限制对 Windows 操作系统上长文件名访问的保护机制，但它没有正确限制对等效的短“8.3”文件名的访问。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
读取文件或目录；修改文件或目录
范围：机密性、完整性

## 预防与缓解措施

阶段
缓解措施
系统配置
通过编辑 Windows 注册表，禁用 Windows 对 8.3 文件名的支持。防止生成 8.3 文件名并不会删除之前已经生成的 8.3 文件名。

## 适用平台

此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。
语言 (复数)
类：非特定语言
(普遍程度未定)
操作系统 (复数)
类别：Windows
(流行度未定)
技术
类：非特定于技术
(流行度未确定)

## 引入阶段

不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。
阶段
说明
实施

## 背景机制

在较新版本的 Windows 操作系统中，一个文件可以拥有一个“长文件名”和一个与旧版 Windows 文件系统兼容的短文件名（文件名最多 8 个字符，扩展名最多 3 个字符）。因此，这些“8.3”文件名充当了长文件名的备用名称，这使得它们成为有用的路径名等价操作手段。

## 补充说明与边界

研究差距
可能研究不足。

## 官方英文定义（核对锚点）

Path Equivalence: Windows 8.3 Filename

The product contains a protection mechanism that restricts access to a long filename on a Windows operating system, but it does not properly restrict access to the equivalent short "8.3" filename.

## 编目边界

抽象级别：Variant；上游状态：Incomplete。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-58: 路径等价性：Windows 8.3 文件名 / Path Equivalence: Windows 8.3 Filename](https://cwe.mitre.org/data/definitions/58.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/58.html)；官方英文定义与译文未逐句人工比对。
