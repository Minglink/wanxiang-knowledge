---
{
  "schemaVersion": 2,
  "id": "wx-re-focus-crypto-sm3-interface",
  "title": "SM3与SHA-256：相同摘要长度不能替代算法身份",
  "type": "note",
  "tags": [
    "加密算法",
    "SM3",
    "摘要",
    "OpenSSL",
    "国密SM3"
  ],
  "project": "密码算法机制",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "公开资料原创归纳（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "9bc0afbc959efc997fd757a177b97e856e62a833de0f5bfdadcd7a67736e354b",
  "generatedHash": "1e8b050e65193b63e4663e3c05eecb5f0b9ef32025cd6e33e895007834b710af",
  "archived": false,
  "verification": "已阅读相关来源并作机制归纳；构造示例未执行；未复现样本",
  "l0": "SM3与其他256位摘要可能输出同样长度，算法获取名称和实际调用链才是重要证据。",
  "l1": "OpenSSL以EVP摘要接口提供SM3。研究流式摘要时，应关联算法对象或获取名称、初始化、若干更新和最终输出。多次update的拼接结果定义实际消息，不能只看最后一个缓冲区或输出长度判断输入。 本库构造：先update消息头，再update正文，与只哈希正文不同。若两端都输出32字节而内容不符，应先核对算法选择和累计输入；不必立即假设SM3实现内部做了修改。 本卡依据接口文档讨论使用证据，没有从该来源推导轮函数或密码强度结论。摘要、带密钥认证和签名分别属于不同机制，普通摘要匹配也无法独立证明发送者身份。",
  "questions": [
    "32字节结果如何区分SM3和SHA-256？",
    "SM3摘要接口的输入边界怎样核对？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-sha-state",
      "kind": "相关机制"
    }
  ],
  "externalSources": [
    {
      "id": "sm3",
      "url": "https://docs.openssl.org/3.5/man7/EVP_MD-SM3/",
      "checkedAt": "2026-10-25",
      "version": "获取日公开文档；未固定上游提交"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "万象知识库原创归纳；引文和原始资料权利归各自作者"
}
---
# SM3与SHA-256：相同摘要长度不能替代算法身份

## 机制

OpenSSL以EVP摘要接口提供SM3。研究流式摘要时，应关联算法对象或获取名称、初始化、若干更新和最终输出。多次update的拼接结果定义实际消息，不能只看最后一个缓冲区或输出长度判断输入。

## 分析例与核对方法

本库构造：先update消息头，再update正文，与只哈希正文不同。若两端都输出32字节而内容不符，应先核对算法选择和累计输入；不必立即假设SM3实现内部做了修改。

## 判断边界

本卡依据接口文档讨论使用证据，没有从该来源推导轮函数或密码强度结论。摘要、带密钥认证和签名分别属于不同机制，普通摘要匹配也无法独立证明发送者身份。

## 来源与核验

- [SM3 EVP provider documentation](https://docs.openssl.org/3.5/man7/EVP_MD-SM3/)；作者/维护者：OpenSSL project；版本：获取日公开文档；未固定上游提交；核对日期：2026-10-25。

本文是本库原创机制归纳。“本库构造”的例子用于说明判断方法，没有下载或执行论坛附件、保护样本；文献核对不等于实验复现。原始资料权利归其作者，本文不镜像论坛全文。
