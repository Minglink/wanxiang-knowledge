---
{
  "schemaVersion": 2,
  "id": "wx-re-focus-vm-taint-slice",
  "title": "VM数据切片：从业务结果回溯必要状态",
  "type": "note",
  "tags": [
    "VM",
    "污点分析",
    "程序切片",
    "数据依赖"
  ],
  "project": "VM与去虚拟化",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "公开资料原创归纳（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f5ad99e5c77f4f45624f9011febf6a719db0f99837800af4a3889e7240bc41b7",
  "generatedHash": "faf7cfd324f1fa4791f128490595e00b8fd44bc7584e0412d1fbc4141a7c1dfa",
  "archived": false,
  "verification": "已阅读相关来源并作机制归纳；构造示例未执行；未复现样本",
  "l0": "切片保留影响研究目标的计算，不能把未染色的全部代码直接认定为无用。",
  "l1": "从结果寄存器或写出的字节出发，逆向追踪产生它们的定义，再考虑访存别名和控制依赖。污点分析可缩小与输入相关的状态范围；但一个不含输入污点的常量仍可能决定分支、访存地址或解释器解码。 本库构造：输出out=table[x&3]。table初始化没有依赖x，但删除它会改变结果。只保留染色算术会遗漏查表内容；正确切片还需要包括表的相关定义和决定地址的掩码运算。 未知函数、间接存储和共享内存应保守处理。Triton的动态污点与LLVM的静态别名分析承担不同职责，不能把一个工具的“未发现依赖”当成另一个模型中的不依赖证明。",
  "questions": [
    "VM轨迹怎样围绕结果做数据切片？",
    "污点没传播到结果是否说明代码可以删除？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "triton",
      "url": "https://triton-library.github.io/",
      "checkedAt": "2026-10-25",
      "version": "获取日公开文档；未固定上游提交"
    },
    {
      "id": "llvm-alias",
      "url": "https://llvm.org/docs/AliasAnalysis.html",
      "checkedAt": "2026-10-25",
      "version": "获取日公开文档；未固定上游提交"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "万象知识库原创归纳；引文和原始资料权利归各自作者"
}
---
# VM数据切片：从业务结果回溯必要状态

## 机制

从结果寄存器或写出的字节出发，逆向追踪产生它们的定义，再考虑访存别名和控制依赖。污点分析可缩小与输入相关的状态范围；但一个不含输入污点的常量仍可能决定分支、访存地址或解释器解码。

## 分析例与核对方法

本库构造：输出out=table[x&3]。table初始化没有依赖x，但删除它会改变结果。只保留染色算术会遗漏查表内容；正确切片还需要包括表的相关定义和决定地址的掩码运算。

## 判断边界

未知函数、间接存储和共享内存应保守处理。Triton的动态污点与LLVM的静态别名分析承担不同职责，不能把一个工具的“未发现依赖”当成另一个模型中的不依赖证明。

## 来源与核验

- [Triton dynamic binary analysis](https://triton-library.github.io/)；作者/维护者：Jonathan Salwan and contributors；版本：获取日公开文档；未固定上游提交；核对日期：2026-10-25。
- [LLVM Alias Analysis](https://llvm.org/docs/AliasAnalysis.html)；作者/维护者：LLVM project；版本：获取日公开文档；未固定上游提交；核对日期：2026-10-25。

本文是本库原创机制归纳。“本库构造”的例子用于说明判断方法，没有下载或执行论坛附件、保护样本；文献核对不等于实验复现。原始资料权利归其作者，本文不镜像论坛全文。
