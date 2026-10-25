---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-asn1-type-get",
  "title": "OpenSSL：ASN.1 编码 · ASN1_TYPE_get（man3）",
  "type": "note",
  "tags": [
    "ASN.1",
    "DER",
    "编码解析",
    "二进制格式",
    "openssl",
    "ASN1_TYPE_get"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "326fb4ab84a9f80c135c61f3cdfcce2c149631e2bdc970f5564f8df5d36bfd04",
  "generatedHash": "7fea73c03ae3373733edf7051a3427764ea87788a1badfd5a9f8c231609dcb3b",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "ASN.1 编码：ASN1_TYPE_get, ASN1_TYPE_set, ASN1_TYPE_set1, ASN1_TYPE_cmp, ASN1_TYPE_unpack_sequence, ASN1_TYPE_pack_sequence - ASN1_TYPE utility functions",
  "l1": "These functions allow an **ASN1_TYPE** structure to be manipulated. The **ASN1_TYPE** structure can contain any ASN.1 type or constructed type such as a SEQUENCE: it is effectively equivalent to the ASN.1 ANY type. ASN1_TYPE_get() returns the type of `a` or 0 if it fails. ASN1_TYPE_set() sets the value of `a` to `type` and `value`. This function uses the pointer `value` internally so it must **not** be freed up after the call. ASN1_TYPE_set1() sets the value of `a` to `type` a copy of `value`. ASN1_TYPE_cmp() compares ASN.1 types `a` and `b` and returns 0 if they are identical and nonzero otherwise. ASN1_TYPE_unpack_sequence() attempts to parse the SEQUENCE present in `t` using the ASN.1 structure `it`. If successful it returns a pointer to the ASN.1 structure corresponding to `it` which must be freed by the caller. If it fails it return ",
  "questions": [
    "ASN1_TYPE_get 如何用于ASN.1 编码？",
    "ASN1_TYPE_get 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-asn1-type-get",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/ASN1_TYPE_get.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：ASN.1 编码 · ASN1_TYPE_get（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：ASN.1 编码。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

ASN1_TYPE_get, ASN1_TYPE_set, ASN1_TYPE_set1, ASN1_TYPE_cmp, ASN1_TYPE_unpack_sequence, ASN1_TYPE_pack_sequence - ASN1_TYPE utility
functions

## 技术正文

## NAME


ASN1_TYPE_get, ASN1_TYPE_set, ASN1_TYPE_set1, ASN1_TYPE_cmp, ASN1_TYPE_unpack_sequence, ASN1_TYPE_pack_sequence - ASN1_TYPE utility
functions

## SYNOPSIS


```c
#include <openssl/asn1.h>

int ASN1_TYPE_get(const ASN1_TYPE *a);
void ASN1_TYPE_set(ASN1_TYPE *a, int type, void *value);
int ASN1_TYPE_set1(ASN1_TYPE *a, int type, const void *value);
int ASN1_TYPE_cmp(const ASN1_TYPE *a, const ASN1_TYPE *b);

void *ASN1_TYPE_unpack_sequence(const ASN1_ITEM *it, const ASN1_TYPE *t);
ASN1_TYPE *ASN1_TYPE_pack_sequence(const ASN1_ITEM *it, void *s,
                                   ASN1_TYPE **t);

```

## DESCRIPTION


These functions allow an **ASN1_TYPE** structure to be manipulated. The
**ASN1_TYPE** structure can contain any ASN.1 type or constructed type
such as a SEQUENCE: it is effectively equivalent to the ASN.1 ANY type.

ASN1_TYPE_get() returns the type of `a` or 0 if it fails.

ASN1_TYPE_set() sets the value of `a` to `type` and `value`. This
function uses the pointer `value` internally so it must **not** be freed
up after the call.

ASN1_TYPE_set1() sets the value of `a` to `type` a copy of `value`.

ASN1_TYPE_cmp() compares ASN.1 types `a` and `b` and returns 0 if
they are identical and nonzero otherwise.

ASN1_TYPE_unpack_sequence() attempts to parse the SEQUENCE present in
`t` using the ASN.1 structure `it`. If successful it returns a pointer
to the ASN.1 structure corresponding to `it` which must be freed by the
caller. If it fails it return NULL.

ASN1_TYPE_pack_sequence() attempts to encode the ASN.1 structure `s`
corresponding to `it` into an **ASN1_TYPE**. If successful the encoded
**ASN1_TYPE** is returned. If `t` and `*t` are not NULL the encoded type
is written to `t` overwriting any existing data. If `t` is not NULL
but `*t` is NULL the returned **ASN1_TYPE** is written to `*t`.

## NOTES


The type and meaning of the `value` parameter for ASN1_TYPE_set() and
ASN1_TYPE_set1() is determined by the `type` parameter.
If `type` is **V_ASN1_NULL** `value` is ignored. If `type` is
**V_ASN1_BOOLEAN**
then the boolean is set to TRUE if `value` is not NULL. If `type` is
**V_ASN1_OBJECT** then value is an **ASN1_OBJECT** structure. Otherwise `type`
is and **ASN1_STRING** structure. If `type` corresponds to a primitive type
(or a string type) then the contents of the **ASN1_STRING** contain the content
octets of the type. If `type` corresponds to a constructed type or
a tagged type (**V_ASN1_SEQUENCE**, **V_ASN1_SET** or **V_ASN1_OTHER**) then the
**ASN1_STRING** contains the entire ASN.1 encoding verbatim (including tag and
length octets).

ASN1_TYPE_cmp() may not return zero if two types are equivalent but have
different encodings. For example the single content octet of the boolean TRUE
value under BER can have any nonzero encoding but ASN1_TYPE_cmp() will
only return zero if the values are the same.

If either or both of the parameters passed to ASN1_TYPE_cmp() is NULL the
return value is nonzero. Technically if both parameters are NULL the two
types could be absent OPTIONAL fields and so should match, however, passing
NULL values could also indicate a programming error (for example an
unparsable type which returns NULL) for types which do **not** match. So
applications should handle the case of two absent values separately.

## RETURN VALUES


ASN1_TYPE_get() returns the type of the **ASN1_TYPE** argument.

ASN1_TYPE_set() does not return a value.

ASN1_TYPE_set1() returns 1 for success and 0 for failure.

ASN1_TYPE_cmp() returns 0 if the types are identical and nonzero otherwise.

ASN1_TYPE_unpack_sequence() returns a pointer to an ASN.1 structure or
NULL on failure.

ASN1_TYPE_pack_sequence() return an **ASN1_TYPE** structure if it succeeds or
NULL on failure.

## COPYRIGHT


Copyright 2015-2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/ASN1_TYPE_get.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/ASN1_TYPE_get.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/ASN1_TYPE_get.pod`；SHA-256：`326fb4ab84a9f80c135c61f3cdfcce2c149631e2bdc970f5564f8df5d36bfd04`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
