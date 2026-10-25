---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bn-rand",
  "title": "OpenSSL：大整数运算 · BN_rand（man3）",
  "type": "note",
  "tags": [
    "大整数",
    "模运算",
    "密码实现",
    "openssl",
    "BN_rand"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "969b1b70766d7cbbb67fdbf718951c2c2d7110fc0dea49a2344221e48e72a89e",
  "generatedHash": "b7ed7aadda0157ef9cf69595df80502c6dca6fcabd113810ad619071bb9a9cf7",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "大整数运算：BN_rand_ex, BN_rand, BN_priv_rand_ex, BN_priv_rand, BN_pseudo_rand, BN_rand_range_ex, BN_rand_range, BN_priv_rand_range_ex, BN_priv_rand_range, BN_pseudo_rand_range - generate pseudo-random number",
  "l1": "BN_rand_ex() generates a cryptographically strong pseudo-random number of `bits` in length and security strength at least `strength` bits using the random number generator for the library context associated with `ctx`. The function stores the generated data in `rnd`. The parameter `ctx` may be NULL in which case the default library context is used. If `bits` is less than zero, or too small to accommodate the requirements specified by the `top` and `bottom` parameters, an error is returned. The `top` parameters specifies requirements on the most significant bit of the generated number. If it is **BN_RAND_TOP_ANY**, there is no constraint. If it is **BN_RAND_TOP_ONE**, the top bit must be one. If it is **BN_RAND_TOP_TWO**, the two most significant bits of the number will be set to 1, so that the product of two such random numbers will alway",
  "questions": [
    "BN_rand 如何用于大整数运算？",
    "BN_rand 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bn-rand",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BN_rand.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：大整数运算 · BN_rand（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：大整数运算。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BN_rand_ex, BN_rand, BN_priv_rand_ex, BN_priv_rand, BN_pseudo_rand,
BN_rand_range_ex, BN_rand_range, BN_priv_rand_range_ex, BN_priv_rand_range,
BN_pseudo_rand_range
- generate pseudo-random number

## 技术正文

## NAME


BN_rand_ex, BN_rand, BN_priv_rand_ex, BN_priv_rand, BN_pseudo_rand,
BN_rand_range_ex, BN_rand_range, BN_priv_rand_range_ex, BN_priv_rand_range,
BN_pseudo_rand_range
- generate pseudo-random number

## SYNOPSIS


```c
#include <openssl/bn.h>

int BN_rand_ex(BIGNUM *rnd, int bits, int top, int bottom,
               unsigned int strength, BN_CTX *ctx);
int BN_rand(BIGNUM *rnd, int bits, int top, int bottom);

int BN_priv_rand_ex(BIGNUM *rnd, int bits, int top, int bottom,
                    unsigned int strength, BN_CTX *ctx);
int BN_priv_rand(BIGNUM *rnd, int bits, int top, int bottom);

int BN_rand_range_ex(BIGNUM *rnd, const BIGNUM *range, unsigned int strength,
                     BN_CTX *ctx);
int BN_rand_range(BIGNUM *rnd, const BIGNUM *range);

int BN_priv_rand_range_ex(BIGNUM *rnd, const BIGNUM *range, unsigned int strength,
                          BN_CTX *ctx);
int BN_priv_rand_range(BIGNUM *rnd, const BIGNUM *range);

```

The following functions have been deprecated since OpenSSL 3.0, and can be
hidden entirely by defining **OPENSSL_API_COMPAT** with a suitable version value,
see openssl_user_macros(7):

```c
int BN_pseudo_rand(BIGNUM *rnd, int bits, int top, int bottom);
int BN_pseudo_rand_range(BIGNUM *rnd, const BIGNUM *range);

```

## DESCRIPTION


BN_rand_ex() generates a cryptographically strong pseudo-random
number of `bits` in length and security strength at least `strength` bits
using the random number generator for the library context associated with
`ctx`. The function stores the generated data in `rnd`. The parameter `ctx`
may be NULL in which case the default library context is used.
If `bits` is less than zero, or too small to
accommodate the requirements specified by the `top` and `bottom`
parameters, an error is returned.
The `top` parameters specifies
requirements on the most significant bit of the generated number.
If it is **BN_RAND_TOP_ANY**, there is no constraint.
If it is **BN_RAND_TOP_ONE**, the top bit must be one.
If it is **BN_RAND_TOP_TWO**, the two most significant bits of
the number will be set to 1, so that the product of two such random
numbers will always have 2*`bits` length.
If `bottom` is **BN_RAND_BOTTOM_ODD**, the number will be odd; if it
is **BN_RAND_BOTTOM_ANY** it can be odd or even.
If `bits` is 1 then `top` cannot also be **BN_RAND_TOP_TWO**.

BN_rand() is the same as BN_rand_ex() except that the default library context
is always used.

BN_rand_range_ex() generates a cryptographically strong pseudo-random
number `rnd`, of security strength at least `strength` bits,
in the range 0 <= `rnd` < `range` using the random number
generator for the library context associated with `ctx`. The parameter `ctx`
may be NULL in which case the default library context is used.

BN_rand_range() is the same as BN_rand_range_ex() except that the default
library context is always used.

BN_priv_rand_ex(), BN_priv_rand(), BN_priv_rand_rand_ex() and
BN_priv_rand_range() have the same semantics as BN_rand_ex(), BN_rand(),
BN_rand_range_ex() and BN_rand_range() respectively.  They are intended to be
used for generating values that should remain private, and mirror the
same difference between RAND_bytes(3) and RAND_priv_bytes(3).

## NOTES


Always check the error return value of these functions and do not take
randomness for granted: an error occurs if the CSPRNG has not been
seeded with enough randomness to ensure an unpredictable byte sequence.

## RETURN VALUES


The functions return 1 on success, 0 on error.
The error codes can be obtained by ERR_get_error(3).

## SEE ALSO


ERR_get_error(3),
RAND_add(3),
RAND_bytes(3),
RAND_priv_bytes(3),
RAND(7),
EVP_RAND(7)

## HISTORY



- *

Starting with OpenSSL release 1.1.0, BN_pseudo_rand() has been identical
to BN_rand() and BN_pseudo_rand_range() has been identical to
BN_rand_range().
The BN_pseudo_rand() and BN_pseudo_rand_range() functions were
deprecated in OpenSSL 3.0.

- *

The BN_priv_rand() and BN_priv_rand_range() functions were added in
OpenSSL 1.1.1.

- *

The BN_rand_ex(), BN_priv_rand_ex(), BN_rand_range_ex() and
BN_priv_rand_range_ex() functions were added in OpenSSL 3.0.


## COPYRIGHT


Copyright 2000-2022 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BN_rand.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BN_rand.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BN_rand.pod`；SHA-256：`969b1b70766d7cbbb67fdbf718951c2c2d7110fc0dea49a2344221e48e72a89e`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
