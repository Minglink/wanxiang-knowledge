---
{
  "schemaVersion": 2,
  "id": "wx-re-focus-shell-upx-overlay",
  "title": "UPX附加数据：Overlay会影响恢复后的文件行为",
  "type": "note",
  "tags": [
    "壳",
    "UPX",
    "Overlay",
    "文件布局"
  ],
  "project": "壳与装载研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "公开资料原创归纳（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f61d07331730ef7bea3424091cf6bc059b5eb892246128c786a82c30f067eb2b",
  "generatedHash": "72dd43b666ec8bb3cc3ac1848c5e6b5d4339bd0be9d2f050b0d76c3d9d07a634",
  "archived": false,
  "verification": "已阅读相关来源并作机制归纳；构造示例未执行；未复现样本",
  "l0": "逻辑映像之后的附加数据可能承载业务资源，不能在研究过程中默认视为垃圾。",
  "l1": "UPX把Overlay解释为可执行文件逻辑末尾之后附加的数据。手册区分复制、剥离和遇到Overlay时跳过等策略，并指出复制后是否仍能工作取决于应用如何访问这些数据。分析时应保存附加区的起点、长度和内容哈希。 本库构造：应用把字典附在文件尾部，通过末尾偏移读取。重建文件时即使代码和导入完整，忽略尾部字典也会导致查询失败；若文件布局变化而偏移未修正，保留字节仍可能无法正常读取。 Overlay不一定属于壳，安装器、签名、资源或自定义包都可能使用文件尾部。应先定位真实消费者，再解释其角色。不能仅凭有附加数据就认定文件恶意，也不能仅凭主界面启动就证明恢复完整。",
  "questions": [
    "脱壳后主界面能打开但资源丢失可能是什么原因？",
    "UPX的overlay选项有什么语义？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "upx",
      "url": "https://raw.githubusercontent.com/upx/upx/devel/doc/upx.pod",
      "checkedAt": "2026-10-25",
      "version": "获取日公开文档；未固定上游提交"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "万象知识库原创归纳；引文和原始资料权利归各自作者"
}
---
# UPX附加数据：Overlay会影响恢复后的文件行为

## 机制

UPX把Overlay解释为可执行文件逻辑末尾之后附加的数据。手册区分复制、剥离和遇到Overlay时跳过等策略，并指出复制后是否仍能工作取决于应用如何访问这些数据。分析时应保存附加区的起点、长度和内容哈希。

## 分析例与核对方法

本库构造：应用把字典附在文件尾部，通过末尾偏移读取。重建文件时即使代码和导入完整，忽略尾部字典也会导致查询失败；若文件布局变化而偏移未修正，保留字节仍可能无法正常读取。

## 判断边界

Overlay不一定属于壳，安装器、签名、资源或自定义包都可能使用文件尾部。应先定位真实消费者，再解释其角色。不能仅凭有附加数据就认定文件恶意，也不能仅凭主界面启动就证明恢复完整。

## 来源与核验

- [UPX manual](https://raw.githubusercontent.com/upx/upx/devel/doc/upx.pod)；作者/维护者：UPX contributors；版本：获取日公开文档；未固定上游提交；核对日期：2026-10-25。

本文是本库原创机制归纳。“本库构造”的例子用于说明判断方法，没有下载或执行论坛附件、保护样本；文献核对不等于实验复现。原始资料权利归其作者，本文不镜像论坛全文。
