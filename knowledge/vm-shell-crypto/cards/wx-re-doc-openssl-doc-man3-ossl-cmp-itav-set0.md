---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-ossl-cmp-itav-set0",
  "title": "OpenSSL：密码实现与接口 · OSSL_CMP_ITAV_set0（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "OSSL_CMP_ITAV_set0"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "fc2a230895836e1d78cad50aabf36673ced103c8f7854c5ed130897d5d3e9ed9",
  "generatedHash": "3dcc073471db917a748fb42b62167895397b14ac8e437c516f6542262500c75c",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：OSSL_CMP_ITAV_create, OSSL_CMP_ITAV_set0, OSSL_CMP_ITAV_get0_type, OSSL_CMP_ITAV_get0_value, OSSL_CMP_ITAV_push0_stack_item, OSSL_CMP_ITAV_new0_certProfile, OSSL_CMP_ITAV_get0_certProfile - OSSL_CMP_ITAV utility functions",
  "l1": "ITAV is short for InfoTypeAndValue. This type is defined in RFC 4210 section 5.3.19 and Appendix F. It is used at various places in CMP messages, e.g., in the generalInfo PKIHeader field, to hold a key-value pair. OSSL_CMP_ITAV_create() creates a new **OSSL_CMP_ITAV** structure and fills it in. It combines OSSL_CMP_ITAV_new() and OSSL_CMP_ITAV_set0(). OSSL_CMP_ITAV_set0() sets the `itav` with an infoType of `type` and an infoValue of `value`. This function uses the pointers `type` and `value` internally, so they must **not** be freed up after the call. OSSL_CMP_ITAV_get0_type() returns a direct pointer to the infoType in the `itav`. OSSL_CMP_ITAV_get0_value() returns a direct pointer to the infoValue in the `itav` as generic **ASN1_TYPE** pointer. OSSL_CMP_ITAV_push0_stack_item() pushes `itav` to the stack pointed to by `*itav_sk_p`. It c",
  "questions": [
    "OSSL_CMP_ITAV_set0 如何用于密码实现与接口？",
    "OSSL_CMP_ITAV_set0 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-ossl-cmp-itav-set0",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CMP_ITAV_set0.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · OSSL_CMP_ITAV_set0（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

OSSL_CMP_ITAV_create,
OSSL_CMP_ITAV_set0,
OSSL_CMP_ITAV_get0_type,
OSSL_CMP_ITAV_get0_value,
OSSL_CMP_ITAV_push0_stack_item,
OSSL_CMP_ITAV_new0_certProfile,
OSSL_CMP_ITAV_get0_certProfile
- OSSL_CMP_ITAV utility functions

## 技术正文

## NAME


OSSL_CMP_ITAV_create,
OSSL_CMP_ITAV_set0,
OSSL_CMP_ITAV_get0_type,
OSSL_CMP_ITAV_get0_value,
OSSL_CMP_ITAV_push0_stack_item,
OSSL_CMP_ITAV_new0_certProfile,
OSSL_CMP_ITAV_get0_certProfile
- OSSL_CMP_ITAV utility functions

## SYNOPSIS


```c
#include <openssl/cmp.h>

OSSL_CMP_ITAV *OSSL_CMP_ITAV_create(ASN1_OBJECT *type, ASN1_TYPE *value);
void OSSL_CMP_ITAV_set0(OSSL_CMP_ITAV *itav, ASN1_OBJECT *type,
                        ASN1_TYPE *value);
ASN1_OBJECT *OSSL_CMP_ITAV_get0_type(const OSSL_CMP_ITAV *itav);
ASN1_TYPE *OSSL_CMP_ITAV_get0_value(const OSSL_CMP_ITAV *itav);
int OSSL_CMP_ITAV_push0_stack_item(STACK_OF(OSSL_CMP_ITAV) **itav_sk_p,
                                   OSSL_CMP_ITAV *itav);
OSSL_CMP_ITAV
*OSSL_CMP_ITAV_new0_certProfile(STACK_OF(ASN1_UTF8STRING) *certProfile);
int OSSL_CMP_ITAV_get0_certProfile(const OSSL_CMP_ITAV *itav,
                                   STACK_OF(ASN1_UTF8STRING) **out);

```

## DESCRIPTION


ITAV is short for InfoTypeAndValue. This type is defined in RFC 4210
section 5.3.19 and Appendix F. It is used at various places in CMP messages,
e.g., in the generalInfo PKIHeader field, to hold a key-value pair.

OSSL_CMP_ITAV_create() creates a new **OSSL_CMP_ITAV** structure and fills it in.
It combines OSSL_CMP_ITAV_new() and OSSL_CMP_ITAV_set0().

OSSL_CMP_ITAV_set0() sets the `itav` with an infoType of `type` and an
infoValue of `value`. This function uses the pointers `type` and `value`
internally, so they must **not** be freed up after the call.

OSSL_CMP_ITAV_get0_type() returns a direct pointer to the infoType in the
`itav`.

OSSL_CMP_ITAV_get0_value() returns a direct pointer to the infoValue in
the `itav` as generic **ASN1_TYPE** pointer.

OSSL_CMP_ITAV_push0_stack_item() pushes `itav` to the stack pointed to
by `*itav_sk_p`. It creates a new stack if `*itav_sk_p` points to NULL.

OSSL_CMP_ITAV_new0_certProfile() creates a new **OSSL_CMP_ITAV** structure
of type **certProfile** that includes the optionally given list of profile names.
On success, ownership of the list is with the new **OSSL_CMP_ITAV** structure.

OSSL_CMP_ITAV_get0_certProfile() on success assigns to `*out`
an internal pointer to the
list of certificate profile names contained in the infoValue field of `itav`.
The pointer may be NULL if no profile name is included.
It is an error if the infoType of `itav` is not **certProfile**.

## NOTES


CMP is defined in RFC 4210 and RFC 9480 (and CRMF in RFC 4211).

OIDs to use as types in **OSSL_CMP_ITAV** can be found at
https://datatracker.ietf.org/doc/html/rfc9480#section-4.2.2.
The respective OpenSSL NIDs, such as **NID_id_it_certProfile**,
are defined in the F<< <openssl/obj_mac.h> >> header file.

## RETURN VALUES


OSSL_CMP_ITAV_create() and OSSL_CMP_ITAV_new0_certProfile()
return a pointer to an ITAV structure on success, or NULL on error.

OSSL_CMP_ITAV_set0() does not return a value.

OSSL_CMP_ITAV_get0_type() and OSSL_CMP_ITAV_get0_value()
return the respective pointer or NULL if their input is NULL.

OSSL_CMP_ITAV_push0_stack_item() and OSSL_CMP_ITAV_get0_certProfile()
return 1 on success, 0 on error.

## EXAMPLES


The following code creates and sets a structure representing a generic
InfoTypeAndValue sequence, using an OID created from text as type, and an
integer as value. Afterwards, it is pushed to the **OSSL_CMP_CTX** to be later
included in the requests' PKIHeader's genInfo field.

```c
   ASN1_OBJECT *type = OBJ_txt2obj("1.2.3.4.5", 1);
   if (type == NULL) ...

   ASN1_INTEGER *asn1int = ASN1_INTEGER_new();
   if (asn1int == NULL || !ASN1_INTEGER_set(asn1int, 12345)) ...

   ASN1_TYPE *val = ASN1_TYPE_new();
   if (val == NULL) ...
   ASN1_TYPE_set(val, V_ASN1_INTEGER, asn1int);

   OSSL_CMP_ITAV *itav = OSSL_CMP_ITAV_create(type, val);
   if (itav == NULL) ...

   if (!OSSL_CMP_CTX_push0_geninfo_ITAV(ctx, itav)) {
       OSSL_CMP_ITAV_free(itav); /* also frees type and val */
       ...
   }

   ...

   OSSL_CMP_CTX_free(ctx); /* also frees itav */

```

## SEE ALSO


OSSL_CMP_CTX_new(3), OSSL_CMP_CTX_free(3), ASN1_TYPE_set(3)

## HISTORY


The OpenSSL CMP support was added in OpenSSL 3.0.

OSSL_CMP_ITAV_new0_certProfile() and OSSL_CMP_ITAV_get0_certProfile()
were added in OpenSSL 3.3.

## COPYRIGHT


Copyright 2007-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/OSSL_CMP_ITAV_set0.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/OSSL_CMP_ITAV_set0.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/OSSL_CMP_ITAV_set0.pod`；SHA-256：`fc2a230895836e1d78cad50aabf36673ced103c8f7854c5ed130897d5d3e9ed9`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
