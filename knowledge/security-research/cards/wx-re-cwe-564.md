---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-564",
  "title": "CWE-564: SQL 注入：Hibernate",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-564",
    "输入验证"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "43418002510c10b6709e3fcaaa73b7d6dc1bc9088fd0ae0f27ce838ef218f166",
  "generatedHash": "9bcc02a061fb653fce285eaeb8e9f4e14f4abd8f7566050224b42300b7f932e4",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "使用 Hibernate 执行由用户控制的输入构建的动态 SQL 语句，可能允许攻击者修改该语句的含义或执行任意的 SQL 命令。",
  "l1": "使用 Hibernate 执行由用户控制的输入构建的动态 SQL 语句，可能允许攻击者修改该语句的含义或执行任意的 SQL 命令。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 读取应用程序数据；修改应用程序数据 范围：机密性、完整性 阶段 缓解措施 需求 可以选择不受此缺陷影响的非 SQL 类型数据库。 架构与设计 在为 SQL 数据库创建用户账户时，请遵循最小权限原则。用户应仅拥有使用其账户所需的最低权限。如果系统需求规定用户可以读取和修改自己的数据，则应限制其权限，使其无法读取/写入他人的数据。 架构与设计 对于在客户端执行的任",
  "questions": [
    "CWE-564: SQL 注入：Hibernate的原理是什么？",
    "CWE-564: SQL 注入：Hibernate有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-cwe-89",
      "kind": "ChildOf"
    }
  ],
  "externalSources": [
    {
      "id": "cwe-564",
      "url": "https://cwe.mitre.org/data/definitions/564.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-564: SQL 注入：Hibernate

## 缺陷定义

使用 Hibernate 执行由用户控制的输入构建的动态 SQL 语句，可能允许攻击者修改该语句的含义或执行任意的 SQL 命令。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
读取应用程序数据；修改应用程序数据
范围：机密性、完整性

## 预防与缓解措施

阶段
缓解措施
需求
可以选择不受此缺陷影响的非 SQL 类型数据库。
架构与设计
在为 SQL 数据库创建用户账户时，请遵循最小权限原则。用户应仅拥有使用其账户所需的最低权限。如果系统需求规定用户可以读取和修改自己的数据，则应限制其权限，使其无法读取/写入他人的数据。
架构与设计
对于在客户端执行的任何安全检查，请确保在服务器端重复这些检查，以避免
CWE-602
。攻击者可以通过在检查执行后修改值，或修改客户端以完全移除客户端检查来绕过这些检查。随后，这些被修改的值将被提交到服务器。
实施
使用绑定变量的预编译语句（Prepared Statements）来实现 SQL 字符串。不绑定变量的预编译语句可能容易受到攻击。
实施
对任何可能用于 SQL 命令的用户输入，实施严格的允许列表式检查。与其转义元字符，不如完全禁止它们，这是最安全的做法。原因：在数据库中输入的后续数据在使用前可能会忽略转义元字符。应根据请求中参数的预期值，严格定义安全字符集。

## 适用平台

此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。
语言 (复数)
SQL
(通常普遍存在)
技术
数据库服务器
(普遍程度未定)

## 引入阶段

不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。
阶段
说明
架构与设计
实施

## 官方英文定义（核对锚点）

SQL Injection: Hibernate

Using Hibernate to execute a dynamic SQL statement built with user-controlled input can allow an attacker to modify the statement's meaning or to execute arbitrary SQL commands.

## 编目边界

抽象级别：Variant；上游状态：Incomplete。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-564: SQL 注入：Hibernate / SQL Injection: Hibernate](https://cwe.mitre.org/data/definitions/564.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/564.html)；官方英文定义与译文未逐句人工比对。
