---
{
  "schemaVersion": 2,
  "id": "wx-re-pe-address",
  "title": "PE：文件偏移、RVA、VA 与零填充区域",
  "type": "method",
  "tags": [
    "逆向工程",
    "PE",
    "RVA",
    "VA",
    "FOA",
    "地址换算"
  ],
  "project": "逆向工程",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:reverse-2026-10-25-001",
  "sourceTitle": "公开技术资料归纳（外部来源，非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f84c4f4054589c852119fe3283be22e7143e69b0e9af4d2158a5d460c83448fa",
  "generatedHash": "7389e1e8aa8842654f3d0a17eb7c16b55c2e734f40deb6be78db876491db8528",
  "archived": false,
  "verification": "文献核对；示例未实测",
  "l0": "PE：文件偏移、RVA、VA 与零填充区域。RVA怎么转文件偏移？",
  "l1": " 原理 文件偏移表示磁盘字节位置；RVA 是相对映像基址的位置；VA 是进程中的虚拟地址。先用实际加载基址求 RVA，再按节映射到文件。加载基址可能与头部的首选基址不同。 计算例（本库构造） 某节 VirtualAddress=0x2000，PointerToRawData=0x600，SizeOfRawData=0x400。目标 RVA=0x2120，在原始数据范围内，则文件偏移=0x600+(0x2120-0x2000)=0x720。若实际基址为 0x7FF600000000，VA=0x7FF600002120。 判断边界 不能对整个文件统一减一个常量。先找所属节，再检查节内偏移是否小于 ",
  "questions": [
    "RVA怎么转文件偏移？",
    "为什么内存地址在文件里找不到？"
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
# PE：文件偏移、RVA、VA 与零填充区域

## 原理
文件偏移表示磁盘字节位置；RVA 是相对映像基址的位置；VA 是进程中的虚拟地址。先用实际加载基址求 RVA，再按节映射到文件。加载基址可能与头部的首选基址不同。

## 计算例（本库构造）
某节 VirtualAddress=0x2000，PointerToRawData=0x600，SizeOfRawData=0x400。目标 RVA=0x2120，在原始数据范围内，则文件偏移=0x600+(0x2120-0x2000)=0x720。若实际基址为 0x7FF600000000，VA=0x7FF600002120。

## 判断边界
不能对整个文件统一减一个常量。先找所属节，再检查节内偏移是否小于 SizeOfRawData，同时验证换算后的范围没有超过文件长度。VirtualSize 大于磁盘原始数据时，尾部可能由加载器补零，没有相应磁盘字节。头部和某些特殊目录还要分别处理。

## 使用方法
报告同时记模块、RVA 和样本哈希，便于同一文件在不同基址下复核。遇到映射重叠、长度溢出或越界，应报告异常，不能强行选一个节继续解析。

## 来源与核验

- [Microsoft PE/COFF 格式规范](https://learn.microsoft.com/en-us/windows/win32/debug/pe-format)；作者/维护者：Microsoft；核对日期：2026-10-25。

本文为万象知识库的归纳与分析示例；“本库构造”的例子用于解释机制，未执行工具或样本验证。适用范围以正文及原始文档为准。
