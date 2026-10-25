---
{
  "schemaVersion": 2,
  "id": "wx-re-focus-shell-page-permission",
  "title": "动态代码页：写入、权限变化与指令缓存一致性",
  "type": "note",
  "tags": [
    "壳",
    "JIT",
    "VirtualProtect",
    "内存页",
    "指令缓存"
  ],
  "project": "壳与装载研究",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "公开资料原创归纳（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "d9f545c594f5a07c789ca6c3a91e02400dff6d49ba0a3092be3de62939e2b39d",
  "generatedHash": "473613a14d181ac6a92405d7157576e9ce32daeebaf63e72c7c2ef0b8a65e70e",
  "archived": false,
  "verification": "已阅读相关来源并作机制归纳；构造示例未执行；未复现样本",
  "l0": "可执行页的权限变化只是动态代码线索，还需关联写入内容、执行时机及缓存一致性。",
  "l1": "VirtualProtect按页粒度改变已提交内存的保护属性，返回原保护信息。文档要求调用者在设置可执行区域后确保指令缓存一致。JIT、热补丁和保护器都可能发生动态写入，所以研究证据应关联地址范围、旧新权限、写入前后字节和随后执行。 本库构造：一块缓冲区先用于数据解码，随后成为执行目标。只有把写入和控制流关联起来，才能说明它承载动态代码；单独一次改权限调用也可能只是合法运行库的准备过程。 权限变化范围会覆盖受影响的页，而不是只覆盖请求字节。修改权限成功不证明代码语义正确，也不保证其他线程已安全切换；本卡没有实际调用这些API或操作正在运行的进程。",
  "questions": [
    "看到VirtualProtect就能确定是壳吗？",
    "动态生成代码时为什么还要考虑指令缓存？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "vprotect",
      "url": "https://learn.microsoft.com/en-us/windows/win32/api/memoryapi/nf-memoryapi-virtualprotect",
      "checkedAt": "2026-10-25",
      "version": "获取日公开文档；未固定上游提交"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "万象知识库原创归纳；引文和原始资料权利归各自作者"
}
---
# 动态代码页：写入、权限变化与指令缓存一致性

## 机制

VirtualProtect按页粒度改变已提交内存的保护属性，返回原保护信息。文档要求调用者在设置可执行区域后确保指令缓存一致。JIT、热补丁和保护器都可能发生动态写入，所以研究证据应关联地址范围、旧新权限、写入前后字节和随后执行。

## 分析例与核对方法

本库构造：一块缓冲区先用于数据解码，随后成为执行目标。只有把写入和控制流关联起来，才能说明它承载动态代码；单独一次改权限调用也可能只是合法运行库的准备过程。

## 判断边界

权限变化范围会覆盖受影响的页，而不是只覆盖请求字节。修改权限成功不证明代码语义正确，也不保证其他线程已安全切换；本卡没有实际调用这些API或操作正在运行的进程。

## 来源与核验

- [VirtualProtect](https://learn.microsoft.com/en-us/windows/win32/api/memoryapi/nf-memoryapi-virtualprotect)；作者/维护者：Microsoft；版本：获取日公开文档；未固定上游提交；核对日期：2026-10-25。

本文是本库原创机制归纳。“本库构造”的例子用于说明判断方法，没有下载或执行论坛附件、保护样本；文献核对不等于实验复现。原始资料权利归其作者，本文不镜像论坛全文。
