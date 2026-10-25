---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-cms-encrypteddata-encrypt",
  "title": "OpenSSL：密码实现与接口 · CMS_EncryptedData_encrypt（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "CMS_EncryptedData_encrypt"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "3df6776baa82bd8b89ddb49b55c951ba0a41258b8a7fcb3c8ada3cafae7e3187",
  "generatedHash": "107c66ddaf4b618e1cc08183aed46eabbfb9b994ee8bb20df5ce2473d30ab812",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：CMS_EncryptedData_encrypt_ex, CMS_EncryptedData_encrypt - Create CMS EncryptedData",
  "l1": "CMS_EncryptedData_encrypt_ex() creates a **CMS_ContentInfo** structure with a type **NID_pkcs7_encrypted**. `in` is a BIO containing the data to encrypt using `cipher` and the encryption key `key` of size `keylen` bytes. The library context `libctx` and the property query `propq` are used when retrieving algorithms from providers. `flags` is a set of optional flags. The `flags` field supports the options **CMS_DETACHED**, **CMS_STREAM** and **CMS_PARTIAL**. Internally CMS_final() is called unless **CMS_STREAM** and/or **CMS_PARTIAL** is specified. The algorithm passed in the `cipher` parameter must support ASN1 encoding of its parameters. The **CMS_ContentInfo** structure can be freed using CMS_ContentInfo_free(3). CMS_EncryptedData_encrypt() is similar to CMS_EncryptedData_encrypt_ex() but uses default values of NULL for the library cont",
  "questions": [
    "CMS_EncryptedData_encrypt 如何用于密码实现与接口？",
    "CMS_EncryptedData_encrypt 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-cms-encrypteddata-encrypt",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMS_EncryptedData_encrypt.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · CMS_EncryptedData_encrypt（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

CMS_EncryptedData_encrypt_ex, CMS_EncryptedData_encrypt
- Create CMS EncryptedData

## 技术正文

## NAME


CMS_EncryptedData_encrypt_ex, CMS_EncryptedData_encrypt
- Create CMS EncryptedData

## SYNOPSIS


```c
#include <openssl/cms.h>

CMS_ContentInfo *CMS_EncryptedData_encrypt_ex(BIO *in,
                                              const EVP_CIPHER *cipher,
                                              const unsigned char *key,
                                              size_t keylen,
                                              unsigned int flags,
                                              OSSL_LIB_CTX *ctx,
                                              const char *propq);

CMS_ContentInfo *CMS_EncryptedData_encrypt(BIO *in,
    const EVP_CIPHER *cipher, const unsigned char *key, size_t keylen,
    unsigned int flags);

```

## DESCRIPTION


CMS_EncryptedData_encrypt_ex() creates a **CMS_ContentInfo** structure
with a type **NID_pkcs7_encrypted**. `in` is a BIO containing the data to
encrypt using `cipher` and the encryption key `key` of size `keylen` bytes.
The library context `libctx` and the property query `propq` are used when
retrieving algorithms from providers. `flags` is a set of optional flags.

The `flags` field supports the options **CMS_DETACHED**, **CMS_STREAM** and
**CMS_PARTIAL**. Internally CMS_final() is called unless **CMS_STREAM** and/or
**CMS_PARTIAL** is specified.

The algorithm passed in the `cipher` parameter must support ASN1 encoding of
its parameters.

The **CMS_ContentInfo** structure can be freed using CMS_ContentInfo_free(3).

CMS_EncryptedData_encrypt() is similar to CMS_EncryptedData_encrypt_ex()
but uses default values of NULL for the library context `libctx` and the
property query `propq`.

## RETURN VALUES


If the allocation fails, CMS_EncryptedData_encrypt_ex() and
CMS_EncryptedData_encrypt() return NULL and set an error code that can be
obtained by ERR_get_error(3). Otherwise they return a pointer to the newly
allocated structure.

## SEE ALSO


ERR_get_error(3), CMS_final(3), CMS_EncryptedData_decrypt(3)

## HISTORY


The CMS_EncryptedData_encrypt_ex() method was added in OpenSSL 3.0.

## COPYRIGHT


Copyright 2020-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/CMS_EncryptedData_encrypt.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMS_EncryptedData_encrypt.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/CMS_EncryptedData_encrypt.pod`；SHA-256：`3df6776baa82bd8b89ddb49b55c951ba0a41258b8a7fcb3c8ada3cafae7e3187`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
