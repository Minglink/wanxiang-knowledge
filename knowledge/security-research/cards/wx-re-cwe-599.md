---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-599",
  "title": "CWE-599: 未验证 OpenSSL 证书",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-599",
    "密码与证书",
    "输入验证"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "39f759fc2941d04dae12871c73841fb296a96ff7f522f1e3828cb74fa784efaf",
  "generatedHash": "1af90300d6136827deab600ef7cd2cdd58ef9e535c30d495fe7f556aae8e6dcb",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "产品使用 OpenSSL 并信任或使用证书，而没有使用 SSL_get_verify_result() 函数来确保该证书满足所有必要的安全要求。",
  "l1": "产品使用 OpenSSL 并信任或使用证书，而没有使用 SSL_get_verify_result() 函数来确保该证书满足所有必要的安全要求。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 读取应用程序数据 范围：机密性 读取的数据可能未得到妥善保护——攻击者可能会查看这些数据。 绕过保护机制；获取特权或冒充身份 范围: 访问控制 对相关系统的信任可能导致欺骗或重定向攻击。 获取特权或冒充身份 范围: 访问控制 如果不检查证书，可能会通过重定向或欺骗攻击，使持有有效证书的恶意主机伪装成受信任的主机来提供数据。虽然相关的攻击者可能拥有",
  "questions": [
    "CWE-599: 未验证 OpenSSL 证书的原理是什么？",
    "CWE-599: 未验证 OpenSSL 证书有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-cwe-295",
      "kind": "ChildOf"
    }
  ],
  "externalSources": [
    {
      "id": "cwe-599",
      "url": "https://cwe.mitre.org/data/definitions/599.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-599: 未验证 OpenSSL 证书

## 缺陷定义

产品使用 OpenSSL 并信任或使用证书，而没有使用 SSL_get_verify_result() 函数来确保该证书满足所有必要的安全要求。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
读取应用程序数据
范围：机密性
读取的数据可能未得到妥善保护——攻击者可能会查看这些数据。
绕过保护机制；获取特权或冒充身份
范围: 访问控制
对相关系统的信任可能导致欺骗或重定向攻击。
获取特权或冒充身份
范围: 访问控制
如果不检查证书，可能会通过重定向或欺骗攻击，使持有有效证书的恶意主机伪装成受信任的主机来提供数据。虽然相关的攻击者可能拥有有效证书，但这可能仅仅是另一个站点的有效证书。这可能允许攻击者使用无效证书声称自己是受信任的主机、使用过期证书或进行其他攻击，而如果对证书进行了正确验证，这些攻击本可以被检测到。为了确保数据完整性，我们必须检查证书是否有效，以及它是否属于我们希望访问的站点。

## 预防与缓解措施

阶段
缓解措施
架构与设计
确保在系统设计中包含正确的身份验证。
实施
理解并正确实施所有必要的检查，以确保加密通信中相关实体的身份。

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
CWE-295
和
CWE-599
非常相似，尽管
CWE-599
的范围更窄，仅适用于 OpenSSL 证书。因此，
CWE-295
的其他子项也可以被视为
CWE-599
的子项。CWE 使用的一维层级关系并不适合处理基于资源类型（“OpenSSL 证书”作为“任何证书”的子项）和行为类型（“未验证过期”作为“不当验证”的子项）等概念的不同抽象关系。

## 官方英文定义（核对锚点）

Missing Validation of OpenSSL Certificate

The product uses OpenSSL and trusts or uses a certificate without using the SSL_get_verify_result() function to ensure that the certificate satisfies all necessary security requirements.

## 编目边界

抽象级别：Variant；上游状态：Incomplete。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-599: 未验证 OpenSSL 证书 / Missing Validation of OpenSSL Certificate](https://cwe.mitre.org/data/definitions/599.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/599.html)；官方英文定义与译文未逐句人工比对。
