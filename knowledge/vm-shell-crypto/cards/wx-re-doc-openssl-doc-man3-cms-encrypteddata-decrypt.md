---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-cms-encrypteddata-decrypt",
  "title": "OpenSSL：密码实现与接口 · CMS_EncryptedData_decrypt（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "OpenSSL",
    "密码实现",
    "openssl",
    "CMS_EncryptedData_decrypt"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "a9c9ec84d7b980aefedac6995318a69ad80ed090e3050a33500e88bc96e01de9",
  "generatedHash": "eb4b4ab2d783f25a0b76d8ea9b17dbe4a634d352c7f9268d835587a8979c86d3",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "密码实现与接口：CMS_EncryptedData_decrypt, CMS_EnvelopedData_decrypt - Decrypt CMS EncryptedData or EnvelopedData",
  "l1": "CMS_EncryptedData_decrypt() decrypts a `cms` EncryptedData object using the symmetric `key` of size `keylen` bytes. `out` is a BIO to write the content to and `flags` is an optional set of flags. `dcont` is used in the rare case where the encrypted content is detached. It will normally be set to NULL. The following flags can be passed in the `flags` parameter. If the **CMS_TEXT** flag is set MIME headers for type `text/plain` are deleted from the content. If the content is not of type `text/plain` then an error is returned. CMS_EnvelopedData_decrypt() decrypts, similarly to CMS_decrypt(3), a CMS EnvelopedData object `env` using the symmetric key `secret` if it is not NULL, otherwise the private key of the recipient `pkey`. If `pkey` is given, it is recommended to provide also the associated certificate in `cert` - see CMS_decrypt(3) and t",
  "questions": [
    "CMS_EncryptedData_decrypt 如何用于密码实现与接口？",
    "CMS_EncryptedData_decrypt 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-cms-encrypteddata-decrypt",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMS_EncryptedData_decrypt.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：密码实现与接口 · CMS_EncryptedData_decrypt（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：密码实现与接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

CMS_EncryptedData_decrypt, CMS_EnvelopedData_decrypt
- Decrypt CMS EncryptedData or EnvelopedData

## 技术正文

## NAME


CMS_EncryptedData_decrypt, CMS_EnvelopedData_decrypt
- Decrypt CMS EncryptedData or EnvelopedData

## SYNOPSIS


```c
#include <openssl/cms.h>

int CMS_EncryptedData_decrypt(CMS_ContentInfo *cms,
                              const unsigned char *key, size_t keylen,
                              BIO *dcont, BIO *out, unsigned int flags);

BIO *CMS_EnvelopedData_decrypt(CMS_EnvelopedData *env, BIO *detached_data,
                               EVP_PKEY *pkey, X509 *cert,
                               ASN1_OCTET_STRING *secret, unsigned int flags,
                               OSSL_LIB_CTX *libctx, const char *propq);

```

## DESCRIPTION


CMS_EncryptedData_decrypt() decrypts a `cms` EncryptedData object using the
symmetric `key` of size `keylen` bytes. `out` is a BIO to write the content
to and `flags` is an optional set of flags.
`dcont` is used in the rare case where the encrypted content is detached. It
will normally be set to NULL.

The following flags can be passed in the `flags` parameter.

If the **CMS_TEXT** flag is set MIME headers for type `text/plain` are deleted
from the content. If the content is not of type `text/plain` then an error is
returned.

CMS_EnvelopedData_decrypt() decrypts, similarly to CMS_decrypt(3),
a CMS EnvelopedData object `env` using the symmetric key `secret` if it
is not NULL, otherwise the private key of the recipient `pkey`.
If `pkey` is given, it is recommended to provide also the associated
certificate in `cert` - see CMS_decrypt(3) and the NOTES on `cert` there.
The optional parameters `flags` and `dcont` are used as described above.
The optional parameters library context `libctx` and property query `propq`
are used when retrieving algorithms from providers.

## RETURN VALUES


CMS_EncryptedData_decrypt() returns 0 if an error occurred otherwise returns 1.

CMS_EnvelopedData_decrypt() returns NULL if an error occurred,
otherwise a BIO containing the decypted content.

## SEE ALSO


ERR_get_error(3), CMS_EncryptedData_encrypt(3), CMS_decrypt(3)

## HISTORY


CMS_EnvelopedData_decrypt() was added in OpenSSL 3.2.

## COPYRIGHT


Copyright 2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/CMS_EncryptedData_decrypt.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/CMS_EncryptedData_decrypt.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/CMS_EncryptedData_decrypt.pod`；SHA-256：`a9c9ec84d7b980aefedac6995318a69ad80ed090e3050a33500e88bc96e01de9`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
