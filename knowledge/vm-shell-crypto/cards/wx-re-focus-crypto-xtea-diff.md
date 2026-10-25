---
{
  "schemaVersion": 2,
  "id": "wx-re-focus-crypto-xtea-diff",
  "title": "XTEA与TEA：轮函数和密钥选择不能混用",
  "type": "note",
  "tags": [
    "加密算法",
    "XTEA",
    "TEA",
    "密钥调度"
  ],
  "project": "密码算法机制",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "公开资料原创归纳（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "31023bfc614e7768c3411f1d3f374ee3e26905888b871628fee565c70b11bd78",
  "generatedHash": "2e8c6124bcecb73f7102fe25bade6c0730e6c1a7e30c55397b629c60ea967313",
  "archived": false,
  "verification": "已阅读相关来源并作机制归纳；构造示例未执行；未复现样本",
  "l0": "两者共享一些常数和位运算特征，但轮函数括号、轮和使用时机与密钥索引不同。",
  "l1": "XTEA延续双32位状态与加法、移位、异或的简洁结构，密钥选择会使用轮和的不同位。分析应逐半轮抄出完整表达式，明确sum更新前后取值和索引计算，避免把相同常数误当成算法完全相同。 本库构造：把密钥索引中的sum先加delta再取低位，与先取低位再更新并非同一步。即使输入和密钥相同，状态很快分离。可以在第一周期就比较两次半轮的中间结果，定位差异而非只看最终乱码。 原始文献使用历史C记法，运算优先级和整数宽度需要显式表达。轮数叫法还可能区分cycle与round，报告中要写出更新次数。这里未提供真实软件密钥，也没有将历史算法作为新系统安全推荐。",
  "questions": [
    "TEA和XTEA为什么不能只替换函数名字？",
    "XTEA识别应重点看哪个密钥索引？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [
    {
      "to": "wx-re-focus-crypto-tea-width",
      "kind": "相关机制"
    }
  ],
  "externalSources": [
    {
      "id": "tea",
      "url": "https://www.cl.cam.ac.uk/ftp/papers/djw-rmn/djw-rmn-tea.html",
      "checkedAt": "2026-10-25",
      "version": "获取日公开文档；未固定上游提交"
    },
    {
      "id": "xtea",
      "url": "https://www.cl.cam.ac.uk/ftp/users/djw3/xtea.ps",
      "checkedAt": "2026-10-25",
      "version": "获取日公开文档；未固定上游提交"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "万象知识库原创归纳；引文和原始资料权利归各自作者"
}
---
# XTEA与TEA：轮函数和密钥选择不能混用

## 机制

XTEA延续双32位状态与加法、移位、异或的简洁结构，密钥选择会使用轮和的不同位。分析应逐半轮抄出完整表达式，明确sum更新前后取值和索引计算，避免把相同常数误当成算法完全相同。

## 分析例与核对方法

本库构造：把密钥索引中的sum先加delta再取低位，与先取低位再更新并非同一步。即使输入和密钥相同，状态很快分离。可以在第一周期就比较两次半轮的中间结果，定位差异而非只看最终乱码。

## 判断边界

原始文献使用历史C记法，运算优先级和整数宽度需要显式表达。轮数叫法还可能区分cycle与round，报告中要写出更新次数。这里未提供真实软件密钥，也没有将历史算法作为新系统安全推荐。

## 来源与核验

- [TEA original paper](https://www.cl.cam.ac.uk/ftp/papers/djw-rmn/djw-rmn-tea.html)；作者/维护者：David J. Wheeler and Roger M. Needham；版本：获取日公开文档；未固定上游提交；核对日期：2026-10-25。
- [TEA extensions](https://www.cl.cam.ac.uk/ftp/users/djw3/xtea.ps)；作者/维护者：David J. Wheeler and Roger M. Needham；版本：获取日公开文档；未固定上游提交；核对日期：2026-10-25。

本文是本库原创机制归纳。“本库构造”的例子用于说明判断方法，没有下载或执行论坛附件、保护样本；文献核对不等于实验复现。原始资料权利归其作者，本文不镜像论坛全文。
