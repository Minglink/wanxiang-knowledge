---
{
  "schemaVersion": 2,
  "id": "wx-re-focus-shell-unwind-metadata",
  "title": "x64展开信息：复制代码还需保留异常与栈恢复关系",
  "type": "note",
  "tags": [
    "壳",
    "x64",
    "UNWIND_INFO",
    "RUNTIME_FUNCTION",
    "异常展开"
  ],
  "project": "壳与装载研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "公开资料原创归纳（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "fd0809efef5ca380a3ffb359b300ae831c32a989a348a28db4ec7f1070d04fdc",
  "generatedHash": "0ecc1292c10ac0e8d5c1026bd6d318d831c1330acb5d6ae9bc25df068697bd77",
  "archived": false,
  "verification": "已阅读相关来源并作机制归纳；构造示例未执行；未复现样本",
  "l0": "x64函数的机器码与展开元数据共同影响异常和调用栈恢复，普通路径成功不代表信息完整。",
  "l1": "Microsoft文档说明x64用函数表记录函数范围和展开信息，描述序言怎样保存寄存器、分配栈空间等。研究移动、生成或恢复后的代码时，应同时核对代码范围与相应展开描述，不能只复制指令。 本库构造：函数开头减少rsp并保存非易失寄存器，普通返回能正常撤销操作；发生异常时系统根据缺失或过时的展开描述恢复栈，才出现调用链损坏。只测正常返回会漏掉这个问题。 某些叶函数可能不需要同样的展开记录，不能因为没有元数据就一律判错。动态注册函数表、混合代码区域与编译器差异都要结合当前环境；本库未运行异常回放。",
  "questions": [
    "重建程序能运行却在异常时崩溃可能漏了什么？",
    "RUNTIME_FUNCTION与UNWIND_INFO有什么关系？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-x64-abi",
      "kind": "相关机制"
    }
  ],
  "externalSources": [
    {
      "id": "unwind",
      "url": "https://learn.microsoft.com/en-us/cpp/build/exception-handling-x64",
      "checkedAt": "2026-10-25",
      "version": "获取日公开文档；未固定上游提交"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "万象知识库原创归纳；引文和原始资料权利归各自作者"
}
---
# x64展开信息：复制代码还需保留异常与栈恢复关系

## 机制

Microsoft文档说明x64用函数表记录函数范围和展开信息，描述序言怎样保存寄存器、分配栈空间等。研究移动、生成或恢复后的代码时，应同时核对代码范围与相应展开描述，不能只复制指令。

## 分析例与核对方法

本库构造：函数开头减少rsp并保存非易失寄存器，普通返回能正常撤销操作；发生异常时系统根据缺失或过时的展开描述恢复栈，才出现调用链损坏。只测正常返回会漏掉这个问题。

## 判断边界

某些叶函数可能不需要同样的展开记录，不能因为没有元数据就一律判错。动态注册函数表、混合代码区域与编译器差异都要结合当前环境；本库未运行异常回放。

## 来源与核验

- [x64 exception handling](https://learn.microsoft.com/en-us/cpp/build/exception-handling-x64)；作者/维护者：Microsoft；版本：获取日公开文档；未固定上游提交；核对日期：2026-10-25。

本文是本库原创机制归纳。“本库构造”的例子用于说明判断方法，没有下载或执行论坛附件、保护样本；文献核对不等于实验复现。原始资料权利归其作者，本文不镜像论坛全文。
