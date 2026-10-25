---
{
  "schemaVersion": 2,
  "id": "wx-re-focus-vm-pure-function-limit",
  "title": "去虚拟化研究：纯函数结果恢复的适用范围",
  "type": "note",
  "tags": [
    "VM",
    "去虚拟化",
    "纯函数",
    "VMProtect"
  ],
  "project": "VM与去虚拟化",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "公开资料原创归纳（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "82a9073cfefc8b005e17217fd3bbe8523c41f31bdacfa9b4df3657ab86afbe31",
  "generatedHash": "476d0c2e9633907779de31b22d80bff6a701b71a481dcf545a9cfe1e2aee1d99",
  "archived": false,
  "verification": "已阅读相关来源并作机制归纳；构造示例未执行；未复现样本",
  "l0": "从输入输出表达式恢复纯函数，与恢复整个受保护程序的环境行为是不同的研究范围。",
  "l1": "Jonathan Salwan的项目明确把实验对象限定为受VMP3.x保护的纯函数，并讨论单基本块效果较好、多基本块更实验性的边界。纯函数模型聚焦输入到输出的确定映射；文件、线程、时间或全局状态依赖需要另外建模。 本库构造：f(x)=x*3+1可以用表达式回放；g(x)同时递增全局计数器，即使返回值相同，也不能只保留表达式后宣称等价。若外部调用影响后续行为，输出比较必须覆盖这些副作用。 恢复一个观察路径不代表恢复全部分支。研究报告应说明输入范围、基本块覆盖、外部状态和回放条件；不把项目示例成功率改写成所有版本、所有程序的自动还原能力。",
  "questions": [
    "VMProtect去虚拟化论文工具为什么不能保证还原整个程序？",
    "纯函数假设会忽略哪些行为？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "vmp-research",
      "url": "https://raw.githubusercontent.com/JonathanSalwan/VMProtect-devirtualization/main/README.md",
      "checkedAt": "2026-10-25",
      "version": "获取日公开文档；未固定上游提交"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "万象知识库原创归纳；引文和原始资料权利归各自作者"
}
---
# 去虚拟化研究：纯函数结果恢复的适用范围

## 机制

Jonathan Salwan的项目明确把实验对象限定为受VMP3.x保护的纯函数，并讨论单基本块效果较好、多基本块更实验性的边界。纯函数模型聚焦输入到输出的确定映射；文件、线程、时间或全局状态依赖需要另外建模。

## 分析例与核对方法

本库构造：f(x)=x*3+1可以用表达式回放；g(x)同时递增全局计数器，即使返回值相同，也不能只保留表达式后宣称等价。若外部调用影响后续行为，输出比较必须覆盖这些副作用。

## 判断边界

恢复一个观察路径不代表恢复全部分支。研究报告应说明输入范围、基本块覆盖、外部状态和回放条件；不把项目示例成功率改写成所有版本、所有程序的自动还原能力。

## 来源与核验

- [VMProtect Devirtualization](https://raw.githubusercontent.com/JonathanSalwan/VMProtect-devirtualization/main/README.md)；作者/维护者：Jonathan Salwan；版本：获取日公开文档；未固定上游提交；核对日期：2026-10-25。

本文是本库原创机制归纳。“本库构造”的例子用于说明判断方法，没有下载或执行论坛附件、保护样本；文献核对不等于实验复现。原始资料权利归其作者，本文不镜像论坛全文。
