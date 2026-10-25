---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-cms-get0-type",
  "title": "OpenSSL：密码实现与接口 · CMS_get0_type（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "CMS_get0_type"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "4a8a67a4c3a403dc167e6c2498bc81362952d7a86617cc0397cebab9f58f953f",
  "generatedHash": "43b798674c6835554989d21786440628f56afb6d9eb3859cdf76b1cdcd6f1f6f",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：CMS_get0_type, CMS_set1_eContentType, CMS_get0_eContentType, CMS_get0_content - get and set CMS content types and content",
  "l1": "CMS_get0_type() returns the content type of a CMS_ContentInfo structure as an ASN1_OBJECT pointer. An application can then decide how to process the CMS_ContentInfo structure based on this value. CMS_set1_eContentType() sets the embedded content type of a CMS_ContentInfo structure. It should be called with CMS functions (such as CMS_sign(3), CMS_encrypt(3)) with the **CMS_PARTIAL** flag and **before** the structure is finalised, otherwise the results are undefined. ASN1_OBJECT *CMS_get0_eContentType() returns a pointer to the embedded content type. CMS_get0_content() returns a pointer to the **ASN1_OCTET_STRING** pointer containing the embedded content.",
  "questions": [
    "CMS_get0_type 如何用于密码实现与接口？",
    "CMS_get0_type 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-cms-get0-type",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMS_get0_type.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · CMS_get0_type（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

CMS_get0_type, CMS_set1_eContentType, CMS_get0_eContentType, CMS_get0_content - get and set CMS content types and content

## 技术正文

## NAME


CMS_get0_type, CMS_set1_eContentType, CMS_get0_eContentType, CMS_get0_content - get and set CMS content types and content

## SYNOPSIS


```c
#include <openssl/cms.h>

const ASN1_OBJECT *CMS_get0_type(const CMS_ContentInfo *cms);
int CMS_set1_eContentType(CMS_ContentInfo *cms, const ASN1_OBJECT *oid);
const ASN1_OBJECT *CMS_get0_eContentType(CMS_ContentInfo *cms);
ASN1_OCTET_STRING **CMS_get0_content(CMS_ContentInfo *cms);

```

## DESCRIPTION


CMS_get0_type() returns the content type of a CMS_ContentInfo structure as
an ASN1_OBJECT pointer. An application can then decide how to process the
CMS_ContentInfo structure based on this value.

CMS_set1_eContentType() sets the embedded content type of a CMS_ContentInfo
structure. It should be called with CMS functions (such as CMS_sign(3),
CMS_encrypt(3))
with the **CMS_PARTIAL**
flag and **before** the structure is finalised, otherwise the results are
undefined.

ASN1_OBJECT *CMS_get0_eContentType() returns a pointer to the embedded
content type.

CMS_get0_content() returns a pointer to the **ASN1_OCTET_STRING** pointer
containing the embedded content.

## NOTES


As the **0** implies CMS_get0_type(), CMS_get0_eContentType() and
CMS_get0_content() return internal pointers which should **not** be freed up.
CMS_set1_eContentType() copies the supplied OID and it **should** be freed up
after use.

The **ASN1_OBJECT** values returned can be converted to an integer **NID** value
using OBJ_obj2nid(). For the currently supported content types the following
values are returned:

```c
NID_pkcs7_data
NID_pkcs7_signed
NID_pkcs7_digest
NID_id_smime_ct_compressedData:
NID_pkcs7_encrypted
NID_pkcs7_enveloped

```

The return value of CMS_get0_content() is a pointer to the **ASN1_OCTET_STRING**
content pointer. That means that for example:

```c
ASN1_OCTET_STRING **pconf = CMS_get0_content(cms);

```

***pconf** could be NULL if there is no embedded content. Applications can
access, modify or create the embedded content in a **CMS_ContentInfo** structure
using this function. Applications usually will not need to modify the
embedded content as it is normally set by higher level functions.

## RETURN VALUES


CMS_get0_type() and CMS_get0_eContentType() return an ASN1_OBJECT structure.

CMS_set1_eContentType() returns 1 for success or 0 if an error occurred.  The
error can be obtained from ERR_get_error(3).

## SEE ALSO


ERR_get_error(3)

## COPYRIGHT


Copyright 2008-2016 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/CMS_get0_type.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMS_get0_type.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/CMS_get0_type.pod`；SHA-256：`4a8a67a4c3a403dc167e6c2498bc81362952d7a86617cc0397cebab9f58f953f`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
