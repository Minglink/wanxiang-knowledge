---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-647",
  "title": "CWE-647：使用非规范URL路径进行授权决策",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-647",
    "身份与权限",
    "文件与路径"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "9b278fda4e6ea7dbab4af29e15dd271a8868adda0a5ec94085947ac1d36ac847",
  "generatedHash": "72ff3d49501b817b03cd3d709fe952a9e76f2d733136c7f07b3e8b22bfda2f02",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "该产品定义了策略命名空间，并基于 URL 为规范化的假设做出授权决策。这可能允许非规范化的 URL 绕过授权。",
  "l1": "该产品定义了策略命名空间，并基于 URL 为规范化的假设做出授权决策。这可能允许非规范化的 URL 绕过授权。 如果应用程序定义了策略命名空间并基于URL做出授权决策，但在做出授权决策之前未要求或转换为规范URL，则应用程序容易受到攻击。例如，如果应用程序只希望允许访问 http://www.example.com/mypage，那么攻击者可能能够使用等效的URL绕过此限制，例如： http://WWW.EXAMPLE.COM/mypage http://www.example.com/%6Dypage (备用编码) http://192.168.1.1/mypage (IP地址) http://www.example.com/mypage/ (末尾斜杠) http://www.example.com:80/mypage 因此，重要的是指定基于规范形式的路径信息，并拒绝所有备用编码的访问控",
  "questions": [
    "CWE-647：使用非规范URL路径进行授权决策的原理是什么？",
    "CWE-647：使用非规范URL路径进行授权决策有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-cwe-863",
      "kind": "ChildOf"
    }
  ],
  "externalSources": [
    {
      "id": "cwe-647",
      "url": "https://cwe.mitre.org/data/definitions/647.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-647：使用非规范URL路径进行授权决策

## 缺陷定义

该产品定义了策略命名空间，并基于 URL 为规范化的假设做出授权决策。这可能允许非规范化的 URL 绕过授权。

## 机制与扩展说明

如果应用程序定义了策略命名空间并基于URL做出授权决策，但在做出授权决策之前未要求或转换为规范URL，则应用程序容易受到攻击。例如，如果应用程序只希望允许访问 http://www.example.com/mypage，那么攻击者可能能够使用等效的URL绕过此限制，例如：
http://WWW.EXAMPLE.COM/mypage
http://www.example.com/%6Dypage (备用编码)
http://192.168.1.1/mypage (IP地址)
http://www.example.com/mypage/ (末尾斜杠)
http://www.example.com:80/mypage
因此，重要的是指定基于规范形式的路径信息，并拒绝所有备用编码的访问控制策略（这可以通过默认拒绝规则来实现）。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
绕过保护机制
范围: 访问控制
攻击者可能能够绕过授权机制，访问本应受保护的URL。
读取文件或目录
范围：机密性
如果使用了非规范URL，服务器可能会选择返回文件内容，而不是预处理文件（例如作为程序）。

## 预防与缓解措施

阶段
缓解措施
架构与设计
制定基于规范形式路径信息的访问控制策略。使用非常严格的正则表达式来验证路径是否符合预期形式。
架构与设计
拒绝所有不符合预期规范形式的备用路径编码。

## 检测与审计方法

方法
详细信息
自动化静态分析
自动静态分析，通常称为静态应用程序安全测试 (SAST)，可以通过分析源代码（或二进制/编译代码）而无需执行它来发现此弱点的某些实例。通常，这是通过构建数据流和控制流的模型，然后搜索连接“源”（输入的起源）和“汇”（数据与外部组件、操作系统等较低层交互的目的地）的潜在易受攻击的模式来完成的。
有效性：高

## 适用平台

此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。
语言 (复数)
类：非特定语言
(普遍程度未定)
技术
Web 服务器
（流行度未确定）

## 引入阶段

不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。
阶段
说明
实施
实现：此弱点是在实现架构安全策略期间导致的。
运营

## 官方英文定义（核对锚点）

Use of Non-Canonical URL Paths for Authorization Decisions

The product defines policy namespaces and makes authorization decisions based on the assumption that a URL is canonical. This can allow a non-canonical URL to bypass the authorization.

## 编目边界

抽象级别：Variant；上游状态：Incomplete。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-647：使用非规范URL路径进行授权决策 / Use of Non-Canonical URL Paths for Authorization Decisions](https://cwe.mitre.org/data/definitions/647.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/647.html)；官方英文定义与译文未逐句人工比对。
