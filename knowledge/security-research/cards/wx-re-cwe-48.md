---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-48",
  "title": "CWE-48: 路径等价性：“文件名”（内部空格）",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-48",
    "文件与路径"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "7104bf205039472539d8fdb4bca5306dd753da48f4a5a2b56bbf19b5dbf47f51",
  "generatedHash": "9e306b203b08e02b8f621619dafd7ffec58d9d7f11cb29245d1b5226ae3d7d32",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "产品在未进行适当验证的情况下接受内部空格 ('file(空格)name') 形式的路径输入，这可能导致歧义路径解析，并允许攻击者遍历文件系统至预料之外的位置或访问任意文件。",
  "l1": "产品在未进行适当验证的情况下接受内部空格 ('file(空格)name') 形式的路径输入，这可能导致歧义路径解析，并允许攻击者遍历文件系统至预料之外的位置或访问任意文件。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 读取文件或目录；修改文件或目录 范围：机密性、完整性 此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。 语言 (复数) 类：非特定语言 (普遍程度未定) 不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能",
  "questions": [
    "CWE-48: 路径等价性：“文件名”（内部空格）的原理是什么？",
    "CWE-48: 路径等价性：“文件名”（内部空格）有哪些边界和注意事项？"
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
      "id": "cwe-48",
      "url": "https://cwe.mitre.org/data/definitions/48.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-48: 路径等价性：“文件名”（内部空格）

## 缺陷定义

产品在未进行适当验证的情况下接受内部空格 ('file(空格)name') 形式的路径输入，这可能导致歧义路径解析，并允许攻击者遍历文件系统至预料之外的位置或访问任意文件。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
读取文件或目录；修改文件或目录
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

## 补充说明与边界

关系
此缺陷可能与引号包裹问题重叠，例如“Program Files”未加引号的搜索路径 (
CWE-428
)。如果过滤过程删除了所有多余的空格，这也可以是一个等价性问题。
关系
空格也可能是其他与等价性无直接关系缺陷中的一个因素。它还可以用于伪造图标或隐藏具有危险名称的文件（参见
CWE-451
中的图标操纵和视觉截断）。

## 官方英文定义（核对锚点）

Path Equivalence: 'file name' (Internal Whitespace)

The product accepts path input in the form of internal space ('file(SPACE)name') without appropriate validation, which can lead to ambiguous path resolution and allow an attacker to traverse the file system to unintended locations or access arbitrary files.

## 编目边界

抽象级别：Variant；上游状态：Incomplete。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-48: 路径等价性：“文件名”（内部空格） / Path Equivalence: 'file name' (Internal Whitespace)](https://cwe.mitre.org/data/definitions/48.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/48.html)；官方英文定义与译文未逐句人工比对。
