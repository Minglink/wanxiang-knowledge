---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-life-cycle-digest",
  "title": "OpenSSL：密码实现与接口 · life_cycle-digest（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "life_cycle-digest"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "d76992c61f8d3cb8166a99a1af8a49b1e6c7759a0229dcd846ff18cf030cc2cf",
  "generatedHash": "dbecc39bb91b472226446ed7d16900696f653b2b3a978c42dcbb900b51f4c406",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：life_cycle-digest - The digest algorithm life-cycle",
  "l1": "All message digests (MDs) go through a number of stages in their life-cycle: This state represents the MD before it has been allocated. It is the starting state for any life-cycle transitions. This state represents the MD after it has been allocated. This state represents the MD when it is set up and capable of processing input. This state represents the MD when it is set up and capable of processing additional input or generating output. This state represents the MD when it has generated output. For an XOF digest, this state represents the MD when it has generated a single-shot output. For an XOF digest, this state represents the MD when it has generated output. It can be called multiple times to generate more output. The output length is variable for each call. This state is entered when the MD is freed. It is the terminal state for all",
  "questions": [
    "life_cycle-digest 如何用于密码实现与接口？",
    "life_cycle-digest 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-life-cycle-digest",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/life_cycle-digest.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · life_cycle-digest（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

life_cycle-digest - The digest algorithm life-cycle

## 技术正文

## NAME


life_cycle-digest - The digest algorithm life-cycle

## DESCRIPTION


All message digests (MDs) go through a number of stages in their life-cycle:


- start

This state represents the MD before it has been allocated.  It is the
starting state for any life-cycle transitions.

- newed

This state represents the MD after it has been allocated.

- initialised

This state represents the MD when it is set up and capable of processing
input.

- updated

This state represents the MD when it is set up and capable of processing
additional input or generating output.

- finaled

This state represents the MD when it has generated output.
For an XOF digest, this state represents the MD when it has generated a
single-shot output.

- squeezed

For an XOF digest, this state represents the MD when it has generated output.
It can be called multiple times to generate more output. The output length is
variable for each call.

- freed

This state is entered when the MD is freed.  It is the terminal state
for all life-cycle transitions.


### State Transition Diagram


The usual life-cycle of a MD is illustrated:



### Formal State Transitions


This section defines all of the legal state transitions.
This is the canonical list.



## NOTES


At some point the EVP layer will begin enforcing the transitions described
herein.

## SEE ALSO


provider-digest(7), EVP_DigestInit(3)

## COPYRIGHT


Copyright 2021-2023 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/life_cycle-digest.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/life_cycle-digest.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/life_cycle-digest.pod`；SHA-256：`d76992c61f8d3cb8166a99a1af8a49b1e6c7759a0229dcd846ff18cf030cc2cf`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
