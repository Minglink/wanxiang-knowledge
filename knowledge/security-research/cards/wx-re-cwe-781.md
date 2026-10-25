---
{
  "schemaVersion": 2,
  "id": "wx-re-cwe-781",
  "title": "CWE-781：使用 METHOD_NEITHER I/O 控制代码的 IOCTL 中存在不当地址验证",
  "type": "note",
  "tags": [
    "漏洞研究",
    "CWE",
    "CWE-781",
    "输入验证"
  ],
  "project": "漏洞研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:research-2026-10-25-002",
  "sourceTitle": "外部公开技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "04f36f728d846cb94ba35fe18cccc9834534a7bfc806ac68660136fb2b2ea0ba",
  "generatedHash": "813c53214bc09ec9df10507edae7a89550c1f95bd86d56ed541a087494c6dffb",
  "archived": false,
  "verification": "自动摘编；译文未逐句人工复核；未实测",
  "l0": "产品定义了使用 METHOD_NEITHER 进行 I/O 的 IOCTL，但未验证或错误地验证了所提供的地址。",
  "l1": "产品定义了使用 METHOD_NEITHER 进行 I/O 的 IOCTL，但未验证或错误地验证了所提供的地址。 当 IOCTL 使用 METHOD_NEITHER 选项进行 I/O 控制时，IOCTL 有责任验证提供给它的地址。如果验证缺失或不正确，攻击者可以提供任意内存地址，从而导致代码执行或拒绝服务。 此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。 影响 详细信息 修改内存；读取内存；执行未经授权的代码或命令；DoS：崩溃、退出或重启 范围：完整性、可用性、机密性 攻击者可能能够访问属于其他进程或用户的内存。如果攻击者可以控制 IOCTL 写入的",
  "questions": [
    "CWE-781：使用 METHOD_NEITHER I/O 控制代码的 IOCTL 中存在不当地址验证的原理是什么？",
    "CWE-781：使用 METHOD_NEITHER I/O 控制代码的 IOCTL 中存在不当地址验证有哪些边界和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-cwe-822",
      "kind": "CanPrecede"
    }
  ],
  "externalSources": [
    {
      "id": "cwe-781",
      "url": "https://cwe.mitre.org/data/definitions/781.html",
      "checkedAt": "2026-10-25",
      "mode": "CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML"
    }
  ],
  "batchId": "research-2026-10-25-002",
  "contentLicense": "CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation"
}
---
# CWE-781：使用 METHOD_NEITHER I/O 控制代码的 IOCTL 中存在不当地址验证

## 缺陷定义

产品定义了使用 METHOD_NEITHER 进行 I/O 的 IOCTL，但未验证或错误地验证了所提供的地址。

## 机制与扩展说明

当 IOCTL 使用 METHOD_NEITHER 选项进行 I/O 控制时，IOCTL 有责任验证提供给它的地址。如果验证缺失或不正确，攻击者可以提供任意内存地址，从而导致代码执行或拒绝服务。

## 可能后果及作用范围

此表指定了与该弱点相关的不同个体后果。“范围”识别被违规的应用安全领域，而“影响”描述如果攻击者成功利用该弱点所产生的负面技术影响。“可能性”提供有关相对于列表中其他后果，特定后果被预期的可能性信息。例如，某种弱点可能极有可能被利用以实现某种影响，但利用它来实现另一种影响的可能性则很低。
影响
详细信息
修改内存；读取内存；执行未经授权的代码或命令；DoS：崩溃、退出或重启
范围：完整性、可用性、机密性
攻击者可能能够访问属于其他进程或用户的内存。如果攻击者可以控制 IOCTL 写入的内容，可能会导致在高权限级别下执行代码。至少会导致程序崩溃。

## 预防与缓解措施

阶段
缓解措施
实施
如果 IOCTL 必须使用 METHOD_NEITHER，则确保在首次访问所有用户空间地址之前对其进行正确验证。ProbeForRead 和 ProbeForWrite 例程可用于此任务。此外，请妥善保护和管理用户提供的缓冲区，因为当使用 METHOD_NEITHER 时，I/O 管理器不会执行此操作。请参阅参考文献。
架构与设计
如果可能，避免在 IOCTL 中使用 METHOD_NEITHER，并选择能有效控制缓冲区大小的方法，例如 METHOD_BUFFERED、METHOD_IN_DIRECT 或 METHOD_OUT_DIRECT。
架构与设计；实现
如果该 IOCTL 是仅供受信任用户访问的驱动程序的一部分，则应对相关的设备或设备命名空间使用适当的访问控制。请参阅参考文献。

## 适用平台

此列表显示了给定弱点可能出现的潜在领域。这些可能是针对特定的命名语言、操作系统、架构、范式、技术或此类平台的一类。平台与其出现频率一起列出。
语言 (复数)
C
(通常较普遍)
C++
(通常较普遍)
操作系统 (复数)
Windows NT
(有时普遍存在)

## 引入阶段

不同的引入模式提供了关于这种弱点如何以及何时被引入的信息。“阶段”识别可能发生引入的生命周期点，而“备注”提供了与给定阶段引入相关的典型场景。
阶段
说明
实施

## 补充说明与边界

适用平台
由于 IOCTL 功能通常执行低级操作并与操作系统紧密交互，因此该弱点可能仅出现在使用低级语言编写的代码中。
研究差距
虽然这类问题自 2006 年以来就已广为人知，但可能仍未得到充分研究和报告。大部分关注点集中在高知名度的软件和安全产品上，但其他类型的系统软件也使用驱动程序。由于利用该漏洞需要开发自定义代码，因此发现此弱点需要一定的技术能力。
由于利用该漏洞通常需要本地权限，因此它可能不是活跃攻击者的首选目标。但是，对于设备驱动程序等软件，远程利用可能是可能的。即使在没有远程攻击向量的情况下，它也可能在针对应用层软件的多阶段远程攻击中作为最终权限提升的步骤，或者作为多用户系统上本地用户的主要攻击手段。

## 官方英文定义（核对锚点）

Improper Address Validation in IOCTL with METHOD_NEITHER I/O Control Code

The product defines an IOCTL that uses METHOD_NEITHER for I/O, but it does not validate or incorrectly validates the addresses that are provided.

## 编目边界

抽象级别：Variant；上游状态：Draft。这是弱点机制条目，不等同于某一具体 CVE，也不证明某个程序已存在该缺陷。正文中未提供的检测或修复条件不能自行视为已满足。

## 来源、版本与核验

- 来源：[CWE-781：使用 METHOD_NEITHER I/O 控制代码的 IOCTL 中存在不当地址验证 / Improper Address Validation in IOCTL with METHOD_NEITHER I/O Control Code](https://cwe.mitre.org/data/definitions/781.html)
- 作者/维护者：The MITRE Corporation / CWE 内容团队；中文参照 cwe.org.cn
- 获取日期：2026-10-25。官方 XML 快照 CWE 4.20；中文页面另行获取
- 收录方式：CWE 许可内容摘编：定义、机制、检测和缓解；原编号对应官方 XML。自动摘编；译文未逐句人工复核；未实测。
- 许可：CWE Terms of Use；Copyright © 2006–2026 The MITRE Corporation。原始署名及相关许可保留在本批 sources 附件中。
- 中文参考页面：[同编号译文](https://cwe.org.cn/data/definitions/781.html)；官方英文定义与译文未逐句人工比对。
