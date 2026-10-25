---
{
  "schemaVersion": 2,
  "id": "wx-re-focus-vm-flatten-vs-virtualize",
  "title": "控制流平坦化与字节码虚拟化：按语义层区分",
  "type": "note",
  "tags": [
    "VM",
    "控制流平坦化",
    "状态机",
    "混淆"
  ],
  "project": "VM与去虚拟化",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "公开资料原创归纳（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "b1aec5e4e77ba9d14331aaac48f15ea2b8bd4d0db9f075030eb773845b8288e9",
  "generatedHash": "f89b43264541fef66dd72b272b7db833879646994dd2ad504874aa691db031f3",
  "archived": false,
  "verification": "已阅读相关来源并作机制归纳；构造示例未执行；未复现样本",
  "l0": "平坦化主要改写基本块调度，虚拟化引入指令解释层；两者可叠加，图形相似不能互相替代。",
  "l1": "平坦化通常保留业务基本块，通过状态变量决定下一块；虚拟化把业务表示成自定义指令，由处理器解释执行。判断要看被调度单元是原业务块还是可复用的虚拟操作，以及是否存在独立字节码和取指语义。 本库构造：一个switch的case直接完成“校验输入、累计总和、返回”，可能只是平坦化；若case完成“压常数、读槽、相加”，并从另一数组取操作码，更符合解释器模型。 编译器也可能把正常源码编成状态机，保护器则可能先平坦化再虚拟化。分类应允许“证据不足”和“混合形态”，不能只用节点度数、节名或循环次数给保护器贴标签。",
  "questions": [
    "怎么区分OLLVM平坦化和真正的保护VM？",
    "看到switch和状态变量就一定是字节码解释器吗？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "tigress-flat",
      "url": "https://tigress.wtf/flatten.html",
      "checkedAt": "2026-10-25",
      "version": "获取日公开文档；未固定上游提交"
    },
    {
      "id": "tigress-vm",
      "url": "https://tigress.wtf/virtualize.html",
      "checkedAt": "2026-10-25",
      "version": "获取日公开文档；未固定上游提交"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "万象知识库原创归纳；引文和原始资料权利归各自作者"
}
---
# 控制流平坦化与字节码虚拟化：按语义层区分

## 机制

平坦化通常保留业务基本块，通过状态变量决定下一块；虚拟化把业务表示成自定义指令，由处理器解释执行。判断要看被调度单元是原业务块还是可复用的虚拟操作，以及是否存在独立字节码和取指语义。

## 分析例与核对方法

本库构造：一个switch的case直接完成“校验输入、累计总和、返回”，可能只是平坦化；若case完成“压常数、读槽、相加”，并从另一数组取操作码，更符合解释器模型。

## 判断边界

编译器也可能把正常源码编成状态机，保护器则可能先平坦化再虚拟化。分类应允许“证据不足”和“混合形态”，不能只用节点度数、节名或循环次数给保护器贴标签。

## 来源与核验

- [Tigress Flatten](https://tigress.wtf/flatten.html)；作者/维护者：Tigress project；版本：获取日公开文档；未固定上游提交；核对日期：2026-10-25。
- [Tigress Virtualize](https://tigress.wtf/virtualize.html)；作者/维护者：Tigress project；版本：获取日公开文档；未固定上游提交；核对日期：2026-10-25。

本文是本库原创机制归纳。“本库构造”的例子用于说明判断方法，没有下载或执行论坛附件、保护样本；文献核对不等于实验复现。原始资料权利归其作者，本文不镜像论坛全文。
