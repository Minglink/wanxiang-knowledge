---
{
  "schemaVersion": 2,
  "id": "wx-re-pe-forwarder",
  "title": "PE：导出转发字符串与函数地址的区别",
  "type": "pitfall",
  "tags": [
    "逆向工程",
    "PE",
    "导出表",
    "forwarder",
    "导出转发"
  ],
  "project": "逆向工程",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:reverse-2026-10-25-001",
  "sourceTitle": "公开技术资料归纳（外部来源，非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f84c4f4054589c852119fe3283be22e7143e69b0e9af4d2158a5d460c83448fa",
  "generatedHash": "d68c201e680d062602476082a8b928d42f9bbd7337e4b16040adbf5812cea37a",
  "archived": false,
  "verification": "文献核对；示例未实测",
  "l0": "PE：导出转发字符串与函数地址的区别。导出函数地址为什么指向字符串？",
  "l1": " 原理 导出地址表条目不一定指向代码。按导出目录的范围判断，落在该范围内的转发 RVA 表示以零结尾的转发字符串，字符串说明另一 DLL 的导出名称或序号。 分析例（本库构造） 导出 Foo 的条目指向字符串 OtherLib.Bar。这意味着 Foo 的解析要继续到 OtherLib 的 Bar，而不是把字符串的 ASCII 字节反汇编成机器指令。 判断方法 先读取目录范围并做长度校验，再识别条目是普通导出 RVA 还是转发 RVA。转发目标还可能继续转发，解析程序需要记录已访问节点并限制深度，以免异常数据造成循环。 易错点 某模块公开一个 API，不等于实现位于该模块。根据“当前导出模块”",
  "questions": [
    "导出函数地址为什么指向字符串？",
    "导出表条目一定是可执行代码吗？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "pe",
      "url": "https://learn.microsoft.com/en-us/windows/win32/debug/pe-format",
      "checkedAt": "2026-10-25"
    }
  ],
  "batchId": "reverse-2026-10-25-001"
}
---
# PE：导出转发字符串与函数地址的区别

## 原理
导出地址表条目不一定指向代码。按导出目录的范围判断，落在该范围内的转发 RVA 表示以零结尾的转发字符串，字符串说明另一 DLL 的导出名称或序号。

## 分析例（本库构造）
导出 Foo 的条目指向字符串 OtherLib.Bar。这意味着 Foo 的解析要继续到 OtherLib 的 Bar，而不是把字符串的 ASCII 字节反汇编成机器指令。

## 判断方法
先读取目录范围并做长度校验，再识别条目是普通导出 RVA 还是转发 RVA。转发目标还可能继续转发，解析程序需要记录已访问节点并限制深度，以免异常数据造成循环。

## 易错点
某模块公开一个 API，不等于实现位于该模块。根据“当前导出模块”和“最终实现模块”的差异直接判断被篡改，会误报正常转发。普通导出也可能是数据，应结合所在区域和引用方式判断。

## 来源与核验

- [Microsoft PE/COFF 格式规范](https://learn.microsoft.com/en-us/windows/win32/debug/pe-format)；作者/维护者：Microsoft；核对日期：2026-10-25。

本文为万象知识库的归纳与分析示例；“本库构造”的例子用于解释机制，未执行工具或样本验证。适用范围以正文及原始文档为准。
