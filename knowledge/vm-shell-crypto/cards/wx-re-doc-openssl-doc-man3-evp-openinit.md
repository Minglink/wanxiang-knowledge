---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-openinit",
  "title": "OpenSSL：EVP 密码接口 · EVP_OpenInit（man3）",
  "type": "note",
  "tags": [
    "加密算法",
    "密码接口",
    "Provider",
    "openssl",
    "EVP_OpenInit"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "56a883870b703e2d295d2a573abb1f038bdee05aeaf6b7b7a11ea10b95d255e6",
  "generatedHash": "ab2d9fab2d2cf475df99201d971da246c1ef34c70a8dc6467fca24be6c608a06",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "EVP 密码接口：EVP_OpenInit, EVP_OpenUpdate, EVP_OpenFinal - EVP envelope decryption",
  "l1": "The EVP envelope routines are a high-level interface to envelope decryption. They decrypt a public key encrypted symmetric key and then decrypt data using it. EVP_OpenInit() initializes a cipher context **ctx** for decryption with cipher **type**. It decrypts the encrypted symmetric key of length **ekl** bytes passed in the **ek** parameter using the private key **priv**. The IV is supplied in the **iv** parameter. EVP_OpenUpdate() and EVP_OpenFinal() have exactly the same properties as the EVP_DecryptUpdate() and EVP_DecryptFinal() routines, as documented on the EVP_EncryptInit(3) manual page.",
  "questions": [
    "EVP_OpenInit 如何用于EVP 密码接口？",
    "EVP_OpenInit 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-openinit",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_OpenInit.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：EVP 密码接口 · EVP_OpenInit（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：EVP 密码接口。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_OpenInit, EVP_OpenUpdate, EVP_OpenFinal - EVP envelope decryption

## 技术正文

## NAME


EVP_OpenInit, EVP_OpenUpdate, EVP_OpenFinal - EVP envelope decryption

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_OpenInit(EVP_CIPHER_CTX *ctx, EVP_CIPHER *type, unsigned char *ek,
                 int ekl, unsigned char *iv, EVP_PKEY *priv);
int EVP_OpenUpdate(EVP_CIPHER_CTX *ctx, unsigned char *out,
                   int *outl, unsigned char *in, int inl);
int EVP_OpenFinal(EVP_CIPHER_CTX *ctx, unsigned char *out, int *outl);

```

## DESCRIPTION


The EVP envelope routines are a high-level interface to envelope
decryption. They decrypt a public key encrypted symmetric key and
then decrypt data using it.

EVP_OpenInit() initializes a cipher context **ctx** for decryption
with cipher **type**. It decrypts the encrypted symmetric key of length
**ekl** bytes passed in the **ek** parameter using the private key **priv**.
The IV is supplied in the **iv** parameter.

EVP_OpenUpdate() and EVP_OpenFinal() have exactly the same properties
as the EVP_DecryptUpdate() and EVP_DecryptFinal() routines, as
documented on the EVP_EncryptInit(3) manual
page.

## NOTES


It is possible to call EVP_OpenInit() twice in the same way as
EVP_DecryptInit(). The first call should have **priv** set to NULL
and (after setting any cipher parameters) it should be called again
with **type** set to NULL.

If the cipher passed in the **type** parameter is a variable length
cipher then the key length will be set to the value of the recovered
key length. If the cipher is a fixed length cipher then the recovered
key length must match the fixed cipher length.

## RETURN VALUES


EVP_OpenInit() returns 0 on error or a non zero integer (actually the
recovered secret key size) if successful.

EVP_OpenUpdate() returns 1 for success or 0 for failure.

EVP_OpenFinal() returns 0 if the decrypt failed or 1 for success.

## SEE ALSO


evp(7), RAND_bytes(3),
EVP_EncryptInit(3),
EVP_SealInit(3)

## COPYRIGHT


Copyright 2000-2020 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_OpenInit.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_OpenInit.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_OpenInit.pod`；SHA-256：`56a883870b703e2d295d2a573abb1f038bdee05aeaf6b7b7a11ea10b95d255e6`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
