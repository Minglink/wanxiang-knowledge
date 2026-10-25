---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-bn-set-bit",
  "title": "OpenSSL：大整数运算 · BN_set_bit（man3）",
  "type": "note",
  "tags": [
    "大整数",
    "模运算",
    "密码实现",
    "openssl",
    "BN_set_bit"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "4e2b84dfad23bccc7487b74c455285517d4ed93aa0cd408d99905a37be7662bb",
  "generatedHash": "43b23c0d211cb70c6dc2e20dcc291305278555f36fb8238170b74081a8caaf3f",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "大整数运算：BN_set_bit, BN_clear_bit, BN_is_bit_set, BN_mask_bits, BN_lshift, BN_lshift1, BN_rshift, BN_rshift1 - bit operations on BIGNUMs",
  "l1": "BN_set_bit() sets bit **n** in **a** to 1 (`a|=(1<<n)`). The number is expanded if necessary. BN_clear_bit() sets bit **n** in **a** to 0 (`a&=~(1<<n)`). An error occurs if **a** is shorter than **n** bits. BN_is_bit_set() tests if bit **n** in **a** is set. BN_mask_bits() truncates **a** to an **n** bit number (`a&=~((~0)<<n)`). An error occurs if **n** is negative. An error is also returned if the internal representation of **a** is already shorter than **n** bits. The internal representation depends on the platform's word size, and this error can be safely ignored. Use BN_num_bits(3) to determine the exact number of bits if needed. BN_lshift() shifts **a** left by **n** bits and places the result in **r** (`r=a*2^n`). Note that **n** must be nonnegative. BN_lshift1() shifts **a** left by one and places the result in **r** (`r=2*a`). BN",
  "questions": [
    "BN_set_bit 如何用于大整数运算？",
    "BN_set_bit 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-bn-set-bit",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BN_set_bit.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：大整数运算 · BN_set_bit（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：大整数运算。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

BN_set_bit, BN_clear_bit, BN_is_bit_set, BN_mask_bits, BN_lshift,
BN_lshift1, BN_rshift, BN_rshift1 - bit operations on BIGNUMs

## 技术正文

## NAME


BN_set_bit, BN_clear_bit, BN_is_bit_set, BN_mask_bits, BN_lshift,
BN_lshift1, BN_rshift, BN_rshift1 - bit operations on BIGNUMs

## SYNOPSIS


```c
#include <openssl/bn.h>

int BN_set_bit(BIGNUM *a, int n);
int BN_clear_bit(BIGNUM *a, int n);

int BN_is_bit_set(const BIGNUM *a, int n);

int BN_mask_bits(BIGNUM *a, int n);

int BN_lshift(BIGNUM *r, const BIGNUM *a, int n);
int BN_lshift1(BIGNUM *r, BIGNUM *a);

int BN_rshift(BIGNUM *r, BIGNUM *a, int n);
int BN_rshift1(BIGNUM *r, BIGNUM *a);

```

## DESCRIPTION


BN_set_bit() sets bit **n** in **a** to 1 (`a|=(1<<n)`). The
number is expanded if necessary.

BN_clear_bit() sets bit **n** in **a** to 0 (`a&=~(1<<n)`). An
error occurs if **a** is shorter than **n** bits.

BN_is_bit_set() tests if bit **n** in **a** is set.

BN_mask_bits() truncates **a** to an **n** bit number
(`a&=~((~0)<<n)`). An error occurs if **n** is negative. An error is
also returned if the internal representation of **a** is already shorter than
**n** bits. The internal representation depends on the platform's word size, and
this error can be safely ignored. Use BN_num_bits(3) to determine the exact
number of bits if needed.

BN_lshift() shifts **a** left by **n** bits and places the result in
**r** (`r=a*2^n`). Note that **n** must be nonnegative. BN_lshift1() shifts
**a** left by one and places the result in **r** (`r=2*a`).

BN_rshift() shifts **a** right by **n** bits and places the result in
**r** (`r=a/2^n`). Note that **n** must be nonnegative. BN_rshift1() shifts
**a** right by one and places the result in **r** (`r=a/2`).

For the shift functions, **r** and **a** may be the same variable.

## RETURN VALUES


BN_is_bit_set() returns 1 if the bit is set, 0 otherwise.

All other functions return 1 for success, 0 on error. The error codes
can be obtained by ERR_get_error(3).

## SEE ALSO


BN_num_bytes(3), BN_add(3)

## COPYRIGHT


Copyright 2000-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/BN_set_bit.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/BN_set_bit.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/BN_set_bit.pod`；SHA-256：`4e2b84dfad23bccc7487b74c455285517d4ed93aa0cd408d99905a37be7662bb`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
