---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bn-mod-mul-montgomery",
  "title": "OpenSSL：大整数运算 · BN_mod_mul_montgomery（man3）",
  "type": "note",
  "tags": [
    "大整数",
    "模运算",
    "密码实现",
    "openssl",
    "BN_mod_mul_montgomery"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "06c72bab025d21cd4adec4cc835dec815e90db047090cf5297d77653cf3595ab",
  "generatedHash": "3df5bcf3650d96bb8ba72490f995a82b03b0be8f3f27f5761df51ca150b43578",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "大整数运算：BN_mod_mul_montgomery, BN_MONT_CTX_new, BN_MONT_CTX_free, BN_MONT_CTX_set, BN_MONT_CTX_copy, BN_from_montgomery, BN_to_montgomery - Montgomery multiplication",
  "l1": "These functions implement Montgomery multiplication. They are used automatically when BN_mod_exp(3) is called with suitable input, but they may be useful when several operations are to be performed using the same modulus. BN_MONT_CTX_new() allocates and initializes a **BN_MONT_CTX** structure. BN_MONT_CTX_set() sets up the `mont` structure from the modulus `m` by precomputing its inverse and a value R. BN_MONT_CTX_copy() copies the **BN_MONT_CTX** `from` to `to`. BN_MONT_CTX_free() frees the components of the **BN_MONT_CTX**, and, if it was created by BN_MONT_CTX_new(), also the structure itself. If **mont** is NULL, nothing is done. BN_mod_mul_montgomery() computes Mont(`a`,`b`):=`a`*`b`*R^-1 and places the result in `r`. BN_from_montgomery() performs the Montgomery reduction `r` = `a`*R^-1. BN_to_montgomery() computes Mont(`a`,R^2), i.e",
  "questions": [
    "BN_mod_mul_montgomery 如何用于大整数运算？",
    "BN_mod_mul_montgomery 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bn-mod-mul-montgomery",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BN_mod_mul_montgomery.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：大整数运算 · BN_mod_mul_montgomery（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：大整数运算。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BN_mod_mul_montgomery, BN_MONT_CTX_new,
BN_MONT_CTX_free, BN_MONT_CTX_set, BN_MONT_CTX_copy,
BN_from_montgomery, BN_to_montgomery - Montgomery multiplication

## 技术正文

## NAME


BN_mod_mul_montgomery, BN_MONT_CTX_new,
BN_MONT_CTX_free, BN_MONT_CTX_set, BN_MONT_CTX_copy,
BN_from_montgomery, BN_to_montgomery - Montgomery multiplication

## SYNOPSIS


```c
#include <openssl/bn.h>

BN_MONT_CTX *BN_MONT_CTX_new(void);
void BN_MONT_CTX_free(BN_MONT_CTX *mont);

int BN_MONT_CTX_set(BN_MONT_CTX *mont, const BIGNUM *m, BN_CTX *ctx);
BN_MONT_CTX *BN_MONT_CTX_copy(BN_MONT_CTX *to, BN_MONT_CTX *from);

int BN_mod_mul_montgomery(BIGNUM *r, BIGNUM *a, BIGNUM *b,
                          BN_MONT_CTX *mont, BN_CTX *ctx);

int BN_from_montgomery(BIGNUM *r, BIGNUM *a, BN_MONT_CTX *mont,
                       BN_CTX *ctx);

int BN_to_montgomery(BIGNUM *r, BIGNUM *a, BN_MONT_CTX *mont,
                     BN_CTX *ctx);

```

## DESCRIPTION


These functions implement Montgomery multiplication. They are used
automatically when BN_mod_exp(3) is called with suitable input,
but they may be useful when several operations are to be performed
using the same modulus.

BN_MONT_CTX_new() allocates and initializes a **BN_MONT_CTX** structure.

BN_MONT_CTX_set() sets up the `mont` structure from the modulus `m`
by precomputing its inverse and a value R.

BN_MONT_CTX_copy() copies the **BN_MONT_CTX** `from` to `to`.

BN_MONT_CTX_free() frees the components of the **BN_MONT_CTX**, and, if
it was created by BN_MONT_CTX_new(), also the structure itself.
If **mont** is NULL, nothing is done.

BN_mod_mul_montgomery() computes Mont(`a`,`b`):=`a`*`b`*R^-1 and places
the result in `r`.

BN_from_montgomery() performs the Montgomery reduction `r` = `a`*R^-1.

BN_to_montgomery() computes Mont(`a`,R^2), i.e. `a`*R.
Note that `a` must be nonnegative and smaller than the modulus.

For all functions, `ctx` is a previously allocated **BN_CTX** used for
temporary variables.

## RETURN VALUES


BN_MONT_CTX_new() returns the newly allocated **BN_MONT_CTX**, and NULL
on error.

BN_MONT_CTX_free() has no return value.

For the other functions, 1 is returned for success, 0 on error.
The error codes can be obtained by ERR_get_error(3).

## WARNINGS


The inputs must be reduced modulo **m**, otherwise the result will be
outside the expected range.

## SEE ALSO


ERR_get_error(3), BN_add(3),
BN_CTX_new(3)

## HISTORY


BN_MONT_CTX_init() was removed in OpenSSL 1.1.0

## COPYRIGHT


Copyright 2000-2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BN_mod_mul_montgomery.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BN_mod_mul_montgomery.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BN_mod_mul_montgomery.pod`；SHA-256：`06c72bab025d21cd4adec4cc835dec815e90db047090cf5297d77653cf3595ab`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
