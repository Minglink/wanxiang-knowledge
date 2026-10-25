---
{
  "schemaVersion": 2,
  "id": "wx-re-focus-crypto-xxtea-length",
  "title": "XXTEA：按字数组处理时长度本身进入算法",
  "type": "note",
  "tags": [
    "加密算法",
    "XXTEA",
    "CorrectedBlockTEA",
    "长度编码"
  ],
  "project": "密码算法机制",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "公开资料原创归纳（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "657a2cae12212db498234af8bf73b4ce00eb5035cf366cdb4a3c2713f910c57c",
  "generatedHash": "a6496edc96b79c551995cb16f50b2fd7002586b3899aacc3565710b9c7a32410",
  "archived": false,
  "verification": "已阅读相关来源并作机制归纳；构造示例未执行；未复现样本",
  "l0": "XXTEA围绕多个32位字的数组工作，字数、轮数和字节包装规则共同决定兼容性。",
  "l1": "Corrected Block TEA文献的例程按数组长度n设置遍历和周期，q=6+52/n体现字数影响。它不能简单理解为对每个8字节块独立执行TEA。逆向时应记录字数、邻接字的更新顺序、密钥索引和最后一个字的处理。 本库构造：同一段5字节数据可以补到8字节，也可能再追加一个长度字。两种包装形成不同n，即使核心混合函数相同也不会兼容。应先还原字节到数组的布局，再核对核心算法。 文献例程对n的约定与实际库的字节API不是一回事。端序、补齐字节和长度字段往往由外层实现决定，不能从XXTEA名称推断。该卡是历史算法兼容研究，未对保护样本执行解密。",
  "questions": [
    "XXTEA为什么不能按TEA的8字节分组方式处理？",
    "XXTEA实现之间长度不兼容怎么分析？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-xtea-diff",
      "kind": "相关机制"
    }
  ],
  "externalSources": [
    {
      "id": "xxtea",
      "url": "https://www.cl.cam.ac.uk/ftp/users/djw3/xxtea.ps",
      "checkedAt": "2026-10-25",
      "version": "获取日公开文档；未固定上游提交"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "万象知识库原创归纳；引文和原始资料权利归各自作者"
}
---
# XXTEA：按字数组处理时长度本身进入算法

## 机制

Corrected Block TEA文献的例程按数组长度n设置遍历和周期，q=6+52/n体现字数影响。它不能简单理解为对每个8字节块独立执行TEA。逆向时应记录字数、邻接字的更新顺序、密钥索引和最后一个字的处理。

## 分析例与核对方法

本库构造：同一段5字节数据可以补到8字节，也可能再追加一个长度字。两种包装形成不同n，即使核心混合函数相同也不会兼容。应先还原字节到数组的布局，再核对核心算法。

## 判断边界

文献例程对n的约定与实际库的字节API不是一回事。端序、补齐字节和长度字段往往由外层实现决定，不能从XXTEA名称推断。该卡是历史算法兼容研究，未对保护样本执行解密。

## 来源与核验

- [Corrected Block TEA](https://www.cl.cam.ac.uk/ftp/users/djw3/xxtea.ps)；作者/维护者：David J. Wheeler and Roger M. Needham；版本：获取日公开文档；未固定上游提交；核对日期：2026-10-25。

本文是本库原创机制归纳。“本库构造”的例子用于说明判断方法，没有下载或执行论坛附件、保护样本；文献核对不等于实验复现。原始资料权利归其作者，本文不镜像论坛全文。
