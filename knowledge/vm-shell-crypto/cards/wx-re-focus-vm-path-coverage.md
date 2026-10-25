---
{
  "schemaVersion": 2,
  "id": "wx-re-focus-vm-path-coverage",
  "title": "动态去虚拟化：轨迹覆盖与函数语义覆盖",
  "type": "note",
  "tags": [
    "VM",
    "动态符号执行",
    "路径覆盖",
    "语义验证"
  ],
  "project": "VM与去虚拟化",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "公开资料原创归纳（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "e9f008a699e8e50a3fbf0d4f5f61f85abbfc85cf7be864a1871593d60485738c",
  "generatedHash": "484050c2d28c42669688ed2cdef12b183ed66b0594289a7cc1ee98ad55b4bd98",
  "archived": false,
  "verification": "已阅读相关来源并作机制归纳；构造示例未执行；未复现样本",
  "l0": "一条动态轨迹只展示一次执行，表达式恢复必须说明没有覆盖的分支。",
  "l1": "动态分析把本次执行的状态变化转成表达式或约束，沿途没执行的分支并不会自动出现。应分开报告本机指令覆盖、虚拟指令覆盖和业务路径覆盖；这三者的数量不可直接互换，尤其在循环和解释器复用时。 本库构造：输入x=1经过正数分支，恢复出x+1；x=-1原本应返回0。用正数轨迹合成的表达式在已采路径正确，仍不能代表函数。复核时应让边界值、分支另一侧和异常输入进入候选集合。 增加输入样本能发现反例，但有限样本不构成普遍等价证明。符号模型需要明确位宽、内存和外部调用假设；路径爆炸或求解超时应报告覆盖不足，不能写成目标分支不存在。",
  "questions": [
    "单条轨迹能还原整个虚拟化函数吗？",
    "如何避免把未经过的分支当成死代码？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-symbolic-constraints",
      "kind": "相关机制"
    }
  ],
  "externalSources": [
    {
      "id": "vmp-research",
      "url": "https://raw.githubusercontent.com/JonathanSalwan/VMProtect-devirtualization/main/README.md",
      "checkedAt": "2026-10-25",
      "version": "获取日公开文档；未固定上游提交"
    },
    {
      "id": "triton",
      "url": "https://triton-library.github.io/",
      "checkedAt": "2026-10-25",
      "version": "获取日公开文档；未固定上游提交"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "万象知识库原创归纳；引文和原始资料权利归各自作者"
}
---
# 动态去虚拟化：轨迹覆盖与函数语义覆盖

## 机制

动态分析把本次执行的状态变化转成表达式或约束，沿途没执行的分支并不会自动出现。应分开报告本机指令覆盖、虚拟指令覆盖和业务路径覆盖；这三者的数量不可直接互换，尤其在循环和解释器复用时。

## 分析例与核对方法

本库构造：输入x=1经过正数分支，恢复出x+1；x=-1原本应返回0。用正数轨迹合成的表达式在已采路径正确，仍不能代表函数。复核时应让边界值、分支另一侧和异常输入进入候选集合。

## 判断边界

增加输入样本能发现反例，但有限样本不构成普遍等价证明。符号模型需要明确位宽、内存和外部调用假设；路径爆炸或求解超时应报告覆盖不足，不能写成目标分支不存在。

## 来源与核验

- [VMProtect Devirtualization](https://raw.githubusercontent.com/JonathanSalwan/VMProtect-devirtualization/main/README.md)；作者/维护者：Jonathan Salwan；版本：获取日公开文档；未固定上游提交；核对日期：2026-10-25。
- [Triton dynamic binary analysis](https://triton-library.github.io/)；作者/维护者：Jonathan Salwan and contributors；版本：获取日公开文档；未固定上游提交；核对日期：2026-10-25。

本文是本库原创机制归纳。“本库构造”的例子用于说明判断方法，没有下载或执行论坛附件、保护样本；文献核对不等于实验复现。原始资料权利归其作者，本文不镜像论坛全文。
