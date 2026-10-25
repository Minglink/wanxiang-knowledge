---
{
  "schemaVersion": 2,
  "id": "wx-re-focus-vm-llvm-poison",
  "title": "IR反混淆：undef、poison与freeze不能混用",
  "type": "note",
  "tags": [
    "VM",
    "LLVM",
    "poison",
    "undef",
    "freeze"
  ],
  "project": "VM与去虚拟化",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "公开资料原创归纳（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "85f59e2561c2ce2412cd491acbda5310bdba344b3141c0c5727e98b2cf96a681",
  "generatedHash": "88f50d5eb11d434d80e650f19d7da6ef91ba24d65eda1b08a1820580451156df",
  "archived": false,
  "verification": "已阅读相关来源并作机制归纳；构造示例未执行；未复现样本",
  "l0": "IR中的未知值带有优化语义，用错误的未知值表示CPU状态可能让整个路径被不恰当地消除。",
  "l1": "undef与poison不是普通“未知但固定”的变量。poison可传播，并在某些敏感使用中触发未定义行为；freeze用于把这类不确定值约束成一次选择后稳定的值。提升未初始化寄存器时，应明确要表示的是任意初态还是IR未定义行为。 本库构造：研究者把输入寄存器写成poison，随后它控制条件分支。优化器可能基于IR规则消除路径；这不能说明原始CPU会跳过该路径，而是输入模型给了优化器过强的前提。 应首先保留显式函数参数或状态字段，再按证据施加约束。freeze也不会神奇恢复丢失的真实输入；它只约束IR语义。优化结果异常变短时，要先审计模型，再解释为反混淆成功。",
  "questions": [
    "LLVM优化为什么把提升后的逻辑大量删掉？",
    "undef、poison与freeze有什么分析区别？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "llvm-ir",
      "url": "https://llvm.org/docs/LangRef.html",
      "checkedAt": "2026-10-25",
      "version": "获取日公开文档；未固定上游提交"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "万象知识库原创归纳；引文和原始资料权利归各自作者"
}
---
# IR反混淆：undef、poison与freeze不能混用

## 机制

undef与poison不是普通“未知但固定”的变量。poison可传播，并在某些敏感使用中触发未定义行为；freeze用于把这类不确定值约束成一次选择后稳定的值。提升未初始化寄存器时，应明确要表示的是任意初态还是IR未定义行为。

## 分析例与核对方法

本库构造：研究者把输入寄存器写成poison，随后它控制条件分支。优化器可能基于IR规则消除路径；这不能说明原始CPU会跳过该路径，而是输入模型给了优化器过强的前提。

## 判断边界

应首先保留显式函数参数或状态字段，再按证据施加约束。freeze也不会神奇恢复丢失的真实输入；它只约束IR语义。优化结果异常变短时，要先审计模型，再解释为反混淆成功。

## 来源与核验

- [LLVM Language Reference](https://llvm.org/docs/LangRef.html)；作者/维护者：LLVM project；版本：获取日公开文档；未固定上游提交；核对日期：2026-10-25。

本文是本库原创机制归纳。“本库构造”的例子用于说明判断方法，没有下载或执行论坛附件、保护样本；文献核对不等于实验复现。原始资料权利归其作者，本文不镜像论坛全文。
