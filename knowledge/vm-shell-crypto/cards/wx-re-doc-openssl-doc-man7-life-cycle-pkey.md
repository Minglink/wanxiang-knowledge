---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man7-life-cycle-pkey",
  "title": "OpenSSL：密码实现与接口 · life_cycle-pkey（man7）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "life_cycle-pkey"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "fbafabcd653cc8c6d63cf6a61845d78460aac784f7e634fdc921a3789c522c56",
  "generatedHash": "3e4a90ce177babcf2fd2d87e829664b6c949009aaace9d138347a9769882a4eb",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：life_cycle-pkey - The PKEY algorithm life-cycle",
  "l1": "All public keys (PKEYs) go through a number of stages in their life-cycle: This state represents the PKEY before it has been allocated. It is the starting state for any life-cycle transitions. This state represents the PKEY after it has been allocated. This state represents the PKEY when it is ready to perform a private key decapsulation operation. This state represents the PKEY when it is ready to decrypt some ciphertext. This state represents the PKEY when it is ready to derive a shared secret. This state represents the PKEY when it is ready to perform a private key signature operation. This state represents the PKEY when it is ready to perform a public key encapsulation operation. This state represents the PKEY when it is ready to encrypt some plaintext. This state represents the PKEY when it is ready to generate a new public/private k",
  "questions": [
    "life_cycle-pkey 如何用于密码实现与接口？",
    "life_cycle-pkey 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man7-life-cycle-pkey",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/life_cycle-pkey.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · life_cycle-pkey（man7）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

life_cycle-pkey - The PKEY algorithm life-cycle

## 技术正文

## NAME


life_cycle-pkey - The PKEY algorithm life-cycle

## DESCRIPTION


All public keys (PKEYs) go through a number of stages in their life-cycle:


- start

This state represents the PKEY before it has been allocated.  It is the
starting state for any life-cycle transitions.

- newed

This state represents the PKEY after it has been allocated.

- decapsulate

This state represents the PKEY when it is ready to perform a private key decapsulation
operation.

- decrypt

This state represents the PKEY when it is ready to decrypt some ciphertext.

- derive

This state represents the PKEY when it is ready to derive a shared secret.

- digest sign

This state represents the PKEY when it is ready to perform a private key signature
operation.

- encapsulate

This state represents the PKEY when it is ready to perform a public key encapsulation
operation.

- encrypt

This state represents the PKEY when it is ready to encrypt some plaintext.

- key generation

This state represents the PKEY when it is ready to generate a new public/private key.

- parameter generation

This state represents the PKEY when it is ready to generate key parameters.

- verify

This state represents the PKEY when it is ready to verify a public key signature.

- verify recover

This state represents the PKEY when it is ready to recover a public key signature data.

- freed

This state is entered when the PKEY is freed.  It is the terminal state
for all life-cycle transitions.


### State Transition Diagram


The usual life-cycle of a PKEY object is illustrated:



### Formal State Transitions


This section defines all of the legal state transitions.
This is the canonical list.



## NOTES


At some point the EVP layer will begin enforcing the transitions described
herein.

## SEE ALSO


EVP_PKEY_new(3),
EVP_PKEY_decapsulate(3), EVP_PKEY_decrypt(3), EVP_PKEY_encapsulate(3),
EVP_PKEY_encrypt(3), EVP_PKEY_derive(3), EVP_PKEY_keygen(3),
EVP_PKEY_sign(3), EVP_PKEY_verify(3), EVP_PKEY_verify_recover(3)

## HISTORY


The provider PKEY interface was introduced in OpenSSL 3.0.

## COPYRIGHT


Copyright 2021-2022 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man7/life_cycle-pkey.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man7/life_cycle-pkey.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man7/life_cycle-pkey.pod`；SHA-256：`fbafabcd653cc8c6d63cf6a61845d78460aac784f7e634fdc921a3789c522c56`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
