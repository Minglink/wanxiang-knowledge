---
{
  "schemaVersion": 2,
  "id": "wx-re-focus-shell-confuser-features",
  "title": "ConfuserEx：名称、控制流、常量与方法体保护的层次",
  "type": "note",
  "tags": [
    "壳",
    "ConfuserEx",
    ".NET",
    "IL",
    "常量加密"
  ],
  "project": "壳与装载研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "公开资料原创归纳（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "8ffa0bff25f67910df2339f997cf8aeed34ef2accb769795244a38c3d10d5e4a",
  "generatedHash": "ee7cd166b8fbb335d6791f3233f66c08c43f36c6d1d235b2606cac0dffd9ff67",
  "archived": false,
  "verification": "已阅读相关来源并作机制归纳；构造示例未执行；未复现样本",
  "l0": "托管保护可能分别作用于标识符、控制流、常量和方法体，恢复其中一层不等于恢复全部语义。",
  "l1": "ConfuserEx项目列出的功能包括符号重命名、控制流混淆、常量资源加密、方法保护和依赖封装。重命名主要损失可读标识；控制流改变路径组织；常量或方法体保护还影响何时出现可读数据。应按层记录受影响对象。 本库构造：方法名变成短随机串，但IL调用与算术仍完整，说明名字缺失不等于方法体缺失。另一方法通过辅助函数取得字符串，则要追踪返回的数据，而不是只对方法重新命名。 本卡基于mkaring维护分支的公开说明，不声称所有ConfuserEx分支兼容，也不把列出的全部功能当作某个程序集已启用特征。工具能打开元数据只证明结构可读，不代表代码经过完整语义验证。",
  "questions": [
    "ConfuserEx重命名和方法加密有什么不同？",
    "为何IL能读取但反编译结果仍然难懂？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-dotnet-layers",
      "kind": "相关机制"
    }
  ],
  "externalSources": [
    {
      "id": "confuser",
      "url": "https://raw.githubusercontent.com/mkaring/ConfuserEx/master/README.md",
      "checkedAt": "2026-10-25",
      "version": "获取日公开文档；未固定上游提交"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "万象知识库原创归纳；引文和原始资料权利归各自作者"
}
---
# ConfuserEx：名称、控制流、常量与方法体保护的层次

## 机制

ConfuserEx项目列出的功能包括符号重命名、控制流混淆、常量资源加密、方法保护和依赖封装。重命名主要损失可读标识；控制流改变路径组织；常量或方法体保护还影响何时出现可读数据。应按层记录受影响对象。

## 分析例与核对方法

本库构造：方法名变成短随机串，但IL调用与算术仍完整，说明名字缺失不等于方法体缺失。另一方法通过辅助函数取得字符串，则要追踪返回的数据，而不是只对方法重新命名。

## 判断边界

本卡基于mkaring维护分支的公开说明，不声称所有ConfuserEx分支兼容，也不把列出的全部功能当作某个程序集已启用特征。工具能打开元数据只证明结构可读，不代表代码经过完整语义验证。

## 来源与核验

- [ConfuserEx](https://raw.githubusercontent.com/mkaring/ConfuserEx/master/README.md)；作者/维护者：ConfuserEx contributors；版本：获取日公开文档；未固定上游提交；核对日期：2026-10-25。

本文是本库原创机制归纳。“本库构造”的例子用于说明判断方法，没有下载或执行论坛附件、保护样本；文献核对不等于实验复现。原始资料权利归其作者，本文不镜像论坛全文。
