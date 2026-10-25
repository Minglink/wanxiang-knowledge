---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-cmp-atav-set0",
  "title": "OpenSSL：密码实现与接口 · OSSL_CMP_ATAV_set0（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_CMP_ATAV_set0",
    "RSA非对称密码"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "e65d99dc771a4cee80ed2d1efe7175c67cb73c63d1eb833a387f1f6697a19bb9",
  "generatedHash": "bfccc2dfe6b77eecee00859c88d9ec5fe60bf5ee9d6f609ac9163a36a9cb8ab4",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_CMP_ATAV, OSSL_CMP_ATAV_create, OSSL_CMP_ATAV_set0, OSSL_CMP_ATAV_get0_type, OSSL_CMP_ATAV_get0_value, OSSL_CMP_ATAV_new_algId, OSSL_CMP_ATAV_get0_algId, OSSL_CMP_ATAV_new_rsaKeyLen, OSSL_CMP_ATAV_get_rsaKeyLen, OSSL_CMP_ATAVS, OSSL_CMP_ATAV_push1, OSSL_CMP_ATAV_free - OSSL_CMP_ATAV utility fun",
  "l1": "**OSSL_CMP_ATAV** is a short hand of **OSSL_CRMF_ATTRIBUTETYPEANDVALUE**, defined in RFC 4211 Appendix B. It is typically used in CertRequest structures, but also in CertReqTemplateContent structures for key specifications. OSSL_CMP_ATAV_create() creates a new **OSSL_CMP_ATAV** structure and fills it in. It combines OSSL_CMP_ATAV_new() and OSSL_CMP_ATAV_set0(). OSSL_CMP_ATAV_set0() sets the `atav` with an infoType of `type` and an infoValue of `value`. The pointers `type` and `value` may be NULL, otherwise they must **not** be freed up after the call because their ownership is transferred to `atav`. The `itav` pointer must not be NULL. OSSL_CMP_ATAV_get0_type() returns a direct pointer to the infoType in the `atav` unless it is NULL. OSSL_CMP_ATAV_get0_value() returns a direct pointer to the infoValue in the `atav` as generic **ASN1_TYPE*",
  "questions": [
    "OSSL_CMP_ATAV_set0 如何用于密码实现与接口？",
    "OSSL_CMP_ATAV_set0 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-cmp-atav-set0",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CMP_ATAV_set0.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_CMP_ATAV_set0（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_CMP_ATAV,
OSSL_CMP_ATAV_create,
OSSL_CMP_ATAV_set0,
OSSL_CMP_ATAV_get0_type,
OSSL_CMP_ATAV_get0_value,
OSSL_CMP_ATAV_new_algId,
OSSL_CMP_ATAV_get0_algId,
OSSL_CMP_ATAV_new_rsaKeyLen,
OSSL_CMP_ATAV_get_rsaKeyLen,
OSSL_CMP_ATAVS,
OSSL_CMP_ATAV_push1,
OSSL_CMP_ATAV_free
- OSSL_CMP_ATAV utility functions

## 技术正文

## NAME


OSSL_CMP_ATAV,
OSSL_CMP_ATAV_create,
OSSL_CMP_ATAV_set0,
OSSL_CMP_ATAV_get0_type,
OSSL_CMP_ATAV_get0_value,
OSSL_CMP_ATAV_new_algId,
OSSL_CMP_ATAV_get0_algId,
OSSL_CMP_ATAV_new_rsaKeyLen,
OSSL_CMP_ATAV_get_rsaKeyLen,
OSSL_CMP_ATAVS,
OSSL_CMP_ATAV_push1,
OSSL_CMP_ATAV_free
- OSSL_CMP_ATAV utility functions

## SYNOPSIS


```c
#include <openssl/cmp.h>

typedef OSSL_CRMF_ATTRIBUTETYPEANDVALUE OSSL_CMP_ATAV;
OSSL_CMP_ATAV *OSSL_CMP_ATAV_create(ASN1_OBJECT *type, ASN1_TYPE *value);
void OSSL_CMP_ATAV_set0(OSSL_CMP_ATAV *atav, ASN1_OBJECT *type,
                        ASN1_TYPE *value);
ASN1_OBJECT *OSSL_CMP_ATAV_get0_type(const OSSL_CMP_ATAV *atav);
ASN1_TYPE *OSSL_CMP_ATAV_get0_value(const OSSL_CMP_ATAV *atav);

OSSL_CMP_ATAV *OSSL_CMP_ATAV_new_algId(const X509_ALGOR *alg);
X509_ALGOR *OSSL_CMP_ATAV_get0_algId(const OSSL_CMP_ATAV *atav);
OSSL_CMP_ATAV *OSSL_CMP_ATAV_new_rsaKeyLen(int len);
int OSSL_CMP_ATAV_get_rsaKeyLen(const OSSL_CMP_ATAV *atav);

typedef STACK_OF(OSSL_CRMF_ATTRIBUTETYPEANDVALUE) OSSL_CMP_ATAVS;
int OSSL_CMP_ATAV_push1(OSSL_CMP_ATAVS **sk_p, const OSSL_CMP_ATAV *atav);
void OSSL_CMP_ATAV_free(OSSL_CMP_ATAV *atav);

```

## DESCRIPTION


**OSSL_CMP_ATAV** is a short hand of **OSSL_CRMF_ATTRIBUTETYPEANDVALUE**,
defined in RFC 4211 Appendix B.
It is typically used in CertRequest structures,
but also in CertReqTemplateContent structures for key specifications.

OSSL_CMP_ATAV_create() creates a new **OSSL_CMP_ATAV** structure and fills it in.
It combines OSSL_CMP_ATAV_new() and OSSL_CMP_ATAV_set0().

OSSL_CMP_ATAV_set0() sets the `atav` with an infoType of `type` and an
infoValue of `value`.
The pointers `type` and `value` may be NULL, otherwise
they must **not** be freed up after the call because their ownership
is transferred to `atav`. The `itav` pointer must not be NULL.

OSSL_CMP_ATAV_get0_type() returns a direct pointer to the infoType
in the `atav` unless it is NULL.

OSSL_CMP_ATAV_get0_value() returns a direct pointer to the infoValue
in the `atav` as generic **ASN1_TYPE** pointer unless `atav` is NULL.

OSSL_CMP_ATAV_new_algId() creates a new **OSSL_CMP_ATAV** structure of type
**algId** and fills it in with a copy of the given `alg`.

OSSL_CMP_ATAV_get0_algId() returns
a direct pointer to the algId infoValue in the `atav` of type **X509_ALGOR**
or NULL if `atav` is NULL or does not contain an algId.

OSSL_CMP_ATAV_new_rsaKeyLen() creates a new **OSSL_CMP_ATAV** structure of type
**rsaKeyLen** and fills it in with the given `len`, which must be positive.

OSSL_CMP_ATAV_get_rsaKeyLen() returns
the RSA key length in rsaKeyLen infoValue in the `atav`,
-1 if `atav` is NULL or does not contain an rsaKeyLen or cannot be parsed,
or -2 if the value is less than 1 or is greater than INT_MAX.

OSSL_CMP_ATAV_push1() pushes a copy of `atav` to the stack of **OSSL_CMP_ATAV**
pointed to by `*sk_p`. It creates a new stack if `*sk_p` points to NULL.

OSSL_CMP_ATAV_free() deallocates `atav`. It is defined as a macro.

## NOTES


CMP is defined in RFC 4210. CRMF is defined in RFC 4211.

## RETURN VALUES


OSSL_CMP_ATAV_create(),
OSSL_CMP_ATAV_new_algId(), and OSSL_CMP_ATAV_new_rsaKeyLen()
return a pointer to the ATAV structure on success, or NULL on error.

OSSL_CMP_ATAV_set0() and OSSL_CMP_ATAV_free() do not return a value.

OSSL_CMP_ATAV_get0_type(), OSSL_CMP_ATAV_get0_value(), and
OSSL_CMP_ATAV_get0_algId()
return the respective pointer or NULL if their input is NULL.

OSSL_CMP_ATAV_get_rsaKeyLen() return a key length in bits or < 0 on error.

OSSL_CMP_ATAV_push1() returns 1 on success, 0 on error.

## SEE ALSO


OSSL_CMP_ITAV_new0_certReqTemplate(3), ASN1_TYPE_set(3)

## HISTORY


The **OSSL_CMP_ATAV** type and related functions were added in OpenSSL 3.4.

## COPYRIGHT


Copyright 2022-2024 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_CMP_ATAV_set0.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CMP_ATAV_set0.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_CMP_ATAV_set0.pod`；SHA-256：`e65d99dc771a4cee80ed2d1efe7175c67cb73c63d1eb833a387f1f6697a19bb9`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
