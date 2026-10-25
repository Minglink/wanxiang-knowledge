---
{
  "schemaVersion": 2,
  "id": "wx-re-x64-abi",
  "title": "Windows x64：参数位置、影子空间和栈偏移",
  "type": "note",
  "tags": [
    "逆向工程",
    "Windows",
    "x64",
    "ABI",
    "调用约定",
    "shadow space"
  ],
  "project": "逆向工程",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:reverse-2026-10-25-001",
  "sourceTitle": "公开技术资料归纳（外部来源，非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "084eb81e00c57c6408f0d0a754386f22dd736c103e5658846b4dfdd6e92924f5",
  "generatedHash": "da4e0e441a7b43d463475b1e5325b214f5b4c9f7ba5ede76dfb2013f765899df",
  "archived": false,
  "verification": "文献核对；示例未实测",
  "l0": "Windows x64：参数位置、影子空间和栈偏移。Windows x64第五个参数在哪里？",
  "l1": " 适用范围 以下针对标准 Windows x64 ABI 的普通原型函数；不能直接套到 System V AMD64、vectorcall 或特殊编译器约定。 原理 前四个参数按位置分配：整数或指针使用 RCX、RDX、R8、R9；浮点使用对应位置的 XMM0～XMM3。调用者预留 32 字节影子空间，即使参数不足四个。 参数例（本库构造） 函数 f(int a, double b, void c, int d, int e) 在正常入口处，a 对应 RCX，b 对应 XMM1，c 对应 R8，d 对应 R9。第五个参数位于入口 RSP+0x28：前 8 字节是返回地址，后 32 字节是影子空",
  "questions": [
    "Windows x64第五个参数在哪里？",
    "RCX一定是第一个参数吗？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "abi",
      "url": "https://learn.microsoft.com/en-us/cpp/build/x64-calling-convention?view=msvc-170",
      "checkedAt": "2026-10-25"
    }
  ],
  "batchId": "reverse-2026-10-25-001"
}
---
# Windows x64：参数位置、影子空间和栈偏移

## 适用范围
以下针对标准 Windows x64 ABI 的普通原型函数；不能直接套到 System V AMD64、vectorcall 或特殊编译器约定。

## 原理
前四个参数按位置分配：整数或指针使用 RCX、RDX、R8、R9；浮点使用对应位置的 XMM0～XMM3。调用者预留 32 字节影子空间，即使参数不足四个。

## 参数例（本库构造）
函数 f(int a, double b, void* c, int d, int e) 在正常入口处，a 对应 RCX，b 对应 XMM1，c 对应 R8，d 对应 R9。第五个参数位于入口 RSP+0x28：前 8 字节是返回地址，后 32 字节是影子空间。

## 判断方法
先确定断点在函数入口还是序言之后；push 和 sub rsp 会改变栈偏移。易失寄存器经过其他函数调用后可能改变，不能用很久之后的 RCX 反推原参数。浮点按参数序号占槽位，并非按“第几个浮点数”从 XMM0 连续计数。

## 易错点
影子空间预留不代表四个寄存器已被自动写入其中。可变参数、按值结构体和隐藏返回值指针还会影响解释。

## 来源与核验

- [Windows x64 调用约定](https://learn.microsoft.com/en-us/cpp/build/x64-calling-convention?view=msvc-170)；作者/维护者：Microsoft；核对日期：2026-10-25。

本文为万象知识库的归纳与分析示例；“本库构造”的例子用于解释机制，未执行工具或样本验证。适用范围以正文及原始文档为准。
