---
{
  "schemaVersion": 2,
  "id": "wx-re-focus-vm-lifting-memory",
  "title": "二进制提升：寄存器之外还要保留内存语义",
  "type": "note",
  "tags": [
    "VM",
    "Remill",
    "IR提升",
    "内存模型"
  ],
  "project": "VM与去虚拟化",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "公开资料原创归纳（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "bef63bef443c243314ad27fbf77e635ecf33588d054fd66dac8f2748d9d89813",
  "generatedHash": "3eb752a16f2031f061b7b14c765c056120a1c443d1f4218f2349ee4f8469bc23",
  "archived": false,
  "verification": "已阅读相关来源并作机制归纳；构造示例未执行；未复现样本",
  "l0": "把机器码提升到IR需要同时表达寄存器、内存与指令副作用，单纯翻译算术表达式并不充分。",
  "l1": "提升器把架构指令的语义表示为中间代码，寄存器状态和内存访问是连接指令的关键部分。研究者必须确定地址空间、访问宽度、字节序及调用约定。把内存视为单纯常量数组可能使自修改或间接写入失去意义。 本库构造：先写[ptr]=7，再通过另一个别名q读取；若模型错误地认为ptr与q永不重叠，优化可能保留旧值。表达式虽然变短，但它已经改变原始程序允许的行为。 提升后的优化结果只在建模假设成立时有效。异常、原子性、特殊指令和外部调用是否被支持，应逐项核对具体框架与架构；本库没有编译Remill或验证真实保护样本。",
  "questions": [
    "Remill提升代码时为什么需要State和Memory？",
    "IR看起来简洁为什么实际回放不等价？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-decompiler-evidence",
      "kind": "相关机制"
    }
  ],
  "externalSources": [
    {
      "id": "remill",
      "url": "https://raw.githubusercontent.com/lifting-bits/remill/master/README.md",
      "checkedAt": "2026-10-25",
      "version": "获取日公开文档；未固定上游提交"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "万象知识库原创归纳；引文和原始资料权利归各自作者"
}
---
# 二进制提升：寄存器之外还要保留内存语义

## 机制

提升器把架构指令的语义表示为中间代码，寄存器状态和内存访问是连接指令的关键部分。研究者必须确定地址空间、访问宽度、字节序及调用约定。把内存视为单纯常量数组可能使自修改或间接写入失去意义。

## 分析例与核对方法

本库构造：先写[ptr]=7，再通过另一个别名q读取；若模型错误地认为ptr与q永不重叠，优化可能保留旧值。表达式虽然变短，但它已经改变原始程序允许的行为。

## 判断边界

提升后的优化结果只在建模假设成立时有效。异常、原子性、特殊指令和外部调用是否被支持，应逐项核对具体框架与架构；本库没有编译Remill或验证真实保护样本。

## 来源与核验

- [Remill semantics lifting](https://raw.githubusercontent.com/lifting-bits/remill/master/README.md)；作者/维护者：Remill contributors；版本：获取日公开文档；未固定上游提交；核对日期：2026-10-25。

本文是本库原创机制归纳。“本库构造”的例子用于说明判断方法，没有下载或执行论坛附件、保护样本；文献核对不等于实验复现。原始资料权利归其作者，本文不镜像论坛全文。
