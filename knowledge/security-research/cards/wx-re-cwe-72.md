---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-72",
  "title": "CWE-72: 对 Apple HFS+ 备用数据流路径处理不当",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-72",
    "文件与路径"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "4c00ecbcaabfd2f6f218d3ad4bb743346de483eeb25ee5ef4f815cddbab05c40",
  "generatedHash": "137ddd8460a5b6e8bdfd3d592644b2f7268ffa956c7a7c77ce1ede56f0da434b",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "产品未能正确处理可能标识 HFS+ 文件系统上文件的数据或资源分叉的特殊路径。",
  "l1": "产品未能正确处理可能标识 HFS+ 文件系统上文件的数据或资源分叉的特殊路径。 如果产品根据文件名选择执行的操作，那么当攻击者提供数据分支（data fork）或资源分支（resource fork）时，产品可能会采取意外的操作。此外，如果产品旨在限制对某个文件的访问，攻击者可能仍通过请求该文件的特定分支来绕过预期的访问限制。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 读取文件或目录；修改文件或目录 范围：机密性、完整性 此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一",
  "questions": [
    "CWE-72: 对 Apple HFS+ 备用数据流路径处理不当的原理是什么？",
    "CWE-72: 对 Apple HFS+ 备用数据流路径处理不当有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-cwe-66",
      "kind": "ChildOf"
    }
  ],
  "externalSources": [
    {
      "id": "cwe-72",
      "url": "https://cwe.mitre.org/data/definitions/72.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-72: 对 Apple HFS+ 备用数据流路径处理不当

## 缺陷定义

产品未能正确处理可能标识 HFS+ 文件系统上文件的数据或资源分叉的特殊路径。

## 机制与扩展说明

如果产品根据文件名选择执行的操作，那么当攻击者提供数据分支（data fork）或资源分支（resource fork）时，产品可能会采取意外的操作。此外，如果产品旨在限制对某个文件的访问，攻击者可能仍通过请求该文件的特定分支来绕过预期的访问限制。

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
操作系统 (复数)
类别: macOS
(普遍性未确定)

## 引入阶段

不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。
阶段
说明
实施

## 背景机制

Apple HFS+ 文件系统允许文件具有多个数据输入流，这些流可以通过特殊路径访问。Mac OS X 操作系统提供了一种通过特殊路径和扩展属性访问不同数据输入流的方法：
- 资源分支 (Resource fork): file/..namedfork/rsrc, file/rsrc (已弃用), xattr:com.apple.ResourceFork
- 数据分支 (Data fork): file/..namedfork/data (仅限 Mac OS X v10.5 之前的版本)
此外，在缺乏对多数据流原生支持的文件系统上，资源分支和文件元数据可能会存储在名称前带有 "._" 的文件中。
分支也可以通过不可移植的 API 进行访问。
分支继承了其所属文件的文件系统访问控制权限。
如果文件系统对象的处理依赖于其路径结构，程序需要对这些路径的访问进行控制。

## 补充说明与边界

理论性
此问题及类似问题之所以存在，是因为同一资源可以拥有多个标识符，而这些标识符决定了可以对资源执行何种行为。
研究差距
研究不足

## 官方英文定义（核对锚点）

Improper Handling of Apple HFS+ Alternate Data Stream Path

The product does not properly handle special paths that may identify the data or resource fork of a file on the HFS+ file system.

## 编目边界

抽象级别：Variant；上游状态：Incomplete。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-72: 对 Apple HFS+ 备用数据流路径处理不当 / Improper Handling of Apple HFS+ Alternate Data Stream Path](https://cwe.mitre.org/data/definitions/72.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/72.html)；官方英文定义与译文未逐句人工比对。
