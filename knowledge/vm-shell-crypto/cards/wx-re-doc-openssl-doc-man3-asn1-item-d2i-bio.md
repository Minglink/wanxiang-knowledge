---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-asn1-item-d2i-bio",
  "title": "OpenSSL：ASN.1 编码 · ASN1_item_d2i_bio（man3）",
  "type": "note",
  "tags": [
    "ASN.1",
    "DER",
    "编码解析",
    "二进制格式",
    "openssl",
    "ASN1_item_d2i_bio"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "6bdd6fd889bdaf46e76f5445bb2d4b21f4942e6c0a2bdac67afe4d9aa57b03b8",
  "generatedHash": "5ac6456006c241f890376af67bd93fd6caecea96cc9a7a906a2afd6ba1deeed9",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "ASN.1 编码：ASN1_item_d2i_ex, ASN1_item_d2i, ASN1_item_d2i_bio_ex, ASN1_item_d2i_bio, ASN1_item_d2i_fp_ex, ASN1_item_d2i_fp, ASN1_item_i2d_mem_bio, ASN1_item_pack, ASN1_item_unpack_ex, ASN1_item_unpack - decode and encode DER-encoded ASN.1 structures",
  "l1": "ASN1_item_d2i_ex() decodes the contents of the data stored in `*in` of length `len` which must be a DER-encoded ASN.1 structure, using the ASN.1 template `it`. It places the result in `*pval` unless `pval` is NULL. If `*pval` is non-NULL on entry then the **ASN1_VALUE** present there will be reused. Otherwise a new **ASN1_VALUE** will be allocated. If any algorithm fetches are required during the process then they will use the **OSSL_LIB_CTX**provided in the `libctx` parameter and the property query string in `propq`. See crypto(7)/ALGORITHM FETCHING for more information about algorithm fetching. On exit `*in` will be updated to point to the next byte in the buffer after the decoded structure. ASN1_item_d2i() is the same as ASN1_item_d2i_ex() except that the default OSSL_LIB_CTX is used (i.e. NULL) and with a NULL property query string. A",
  "questions": [
    "ASN1_item_d2i_bio 如何用于ASN.1 编码？",
    "ASN1_item_d2i_bio 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-asn1-item-d2i-bio",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/ASN1_item_d2i_bio.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：ASN.1 编码 · ASN1_item_d2i_bio（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：ASN.1 编码。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

ASN1_item_d2i_ex, ASN1_item_d2i, ASN1_item_d2i_bio_ex, ASN1_item_d2i_bio,
ASN1_item_d2i_fp_ex, ASN1_item_d2i_fp, ASN1_item_i2d_mem_bio,
ASN1_item_pack, ASN1_item_unpack_ex, ASN1_item_unpack
- decode and encode DER-encoded ASN.1 structures

## 技术正文

## NAME


ASN1_item_d2i_ex, ASN1_item_d2i, ASN1_item_d2i_bio_ex, ASN1_item_d2i_bio,
ASN1_item_d2i_fp_ex, ASN1_item_d2i_fp, ASN1_item_i2d_mem_bio,
ASN1_item_pack, ASN1_item_unpack_ex, ASN1_item_unpack
- decode and encode DER-encoded ASN.1 structures

## SYNOPSIS


```c
#include <openssl/asn1.h>

ASN1_VALUE *ASN1_item_d2i_ex(ASN1_VALUE **pval, const unsigned char **in,
                             long len, const ASN1_ITEM *it,
                             OSSL_LIB_CTX *libctx, const char *propq);
ASN1_VALUE *ASN1_item_d2i(ASN1_VALUE **pval, const unsigned char **in,
                          long len, const ASN1_ITEM *it);

void *ASN1_item_d2i_bio_ex(const ASN1_ITEM *it, BIO *in, void *x,
                           OSSL_LIB_CTX *libctx, const char *propq);
void *ASN1_item_d2i_bio(const ASN1_ITEM *it, BIO *in, void *x);

void *ASN1_item_d2i_fp_ex(const ASN1_ITEM *it, FILE *in, void *x,
                          OSSL_LIB_CTX *libctx, const char *propq);
void *ASN1_item_d2i_fp(const ASN1_ITEM *it, FILE *in, void *x);

BIO *ASN1_item_i2d_mem_bio(const ASN1_ITEM *it, const ASN1_VALUE *val);

ASN1_STRING *ASN1_item_pack(void *obj, const ASN1_ITEM *it, ASN1_STRING **oct);

void *ASN1_item_unpack(const ASN1_STRING *oct, const ASN1_ITEM *it);

void *ASN1_item_unpack_ex(const ASN1_STRING *oct, const ASN1_ITEM *it,
                         OSSL_LIB_CTX *libctx, const char *propq);

```

## DESCRIPTION


ASN1_item_d2i_ex() decodes the contents of the data stored in `*in` of length
`len` which must be a DER-encoded ASN.1 structure, using the ASN.1 template
`it`. It places the result in `*pval` unless `pval` is NULL. If `*pval` is
non-NULL on entry then the **ASN1_VALUE** present there will be reused. Otherwise
a new **ASN1_VALUE** will be allocated. If any algorithm fetches are required
during the process then they will use the **OSSL_LIB_CTX**provided in the
`libctx` parameter and the property query string in `propq`. See
crypto(7)/ALGORITHM FETCHING for more information about algorithm fetching.
On exit `*in` will be updated to point to the next byte in the buffer after the
decoded structure.

ASN1_item_d2i() is the same as ASN1_item_d2i_ex() except that the default
OSSL_LIB_CTX is used (i.e. NULL) and with a NULL property query string.

ASN1_item_d2i_bio_ex() decodes the contents of its input BIO `in`,
which must be a DER-encoded ASN.1 structure, using the ASN.1 template `it`
and places the result in `*pval` unless `pval` is NULL.
If `in` is NULL it returns NULL, else a pointer to the parsed structure. If any
algorithm fetches are required during the process then they will use the
**OSSL_LIB_CTX** provided in the `libctx` parameter and the property query
string in `propq`. See crypto(7)/ALGORITHM FETCHING for more information
about algorithm fetching.

ASN1_item_d2i_bio() is the same as ASN1_item_d2i_bio_ex() except that the
default **OSSL_LIB_CTX** is used (i.e. NULL) and with a NULL property query
string.

ASN1_item_d2i_fp_ex() is the same as ASN1_item_d2i_bio_ex() except that a FILE
pointer is provided instead of a BIO.

ASN1_item_d2i_fp() is the same as ASN1_item_d2i_fp_ex() except that the
default **OSSL_LIB_CTX** is used (i.e. NULL) and with a NULL property query
string.

ASN1_item_i2d_mem_bio() encodes the given ASN.1 value `val`
using the ASN.1 template `it` and returns the result in a memory BIO.

ASN1_item_pack() encodes the given ASN.1 value in `obj` using the
ASN.1 template `it` and returns an **ASN1_STRING** object. If the passed in
`*oct` is not NULL then this is used to store the returned result, otherwise
a new **ASN1_STRING** object is created. If `oct` is not NULL and `*oct` is NULL
then the returned return is also set into `*oct`. If there is an error the optional
passed in **ASN1_STRING** will not be freed, but the previous value may be cleared when
ASN1_STRING_set0(*oct, NULL, 0) is called internally.

ASN1_item_unpack() uses ASN1_item_d2i() to decode the DER-encoded **ASN1_STRING**
`oct` using the ASN.1 template `it`.

ASN1_item_unpack_ex() is similar to ASN1_item_unpack(), but uses ASN1_item_d2i_ex() so
that the `libctx` and `propq` can be used when doing algorithm fetching.

## RETURN VALUES


ASN1_item_d2i_bio(), ASN1_item_unpack_ex() and ASN1_item_unpack() return a pointer to
an **ASN1_VALUE** or NULL on error.

ASN1_item_i2d_mem_bio() returns a pointer to a memory BIO or NULL on error.

ASN1_item_pack() returns a pointer to an **ASN1_STRING** or NULL on error.

## HISTORY


The functions ASN1_item_d2i_ex(), ASN1_item_d2i_bio_ex(), ASN1_item_d2i_fp_ex()
and ASN1_item_i2d_mem_bio() were added in OpenSSL 3.0.

The function ASN1_item_unpack_ex() was added in OpenSSL 3.2.

## COPYRIGHT


Copyright 2021-2023 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/ASN1_item_d2i_bio.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/ASN1_item_d2i_bio.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/ASN1_item_d2i_bio.pod`；SHA-256：`6bdd6fd889bdaf46e76f5445bb2d4b21f4942e6c0a2bdac67afe4d9aa57b03b8`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
