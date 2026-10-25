---
{
  "schemaVersion": 2,
  "id": "wx-re-doc-openssl-doc-man3-evp-pkey-encrypt",
  "title": "OpenSSL：非对称密钥与签名 · EVP_PKEY_encrypt（man3）",
  "type": "note",
  "tags": [
    "非对称密码",
    "公钥",
    "私钥",
    "签名",
    "密钥管理",
    "openssl",
    "EVP_PKEY_encrypt"
  ],
  "project": "密码算法与实现",
  "createdAt": "2026-10-25T00:00:00+08:00",
  "updatedAt": "2026-10-25T00:00:00+08:00",
  "sourceSession": "external:focused-2026-10-25-003",
  "sourceTitle": "固定版本公开许可技术文献（非宿主会话）",
  "sourceSeqs": [],
  "snapshotHash": "f3cd105d8b6784b0c3af13a62fdde19dfeec8b8c63a47147f74b3c85c5910ccd",
  "generatedHash": "202ba781e1a2c138e5ee2264eed09eab4326365294c2eacce6c49c4a3a8ecb55",
  "archived": false,
  "verification": "固定标签正文收录；自动结构核验；未逐篇翻译或实验复现",
  "l0": "非对称密钥与签名：EVP_PKEY_encrypt_init_ex, EVP_PKEY_encrypt_init, EVP_PKEY_encrypt - encrypt using a public key algorithm",
  "l1": "The EVP_PKEY_encrypt_init() function initializes a public key algorithm context using key **pkey** for an encryption operation. The EVP_PKEY_encrypt_init_ex() function initializes a public key algorithm context using key **pkey** for an encryption operation and sets the algorithm specific **params**. The EVP_PKEY_encrypt() function performs a public key encryption operation using **ctx**. The data to be encrypted is specified using the **in** and **inlen** parameters. If **out** is **NULL** then the maximum size of the output buffer is written to the **outlen** parameter. If **out** is not **NULL** then before the call the **outlen** parameter should contain the length of the **out** buffer, if the call is successful the encrypted data is written to **out** and the amount of data written to **outlen**.",
  "questions": [
    "EVP_PKEY_encrypt 如何用于非对称密钥与签名？",
    "EVP_PKEY_encrypt 有哪些参数、约束、实现语义和注意事项？"
  ],
  "validFrom": "2026-10-25T00:00:00+08:00",
  "invalidAt": null,
  "links": [],
  "externalSources": [
    {
      "id": "doc-openssl-doc-man3-evp-pkey-encrypt",
      "url": "https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_encrypt.pod",
      "checkedAt": "2026-10-25",
      "version": "openssl-3.5.0"
    }
  ],
  "batchId": "focused-2026-10-25-003",
  "contentLicense": "Apache-2.0"
}
---
# OpenSSL：非对称密钥与签名 · EVP_PKEY_encrypt（man3）

> 本文收录 OPENSSL 的独立技术文献正文，固定标签 `openssl-3.5.0`。主题：非对称密钥与签名。正文保留英文，中文标题、标签与检索问法用于定位；没有逐篇人工翻译或复现实验。

## 内容定位

EVP_PKEY_encrypt_init_ex,
EVP_PKEY_encrypt_init, EVP_PKEY_encrypt - encrypt using a public key algorithm

## 技术正文

## NAME


EVP_PKEY_encrypt_init_ex,
EVP_PKEY_encrypt_init, EVP_PKEY_encrypt - encrypt using a public key algorithm

## SYNOPSIS


```c
#include <openssl/evp.h>

int EVP_PKEY_encrypt_init(EVP_PKEY_CTX *ctx);
int EVP_PKEY_encrypt_init_ex(EVP_PKEY_CTX *ctx, const OSSL_PARAM params[]);
int EVP_PKEY_encrypt(EVP_PKEY_CTX *ctx,
                     unsigned char *out, size_t *outlen,
                     const unsigned char *in, size_t inlen);

```

## DESCRIPTION


The EVP_PKEY_encrypt_init() function initializes a public key algorithm
context using key **pkey** for an encryption operation.

The EVP_PKEY_encrypt_init_ex() function initializes a public key algorithm
context using key **pkey** for an encryption operation and sets the
algorithm specific **params**.

The EVP_PKEY_encrypt() function performs a public key encryption operation
using **ctx**. The data to be encrypted is specified using the **in** and
**inlen** parameters. If **out** is **NULL** then the maximum size of the output
buffer is written to the **outlen** parameter. If **out** is not **NULL** then
before the call the **outlen** parameter should contain the length of the
**out** buffer, if the call is successful the encrypted data is written to
**out** and the amount of data written to **outlen**.

## NOTES


After the call to EVP_PKEY_encrypt_init() algorithm specific control
operations can be performed to set any appropriate parameters for the
operation.  These operations can be included in the EVP_PKEY_encrypt_init_ex()
call.

The function EVP_PKEY_encrypt() can be called more than once on the same
context if several operations are performed using the same parameters.

## RETURN VALUES


EVP_PKEY_encrypt_init(), EVP_PKEY_encrypt_init_ex() and EVP_PKEY_encrypt()
return 1 for success and 0 or a negative value for failure. In particular a
return value of -2 indicates the operation is not supported by the public key
algorithm.

## EXAMPLES


Encrypt data using OAEP (for RSA keys). See also PEM_read_PUBKEY(3) or
d2i_X509(3) for means to load a public key. You may also simply
set 'eng = NULL;' to start with the default OpenSSL RSA implementation:

```c
#include <openssl/evp.h>
#include <openssl/rsa.h>
#include <openssl/engine.h>

EVP_PKEY_CTX *ctx;
ENGINE *eng;
unsigned char *out, *in;
size_t outlen, inlen;
EVP_PKEY *key;

/*
 * NB: assumes eng, key, in, inlen are already set up,
 * and that key is an RSA public key
 */
ctx = EVP_PKEY_CTX_new(key, eng);
if (!ctx)
    /* Error occurred */
if (EVP_PKEY_encrypt_init(ctx) <= 0)
    /* Error */
if (EVP_PKEY_CTX_set_rsa_padding(ctx, RSA_PKCS1_OAEP_PADDING) <= 0)
    /* Error */

/* Determine buffer length */
if (EVP_PKEY_encrypt(ctx, NULL, &outlen, in, inlen) <= 0)
    /* Error */

out = OPENSSL_malloc(outlen);

if (!out)
    /* malloc failure */

if (EVP_PKEY_encrypt(ctx, out, &outlen, in, inlen) <= 0)
    /* Error */

/* Encrypted data is outlen bytes written to buffer out */

```

## SEE ALSO


d2i_X509(3),
ENGINE_by_id(3),
EVP_PKEY_CTX_new(3),
EVP_PKEY_decrypt(3),
EVP_PKEY_sign(3),
EVP_PKEY_verify(3),
EVP_PKEY_verify_recover(3),
EVP_PKEY_derive(3)

## HISTORY


These functions were added in OpenSSL 1.0.0.

## COPYRIGHT


Copyright 2006-2021 The OpenSSL Project Authors. All Rights Reserved.

Licensed under the Apache License 2.0 (the "License").  You may not use
this file except in compliance with the License.  You can obtain a copy
in the file LICENSE in the source distribution or at
https://www.openssl.org/source/license.html.

## 来源、版本与核验

- 上游：[doc/man3/EVP_PKEY_encrypt.pod](https://github.com/openssl/openssl/blob/openssl-3.5.0/doc/man3/EVP_PKEY_encrypt.pod)
- 作者：openssl/openssl 项目贡献者，原文内具体署名保留。
- 标签：openssl-3.5.0；树标识：636dfadc70ce26f2473870570bfd9ec352806b1d；获取日期：2026-10-25。
- 许可：Apache-2.0；许可文本在本批 sources 的 licenses 目录，文件单独声明优先。
- 原始文件：`sources/focused-2026-10-25-003/originals/openssl/doc/man3/EVP_PKEY_encrypt.pod`；SHA-256：`f3cd105d8b6784b0c3af13a62fdde19dfeec8b8c63a47147f74b3c85c5910ccd`。
- 核验：已取得正文并自动核对章节、长度、哈希及去重；英文原文未逐篇人工翻译，命令/代码未运行。RST引用、include、表格或工程生成段可能未展开，应结合上游原始文件。
