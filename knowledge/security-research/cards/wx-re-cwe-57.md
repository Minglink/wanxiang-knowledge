---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-57",
  "title": "CWE-57: 路径等价性：'fakedir/../realdir/filename'",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-57",
    "文件与路径"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ed03068411cb0a389dacb85e1b1546c2ebfe97cf95482cd65e228ca7130ee21a",
  "generatedHash": "344ad3e5c93ee13b1d2856d4c22dfb071696a5e1d7635c2fdbaabd8c198d7d08",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "该产品包含限制对 'realdir/filename' 访问的保护机制，但它使用 'fakedir/../realdir/filename' 形式的外部输入来构造路径名，这些路径名不受这些机制的处理。这允许攻击者对目标文件执行未经授权的操作。",
  "l1": "该产品包含限制对 'realdir/filename' 访问的保护机制，但它使用 'fakedir/../realdir/filename' 形式的外部输入来构造路径名，这些路径名不受这些机制的处理。这允许攻击者对目标文件执行未经授权的操作。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 读取文件或目录；修改文件或目录 范围：机密性、完整性 阶段 缓解措施 实施 策略： 输入验证 在验证之前，输入应解码并规范化为应用程序当前内部的表示形式（ CWE-180 ）。确保应用程序不会对同一输入进行两次解码（ CWE-174 ）。此类错误可能",
  "questions": [
    "CWE-57: 路径等价性：'fakedir/../realdir/filename'的原理是什么？",
    "CWE-57: 路径等价性：'fakedir/../realdir/filename'有哪些边界和注意事项？"
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
      "id": "cwe-57",
      "url": "https://cwe.mitre.org/data/definitions/57.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-57: 路径等价性：'fakedir/../realdir/filename'

## 缺陷定义

该产品包含限制对 'realdir/filename' 访问的保护机制，但它使用 'fakedir/../realdir/filename' 形式的外部输入来构造路径名，这些路径名不受这些机制的处理。这允许攻击者对目标文件执行未经授权的操作。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
读取文件或目录；修改文件或目录
范围：机密性、完整性

## 预防与缓解措施

阶段
缓解措施
实施
策略：
输入验证
在验证之前，输入应解码并规范化为应用程序当前内部的表示形式（
CWE-180
）。确保应用程序不会对同一输入进行两次解码（
CWE-174
）。此类错误可能被用于通过在检查后引入危险输入来绕过允许列表验证方案。

## 适用平台

此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。
语言 (复数)
类：非特定语言
(普遍程度未定)
技术
类：非特定于技术
(流行度未确定)

## 引入阶段

不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。
阶段
说明
实施

## 补充说明与边界

理论性
这是一种利用注入手段达成一种后果（使用相对路径导致包含违规），从而实现另一种后果（通过替代名称达到等效）的操作。

## 官方英文定义（核对锚点）

Path Equivalence: 'fakedir/../realdir/filename'

The product contains protection mechanisms to restrict access to 'realdir/filename', but it constructs pathnames using external input in the form of 'fakedir/../realdir/filename' that are not handled by those mechanisms. This allows attackers to perform unauthorized actions against the targeted file.

## 编目边界

抽象级别：Variant；上游状态：Incomplete。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-57: 路径等价性：'fakedir/../realdir/filename' / Path Equivalence: 'fakedir/../realdir/filename'](https://cwe.mitre.org/data/definitions/57.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/57.html)；官方英文定义与译文未逐句人工比对。
