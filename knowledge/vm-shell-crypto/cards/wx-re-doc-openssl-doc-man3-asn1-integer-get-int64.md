---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-asn1-integer-get-int64",
  "title": "OpenSSL：ASN.1 编码 · ASN1_INTEGER_get_int64（man3）",
  "type": "note",
  "tags": [
    "ASN.1",
    "DER",
    "编码解析",
    "二进制格式",
    "openssl",
    "ASN1_INTEGER_get_int64"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "d45e89e8a3c7de4eefb1244a7513eb9401542de12890a23a1cb6c947933c90d3",
  "generatedHash": "661ace9f14ac252aed31f4f20525f511e07d9097610df5db1732a328eaac480a",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "ASN.1 编码：ASN1_INTEGER_get_uint64, ASN1_INTEGER_set_uint64, ASN1_INTEGER_get_int64, ASN1_INTEGER_get, ASN1_INTEGER_set_int64, ASN1_INTEGER_set, BN_to_ASN1_INTEGER, ASN1_INTEGER_to_BN, ASN1_ENUMERATED_get_int64, ASN1_ENUMERATED_get, ASN1_ENUMERATED_set_int64, ASN1_ENUMERATED_set, BN_to_ASN1_ENUMERATED, ASN1_EN",
  "l1": "These functions convert to and from **ASN1_INTEGER** and **ASN1_ENUMERATED** structures. ASN1_INTEGER_get_int64() converts an **ASN1_INTEGER** into an **int64_t** type If successful it returns 1 and sets `*pr` to the value of `a`. If it fails (due to invalid type or the value being too big to fit into an **int64_t** type) it returns 0. ASN1_INTEGER_get_uint64() is similar to ASN1_INTEGER_get_int64_t() except it converts to a **uint64_t** type and an error is returned if the passed integer is negative. ASN1_INTEGER_get() also returns the value of `a` but it returns 0 if `a` is NULL and -1 on error (which is ambiguous because -1 is a legitimate value for an **ASN1_INTEGER**). New applications should use ASN1_INTEGER_get_int64() instead. ASN1_INTEGER_set_int64() sets the value of **ASN1_INTEGER** `a` to the **int64_t** value `r`. ASN1_INTEGE",
  "questions": [
    "ASN1_INTEGER_get_int64 如何用于ASN.1 编码？",
    "ASN1_INTEGER_get_int64 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-asn1-integer-get-int64",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/ASN1_INTEGER_get_int64.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：ASN.1 编码 · ASN1_INTEGER_get_int64（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：ASN.1 编码。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

ASN1_INTEGER_get_uint64, ASN1_INTEGER_set_uint64,
ASN1_INTEGER_get_int64, ASN1_INTEGER_get, ASN1_INTEGER_set_int64, ASN1_INTEGER_set, BN_to_ASN1_INTEGER, ASN1_INTEGER_to_BN, ASN1_ENUMERATED_get_int64, ASN1_ENUMERATED_get, ASN1_ENUMERATED_set_int64, ASN1_ENUMERATED_set, BN_to_ASN1_ENUMERATED, ASN1_ENUMERATED_to_BN
- ASN.1 INTEGER and ENUMERATED utilities

## 技术正文

## NAME


ASN1_INTEGER_get_uint64, ASN1_INTEGER_set_uint64,
ASN1_INTEGER_get_int64, ASN1_INTEGER_get, ASN1_INTEGER_set_int64, ASN1_INTEGER_set, BN_to_ASN1_INTEGER, ASN1_INTEGER_to_BN, ASN1_ENUMERATED_get_int64, ASN1_ENUMERATED_get, ASN1_ENUMERATED_set_int64, ASN1_ENUMERATED_set, BN_to_ASN1_ENUMERATED, ASN1_ENUMERATED_to_BN
- ASN.1 INTEGER and ENUMERATED utilities

## SYNOPSIS


```c
#include <openssl/asn1.h>

int ASN1_INTEGER_get_int64(int64_t *pr, const ASN1_INTEGER *a);
long ASN1_INTEGER_get(const ASN1_INTEGER *a);

int ASN1_INTEGER_set_int64(ASN1_INTEGER *a, int64_t r);
int ASN1_INTEGER_set(ASN1_INTEGER *a, long v);

int ASN1_INTEGER_get_uint64(uint64_t *pr, const ASN1_INTEGER *a);
int ASN1_INTEGER_set_uint64(ASN1_INTEGER *a, uint64_t r);

ASN1_INTEGER *BN_to_ASN1_INTEGER(const BIGNUM *bn, ASN1_INTEGER *ai);
BIGNUM *ASN1_INTEGER_to_BN(const ASN1_INTEGER *ai, BIGNUM *bn);

int ASN1_ENUMERATED_get_int64(int64_t *pr, const ASN1_ENUMERATED *a);
long ASN1_ENUMERATED_get(const ASN1_ENUMERATED *a);

int ASN1_ENUMERATED_set_int64(ASN1_ENUMERATED *a, int64_t r);
int ASN1_ENUMERATED_set(ASN1_ENUMERATED *a, long v);

ASN1_ENUMERATED *BN_to_ASN1_ENUMERATED(const BIGNUM *bn, ASN1_ENUMERATED *ai);
BIGNUM *ASN1_ENUMERATED_to_BN(const ASN1_ENUMERATED *ai, BIGNUM *bn);

```

## DESCRIPTION


These functions convert to and from **ASN1_INTEGER** and **ASN1_ENUMERATED**
structures.

ASN1_INTEGER_get_int64() converts an **ASN1_INTEGER** into an **int64_t** type
If successful it returns 1 and sets `*pr` to the value of `a`. If it fails
(due to invalid type or the value being too big to fit into an **int64_t** type)
it returns 0.

ASN1_INTEGER_get_uint64() is similar to ASN1_INTEGER_get_int64_t() except it
converts to a **uint64_t** type and an error is returned if the passed integer
is negative.

ASN1_INTEGER_get() also returns the value of `a` but it returns 0 if `a` is
NULL and -1 on error (which is ambiguous because -1 is a legitimate value for
an **ASN1_INTEGER**). New applications should use ASN1_INTEGER_get_int64()
instead.

ASN1_INTEGER_set_int64() sets the value of **ASN1_INTEGER** `a` to the
**int64_t** value `r`.

ASN1_INTEGER_set_uint64() sets the value of **ASN1_INTEGER** `a` to the
**uint64_t** value `r`.

ASN1_INTEGER_set() sets the value of **ASN1_INTEGER** `a` to the `long` value
`v`.

BN_to_ASN1_INTEGER() converts **BIGNUM** `bn` to an **ASN1_INTEGER**. If `ai`
is NULL a new **ASN1_INTEGER** structure is returned. If `ai` is not NULL then
the existing structure will be used instead.

ASN1_INTEGER_to_BN() converts ASN1_INTEGER `ai` into a **BIGNUM**. If `bn` is
NULL a new **BIGNUM** structure is returned. If `bn` is not NULL then the
existing structure will be used instead.

ASN1_ENUMERATED_get_int64(), ASN1_ENUMERATED_set_int64(),
ASN1_ENUMERATED_set(), BN_to_ASN1_ENUMERATED() and ASN1_ENUMERATED_to_BN()
behave in an identical way to their ASN1_INTEGER counterparts except they
operate on an **ASN1_ENUMERATED** value.

ASN1_ENUMERATED_get() returns the value of `a` in a similar way to
ASN1_INTEGER_get() but it returns **0xffffffffL** if the value of `a` will not
fit in a long type. New applications should use ASN1_ENUMERATED_get_int64()
instead.

## NOTES


In general an **ASN1_INTEGER** or **ASN1_ENUMERATED** type can contain an
integer of almost arbitrary size and so cannot always be represented by a C
**int64_t** type. However, in many cases (for example version numbers) they
represent small integers which can be more easily manipulated if converted to
an appropriate C integer type.

## BUGS


The ambiguous return values of ASN1_INTEGER_get() and ASN1_ENUMERATED_get()
mean these functions should be avoided if possible. They are retained for
compatibility. Normally the ambiguous return values are not legitimate
values for the fields they represent.

## RETURN VALUES


ASN1_INTEGER_set_int64(), ASN1_INTEGER_set(), ASN1_ENUMERATED_set_int64() and
ASN1_ENUMERATED_set() return 1 for success and 0 for failure. They will only
fail if a memory allocation error occurs.

ASN1_INTEGER_get_int64() and ASN1_ENUMERATED_get_int64() return 1 for success
and 0 for failure. They will fail if the passed type is incorrect (this will
only happen if there is a programming error) or if the value exceeds the range
of an **int64_t** type.

BN_to_ASN1_INTEGER() and BN_to_ASN1_ENUMERATED() return an **ASN1_INTEGER** or
**ASN1_ENUMERATED** structure respectively or NULL if an error occurs. They will
only fail due to a memory allocation error.

ASN1_INTEGER_to_BN() and ASN1_ENUMERATED_to_BN() return a **BIGNUM** structure
of NULL if an error occurs. They can fail if the passed type is incorrect
(due to programming error) or due to a memory allocation failure.

## SEE ALSO


ERR_get_error(3)

## HISTORY


ASN1_INTEGER_set_int64(), ASN1_INTEGER_get_int64(),
ASN1_ENUMERATED_set_int64() and ASN1_ENUMERATED_get_int64()
were added in OpenSSL 1.1.0.

## COPYRIGHT


Copyright 2015-2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/ASN1_INTEGER_get_int64.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/ASN1_INTEGER_get_int64.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/ASN1_INTEGER_get_int64.pod`；SHA-256：`d45e89e8a3c7de4eefb1244a7513eb9401542de12890a23a1cb6c947933c90d3`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
