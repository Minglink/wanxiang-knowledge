---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-455",
  "title": "CWE-455: 初始化失败时未退出",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-455"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "fe740c127b038efeeba73ee9a42f6ba531f5441f551243dc1422929475c07183",
  "generatedHash": "9533a817772a8f0081bba68cf45e982d1b6d35671bdd801be8969b95c7cd81f3",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "当初始化期间发生与安全相关的错误（例如配置文件格式错误或无法激活硬件安全模块 (HSM)）时，该产品不会退出或修改其操作，这可能导致产品以比管理员预期更不安全的方式执行。",
  "l1": "当初始化期间发生与安全相关的错误（例如配置文件格式错误或无法激活硬件安全模块 (HSM)）时，该产品不会退出或修改其操作，这可能导致产品以比管理员预期更不安全的方式执行。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 修改应用程序数据；改变执行逻辑 范围: 完整性，其他 应用程序可能处于不安全状态，这可能允许攻击者修改敏感数据或执行非预期的逻辑。 阶段 缓解措施 实施 遵循出现错误时安全失败的原则。系统应进入一种不容易受攻击的状态，并且不会向潜在攻击者显示敏感错误消息。 此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名",
  "questions": [
    "CWE-455: 初始化失败时未退出的原理是什么？",
    "CWE-455: 初始化失败时未退出有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "cwe-455",
      "url": "https://cwe.mitre.org/data/definitions/455.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-455: 初始化失败时未退出

## 缺陷定义

当初始化期间发生与安全相关的错误（例如配置文件格式错误或无法激活硬件安全模块 (HSM)）时，该产品不会退出或修改其操作，这可能导致产品以比管理员预期更不安全的方式执行。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
修改应用程序数据；改变执行逻辑
范围: 完整性，其他
应用程序可能处于不安全状态，这可能允许攻击者修改敏感数据或执行非预期的逻辑。

## 预防与缓解措施

阶段
缓解措施
实施
遵循出现错误时安全失败的原则。系统应进入一种不容易受攻击的状态，并且不会向潜在攻击者显示敏感错误消息。

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

研究差距
研究不足。这些问题不常被报告，且很难找到已发布的示例。

## 官方英文定义（核对锚点）

Non-exit on Failed Initialization

The product does not exit or otherwise modify its operation when security-relevant errors occur during initialization, such as when a configuration file has a format error or a hardware security module (HSM) cannot be activated, which can cause the product to execute in a less secure fashion than intended by the administrator.

## 编目边界

抽象级别：Base；上游状态：Draft。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-455: 初始化失败时未退出 / Non-exit on Failed Initialization](https://cwe.mitre.org/data/definitions/455.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/455.html)；官方英文定义与译文未逐句人工比对。
