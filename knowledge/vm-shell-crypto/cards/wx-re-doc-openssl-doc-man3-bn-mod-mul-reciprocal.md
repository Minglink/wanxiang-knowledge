---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bn-mod-mul-reciprocal",
  "title": "OpenSSL：大整数运算 · BN_mod_mul_reciprocal（man3）",
  "type": "note",
  "tags": [
    "大整数",
    "模运算",
    "密码实现",
    "openssl",
    "BN_mod_mul_reciprocal"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "20377c2bc4e002416f69e629739f172defcd8ba5d58a48469118c17e88f9dcf1",
  "generatedHash": "7fc2d4ab417211342b19a4f6c9d04eefbfb088d7dad14f49fb4fc520fa9b0457",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "大整数运算：BN_mod_mul_reciprocal, BN_div_recp, BN_RECP_CTX_new, BN_RECP_CTX_free, BN_RECP_CTX_set - modular multiplication using reciprocal",
  "l1": "BN_mod_mul_reciprocal() can be used to perform an efficient BN_mod_mul(3) operation when the operation will be performed repeatedly with the same modulus. It computes **r**=(**a*****b**)%**m** using **recp**=1/**m**, which is set as described below. **ctx** is a previously allocated **BN_CTX** used for temporary variables. BN_RECP_CTX_new() allocates and initializes a **BN_RECP** structure. BN_RECP_CTX_free() frees the components of the **BN_RECP**, and, if it was created by BN_RECP_CTX_new(), also the structure itself. If **recp** is NULL, nothing is done. BN_RECP_CTX_set() stores **m** in **recp** and sets it up for computing 1/**m** and shifting it left by BN_num_bits(**m**)+1 to make it an integer. The result and the number of bits it was shifted left will later be stored in **recp**. BN_div_recp() divides **a** by **m** using **recp*",
  "questions": [
    "BN_mod_mul_reciprocal 如何用于大整数运算？",
    "BN_mod_mul_reciprocal 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bn-mod-mul-reciprocal",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BN_mod_mul_reciprocal.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：大整数运算 · BN_mod_mul_reciprocal（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：大整数运算。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BN_mod_mul_reciprocal, BN_div_recp, BN_RECP_CTX_new,
BN_RECP_CTX_free, BN_RECP_CTX_set - modular multiplication using
reciprocal

## 技术正文

## NAME


BN_mod_mul_reciprocal, BN_div_recp, BN_RECP_CTX_new,
BN_RECP_CTX_free, BN_RECP_CTX_set - modular multiplication using
reciprocal

## SYNOPSIS


```c
#include <openssl/bn.h>

BN_RECP_CTX *BN_RECP_CTX_new(void);
void BN_RECP_CTX_free(BN_RECP_CTX *recp);

int BN_RECP_CTX_set(BN_RECP_CTX *recp, const BIGNUM *m, BN_CTX *ctx);

int BN_div_recp(BIGNUM *dv, BIGNUM *rem, const BIGNUM *a, BN_RECP_CTX *recp,
                BN_CTX *ctx);

int BN_mod_mul_reciprocal(BIGNUM *r, const BIGNUM *a, const BIGNUM *b,
                          BN_RECP_CTX *recp, BN_CTX *ctx);

```

## DESCRIPTION


BN_mod_mul_reciprocal() can be used to perform an efficient
BN_mod_mul(3) operation when the operation will be performed
repeatedly with the same modulus. It computes **r**=(**a*****b**)%**m**
using **recp**=1/**m**, which is set as described below.  **ctx** is a
previously allocated **BN_CTX** used for temporary variables.

BN_RECP_CTX_new() allocates and initializes a **BN_RECP** structure.

BN_RECP_CTX_free() frees the components of the **BN_RECP**, and, if it
was created by BN_RECP_CTX_new(), also the structure itself.
If **recp** is NULL, nothing is done.

BN_RECP_CTX_set() stores **m** in **recp** and sets it up for computing
1/**m** and shifting it left by BN_num_bits(**m**)+1 to make it an
integer. The result and the number of bits it was shifted left will
later be stored in **recp**.

BN_div_recp() divides **a** by **m** using **recp**. It places the quotient
in **dv** and the remainder in **rem**.

The **BN_RECP_CTX** structure cannot be shared between threads.

## RETURN VALUES


BN_RECP_CTX_new() returns the newly allocated **BN_RECP_CTX**, and NULL
on error.

BN_RECP_CTX_free() has no return value.

For the other functions, 1 is returned for success, 0 on error.
The error codes can be obtained by ERR_get_error(3).

## SEE ALSO


ERR_get_error(3), BN_add(3),
BN_CTX_new(3)

## HISTORY


BN_RECP_CTX_init() was removed in OpenSSL 1.1.0

## COPYRIGHT


Copyright 2000-2017 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BN_mod_mul_reciprocal.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BN_mod_mul_reciprocal.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BN_mod_mul_reciprocal.pod`；SHA-256：`20377c2bc4e002416f69e629739f172defcd8ba5d58a48469118c17e88f9dcf1`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
