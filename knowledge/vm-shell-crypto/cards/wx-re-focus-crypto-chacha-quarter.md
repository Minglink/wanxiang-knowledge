---
{
  "schemaVersion": 2,
  "id": "wx-re-focus-crypto-chacha-quarter",
  "title": "ChaCha20：ARX四分之一轮与状态序列化",
  "type": "note",
  "tags": [
    "加密算法",
    "ChaCha20",
    "ARX",
    "Poly1305",
    "ChaCha流密码"
  ],
  "project": "密码算法机制",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "公开资料原创归纳（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "ffe7cf248a038a198982d4a7e74634ecf0c51fdade978da14ed38473bae68cc2",
  "generatedHash": "de0b34b72d5565cb62ce6cd6c81f97c556135bee581274b99aae964eee02f57f",
  "archived": false,
  "verification": "已阅读相关来源并作机制归纳；构造示例未执行；未复现样本",
  "l0": "加法、异或、循环移位构成ChaCha核心，但识别还要核对状态布局、轮安排与小端输出。",
  "l1": "RFC8439的quarter round操作四个32位字，结合模加、异或和固定旋转。整体算法把这些操作按列与对角线安排，并把工作状态与初始状态相加后序列化。分析时应保存状态索引和输出字节序，不能只看旋转常数。 本库构造：内部16个字全部正确，但输出按大端写出时，最终密钥流仍逐字节不匹配。先对比四分之一轮，再对比整块输出，可区分核心错误与序列化错误。 ChaCha20是流密码，Poly1305负责认证，两者组合的AEAD还有专门的密钥派生与布局。不要把任意ARX函数认作ChaCha，也不要把单独流加密等同于带认证模式；本库未运行协议样本。",
  "questions": [
    "如何从ARX运算识别ChaCha20？",
    "ChaCha20状态为什么不能直接按宿主端序输出？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "chacha",
      "url": "https://www.rfc-editor.org/rfc/rfc8439.txt",
      "checkedAt": "2026-10-25",
      "version": "获取日公开文档；未固定上游提交"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "万象知识库原创归纳；引文和原始资料权利归各自作者"
}
---
# ChaCha20：ARX四分之一轮与状态序列化

## 机制

RFC8439的quarter round操作四个32位字，结合模加、异或和固定旋转。整体算法把这些操作按列与对角线安排，并把工作状态与初始状态相加后序列化。分析时应保存状态索引和输出字节序，不能只看旋转常数。

## 分析例与核对方法

本库构造：内部16个字全部正确，但输出按大端写出时，最终密钥流仍逐字节不匹配。先对比四分之一轮，再对比整块输出，可区分核心错误与序列化错误。

## 判断边界

ChaCha20是流密码，Poly1305负责认证，两者组合的AEAD还有专门的密钥派生与布局。不要把任意ARX函数认作ChaCha，也不要把单独流加密等同于带认证模式；本库未运行协议样本。

## 来源与核验

- [RFC 8439 ChaCha20-Poly1305](https://www.rfc-editor.org/rfc/rfc8439.txt)；作者/维护者：Y. Nir and A. Langley；版本：获取日公开文档；未固定上游提交；核对日期：2026-10-25。

本文是本库原创机制归纳。“本库构造”的例子用于说明判断方法，没有下载或执行论坛附件、保护样本；文献核对不等于实验复现。原始资料权利归其作者，本文不镜像论坛全文。
