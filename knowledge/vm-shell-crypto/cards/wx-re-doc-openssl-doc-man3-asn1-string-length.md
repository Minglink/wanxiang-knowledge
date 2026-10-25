---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-asn1-string-length",
  "title": "OpenSSL：ASN.1 编码 · ASN1_STRING_length（man3）",
  "type": "note",
  "tags": [
    "ASN.1",
    "DER",
    "编码解析",
    "二进制格式",
    "openssl",
    "ASN1_STRING_length"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "83249b81cc8d7a946106780310672165a1f928cef586b673ed0b477608507c66",
  "generatedHash": "1f95e8e2a9a21b3f60abb65e5fe441f763aec31105e3b90d92fdac95cdbcd4e3",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "ASN.1 编码：ASN1_STRING_dup, ASN1_STRING_cmp, ASN1_STRING_set, ASN1_STRING_length, ASN1_STRING_type, ASN1_STRING_get0_data, ASN1_STRING_data, ASN1_STRING_to_UTF8 - ASN1_STRING utility functions",
  "l1": "These functions allow an **ASN1_STRING** structure to be manipulated. ASN1_STRING_length() returns the length of the content of `x`. `x` **MUST NOT** be NULL. ASN1_STRING_get0_data() returns an internal pointer to the data of `x`. Since this is an internal pointer it should **not** be freed or modified in any way. `x` **MUST NOT** be NULL. ASN1_STRING_data() is similar to ASN1_STRING_get0_data() except the returned value is not constant. This function is deprecated: applications should use ASN1_STRING_get0_data() instead. ASN1_STRING_dup() returns a copy of the structure `a`. ASN1_STRING_cmp() compares `a` and `b` returning 0 if the two are identical. The string types and content are compared. ASN1_STRING_set() sets the data of string `str` to the buffer `data` or length `len`. The supplied data is copied. If `len` is -1 then the length i",
  "questions": [
    "ASN1_STRING_length 如何用于ASN.1 编码？",
    "ASN1_STRING_length 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-asn1-string-length",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/ASN1_STRING_length.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：ASN.1 编码 · ASN1_STRING_length（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：ASN.1 编码。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

ASN1_STRING_dup, ASN1_STRING_cmp, ASN1_STRING_set, ASN1_STRING_length,
ASN1_STRING_type, ASN1_STRING_get0_data, ASN1_STRING_data,
ASN1_STRING_to_UTF8 - ASN1_STRING utility functions

## 技术正文

## NAME


ASN1_STRING_dup, ASN1_STRING_cmp, ASN1_STRING_set, ASN1_STRING_length,
ASN1_STRING_type, ASN1_STRING_get0_data, ASN1_STRING_data,
ASN1_STRING_to_UTF8 - ASN1_STRING utility functions

## SYNOPSIS


```c
#include <openssl/asn1.h>

int ASN1_STRING_length(ASN1_STRING *x);
const unsigned char *ASN1_STRING_get0_data(const ASN1_STRING *x);
unsigned char *ASN1_STRING_data(ASN1_STRING *x);

ASN1_STRING *ASN1_STRING_dup(const ASN1_STRING *a);

int ASN1_STRING_cmp(ASN1_STRING *a, ASN1_STRING *b);

int ASN1_STRING_set(ASN1_STRING *str, const void *data, int len);

int ASN1_STRING_type(const ASN1_STRING *x);

int ASN1_STRING_to_UTF8(unsigned char **out, const ASN1_STRING *in);

```

## DESCRIPTION


These functions allow an **ASN1_STRING** structure to be manipulated.

ASN1_STRING_length() returns the length of the content of `x`. `x` **MUST NOT** be NULL.

ASN1_STRING_get0_data() returns an internal pointer to the data of `x`.
Since this is an internal pointer it should **not** be freed or
modified in any way. `x` **MUST NOT** be NULL.

ASN1_STRING_data() is similar to ASN1_STRING_get0_data() except the
returned value is not constant. This function is deprecated:
applications should use ASN1_STRING_get0_data() instead.

ASN1_STRING_dup() returns a copy of the structure `a`.

ASN1_STRING_cmp() compares `a` and `b` returning 0 if the two
are identical. The string types and content are compared.

ASN1_STRING_set() sets the data of string `str` to the buffer
`data` or length `len`. The supplied data is copied. If `len`
is -1 then the length is determined by strlen(data).

ASN1_STRING_type() returns the type of `x`, using standard constants
such as **V_ASN1_OCTET_STRING**.

ASN1_STRING_to_UTF8() converts the string `in` to UTF8 format, the
converted data is allocated in a buffer in `*out`. The length of
`out` is returned or a negative error code. The buffer `*out`
should be freed using OPENSSL_free().

## NOTES


Almost all ASN1 types in OpenSSL are represented as an **ASN1_STRING**
structure. Other types such as **ASN1_OCTET_STRING** are simply typedef'ed
to **ASN1_STRING** and the functions call the **ASN1_STRING** equivalents.
**ASN1_STRING** is also used for some **CHOICE** types which consist
entirely of primitive string types such as **DirectoryString** and
**Time**.

These functions should **not** be used to examine or modify **ASN1_INTEGER**
or **ASN1_ENUMERATED** types: the relevant **INTEGER** or **ENUMERATED**
utility functions should be used instead.

In general it cannot be assumed that the data returned by ASN1_STRING_data()
is null terminated or does not contain embedded nulls. The actual format
of the data will depend on the actual string type itself: for example
for an IA5String the data will be ASCII, for a BMPString two bytes per
character in big endian format, and for a UTF8String it will be in UTF8 format.

Similar care should be take to ensure the data is in the correct format
when calling ASN1_STRING_set().

## RETURN VALUES


ASN1_STRING_length() returns the length of the content of `x`.

ASN1_STRING_get0_data() and ASN1_STRING_data() return an internal pointer to
the data of `x`.

ASN1_STRING_dup() returns a valid **ASN1_STRING** structure or NULL if an
error occurred.

ASN1_STRING_cmp() returns an integer greater than, equal to, or less than 0,
according to whether `a` is greater than, equal to, or less than `b`.

ASN1_STRING_set() returns 1 on success or 0 on error.

ASN1_STRING_type() returns the type of `x`.

ASN1_STRING_to_UTF8() returns the number of bytes in output string `out` or a
negative value if an error occurred.

## SEE ALSO


ERR_get_error(3)

## COPYRIGHT


Copyright 2002-2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/ASN1_STRING_length.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/ASN1_STRING_length.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/ASN1_STRING_length.pod`；SHA-256：`83249b81cc8d7a946106780310672165a1f928cef586b673ed0b477608507c66`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
