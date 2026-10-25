---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-611",
  "title": "CWE-611: 不当限制 XML 外部实体引用",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-611"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "853bc045ae57066dcffabce1706f16a6dfc02877432d69d1585e008990a9f647",
  "generatedHash": "363d2d9175766e938090f82f9e7242bb464544f6764e04f54ba18b2d6e938c5d",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "产品处理的 XML 文档中可能包含带有 URI 的 XML 实体，这些 URI 指向预期控制范围之外的文档，导致产品将错误的内容嵌入到其输出中。",
  "l1": "产品处理的 XML 文档中可能包含带有 URI 的 XML 实体，这些 URI 指向预期控制范围之外的文档，导致产品将错误的内容嵌入到其输出中。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 读取应用程序数据；读取文件或目录 范围：机密性 如果攻击者能够包含精心构造的 DTD 且启用了默认实体解析器，则攻击者可能能够访问系统上的任意文件。通过提交一个定义了带有 file:// URI 外部实体的 XML 文件，攻击者可以使处理该 XML 的应用程序读取本地文件的内容。例如，URI（如 \"file:///c:/winnt/win.ini",
  "questions": [
    "CWE-611: 不当限制 XML 外部实体引用的原理是什么？",
    "CWE-611: 不当限制 XML 外部实体引用有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "cwe-611",
      "url": "https://cwe.mitre.org/data/definitions/611.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-611: 不当限制 XML 外部实体引用

## 缺陷定义

产品处理的 XML 文档中可能包含带有 URI 的 XML 实体，这些 URI 指向预期控制范围之外的文档，导致产品将错误的内容嵌入到其输出中。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
读取应用程序数据；读取文件或目录
范围：机密性
如果攻击者能够包含精心构造的 DTD 且启用了默认实体解析器，则攻击者可能能够访问系统上的任意文件。通过提交一个定义了带有 file:// URI 外部实体的 XML 文件，攻击者可以使处理该 XML 的应用程序读取本地文件的内容。例如，URI（如 "file:///c:/winnt/win.ini"）在 Windows 中指向文件 C:\Winnt\win.ini，或者 file:///etc/passwd 在基于 Unix 的系统中指向密码文件。一旦读取了 URI 的内容，这些内容就会被反馈给正在处理该 XML 的应用程序。该应用程序可能会回显数据（例如，在错误消息中），从而暴露文件内容。
绕过保护机制
范围：完整性
攻击者可以使用 http:// 等协议方案提供精心构造的 DTD，强制应用程序向攻击者无法直接访问的服务器发起外发 HTTP 请求。这可用于绕过防火墙限制；隐藏端口扫描等攻击的源头；或利用服务器与其他实体之间的信任关系。
DoS: 资源消耗（CPU）；DoS: 资源消耗（内存）
范围：可用性
产品可能会因使用指向大文件的 URI，或使用总是返回数据的设备（如 /dev/random），而消耗过多的 CPU 周期或内存。或者，URI 可能引用包含许多嵌套或递归实体引用的文件，从而进一步拖慢解析速度。

## 预防与缓解措施

阶段
缓解措施
实施；系统配置
许多 XML 解析器和验证器可以配置为禁用外部实体扩展。

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
XML
(普遍性未确定)
技术
类：非特定于技术
(流行度未确定)
类：基于 Web
（流行度未确定）

## 引入阶段

不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。
阶段
说明
实施
实现：此弱点是在实现架构安全策略期间导致的。

## 背景机制

XML 文档可以选择性地包含文档类型定义 (DTD)，它除了其他功能外，还支持定义 XML 实体。通过提供 URI 形式的替换字符串来定义实体是可能的。XML 解析器可以访问该 URI 的内容，并将这些内容嵌入回 XML 文档中以进行进一步处理。

## 补充说明与边界

关系
CWE-918
(SSRF) 和
CWE-611
(XXE) 密切相关，因为它们都涉及 Web 相关技术，并且可以向意外的目的地发起出站请求。然而，XXE 可以在客户端执行，或在软件不直接充当服务器的其他上下文环境中执行，因此 SSRF 缩写中的“服务器”(Server) 部分不一定适用。

## 官方英文定义（核对锚点）

Improper Restriction of XML External Entity Reference

The product processes an XML document that can contain XML entities with URIs that resolve to documents outside of the intended sphere of control, causing the product to embed incorrect documents into its output.

## 编目边界

抽象级别：Base；上游状态：Draft。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-611: 不当限制 XML 外部实体引用 / Improper Restriction of XML External Entity Reference](https://cwe.mitre.org/data/definitions/611.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/611.html)；官方英文定义与译文未逐句人工比对。
