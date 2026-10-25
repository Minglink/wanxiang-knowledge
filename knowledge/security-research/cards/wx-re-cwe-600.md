---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-600",
  "title": "CWE-600: Servlet 中未捕获的异常",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-600"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "e88c47406e49dea0f659991a78bf83207cfd00c6f2bc2294118024e67bcdad74",
  "generatedHash": "11f04e7da5fe6a1d01f3133299c52b5138cc274a8a671df31fb66df76f227d74",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "Servlet 未能捕获所有异常，这可能会泄露敏感的调试信息。",
  "l1": "Servlet 未能捕获所有异常，这可能会泄露敏感的调试信息。 当 Servlet 抛出异常时，Servlet 容器发送回用户的默认错误响应通常会包含调试信息。这些信息对攻击者极具价值。例如，堆栈跟踪可能会向攻击者展示格式错误的 SQL 查询字符串、所使用的数据库类型以及应用程序容器的版本。这些信息使攻击者能够针对这些组件中的已知漏洞进行攻击。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 读取应用程序数据；拒绝服务 (DoS)：崩溃、退出或重启 范围：机密性、可用性 阶段 缓解措施 实施 实现异常捕获块 (Exception blo",
  "questions": [
    "CWE-600: Servlet 中未捕获的异常的原理是什么？",
    "CWE-600: Servlet 中未捕获的异常有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-cwe-248",
      "kind": "ChildOf"
    }
  ],
  "externalSources": [
    {
      "id": "cwe-600",
      "url": "https://cwe.mitre.org/data/definitions/600.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-600: Servlet 中未捕获的异常

## 缺陷定义

Servlet 未能捕获所有异常，这可能会泄露敏感的调试信息。

## 机制与扩展说明

当 Servlet 抛出异常时，Servlet 容器发送回用户的默认错误响应通常会包含调试信息。这些信息对攻击者极具价值。例如，堆栈跟踪可能会向攻击者展示格式错误的 SQL 查询字符串、所使用的数据库类型以及应用程序容器的版本。这些信息使攻击者能够针对这些组件中的已知漏洞进行攻击。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
读取应用程序数据；拒绝服务 (DoS)：崩溃、退出或重启
范围：机密性、可用性

## 预防与缓解措施

阶段
缓解措施
实施
实现异常捕获块 (Exception blocks) 以处理所有类型的异常。

## 适用平台

此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。
语言 (复数)
Java
(流行程度未定)
技术
Web 服务器
（流行度未确定）

## 引入阶段

不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。
阶段
说明
实施

## 补充说明与边界

维护
“缺失的 Catch 块”这一概念可能不仅仅局限于 Servlet，但 CWE 中并未充分涵盖更广泛的概念。

## 官方英文定义（核对锚点）

Uncaught Exception in Servlet

The Servlet does not catch all exceptions, which may reveal sensitive debugging information.

## 编目边界

抽象级别：Variant；上游状态：Draft。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-600: Servlet 中未捕获的异常 / Uncaught Exception in Servlet](https://cwe.mitre.org/data/definitions/600.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/600.html)；官方英文定义与译文未逐句人工比对。
