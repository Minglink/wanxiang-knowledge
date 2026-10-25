---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-cms-envelopeddata-create",
  "title": "OpenSSL：密码实现与接口 · CMS_EnvelopedData_create（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "CMS_EnvelopedData_create"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "e082e4c5c5bde26b7d3b52437c3b5234f6a6ffcb337a5d486d47bb1ee1877d94",
  "generatedHash": "2a5356c3739a10442f36cb151637af3f4131731f8a33653dbe56973333fc3150",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：CMS_EnvelopedData_create_ex, CMS_EnvelopedData_create, CMS_AuthEnvelopedData_create, CMS_AuthEnvelopedData_create_ex - Create CMS envelope",
  "l1": "CMS_EnvelopedData_create_ex() creates a **CMS_ContentInfo** structure with a type **NID_pkcs7_enveloped**. `cipher` is the symmetric cipher to use. The library context `libctx` and the property query `propq` are used when retrieving algorithms from providers. CMS_AuthEnvelopedData_create_ex() creates a **CMS_ContentInfo** structure with a type **NID_id_smime_ct_authEnvelopedData**. **cipher** is the symmetric AEAD cipher to use. Currently only AES variants with GCM mode are supported. The library context `libctx` and the property query `propq` are used when retrieving algorithms from providers. The algorithm passed in the `cipher` parameter must support ASN1 encoding of its parameters. The recipients can be added later using CMS_add1_recipient_cert(3) or CMS_add0_recipient_key(3). The **CMS_ContentInfo** structure needs to be finalized us",
  "questions": [
    "CMS_EnvelopedData_create 如何用于密码实现与接口？",
    "CMS_EnvelopedData_create 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-cms-envelopeddata-create",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMS_EnvelopedData_create.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · CMS_EnvelopedData_create（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

CMS_EnvelopedData_create_ex, CMS_EnvelopedData_create,
CMS_AuthEnvelopedData_create, CMS_AuthEnvelopedData_create_ex
- Create CMS envelope

## 技术正文

## NAME


CMS_EnvelopedData_create_ex, CMS_EnvelopedData_create,
CMS_AuthEnvelopedData_create, CMS_AuthEnvelopedData_create_ex
- Create CMS envelope

## SYNOPSIS


```c
#include <openssl/cms.h>

CMS_ContentInfo *
CMS_EnvelopedData_create_ex(const EVP_CIPHER *cipher, OSSL_LIB_CTX *libctx,
                            const char *propq);
CMS_ContentInfo *CMS_EnvelopedData_create(const EVP_CIPHER *cipher);

CMS_ContentInfo *
CMS_AuthEnvelopedData_create_ex(const EVP_CIPHER *cipher, OSSL_LIB_CTX *libctx,
                                const char *propq);
CMS_ContentInfo *CMS_AuthEnvelopedData_create(const EVP_CIPHER *cipher);

```

## DESCRIPTION


CMS_EnvelopedData_create_ex() creates a **CMS_ContentInfo** structure
with a type **NID_pkcs7_enveloped**. `cipher` is the symmetric cipher to use.
The library context `libctx` and the property query `propq` are used when
retrieving algorithms from providers.

CMS_AuthEnvelopedData_create_ex() creates a **CMS_ContentInfo**
structure with a type **NID_id_smime_ct_authEnvelopedData**. **cipher** is the
symmetric AEAD cipher to use. Currently only AES variants with GCM mode are
supported. The library context `libctx` and the property query `propq` are
used when retrieving algorithms from providers.

The algorithm passed in the `cipher` parameter must support ASN1 encoding of
its parameters.

The recipients can be added later using CMS_add1_recipient_cert(3) or
CMS_add0_recipient_key(3).

The **CMS_ContentInfo** structure needs to be finalized using CMS_final(3)
and then freed using CMS_ContentInfo_free(3).

CMS_EnvelopedData_create() and CMS_AuthEnvelopedData_create() are similar to
CMS_EnvelopedData_create_ex() and CMS_AuthEnvelopedData_create_ex()
but use default values of NULL for
the library context `libctx` and the property query `propq`.

## NOTES


Although CMS_EnvelopedData_create_ex(), and CMS_EnvelopedData_create(),
CMS_AuthEnvelopedData_create_ex(), and CMS_AuthEnvelopedData_create() allocate
a new **CMS_ContentInfo** structure, they are not usually used in applications.
The wrappers CMS_encrypt(3) and CMS_decrypt(3) are often used instead.

## RETURN VALUES


If the allocation fails, CMS_EnvelopedData_create_ex(),
CMS_EnvelopedData_create(), CMS_AuthEnvelopedData_create_ex(),
CMS_AuthEnvelopedData_create(), CMS_AuthEnvelopedData_create(),
and CMS_AuthEnvelopedData_create_ex() return NULL and set an
error code that can be obtained by ERR_get_error(3).
Otherwise, they return a pointer to the newly allocated structure.

## SEE ALSO


ERR_get_error(3), CMS_encrypt(3), CMS_decrypt(3), CMS_final(3),
CMS_sign_ex(3), CMS_encrypt_ex(3)

## HISTORY


The CMS_EnvelopedData_create_ex() method was added in OpenSSL 3.0.

CMS_AuthEnvelopedData_create() and CMS_AuthEnvelopedData_create_ex()
were added in OpenSSL 3.5.

## COPYRIGHT


Copyright 2020-2025 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/CMS_EnvelopedData_create.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMS_EnvelopedData_create.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/CMS_EnvelopedData_create.pod`；SHA-256：`e082e4c5c5bde26b7d3b52437c3b5234f6a6ffcb337a5d486d47bb1ee1877d94`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
