---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bn-mod-exp-mont",
  "title": "OpenSSL：大整数运算 · BN_mod_exp_mont（man3）",
  "type": "note",
  "tags": [
    "大整数",
    "模运算",
    "密码实现",
    "openssl",
    "BN_mod_exp_mont"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "dd714b18704d753bdbaa24a766fc34178558cb1eee3628a25b4365625b794f0c",
  "generatedHash": "538f60db05f5ee6204975887890e25a0cc60a98d9e2496741a1d7b98606d592b",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "大整数运算：BN_mod_exp_mont, BN_mod_exp_mont_consttime, BN_mod_exp_mont_consttime_x2 - Montgomery exponentiation",
  "l1": "BN_mod_exp_mont() computes `a` to the `p`-th power modulo `m` (`rr=a^p % m`) using Montgomery multiplication. `in_mont` is a Montgomery context and can be NULL. In the case `in_mont` is NULL, it will be initialized within the function, so you can save time on initialization if you provide it in advance. BN_mod_exp_mont_consttime() computes `a` to the `p`-th power modulo `m` (`rr=a^p % m`) using Montgomery multiplication. It is a variant of BN_mod_exp_mont(3) that uses fixed windows and the special precomputation memory layout to limit data-dependency to a minimum to protect secret exponents. It is called automatically when BN_mod_exp_mont(3) is called with parameters `a`, `p`, `m`, any of which have **BN_FLG_CONSTTIME** flag. BN_mod_exp_mont_consttime_x2() computes two independent exponentiations `a1` to the `p1`-th power modulo `m1` (`rr",
  "questions": [
    "BN_mod_exp_mont 如何用于大整数运算？",
    "BN_mod_exp_mont 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bn-mod-exp-mont",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BN_mod_exp_mont.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：大整数运算 · BN_mod_exp_mont（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：大整数运算。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BN_mod_exp_mont, BN_mod_exp_mont_consttime, BN_mod_exp_mont_consttime_x2 -
Montgomery exponentiation

## 技术正文

## NAME


BN_mod_exp_mont, BN_mod_exp_mont_consttime, BN_mod_exp_mont_consttime_x2 -
Montgomery exponentiation

## SYNOPSIS


```c
#include <openssl/bn.h>

int BN_mod_exp_mont(BIGNUM *rr, const BIGNUM *a, const BIGNUM *p,
                    const BIGNUM *m, BN_CTX *ctx, BN_MONT_CTX *in_mont);

int BN_mod_exp_mont_consttime(BIGNUM *rr, const BIGNUM *a, const BIGNUM *p,
                              const BIGNUM *m, BN_CTX *ctx,
                              BN_MONT_CTX *in_mont);

int BN_mod_exp_mont_consttime_x2(BIGNUM *rr1, const BIGNUM *a1,
                                 const BIGNUM *p1, const BIGNUM *m1,
                                 BN_MONT_CTX *in_mont1, BIGNUM *rr2,
                                 const BIGNUM *a2, const BIGNUM *p2,
                                 const BIGNUM *m2, BN_MONT_CTX *in_mont2,
                                 BN_CTX *ctx);

```

## DESCRIPTION


BN_mod_exp_mont() computes `a` to the `p`-th power modulo `m` (`rr=a^p % m`)
using Montgomery multiplication. `in_mont` is a Montgomery context and can be
NULL. In the case `in_mont` is NULL, it will be initialized within the
function, so you can save time on initialization if you provide it in advance.

BN_mod_exp_mont_consttime() computes `a` to the `p`-th power modulo `m`
(`rr=a^p % m`) using Montgomery multiplication. It is a variant of
BN_mod_exp_mont(3) that uses fixed windows and the special precomputation
memory layout to limit data-dependency to a minimum to protect secret exponents.
It is called automatically when BN_mod_exp_mont(3) is called with parameters
`a`, `p`, `m`, any of which have **BN_FLG_CONSTTIME** flag.

BN_mod_exp_mont_consttime_x2() computes two independent exponentiations `a1` to
the `p1`-th power modulo `m1` (`rr1=a1^p1 % m1`) and `a2` to the `p2`-th
power modulo `m2` (`rr2=a2^p2 % m2`) using Montgomery multiplication. For some
fixed and equal modulus sizes `m1` and `m2` it uses optimizations that allow
to speedup two exponentiations. In all other cases the function reduces to two
calls of BN_mod_exp_mont_consttime(3).

## RETURN VALUES


For all functions 1 is returned for success, 0 on error.
The error codes can be obtained by ERR_get_error(3).

## SEE ALSO


ERR_get_error(3), BN_mod_exp_mont(3)

## COPYRIGHT


Copyright 2000-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BN_mod_exp_mont.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BN_mod_exp_mont.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BN_mod_exp_mont.pod`；SHA-256：`dd714b18704d753bdbaa24a766fc34178558cb1eee3628a25b4365625b794f0c`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
