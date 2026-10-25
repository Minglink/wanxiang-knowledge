---
{
  "schemaVersion": 2,
  "id": "wx-re-focus-shell-pe-tls",
  "title": "PE初始化：TLS回调与入口点之前的执行",
  "type": "note",
  "tags": [
    "壳",
    "PE",
    "TLS回调",
    "初始化",
    "入口点"
  ],
  "project": "壳与装载研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "公开资料原创归纳（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "0310d208e146d015059246ad00f4bcc6641b1d04f62f771838771efd71fd9045",
  "generatedHash": "e86313ae626b3bd4803796bfeae699950f9fbb241bd4d4980be5a5a6f526e85f",
  "archived": false,
  "verification": "已阅读相关来源并作机制归纳；构造示例未执行；未复现样本",
  "l0": "可执行文件的入口点不是唯一初始化位置，分析壳的启动行为要考虑TLS等加载器参与的结构。",
  "l1": "PE格式定义TLS目录，其中包含TLS数据、索引和回调数组等字段。回调属于加载器参与的初始化机制。研究启动过程时，应把入口字段与TLS目录分别解析，确认地址形式、数组终止和架构宽度，再结合运行顺序解释。 本库构造：入口函数直接使用一个已填充的查找表，但入口内找不到初始化代码。如果TLS回调写入该表，单独分析入口就会把它误当成文件里的静态常量。应回溯表的实际写入时机。 TLS也被正常程序和运行库使用，存在回调不等于加壳或恶意行为。静态目录损坏、映像基址变化或不同平台加载规则都可能影响观察；目录中的地址不能直接当文件偏移读取。",
  "questions": [
    "为什么只跟AddressOfEntryPoint会漏掉初始化？",
    "TLS回调与壳启动有什么关系？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-pe-address",
      "kind": "相关机制"
    }
  ],
  "externalSources": [
    {
      "id": "pe",
      "url": "https://learn.microsoft.com/en-us/windows/win32/debug/pe-format",
      "checkedAt": "2026-10-25",
      "version": "Microsoft PE Format，获取日页面"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "万象知识库原创归纳；引文和原始资料权利归各自作者"
}
---
# PE初始化：TLS回调与入口点之前的执行

## 机制

PE格式定义TLS目录，其中包含TLS数据、索引和回调数组等字段。回调属于加载器参与的初始化机制。研究启动过程时，应把入口字段与TLS目录分别解析，确认地址形式、数组终止和架构宽度，再结合运行顺序解释。

## 分析例与核对方法

本库构造：入口函数直接使用一个已填充的查找表，但入口内找不到初始化代码。如果TLS回调写入该表，单独分析入口就会把它误当成文件里的静态常量。应回溯表的实际写入时机。

## 判断边界

TLS也被正常程序和运行库使用，存在回调不等于加壳或恶意行为。静态目录损坏、映像基址变化或不同平台加载规则都可能影响观察；目录中的地址不能直接当文件偏移读取。

## 来源与核验

- [PE Format](https://learn.microsoft.com/en-us/windows/win32/debug/pe-format)；作者/维护者：Microsoft；版本：Microsoft PE Format，获取日页面；核对日期：2026-10-25。

本文是本库原创机制归纳。“本库构造”的例子用于说明判断方法，没有下载或执行论坛附件、保护样本；文献核对不等于实验复现。原始资料权利归其作者，本文不镜像论坛全文。
