---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-asn1-get-count",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_asn1_get_count（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_asn1_get_count"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "a5b72991880abb86c87a8f1ab055157f967ab4c7dca82d86a7e76a73542f1653",
  "generatedHash": "9b07800b9f94a780ac54c54340a02e4e3709429e05b8f45bcad3859b7b7d1ff6",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_asn1_find, EVP_PKEY_asn1_find_str, EVP_PKEY_asn1_get_count, EVP_PKEY_asn1_get0, EVP_PKEY_asn1_get0_info - enumerate public key ASN.1 methods",
  "l1": "EVP_PKEY_asn1_count() returns a count of the number of public key ASN.1 methods available: it includes standard methods and any methods added by the application. EVP_PKEY_asn1_get0() returns the public key ASN.1 method **idx**. The value of **idx** must be between zero and EVP_PKEY_asn1_get_count() - 1. EVP_PKEY_asn1_find() looks up the **EVP_PKEY_ASN1_METHOD** with NID **type**. If **pe** isn't **NULL**, then it will look up an engine implementing a **EVP_PKEY_ASN1_METHOD** for the NID **type** and return that instead, and also set ***pe** to point at the engine that implements it. EVP_PKEY_asn1_find_str() looks up the **EVP_PKEY_ASN1_METHOD** with PEM type string **str**. Just like EVP_PKEY_asn1_find(), if **pe** isn't **NULL**, then it will look up an engine implementing a **EVP_PKEY_ASN1_METHOD** for the NID **type** and return that i",
  "questions": [
    "EVP_PKEY_asn1_get_count 如何用于非对称密钥与签名？",
    "EVP_PKEY_asn1_get_count 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-asn1-get-count",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_asn1_get_count.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_asn1_get_count（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_asn1_find,
EVP_PKEY_asn1_find_str,
EVP_PKEY_asn1_get_count,
EVP_PKEY_asn1_get0,
EVP_PKEY_asn1_get0_info
- enumerate public key ASN.1 methods

## 技术正文

## NAME


EVP_PKEY_asn1_find,
EVP_PKEY_asn1_find_str,
EVP_PKEY_asn1_get_count,
EVP_PKEY_asn1_get0,
EVP_PKEY_asn1_get0_info
- enumerate public key ASN.1 methods

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_PKEY_asn1_get_count(void);
const EVP_PKEY_ASN1_METHOD *EVP_PKEY_asn1_get0(int idx);
const EVP_PKEY_ASN1_METHOD *EVP_PKEY_asn1_find(ENGINE **pe, int type);
const EVP_PKEY_ASN1_METHOD *EVP_PKEY_asn1_find_str(ENGINE **pe,
                                                   const char *str, int len);
int EVP_PKEY_asn1_get0_info(int *ppkey_id, int *pkey_base_id,
                            int *ppkey_flags, const char **pinfo,
                            const char **ppem_str,
                            const EVP_PKEY_ASN1_METHOD *ameth);

```

## DESCRIPTION


EVP_PKEY_asn1_count() returns a count of the number of public key
ASN.1 methods available: it includes standard methods and any methods
added by the application.

EVP_PKEY_asn1_get0() returns the public key ASN.1 method **idx**.
The value of **idx** must be between zero and EVP_PKEY_asn1_get_count()
- 1.

EVP_PKEY_asn1_find() looks up the **EVP_PKEY_ASN1_METHOD** with NID
**type**.
If **pe** isn't **NULL**, then it will look up an engine implementing a
**EVP_PKEY_ASN1_METHOD** for the NID **type** and return that instead,
and also set ***pe** to point at the engine that implements it.

EVP_PKEY_asn1_find_str() looks up the **EVP_PKEY_ASN1_METHOD** with PEM
type string **str**.
Just like EVP_PKEY_asn1_find(), if **pe** isn't **NULL**, then it will
look up an engine implementing a **EVP_PKEY_ASN1_METHOD** for the NID
**type** and return that instead, and also set ***pe** to point at the
engine that implements it.

EVP_PKEY_asn1_get0_info() returns the public key ID, base public key
ID (both NIDs), any flags, the method description and PEM type string
associated with the public key ASN.1 method ***ameth**.

EVP_PKEY_asn1_count(), EVP_PKEY_asn1_get0(), EVP_PKEY_asn1_find() and
EVP_PKEY_asn1_find_str() are not thread safe, but as long as all
**EVP_PKEY_ASN1_METHOD** objects are added before the application gets
threaded, using them is safe.  See EVP_PKEY_asn1_add0(3).

## RETURN VALUES


EVP_PKEY_asn1_count() returns the number of available public key methods.

EVP_PKEY_asn1_get0() return a public key method or **NULL** if **idx** is
out of range.

EVP_PKEY_asn1_get0_info() returns 0 on failure, 1 on success.

## SEE ALSO


EVP_PKEY_asn1_new(3), EVP_PKEY_asn1_add0(3)

## COPYRIGHT


Copyright 2017 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_asn1_get_count.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_asn1_get_count.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_asn1_get_count.pod`；SHA-256：`a5b72991880abb86c87a8f1ab055157f967ab4c7dca82d86a7e76a73542f1653`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
