---
{
  "schemaVersion": 2,
  "id": "wx-re-focus-crypto-hkdf-context",
  "title": "HKDF：提取、扩展与上下文绑定",
  "type": "note",
  "tags": [
    "加密算法",
    "HKDF",
    "KDF",
    "salt",
    "info",
    "HKDF密钥派生"
  ],
  "project": "密码算法机制",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "公开资料原创归纳（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "d9ad8c0b566a4b5379e8234e717c05ff1f925f0cd2411d4454ecd98775e4710f",
  "generatedHash": "5800c96cb8e4355f23bbb52269f77d9df615899b1016cc28f84243542f4c8ddd",
  "archived": false,
  "verification": "已阅读相关来源并作机制归纳；构造示例未执行；未复现样本",
  "l0": "HKDF的salt与info承担不同职责，改变用途标识会改变扩展结果。",
  "l1": "RFC5869把HKDF分为Extract与Expand。前者从输入材料得到伪随机密钥，后者结合info和计数器产生指定长度输出。info用于把派生结果绑定到协议用途、方向或其他上下文，不能简单当作另一个盐值。 本库构造：客户端发送密钥与接收密钥来自同一输入材料，但分别使用不同用途字符串。两条结果不同是预期行为；若复现只复制salt而遗漏info，就会在密码核心完全正确时仍得到错误结果。 HKDF不负责把低熵口令变成难以猜测的秘密，也不是慢速口令哈希。输出长度、哈希选择及省略salt的规则应按协议核对；记录字段的原始字节，避免大小写或终止符改变上下文。",
  "questions": [
    "HKDF的salt和info能互换吗？",
    "为什么共享密钥相同却派生出不同通信密钥？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "hkdf",
      "url": "https://www.rfc-editor.org/rfc/rfc5869.txt",
      "checkedAt": "2026-10-25",
      "version": "获取日公开文档；未固定上游提交"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "万象知识库原创归纳；引文和原始资料权利归各自作者"
}
---
# HKDF：提取、扩展与上下文绑定

## 机制

RFC5869把HKDF分为Extract与Expand。前者从输入材料得到伪随机密钥，后者结合info和计数器产生指定长度输出。info用于把派生结果绑定到协议用途、方向或其他上下文，不能简单当作另一个盐值。

## 分析例与核对方法

本库构造：客户端发送密钥与接收密钥来自同一输入材料，但分别使用不同用途字符串。两条结果不同是预期行为；若复现只复制salt而遗漏info，就会在密码核心完全正确时仍得到错误结果。

## 判断边界

HKDF不负责把低熵口令变成难以猜测的秘密，也不是慢速口令哈希。输出长度、哈希选择及省略salt的规则应按协议核对；记录字段的原始字节，避免大小写或终止符改变上下文。

## 来源与核验

- [RFC 5869 HKDF](https://www.rfc-editor.org/rfc/rfc5869.txt)；作者/维护者：H. Krawczyk and P. Eronen；版本：获取日公开文档；未固定上游提交；核对日期：2026-10-25。

本文是本库原创机制归纳。“本库构造”的例子用于说明判断方法，没有下载或执行论坛附件、保护样本；文献核对不等于实验复现。原始资料权利归其作者，本文不镜像论坛全文。
