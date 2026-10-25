---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-sealinit",
  "title": "OpenSSL：EVP 密码接口 · EVP_SealInit（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_SealInit"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "4533322e3077de23a3bdc90a7ef2117ec6fb3754d50fc5b68577819e77f09a56",
  "generatedHash": "1150db3269f6532164679af2f0fdbf20941631001e9609c804c95d383636a677",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_SealInit, EVP_SealUpdate, EVP_SealFinal - EVP envelope encryption",
  "l1": "The EVP envelope routines are a high-level interface to envelope encryption. They generate a random key and IV (if required) then \"envelope\" it by using public key encryption. Data can then be encrypted using this key. EVP_SealInit() initializes a cipher context **ctx** for encryption with cipher **type** using a random secret key and IV. **type** is normally supplied by a function such as EVP_aes_256_cbc(). The secret key is encrypted using one or more public keys, this allows the same encrypted data to be decrypted using any of the corresponding private keys. **ek** is an array of buffers where the public key encrypted secret key will be written, each buffer must contain enough room for the corresponding encrypted key: that is **ek[i]** must have room for **EVP_PKEY_get_size(pubk[i])** bytes. The actual size of each encrypted secret key",
  "questions": [
    "EVP_SealInit 如何用于EVP 密码接口？",
    "EVP_SealInit 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-sealinit",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_SealInit.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_SealInit（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_SealInit, EVP_SealUpdate, EVP_SealFinal - EVP envelope encryption

## 技术正文

## NAME


EVP_SealInit, EVP_SealUpdate, EVP_SealFinal - EVP envelope encryption

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_SealInit(EVP_CIPHER_CTX *ctx, const EVP_CIPHER *type,
                 unsigned char **ek, int *ekl, unsigned char *iv,
                 EVP_PKEY **pubk, int npubk);
int EVP_SealUpdate(EVP_CIPHER_CTX *ctx, unsigned char *out,
                   int *outl, unsigned char *in, int inl);
int EVP_SealFinal(EVP_CIPHER_CTX *ctx, unsigned char *out, int *outl);

```

## DESCRIPTION


The EVP envelope routines are a high-level interface to envelope
encryption. They generate a random key and IV (if required) then
"envelope" it by using public key encryption. Data can then be
encrypted using this key.

EVP_SealInit() initializes a cipher context **ctx** for encryption
with cipher **type** using a random secret key and IV. **type** is normally
supplied by a function such as EVP_aes_256_cbc(). The secret key is encrypted
using one or more public keys, this allows the same encrypted data to be
decrypted using any of the corresponding private keys. **ek** is an array of
buffers where the public key encrypted secret key will be written, each buffer
must contain enough room for the corresponding encrypted key: that is
**ek[i]** must have room for **EVP_PKEY_get_size(pubk[i])** bytes. The actual
size of each encrypted secret key is written to the array **ekl**. **pubk** is
an array of **npubk** public keys.

The **iv** parameter is a buffer where the generated IV is written to. It must
contain enough room for the corresponding cipher's IV, as determined by (for
example) EVP_CIPHER_get_iv_length(type).

If the cipher does not require an IV then the **iv** parameter is ignored
and can be **NULL**.

EVP_SealUpdate() and EVP_SealFinal() have exactly the same properties
as the EVP_EncryptUpdate() and EVP_EncryptFinal() routines, as
documented on the EVP_EncryptInit(3) manual
page.

## RETURN VALUES


EVP_SealInit() returns 0 on error or **npubk** if successful.

EVP_SealUpdate() and EVP_SealFinal() return 1 for success and 0 for
failure.

## NOTES


Because a random secret key is generated the random number generator
must be seeded when EVP_SealInit() is called.
If the automatic seeding or reseeding of the OpenSSL CSPRNG fails due to
external circumstances (see RAND(7)), the operation will fail.

The public key must be RSA because it is the only OpenSSL public key
algorithm that supports key transport.

Envelope encryption is the usual method of using public key encryption
on large amounts of data, this is because public key encryption is slow
but symmetric encryption is fast. So symmetric encryption is used for
bulk encryption and the small random symmetric key used is transferred
using public key encryption.

It is possible to call EVP_SealInit() twice in the same way as
EVP_EncryptInit(). The first call should have **npubk** set to 0
and (after setting any cipher parameters) it should be called again
with **type** set to NULL.

## SEE ALSO


evp(7), RAND_bytes(3),
EVP_EncryptInit(3),
EVP_OpenInit(3),
RAND(7)

## COPYRIGHT


Copyright 2000-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_SealInit.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_SealInit.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_SealInit.pod`；SHA-256：`4533322e3077de23a3bdc90a7ef2117ec6fb3754d50fc5b68577819e77f09a56`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
