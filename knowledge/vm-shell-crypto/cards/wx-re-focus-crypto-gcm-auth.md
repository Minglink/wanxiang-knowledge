---
{
  "schemaVersion": 2,
  "id": "wx-re-focus-crypto-gcm-auth",
  "title": "GCM：密文、附加数据和认证标签是一组验证对象",
  "type": "note",
  "tags": [
    "加密算法",
    "GCM",
    "AEAD",
    "AAD",
    "认证标签"
  ],
  "project": "密码算法机制",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "公开资料原创归纳（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "3de9fd8ea5be6fec137c72f4ddf933735431f3453f19b35ab0d09455ffebc9ec",
  "generatedHash": "845e2f27306bc5c9cf8e480672699fbaaa705974e5efe5cb98e663e7aebd9c32",
  "archived": false,
  "verification": "已阅读相关来源并作机制归纳；构造示例未执行；未复现样本",
  "l0": "GCM把机密性与认证组合起来，正确性检查必须覆盖nonce、密文、AAD和标签。",
  "l1": "GCM是带附加数据的认证加密模式。附加数据参与认证而不被加密，标签绑定相关输入。逆向封装时要记录各字段边界与长度、nonce构造、AAD的字节级表示和标签位置，再解释解密状态。 本库构造：消息头版本号作为AAD，正文是密文。正文未改动而版本号变化，验证仍应失败。若只把正文送入解密而漏掉消息头，就可能得到候选明文却无法匹配标签。 未验证的候选明文不能当作可信输出。同一密钥下nonce唯一性是关键约束，标签截断与使用上限还受具体规范限制。本文只核对既有规范机制，未给特定系统作密码设计选型。",
  "questions": [
    "GCM解出了明文但tag不匹配能算成功吗？",
    "AAD为什么不加密却会影响认证？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-aes-shape",
      "kind": "相关机制"
    }
  ],
  "externalSources": [
    {
      "id": "gcm",
      "url": "https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf",
      "checkedAt": "2026-10-25",
      "version": "SP 800-38D (2007)"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "万象知识库原创归纳；引文和原始资料权利归各自作者"
}
---
# GCM：密文、附加数据和认证标签是一组验证对象

## 机制

GCM是带附加数据的认证加密模式。附加数据参与认证而不被加密，标签绑定相关输入。逆向封装时要记录各字段边界与长度、nonce构造、AAD的字节级表示和标签位置，再解释解密状态。

## 分析例与核对方法

本库构造：消息头版本号作为AAD，正文是密文。正文未改动而版本号变化，验证仍应失败。若只把正文送入解密而漏掉消息头，就可能得到候选明文却无法匹配标签。

## 判断边界

未验证的候选明文不能当作可信输出。同一密钥下nonce唯一性是关键约束，标签截断与使用上限还受具体规范限制。本文只核对既有规范机制，未给特定系统作密码设计选型。

## 来源与核验

- [SP 800-38D GCM](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf)；作者/维护者：NIST；版本：SP 800-38D (2007)；核对日期：2026-10-25。

本文是本库原创机制归纳。“本库构造”的例子用于说明判断方法，没有下载或执行论坛附件、保护样本；文献核对不等于实验复现。原始资料权利归其作者，本文不镜像论坛全文。
