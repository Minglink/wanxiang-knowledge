---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bn-add",
  "title": "OpenSSL：大整数运算 · BN_add（man3）",
  "type": "note",
  "tags": [
    "大整数",
    "模运算",
    "密码实现",
    "openssl",
    "BN_add"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "8d498b55cf060b1d74c790617979e9f4ad4f6fb097c29b614396033454264c11",
  "generatedHash": "c1046e4851739ea245bc1ce16ae58d63ef571c98269bb8992b7e3d7fe672decb",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "大整数运算：BN_add, BN_sub, BN_mul, BN_sqr, BN_div, BN_mod, BN_nnmod, BN_mod_add, BN_mod_sub, BN_mod_mul, BN_mod_sqr, BN_mod_sqrt, BN_exp, BN_mod_exp, BN_gcd - arithmetic operations on BIGNUMs",
  "l1": "BN_add() adds `a` and `b` and places the result in `r` (`r=a+b`). `r` may be the same **BIGNUM** as `a` or `b`. BN_sub() subtracts `b` from `a` and places the result in `r` (`r=a-b`). `r` may be the same **BIGNUM** as `a` or `b`. BN_mul() multiplies `a` and `b` and places the result in `r` (`r=a*b`). `r` may be the same **BIGNUM** as `a` or `b`. For multiplication by powers of 2, use BN_lshift(3). BN_sqr() takes the square of `a` and places the result in `r` (`r=a^2`). `r` and `a` may be the same **BIGNUM**. This function is faster than BN_mul(r,a,a). BN_div() divides `a` by `d` and places the result in `dv` and the remainder in `rem` (`dv=a/d, rem=a%d`). Either of `dv` and `rem` may be **NULL**, in which case the respective value is not returned. The result is rounded towards zero; thus if `a` is negative, the remainder will be zero or n",
  "questions": [
    "BN_add 如何用于大整数运算？",
    "BN_add 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bn-add",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BN_add.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：大整数运算 · BN_add（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：大整数运算。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BN_add, BN_sub, BN_mul, BN_sqr, BN_div, BN_mod, BN_nnmod, BN_mod_add,
BN_mod_sub, BN_mod_mul, BN_mod_sqr, BN_mod_sqrt, BN_exp, BN_mod_exp, BN_gcd -
arithmetic operations on BIGNUMs

## 技术正文

## NAME


BN_add, BN_sub, BN_mul, BN_sqr, BN_div, BN_mod, BN_nnmod, BN_mod_add,
BN_mod_sub, BN_mod_mul, BN_mod_sqr, BN_mod_sqrt, BN_exp, BN_mod_exp, BN_gcd -
arithmetic operations on BIGNUMs

## SYNOPSIS


```c
#include <openssl/bn.h>

int BN_add(BIGNUM *r, const BIGNUM *a, const BIGNUM *b);

int BN_sub(BIGNUM *r, const BIGNUM *a, const BIGNUM *b);

int BN_mul(BIGNUM *r, const BIGNUM *a, const BIGNUM *b, BN_CTX *ctx);

int BN_sqr(BIGNUM *r, const BIGNUM *a, BN_CTX *ctx);

int BN_div(BIGNUM *dv, BIGNUM *rem, const BIGNUM *a, const BIGNUM *d,
           BN_CTX *ctx);

int BN_mod(BIGNUM *rem, const BIGNUM *a, const BIGNUM *m, BN_CTX *ctx);

int BN_nnmod(BIGNUM *r, const BIGNUM *a, const BIGNUM *m, BN_CTX *ctx);

int BN_mod_add(BIGNUM *r, const BIGNUM *a, const BIGNUM *b, const BIGNUM *m,
               BN_CTX *ctx);

int BN_mod_sub(BIGNUM *r, const BIGNUM *a, const BIGNUM *b, const BIGNUM *m,
               BN_CTX *ctx);

int BN_mod_mul(BIGNUM *r, const BIGNUM *a, const BIGNUM *b, const BIGNUM *m,
               BN_CTX *ctx);

int BN_mod_sqr(BIGNUM *r, const BIGNUM *a, const BIGNUM *m, BN_CTX *ctx);

BIGNUM *BN_mod_sqrt(BIGNUM *in, const BIGNUM *a, const BIGNUM *p, BN_CTX *ctx);

int BN_exp(BIGNUM *r, const BIGNUM *a, const BIGNUM *p, BN_CTX *ctx);

int BN_mod_exp(BIGNUM *r, const BIGNUM *a, const BIGNUM *p,
               const BIGNUM *m, BN_CTX *ctx);

int BN_gcd(BIGNUM *r, const BIGNUM *a, const BIGNUM *b, BN_CTX *ctx);

```

## DESCRIPTION


BN_add() adds `a` and `b` and places the result in `r` (`r=a+b`).
`r` may be the same **BIGNUM** as `a` or `b`.

BN_sub() subtracts `b` from `a` and places the result in `r` (`r=a-b`).
`r` may be the same **BIGNUM** as `a` or `b`.

BN_mul() multiplies `a` and `b` and places the result in `r` (`r=a*b`).
`r` may be the same **BIGNUM** as `a` or `b`.
For multiplication by powers of 2, use BN_lshift(3).

BN_sqr() takes the square of `a` and places the result in `r`
(`r=a^2`). `r` and `a` may be the same **BIGNUM**.
This function is faster than BN_mul(r,a,a).

BN_div() divides `a` by `d` and places the result in `dv` and the
remainder in `rem` (`dv=a/d, rem=a%d`). Either of `dv` and `rem` may
be **NULL**, in which case the respective value is not returned.
The result is rounded towards zero; thus if `a` is negative, the
remainder will be zero or negative.
For division by powers of 2, use BN_rshift(3).

BN_mod() corresponds to BN_div() with `dv` set to **NULL**.

BN_nnmod() reduces `a` modulo `m` and places the nonnegative
remainder in `r`.

BN_mod_add() adds `a` to `b` modulo `m` and places the nonnegative
result in `r`.

BN_mod_sub() subtracts `b` from `a` modulo `m` and places the
nonnegative result in `r`.

BN_mod_mul() multiplies `a` by `b` and finds the nonnegative
remainder respective to modulus `m` (`r=(a*b) mod m`). `r` may be
the same **BIGNUM** as `a` or `b`. For more efficient algorithms for
repeated computations using the same modulus, see
BN_mod_mul_montgomery(3) and
BN_mod_mul_reciprocal(3).

BN_mod_sqr() takes the square of `a` modulo **m** and places the
result in `r`.

BN_mod_sqrt() returns the modular square root of `a` such that
`in^2 = a (mod p)`. The modulus `p` must be a
prime, otherwise an error or an incorrect "result" will be returned.
The result is stored into `in` which can be NULL. The result will be
newly allocated in that case.

BN_exp() raises `a` to the `p`-th power and places the result in `r`
(`r=a^p`). This function is faster than repeated applications of
BN_mul().

BN_mod_exp() computes `a` to the `p`-th power modulo `m` (C<r=a^p %
m>). This function uses less time and space than BN_exp(). Do not call this
function when **m** is even and any of the parameters have the
**BN_FLG_CONSTTIME** flag set.

BN_gcd() computes the greatest common divisor of `a` and `b` and
places the result in `r`. `r` may be the same **BIGNUM** as `a` or
`b`.

For all functions, `ctx` is a previously allocated **BN_CTX** used for
temporary variables; see BN_CTX_new(3).

Unless noted otherwise, the result **BIGNUM** must be different from
the arguments.

## NOTES


For modular operations such as BN_nnmod() or BN_mod_exp() it is an error
to use the same **BIGNUM** object for the modulus as for the output.

## RETURN VALUES


The BN_mod_sqrt() returns the result (possibly incorrect if `p` is
not a prime), or NULL.

For all remaining functions, 1 is returned for success, 0 on error. The return
value should always be checked (e.g., `if (!BN_add(r,a,b)) goto err;`).
The error codes can be obtained by ERR_get_error(3).

## SEE ALSO


ERR_get_error(3), BN_CTX_new(3),
BN_add_word(3), BN_set_bit(3)

## COPYRIGHT


Copyright 2000-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BN_add.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BN_add.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BN_add.pod`；SHA-256：`8d498b55cf060b1d74c790617979e9f4ad4f6fb097c29b614396033454264c11`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
