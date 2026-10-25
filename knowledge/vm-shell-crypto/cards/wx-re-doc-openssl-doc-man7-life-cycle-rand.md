---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-life-cycle-rand",
  "title": "OpenSSL：密码实现与接口 · life_cycle-rand（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "life_cycle-rand"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "3b51168372be2cd2749a2466c7106ebec294f7c8b9853631e9fd6d54fed720bf",
  "generatedHash": "f64d3a4b61c8e081529e6b6f0aa79a64de014925c23beeda24b87b2121c873e1",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：life_cycle-rand - The RAND algorithm life-cycle",
  "l1": "All random number generator (RANDs) go through a number of stages in their life-cycle: This state represents the RAND before it has been allocated. It is the starting state for any life-cycle transitions. This state represents the RAND after it has been allocated but unable to generate any output. This state represents the RAND when it is set up and capable of generating output. This state represents the RAND when it has been shutdown and it is no longer capable of generating output. This state is entered when the RAND is freed. It is the terminal state for all life-cycle transitions. The usual life-cycle of a RAND is illustrated: +-------------------------+ | start | +-------------------------+ | | EVP_RAND_CTX_new v +-------------------------+ | newed | +-------------------------+ | | EVP_RAND_instantiate v EVP_RAND_generate +----------",
  "questions": [
    "life_cycle-rand 如何用于密码实现与接口？",
    "life_cycle-rand 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-life-cycle-rand",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/life_cycle-rand.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · life_cycle-rand（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

life_cycle-rand - The RAND algorithm life-cycle

## 技术正文

## NAME


life_cycle-rand - The RAND algorithm life-cycle

## DESCRIPTION


All random number generator (RANDs)
go through a number of stages in their life-cycle:


- start

This state represents the RAND before it has been allocated.  It is the
starting state for any life-cycle transitions.

- newed

This state represents the RAND after it has been allocated but unable to
generate any output.

- instantiated

This state represents the RAND when it is set up and capable of generating
output.

- uninstantiated

This state represents the RAND when it has been shutdown and it is no longer
capable of generating output.

- freed

This state is entered when the RAND is freed.  It is the terminal state
for all life-cycle transitions.


### State Transition Diagram


The usual life-cycle of a RAND is illustrated:



### Formal State Transitions


This section defines all of the legal state transitions.
This is the canonical list.



## NOTES


At some point the EVP layer will begin enforcing the transitions described
herein.

## SEE ALSO


provider-rand(7), EVP_RAND(3).

## HISTORY


The provider RAND interface was introduced in OpenSSL 3.0.

## COPYRIGHT


Copyright 2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/life_cycle-rand.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/life_cycle-rand.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/life_cycle-rand.pod`；SHA-256：`3b51168372be2cd2749a2466c7106ebec294f7c8b9853631e9fd6d54fed720bf`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
